/**
 * Three.js 3D 渲染器
 * 全部使用 DataTexture（绕过 file:// 协议 Canvas taint 限制）
 */

// 全局变量
let scene, camera, renderer, controls;
let voxelGroup;
let gridHelper, axesHelper;
let animationId;
let initialCameraPosition = new THREE.Vector3();
let initialTarget = new THREE.Vector3();
let currentMode = 'solid';
let currentBlockMesh = null;
let currentWireMesh = null;
let currentVoxelData = [];  // 当前加载的体素数据
let isFlipped = false;  // 是否已垂直翻转
let originalVoxelData = [];  // 原始体素数据（未翻转）
let yOffsetOffset = 0;  // 全局 Y 轴偏移（用于调整整个投影的垂直位置）

// 纹理缓存
const textureCache = {};
let proceduralTexture = null;

// 共享几何体缓存（避免重复创建）
const geometryCache = {};

/**
 * 获取方块对应的几何体类型
 */
function getBlockGeometry(blockId) {
    const name = blockId.replace('minecraft:', '');

    // 铁轨类 — 扁平长条
    if (name === 'rail' || name === 'powered_rail' || name === 'detector_rail' || name === 'activator_rail') {
        return 'flat';
    }
    // 红石线
    if (name === 'redstone_wire') return 'flat';

    // 压力板
    if (name.includes('pressure_plate')) return 'slab_thin';

    // 地毯
    if (name.includes('carpet')) return 'slab_thin';

    // 按钮 — 微型
    if (name.includes('button')) return 'tiny';

    // 火把
    if (name === 'torch' || name === 'wall_torch' || name === 'soul_torch' || name === 'redstone_torch') return 'torch';

    // 灯笼
    if (name === 'lantern' || name === 'soul_lantern') return 'lantern';

    // 锁链
    if (name === 'chain') return 'pillar_thin';

    // 铁栏杆 / 玻璃板
    if (name.includes('iron_bars') || name === 'glass_pane') return 'pillar_thin';

    // 门 — 高薄板
    if (name.includes('_door')) return 'door';

    // 活板门 — 薄板
    if (name.includes('trapdoor')) return 'slab_medium';

    // 梯子
    if (name === 'ladder') return 'slab_medium';

    // 花朵/植物类 — 十字交叉
    const flowers = [
        'dandelion', 'poppy', 'blue_orchid', 'allium', 'azure_bluet',
        'red_tulip', 'orange_tulip', 'white_tulip', 'pink_tulip',
        'oxeye_daisy', 'cornflower', 'lily_of_the_valley', 'wither_rose',
        'sunflower', 'lilac', 'rose_bush', 'peony',
        'red_mushroom', 'brown_mushroom',
        'fern', 'large_fern', 'dead_bush',
        'sugar_cane', 'bamboo', 'cactus',
        'wheat', 'kelp', 'seagrass', 'tall_seagrass',
        'vine', 'glow_lichen', 'hanging_roots',
        'weeping_vines', 'twisting_vines',
    ];
    if (flowers.some(f => name === f || name.startsWith(f + '_'))) return 'cross';

    return 'full';
}

/**
 * 获取或创建指定类型的几何体
 */
function getGeometry(type) {
    if (geometryCache[type]) return geometryCache[type];

    let geo;
    switch (type) {
        case 'full':
            geo = new THREE.BoxGeometry(1, 1, 1);
            break;
        case 'flat': // 铁轨：扁平
            geo = new THREE.BoxGeometry(1, 0.0625, 1);
            break;
        case 'slab_thin': // 地毯/压力板
            geo = new THREE.BoxGeometry(1, 0.125, 1);
            break;
        case 'slab_medium': // 活板门/梯子
            geo = new THREE.BoxGeometry(1, 0.1875, 1);
            break;
        case 'tiny': // 按钮
            geo = new THREE.BoxGeometry(0.375, 0.125, 0.375);
            break;
        case 'torch': // 火把
            geo = new THREE.CylinderGeometry(0.0625, 0.0625, 0.5, 6);
            break;
        case 'lantern': // 灯笼
            geo = new THREE.CylinderGeometry(0.2, 0.2, 0.5, 6);
            break;
        case 'pillar_thin': // 锁链/栏杆
            geo = new THREE.BoxGeometry(0.125, 1, 0.125);
            break;
        case 'door': // 门
            geo = new THREE.BoxGeometry(0.1875, 1, 1);
            break;
        case 'cross': // 花朵/植物 — 用两个交叉平面
            geo = new THREE.PlaneGeometry(0.875, 0.875);
            break;
        default:
            geo = new THREE.BoxGeometry(1, 1, 1);
    }
    geometryCache[type] = geo;
    return geo;
}

