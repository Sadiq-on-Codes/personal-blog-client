<template>
  <div class="mt-[--spacing]">
    <span class="text-xl">Recent blog posts</span>
    <div class="grid sm:grid-cols-2 grid-cols-1 gap-[--spacing]">
      <div>
        <router-link :to="{ name: 'BlogDetailsPage', params: { id: blogPosts[0].id } }">
          <BlogPost :blogPost="blogPosts[0]" :isHalfHeight="false" layout="vertical" />
        </router-link>
      </div>

      <div class="flex flex-col gap-[--spacing]">
        <router-link :to="{ name: 'BlogDetailsPage', params: { id: blogPosts[7].id } }">
          <BlogPost :blogPost="blogPosts[7]" :isHalfHeight="false" layout="horizontal" />
        </router-link>
        <router-link :to="{ name: 'BlogDetailsPage', params: { id: blogPosts[2].id } }">
          <BlogPost :blogPost="blogPosts[2]" :isHalfHeight="false" layout="horizontal" />
        </router-link>
      </div>
    </div>
    <div class="mt-14">
      <router-link :to="{ name: 'BlogDetailsPage', params: { id: blogPosts[2].id } }">
        <BlogPost
          :blogPost="blogPosts[5]"
          :isHalfHeight="false"
          layout="horizontal"
          :reverse="true"
        />
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { blogPosts } from '@/data/blogPosts'
import BlogPost from './PostComponent.vue'
</script>

<style scoped>
/* Ensure grid items take full height */
.grid-cols-2 > div {
  height: 100%;
}
</style>
