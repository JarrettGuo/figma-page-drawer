# Unified JSON Guide v1

## Goal
把低保真拖拽线框数据和表单配置合并成一份统一 JSON，最后交给 Nyx 生成 Figma `code.js`。

## Top-level shape
```json
{
    "meta": {},
    "form": {},
    "wireframe": {}
}
```

## meta
- `version`: 固定 `1.0`
- `source`: 例如 `local-wireframe-tool`
- `description`: 可选

## form
- `pageType`: `dashboard | list | form | detail | mobile-home`
- `pageName`: 页面名称
- `platform`: `web | mobile`
- `style.colorPrimary`: 主色
- `style.radius`: 圆角
- `tableColumns`: 表格列数组
- `filters`: 筛选项数组
- `buttons`: 按钮数组
- `notes`: 备注

## wireframe
- `canvas.width` / `canvas.height`
- `nodes`: 拖拽节点列表

### node fields
- `id`
- `parentId`
- `type`: `frame | section | table | filter | button | text | card`
- `name`
- `text`
- `x / y / width / height`
