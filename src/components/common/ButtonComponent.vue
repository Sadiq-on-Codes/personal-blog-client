<!-- components/Button.vue -->
<template>
  <button
    type="button"
    :class="buttonClass"
    :aria-label="ariaLabel"
    @click="handleClick"
    :disabled="loading"
  >
    <LoaderComponent :isLoading="loading" v-if="loading" />
    <span v-else><slot></slot></span>
  </button>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import LoaderComponent from './LoaderComponent.vue';

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
