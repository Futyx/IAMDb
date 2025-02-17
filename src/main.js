import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import Routes from    './routes.js'
import App from './App.vue'
// import router from './router'

// const router = createRouter()
const app = createApp(App)
const pinia = createPinia();  
const goBack = () => {
    router.go(-1);
  };
const router = createRouter({
    history: createWebHistory(),
    routes: Routes
})

app.use(pinia) 
app.use(router)
app.use(goBack)

app.mount('#app')
