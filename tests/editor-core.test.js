import { describe, expect, it } from 'vitest';
import { buildUnifiedJson, createNode, normalizeFormInput, serializeState, splitCsv } from '../tool/editor-core.js';

describe('visual editor core', () => {
    it('creates node with defaults', () => {
        const node = createNode({ id: 'n1' });
        expect(node.id).toBe('n1');
        expect(node.type).toBe('section');
        expect(node.parentId).toBe('root');
    });

    it('normalizes form input', () => {
        const form = normalizeFormInput({
            pageType: 'list',
            pageName: '审批流列表页',
            colorPrimary: '#1677FF',
            radius: '16',
            density: 'compact',
            tableColumns: '名称,状态,时间',
            filters: '关键词,状态',
            buttons: '新建,导出',
        });
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

    it('splits csv safely', () => {
        expect(splitCsv('a, b,, c')).toEqual(['a', 'b', 'c']);
    });
});
