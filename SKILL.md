---
name: figma-page-drawer
description: 根据用户填写的页面需求表、修改表与可选参考截图，生成 Figma Development Plugin 的 code.js，在 Figma 中绘制用户可见的页面视觉稿，并支持基于已有成品继续迭代。
---

# Figma Page Drawer

## 目标

本 skill 用于：

1. 根据页面需求生成可见的 Figma 页面视觉稿
2. 支持用户在已有页面基础上继续提修改需求
3. 支持参考截图作为结构 / 风格参考
4. 让结果适合后续识别并实现成 Vue 页面

## 输入模式

### 模式 A：首次生成
- 页面需求表
- 可选参考截图

### 模式 B：继续修改
- 页面修改表
- 可选新的参考截图
- `state/current-page.json`

## 原则

- 截图只是参考，文字需求优先
- 第一版不做 node 级 patch，统一采用整页重渲染
- 每次生成后都要更新 `state/current-page.json`
- 以稳定、可继续实现为第一优先级，不追求花哨

## 目录

- `references/`：需求表、修改表、规则
- `templates/`：页面模板与 manifest
- `scripts/`：生成与更新脚本
- `state/`：当前页面状态
- `tests/`：脚本测试
