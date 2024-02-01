import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    plugins: [
        vue(),
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.js'],
            refresh: true,
        }),
    ],

    build: {
        chunkSizeWarningLimit: 3000
    },

  
    server: {
        host: '0.0.0.0',
        hmr: {
            host: 'localhost'
        },
    },
});
