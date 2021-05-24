import Vue from 'vue'
import VueRouter from 'vue-router'
import { configRoutes } from "./routes";


Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: configRoutes()
})

export default router;
