import { mkdir, readFile, writeFile, access } from 'node:fs/promises';
import { homedir } from 'node:os';
import { join } from 'node:path';
import { randomBytes } from 'node:crypto';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('../', import.meta.url));
const stateDir = process.env.TAHA_WEBLATE_STATE_DIR || join(homedir(), '.local/share/tahachelly-weblate');
const environment = join(stateDir, 'environment');
const command = process.argv[2] || 'start';
await mkdir(stateDir, { recursive: true, mode: 0o700 });
try { await access(environment); } catch {
  const databasePassword = randomBytes(32).toString('hex');
  const adminPassword = randomBytes(24).toString('base64url');
  await writeFile(environment, `POSTGRES_USER=weblate\nPOSTGRES_PASSWORD=${databasePassword}\nPOSTGRES_DB=weblate\nPOSTGRES_HOST=database\nPOSTGRES_PORT=5432\nREDIS_HOST=cache\nREDIS_PORT=6379\nWEBLATE_DEBUG=0\nWEBLATE_SITE_TITLE=Taha Chelly Translations\nWEBLATE_SITE_DOMAIN=127.0.0.1:8090\nWEBLATE_ALLOWED_HOSTS=127.0.0.1,localhost\nWEBLATE_ADMIN_NAME=Taha Chelly\nWEBLATE_ADMIN_EMAIL=chellytaha@gmail.com\nWEBLATE_ADMIN_PASSWORD=${adminPassword}\nWEBLATE_REGISTRATION_OPEN=0\nWEBLATE_REQUIRE_LOGIN=1\nWEBLATE_ENABLE_HTTPS=0\nWEBLATE_TIME_ZONE=Africa/Tunis\nWEBLATE_WORKERS=1\nCELERY_COMBINED_OPTIONS=--concurrency 2 --prefetch-multiplier 1\nWEBLATE_EMAIL_BACKEND=django.core.mail.backends.dummy.EmailBackend\n`, { mode: 0o600, flag: 'wx' });
}
const compose = ['compose', '-f', join(root, 'tools/weblate/compose.yaml')];
const run = args => new Promise((resolve, reject) => {
  const child = spawn('docker', [...compose, ...args], { cwd: root, env: { ...process.env, TAHA_WEBLATE_STATE_DIR: stateDir }, stdio: 'inherit' });
  child.on('error', reject); child.on('close', code => code === 0 ? resolve() : reject(new Error(`Docker exited with ${code}`)));
});
if (command === 'start') { await run(['up', '-d']); console.log('Weblate: http://127.0.0.1:8090\nFirst startup may take a few minutes. Credentials are stored privately outside the repository.'); }
else if (command === 'stop') await run(['stop']);
else if (command === 'status') await run(['ps']);
else if (command === 'credentials') {
  // Deliberately save credentials to a private text file, never stdout or a shell argument.
  const env = Object.fromEntries((await readFile(environment,'utf8')).trim().split('\n').map(line => {const i=line.indexOf('=');return [line.slice(0,i),line.slice(i+1)];}));
  const path = join(stateDir, 'login.txt');
  await writeFile(path, `Local Weblate\nURL: http://127.0.0.1:8090\nUsername: admin\nPassword: ${env.WEBLATE_ADMIN_PASSWORD}\n`, { mode: 0o600 });
  console.log(`Credentials saved to ${path}`);
} else throw new Error('Use start, stop, status, or credentials.');
