/**
 * NBT (Named Binary Tag) 二进制格式解析器
 * 用于解析 Minecraft .litematic 文件中的 NBT 数据
 */

// NBT Tag 类型常量
const TAG_END = 0;
const TAG_BYTE = 1;
const TAG_SHORT = 2;
const TAG_INT = 3;
const TAG_LONG = 4;
const TAG_FLOAT = 5;
const TAG_DOUBLE = 6;
const TAG_BYTE_ARRAY = 7;
const TAG_STRING = 8;
const TAG_LIST = 9;
const TAG_COMPOUND = 10;
const TAG_INT_ARRAY = 11;
const TAG_LONG_ARRAY = 12;

const TAG_NAMES = {
    [TAG_END]: 'TAG_End',
    [TAG_BYTE]: 'TAG_Byte',
    [TAG_SHORT]: 'TAG_Short',
    [TAG_INT]: 'TAG_Int',
    [TAG_LONG]: 'TAG_Long',
    [TAG_FLOAT]: 'TAG_Float',
    [TAG_DOUBLE]: 'TAG_Double',
    [TAG_BYTE_ARRAY]: 'TAG_Byte_Array',
    [TAG_STRING]: 'TAG_String',
    [TAG_LIST]: 'TAG_List',
    [TAG_COMPOUND]: 'TAG_Compound',
    [TAG_INT_ARRAY]: 'TAG_Int_Array',
    [TAG_LONG_ARRAY]: 'TAG_Long_Array'
};

/**
 * Gzip 解压 — 优先使用 DecompressionStream API
 * @param {ArrayBuffer} compressedData
 * @returns {Promise<ArrayBuffer>}
 */
async function decompressGzip(compressedData) {
    // 优先使用浏览器原生 API
    if (typeof DecompressionStream !== 'undefined') {
        const blob = new Blob([compressedData]);
        const ds = new DecompressionStream('gzip');
        const stream = blob.stream().pipeThrough(ds);
        const reader = stream.getReader();
        const chunks = [];
        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            chunks.push(value);
        }
        const totalLength = chunks.reduce((acc, chunk) => acc + chunk.length, 0);
        const result = new Uint8Array(totalLength);
        let offset = 0;
        for (const chunk of chunks) {
            result.set(chunk, offset);
            offset += chunk.length;
        }
        return result.buffer;
    }

    // 备选：动态加载 pako
    if (typeof pako === 'undefined') {
        await new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/pako@2.1.0/dist/pako.min.js';
            script.onload = resolve;
            script.onerror = () => reject(new Error('无法加载 pako 库，请使用现代浏览器'));
            document.head.appendChild(script);
        });
    }
    const data = pako.ungzip(new Uint8Array(compressedData));
    return data.buffer;
}

/**
 * NBT 二进制解析器类
 */
class NBTReader {
    constructor(buffer) {
        this.buffer = buffer;
        this.view = new DataView(buffer);
        this.offset = 0;
    }

    /**
     * 读取 1 字节
     */
    readByte() {
        const val = this.view.getInt8(this.offset);
        this.offset += 1;
        return val;
    }

    /**
     * 读取无符号 1 字节
     */
    readUByte() {
        const val = this.view.getUint8(this.offset);
        this.offset += 1;
        return val;
    }

    /**
     * 读取 2 字节短整型（大端序）
     */
    readShort() {
        const val = this.view.getInt16(this.offset, false);
        this.offset += 2;
        return val;
    }

    /**
     * 读取 4 字节整型（大端序）
     */
    readInt() {
        const val = this.view.getInt32(this.offset, false);
        this.offset += 4;
        return val;
    }

    /**
     * 读取 8 字节长整型（大端序）
     */
    readLong() {
        const val = this.view.getBigInt64(this.offset, false);
        this.offset += 8;
        return val;
    }

    /**
     * 读取无符号 8 字节长整型（大端序）
     */
    readULong() {
        const val = this.view.getBigUint64(this.offset, false);
        this.offset += 8;
        return val;
    }

