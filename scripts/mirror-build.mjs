import { copyFile } from 'node:fs/promises';
// Preserve the root HTML snapshot required by the static publishing workflow.
await copyFile('dist/index.html', 'index.html');
