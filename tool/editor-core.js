export const DEFAULT_FORM = {
    pageType: 'list',
    pageName: '未命名页面',
    notes: '',
    style: {
        colorPrimary: '#1677FF',
        radius: 12,
        looseness: 'loose',
    },
};

export const DEFAULT_CANVAS = {
    width: 960,
    height: 720,
};

export const GRID_SIZE = 8;
export const ALIGN_THRESHOLD = 12;

export const NODE_TYPE_META = {
    sidebar: { label: '侧边栏', color: '#E0E7FF', defaultWidth: 180, defaultHeight: 560, defaultText: 'LOGO\n菜单导航' },
    button: { label: '按钮', color: '#DBEAFE', defaultWidth: 120, defaultHeight: 40, defaultText: '按钮' },
    input: { label: '输入框', color: '#FEF3C7', defaultWidth: 220, defaultHeight: 44, defaultText: '请输入内容' },
    select: { label: '下拉框', color: '#FDE68A', defaultWidth: 220, defaultHeight: 44, defaultText: '请选择' },
    checkbox: { label: '复选框', color: '#ECFCCB', defaultWidth: 180, defaultHeight: 32, defaultText: '复选项' },
    radio: { label: '单选框', color: '#E0F2FE', defaultWidth: 180, defaultHeight: 32, defaultText: '单选项' },
    switch: { label: '开关', color: '#DCFCE7', defaultWidth: 120, defaultHeight: 32, defaultText: '开关' },
    datePicker: { label: '日期选择', color: '#FCE7F3', defaultWidth: 220, defaultHeight: 44, defaultText: '选择日期' },
    search: { label: '搜索框', color: '#FDE68A', defaultWidth: 280, defaultHeight: 44, defaultText: '搜索关键词' },
    table: { label: '表格', color: '#DCFCE7', defaultWidth: 520, defaultHeight: 260, defaultText: '列1 ｜ 列2 ｜ 列3 ｜ 列4', defaultTable: { columns: ['列1', '列2', '列3', '列4'], rows: [[], [], [], []] } },
    card: { label: '卡片', color: '#EDE9FE', defaultWidth: 240, defaultHeight: 140, defaultText: '卡片说明' },
    tag: { label: '标签', color: '#D1FAE5', defaultWidth: 88, defaultHeight: 32, defaultText: '标签' },
    text: { label: '文本', color: '#F3F4F6', defaultWidth: 220, defaultHeight: 56, defaultText: '正文描述' },
    title: { label: '标题', color: '#F5F3FF', defaultWidth: 240, defaultHeight: 48, defaultText: '页面标题' },
    image: { label: '图片占位', color: '#E5E7EB', defaultWidth: 220, defaultHeight: 140, defaultText: 'Image' },
    modal: { label: '弹窗', color: '#FCE7F3', defaultWidth: 360, defaultHeight: 220, defaultText: '弹窗内容' },
    pagination: { label: '分页', color: '#DBEAFE', defaultWidth: 220, defaultHeight: 36, defaultText: '上一页 1 2 3 下一页' },
    tabs: { label: 'Tabs', color: '#E0F2FE', defaultWidth: 260, defaultHeight: 40, defaultText: '全部 / 进行中 / 已完成' },
    breadcrumb: { label: '面包屑', color: '#F9FAFB', defaultWidth: 260, defaultHeight: 32, defaultText: '首页 / 列表页' },
};

export const COMPONENT_LIBRARY = [
    'sidebar', 'button', 'input', 'select', 'checkbox', 'radio', 'switch', 'datePicker', 'search', 'table', 'card', 'tag', 'text', 'title', 'image', 'modal', 'pagination', 'tabs', 'breadcrumb',
];

