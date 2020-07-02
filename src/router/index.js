import Vue from 'vue'
import VueRouter from 'vue-router'
import navigationGuards from './navigationGuards'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Contacts',
    component: () => import('../views/Contacts.vue'),
    beforeEnter: navigationGuards
  },
  {
    path: '/Login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/registration',
    name: 'Registration',
    component: () => import('../views/Registration.vue')
  },
  {
    path: '*',
    beforeEnter: navigationGuards
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
