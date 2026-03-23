import { describe, expect, it } from 'vitest';
import { buildUnifiedJson, createNode, normalizeFormInput, resolveParentId, serializeState, snapToGrid, splitCsv, updateNodePosition, updateNodeSize } from '../tool/editor-core.js';

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

    it('splits csv safely', () => {
        expect(splitCsv('a, b,, c')).toEqual(['a', 'b', 'c']);
    });
});
