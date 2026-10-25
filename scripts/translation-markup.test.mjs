import test from 'node:test';
import assert from 'node:assert/strict';
import { parseTranslationMarkup, validateTranslationMarkup } from '../translation-markup.js';
import { readFile } from 'node:fs/promises';
test('all current translations use the safe grammar', async () => {
  for (const locale of ['en','ar','fr','es','de','it','ja','zh']) {
    for (const [key,value] of Object.entries(JSON.parse(await readFile(`src/data/i18n/${locale}.json`)))) validateTranslationMarkup(key,value);
  }
});
test('active HTML, encoded URLs, attributes, and malformed nesting are rejected', () => {
  for (const payload of ['<img src=x onerror="alert(1)">', '<script>alert(1)</script>', '<svg onload="alert(1)"></svg>', '<span onclick="alert(1)">x</span>', '<a href="javascript:alert(1)">x</a>', '<a href="&#106;avascript:alert(1)">x</a>', '<a href="#work" onmouseover="alert(1)">x</a>', '<iframe srcdoc="x"></iframe>', '<span></a>', '<span>', '<!--x-->', '<']) assert.throws(() => parseTranslationMarkup(payload), payload);
});
test('text stays text and safe structure is preserved', () => {
  assert.deepEqual(parseTranslationMarkup('Hi<br><span>there</span> <a href="#work">SpeakDuo</a>'), ['Hi',{tag:'br',children:[]},{tag:'span',children:['there']},' ',{tag:'a',href:'#work',children:['SpeakDuo']}]);
  assert.deepEqual(parseTranslationMarkup('&lt;img onerror=x&gt;'), ['&lt;img onerror=x&gt;']);
  assert.throws(() => validateTranslationMarkup('intro', '<span>hidden markup</span>'));
});
test('the build checker rejects active markup in a translated HTML field', async () => {
  const { mkdtemp, cp, writeFile, rm } = await import('node:fs/promises');
  const { tmpdir } = await import('node:os');
  const { join } = await import('node:path');
  const { spawnSync } = await import('node:child_process');
  const dir = await mkdtemp(join(tmpdir(), 'portfolio-security-'));
  try {
    await cp('src/data/i18n', dir, {recursive: true});
    const file = join(dir, 'fr.json');
    const copy = JSON.parse(await readFile(file, 'utf8'));
    copy.heroTitle += '<img src=x onerror="alert(1)">';
    await writeFile(file, JSON.stringify(copy));
    const result = spawnSync(process.execPath, ['scripts/check-i18n.mjs'], {env: {...process.env, PORTFOLIO_I18N_DIR: dir}, encoding: 'utf8'});
    assert.equal(result.status, 1);
    assert.match(result.stderr, /fr.heroTitle: Only br, span/);
  } finally { await rm(dir, {recursive: true, force: true}); }
});
