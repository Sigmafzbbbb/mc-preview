# Minecraft Litematic 3D 投影预览工具

[![在线演示](https://img.shields.io/badge/在线演示-点击访问-brightgreen)](https://mc-preview.sigmafzbbbb.dpdns.org)
[![Minecraft 版本](https://img.shields.io/badge/Minecraft-1.21.1-informational)](https://www.minecraft.net/)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL-blue)](https://threejs.org/)

> 一个基于 Web 的 Minecraft Litematic 文件查看器，支持 3D 投影预览、贴图设置、网格调整等功能。

## ✨ 特性

- 🎯 **Litematic 文件解析**: 完整支持 `.litematic` 格式文件
- 🎨 **3D 投影预览**: 基于 Three.js 的实时 3D 渲染
- 🧊 **方块体素渲染**: 高效的方块展示系统
- 🖼️ **贴图配置管理**: 支持自定义 6 面独立贴图
- 📐 **网格辅助系统**: 可调节大小的网格辅助线
- 🎮 **交互式控制**: 支持旋转、缩放、平移等操作
- ⚙️ **图层过滤**: 按层级显示/隐藏方块
- 📍 **Y 轴调整**: 灵活的垂直位置调整功能

## 🚀 在线体验

> 🌟 **无需下载，直接访问**: [https://mc-preview.sigmafzbbbb.dpdns.org](https://mc-preview.sigmafzbbbb.dpdns.org)

## 📸 快速预览

### 主界面
- 上传 Litematic 文件即可开始预览
- 支持拖拽上传
- 实时解析与渲染

### 视图控制
- 🖱️ 左键拖动：旋转视角
- 🖱️ 右键拖动：平移视角
- 🖱️ 滚轮：缩放视图
- 🔄 自动旋转：一键开启

### 贴图设置
- 为每个方块配置 6 面独立贴图
- 支持上传自定义纹理
- 贴图旋转与调整
- 配置导出/导入

## 🛠️ 技术栈

```
前端技术
├── HTML5          # 页面结构
├── CSS3           # 样式设计
├── JavaScript ES6 # 核心逻辑
└── Three.js       # 3D 渲染引擎

核心功能
├── NBT 解析       # Litematic 文件格式解析
├── InstancedMesh  # 高性能方块渲染
├── 纹理映射       # 6 面独立贴图支持
└── 交互控制       # OrbitControls 集成
```

## 📦 安装与运行

### 方法一：在线使用（推荐）

直接访问 [https://mc-preview.sigmafzbbbb.dpdns.org](https://mc-preview.sigmafzbbbb.dpdns.org)

### 方法二：本地部署

#### 1. 克隆项目

```bash
git clone https://github.com/your-username/minecraft-litematic-viewer.git
cd minecraft-litematic-viewer
```

#### 2. 下载贴图资源

由于贴图文件数量较多，需要单独下载：

📥 **贴图包下载**: https://sigmafzbbbb.lanzn.com/imtDH3oisrde

> 该贴图包是从 Minecraft 1.21.1 版本提取的官方资源

下载后，将 `textures` 文件夹放入项目根目录。

#### 3. 启动服务器

**Windows 用户：**
```bash
双击运行 `启动服务器.bat`
```

**其他系统：**
```bash
# 使用 Python 启动
python -m http.server 8080

# 或使用 Node.js
npx http-server -p 8080
```

#### 4. 访问应用

在浏览器中打开: `http://localhost:8080`

## 📖 使用说明

### 上传文件

1. 点击"上传 Litematic 文件"按钮
2. 选择你的 `.litematic` 文件
3. 等待解析完成
4. 3D 投影自动显示

### 视图操作

| 操作 | 鼠标/键盘 |
|------|-----------|
| 旋转视角 | 左键拖动 |
| 平移视角 | 右键拖动 |
| 缩放视图 | 鼠标滚轮 |
| 自动旋转 | 点击按钮 |
| 切换网格 | 快捷键 G |
| 切换坐标轴 | 快捷键 A |

### Y 轴调整

- 📤 上移：将投影整体向上移动
- 📥 下移：将投影整体向下移动
- 🔄 重置：恢复默认位置

## 🎯 使用场景

- 🏗️ 建筑设计预览
- 📊 结构尺寸测量
- 🎨 贴图配置测试
- 📝 文件内容查看
- 🔄 构思验证展示

## ⚠️ 已知问题

项目目前处于开发阶段，以下功能待完善：

- [ ] 贴图方向自动检测
- [ ] 部分方块位置准确性优化
- [ ] 大型文件性能优化
- [ ] 更多错误处理机制

详见 [README.md](README.md) 的"已知问题"章节。

## 🤝 贡献指南

### 需要帮助！

由于个人时间和精力有限，项目还有许多功能未完善。如果你有兴趣参与开发，欢迎加入我们的讨论！

#### 优先功能

1. **贴图方向自动检测**
2. **方块位置修复**
3. **贴图库完善**
4. **性能优化**

#### 如何贡献

1. Fork 本项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📞 联系方式

**加入我们的群聊参与讨论：**

[![加入群聊](https://img.shields.io/badge/QQ群-点击加入-blue)](https://qm.qq.com/q/MbeWfvDDGu)

👉 **点击链接加入群聊【Youzhu's chat group】：https://qm.qq.com/q/MbeWfvDDGu**

欢迎提 Issue、Pull Request，或者在群聊中交流！

## 📄 开源协议

本项目仅供学习和交流使用。

## 🙏 致谢

- [Three.js](https://threejs.org/) - 强大的 WebGL 3D 库
- [Minecraft](https://www.minecraft.net/) - 提供游戏资源和文件格式
- [Litematica Mod](https://www.curseforge.com/minecraft/mc-mods/litematica) - Litematic 文件格式定义
- 所有为开源项目贡献的开发者

---

<div align="center">

**如果这个项目对你有帮助，请给个 ⭐️ Star 支持一下！**

Made with ❤️ by Minecraft Community

</div>
