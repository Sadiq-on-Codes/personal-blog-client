<template>
  <div>
    <HeadingComponent text="Projects" />
    <div>
      <div class="grid grid-cols-1 gap-[--spacing]" v-for="project in projects" :key="project._id">
        <PostComponent :isBlog="false" :blogPost="project" />
      </div>
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
<style></style>
