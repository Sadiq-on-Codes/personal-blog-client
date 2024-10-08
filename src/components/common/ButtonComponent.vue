<!-- components/Button.vue -->
<template>
  <button
    type="button"
    :class="buttonClass"
    :aria-label="ariaLabel"
    @click="handleClick"
    :disabled="loading"
  >
    <div class="flex items-center justify-center">
      <span><slot></slot></span>
      <svg v-if="loading" class="animate-spin h-5 w-5 ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </div>
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
  loading: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:modelValue']);

const handleClick = (event: Event) => {
  emit('update:modelValue', event);
};
</script>
