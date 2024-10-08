<template>
  <section class="mt-14" aria-labelledby="blog-posts-heading">
    <h2 id="blog-posts-heading" class="text-xl mb-4">{{ text }}</h2>
    <div v-if="paginatedPosts && paginatedPosts.length > 0">
      <ul :class="['grid gap-[--spacing]', horizontal ? 'grid-cols-1' : 'sm:grid-cols-3']">
        <li v-for="post in paginatedPosts" :key="post._id">
          <article>
            <a :href="`/blog-details/${post._id}`" @click.prevent="navigateToBlogPost(post._id ?? '')">
              <BlogPost :blogPost="post" />
            </a>
          </article>
        </li>
      </ul>
      <div class="mt-12 flex justify-center items-center space-x-4">
        <button
          v-if="currentPage > 1"
          @click="currentPage--"
          class="px-4 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          Previous
        </button>
        <span class="text-gray-600">Page {{ currentPage }} of {{ totalPages }}</span>
        <button
          v-if="currentPage < totalPages"
          @click="currentPage++"
          class="px-4 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center"
        >
          Next
          <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </div>
    <EmptyState v-else title="You're all caught up!" message="Looks like you've seen all the posts. Check back later for new content!" />
  </section>
</template>

<script setup lang="ts">
import { defineProps, onMounted, ref, computed, watch } from 'vue'
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
  },
  excludePostId: {
    type: String,
    default: ''
  }
})

const blogPosts = ref<Post[]>([])
const currentPage = ref(1)
const postsPerPage = 9

const filteredPosts = computed(() => {
  return blogPosts.value.filter(post => post._id !== props.excludePostId)
})

const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * postsPerPage
  const end = start + postsPerPage
  return filteredPosts.value.slice(start, end)
})

const totalPages = computed(() => Math.ceil(filteredPosts.value.length / postsPerPage))

const route = useRoute()

const loadPosts = async () => {
  if (route.name === 'NewsLetterComponent') {
    blogPosts.value = await fetchBlogPosts()
  } else {
    blogPosts.value = await fetchOtherPosts()
  }
}

onMounted(loadPosts)

watch(() => props.excludePostId, loadPosts)

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
