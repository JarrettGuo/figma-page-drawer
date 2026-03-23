export function renderList(config) {
    const pageName = config.pageName || 'List Page';
    const primary = config.style?.colorPrimary || '#2563EB';
    return `async function main() {
    try {
        await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });
        await figma.loadFontAsync({ family: 'Inter', style: 'Bold' });
        const page = figma.currentPage;
        page.children.slice().forEach((node) => node.remove());
        const frame = figma.createFrame();
        frame.name = '${pageName}';
        frame.resize(1440, 960);
        frame.fills = [{ type: 'SOLID', color: hexToRgb('#F7F8FA') }];
        page.appendChild(frame);
        const title = figma.createText();
        title.characters = '${pageName}';
        title.fontName = { family: 'Inter', style: 'Bold' };
        title.fontSize = 28;
        title.fills = [{ type: 'SOLID', color: hexToRgb('${primary}') }];
        title.x = 32;
        title.y = 24;
        frame.appendChild(title);
        figma.viewport.scrollAndZoomIntoView([frame]);
        figma.notify('Page generated', { timeout: 3000 });
    } catch (error) {
        figma.notify('ERROR: ' + error.message, { timeout: 10000 });
    }
}
function hexToRgb(hex) {
    const value = hex.replace('#', '');
    const bigint = parseInt(value, 16);
    return { r: ((bigint >> 16) & 255) / 255, g: ((bigint >> 8) & 255) / 255, b: (bigint & 255) / 255 };
}
main();`;
}
