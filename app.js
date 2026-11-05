import { chapters, endings } from './data.js';
import { SAVE_KEY, MAX_RESOLVE, newGame, submitAnswer, useHint, advance, endingFor, validateSave } from './engine.js';

const main = document.querySelector('#main');
const saveStatus = document.querySelector('#save-status');
let storageAvailable = true;
let saved = null;
try { const raw = localStorage.getItem(SAVE_KEY); if (raw) saved = validateSave(JSON.parse(raw)); }
catch { storageAvailable = false; }
let state = null;
let selection = null;
let ordered = [];
let selectedMany = [];

const escape = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
const paragraphs = values => values.map(value => `<p>${escape(value)}</p>`).join('');
const bind = (selector, event, handler) => document.querySelector(selector)?.addEventListener(event, handler);

function save() {
  saved = state;
  try { localStorage.setItem(SAVE_KEY, JSON.stringify(state)); }
  catch { storageAvailable = false; }
  saveStatus.textContent = storageAvailable ? 'Postup uložen v prohlížeči.' : 'Ukládání není dostupné. Nezavírejte hru.';
}

function landscape() {
  return `<svg class="landscape" viewBox="0 0 520 640" fill="none" aria-hidden="true">
    <defs><radialGradient id="glow"><stop stop-color="#b6bc91" stop-opacity=".14"/><stop offset="1" stop-color="#b6bc91" stop-opacity="0"/></radialGradient><pattern id="water-lines" width="80" height="13" patternUnits="userSpaceOnUse"><path d="M0 6 Q20 0 40 6 T80 6" stroke="#9cac8e" stroke-opacity=".15" stroke-width=".65"/></pattern></defs>
    <circle cx="260" cy="230" r="216" fill="url(#glow)"/>
    <g stroke="#a3b28e"><circle cx="260" cy="222" r="126" opacity=".22"/><circle cx="260" cy="222" r="116" opacity=".12"/><path d="M260 75V59 M260 385v-16 M113 222H97 M423 222h-16" opacity=".45"/><path d="M170 132l-12-12m204 204-12-12m-180 0-12 12m204-204-12 12" opacity=".22"/></g>
    <circle cx="260" cy="222" r="78" fill="#b8b99a" opacity=".82"/>
    <circle cx="282" cy="201" r="76" fill="#19221e"/>
    <path d="M50 425l54-28 29 10 39-15 34 14 41-12 25 4 41-23 29 24 45-5 38 19 45 12" stroke="#8d9e87" stroke-opacity=".24"/>
    <g fill="#101713" stroke="#7b8a72" stroke-opacity=".4"><path d="M221 422V342h63v80z"/><path d="M238 342v-51l16-29 16 29v51"/><path d="M249 262v-21m-6 9h13"/><path d="M208 353l45-26 44 26"/><path d="M244 422v-27a9 9 0 0118 0v27"/><path d="M249 303h10v18h-10z"/></g>
    <path d="M30 423H490" stroke="#c0c5a0" stroke-opacity=".55"/>
    <path d="M30 428H490V615H30z" fill="url(#water-lines)"/>
    <g stroke="#899b7d" opacity=".2"><path d="M221 435l4 65 25 67 4 52 8-62 18-60 4-62"/><path d="M244 442l9 122 10-122"/><path d="M176 446h168M196 461h127M212 478h93"/></g>
    <text x="260" y="40" text-anchor="middle" fill="#a8b696" opacity=".55" font-size="10" letter-spacing="4">TAB. IV — BLATINY</text>
    <text x="260" y="636" text-anchor="middle" fill="#a8b696" opacity=".4" font-size="9" letter-spacing="3">CO JE DOLE, NASLOUCHÁ.</text>
  </svg>`;
}