/**
 * 生成 16x16 程序化纹理 → DataTexture（纯像素数组，不使用 Canvas）
 */
function createProceduralTexture() {
    const size = 16;
    const data = new Uint8Array(size * size * 4);

    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
            const idx = (y * size + x) * 4;
            const noise = (Math.random() - 0.5) * 30;
            let v = Math.floor(209 + noise); // ~0.82 * 255

            // 顶边和左边暗线
            if (x === 0 || y === 0) v -= 30;
            // 底边和右边亮线
            if (x === size - 1 || y === size - 1) v += 15;

            data[idx] = Math.max(0, Math.min(255, v));
            data[idx + 1] = Math.max(0, Math.min(255, v));
            data[idx + 2] = Math.max(0, Math.min(255, v));
            data[idx + 3] = 255;
        }
    }

    // 随机深色像素
    for (let i = 0; i < 8; i++) {
        const rx = Math.floor(Math.random() * size);
        const ry = Math.floor(Math.random() * size);
        const idx = (ry * size + rx) * 4;
        data[idx] = Math.max(0, data[idx] - 20);
        data[idx + 1] = Math.max(0, data[idx + 1] - 20);
        data[idx + 2] = Math.max(0, data[idx + 2] - 20);
    }

    const tex = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
    tex.magFilter = THREE.NearestFilter;
    tex.minFilter = THREE.NearestFilter;
    tex.needsUpdate = true;
    return tex;
}

/**
 * 获取几何体类型的 Y 轴偏移（特殊方块在方块空间内的垂直位置调整）
 */
function getGeometryYOffset(geoType) {
    switch (geoType) {
        case 'flat': return 0.53125;       // 铁轨：贴在方块顶部（底面=0.5+0.5-0.0625/2=0.5, 中心=0.53125）
        case 'slab_thin': return 0.4375;   // 地毯/压力板：靠近顶部
        case 'slab_medium': return 0.40625; // 活板门/梯子
        case 'tiny': return 0.4375;        // 按钮
        case 'torch': return 0.25;         // 火把：偏上
        case 'lantern': return 0.0;        // 灯笼：居中
        case 'cross': return 0.4375;       // 花朵/植物
        default: return 0.0;               // full, pillar_thin, door 等居中
    }
}

/**
 * 检测是否为 file:// 协议（贴图加载不可用）
 */
function isFileProtocol() {
    return window.location.protocol === 'file:';
}

/**
 * 异步加载真实贴图（仅 http:// 协议下有效）
 * 自动检测纹理中的透明像素并标记透明类型
 * file:// 协议下直接返回 null
 */
function loadTextureAsync(textureFile) {
    if (textureCache[textureFile] !== undefined) {
        return Promise.resolve(textureCache[textureFile]);
    }

    // file:// 协议无法加载外部文件，直接跳过
    if (isFileProtocol()) {
        textureCache[textureFile] = null;
        return Promise.resolve(null);
    }

    return new Promise((resolve) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = function () {
            try {
                const canvas = document.createElement('canvas');
                canvas.width = img.naturalWidth || img.width;
                canvas.height = img.naturalHeight || img.height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);

                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

                // 检测透明度：扫描 alpha 通道
                let hasTransparency = false;
                let translucentPixelCount = 0;
                const d = imageData.data;
                const pixelCount = d.length / 4;
                for (let i = 3; i < d.length; i += 4) {
                    const a = d[i];
                    if (a < 255) {
                        hasTransparency = true;
                        if (a > 10) translucentPixelCount++; // 有内容的半透明像素
                    }
                }
                // 判断透明类型：半透明像素占比高 = translucent，否则 = cutout
                const isTranslucent = hasTransparency && (translucentPixelCount / pixelCount > 0.15);

                const tex = new THREE.DataTexture(imageData.data, canvas.width, canvas.height, THREE.RGBAFormat);
                tex.magFilter = THREE.NearestFilter;
                tex.minFilter = THREE.NearestFilter;
                tex.needsUpdate = true;
                // 在纹理对象上附加透明度元数据
                tex._hasTransparency = hasTransparency;
                tex._isTranslucent = isTranslucent;
                textureCache[textureFile] = tex;
                resolve(tex);
            } catch (e) {
                textureCache[textureFile] = null;
                resolve(null);
            }
        };
        img.onerror = function () {
            textureCache[textureFile] = null;
            resolve(null);
        };
        img.src = 'textures/block/' + textureFile;
    });
}

