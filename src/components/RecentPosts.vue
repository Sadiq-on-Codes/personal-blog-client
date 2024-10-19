<template>
  <div class="mt-[--spacing]">
    <span class="text-xl">Recent blog posts</span>
    <div v-if="!isLoading && blogPosts?.length > 0" class="mt-4">
      <div class="grid sm:grid-cols-2 grid-cols-1 gap-[--spacing]">
      <div>
        <router-link
          v-if="blogPosts?.length > 0"
          :to="{ name: 'BlogDetailsPage', params: { id: blogPosts[0]?._id } }"
        >
          <BlogPost :blogPost="blogPosts[0]" :isHalfHeight="true" layout="vertical" :shortenTitle="true" />
        </router-link>
        <p v-else>No posts available.</p>
      </div>

      <div class="flex flex-col gap-[--spacing] justify-between">
        <router-link v-if="blogPosts?.length > 1" :to="{ name: 'BlogDetailsPage', params: { id: blogPosts[1]?._id } }">
          <BlogPost :blogPost="blogPosts[1]" :isHalfHeight="false" layout="horizontal" :shortenTitle="true" />
        </router-link>
        <router-link v-if="blogPosts?.length > 2" :to="{ name: 'BlogDetailsPage', params: { id: blogPosts[2]?._id } }">
          <BlogPost :blogPost="blogPosts[2]" :isHalfHeight="false" layout="horizontal" :shortenTitle="true" />
        </router-link>
      </div>
    </div>
    <div class="mt-14">
      <router-link v-if="blogPosts?.length > 3" :to="{ name: 'BlogDetailsPage', params: { id: blogPosts[3]?._id } }">
        <BlogPost
          :blogPost="blogPosts[3]"
          :isHalfHeight="false"
          layout="horizontal"
          :reverse="true"
        />
      </router-link>
    </div>
    </div>
   
    <LoaderComponent v-else-if="isLoading" :isLoading="isLoading" />
    <p v-else class="text-center text-gray-600">No projects found.</p>
  </div>
</template>

<script setup lang="ts">
import { fetchRecentPosts } from '@/services/apiServices'
import { onMounted, ref } from 'vue'
import BlogPost from './PostComponent.vue'
import LoaderComponent from '@/components/common/LoaderComponent.vue'
import { useSEO } from '@/utils/seoComposable'

const blogPosts = ref()
const isLoading = ref(true)

// Apply SEO
useSEO(
  'Recent Blog Posts',
  'Check out our latest blog posts. Stay updated with our most recent articles and insights.'
)

onMounted(async () => {
  try {
    blogPosts.value = await fetchRecentPosts()
  } catch (error) {
    console.error('Failed to fetch projects:', error)
  } finally { 
    isLoading.value = false
  }
})
</script>

<style scoped>
.grid-cols-2 > div {
  height: 100%;
}
</style>
