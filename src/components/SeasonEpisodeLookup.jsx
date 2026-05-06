import React from 'react';
import { Search } from 'lucide-react';

export default function SeasonEpisodeLookup({ season, episode, setSeason, setEpisode, onLookup, error }) {
  return (
    <div className="lookup">
      <strong>Find by Season / Episode</strong>
      <div className="lookup-row">
        <label>S<input value={season} onChange={(ev) => setSeason(ev.target.value)} /></label>
        <label>E<input value={episode} onChange={(ev) => setEpisode(ev.target.value)} /></label>
        <button onClick={onLookup}><Search size={16} /> Find</button>
      </div>
      {error ? <p className="form-error">{error}</p> : <small>Example: S3E12 becomes Season 3, Episode 12.</small>}
    </div>
  );
}
