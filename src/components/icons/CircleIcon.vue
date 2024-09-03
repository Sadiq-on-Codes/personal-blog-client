<template>
  <svg
    :width="width"
    :height="height"
    viewBox="0 0 9 9"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="4.5"
      cy="4.5"
      r="4.5"
      :fill="fill"
    />
  </svg>
</template>

<script setup lang="ts">
const props = defineProps({
  width: {
    type: String,
    default: '9' // Default width if not provided
  },
  height: {
    type: String,
    default: '9' // Default height if not provided
  },
  fill: {
    type: String,
    default: '#E63E21' // Default fill color if not provided
  }
});
</script>

<style scoped></style>
