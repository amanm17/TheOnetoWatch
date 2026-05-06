import fs from 'fs';
import Papa from 'papaparse';

const DATA = 'public/data/friends_episodes.csv';
const FALLBACK = 'https://www.netflix.com/in/title/70153404';
const RAW_BASE = 'https://raw.githubusercontent.com/dmtrxw/friends-episodes-api/master/seeds';

const csv = fs.readFileSync(DATA, 'utf8');
const { data: current } = Papa.parse(csv, { header: true, skipEmptyLines: true });
const byCode = new Map(current.map((row) => [row.code, row]));

const imported = [];
for (let season = 1; season <= 10; season += 1) {
  const url = `${RAW_BASE}/season-${season}.json`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Could not fetch ${url}: ${res.status}`);
  const rows = await res.json();
  imported.push(...rows);
}

for (const ep of imported) {
  const row = byCode.get(ep.code);
  if (!row) continue;
  row.title = ep.title;
  row.synopsis = ep.synopsis;
  row.image_url = ep.image_url || row.image_url || '';
  row.netflix_url = ep.netflix_url || row.netflix_url || '';
  row.netflix_fallback_url = row.netflix_fallback_url || FALLBACK;
  row.curation_status = 'github_seed_imported_needs_transcript_tags';
}

const rows = current.sort((a, b) => Number(a.id) - Number(b.id));
fs.writeFileSync(DATA, Papa.unparse(rows));
fs.writeFileSync('public/data/friends_episodes.json', JSON.stringify(rows, null, 2));
console.log(`Imported ${imported.length} episode records from dmtrxw seed JSON.`);
console.log('Next: npm run enrich:data && npm run validate:data');
