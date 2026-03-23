import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { buildConfig } from '../scripts/plugin-config.js';

const rootDir = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');

describe('plugin v2 assets', () => {
    it('builds config from form-like payload', () => {
        const config = buildConfig({
            type: 'list',
            name: '审批流列表页',
            primary: '#1677FF',
            sidebar: 'true',
            columns: '审批流名称,状态,创建人',
            filters: '流程名称,状态',
        });
        expect(config.pageType).toBe('list');
        expect(config.pageName).toBe('审批流列表页');
        expect(config.form.hasSidebar).toBe(true);
        expect(config.form.tableColumns).toEqual(['审批流名称', '状态', '创建人']);
    });

    it('keeps manifest ui entry', () => {
        const manifest = fs.readFileSync(path.join(rootDir, 'templates/manifest.json'), 'utf8');
        expect(manifest).toContain('"ui": "ui.html"');
    });

    it('keeps ui submit bridge', () => {
        const html = fs.readFileSync(path.join(rootDir, 'templates/ui.html'), 'utf8');
        expect(html).toContain("type: 'generate-page'");
        expect(html).toContain('parent.postMessage');
    });

    it('keeps code.js figma ui bridge', () => {
        const code = fs.readFileSync(path.join(rootDir, 'templates/plugin-entry-v2.js'), 'utf8');
        expect(code).toContain('figma.showUI(__html__');
        expect(code).toContain('figma.ui.onmessage');
    });
});
