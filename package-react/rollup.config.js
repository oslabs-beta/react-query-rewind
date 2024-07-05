// configures how your source files are bundled, and compiles to TypeScript
 
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';

export default {
  input: 'src/index.tsx', // Main TypeScript file of our package
  output: [
    {
      file: 'dist/cjs/index.cjs', // CommonJS format
      format: 'cjs',
      sourcemap: true,
      exports: "named"
    },
    {
      file: 'dist/esm/index.js', // ES Module format
      format: 'esm',
      sourcemap: true
    }
  ],
  plugins: [
    peerDepsExternal(), // prevents duplicate bundling and in theory, multiple versions of react
    resolve(), 
    commonjs(), // Converts CommonJS modules to ES6
    typescript({ tsconfig: './tsconfig.json' }), // TypeScript plugin
    babel({
      babelHelpers: 'bundled',
      extensions: ['.js', '.jsx', '.ts', '.tsx'], // add this if you're using TypeScript
      exclude: 'node_modules/**' 
    }),
    terser(), // Minifies the bundles
  ]
};
 