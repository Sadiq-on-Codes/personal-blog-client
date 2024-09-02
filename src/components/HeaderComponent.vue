<template>
  <div class="flex h-12 gap-2">
    <button @click="toggleMenu" v-if="!isMenuOpen" class="text-2xl sm:hidden justify-self-end">☰</button>

    <div class="items-center w-full h-full sm:flex hidden">
      <div class="w-full text-xl">
        <span>Yahaya A. Sadick</span>
      </div>
      <div class="flex text-xl items-center justify-end gap-[--spacing] mx-10 w-full">
        <router-link
          v-for="(menuItem, index) in ['Blog', 'Projects', 'About', 'Newsletter']"
          :key="index"
          :to="menuItem.toLowerCase()"
          class="hover:underline"
          active-class="underline"
          exact-active-class="underline"
        >
          {{ menuItem }}
        </router-link>
        <div
          class="flex items-center justify-around w-28 h-12 dark:bg-[--color-background] bg-[--color-background-black] rounded-full"
        >
          <SunIcon
            v-if="isDarkMode"
            :stroke="isDarkMode ? '#090D1F' : '#ffffff'"
            @click="toggleDarkMode"
          />
          <MoonIcon v-else :stroke="isDarkMode ? '#090D1F' : '#ffffff'" @click="toggleDarkMode" />
        </div>
      </div>
    </div>
    <div
      v-if="isMenuOpen"
      class="flex gap-[--spacing] justify-center w-full h-screen flex-col text-xl items-center sm:hidden"
    >
      <router-link
        v-for="(menuItem, index) in ['Blog', 'Projects', 'About', 'Newsletter']"
        :key="index"
        :to="menuItem.toLowerCase()"
        class="hover:underline"
        active-class="underline"
        exact-active-class="underline"
      >
        {{ menuItem }}
      </router-link>
      <div
        class="flex items-center justify-around w-28 h-12 dark:bg-[--color-background] bg-[--color-background-black] rounded-full"
      >
        <SunIcon
          v-if="isDarkMode"
          :stroke="isDarkMode ? '#090D1F' : '#ffffff'"
          @click="toggleDarkMode"
        />
        <MoonIcon v-else :stroke="isDarkMode ? '#090D1F' : '#ffffff'" @click="toggleDarkMode" />
      </div>

      <CloseIcon :fill="isDarkMode ? '#fff' : '#090D1F'" @click="isMenuOpen = false" />
    </div>
  </div>
</template>

<script setup lang="ts">
import CloseIcon from '@/assets/CloseIcon.vue';
import MoonIcon from '@/assets/MoonIcon.vue'
import SunIcon from '@/assets/SunIcon.vue'
import { inject, ref } from 'vue'

const toggleDarkMode = inject('toggleDarkMode') as () => void
const isDarkMode = inject('isDarkMode') as boolean

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<style scoped>
/* Add your styles here */
</style>
