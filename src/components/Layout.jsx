import React from 'react';
import TitleMorph from './TitleMorph';
import ThemeToggle from './ThemeToggle';
import SetAtmosphere from './SetAtmosphere';
import ReadabilityFix from './ReadabilityFix';

export default function Layout({ children }) {
  return (
    <section className="app-shell">
      <header>
        <SetAtmosphere />
<ReadabilityFix />
<div className="top-brand-row"><TitleMorph /><ThemeToggle /></div>
      </header>
      {children}
      <footer></footer>
    </section>
  );
}
