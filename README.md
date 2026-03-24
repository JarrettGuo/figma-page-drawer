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
- local visual editor
- unified json workflow

## Scripts

- `pnpm test`
- `pnpm build:dashboard`
- `pnpm build:list`
- `pnpm build:update`
- `pnpm build:unified`

## Notes

First version uses full-page regeneration instead of node-level patching.

## Unified JSON workflow

### Core generation rules

When the user provides **unified json + reference images**, the generator must follow these rules:

- **Use unified json as the only source of structure**
- **Use images only for visual style**, never for inventing business structure or data
- **Do not fabricate table rows, counts, IDs, statuses, labels, or example business content**
- If unified json does not contain real data:
  - tables should render as **headers + empty state / placeholders**, or
  - only use field-description text already present in json
- For internal business json / code: **default to replying directly without writing to the repo or committing**, unless the user explicitly asks to store it

### Merge / validate helpers

Minimal unified-json support includes:

- wireframe example: `examples/approval-flow-wireframe.json`
- form example: `examples/approval-flow-form.json`
- merged example: `examples/approval-flow-unified.json`
- schema guide: `references/schema/unified-json-guide.md`
- schema file: `references/schema/wireframe-schema-v1.json`
- script: `scripts/unified-json.js`

#### Merge command

```bash
node scripts/unified-json.js --command merge   --form examples/approval-flow-form.json   --wireframe examples/approval-flow-wireframe.json   --output examples/unified-output.json
```

#### Validate command

```bash
node scripts/unified-json.js --command validate   --input examples/approval-flow-unified.json
```

## Dense admin form / complex component layout rules

When a page contains many components or dense business form sections, follow these rules:

### 1. Group by business semantics first, not visual proximity
- Determine which business section / card a component belongs to before placing it
- Do not group elements together just because they appear visually close
- For admin pages, use section cards as the primary grouping unit: for example 基础信息 / 生效配置 / 进入条件 / 配置阶段

### 2. Separate action levels clearly
Every action must be classified before rendering:

- **Field-level action**: tied to an input / field
- **Table-level action**: tied to a table, such as `+ 添加审批人`
- **Section-level action**: tied to a section / card, such as `+ 添加阶段`
- **Page-level action**: tied to the whole page, such as `提交 / 取消 / 返回列表`

Do not flatten different action levels into one visual layer.

### 3. Use cards as the primary organization unit for complex forms
- Complex admin forms should be organized by cards / sections first
- Before generating `code.js`, confirm which card each component belongs to
- Internal elements, tables, and actions should follow card semantics, not only visual placement

### 4. Do not attach helper actions to inputs by default
- Do not automatically place `+ 添加条件` or similar actions inside an input
- Only do that when unified json explicitly expresses it, or the user clearly says it is a field-level action
- Otherwise, default it to table / section / page level

### 5. Prefer full-width content for dense admin pages
- Main content should use most of the available width
- Cards should be close to full width within the content area
- Tables should use most of the available width inside the card
- Multi-column fields should spread horizontally instead of shrinking into the center
- The page should feel like an admin configuration page, not a marketing landing page

### 6. Reference images only control style, not business structure
- Reference images can influence density, spacing, visual tone, sidebar style, and header feel
- Business grouping, component ownership, and action hierarchy must come from unified json + user clarification
- If the image conflicts with business semantics, business semantics win

### 7. Minimum checklist before generating complex pages
Before outputting final `code.js`, verify:

1. Which card / section does this component belong to?
2. Is this action field-level, table-level, section-level, or page-level?
3. Does the page width match dense admin layout expectations?

If these are not clear, do not treat the output as final.

## Visual editor MVP

Local zero-dependency visual editor:

- `tool/editor.html`
- `tool/editor-core.js`

Capabilities:
- fill page form fields in the left panel
- drag / place low-fidelity blocks in the center canvas
- edit text descriptions quickly
- resize from corners
- 8px grid snapping for stable export
- basic parent-child container assignment
- visible layer tree
- type-based colors
- preset templates
- copy / delete / undo / redo
- rehydrate from unified json
- edit node title / text / size / parent on the right panel
- export unified json
- copy exported json

Usage: open `tool/editor.html` directly in a browser.

### Extra editor enhancements

- drag-create blocks / tables
- basic alignment guides
- canvas zoom (50%~200%)

---

# figma-page-drawer（中文）

一个轻量的 Figma 页面生成工具，主要用于：

- 收集页面需求
- 通过 Development Plugin `code.js` 生成用户可见的 Figma 页面
- 支持基于现有页面持续迭代
- 保留页面状态，便于后续修改
- 为下游设计转代码 / Vue 实现做准备

## 功能

- 需求表单
- 修改表单
- 参考截图元数据支持
- 页面状态文件
- dashboard / list / form / detail / mobile 模板
- 生成脚本
- 更新脚本
- Vitest 测试
- 本地可视化编辑器
- unified json 工作流

