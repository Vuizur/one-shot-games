# Poslední spoj do Včera

Samostatná česká příběhová hra o nočním vlaku, lítosti a cizích příležitostech. Nemá společný děj ani herní logiku s ostatními hrami v kolekci. Neobsahuje jazykové zkoušky.

## Spuštění a GitHub Pages

Z kořene kolekce spusťte node scripts/serve.mjs a otevřete /games/posledni-spoj/.

Hra nemá závislosti, sestavení, síťové služby ani externí zdroje. Pro samostatné GitHub Pages lze zveřejnit obsah této složky jako kořen webu. V takovém případě upravte či odstraňte odkazy „Všechny hry“ v index.html a app.js, které v kolekci vedou o dvě úrovně výše.

## Hraní

Čtěte a vybírejte možnosti. Kupé a bufet lze navštívit v libovolném pořadí. Pro pokračování k dopisu potřebujete dokončit dvě kupé. Tato volba ukončí průzkum. Není časový limit ani předčasná prohra.

Čtyři konce závisí na konečné volbě a nalezených předmětech. Tři jsou dostupné vždy. Čtvrtý vyžaduje melodii, klíč, semínko a přiznanou vzpomínku. Na konci se lze vrátit před poslední rozhodnutí nebo zahájit novou cestu.

Volby se ukládají lokálně pod klíčem posledni-spoj-v1. Ukládá se jen historie platných voleb a při obnovení se přehrává. Pokud prohlížeč ukládání blokuje, lze hrát dál v otevřené kartě.

## Obsah a soubory

- story.js: české scény, předměty a čtyři konce.
- engine.js: volný průzkum, podmínky voleb, předměty a obnovení.
- app.js: rozhraní, poznámky a ukládání.
- style.css: noční vzhled, mobilní zobrazení a zvětšené písmo.
- index.html: vstup, informace a potvrzení nové cesty.
- ../../test/train-game.test.js: průchodnost, čtyři konce, předměty, ukládání a všechny varianty průzkumu.

Příběh zmiňuje odcizení v rodině, lítost a ztrátu blízkého člověka. Nemá lekací scény ani zvuk, který by se spouštěl automaticky.
