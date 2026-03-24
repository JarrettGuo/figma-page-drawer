async function main() {
    try {
        await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });
        await figma.loadFontAsync({ family: 'Inter', style: 'Medium' });
        await figma.loadFontAsync({ family: 'Inter', style: 'Semi Bold' });
        await figma.loadFontAsync({ family: 'Inter', style: 'Bold' });

        const page = figma.currentPage;
        for (const node of page.children.slice()) node.remove();

        const root = createFrame({ name: '审批流列表页面', x: 0, y: 0, width: 1440, height: 900, fill: '#F5F7FA' });
        page.appendChild(root);

        const sidebar = createFrame({ name: '侧边栏', x: 0, y: 0, width: 220, height: 900, fill: '#1F2937' });
        root.appendChild(sidebar);
        addText(sidebar, { text: 'LOGO', x: 24, y: 24, fontSize: 24, fontStyle: 'Bold', color: '#FFFFFF' });
        addText(sidebar, { text: '菜单导航', x: 24, y: 70, fontSize: 14, fontStyle: 'Medium', color: '#9CA3AF' });
        ['首页', '系统配置', '审批流配置', '角色权限', '日志管理'].forEach((text, index) => {
            const active = text === '审批流配置';
            const menu = createFrame({ name: `菜单-${text}`, x: 16, y: 116 + index * 52, width: 188, height: 40, fill: active ? '#1677FF' : '#1F2937', radius: 8 });
            sidebar.appendChild(menu);
            addText(menu, { text, x: 16, y: 10, fontSize: 14, fontStyle: active ? 'Semi Bold' : 'Regular', color: '#FFFFFF' });
        });

        const main = createFrame({ name: '主内容区', x: 220, y: 0, width: 1220, height: 900, fill: '#F5F7FA' });
        root.appendChild(main);
        addText(main, { text: '首页 / 系统配置 / 审批流配置', x: 40, y: 28, fontSize: 12, fontStyle: 'Regular', color: '#8C8C8C' });
        addText(main, { text: '审批流配置', x: 40, y: 56, fontSize: 28, fontStyle: 'Bold', color: '#1F1F1F' });
        main.appendChild(createButton({ text: '+ 新建', x: 930, y: 52, width: 100, height: 40, fill: '#1677FF', textColor: '#FFFFFF' }));
        main.appendChild(createButton({ text: '刷新', x: 1046, y: 52, width: 80, height: 40, fill: '#FFFFFF', textColor: '#1677FF', stroke: '#1677FF' }));

        const filterCard = createFrame({ name: '筛选区', x: 40, y: 116, width: 1140, height: 88, fill: '#FFFFFF', stroke: '#E5E7EB', radius: 12 });
        main.appendChild(filterCard);
        filterCard.appendChild(createInput({ placeholder: 'flow_type搜索', x: 24, y: 20, width: 152, height: 40 }));
        filterCard.appendChild(createInput({ placeholder: 'system_name搜索', x: 216, y: 20, width: 152, height: 40 }));
        filterCard.appendChild(createButton({ text: '查询', x: 920, y: 20, width: 88, height: 40, fill: '#1677FF', textColor: '#FFFFFF' }));
        filterCard.appendChild(createButton({ text: '重制', x: 1020, y: 20, width: 88, height: 40, fill: '#FFFFFF', textColor: '#1F1F1F', stroke: '#D9D9D9' }));

        const tableCard = createFrame({ name: '表格区', x: 40, y: 228, width: 1140, height: 560, fill: '#FFFFFF', stroke: '#E5E7EB', radius: 12 });
        main.appendChild(tableCard);
        tableCard.appendChild(createFrame({ name: '表头背景', x: 0, y: 0, width: 1140, height: 52, fill: '#FAFAFA' }));
        [
            { text: 'flow_type', x: 24 },
            { text: 'system_name', x: 220 },
            { text: 'status', x: 470 },
            { text: 'approval_id', x: 620 },
            { text: '操作', x: 930 }
        ].forEach((col) => addText(tableCard, { text: col.text, x: col.x, y: 17, fontSize: 14, fontStyle: 'Semi Bold', color: '#1F1F1F' }));

        const empty = createFrame({ name: '空态区域', x: 24, y: 84, width: 1092, height: 360, fill: '#FAFAFA', stroke: '#F0F0F0', radius: 12 });
        tableCard.appendChild(empty);
        addText(empty, { text: '暂无列表数据', x: 482, y: 132, fontSize: 18, fontStyle: 'Semi Bold', color: '#8C8C8C' });
        addText(empty, { text: '结构以 unified json 为准，当前未提供真实表格行数据', x: 352, y: 168, fontSize: 13, fontStyle: 'Regular', color: '#B0B0B0' });
        addText(empty, { text: 'flow_type ｜ system_name ｜ status ｜ approval_id ｜ 操作（详情、编辑、删除）', x: 196, y: 210, fontSize: 13, fontStyle: 'Regular', color: '#595959' });

        const pagination = createFrame({ name: '分页', x: 890, y: 804, width: 290, height: 32, fill: '#F5F7FA' });
        main.appendChild(pagination);
        addText(pagination, { text: '上一页 1 2 3 下一页 20条/页', x: 0, y: 8, fontSize: 12, fontStyle: 'Regular', color: '#595959' });

        figma.viewport.scrollAndZoomIntoView([root]);
        figma.notify('审批流列表页面已生成', { timeout: 3000 });
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
    const button = createFrame({ name: text, x, y, width, height, fill, textColor, stroke, radius: 8 });
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

main();
