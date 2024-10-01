<template>
  <div
    :class="[
      {
        'flex-col': layout === 'vertical' || isMobileOrTablet,
        'flex-row': layout === 'horizontal' && !isMobileOrTablet,
        'flex-col-reverse': (layout === 'vertical' || isMobileOrTablet) && reverse,
        'flex-row-reverse': layout === 'horizontal' && reverse && !isMobileOrTablet
      },
      'flex gap-[--spacing] mt-[--spacing] h-fit'
    ]"
  >
    <!-- Skeleton for image -->
    <div
      v-if="isLoading"
      :class="[
        {
          'w-full': layout === 'vertical' || isMobileOrTablet,
          'w-1/2': layout === 'horizontal' && !isMobileOrTablet,
        },
        'animate-pulse bg-gray-300 dark:bg-gray-700',
        layout === 'horizontal' && !isMobileOrTablet ? 'h-[150px]' : 'h-[300px]'
      ]"
    ></div>
    <img
      v-else
      :class="[
        {
          'w-full': layout === 'vertical' || isMobileOrTablet,
          'w-1/2': layout === 'horizontal' && !isMobileOrTablet,
        },
        'object-cover',
        layout === 'horizontal' && !isMobileOrTablet ? 'h-[150px]' : 'h-[300px]'
      ]"
      :src="`${API_URL}/${blogPost.image}`"
      alt=""
    />
    <div :class="[{ 'gap-1.5': isHalfHeight }, 'flex flex-col gap-[--spacing] flex-1']">
      <!-- Skeleton for author and date -->
      <div v-if="isBlog && isLoading" class="h-4 w-1/3 bg-gray-300 dark:bg-gray-700 animate-pulse rounded"></div>
      <div v-else-if="isBlog" class="text-sm text-[--color-post-primary]">
        <span class="font-semibold">{{ blogPost.author }}</span>
        <span class="ml-0.5">•</span>
        <span class="ml-0.5 font-semibold">{{ blogPost.date }}</span>
      </div>
      
      <!-- Skeleton for title -->
      <div v-if="isLoading" class="h-6 w-3/4 bg-gray-300 dark:bg-gray-700 animate-pulse rounded"></div>
      <span v-else class="text-sm text-[--color-post-secondary2] dark:text-[--color-text-dark] font-semibold">
        {{ blogPost.title }}
      </span>
      
      <!-- Skeleton for description -->
      <div v-if="isLoading" class="space-y-2">
        <div class="h-4 bg-gray-300 dark:bg-gray-700 animate-pulse rounded"></div>
        <div class="h-4 bg-gray-300 dark:bg-gray-700 animate-pulse rounded"></div>
        <div class="h-4 w-2/3 bg-gray-300 dark:bg-gray-700 animate-pulse rounded"></div>
      </div>
      <div v-else-if="isBlog" :ref="descriptionContainer" class="text-[--color-post-secondary] text-lg"></div>
      <div v-else>{{ blogPost.description }}</div>
      
      <!-- Skeleton for tags -->
      <div v-if="isLoading" class="flex gap-2">
        <div v-for="i in 3" :key="i" class="h-6 w-16 bg-gray-300 dark:bg-gray-700 animate-pulse rounded-full"></div>
      </div>
      <div v-else>
        <span
          v-for="tag in blogPost.tags"
          :key="tag._id"
          :style="{ color: tag.textColor, backgroundColor: tag.bgColor }"
          class="rounded-full mr-2 text-sm px-2 py-1"
          >{{ tag.tag }}</span
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineProps } from 'vue'
import { API_URL, initializeQuill } from '@/utils'
import 'quill/dist/quill.snow.css'

const props = defineProps({
  blogPost: {
    type: Object,
    required: true,
    default: () => ({
      image: '',
      author: '',
      date: '',
      title: '',
      description: '',
      tags: []
    })
  },
  isHalfHeight: {
    type: Boolean,
    default: false
  },
  layout: {
    type: String,
    default: 'vertical', // Options: 'vertical' (image top), 'horizontal' (image left)
    validator: (value: string) => ['vertical', 'horizontal'].includes(value)
  },
  reverse: {
    type: Boolean,
    default: false // If true, reverses the order of image and content
  },
  isBlog: {
    type: Boolean,
    default: true
  },
  isLoading: {
    type: Boolean,
    default: false
  }
})

const isMobileOrTablet = ref(false)
const descriptionContainer = ref<any>(null)

const checkIsMobileOrTablet = () => {
  isMobileOrTablet.value = window.innerWidth <= 1024 // Adjust breakpoint for tablets
}

onMounted(() => {
  checkIsMobileOrTablet()
  window.addEventListener('resize', checkIsMobileOrTablet)
  
  if (props.isBlog && descriptionContainer.value) {
    initializeQuill(descriptionContainer.value, props.blogPost.description)
  }
})


</script>

<style scoped>
img {
  object-fit: cover;
}

@media (max-width: 1024px) {
  img {
    height: 300px !important;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
</style>