function renderIntro() {
  main.innerHTML = `<section class="intro"><div class="intro-copy"><div class="eyebrow"><span class="small-line"></span> TEXTOVÁ ADVENTURA PRO POKROČILÉ</div><h1>Pod hladinou<br><em>řeči.</em></h1><p class="intro-lead">Některá slova otevírají dveře.<br>Jiná je nedokážou zavřít.</p><p class="intro-description">Jižní Čechy, podzim 1927. Váš kolega zmizel při překladu rukopisu z obce, která nemá být na mapě. Zůstal po něm dopis. A v něm věta, kterou si nemůžete dovolit špatně pochopit.</p><div class="intro-actions"><button class="primary" id="begin">${saved ? 'Pokračovat v pátrání' : 'Otevřít dopis'} <span aria-hidden="true">→</span></button>${saved ? '<button class="text-button" id="new-game">Začít od začátku</button>' : '<span class="playtime">Přibližně 25–40 minut</span>'}</div><div class="intro-specs"><div><span class="spec-number">10</span><span>jazykových zkoušek</span></div><div><span class="spec-number">04</span><span>možné konce</span></div><div><span class="spec-number">C1–C2</span><span>náročná čeština</span></div></div></div><div class="intro-art">${landscape()}<div class="art-note"><span>Terénní zápis č. 01</span><p>Voda ustoupila.<br>Vesnice se nevrátila.</p></div></div></section><section class="intro-bottom"><span class="eyebrow">NEJDE JEN O TO, CO ŘEKNETE.</span><p>Rozhoduje, čemu porozumíte. Čtěte svědectví, rozplétejte významy a volte přesné tvary. Každý omyl zanechá stopu v příběhu — i ve vás.</p></section>`;
  bind('#begin', 'click', () => { state = saved || newGame(); selection = null; save(); renderGame(true); });
  bind('#new-game', 'click', openRestart);
  if (!storageAvailable) saveStatus.textContent = 'Ukládání není dostupné v tomto prohlížeči.';
}

function sidebar() {
  const collected = state.records.filter(record => record.correct);
  const acts = ['I. Příjezd', 'II. Pod povrchem', 'III. Cizí gramatika', 'IV. Co zůstane'];
  const currentAct = chapters[state.index].act;
  return `<aside class="sidebar"><div class="sidebar-block"><span class="eyebrow">STAV BADATELE</span><div class="resolve-heading"><span>Rozvaha</span><span>${state.resolve}<small> / ${MAX_RESOLVE}</small></span></div><div class="resolve-meter" role="meter" aria-label="Rozvaha" aria-valuemin="0" aria-valuemax="7" aria-valuenow="${state.resolve}">${Array.from({length: MAX_RESOLVE}, (_, i) => `<span class="${i < state.resolve ? 'filled' : ''} ${state.resolve <= 2 ? 'danger' : ''}"></span>`).join('')}</div><p class="state-note">${state.resolve > 4 ? 'Dosud důvěřujete vlastním smyslům.' : state.resolve > 2 ? 'V některých vzpomínkách slyšíte cizí hlas.' : state.resolve > 0 ? 'Vaše jméno už nezní docela správně.' : 'Věta zůstala bez podmětu.'}</p></div><nav class="sidebar-block journey" aria-label="Průběh příběhu"><span class="eyebrow">CESTA POD HLADINU</span>${acts.map((act, i) => `<div class="act ${act === currentAct ? 'current' : acts.indexOf(currentAct) > i ? 'past' : ''}"><span class="act-dot"></span>${escape(act)}</div>`).join('')}</nav><div class="sidebar-block evidence"><div class="sidebar-label"><span class="eyebrow">NALEZENÉ DŮKAZY</span><span class="count">${String(collected.length).padStart(2, '0')}</span></div>${collected.length ? `<ul>${collected.map(record => `<li><span aria-hidden="true">◇</span><span>${escape(chapters[record.index].reward)}</span></li>`).join('')}</ul>` : '<p class="empty-note">Zatím jen dopis<br>a neblahé tušení.</p>'}</div><button class="text-button restart-link" id="restart">↺ &nbsp; Začít znovu</button></aside>`;
}

