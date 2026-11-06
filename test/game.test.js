import test from 'node:test';
import assert from 'node:assert/strict';
import { chapters } from '../games/pod-hladinou-reci/data.js';
import { newGame, submitAnswer, advance, useHint, endingFor, validateSave, isCorrect } from '../games/pod-hladinou-reci/engine.js';

function answerFor(chapter, correct) {
  if (correct) return chapter.type === 'input' ? chapter.answer[0] : chapter.answer;
  if (chapter.type === 'input') return 'nesprávný tvar';
  if (chapter.type === 'choice') return (chapter.answer + 1) % chapter.options.length;
  if (chapter.type === 'order') return [...chapter.answer].reverse();
  return [1, 3];
}
function play(wrong = []) {
  let state = newGame();
  while (state.phase !== 'ending') {
    state = submitAnswer(state, answerFor(chapters[state.index], !wrong.includes(state.index)));
    assert.deepEqual(validateSave(JSON.parse(JSON.stringify(state))), state);
    state = advance(state);
    assert.deepEqual(validateSave(JSON.parse(JSON.stringify(state))), state);
  }
  return state;
}

test('a flawless expedition rescues Rybář; no task or evidence is skipped', () => {
  const state = play();
  assert.equal(state.records.length, 10);
  assert.equal(state.resolve, 7);
  assert.equal(endingFor(state), 'sealed');
});
test('critical missing evidence allows survival but prevents rescue', () => {
  for (const index of [2, 6, 7]) assert.equal(endingFor(play([index])), 'survivor');
  assert.equal(endingFor(play([0])), 'sealed');
});
test('a wrong final invocation leaves the threshold open', () => {
  const state = play([9]);
  assert.equal(state.resolve, 5);
  assert.equal(endingFor(state), 'open');
});
test('repeated errors end the expedition early, at zero composure', () => {
  const state = play(chapters.map((_, i) => i));
  assert.equal(state.resolve, 0);
  assert.ok(state.records.length < 10);
  assert.equal(endingFor(state), 'lost');
});
test('a hint costs composure once, preserves it on repeated requests, and cannot kill', () => {
  let state = newGame();
  for (let i = 0; i < 6; i++) {
    state = useHint(state);
    assert.equal(state.resolve, 6 - i);
    assert.deepEqual(validateSave(state), state);
    assert.equal(useHint(state), state);
    state = advance(submitAnswer(state, answerFor(chapters[i], true)));
  }
  assert.equal(state.resolve, 1);
  assert.equal(useHint(state), state);
  assert.deepEqual(validateSave(state), state);
});
test('submitted answers cannot be changed; feedback and hints survive reloads', () => {
  let state = useHint(newGame());
  state = submitAnswer(state, 0);
  assert.equal(submitAnswer(state, 1), state);
  assert.equal(useHint(state), state);
  assert.deepEqual(validateSave(JSON.parse(JSON.stringify(state))), state);
  assert.equal(advance(newGame()).index, 0);
});
test('typed responses preserve Czech accents while accepting harmless typography', () => {
  assert.equal(isCorrect(chapters[2], '  OBOU  ZESNULÝCH   SPRÁVCŮ.  '), true);
  assert.equal(isCorrect(chapters[2], 'obou zesnulých správců'.normalize('NFD')), true);
  assert.equal(isCorrect(chapters[2], 'obou zesnulych spravcu'), false);
  assert.equal(isCorrect(chapters[5], 'neopsal bych'), false);
  assert.equal(isCorrect(chapters[9], 'Mlčenlivý strážci cizího prahu'), false);
});
test('ordering and multiple selection require complete, nonduplicated solutions', () => {
  assert.equal(isCorrect(chapters[3], [3, 2, 0, 1]), true);
  assert.equal(isCorrect(chapters[3], [3, 2, 1, 0]), false);
  assert.equal(isCorrect(chapters[6], [2, 0]), true);
  assert.equal(isCorrect(chapters[6], [0]), false);
  assert.equal(isCorrect(chapters[6], [0, 0]), false);
  assert.equal(isCorrect(chapters[6], [0, 2, 3]), false);
});
test('corrupt, inconsistent, and foreign saved games are rejected', () => {
  for (const value of [null, {}, { version: 2 }, { ...newGame(), resolve: 50 }, { ...newGame(), index: 100 }, { ...newGame(), hints: [0, 0] }, { ...newGame(), phase: 'ending' }]) assert.equal(validateSave(value), null);
  const valid = submitAnswer(newGame(), 1);
  assert.equal(validateSave({ ...valid, records: [{ ...valid.records[0], correct: false }] }), null);
  assert.equal(validateSave({ ...valid, records: [{ ...valid.records[0], value: '<script>' }] }), null);
});
test('all possible correct/error routes yield valid saves and one of four endings', () => {
  const seen = new Set();
  for (let mask = 0; mask < 1024; mask++) {
    const state = play(chapters.map((_, i) => i).filter(i => mask & (1 << i)));
    seen.add(endingFor(state));
  }
  assert.equal(seen.size, 4);
});
