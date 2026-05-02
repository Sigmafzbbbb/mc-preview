/**
 * 贴图设置模块
 * 允许用户自定义每个方块的六个面的贴图
 */

// 用户自定义的贴图配置存储
let customTextureConfig = {};

// 默认配置存储（用于重置）
const defaultTextureConfig = {};

/**
 * 初始化贴图设置
 */
function initTextureSettings() {
    // 加载保存的配置
    loadTextureConfig();

    // 绑定事件
    bindTextureModalEvents();

    // 初始化方块选择器
    populateBlockSelector();
}

/**
 * 绑定贴图模态框事件
 */
function bindTextureModalEvents() {
    const textureModal = document.getElementById('texture-modal');
    const textureModalClose = document.getElementById('texture-modal-close');
    const btnTextures = document.getElementById('btn-textures');
    const blockSelect = document.getElementById('block-select');

    // 打开模态框
    if (btnTextures) {
        btnTextures.addEventListener('click', () => {
            textureModal.classList.add('active');
            populateBlockSelector();
        });
    }

    // 关闭模态框
    if (textureModalClose) {
        textureModalClose.addEventListener('click', () => {
            textureModal.classList.remove('active');
        });
    }

    // 点击遮罩层关闭
    if (textureModal) {
        textureModal.addEventListener('click', (e) => {
            if (e.target === textureModal) {
                textureModal.classList.remove('active');
            }
        });
    }

    // 方块选择变化
    if (blockSelect) {
        blockSelect.addEventListener('change', (e) => {
            const blockId = e.target.value;
            if (blockId) {
                loadBlockTextureConfig(blockId);
            } else {
                clearTextureInputs();
            }
        });
    }

    // 绑定贴图输入框事件
    bindTextureInputEvents();

    // 绑定快捷按钮事件
    bindQuickButtonEvents();

    // 绑定导入导出事件
    bindImportExportEvents();
}

/**
 * 填充方块选择器
 */
function populateBlockSelector() {
    const blockSelect = document.getElementById('block-select');
    if (!blockSelect) return;

    // 清空现有选项
    blockSelect.innerHTML = '<option value="">-- 请选择方块 --</option>';

    // 获取所有已知的方块
    const blockIds = Object.keys(BLOCK_NAMES_CN || {}).sort();

    // 添加选项
    blockIds.forEach(blockId => {
        const option = document.createElement('option');
        option.value = blockId;
        option.textContent = BLOCK_NAMES_CN[blockId] || blockId;
        blockSelect.appendChild(option);
    });
}

/**
 * 加载方块贴图配置到输入框
 */
function loadBlockTextureConfig(blockId) {
    const config = customTextureConfig[blockId] || {};

    // 尝试从默认配置获取
    if (!config || Object.keys(config).length === 0) {
        const defaultConfig = getBlockFaceTextures(blockId);
        if (defaultConfig) {
            config.top = defaultConfig.top || '';
            config.bottom = defaultConfig.bottom || '';
            config.north = defaultConfig.north || '';
            config.south = defaultConfig.south || '';
            config.east = defaultConfig.east || '';
            config.west = defaultConfig.west || '';
        }
    }

    // 填充输入框
    document.getElementById('texture-top').value = config.top || '';
    document.getElementById('texture-bottom').value = config.bottom || '';
    document.getElementById('texture-north').value = config.north || '';
    document.getElementById('texture-south').value = config.south || '';
    document.getElementById('texture-east').value = config.east || '';
    document.getElementById('texture-west').value = config.west || '';
}

/**
 * 清空贴图输入框
 */
function clearTextureInputs() {
    document.getElementById('texture-top').value = '';
    document.getElementById('texture-bottom').value = '';
    document.getElementById('texture-north').value = '';
    document.getElementById('texture-south').value = '';
    document.getElementById('texture-east').value = '';
    document.getElementById('texture-west').value = '';
}

/**
 * 绑定贴图输入框事件
 */
function bindTextureInputEvents() {
    const blockSelect = document.getElementById('block-select');
    const inputs = [
        'texture-top',
        'texture-bottom',
        'texture-north',
        'texture-south',
        'texture-east',
        'texture-west'
    ];

    inputs.forEach(inputId => {
        const input = document.getElementById(inputId);
        if (input) {
            input.addEventListener('input', () => {
                const blockId = blockSelect.value;
                if (blockId) {
                    saveCurrentBlockConfig(blockId);
                }
            });
        }
    });
}

/**
 * 保存当前方块的配置
 */
function saveCurrentBlockConfig(blockId) {
    if (!customTextureConfig[blockId]) {
        customTextureConfig[blockId] = {};
    }

    customTextureConfig[blockId] = {
        top: document.getElementById('texture-top').value,
        bottom: document.getElementById('texture-bottom').value,
        north: document.getElementById('texture-north').value,
        south: document.getElementById('texture-south').value,
        east: document.getElementById('texture-east').value,
        west: document.getElementById('texture-west').value
    };

    // 保存到localStorage
    saveTextureConfig();
}

/**
 * 绑定快捷按钮事件
 */
function bindQuickButtonEvents() {
    const btnFillAll = document.getElementById('btn-fill-all');
    const btnFillSides = document.getElementById('btn-fill-sides');
    const btnResetBlock = document.getElementById('btn-reset-block');

    if (btnFillAll) {
        btnFillAll.addEventListener('click', fillAllFaces);
    }

    if (btnFillSides) {
        btnFillSides.addEventListener('click', fillSideFaces);
    }

    if (btnResetBlock) {
        btnResetBlock.addEventListener('click', resetCurrentBlock);
    }
}

