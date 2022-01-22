import ts from '@rollup/plugin-typescript'
import { defineConfig } from 'rollup'
import { terser } from 'rollup-plugin-terser'
const production = !process.env.ROLLUP_WATCH
export default defineConfig({
  input: './src/extension.ts',
  output: {
    file: 'out/extension.js',
    format: 'cjs',
    sourcemap: true,
  },
  external: ['vscode'],
  plugins: [
    ts({ module: 'ESNext' }),
    production && terser(),
  ],
})
