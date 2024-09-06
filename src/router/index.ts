import AboutComponent from '@/views/AboutComponent.vue'
import AddPost from '@/views/Admin/AddPost.vue'
import AuthenticationComponent from '@/views/Admin/AuthenticationComponent.vue'
import DashboardComponent from '@/views/Admin/DashboardComponent.vue'
import PostsComponent from '@/views/Admin/PostsComponent.vue'
import BlogComponent from '@/views/BlogComponent.vue'
import BlogDetailsPage from '@/views/BlogDetailsPage.vue'
import NewsLetterComponent from '@/views/NewsLetterComponent.vue'
import ProjectsComponent from '@/views/ProjectsComponent.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', component: BlogComponent, name: 'BlogComponent' },
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
    children: [
      { path: 'home', component: DashboardComponent },
      { path: 'view-posts', component: PostsComponent },
      { path: 'add-posts', component: AddPost }
    ]
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})

// router.beforeEach((to, from, next) => {
//   const token = localStorage.getItem('token');
//   if (to.path !== '/login' && to.path !== '/register' && !token) {
//     next('/login');
//   } else {
//     next();
//   }
// });
