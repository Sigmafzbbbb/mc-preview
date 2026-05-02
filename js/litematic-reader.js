/**
 * Litematic 文件读取与结构解析
 * 从 NBT 数据中提取渲染所需的方块数据
 */

/**
 * 从 NBT 数据中解析 Litematic 结构
 * @param {Object} nbtData - parseNBT 返回的结构化数据
 * @returns {Object} { metadata, regions, totalBlocks, blockStats }
 */
function readLitematic(nbtData) {
    // 提取元数据
    const metadata = extractMetadata(nbtData);

    // 提取所有区域
    const regions = extractRegions(nbtData);

    // 计算总方块数和统计
    let totalBlocks = 0;
    const blockStats = {};

    for (const region of regions) {
        totalBlocks += region.voxels.length;
        for (const voxel of region.voxels) {
            const id = voxel.blockId;
            if (!id || id === 'minecraft:air') continue;
            blockStats[id] = (blockStats[id] || 0) + 1;
        }
    }

    return { metadata, regions, totalBlocks, blockStats };
}

/**
 * 提取文件元数据
 */
function extractMetadata(nbtData) {
    const md = nbtData.Metadata || {};
    const size = md.Size || {};

    return {
        name: md.Name || '未命名投影',
        author: md.Author || '',
        description: md.Description || '',
        size: {
            x: Number(size.x) || 0,
            y: Number(size.y) || 0,
            z: Number(size.z) || 0
        },
        totalBlocks: Number(md.TotalBlocks) || 0,
        totalVolume: Number(md.TotalVolume) || 0,
        timeCreated: md.TimeCreated || null,
        timeModified: md.TimeModified || null,
        mcVersion: md.MinecraftDataVersion || null
    };
}

/**
 * 提取所有区域数据
 */
function extractRegions(nbtData) {
    const regionsCompound = nbtData.Regions || {};
    const regions = [];

    for (const [regionName, regionData] of Object.entries(regionsCompound)) {
        try {
            const region = extractRegion(regionName, regionData);
            if (region && region.voxels.length > 0) {
                regions.push(region);
            }
        } catch (err) {
            console.warn(`解析区域 "${regionName}" 时出错:`, err);
        }
    }

    return regions;
}

/**
 * 提取单个区域数据
 */
function extractRegion(name, regionData) {
    // 区域尺寸
    const size = regionData.Size || {};
    const sizeX = Number(size.x) || 0;
    const sizeY = Number(size.y) || 0;
    const sizeZ = Number(size.z) || 0;

    // 区域原点
    const pos = regionData.Pos || {};
    const posX = Number(pos.x) || 0;
    const posY = Number(pos.y) || 0;
    const posZ = Number(pos.z) || 0;

    // 获取 BlockStatePalette
    const palette = regionData.BlockStatePalette || [];

    // 将 palette 数组中的 Compound 转换为方块 ID 和方向列表
    const blockIdList = palette.map(entry => {
        if (typeof entry === 'string') return { id: entry, properties: {} };
        if (typeof entry === 'object' && entry.Name) {
            // 提取方向属性
            const properties = {};
            for (const key in entry) {
                if (key !== 'Name') {
                    properties[key] = entry[key];
                }
            }
            return { id: entry.Name, properties: properties };
        }
        return { id: 'minecraft:air', properties: {} };
    });

    // 获取 BlockStates 长整型数组
    const blockStates = regionData.BlockStates || [];

    // 提取方块
    const voxels = extractVoxels(blockStates, blockIdList, sizeX, sizeY, sizeZ, posX, posY, posZ);

    return {
        name,
        size: { x: sizeX, y: sizeY, z: sizeZ },
        position: { x: posX, y: posY, z: posZ },
        voxels
    };
}

/**
 * 从 BlockStates 长整型数组中提取方块列表
 *
 * 算法说明：
 * - BlockStates 是一个 BigInt 数组（64 位长整型）
 * - 每个长整型存储多个方块的状态索引
 * - bitsPerBlock = ceil(log2(palette.length))
 * - 每个方块占 bitsPerBlock 位
 * - 遍历所有 long，按位提取每个位置的 palette 索引
 */
