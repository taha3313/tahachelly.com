import { createHash } from 'node:crypto';
import { readFile, readdir, writeFile } from 'node:fs/promises';
async function htmlFiles(dir) {
  const files = [];
  for (const item of await readdir(dir, {withFileTypes: true})) {
    const path = `${dir}/${item.name}`;
    if (item.isDirectory()) files.push(...await htmlFiles(path));
    else if (item.name.endsWith('.html')) files.push(path);
  }
  return files;
}
const hashes = new Set();
for (const file of await htmlFiles('dist')) {
  const html = await readFile(file, 'utf8');
  for (const script of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
    if (!/\bsrc\s*=/.test(script[1])) hashes.add(`'sha256-${createHash('sha256').update(script[2]).digest('base64')}'`);
  }
}
if (!hashes.size) throw new Error('No inline script hashes found; refusing to publish an incomplete CSP.');
const headers = (await readFile('_headers', 'utf8')).replace(/script-src [^;]+;/, `script-src 'self' https://static.cloudflareinsights.com ${[...hashes].sort().join(' ')};`);
for (const path of ['_headers', 'public/_headers', 'dist/_headers']) await writeFile(path, headers);
console.log(`Security headers generated with ${hashes.size} inline script hashes.`);