    /**
     * 读取 4 字节浮点数（大端序）
     */
    readFloat() {
        const val = this.view.getFloat32(this.offset, false);
        this.offset += 4;
        return val;
    }

    /**
     * 读取 8 字节双精度浮点数（大端序）
     */
    readDouble() {
        const val = this.view.getFloat64(this.offset, false);
        this.offset += 8;
        return val;
    }

    /**
     * 读取 NBT 字符串（2 字节长度前缀 + UTF-8 数据）
     */
    readString() {
        const length = this.readShort();
        if (length <= 0) return '';
        const bytes = new Uint8Array(this.buffer, this.offset, length);
        this.offset += length;
        const decoder = new TextDecoder('utf-8');
        return decoder.decode(bytes);
    }

    /**
     * 读取字节数组
     */
    readByteArray() {
        const length = this.readInt();
        const arr = [];
        for (let i = 0; i < length; i++) {
            arr.push(this.readByte());
        }
        return arr;
    }

    /**
     * 读取整数数组
     */
    readIntArray() {
        const length = this.readInt();
        const arr = [];
        for (let i = 0; i < length; i++) {
            arr.push(this.readInt());
        }
        return arr;
    }

    /**
     * 读取长整数数组
     */
    readLongArray() {
        const length = this.readInt();
        const arr = [];
        for (let i = 0; i < length; i++) {
            arr.push(this.readULong());
        }
        return arr;
    }

    /**
     * 读取一个 Tag 的载荷（不包含类型字节和名称）
     */
    readPayload(tagType) {
        switch (tagType) {
            case TAG_BYTE: return this.readByte();
            case TAG_SHORT: return this.readShort();
            case TAG_INT: return this.readInt();
            case TAG_LONG: return this.readLong();
            case TAG_FLOAT: return this.readFloat();
            case TAG_DOUBLE: return this.readDouble();
            case TAG_BYTE_ARRAY: return this.readByteArray();
            case TAG_STRING: return this.readString();
            case TAG_LIST: return this.readListPayload();
            case TAG_COMPOUND: return this.readCompoundPayload();
            case TAG_INT_ARRAY: return this.readIntArray();
            case TAG_LONG_ARRAY: return this.readLongArray();
            default:
                throw new Error(`未知的 NBT Tag 类型: ${tagType} (0x${tagType.toString(16)})`);
        }
    }

    /**
     * 读取 List 载荷
     */
    readListPayload() {
        const elementType = this.readUByte();
        const length = this.readInt();
        if (elementType === TAG_END || length === 0) {
            return [];
        }
        const list = [];
        for (let i = 0; i < length; i++) {
            list.push(this.readPayload(elementType));
        }
        return list;
    }

    /**
     * 读取 Compound 载荷
     */
    readCompoundPayload() {
        const compound = {};
        while (true) {
            const tagType = this.readUByte();
            if (tagType === TAG_END) break;

            const name = this.readString();
            const value = this.readPayload(tagType);
            compound[name] = value;
        }
        return compound;
    }
}

/**
 * 解析 NBT 数据入口函数
 * @param {ArrayBuffer} compressedBuffer - gzip 压缩的 NBT 数据
 * @returns {Promise<Object>} 解析后的 NBT 结构
 */
async function parseNBT(compressedBuffer) {
    // 1. 解压 gzip
    const decompressed = await decompressGzip(compressedBuffer);

    // 2. 创建 NBT 读取器
    const reader = new NBTReader(decompressed);

    // 3. 读取根标签（TAG_Compound）
    const rootTagType = reader.readUByte();
    if (rootTagType !== TAG_COMPOUND) {
        throw new Error(`NBT 根标签应为 TAG_Compound (10)，实际为 ${TAG_NAMES[rootTagType]} (${rootTagType})`);
    }

    // 4. 读取根标签名称（通常为空字符串）
    const rootName = reader.readString();

    // 5. 递归解析 Compound 内容
    const data = reader.readCompoundPayload();

    return data;
}
