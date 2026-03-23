figma.showUI(__html__, { width: 520, height: 520 });

figma.ui.onmessage = async (message) => {
    if (message.type === 'cancel') {
        figma.closePlugin();
        return;
    }

    if (message.type !== 'generate-page') {
        return;
    }

    try {
        const payload = message.payload || {};
        await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });
        await figma.loadFontAsync({ family: 'Inter', style: 'Medium' });
        await figma.loadFontAsync({ family: 'Inter', style: 'Bold' });

        const page = figma.currentPage;
        page.children.slice().forEach((node) => node.remove());

        const root = figma.createFrame();
        root.name = payload.name || '新页面';
        root.resize(1440, 1024);
        root.fills = [{ type: 'SOLID', color: hexToRgb('#F5F7FA') }];
        page.appendChild(root);

        if (String(payload.sidebar) !== 'false') {
            const sidebar = figma.createFrame();
            sidebar.name = 'Sidebar';
            sidebar.resize(220, 1024);
            sidebar.fills = [{ type: 'SOLID', color: hexToRgb('#FFFFFF') }];
            sidebar.strokes = [{ type: 'SOLID', color: hexToRgb('#E5E7EB') }];
            sidebar.strokeWeight = 1;
            root.appendChild(sidebar);

            const logo = figma.createText();
            logo.characters = 'LOGO';
            logo.fontName = { family: 'Inter', style: 'Bold' };
            logo.fontSize = 18;
            logo.fills = [{ type: 'SOLID', color: hexToRgb('#111827') }];
            logo.x = 24;
            logo.y = 24;
            sidebar.appendChild(logo);
        }

        const wrap = figma.createFrame();
        wrap.name = 'Main';
        wrap.x = String(payload.sidebar) !== 'false' ? 220 : 0;
        wrap.y = 0;
        wrap.resize(String(payload.sidebar) !== 'false' ? 1220 : 1440, 1024);
        wrap.fills = [{ type: 'SOLID', color: hexToRgb('#F5F7FA') }];
        root.appendChild(wrap);

        const title = figma.createText();
        title.characters = payload.name || '新页面';
        title.fontName = { family: 'Inter', style: 'Bold' };
        title.fontSize = 28;
        title.fills = [{ type: 'SOLID', color: hexToRgb(payload.primary || '#2563EB') }];
        title.x = 24;
        title.y = 24;
        wrap.appendChild(title);

        const filter = figma.createFrame();
        filter.name = 'FilterCard';
        filter.x = 24;
        filter.y = 84;
        filter.resize(wrap.width - 48, 96);
        filter.cornerRadius = 12;
        filter.fills = [{ type: 'SOLID', color: hexToRgb('#FFFFFF') }];
        filter.strokes = [{ type: 'SOLID', color: hexToRgb('#E5E7EB') }];
        filter.strokeWeight = 1;
        wrap.appendChild(filter);

        const filters = String(payload.filters || '').split(',').map((item) => item.trim()).filter(Boolean);
        filters.forEach((item, index) => {
            const node = figma.createText();
            node.characters = item;
            node.fontName = { family: 'Inter', style: 'Regular' };
            node.fontSize = 12;
            node.fills = [{ type: 'SOLID', color: hexToRgb('#6B7280') }];
            node.x = 20 + index * 170;
            node.y = 18;
            filter.appendChild(node);
        });

        const table = figma.createFrame();
        table.name = 'TableCard';
        table.x = 24;
        table.y = 196;
        table.resize(wrap.width - 48, 740);
        table.cornerRadius = 12;
        table.fills = [{ type: 'SOLID', color: hexToRgb('#FFFFFF') }];
        table.strokes = [{ type: 'SOLID', color: hexToRgb('#E5E7EB') }];
        table.strokeWeight = 1;
        wrap.appendChild(table);

        const columns = String(payload.columns || '').split(',').map((item) => item.trim()).filter(Boolean);
        columns.forEach((item, index) => {
            const node = figma.createText();
            node.characters = item;
            node.fontName = { family: 'Inter', style: 'Bold' };
            node.fontSize = 13;
            node.fills = [{ type: 'SOLID', color: hexToRgb('#475569') }];
            node.x = 24 + index * 150;
            node.y = 24;
            table.appendChild(node);
        });

        figma.viewport.scrollAndZoomIntoView([root]);
        figma.closePlugin('页面已生成');
    } catch (error) {
        figma.closePlugin('ERROR: ' + error.message);
    }
};

function hexToRgb(hex) {
    const value = String(hex || '#2563EB').replace('#', '');
    const bigint = parseInt(value, 16);
    return {
        r: ((bigint >> 16) & 255) / 255,
        g: ((bigint >> 8) & 255) / 255,
        b: (bigint & 255) / 255,
    };
}
