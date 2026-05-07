import { useEffect } from 'react';

const TAGGING_STATUS_TEXT = 'github_seed_imported_needs_transcript_tags';

const CATEGORY_HEADS = new Set([
  'Mood',
  'Theme',
  'Context',
  'Character energy',
  'Character Energy',
]);

const SCORE_WORDS = ['Iconic', 'Comfort', 'Chaos', 'Romance'];

function cleanText(value) {
  return (value || '').replace(/\s+/g, ' ').trim();
}

function clearOldFixes() {
  document
    .querySelectorAll(
      '.totw-hide-import-status, .totw-dark-category-head, .totw-dark-reason-bubble, .totw-dark-result-tag, .totw-dark-score-bubble'
    )
    .forEach((el) => {
      el.classList.remove(
        'totw-hide-import-status',
        'totw-dark-category-head',
        'totw-dark-reason-bubble',
        'totw-dark-result-tag',
        'totw-dark-score-bubble'
      );
    });
}

function applyReadabilityFixes() {
  clearOldFixes();

  const all = Array.from(document.querySelectorAll('body *'));

  all.forEach((el) => {
    const text = cleanText(el.textContent);
    if (!text) return;

    if (text === TAGGING_STATUS_TEXT || text.includes(TAGGING_STATUS_TEXT)) {
      el.classList.add('totw-hide-import-status');
      return;
    }

    if (CATEGORY_HEADS.has(text)) {
      el.classList.add('totw-dark-category-head');
      return;
    }

    const looksLikeScore =
      SCORE_WORDS.some((word) => text.startsWith(word)) &&
      /[0-9]\s*\/\s*10/.test(text) &&
      text.length < 35;

    if (looksLikeScore) {
      el.classList.add('totw-dark-score-bubble');
      return;
    }

    const className = String(el.className || '').toLowerCase();
    const chipLike =
      className.includes('chip') ||
      className.includes('tag') ||
      className.includes('pill') ||
      className.includes('badge');

    const insideEpisodeArea =
      el.closest('.episode-card') ||
      el.closest('.result-card') ||
      el.closest('.episode-result') ||
      el.closest('.episode-display');

    if (chipLike && insideEpisodeArea && text.length > 0 && text.length < 55) {
      el.classList.add('totw-dark-result-tag');
    }
  });

  // Reason bubble: apply only to the smallest reasonable container, not the whole result card.
  const reasonCandidates = all
    .filter((el) => {
      const text = cleanText(el.textContent);
      return (
        text.startsWith('Why this one?') ||
        text.includes('Episode driver inferred from the title and synopsis')
      );
    })
    .sort((a, b) => cleanText(a.textContent).length - cleanText(b.textContent).length);

  if (reasonCandidates.length) {
    reasonCandidates[0].classList.add('totw-dark-reason-bubble');
  }
}

export default function ReadabilityFix() {
  useEffect(() => {
    applyReadabilityFixes();

    const observer = new MutationObserver(() => {
      window.requestAnimationFrame(applyReadabilityFixes);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
