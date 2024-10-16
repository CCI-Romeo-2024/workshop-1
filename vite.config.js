import { defineConfig } from "vite";
import { resolve } from 'path'

export default defineConfig({
    base: '',
    css: {
        preprocessorOptions: {
            scss: {
                api: 'modern-compiler', // or "modern", "legacy"
                importers: [
                    // ...
                ],
            },
        },
    },
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                register: resolve(__dirname, 'register.html'),
                scoreboard: resolve(__dirname, 'score_board.html'),
                admin: resolve(__dirname, 'admin.html'),
                adminHidden: resolve(__dirname, 'admin_hidden.html')
            }
        }
    },
    plugins: [

    ]
})
