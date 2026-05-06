import fs from 'fs';
import Papa from 'papaparse';
const csv=fs.readFileSync('public/data/friends_episodes.csv','utf8');
const {data}=Papa.parse(csv,{header:true,skipEmptyLines:true});
const fields=['mood_tags','theme_tags','context_tags','setting_tags','character_energy_tags'];
const counts={}; const missing={};
for(const f of fields){counts[f]={}; missing[f]=[];}
for(const row of data){
  for(const f of fields){
    const tags=String(row[f]||'').split(';').map(x=>x.trim()).filter(Boolean);
    if(!tags.length) missing[f].push(row.code);
    tags.forEach(t=>counts[f][t]=(counts[f][t]||0)+1);
  }
}
const report={
  rows:data.length,
  placeholder_titles:data.filter(r=>String(r.title||'').includes('The One to Watch:')).length,
  transcript_enriched:data.filter(r=>String(r.tagging_basis||'').includes('transcript')).length,
  missing,
  top_tags:Object.fromEntries(Object.entries(counts).map(([k,v])=>[k,Object.entries(v).sort((a,b)=>b[1]-a[1]).slice(0,20)]))
};
fs.writeFileSync('public/data/tagging_quality_report.json',JSON.stringify(report,null,2));
console.log(JSON.stringify(report,null,2));
