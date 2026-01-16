import 'reflect-metadata';
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
// 通用字体
import 'vfonts/Lato.css'
// 等宽字体（代码显示）
import 'vfonts/FiraCode.css'

const app = createApp(App)
app.use(router)
app.use(createPinia())
app.mount('#app')