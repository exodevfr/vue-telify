// import dts from 'rollup-plugin-dts';
// import { fileURLToPath } from 'url';
// import { dirname, resolve } from 'path';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// export default {
//   input: resolve(__dirname, 'src/index.ts'),
//   output: {
//     file: resolve(__dirname, 'dist/vue-telify.d.ts'),
//     format: 'es'
//   },
//   plugins: [dts()],
//   external: [/\.css$/],
// };

import vue from '@vitejs/plugin-vue';
import dts from 'rollup-plugin-dts';
import { dirname, resolve } from 'path';

const __dirname = dirname(__filename);

export default [
  {
    input: resolve(__dirname, 'src/index.ts'),
    output: [
      {
        file: resolve(__dirname, 'dist/vue-telify.es.js'),
        format: 'es',
        exports: 'named', // Ajout de cette ligne
      },
      {
        file: resolve(__dirname, 'dist/vue-telify.umd.js'),
        format: 'umd',
        name: 'VueTelify',
        exports: 'named', // Ajout de cette ligne
      }
    ],
    plugins: [
      vue(),
    ],
    external: ['vue'],
  },
  {
    input: resolve(__dirname, 'src/index.ts'),
    output: {
      file: resolve(__dirname, 'dist/vue-telify.d.ts'),
      format: 'es',
    },
    plugins: [dts()],
    external: [/\.css$/],
  }
];