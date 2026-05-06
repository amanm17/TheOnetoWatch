import fs from 'fs';
import Papa from 'papaparse';

/*
  Optional live enrichment hook.
  Purpose: keep transcripts out of the public site while using them to derive metadata.
  Expected source format: a CSV with at least season, episode, speaker, text columns.
  You can export this from the Emil Hvitfeldt friends R package or any transcript parser.
  Usage:
    node scripts/enrich-from-transcripts.js path/to/transcript_lines.csv
*/

const transcriptPath = process.argv[2];
if (!transcriptPath) {
  console.error('Provide a transcript CSV path: node scripts/enrich-from-transcripts.js transcript_lines.csv');
  process.exit(1);
}

const episodeCsv = fs.readFileSync('public/data/friends_episodes.csv', 'utf8');
const transcriptCsv = fs.readFileSync(transcriptPath, 'utf8');
const episodes = Papa.parse(episodeCsv, { header: true, skipEmptyLines: true }).data;
const lines = Papa.parse(transcriptCsv, { header: true, skipEmptyLines: true }).data;

const mainCharacters = ['rachel','ross','monica','chandler','joey','phoebe'];
const emotionWords = {
  romantic: ['love','date','kiss','marry','wedding','proposal','boyfriend','girlfriend'],
  sad: ['sorry','miss','goodbye','break','cry','divorce','alone'],
  chaotic: ['what','wait','oh my god','secret','accident','wrong','panic'],
  funny: ['joke','laugh','funny','weird','stupid'],
  awkward: ['awkward','embarrass','naked','mistake','wrong']
};
const wordList = (text) => [...new Set((text.toLowerCase().match(/[a-z][a-z'-]{3,}/g) || []))]
  .filter((w) => !['that','this','with','from','have','what','your','just','there','they','were','would','could','about'].includes(w));
const semi = (arr) => [...new Set(arr.filter(Boolean))].join(';');

const grouped = new Map();
for (const line of lines) {
  const key = `S${String(line.season).padStart(2,'0')}E${String(line.episode).padStart(2,'0')}`;
  if (!grouped.has(key)) grouped.set(key, []);
  grouped.get(key).push(line);
}

for (const ep of episodes) {
  const group = grouped.get(ep.code) || [];
  if (!group.length) continue;
  const text = group.map((l) => l.text || '').join(' ');
  const speakers = group.map((l) => String(l.speaker || '').toLowerCase());
  const speakerCounts = Object.fromEntries(mainCharacters.map((c) => [c, speakers.filter((s) => s.includes(c)).length]));
  const focus = Object.entries(speakerCounts).sort((a,b) => b[1]-a[1]).slice(0,3).map(([c]) => c);
  const lower = text.toLowerCase();
  const mood = new Set(String(ep.mood_tags || '').split(';').filter(Boolean));
  for (const [tag, terms] of Object.entries(emotionWords)) if (terms.some((t) => lower.includes(t))) mood.add(tag);
  ep.characters_focus = semi(focus);
  ep.mood_tags = semi([...mood]);
  ep.transcript_keywords = semi(wordList(text).slice(0, 25));
  ep.quote_keywords = semi(wordList(text).filter((w) => ['pivot','unagi','lobster','smelly','cat','janice','marcel','break'].includes(w)).slice(0, 12));
  ep.tagging_basis = 'transcript_csv_enrichment';
  ep.curation_status = 'transcript_enriched';
}

fs.writeFileSync('public/data/friends_episodes.csv', Papa.unparse(episodes));
fs.writeFileSync('public/data/friends_episodes.json', JSON.stringify(episodes, null, 2));
console.log(`Transcript-enriched ${episodes.filter((e) => e.curation_status === 'transcript_enriched').length} episodes.`);
