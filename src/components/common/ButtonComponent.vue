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
    default: 'px-4 h-12 w-full bg-[--color-post-primary] text-[--color-text-dark] rounded-xl',
  },
});

const emit = defineEmits(['update:modelValue']);

const handleClick = (event: Event) => {
  emit('update:modelValue', event);
};
</script>
