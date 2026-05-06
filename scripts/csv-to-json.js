import fs from 'fs';import Papa from 'papaparse';
const csv=fs.readFileSync('public/data/friends_episodes.csv','utf8');
const {data}=Papa.parse(csv,{header:true,skipEmptyLines:true,dynamicTyping:true});
fs.writeFileSync('public/data/friends_episodes.json',JSON.stringify(data,null,2));
console.log(`Wrote ${data.length} episodes to JSON.`);
