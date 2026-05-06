# The One to Watch

**The one-ly FRIENDS episode picker for every mood, mess, and moment.**

A static-first FRIENDS episode recommendation website for GitHub + Cloudflare Pages. It supports:

- anti-repeat random episode generation across all 236 rows
- Season/Episode lookup such as `S03E12`
- mood, theme, context, and character-energy recommendations
- Netflix India fallback links with optional episode-level deep links
- CSV-backed curation workflow with generated JSON for the frontend
- purple-door / yellow-frame / Central Perk-inspired UI without embedding official copyrighted images

## Stack

- Vite + React
- Tailwind-compatible CSS structure
- Framer Motion
- Lucide React
- PapaParse
- Cloudflare Pages

## Run locally

```bash
npm install
npm run validate:data
npm run data:json
npm run dev
```

## Deploy on Cloudflare Pages

- Build command: `npm run build`
- Output directory: `dist`
- Node version: 20+

## Data workflow

The master backend is:

```text
public/data/friends_episodes.csv
```

The frontend reads:

```text
public/data/friends_episodes.json
```

After editing CSV:

```bash
npm run validate:data
npm run data:json
```

## Enrichment workflow

The repo includes three enrichment scripts:

```bash
npm run import:github
npm run enrich:data
node scripts/enrich-from-transcripts.js path/to/transcript_lines.csv
```

### `import:github`

Fetches season seed JSON from the `dmtrxw/friends-episodes-api` GitHub repository and updates title, synopsis, image URL, and Netflix URL where available.

### `enrich:data`

Runs the deterministic title/synopsis-based tagging pass across all 236 rows.

### `enrich-from-transcripts.js`

Optional deep enrichment hook. It expects a transcript CSV with `season`, `episode`, `speaker`, and `text` columns. It derives:

- character focus
- transcript keywords
- quote keywords
- emotional tone hints
- enriched mood tags

The site does **not** host transcripts or video content.

## Known data caveat

The included CSV has all 236 episode rows and has been structurally enriched for tags and scores. Some rows may still require canonical title/synopsis import and transcript CSV enrichment. Run `npm run import:github` and then `npm run enrich:data` once you are online locally.

## Legal-safe design note

The site uses a FRIENDS-inspired design language: purple apartment door, yellow peephole frame, café cards, fridge-magnet chips, coffee motifs, and orange-sofa accents. It intentionally avoids using official logos, official stills as local assets, or hosted transcripts.
# TheOnetoWatch
