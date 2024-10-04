<template>
  <div class="mx-auto py-12">
    <HeadingComponent text="Projects" class="mb-12 text-5xl font-bold text-center text-gray-800 dark:text-gray-200" />
    <div v-if="!isLoading && projects.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      <div v-for="project in projects" :key="project._id" 
           class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer" 
           @click="openModal(project)">
        <PostComponent :isProject="true" :isBlog="false" :blogPost="project" />
      </div>
    </div>
    <LoaderComponent v-else-if="isLoading" :isLoading="isLoading" />
    <p v-else class="text-center text-gray-600 dark:text-gray-400">No projects found.</p>

    <!-- Modal -->
    <transition name="fade">
      <div v-if="isModalOpen" class="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center" @click="closeModal">
        <transition name="zoom">
          <div v-if="isModalOpen" class="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto shadow-2xl" @click.stop>
            <div class="p-6">
              <h2 class="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">{{ selectedProject?.title }}</h2>
              <img v-if="selectedProject?.image" :src="projectImageUrl" :alt="selectedProject.title" class="w-full h-64 object-cover mb-6 rounded-lg">
              <div v-html="selectedProject?.description" class="mb-6 text-gray-700 dark:text-gray-300"></div>
              <div class="flex justify-end">
                <button @click="closeModal" class="bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-bold py-2 px-4 rounded-lg transition duration-300">
                  Close
                </button>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </transition>
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
import { useSEO } from '@/utils/seoComposable';

const projects = ref<Post[]>([]);
const isLoading = ref(true);
const selectedProject = ref<Post | null>(null);
const isModalOpen = ref(false);

const projectImageUrl = computed(() => 
  selectedProject.value?.image ? `${CLOUDINARY_URL}${selectedProject.value.image}` : ''
)

// Apply SEO
useSEO(
  'Projects',
  'Explore innovative projects by Sadiq on Codes. Discover a showcase of coding and technology initiatives from across Africa.',
  'Africa'
);

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

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.zoom-enter-active,
.zoom-leave-active {
  transition: all 0.3s ease;
}

.zoom-enter-from,
.zoom-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>

