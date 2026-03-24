function esc(value = '') {
    return String(value)
        .replace(/\\/g, '\\\\')
        .replace(/`/g, '\\`')
        .replace(/\$/g, '\\\$');
}

function splitTableColumns(text = '') {
    return String(text)
        .split(/\||｜/)
        .map((item) => item.trim())
        .filter(Boolean)
        .map((item) => item.replace(/（.*?）/g, '').replace(/\(.*?\)/g, '').trim())
        .filter(Boolean);
}

function byType(nodes, type) {
    return nodes.filter((node) => node.type === type);
}

function firstByType(nodes, type) {
    return nodes.find((node) => node.type === type);
}


function isPaginationInsideTable(table, pagination) {
    if (!table || !pagination) return false;
    const tableLeft = Number(table.x || 0);
    const tableTop = Number(table.y || 0);
    const tableRight = tableLeft + Number(table.width || 0);
    const tableBottom = tableTop + Number(table.height || 0);
    const pagLeft = Number(pagination.x || 0);
    const pagTop = Number(pagination.y || 0);
    const pagRight = pagLeft + Number(pagination.width || 0);
    const pagBottom = pagTop + Number(pagination.height || 0);
    const inside = pagLeft >= tableLeft - 24 && pagRight <= tableRight + 24 && pagTop >= tableTop && pagBottom <= tableBottom + 48;
    const nearBottomRight = pagLeft >= tableRight - 260 && pagTop >= tableBottom - 120;
    return inside || nearBottomRight;
}


export function renderFromUnifiedJson(data) {
    const pageName = esc(data?.form?.pageName || '页面');
    const primary = esc(data?.form?.style?.colorPrimary || '#1677FF');
    const radius = Number(data?.form?.style?.radius || 12);
    const nodes = data?.wireframe?.nodes || [];

    const sidebar = firstByType(nodes, 'sidebar');
    const breadcrumb = firstByType(nodes, 'breadcrumb');
    const title = firstByType(nodes, 'title');
    const table = firstByType(nodes, 'table');
    const pagination = firstByType(nodes, 'pagination');
    const searchNodes = byType(nodes, 'search');
    const buttonNodes = byType(nodes, 'button');
    const newButton = buttonNodes.find((node) => /新建/.test(node.text || node.title || ''));
    const refreshButton = buttonNodes.find((node) => /刷新/.test(node.text || node.title || ''));
    const queryButton = buttonNodes.find((node) => /查询/.test(node.text || node.title || ''));
    const resetButton = buttonNodes.find((node) => /重制|重置/.test(node.text || node.title || ''));
    const columns = splitTableColumns(table?.text || '');
    const emptyText = esc(table?.text || '未提供表格字段说明');
    const paginationInsideTable = isPaginationInsideTable(table, pagination);

    const menuItems = sidebar?.text
        ? esc(sidebar.text).split('\\n').filter(Boolean)
        : ['LOGO', '菜单导航'];

    const searchable = searchNodes.map((node) => ({
        text: esc(node.text || node.title || node.name || '搜索'),
        x: Number(node.x || 0),
        y: Number(node.y || 0),
        width: Number(node.width || 152),
        height: Number(node.height || 40),
    }));

    return `async function main() {
    try {
        await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });
        await figma.loadFontAsync({ family: 'Inter', style: 'Medium' });
        await figma.loadFontAsync({ family: 'Inter', style: 'Semi Bold' });
        await figma.loadFontAsync({ family: 'Inter', style: 'Bold' });

        const page = figma.currentPage;
        for (const node of page.children.slice()) node.remove();

        const root = createFrame({ name: '${pageName}', x: 0, y: 0, width: 1440, height: 900, fill: '#F5F7FA' });
        page.appendChild(root);

        const sidebar = createFrame({ name: '侧边栏', x: 0, y: 0, width: 220, height: 900, fill: '#1F2937' });
        root.appendChild(sidebar);
        addText(sidebar, { text: '${esc(menuItems[0] || 'LOGO')}', x: 24, y: 24, fontSize: 24, fontStyle: 'Bold', color: '#FFFFFF' });
        addText(sidebar, { text: '${esc(menuItems[1] || '菜单导航')}', x: 24, y: 70, fontSize: 14, fontStyle: 'Medium', color: '#9CA3AF' });

        ${menuItems.slice(1).map((item, index) => `{
            const active = /${esc(title?.text || pageName)}/.test('${esc(item)}');
            const menu = createFrame({ name: '菜单-${esc(item)}', x: 16, y: ${116 + index * 52}, width: 188, height: 40, fill: active ? '${primary}' : '#1F2937', radius: 8 });
            sidebar.appendChild(menu);
            addText(menu, { text: '${esc(item)}', x: 16, y: 10, fontSize: 14, fontStyle: active ? 'Semi Bold' : 'Regular', color: '#FFFFFF' });
        }`).join('\n')}

        const main = createFrame({ name: '主内容区', x: 220, y: 0, width: 1220, height: 900, fill: '#F5F7FA' });
        root.appendChild(main);
        addText(main, { text: '${esc((breadcrumb?.text || '').split('\n')[0] || '')}', x: 40, y: 28, fontSize: 12, fontStyle: 'Regular', color: '#8C8C8C' });
        addText(main, { text: '${esc(title?.text || pageName)}', x: 40, y: 56, fontSize: 28, fontStyle: 'Bold', color: '#1F1F1F' });

        ${newButton ? `main.appendChild(createButton({ text: '${esc(newButton.text || newButton.title || '新建')}', x: 930, y: 52, width: 100, height: 40, fill: '${primary}', textColor: '#FFFFFF' }));` : ''}
        ${refreshButton ? `main.appendChild(createButton({ text: '${esc(refreshButton.text || refreshButton.title || '刷新')}', x: 1046, y: 52, width: 80, height: 40, fill: '#FFFFFF', textColor: '${primary}', stroke: '${primary}' }));` : ''}

        const filterCard = createFrame({ name: '筛选区', x: 40, y: 116, width: 1140, height: 88, fill: '#FFFFFF', stroke: '#E5E7EB', radius: ${radius} });
        main.appendChild(filterCard);
        ${searchable.map((node, index) => `filterCard.appendChild(createInput({ placeholder: '${node.text}', x: ${24 + index * 192}, y: 20, width: ${Math.max(152, Math.min(220, node.width))}, height: 40 }));`).join('\n        ')}
        ${queryButton ? `filterCard.appendChild(createButton({ text: '${esc(queryButton.text || queryButton.title || '查询')}', x: 920, y: 20, width: 88, height: 40, fill: '${primary}', textColor: '#FFFFFF' }));` : ''}
        ${resetButton ? `filterCard.appendChild(createButton({ text: '${esc(resetButton.text || resetButton.title || '重置')}', x: 1020, y: 20, width: 88, height: 40, fill: '#FFFFFF', textColor: '#1F1F1F', stroke: '#D9D9D9' }));` : ''}

        const tableCard = createFrame({ name: '表格区', x: 40, y: 228, width: 1140, height: 560, fill: '#FFFFFF', stroke: '#E5E7EB', radius: ${radius} });
        main.appendChild(tableCard);
        tableCard.appendChild(createFrame({ name: '表头背景', x: 0, y: 0, width: 1140, height: 52, fill: '#FAFAFA' }));

        ${columns.map((col, index) => `addText(tableCard, { text: '${esc(col)}', x: ${[24,220,470,620,930][index] ?? (24 + index * 160)}, y: 17, fontSize: 14, fontStyle: 'Semi Bold', color: '#1F1F1F' });`).join('\n        ')}

        const empty = createFrame({ name: '空态区域', x: 24, y: 84, width: 1092, height: 360, fill: '#FAFAFA', stroke: '#F0F0F0', radius: ${radius} });
        tableCard.appendChild(empty);
        addText(empty, { text: '暂无列表数据', x: 482, y: 132, fontSize: 18, fontStyle: 'Semi Bold', color: '#8C8C8C' });
        addText(empty, { text: '结构以 unified json 为准，当前未提供真实表格行数据', x: 352, y: 168, fontSize: 13, fontStyle: 'Regular', color: '#B0B0B0' });
        addText(empty, { text: '${emptyText}', x: 196, y: 210, fontSize: 13, fontStyle: 'Regular', color: '#595959' });

        ${pagination ? `const pagination = createFrame({ name: '分页', x: 890, y: 804, width: 290, height: 32, fill: '#F5F7FA' });
        main.appendChild(pagination);
        addText(pagination, { text: '${esc((pagination.text || '').replace(/\n/g, ' '))}', x: 0, y: 8, fontSize: 12, fontStyle: 'Regular', color: '#595959' });` : ''}

        figma.viewport.scrollAndZoomIntoView([root]);
        figma.notify('${pageName}已生成', { timeout: 3000 });
    } catch (error) {
        figma.notify('ERROR: ' + error.message, { timeout: 10000 });
    }
}

function createFrame({ name, x, y, width, height, fill = '#FFFFFF', stroke = null, radius = 0 }) {
    const frame = figma.createFrame();
    frame.name = name;
    frame.x = x;
    frame.y = y;
    frame.resize(width, height);
    frame.fills = [{ type: 'SOLID', color: hexToRgb(fill) }];
    if (stroke) {
        frame.strokes = [{ type: 'SOLID', color: hexToRgb(stroke) }];
        frame.strokeWeight = 1;
    }
    if (radius) frame.cornerRadius = radius;
    return frame;
}

function createButton({ text, x, y, width, height, fill, textColor, stroke = null }) {
    const button = createFrame({ name: text, x, y, width, height, fill, stroke, radius: 8 });
    const label = figma.createText();
    label.characters = text;
    label.fontName = { family: 'Inter', style: 'Medium' };
    label.fontSize = 14;
    label.fills = [{ type: 'SOLID', color: hexToRgb(textColor) }];
    button.appendChild(label);
    label.x = (width - label.width) / 2;
    label.y = (height - label.height) / 2;
    return button;
}

function createInput({ placeholder, x, y, width, height }) {
    const input = createFrame({ name: placeholder, x, y, width, height, fill: '#FFFFFF', stroke: '#D9D9D9', radius: 8 });
    const text = figma.createText();
    text.characters = placeholder;
    text.fontName = { family: 'Inter', style: 'Regular' };
    text.fontSize = 14;
    text.fills = [{ type: 'SOLID', color: hexToRgb('#BFBFBF') }];
    text.x = 12;
    text.y = 11;
    input.appendChild(text);
    return input;
}

function addText(parent, { text, x, y, fontSize = 14, fontStyle = 'Regular', color = '#111827' }) {
    const node = figma.createText();
    node.characters = text;
    node.fontName = { family: 'Inter', style: fontStyle };
    node.fontSize = fontSize;
    node.fills = [{ type: 'SOLID', color: hexToRgb(color) }];
    node.x = x;
    node.y = y;
    parent.appendChild(node);
    return node;
}

function hexToRgb(hex) {
    const value = hex.replace('#', '');
    const bigint = parseInt(value, 16);
    return {
        r: ((bigint >> 16) & 255) / 255,
        g: ((bigint >> 8) & 255) / 255,
        b: (bigint & 255) / 255,
    };
}

main();`;
}
