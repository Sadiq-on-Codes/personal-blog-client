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
    <img
      :class="[
        {
          'h-1/2 w-full': isHalfHeight && (layout === 'vertical' || isMobileOrTablet),
          'h-full w-1/2': layout === 'horizontal' && !isMobileOrTablet,
          'h-full w-full': !isHalfHeight && (layout === 'vertical' || isMobileOrTablet)
        },
        'object-cover'
      ]"
      :src="`${apiUrl}${blogPost.image}`"
      alt=""
    />
    <div :class="[{ 'gap-1.5': isHalfHeight }, 'flex flex-col gap-[--spacing] flex-1']">
      <div v-if="isBlog" class="text-sm text-[--color-post-primary]">
        <span class="font-semibold">{{ blogPost.author }}</span>
        <span class="ml-0.5">•</span>
        <span class="ml-0.5 font-semibold">{{ blogPost.date }}</span>
      </div>
      <span
        class="text-sm text-[--color-post-secondary2] dark:text-[--color-text-dark] font-semibold"
        >{{ blogPost.title }}</span
      >
      <div v-html="formattedDescription" class="text-[--color-post-secondary] text-lg"></div>
      <div>
        <span
          v-for="item in blogPost.pins"
          :key="item.pin"
          :class="[`bg-${item.bgColor}`, `text-${item.textColor}`, 'rounded-full mr-2 text-sm']"
          >{{ item.pin }}</span
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { defineProps } from 'vue'
import { apiUrl } from '@/utils'
import Quill from 'quill'
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
      pins: []
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
  }
})

const isMobileOrTablet = ref(false)

const checkIsMobileOrTablet = () => {
  isMobileOrTablet.value = window.innerWidth <= 1024 // Adjust breakpoint for tablets
}

onMounted(() => {
  checkIsMobileOrTablet()
  window.addEventListener('resize', checkIsMobileOrTablet)
})

// Convert Quill Delta to HTML
const deltaToHtml = (delta: any): string => {
  const quill = new Quill(document.createElement('div'))
  quill.setContents(delta)
  return quill.root.innerHTML
}

// Convert Delta to HTML string
const formattedDescription = computed(() => {
  return deltaToHtml(props.blogPost.description)
})
</script>

<style scoped></style>
