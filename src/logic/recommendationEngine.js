const RECENT_KEY = 'tow_recent';
const FAV_KEY = 'tow_favourites';
const SHUFFLE_KEY = 'tow_shuffle_bag';

function safeRead(key, fallback = []) {
  try { return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback)); }
  catch { return fallback; }
}

function safeWrite(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* ignore private-mode storage failures */ }
}

export function getRecent() { return safeRead(RECENT_KEY, []); }

export function pushRecent(id) {
  const r = [Number(id), ...getRecent().filter((x) => Number(x) !== Number(id))].slice(0, 60);
  safeWrite(RECENT_KEY, r);
  return r;
}

export function getFavourites() { return safeRead(FAV_KEY, []); }

export function toggleFavourite(id) {
  const nId = Number(id);
  const f = getFavourites();
  const next = f.includes(nId) ? f.filter((x) => x !== nId) : [nId, ...f];
  safeWrite(FAV_KEY, next);
  return next;
}

export function parseTags(value) {
  return String(value || '').split(';').map((x) => x.trim()).filter(Boolean);
}

function asNumber(value, fallback = 0) {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

function allEpisodeTags(ep) {
  return [
    ...parseTags(ep.mood_tags),
    ...parseTags(ep.theme_tags),
    ...parseTags(ep.context_tags),
    ...parseTags(ep.character_energy_tags),
    ...parseTags(ep.setting_tags),
    ...parseTags(ep.transcript_keywords)
  ];
}

export function matchScore(ep, filters = {}) {
  const all = new Set(allEpisodeTags(ep));
  const chosen = [
    ...(filters.moods || []),
    ...(filters.themes || []),
    ...(filters.contexts || []),
    ...(filters.characters || [])
  ];

  let score = 0;
  chosen.forEach((tag) => { if (all.has(tag)) score += 7; });

  if (filters.preset === 'iconic') score += asNumber(ep.iconic_score) * 0.9 + asNumber(ep.rewatch_score) * 0.4;
  if (filters.preset === 'comfort') score += asNumber(ep.comfort_score) * 0.9 + asNumber(ep.background_score) * 0.4;
  if (filters.preset === 'light') score += asNumber(ep.comfort_score) * 0.45 - asNumber(ep.sadness_score) * 0.85;
  if (filters.preset === 'romance') score += asNumber(ep.romance_score) * 1.0 - asNumber(ep.sadness_score) * 0.25;
  if (filters.preset === 'group') score += all.has('group-watch') ? 8 : 0;

  const recent = getRecent();
  if (recent.slice(0, 10).includes(Number(ep.id))) score -= 20;
  else if (recent.slice(0, 25).includes(Number(ep.id))) score -= 10;

  return score + Math.random() * 2.5;
}

function weightedPick(pool) {
  if (!pool.length) return null;
  const min = Math.min(...pool.map((x) => x._score || 0));
  const weights = pool.map((x) => Math.max(1, (x._score || 0) - min + 1));
  const total = weights.reduce((a, b) => a + b, 0);
  let r = Math.random() * total;
  for (let i = 0; i < pool.length; i += 1) {
    r -= weights[i];
    if (r <= 0) return pool[i];
  }
  return pool[pool.length - 1];
}

function getShuffleBag(episodes) {
  const ids = episodes.map((ep) => Number(ep.id));
  const existing = safeRead(SHUFFLE_KEY, []);
  const valid = existing.filter((id) => ids.includes(Number(id)));
  if (valid.length > Math.max(8, ids.length * 0.15)) return valid;
  const shuffled = [...ids].sort(() => Math.random() - 0.5);
  safeWrite(SHUFFLE_KEY, shuffled);
  return shuffled;
}

function consumeShuffleId(episodes, recent) {
  const bag = getShuffleBag(episodes);
  const candidateIndex = bag.findIndex((id) => !recent.slice(0, 40).includes(Number(id)));
  const index = candidateIndex >= 0 ? candidateIndex : 0;
  const [id] = bag.splice(index, 1);
  safeWrite(SHUFFLE_KEY, bag);
  return id;
}

export function pickRandom(episodes, filters = {}) {
  if (!episodes?.length) return null;
  const recent = getRecent();
  const hasFilters = Object.values(filters).some((v) => Array.isArray(v) ? v.length : Boolean(v));

  if (!hasFilters || filters.strict) {
    const id = consumeShuffleId(episodes, recent);
    const selected = episodes.find((ep) => Number(ep.id) === Number(id)) || episodes[Math.floor(Math.random() * episodes.length)];
    if (selected) pushRecent(selected.id);
    return selected;
  }

  let pool = [...episodes];
  const filtered = pool.filter((ep) => !recent.slice(0, 25).includes(Number(ep.id)));
  if (filtered.length >= 8) pool = filtered;

  const scored = pool.map((ep) => ({ ...ep, _score: matchScore(ep, filters) })).sort((a, b) => b._score - a._score);
  const topPool = scored.slice(0, Math.min(18, Math.max(8, scored.length)));
  const selected = weightedPick(topPool);
  if (selected) pushRecent(selected.id);
  return selected;
}

export function lookup(episodes, season, episode) {
  const ep = episodes.find((row) => Number(row.season) === Number(season) && Number(row.episode) === Number(episode));
  if (ep) pushRecent(ep.id);
  return ep;
}
