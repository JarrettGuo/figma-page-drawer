export const DEFAULT_FORM = {
    pageType: 'list',
    pageName: '未命名页面',
    platform: 'web',
    style: {
        colorPrimary: '#1677FF',
        radius: 12,
        density: 'medium',
    },
    tableColumns: ['列1', '列2'],
    filters: ['筛选项1'],
    buttons: ['新建'],
    notes: '',
};

export const DEFAULT_CANVAS = {
    width: 1440,
    height: 1024,
};

export const GRID_SIZE = 8;

export function snapToGrid(value, grid = GRID_SIZE) {
    return Math.round(Number(value || 0) / grid) * grid;
}

export function createNode({
    id,
    type = 'section',
    name = '未命名区块',
    text = '',
    x = 40,
    y = 40,
    width = 240,
    height = 120,
    parentId = 'root',
}) {
    return {
        id: id || `node_${Date.now()}`,
        parentId,
        type,
        name,
        text,
        x: snapToGrid(x),
        y: snapToGrid(y),
        width: Math.max(GRID_SIZE, snapToGrid(width)),
        height: Math.max(GRID_SIZE, snapToGrid(height)),
    };
}

export function normalizeFormInput(raw) {
    return {
        pageType: raw.pageType || 'list',
        pageName: raw.pageName || '未命名页面',
        platform: raw.platform || 'web',
        style: {
            colorPrimary: raw.colorPrimary || '#1677FF',
            radius: Number(raw.radius || 12),
            density: raw.density || 'medium',
        },
        tableColumns: splitCsv(raw.tableColumns),
        filters: splitCsv(raw.filters),
        buttons: splitCsv(raw.buttons),
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
    return node.type === 'section' || node.type === 'frame' ? node.id : (node.parentId || preferredParentId);
}

export function updateNodePosition(node, deltaX, deltaY) {
    return {
        ...node,
        x: Math.max(0, snapToGrid(node.x + deltaX)),
        y: Math.max(0, snapToGrid(node.y + deltaY)),
    };
}

export function updateNodeSize(node, deltaWidth, deltaHeight) {
    return {
        ...node,
        width: Math.max(GRID_SIZE * 4, snapToGrid(node.width + deltaWidth)),
        height: Math.max(GRID_SIZE * 4, snapToGrid(node.height + deltaHeight)),
    };
}

export function updateNodeText(node, text) {
    return {
        ...node,
        text: String(text || ''),
    };
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

export function serializeState({ form, nodes, canvas = DEFAULT_CANVAS }) {
    return JSON.stringify(buildUnifiedJson({ form, nodes, canvas }), null, 4);
}
