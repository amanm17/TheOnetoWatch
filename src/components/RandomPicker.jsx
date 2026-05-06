import React from 'react';
import { Shuffle } from 'lucide-react';

export default function RandomPicker({ onRandom }) {
  return (
    <button className="big random-button" onClick={() => onRandom({ strict: true })}>
      <Shuffle /> Could I BE watching anything more random?
    </button>
  );
}
