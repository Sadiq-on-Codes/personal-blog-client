<template>
  <div class="mt-[--spacing]">
    <span class="text-xl">Recent blog posts</span>
    <div class="grid grid-cols-2 gap-[--spacing]">
      <div>
        <BlogPost :blogPost="blogPosts[0]" />
      </div>

      <div class="flex flex-col gap-[--spacing]">
        <BlogPost :blogPost="blogPosts[1]" :isHalfHeight="true" />
        <BlogPost :blogPost="blogPosts[2]" :isHalfHeight="true" />
      </div>
    </div>
    <!-- <div>
      <BlogPost :blogPost="blogPosts[0]" />
    </div> -->
  </div>
</template>

<script setup lang="ts">
import { blogPosts } from '@/data/blogPosts'
import BlogPost from './BlogPost.vue'
</script>

<style scoped>
/* Ensure grid items take full height */
.grid-cols-2 > div {
  height: 100%;
}
</style>
