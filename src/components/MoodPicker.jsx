import React from 'react';
import TagSelector, { Chip } from './TagSelector';

const moods = ['happy','funny','comforting','chaotic','romantic','nostalgic','sad','awkward','light','cosy','bittersweet','peak-sitcom','emotional','low-energy'];
const themes = ['thanksgiving','wedding','proposal','breakup','dating','competition','food','travel','secret-revealed','job-stress','pregnancy','christmas','roommate-drama','flashback'];
const contexts = ['indian-dinner-watch','watch-while-eating','solo-comfort','group-watch','date-night','background-watch','late-night','post-breakup','need-a-laugh','bad-day-reset','cousins-watch'];
const chars = ['ross-meltdown','rachel-drama','monica-control','chandler-sarcasm','joey-dumb-funny','phoebe-weird','monica-chandler','ross-rachel','ensemble-chaos'];
const presets = [
  ['comfort','Dinner-time comfort'],
  ['light','Chaos but not sad'],
  ['iconic','Iconic only'],
  ['romance','Romance, but sitcom-safe'],
  ['group','Cousins / hostel room watch']
];

export default function MoodPicker({ filters, setFilters, onPick }) {
  const toggle = (group, tag) => setFilters((f) => ({
    ...f,
    [group]: f[group].includes(tag) ? f[group].filter((x) => x !== tag) : [...f[group], tag]
  }));

  return (
    <section className="picker-card perk-card">
      <div className="card-kicker">Central Perk Recommendation Board</div>
      <h3>Match my mood</h3>
      <p>Stack moods, themes, contexts, and character energy. The engine scores matches, then picks from the best pool so it does not feel repetitive.</p>

      <div className="presets preset-grid">
        {presets.map(([key, label]) => (
          <Chip key={key} active={filters.preset === key} onClick={() => setFilters((f) => ({ ...f, preset: f.preset === key ? '' : key }))}>
            {label}
          </Chip>
        ))}
      </div>

      <TagSelector title="Mood" tags={moods} selected={filters.moods} onToggle={(tag) => toggle('moods', tag)} />
      <TagSelector title="Theme" tags={themes} selected={filters.themes} onToggle={(tag) => toggle('themes', tag)} />
      <TagSelector title="Context" tags={contexts} selected={filters.contexts} onToggle={(tag) => toggle('contexts', tag)} />
      <TagSelector title="Character energy" tags={chars} selected={filters.characters} onToggle={(tag) => toggle('characters', tag)} />

      <button className="big" onClick={() => onPick(filters)}>Tell me The One to Watch</button>
    </section>
  );
}
