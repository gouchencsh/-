import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import pinia from './store/pinia'
import * as ElIconModules from '@element-plus/icons-vue'

const app = createApp(App); 
app.use(router)
app.use(ElementPlus)
app.use(pinia)
for (const [key, component] of Object.entries(ElIconModules)) {
    app.component(key, component);
  }

app.mount('#app')

