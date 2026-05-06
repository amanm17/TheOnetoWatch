import fs from 'fs';import Papa from 'papaparse';
const csv=fs.readFileSync('public/data/friends_episodes.csv','utf8');
const tax=JSON.parse(fs.readFileSync('public/data/tag_taxonomy.json','utf8'));
const {data}=Papa.parse(csv,{header:true,skipEmptyLines:true,dynamicTyping:true});
const errors=[]; const seen=new Set(); const allTags=new Set(Object.values(tax).flat());
if(data.length!==236) errors.push(`Expected 236 rows; got ${data.length}`);
for(const r of data){ if(seen.has(r.code)) errors.push(`Duplicate code ${r.code}`); seen.add(r.code);
 if(!/^S\d{2}E\d{2}$/.test(r.code)) errors.push(`Bad code ${r.code}`);
 ['id','season','episode','title','netflix_fallback_url','mood_tags','theme_tags','context_tags'].forEach(k=>{if(r[k]===undefined||r[k]==='') errors.push(`Missing ${k} in ${r.code}`)});
 ['iconic_score','comfort_score','chaos_score','romance_score','sadness_score','background_score','rewatch_score'].forEach(k=>{const n=Number(r[k]); if(!Number.isFinite(n)||n<1||n>10) errors.push(`Bad score ${k} in ${r.code}`)});
 ['mood_tags','theme_tags','context_tags','character_energy_tags','setting_tags'].forEach(k=>String(r[k]||'').split(';').filter(Boolean).forEach(t=>{if(!allTags.has(t)) errors.push(`Unknown tag ${t} in ${r.code}`)}));
}
if(errors.length){console.error(errors.slice(0,50).join('\n')); process.exit(1)} console.log('Data validation passed.');
