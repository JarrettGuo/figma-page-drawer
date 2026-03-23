import { renderDashboard } from '../templates/page-dashboard.js';
import { renderList } from '../templates/page-list.js';
import { renderForm } from '../templates/page-form.js';
import { renderDetail } from '../templates/page-detail.js';
import { renderMobile } from '../templates/page-mobile.js';

export function renderByType(pageType, config) {
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
