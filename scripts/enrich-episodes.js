import fs from 'fs';
import Papa from 'papaparse';

const DATA = 'public/data/friends_episodes.csv';
const TAXONOMY = 'public/data/tag_taxonomy.json';
const FALLBACK = 'https://www.netflix.com/in/title/70153404';

const taxonomy = JSON.parse(fs.readFileSync(TAXONOMY, 'utf8'));
const allowedTags = new Set(Object.values(taxonomy).flat());
const csv = fs.readFileSync(DATA, 'utf8');
const parsed = Papa.parse(csv, { header: true, skipEmptyLines: true });

const has = (text, ...keys) => keys.some((key) => text.includes(key));
const semi = (items) => [...new Set(items.filter(Boolean))].join(';');
const words = (text) => [...new Set(String(text).toLowerCase().match(/[a-z][a-z'-]{2,}/g) || [])]
  .filter((w) => !['the','one','with','where','and','for','that','this','from','gets'].includes(w))
  .slice(0, 22);

function enrich(row) {
  const text = `${row.title || ''} ${row.synopsis || ''}`.toLowerCase();
  const mood = ['funny','comforting','light'];
  const theme = ['friendship'];
  const context = ['background-watch','indian-dinner-watch','too-tired-to-choose','comfort-rewatch'];
  const setting = ['monicas-apartment','central-perk'];
  const energy = ['ensemble-chaos'];

  if (has(text, 'thanksgiving', 'underdog')) { mood.push('chaotic','cosy'); theme.push('thanksgiving','holiday-chaos','food'); context.push('group-watch'); setting.push('thanksgiving-table','kitchen'); }
  if (has(text, 'wedding', 'bride', 'groom', 'married')) { mood.push('romantic','awkward'); theme.push('wedding','relationship-decision'); context.push('date-night'); setting.push('wedding-location'); }
  if (has(text, 'proposal', 'engaged')) { mood.push('romantic','emotional'); theme.push('proposal','relationship-decision'); }
  if (has(text, 'pregnant', 'pregnancy', 'birth', 'labor', 'baby', 'adoption')) { mood.push('emotional','wholesome'); theme.push('pregnancy','baby','parenting'); setting.push('hospital','delivery-room'); }
  if (has(text, 'breakup', 'break up', 'divorce', 'going away')) { mood.push('bittersweet','emotional'); theme.push('breakup','relationship-decision'); context.push('post-breakup','solo-comfort'); }
  if (has(text, 'job', 'work', 'career', 'interview', 'audition', 'office', 'chef')) { mood.push('awkward'); theme.push('job-stress','career-change','career-ambition'); context.push('after-work'); setting.push('office','workplace'); }
  if (has(text, 'secret', 'accidentally', 'finds out', 'reveals')) { mood.push('tense','chaotic'); theme.push('secret-revealed','misunderstanding'); }
  if (has(text, 'poker', 'football', 'quiz', 'bet', 'game')) { mood.push('chaotic','high-energy'); theme.push('competition','game-night'); context.push('group-watch','need-a-laugh'); }
  if (has(text, 'london')) { mood.push('high-energy','peak-sitcom'); theme.push('travel','london'); setting.push('london','airport'); context.push('iconic-only','sitcom-classic'); }
  if (has(text, 'vegas', 'las vegas')) { mood.push('chaotic','silly','peak-sitcom'); theme.push('travel','las-vegas'); setting.push('las-vegas','hotel'); context.push('group-watch','iconic-only'); }
  if (has(text, 'flashback', 'prom video')) { mood.push('nostalgic','peak-sitcom'); theme.push('flashback'); context.push('nostalgia-hit','iconic-only'); }
  if (has(text, 'ross')) energy.push('ross-meltdown','ross-rachel');
  if (has(text, 'rachel')) energy.push('rachel-drama','rachel-growth');
  if (has(text, 'monica')) energy.push('monica-control','monica-chaos');
  if (has(text, 'chandler')) energy.push('chandler-sarcasm');
  if (has(text, 'joey')) energy.push('joey-dumb-funny','joey-heart');
  if (has(text, 'phoebe')) energy.push('phoebe-weird','phoebe-wholesome');
  if (has(text, 'janice')) energy.push('janice-chaos');

  row.mood_tags = semi(mood.filter((tag) => allowedTags.has(tag)));
  row.theme_tags = semi(theme.filter((tag) => allowedTags.has(tag)));
  row.context_tags = semi(context.filter((tag) => allowedTags.has(tag)));
  row.setting_tags = semi(setting.filter((tag) => allowedTags.has(tag)));
  row.character_energy_tags = semi(energy.filter((tag) => allowedTags.has(tag)));
  row.transcript_keywords = semi(words(text));
  row.quote_keywords = row.transcript_keywords;
  row.netflix_fallback_url = row.netflix_fallback_url || FALLBACK;
  row.tagging_basis = row.tagging_basis || 'title_synopsis_rule_enrichment';
  row.curation_status = row.curation_status || 'needs_transcript_import';
  return row;
}

const rows = parsed.data.map(enrich);
fs.writeFileSync(DATA, Papa.unparse(rows));
fs.writeFileSync('public/data/friends_episodes.json', JSON.stringify(rows, null, 2));
console.log(`Enriched ${rows.length} rows.`);
