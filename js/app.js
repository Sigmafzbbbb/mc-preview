/**
 * 主应用逻辑
 * 串联所有模块，处理用户交互
 */

(function () {
    'use strict';

    // ========== 状态 ==========
    let currentVoxelData = [];
    let isWireframe = false;
    let isAutoRotate = false;
    let showAxes = false;
    let showGrid = false;

    // ========== DOM 元素 ==========
    let uploadZone, fileInput, previewSection, controlsBar;
    let canvasContainer, loadingOverlay, emptyState;
    let layerMin, layerMax, layerMinLabel, layerMaxLabel;

    // ========== 初始化 ==========
    document.addEventListener('DOMContentLoaded', init);

    function init() {
        // 获取 DOM 元素
        uploadZone = document.getElementById('upload-zone');
        fileInput = document.getElementById('file-input');
        previewSection = document.getElementById('preview-section');
        controlsBar = document.getElementById('controls-bar');
        canvasContainer = document.getElementById('canvas-container');
        loadingOverlay = document.getElementById('loading-overlay');
        emptyState = document.getElementById('empty-state');
        layerMin = document.getElementById('layer-min');
        layerMax = document.getElementById('layer-max');
        layerMinLabel = document.getElementById('layer-min-label');
        layerMaxLabel = document.getElementById('layer-max-label');

        // 初始化 Three.js 渲染器延迟到文件加载时（确保 canvas 可见）

        // 绑定上传事件
        bindUploadEvents();

        // 绑定控制面板事件
        bindControlEvents();

        // 初始化贴图设置
        if (typeof initTextureSettings === 'function') {
            initTextureSettings();
        }
    }

    // ========== 上传处理 ==========

    function bindUploadEvents() {
        // 拖拽事件
        uploadZone.addEventListener('dragenter', (e) => {
            e.preventDefault();
            uploadZone.classList.add('dragover');
        });

        uploadZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadZone.classList.add('dragover');
        });

        uploadZone.addEventListener('dragleave', (e) => {
            e.preventDefault();
            uploadZone.classList.remove('dragover');
        });

        uploadZone.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadZone.classList.remove('dragover');
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                handleFile(files[0]);
            }
        });

        // 点击上传
        uploadZone.addEventListener('click', () => {
            fileInput.click();
        });

        fileInput.addEventListener('change', () => {
            if (fileInput.files.length > 0) {
                handleFile(fileInput.files[0]);
            }
        });
    }

    function handleFile(file) {
        // 文件类型校验
        if (!file.name.toLowerCase().endsWith('.litematic')) {
            showErrorDialog('请上传 .litematic 格式的文件');
            return;
        }

        // 自动关闭上一个投影（仅在渲染器已初始化时）
        if (typeof dispose === 'function') {
            try {
                dispose();
                currentVoxelData = [];
                resetControls();
                fileInput.value = '';
            } catch (e) {
                console.warn('清理上一个投影时出错:', e);
            }
        }

        // 显示加载状态
        showLoading(true);
        showToast('正在解析文件...', 'info');

        // 读取文件
        const reader = new FileReader();
        reader.onload = async (e) => {
            try {
                const arrayBuffer = e.target.result;

                // 解析 NBT
                const nbtData = await parseNBT(arrayBuffer);

                // 读取 Litematic
                const { metadata, regions, totalBlocks, blockStats } = readLitematic(nbtData);

                if (totalBlocks === 0) {
                    showToast('文件中没有方块数据', 'error');
                    showLoading(false);
                    return;
                }

                // 性能警告
                if (totalBlocks > 1000000) {
                    showToast(`方块数量较大 (${(totalBlocks / 1000).toFixed(0)}K)，渲染可能较慢`, 'info');
                }

                // 合并所有区域的方块
                const allVoxels = [];
                for (const region of regions) {
                    for (let i = 0; i < region.voxels.length; i++) {
                        allVoxels.push(region.voxels[i]);
                    }
                }
                currentVoxelData = allVoxels;

                // 先显示预览区域（让 canvas 获得真实尺寸）
                previewSection.style.display = 'block';
                controlsBar.style.display = 'flex';
                emptyState.classList.add('hidden');

                // 初始化渲染器（首次）或更新尺寸
                if (!renderer) {
                    const canvas = document.getElementById('three-canvas');
                    initRenderer(canvas);
                } else {
                    onResize();
                }

                // 渲染 3D 场景
                renderVoxels(allVoxels);

                // 更新信息面板
                const fileInfo = getFileInfo(metadata, regions, totalBlocks, blockStats);
                updateInfoPanel(fileInfo, file);

                // 重置控制状态
                resetControls();

                showToast(`解析完成，共 ${totalBlocks.toLocaleString()} 个方块`, 'success');
            } catch (err) {
                console.error('解析文件时出错:', err);
                showLoading(false);
                showErrorDialog(`解析失败: ${err.message}`);
            } finally {
                showLoading(false);
            }
        };

        reader.onerror = () => {
            showLoading(false);
            showErrorDialog('读取文件失败');
        };

        reader.readAsArrayBuffer(file);
    }

    // ========== 信息面板 ==========

    function updateInfoPanel(data, file) {
        document.getElementById('info-name').textContent = data.name;
        document.getElementById('info-name').title = data.name;
        document.getElementById('info-size').textContent = formatFileSize(file.size);
        document.getElementById('info-author').textContent = data.author || '--';
        document.getElementById('info-dimensions').textContent =
            `${data.size.x} × ${data.size.y} × ${data.size.z}`;
        document.getElementById('info-total-blocks').textContent =
            data.totalBlocks.toLocaleString();
        document.getElementById('info-regions').textContent = data.regionCount;
        document.getElementById('info-block-types').textContent = data.blockTypes;

        // 方块统计
        const statsList = document.getElementById('stats-list');
        const statsToggleBtn = document.getElementById('stats-toggle-btn');
        statsList.innerHTML = '';

        // 初始只显示前 10
        const showCount = Math.min(data.blockStats.length, 10);
        const allStats = data.blockStats;

        function renderStats(count) {
            statsList.innerHTML = '';
            for (let idx = 0; idx < count; idx++) {
                const stat = allStats[idx];
                const item = document.createElement('div');
                item.className = 'stat-item';
                const displayName = getBlockNameCN(stat.id);
                item.innerHTML = `
                    <div class="stat-header">
                        <span class="stat-name" title="${stat.id}">${displayName}</span>
                        <span class="stat-count">${stat.count.toLocaleString()} (${stat.percentage}%)</span>
                    </div>
                    <div class="block-stat-bar">
                        <div class="block-stat-fill" style="width: ${stat.percentage}%"></div>
                    </div>
                `;
                statsList.appendChild(item);
            }
        }

        renderStats(showCount);

        // 展开/收起按钮
        if (allStats.length > 10) {
            statsToggleBtn.style.display = 'block';
            statsToggleBtn.textContent = '展开全部 (' + allStats.length + ' 种)';
            let expanded = false;
            statsToggleBtn.onclick = function () {
                expanded = !expanded;
                if (expanded) {
                    renderStats(allStats.length);
                    statsToggleBtn.textContent = '收起 (当前显示全部)';
                } else {
                    renderStats(showCount);
                    statsToggleBtn.textContent = '展开全部 (' + allStats.length + ' 种)';
                }
            };
        } else {
            statsToggleBtn.style.display = 'none';
        }
    }

    function formatFileSize(bytes) {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
    }

    // ========== 控制面板 ==========

    function bindControlEvents() {
        // 图层滑块
        layerMin.addEventListener('input', updateLayerRange);
        layerMax.addEventListener('input', updateLayerRange);

        // 线框模式（三态切换：实体→线框→半透明+线框）
        document.getElementById('btn-wireframe').addEventListener('click', () => {
            isWireframe = !isWireframe;
            toggleWireframe(isWireframe);
            document.getElementById('btn-wireframe').classList.toggle('active', isWireframe);
        });

        // 自动旋转
        document.getElementById('btn-rotate').addEventListener('click', () => {
            isAutoRotate = !isAutoRotate;
            setAutoRotate(isAutoRotate);
            document.getElementById('btn-rotate').classList.toggle('active', isAutoRotate);
        });

        // 坐标轴
        document.getElementById('btn-axes').addEventListener('click', () => {
            showAxes = !showAxes;
            toggleAxes(showAxes);
            document.getElementById('btn-axes').classList.toggle('active', showAxes);
        });

        // 网格
        document.getElementById('btn-grid').addEventListener('click', () => {
            showGrid = !showGrid;
            toggleGrid(showGrid);
            document.getElementById('btn-grid').classList.toggle('active', showGrid);
        });

        // 重置视角
        document.getElementById('btn-reset').addEventListener('click', () => {
            resetCamera();
            showToast('视角已重置', 'info');
        });

        // 关闭投影
        document.getElementById('btn-clear').addEventListener('click', clearProjection);

        // 垂直翻转
        document.getElementById('btn-flip-vertical').addEventListener('click', () => {
            if (typeof flipVertical === 'function') {
                flipVertical();
                const btn = document.getElementById('btn-flip-vertical');
                btn.classList.toggle('active');
            }
        });

        // 导出翻转文件
        document.getElementById('btn-export-flipped').addEventListener('click', () => {
            if (typeof exportFlippedLitematic === 'function') {
                exportFlippedLitematic();
            }
        });

        // Y 轴偏移控制
        document.getElementById('btn-y-offset-up').addEventListener('click', () => {
            if (typeof yOffsetOffset !== 'undefined') {
                yOffsetOffset++;
                renderVoxels(currentVoxelData, true);
                showToast(`Y 轴偏移: ${yOffsetOffset}`, 'info');
            }
        });

        document.getElementById('btn-y-offset-down').addEventListener('click', () => {
            if (typeof yOffsetOffset !== 'undefined') {
                yOffsetOffset--;
                renderVoxels(currentVoxelData, true);
                showToast(`Y 轴偏移: ${yOffsetOffset}`, 'info');
            }
        });

        document.getElementById('btn-reset-y-offset').addEventListener('click', () => {
            if (typeof yOffsetOffset !== 'undefined') {
                yOffsetOffset = 0;
                renderVoxels(currentVoxelData, true);
                showToast('Y 轴偏移已重置', 'info');
            }
        });
    }

    function updateLayerRange() {
        let minVal = parseInt(layerMin.value);
        let maxVal = parseInt(layerMax.value);

        // 确保 min <= max
        if (minVal > maxVal) {
            const temp = minVal;
            minVal = maxVal;
            maxVal = temp;
        }

        layerMinLabel.textContent = minVal;
        layerMaxLabel.textContent = maxVal;

        setLayerRange(minVal, maxVal);
    }

    function resetControls() {
        isWireframe = false;
        isAutoRotate = false;
        showAxes = false;
        showGrid = false;

        toggleWireframe(false);
        setAutoRotate(false);
        toggleAxes(false);
        toggleGrid(false);

        document.getElementById('btn-wireframe').classList.remove('active');
        document.getElementById('btn-rotate').classList.remove('active');
        document.getElementById('btn-axes').classList.remove('active');
        document.getElementById('btn-grid').classList.remove('active');
    }

    function clearProjection() {
        dispose();
        currentVoxelData = [];
        resetControls();

        previewSection.style.display = 'none';
        controlsBar.style.display = 'none';
        emptyState.classList.remove('hidden');

        fileInput.value = '';
        showToast('投影已关闭', 'info');
    }

    // ========== UI 工具 ==========

    function showLoading(show) {
        if (show) {
            loadingOverlay.classList.add('active');
        } else {
            loadingOverlay.classList.remove('active');
        }
    }

    /**
     * 显示 Toast 提示（成功/信息类，自动消失）
     */
    function showToast(message, type) {
        const existing = document.querySelectorAll('.toast');
        existing.forEach(t => t.remove());

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('fade-out');
            setTimeout(() => {
                if (toast.parentNode) toast.remove();
            }, 300);
        }, 2500);
    }

    /**
     * 显示错误弹窗（需手动关闭）
     */
    function showErrorDialog(message) {
        const existing = document.querySelector('.error-modal');
        if (existing) existing.remove();

        const overlay = document.createElement('div');
        overlay.className = 'error-modal-overlay';
        overlay.innerHTML = `
            <div class="error-modal">
                <div class="error-modal-header">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="10"/>
                        <line x1="15" y1="9" x2="9" y2="15"/>
                        <line x1="9" y1="9" x2="15" y2="15"/>
                    </svg>
                    <span>错误</span>
                </div>
                <div class="error-modal-body">
                    <p>${escapeHtml(message)}</p>
                </div>
                <div class="error-modal-footer">
                    <button class="error-modal-btn" id="error-modal-close-btn">确定</button>
                </div>
            </div>
        `;
        document.body.appendChild(overlay);

        document.getElementById('error-modal-close-btn').addEventListener('click', () => {
            overlay.remove();
        });
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    window.showToast = showToast;
    window.showErrorDialog = showErrorDialog;
})();
