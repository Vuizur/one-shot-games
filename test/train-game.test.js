import test from 'node:test';
import assert from 'node:assert/strict';
import { scenes, endings, objects } from '../games/posledni-spoj/story.js';
import { freshGame, sceneFor, choicesFor, choose, visited, restoreGame, saveData } from '../games/posledni-spoj/engine.js';

function follow(ids, initial = freshGame()) {
  return ids.reduce((state, id) => {
    const next = choose(state, id);
    assert.notEqual(next, state, 'Unavailable: ' + id + ' at ' + state.node);
    return next;
  }, initial);
}
const fullRoute = ['tuzka','jmeno','ada','poslech','zapis','oldrich','sednout','novy','vrbova','semeno','vzít','dopis','priznat','klic'];

test('train: all four endings are available after the complete shared journey', () => {
  const cabin = follow(fullRoute);
  assert.equal(cabin.node, 'kabina');
  assert.equal(visited(cabin), 3);
  assert.ok(choicesFor(cabin).every(choice => !choice.locked));
  for (const id of Object.keys(endings)) {
    const end = choose(cabin,id);
    assert.equal(end.ending,id);
    assert.deepEqual(restoreGame(saveData(end)),end);
    assert.equal(choose(end,'domu'),end);
    assert.equal(restoreGame({ version: 1, history: end.history.slice(0,-1) }).node,'kabina');
  }
});

test('train: exploration order is free, completed carriages cannot repeat, tunnel needs two', () => {
  const orders = [
    ['ada','oldrich','vrbova'], ['ada','vrbova','oldrich'],
    ['oldrich','ada','vrbova'], ['oldrich','vrbova','ada'],
    ['vrbova','ada','oldrich'], ['vrbova','oldrich','ada'],
  ];
  const routes = { ada: ['ada','poslech','ticho'], oldrich: ['oldrich','sednout','novy'], vrbova: ['vrbova','semeno','vzít'] };
  for (const order of orders) {
    let state = follow(['nic','cena']);
    assert.equal(choose(state,'dopis'),state);
    for (const [index, stop] of order.entries()) {
      state = follow(routes[stop],state);
      assert.equal(choose(state,stop),state);
      assert.equal(choicesFor(state).some(choice => choice.id === 'dopis'),index >= 1);
    }
    assert.equal(choose(state,'dopis').node,'dopis');
  }
});

test('train: missed evidence locks only the collective ending; dialogue always opens the cabin', () => {
  const state = follow(['nic','cena','ada','zaruka','odejit','oldrich','sednout','hodiny','dopis','slozit','prosit','sam']);
  assert.equal(state.node,'kabina');
  const collective = choicesFor(state).find(choice => choice.id === 'zitra');
  assert.equal(collective.locked,true);
  assert.equal(collective.missing.length,3);
  assert.equal(choose(state,'zitra'),state);
  for (const id of ['domu','vcera','sluzba']) assert.equal(choose(state,id).ending,id);
});

test('train: optional items are required and consumed where promised; tea and pencil remain independent', () => {
  const initial = follow(['nic','cil','oldrich']);
  assert.equal(choose(initial,'jablko'),initial);
  assert.equal(choose(initial,'caj'),initial);
  const apple = follow(['jablko','cil','oldrich','jablko']);
  assert.ok(!apple.inventory.includes('jablko'));
  const tea = follow(['nic','cil','bufet','caj','oldrich','caj']);
  assert.ok(!tea.inventory.includes('caj'));
  const pencil = follow(['nic','cil','bufet','tuzka','ada','poslech','zapis']);
  assert.ok(pencil.inventory.includes('nota'));
  assert.equal(choose(pencil,'bufet'),pencil);
});

test('train: illegal histories, appended ending choices and forged objects are rejected or ignored', () => {
  for (const value of [null,{}, {version:2,history:[]}, {version:1,history:['domu']},
    {version:1,history:[7]}, {version:1,history:Array(41).fill('nic')}]) {
    assert.equal(restoreGame(value),null);
  }
  const state = follow(fullRoute);
  assert.deepEqual(restoreGame({...saveData(state),inventory:['anything'],ending:'domu'}),state);
  assert.equal(restoreGame({version:1,history:[...state.history,'domu','vcera']}),null);
});

test('train: every reachable route is finite, restores correctly, and has a way forward', () => {
  const stack = [freshGame()], seen = new Set(), foundEndings = new Set(), nodes = new Set();
  while (stack.length) {
    const state = stack.pop();
    const signature = JSON.stringify([state.node,[...state.inventory].sort(),[...state.flags].sort(),state.ending]);
    if (seen.has(signature)) continue;
    seen.add(signature); nodes.add(state.node);
    assert.deepEqual(restoreGame(JSON.parse(JSON.stringify(saveData(state)))),state);
    assert.ok(state.inventory.every(id => Object.hasOwn(objects,id)));
    assert.equal(new Set(state.inventory).size,state.inventory.length);
    assert.ok(state.history.length < 40);
    if (state.ending) { foundEndings.add(state.ending); continue; }
    const choices = choicesFor(state).filter(choice => !choice.locked);
    assert.ok(choices.length,'Dead end: '+state.node);
    assert.ok(sceneFor(state).text.length > 0);
    for (const choice of choices) stack.push(choose(state,choice.id));
  }
  assert.deepEqual([...foundEndings].sort(),Object.keys(endings).sort());
  assert.deepEqual([...nodes].sort(),[...Object.keys(scenes),'chodba'].sort());
  assert.ok(seen.size > 500);
});
