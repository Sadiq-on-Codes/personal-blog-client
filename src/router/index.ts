import AboutComponent from '@/components/AboutComponent.vue'
import ArticlesComponent from '@/components/ArticlesComponent.vue'
import ProjectsComponent from '@/components/ProjectsComponent.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', component: AboutComponent },
  { path: '/about', component: AboutComponent },
  { path: '/projects', component: ProjectsComponent },
  { path: '/articles', component: ArticlesComponent }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})
