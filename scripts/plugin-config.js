export function normalizePageType(pageType) {
    const value = String(pageType || 'dashboard').toLowerCase();
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

export function defaultPageName(pageType) {
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

export function buildSections(pageType, cardCount, columns) {
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

export function buildConfig(args) {
    const pageType = normalizePageType(args.type || 'dashboard');
    const pageName = args.name || defaultPageName(pageType);
    const platform = pageType === 'mobile-home' ? 'mobile' : 'web';
    const colorPrimary = args.primary || '#2563EB';
    const density = args.density || 'medium';
    const cardCount = Number(args.cards || 4);
    const columns = args.columns
        ? String(args.columns).split(',').map((item) => item.trim()).filter(Boolean)
        : ['订单号', '用户', '金额', '状态'];
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
        form: {
            hasSidebar: String(args.sidebar || 'true') !== 'false',
            tableColumns: columns,
            filters: args.filters
                ? String(args.filters).split(',').map((item) => item.trim()).filter(Boolean)
                : ['关键词', '状态', '创建人'],
        },
    };
}
