<template>
  <div class="mt-14">
    <span class="text-xl">{{ !horizontal ? 'All blog posts' : 'Recent blog posts' }}</span>
    <div :class="['grid gap-[--spacing]', horizontal ? 'grid-cols-1' : 'sm:grid-cols-3']">
      <div v-for="post in blogPosts" :key="post.id">
        <router-link :to="{ name: 'BlogDetailsPage', params: { id: post.id } }">
          <BlogPost :blogPost="post" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import BlogPost from './PostComponent.vue'
import { blogPosts } from '@/data/blogPosts'

defineProps({
  horizontal: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
.grid-cols-2 > div {
  height: 100%;
}
</style>
