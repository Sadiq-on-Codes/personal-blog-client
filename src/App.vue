<template>
  <div :class="{ dark: isDarkMode }" class="bg-[--color-background-white]">
    <!-- Conditionally render the header based on the current route -->
    <HeaderComponent v-if="showHeader" />
    <router-view />
    <!-- Conditionally render the footer based on the current route -->
    <FooterComponent v-if="showFooter" />
  </div>
</template>

<script setup lang="ts">
import { ref, provide, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import HeaderComponent from './components/HeaderComponent.vue'
import FooterComponent from './components/FooterComponent.vue'

const isDarkMode = ref(false)
const route = useRoute()

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
]


const showHeader = computed(() => !hideOnRoutes.includes(route.path))
const showFooter = computed(() => !hideOnRoutes.includes(route.path))
</script>

<style scoped>
/* Add your styles here */
</style>
