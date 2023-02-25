import { resolve } from 'path'
import { defineConfig } from 'vite'
import { qwikVite } from '@builder.io/qwik/optimizer';

export default defineConfig({
    build: {
        target: 'es2020',
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'qwik-transition',
            // the proper extensions will be added
            fileName: (format) => `index.qwik.${format === 'es' ? 'mjs' : 'cjs'}`,
            formats: ['es', 'cjs']
        },
        rollupOptions: {
            // make sure to externalize deps that shouldn't be bundled
            // into your library
            external: ['@builder.io/qwik'],
        },
        outDir: "dist"
    },
    plugins: [qwikVite()]
})
