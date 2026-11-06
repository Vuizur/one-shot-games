import { items, endings } from './story.js';
import { SAVE_KEY, freshGame, choicesFor, sceneFor, choose, tasks, restoreGame, saveData } from './engine.js';
const ENDINGS_KEY = 'cthulhu-cita-previa-endings-v1';
const main = document.querySelector('#main');
const status = document.querySelector('#save-status');
const escape = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
const paragraphs = text => text.map(p => `<p>${escape(p)}</p>`).join('');
let state = null;
let saved = null;
let discovered = [];
let storageAvailable = true;
let saveWasInvalid = false;
try {
  const raw = localStorage.getItem(SAVE_KEY);
  if (raw) { try { saved = restoreGame(JSON.parse(raw)); saveWasInvalid = !saved; } catch { saveWasInvalid = true; } }
} catch { storageAvailable = false; }
try {
  const raw = JSON.parse(localStorage.getItem(ENDINGS_KEY) || '[]');
  if (Array.isArray(raw)) discovered = [...new Set(raw.filter(key => Object.hasOwn(endings, key)))];
} catch { /* A damaged ending collection does not prevent playing. */ }
function save() {
  if (state.ending && !discovered.includes(state.ending)) discovered.push(state.ending);
  saved = state;
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(saveData(state)));
    localStorage.setItem(ENDINGS_KEY, JSON.stringify(discovered));
  } catch { storageAvailable = false; }
  status.textContent = storageAvailable ? 'Expediente guardado en este navegador.' : 'Sin guardado disponible. Mantén esta pestaña abierta.';
}
function focusTitle() { main.querySelector('h1')?.focus(); }
function clerkArt() {
  return `<svg class="clerk" viewBox="0 0 440 440" fill="none" aria-hidden="true">
    <circle cx="220" cy="215" r="170" fill="#d7ddbd"/><circle cx="220" cy="215" r="151" stroke="#73836b" stroke-dasharray="2 9"/>
    <path d="M139 169l-36-68 61 26M301 169l36-68-61 26" fill="#51664f" stroke="#293d36" stroke-width="3"/>
    <path d="M158 192c-18 24-17 52-40 49-18-3-16-17-9-20M182 199c-23 26-5 61-32 74-19 9-33-6-23-17M213 206c-16 28 5 77-23 91-17 9-30-5-19-18M243 207c-8 24 10 85-13 105-15 13-31 0-20-15M272 202c15 18 6 80 29 94 17 10 33-6 20-17M291 189c15 14 13 51 37 58 18 6 33-8 23-20" stroke="#293d36" stroke-width="26" stroke-linecap="round"/>
    <path d="M158 192c-18 24-17 52-40 49-18-3-16-17-9-20M182 199c-23 26-5 61-32 74-19 9-33-6-23-17M213 206c-16 28 5 77-23 91-17 9-30-5-19-18M243 207c-8 24 10 85-13 105-15 13-31 0-20-15M272 202c15 18 6 80 29 94 17 10 33-6 20-17M291 189c15 14 13 51 37 58 18 6 33-8 23-20" stroke="#718268" stroke-width="19" stroke-linecap="round"/>
    <path d="M147 184v-25c0-96 146-96 146 0v25c0 39-146 39-146 0Z" fill="#718268" stroke="#293d36" stroke-width="4"/>
    <path d="M159 166c12-12 33-12 47-3m29 0c13-10 33-9 45 2" stroke="#293d36" stroke-width="4"/>
    <path d="M163 176h35m44 0h34" stroke="#293d36" stroke-width="4" stroke-linecap="round"/>
    <path d="M196 190l8 5m30-5-8 5" stroke="#293d36" stroke-width="2"/>
    <path d="M174 132h40v38h-40zM228 132h40v38h-40zM214 145h14" fill="#e8e5cc" fill-opacity=".55" stroke="#293d36" stroke-width="3"/>
    <path d="M213 269l10-9 10 9-6 9 8 30-12 15-12-15 8-30z" fill="#ad4c37" stroke="#293d36" stroke-width="2"/>
    <path d="M80 335h280v35H80z" fill="#bf9567" stroke="#293d36" stroke-width="3"/>
    <rect x="111" y="312" width="110" height="27" rx="2" fill="#eee9da" stroke="#293d36" stroke-width="2" transform="rotate(-5 111 312)"/>
    <path d="M120 319h69m-67 7h78" stroke="#8b9180" stroke-width="2"/>
    <path d="M286 306v25h27v-25zM313 310c19-1 19 19 0 16" fill="#eee9da" stroke="#293d36" stroke-width="3"/>
    <path d="M296 296c-9-9 9-10 0-20" stroke="#73836b" stroke-width="3" stroke-linecap="round"/>
    <path d="M283 99l30-12m-12 25 29 2" stroke="#ad4c37" stroke-width="3"/>
  </svg>`;
}
function renderIntro() {
  main.innerHTML = `<section class="intro">
    <div class="intro-copy"><p class="eyebrow"><span class="tiny-dot"></span> AVENTURA CÓSMICO-ADMINISTRATIVA</p>
    <h1>Cthulhu tiene<br><em>cita previa.</em></h1>
    <p class="intro-lead">El fin del mundo tendrá que esperar.<br>Le falta una fotocopia.</p>
    <p class="intro-description">Eres la nueva incorporación del ayuntamiento de Innsmouth. Tu contrato dura un día. La humanidad, con suerte, también.</p>
    <div class="intro-actions">${saved ? '<button class="primary" id="continue">Retomar el expediente <span aria-hidden="true">→</span></button><button class="text-button" id="new">Nueva partida</button>' : '<button class="primary" id="start">Abrir expediente <span aria-hidden="true">→</span></button>'}</div>
    <div class="intro-facts"><span>EN ESPAÑOL</span><span>15–25 MIN</span><span>5 FINALES</span></div>
    </div><div class="intro-art"><div class="stamp">PENDIENTE<br><small>DEL FIN DEL MUNDO</small></div>${clerkArt()}<p class="art-note">«He venido a devorar la realidad».<br><span>«¿Trae el original y una copia?»</span></p></div>
    </section>
    <section class="intro-bottom"><span class="eyebrow">ANTES DE COGER NÚMERO</span><p>Una comedia de decisiones, tentáculos y funcionarios al borde de lo imposible. Reúne documentos, administra tu paciencia y descubre si el horror cósmico puede sobrevivir a una ventanilla municipal.</p></section>`;
  if (!storageAvailable) status.textContent = 'Sin guardado disponible. Mantén esta pestaña abierta.';
  else if (saveWasInvalid) status.textContent = 'No se pudo recuperar el expediente anterior. Puedes abrir uno nuevo.';
}
function sidebar() {
  return `<aside class="sidebar" aria-label="Estado del expediente"><div class="file-label">EXPEDIENTE<br><strong>CTH / 001</strong><span>PRIORIDAD: RELATIVA</span></div>
    <div class="stat"><div><label for="patience">Paciencia</label><strong>${state.patience}<small>/10</small></strong></div><meter id="patience" min="0" max="10" value="${state.patience}">${state.patience} de 10</meter><p>${state.patience <= 2 ? 'Negociar así puede acabar en un bar.' : 'Respira. No por las branquias.'}</p></div>
    <div class="stat"><div><label for="chaos">Caos cósmico</label><strong>${state.chaos}<small>/10</small></strong></div><meter id="chaos" min="0" max="10" value="${state.chaos}">${state.chaos} de 10</meter><p>${state.chaos >= 5 ? 'Demasiado caos para un pacto tranquilo.' : 'Dentro del desorden reglamentario.'}</p></div>
    <div class="checklist"><h2>Trámites obligatorios</h2>${tasks(state).map(task => `<p class="${task.done ? 'done' : ''}"><span aria-hidden="true">${task.done ? '✓' : '○'}</span> ${task.detail}<span class="sr-only">: ${task.done ? 'completado' : 'pendiente'}</span></p>`).join('')}</div>
    <details class="inventory" open><summary>En tu carpeta <span>${state.inventory.length}</span></summary>${state.inventory.length ? `<ul>${state.inventory.map(id => `<li><strong>${escape(items[id][0])}</strong><span>${escape(items[id][1])}</span></li>`).join('')}</ul>` : '<p class="empty">Nada. Como el presupuesto.</p>'}</details>
    <button class="text-button restart" id="restart">Abrir otro expediente ↻</button></aside>`;
}
function renderGame() {
  if (state.ending) return renderEnding();
  const scene = sceneFor(state);
  main.innerHTML = `<div class="game-layout">${sidebar()}<article class="scene">
    <p class="eyebrow">${escape(scene.label)}</p><h1 tabindex="-1">${escape(scene.title)}</h1>
    ${state.last ? `<aside class="receipt" aria-label="Consecuencia de tu decisión"><span class="eyebrow">CONSTA EN ACTA</span><p>${escape(state.last)}</p></aside>` : ''}
    <div class="prose">${paragraphs(scene.text)}</div>
    ${scene.quote ? `<blockquote>${escape(scene.quote)}</blockquote>` : ''}
    <section class="decision" aria-labelledby="decision-title"><h2 id="decision-title">${state.node === 'vestibulo' ? '¿A dónde vamos?' : '¿Qué decides?'}</h2>
    <div class="choices">${choicesFor(state).map((choice, i) => `<button class="choice" data-choice="${escape(choice.id)}" ${choice.locked ? 'disabled' : ''}><span class="choice-number" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span><span>${escape(choice.label)}${choice.locked ? `<small>Necesitas: ${escape(choice.missing.join(', '))}.</small>` : ''}</span><span class="choice-arrow" aria-hidden="true">${choice.locked ? '—' : '↗'}</span></button>`).join('')}</div>
    </section><p class="filing-note">Tus decisiones quedan archivadas. Las responsabilidades, ya veremos.</p>
    </article></div>`;
}
function renderEnding() {
  const end = endings[state.ending];
  main.innerHTML = `<article class="ending"><p class="eyebrow">EXPEDIENTE RESUELTO · ${escape(end.label)}</p>
    <div class="end-seal" aria-hidden="true">ARCHIVADO<span>FIN ${end.number} / 05</span></div>
    <h1 tabindex="-1">${escape(end.title)}</h1>
    <aside class="receipt"><span class="eyebrow">ÚLTIMA DILIGENCIA</span><p>${escape(state.last)}</p></aside>
    <div class="prose">${paragraphs(end.text)}</div><blockquote>${escape(end.epilogue)}</blockquote>
    <div class="ending-stats"><span>Paciencia restante <strong>${state.patience}/10</strong></span><span>Caos acumulado <strong>${state.chaos}/10</strong></span><span>Finales descubiertos <strong>${discovered.length}/5</strong></span></div>
    <div class="ending-actions"><button class="primary" id="retry">Volver a la audiencia <span aria-hidden="true">↶</span></button><button class="secondary" id="restart">Nueva partida</button><a class="text-button" href="../../">Todas las aventuras ↗</a></div>
    <details class="ending-collection"><summary>Tu archivo de finales · ${discovered.length}/5</summary><ul>${Object.entries(endings).map(([id, ending]) => `<li><span>${ending.number}</span> ${discovered.includes(id) ? escape(ending.title) : 'Expediente sin descubrir'}</li>`).join('')}</ul></details>
    <p class="filing-note">Prueba otras decisiones en una nueva partida para conseguir objetos diferentes.</p></article>`;
}
document.addEventListener('click', event => {
  const button = event.target.closest('button');
  if (!button || button.disabled) return;
  if (button.dataset.choice && state && !state.ending) {
    const next = choose(state, button.dataset.choice);
    if (next === state) return;
    state = next; save(); renderGame(); focusTitle(); return;
  }
  switch (button.id) {
    case 'start': state = freshGame(); save(); renderGame(); focusTitle(); break;
    case 'continue': state = saved; renderGame(); focusTitle(); break;
    case 'new': case 'restart': document.querySelector('#restart-dialog').showModal(); break;
    case 'restart-cancel': document.querySelector('#restart-dialog').close(); break;
    case 'restart-confirm':
      document.querySelector('#restart-dialog').close(); state = freshGame(); save(); renderGame(); focusTitle(); break;
    case 'retry':
      state = restoreGame({ version: 1, history: state.history.slice(0, -1) });
      save(); renderGame(); focusTitle(); break;
    case 'help-open': document.querySelector('#help-dialog').showModal(); break;
    case 'help-close': case 'help-done': document.querySelector('#help-dialog').close(); break;
  }
});
renderIntro();