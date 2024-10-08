<template>
  <div v-if="isLoading" class="flex flex-col justify-center items-center h-64">
    <svg class="custom-loader" width="80" height="80" viewBox="0 0 80 80">
      <circle class="loader-circle" cx="40" cy="40" r="38" />
      <path class="loader-bracket left" d="M30,25 L20,40 L30,55" />
      <path class="loader-bracket right" d="M50,25 L60,40 L50,55" />
      <path class="loader-slash" d="M35,55 L45,25" />
    </svg>
    <p class="mt-4 text-lg font-medium text-gray-700 animate-pulse">
      {{ currentMessage }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref, onMounted, onUnmounted } from 'vue';
import { startMessageRotation } from '@/utils';

const props = defineProps<{
  isLoading: boolean;
}>();

const loadingMessages = [
  "Fetching the latest insights...",
  "Connecting neural pathways...",
  "Decoding the matrix...",
  "Analyzing quantum fluctuations...",
  "Consulting the digital oracle...",
];

const currentMessage = ref('');
let intervalId: number | null = null;
let messageTimeoutId: number | null = null;

onMounted(() => {
  if (props.isLoading) {
    messageTimeoutId = setTimeout(() => {
      currentMessage.value = loadingMessages[0];
      intervalId = startMessageRotation(loadingMessages, (message) => currentMessage.value = message);
    }, 4000);
  }
});

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId);
  }
  if (messageTimeoutId) {
    clearTimeout(messageTimeoutId);
  }
});
</script>

<style scoped>
.custom-loader {
  animation: rotate 4s linear infinite;
}

.loader-circle {
  fill: none;
  stroke: #3498db;
  stroke-width: 4;
  opacity: 0.3;
}

.loader-bracket {
  fill: none;
  stroke: #3498db;
  stroke-width: 4;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 60;
  stroke-dashoffset: 60;
  animation: dash 3s ease-in-out infinite;
}

.loader-bracket.right {
  animation-delay: 0.5s;
}

.loader-slash {
  fill: none;
  stroke: #3498db;
  stroke-width: 4;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 30;
  stroke-dashoffset: 30;
  animation: dash 3s ease-in-out infinite;
  animation-delay: 1s;
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash {
  0% {
    stroke-dashoffset: 60;
  }
  50% {
    stroke-dashoffset: 0;
  }
  100% {
    stroke-dashoffset: 60;
  }
}
</style>
