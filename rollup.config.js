import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { dts } from 'rollup-plugin-dts';

export default [
  // Configuration for JavaScript Bundle
  {
    // entry point for the bundle file where rollup starts bundling
    input: 'src/index.tsx',

    // defines how and where the bundled output should be saved
    output: [
      // configuration in CommonJS for Node.js enviornments
      {
        file: 'dist/cjs/index.js',
        format: 'cjs',
        sourcemap: true,
      },
      // configuration in ES Module format for Browsers and ES Module enviornments
      {
        file: 'dist/esm/index.js',
        format: 'esm',
        sourcemap: true,
      },
    ],

    // plugins used for configuration
    plugins: [nodeResolve(), typescript()],

    // dependencies not provided by bundle but should be in consumers enviornment
    external: ['react', 'react-dom'],
  },
  // Configuration for TypeScript Declaration Files
  {
    input: 'src/types.d.ts',
    output: [{ file: 'dist/types/types.d.ts', format: 'es' }],
    plugins: [dts()],
  },
];
