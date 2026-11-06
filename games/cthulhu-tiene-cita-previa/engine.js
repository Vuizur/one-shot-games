import { scenes, endings, items } from './story.js';
export const SAVE_KEY = 'cthulhu-cita-previa-v1';
export const freshGame = () => ({
  node: 'llegada', patience: 6, chaos: 0, inventory: [], history: [], last: '', ending: null,
});
const departments = [
  ['urbanismo', 'licencia', 'Urbanismo', 'Licencia de apocalipsis'],
  ['archivo', 'nombre', 'Archivo', 'Nombre verdadero'],
  ['cafeteria', 'cafe', 'Cafetería', 'Café para la audiencia'],
];
export const tasks = state => departments.map(([node, item, label, detail]) => ({
  node, label, detail, done: state.inventory.includes(item),
}));
export function sceneFor(state) {
  if (state.ending) return endings[state.ending];
  if (state.node !== 'vestibulo') return scenes[state.node];
  const complete = tasks(state).every(task => task.done);
  return {
    label: 'VESTÍBULO · DIRECTORIO MUNICIPAL',
    title: complete ? 'Todo listo. Más o menos.' : 'Tres trámites antes del fin.',
    text: complete ? [
      'La carpeta está completa. Contiene documentos, cafeína y una responsabilidad para la que tu contrato no tiene casilla.',
      'Doña Encarna te arregla el cuello. «Pase lo que pase, recuerda: si salvas el mundo, se lo cuentas a Recursos Humanos. Si lo destruyes, primero ficha la salida».',
    ] : [
      'El vestíbulo tiene un directorio y una planta que lleva años intentando pedir el traslado. Una flecha indica «Urbanismo». Otra, «Archivo». La tercera apunta a una mancha de café con forma de España, incluyendo islas que todavía no existen.',
      'Puedes visitar los departamentos en el orden que quieras. Necesitas resolver los tres trámites para entrar en la audiencia. Cada decisión deja su pequeña mancha en el expediente.',
    ],
    choices: [
      ...tasks(state).filter(task => !task.done).map(task => ({
        id: task.node, label: 'Ir a ' + task.label + ' · ' + task.detail, next: task.node,
        result: 'Pides paso hacia ' + task.label + '. El edificio cruje, pero de una forma que parece contratada.',
      })),
      ...(complete ? [{ id: 'audiencia', label: 'Entrar en el salón de plenos. Que sea lo que selle el destino.', next: 'audiencia', result: 'Doña Encarna te desea suerte. La impresora desea tóner. Ambos deseos son igual de urgentes.' }] : []),
    ],
  };
}
export const choicesFor = state => state.ending ? [] : sceneFor(state).choices.map(choice => ({
  ...choice,
  locked: (choice.requires || []).some(item => !state.inventory.includes(item)),
  missing: (choice.requires || []).filter(item => !state.inventory.includes(item)).map(item => items[item][0]),
}));
export function choose(state, id) {
  if (state.ending || state.history.length >= 32) return state;
  const choice = choicesFor(state).find(choice => choice.id === id && !choice.locked);
  if (!choice) return state;
  const inventory = state.inventory.filter(item => !(choice.remove || []).includes(item));
  for (const item of choice.add || []) if (!inventory.includes(item)) inventory.push(item);
  const next = {
    ...state, inventory,
    patience: Math.min(10, Math.max(0, state.patience + (choice.patience || 0))),
    chaos: Math.min(10, state.chaos + (choice.chaos || 0)),
    history: [...state.history, id],
    last: choice.result, node: choice.next || state.node, ending: choice.ending || null,
  };
  if (next.ending === 'negociar') {
    next.ending = next.chaos >= 5 || next.patience <= 2 ? 'desastre' : 'pacto';
    if (next.ending === 'desastre') {
      next.last = next.chaos >= 5
        ? 'El café vibra al ritmo del caos que has ido sembrando. Intentas hablar de convivencia, pero la taza ya ha presentado un plan de negocio. Cthulhu acaba firmándolo. Tú también. ¿Desde cuándo tienes un delantal?'
        : 'Intentas negociar, pero ya no te queda paciencia para otra reunión. «Por mí, montad un bar», se te escapa. Cthulhu lo toma como autorización verbal. El interventor, como compromiso de gasto.';
    }
  }
  return next;
}
// Rebuild from legal decisions, rather than trusting stored inventory or statistics.
export function restoreGame(value) {
  if (!value || value.version !== 1 || !Array.isArray(value.history) || value.history.length > 32) return null;
  let state = freshGame();
  for (const id of value.history) {
    if (typeof id !== 'string') return null;
    const next = choose(state, id);
    if (next === state) return null;
    state = next;
  }
  return state;
}
export const saveData = state => ({ version: 1, history: [...state.history] });
