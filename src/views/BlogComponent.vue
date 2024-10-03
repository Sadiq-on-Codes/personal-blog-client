<template>
  <div class="container py-12">
    <HeadingComponent text="The Blog" />
    <RecentPosts />
    <AllBlogPosts />
  </div>
</template>
<script setup lang="ts">
import AllBlogPosts from '@/components/AllBlogPosts.vue';
import RecentPosts from '@/components/RecentPosts.vue'
import HeadingComponent from '@/components/common/HeadingComponent.vue'
</script>
<style></style>
