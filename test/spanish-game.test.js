import test from 'node:test';
import assert from 'node:assert/strict';
import { scenes, endings, items } from '../games/cthulhu-tiene-cita-previa/story.js';
import { freshGame, choicesFor, choose, tasks, restoreGame, saveData } from '../games/cthulhu-tiene-cita-previa/engine.js';

function follow(ids, initial = freshGame()) {
  return ids.reduce((state, id) => {
    const next = choose(state, id);
    assert.notEqual(next, state, 'Unavailable decision: ' + id + ' in ' + state.node);
    return next;
  }, initial);
}
const complete = [
  'galleta', 'turno',
  'urbanismo', 'rampa', 'sello',
  'archivo', 'club', 'carnet',
  'cafeteria', 'escuchar', 'normal', 'audiencia',
];

test('Spanish adventure: optional items unlock four distinct resolutions, plus approval', () => {
  const state = follow(complete);
  assert.equal(state.node, 'audiencia');
  assert.equal(tasks(state).filter(task => task.done).length, 3);
  for (const [choice, expected] of [
    ['denegar', 'archivo'], ['negociar', 'pacto'], ['huelga', 'sindicato'], ['gato', 'gato'], ['aprobar', 'desastre'],
  ]) {
    const end = choose(state, choice);
    assert.equal(end.ending, expected);
    assert.equal(choose(end, 'aprobar'), end, 'Ending must be terminal');
    assert.deepEqual(restoreGame(saveData(end)), end);
  }
});

test('Spanish adventure: completing departments in any order never allows repeat rewards', () => {
  const orders = [
    ['urbanismo', 'archivo', 'cafeteria'], ['urbanismo', 'cafeteria', 'archivo'],
    ['archivo', 'urbanismo', 'cafeteria'], ['archivo', 'cafeteria', 'urbanismo'],
    ['cafeteria', 'urbanismo', 'archivo'], ['cafeteria', 'archivo', 'urbanismo'],
  ];
  const routes = { urbanismo: ['urbanismo', 'rampa', 'solo'], archivo: ['archivo', 'club', 'foto'], cafeteria: ['cafeteria', 'propina', 'normal'] };
  for (const order of orders) {
    let state = follow(['profesional', 'turno']);
    assert.equal(choose(state, 'audiencia'), state);
    for (const department of order) {
      state = follow(routes[department], state);
      assert.equal(choose(state, department), state);
      assert.equal(new Set(state.inventory).size, state.inventory.length);
    }
    assert.equal(choose(state, 'audiencia').node, 'audiencia');
  }
});

test('Spanish adventure: absent optional items lock choices; cookies are consumed once', () => {
  const noCookie = choose(freshGame(), 'profesional');
  assert.equal(choose(noCookie, 'merienda'), noCookie);
  const cookie = follow(['galleta', 'merienda']);
  assert.equal(cookie.patience, 8);
  assert.ok(!cookie.inventory.includes('galleta'));
  const noExtras = follow(['profesional', 'turno', 'urbanismo', 'rampa', 'solo', 'archivo', 'club', 'foto', 'cafeteria', 'propina', 'normal', 'audiencia']);
  for (const id of ['denegar', 'huelga', 'gato']) assert.equal(choose(noExtras, id), noExtras);
  assert.ok(choicesFor(noExtras).find(choice => choice.id === 'denegar').missing.includes('Sello de denegación'));
});

test('Spanish adventure: chaos and exhausted patience change the negotiation ending', () => {
  const chaotic = follow(['grito', 'cita', 'urbanismo', 'terraza', 'patata', 'archivo', 'devolver', 'psps', 'cafeteria', 'karaoke', 'azucar', 'audiencia']);
  assert.ok(chaotic.chaos >= 5);
  assert.equal(choose(chaotic, 'negociar').ending, 'desastre');
  const exhausted = follow(['galleta', 'cita', 'urbanismo', 'medir', 'sello', 'archivo', 'susurro', 'carnet', 'cafeteria', 'escuchar', 'normal', 'audiencia']);
  assert.equal(exhausted.patience, 2);
  assert.equal(choose(exhausted, 'negociar').ending, 'desastre');
  assert.equal(choose({ ...exhausted, patience: 3, chaos: 4 }, 'negociar').ending, 'pacto');
  assert.equal(choose({ ...exhausted, patience: 3, chaos: 5 }, 'negociar').ending, 'desastre');
});

test('Spanish adventure: save replay rejects illegal histories and ignores forged statistics', () => {
  for (const invalid of [null, {}, { version: 2, history: [] }, { version: 1, history: ['audiencia'] }, { version: 1, history: [7] }, { version: 1, history: Array(33).fill('galleta') }]) {
    assert.equal(restoreGame(invalid), null);
  }
  const state = follow(complete);
  assert.deepEqual(restoreGame({ ...saveData(state), patience: 999, inventory: ['anything'] }), state);
  const end = choose(state, 'gato');
  assert.equal(restoreGame({ version: 1, history: [...end.history, 'aprobar'] }), null);
  assert.equal(restoreGame({ version: 1, history: end.history.slice(0, -1) }).node, 'audiencia');
});

test('Spanish adventure: every reachable state can finish; all endings and story nodes are reachable', () => {
  const seen = new Set(), foundEndings = new Set(), foundNodes = new Set();
  const stack = [freshGame()];
  while (stack.length) {
    const state = stack.pop();
    const signature = JSON.stringify([state.node, state.patience, state.chaos, [...state.inventory].sort(), state.ending]);
    if (seen.has(signature)) continue;
    seen.add(signature);
    foundNodes.add(state.node);
    assert.ok(state.patience >= 0 && state.patience <= 10);
    assert.ok(state.chaos >= 0 && state.chaos <= 10);
    assert.ok(state.inventory.every(item => Object.hasOwn(items, item)));
    assert.deepEqual(restoreGame(JSON.parse(JSON.stringify(saveData(state)))), state);
    if (state.ending) { foundEndings.add(state.ending); continue; }
    const choices = choicesFor(state).filter(choice => !choice.locked);
    assert.ok(choices.length > 0, 'Dead end: ' + state.node);
    assert.ok(state.history.length < 32);
    for (const choice of choices) {
      const next = choose(state, choice.id);
      assert.notEqual(next, state);
      stack.push(next);
    }
  }
  assert.deepEqual([...foundEndings].sort(), Object.keys(endings).sort());
  assert.deepEqual([...foundNodes].sort(), [...Object.keys(scenes), 'vestibulo'].sort());
  assert.ok(seen.size > 1000);
});
