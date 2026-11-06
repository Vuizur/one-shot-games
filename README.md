# One-Shot Games

A growing collection of standalone browser games, served from one static hub on GitHub Pages. No build step, dependencies, backend, API keys, or external fonts are required.

## Play locally

Run `npm start`, `node scripts/serve.mjs`, or double-click `spustit-hru.cmd` on Windows. Open the printed address (normally http://127.0.0.1:4173). The home page lists all games.

Use an HTTP server rather than opening HTML files directly, because the adventure uses JavaScript modules.

## GitHub Pages

1. Push this folder's contents to your GitHub repository.
2. Under **Settings → Pages**, choose **Deploy from a branch**, your publishing branch (for example `main`), and **/ (root)**.
3. Open the URL shown by GitHub Pages after deployment.

The root `index.html` is the hub. Each game lives at `games/<slug>/`. All site links are relative, so the collection works at both a domain root and a project URL such as `https://USER.github.io/REPOSITORY/`. Keep `.nojekyll` at the root.

The existing repository name can stay the same; renaming the local folder does not change its GitHub URL. This change does not itself push or publish the repository.

## Current games

| Game | Path | Details |
| --- | --- | --- |
| Pod hladinou řeči | [Play](games/pod-hladinou-reci/) | Czech cosmic horror text adventure, C1–C2, 10 puzzles, 4 endings |
| Cthulhu tiene cita previa | [Play](games/cthulhu-tiene-cita-previa/) | Spanish cosmic comedy, three departments, 5 endings, 15–25 minutes |
| Amor en modo subjuntivo | [Play](games/amor-en-modo-subjuntivo/) | Spanish dating comedy, 10 grammar challenges, 3 adult characters, 4 endings |

See [the adventure's README](games/pod-hladinou-reci/README.md) for its rules and story notes. Saves retain the original storage key and survive this reorganization when served on the same origin. A different domain or browser has separate saves.

## Add a game

1. Create `games/your-game/` with its own `index.html` and assets. Keep its scripts, styles, and asset links relative to that folder.
2. Copy the `<article class="game-card">` in the root `index.html`, place it before the future-game comment, and update its title, artwork, description, facts, and **all three** game links. Update the count beside “The collection.”
3. Include a `../../` link back to the hub in the new game. If it saves progress, give it a unique localStorage key, since games on the same origin share storage.
4. Run `npm test`, preview both the hub and the new game with `npm start`, then push to the publishing branch.

The hub works without JavaScript. Use real links so visitors can bookmark games and open them in new tabs. Do not add unavailable games as playable cards.

## Project layout and checks

- `index.html`, `hub.css`: collection page and its responsive styling.
- `games/pod-hladinou-reci/`: the existing adventure, with self-contained assets.
- `scripts/serve.mjs`: local static server, including directory index support.
- `test/game.test.js`: adventure rules, endings, answer handling, and saved state.
- `test/site.test.js`: hub/game links and static asset integrity.

Run `npm test` or `node --test`. Each game's implementation and tests should remain independent of future games.

The Spanish adventure has its own [README](games/cthulhu-tiene-cita-previa/README.md) and isolated save keys. Its tests live in test/spanish-game.test.js.

[Amor en modo subjuntivo](games/amor-en-modo-subjuntivo/README.md) stores only decisions and outcomes, never typed answers. Its review notebook displays correct Spanish models only.

[Poslední spoj do Včera](games/posledni-spoj/README.md) is a standalone Czech narrative mystery, with free exploration and four endings. It has no language exercises and can be hosted separately on GitHub Pages.
