# CALCULUS LAB

从数学基础到微积分，再到人工智能数学的中文自学网站。

## 本地运行

```bash
npm install
npm run dev
```

浏览器打开终端提示的地址（默认 http://localhost:5173）。

## 生产构建

```bash
npm run build
```

产物在 `dist/`，可直接部署到任意静态托管服务。

## 部署到 GitHub Pages

本项目使用 HashRouter + 相对资源路径（`base: './'`），兼容 GitHub Pages 子路径，无需额外配置路由回退。

方式一（推荐）：用 GitHub Actions。在仓库创建 `.github/workflows/deploy.yml`：

```yaml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm install
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

方式二：手动把 `dist/` 内容推送到 `gh-pages` 分支。

## 数据持久化说明

所有学习数据（章节进度、当前位置、最近学习、笔记、公式收藏、错题本）都保存在浏览器 **localStorage**，键名前缀 `calculus-lab:v1:`。

- 刷新页面、关闭重开都不会丢失。
- 数据只存在本机当前浏览器，不上传、无账号同步。
- 换浏览器或清除浏览器数据会丢失，可在"我的"页面用"清空所有学习数据"手动重置。

## 内容结构

课程内容与页面组件完全分离，全部在 `src/data/part1.ts` ~ `part6.ts`，遵循 `src/types/course.ts` 定义的数据结构。每个知识点采用统一的 12 要素教学结构（背景 / 通俗解释 / 定义 / 符号拆解 / 图形 / 推导 / 基础例题 / 进阶例题 / 应用 / AI / 常见错误 / 总结）。

新增或修改课程：编辑对应 `partN.ts` 文件即可，网站会自动更新目录、搜索、进度统计。

## 技术栈

- React 18 + TypeScript + Vite
- KaTeX（数学公式）
- Plotly.js（交互式数学图形）
- mathjs（表达式求值）
- localStorage（本地持久化）

## 教材依据

1. Precalculus 2e — OpenStax（数学基础重建）
2. Calculus Made Easy — Silvanus P. Thompson（微积分直觉）
3. The Calculus Lifesaver / 普林斯顿微积分读本 — Adrian Banner（系统微积分教学）
