import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import StudentProfile from '../pages/StudentProfile.vue'
import Electives from '../pages/Electives.vue'
import AppOptions from '../AppOptions.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/options', name: 'Options', component: AppOptions },
  { path: '/profile', name: 'Profile', component: StudentProfile },
  { path: '/electives', name: 'Electives', component: Electives },
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})
