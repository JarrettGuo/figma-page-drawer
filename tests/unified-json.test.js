import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { buildUnifiedJson, validateUnifiedJson } from '../scripts/unified-json.js';

const rootDir = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');

describe('unified json workflow', () => {
    it('builds unified json from form and wireframe data', () => {
        const form = JSON.parse(fs.readFileSync(path.join(rootDir, 'examples/approval-flow-form.json'), 'utf8'));
        const wireframe = JSON.parse(fs.readFileSync(path.join(rootDir, 'examples/approval-flow-wireframe.json'), 'utf8'));
        const unified = buildUnifiedJson({ form, wireframe, source: 'unit-test' });
        expect(unified.meta.version).toBe('1.0');
        expect(unified.form.pageName).toBe('审批流列表页');
        expect(unified.wireframe.nodes.length).toBeGreaterThan(0);
    });

    it('validates bundled unified sample', () => {
        const unified = JSON.parse(fs.readFileSync(path.join(rootDir, 'examples/approval-flow-unified.json'), 'utf8'));
        expect(validateUnifiedJson(unified)).toEqual([]);
    });

    it('reports missing required fields', () => {
        const errors = validateUnifiedJson({ meta: { version: '1.0' }, form: {}, wireframe: { nodes: [] } });
        expect(errors.length).toBeGreaterThan(0);
    });
});
