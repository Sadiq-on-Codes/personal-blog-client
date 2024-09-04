<template>
  <div>
    <HeadingComponent text="Projects" />
    <div>
      <div class="grid grid-cols-1 gap-[--spacing]" v-for="project in projects" :key="project.id">
        <PostComponent :blogPost="project" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import HeadingComponent from '@/components/common/HeadingComponent.vue'
import PostComponent from '@/components/PostComponent.vue';
import { projects } from '@/data/projects';
</script>
<style></style>