/**
 * 六面相同（使用顶面贴图）
 */
function fillAllFaces() {
    const topTexture = document.getElementById('texture-top').value;
    if (!topTexture) {
        window.showToast('请先设置顶面贴图', 'info');
        return;
    }

    document.getElementById('texture-bottom').value = topTexture;
    document.getElementById('texture-north').value = topTexture;
    document.getElementById('texture-south').value = topTexture;
    document.getElementById('texture-east').value = topTexture;
    document.getElementById('texture-west').value = topTexture;

    // 触发输入事件以保存
    const blockSelect = document.getElementById('block-select');
    if (blockSelect.value) {
        saveCurrentBlockConfig(blockSelect.value);
    }

    window.showToast('已设置六面相同', 'success');
}

/**
 * 四侧相同（使用北面贴图）
 */
function fillSideFaces() {
    const northTexture = document.getElementById('texture-north').value;
    if (!northTexture) {
        window.showToast('请先设置北面贴图', 'info');
        return;
    }

    document.getElementById('texture-south').value = northTexture;
    document.getElementById('texture-east').value = northTexture;
    document.getElementById('texture-west').value = northTexture;

    // 触发输入事件以保存
    const blockSelect = document.getElementById('block-select');
    if (blockSelect.value) {
        saveCurrentBlockConfig(blockSelect.value);
    }

    window.showToast('已设置四侧相同', 'success');
}

/**
 * 重置当前方块配置
 */
function resetCurrentBlock() {
    const blockSelect = document.getElementById('block-select');
    const blockId = blockSelect.value;

    if (!blockId) {
        window.showToast('请先选择方块', 'info');
        return;
    }

    // 删除自定义配置
    delete customTextureConfig[blockId];

    // 重新加载默认配置
    loadBlockTextureConfig(blockId);

    // 保存更新
    saveTextureConfig();

    window.showToast('已重置为默认配置', 'success');
}

/**
 * 绑定导入导出事件
 */
function bindImportExportEvents() {
    const btnExport = document.getElementById('btn-export');
    const btnImport = document.getElementById('btn-import');
    const btnSaveAll = document.getElementById('btn-save-all');
    const btnClearAll = document.getElementById('btn-clear-all');

    if (btnExport) {
        btnExport.addEventListener('click', exportTextureConfig);
    }

    if (btnImport) {
        btnImport.addEventListener('click', importTextureConfig);
    }

    if (btnSaveAll) {
        btnSaveAll.addEventListener('click', () => {
            saveTextureConfig();
            window.showToast('配置已保存', 'success');
        });
    }

    if (btnClearAll) {
        btnClearAll.addEventListener('click', clearAllConfigs);
    }
}

/**
 * 导出贴图配置
 */
function exportTextureConfig() {
    const config = {
        version: '1.0',
        timestamp: new Date().toISOString(),
        textures: customTextureConfig
    };

    const json = JSON.stringify(config, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'texture-config.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    window.showToast('配置已导出', 'success');
}

/**
 * 导入贴图配置
 */
function importTextureConfig() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';

    input.onchange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const config = JSON.parse(event.target.result);

                if (!config.textures || typeof config.textures !== 'object') {
                    throw new Error('无效的配置文件格式');
                }

                // 合并配置
                customTextureConfig = { ...customTextureConfig, ...config.textures };

                // 保存
                saveTextureConfig();

                window.showToast('配置已导入', 'success');

                // 如果当前有选中的方块，重新加载配置
                const blockSelect = document.getElementById('block-select');
                if (blockSelect.value) {
                    loadBlockTextureConfig(blockSelect.value);
                }
            } catch (error) {
                console.error('导入配置失败:', error);
                window.showErrorDialog('导入配置失败: ' + error.message);
            }
        };
        reader.readAsText(file);
    };

    input.click();
}

/**
 * 清空所有配置
 */
function clearAllConfigs() {
    if (!confirm('确定要清空所有自定义贴图配置吗？此操作不可恢复。')) {
        return;
    }

    customTextureConfig = {};
    saveTextureConfig();

    // 清空当前输入框
    const blockSelect = document.getElementById('block-select');
    if (blockSelect.value) {
        loadBlockTextureConfig(blockSelect.value);
    }

    window.showToast('所有配置已清空', 'success');
}

/**
 * 保存贴图配置到 localStorage
 */
function saveTextureConfig() {
    try {
        localStorage.setItem('litematic-texture-config', JSON.stringify(customTextureConfig));
    } catch (error) {
        console.error('保存配置失败:', error);
    }
}

/**
 * 从 localStorage 加载贴图配置
 */
function loadTextureConfig() {
    try {
        const saved = localStorage.getItem('litematic-texture-config');
        if (saved) {
            customTextureConfig = JSON.parse(saved);
        }
    } catch (error) {
        console.error('加载配置失败:', error);
        customTextureConfig = {};
    }
}

/**
 * 获取自定义的方块贴图配置
 * @param {string} blockId - 方块ID
 * @returns {object|null} 自定义配置或null
 */
function getCustomTextureConfig(blockId) {
    if (customTextureConfig[blockId]) {
        return customTextureConfig[blockId];
    }
    return null;
}

/**
 * 检查是否有自定义配置
 * @param {string} blockId - 方块ID
 * @returns {boolean}
 */
function hasCustomTextureConfig(blockId) {
    return !!customTextureConfig[blockId];
}

// 导出函数供其他模块使用
window.initTextureSettings = initTextureSettings;
window.getCustomTextureConfig = getCustomTextureConfig;
window.hasCustomTextureConfig = hasCustomTextureConfig;
