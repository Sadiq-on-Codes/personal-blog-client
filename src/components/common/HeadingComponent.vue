<template>
  <h2
    class="mt-[--spacing] py-[--spacing] sm:text-9xl text-5xl text-center border-t-2 border-b-2 border-[--color-border] dark:text-[--color-text-dark] dark:border-[--color-border-dark]"
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
    default: 'text-2xl'
  },
  zIndex: {
    type: Number,
    default: 10
  }
})
</script>

<style scoped></style>
