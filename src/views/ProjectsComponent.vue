<template>
  <div class="container mx-auto px-4 py-8">
    <HeadingComponent text="Projects" class="mb-8 text-4xl font-bold text-center text-gray-800" />
    <div v-if="projects" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="project in projects" :key="project._id" class="transform transition duration-300 hover:-translate-y-1 hover:shadow-lg">
        <PostComponent :isBlog="false" :blogPost="project" />
      </div>
    </div>
    <div v-else class="flex justify-center items-center h-64">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  </div>
</template>
<script setup lang="ts">
import HeadingComponent from '@/components/common/HeadingComponent.vue'
import PostComponent from '@/components/PostComponent.vue';
import { fetchProjects } from '@/services/apiServices';
import type { Post } from '@/types';
import { ref, onMounted } from 'vue';

const projects = ref<Post[]>()

onMounted(async () => {
  projects.value = await fetchProjects()
})
</script>
