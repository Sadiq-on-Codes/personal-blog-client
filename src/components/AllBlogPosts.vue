<template>
  <section class="mt-14" aria-labelledby="blog-posts-heading">
    <h2 id="blog-posts-heading" class="text-xl mb-4">{{ text }}</h2>
    <div v-if="blogPosts && blogPosts.length > 0">
      <ul :class="['grid gap-[--spacing]', horizontal ? 'grid-cols-1' : 'sm:grid-cols-3']">
        <li v-for="post in blogPosts" :key="post._id">
          <article>
            <a :href="`/blog-details/${post._id}`" @click.prevent="navigateToBlogPost(post._id ?? '')">
              <BlogPost :blogPost="post" />
            </a>
          </article>
        </li>
      </ul>
    </div>
    <EmptyState v-else title="You're all caught up!" message="Looks like you've seen all the posts. Check back later for new content!" />
  </section>
</template>

<script setup lang="ts">
import { defineProps, onMounted, ref } from 'vue'
import BlogPost from './PostComponent.vue'
import { fetchOtherPosts, fetchBlogPosts } from '@/services/apiServices.js'
import EmptyState from './common/EmptyState.vue'
import type { Post } from '@/types'
import { useRoute } from 'vue-router'
import { useSEO } from '@/utils/seoComposable'

const props = defineProps({
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
const route = useRoute()

onMounted(async () => {
  if (route.name === 'NewsLetterComponent') {
    blogPosts.value = await fetchBlogPosts()
  } else {
    blogPosts.value = await fetchOtherPosts()
  }
})

useSEO(
  props.text,
  `Browse our collection of ${props.text.toLowerCase()}. Find insightful articles and stay updated with the latest content.`
)

const navigateToBlogPost = (id: string) => {
  window.location.href = `/blog-details/${id}`
}
</script>

<style scoped>
.grid-cols-2 > div {
  height: 100%;
}
</style>
