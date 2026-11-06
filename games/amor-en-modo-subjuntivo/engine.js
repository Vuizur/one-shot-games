import { partners, plans, tones, challenges } from './story.js';
export const SAVE_KEY = 'amor-subjuntivo-v1';
export const freshGame = () => ({
  partner: null, plan: null, tone: null, index: 0, phase: 'select', records: [], hint: false,
});
const owns = (object, key) => typeof key === 'string' && Object.hasOwn(object, key);
export function selectPartner(state, id) {
  return state.phase === 'select' && owns(partners, id) ? { ...state, partner: id, phase: 'plan' } : state;
}
export function selectPlan(state, id) {
  return state.phase === 'plan' && owns(plans, id) ? { ...state, plan: id, phase: 'task' } : state;
}
export function selectTone(state, id) {
  return state.phase === 'interlude' && owns(tones, id) ? { ...state, tone: id, phase: 'task' } : state;
}
export const normalize = value => String(value).normalize('NFC').toLocaleLowerCase('es').trim()
  .replace(/^[¡¿]+/u, '').replace(/[.!?…]+$/u, '').trim().replace(/\s+/gu, ' ');
export function isCorrect(challenge, answers) {
  return Array.isArray(answers) && answers.length === challenge.fields.length
    && answers.every((value, i) => typeof value === 'string' && value.length <= 120
      && challenge.fields[i].answers.some(answer => normalize(value) === normalize(answer)));
}
export const useHint = state => state.phase === 'task' && !state.hint ? { ...state, hint: true } : state;
function recordOutcome(state, correct) {
  return { ...state, phase: 'feedback', records: [...state.records, { correct, hint: state.hint }] };
}
export function submitAnswer(state, answers) {
  if (state.phase !== 'task' || !Array.isArray(answers) || answers.length !== challenges[state.index].fields.length
    || answers.some(value => typeof value !== 'string' || !value.trim() || value.length > 120)) return state;
  // Typed answers are checked and discarded, never returned in state or stored.
  return recordOutcome(state, isCorrect(challenges[state.index], answers));
}
export function advance(state) {
  if (state.phase !== 'feedback') return state;
  if (state.index === challenges.length - 1) return { ...state, phase: 'ending', hint: false };
  return { ...state, index: state.index + 1, phase: state.index === 4 ? 'interlude' : 'task', hint: false };
}
export const score = state => state.records.filter(record => record.correct).length;
export function chemistry(state) {
  if (!state.partner) return 0;
  const partner = partners[state.partner];
  return (state.plan ? (state.plan === partner.favoritePlan ? 2 : 1) : 0)
    + (state.tone ? (state.tone === partner.favoriteTone ? 2 : 1) : 0);
}
export function endingFor(state) {
  const correct = score(state);
  if (correct >= 8 && chemistry(state) >= 3) return 'chispa';
  if (correct >= 6) return 'segunda';
  if (correct >= 3) return 'amistad';
  return 'desastre';
}
export const saveData = state => ({
  version: 1, partner: state.partner, plan: state.plan, tone: state.tone,
  phase: state.phase, records: state.records.map(record => ({ ...record })), hint: state.hint,
});
export function restoreGame(value) {
  if (!value || value.version !== 1 || !Array.isArray(value.records) || value.records.length > challenges.length
    || typeof value.hint !== 'boolean') return null;
  let state = freshGame();
  if (value.partner !== null) { state = selectPartner(state, value.partner); if (!state.partner) return null; }
  if (value.plan !== null) { state = selectPlan(state, value.plan); if (!state.plan) return null; }
  for (let i = 0; i < value.records.length; i++) {
    const record = value.records[i];
    if (!record || typeof record.correct !== 'boolean' || typeof record.hint !== 'boolean') return null;
    if (state.phase === 'interlude') state = selectTone(state, value.tone);
    if (state.phase !== 'task') return null;
    if (record.hint) state = useHint(state);
    state = recordOutcome(state, record.correct);
    if (i < value.records.length - 1 || value.phase !== 'feedback') state = advance(state);
  }
  if (state.phase === 'interlude' && value.tone !== null) state = selectTone(state, value.tone);
  if (value.hint && state.phase === 'task') state = useHint(state);
  if (state.phase !== value.phase || state.hint !== value.hint || state.partner !== value.partner
    || state.plan !== value.plan || state.tone !== value.tone) return null;
  return state;
}
