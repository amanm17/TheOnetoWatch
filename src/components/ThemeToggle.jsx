import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const STORAGE_KEY = 'the-one-to-watch-theme';

function getInitialTheme() {
  if (typeof window === 'undefined') return 'dark';
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === 'light' || saved === 'dark') return saved;
  return 'dark';
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState(getInitialTheme);
  const [pulled, setPulled] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.body.dataset.theme = theme;
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const isLight = theme === 'light';

  function pullCord() {
    setPulled(true);
    setTheme(isLight ? 'dark' : 'light');
    window.setTimeout(() => setPulled(false), 620);
  }

  return (
    <button
      type="button"
      className={isLight ? 'pull-switch pull-switch-light' : 'pull-switch pull-switch-dark'}
      onClick={pullCord}
      aria-label={isLight ? 'Pull cord to switch to dark mode' : 'Pull cord to switch to light mode'}
      title={isLight ? 'Pull cord to switch to dark mode' : 'Pull cord to switch to light mode'}
    >
      <span className="switch-ceiling" />
      <motion.span
        className="switch-cord"
        animate={{
          height: pulled ? 82 : 58,
          rotate: pulled ? [0, -3, 3, -2, 0] : 0,
        }}
        transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.span
        className="switch-pull"
        animate={{
          y: pulled ? [0, 22, -5, 0] : 0,
          scale: pulled ? [1, 0.96, 1.03, 1] : 1,
        }}
        transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
      >
        {isLight ? '☀️' : '🌙'}
      </motion.span>

      <AnimatePresence mode="wait">
        <motion.span
          key={theme}
          className="switch-label"
          initial={{ opacity: 0, y: -4, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: 4, filter: 'blur(4px)' }}
          transition={{ duration: 0.22 }}
        >
          {isLight ? 'Apartment lights' : 'Café night'}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
