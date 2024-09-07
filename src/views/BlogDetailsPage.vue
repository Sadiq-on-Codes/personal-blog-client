<template>
  <div class="flex flex-col-reverse sm:flex-row gap-[--spacing]">
    <div class="sm:w-1/3 w-full">
      <AllBlogPosts :horizontal="true" />
    </div>
    <div class="sm:w-2/3 w-full mt-14 flex flex-col gap-[--spacing]">
      <span class="text-sm text-[--color-post-primary] font-semibold">{{ blogDetails?.date }}</span>
      <span
        class="text-4xl text-[--color-post-secondary2] dark:text-[--color-text-dark] font-semibold"
        >{{ blogDetails?.title }}</span
      >
      <img :src="`${apiUrl}${blogDetails?.image}`" alt="post image" />
      <div ref="descriptionContainer" class="text-[--color-post-secondary] text-lg"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AllBlogPosts from '@/components/AllBlogPosts.vue'
import { fetchBlogPostById } from '@/services/apiServices'
import type { Post } from '@/types'
import { apiUrl } from '@/utils'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import Quill from 'quill'
import 'quill/dist/quill.snow.css' // Import Quill styles

const route = useRoute()
const blogDetails = ref<Post>()
const descriptionContainer = ref<HTMLDivElement | null>(null)

onMounted(async () => {
  blogDetails.value = await fetchBlogPostById('' + route.params.id)

  if (descriptionContainer.value && blogDetails.value?.description) {
    const quill = new Quill(descriptionContainer.value, {
      theme: 'snow',
      readOnly: true,
      modules: {
        toolbar: false
      }
    })

    // Parse and set the content
    const descriptionContent = JSON.parse(blogDetails.value.description)
    quill.setContents(descriptionContent)

    // Ensure that styles are applied
    quill.enable(false) // Disable user interaction
  }
})
</script>

<style>
.ql-container.ql-snow {
  border: none;
}
</style>
