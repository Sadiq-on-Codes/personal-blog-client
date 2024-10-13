<template>
  <div :class="{ dark: isDarkMode }" class="bg-[--color-background-white] w-full">
    <HeaderComponent v-if="showHeader" />
    <router-view />
    <FooterComponent v-if="showFooter" />
    <button
      v-if="showSubscribeButton"
      @click="goToNewsletter"
      class="fixed bottom-4 right-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
    >
      Subscribe
    </button>

    <div v-if="!hasVisited">
      <NewsLetter :newsletterOverlay="true" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, provide, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import HeaderComponent from './components/HeaderComponent.vue'
import FooterComponent from './components/FooterComponent.vue'
import { useSEO } from './utils/seoComposable';
import NewsLetter from './components/NewsLetter.vue';

const isDarkMode = ref(false)
const route = useRoute()
const router = useRouter()
const hasVisited = ref(false)

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
  document.documentElement.classList.toggle('dark', isDarkMode.value)
  localStorage.setItem('darkMode', JSON.stringify(isDarkMode.value))
}

provide('toggleDarkMode', toggleDarkMode)
provide('isDarkMode', isDarkMode)

onMounted(() => {
  const storedDarkMode = JSON.parse(localStorage.getItem('darkMode') || 'false')
  hasVisited.value = localStorage.getItem('hasVisited') === 'true';
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
/* Add your styles here */
* {
  /* outline: 1px solid red; */
}
</style>