/**
 * 初始化渲染器
 */
function initRenderer(canvasElement) {
    const container = canvasElement.parentElement;
    const width = container.clientWidth;
    const height = container.clientHeight;

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x12121e);

    camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 10000);
    camera.position.set(50, 80, 50);

    renderer = new THREE.WebGLRenderer({
        canvas: canvasElement,
        antialias: false,
        alpha: false,
        powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.shadowMap.enabled = false;

    // 环境光
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
    scene.add(ambientLight);

    // 主方向光
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
    directionalLight.position.set(1, 2, 1).normalize();
    scene.add(directionalLight);

    // 背面补光
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.3);
    fillLight.position.set(-1, 0.5, -1).normalize();
    scene.add(fillLight);

    // 底部补光
    const bottomLight = new THREE.DirectionalLight(0xffffff, 0.15);
    bottomLight.position.set(0, -1, 0).normalize();
    scene.add(bottomLight);

    // 网格
    gridHelper = new THREE.GridHelper(500, 500, 0x6666aa, 0x333366);
    gridHelper.material.opacity = 0.5;
    gridHelper.material.transparent = true;
    gridHelper.visible = false;
    gridHelper.position.y = 0; // 网格在 Y=0 的位置
    scene.add(gridHelper);

    // 坐标轴
    axesHelper = new THREE.AxesHelper(30);
    axesHelper.visible = false;
    scene.add(axesHelper);

    // 方块组
    voxelGroup = new THREE.Group();
    scene.add(voxelGroup);

    // 程序化纹理（DataTexture，安全）
    proceduralTexture = createProceduralTexture();

    // 轨道控制器
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.minPolarAngle = 0.1;
    controls.maxPolarAngle = Math.PI - 0.1;
    controls.minDistance = 5;
    controls.autoRotate = false;
    controls.autoRotateSpeed = 2.0;

    window.addEventListener('resize', onResize);
    animate();
}

