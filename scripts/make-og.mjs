#!/usr/bin/env node
/**
 * Genera public/og.png (1200x630) con Chrome/Chromium en modo headless,
 * usando las mismas fuentes del sitio. Uso local: `pnpm og`.
 * Requiere tener google-chrome o chromium instalado (o CHROME_PATH).
 */
import { execFileSync } from 'node:child_process';
import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const font = (pkg, file) => pathToFileURL(join(root, 'node_modules', pkg, 'files', file)).href;

const html = `<!doctype html><html lang="es"><head><meta charset="utf-8"><style>
@font-face{font-family:Gloock;src:url(${font('@fontsource/gloock', 'gloock-latin-400-normal.woff2')})}
@font-face{font-family:Schibsted;font-weight:100 900;src:url(${font('@fontsource-variable/schibsted-grotesk', 'schibsted-grotesk-latin-wght-normal.woff2')})}
@font-face{font-family:Martian;font-weight:100 800;src:url(${font('@fontsource-variable/martian-mono', 'martian-mono-latin-wght-normal.woff2')})}
*{margin:0;box-sizing:border-box}
html,body{width:1200px;height:630px;overflow:hidden}
body{background:#0b0c0e;color:#f2ece1;font-family:Schibsted;position:relative;padding:72px 80px}
.grid{position:absolute;inset:0;background-image:linear-gradient(to right,rgba(242,236,225,.05) 1px,transparent 1px),linear-gradient(to bottom,rgba(242,236,225,.05) 1px,transparent 1px);background-size:60px 60px;-webkit-mask-image:radial-gradient(ellipse 80% 90% at 85% 10%,#000 20%,transparent 75%)}
.glow{position:absolute;left:-200px;top:-180px;width:900px;height:900px;background:radial-gradient(circle,rgba(255,106,61,.2),transparent 60%)}
.top{position:relative;display:flex;align-items:center;gap:18px;font:450 17px Martian;letter-spacing:.1em;text-transform:uppercase;color:#a39e93}
.top i{width:40px;height:1px;background:#ff6a3d}
h1{position:relative;font:400 104px/0.98 Gloock;letter-spacing:-.025em;margin-top:44px}
h1 span{color:#ff6a3d}
.name{position:absolute;left:80px;bottom:64px;font-weight:600;font-size:30px}
.name small{display:block;font:450 15px Martian;letter-spacing:.1em;text-transform:uppercase;color:#a39e93;margin-top:8px}
.mark{position:absolute;right:80px;bottom:64px;width:96px;height:96px}
.num{position:absolute;right:56px;top:20px;font:400 300px/1 Gloock;color:transparent;-webkit-text-stroke:1.5px rgba(255,106,61,.35)}
</style></head><body>
<div class="glow"></div><div class="grid"></div><div class="num">08</div>
<p class="top"><i></i>Portafolio · Desarrollo web</p>
<h1>Sitios y aplicaciones<br><span>que se entienden</span><br>a la primera.</h1>
<p class="name">Alejandro Jaquez<small>8 proyectos · demos en vivo</small></p>
<img class="mark" src="${pathToFileURL(join(root, 'public', 'favicon.svg')).href}" alt="">
</body></html>`;

const dir = mkdtempSync(join(tmpdir(), 'og-'));
const file = join(dir, 'og.html');
writeFileSync(file, html);
const chrome = process.env.CHROME_PATH ?? 'google-chrome';
execFileSync(chrome, [
  '--headless=new',
  '--no-sandbox',
  '--hide-scrollbars',
  '--force-device-scale-factor=1',
  '--virtual-time-budget=3000',
  `--screenshot=${join(root, 'public', 'og.png')}`,
  '--window-size=1200,630',
  pathToFileURL(file).href,
], { stdio: 'ignore' });
console.log('✓ public/og.png generado');
