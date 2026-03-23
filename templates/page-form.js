export function renderForm(config) {
    return renderSimplePage(config, 'Form Page');
}

function renderSimplePage(config, fallbackName) {
    const pageName = config.pageName || fallbackName;
    return `async function main() {
    try {
        await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });
        await figma.loadFontAsync({ family: 'Inter', style: 'Bold' });
        const page = figma.currentPage;
        page.children.slice().forEach((node) => node.remove());
        const frame = figma.createFrame();
        frame.name = '${pageName}';
        frame.resize(1440, 960);
        frame.fills = [{ type: 'SOLID', color: { r: 0.97, g: 0.97, b: 0.98 } }];
        page.appendChild(frame);
        const title = figma.createText();
        title.characters = '${pageName}';
        title.fontName = { family: 'Inter', style: 'Bold' };
        title.fontSize = 28;
        title.x = 32;
        title.y = 24;
        frame.appendChild(title);
        figma.viewport.scrollAndZoomIntoView([frame]);
        figma.notify('Page generated', { timeout: 3000 });
    } catch (error) {
        figma.notify('ERROR: ' + error.message, { timeout: 10000 });
    }
}
main();`;
}
