import { createRouter, createWebHistory } from 'vue-router'
import { isAuthenticated } from '@/utils/auth'

const routes = [
  { 
    path: '/', 
    component: () => import('@/views/BlogComponent.vue'), 
    name: 'Home' 
  },
  { 
    path: '/about', 
    component: () => import('@/views/AboutComponent.vue'), 
    name: 'AboutComponent' 
  },
  { 
    path: '/projects', 
    component: () => import('@/views/ProjectsComponent.vue'), 
    name: 'ProjectsComponent' 
  },
  { 
    path: '/blog', 
    component: () => import('@/views/BlogComponent.vue'), 
    name: 'BlogComponent' 
  },
  { 
    path: '/newsletter', 
    component: () => import('@/views/NewsLetterComponent.vue'), 
    name: 'NewsLetterComponent' 
  },
  { 
    path: '/unsubscribe/:id', 
    component: () => import('@/views/UnsubscribeComponent.vue'), 
    name: 'UnsubscribeComponent' 
  },
  {
    path: '/blog-details/:id',
    name: 'BlogDetailsPage',
    component: () => import('@/views/BlogDetailsPage.vue'),
    props: true
  },
  { 
    path: '/register', 
    component: () => import('@/views/Admin/AuthenticationComponent.vue') 
  },
  { 
    path: '/posts', 
    component: () => import('@/views/Admin/PostsComponent.vue') 
  },
  {
    path: '/dashboard',
    component: () => import('@/views/Admin/DashboardComponent.vue'),
    meta: { requiresAuth: true },
    children: [
      { path: '', component: () => import('@/views/Admin/DashboardComponent.vue') },
      { path: 'view-posts', component: () => import('@/views/Admin/PostsComponent.vue') },
      { path: 'add-posts', component: () => import('@/views/Admin/AddPost.vue') },
      { path: 'view-tags', component: () => import('@/views/Admin/ViewTags.vue') },
      { path: 'add-tags', component: () => import('@/views/Admin/AddTag.vue') },
      { path: 'view-subscribers', component: () => import('@/views/Admin/ViewSubscribers.vue') }
    ]
  },
  {
    path: '/privacy-policy',
    name: 'PrivacyPolicy',
    component: () => import('@/views/PrivacyPolicy.vue')
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

