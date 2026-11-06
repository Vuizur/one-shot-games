# Cthulhu tiene cita previa

A standalone Spanish comedy text adventure inspired by cosmic horror. You play a temporary Innsmouth municipal clerk processing Cthulhu's application to end the world. Original story; no external assets or services.

Play at /games/cthulhu-tiene-cita-previa/ from the repository's static server or GitHub Pages. Start the server from the repository root with node scripts/serve.mjs.

## Play

Choose responses, visit three departments in any order, and collect a license, a true name, and coffee. Optional items unlock different resolutions. Patience and chaos affect whether a negotiated settlement works. No language quiz or typing is required. All story, choices, and help are in Spanish. Approximate reading time: 15–25 minutes.

There are five endings. The ending screen lets you retry the final audience with the same inventory or start a new game. Progress and discovered endings save locally under game-specific keys; storage errors allow continued play without saving.

## Files

- story.js: Spanish scenes, choices, items, and endings.
- engine.js: pure decision logic, department progression, and replay-based save validation.
- app.js: interface, local saving, dialogs, and ending collection.
- style.css: responsive municipal stationery theme.
- index.html: entry page and accessible help/restart dialogs.
- ../../test/spanish-game.test.js: progression, ending reachability, resource effects, save safety.

Run node --test from the repository root.
