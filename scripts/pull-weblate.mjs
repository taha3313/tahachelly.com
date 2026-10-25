import { readFile, writeFile, mkdir, mkdtemp, rm, rename } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { spawnSync } from 'node:child_process';
import { root, stateDir, project, component, locales, request, allResults, languageCode } from './weblate-client.mjs';
const directory = join(root,'src/data/i18n');
const source=JSON.parse(await readFile(join(directory,'en.json'),'utf8'));
const normalize=data=>JSON.stringify(Object.entries(data).sort(([a],[b])=>a.localeCompare(b)));
const remoteSource=await (await request(`/api/translations/${project}/${component}/en/file/`)).json();
if(normalize(source)!==normalize(remoteSource))throw new Error('Weblate’s English source differs from this checkout. Sync the reviewed source changes with npm run translations:push before importing. No local files changed.');
const baselinePath=join(stateDir,'baseline.json');
let baseline;try{baseline=JSON.parse(await readFile(baselinePath,'utf8'));}catch{throw new Error('Run npm run weblate:connect once to establish the initial translation baseline.');}
const remote={en:remoteSource};
for(const locale of locales.filter(l=>l!=='en')) {
  const translations=await allResults(`/api/translations/${project}/${component}/${await languageCode(locale)}/units/?page_size=1000`);
  if(translations.some(u=>u.fuzzy || !u.translated))throw new Error(`${locale}: translations still need editing or are empty. Review them in Weblate before importing. No local files changed.`);
  remote[locale]=await (await request(`/api/translations/${project}/${component}/${await languageCode(locale)}/file/`)).json();
}
const merged={en:source};const originals={};const conflicts=[];
for(const locale of locales.filter(l=>l!=='en')) {
  const raw=await readFile(join(directory,`${locale}.json`),'utf8');originals[locale]=raw;const local=JSON.parse(raw);merged[locale]={};
  const keys=new Set([...Object.keys(local),...Object.keys(remote[locale])]);
  for(const key of keys) {
    const before=baseline[locale]?.[key];const localValue=local[key];const remoteValue=remote[locale][key];
    if(localValue!==before && remoteValue!==before && localValue!==remoteValue)conflicts.push(`${locale}.${key}`);
    merged[locale][key]=remoteValue!==before?remoteValue:localValue;
  }
}
if(conflicts.length)throw new Error(`Conflicting local and Weblate edits: ${conflicts.join(', ')}. Resolve them before importing. No local files changed.`);
const staging=await mkdtemp(join(tmpdir(),'portfolio-weblate-'));
try {
  for(const locale of locales)await writeFile(join(staging,`${locale}.json`),JSON.stringify(merged[locale],null,2)+'\n');
  await writeFile(join(staging,'glossary.json'),await readFile(join(directory,'glossary.json')));
  const check=spawnSync(process.execPath,['scripts/check-i18n.mjs'],{cwd:root,env:{...process.env,PORTFOLIO_I18N_DIR:staging},encoding:'utf8'});
  if(check.status!==0)throw new Error(`Weblate import failed validation. No local files changed.\n${check.stdout}${check.stderr}`);
  const changed=Object.keys(originals).filter(locale=>normalize(JSON.parse(originals[locale]))!==normalize(merged[locale]));
  if(changed.length) {
    const backup=join(stateDir,'backups',new Date().toISOString().replace(/[:.]/g,'-'));await mkdir(backup,{recursive:true,mode:0o700});
    for(const locale of changed)await writeFile(join(backup,`${locale}.json`),originals[locale],{mode:0o600});
    const written=[];
    try {for(const locale of changed){const path=join(directory,`${locale}.json`);await writeFile(path+'.tmp',JSON.stringify(merged[locale],null,2)+'\n');await rename(path+'.tmp',path);written.push(locale);}}
    catch(error){for(const locale of written)await writeFile(join(directory,`${locale}.json`),originals[locale]);throw error;}
  }
  await writeFile(baselinePath,JSON.stringify(remote,null,2)+'\n',{mode:0o600});
  console.log(check.stdout.trim());
  console.log(changed.length?`Imported edits for ${changed.join(', ')}. Review git diff, build and preview before publishing.`:'No new Weblate edits to import. No files changed.');
} finally {await rm(staging,{recursive:true,force:true});}
