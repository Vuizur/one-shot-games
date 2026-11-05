import { chapters } from './data.js';

export const SAVE_KEY = 'pod-hladinou-reci-v1';
export const MAX_RESOLVE = 7;
export const newGame = () => ({ version: 1, index: 0, resolve: MAX_RESOLVE, records: [], hints: [], phase: 'task' });
export function normalize(value) {
  return String(value).normalize('NFC').toLocaleLowerCase('cs').trim().replace(/[.!?]+$/u, '').trim().replace(/\s+/gu, ' ');
}
export function isCorrect(chapter, value) {
  if (chapter.type === 'input') return typeof value === 'string' && chapter.answer.some(answer => normalize(answer) === normalize(value));
  if (chapter.type === 'choice') return value === chapter.answer;
  if (!Array.isArray(value) || value.length !== chapter.answer.length || new Set(value).size !== value.length) return false;
  if (chapter.type === 'order') return value.every((item, i) => item === chapter.answer[i]);
  return value.every(item => chapter.answer.includes(item));
}
export function useHint(state) {
  if (state.phase !== 'task' || state.hints.includes(state.index) || state.resolve <= 1) return state;
  return { ...state, resolve: state.resolve - 1, hints: [...state.hints, state.index] };
}
export function submitAnswer(state, value) {
  if (state.phase !== 'task') return state;
  const chapter = chapters[state.index];
  const correct = isCorrect(chapter, value);
  return { ...state, resolve: Math.max(0, state.resolve - (correct ? 0 : chapter.cost)), phase: 'feedback', records: [...state.records, { index: state.index, correct, value }] };
}
export function advance(state) {
  if (state.phase !== 'feedback') return state;
  if (state.resolve === 0 || state.index === chapters.length - 1) return { ...state, phase: 'ending' };
  return { ...state, index: state.index + 1, phase: 'task' };
}
export function endingFor(state) {
  if (state.resolve === 0) return 'lost';
  if (!state.records.find(record => record.index === 9)?.correct) return 'open';
  // These three independent pieces of evidence allow the companion's rescue.
  if ([2, 6, 7].every(index => state.records.find(record => record.index === index)?.correct)) return 'sealed';
  return 'survivor';
}
export function validateSave(candidate) {
  // Replay the recorded actions rather than trusting stored health or phase.
  if (!candidate || candidate.version !== 1 || !Array.isArray(candidate.records) || !Array.isArray(candidate.hints)) return null;
  if (candidate.records.length > chapters.length || new Set(candidate.hints).size !== candidate.hints.length || candidate.hints.some(i => !Number.isInteger(i) || i < 0 || i > candidate.index)) return null;
  let state = newGame();
  for (const record of candidate.records) {
    if (state.phase !== 'task' || record.index !== state.index) return null;
    if (candidate.hints.includes(state.index)) {
      const hinted = useHint(state);
      if (hinted === state) return null;
      state = hinted;
    }
    const chapter = chapters[state.index];
    const value = record.value;
    if (chapter.type === 'input' ? typeof value !== 'string' || value.length > 300 : chapter.type === 'choice' ? !Number.isInteger(value) || value < 0 || value >= chapter.options.length : !Array.isArray(value) || value.some(i => !Number.isInteger(i) || i < 0 || i >= chapter.options.length)) return null;
    state = submitAnswer(state, value);
    if (state.records.at(-1).correct !== record.correct) return null;
    if (candidate.phase === 'feedback' && candidate.index === state.index) break;
    state = advance(state);
  }
  if (state.phase === 'task' && candidate.hints.includes(state.index)) {
    const hinted = useHint(state);
    if (hinted === state) return null;
    state = hinted;
  }
  if (state.index !== candidate.index || state.resolve !== candidate.resolve || state.phase !== candidate.phase || state.records.length !== candidate.records.length || state.hints.length !== candidate.hints.length) return null;
  return state;
}
