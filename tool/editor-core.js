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
    datePicker: { label: '日期选择', color: '#FCE7F3', defaultWidth: 220, defaultHeight: 44, defaultText: '选择日期' },
    search: { label: '搜索框', color: '#FDE68A', defaultWidth: 280, defaultHeight: 44, defaultText: '搜索关键词' },
    table: { label: '表格', color: '#DCFCE7', defaultWidth: 520, defaultHeight: 260, defaultText: '表格内容' },
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
    'sidebar',
    'button',
    'input',
    'select',
    'datePicker',
    'search',
    'table',
    'card',
    'tag',
    'text',
    'title',
    'image',
    'modal',
    'pagination',
    'tabs',
    'breadcrumb',
];

export const PRESET_TEMPLATES = {
    list: [
        { type: 'sidebar', name: '左侧侧边栏', title: '侧边栏', text: 'LOGO\n菜单导航', x: 0, y: 0, width: 180, height: 720 },
        { type: 'breadcrumb', name: '面包屑', title: '面包屑', text: '首页 / 列表页', x: 204, y: 24, width: 240, height: 32 },
        { type: 'title', name: '标题', title: '列表页标题', text: '用户列表', x: 204, y: 64, width: 240, height: 48 },
        { type: 'search', name: '搜索框', title: '搜索框', text: '搜索关键词', x: 204, y: 128, width: 280, height: 44 },
        { type: 'button', name: '按钮', title: '新建按钮', text: '新建', x: 500, y: 128, width: 120, height: 40 },
        { type: 'table', name: '表格区', title: '表格', text: '列表内容', x: 204, y: 188, width: 720, height: 420 },
        { type: 'pagination', name: '分页', title: '分页', text: '上一页 1 2 3 下一页', x: 704, y: 624, width: 220, height: 36 },
    ],
};

export function snapToGrid(value, grid = GRID_SIZE) {
    return Math.round(Number(value || 0) / grid) * grid;
}

export function softSnap(value, grid = GRID_SIZE) {
    const numeric = Number(value || 0);
    return Math.round(numeric / grid) * grid;
}

export function createNode({
    id,
    type = 'text',
    name,
    title,
    text = '',
    x = 40,
    y = 40,
    width,
    height,
    parentId = 'root',
}) {
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
    };
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
    return String(value || '')
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean);
}

export function resolveParentId(nodes, activeId, preferredParentId = 'root') {
    if (!activeId) {
        return preferredParentId;
    }
    const node = nodes.find((item) => item.id === activeId);
    if (!node) {
        return preferredParentId;
    }
    return node.type === 'card' || node.type === 'modal' ? node.id : (node.parentId || preferredParentId);
}

export function findAlignmentGuides(node, nodes) {
    const guides = { x: null, y: null };
    nodes.filter((item) => item.id !== node.id).forEach((item) => {
        if (Math.abs(item.x - node.x) <= ALIGN_THRESHOLD) {
            guides.x = item.x;
        }
        if (Math.abs(item.y - node.y) <= ALIGN_THRESHOLD) {
            guides.y = item.y;
        }
    });
    return guides;
}

export function applyAlignment(node, guides) {
    return {
        ...node,
        x: guides.x ?? node.x,
        y: guides.y ?? node.y,
    };
}

export function updateNodePosition(node, deltaX, deltaY, guides = null) {
    const moved = {
        ...node,
        x: Math.max(0, softSnap(node.x + deltaX)),
        y: Math.max(0, softSnap(node.y + deltaY)),
    };
    return guides ? applyAlignment(moved, guides) : moved;
}

export function updateNodeSize(node, deltaWidth, deltaHeight) {
    return {
        ...node,
        width: Math.max(GRID_SIZE * 3, softSnap(node.width + deltaWidth)),
        height: Math.max(GRID_SIZE * 3, softSnap(node.height + deltaHeight)),
    };
}

export function updateNodeText(node, text) {
    return {
        ...node,
        text: String(text || ''),
    };
}

export function updateNodeTitle(node, title) {
    return {
        ...node,
        title: String(title || ''),
    };
}

export function duplicateNode(node) {
    return createNode({
        ...node,
        id: `${node.id}_copy_${Date.now()}`,
        x: node.x + 24,
        y: node.y + 24,
    });
}

export function buildTemplateNodes(templateKey) {
    const template = PRESET_TEMPLATES[templateKey] || [];
    return template.map((item, index) => createNode({ ...item, id: `preset_${templateKey}_${index}` }));
}

export function buildUnifiedJson({ form, canvas = DEFAULT_CANVAS, nodes = [] }) {
    return {
        meta: {
            version: '1.0',
            source: 'visual-editor',
            description: `${form.pageName || '未命名页面'} unified json`,
        },
        form,
        wireframe: {
            canvas,
            nodes: [
                {
                    id: 'root',
                    parentId: null,
                    type: 'frame',
                    name: form.pageName || '未命名页面',
                    title: form.pageName || '未命名页面',
                    text: '',
                    x: 0,
                    y: 0,
                    width: canvas.width,
                    height: canvas.height,
                },
                ...nodes,
            ],
        },
    };
}

export function parseUnifiedJson(input) {
    const data = typeof input === 'string' ? JSON.parse(input) : input;
    return {
        form: {
            ...DEFAULT_FORM,
            ...(data.form || {}),
            style: {
                ...DEFAULT_FORM.style,
                ...(data.form?.style || {}),
            },
        },
        canvas: data.wireframe?.canvas || DEFAULT_CANVAS,
        nodes: (data.wireframe?.nodes || []).filter((node) => node.id !== 'root'),
    };
}

export function serializeState({ form, nodes, canvas = DEFAULT_CANVAS }) {
    return JSON.stringify(buildUnifiedJson({ form, nodes, canvas }), null, 4);
}
