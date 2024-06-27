// configures how your source files are bundled, and compiles to TypeScript
 
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

// Common set of plugins
const commonPlugins = [
  peerDepsExternal(),
  resolve({ extensions }),
  commonjs(),
  typescript({ tsconfig: './tsconfig.json' }),
  babel({
    extensions,
    babelHelpers: 'bundled',
    presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
  }),
  terser(),  // Minify the code for all builds
];

export default [
  // ES Module build
  {
    input: 'src/index.tsx',
    output: {
      file: 'dist/my-package.esm.js',
      format: 'esm',
      sourcemap: true,  // Enable sourcemaps
    },
    plugins: commonPlugins,
  },
  // CommonJS build
  {
    input: 'src/index.tsx',
    output: {
      file: 'dist/my-package.cjs.js',
      format: 'cjs',
      sourcemap: true,  // Enable sourcemaps
    },
    plugins: commonPlugins,
  },
  // UMD build
  {
    input: 'src/index.tsx',
    output: {
      file: 'dist/my-package.umd.js',
      format: 'umd',
      name: 'MyPackage',
      sourcemap: true,  // Enable sourcemaps
    },
    plugins: commonPlugins,
  },
];
