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
          <div 
            v-if="parsedDescription"
            class="text-[--color-post-secondary] text-lg max-w-full mb-8 prose"
            v-html="parsedDescription"
          ></div>
          <p v-else class="text-[--color-post-secondary] italic">No description available.</p>
          
          <!-- Comments section -->
          <CommentSection :postId="blogPost._id" />
        </article>
        <p v-else class="text-xl text-[--color-post-secondary]">Blog post not found.</p>
      </div>
    </div>
    <Loader :isLoading="isLoading" v-else />
    <aside class="py-8">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <AllBlogPosts 
          text="More Posts" 
          :horizontal="false" 
          :excludePostId="blogPost?._id"
        />
      </div>
    </aside>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { createComment, fetchBlogPostById, fetchComments } from '@/services/apiServices'
import { CLOUDINARY_URL } from '@/utils'
import type { Post } from '@/types'
import AllBlogPosts from '@/components/AllBlogPosts.vue'
import Loader from '@/components/common/LoaderComponent.vue'
import CommentSection from '@/components/CommentsComponent.vue'
import { useSEO } from '@/utils/seoComposable'
import DOMPurify from 'dompurify'
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html'

const route = useRoute()
const router = useRouter()
const blogPost = ref<Post | null>(null)
const isLoading = ref(true)
const error = ref<string | null>(null)

const blogPostImageUrl = computed(() => 
  blogPost.value?.image ? `${CLOUDINARY_URL}${blogPost.value.image}` : ''
)

const parsedDescription = computed(() => {
  if (!blogPost.value || !blogPost.value.description) return ''
  try {
    const content = JSON.parse(blogPost.value.description)
    if (content.ops) {
      const converter = new QuillDeltaToHtmlConverter(content.ops, {});
      const html = converter.convert();
      return DOMPurify.sanitize(html)
    }
  } catch (error) {
    console.error('Error parsing description:', error)
  }
  return 'Error parsing blog post content.'
})

const loadBlogPost = async (id: string) => {
  isLoading.value = true
  error.value = null
  try {
    const fetchedPost = await fetchBlogPostById(id)
    if (!fetchedPost) {
      throw new Error('Blog post not found')
    }
    blogPost.value = fetchedPost
    
    // Apply SEO after blog post is loaded
    let seoDescription = ''
    try {
      const content = JSON.parse(blogPost.value.description)
      if (content.ops) {
        seoDescription = content.ops
          .filter((op: any) => typeof op.insert === 'string')
          .map((op: any) => op.insert)
          .join('')
          .substring(0, 160)
      }
    } catch (error) {
      console.error('Error parsing description for SEO:', error)
    }
    
    useSEO(
      blogPost.value.title,
      seoDescription || 'Blog post',
      'Africa'
    )
  } catch (err) {
    console.error('Error fetching blog post:', err)
    error.value = err instanceof Error ? err.message : 'Failed to load the blog post. Please try again later.'
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
  max-width: 100%;
  margin-left: auto;
  margin-right: auto;
}

.ql-container.ql-snow {
  border: none;
}

.ql-editor {
  padding: 0;
}

@media (max-width: 640px) {
  h1 {
    font-size: 2rem;
  }
  
  .ql-editor {
    font-size: 16px;
  }
}
</style>
