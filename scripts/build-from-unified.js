import fs from 'node:fs';
import path from 'node:path';
import { loadJson, validateUnifiedJson } from './unified-json.js';
import { renderFromUnifiedJson } from '../templates/render-from-unified.js';

function parseArgs(argv) {
    const result = {};
    for (let i = 0; i < argv.length; i += 1) {
        const token = argv[i];
        if (!token.startsWith('--')) continue;
        const key = token.slice(2);
        const next = argv[i + 1];
        if (!next || next.startsWith('--')) {
            result[key] = true;
            continue;
        }
        result[key] = next;
        i += 1;
    }
    return result;
}

const args = parseArgs(process.argv.slice(2));
const inputPath = path.resolve(args.input || 'examples/approval-flow-list-unified.clean.json');
const outputPath = path.resolve(args.output || 'templates/code.js');
const statePath = path.resolve(args.state || 'state/current-page.json');

const data = loadJson(inputPath);
const errors = validateUnifiedJson(data);
if (errors.length > 0) {
    throw new Error(errors.join('\n'));
}

const code = renderFromUnifiedJson(data);
fs.writeFileSync(outputPath, code, 'utf8');
fs.writeFileSync(statePath, JSON.stringify(data, null, 4), 'utf8');
console.log(`Generated code from unified json -> ${outputPath}`);
