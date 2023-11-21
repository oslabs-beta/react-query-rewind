import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { dts } from 'rollup-plugin-dts';

export default {
  input: 'src/index.tsx',
  output: [
    {
      file: 'dist/cjs/index.js',
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: 'dist/esm/index.js',
      format: 'esm',
      sourcemap: true,
    },
    {
      file: 'dist/types/types.d.ts',
      format: 'es',
    },
  ],
  plugins: [nodeResolve(), typescript(), dts()],
  external: ['react', 'react-dom'],
};