export const PRESET_TEMPLATES = {
    list: [
        { type: 'sidebar', name: '左侧侧边栏', title: '侧边栏', text: 'LOGO\n菜单导航', x: 0, y: 0, width: 180, height: 720, zIndex: 1 },
        { type: 'breadcrumb', name: '面包屑', title: '面包屑', text: '首页 / 列表页', x: 204, y: 24, width: 240, height: 32, zIndex: 2 },
        { type: 'title', name: '标题', title: '列表页标题', text: '用户列表', x: 204, y: 64, width: 240, height: 48, zIndex: 2 },
        { type: 'search', name: '搜索框', title: '搜索框', text: '搜索关键词', x: 204, y: 128, width: 280, height: 44, zIndex: 3 },
        { type: 'button', name: '按钮', title: '新建按钮', text: '新建', x: 500, y: 128, width: 120, height: 40, zIndex: 3 },
        { type: 'table', name: '表格区', title: '表格', text: '列1 ｜ 列2 ｜ 列3 ｜ 列4', x: 204, y: 188, width: 720, height: 420, zIndex: 2 },
        { type: 'pagination', name: '分页', title: '分页', text: '上一页 1 2 3 下一页', x: 704, y: 624, width: 220, height: 36, zIndex: 4 },
    ],
    dashboard: [
        { type: 'sidebar', name: '左侧侧边栏', title: '侧边栏', text: 'LOGO\n总览\n统计\n分析', x: 0, y: 0, width: 180, height: 720, zIndex: 1 },
        { type: 'breadcrumb', name: '面包屑', title: '面包屑', text: '首页 / Dashboard', x: 204, y: 24, width: 240, height: 32, zIndex: 2 },
        { type: 'title', name: '标题', title: 'Dashboard 标题', text: '经营概览', x: 204, y: 64, width: 240, height: 48, zIndex: 2 },
        { type: 'card', name: '卡片', title: '指标卡1', text: '总订单\n1,024', x: 204, y: 136, width: 168, height: 112, zIndex: 2 },
        { type: 'card', name: '卡片', title: '指标卡2', text: 'GMV\n¥128,000', x: 388, y: 136, width: 168, height: 112, zIndex: 2 },
        { type: 'card', name: '卡片', title: '指标卡3', text: '新增用户\n256', x: 572, y: 136, width: 168, height: 112, zIndex: 2 },
        { type: 'card', name: '卡片', title: '指标卡4', text: '转化率\n37%', x: 756, y: 136, width: 168, height: 112, zIndex: 2 },
        { type: 'table', name: '表格区', title: '趋势/列表', text: '列1 ｜ 列2 ｜ 列3 ｜ 列4', x: 204, y: 280, width: 720, height: 328, zIndex: 2 },
    ],
    form: [
        { type: 'breadcrumb', name: '面包屑', title: '面包屑', text: '首页 / 表单页', x: 96, y: 32, width: 240, height: 32, zIndex: 2 },
        { type: 'title', name: '标题', title: '表单页标题', text: '创建用户', x: 96, y: 72, width: 240, height: 48, zIndex: 2 },
        { type: 'card', name: '卡片', title: '表单容器', text: '基础信息', x: 96, y: 144, width: 768, height: 400, zIndex: 1 },
        { type: 'input', name: '输入框', title: '姓名', text: '请输入姓名', x: 136, y: 208, width: 280, height: 44, zIndex: 3 },
        { type: 'select', name: '下拉框', title: '角色', text: '请选择角色', x: 448, y: 208, width: 280, height: 44, zIndex: 3 },
        { type: 'datePicker', name: '日期选择', title: '日期', text: '选择日期', x: 136, y: 280, width: 280, height: 44, zIndex: 3 },
        { type: 'text', name: '文本', title: '备注', text: '备注说明区域', x: 136, y: 352, width: 592, height: 88, zIndex: 3 },
        { type: 'button', name: '按钮', title: '提交按钮', text: '提交', x: 608, y: 472, width: 120, height: 40, zIndex: 3 },
    ],
    detail: [
        { type: 'breadcrumb', name: '面包屑', title: '面包屑', text: '首页 / 详情页', x: 96, y: 32, width: 240, height: 32, zIndex: 2 },
        { type: 'title', name: '标题', title: '详情页标题', text: '订单详情', x: 96, y: 72, width: 240, height: 48, zIndex: 2 },
        { type: 'card', name: '卡片', title: '基础信息卡片', text: '基础信息', x: 96, y: 144, width: 768, height: 168, zIndex: 1 },
        { type: 'text', name: '文本', title: '详情字段1', text: '订单号：202603240001', x: 128, y: 184, width: 280, height: 40, zIndex: 3 },
        { type: 'text', name: '文本', title: '详情字段2', text: '状态：处理中', x: 448, y: 184, width: 240, height: 40, zIndex: 3 },
        { type: 'card', name: '卡片', title: '日志卡片', text: '处理日志', x: 96, y: 336, width: 768, height: 240, zIndex: 1 },
        { type: 'table', name: '表格区', title: '日志表格', text: '时间 ｜ 动作 ｜ 操作人 ｜ 备注', x: 128, y: 384, width: 704, height: 160, zIndex: 3 },
    ],
};

