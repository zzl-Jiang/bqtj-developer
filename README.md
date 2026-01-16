# 爆枪突击开发者辅助工具 (BQTJ-Developer)

一个为《爆枪突击》“开发者”功能打造的第三方图形化编辑器与 Mod 分享平台。

## 🚀 项目初衷
解决 Flash 环境下 XML 编写门槛高、调试困难（静默报错）等痛点。通过 Web 技术提供：
- **可视化编辑**：将枯燥的代码编写转变为直观的表单填入。
- **预校验机制**：在导入游戏前拦截 90% 的格式错误。
- **社区化分享**：支持 Mod 快捷上传、更新与云端下载。

## 🛠 技术栈
- **前端**: Vue 3 + Vite + TypeScript + Element Plus
- **后端**: Node.js + Express + TypeScript
- **数据库**: MongoDB Atlas (云端存储)
- **核心工具**: Monaco Editor (VS Code 同款编辑器内核)

## 📁 目录结构
```text
bqtj-developer/
├── client/           # 前端 Web 项目 (Vue3)
├── server/           # 后端 API 服务 (Node.js)
├── package.json      # 根目录配置，管理 NPM Workspaces
└── README.md         # 本文档
```

## 🛠 快速上手

### 1. 环境准备
确保你的本地安装了：
- [Node.js](https://nodejs.org/) (建议 v18 或更高版本)
- Git

### 2. 安装依赖
在项目根目录下执行一次安装即可：
```bash
npm install
```

### 3. 本地开发
启动前后端开发环境：
```bash
npm run dev
```
- 前端地址：`http://localhost:5173`
- 后端地址：`http://localhost:3000`

## 📅 路线图 (Roadmap)
- [ ] **Phase 1**: 基础框架搭建，支持简单的 XML 生成与本地导出 (进行中)
- [ ] **Phase 2**: 集成 Monaco Editor，实现 XML 语法高亮与属性自动补全
- [ ] **Phase 3**: 接入 MongoDB，支持账号系统与 Mod 云端保存/分享
- [ ] **Phase 4**: 实现“官民合作”，对接游戏论坛或游戏内跳转

## 🤝 参与开发
目前项目处于早期快速迭代阶段。
- 如果你是玩家：欢迎提出功能建议。
- 如果你是开发者：欢迎 PR 或联系我加入协作。