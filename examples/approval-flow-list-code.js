async function main() {
    try {
        await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });
        await figma.loadFontAsync({ family: 'Inter', style: 'Medium' });
        await figma.loadFontAsync({ family: 'Inter', style: 'Semi Bold' });
        await figma.loadFontAsync({ family: 'Inter', style: 'Bold' });

        const page = figma.currentPage;
        for (const node of page.children.slice()) {
            node.remove();
        }

        const frame = figma.createFrame();
        frame.name = '审批流列表页面';
        frame.resize(960, 720);
        frame.fills = [{ type: 'SOLID', color: hexToRgb('#F7F8FA') }];
        page.appendChild(frame);

        const sidebar = createBlock({ x: 0, y: 0, width: 184, height: 720, name: '侧边栏', fill: '#E0E7FF' });
        frame.appendChild(sidebar);
        addText(sidebar, { x: 16, y: 16, text: 'LOGO', size: 20, weight: 'Bold', color: '#111827' });
        addText(sidebar, { x: 16, y: 56, text: '菜单导航', size: 14, weight: 'Medium', color: '#374151' });

        const breadcrumb = addText(frame, {
            x: 208,
            y: 24,
            text: '首页 / 系统配置 / 审批流配置\n（如果在对应的页面，就高亮对应的标题）',
            size: 12,
            weight: 'Regular',
            color: '#6B7280'
        });
        breadcrumb.name = '面包屑';

        const title = addText(frame, {
            x: 208,
            y: 64,
            text: '审批流配置',
            size: 28,
            weight: 'Bold',
            color: '#111827'
        });
        title.name = '页面标题';

        const addButton = createButton('+ 新建', 688, 64, 120, 40, '#1677FF', '#FFFFFF');
        addButton.name = '新建按钮';
        frame.appendChild(addButton);

        const refreshButton = createButton('刷新', 824, 64, 120, 40, '#FFFFFF', '#1677FF', '#1677FF');
        refreshButton.name = '刷新按钮';
        frame.appendChild(refreshButton);

        const flowSearch = createInput('flow_type搜索', 208, 120, 152, 48);
        flowSearch.name = 'flow_type搜索';
        frame.appendChild(flowSearch);

        const systemSearch = createInput('system_name搜索', 400, 120, 152, 48);
        systemSearch.name = 'system_name搜索';
        frame.appendChild(systemSearch);

        const queryButton = createButton('查询', 608, 120, 120, 40, '#1677FF', '#FFFFFF');
        queryButton.name = '查询按钮';
        frame.appendChild(queryButton);

        const resetButton = createButton('重制', 768, 120, 120, 40, '#FFFFFF', '#111827', '#D1D5DB');
        resetButton.name = '重制按钮';
        frame.appendChild(resetButton);

        const tableCard = createBlock({ x: 208, y: 192, width: 720, height: 424, name: '表格', fill: '#FFFFFF', stroke: '#E5E7EB', radius: 12 });
        frame.appendChild(tableCard);
        addText(tableCard, { x: 20, y: 20, text: 'flow_type ｜ system_name ｜ status ｜ approval_id ｜ 操作', size: 14, weight: 'Semi Bold', color: '#111827' });
        addDivider(tableCard, 16, 52, 688);
        addText(tableCard, { x: 20, y: 72, text: '请基于该草图补真实表格行数据', size: 13, weight: 'Regular', color: '#6B7280' });

        const pagination = createBlock({ x: 704, y: 624, width: 224, height: 40, name: '分页', fill: '#FFFFFF', stroke: '#E5E7EB', radius: 10 });
        frame.appendChild(pagination);
        addText(pagination, { x: 16, y: 10, text: '上一页 1 2 3 下一页（20条每页）', size: 12, weight: 'Regular', color: '#374151' });

        figma.viewport.scrollAndZoomIntoView([frame]);
        figma.notify('审批流列表页面已生成', { timeout: 3000 });
    } catch (error) {
        figma.notify('ERROR: ' + error.message, { timeout: 10000 });
    }
}

function createBlock({ x, y, width, height, name, fill = '#FFFFFF', stroke = null, radius = 0 }) {
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
    if (radius) {
        frame.cornerRadius = radius;
    }
    return frame;
}

function createButton(text, x, y, width, height, fill, textColor, stroke = null) {
    const button = createBlock({ x, y, width, height, name: text, fill, stroke, radius: 10 });
    const label = figma.createText();
    label.characters = text;
    label.fontName = { family: 'Inter', style: 'Medium' };
    label.fontSize = 14;
    label.fills = [{ type: 'SOLID', color: hexToRgb(textColor) }];
    label.x = Math.max(16, (width - label.width) / 2);
    label.y = Math.max(11, (height - label.height) / 2);
    button.appendChild(label);
    return button;
}

function createInput(placeholder, x, y, width, height) {
    const input = createBlock({ x, y, width, height, name: placeholder, fill: '#FFFFFF', stroke: '#D1D5DB', radius: 10 });
    addText(input, { x: 14, y: 15, text: placeholder, size: 13, weight: 'Regular', color: '#9CA3AF' });
    return input;
}

function addDivider(parent, x, y, width) {
    const line = figma.createLine();
    line.x = x;
    line.y = y;
    line.resize(width, 0);
    line.strokes = [{ type: 'SOLID', color: hexToRgb('#E5E7EB') }];
    line.strokeWeight = 1;
    parent.appendChild(line);
    return line;
}

function addText(parent, { x, y, text, size = 14, weight = 'Regular', color = '#111827' }) {
    const node = figma.createText();
    node.characters = text;
    node.fontName = { family: 'Inter', style: weight };
    node.fontSize = size;
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

main();
