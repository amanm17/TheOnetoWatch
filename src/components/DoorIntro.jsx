import React from 'react';
import { motion } from 'framer-motion';

export default function DoorIntro({ onEnter }) {
  return (
    <motion.div
      className="door-wrap refined-door-wrap friends-entry-wrap"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04, filter: 'blur(8px)' }}
      transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="ambient-light ambient-one" />
      <div className="ambient-light ambient-two" />
      <div className="friends-wall-dots" />

      <motion.div
        className="entry-scene"
        initial={{ opacity: 0, y: 18, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="entry-copy">
          <span className="eyebrow">The One to Watch</span>
          <h2>Step into your next comfort episode.</h2>
          <p>Random, specific, or mood-matched. No overthinking required.</p>

          <div className="entry-mini-tags" aria-hidden="true">
            <span>☕ Central Perk energy</span>
            <span>🛋️ Couch mode</span>
            <span>🚪 Purple door vibes</span>
          </div>
        </div>

        <motion.button
          className="refined-door friends-door"
          onClick={onEnter}
          whileHover={{ y: -3, scale: 1.01 }}
          whileTap={{ scale: 0.985 }}
          transition={{ type: 'spring', stiffness: 120, damping: 16 }}
          aria-label="Enter The One to Watch"
        >
          <div className="door-surface friends-purple-door">
            <div className="door-panel panel-top-left" />
            <div className="door-panel panel-top-right" />
            <div className="door-panel panel-bottom-left" />
            <div className="door-panel panel-bottom-right" />

            <motion.div
              className="friends-curly-frame"
              animate={{
                filter: [
                  'drop-shadow(0 8px 12px rgba(70,35,10,.24)) drop-shadow(0 0 8px rgba(244,196,48,.24))',
                  'drop-shadow(0 10px 18px rgba(70,35,10,.30)) drop-shadow(0 0 20px rgba(244,196,48,.52))',
                  'drop-shadow(0 8px 12px rgba(70,35,10,.24)) drop-shadow(0 0 8px rgba(244,196,48,.24))',
                ],
              }}
              transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
              aria-hidden="true"
            >
              <svg viewBox="0 0 320 420" role="img" aria-label="Yellow ornate peephole frame">
                <defs>
                  <linearGradient id="goldFrame" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#FFE16A" />
                    <stop offset="42%" stopColor="#F4C430" />
                    <stop offset="100%" stopColor="#C98708" />
                  </linearGradient>
                  <linearGradient id="goldHighlight" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="rgba(255,255,255,0)" />
                    <stop offset="50%" stopColor="#FFF2A6" />
                    <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                  </linearGradient>
                </defs>

                {/* Main frame body: rectangular opening with exaggerated sides */}
                <path
                  className="curly-frame-body"
                  d="
                  M88 72
                  C112 46 208 46 232 72
                  C262 66 282 82 281 108
                  C280 132 260 142 241 133

                  L241 287
                  C260 278 280 288 281 312
                  C282 338 262 354 232 348
                  C208 374 112 374 88 348
                  C58 354 38 338 39 312
                  C40 288 60 278 79 287

                  L79 133
                  C60 142 40 132 39 108
                  C38 82 58 66 88 72
                  Z

                  M105 112
                  L105 308
                  L215 308
                  L215 112
                  Z"
                  fill="url(#goldFrame)"
                  fillRule="evenodd"
                />

                {/* Top and bottom soft arch bands */}
                <path
                  className="frame-band"
                  d="M88 83 C112 63 208 63 232 83 C215 100 105 100 88 83 Z"
                />
                <path
                  className="frame-band"
                  d="M88 337 C112 357 208 357 232 337 C215 320 105 320 88 337 Z"
                />

                {/* Left side ridge bands */}
                <path className="frame-ridge" d="M82 130 C58 170 58 250 82 290" />
                <path className="frame-ridge soft" d="M96 127 C76 170 76 250 96 293" />

                {/* Right side ridge bands */}
                <path className="frame-ridge" d="M238 130 C262 170 262 250 238 290" />
                <path className="frame-ridge soft" d="M224 127 C244 170 244 250 224 293" />

                {/* Top/bottom ridge bands */}
                <path className="frame-ridge horizontal" d="M98 88 C128 72 192 72 222 88" />
                <path className="frame-ridge horizontal soft" d="M98 332 C128 348 192 348 222 332" />

                {/* Corner curls */}
                <path className="curl" d="M77 72 C52 43 104 27 102 67 C101 88 70 91 70 70 C70 55 91 55 89 69" />
                <path className="curl" d="M243 72 C268 43 216 27 218 67 C219 88 250 91 250 70 C250 55 229 55 231 69" />
                <path className="curl" d="M77 348 C52 377 104 393 102 353 C101 332 70 329 70 350 C70 365 91 365 89 351" />
                <path className="curl" d="M243 348 C268 377 216 393 218 353 C219 332 250 329 250 350 C250 365 229 365 231 351" />

                {/* Smaller side curls */}
                <path className="curl side" d="M72 118 C34 100 32 154 69 143 C90 137 84 107 66 113 C52 118 58 137 71 132" />
                <path className="curl side" d="M248 118 C286 100 288 154 251 143 C230 137 236 107 254 113 C268 118 262 137 249 132" />
                <path className="curl side" d="M72 302 C34 320 32 266 69 277 C90 283 84 313 66 307 C52 302 58 283 71 288" />
                <path className="curl side" d="M248 302 C286 320 288 266 251 277 C230 283 236 313 254 307 C268 302 262 283 249 288" />

                {/* Highlights */}
                <path className="frame-highlight" d="M112 76 C140 65 180 65 208 76" />
                <path className="frame-highlight" d="M112 344 C140 355 180 355 208 344" />
                <path className="frame-highlight side-hi" d="M90 143 C73 180 73 240 90 277" />
                <path className="frame-highlight side-hi" d="M230 143 C247 180 247 240 230 277" />

                {/* Peephole */}
                <circle className="peephole-ring" cx="160" cy="210" r="21" />
                <circle className="peephole-centre" cx="160" cy="210" r="10" />
              </svg>
            </motion.div>

            <div className="brass-knob" />
            <div className="door-bottom-glow" />
          </div>

          <span className="enter-label">Come in</span>
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