function answerControls(chapter) {
  if (chapter.type === 'input') return `<label class="input-label" for="answer">Vaše odpověď</label><input id="answer" name="answer" type="text" maxlength="300" placeholder="${escape(chapter.placeholder)}" autocomplete="off" autocapitalize="none" spellcheck="false" required><span class="field-note">Diakritika rozhoduje. Velikost písmen nikoli.</span>`;
  if (chapter.type === 'order') return `<div class="order-target" aria-live="polite"><span class="eyebrow">VAŠE POSLOUPNOST</span><ol id="ordered-list"></ol><span id="order-empty">Zvolte první událost níže.</span></div><div class="options order-options">${chapter.options.map((option, i) => `<button type="button" class="option order-option" data-index="${i}"><span class="option-key">+</span><span>${escape(option)}</span></button>`).join('')}</div><button type="button" class="text-button" id="order-reset">↺ Sestavit znovu</button>`;
  if (chapter.type === 'multi') return `<fieldset class="options"><legend class="sr-only">${escape(chapter.prompt)}</legend>${chapter.options.map((option, i) => `<label class="option"><input type="checkbox" name="claims" value="${i}"><span class="option-key check-mark" aria-hidden="true">${String.fromCharCode(65 + i)}</span><span>${escape(option)}</span></label>`).join('')}</fieldset><span class="field-note">Vyberte všechna platná tvrzení. Chybný výběr i vynechání se počítají jako omyl.</span>`;
  return `<fieldset class="options"><legend class="sr-only">${escape(chapter.prompt)}</legend>${chapter.options.map((option, i) => `<label class="option"><input type="radio" name="answer-choice" value="${i}" required><span class="option-key" aria-hidden="true">${String.fromCharCode(65 + i)}</span><span>${escape(option)}</span></label>`).join('')}</fieldset>`;
}

function correctAnswer(chapter) {
  if (chapter.type === 'input') return chapter.displayAnswer;
  if (chapter.type === 'choice') return chapter.options[chapter.answer];
  return chapter.answer.map((i, n) => chapter.type === 'order' ? `${n + 1}. ${chapter.options[i]}` : chapter.options[i]).join(' · ');
}
function userAnswer(chapter, value) {
  if (chapter.type === 'input') return value;
  if (chapter.type === 'choice') return chapter.options[value];
  return value.map(i => chapter.options[i]).join(' → ');
}

function feedback(chapter) {
  const record = state.records.at(-1);
  return `<section class="feedback ${record.correct ? 'correct' : 'incorrect'}" aria-labelledby="feedback-title"><span class="eyebrow">${record.correct ? 'VÝZNAM ZACHOVÁN' : `VÝZNAM SE VYMKL · −${chapter.cost} ${chapter.cost === 1 ? 'BOD ROZVAHY' : 'BODY ROZVAHY'}`}</span><h3 id="feedback-title">${record.correct ? 'Slova drží pohromadě.' : 'Něco vám uniklo.'}</h3><p class="consequence">${escape(record.correct ? chapter.success : chapter.failure)}</p><div class="explanation"><span class="eyebrow">POZNÁMKA FILOLOGA</span>${!record.correct ? `<p class="answer-review"><span>Vaše odpověď:</span> ${escape(userAnswer(chapter, record.value))}</p><p class="answer-review"><span>Správné řešení:</span> ${escape(correctAnswer(chapter))}</p>` : ''}<p>${escape(chapter.explanation)}</p></div>${record.correct ? `<div class="reward">◇ &nbsp; Získaný důkaz: ${escape(chapter.reward)}</div>` : ''}</section><div class="task-actions"><button class="primary" id="next">${state.resolve === 0 ? 'Pohlédnout do tmy' : state.index === chapters.length - 1 ? 'Překročit poslední práh' : 'Pokračovat v příběhu'} <span aria-hidden="true">→</span></button></div>`;
}

