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
        x,
        y,
        width,
        height,
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
