
import { resolve } from "path";
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
    plugins: [react()],
    server: {
        port: 4000,
        host: true,
    },
    resolve: {
        alias: [
            {
                find: '@', replacement: resolve(__dirname, './src')
            }
        ]
    },
    test: {
        globals: true,
        environment: 'jsdom',
        // setupFiles: './vitest.setup.mts'
    }
})