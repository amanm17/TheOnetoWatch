import React, { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Coffee } from 'lucide-react';
import DoorIntro from './components/DoorIntro';
import Layout from './components/Layout';
import RandomPicker from './components/RandomPicker';
import SeasonEpisodeLookup from './components/SeasonEpisodeLookup';
import MoodPicker from './components/MoodPicker';
import EpisodeCard from './components/EpisodeCard';
import HistoryDrawer from './components/HistoryDrawer';
import { pickRandom, lookup, getRecent } from './logic/recommendationEngine';

const initialFilters = { moods: [], themes: [], contexts: [], characters: [], preset: '' };

export default function App() {
  const [entered, setEntered] = useState(false);
  const [episodes, setEpisodes] = useState([]);
  const [selected, setSelected] = useState(null);
  const [filters, setFilters] = useState(initialFilters);
  const [season, setSeason] = useState(3);
  const [episode, setEpisode] = useState(12);
  const [history, setHistory] = useState([]);
  const [lookupError, setLookupError] = useState('');

  useEffect(() => {
    fetch('/data/friends_episodes.json')
      .then((response) => response.json())
      .then((rows) => setEpisodes(rows))
      .catch(() => setEpisodes([]));
  }, []);

  const refreshHistory = () => setHistory(getRecent());

  const random = (activeFilters = filters) => {
    const ep = pickRandom(episodes, activeFilters);
    setSelected(ep);
    refreshHistory();
    setLookupError('');
  };

  const lookupEp = () => {
    const ep = lookup(episodes, season, episode);
    if (!ep) {
      setLookupError('Couldn’t find that episode. Even Joey would check the season number.');
      return;
    }
    setSelected(ep);
    refreshHistory();
    setLookupError('');
  };

  return (
    <main>
      <AnimatePresence>{!entered && <DoorIntro onEnter={() => setEntered(true)} />}</AnimatePresence>
      <Layout>
        <div className="grid">
          <aside className="control-card apartment-card">
            <div className="card-kicker">Purple door controls</div>
            <RandomPicker onRandom={random} />
            <SeasonEpisodeLookup
              season={season}
              episode={episode}
              setSeason={setSeason}
              setEpisode={setEpisode}
              onLookup={lookupEp}
              error={lookupError}
            />
            <div className="mini-note">
              <Coffee size={18} />
              
            </div>
          </aside>

          <MoodPicker filters={filters} setFilters={setFilters} onPick={random} />

          <section className="result-column">
            <EpisodeCard episode={selected} onAgain={() => random(filters)} />
            <HistoryDrawer history={history} episodes={episodes} onSelect={setSelected} />
          </section>
        </div>
      </Layout>
    </main>
  );
}
