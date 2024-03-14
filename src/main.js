import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import './index.css'
import Mill from './views/Mill.vue'
import { createWebHistory, createRouter } from "vue-router";
import ViewDetails from './views/ViewDetails.vue'
import Mapper from './views/Mapper.vue'
import Reset from './views/Reset.vue'


const routes = [
    { path: '/', component: Mill },
    { path: '/history', component: ViewDetails },
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