export function snapToGrid(value, grid = GRID_SIZE) {
    return Math.round(Number(value || 0) / grid) * grid;
}

export function softSnap(value, grid = GRID_SIZE) {
    const numeric = Number(value || 0);
    return Math.round(numeric / grid) * grid;
}

export function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

export function createNode({ id, type = 'text', name, title, text = '', x = 40, y = 40, width, height, parentId = 'root', tableConfig, zIndex = 0 }) {
    const meta = NODE_TYPE_META[type] || NODE_TYPE_META.text;
    const finalName = name || meta.label || '未命名组件';
    return {
        id: id || `node_${Date.now()}`,
        parentId,
        type,
        name: finalName,
        title: title || finalName,
        text: text || meta.defaultText || '',
        x: softSnap(x),
        y: softSnap(y),
        width: Math.max(GRID_SIZE, softSnap(width ?? meta.defaultWidth ?? 240)),
        height: Math.max(GRID_SIZE, softSnap(height ?? meta.defaultHeight ?? 120)),
        zIndex: Number.isFinite(Number(zIndex)) ? Number(zIndex) : 0,
        ...(type === 'table' ? { tableConfig: normalizeTableConfig(tableConfig || meta.defaultTable) } : {}),
    };
}


export function normalizeTableConfig(config) {
    const columns = Array.isArray(config?.columns) && config.columns.length > 0
        ? config.columns.map((item) => String(item || '').trim() || '列')
        : ['列1', '列2', '列3'];
    const rows = Array.isArray(config?.rows) && config.rows.length > 0
        ? config.rows.map((row) => Array.isArray(row) ? row.map((cell) => String(cell || '')) : [])
        : [[], [], []];
    return { columns, rows: rows.map((row) => columns.map((_, index) => row[index] || '')) };
}

export function updateTableCell(node, rowIndex, colIndex, value) {
    const table = normalizeTableConfig(node.tableConfig);
    const rows = table.rows.map((row, rIndex) => rIndex === rowIndex ? row.map((cell, cIndex) => cIndex === colIndex ? String(value || '') : cell) : row);
    return { ...node, tableConfig: { columns: table.columns, rows } };
}


export function appendTableRow(node) {
    const table = normalizeTableConfig(node.tableConfig);
    return { ...node, tableConfig: { columns: table.columns, rows: [...table.rows, table.columns.map(() => '')] } };
}

export function removeTableRow(node) {
    const table = normalizeTableConfig(node.tableConfig);
    const rows = table.rows.length > 1 ? table.rows.slice(0, -1) : [table.columns.map(() => '')];
    return { ...node, tableConfig: { columns: table.columns, rows } };
}

export function appendTableColumn(node, name = '') {
    const table = normalizeTableConfig(node.tableConfig);
    const nextName = String(name || `列${table.columns.length + 1}`);
    return {
        ...node,
        text: [...table.columns, nextName].join(' ｜ '),
        tableConfig: {
            columns: [...table.columns, nextName],
            rows: table.rows.map((row) => [...row, '']),
        },
    };
}

export function removeTableColumn(node) {
    const table = normalizeTableConfig(node.tableConfig);
    if (table.columns.length <= 1) return node;
    const columns = table.columns.slice(0, -1);
    const rows = table.rows.map((row) => row.slice(0, -1));
    return { ...node, text: columns.join(' ｜ '), tableConfig: { columns, rows } };
}

