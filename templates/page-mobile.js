export function renderMobile(config) {
    const pageName = config.pageName || 'Mobile Page';
    return `async function main() {
    try {
        await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });
        await figma.loadFontAsync({ family: 'Inter', style: 'Bold' });
        const page = figma.currentPage;
        page.children.slice().forEach((node) => node.remove());
        const frame = figma.createFrame();
        frame.name = '${pageName}';
        frame.resize(375, 812);
        frame.fills = [{ type: 'SOLID', color: { r: 0.98, g: 0.98, b: 0.99 } }];
        page.appendChild(frame);
        const title = figma.createText();
        title.characters = '${pageName}';
        title.fontName = { family: 'Inter', style: 'Bold' };
        title.fontSize = 24;
        title.x = 20;
        title.y = 32;
        frame.appendChild(title);
        figma.viewport.scrollAndZoomIntoView([frame]);
        figma.notify('Page generated', { timeout: 3000 });
    } catch (error) {
        figma.notify('ERROR: ' + error.message, { timeout: 10000 });
    }
}
main();`;
}
