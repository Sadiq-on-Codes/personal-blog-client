<template>
  <div class="h-screen overflow-hidden">
    
    <Loader v-if="isLoading" :isLoading="isLoading" />
    <div v-else-if="blogPost" class="flex flex-col sm:flex-row h-full">
      <div class="all-blog-posts sm:w-1/3 w-full h-full overflow-y-auto scrollbar-hide">
        <AllBlogPosts :horizontal="true" />
      </div>

      <div class="sm:w-2/3 w-full h-full overflow-y-auto scrollbar-hide">
        <div class="w-full py-8 px-4 sm:px-8">
          <span class="text-sm text-[--color-post-primary] font-semibold">{{ blogPost?.date }}</span>
          <h1 class="text-4xl text-[--color-post-secondary2] dark:text-[--color-text-dark] font-semibold leading-tight mt-2">
            {{ blogPost?.title }}
          </h1>
          <img :src="`${apiUrl}${blogPost?.image}`" alt="post" class="rounded-lg shadow-md w-full object-cover max-h-96 my-6" />
          <div ref="descriptionContainer" class="text-[--color-post-secondary] text-lg prose max-w-none"></div>
        </div>
      </div>
    </div>

    <div v-else class="flex justify-center items-center h-full">
      <p class="text-xl text-[--color-post-secondary]">Blog post not found.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import AllBlogPosts from '@/components/AllBlogPosts.vue'
import Loader from '@/components/common/LoaderComponent.vue'
import { fetchBlogPostById } from '@/services/apiServices'
import type { Post } from '@/types'
import { apiUrl, initializeQuill } from '@/utils'
import { nextTick, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import 'quill/dist/quill.snow.css'

const route = useRoute()
const blogPost = ref<Post | null>(null)
const isLoading = ref(true)

const loadBlogPost = async (id: string) => {
  try {
    blogPost.value = await fetchBlogPostById(id)
  } catch (error) {
    console.error('Error fetching blog post:', error)
    blogPost.value = null
  } finally {
    isLoading.value = false
  }
}

// Load the blog post initially
loadBlogPost(route.params.id as string)

// Watch for changes in the route
watch(
  () => route.params.id,
  (newId) => {
    if (newId) {
      loadBlogPost(newId as string)
    }
  }
)

const descriptionContainer = ref<HTMLElement | null>(null)

// Watch for changes in blogPost
watch(blogPost, () => {
  if (blogPost.value && descriptionContainer.value) {
    // Use nextTick to ensure DOM is updated
    nextTick(() => {
      initializeQuill(descriptionContainer.value!, blogPost.value!.description)
    })
  }
}, { immediate: true })

onMounted(() => {
  if (blogPost.value && descriptionContainer.value) {
    initializeQuill(descriptionContainer.value, blogPost.value.description)
  }
})
</script>

<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;  /* Chrome, Safari and Opera */
}

.ql-container.ql-snow {
  border: none;
}

/* Add smooth transitions */
.all-blog-posts, img {
  transition: all 0.3s ease-in-out;
}

/* Hover effect for the image */
img:hover {
  transform: scale(1.02);
}

/* Responsive font sizes */
@media (max-width: 640px) {
  h1 {
    font-size: 2rem;
  }
}
</style>
