import fs from 'node:fs';
import path from 'node:path';
import { renderDashboard } from '../templates/page-dashboard.js';
import { renderList } from '../templates/page-list.js';
import { renderForm } from '../templates/page-form.js';
import { renderDetail } from '../templates/page-detail.js';
import { renderMobile } from '../templates/page-mobile.js';

const rootDir = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const statePath = path.join(rootDir, 'state/current-page.json');
const outputPath = path.join(rootDir, 'templates/code.js');

const args = parseArgs(process.argv.slice(2));
const config = buildConfig(args);
const code = renderByType(config.pageType, config);

fs.writeFileSync(outputPath, code, 'utf8');
fs.writeFileSync(statePath, JSON.stringify(config, null, 4), 'utf8');
console.log(`Generated ${config.pageType} -> ${outputPath}`);

function parseArgs(argv) {
    const result = {};
    for (let i = 0; i < argv.length; i += 1) {
        const token = argv[i];
        if (token.startsWith('--')) {
            const key = token.slice(2);
            const next = argv[i + 1];
            if (!next || next.startsWith('--')) {
                result[key] = true;
            } else {
                result[key] = next;
                i += 1;
            }
        }
    }
    return result;
}

function buildConfig(args) {
    const pageType = normalizePageType(args.type || 'dashboard');
    const pageName = args.name || defaultPageName(pageType);
    const platform = pageType === 'mobile-home' ? 'mobile' : 'web';
    const colorPrimary = args.primary || '#2563EB';
    const density = args.density || 'medium';
    const cardCount = Number(args.cards || 4);
    const columns = args.columns ? args.columns.split(',').map((item) => item.trim()).filter(Boolean) : ['订单号', '用户', '金额', '状态'];
    const hasScreenshot = String(args['has-screenshot'] || 'false') === 'true';
    const referenceMode = args['reference-mode'] || (hasScreenshot ? 'structure-and-style' : 'none');

    return {
        pageType,
        platform,
        pageName,
        style: {
            theme: 'light',
            colorPrimary,
            radius: 12,
            density,
        },
        sections: buildSections(pageType, cardCount, columns),
        reference: {
            hasScreenshot,
            referenceMode,
            derivedStyle: {},
        },
    };
}

function buildSections(pageType, cardCount, columns) {
    if (pageType === 'dashboard') {
        return [
            { type: 'header', enabled: true },
            { type: 'stats-cards', count: cardCount },
            { type: 'table', enabled: true, columns },
        ];
    }
    if (pageType === 'list') {
        return [
            { type: 'header', enabled: true },
            { type: 'table', enabled: true, columns },
        ];
    }
    return [{ type: 'content', enabled: true }];
}

function renderByType(pageType, config) {
    if (pageType === 'dashboard') {
        return renderDashboard(config);
    }
    if (pageType === 'list') {
        return renderList(config);
    }
    if (pageType === 'form') {
        return renderForm(config);
    }
    if (pageType === 'detail') {
        return renderDetail(config);
    }
    if (pageType === 'mobile-home' || pageType === 'profile') {
        return renderMobile(config);
    }
    throw new Error(`Unsupported page type: ${pageType}`);
}

function normalizePageType(pageType) {
    const value = pageType.toLowerCase();
    const mapping = {
        dashboard: 'dashboard',
        list: 'list',
        form: 'form',
        detail: 'detail',
        login: 'form',
        'mobile-home': 'mobile-home',
        mobile: 'mobile-home',
        profile: 'profile',
    };
    if (!mapping[value]) {
        throw new Error(`Unsupported page type: ${pageType}`);
    }
    return mapping[value];
}

function defaultPageName(pageType) {
    const mapping = {
        dashboard: 'Dashboard 页面',
        list: '列表页面',
        form: '表单页面',
        detail: '详情页面',
        'mobile-home': '移动端首页',
        profile: '个人中心页',
    };
    return mapping[pageType] || '页面';
}
