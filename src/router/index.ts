import AboutComponent from '@/views/AboutComponent.vue'
import AddPost from '@/views/Admin/AddPost.vue'
import AuthenticationComponent from '@/views/Admin/AuthenticationComponent.vue'
import DashboardComponent from '@/views/Admin/DashboardComponent.vue'
import PostsComponent from '@/views/Admin/PostsComponent.vue'
import BlogComponent from '@/views/BlogComponent.vue'
import BlogDetailsPage from '@/views/BlogDetailsPage.vue'
import NewsLetterComponent from '@/views/NewsLetterComponent.vue'
import ProjectsComponent from '@/views/ProjectsComponent.vue'
import PrivacyPolicy from '@/views/PrivacyPolicy.vue'
import { createRouter, createWebHistory } from 'vue-router'

// Add this import for the authentication check
import { isAuthenticated } from '@/utils/auth' // You'll need to create this utility function

const routes = [
  { path: '/', component: BlogComponent, name: 'Home' },
  { path: '/about', component: AboutComponent, name: 'AboutComponent' },
  { path: '/projects', component: ProjectsComponent, name: 'ProjectsComponent' },
  { path: '/blog', component: BlogComponent, name: 'BlogComponent' },
  { path: '/newsletter', component: NewsLetterComponent, name: 'NewsLetterComponent' },
  {
    path: '/blog-details/:id',
    name: 'BlogDetailsPage',
    component: BlogDetailsPage,
    props: true
  },
  { path: '/register', component: AuthenticationComponent },
  { path: '/posts', component: PostsComponent },
  {
    path: '/dashboard',
    component: DashboardComponent,
    meta: { requiresAuth: true },
    children: [
      { path: '', component: DashboardComponent }, // Add default child route
      { path: 'view-posts', component: PostsComponent },
      { path: 'add-posts', component: AddPost }
    ]
  },
  {
    path: '/privacy-policy',
    name: 'PrivacyPolicy',
    component: PrivacyPolicy
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated()) {
      next({ path: '/register', query: { redirect: to.fullPath } })
    } else {
      next()
    }
  } else {
    next()
  }
})

