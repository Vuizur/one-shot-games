import test from 'node:test';
import assert from 'node:assert/strict';
import { challenges, partners, plans, tones } from '../games/amor-en-modo-subjuntivo/story.js';
import { freshGame, selectPartner, selectPlan, selectTone, isCorrect, normalize, submitAnswer, advance, useHint, score, chemistry, endingFor, saveData, restoreGame } from '../games/amor-en-modo-subjuntivo/engine.js';

const correctAnswers = challenge => challenge.fields.map(field => field.answers[0]);
function begin(partner = 'vera', plan = 'azotea') {
  return selectPlan(selectPartner(freshGame(), partner), plan);
}
function play(correctCount, partner = 'vera', plan = 'azotea', tone = 'aventura') {
  let state = begin(partner, plan);
  for (let i = 0; i < challenges.length; i++) {
    if (state.phase === 'interlude') state = selectTone(state, tone);
    state = submitAnswer(state, i < correctCount ? correctAnswers(challenges[i]) : challenges[i].fields.map(() => 'sin-resolver'));
    assert.equal(state.phase, 'feedback');
    assert.deepEqual(restoreGame(JSON.parse(JSON.stringify(saveData(state)))), state);
    state = advance(state);
    assert.deepEqual(restoreGame(saveData(state)), state);
  }
  return state;
}

test('dating grammar: canonical answers, capitalization, Unicode, and advertised variants are accepted', () => {
  for (const challenge of challenges) {
    for (const transform of [value => value, value => '  ' + value.toLocaleUpperCase('es').normalize('NFD') + '.  ']) {
      assert.ok(isCorrect(challenge, correctAnswers(challenge).map(transform)));
    }
    assert.ok(!isCorrect(challenge, challenge.fields.map(() => 'sin-resolver')));
  }
  assert.ok(isCorrect(challenges[7], ['fuese', 'invitaría']));
  assert.equal(normalize('  Las   traje. '), 'las traje');
});

test('dating grammar: accents, agreement, requested fields, and full sentence constraints matter', () => {
  for (const index of [2, 4, 7, 8, 9]) {
    const answers = correctAnswers(challenges[index]);
    assert.ok(!isCorrect(challenges[index], answers.map(value => value.normalize('NFD').replace(/\p{M}/gu, ''))));
  }
  assert.ok(!isCorrect(challenges[0], ['gusta']));
  assert.ok(!isCorrect(challenges[3], ['traje']));
  assert.ok(!isCorrect(challenges[7], ['fuera']));
  assert.ok(!isCorrect(challenges[0], ['gustan', 'gustan']));
  assert.ok(!isCorrect(challenges[0], [null]));
});

test('dating grammar: each challenge has one attempt and all incorrect routes still finish', () => {
  let state = begin();
  assert.equal(submitAnswer(state, ['']), state);
  assert.equal(submitAnswer(state, ['x'.repeat(121)]), state);
  assert.equal(submitAnswer(state, []), state);
  state = submitAnswer(state, ['sin-resolver']);
  assert.equal(submitAnswer(state, ['gustan']), state);
  assert.equal(state.records[0].correct, false);
  const end = play(0);
  assert.equal(end.phase, 'ending');
  assert.equal(end.records.length, 10);
  assert.equal(endingFor(end), 'desastre');
  assert.equal(advance(end), end);
});

test('dating grammar: all four endings are reachable with every adult partner', () => {
  for (const [id, partner] of Object.entries(partners)) {
    assert.ok(partner.age >= 18);
    for (const [correctCount, expected] of [[10, 'chispa'], [6, 'segunda'], [3, 'amistad'], [0, 'desastre']]) {
      const state = play(correctCount, id, partner.favoritePlan, partner.favoriteTone);
      assert.equal(chemistry(state), 4);
      assert.equal(score(state), correctCount);
      assert.equal(endingFor(state), expected);
    }
    const otherPlan = Object.keys(plans).find(plan => plan !== partner.favoritePlan);
    const otherTone = Object.keys(tones).find(tone => tone !== partner.favoriteTone);
    assert.equal(endingFor(play(10, id, otherPlan, otherTone)), 'segunda');
  }
});

test('dating grammar: hints have no penalty, do not duplicate, and survive every phase', () => {
  for (const initial of [freshGame(), selectPartner(freshGame(), 'leo'), begin()]) {
    assert.deepEqual(restoreGame(saveData(initial)), initial);
  }
  let state = begin();
  state = useHint(state);
  assert.equal(useHint(state), state);
  assert.deepEqual(restoreGame(saveData(state)), state);
  state = submitAnswer(state, ['gustan']);
  assert.equal(state.records[0].hint, true);
  assert.equal(score(state), 1);
  assert.deepEqual(restoreGame(saveData(state)), state);
  assert.equal(useHint(state), state);
});

test('dating grammar: typed answers are absent from state, saves, and restored records', () => {
  const marker = 'RESPUESTA_PRIVADA_938271';
  const state = submitAnswer(begin(), [marker]);
  for (const value of [state, saveData(state), restoreGame(saveData(state))]) {
    assert.ok(!JSON.stringify(value).includes(marker));
    assert.deepEqual(Object.keys(value.records[0]).sort(), ['correct', 'hint']);
  }
});

test('dating grammar: invalid saves and out-of-order selections are rejected', () => {
  const initial = freshGame();
  assert.equal(selectPartner(initial, '__proto__'), initial);
  assert.equal(selectPlan(initial, 'jardin'), initial);
  assert.equal(selectTone(initial, 'calma'), initial);
  for (const invalid of [null, {}, { ...saveData(initial), version: 2 }, { ...saveData(initial), partner: 'missing' },
    { ...saveData(initial), records: [{ correct: true, hint: false }] },
    { ...saveData(begin()), records: [{ correct: 'yes', hint: false }] },
    { ...saveData(begin()), records: Array(11).fill({ correct: true, hint: false }) },
    { ...saveData(begin()), tone: 'calma' },
    { ...saveData(initial), phase: 'ending' }]) {
    assert.equal(restoreGame(invalid), null);
  }
});

test('dating grammar: every success/failure combination restores at each transition', () => {
  for (let mask = 0; mask < 1024; mask++) {
    let state = begin();
    for (let i = 0; i < challenges.length; i++) {
      if (state.phase === 'interlude') state = selectTone(state, 'aventura');
      if ((mask + i) % 3 === 0) state = useHint(state);
      assert.deepEqual(restoreGame(saveData(state)), state);
      const answers = (mask & (1 << i)) ? correctAnswers(challenges[i]) : challenges[i].fields.map(() => 'sin-resolver');
      state = submitAnswer(state, answers);
      assert.deepEqual(restoreGame(saveData(state)), state);
      state = advance(state);
      assert.deepEqual(restoreGame(saveData(state)), state);
    }
    assert.equal(state.phase, 'ending');
    assert.equal(state.records.length, 10);
  }
});
