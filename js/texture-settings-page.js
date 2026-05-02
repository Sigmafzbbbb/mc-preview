/**
 * 贴图设置页面逻辑
 * 独立页面，支持搜索和自动填充
 */

// 全局变量
let customTextureConfig = {};
let currentBlockId = null;
let currentDefaultConfig = {};

// DOM 元素
let blocksGrid, blockSearch, blockConfigPanel;
let configBlockName, panelClose;

/**
 * 初始化页面
 */
function init() {
    // 获取 DOM 元素
    blocksGrid = document.getElementById('blocks-grid');
    blockSearch = document.getElementById('block-search');
    blockConfigPanel = document.getElementById('block-config-panel');
    configBlockName = document.getElementById('config-block-name');
    panelClose = document.getElementById('panel-close');

    // 加载保存的配置
    loadTextureConfig();

    // 渲染方块列表
    renderBlocksList();

    // 绑定事件
    bindEvents();
}

/**
 * 绑定事件
 */
function bindEvents() {
    // 搜索事件
    blockSearch.addEventListener('input', handleSearch);

    // 关闭面板
    panelClose.addEventListener('click', closeConfigPanel);

    // 快捷操作按钮
    document.getElementById('btn-fill-all').addEventListener('click', fillAllFaces);
    document.getElementById('btn-fill-sides').addEventListener('click', fillSideFaces);
    document.getElementById('btn-use-current').addEventListener('click', useCurrentTextures);
    document.getElementById('btn-reset').addEventListener('click', resetBlockConfig);
    document.getElementById('btn-save').addEventListener('click', saveCurrentBlock);
    document.getElementById('btn-rotate-texture').addEventListener('click', rotateTextureFaces);

    // 导入导出
    document.getElementById('btn-export').addEventListener('click', exportConfig);
    document.getElementById('btn-import').addEventListener('click', importConfig);
    document.getElementById('btn-clear').addEventListener('click', clearAllConfigs);

    // 关闭错误弹窗
    document.getElementById('error-modal-close-btn').addEventListener('click', () => {
        document.getElementById('error-modal').classList.remove('active');
    });

    // 贴图输入框实时预览
    bindTextureInputEvents();
}

/**
 * 渲染方块列表
 */
