<template>
  <div class="flex h-12 gap-2">
    <div class="sm:hidden flex items-center justify-between w-full">
      <span class="font-semibold">Yahaya A. Sadick</span>
      <button @click="toggleMenu" v-if="!isMenuOpen" class="text-2xl justify-self-end">☰</button>
    </div>

    <div class="items-center w-full h-full sm:flex hidden">
      <div class="w-full text-xl">
        <span class="font-semibold">Yahaya A. Sadick</span>
      </div>
      <div class="flex text-xl items-center justify-end gap-[--spacing] mx-10 w-full">
        <router-link
          v-for="(menuItem, index) in menuItems"
          :key="index"
          :to="{ name: menuItem.routeName }"
          class="hover:underline"
          active-class="underline font-semibold"
          exact-active-class="underline font-semibold"
        >
          {{ menuItem.name }}
        </router-link>
        <DarkModeToggle />
      </div>
    </div>
    <div
      v-if="isMenuOpen"
      class="fixed inset-0 flex flex-col items-center justify-center gap-[--spacing] dark:bg-[--color-background-dark] bg-[--color-background] text-xl z-50"
    >
      <router-link
        v-for="(menuItem, index) in menuItems"
        :key="index"
        :to="{ name: menuItem.routeName }"
        class="hover:underline"
        active-class="underline"
        exact-active-class="underline"
        @click="isMenuOpen = false"
      >
        {{ menuItem.name }}
      </router-link>
      <DarkModeToggle />

      <CloseIcon :fill="isDarkMode ? '#fff' : '#090D1F'" @click="isMenuOpen = false" />
    </div>
  </div>
</template>

<script setup lang="ts">
import CloseIcon from '@/components/icons/CloseIcon.vue'
import { inject, ref } from 'vue'
import DarkModeToggle from './common/DarkModeToggle.vue'

const isDarkMode = inject('isDarkMode') as boolean

const isMenuOpen = ref(false)
const menuItems = [
  { name: 'Blog', routeName: 'BlogComponent' },
  { name: 'Projects', routeName: 'ProjectsComponent' },
  { name: 'About Me', routeName: 'AboutComponent' },
  { name: 'Newsletter', routeName: 'NewsLetterComponent' }
]

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<style scoped>
/* Add your styles here */
</style>
