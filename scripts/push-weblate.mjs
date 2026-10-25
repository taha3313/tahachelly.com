// Explicitly send changed locale text to local Weblate. This never publishes the site.
import {readFile,writeFile} from 'node:fs/promises';
import {join} from 'node:path';
import {spawnSync} from 'node:child_process';
import {root,stateDir,project,component,locales,request,languageCode,json} from './weblate-client.mjs';
const check=spawnSync(process.execPath,['scripts/check-i18n.mjs'],{cwd:root,encoding:'utf8'});
if(check.status!==0)throw new Error(check.stdout+check.stderr);
const baselinePath=join(stateDir,'baseline.json');
const baseline=JSON.parse(await readFile(baselinePath,'utf8'));
const local={};const remote={};const changes={};const conflicts=[];
for(const locale of locales){
  local[locale]=JSON.parse(await readFile(join(root,`src/data/i18n/${locale}.json`),'utf8'));
  remote[locale]=await(await request(`/api/translations/${project}/${component}/${await languageCode(locale)}/file/`)).json();
  changes[locale]={};
  for(const [key,value] of Object.entries(local[locale])){
    if(value===baseline[locale]?.[key])continue;
    if(remote[locale][key]!==baseline[locale]?.[key] && remote[locale][key]!==value)conflicts.push(`${locale}.${key}`);
    changes[locale][key]=value;
  }
}
for(const [key,value] of Object.entries(remote.en))if(value!==baseline.en?.[key] && value!==local.en[key])conflicts.push(`en.${key}`);
if(conflicts.length)throw new Error(`Conflicting Weblate/local edits: ${conflicts.join(', ')}. Import or resolve them before uploading. Nothing was uploaded.`);
const removed=Object.keys(baseline.en).filter(key=>!(key in local.en));
if(removed.length)throw new Error(`English source keys were removed: ${removed.join(', ')}. Remove the matching source entries in Weblate then run translations:pull; this command never deletes translation history automatically.`);
async function upload(locale,data,method){
  const form=new FormData();form.set('file',new Blob([JSON.stringify(data)],{type:'application/json'}),`${locale}.json`);form.set('method',method);form.set('conflicts','replace-approved');form.set('fuzzy','process');
  for(let attempt=0;attempt<3;attempt++){
    try{await request(`/api/translations/${project}/${component}/${await languageCode(locale)}/file/`,{method:'POST',body:form});return;}
    catch(error){
      if(attempt===2 || !error.message.includes('Please try again later'))throw error;
      await new Promise(resolve=>setTimeout(resolve,2000*(attempt+1)));
    }
  }
}
let count=0;
// Monolingual JSON source files require a full replace upload; conflict checks protect existing source edits.
if(Object.keys(changes.en).length){
  const componentPath=`/api/components/${project}/${component}/`;
  const settings=await json(componentPath);
  // Keep English read-only in the editor; unlock it only for this explicit source sync.
  if(!settings.edit_template)await json(componentPath,'PATCH',{edit_template:true});
  try{await upload('en',local.en,'replace');}
  finally{if(!settings.edit_template)await json(componentPath,'PATCH',{edit_template:false});}
  Object.assign(baseline.en,changes.en);count+=Object.keys(changes.en).length;
  await writeFile(baselinePath,JSON.stringify(baseline,null,2)+'\n',{mode:0o600});
}
for(const locale of locales.filter(l=>l!=='en')){
  if(!Object.keys(changes[locale]).length)continue;
  await upload(locale,changes[locale],'translate');Object.assign(baseline[locale],changes[locale]);count+=Object.keys(changes[locale]).length;
  await writeFile(baselinePath,JSON.stringify(baseline,null,2)+'\n',{mode:0o600});
}
console.log(count?`Uploaded ${count} changed strings to local Weblate. Review them in its editor. No site files were published.`:'No local translation changes to upload. Use npm run translations:pull for edits made in Weblate.');