function renderBlocksList(filter = '') {
    blocksGrid.innerHTML = '';

    const allBlocks = Object.keys(BLOCK_NAMES_CN || {}).sort();
    const filterLower = filter.toLowerCase();

    allBlocks.forEach(blockId => {
        const name = BLOCK_NAMES_CN[blockId] || blockId;

        // 搜索过滤
        if (filter) {
            const idMatch = blockId.toLowerCase().includes(filterLower);
            const nameMatch = name.toLowerCase().includes(filterLower);
            if (!idMatch && !nameMatch) return;
        }

        // 创建方块项目
        const blockItem = createBlockItem(blockId, name);
        blocksGrid.appendChild(blockItem);
    });

    // 如果没有匹配项
    if (blocksGrid.children.length === 0) {
        blocksGrid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: #64748b;">
                <p style="font-size: 1.5rem;">没有找到匹配的方块</p>
                <p style="font-size: 1.2rem; margin-top: 0.5rem;">请尝试其他关键词</p>
            </div>
        `;
    }
}

/**
 * 创建方块项目元素
 */
function createBlockItem(blockId, name) {
    const hasCustom = customTextureConfig[blockId] &&
                      Object.keys(customTextureConfig[blockId]).length > 0;

    const div = document.createElement('div');
    div.className = `block-item${hasCustom ? ' has-custom-config' : ''}`;
    div.innerHTML = `
        <div class="block-icon">
            🧊
        </div>
        <div class="block-info">
            <div class="block-name">${escapeHtml(name)}</div>
            <div class="block-id">${escapeHtml(blockId)}</div>
            <div class="custom-indicator">
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
                已自定义
            </div>
        </div>
    `;

    div.addEventListener('click', () => openBlockConfig(blockId, name));
    return div;
}

/**
 * 打开方块配置面板
 */
function openBlockConfig(blockId, name) {
    currentBlockId = blockId;
    configBlockName.textContent = name;

    // 获取当前默认配置
    currentDefaultConfig = getDefaultTextureConfig(blockId);

    // 显示当前贴图预览
    showCurrentPreview(blockId);

    // 填充自定义配置（如果有）
    fillCustomInputs(blockId);

    // 显示面板
    blockConfigPanel.style.display = 'block';

    // 添加遮罩层
    const overlay = document.createElement('div');
    overlay.className = 'config-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        backdrop-filter: blur(4px);
        z-index: 999;
    `;
    overlay.id = 'config-overlay';
    document.body.appendChild(overlay);

    // 点击遮罩关闭
    overlay.addEventListener('click', closeConfigPanel);
}

/**
 * 关闭方块配置面板
 */
function closeConfigPanel() {
    blockConfigPanel.style.display = 'none';
    const overlay = document.getElementById('config-overlay');
    if (overlay) {
        overlay.remove();
    }
    currentBlockId = null;
}

/**
 * 获取默认贴图配置
 */
function getDefaultTextureConfig(blockId) {
    const faceTextures = getBlockFaceTextures(blockId);
    const textureFile = getBlockTextureFile(blockId);

    const config = {
        top: '',
        bottom: '',
        north: '',
        south: '',
        east: '',
        west: ''
    };

    if (faceTextures) {
        // 使用多面配置
        const ft = BLOCK_FACE_TEXTURES[blockId];
        if (ft) {
            const side = ft.side || ft.east || ft.west || ft.south || ft.north || ft.front;
            const up = ft.up || ft.top;
            const down = ft.down || ft.bottom;

            config.top = up || side || '';
            config.bottom = down || side || up || '';
            config.north = ft.north || ft.front || side || up || '';
            config.south = ft.south || ft.back || side || up || '';
            config.east = ft.east || side || up || '';
            config.west = ft.west || side || up || '';
        } else {
            // 从 resolveBlockFaceTextures 获取
            config.top = faceTextures[2] || '';
            config.bottom = faceTextures[3] || '';
            config.north = faceTextures[5] || '';
            config.south = faceTextures[4] || '';
            config.east = faceTextures[0] || '';
            config.west = faceTextures[1] || '';
        }
    } else if (textureFile) {
        // 使用单纹理
        config.top = textureFile;
        config.bottom = textureFile;
        config.north = textureFile;
        config.south = textureFile;
        config.east = textureFile;
        config.west = textureFile;
    }

    return config;
}

/**
 * 显示当前贴图预览
 */
function showCurrentPreview(blockId) {
    // 获取自定义配置或默认配置
    const custom = customTextureConfig[blockId] || {};
    const def = currentDefaultConfig;

    // 合并：自定义优先
    const config = {
        top: custom.top || def.top || '',
        bottom: custom.bottom || def.bottom || '',
        north: custom.north || def.north || '',
        south: custom.south || def.south || '',
        east: custom.east || def.east || '',
        west: custom.west || def.west || ''
    };

    // 更新预览
    updatePreviewBox('top', config.top);
    updatePreviewBox('bottom', config.bottom);
    updatePreviewBox('north', config.north);
    updatePreviewBox('south', config.south);
    updatePreviewBox('east', config.east);
    updatePreviewBox('west', config.west);
}

/**
 * 更新预览框
 */
function updatePreviewBox(face, textureFile) {
    const box = document.getElementById(`preview-${face}`);
    const text = document.getElementById(`preview-text-${face}`);

    if (textureFile) {
        // 尝试加载图片
        const img = new Image();
        img.onload = () => {
            box.innerHTML = `<img src="textures/block/${escapeHtml(textureFile)}" alt="${face}">`;
        };
        img.onerror = () => {
            box.innerHTML = `<span class="preview-placeholder">✕</span>`;
        };
        img.src = `textures/block/${textureFile}`;

        text.textContent = textureFile;
    } else {
        box.innerHTML = '<span class="preview-placeholder">-</span>';
        text.textContent = '-';
    }
}

/**
 * 填充自定义输入框
 */
function fillCustomInputs(blockId) {
    const custom = customTextureConfig[blockId] || {};

    document.getElementById('input-top').value = custom.top || '';
    document.getElementById('input-bottom').value = custom.bottom || '';
    document.getElementById('input-north').value = custom.north || '';
    document.getElementById('input-south').value = custom.south || '';
    document.getElementById('input-east').value = custom.east || '';
    document.getElementById('input-west').value = custom.west || '';
}

/**
 * 使用当前贴图填充输入框
 */
function useCurrentTextures() {
    const config = currentDefaultConfig;

    document.getElementById('input-top').value = config.top || '';
    document.getElementById('input-bottom').value = config.bottom || '';
    document.getElementById('input-north').value = config.north || '';
    document.getElementById('input-south').value = config.south || '';
    document.getElementById('input-east').value = config.east || '';
    document.getElementById('input-west').value = config.west || '';

    showToast('已填充当前贴图', 'success');
}

/**
 * 绑定贴图输入框事件
 */
function bindTextureInputEvents() {
    const inputs = [
        'input-top',
        'input-bottom',
        'input-north',
        'input-south',
        'input-east',
        'input-west'
    ];

    inputs.forEach(inputId => {
        const input = document.getElementById(inputId);
        if (input) {
            input.addEventListener('input', () => {
                // 实时预览
                const face = inputId.replace('input-', '');
                const textureFile = input.value;

                if (textureFile) {
                    const previewBox = document.getElementById(`preview-${face}`);
                    const previewText = document.getElementById(`preview-text-${face}`);

                    // 尝试加载预览
                    const img = new Image();
                    img.onload = () => {
                        previewBox.innerHTML = `<img src="textures/block/${escapeHtml(textureFile)}" alt="${face}">`;
                    };
                    img.onerror = () => {
                        // 保持原样
                    };
                    img.src = `textures/block/${textureFile}`;

                    previewText.textContent = textureFile;
                }
            });
        }
    });
}

/**
 * 六面相同
 */
function fillAllFaces() {
    const topValue = document.getElementById('input-top').value;

    if (!topValue) {
        showToast('请先设置顶面贴图', 'info');
        return;
    }

    document.getElementById('input-bottom').value = topValue;
    document.getElementById('input-north').value = topValue;
    document.getElementById('input-south').value = topValue;
    document.getElementById('input-east').value = topValue;
    document.getElementById('input-west').value = topValue;

    showToast('已设置六面相同', 'success');
}

/**
 * 四侧相同
 */
function fillSideFaces() {
    const northValue = document.getElementById('input-north').value;

    if (!northValue) {
        showToast('请先设置北面贴图', 'info');
        return;
    }

    document.getElementById('input-south').value = northValue;
    document.getElementById('input-east').value = northValue;
    document.getElementById('input-west').value = northValue;

    showToast('已设置四侧相同', 'success');
}

/**
 * 旋转贴图面
 */
function rotateTextureFaces() {
    if (!currentBlockId) {
        showToast('请先选择一个方块', 'info');
        return;
    }

    const top = document.getElementById('input-top').value;
    const bottom = document.getElementById('input-bottom').value;
    const north = document.getElementById('input-north').value;
    const south = document.getElementById('input-south').value;
    const east = document.getElementById('input-east').value;
    const west = document.getElementById('input-west').value;

    // 顺时针旋转贴图面：北→东→南→西→北
    document.getElementById('input-top').value = top;
    document.getElementById('input-bottom').value = bottom;
    document.getElementById('input-north').value = west;
    document.getElementById('input-south').value = north;
    document.getElementById('input-east').value = south;
    document.getElementById('input-west').value = east;

    // 更新预览
    updatePreviewBox('top', top);
    updatePreviewBox('bottom', bottom);
    updatePreviewBox('north', west);
    updatePreviewBox('south', north);
    updatePreviewBox('east', south);
    updatePreviewBox('west', east);

    showToast('贴图已旋转（顺时针）', 'success');
}

/**
 * 重置方块配置
 */
function resetBlockConfig() {
    if (!currentBlockId) return;

    delete customTextureConfig[currentBlockId];
    saveTextureConfig();

    // 重新填充
    fillCustomInputs(currentBlockId);
    showCurrentPreview(currentBlockId);

    // 更新方块列表显示
    renderBlocksList(blockSearch.value);

    showToast('已重置为默认配置', 'success');
}

/**
 * 保存当前方块配置
 */
function saveCurrentBlock() {
    if (!currentBlockId) return;

    customTextureConfig[currentBlockId] = {
        top: document.getElementById('input-top').value,
        bottom: document.getElementById('input-bottom').value,
        north: document.getElementById('input-north').value,
        south: document.getElementById('input-south').value,
        east: document.getElementById('input-east').value,
        west: document.getElementById('input-west').value
    };

    saveTextureConfig();

    // 更新方块列表显示
    renderBlocksList(blockSearch.value);

    showToast('配置已保存', 'success');
    closeConfigPanel();
}

/**
 * 导出配置
 */
function exportConfig() {
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
    a.download = `texture-config-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showToast('配置已导出', 'success');
}

/**
 * 导入配置
 */
function importConfig() {
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

                // 刷新列表
                renderBlocksList(blockSearch.value);

                showToast(`已导入 ${Object.keys(config.textures).length} 个方块配置`, 'success');
            } catch (error) {
                console.error('导入配置失败:', error);
                showErrorDialog('导入配置失败: ' + error.message);
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

    // 刷新列表
    renderBlocksList(blockSearch.value);

    showToast('所有配置已清空', 'success');
}

/**
 * 处理搜索
 */
function handleSearch(e) {
    const filter = e.target.value.trim();
    renderBlocksList(filter);
}

/**
 * 保存配置到 localStorage
 */
function saveTextureConfig() {
    try {
        localStorage.setItem('litematic-texture-config', JSON.stringify(customTextureConfig));
    } catch (error) {
        console.error('保存配置失败:', error);
    }
}

/**
 * 从 localStorage 加载配置
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
 * 显示 Toast 提示
 */
function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast ${type} active`;

    setTimeout(() => {
        toast.classList.remove('active');
    }, 2500);
}

/**
 * 显示错误弹窗
 */
function showErrorDialog(message) {
    const errorModal = document.getElementById('error-modal');
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = message;
    errorModal.classList.add('active');
}

/**
 * HTML 转义
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', init);
