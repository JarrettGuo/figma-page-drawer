import { describe, it, expect } from 'vitest';
import { appendTableColumn, appendTableRow, constrainNode, createNode, DEFAULT_CANVAS, normalizeTableConfig, removeTableColumn, removeTableRow, updateNodePosition, updateNodeSize, updateTableCell, updateTableColumns } from '../tool/editor-core.js';

describe('editor-core', () => {
    it('creates node with defaults', () => {
        const node = createNode({ type: 'button' });
        expect(node.type).toBe('button');
        expect(node.width).toBeGreaterThan(0);
    });

    it('constrains node within canvas', () => {
        const node = constrainNode({ id: '1', x: 950, y: 700, width: 200, height: 100 }, DEFAULT_CANVAS);
        expect(node.x + node.width).toBeLessThanOrEqual(DEFAULT_CANVAS.width);
        expect(node.y + node.height).toBeLessThanOrEqual(DEFAULT_CANVAS.height);
    });

    it('moves node by keyboard delta within bounds', () => {
        const node = createNode({ id: '1', type: 'button', x: 0, y: 0, width: 120, height: 40 });
        const moved = updateNodePosition(node, 16, 24, null, DEFAULT_CANVAS);
        expect(moved.x).toBe(16);
        expect(moved.y).toBe(24);
    });

    it('resizes node within bounds', () => {
        const node = createNode({ id: '1', type: 'card', width: 240, height: 140 });
        const resized = updateNodeSize(node, 1000, 1000, DEFAULT_CANVAS);
        expect(resized.width).toBeLessThanOrEqual(DEFAULT_CANVAS.width);
        expect(resized.height).toBeLessThanOrEqual(DEFAULT_CANVAS.height);
    });

    it('creates default table config for table node', () => {
        const node = createNode({ id: 'table_1', type: 'table' });
        expect(node.tableConfig.columns.length).toBeGreaterThan(0);
        expect(node.tableConfig.rows.length).toBeGreaterThan(0);
    });

    it('normalizes table config shape', () => {
        const table = normalizeTableConfig({ columns: ['A', 'B'], rows: [['1']] });
        expect(table.rows[0]).toEqual(['1', '']);
    });

    it('updates table cell content', () => {
        const node = createNode({ id: 'table_2', type: 'table' });
        const updated = updateTableCell(node, 0, 1, 'hello');
        expect(updated.tableConfig.rows[0][1]).toBe('hello');
    });

    it('updates table columns and syncs text', () => {
        const node = createNode({ id: 'table_3', type: 'table' });
        const updated = updateTableColumns(node, '姓名 ｜ 状态 ｜ 时间');
        expect(updated.tableConfig.columns).toEqual(['姓名', '状态', '时间']);
        expect(updated.text).toContain('姓名');
    });

    it('appends and removes table rows', () => {
        const node = createNode({ id: 'table_4', type: 'table' });
        const appended = appendTableRow(node);
        expect(appended.tableConfig.rows.length).toBe(node.tableConfig.rows.length + 1);
        const removed = removeTableRow(appended);
        expect(removed.tableConfig.rows.length).toBe(node.tableConfig.rows.length);
    });

    it('appends and removes table columns', () => {
        const node = createNode({ id: 'table_5', type: 'table' });
        const appended = appendTableColumn(node, '新增列');
        expect(appended.tableConfig.columns.at(-1)).toBe('新增列');
        const removed = removeTableColumn(appended);
        expect(removed.tableConfig.columns.length).toBe(node.tableConfig.columns.length);
    });
});