function extractVoxels(blockStates, blockIdList, sizeX, sizeY, sizeZ, posX, posY, posZ) {
    if (!blockStates || blockStates.length === 0 || !blockIdList || blockIdList.length === 0) {
        return [];
    }

    const paletteSize = blockIdList.length;
    const totalBlocks = sizeX * sizeY * sizeZ;

    if (totalBlocks === 0) return [];

    // 计算每个方块占用的位数
    let bitsPerBlock;
    if (paletteSize <= 1) {
        bitsPerBlock = 1;
    } else {
        bitsPerBlock = Math.ceil(Math.log2(paletteSize));
        // 限制在 1-64 之间
        bitsPerBlock = Math.max(1, Math.min(64, bitsPerBlock));
    }

    // 每个长整型存储的方块数
    const blocksPerLong = Math.floor(64 / bitsPerBlock);
    if (blocksPerLong <= 0) return [];

    // 位掩码
    const mask = bitsPerBlock === 64
        ? BigInt('0xFFFFFFFFFFFFFFFF')
        : (BigInt(1) << BigInt(bitsPerBlock)) - BigInt(1);

    // 长整型数组中的最大索引
    const longArraySize = Math.ceil(totalBlocks / blocksPerLong);

    const voxels = [];

    for (let i = 0; i < totalBlocks; i++) {
        // 计算在长整型数组中的位置
        const longIndex = Math.floor(i / blocksPerLong);
        const indexInLong = i % blocksPerLong;

        if (longIndex >= blockStates.length) break;

        const longVal = BigInt(blockStates[longIndex]);

        // 提取对应位的值
        const bitOffset = BigInt(indexInLong * bitsPerBlock);
        let stateIndex;

        if (longVal === BigInt(0) && blockStates[longIndex] === BigInt(0)) {
            stateIndex = BigInt(0);
        } else {
            stateIndex = (longVal >> bitOffset) & mask;
        }

        // 转为数字索引
        const idx = Number(stateIndex);

        // 索引为 0 或超出 palette 范围视为空气方块，跳过
        if (idx <= 0 || idx >= paletteSize) continue;

        // 计算方块坐标
        const y = Math.floor(i / (sizeX * sizeZ));
        const remainder = i % (sizeX * sizeZ);
        const z = Math.floor(remainder / sizeX);
        const x = remainder % sizeX;

        const blockInfo = blockIdList[idx];
        if (!blockInfo || blockInfo.id === 'minecraft:air') continue;

        voxels.push({
            x: x + posX,
            y: y + posY,
            z: z + posZ,
            blockId: blockInfo.id,
            properties: blockInfo.properties || {}
        });
    }

    return voxels;
}



/**
 * 格式化文件信息（供信息面板显示）
 */
function getFileInfo(metadata, regions, totalBlocks, blockStats) {
    const uniqueBlockTypes = Object.keys(blockStats).length;

    // 始终从区域数据计算尺寸（最可靠）
    const size = calculateTotalSize(regions);

    return {
        name: metadata.name,
        author: metadata.author,
        description: metadata.description,
        size,
        totalBlocks,
        totalVolume: metadata.totalVolume,
        regionCount: regions.length,
        blockTypes: uniqueBlockTypes,
        blockStats: Object.entries(blockStats)
            .sort((a, b) => b[1] - a[1])
            .map(([id, count]) => ({
                id,
                count,
                percentage: totalBlocks > 0 ? ((count / totalBlocks) * 100).toFixed(1) : '0'
            }))
    };
}

/**
 * 从所有区域数据计算总尺寸
 */
function calculateTotalSize(regions) {
    if (regions.length === 0) return { x: 0, y: 0, z: 0 };

    let minX = Infinity, minY = Infinity, minZ = Infinity;
    let maxX = -Infinity, maxY = -Infinity, maxZ = -Infinity;

    for (const region of regions) {
        const px = Number(region.position.x) || 0;
        const py = Number(region.position.y) || 0;
        const pz = Number(region.position.z) || 0;
        const sx = Math.abs(Number(region.size.x)) || 0;
        const sy = Math.abs(Number(region.size.y)) || 0;
        const sz = Math.abs(Number(region.size.z)) || 0;

        minX = Math.min(minX, px);
        minY = Math.min(minY, py);
        minZ = Math.min(minZ, pz);
        maxX = Math.max(maxX, px + sx);
        maxY = Math.max(maxY, py + sy);
        maxZ = Math.max(maxZ, pz + sz);
    }

    return {
        x: Math.abs(maxX - minX),
        y: Math.abs(maxY - minY),
        z: Math.abs(maxZ - minZ)
    };
}
