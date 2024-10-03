<template>
  <h2
    :class="[
      'font-bold text-center transition-all duration-300',
      'border-t-2 border-b-2',
      `text-${size}`,
      `text-${align}`,
      'dark:text-[--color-text-dark]',
      'dark:border-[--color-border-dark]',
      'hover:tracking-wider'
    ]"
    :style="{
      borderColor: 'var(--color-border)',
      padding: `var(--spacing) 0`,
      marginTop: 'var(--spacing)',
      marginBottom: '2rem',
      zIndex: zIndex
    }"
  >
    {{ text }}
  </h2>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  text: {
    type: String,
    required: true
  },
  align: {
    type: String,
    default: 'left'
  },
  size: {
    type: String,
    default: '4xl'
  },
  zIndex: {
    type: Number,
    default: 10
  }
})
</script>

<style scoped>
h2 {
  position: relative;
  overflow: hidden;
}

h2::before,
h2::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 2px;
  background-color: var(--color-border);
  transition: transform 0.3s ease-in-out;
}

h2::before {
  top: 0;
  left: -100%;
}

h2::after {
  bottom: 0;
  right: -100%;
}

h2:hover::before {
  transform: translateX(100%);
}

h2:hover::after {
  transform: translateX(-100%);
}

.dark h2::before,
.dark h2::after {
  background-color: var(--color-border-dark);
}
</style>
