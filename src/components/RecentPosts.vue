<template>
  <div class="mt-[--spacing]">
    <span class="text-xl">Recent blog posts</span>
    <div class="grid sm:grid-cols-2 grid-cols-1 gap-[--spacing]">
      <div>
        <BlogPost :blogPost="blogPosts[0]" :isHalfHeight="false" layout="vertical" />
      </div>

      <div class="flex flex-col gap-[--spacing]">
        <BlogPost :blogPost="blogPosts[7]" :isHalfHeight="false" layout="horizontal" />
        <BlogPost :blogPost="blogPosts[2]" :isHalfHeight="false" layout="horizontal" />
      </div>
    </div>
    <div class="mt-14">
      <BlogPost
        :blogPost="blogPosts[5]"
        :isHalfHeight="false"
        layout="horizontal"
        :reverse="true"
      />
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
