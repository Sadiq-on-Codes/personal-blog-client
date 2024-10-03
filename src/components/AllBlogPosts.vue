<template>
  <div class="mt-14">
    <div v-if="blogPosts && blogPosts.length > 0">
      <span class="text-xl">{{ text }}</span>
      <div :class="['grid gap-[--spacing]', horizontal ? 'grid-cols-1' : 'sm:grid-cols-3']">
        <div v-for="post in blogPosts" :key="post._id">
          <div @click="navigateToBlogPost(post._id ?? '')" style="cursor: pointer;">
            <BlogPost :blogPost="post" />
          </div>
        </div>
      </div>
    </div>
    <EmptyState v-else title="You're all caught up!" message="Looks like you've seen all the posts. Check back later for new content!" />
  </div>
</template>

<script setup lang="ts">
import { defineProps, onMounted, ref } from 'vue'
import BlogPost from './PostComponent.vue'
import { fetchOtherPosts } from '@/services/apiServices.js'
import EmptyState from './common/EmptyState.vue'
import type { Post } from '@/types'

defineProps({
  horizontal: {
    type: Boolean,
    default: false
  },
  text: {
    type: String,
    default: 'All Posts'
  }
})

const blogPosts = ref<Post[]>()

onMounted(async () => {
  blogPosts.value = await fetchOtherPosts()
})

const navigateToBlogPost = (id: string) => {
  window.location.href = `/blog-details/${id}`
}
</script>

<style scoped>
.grid-cols-2 > div {
  height: 100%;
}
</style>
