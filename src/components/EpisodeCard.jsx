import React from 'react';
import { motion } from 'framer-motion';
import { Coffee, ExternalLink, Heart, RotateCcw, Copy } from 'lucide-react';
import { parseTags, toggleFavourite } from '../logic/recommendationEngine';

function scoreLabel(label, value) {
  return <span>{label} <strong>{value || '-'}/10</strong></span>;
}

export default function EpisodeCard({ episode, onAgain }) {
  if (!episode) {
    return (
      <div className="episode-card empty">
        <Coffee size={34} />
        <p>Pick a mood, enter S/E, or let fate do its sitcom thing.</p>
      </div>
    );
  }

  const tags = [
    ...parseTags(episode.mood_tags),
    ...parseTags(episode.theme_tags),
    ...parseTags(episode.context_tags),
    ...parseTags(episode.character_energy_tags)
  ].slice(0, 14);
  const url = episode.netflix_url || episode.netflix_fallback_url;

  return (
    <motion.article className="episode-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div className="episode-topline">
        <span className="episode-code">{episode.code}</span>
        <span className="curation-badge">{episode.curation_status || 'curated'}</span>
      </div>
      <h2>{episode.title}</h2>
      <p className="synopsis">{episode.synopsis}</p>

      <div className="plot-box">
        <strong>Why this one?</strong>
        <p>{episode.main_plot}</p>
      </div>

      <div className="tag-cloud">
        {tags.map((tag) => <span key={tag}>{tag}</span>)}
      </div>

      <div className="score-row">
        {scoreLabel('Iconic', episode.iconic_score)}
        {scoreLabel('Comfort', episode.comfort_score)}
        {scoreLabel('Chaos', episode.chaos_score)}
        {scoreLabel('Romance', episode.romance_score)}
      </div>

      <div className="actions">
        <a className="primary" href={url} target="_blank" rel="noreferrer">
          Watch on Netflix <ExternalLink size={16} />
        </a>
        <button onClick={onAgain}><RotateCcw size={16} /> Pivot to another</button>
        <button onClick={() => toggleFavourite(episode.id)}><Heart size={16} /> Save</button>
        <button onClick={() => navigator.clipboard?.writeText(episode.code)}><Copy size={16} /> Copy code</button>
      </div>

      <small>If Netflix opens the title page instead of the exact episode, select <strong>{episode.code}</strong> manually.</small>
    </motion.article>
  );
}
