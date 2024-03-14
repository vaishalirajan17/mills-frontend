import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import './index.css'
import History from './views/History.vue'
import Mill from './views/Mill.vue'
import { createWebHistory, createRouter } from "vue-router";
import PrimeVue from 'primevue/config'
import Rotor from './views/ViewDetails.vue'
import View from './views/View_old.vue'
import Mapper from './views/Mapper.vue'
import Reset from './views/Reset.vue'


const routes = [
    { path: '/', component: Mill },
    { path: '/history', component: Rotor },
    { path: '/reset', component: Reset },
    { path: '/mapper', component: Mapper}
  ]

const router = createRouter({
    history: createWebHistory(),
    routes: routes, 
})


const app = createApp(App);
app.use(router)

app.mount("#app");