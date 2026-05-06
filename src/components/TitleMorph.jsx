import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function TitleMorph() {
  const [active, setActive] = useState(false);

  return (
    <div
      className={active ? 'title-lockup title-lockup-active' : 'title-lockup'}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onClick={() => setActive((v) => !v)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') setActive((v) => !v);
      }}
      aria-label="The One to Watch"
    >
      <motion.h1
        className="title-main"
        animate={{
          y: active ? -10 : 0,
          scale: active ? 0.94 : 1,
          letterSpacing: active ? '-0.045em' : '-0.065em',
        }}
        transition={{ type: 'spring', stiffness: 130, damping: 18 }}
      >
        The One to Watch
      </motion.h1>

      <motion.p
        className="title-tagline"
        initial={false}
        animate={{
          opacity: active ? 1 : 0,
          y: active ? 0 : -8,
          filter: active ? 'blur(0px)' : 'blur(5px)',
        }}
        transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
      >
        The one-ly FRIENDS episode picker for every mood, mess, and moment.
      </motion.p>
    </div>
  );
}
