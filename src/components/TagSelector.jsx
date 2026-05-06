import React from 'react';

export function Chip({ active, onClick, children, className = '' }) {
  return (
    <button type="button" className={`${active ? 'chip active' : 'chip'} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
}

export default function TagSelector({ title, tags, selected, onToggle }) {
  return (
    <div className="chip-section">
      <b>{title}</b>
      <div className="chips-wrap">
        {tags.map((tag) => (
          <Chip key={tag} active={selected.includes(tag)} onClick={() => onToggle(tag)}>
            {tag}
          </Chip>
        ))}
      </div>
    </div>
  );
}
