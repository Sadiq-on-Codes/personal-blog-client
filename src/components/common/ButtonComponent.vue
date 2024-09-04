<!-- components/Button.vue -->
<template>
  <button
    type=button
    :class="buttonClass"
    :aria-label="ariaLabel"
    @click="handleClick"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

defineProps({
  type: {
    type: String,
    default: 'button',
  },
  ariaLabel: {
    type: String,
    default: '',
  },
  buttonClass: {
    type: String,
    default: 'w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800',
  },
});

const emit = defineEmits(['update:modelValue']);

const handleClick = (event: Event) => {
  emit('update:modelValue', event);
};
</script>
