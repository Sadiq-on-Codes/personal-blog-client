<template>
  <div class="flex flex-col sm:flex-row h-screen overflow-hidden">
    <div class="all-blog-posts sm:w-1/3 w-full h-full overflow-y-auto scrollbar-hide">
      <AllBlogPosts :horizontal="true" />
    </div>

    <div class="sm:w-2/3 w-full h-full overflow-y-auto scrollbar-hide">
      <div class="w-full py-8 px-4 sm:px-8">
        <span class="text-sm text-[--color-post-primary] font-semibold">{{ blogDetails?.date }}</span>
        <h1 class="text-4xl text-[--color-post-secondary2] dark:text-[--color-text-dark] font-semibold leading-tight mt-2">
          {{ blogDetails?.title }}
        </h1>
        <img :src="`${apiUrl}${blogDetails?.image}`" alt="post" class="rounded-lg shadow-md w-full object-cover max-h-96 my-6" />
        <div ref="descriptionContainer" class="text-[--color-post-secondary] text-lg prose max-w-none"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AllBlogPosts from '@/components/AllBlogPosts.vue'
import { fetchBlogPostById } from '@/services/apiServices'
import type { Post } from '@/types'
import { apiUrl, initializeQuill } from '@/utils'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import 'quill/dist/quill.snow.css'

const route = useRoute()
const blogDetails = ref<Post>()
const descriptionContainer = ref<any>(null)

onMounted(async () => {
  blogDetails.value = await fetchBlogPostById('' + route.params.id)
  initializeQuill(descriptionContainer.value, blogDetails.value.description)
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
