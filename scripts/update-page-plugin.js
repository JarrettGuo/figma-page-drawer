import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const rootDir = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const statePath = path.join(rootDir, 'state/current-page.json');

const args = parseArgs(process.argv.slice(2));
const current = JSON.parse(fs.readFileSync(statePath, 'utf8'));
const next = applyUpdates(current, args);
fs.writeFileSync(statePath, JSON.stringify(next, null, 4), 'utf8');

const childArgs = [
    'scripts/build-page-plugin.js',
    '--type', next.pageType,
    '--name', next.pageName,
    '--primary', next.style.colorPrimary,
    '--density', next.style.density,
    '--cards', String(next.sections.find((item) => item.type === 'stats-cards')?.count || 4),
    '--columns', (next.sections.find((item) => item.type === 'table')?.columns || []).join(','),
    '--has-screenshot', String(next.reference.hasScreenshot),
    '--reference-mode', next.reference.referenceMode,
];

const result = spawnSync('node', childArgs, {
    cwd: rootDir,
    stdio: 'inherit',
});

if (result.status !== 0) {
    process.exit(result.status || 1);
}

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

function applyUpdates(current, args) {
    const next = structuredClone(current);
    if (args.name) {
        next.pageName = args.name;
    }
    if (args.primary) {
        next.style.colorPrimary = args.primary;
    }
    if (args.density) {
        next.style.density = args.density;
    }
    if (args.cards) {
        const cards = next.sections.find((item) => item.type === 'stats-cards');
        if (cards) {
            cards.count = Number(args.cards);
        }
    }
    if (args.columns) {
        const table = next.sections.find((item) => item.type === 'table');
        if (table) {
            table.columns = args.columns.split(',').map((item) => item.trim()).filter(Boolean);
        }
    }
    if (args['has-screenshot']) {
        next.reference.hasScreenshot = String(args['has-screenshot']) === 'true';
    }
    if (args['reference-mode']) {
        next.reference.referenceMode = args['reference-mode'];
    }
    return next;
}
