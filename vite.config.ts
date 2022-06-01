import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-dts';
import removeConsole from 'vite-plugin-remove-console';

// https://vitejs.dev/config/

export default defineConfig((configEnv) => {
    const isDevelopment = configEnv.mode === 'development';
    const isProduction = configEnv.mode === 'production';
    const plugins = isProduction ? [react(), dts(), removeConsole()] : [react(), dts()];
    return {
        plugins: plugins,
        resolve: {
            alias: {
                '@': resolve(__dirname, './src'),
            },
        },
        css: {
            modules: {
                generateScopedName: isDevelopment ? '[name]__[local]__[hash:base64:5]' : '[hash:base64:5]',
            },
        },
        server: {
            open: true,
            // port: 3003,
            // 'http://localhost:3000',

            // hmr: false,
            strictPort: true,
        },
        // https://jivancic.com/posts/build-a-component-library.html
        // https://miyauchi.dev/posts/lib-vite-tailwindcss
        build: {
            outDir: 'build',
            minify: isDevelopment ? false : 'esbuild',
            // extractCSS: true,
            sourcemap: false,

            // lib: {
            //     entry: 'src/main.tsx',
            //     formats: ['umd', 'es', 'cjs'],
            //     name: 'bill-payment',
            //     fileName: (ext) => `index.${ext}.js`,
            // },
        },
    };
});
