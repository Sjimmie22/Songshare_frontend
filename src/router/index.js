import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/songs',
    name: 'songs',
    component: () => import('../views/SongsView.vue')
  },
  {
    path: '/your-songs',
    name: 'your-songs',
    component: () => import('../views/YourSongsView.vue')
  },
  {
    path: '/edit/:id',
    name: 'editSong',
    component: () => import('../views/EditView.vue')
  },
  {
    path: '/websocket',
    name: 'websocket',
    component: () => import('../views/Web-Socket.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
