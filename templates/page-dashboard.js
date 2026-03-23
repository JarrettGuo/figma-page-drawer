export function renderDashboard(config) {
    const pageName = config.pageName || 'Dashboard';
    const primary = config.style?.colorPrimary || '#2563EB';
    const density = config.style?.density || 'medium';
    const cardCount = config.sections?.find((item) => item.type === 'stats-cards')?.count || 4;
    const tableColumns = config.sections?.find((item) => item.type === 'table')?.columns || ['订单号', '用户', '金额', '状态'];

    return `async function main() {
    try {
        await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });
        await figma.loadFontAsync({ family: 'Inter', style: 'Medium' });
        await figma.loadFontAsync({ family: 'Inter', style: 'Semi Bold' });
        await figma.loadFontAsync({ family: 'Inter', style: 'Bold' });

        const page = figma.currentPage;
        const oldNodes = page.children.slice();
        for (const node of oldNodes) {
            node.remove();
        }

        const frame = figma.createFrame();
        frame.name = '${pageName}';
        frame.resize(1440, 1024);
        frame.fills = [{ type: 'SOLID', color: hexToRgb('#F7F8FA') }];
        frame.layoutMode = 'VERTICAL';
        frame.paddingTop = 24;
        frame.paddingBottom = 24;
        frame.paddingLeft = 24;
        frame.paddingRight = 24;
        frame.itemSpacing = ${density === 'high' ? 12 : 16};
        page.appendChild(frame);

        const title = figma.createText();
        title.characters = '${pageName}';
        title.fontName = { family: 'Inter', style: 'Bold' };
        title.fontSize = 28;
        title.fills = [{ type: 'SOLID', color: hexToRgb('#111827') }];
        frame.appendChild(title);

        const cardsRow = figma.createFrame();
        cardsRow.name = 'StatsRow';
        cardsRow.layoutMode = 'HORIZONTAL';
        cardsRow.itemSpacing = 16;
        cardsRow.fills = [];
        frame.appendChild(cardsRow);

        for (let i = 0; i < ${cardCount}; i += 1) {
            const card = figma.createFrame();
            card.name = 'StatCard-' + (i + 1);
            card.resize(320, 120);
            card.cornerRadius = 12;
            card.fills = [{ type: 'SOLID', color: hexToRgb('#FFFFFF') }];
            card.effects = [{ type: 'DROP_SHADOW', color: { r: 0, g: 0, b: 0, a: 0.06 }, offset: { x: 0, y: 4 }, radius: 12, spread: 0, visible: true, blendMode: 'NORMAL' }];
            card.layoutMode = 'VERTICAL';
            card.paddingTop = 16;
            card.paddingBottom = 16;
            card.paddingLeft = 16;
            card.paddingRight = 16;
            card.itemSpacing = 8;
            cardsRow.appendChild(card);

            const label = figma.createText();
            label.characters = '指标 ' + (i + 1);
            label.fontName = { family: 'Inter', style: 'Regular' };
            label.fontSize = 14;
            label.fills = [{ type: 'SOLID', color: hexToRgb('#6B7280') }];
            card.appendChild(label);

            const value = figma.createText();
            value.characters = '128,000';
            value.fontName = { family: 'Inter', style: 'Bold' };
            value.fontSize = 24;
            value.fills = [{ type: 'SOLID', color: hexToRgb('${primary}') }];
            card.appendChild(value);
        }

        const table = figma.createFrame();
        table.name = 'TableCard';
        table.resize(1200, 420);
        table.cornerRadius = 12;
        table.fills = [{ type: 'SOLID', color: hexToRgb('#FFFFFF') }];
        table.layoutMode = 'VERTICAL';
        table.paddingTop = 16;
        table.paddingBottom = 16;
        table.paddingLeft = 16;
        table.paddingRight = 16;
        table.itemSpacing = 12;
        frame.appendChild(table);

        const header = figma.createText();
        header.characters = '数据列表';
        header.fontName = { family: 'Inter', style: 'Semi Bold' };
        header.fontSize = 18;
        header.fills = [{ type: 'SOLID', color: hexToRgb('#111827') }];
        table.appendChild(header);

        const columns = figma.createText();
        columns.characters = ${JSON.stringify(tableColumns.join(' / '))};
        columns.fontName = { family: 'Inter', style: 'Medium' };
        columns.fontSize = 14;
        columns.fills = [{ type: 'SOLID', color: hexToRgb('#374151') }];
        table.appendChild(columns);

        figma.viewport.scrollAndZoomIntoView([frame]);
        figma.notify('Page generated', { timeout: 3000 });
    } catch (error) {
        figma.notify('ERROR: ' + error.message, { timeout: 10000 });
    }
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
