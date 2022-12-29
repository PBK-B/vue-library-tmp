import { defineConfig } from 'vite'
import { resolve } from 'node:path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [],
    build: {
        lib: {
            // Could also be a dictionary or array of multiple entry points
            entry: resolve(__dirname, './index.ts'),
            name: 'LibWelcome',
            // the proper extensions will be added
            fileName: 'lib-welcome',
        },
    }
})