## 脚本

- `pnpm test`
- `pnpm build:dashboard`
- `pnpm build:list`
- `pnpm build:update`
- `pnpm build:unified`

## 说明

当前第一版仍采用整页重绘，而不是 node 级 patch。

## Unified JSON 工作流

### 核心生成规则

当用户提供 **unified json + 参考图片** 时，必须遵守：

- **结构以 unified json 为唯一准绳**
- **图片仅用于视觉风格参考**，不能反推、补全、臆造业务字段或业务数据
- **禁止擅自新增表格行数据、统计数字、业务文案、ID、状态值**
- 如果 unified json 没有提供真实数据：
  - 表格只能画 **表头 + 空态/占位**，或
  - 只保留 json 中已有的字段说明文本
- 对企业内部 json / code：**默认只返回给用户，不落库、不提交**，除非用户明确要求写入仓库

### 合并 / 校验辅助

新增支持“线框 + 表单 → 总 JSON”的最小可用方案：

- 线框示例：`examples/approval-flow-wireframe.json`
- 表单示例：`examples/approval-flow-form.json`
- 总 JSON 示例：`examples/approval-flow-unified.json`
- Schema 说明：`references/schema/unified-json-guide.md`
- Schema 文件：`references/schema/wireframe-schema-v1.json`
- 脚本：`scripts/unified-json.js`

#### 合并命令

```bash
node scripts/unified-json.js --command merge   --form examples/approval-flow-form.json   --wireframe examples/approval-flow-wireframe.json   --output examples/unified-output.json
```

#### 校验命令

```bash
node scripts/unified-json.js --command validate   --input examples/approval-flow-unified.json
```

## 高密后台表单 / 复杂组件布局规则

当页面组件很多、业务表单较密集时，必须遵守以下规则：

### 1. 先按业务语义分组，不按视觉邻近分组
- 优先判断组件属于哪个业务 section / card
- 不要因为两个元素视觉上靠近，就默认它们属于同一组
- 大后台页面优先按 card 组织：例如基础信息 / 生效配置 / 进入条件 / 配置阶段

### 2. 操作必须区分层级
所有操作按钮或文本动作，必须先判断其语义层级：

- **字段级操作**：绑定某个 input / field
- **表格级操作**：绑定某个 table，例如 `+ 添加审批人`
- **区块级操作**：绑定整个 section / card，例如 `+ 添加阶段`
- **页面级操作**：绑定整页，例如 `提交 / 取消 / 返回列表`

禁止把不同层级的操作混在一层表现。

### 3. card 是复杂表单页的主组织单位
- 复杂配置页优先使用 card / section 承载业务块
- 生成 `code.js` 之前，应先确认每个组件归属哪个 card
- card 内部元素、表格、操作都要服从 card 语义，而不是只看视觉排布

### 4. 输入框不要默认挂额外按钮
- 不要把 `+ 添加条件`、`+ 操作` 之类默认塞进 input 内部
- 只有 unified json 明确表达，或用户明确说明该操作就是字段级操作时，才能挂在 input 上
- 否则默认把它归到 table / section / page 级别

### 5. 高密后台页默认采用满宽内容策略
- 主内容区应尽量铺开，不保留大面积无意义留白
- card 应接近占满内容区宽度
- table 应接近占满 card 可用宽度
- 双列 / 多列输入区应横向铺开，而不是缩在中间
- 页面要优先像“后台配置页”，而不是“展示页”

### 6. 参考图只决定风格，不决定业务结构
- 参考图用于：密度、间距、视觉气质、侧边栏样式、标题栏风格
- 业务结构、字段归属、操作层级，必须以 unified json + 用户补充说明为准
- 当参考图与业务语义冲突时，优先服从业务语义

### 7. 生成前的最小检查清单
在输出最终 `code.js` 之前，至少检查：

1. 这个组件属于哪个 card / section？
2. 这个动作属于字段级、表格级、区块级还是页面级？
3. 页面宽度是否满足高密后台页的满宽布局预期？

如果这三件事不清楚，就不应把结果视为最终版。

## 可视化编辑器 MVP

新增一个零依赖的本地可视化编辑器：

- `tool/editor.html`
- `tool/editor-core.js`

能力：
- 左侧填写表单字段
- 中间拖拽低保真区块
- 快速编辑说明文字
- 角点缩放
- 8px 网格吸附，导出位置更稳定
- 支持基础父子容器挂载
- 父子层级树可视化
- 类型颜色区分
- 模板预设
- 复制 / 删除 / 撤销 / 重做
- 支持从 unified JSON 回显编辑器
- 右侧编辑节点标题 / 文字 / 尺寸 / 父节点
- 一键导出 unified JSON
- 一键复制 JSON

使用方式：浏览器直接打开 `tool/editor.html`。

### 编辑器增强项

- 拖拽创建区块 / 表格
- 基础对齐参考线
- 画布缩放（50%~200%）
