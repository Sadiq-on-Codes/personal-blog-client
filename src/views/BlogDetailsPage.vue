<template>
  <div class="flex flex-col-reverse sm:flex-row gap-[--spacing]">
    <div class="sm:w-1/3 w-full">
      <AllBlogPosts :horizontal="true" />
    </div>
    <div class="sm:w-2/3 w-full mt-14 flex flex-col gap-[--spacing]">
      <span class="text-sm text-[--color-post-primary] font-semibold">{{ blogDetails?.date }}</span>
      <span
        class="text-4xl text-[--color-post-secondary2] dark:text-[--color-text-dark] font-semibold"
        >{{ blogDetails?.title }}</span
      >
      <img :src="blogDetails?.image" alt="post image" />
      <span class="text-[--color-post-secondary] text-lg">{{ blogDetails?.description }}</span>
    </div>
  </div>
</template>
<script setup lang="ts">
import AllBlogPosts from '@/components/AllBlogPosts.vue'
import { blogPosts } from '@/data/blogPosts'
import type { BlogPost } from '@/types'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const blogDetails = ref<BlogPost | null>(
  blogPosts.find((post) => post.id === Number(route.params.id)) || null
)
</script>
<style></style>
