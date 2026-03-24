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

## Dense admin form / complex component layout rules

当页面组件很多、层级复杂时，后续开发与生成必须遵守以下规则：

### 1. 先按业务语义分组，不按视觉邻近分组
- 优先判断组件属于哪个业务 section / card
- 不要因为两个元素靠得近，就默认它们属于同一组
- 大后台页面默认先拆成若干 card：例如基础信息 / 生效配置 / 进入条件 / 配置阶段

### 2. 操作必须区分层级
所有操作按钮或文本动作，必须先判断其语义层级：

- **字段级操作**：绑定某个 input / field
- **表格级操作**：绑定某个 table，例如 `+ 添加审批人`
- **区块级操作**：绑定整个 section / card，例如 `+ 添加阶段`
- **页面级操作**：绑定整页，例如 `提交 / 取消 / 返回列表`

禁止把不同层级的操作混在一层表现。

### 3. card 是复杂表单页的主组织单位
- 复杂配置页优先使用 card / section 承载业务块
- 生成 code.js 或调整 wireframe 时，应先确认每个组件归属哪个 card
- card 内部元素的位置、操作、表格都要服从 card 语义，而不是只看视觉排布

### 4. 输入框不要默认挂额外按钮
- 不要把 `+ 添加条件`、`+ 操作` 之类默认塞进 input 内部
- 只有 unified json 明确表达，或用户明确说明该操作就是字段级操作时，才能挂在 input 上
- 否则默认把它归到 table / section / page 级别

### 5. 高密后台页默认采用满宽内容策略
- 主内容区应尽量铺开，不保留大面积无意义留白
- card 应接近占满内容区宽度
- table 应接近占满 card 可用宽度
- 双列 / 多列输入区应横向铺开，而不是缩在中间
- 页面要优先像“后台配置页”，而不是“营销展示页”

### 6. 参考图只决定风格，不决定业务结构
- 参考图用于：密度、间距、视觉气质、侧边栏样式、标题栏风格
- 业务结构、字段归属、操作层级，必须以 unified json + 用户补充说明为准
- 当参考图与业务语义冲突时，优先服从业务语义

### 7. 生成 / 修改前的最小检查清单
在生成复杂页面前，至少先检查这 3 件事：

1. 这个组件属于哪个 card / section？
2. 这个动作属于字段级、表格级、区块级还是页面级？
3. 页面宽度是否已经满足高密后台页的满宽布局预期？

如果这三件事未确认，不应直接输出最终 code.js。


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
