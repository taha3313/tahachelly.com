// Local-only editing tool. Saving changes source JSON; it never builds, commits, or publishes.
import { createServer } from 'node:http';
import { readFile, writeFile, rename } from 'node:fs/promises';
import { randomBytes } from 'node:crypto';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('../', import.meta.url));
const locales = ['ar', 'es', 'de', 'fr', 'it', 'zh', 'ja'];
const token = randomBytes(32).toString('hex');
const port = Number(process.env.TRANSLATION_EDITOR_PORT || 4180);
const origin = `http://127.0.0.1:${port}`;
const file = locale => `${root}src/data/i18n/${locale}.json`;
const html = `<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Translation editor · Taha Chelly</title><style>
:root{font:16px/1.6 system-ui;color:#202938;background:#f5f6f8}body{max-width:1100px;padding:32px;margin:auto}h1{margin:0}p{color:#5b6572}select,input,textarea,button{font:inherit;padding:10px;border:1px solid #ccd2db;border-radius:7px}select,input{background:white}label{display:grid;gap:8px}nav{display:flex;gap:16px;margin:28px 0;align-items:end}input{min-width:280px}.editor{display:grid;grid-template-columns:1fr 1fr;gap:24px}textarea{width:100%;box-sizing:border-box;min-height:270px;resize:vertical;line-height:1.8}textarea[readonly]{background:#eef1f5}button{background:#315b9a;color:white;cursor:pointer;margin-top:18px}#status{white-space:pre-wrap}code{overflow-wrap:anywhere}.actions{display:flex;gap:14px;align-items:center}#glossary{font-size:13px}#key{max-width:100%}@media(max-width:700px){.editor{grid-template-columns:1fr}nav{flex-wrap:wrap}body{padding:20px}input{min-width:0;width:100%}}</style>
<h1>Translation editor</h1><p>Review generated translations, change the wording, and save locally. Changes reach the website only after a separate build and publish.</p>
<nav><label>Language<select id="locale">${locales.map(l => `<option>${l}</option>`).join('')}</select></label><label>Search keys or text<input id="search" type="search"></label></nav>
<label>Message<select id="key"></select></label><p id="glossary"></p>
<div class="editor"><label>English source<textarea id="source" readonly></textarea></label><label>Editable translation<textarea id="target"></textarea></label></div>
<div class="actions"><button id="save" type="button">Save translation locally</button><span id="count"></span></div><p id="status" role="status" aria-live="polite"></p>
<script>
const token=${JSON.stringify(token)};
const $=id=>document.getElementById(id);let data, selected;let dirty=false;
async function load(){const r=await fetch('/api?locale='+$('locale').value,{headers:{'X-Editor-Token':token}});if(!r.ok)throw Error(await r.text());data=await r.json();filter();}
function filter(){const query=$('search').value.toLowerCase();const keys=Object.keys(data.source).filter(k=>(k+' '+data.source[k]+' '+data.target[k]).toLowerCase().includes(query));$('key').replaceChildren(...keys.map(k=>{const o=document.createElement('option');o.value=k;o.textContent=k;return o}));if(keys.includes(selected))$('key').value=selected;$('count').textContent=keys.length+' messages';show();}
function show(){selected=$('key').value;$('source').value=data.source[selected]||'';$('target').value=data.target[selected]||'';$('target').dir=$('locale').value==='ar'?'rtl':'ltr';$('target').lang=$('locale').value;dirty=false;$('glossary').textContent='Keep in English: '+data.terms.filter(t=>(data.source[selected]||'').toLowerCase().includes(t.toLowerCase())).join(', ');}
function confirmDiscard(){return !dirty||confirm('Discard the unsaved edit?');}
let previousLocale=$('locale').value;$('locale').onchange=()=>{if(confirmDiscard()){previousLocale=$('locale').value;load().catch(report)}else $('locale').value=previousLocale};
$('search').oninput=()=>{if(confirmDiscard())filter()};$('key').onchange=()=>{if(confirmDiscard())show();else $('key').value=selected};$('target').oninput=()=>{dirty=true;$('status').textContent='Unsaved changes'};
function report(error){$('status').textContent=error.message;}
$('save').onclick=async()=>{try{if(!selected)return;const r=await fetch('/api',{method:'POST',headers:{'Content-Type':'application/json','X-Editor-Token':token},body:JSON.stringify({locale:$('locale').value,key:selected,value:$('target').value})});const result=await r.json();if(!r.ok)throw Error(result.error);data.target[selected]=$('target').value;dirty=false;$('status').textContent='Saved to '+result.file+'. Review the changes with git diff before publishing.';}catch(e){report(e)}};
addEventListener('beforeunload',e=>{if(dirty){e.preventDefault();e.returnValue=''}});load().catch(report);
</script></html>`;
const server = createServer(async (req, res) => {
  const json = (status, value) => {res.writeHead(status, {'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'});res.end(JSON.stringify(value));};
  try {
    // Reject cross-site requests and DNS rebinding, even on loopback.
    if (req.headers.host !== `127.0.0.1:${port}` || (req.headers.origin && req.headers.origin !== origin)) return json(403, {error:'Open the editor using its printed 127.0.0.1 URL.'});
    const url = new URL(req.url, origin);
    if (url.pathname === '/favicon.ico') {res.writeHead(204);return res.end();}
    if (req.method === 'GET' && url.pathname === '/') {
      res.writeHead(200, {'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store','Content-Security-Policy':"default-src 'self'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; frame-ancestors 'none'; base-uri 'none'"});return res.end(html);
    }
    if (url.pathname !== '/api' || req.headers['x-editor-token'] !== token) return json(403,{error:'Invalid editor session.'});
    const source = JSON.parse(await readFile(file('en'), 'utf8'));
    const glossary = JSON.parse(await readFile(`${root}src/data/i18n/glossary.json`, 'utf8'));
    if (req.method === 'GET') {
      const locale = url.searchParams.get('locale');
      if (!locales.includes(locale)) return json(400,{error:'Unsupported language.'});
      return json(200,{source,target:JSON.parse(await readFile(file(locale),'utf8')),terms:glossary.terms});
    }
    if (req.method !== 'POST') return json(405,{error:'Unsupported method.'});
    let body='';for await (const chunk of req) {body+=chunk;if(Buffer.byteLength(body)>65536)return json(413,{error:'Message is too large.'});}
    const {locale,key,value}=JSON.parse(body);
    if (!locales.includes(locale)||!Object.hasOwn(source,key)||typeof value!=='string'||!value.trim())return json(400,{error:'Choose a valid language and message, and provide a non-empty translation.'});
    const escape = text => text.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
    const contains=(text,term)=>new RegExp(`(?<![a-z])${escape(term)}(?![a-z])`,'i').test(text);
    const missing=glossary.terms.filter(term=>contains(source[key],term)&&!contains(value,term));
    if(missing.length)return json(400,{error:'Keep these terms in English: '+missing.join(', ')});
    const links=text=>[...text.matchAll(/href="([^"]+)"/g)].map(m=>m[1]).sort();
    if(JSON.stringify(links(source[key]))!==JSON.stringify(links(value)))return json(400,{error:'Keep the original link destinations in translated HTML.'});
    const target=JSON.parse(await readFile(file(locale),'utf8'));target[key]=value;
    const temp=`${file(locale)}.${randomBytes(6).toString('hex')}.tmp`;
    await writeFile(temp,JSON.stringify(target,null,2)+'\n');await rename(temp,file(locale));
    return json(200,{file:`src/data/i18n/${locale}.json`});
  } catch { return json(400,{error:'Could not process this edit. Check the request and locale file.'}); }
});
server.listen(port,'127.0.0.1',()=>console.log(`Translation editor: ${origin}\nSource files only; no automatic publishing. Stop with Ctrl+C.`));
