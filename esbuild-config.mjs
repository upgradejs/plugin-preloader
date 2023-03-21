import * as esbuild from 'esbuild';
import packageJSON from './package.json' assert { type: "json" };

const baseConfig = {
  entryPoints: ['./src/index.ts'],
  bundle: true,
  platform: 'node',
};

Promise.all([
  esbuild.build({
    ...baseConfig,
    format: 'esm',
    outfile: packageJSON.module,
  }),
  esbuild.build({
    ...baseConfig,
    format: 'cjs',
    outfile: packageJSON.main
  })
])
