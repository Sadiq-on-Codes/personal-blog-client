<template>
  <div class="min-h-screen flex flex-col py-12">
    <div v-if="error" class="flex-grow flex justify-center items-center">
      <p class="text-xl text-[--color-post-secondary]">{{ error }}</p>
    </div>
      <div v-if="!isLoading" class="flex-grow overflow-y-auto">
        <div class="container mx-auto py-8 sm:px-6 lg:px-8">
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
            <div ref="descriptionContainer" class="text-[--color-post-secondary] text-lg max-w-full mb-8">
            </div>
            
            <!-- Comments section -->
            <CommentSection :postId="blogPost._id" />
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
import { fetchBlogPostById, fetchComments, createComment } from '@/services/apiServices'
import { CLOUDINARY_URL, initializeQuill } from '@/utils'
import type { Post, Comment } from '@/types'
import AllBlogPosts from '@/components/AllBlogPosts.vue'
import Loader from '@/components/common/LoaderComponent.vue'
import CommentSection from '@/components/CommentsComponent.vue'

const route = useRoute()
const router = useRouter()
const blogPost = ref<Post | null>(null)
const isLoading = ref(true)
const error = ref<string | null>(null)
const descriptionContainer = ref<HTMLElement | null>(null)
const quillInstance = ref<any>(null)
const comments = ref<Comment[]>([])
const newComment = ref({ name: '', content: '' })

const blogPostImageUrl = computed(() => 
  blogPost.value?.image ? `${CLOUDINARY_URL}${blogPost.value.image}` : ''
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
        true 
      )
    }
    await loadComments(id)
  } catch (err) {
    console.error('Error fetching blog post:', err)
    error.value = 'Failed to load the blog post. Please try again later.'
    blogPost.value = null
  } finally {
    isLoading.value = false
  }
}

const goBack = () => {
  router.push({ name: 'BlogComponent' }) 
}

watch(() => route.params.id, (newId) => {
  if (newId && typeof newId === 'string') {
    loadBlogPost(newId)
  }
}, { immediate: true })

onMounted(() => {
  const id = route.params.id
  if (id && typeof id === 'string') {
    loadBlogPost(id)
  }
})

const submitComment = async () => {
  if (!blogPost.value) return
  try {
    await createComment({
      postId: blogPost.value._id,
      name: newComment.value.name,
      content: newComment.value.content
    })
    newComment.value = { name: '', content: '' }
    await loadComments(blogPost.value._id)
  } catch (err) {
    console.error('Error submitting comment:', err)
  }
}

const loadComments = async (id: string) => {
  try {
    comments.value = await fetchComments(id)
  } catch (err) {
    console.error('Error fetching comments:', err)
  }
}
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
