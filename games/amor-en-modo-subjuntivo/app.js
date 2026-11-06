import { partners, plans, tones, challenges, endingText } from './story.js';
import { SAVE_KEY, freshGame, selectPartner, selectPlan, selectTone, submitAnswer, advance, useHint, score, chemistry, endingFor, restoreGame, saveData } from './engine.js';
const main = document.querySelector('#main');
const status = document.querySelector('#save-status');
const escape = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
let state = null, saved = null, storageAvailable = true, invalidSave = false;
try {
  const raw = localStorage.getItem(SAVE_KEY);
  if (raw) { try { saved = restoreGame(JSON.parse(raw)); invalidSave = !saved; } catch { invalidSave = true; } }
} catch { storageAvailable = false; }
function save() {
  saved = state;
  try { localStorage.setItem(SAVE_KEY, JSON.stringify(saveData(state))); }
  catch { storageAvailable = false; }
  status.textContent = storageAvailable ? 'Tu cita se ha guardado en este navegador.' : 'Sin guardado disponible. Mantén esta pestaña abierta.';
}
function focusHeading() { main.querySelector('h1')?.focus(); }
function portrait(id) {
  const p = partners[id];
  const looks = {
    vera: { hair: '#743f32', light: '#b46a4b', skin: '#f4c5a3', shade: '#d99478', eye: '#ad7537', ink: '#4b3033' },
    leo: { hair: '#293c39', light: '#527364', skin: '#e9b08d', shade: '#ca896c', eye: '#5b927d', ink: '#293c39' },
    alex: { hair: '#4e3d6b', light: '#8e73a8', skin: '#edc5b2', shade: '#c9968b', eye: '#9c6db4', ink: '#44334f' },
  };
  const c = looks[id];
  const backHair = id === 'vera'
    ? '<path d="M57 111C39 23 188 3 185 108l10 126-29-9-11-65-73 5-9 65-29 3Z" fill="' + c.hair + '" stroke="' + c.ink + '" stroke-width="2.5"/><path d="M63 139l-6 76m117-76 9 79" stroke="' + c.light + '" stroke-width="5" stroke-linecap="round"/>'
    : id === 'leo'
      ? '<path d="M58 112l-12-28 10-9-8-22 27 2-2-26 26 10 21-23 14 21 28-12-1 26 28 6-12 22 13 19-12 26Z" fill="' + c.hair + '" stroke="' + c.ink + '" stroke-width="2.5" stroke-linejoin="round"/>'
      : '<path d="M52 111C38 45 85 20 130 26c58-4 68 51 53 102l-18 26-88 7-28-25Z" fill="' + c.hair + '" stroke="' + c.ink + '" stroke-width="2.5"/>';
  const fringe = id === 'vera'
    ? '<path d="M60 99C52 24 178 13 181 98l-15-6-11-36-18 35-9-29-23 33-1-27-25 36 2-34-17 41Z" fill="' + c.hair + '" stroke="' + c.ink + '" stroke-width="2" stroke-linejoin="round"/><path d="M91 45q-16 14-19 36m48-45-13 31m41-27 13 26" stroke="' + c.light + '" stroke-width="4" stroke-linecap="round"/>'
    : id === 'leo'
      ? '<path d="M58 99l6-41 29-15 36-9 37 22 15 42-25-20 3 19-28-31-9 23-12-23-23 31 1-20-21 32Z" fill="' + c.hair + '" stroke="' + c.ink + '" stroke-width="2" stroke-linejoin="round"/><path d="M83 61l23-12m25-3 17 13m-73 9 11-5" stroke="' + c.light + '" stroke-width="4" stroke-linecap="round"/>'
      : '<path d="M54 103C44 40 107 21 147 35c38 10 42 40 33 77l-20-19-3-35c-10 38-46 63-71 66l15-27-26 16 10-26-22 31Z" fill="' + c.hair + '" stroke="' + c.ink + '" stroke-width="2" stroke-linejoin="round"/><path d="M76 67q26-33 60-24m-48 38q23-25 45-30m32 17 4 21" stroke="' + c.light + '" stroke-width="4" stroke-linecap="round"/>';
  const outfit = id === 'vera'
    ? '<path d="M24 260v-33q2-32 57-43l39 29 39-29q55 11 57 43v33Z" fill="#a85037" stroke="#4b3033" stroke-width="2"/><path d="M83 184l37 29 37-29-9 76H92Z" fill="#eee1ca"/><path d="M79 185l-11 43 23-8-3 27m73-62 11 43-23-8 3 27" stroke="#723c30" stroke-width="2.5"/><circle cx="59" cy="228" r="6" fill="#e4b86b"/><path d="M59 218v20m-10-10h20" stroke="#eee1ca" stroke-width="2"/>'
    : id === 'leo'
      ? '<path d="M23 260v-27q4-36 62-49h70q58 13 62 49v27Z" fill="#f5ecd9" stroke="#293c39" stroke-width="2"/><path d="M82 185l-5 75h86l-5-75-15 5 3 36H94l3-36Z" fill="#627c56"/><path d="M89 230h61v30H89z" fill="#738c65"/><path d="M94 245h51" stroke="#c8d3ad" stroke-width="2"/><path d="M87 184l15 17 18-8 18 8 15-17" stroke="#c4b8a3" stroke-width="2"/>'
      : '<path d="M24 260v-31q2-33 59-44l37 22 37-22q57 11 59 44v31Z" fill="#6d6389" stroke="#44334f" stroke-width="2"/><path d="M89 189l31 18 31-18-4 71H93Z" fill="#eadcdb"/><path d="M81 185l-9 31 18 5-10 24m79-60 9 31-18 5 10 24" stroke="#44334f" stroke-width="2.5"/><path d="M104 204q16 27 32 0" stroke="#ba945d" stroke-width="2"/><circle cx="120" cy="225" r="4" fill="#ba945d"/>';
  return `<svg class="portrait anime-portrait" viewBox="0 0 240 260" fill="none" aria-hidden="true">
    <circle cx="120" cy="128" r="108" fill="${p.color}" fill-opacity=".11"/>
    <circle cx="120" cy="128" r="97" stroke="${p.color}" stroke-opacity=".2" stroke-dasharray="2 7"/>
    <path d="M35 53l4-11 4 11 11 4-11 4-4 11-4-11-11-4Zm163 110 3-8 3 8 8 3-8 3-3 8-3-8-8-3Z" fill="${p.color}" fill-opacity=".6"/>
    ${backHair}
    ${outfit}
    <path d="M102 157h36v35q-18 17-36 0Z" fill="${c.skin}" stroke="${c.ink}" stroke-width="2"/>
    <path d="M102 157h36v17l-20 12-16-12Z" fill="${c.shade}" fill-opacity=".7"/>
    <path d="M64 105c-14-9-17 12-7 22l13 5m106-27c14-9 17 12 7 22l-13 5" fill="${c.skin}" stroke="${c.ink}" stroke-width="2"/>
    <path d="M65 83q4-45 55-45t55 45l-5 48q-6 30-50 50-44-20-50-50Z" fill="${c.skin}" stroke="${c.ink}" stroke-width="2.2"/>
    <path d="M164 90l-6 42q-4 20-38 49 44-20 50-50l5-48Z" fill="${c.shade}" fill-opacity=".35"/>
    <path d="M77 102q13-8 27-2m32 0q14-6 27 2" stroke="${c.hair}" stroke-width="2.6" stroke-linecap="round"/>
    <path d="M76 116q12-16 29-3l-2 17q-14 7-25-2Zm59-3q17-13 29 3l-2 12q-11 9-25 2Z" fill="#fffcf5"/>
    <ellipse cx="93" cy="120" rx="9" ry="12" fill="${c.eye}"/>
    <ellipse cx="147" cy="120" rx="9" ry="12" fill="${c.eye}"/>
    <ellipse cx="93" cy="118" rx="4" ry="8" fill="${c.ink}"/>
    <ellipse cx="147" cy="118" rx="4" ry="8" fill="${c.ink}"/>
    <path d="M88 128q5 4 10 0m44 0q5 4 10 0" stroke="#e7d095" stroke-width="2.5" stroke-linecap="round"/>
    <circle cx="89" cy="113" r="3.7" fill="white"/><circle cx="143" cy="113" r="3.7" fill="white"/>
    <circle cx="97" cy="122" r="1.8" fill="white"/><circle cx="151" cy="122" r="1.8" fill="white"/>
    <path d="M75 115q13-16 31-2m28 0q18-14 31 2" stroke="${c.ink}" stroke-width="3" stroke-linecap="round"/>
    <path d="M77 128q12 7 25 2m36 0q13 5 25-2" stroke="${c.ink}" stroke-width="1.1" stroke-linecap="round"/>
    ${id === 'vera' ? '<path d="M77 114l-5-5m91 5 5-5" stroke="' + c.ink + '" stroke-width="2"/>' : ''}
    <ellipse cx="82" cy="139" rx="12" ry="5" fill="#cf777c" fill-opacity=".26"/>
    <ellipse cx="158" cy="139" rx="12" ry="5" fill="#cf777c" fill-opacity=".26"/>
    <path d="M120 126l-3 13 5 2" stroke="${c.shade}" stroke-width="1.7" stroke-linecap="round"/>
    <path d="M109 151q11 10 22 0" fill="#b56d6b" stroke="${c.ink}" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M114 153h12" stroke="#fff1dc" stroke-width="2.3" stroke-linecap="round"/>
    ${id === 'leo' ? '<path d="M96 159l3 3m5 1 2 3m28-7-3 3m-6 1-1 3m-9 0 1 3" stroke="' + c.hair + '" stroke-width="1.3" stroke-linecap="round" opacity=".65"/>' : ''}
    ${fringe}
    ${id === 'vera' ? '<g stroke="#866549" stroke-width="2"><rect x="70" y="105" width="39" height="29" rx="9"/><rect x="131" y="105" width="39" height="29" rx="9"/><path d="M109 115q11-7 22 0m-61-1-8-4m108 4 8-4"/></g><path d="M76 110h11m50 0h11" stroke="white" stroke-width="1.4" stroke-linecap="round" opacity=".7"/><path d="M169 79l12 7m-9-15 12 7" stroke="#e1b666" stroke-width="3" stroke-linecap="round"/>' : ''}
    ${id === 'alex' ? '<ellipse cx="177" cy="133" rx="5" ry="9" stroke="#c79b50" stroke-width="3"/><circle cx="178" cy="118" r="2" fill="#ead0a1"/>' : ''}
  </svg>`;
}
function heroArt() {
  return `<svg viewBox="0 0 440 440" fill="none" class="hero-art" aria-hidden="true">
    <path d="M68 68h304v304H68z" fill="#ead8d5" transform="rotate(-8 220 220)"/>
    <circle cx="220" cy="221" r="137" fill="#faf6ed" stroke="#b9aba6" stroke-width="2"/>
    <circle cx="220" cy="221" r="107" stroke="#b9aba6" stroke-width="2" stroke-dasharray="3 9"/>
    <path d="M220 278c-107-57-79-144-27-117 14 7 27 25 27 25s13-18 27-25c52-27 80 60-27 117Z" fill="#a44d65"/>
    <path d="M64 136v61m-12-61v40c0 21 24 21 24 0v-40m-12 64v111M381 136v175m0-175c-31 38-27 67 0 67" stroke="#53685b" stroke-width="6" stroke-linecap="round"/>
    <path d="M301 81l8-19 8 19 20 8-20 8-8 20-8-20-19-8Z" fill="#53685b"/>
    <path d="M111 327l5-13 5 13 13 5-13 5-5 13-5-13-13-5Z" fill="#a44d65"/>
    <path d="M207 214q14-17 28-1m-30 28q16 13 30-1" stroke="#faf6ed" stroke-width="4" stroke-linecap="round"/>
  </svg>`;
}
function intro() {
  main.innerHTML = `<section class="intro"><div class="intro-copy"><p class="eyebrow">UNA COMEDIA ROMÁNTICA CON CONSECUENCIAS</p>
    <h1>Amor en modo<br><em>subjuntivo.</em></h1>
    <p class="lead">Tú pones las palabras.<br>El restaurante pone el desastre.</p>
    <p class="intro-description">Tres personas interesantes. Diez retos de español. Un intérprete romántico que debería haber leído las instrucciones.</p>
    <div class="intro-actions">${saved ? '<button id="continue" class="primary">Continuar la cita <span>→</span></button><button id="new" class="text-button">Otra reserva</button>' : '<button id="start" class="primary">Elegir mi cita <span>→</span></button>'}</div>
    <p class="facts">3 CITAS POSIBLES <span>·</span> 10 RETOS <span>·</span> 4 FINALES</p></div>
    <div class="art"><span class="ticket">MESA PARA DOS<br><b>Y UN POCO DE VALOR</b></span>${heroArt()}<p>El flechazo no lleva tilde.<br><em>La catástrofe, sí.</em></p></div></section>
    <section class="intro-note"><p class="eyebrow">SOLO BUENOS EJEMPLOS</p><p>Las consignas, los diálogos y los modelos usan español correcto. Tus respuestas desaparecen al enviarlas: el cuaderno guarda los modelos, nunca tus errores.</p></section>`;
  if (!storageAvailable) status.textContent = 'Sin guardado disponible. Mantén esta pestaña abierta.';
  else if (invalidSave) status.textContent = 'No se pudo recuperar la cita anterior. Puedes reservar otra.';
}
function notebook() {
  if (!state.records.length) return '';
  return `<details class="notebook"><summary>Tu cuaderno de español · ${state.records.length} ${state.records.length === 1 ? 'modelo correcto' : 'modelos correctos'}</summary><div>${state.records.map((record, i) => `<article><p class="eyebrow">${String(i + 1).padStart(2, '0')} · ${escape(challenges[i].skill)}</p><p class="model">${escape(challenges[i].model)}</p>${challenges[i].alternative ? `<p class="alternative">También: ${escape(challenges[i].alternative)}</p>` : ''}<p>${escape(challenges[i].explanation)}</p></article>`).join('')}</div></details>`;
}
function sidebar() {
  const p = partners[state.partner];
  return `<aside class="sidebar" aria-label="Tu cita">${portrait(state.partner)}<p class="eyebrow">TU CITA DE ESTA NOCHE</p><h2>${p.name} <small>${p.age}</small></h2><p class="job">${escape(p.job)}</p>
    <div class="stat"><span>Retos resueltos</span><strong>${score(state)}<small>/10</small></strong></div>
    <div class="stat"><span>Complicidad del plan</span><strong>${chemistry(state)}<small>/4</small></strong></div>
    <p class="side-note">Escucha sus gustos. Los planes importan tanto como el brillo de la cubertería.</p>
    <button id="restart" class="text-button">Reservar otra cita ↻</button></aside>`;
}
function selectView() {
  main.innerHTML = `<section class="selection"><p class="eyebrow">PRIMER PASO · UNA CONVERSACIÓN POR DESCUBRIR</p><h1 tabindex="-1">¿Con quién cenamos?</h1><p class="section-lead">Todas las personas tienen una historia. Y una reserva que no admite devoluciones.</p>
    <div class="profiles">${Object.entries(partners).map(([id,p]) => `<article class="profile">${portrait(id)}<h2>${p.name} <span>${p.age} años</span></h2><p class="job">${escape(p.job)}</p><p>${escape(p.bio)}</p><blockquote>${escape(p.line)}</blockquote><button class="primary" data-partner="${id}">Conocer a ${p.name} <span>↗</span></button></article>`).join('')}</div></section>`;
}
function planView(interlude = false) {
  const p = partners[state.partner], options = interlude ? tones : plans;
  main.innerHTML = `<div class="layout">${sidebar()}<section class="scene"><p class="eyebrow">${interlude ? 'ENTRE PLATOS · VUESTRA PROPIA CONVERSACIÓN' : 'LA RESERVA · CADA PERSONA ES UN MUNDO'}</p>
    <h1 tabindex="-1">${interlude ? '¿Cómo seguimos la noche?' : 'Elige el escenario.'}</h1>
    <p class="prose">${interlude ? 'Habéis pasado por cinco momentos bastante intensos. Antes del siguiente plato, os queda un rato para decidir qué os apetece hacer juntos.' : escape(p.greeting)}</p>
    <blockquote>${escape(p.bio)}</blockquote>
    <div class="options">${Object.entries(options).map(([id,option]) => `<button class="option" data-${interlude ? 'tone' : 'plan'}="${id}"><strong>${escape(option.title)}</strong><span>${escape(option.text)}</span><b aria-hidden="true">↗</b></button>`).join('')}</div>${notebook()}</section></div>`;
}
function taskView() {
  const c = challenges[state.index], p = partners[state.partner], feedback = state.phase === 'feedback';
  const record = state.records[state.index];
  main.innerHTML = `<div class="layout">${sidebar()}<article class="scene">
    <div class="scene-top"><p class="eyebrow">${escape(c.skill)}</p><span>${String(state.index + 1).padStart(2,'0')} / 10</span></div>
    <progress value="${state.index + (feedback ? 1 : 0)}" max="10" aria-label="Retos terminados"></progress>
    <h1 tabindex="-1">${escape(c.title)}</h1>
    ${state.index === 0 ? `<aside class="scene-note">${escape(plans[state.plan].result)}<br>${escape(p.greeting)}</aside>` : ''}
    ${state.index === 5 ? `<aside class="scene-note">${escape(tones[state.tone].result)}</aside>` : ''}
    <p class="prose">${escape(c.scene)}</p><blockquote><span class="eyebrow">${p.name.toLocaleUpperCase('es')}</span><p>${escape(c.dialogue)}</p></blockquote>
    ${feedback ? `<section class="feedback ${record.correct ? 'success' : 'disaster'}" aria-labelledby="feedback-title"><p class="eyebrow">${record.correct ? 'LA CONVERSACIÓN FLUYE' : 'EL INTÉRPRETE HA PERDIDO EL NORTE'}</p><h2 id="feedback-title">${record.correct ? 'Una respuesta con encanto.' : 'Un pequeño desastre romántico.'}</h2><p>${escape(record.correct ? c.good : c.bad)}</p><p class="reaction">${escape(record.correct ? p.success : p.failure)}</p>
      <div class="correction"><p class="eyebrow">MODELO CORRECTO</p><p class="model">${escape(c.model)}</p>${c.alternative ? `<p class="alternative">También es correcto: ${escape(c.alternative)}</p>` : ''}<p>${escape(c.explanation)}</p></div>
      <button id="next" class="primary">${state.index === 9 ? 'Descubrir cómo termina' : state.index === 4 ? 'Tomarnos un momento' : 'Seguir con la cena'} <span>→</span></button></section>`
      : `<form id="answer-form" autocomplete="off"><p class="eyebrow">TU MOMENTO · ESCRIBE EN ESPAÑOL</p><p id="prompt" class="prompt">${escape(c.prompt)}</p>
      <div class="fields">${c.fields.map((field,i) => `<div><label for="answer-${i}">${escape(field.label)}</label><input class="answer-field" id="answer-${i}" name="answer-${i}" type="text" maxlength="120" required autocomplete="off" autocapitalize="none" autocorrect="off" spellcheck="false" aria-describedby="prompt answer-note"></div>`).join('')}</div>
      <p id="answer-note" class="answer-note">Escribe solo lo solicitado. Las tildes cuentan; las mayúsculas y la puntuación final no. Tu respuesta no se guarda ni se repite.</p>
      <div class="form-actions"><button type="submit" class="primary" id="submit" disabled>Decirlo con encanto <span>→</span></button><button type="button" id="hint" class="text-button" ${state.hint ? 'disabled' : ''}>${state.hint ? 'Pista abierta' : 'Necesito una pista'}</button></div>
      <div id="hint-area" aria-live="polite">${state.hint ? `<aside class="hint"><p class="eyebrow">UN EMPUJONCITO · SIN PENALIZACIÓN</p><p>${escape(c.hint)}</p></aside>` : ''}</div></form>`}
    ${notebook()}</article></div>`;
}
function endingView() {
  const key = endingFor(state), end = endingText[key], p = partners[state.partner];
  main.innerHTML = `<article class="ending"><p class="eyebrow">${end.label}</p><div class="ending-portrait">${portrait(state.partner)}</div>
    <h1 tabindex="-1">${escape(end.title)}</h1><p class="prose">${escape(end.text)}</p>
    ${key === 'chispa' ? `<blockquote>${escape(p.finale)}</blockquote>` : ''}
    <div class="results"><div><span>Retos resueltos</span><strong>${score(state)}/10</strong></div><div><span>Complicidad del plan</span><strong>${chemistry(state)}/4</strong></div><div><span>Tu compañía</span><strong>${p.name}</strong></div></div>
    <p class="ending-note">Los errores forman parte del aprendizaje. El cuaderno de abajo contiene únicamente ejemplos correctos para repasar con calma.</p>
    <div class="ending-actions"><button id="restart" class="primary">Otra cita, otra historia <span>↻</span></button><a href="../../" class="text-button">Volver a las aventuras ↗</a></div>${notebook()}</article>`;
}
function render() {
  if (state.phase === 'select') selectView();
  else if (state.phase === 'plan') planView();
  else if (state.phase === 'interlude') planView(true);
  else if (state.phase === 'ending') endingView();
  else taskView();
}
function change(next) { if (next === state) return; state = next; save(); render(); focusHeading(); }
document.addEventListener('click', event => {
  const button = event.target.closest('button');
  if (!button || button.disabled) return;
  if (button.dataset.partner) return change(selectPartner(state, button.dataset.partner));
  if (button.dataset.plan) return change(selectPlan(state, button.dataset.plan));
  if (button.dataset.tone) return change(selectTone(state, button.dataset.tone));
  switch (button.id) {
    case 'start': state = freshGame(); save(); render(); focusHeading(); break;
    case 'continue': state = saved; render(); focusHeading(); break;
    case 'new': case 'restart': document.querySelector('#restart-dialog').showModal(); break;
    case 'restart-cancel': document.querySelector('#restart-dialog').close(); break;
    case 'restart-confirm':
      document.querySelector('#restart-dialog').close(); state = freshGame(); save(); render(); focusHeading(); break;
    case 'next': change(advance(state)); break;
    case 'hint':
      state = useHint(state); save();
      button.disabled = true; button.textContent = 'Pista abierta';
      document.querySelector('#hint-area').innerHTML = `<aside class="hint"><p class="eyebrow">UN EMPUJONCITO · SIN PENALIZACIÓN</p><p>${escape(challenges[state.index].hint)}</p></aside>`; break;
    case 'help-open': document.querySelector('#help').showModal(); break;
    case 'help-close': case 'help-done': document.querySelector('#help').close(); break;
  }
});
document.addEventListener('input', event => {
  if (!event.target.matches('.answer-field')) return;
  document.querySelector('#submit').disabled = ![...document.querySelectorAll('.answer-field')].every(field => field.value.trim());
});
document.addEventListener('submit', event => {
  if (event.target.id !== 'answer-form') return;
  event.preventDefault();
  if (state.phase !== 'task') return;
  const fields = [...event.target.querySelectorAll('.answer-field')];
  const next = submitAnswer(state, fields.map(field => field.value));
  if (next === state) return;
  fields.forEach(field => { field.value = ''; });
  change(next);
});
intro();