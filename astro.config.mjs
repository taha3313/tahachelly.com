import { defineConfig } from 'astro/config';
export default defineConfig({ site: 'https://tahachelly.com', output: 'static', trailingSlash: 'always', build: { format: 'directory' } });
