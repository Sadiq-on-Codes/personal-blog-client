<template>
  <div class="mt-14">
    <span class="text-xl">{{ text }}</span>
    <div :class="['grid gap-[--spacing]', horizontal ? 'grid-cols-1' : 'sm:grid-cols-3']">
      <div v-for="post in blogPosts" :key="post._id">
        <div @click="navigateToBlogPost(post._id ?? '')" style="cursor: pointer;">
          <BlogPost :blogPost="post" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import BlogPost from './PostComponent.vue'
import { fetchBlogPosts } from '@/services/apiServices.js'
import type { Post } from '@/types'

const router = useRouter()

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
  blogPosts.value = await fetchBlogPosts()
})

const navigateToBlogPost = (id: string) => {
  router.push({ name: 'BlogDetailsPage', params: { id } })
}
</script>

<style scoped>
.grid-cols-2 > div {
  height: 100%;
}
</style>
