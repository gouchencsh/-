import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import pinia from './store/pinia'


createApp(App)
    .use(router)
    .use(ElementPlus)
    .use(pinia)
 .mount('#app')