export function updateTableColumns(node, columns) {
    const nextColumns = String(columns || '').split(/\||｜|,|，/).map((item) => item.trim()).filter(Boolean);
    const table = normalizeTableConfig({ columns: nextColumns, rows: node.tableConfig?.rows || [] });
    return { ...node, tableConfig: table, text: table.columns.join(' ｜ ') };
}

export function normalizeFormInput(raw) {
    return {
        pageType: raw.pageType || 'list',
        pageName: raw.pageName || '未命名页面',
        notes: raw.notes || '',
        style: {
            colorPrimary: raw.colorPrimary || '#1677FF',
            radius: Number(raw.radius || 12),
            looseness: raw.looseness || 'loose',
        },
    };
}

export function splitCsv(value) {
    return String(value || '').split(',').map((item) => item.trim()).filter(Boolean);
}

export function resolveParentId(nodes, activeId, preferredParentId = 'root') {
    if (!activeId) return preferredParentId;
    const node = nodes.find((item) => item.id === activeId);
    if (!node) return preferredParentId;
    return node.type === 'card' || node.type === 'modal' ? node.id : (node.parentId || preferredParentId);
}

export function findAlignmentGuides(node, nodes) {
    const guides = { x: null, y: null };
    nodes.filter((item) => item.id !== node.id).forEach((item) => {
        if (Math.abs(item.x - node.x) <= ALIGN_THRESHOLD) guides.x = item.x;
        if (Math.abs(item.y - node.y) <= ALIGN_THRESHOLD) guides.y = item.y;
    });
    return guides;
}

export function applyAlignment(node, guides) {
    return { ...node, x: guides.x ?? node.x, y: guides.y ?? node.y };
}

export function constrainNode(node, canvas = DEFAULT_CANVAS) {
    const width = clamp(softSnap(node.width), GRID_SIZE * 3, canvas.width);
    const height = clamp(softSnap(node.height), GRID_SIZE * 3, canvas.height);
    const x = clamp(softSnap(node.x), 0, Math.max(0, canvas.width - width));
    const y = clamp(softSnap(node.y), 0, Math.max(0, canvas.height - height));
    return { ...node, x, y, width, height };
}

export function updateNodePosition(node, deltaX, deltaY, guides = null, canvas = DEFAULT_CANVAS) {
    const moved = constrainNode({ ...node, x: node.x + deltaX, y: node.y + deltaY }, canvas);
    return guides ? constrainNode(applyAlignment(moved, guides), canvas) : moved;
}

export function updateNodeSize(node, deltaWidth, deltaHeight, canvas = DEFAULT_CANVAS) {
    return constrainNode({ ...node, width: node.width + deltaWidth, height: node.height + deltaHeight }, canvas);
}

export function updateNodeText(node, text) {
    return { ...node, text: String(text || '') };
}

export function updateNodeTitle(node, title) {
    return { ...node, title: String(title || '') };
}

export function duplicateNode(node) {
    return createNode({ ...node, id: `${node.id}_copy_${Date.now()}`, x: node.x + 24, y: node.y + 24 });
}

export function buildTemplateNodes(templateKey) {
    const template = PRESET_TEMPLATES[templateKey] || [];
    return template.map((item, index) => createNode({ ...item, id: `preset_${templateKey}_${index}` }));
}


export function isPaginationInsideTable(tableNode, paginationNode) {
    if (!tableNode || !paginationNode) return false;
    const tableLeft = Number(tableNode.x || 0);
    const tableTop = Number(tableNode.y || 0);
    const tableRight = tableLeft + Number(tableNode.width || 0);
    const tableBottom = tableTop + Number(tableNode.height || 0);
    const pagLeft = Number(paginationNode.x || 0);
    const pagTop = Number(paginationNode.y || 0);
    const pagRight = pagLeft + Number(paginationNode.width || 0);
    const pagBottom = pagTop + Number(paginationNode.height || 0);
    const inside = pagLeft >= tableLeft - 24 && pagRight <= tableRight + 24 && pagTop >= tableTop && pagBottom <= tableBottom + 48;
    const nearBottomRight = pagLeft >= tableRight - 260 && pagTop >= tableBottom - 120;
    return inside || nearBottomRight;
}


