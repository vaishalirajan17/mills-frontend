import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import './index.css'
import Mill from './views/Mill.vue'
import { createWebHistory, createRouter } from "vue-router";
import ViewDetails from './views/ViewDetails.vue'
import Mapper from './views/Mapper.vue'
import Reset from './views/Reset.vue'
import login from './components/login.vue'
import Registeration from './components/Registeration.vue'
import EditDetails from './views/EditDetails.vue'
import OperationalRemarks from './views/OperationalRemarks.vue'
import EditRotorDetails from './views/EditRotorDetails.vue'


const routes = [
    { path: '/', component: ViewDetails },
    { path: '/history', component: ViewDetails },
    { path: '/reset', component: Reset },
    { path: '/mapper', component: Mapper},
    { path: '/mill', component: Mill },
    { path: '/login', component: login },
    { path: '/registeration', component: Registeration },
    { path: '/edit', component: EditDetails},
    {path: '/operation', component: OperationalRemarks},
    {path: '/editrotor', component: EditRotorDetails}
  ]

const router = createRouter({
    history: createWebHistory(),
    routes: routes, 
})


const app = createApp(App);
app.use(router)

app.mount("#app");