function renderGame(moveFocus = false) {
  if (state.phase === 'ending') return renderEnding(moveFocus);
  const chapter = chapters[state.index];
  const hinted = state.hints.includes(state.index);
  main.innerHTML = `<div class="game-layout">${sidebar()}<article class="chapter"><div class="chapter-top"><span class="eyebrow">ZÁZNAM ${String(state.index + 1).padStart(2, '0')} / 10</span><span class="location">${escape(chapter.location)}</span></div><div class="chapter-progress"><span style="width:${(state.index + 1) * 10}%"></span></div><h1 tabindex="-1" id="chapter-title">${escape(chapter.title)}</h1><div class="prose">${paragraphs(chapter.paragraphs)}</div><figure class="document"><figcaption><span aria-hidden="true">✧</span> Z ARCHIVU</figcaption><blockquote>${escape(chapter.document).replace(/\n/g, '<br>')}</blockquote><span class="document-corner" aria-hidden="true"></span></figure>${state.phase === 'feedback' ? feedback(chapter) : `<form id="challenge"><div class="challenge-heading"><span class="eyebrow">${escape(chapter.skill)}</span><span class="risk">Omyl: −${chapter.cost} ${chapter.cost === 1 ? 'bod' : 'body'} rozvahy</span></div><h2>${escape(chapter.prompt)}</h2>${answerControls(chapter)}<div class="task-actions"><button class="primary" type="submit" id="submit" disabled>Potvrdit odpověď <span aria-hidden="true">→</span></button><button class="text-button" type="button" id="hint" ${hinted || state.resolve <= 1 ? 'disabled' : ''}>${hinted ? 'Nápověda odhalena' : state.resolve <= 1 ? 'Na nápovědu nezbývá rozvaha' : 'Vyžádat nápovědu'}${!hinted && state.resolve > 1 ? ' <span class="hint-cost">−1 rozvaha</span>' : ''}</button></div><div id="hint-area" aria-live="polite">${hinted ? `<aside class="hint"><span class="eyebrow">POZNÁMKA NA OKRAJI</span><p>${escape(chapter.hint)}</p></aside>` : ''}</div></form>`}<details class="journal"><summary>Terénní zápisník <span>${state.records.length} / 10 záznamů</span></summary>${state.records.length ? state.records.map(record => `<div class="journal-entry"><span class="eyebrow">${String(record.index + 1).padStart(2, '0')} · ${record.correct ? 'ROZLUŠTĚNO' : 'OMYL'}</span><h3>${escape(chapters[record.index].title)}</h3><p>${escape(record.correct ? chapters[record.index].rewardNote : chapters[record.index].failure)}</p><p class="journal-explanation">${escape(chapters[record.index].explanation)}</p></div>`).join('') : '<p>První zápis teprve vznikne.</p>'}</details></article></div>`;
  bind('#restart', 'click', openRestart);
  if (state.phase === 'task') bindTask(chapter);
  bind('#next', 'click', () => { state = advance(state); selection = null; ordered = []; selectedMany = []; save(); renderGame(true); });
  if (moveFocus) { document.querySelector('#chapter-title')?.focus({preventScroll: true}); window.scrollTo({ top: 0, behavior: 'instant' }); }
}

function bindTask(chapter) {
  const submit = document.querySelector('#submit');
  bind('#answer', 'input', event => { selection = event.target.value; submit.disabled = !selection.trim(); });
  document.querySelectorAll('input[name="answer-choice"]').forEach(input => input.addEventListener('change', () => { selection = Number(input.value); submit.disabled = false; }));
  document.querySelectorAll('input[name="claims"]').forEach(input => input.addEventListener('change', () => { selectedMany = [...document.querySelectorAll('input[name="claims"]:checked')].map(node => Number(node.value)); selection = selectedMany; submit.disabled = !selectedMany.length; }));
  document.querySelectorAll('.order-option').forEach(button => button.addEventListener('click', () => {
    ordered.push(Number(button.dataset.index)); button.disabled = true;
    document.querySelector('#ordered-list').innerHTML = ordered.map(i => `<li>${escape(chapter.options[i])}</li>`).join('');
    document.querySelector('#order-empty').hidden = true;
    selection = [...ordered]; submit.disabled = ordered.length !== chapter.options.length;
  }));
  bind('#order-reset', 'click', () => { ordered = []; selection = null; renderGame(); document.querySelector('.order-option')?.focus(); });
  bind('#hint', 'click', () => {
    // Preserve an unfinished answer when opening the marginal note.
    const previousSelection = selection;
    const previousOrder = [...ordered];
    const previousMany = [...selectedMany];
    state = useHint(state); save(); renderGame();
    if (chapter.type === 'input' && typeof previousSelection === 'string') { const input = document.querySelector('#answer'); input.value = previousSelection; input.dispatchEvent(new Event('input')); }
    if (chapter.type === 'choice' && Number.isInteger(previousSelection)) { const input = document.querySelector(`input[value="${previousSelection}"]`); input.checked = true; input.dispatchEvent(new Event('change')); }
    if (chapter.type === 'multi') previousMany.forEach(i => { const input = document.querySelector(`input[value="${i}"]`); input.checked = true; input.dispatchEvent(new Event('change')); });
    if (chapter.type === 'order') { ordered = []; previousOrder.forEach(i => document.querySelector(`.order-option[data-index="${i}"]`).click()); }
    document.querySelector('#hint-area').scrollIntoView({block: 'nearest', behavior: 'smooth'});
  });
  bind('#challenge', 'submit', event => {
    event.preventDefault();
    if (submit.disabled || selection === null) return;
    state = submitAnswer(state, selection); save(); renderGame();
    document.querySelector('#feedback-title')?.setAttribute('tabindex', '-1');
    document.querySelector('#feedback-title')?.focus({preventScroll: true});
    document.querySelector('.feedback')?.scrollIntoView({block: 'start', behavior: 'smooth'});
  });
}

