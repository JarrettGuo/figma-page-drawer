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

### 重要生成规范

当用户提供 **unified json + 参考图片** 时，必须遵守：

- **结构以 unified json 为唯一准绳**
- **图片仅用于视觉风格参考**，不能反推、补全、臆造业务字段或业务数据
- **禁止擅自新增表格行数据、统计数字、业务文案、ID、状态值**
- 如果 unified json 没有提供真实数据：
  - 表格只能画 **表头 + 空态/占位**，或
  - 只保留 json 中已有的字段说明文本
- 对企业内部 json / code：**默认只返回给用户，不落库、不提交**，除非用户明确要求写入仓库


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
- 双击图形可直接写说明文字
- 支持右下角拖拽缩放
- 8px 网格吸附，导出相对位置更稳定
- 支持基础父子容器挂载（新增节点优先挂到选中容器）
- 父子层级树可视化
- 类型颜色区分
- 列表页模板预设
- 快捷键复制/删除/撤销/重做
- 支持从 unified JSON 回显编辑器
- 右侧编辑节点标题、文字、尺寸、父节点
- 一键导出 unified JSON
- 一键复制 JSON

使用方式：直接浏览器打开 `tool/editor.html`。


### Extra editor enhancements

- 拖拽创建区块 / 表格
- 基础对齐参考线
- 画布缩放（50%~200%）
