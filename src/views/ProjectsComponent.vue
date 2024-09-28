<template>
  <div class="container mx-auto px-4 py-8">
    <HeadingComponent text="Projects" class="mb-8 text-4xl font-bold text-center text-gray-800" />
    <div v-if="!isLoading && projects.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="project in projects" :key="project._id" class="transform transition duration-300 hover:-translate-y-1 hover:shadow-lg">
        <PostComponent :isBlog="false" :blogPost="project" />
      </div>
    </div>
    <LoaderComponent v-else-if="isLoading" :isLoading="isLoading" />
    <p v-else class="text-center text-gray-600">No projects found.</p>
  </div>
</template>
<script setup lang="ts">
import HeadingComponent from '@/components/common/HeadingComponent.vue'
import PostComponent from '@/components/PostComponent.vue';
import LoaderComponent from '@/components/common/LoaderComponent.vue';
import { fetchProjects } from '@/services/apiServices';
import type { Post } from '@/types';
import { ref, onMounted } from 'vue';

const projects = ref<Post[]>([])
const isLoading = ref(true)

onMounted(async () => {
  try {
    projects.value = await fetchProjects()
  } catch (error) {
    console.error('Failed to fetch projects:', error)
  } finally {
    isLoading.value = false
  }
})
</script>

<style scoped>
</style>
