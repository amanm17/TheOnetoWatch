import React from 'react';

export default function SetAtmosphere() {
  return (
    <div className="set-atmosphere" aria-hidden="true">
      <div className="set-wall set-brick-wall" />
      <div className="set-wall set-purple-wall" />

      <div className="central-perk-window">
        <div className="window-frame-line line-a" />
        <div className="window-frame-line line-b" />
        <div className="neon-cup">
          <span className="cup-bowl" />
          <span className="cup-handle" />
          <span className="cup-saucer" />
          <span className="steam steam-one" />
          <span className="steam steam-two" />
          <span className="steam steam-three" />
        </div>
      </div>

      <div className="apartment-kitchen">
        <div className="kitchen-shelf shelf-one" />
        <div className="kitchen-shelf shelf-two" />
        <div className="kitchen-cabinet" />
        <div className="fridge-shape">
          <span className="magnet magnet-red" />
          <span className="magnet magnet-yellow" />
          <span className="magnet magnet-blue" />
          <span className="magnet magnet-green" />
        </div>
      </div>

      <div className="sofa-glow" />
      <div className="floor-pattern" />

      <span className="floating-dot dot-red" />
      <span className="floating-dot dot-yellow" />
      <span className="floating-dot dot-blue" />
      <span className="floating-dot dot-green" />

      <span className="lamp-glow lamp-left" />
      <span className="lamp-glow lamp-right" />
    </div>
  );
}
