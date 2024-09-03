<template>
  <div
    :class="{ 'flex-col': !isHalfHeight }"
    class="flex gap-[--spacing] mt-[--spacing] h-full"
  >
    <img :class="{ 'h-1/2': isHalfHeight }" :src="blogPost.image" alt="" class="object-cover w-full" />
    <div :class="{ 'gap-1.5': isHalfHeight }" class="flex flex-col gap-[--spacing]">
      <div class="text-sm text-[--color-post-primary]">
        <span class="font-semibold">{{ blogPost.author }}</span>
        <span class="ml-0.5">•</span>
        <span class="ml-0.5 font-semibold">{{ blogPost.date }}</span>
      </div>
      <span
        class="text-sm text-[--color-post-secondary2] dark:text-[--color-text-dark] font-semibold"
        >{{ blogPost.title }}</span
      >
      <span :class="{ 'text-sm': isHalfHeight }" class="text-[--color-post-secondary] text-lg">{{ blogPost.description }}</span>
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
import { defineProps } from 'vue'

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
  }
})
</script>

<style scoped>
/* Additional styles, if any */
</style>
