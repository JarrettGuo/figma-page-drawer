export const DEFAULT_FORM = {
    pageType: 'list',
    pageName: '未命名页面',
    pageGoal: '',
    targetUser: '',
    platform: 'web',
    pageStyle: 'admin',
    style: {
        colorPrimary: '#1677FF',
        radius: 12,
        density: 'medium',
        looseness: 'loose',
    },
    notes: '',
};

export const DEFAULT_CANVAS = {
    width: 1440,
    height: 1024,
};

export const GRID_SIZE = 8;
export const ALIGN_THRESHOLD = 12;

export const NODE_TYPE_META = {
    sidebar: { label: '侧边栏', color: '#E0E7FF', defaultWidth: 220, defaultHeight: 760 },
    input: { label: '输入框', color: '#FEF3C7', defaultWidth: 220, defaultHeight: 48 },
    button: { label: '按钮', color: '#DBEAFE', defaultWidth: 120, defaultHeight: 40 },
    table: { label: '表格', color: '#DCFCE7', defaultWidth: 640, defaultHeight: 320 },
    card: { label: '卡片', color: '#EDE9FE', defaultWidth: 280, defaultHeight: 160 },
    text: { label: '文本', color: '#F3F4F6', defaultWidth: 240, defaultHeight: 56 },
    header: { label: '页头', color: '#FCE7F3', defaultWidth: 960, defaultHeight: 72 },
    section: { label: '区块', color: '#DBEAFE', defaultWidth: 280, defaultHeight: 120 },
    filter: { label: '筛选区', color: '#FEF3C7', defaultWidth: 520, defaultHeight: 104 },
};

export const COMPONENT_LIBRARY = [
    'sidebar',
    'header',
    'input',
    'button',
    'table',
    'card',
    'text',
    'section',
];

export const PRESET_TEMPLATES = {
    list: [
        { type: 'sidebar', name: '左侧侧边栏', title: '侧边栏', text: 'LOGO\n菜单导航', x: 0, y: 0, width: 220, height: 1024 },
        { type: 'header', name: '页面头部', title: '列表页头部', text: '标题 / 面包屑 / 操作按钮', x: 244, y: 24, width: 1172, height: 72 },
        { type: 'filter', name: '筛选区', title: '筛选区', text: '关键词 / 状态 / 时间', x: 244, y: 120, width: 1172, height: 112 },
        { type: 'table', name: '表格区', title: '表格区', text: '列表内容 / 状态 / 操作', x: 244, y: 256, width: 1172, height: 680 },
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
    type = 'section',
    name,
    title,
    text = '',
    x = 40,
    y = 40,
    width,
    height,
    parentId = 'root',
}) {
    const meta = NODE_TYPE_META[type] || NODE_TYPE_META.section;
    const finalName = name || meta.label || '未命名区块';
    return {
        id: id || `node_${Date.now()}`,
        parentId,
        type,
        name: finalName,
        title: title || finalName,
        text,
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
        pageGoal: raw.pageGoal || '',
        targetUser: raw.targetUser || '',
        platform: raw.platform || 'web',
        pageStyle: raw.pageStyle || 'admin',
        style: {
            colorPrimary: raw.colorPrimary || '#1677FF',
            radius: Number(raw.radius || 12),
            density: raw.density || 'medium',
            looseness: raw.looseness || 'loose',
        },
        notes: raw.notes || '',
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
    return node.type === 'section' || node.type === 'frame' || node.type === 'card' ? node.id : (node.parentId || preferredParentId);
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
