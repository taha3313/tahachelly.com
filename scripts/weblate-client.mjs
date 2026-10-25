import { readFile, mkdir } from 'node:fs/promises';
import { homedir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';
export const root = fileURLToPath(new URL('../', import.meta.url));
export const stateDir = process.env.TAHA_WEBLATE_STATE_DIR || join(homedir(), '.local/share/tahachelly-weblate');
export const base = 'http://127.0.0.1:8090';
export const project = 'tahachelly';
export const component = 'website';
export const locales = ['en', 'ar', 'es', 'de', 'fr', 'it', 'zh', 'ja'];
export async function request(path, options = {}) {
  const token = (await readFile(join(stateDir, 'api-token'), 'utf8')).trim();
  const headers = { Authorization: `Token ${token}`, Accept: 'application/json', ...options.headers };
  const response = await fetch(base + path, { ...options, headers, redirect: 'error', signal: AbortSignal.timeout(180000) });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Weblate ${options.method || 'GET'} ${path}: ${response.status} ${text.slice(0, 700)}`);
  }
  return response;
}
export async function json(path, method = 'GET', body) {
  return (await request(path, {method, ...(body === undefined ? {} : {body:JSON.stringify(body), headers:{'Content-Type':'application/json'}})})).json();
}
export async function runDocker(args, input) {
  await mkdir(stateDir, { recursive: true, mode: 0o700 });
  return new Promise((resolve, reject) => {
    const child = spawn('docker', ['compose', '-f', join(root, 'tools/weblate/compose.yaml'), ...args], {cwd:root,env:{...process.env,TAHA_WEBLATE_STATE_DIR:stateDir},stdio:['pipe','pipe','pipe']});
    let stdout='', stderr='';child.stdout.on('data',c=>stdout+=c);child.stderr.on('data',c=>stderr+=c);
    child.on('error',reject);child.on('close',code=>code===0?resolve(stdout):reject(new Error(`Docker command failed (${code}): ${stderr.slice(-1500)}`)));
    child.stdin.end(input || '');
  });
}
export async function allResults(path) {
  const result=[];let next=path;
  while(next){const data=await json(next);result.push(...data.results);next=data.next?new URL(data.next).pathname+new URL(data.next).search:null;}
  return result;
}

export async function languageCode(locale) {
  const mapping=JSON.parse(await readFile(join(stateDir,'language-map.json'),'utf8'));
  if(!mapping[locale])throw new Error(`Weblate has no mapping for ${locale}; rerun npm run weblate:connect.`);
  return mapping[locale];
}
