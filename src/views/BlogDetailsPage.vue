<template>
  <div class="min-h-screen flex flex-col">
    <div v-if="error" class="flex-grow flex justify-center items-center">
      <p class="text-xl text-[--color-post-secondary]">{{ error }}</p>
    </div>
      <div v-if="!isLoading" class="flex-grow overflow-y-auto">
        <div class="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <button @click="goBack" class="mb-4 text-[--color-post-primary] hover:underline">
            &larr; Back to all posts
          </button>
          <article v-if="blogPost">
            <header class="mb-8">
              <span class="text-sm text-[--color-post-primary] font-semibold">{{ blogPost.date }}</span>
              <h1 class="text-3xl sm:text-4xl text-[--color-post-secondary2] dark:text-[--color-text-dark] font-semibold leading-tight mt-2">
                {{ blogPost.title }}
              </h1>
            </header>
            <img 
              v-if="blogPostImageUrl"
              :src="blogPostImageUrl" 
              :alt="blogPost.title || 'Blog post'" 
              class="rounded-lg shadow-md w-full object-cover max-h-96 mb-8 transition-transform duration-300 ease-in-out hover:scale-[1.02]"
              loading="lazy"
            />
            <div ref="descriptionContainer" class="text-[--color-post-secondary] text-lg  max-w-full">
              <!-- This div will be populated by Quill -->
            </div>
          </article>
        </div>
      </div>
      <Loader :isLoading="isLoading" v-else />
      <aside class="py-8">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
          <AllBlogPosts text="More Posts" :horizontal="false" />
        </div>
      </aside>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { fetchBlogPostById } from '@/services/apiServices'
import { apiUrl, initializeQuill } from '@/utils'
import type { Post } from '@/types'
import AllBlogPosts from '@/components/AllBlogPosts.vue'
import Loader from '@/components/common/LoaderComponent.vue'

const route = useRoute()
const router = useRouter()
const blogPost = ref<Post | null>(null)
const isLoading = ref(true)
const error = ref<string | null>(null)
const descriptionContainer = ref<HTMLElement | null>(null)
const quillInstance = ref<any>(null)

const blogPostImageUrl = computed(() => 
  blogPost.value?.image ? `${apiUrl}${blogPost.value.image}` : ''
)

const loadBlogPost = async (id: string) => {
  isLoading.value = true
  error.value = null
  try {
    blogPost.value = await fetchBlogPostById(id)
    if (blogPost.value && descriptionContainer.value) {
      quillInstance.value = initializeQuill(
        descriptionContainer.value,
        blogPost.value.description,
        true // Set to true for read-only mode
      )
    }
  } catch (err) {
    console.error('Error fetching blog post:', err)
    error.value = 'Failed to load the blog post. Please try again later.'
    blogPost.value = null
  } finally {
    isLoading.value = false
  }
}

const goBack = () => {
  router.push({ name: 'Blog' }) // Assuming 'Blog' is the name of your blog listing route
}

watch(() => route.params.id, (newId) => {
  if (newId) {
    loadBlogPost(newId as string)
  }
}, { immediate: true })

onMounted(() => {
  if (route.params.id) {
    loadBlogPost(route.params.id as string)
  }
})
</script>

<style scoped>
.prose {
  max-width: 65ch;
  margin-left: auto;
  margin-right: auto;
}

.ql-container.ql-snow {
  border: none;
}

@media (max-width: 640px) {
  h1 {
    font-size: 2rem;
  }
}
</style>
