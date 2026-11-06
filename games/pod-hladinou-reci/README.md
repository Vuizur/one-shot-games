# Pod hladinou řeči

Tato hra je součástí kolekce [One-Shot Games](../../). Pokyny ke spuštění a publikování celé kolekce najdete v [hlavním README](../../README.md). Příkazy níže spouštějte z kořene repozitáře; hru otevřete na cestě /games/pod-hladinou-reci/.

Česká textová adventura s původním příběhem v duchu lovecraftovského kosmického hororu. Deset jazykových zkoušek pro pokročilé, čtyři konce, rozvaha, důkazy, nápovědy a automatické ukládání do prohlížeče. Orientační obtížnost C1–C2, nikoli standardizovaný jazykový test.

## Spuštění

Hra nevyžaduje sestavení ani instalaci závislostí. Ve Windows můžete ze složky hry spustit:

```powershell
.\spustit-hru.cmd
```

Spouštěč vyhledá Node v PATH a poté zkusí běhové prostředí dodávané s aplikací Codex. Není nutné měnit systémové nastavení PATH. Pokud nemáte ani jednu možnost, můžete hru rovnou zveřejnit na GitHub Pages podle návodu níže.

Máte-li Node.js 20 nebo novější a npm v PATH, můžete také použít:

```sh
npm start
```

Pokud nemáte k dispozici npm, spusťte přímo `node scripts/serve.mjs`. Ověření lze obdobně spustit příkazem `node --test`.

V prohlížeči otevřete adresu, kterou příkaz vypíše (standardně `http://127.0.0.1:4173`). Kvůli modulům JavaScriptu otevírejte hru přes HTTP server, nikoli dvojklikem na soubor.

## GitHub Pages

Publikujte celou kolekci podle [hlavního README](../../README.md). Tato hra je dostupná v podadresáři games/pod-hladinou-reci/.

## Pravidla

- Počáteční rozvaha: 7 bodů. Omyl stojí 1–2 body, nápověda 1 bod. Při nule pátrání končí.
- Odpověď je možné odevzdat pouze jednou. Po vyhodnocení se zobrazí příběhový následek a jazykové vysvětlení.
- Psané úlohy vyžadují diakritiku a přesný předepsaný tvar. Velikost písmen, mezery navíc, Unicode NFC/NFD a závěrečná interpunkce se sjednocují.
- Stav včetně vyhodnocení a nápověd se ukládá místně. Obnovení stránky umožní pokračovat od posledního rozhodnutí. Rozpracovaná odpověď se neukládá.
- Pokud prohlížeč úložiště blokuje, lze hrát bez ukládání. Hra tuto situaci oznámí v zápatí.

<details>
<summary>Pravidla závěrů — obsahuje vyzrazení děje</summary>

Nulová rozvaha vždy vede ke ztrátě identity. Při kladné rozvaze a chybném závěrečném oslovení zůstane práh otevřený. Správné oslovení umožní vlastní záchranu; správně získaný jmenný rejstřík (3. zkouška), úplný překlad (7.) a listina se jménem (8.) navíc dovolí zachránit Rybáře. Ostatní důkazy se zapisují do zápisníku; správné odpovědi u nich také chrání rozvahu.

</details>

## Úpravy a ověření

- `data.js`: příběh, zadání, řešení, vysvětlení a závěry.
- `engine.js`: vyhodnocení, změny rozvahy, konce, kontrola uložených dat.
- `app.js`: rozhraní, přístupnost a ukládání.
- `style.css`: vzhled včetně responzivního rozložení.
- `npm test`: průchod hrou, podmínky všech konců, nevratnost odpovědí a obnova uloženého stavu.

Řešení jsou součástí veřejného zdrojového kódu. Hra slouží k procvičování, nikoli k zabezpečenému zkoušení. Vymazání dat webu smaže postup; mezi různými prohlížeči či adresami se postup nepřenáší.
