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

const img = (slug, file = '01-thumb.webp') => pathToFileURL(join(root, 'public', 'projects', slug, file)).href;
const hung = ['demo-actividades', 'demo-landing-fundacion', 'demo-grocery'];

// Estilo «sala nocturna»: muro añil, focos de luz cempasúchil y capturas colgadas.
const html = `<!doctype html><html lang="es"><head><meta charset="utf-8"><style>
@font-face{font-family:Archivo;font-weight:100 900;font-stretch:62% 125%;src:url(${font('@fontsource-variable/archivo', 'archivo-latin-wdth-normal.woff2')})}
@font-face{font-family:Newsreader;font-weight:200 800;src:url(${font('@fontsource-variable/newsreader', 'newsreader-latin-opsz-normal.woff2')})}
*{margin:0;box-sizing:border-box}
html,body{width:1200px;height:630px;overflow:hidden}
body{background:radial-gradient(ellipse 60% 50% at 30% -10%,rgba(255,196,110,.12),transparent 70%),#10142b;color:#edeaf5;font-family:Archivo;position:relative;padding:60px 72px}
.by{display:flex;gap:22px;font-size:22px;color:#9e9cc3}
.by b{color:#edeaf5;font-weight:650;font-stretch:112%}
h1{font-weight:660;font-stretch:118%;font-size:66px;line-height:.95;letter-spacing:-.035em;margin-top:30px}
.wall{position:absolute;left:72px;right:72px;bottom:58px;display:grid;grid-template-columns:repeat(3,1fr);gap:34px}
.w{position:relative}
.w::before{content:'';position:absolute;inset:-10px -40px 20%;background:radial-gradient(ellipse 50% 70% at 50% 0%,rgba(255,196,110,.22),rgba(255,196,110,.05) 55%,transparent 75%)}
.w::after{content:'';position:absolute;top:-12px;left:50%;width:56px;height:4px;transform:translateX(-50%);border-radius:0 0 5px 5px;background:#242b55;box-shadow:0 3px 0 -1px rgba(255,196,110,.9),0 6px 20px 2px rgba(255,196,110,.4)}
.f{position:relative;padding:8px;background:#151a36;border:1px solid #2c3362;border-radius:3px;box-shadow:0 30px 50px -25px #000}
.f img{display:block;width:100%;aspect-ratio:16/10;object-fit:cover;object-position:top}
.tag{position:absolute;right:72px;top:64px;display:flex;align-items:center;gap:10px;font-size:20px;font-weight:600;color:#f6a623}
.tag i{width:11px;height:11px;border-radius:50%;background:#f6a623;box-shadow:0 0 12px rgba(255,196,110,.9)}
</style></head><body>
<p class="by"><b>Alejandro Jaquez</b><span>Portafolio de desarrollo web</span></p>
<p class="tag"><i></i>8 proyectos, 5 demos en vivo</p>
<h1>Portafolio<br>de proyectos</h1>
<div class="wall">${hung.map((s) => `<div class="w"><div class="f"><img src="${img(s)}" alt=""></div></div>`).join('')}</div>
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
