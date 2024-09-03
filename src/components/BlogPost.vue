<template>
    <div
      :class="[
        {
          'flex-col': layout === 'vertical',
          'flex-row': layout === 'horizontal',
          'flex-col-reverse': layout === 'vertical' && reverse,
          'flex-row-reverse': layout === 'horizontal' && reverse
        },
        'flex gap-[--spacing] mt-[--spacing] h-fit'
      ]"
    >
      <img
        :class="[
          {
            'h-1/2 w-full': isHalfHeight && layout === 'vertical',
            'h-full w-1/2': isHalfHeight && layout === 'horizontal',
            'h-full w-full': !isHalfHeight && layout === 'vertical',
            'h-full w-1/2': !isHalfHeight && layout === 'horizontal'
          },
          'object-cover'
        ]"
        :src="blogPost.image"
        alt=""
      />
      <div :class="[{ 'gap-1.5': isHalfHeight }, 'flex flex-col gap-[--spacing] flex-1']">
        <div class="text-sm text-[--color-post-primary]">
          <span class="font-semibold">{{ blogPost.author }}</span>
          <span class="ml-0.5">•</span>
          <span class="ml-0.5 font-semibold">{{ blogPost.date }}</span>
        </div>
        <span
          class="text-sm text-[--color-post-secondary2] dark:text-[--color-text-dark] font-semibold"
          >{{ blogPost.title }}</span
        >
        <span :class="{ 'text-sm': isHalfHeight }" class="text-[--color-post-secondary] text-lg">{{
          blogPost.description
        }}</span>
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
    },
    layout: {
      type: String,
      default: 'vertical', // Options: 'vertical' (image top), 'horizontal' (image left)
      validator: (value: string) => ['vertical', 'horizontal'].includes(value)
    },
    reverse: {
      type: Boolean,
      default: false // If true, reverses the order of image and content
    }
  })
  </script>
  
  <style scoped>
  /* Additional styles, if any */
  </style>
  