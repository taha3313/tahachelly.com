import { cp, mkdir, rm } from 'node:fs/promises';
const assets = ['styles.css', 'theme.js', 'fonts', 'icons', 'projects', 'favicon.ico', 'favicon.png', 'favicon.svg', 'taha.png', 'taha.webp', 'speakduo-logo.webp', '_redirects', 'robots.txt', 'sitemap.xml', 'profile.md', 'llms.txt'];
await rm('public', { recursive: true, force: true });
await mkdir('public', { recursive: true });
for (const asset of assets) await cp(asset, `public/${asset}`, { recursive: true });
