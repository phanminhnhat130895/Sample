import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginComponent from '../components/login/login.vue'
import MainComponent from '../components/main/main.vue'
import UserComponent from '../components/user/user.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Login',
    component: LoginComponent
    // name: 'Home',
    // component: Home
  },
  {
    path: '/main',
    name: 'Main',
    component: MainComponent,
    children: [
      { path: 'user', component: UserComponent, meta: { authorization: ['Super Admin', 'Admin'] } }
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
