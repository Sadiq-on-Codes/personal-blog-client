<template>
  <div
    :class="[
      {
        'flex-col': layout === 'vertical' || isMobileOrTablet,
        'flex-row': layout === 'horizontal' && !isMobileOrTablet,
        'flex-col-reverse': (layout === 'vertical' || isMobileOrTablet) && reverse,
        'flex-row-reverse': layout === 'horizontal' && reverse && !isMobileOrTablet
      },
      'flex h-fit bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg'
    ]"
  >
    <div
      v-if="isLoading"
      :class="[
        {
          'w-full': layout === 'vertical' || isMobileOrTablet,
          'w-1/2': layout === 'horizontal' && !isMobileOrTablet,
        },
        'animate-pulse bg-gray-300 dark:bg-gray-700',
        layout === 'horizontal' && !isMobileOrTablet ? 'h-[200px]' : 'h-[300px]'
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
        layout === 'horizontal' && !isMobileOrTablet ? 'h-[200px]' : 'h-[300px]'
      ]"
      :src="blogPostImageUrl"
      :alt="blogPost.title"
    />

    <div :class="[
      { 'gap-2': isHalfHeight },
      { 'gap-1.5': layout === 'horizontal' && !isMobileOrTablet },
      'flex flex-col gap-2 flex-1 p-6'
    ]">
      <!-- Author and date -->
      <div v-if="isBlog && isLoading" class="h-5 w-1/3 bg-gray-300 dark:bg-gray-700 animate-pulse rounded"></div>
      <div v-else-if="isBlog" class="text-sm text-[--color-post-primary]">
        <span class="font-semibold">{{ blogPost.author }}</span>
        <span class="mx-2">•</span>
        <span class="font-medium">{{ blogPost.date }}</span>
      </div>
      
      <!-- Title -->
      <div v-if="isLoading" class="h-7 w-3/4 bg-gray-300 dark:bg-gray-700 animate-pulse rounded"></div>
      <h2 v-else :class="[
        'font-bold text-gray-800 dark:text-white',
        layout === 'horizontal' && !isMobileOrTablet ? 'text-lg' : 'text-xl'
      ]">
        {{ blogPost.title }}
      </h2>
      
      <!-- Description -->
      <div v-if="isLoading" class="space-y-2">
        <div class="h-4 bg-gray-300 dark:bg-gray-700 animate-pulse rounded"></div>
        <div class="h-4 bg-gray-300 dark:bg-gray-700 animate-pulse rounded"></div>
        <div class="h-4 w-2/3 bg-gray-300 dark:bg-gray-700 animate-pulse rounded"></div>
      </div>
      <div v-else-if="isBlog" :ref="descriptionContainer" class="leading-relaxed"></div>
      <div v-else-if="isProject" class="text-gray-600 dark:text-gray-300 text-base leading-relaxed">{{ blogPost.description.slice(0, 100) + '...' }}</div>
      
      <!-- Tags -->
      <div v-if="isLoading" class="flex gap-2 mt-2">
        <div v-for="i in 3" :key="i" class="h-6 w-16 bg-gray-300 dark:bg-gray-700 animate-pulse rounded-full"></div>
      </div>
      <div v-else class="flex flex-wrap gap-2 mt-2">
        <span
          v-for="tag in blogPost.tags"
          :key="tag._id"
          :style="{ color: tag.textColor, backgroundColor: tag.bgColor }"
          class="rounded-full text-xs px-3 py-1 font-medium"
        >
          {{ tag.tag }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineProps, computed } from 'vue'
import { CLOUDINARY_URL, initializeQuill } from '@/utils'
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
  isProject: {
    type: Boolean,
    default: false
  },
  isLoading: {
    type: Boolean,
    default: false
  }
})

const isMobileOrTablet = ref(false)
const descriptionContainer = ref<any>(null)

const blogPostImageUrl = computed(() => 
  props.blogPost.image ? `${CLOUDINARY_URL}${props.blogPost.image}` : ''
)
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