export function containsRect(parent, child, padding = 12) {
    if (!parent || !child) return false;
    return child.x >= parent.x + padding
        && child.y >= parent.y + padding
        && child.x + child.width <= parent.x + parent.width - padding
        && child.y + child.height <= parent.y + parent.height - padding;
}

export function inferParentId(nodes, node) {
    const containers = nodes
        .filter((item) => item.id !== node.id && ['card', 'modal', 'table', 'sidebar'].includes(item.type))
        .filter((item) => containsRect(item, node))
        .sort((a, b) => (a.width * a.height) - (b.width * b.height));
    return containers[0]?.id || node.parentId || 'root';
}


export function getParentNode(nodes, node) {
    if (!node?.parentId || node.parentId === 'root') return null;
    return nodes.find((item) => item.id === node.parentId) || null;
}

export function constrainNodeInParent(node, parent, padding = 12) {
    if (!parent) return node;
    const minX = parent.x + padding;
    const minY = parent.y + padding;
    const maxWidth = Math.max(GRID_SIZE * 3, parent.width - padding * 2);
    const maxHeight = Math.max(GRID_SIZE * 3, parent.height - padding * 2);
    const width = clamp(softSnap(node.width), GRID_SIZE * 3, maxWidth);
    const height = clamp(softSnap(node.height), GRID_SIZE * 3, maxHeight);
    const maxX = parent.x + parent.width - padding - width;
    const maxY = parent.y + parent.height - padding - height;
    return { ...node, width, height, x: clamp(softSnap(node.x), minX, maxX), y: clamp(softSnap(node.y), minY, maxY) };
}

export function resolveAutoParent(nodes, node) {
    const inferred = inferParentId(nodes, node);
    return inferred || 'root';
}

export function normalizeNodeWithParent(nodes, node, canvas = DEFAULT_CANVAS) {
    const parentId = resolveAutoParent(nodes, node);
    const parent = parentId === 'root' ? null : nodes.find((item) => item.id === parentId);
    const next = { ...node, parentId };
    return parent ? constrainNodeInParent(next, parent) : constrainNode(next, canvas);
}

export function buildUnifiedJson({ form, canvas = DEFAULT_CANVAS, nodes = [] }) {
    const normalizedNodes = nodes.map((node) => ({ ...node }));
    const tables = normalizedNodes.filter((node) => node.type === 'table');
    const paginations = normalizedNodes.filter((node) => node.type === 'pagination');
    normalizedNodes.forEach((node) => {
        if (node.type !== 'pagination') node.parentId = inferParentId(normalizedNodes, node);
    });
    paginations.forEach((pagination) => {
        const owner = tables.find((table) => isPaginationInsideTable(table, pagination));
        if (owner) pagination.parentId = owner.id;
        else pagination.parentId = inferParentId(normalizedNodes, pagination);
    });
    return {
        meta: { version: '1.0', source: 'visual-editor', description: `${form.pageName || '未命名页面'} unified json` },
        form,
        wireframe: {
            canvas,
            nodes: [{ id: 'root', parentId: null, type: 'frame', name: form.pageName || '未命名页面', title: form.pageName || '未命名页面', text: '', x: 0, y: 0, width: canvas.width, height: canvas.height }, ...normalizedNodes],
        },
    };
}

export function parseUnifiedJson(input) {
    const data = typeof input === 'string' ? JSON.parse(input) : input;
    return {
        form: { ...DEFAULT_FORM, ...(data.form || {}), style: { ...DEFAULT_FORM.style, ...(data.form?.style || {}) } },
        canvas: data.wireframe?.canvas || DEFAULT_CANVAS,
        nodes: (data.wireframe?.nodes || []).filter((node) => node.id !== 'root'),
    };
}

export function serializeState({ form, nodes, canvas = DEFAULT_CANVAS }) {
    return JSON.stringify(buildUnifiedJson({ form, nodes, canvas }), null, 4);
}
