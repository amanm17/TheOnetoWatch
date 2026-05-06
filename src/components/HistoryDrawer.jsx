import React from 'react';

export default function HistoryDrawer({ history, episodes, onSelect }) {
  const recent = history.slice(0, 10).map((id) => episodes.find((ep) => Number(ep.id) === Number(id))).filter(Boolean);

  return (
    <div className="history fridge-card">
      <b>Recent loop</b>
      
      <div className="history-buttons">
        {recent.map((ep) => <button key={ep.id} onClick={() => onSelect(ep)}>{ep.code}</button>)}
      </div>
    </div>
  );
}
