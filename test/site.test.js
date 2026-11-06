import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';

const root = new URL('../', import.meta.url);

test('hub and adventure links resolve under a GitHub Pages project path', async () => {
  const site = new URL('https://example.github.io/collection/');
  for (const page of ['index.html', 'games/pod-hladinou-reci/index.html', 'games/cthulhu-tiene-cita-previa/index.html', 'games/amor-en-modo-subjuntivo/index.html', 'games/posledni-spoj/index.html']) {
    const html = await readFile(new URL(page, root), 'utf8');
    const pageUrl = new URL(page, site);
    for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
      const link = new URL(match[1], pageUrl);
      assert.ok(link.href.startsWith(site.href), `Link escapes project: ${link}`);
      let relative = link.pathname.slice(site.pathname.length);
      if (!relative || relative.endsWith('/')) relative += 'index.html';
      assert.ok((await stat(new URL(relative, root))).isFile(), `Missing target: ${relative}`);
      if (link.hash) {
        const target = await readFile(new URL(relative, root), 'utf8');
        assert.ok(target.includes(`id="${link.hash.slice(1)}"`), `Missing anchor: ${link.hash}`);
      }
    }
  }
});

test('the hub links to the adventure and the adventure links back', async () => {
  const hub = await readFile(new URL('index.html', root), 'utf8');
  const game = await readFile(new URL('games/pod-hladinou-reci/index.html', root), 'utf8');
  assert.match(hub, /href="\.\/games\/pod-hladinou-reci\/"/);
  assert.match(game, /href="\.\.\/\.\.\/"/);
});

test('local server serves the hub, nested game, redirects, and missing pages', async () => {
  const { spawn } = await import('node:child_process');
  const { once } = await import('node:events');
  const server = spawn(process.execPath, [new URL('../scripts/serve.mjs', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')], {
    env: { ...process.env, PORT: '0' }, stdio: ['ignore', 'pipe', 'pipe'],
  });
  try {
    const ready = await Promise.race([
      once(server.stdout, 'data'),
      once(server, 'exit').then(([code]) => { throw new Error(`Server exited: ${code}`); }),
      new Promise((_, reject) => { const timer = setTimeout(() => reject(new Error('Server startup timed out')), 5000); timer.unref(); }),
    ]);
    const origin = String(ready[0]).match(/http:\/\/127\.0\.0\.1:\d+/)?.[0];
    assert.ok(origin);
    for (const [route, expected] of [
      ['/', 'One-Shot Games'], ['/hub.css', '--paper'],
      ['/games/posledni-spoj/', 'Poslední spoj do Včera'],
      ['/games/posledni-spoj/app.js', 'sceneFor'],
      ['/games/posledni-spoj/engine.js', 'posledni-spoj-v1'],
      ['/games/posledni-spoj/story.js', 'Vrbová'],
      ['/games/posledni-spoj/style.css', '--amber'],
      ['/games/amor-en-modo-subjuntivo/', 'Amor en modo subjuntivo'],
      ['/games/amor-en-modo-subjuntivo/app.js', 'answer-form'],
      ['/games/amor-en-modo-subjuntivo/engine.js', 'amor-subjuntivo-v1'],
      ['/games/amor-en-modo-subjuntivo/story.js', 'croqueta'],
      ['/games/amor-en-modo-subjuntivo/style.css', '--rose'],
      ['/games/cthulhu-tiene-cita-previa/', 'Cthulhu tiene cita previa'],
      ['/games/cthulhu-tiene-cita-previa/app.js', 'renderIntro'],
      ['/games/cthulhu-tiene-cita-previa/story.js', 'Necronomicón'],
      ['/games/cthulhu-tiene-cita-previa/engine.js', 'cthulhu-cita-previa-v1'],
      ['/games/cthulhu-tiene-cita-previa/style.css', '--paper'],
      ['/games/pod-hladinou-reci/', 'Pod hladinou řeči'],
      ['/games/pod-hladinou-reci/app.js', "from './engine.js'"],
      ['/games/pod-hladinou-reci/engine.js', 'pod-hladinou-reci-v1'],
      ['/games/pod-hladinou-reci/data.js', 'chapters'],
      ['/games/pod-hladinou-reci/style.css', '--accent'],
    ]) {
      const response = await fetch(origin + route);
      assert.equal(response.status, 200, route);
      assert.ok((await response.text()).includes(expected), route);
    }
    const redirect = await fetch(origin + '/games/pod-hladinou-reci', { redirect: 'manual' });
    assert.equal(redirect.status, 301);
    assert.equal(redirect.headers.get('location'), '/games/pod-hladinou-reci/');
    assert.equal((await fetch(origin + '/missing-game/')).status, 404);
  } finally {
    const exit = once(server, 'exit');
    server.kill();
    await exit;
  }
});
