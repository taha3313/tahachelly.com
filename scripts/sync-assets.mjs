import { cp, mkdir, rm, readFile, writeFile } from 'node:fs/promises';
const locales = ['en', 'ar', 'es', 'de', 'fr', 'it', 'zh', 'ja'];
const copy = Object.fromEntries(await Promise.all(locales.map(async locale => [locale, JSON.parse(await readFile(`src/data/i18n/${locale}.json`, 'utf8'))])));
await writeFile('portfolio-i18n.js', `// Generated from src/data/i18n/*.json.
window.portfolioTranslations = ${JSON.stringify(copy)};
`);
const assets = ['portfolio-i18n.js', 'Taha_Chelly.pdf', 'styles.css', 'theme.js', 'fonts', 'icons', 'projects', 'favicon.ico', 'favicon.png', 'favicon.svg', 'taha.png', 'taha.webp', 'speakduo-logo.webp', '_headers', '_redirects', 'robots.txt', 'sitemap.xml', 'profile.md', 'llms.txt'];
await rm('public', { recursive: true, force: true });
await mkdir('public', { recursive: true });
for (const asset of assets) await cp(asset, `public/${asset}`, { recursive: true });
