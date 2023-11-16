import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Book from '../views/Book.vue'
import AllBooks from '../views/AllBooks.vue'
import Log from '../views/Log.vue'
import Types from '../views/Types.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/:book',
    name: 'book',
    component: Book
  },
  {
    path:'/AllBooks',
    name: 'allBooks',
    component: AllBooks
  },
  {
    path: '/Log-in',
    name: 'LogPage',
    component: Log
  },
  {
    path: '/section/:type',
    name: 'sectionSearch',
    component: Types
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
