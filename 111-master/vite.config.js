import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'


export default defineConfig({
    plugins: [
        vue(),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    server: {
        proxy: {
            '/api': {
                target: 'http://47.116.114.170:30001', // 你的后端接口地址
                changeOrigin: true, // 对于虚拟托管的站点，这个参数是必须的
                rewrite: (path) => path.replace(/^\/api/, ''), // 可选，根据你的后端接口是否需要去掉前缀
            },
        },
    },
})