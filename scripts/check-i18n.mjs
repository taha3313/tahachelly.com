import { readFile, readdir } from 'node:fs/promises';
import assert from 'node:assert/strict';
const locales = ['en', 'ar', 'es', 'de', 'fr', 'it', 'zh', 'ja'];
const copies = Object.fromEntries(await Promise.all(locales.map(async locale => [locale, JSON.parse(await readFile(`src/data/i18n/${locale}.json`, 'utf8'))])));
const keys = Object.keys(copies.en).sort();
const glossary = JSON.parse(await readFile('src/data/i18n/glossary.json', 'utf8'));
const problems = [];
const escaped = term => term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const contains = (text, term) => new RegExp(`(?<![a-z])${escaped(term)}(?![a-z])`, 'i').test(text);
for (const locale of locales) {
  try { assert.deepEqual(Object.keys(copies[locale]).sort(), keys); } catch { problems.push(`${locale}: locale keys differ from English`); }
  for (const key of keys) {
    const value = copies[locale][key];
    if (typeof value !== 'string' || !value.trim()) { problems.push(`${locale}.${key}: missing or empty`); continue; }
    for (const term of glossary.terms) {
      if (contains(copies.en[key], term) && !contains(value, term)) problems.push(`${locale}.${key}: preserve ${term}`);
    }
    // Links embedded in translated HTML must point at the same destination.
    const links = text => [...text.matchAll(/href="([^"]+)"/g)].map(m => m[1]).sort();
    try { assert.deepEqual(links(value), links(copies.en[key])); } catch { problems.push(`${locale}.${key}: translated HTML changed a link`); }
  }
}
async function sourceFiles(dir) {
  const files = [];
  for (const item of await readdir(dir, { withFileTypes: true })) {
    const path = `${dir}/${item.name}`;
    if (item.isDirectory()) files.push(...await sourceFiles(path));
    else if (item.name.endsWith('.astro')) files.push(path);
  }
  return files;
}
for (const file of await sourceFiles('src')) {
  const source = await readFile(file, 'utf8');
  for (const match of source.matchAll(/data-i18n(?:-html|-aria)?="([^"]+)"/g)) {
    if (!(match[1] in copies.en)) problems.push(`${file}: unknown key ${match[1]}`);
  }
}
if (problems.length) { console.error(problems.join('\n')); process.exitCode = 1; }
else console.log(`Translation checks passed: ${locales.length} locales, ${keys.length} keys each, protected terms and embedded links intact.`);
