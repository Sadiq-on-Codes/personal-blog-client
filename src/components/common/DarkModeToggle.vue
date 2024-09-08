<template>
  <div class="flex items-center gap-[--spacing]">
    <span v-if="showText">{{ !isDarkMode ? 'Light mode' : 'Dark mode' }}</span>
    <div
      :class="{ 'h-8 w-16': reduceSize }"
      class="flex items-center justify-around w-28 h-12 rounded-full cursor-pointer dark:bg-[--color-background] bg-[--color-background-dark]"
    >
      <SunIcon
        v-if="isDarkMode"
        :stroke="isDarkMode ? '#090D1F' : '#ffffff'"
        @click="toggleDarkMode"
      />
      <MoonIcon v-else :stroke="isDarkMode ? '#090D1F' : '#ffffff'" @click="toggleDarkMode" />
    </div>
  </div>
</template>

<script setup lang="ts">
import MoonIcon from '@/components/icons/MoonIcon.vue'
import SunIcon from '@/components/icons/SunIcon.vue'
import { inject } from 'vue'

defineProps({
  reduceSize: {
    type: Boolean,
    default: false
  },
  showText: {
    type: Boolean,
    default: false
  }
})

const toggleDarkMode = inject('toggleDarkMode') as () => void
const isDarkMode = inject('isDarkMode') as boolean
</script>

<style scoped>
/* Add any necessary styles here */
</style>
