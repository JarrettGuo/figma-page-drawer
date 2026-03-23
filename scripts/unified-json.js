import fs from 'node:fs';
import path from 'node:path';

export function parseArgs(argv) {
    const result = {};
    for (let i = 0; i < argv.length; i += 1) {
        const token = argv[i];
        if (!token.startsWith('--')) {
            continue;
        }
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

export function loadJson(filePath) {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

export function buildUnifiedJson({ form, wireframe, source = 'local-wireframe-tool', description = '' }) {
    return {
        meta: {
            version: '1.0',
            source,
            description,
        },
        form,
        wireframe,
    };
}

export function validateUnifiedJson(data) {
    const errors = [];
    if (!data || typeof data !== 'object') {
        errors.push('root must be object');
        return errors;
    }
    if (!data.meta || data.meta.version !== '1.0') {
        errors.push('meta.version must be 1.0');
    }
    if (!data.form || !data.form.pageType || !data.form.pageName) {
        errors.push('form.pageType and form.pageName are required');
    }
    if (!data.wireframe || !data.wireframe.canvas || !Array.isArray(data.wireframe.nodes)) {
        errors.push('wireframe.canvas and wireframe.nodes are required');
    }
    const nodes = data.wireframe?.nodes || [];
    nodes.forEach((node, index) => {
        const required = ['id', 'type', 'name', 'x', 'y', 'width', 'height'];
        required.forEach((field) => {
            if (node[field] === undefined || node[field] === null) {
                errors.push(`wireframe.nodes[${index}].${field} is required`);
            }
        });
    });
    return errors;
}

function main() {
    const args = parseArgs(process.argv.slice(2));
    const command = args.command || 'merge';

    if (command === 'merge') {
        const form = loadJson(path.resolve(args.form));
        const wireframe = loadJson(path.resolve(args.wireframe));
        const output = path.resolve(args.output || 'examples/unified-output.json');
        const unified = buildUnifiedJson({
            form,
            wireframe,
            source: args.source || 'local-wireframe-tool',
            description: args.description || '',
        });
        const errors = validateUnifiedJson(unified);
        if (errors.length > 0) {
            throw new Error(errors.join('\n'));
        }
        fs.writeFileSync(output, JSON.stringify(unified, null, 4), 'utf8');
        console.log(`Unified JSON written to ${output}`);
        return;
    }

    if (command === 'validate') {
        const input = loadJson(path.resolve(args.input));
        const errors = validateUnifiedJson(input);
        if (errors.length > 0) {
            throw new Error(errors.join('\n'));
        }
        console.log('Unified JSON is valid');
        return;
    }

    throw new Error(`Unsupported command: ${command}`);
}

const entryFile = process.argv[1] ? path.resolve(process.argv[1]) : '';
if (entryFile === new URL(import.meta.url).pathname) {
    main();
}
