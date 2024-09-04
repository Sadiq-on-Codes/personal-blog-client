<template>
  <div :class="{ dark: isDarkMode }" class="bg-[--color-background-white]">
    <HeaderComponent />
    <router-view />
    <FooterComponent />
  </div>
</template>

<script setup lang="ts">
import { ref, provide, onMounted } from 'vue'
import HeaderComponent from './components/HeaderComponent.vue'
import FooterComponent from './components/FooterComponent.vue'

const isDarkMode = ref(false)

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
</script>

<style scoped>
/* Add your styles here */
</style>
