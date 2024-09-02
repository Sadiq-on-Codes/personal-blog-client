import AboutComponent from '@/components/AboutComponent.vue'
import BlogComponent from '@/components/BlogComponent.vue'
import NewsLetterComponent from '@/components/NewsLetterComponent.vue'
import ProjectsComponent from '@/components/ProjectsComponent.vue'
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
