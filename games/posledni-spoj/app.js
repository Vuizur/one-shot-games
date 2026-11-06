import { objects, endings } from './story.js';
import { SAVE_KEY, freshGame, sceneFor, choicesFor, choose, stops, visited, restoreGame, saveData } from './engine.js';
const main = document.querySelector('#main'), status = document.querySelector('#save-status');
const escape = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
let state = null, saved = null, storageAvailable = true, invalidSave = false;
try {
  const raw = localStorage.getItem(SAVE_KEY);
  if (raw) { try { saved = restoreGame(JSON.parse(raw)); invalidSave = !saved; } catch { invalidSave = true; } }
} catch { storageAvailable = false; }
function save() {
  saved = state;
  try { localStorage.setItem(SAVE_KEY, JSON.stringify(saveData(state))); } catch { storageAvailable = false; }
  status.textContent = storageAvailable ? 'Cesta je uložená v tomto prohlížeči.' : 'Ukládání není dostupné. Nechte tuto kartu otevřenou.';
}
function focusTitle() { main.querySelector('h1')?.focus(); }
function trainArt() {
  return `<svg class="train-art" viewBox="0 0 600 550" fill="none" aria-hidden="true">
    <circle cx="327" cy="192" r="151" fill="#a6b8aa" fill-opacity=".04"/>
    <circle cx="327" cy="192" r="120" stroke="#90a99f" stroke-opacity=".17"/>
    <circle cx="327" cy="192" r="107" stroke="#90a99f" stroke-opacity=".09"/>
    <circle cx="327" cy="183" r="63" fill="#d3d3af"/><circle cx="348" cy="164" r="61" fill="#182230"/>
    <path d="M49 311l39-76 29 57 29-95 40 107 40-67 32 77 39-55 27 47 38-74 32 69 37-98 31 80 27-39 44 75" fill="#111b27" stroke="#607b72" stroke-opacity=".25"/>
    <path d="M0 377l107-28 87 13 102-14 107 12 83-26 114 37v179H0Z" fill="#0f1722"/>
    <path d="M32 404h530M32 415h530" stroke="#677a78" stroke-width="2"/>
    <path d="M71 417l-17 20m55-20-17 20m55-20-17 20m55-20-17 20m55-20-17 20m55-20-17 20m55-20-17 20m55-20-17 20m55-20-17 20m55-20-17 20m55-20-17 20m55-20-17 20" stroke="#4e6262" stroke-width="3"/>
    <path d="M81 311q0-17 18-17h357q25 0 27 21l9 71H81Z" fill="#354e46" stroke="#83988a" stroke-width="1.5"/>
    <path d="M85 335h392v13H85Z" fill="#c6aa79" fill-opacity=".25"/>
    ${[112,167,222,277,332,387].map(x => `<rect x="${x}" y="308" width="35" height="34" rx="3" fill="#e9c68d" fill-opacity=".83"/><path d="M${x+17} 309v32" stroke="#46594e" stroke-width="2"/>`).join('')}
    <path d="M438 309h24l9 62h-33Z" fill="#182a2b" stroke="#879a86"/>
    <path d="M444 317h14l4 22h-18Z" fill="#e9c68d" fill-opacity=".7"/>
    <path d="M93 369h337" stroke="#718775"/><path d="M91 388h395" stroke="#172329" stroke-width="6"/>
    <circle cx="140" cy="391" r="12" fill="#101821" stroke="#6d7e74" stroke-width="2"/><circle cx="170" cy="391" r="12" fill="#101821" stroke="#6d7e74" stroke-width="2"/>
    <circle cx="401" cy="391" r="12" fill="#101821" stroke="#6d7e74" stroke-width="2"/><circle cx="431" cy="391" r="12" fill="#101821" stroke="#6d7e74" stroke-width="2"/>
    <path d="M484 355l72 20-69 10" fill="#e9c68d" fill-opacity=".06"/><circle cx="482" cy="361" r="4" fill="#f3d89e"/>
    <path d="M68 468h470m-415 13h356m-307 13h260" stroke="#6d8581" stroke-opacity=".12"/>
    <path d="M126 115h3m48 31h3m-7-72h3m294 58h3m-24 61h3m-56-107h3" stroke="#d7d0ab" stroke-width="2" stroke-linecap="round"/>
    <path d="M327 42V29m-144 163h-13m313 0h-13" stroke="#9aab98" stroke-opacity=".35"/>
  </svg>`;
}
function intro() {
  main.innerHTML = `<section class="intro"><div class="intro-copy">
    <p class="eyebrow"><span class="signal"></span> INTERAKTIVNÍ PŘÍBĚH MEZI STANICEMI</p>
    <h1>Poslední spoj<br>do <em>Včera.</em></h1>
    <p class="lead">Některé vlaky nejezdí na čas.<br>Jezdí pro něj.</p>
    <p class="description">Na nádraží, kde už nic nemá zastavit, přijede vlak do dne, který bys raději prožil jinak. V kupé ovšem nejsi sám. A minulost není jediné místo, kam se dá jet.</p>
    <div class="intro-actions">${saved ? '<button id="continue" class="primary">Pokračovat v cestě <span>→</span></button><button id="new" class="text-button">Nová jízdenka</button>' : '<button id="start" class="primary">Nastoupit <span>→</span></button>'}</div>
    <div class="facts"><span>20–30 MINUT</span><span>VOLNÁ PROHLÍDKA VLAKU</span><span>4 KONCE</span></div>
    </div><div class="intro-art"><div class="destination"><span>MIMOŘÁDNÝ SPOJ</span><strong>VČERA</strong><span>ODJEZD 00:37 · KOLEJ 2</span></div>${trainArt()}<p class="art-caption">„Zpáteční jízdenka není totéž co návrat.“</p></div></section>
    <section class="intro-bottom"><p class="eyebrow">PRO TY, KDO ZŮSTALI O CHVÍLI DÉLE</p><p>Noční záhada s tichým humorem, třemi cizími příběhy a jedním vlastním. Čti, procházej vozy a rozhoduj se. Žádné souboje, žádné jazykové zkoušky, žádné odpočítávání.</p></section>`;
  if (!storageAvailable) status.textContent = 'Ukládání není dostupné. Nechte tuto kartu otevřenou.';
  else if (invalidSave) status.textContent = 'Starší cestu se nepodařilo obnovit. Můžete začít s novou jízdenkou.';
}
function sidebar() {
  const notes = [];
  if (state.inventory.includes('nota')) notes.push('Ada zahrála i další takt. Nemusela předem znát konec.');
  if (state.inventory.includes('klic')) notes.push('Vlak řídí přání cestujících. Dveře do strojovny mají klíč.');
  if (state.inventory.includes('semeno')) notes.push('Semínko je jediné, co si svoji minulost teprve musí vytvořit.');
  if (state.inventory.includes('pravda')) notes.push('Není potřeba zrušit včerejšek, abys mohl napsat omluvu.');
  return `<aside class="sidebar" aria-label="Tvoje cesta">
    <div class="ticket"><span>OSOBNÍ JÍZDENKA</span><strong>00:37</strong><p>ODKUDKOLI <b>→</b> VČERA</p><small>Platnost: dokud nezměníš směr</small></div>
    <div class="carriages"><h2>Světla v kupé</h2>${stops.map(stop => `<p class="${state.flags.includes(stop.id) ? 'visited' : state.node.startsWith(stop.id) ? 'current' : ''}"><span aria-hidden="true">${state.flags.includes(stop.id) ? '●' : '○'}</span><span>${stop.place}<strong>${stop.name}</strong></span><span class="sr-only">${state.flags.includes(stop.id) ? 'Navštíveno' : 'Zatím nedokončeno'}</span></p>`).join('')}<p class="stop-count">Navštívená kupé: ${visited(state)} / 3</p></div>
    <details class="inventory" open><summary>Co neseš s sebou <span>${state.inventory.length}</span></summary>${state.inventory.length ? `<ul>${state.inventory.map(id => `<li><strong>${escape(objects[id][0])}</strong><p>${escape(objects[id][1])}</p></li>`).join('')}</ul>` : '<p class="empty">Zatím jenom pár nevyřčených vět.</p>'}</details>
    ${notes.length ? `<details class="notes"><summary>Poznámky z cesty</summary><ul>${notes.map(note => `<li>${escape(note)}</li>`).join('')}</ul></details>` : ''}
    <button id="restart" class="text-button restart">Nová jízdenka ↻</button></aside>`;
}
function render() {
  if (state.ending) return renderEnding();
  const scene = sceneFor(state);
  main.innerHTML = `<div class="layout">${sidebar()}<article class="scene">
    <div class="scene-top"><p class="eyebrow">${escape(scene.label)}</p><button id="reading-size" class="text-button" aria-pressed="${document.body.classList.contains('large-type')}">Větší písmo</button></div>
    <h1 tabindex="-1">${escape(scene.title)}</h1>
    ${state.last ? `<aside class="afterword"><span class="eyebrow">CO ZŮSTALO PO TVÉ VOLBĚ</span><p>${escape(state.last)}</p></aside>` : ''}
    <div class="prose">${scene.text.map(p => `<p>${escape(p)}</p>`).join('')}</div>
    ${scene.quote ? `<blockquote>${escape(scene.quote)}</blockquote>` : ''}
    <section class="decision" aria-labelledby="decision-title"><h2 id="decision-title">${state.node === 'chodba' ? 'Kam půjdeš?' : state.node === 'kabina' ? 'Jakou cestu vybereš?' : 'Co uděláš?'}</h2>
      <div class="choices">${choicesFor(state).map((choice,i) => `<button class="choice" data-choice="${escape(choice.id)}" ${choice.locked ? 'disabled' : ''}><span class="number">${String(i+1).padStart(2,'0')}</span><span>${escape(choice.label)}${choice.locked ? `<small>Chybí: ${escape(choice.missing.join(', '))}.</small>` : ''}</span><span class="arrow" aria-hidden="true">${choice.locked ? '—' : '↗'}</span></button>`).join('')}</div>
    </section><p class="scene-footnote">Čas ve vlaku stojí. Rozhodnutí zůstávají.</p>
    </article></div>`;
}
function renderEnding() {
  const end = endings[state.ending];
  main.innerHTML = `<article class="ending"><p class="eyebrow">KONEC ${end.number} / 04 · ${end.label}</p>
    <div class="end-mark" aria-hidden="true">◈<span>JÍZDENKA OZNAČENA</span></div>
    <h1 tabindex="-1">${escape(end.title)}</h1><div class="prose">${end.text.map(p => `<p>${escape(p)}</p>`).join('')}</div>
    <blockquote>${escape(end.last)}</blockquote>
    <div class="ending-actions"><button id="again" class="primary">Zkusit poslední rozhodnutí jinak <span>↶</span></button><button id="restart" class="secondary">Nová cesta</button></div>
    <p class="ending-note">Jiné volby ve vagonech mohou otevřít další směr. K poslednímu rozhodnutí se vrátíš se stejnými předměty a vzpomínkami.</p>
    <a class="text-button" href="../../">Všechny hry ↗</a></article>`;
}
document.addEventListener('click', event => {
  const button = event.target.closest('button');
  if (!button || button.disabled) return;
  if (button.dataset.choice && state && !state.ending) {
    const next = choose(state, button.dataset.choice);
    if (next === state) return;
    state = next; save(); render(); focusTitle(); return;
  }
  switch (button.id) {
    case 'start': state = freshGame(); save(); render(); focusTitle(); break;
    case 'continue': state = saved; render(); focusTitle(); break;
    case 'reading-size':
      document.body.classList.toggle('large-type');
      button.setAttribute('aria-pressed', document.body.classList.contains('large-type')); break;
    case 'new': case 'restart': document.querySelector('#restart-dialog').showModal(); break;
    case 'restart-cancel': document.querySelector('#restart-dialog').close(); break;
    case 'restart-confirm':
      document.querySelector('#restart-dialog').close(); state = freshGame(); save(); render(); focusTitle(); break;
    case 'again':
      state = restoreGame({ version: 1, history: state.history.slice(0,-1) }); save(); render(); focusTitle(); break;
    case 'help-open': document.querySelector('#help-dialog').showModal(); break;
    case 'help-close': case 'help-done': document.querySelector('#help-dialog').close(); break;
  }
});
intro();