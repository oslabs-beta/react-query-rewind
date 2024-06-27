// configures how your source files are bundled, and compiles to TypeScript
 
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

const commonPlugins = [
  peerDepsExternal(), // Prevents duplicate bundling and multiple versions of React
  resolve({ extensions }), // Resolves modules
  commonjs(), // Converts CommonJS modules to ES6
  babel({
    extensions,
    babelHelpers: 'bundled',
    // already defined in .babelrc
    // presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
  }),
  // terser() // Minifies the bundles
];

export default [
    {
      input: 'src/index.tsx', // Main TypeScript file of our package
      output: {
        file: 'dist/cjs/index.cjs', // CommonJS format
        format: 'cjs',
        sourcemap: true
      },
      // point to the specific typescript file for this
      plugins: [...commonPlugins, typescript({ tsconfig: './tsconfig.json' })]
    },
    {
      input: 'src/index.tsx', // Main TypeScript file of our package
      output: {
        file: 'dist/esm/index.js', // ES Module format
        format: 'esm',
        sourcemap: true
      },
      // point to the specific typescript file for this
      plugins: [...commonPlugins, typescript({ tsconfig: './tsconfig.json' })]
    }
  ];
 