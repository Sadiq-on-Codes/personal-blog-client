<template>
    <div class="mt-[--spacing]">
      <span class="text-xl">All blog posts</span>
      <div class="grid grid-cols-3 gap-[--spacing]">
        <div v-for="post in blogPosts" :key="post.id">
          <BlogPost :blogPost="post" />
        </div>
      </div>
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
  