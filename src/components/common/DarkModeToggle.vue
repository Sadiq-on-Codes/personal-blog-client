<template>
  <div class="flex items-center gap-[--spacing]">
    <span v-if="showText" class="text-sm font-medium">
      {{ isDarkMode ? 'Dark mode' : 'Light mode' }}
    </span>
    
    <button
      @click="toggleDarkMode"
      :class="[ 
        'relative inline-flex items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
        reduceSize ? 'w-12 h-6' : 'w-14 h-7',
        isDarkMode ? 'bg-[--color-post-primary]' : 'bg-gray-200'
      ]"
      :aria-label="`Switch to ${isDarkMode ? 'light' : 'dark'} mode`"
    >
      <span
        :class="[
          'inline-block rounded-full bg-white shadow transform transition-transform duration-300',
          reduceSize ? 'w-5 h-5' : 'w-6 h-6',
          isDarkMode ? (reduceSize ? 'translate-x-6' : 'translate-x-7') : 'translate-x-1'
        ]"
      >
        <component
          :is="isDarkMode ? SunIcon : MoonIcon"
          :class="[
            'w-full h-full text-gray-400',
            isDarkMode ? 'text-yellow-500' : 'text-indigo-600'
          ]"
        />
      </span>
    </button>
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