function animate() {
    animationId = requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

function onResize() {
    const container = document.getElementById('canvas-container');
    if (!container) return;
    const width = container.clientWidth;
    const height = container.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
}

/**
 * 渲染体素方块
 * 按几何体类型分组，每种类型创建独立的 InstancedMesh
 */
function renderVoxels(voxelData, isInternalCall = false) {
    dispose();

    if (!voxelData || voxelData.length === 0) {
        console.warn('没有可渲染的方块数据');
        return;
    }

    // 只在首次加载文件时保存原始数据（非内部调用）
    if (!isInternalCall) {
        originalVoxelData = JSON.parse(JSON.stringify(voxelData));
        currentVoxelData = voxelData;
        isFlipped = false;
    }

    console.log('[渲染] 开始渲染', voxelData.length, '个方块');
    console.log('[渲染] 方块坐标范围:', 
        Math.min(...voxelData.map(v => v.y)), '到',
        Math.max(...voxelData.map(v => v.y)));
    
    // 检查纹理文件是否存在
    checkTextureFiles(voxelData);

    // 计算包围盒
    let minX = Infinity, minY = Infinity, minZ = Infinity;
    let maxX = -Infinity, maxY = -Infinity, maxZ = -Infinity;
    for (const v of voxelData) {
        if (v.x < minX) minX = v.x;
        if (v.y < minY) minY = v.y;
        if (v.z < minZ) minZ = v.z;
        if (v.x > maxX) maxX = v.x;
        if (v.y > maxY) maxY = v.y;
        if (v.z > maxZ) maxZ = v.z;
    }

    // 按几何体类型分组
    const geoGroups = {};
    for (const v of voxelData) {
        const geoType = getBlockGeometry(v.blockId);
        if (!geoGroups[geoType]) geoGroups[geoType] = [];
        geoGroups[geoType].push(v);
    }

    // 为每组创建 InstancedMesh
    const matrix = new THREE.Matrix4();
    const color = new THREE.Color();
    const rotationMatrix = new THREE.Matrix4();
    const rotY45 = new THREE.Matrix4().makeRotationY(Math.PI / 4);
    const quat = new THREE.Quaternion();

    console.log('[渲染] 开始处理几何体类型:', Object.keys(geoGroups).length, '种');
    
    for (const [geoType, voxels] of Object.entries(geoGroups)) {
        console.log(`[渲染] 处理几何体类型: ${geoType}, 方块数量: ${voxels.length}`);
        
        const geometry = getGeometry(geoType);
        const edgesGeometry = new THREE.EdgesGeometry(geometry);

        const solidMaterial = new THREE.MeshPhongMaterial({
            color: 0xffffff,
            map: proceduralTexture,
            flatShading: true,
            shininess: 2,
            side: geoType === 'cross' ? THREE.DoubleSide : THREE.FrontSide,
        });

        const wireMaterial = new THREE.LineBasicMaterial({ color: 0x00e5ff });

        const blockMesh = new THREE.InstancedMesh(geometry, solidMaterial, voxels.length);
        blockMesh.userData.voxelData = voxels;
        blockMesh.userData.geoType = geoType;

        const wireMesh = new THREE.InstancedMesh(edgesGeometry, wireMaterial, voxels.length);
        wireMesh.visible = false;
        wireMesh.userData.voxelData = voxels;
        wireMesh.userData.geoType = geoType;

        for (let i = 0; i < voxels.length; i++) {
            const v = voxels[i];
            const hexColor = getBlockColor(v.blockId);
            color.set(hexColor);

            const yOff = getGeometryYOffset(geoType);
            // 应用全局 Y 轴偏移
            matrix.setPosition(v.x, v.y + yOff + yOffsetOffset, v.z);

            blockMesh.setMatrixAt(i, matrix);
            wireMesh.setMatrixAt(i, matrix);
            blockMesh.setColorAt(i, color);
            wireMesh.setColorAt(i, color.clone().multiplyScalar(0.3).addScalar(0.7));
        }

        blockMesh.instanceMatrix.needsUpdate = true;
        if (blockMesh.instanceColor) blockMesh.instanceColor.needsUpdate = true;
        wireMesh.instanceMatrix.needsUpdate = true;
        if (wireMesh.instanceColor) wireMesh.instanceColor.needsUpdate = true;

        voxelGroup.add(blockMesh);
        voxelGroup.add(wireMesh);

        // cross 类型额外添加旋转 45° 的第二组平面
        if (geoType === 'cross') {
            const crossMesh2 = new THREE.InstancedMesh(geometry, solidMaterial.clone(), voxels.length);
            crossMesh2.material.side = THREE.DoubleSide;
            crossMesh2.userData.voxelData = voxels;
            crossMesh2.userData.geoType = 'cross';

            for (let i = 0; i < voxels.length; i++) {
                const v = voxels[i];
                const hexColor = getBlockColor(v.blockId);
                color.set(hexColor);
                matrix.identity();
                matrix.makeRotationY(Math.PI / 4);
                const yOffCross = getGeometryYOffset(geoType);
                matrix.setPosition(v.x, v.y + yOffCross, v.z);
                crossMesh2.setMatrixAt(i, matrix);
                crossMesh2.setColorAt(i, color);
            }

            crossMesh2.instanceMatrix.needsUpdate = true;
            if (crossMesh2.instanceColor) crossMesh2.instanceColor.needsUpdate = true;
            voxelGroup.add(crossMesh2);
        }
    }

    // 调整网格
    const gridSize = Math.max(maxX - minX + 50, maxZ - minZ + 50, 200);
    const gridDivisions = Math.min(Math.max(gridSize, 100), 500);
    scene.remove(gridHelper);
    gridHelper = new THREE.GridHelper(gridSize, gridDivisions, 0x6666aa, 0x333366);
    gridHelper.material.opacity = 0.5;
    gridHelper.material.transparent = true;
    gridHelper.visible = false;
    gridHelper.position.y = 0; // 网格在 Y=0 的位置
    scene.add(gridHelper);

    scene.remove(axesHelper);
    axesHelper = new THREE.AxesHelper(Math.max(maxX - minX, maxY - minY, maxZ - minZ, 20));
    axesHelper.visible = false;
    scene.add(axesHelper);

    // 调整相机
    const centerX = (minX + maxX) / 2;
    const centerY = (minY + maxY) / 2;
    const centerZ = (minZ + maxZ) / 2;
    const diagonal = Math.sqrt(Math.pow(maxX - minX, 2) + Math.pow(maxY - minY, 2) + Math.pow(maxZ - minZ, 2));
    const distance = Math.max(diagonal * 1.2, 20);

    camera.position.set(centerX + distance * 0.7, centerY + distance * 0.5, centerZ + distance * 0.7);
    controls.target.set(centerX, centerY, centerZ);
    controls.minDistance = Math.max(distance * 0.05, 5);
    controls.maxDistance = distance * 5;
    controls.update();

    initialCameraPosition.copy(camera.position);
    initialTarget.copy(controls.target);

    // 更新图层滑块
    const layerMinEl = document.getElementById('layer-min');
    const layerMaxEl = document.getElementById('layer-max');
    if (layerMinEl && layerMaxEl) {
        layerMinEl.min = minY; layerMinEl.max = maxY; layerMinEl.value = minY;
        layerMaxEl.min = minY; layerMaxEl.max = maxY; layerMaxEl.value = maxY;
        const minLabel = document.getElementById('layer-min-label');
        const maxLabel = document.getElementById('layer-max-label');
        if (minLabel) minLabel.textContent = minY;
        if (maxLabel) maxLabel.textContent = maxY;
    }
    
    // 后台异步加载真实 Minecraft 贴图
    loadRealTextures(voxelData);
}

/**
 * 后台异步加载真实 Minecraft 贴图
 * 支持 6 面独立纹理（east/west/up/down/south/north）和透明度
 */
function loadRealTextures(voxelData) {
    // 收集所有方块 ID
    const blockIds = [...new Set(voxelData.map(v => v.blockId))];

    // 构建每个方块的 6 面纹理文件列表，收集所有唯一纹理文件
    const blockFaceMap = {};  // blockId → string[6]
    const allFiles = new Set();

    for (const blockId of blockIds) {
        // 优先使用自定义贴图配置
        const customConfig = typeof getCustomTextureConfig === 'function' ? getCustomTextureConfig(blockId) : null;
        let faceFiles = null;

        if (customConfig && Object.keys(customConfig).length > 0) {
            // 使用自定义配置
            faceFiles = [
                customConfig.east || customConfig.north || customConfig.top || '',
                customConfig.west || customConfig.north || customConfig.top || '',
                customConfig.top || '',
                customConfig.bottom || customConfig.top || '',
                customConfig.south || customConfig.north || customConfig.top || '',
                customConfig.north || customConfig.top || ''
            ];
        }

        // 如果没有自定义配置，使用默认映射
        if (!faceFiles || faceFiles.every(f => !f)) {
            faceFiles = resolveBlockFaceTextures(blockId);
            if (faceFiles) {
                blockFaceMap[blockId] = faceFiles;
                faceFiles.forEach(f => allFiles.add(f));
                continue;
            } else {
                // 回退到单纹理
                const file = getBlockTextureFile(blockId);
                if (file) {
                    const six = [file, file, file, file, file, file];
                    blockFaceMap[blockId] = six;
                    allFiles.add(file);
                    continue;
                } else {
                    // 完全没有纹理配置，使用程序化纹理（不添加到 blockFaceMap）
                    console.warn('[贴图] 方块', blockId, '没有纹理配置，将使用程序化纹理');
                }
            }
        }

        // 使用自定义配置或默认配置
        if (faceFiles && faceFiles.some(f => f)) {
            blockFaceMap[blockId] = faceFiles;
            faceFiles.forEach(f => { if (f) allFiles.add(f); });
        }
    }

    if (allFiles.size === 0) {
        console.warn('[贴图] 没有找到任何可加载的纹理文件');
        return;
    }

    // file:// 协议下无法加载贴图
    if (isFileProtocol()) {
        console.log('[贴图] file:// 协议下无法加载贴图，使用程序化纹理。请使用"启动服务器.bat"以启用真实贴图。');
        if (typeof window.showToast === 'function') {
            window.showToast('提示: 双击"启动服务器.bat"可启用真实方块贴图', 'info');
        }
        return;
    }

    console.log('[贴图] 开始加载', allFiles.size, '个纹理文件...');

    // 加载所有纹理（缓存自动去重）
    const loadPromises = [...allFiles].map(f => loadTextureAsync(f));

    Promise.all(loadPromises).then(() => {
        const matrix = new THREE.Matrix4();
        const color = new THREE.Color();
        const zeroMatrix = new THREE.Matrix4().makeScale(0, 0, 0);
        const newMeshes = [];
        let loadedCount = 0;

        for (const [blockId, faceFiles] of Object.entries(blockFaceMap)) {
            const textures = faceFiles.map(f => {
                const tex = textureCache[f];
                if (!tex) {
                    console.warn('[贴图] 方块', blockId, '的纹理', f, '加载失败，使用程序化纹理');
                    return proceduralTexture;
                }
                return tex;
            });

            const matchedVoxels = voxelData.filter(v => v.blockId === blockId);
            if (matchedVoxels.length === 0) {
                console.warn('[贴图] 方块', blockId, '没有匹配的体素数据');
                continue;
            }
            
            console.log(`[贴图] 方块 ${blockId}, 匹配体素数量: ${matchedVoxels.length}`);

            const geoType = getBlockGeometry(blockId);
            const geometry = getGeometry(geoType);
            const yOffset = getGeometryYOffset(geoType);

            const isBoxGeo = ['full', 'door', 'flat', 'slab_thin', 'slab_medium', 'pillar_thin', 'tiny'].includes(geoType);

            let materials;
            if (isBoxGeo) {
                materials = textures.map(tex => {
                    const mat = new THREE.MeshPhongMaterial({
                        color: 0xffffff,
                        map: tex,
                        flatShading: true,
                        shininess: 2,
                    });
                    applyTransparency(mat, tex);
                    return mat;
                });
                
                // 对活塞类方块交换上下贴图（索引 2 和 3）
                // Three.js BoxGeometry 的材质索引：[0]=right [1]=left [2]=top [3]=bottom [4]=front [5]=back
                // 活塞方块需要交换上下才能正确显示
                if (blockId === 'minecraft:piston' || blockId === 'minecraft:sticky_piston') {
                    if (materials.length >= 4) {
                        const temp = materials[2];
                        materials[2] = materials[3];
                        materials[3] = temp;
                    }
                }
            }

            const mesh = new THREE.InstancedMesh(geometry, materials, matchedVoxels.length);
            mesh.userData.voxelData = matchedVoxels;
            mesh.userData.geoType = geoType;
            mesh.renderOrder = isAnyTranslucent(textures) ? 1 : 0;
            newMeshes.push(mesh);

            for (let i = 0; i < matchedVoxels.length; i++) {
                const v = matchedVoxels[i];
                matrix.setPosition(v.x, v.y + yOffset, v.z);
                mesh.setMatrixAt(i, matrix);
                mesh.setColorAt(i, color.set(0xffffff));
            }
            mesh.instanceMatrix.needsUpdate = true;
            if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
            voxelGroup.add(mesh);

            if (geoType === 'cross') {
                const mat2 = (() => {
                    if (Array.isArray(materials)) {
                        return materials.map(m => {
                            const c = m.clone();
                            c.side = THREE.DoubleSide;
                            c.transparent = true;
                            c.alphaTest = 0.1;
                            return c;
                        });
                    }
                    return materials.clone();
                })();
                const crossMesh2 = new THREE.InstancedMesh(geometry, mat2, matchedVoxels.length);
                crossMesh2.userData.voxelData = matchedVoxels;
                crossMesh2.userData.geoType = 'cross';
                crossMesh2.renderOrder = 1;
                newMeshes.push(crossMesh2);
                for (let i = 0; i < matchedVoxels.length; i++) {
                    const v = matchedVoxels[i];
                    matrix.identity();
                    matrix.makeRotationY(Math.PI / 4);
                    // 应用全局 Y 轴偏移
                    matrix.setPosition(v.x, v.y + yOffset + yOffsetOffset, v.z);
                    crossMesh2.setMatrixAt(i, matrix);
                    crossMesh2.setColorAt(i, color.set(0xffffff));
                }
                crossMesh2.instanceMatrix.needsUpdate = true;
                if (crossMesh2.instanceColor) crossMesh2.instanceColor.needsUpdate = true;
                voxelGroup.add(crossMesh2);
            }

            voxelGroup.children.forEach(child => {
                if (newMeshes.includes(child)) return;
                if (!child.isInstancedMesh) return;
                const childVoxels = child.userData.voxelData;
                if (!childVoxels) return;
                let needUpdate = false;
                for (let i = 0; i < childVoxels.length; i++) {
                    if (childVoxels[i].blockId === blockId) {
                        child.setMatrixAt(i, zeroMatrix);
                        needUpdate = true;
                    }
                }
                if (needUpdate) child.instanceMatrix.needsUpdate = true;
            });

            loadedCount++;
        }

        if (loadedCount > 0 && typeof window.showToast === 'function') {
            window.showToast('已加载 ' + loadedCount + ' 个方块贴图', 'success');
        }
    });
}

/**
 * 根据纹理的透明度元数据设置材质属性
 * - cutout（裁切）: alpha < 255 的像素被丢弃（树叶、花朵等）
 * - translucent（半透明）: alpha 混合，关闭深度写入（玻璃、冰等）
 */
function applyTransparency(mat, tex) {
    if (!tex._hasTransparency) return;

    mat.transparent = true;
    if (tex._isTranslucent) {
        // 半透明（玻璃、冰）：使用 alpha 混合，禁用深度写入避免遮挡错误
        mat.depthWrite = false;
        mat.side = THREE.DoubleSide;
    } else {
        // 裁切（树叶、植物）：丢弃低 alpha 像素
        mat.alphaTest = 0.1;
    }
}

/**
 * 检查纹理数组中是否有任何半透明纹理
 */
function isAnyTranslucent(textures) {
    return textures.some(t => t && t._isTranslucent);
}

function toggleWireframe(enabled) {
    if (voxelGroup.children.length === 0) return;

    // 收集所有实体 mesh 和线框 mesh（按 material 类型区分）
    const solidMeshes = [];
    const wireMeshes = [];
    voxelGroup.children.forEach(child => {
        if (child.isInstancedMesh) {
            const mat = Array.isArray(child.material) ? child.material[0] : child.material;
            if (mat && mat.isLineBasicMaterial) {
                wireMeshes.push(child);
            } else {
                solidMeshes.push(child);
            }
        }
    });

    // 辅助函数：对所有材质（数组或单个）执行操作
    function applyToMaterials(mesh, fn) {
        if (Array.isArray(mesh.material)) {
            mesh.material.forEach(fn);
        } else {
            fn(mesh.material);
        }
    }

    if (enabled) {
        if (currentMode === 'solid') {
            currentMode = 'wireframe';
            solidMeshes.forEach(m => m.visible = false);
            wireMeshes.forEach(m => m.visible = true);
        } else if (currentMode === 'wireframe') {
            currentMode = 'both';
            solidMeshes.forEach(m => {
                m.visible = true;
                applyToMaterials(m, mat => {
                    mat.opacity = 0.3;
                    mat.transparent = true;
                    mat.needsUpdate = true;
                });
            });
            wireMeshes.forEach(m => m.visible = true);
        } else {
            currentMode = 'solid';
            solidMeshes.forEach(m => {
                m.visible = true;
                applyToMaterials(m, mat => {
                    mat.opacity = 1.0;
                    mat.transparent = false;
                    mat.needsUpdate = true;
                });
            });
            wireMeshes.forEach(m => m.visible = false);
        }
    } else {
        currentMode = 'solid';
        solidMeshes.forEach(m => {
            m.visible = true;
            applyToMaterials(m, mat => {
                mat.opacity = 1.0;
                mat.transparent = false;
                mat.needsUpdate = true;
            });
        });
        wireMeshes.forEach(m => m.visible = false);
    }
}

function setLayerRange(minY, maxY) {
    const matrix = new THREE.Matrix4();
    const position = new THREE.Vector3();
    const quaternion = new THREE.Quaternion();
    const scale = new THREE.Vector3();

    voxelGroup.children.forEach(child => {
        if (!child.isInstancedMesh) return;
        const voxelData = child.userData.voxelData;
        if (!voxelData) return;
        const geoType = child.userData.geoType;
        const yOffset = geoType ? getGeometryYOffset(geoType) : 0;
        for (let i = 0; i < voxelData.length; i++) {
            const v = voxelData[i];
            const inRange = v.y >= minY && v.y <= maxY;
            scale.set(inRange ? 1 : 0, inRange ? 1 : 0, inRange ? 1 : 0);
            matrix.compose(position.set(v.x, inRange ? v.y + yOffset : v.y - 10000, v.z), quaternion, scale);
            child.setMatrixAt(i, matrix);
        }
        child.instanceMatrix.needsUpdate = true;
    });
}

function resetCamera() {
    camera.position.copy(initialCameraPosition);
    controls.target.copy(initialTarget);
    controls.update();
}

function setAutoRotate(enabled) {
    controls.autoRotate = enabled;
    controls.autoRotateSpeed = 2.0;
}

function toggleAxes(visible) { if (axesHelper) axesHelper.visible = visible; }
function toggleGrid(visible) { if (gridHelper) gridHelper.visible = visible; }

function dispose() {
    while (voxelGroup.children.length > 0) {
        const child = voxelGroup.children[0];
        
        // 只处理 InstancedMesh 对象
        if (!child.isInstancedMesh) {
            voxelGroup.remove(child);
            continue;
        }
        
        if (child.material) {
            if (Array.isArray(child.material)) {
                child.material.forEach(m => {
                    // 检查 map 是否存在再释放
                    if (m.map && typeof m.map.dispose === 'function') {
                        m.map.dispose();
                    }
                    m.dispose();
                });
            } else {
                if (child.material.map && typeof child.material.map.dispose === 'function') {
                    child.material.map.dispose();
                }
                child.material.dispose();
            }
        }
    }
    currentBlockMesh = null;
    currentWireMesh = null;
    currentMode = 'solid';
    
    // 清除纹理缓存
    for (const key in textureCache) {
        if (textureCache[key] && textureCache[key] !== proceduralTexture) {
            textureCache[key].dispose();
        }
    }
    Object.keys(textureCache).forEach(key => delete textureCache[key]);
}

function storeVoxelData(voxelData) {}

/**
 * 检查纹理文件是否存在
 * @param {Array} voxelData - 体素数据数组
 */
function checkTextureFiles(voxelData) {
    if (typeof window === 'undefined' || !window.fetch) {
        console.warn('[纹理检查] window.fetch 不可用，跳过纹理文件检查');
        return;
    }

    console.log('[纹理检查] 开始检查纹理文件...');
    
    const blockIds = [...new Set(voxelData.map(v => v.blockId))];
    const allFiles = new Set();
    
    // 收集所有需要的纹理文件
    for (const blockId of blockIds) {
        const faceTextures = resolveBlockFaceTextures(blockId);
        if (faceTextures) {
            faceTextures.forEach(f => { if (f) allFiles.add(f); });
        } else {
            const singleFile = getBlockTextureFile(blockId);
            if (singleFile) allFiles.add(singleFile);
        }
    }
    
    const filesToCheck = Array.from(allFiles);
    let checkedCount = 0;
    let missingCount = 0;
    const missingFiles = [];
    
    // 检查每个文件是否存在
    const checkNext = (index) => {
        if (index >= filesToCheck.length) {
            console.log(`[纹理检查] 完成！共 ${filesToCheck.length} 个文件，${missingCount} 个缺失`);
            if (missingCount > 0) {
                console.warn('[纹理检查] 缺失的纹理文件:');
                missingFiles.forEach(f => console.warn(`  - ${f}`));
            }
            return;
        }
        
        const file = filesToCheck[index];
        fetch(`textures/block/${file}`)
            .then(response => {
                if (response.ok) {
                    checkedCount++;
                } else {
                    missingCount++;
                    missingFiles.push(file);
                }
                checkNext(index + 1);
            })
            .catch(error => {
                console.warn(`[纹理检查] 检查 ${file} 时出错:`, error);
                checkNext(index + 1);
            });
    };
    
    // 开始检查（每次并发检查 5 个文件）
    let currentIndex = 0;
    const batchSize = 5;
    const checkBatch = () => {
        const endIndex = Math.min(currentIndex + batchSize, filesToCheck.length);
        for (let i = currentIndex; i < endIndex; i++) {
            checkNext(i);
        }
        currentIndex = endIndex;
        if (currentIndex < filesToCheck.length) {
            setTimeout(checkBatch, 100);
        }
    };
    
    checkBatch();
}

/**
 * 垂直翻转投影
 * 将所有方块的 Y 坐标翻转
 */
function flipVertical() {
    if (originalVoxelData.length === 0) {
        if (typeof window.showToast === 'function') {
            window.showToast('请先加载投影文件', 'error');
        }
        return;
    }

    // 计算包围盒
    let minY = Infinity, maxY = -Infinity;
    for (const v of originalVoxelData) {
        if (v.y < minY) minY = v.y;
        if (v.y > maxY) maxY = v.y;
    }

    // 翻转所有方块的 Y 坐标
    if (!isFlipped) {
        // 翻转
        currentVoxelData = originalVoxelData.map(v => ({
            ...v,
            y: (maxY + minY) - v.y
        }));
        isFlipped = true;
    } else {
        // 恢复
        currentVoxelData = JSON.parse(JSON.stringify(originalVoxelData));
        isFlipped = false;
    }

    // 重新渲染（使用内部调用，不重置翻转状态）
    renderVoxels(currentVoxelData, true);

    if (typeof window.showToast === 'function') {
        window.showToast(isFlipped ? '已翻转' : '已恢复', 'success');
    }
}

/**
 * 导出翻转后的 Litematic 文件
 */
function exportFlippedLitematic() {
    if (currentVoxelData.length === 0) {
        if (typeof window.showToast === 'function') {
            window.showToast('请先加载投影文件', 'error');
        }
        return;
    }

    if (!isFlipped) {
        if (typeof window.showToast === 'function') {
            window.showToast('请先翻转投影', 'error');
        }
        return;
    }

    // 注意：这里需要完整的 Litematic 写入功能
    // 由于 Litematic 格式复杂，这里提供一个简化的提示
    if (typeof window.showToast === 'function') {
        window.showToast('导出功能需要完整的 Litematic 写入支持，当前暂不可用', 'warning');
    }

    console.log('导出翻转后的数据:', currentVoxelData);
}
