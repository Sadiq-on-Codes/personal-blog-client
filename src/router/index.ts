import AboutComponent from '@/views/AboutComponent.vue'
import BlogComponent from '@/views/BlogComponent.vue'
import NewsLetterComponent from '@/views/NewsLetterComponent.vue'
import ProjectsComponent from '@/views/ProjectsComponent.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', component: AboutComponent },
  { path: '/about', component: AboutComponent },
  { path: '/projects', component: ProjectsComponent },
  { path: '/blog', component: BlogComponent },
  { path: '/newsletter', component: NewsLetterComponent }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})
