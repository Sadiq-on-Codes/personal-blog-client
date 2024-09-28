<template>
  <div class="h-screen overflow-hidden">
    <Loader :isLoading="isLoading" v-if="isLoading" />
    <div v-else class="flex flex-col sm:flex-row h-full">
      <div class="all-blog-posts sm:w-1/3 w-full h-full overflow-y-auto scrollbar-hide">
        <Suspense>
          <AllBlogPosts :horizontal="true" />
          <template #fallback>
            <div class="p-4">Loading blog posts...</div>
          </template>
        </Suspense>
      </div>

      <div v-if="blogPost" class="sm:w-2/3 w-full h-full overflow-y-auto scrollbar-hide">
        <div class="w-full py-8 px-4 sm:px-8">
          <span class="text-sm text-[--color-post-primary] font-semibold">{{ blogPost.date }}</span>
          <h1 class="text-4xl text-[--color-post-secondary2] dark:text-[--color-text-dark] font-semibold leading-tight mt-2">
            {{ blogPost.title }}
          </h1>
          <img :src="blogPostImageUrl" :alt="blogPost.title" class="rounded-lg shadow-md w-full object-cover max-h-96 my-6" />
          <div ref="descriptionContainer" class="text-[--color-post-secondary] text-lg prose max-w-none">
            <p v-if="!descriptionLoaded">Loading description...</p>
          </div>
        </div>
      </div>

      <div v-else class="flex justify-center items-center h-full">
        <p class="text-xl text-[--color-post-secondary]">Blog post not found.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { fetchBlogPostById } from '@/services/apiServices'
import { apiUrl, initializeQuill } from '@/utils'
import type { Post } from '@/types'
import AllBlogPosts from '@/components/AllBlogPosts.vue'
import Loader from '@/components/common/LoaderComponent.vue'
import 'quill/dist/quill.snow.css'

const route = useRoute()
const blogPost = ref<Post | null>(null)
const isLoading = ref(true)
const descriptionContainer = ref<HTMLElement | null>(null)
const descriptionLoaded = ref(false)

const blogPostImageUrl = computed(() => 
  blogPost.value ? `${apiUrl}${blogPost.value.image}` : ''
)

const loadBlogPost = async (id: string) => {
  isLoading.value = true
  try {
    blogPost.value = await fetchBlogPostById(id)
  } catch (error) {
    console.error('Error fetching blog post:', error)
    blogPost.value = null
  } finally {
    isLoading.value = false
  }
}

watch(() => route.params.id, (newId) => {
  if (newId) {
    loadBlogPost(newId as string)
  }
}, { immediate: true })

watch(blogPost, () => {
  if (blogPost.value && descriptionContainer.value) {
    descriptionLoaded.value = false
    initializeQuill(descriptionContainer.value, blogPost.value.description)
    descriptionLoaded.value = true
  }
})

onMounted(() => {
  if (blogPost.value && descriptionContainer.value) {
    initializeQuill(descriptionContainer.value, blogPost.value.description)
    descriptionLoaded.value = true
  }
})
</script>

<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none; 
  scrollbar-width: none;  
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;  
}

.ql-container.ql-snow {
  border: none;
}

.all-blog-posts, img {
  transition: all 0.3s ease-in-out;
}

img:hover {
  transform: scale(1.02);
}

@media (max-width: 640px) {
  h1 {
    font-size: 2rem;
  }
}
</style>
