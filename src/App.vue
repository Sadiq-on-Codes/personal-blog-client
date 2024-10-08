<template>
  <div :class="{ dark: isDarkMode }" class="bg-[--color-background-white] w-full">
    <HeaderComponent v-if="showHeader" />
    <router-view />
    <FooterComponent v-if="showFooter" />
    <button
      v-if="showSubscribeButton"
      @click="goToNewsletter"
      class="subscribe-button fixed bottom-6 right-6 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl flex items-center space-x-2"
    >
      <span class="text-lg">Subscribe</span>
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, provide, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import HeaderComponent from './components/HeaderComponent.vue'
import FooterComponent from './components/FooterComponent.vue'
import { useSEO } from './utils/seoComposable';

const isDarkMode = ref(false)
const route = useRoute()
const router = useRouter()

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
  document.documentElement.classList.toggle('dark', isDarkMode.value)
  localStorage.setItem('darkMode', JSON.stringify(isDarkMode.value))
}

provide('toggleDarkMode', toggleDarkMode)
provide('isDarkMode', isDarkMode)

onMounted(() => {
  const storedDarkMode = JSON.parse(localStorage.getItem('darkMode') || 'false')
  isDarkMode.value = storedDarkMode
  document.documentElement.classList.toggle('dark', storedDarkMode)
})

const hideOnRoutes = [
  '/register',
  '/dashboard',
  '/dashboard/home',
  '/dashboard/add-posts',
  '/dashboard/view-posts',
  '/dashboard/view-projects',
  '/dashboard/view-tags',
  '/dashboard/add-tags',
  '/dashboard/view-subscribers',
]

const hideSubscriptionButton = ['/newsletter']

const showHeader = computed(() => !hideOnRoutes.includes(route.path))
const showFooter = computed(() => !hideOnRoutes.includes(route.path))
const showSubscribeButton = computed(() => !hideSubscriptionButton.includes(route.path))

useSEO(
  'Sadiq on Codes', 
  'Explore web development insights, coding projects, and tech tutorials by Sadiq. Learn about frontend frameworks, backend technologies, and software engineering best practices.',
  'Africa'
)

const goToNewsletter = () => {
  router.push('/newsletter')
}
</script>

<style scoped>
.subscribe-button {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(147, 51, 234, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(147, 51, 234, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(147, 51, 234, 0);
  }
}

/* Add your styles here */
* {
  /* outline: 1px solid red; */
}
</style>
