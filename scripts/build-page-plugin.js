import fs from 'node:fs';
import path from 'node:path';
import { buildConfig } from './plugin-config.js';
import { renderByType } from './render-page.js';

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

