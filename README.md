# figma-page-drawer

A lightweight Figma page generation skill focused on:

- collecting page requirements
- generating visible Figma pages via Development Plugin code
- supporting iterative updates on existing pages
- keeping page state for later refinement
- preparing output for downstream design-to-code / Vue implementation

## Features

- requirement form
- modification form
- screenshot reference metadata support
- page state file
- dashboard/list/form/detail/mobile templates
- build script
- update script
- tests with Vitest

## Scripts

- `pnpm test`
- `pnpm build:dashboard`
- `pnpm build:list`
- `pnpm build:update`

## Notes

First version uses full-page regeneration instead of node-level patching.

## Unified JSON workflow

新增支持“线框 + 表单 → 总 JSON”的最小可用方案：

- 线框示例：`examples/approval-flow-wireframe.json`
- 表单示例：`examples/approval-flow-form.json`
- 总 JSON 示例：`examples/approval-flow-unified.json`
- Schema 说明：`references/schema/unified-json-guide.md`
- Schema 文件：`references/schema/wireframe-schema-v1.json`
- 脚本：`scripts/unified-json.js`

### 合并命令

```bash
node scripts/unified-json.js --command merge   --form examples/approval-flow-form.json   --wireframe examples/approval-flow-wireframe.json   --output examples/unified-output.json
```

### 校验命令

```bash
node scripts/unified-json.js --command validate   --input examples/approval-flow-unified.json
```

## Visual editor MVP

新增一个零依赖的本地可视化编辑器：

- `tool/editor.html`
- `tool/editor-core.js`

能力：
- 左侧填写表单字段
- 中间拖拽低保真区块
- 右侧编辑节点文字与尺寸
- 一键导出 unified JSON
- 一键复制 JSON

使用方式：直接浏览器打开 `tool/editor.html`。
