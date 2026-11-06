import { scenes, endings, objects } from './story.js';
export const SAVE_KEY = 'posledni-spoj-v1';
export const freshGame = () => ({ node: 'nastupiste', inventory: [], flags: [], history: [], last: '', ending: null });
export const stops = [
  { id: 'ada', name: 'Ada', place: 'Kupé 2', detail: 'Čtyři nedohrané takty' },
  { id: 'oldrich', name: 'Oldřich', place: 'Kupé 4', detail: 'Sedm minut do zavolání' },
  { id: 'vrbova', name: 'Paní Vrbová', place: 'Kupé 6', detail: 'Zahrada ve sklenici' },
];
export const visited = state => stops.filter(stop => state.flags.includes(stop.id)).length;
export function sceneFor(state) {
  if (state.ending) return endings[state.ending];
  if (state.node !== 'chodba') return scenes[state.node];
  const count = visited(state);
  return {
    label: 'PRŮCHOZÍ CHODBA · MEZI STANICEMI',
    title: count === 3 ? 'Ve vlaku už nejsi sám.' : 'Za každými dveřmi někdo čeká.',
    text: [
      count === 0
        ? 'Chodba voní starým dřevem a topením, které se nedá vypnout. Nad dveřmi do kupé svítí čísla. Některá jsou přeškrtnutá, jako by i vůz občas potřeboval zapomenout, kde má začít.'
        : count === 3
          ? 'Za zády slyšíš housle, cinknutí lžičky a zavření kapesních hodinek. Všechny ty zvuky jsi tu slyšel už předtím. Teď ale víš, komu patří.'
          : 'Vlak pokračuje bez zastavení. Můžeš mluvit s dalšími cestujícími, nebo chvíli stát u okna. Minulost nikam nespěchá. To je její nejhorší zvyk.',
      'Na konci chodby je malý bufet. Na druhém konci svítí nápis STROJOVNA. Přes čelní sklo nevidíš nikoho, kdo by vlak řídil.',
      count >= 2 ? 'Obálka v kapse ztěžkne. Na jejím okraji se objeví tenká čára světla. Tunel už není daleko. Než ji otevřeš, můžeš ještě dokončit prohlídku vlaku.' : 'Dopis zůstává studený. Než přijde tunel, máš čas podívat se aspoň do dvou kupé. U cizích příběhů se někdy lépe poznává vlastní.',
    ],
    choices: [
      ...stops.filter(stop => !state.flags.includes(stop.id)).map(stop => ({
        id: stop.id, label: stop.place + ' · ' + stop.name + ' — ' + stop.detail, next: stop.id,
      })),
      ...(!state.flags.includes('bufet') ? [{ id: 'bufet', label: 'Zajít do prázdného bufetu.', next: 'bufet' }] : []),
      ...(count >= 2 ? [{ id: 'dopis', label: 'Počkat na tunel a otevřít obálku. Tím necháš prohlídku vozů za sebou.', next: 'dopis' }] : []),
    ],
  };
}
export const choicesFor = state => state.ending ? [] : sceneFor(state).choices.map(choice => ({
  ...choice,
  missing: (choice.needs || []).filter(id => !state.inventory.includes(id)).map(id => objects[id][0]),
  locked: (choice.needs || []).some(id => !state.inventory.includes(id)),
}));
export function choose(state, id) {
  if (state.ending || state.history.length >= 40) return state;
  const choice = choicesFor(state).find(choice => choice.id === id && !choice.locked);
  if (!choice) return state;
  const inventory = state.inventory.filter(item => !(choice.remove || []).includes(item));
  for (const item of choice.add || []) if (!inventory.includes(item)) inventory.push(item);
  return {
    ...state, inventory,
    flags: choice.flag && !state.flags.includes(choice.flag) ? [...state.flags, choice.flag] : [...state.flags],
    node: choice.next || state.node, ending: choice.ending || null,
    last: choice.result || '', history: [...state.history, id],
  };
}
export const saveData = state => ({ version: 1, history: [...state.history] });
export function restoreGame(value) {
  if (!value || value.version !== 1 || !Array.isArray(value.history) || value.history.length > 40) return null;
  let state = freshGame();
  for (const id of value.history) {
    if (typeof id !== 'string') return null;
    const next = choose(state, id);
    if (next === state) return null;
    state = next;
  }
  return state;
}
