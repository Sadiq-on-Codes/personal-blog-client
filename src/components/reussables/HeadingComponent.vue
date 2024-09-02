<template>
  <h2 :class="computedClass">{{ text }}</h2>
</template>

<script setup>
import { computed, defineProps } from 'vue'

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

const computedClass = computed(() => {
  return `${props.size} text-${props.align} z-${props.zIndex}`
})
</script>

<style scoped>

</style>
