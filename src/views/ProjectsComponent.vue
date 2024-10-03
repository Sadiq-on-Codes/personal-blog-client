<template>
  <div class="container mx-auto py-8">
    <HeadingComponent text="Projects" class="mb-10 text-4xl font-bold text-center text-gray-800" />
    <div v-if="!isLoading && projects.length > 0" class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <div v-for="project in projects" :key="project._id" class="p-4 transform transition duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer" @click="openModal(project)">
        <PostComponent i:sProject="true" :isBlog="false" :blogPost="project" />
      </div>
    </div>
    <LoaderComponent v-else-if="isLoading" :isLoading="isLoading" />
    <p v-else class="text-center text-gray-600">No projects found.</p>

    <!-- Modal -->
    <div v-if="isModalOpen" class="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center" @click="closeModal">
      <div class="p-8 dark:bg-[--color-background-dark] bg-[--color-background] rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto" @click.stop>
        <h2 class="text-2xl font-bold mb-4">{{ selectedProject?.title }}</h2>
        <img v-if="selectedProject?.image" :src="projectImageUrl" :alt="selectedProject.title" class="w-full h-64 object-cover mb-4 rounded">
        <div v-html="selectedProject?.description" class="mb-4"></div>
        <div class="flex justify-end">
          <button @click="closeModal" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import HeadingComponent from '@/components/common/HeadingComponent.vue'
import PostComponent from '@/components/PostComponent.vue';
import LoaderComponent from '@/components/common/LoaderComponent.vue';
import { fetchProjects } from '@/services/apiServices';
import type { Post } from '@/types';
import { ref, onMounted, computed } from 'vue';
import { CLOUDINARY_URL } from '@/utils';

const projects = ref<Post[]>([]);
const isLoading = ref(true);
const selectedProject = ref<Post | null>(null);
const isModalOpen = ref(false);

const projectImageUrl = computed(() => 
  selectedProject.value?.image ? `${CLOUDINARY_URL}${selectedProject.value.image}` : ''
)

onMounted(async () => {
  try {
    projects.value = await fetchProjects();
  } catch (error) {
    console.error('Failed to fetch projects:', error);
  } finally {
    isLoading.value = false;
  }
});

const openModal = (project: Post) => {
  selectedProject.value = project;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  selectedProject.value = null;
};
</script>

