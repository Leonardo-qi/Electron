import { createApp } from 'vue'
import '../static/css/style.css'
import App from './App.vue'
import router from './router'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/index.css';
import { ElLoading } from "element-plus";



const app = createApp(App)

app.use(ElementPlus)

// 注入路由
app.use(router)

app.mount('#app')

ElLoading.service({
    lock: true,
    text: "Loading",
    background: "rgba(0, 0, 0, 0.7)"
});
