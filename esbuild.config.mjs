import esbuild from 'esbuild';
import { copyFileSync } from 'fs';

const OUT_FILE = './build/index.js';
const OUT_FILE_SERVER = './public/index.js';

const isServer = process.argv.includes('--server');

/** @type { import('esbuild').BuildOptions } */
const config = {
  bundle: true,
  entryPoints: ['src/Counter.ts'],
  format: 'iife',
  minify: true,
  outfile: isServer ? OUT_FILE_SERVER : OUT_FILE,
  platform: 'browser',
  sourcemap: false,
  target: [
    // https://browserslist.dev/?q=PiAwLjAxJSBpbiBOTw%3D%3D
    'chrome79',
    'safari12',
    'edge95',
    'firefox91',
  ],
  treeShaking: true,
  minifyWhitespace: true,
  tsconfig: 'tsconfig.json',
  logLevel: 'info',
};

try {
  if (isServer) {
    await esbuild.serve({ port: 5050, servedir: 'public' }, { ...config });
    console.log('*** DEV SERVER RUNNING ON PORT 5050 ***');
  } else {
    console.log('*** BUILDING ***');
    await esbuild.build(config);
    copyFileSync('./public/index.html', './build/index.html');
  }
} catch (e) {
  console.error('Building SDK failed', e);
}