function renderEnding(moveFocus) {
  const key = endingFor(state);
  const ending = endings[key];
  const count = state.records.filter(record => record.correct).length;
  main.innerHTML = `<section class="ending"><div class="ending-symbol" aria-hidden="true">${key === 'sealed' ? '◈' : '◉'}</div><span class="eyebrow">${escape(ending.label)}</span><h1 id="chapter-title" tabindex="-1">${escape(ending.title)}</h1><div class="ending-prose">${paragraphs(ending.paragraphs)}</div><div class="ending-stats"><div><strong>${count} / 10</strong><span>rozluštěných zkoušek</span></div><div><strong>${state.resolve} / 7</strong><span>zbývající rozvaha</span></div><div><strong>${state.hints.length}</strong><span>využitých nápověd</span></div></div><p class="ending-note">${key === 'sealed' ? 'Zachovali jste rozvahu, oslovili strážce a shromáždili tři klíčové důkazy: rejstřík, úplný překlad a listinu se jménem.' : key === 'lost' ? 'Rozvaha klesla na nulu. Při dalším pátrání vám mohou pomoci poznámky k vašim odpovědím.' : key === 'survivor' ? 'Uspěli jste u posledního prahu. K záchraně Rybáře však chyběl jmenný rejstřík, úplný překlad nebo listina se jménem.' : 'Zachovali jste dost rozvahy k návratu, ale poslední oslovení selhalo. Práh zůstal otevřený.'}</p><button class="primary" id="restart">Otevřít dopis znovu <span aria-hidden="true">↺</span></button><details class="journal ending-review"><summary>Prohlédnout zápisník <span>${state.records.length} záznamů</span></summary>${state.records.map(record => `<div class="journal-entry"><span class="eyebrow">${String(record.index + 1).padStart(2, '0')} · ${record.correct ? 'ROZLUŠTĚNO' : 'OMYL'}</span><h3>${escape(chapters[record.index].title)}</h3><p><strong>Vaše odpověď:</strong> ${escape(userAnswer(chapters[record.index], record.value))}</p><p><strong>Správné řešení:</strong> ${escape(correctAnswer(chapters[record.index]))}</p><p>${escape(chapters[record.index].explanation)}</p></div>`).join('')}</details></section>`;
  bind('#restart', 'click', openRestart);
  if (moveFocus) { document.querySelector('#chapter-title').focus({preventScroll: true}); window.scrollTo({top: 0, behavior: 'instant'}); }
}

const helpDialog = document.querySelector('#help-dialog');
const restartDialog = document.querySelector('#restart-dialog');
function openRestart() { restartDialog.showModal(); }
bind('#help-open', 'click', () => helpDialog.showModal());
bind('#help-close', 'click', () => helpDialog.close());
bind('#help-done', 'click', () => helpDialog.close());
bind('#restart-cancel', 'click', () => restartDialog.close());
bind('#restart-confirm', 'click', () => { restartDialog.close(); state = newGame(); selection = null; ordered = []; selectedMany = []; save(); renderGame(true); });
renderIntro();
