import { describe, expect, it } from 'vitest';
import { applyAlignment, buildTemplateNodes, buildUnifiedJson, createNode, duplicateNode, findAlignmentGuides, normalizeFormInput, parseUnifiedJson, resolveParentId, serializeState, snapToGrid, splitCsv, updateNodePosition, updateNodeSize, updateNodeText, updateNodeTitle } from '../tool/editor-core.js';

describe('visual editor core', () => {
    it('creates node with defaults and grid snap', () => {
        const node = createNode({ id: 'n1', x: 13, y: 19, width: 243, height: 119 });
        expect(node.id).toBe('n1');
        expect(node.type).toBe('section');
        expect(node.parentId).toBe('root');
        expect(node.x).toBe(16);
        expect(node.y).toBe(16);
    });

    it('normalizes form input', () => {
        const form = normalizeFormInput({ pageType: 'list', pageName: '审批流列表页', colorPrimary: '#1677FF', radius: '16', density: 'compact', tableColumns: '名称,状态,时间', filters: '关键词,状态', buttons: '新建,导出' });
        expect(form.style.radius).toBe(16);
        expect(form.tableColumns).toEqual(['名称', '状态', '时间']);
        expect(form.buttons).toEqual(['新建', '导出']);
    });

    it('builds and serializes unified json', () => {
        const form = normalizeFormInput({ pageName: 'A', tableColumns: '列1' });
        const json = buildUnifiedJson({ form, nodes: [createNode({ id: 'n1', name: '区块1' })] });
        expect(json.meta.version).toBe('1.0');
        expect(json.wireframe.nodes[0].id).toBe('root');
        expect(serializeState({ form, nodes: [] })).toContain('"meta"');
    });

    it('supports grid snap and parent resolve', () => {
        expect(snapToGrid(10)).toBe(8);
        expect(resolveParentId([{ id: 'a', type: 'section', parentId: 'root' }], 'a')).toBe('a');
    });

    it('updates position and size with constraints', () => {
        const node = createNode({ id: 'n1', width: 120, height: 120 });
        expect(updateNodePosition(node, 15, 17).x).toBe(56);
        expect(updateNodeSize(node, 23, 41).width).toBe(144);
    });

    it('updates inline text and title content', () => {
        const node = createNode({ id: 'n1', text: 'old', title: 'title-old' });
        expect(updateNodeText(node, 'new text').text).toBe('new text');
        expect(updateNodeTitle(node, 'new title').title).toBe('new title');
    });

    it('duplicates node and builds preset nodes', () => {
        const node = createNode({ id: 'n1', name: 'A' });
        expect(duplicateNode(node).id).not.toBe('n1');
        expect(buildTemplateNodes('list').length).toBeGreaterThan(0);
    });

    it('parses unified json back into editor state', () => {
        const parsed = parseUnifiedJson({ form: { pageType: 'list', pageName: '审批流列表页' }, wireframe: { canvas: { width: 100, height: 100 }, nodes: [{ id: 'root' }, { id: 'n1', parentId: 'root', type: 'section', name: 'A', title: 'A', text: '', x: 0, y: 0, width: 10, height: 10 }] } });
        expect(parsed.form.pageName).toBe('审批流列表页');
        expect(parsed.nodes.length).toBe(1);
    });

    it('finds and applies alignment guides', () => {
        const base = createNode({ id: 'a', x: 80, y: 160 });
        const moved = createNode({ id: 'b', x: 84, y: 155 });
        const guides = findAlignmentGuides(moved, [base, moved]);
        expect(guides.x).toBe(80);
        expect(applyAlignment(moved, guides).x).toBe(80);
    });

    it('splits csv safely', () => {
        expect(splitCsv('a, b,, c')).toEqual(['a', 'b', 'c']);
    });
});
