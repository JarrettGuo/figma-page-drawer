import { describe, expect, it } from 'vitest';
import { applyAlignment, buildTemplateNodes, buildUnifiedJson, COMPONENT_LIBRARY, constrainNode, createNode, duplicateNode, findAlignmentGuides, normalizeFormInput, parseUnifiedJson, resolveParentId, serializeState, snapToGrid, splitCsv, softSnap, updateNodePosition, updateNodeSize, updateNodeText, updateNodeTitle } from '../tool/editor-core.js';

describe('visual editor core', () => {
    it('creates node with defaults and soft snap', () => {
        const node = createNode({ id: 'n1', x: 13, y: 19, width: 243, height: 119, type: 'input' });
        expect(node.id).toBe('n1');
        expect(node.type).toBe('input');
        expect(node.parentId).toBe('root');
        expect(node.x).toBe(16);
        expect(node.y).toBe(16);
        expect(node.text).toBe('请输入内容');
    });

    it('normalizes main page info only', () => {
        const form = normalizeFormInput({ pageType: 'list', pageName: '审批流列表页', notes: '备注' });
        expect(form.pageType).toBe('list');
        expect(form.pageName).toBe('审批流列表页');
        expect(form.notes).toBe('备注');
        expect(form.style.radius).toBe(12);
    });

    it('builds and serializes unified json', () => {
        const form = normalizeFormInput({ pageName: 'A' });
        const json = buildUnifiedJson({ form, nodes: [createNode({ id: 'n1', name: '区块1' })] });
        expect(json.meta.version).toBe('1.0');
        expect(json.wireframe.nodes[0].id).toBe('root');
        expect(serializeState({ form, nodes: [] })).toContain('"meta"');
    });

    it('supports grid snap and parent resolve', () => {
        expect(snapToGrid(10)).toBe(8);
        expect(softSnap(14)).toBe(16);
        expect(resolveParentId([{ id: 'a', type: 'modal', parentId: 'root' }], 'a')).toBe('a');
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

    it('duplicates node and exposes component library', () => {
        const node = createNode({ id: 'n1', name: 'A' });
        expect(duplicateNode(node).id).not.toBe('n1');
        expect(buildTemplateNodes('list').length).toBeGreaterThan(0);
        expect(COMPONENT_LIBRARY).toContain('sidebar');
        expect(COMPONENT_LIBRARY).toContain('input');
        expect(COMPONENT_LIBRARY).toContain('button');
    });

    it('parses unified json back into editor state', () => {
        const parsed = parseUnifiedJson({ form: { pageType: 'list', pageName: '审批流列表页', notes: '说明' }, wireframe: { canvas: { width: 100, height: 100 }, nodes: [{ id: 'root' }, { id: 'n1', parentId: 'root', type: 'text', name: 'A', title: 'A', text: '', x: 0, y: 0, width: 10, height: 10 }] } });
        expect(parsed.form.pageName).toBe('审批流列表页');
        expect(parsed.form.notes).toBe('说明');
        expect(parsed.nodes.length).toBe(1);
    });

    it('finds and applies alignment guides', () => {
        const base = createNode({ id: 'a', x: 80, y: 160 });
        const moved = createNode({ id: 'b', x: 88, y: 168 });
        const guides = findAlignmentGuides(moved, [base, moved]);
        expect(guides.x).toBe(80);
        expect(applyAlignment(moved, guides).x).toBe(80);
    });

    it('constrains node within canvas bounds', () => {
        const constrained = constrainNode(createNode({ id: 'n2', x: 900, y: 700, width: 200, height: 100 }), { width: 960, height: 720 });
        expect(constrained.x).toBeLessThanOrEqual(760);
        expect(constrained.y).toBeLessThanOrEqual(620);
    });

    it('splits csv safely', () => {
        expect(splitCsv('a, b,, c')).toEqual(['a', 'b', 'c']);
    });
});
