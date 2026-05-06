# Data Dictionary

`friends_episodes.csv` is the master editable backend for The One to Watch.

## Core fields

- `id`: numeric row ID, 1-236
- `season`: season number
- `episode`: episode number within the season
- `code`: canonical S/E code, e.g. `S03E12`
- `title`: episode title
- `image_url`: optional external image URL from seed data
- `netflix_url`: optional episode-level Netflix URL
- `netflix_fallback_url`: stable show-level Netflix India URL
- `synopsis`: short synopsis

## Curation fields

- `main_plot`, `b_plot`, `c_plot`: plot layers used in the recommendation card
- `characters_focus`: semicolon-separated major characters
- `quote_keywords`: short keywords only, not transcript dialogue
- `transcript_keywords`: derived keywords only, not transcript text
- `tagging_basis`: e.g. `title_synopsis_rule_enrichment` or `transcript_csv_enrichment`
- `curation_status`: operational status for the row

## Tag fields

Semicolon-separated tags controlled by `tag_taxonomy.json`:

- `mood_tags`
- `theme_tags`
- `context_tags`
- `setting_tags`
- `character_energy_tags`

## Numeric score fields

Scores are 1-10:

- `iconic_score`
- `comfort_score`
- `chaos_score`
- `romance_score`
- `sadness_score`
- `background_score`
- `rewatch_score`
- `friendship_score`
- `awkward_score`
- `holiday_score`

## Boolean fields

Use `TRUE/FALSE` or `true/false` values:

- `thanksgiving`
- `wedding`
- `christmas`
- `new_year`
- `proposal`
- `breakup`
- `pregnancy`
- `flashback`
- `celebrity_cameo`
- `finale`
- `two_part_episode`

## Validation

Run:

```bash
npm run validate:data
```

Validation checks 236 rows, S/E code format, required fields, score ranges, duplicate codes, and invalid tags.
