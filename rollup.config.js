// configures how your source files are bundled, and compiles to TypeScript

import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import nodePolyfills from 'rollup-plugin-node-polyfills';

export default {
  input: 'src/index.tsx', // Main TypeScript file of our package
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
    }
  ],
  plugins: [
    peerDepsExternal(), // prevents duplicate bundling and in theory, multiple versions of react
    resolve({ // Resolves node modules
      browser: true, // Instructs the plugin to use browser-friendly versions of modules if available
      preferBuiltins: false // Do not prefer Node.js built-in modules because this package won't be used in a nodejs app
    }), 
    commonjs(), // Converts CommonJS modules to ES6
    typescript({ tsconfig: './tsconfig.json' }), // TypeScript plugin
    babel({
      exclude: 'node_modules/**', // Babel for transpiling React and ES6
      presets: ['@babel/preset-react']
    }),
    terser(), // Minifies the bundles
    nodePolyfills(), // Add Node.js polyfills for the browser - needed if we want to use a websocket
  ]
};
 