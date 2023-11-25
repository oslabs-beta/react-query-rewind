// configures how your source files are bundled, and compiles to TypeScript

// import typescript from '@rollup/plugin-typescript';
// import { nodeResolve } from '@rollup/plugin-node-resolve';
// import { dts } from 'rollup-plugin-dts';

// export default [
//   // Configuration for JavaScript Bundle
//   {
//     // entry point for the bundle file where rollup starts bundling
//     input: 'src/index.tsx',

//     // defines how and where the bundled output should be saved
//     output: [
//       // configuration in CommonJS for Node.js enviornments
//       {
//         file: 'dist/cjs/index.js',
//         format: 'cjs',
//         sourcemap: true,
//       },
//       // configuration in ES Module format for Browsers and ES Module enviornments
//       {
//         file: 'dist/esm/index.js',
//         format: 'esm',
//         sourcemap: true,
//       },
//     ],

//     // plugins used for configuration
//     plugins: [nodeResolve(), typescript()],

//     // dependencies not provided by bundle but should be in consumers enviornment
//     external: ['react', 'react-dom'],
//   },
//   // Configuration for TypeScript Declaration Files
//   {
//     input: 'src/types.d.ts',
//     output: [{ file: 'dist/types/types.d.ts', format: 'es' }],
//     plugins: [dts()],
//   },
// ];

import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';

export default {
  input: 'src/index.tsx', // Adjust the input file to your main TypeScript file
  output: [
    {
      file: 'dist/cjs/index.js', // CommonJS format
      format: 'cjs',
      sourcemap: true
    },
    {
      file: 'dist/esm/index.js', // ES Module format
      format: 'esm',
      sourcemap: true
    },
    {
      file: 'dist/umd/index.js', // UMD format
      format: 'umd',
      name: 'MyDebugComponent', // Replace with your component's global variable name if used in script tags
      sourcemap: true
    }
  ],
  plugins: [
    peerDepsExternal(), // prevents duplicate bundling and in theory, multiple versions of react
    resolve(), // Resolves node modules
    commonjs(), // Converts CommonJS modules to ES6
    typescript({ tsconfig: './tsconfig.json' }), // TypeScript plugin
    babel({
      exclude: 'node_modules/**', // Babel for transpiling React and ES6
      presets: ['@babel/preset-react']
    }),
    terser() // Minifies the bundles
  ]
};
 