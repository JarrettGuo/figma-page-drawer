import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, test } from 'vitest';
import { execFileSync } from 'node:child_process';

const rootDir = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const codePath = path.join(rootDir, 'templates/code.js');
const statePath = path.join(rootDir, 'state/current-page.json');

describe('build-page-plugin', () => {
    test('should generate dashboard code and state', () => {
        execFileSync('node', ['scripts/build-page-plugin.js', '--type', 'dashboard', '--name', '订单工作台', '--cards', '6', '--primary', '#16A34A', '--columns', '订单号,状态,创建时间'], {
            cwd: rootDir,
        });

        const code = fs.readFileSync(codePath, 'utf8');
        const state = JSON.parse(fs.readFileSync(statePath, 'utf8'));

        expect(code).toContain('订单工作台');
        expect(code).toContain('#16A34A');
        expect(state.pageType).toBe('dashboard');
        expect(state.pageName).toBe('订单工作台');
        expect(state.sections.find((item) => item.type === 'stats-cards').count).toBe(6);
        expect(state.sections.find((item) => item.type === 'table').columns).toEqual(['订单号', '状态', '创建时间']);
    });

    test('should update state and regenerate code', () => {
        execFileSync('node', ['scripts/update-page-plugin.js', '--name', '订单工作台-优化版', '--cards', '3', '--primary', '#DC2626'], {
            cwd: rootDir,
        });

        const code = fs.readFileSync(codePath, 'utf8');
        const state = JSON.parse(fs.readFileSync(statePath, 'utf8'));

        expect(code).toContain('订单工作台-优化版');
        expect(code).toContain('#DC2626');
        expect(state.pageName).toBe('订单工作台-优化版');
        expect(state.style.colorPrimary).toBe('#DC2626');
        expect(state.sections.find((item) => item.type === 'stats-cards').count).toBe(3);
    });
});
