<template>
  <div class="newsletter-container">
    <div class="mt-14 mx-auto">
      <NewsLetter />
      <AllBlogPosts class="mt-20" />
    </div>
  </div>
</template>

<script setup lang="ts">
import AllBlogPosts from '@/components/AllBlogPosts.vue';
import NewsLetter from '@/components/NewsLetter.vue';
import { useSEO } from '@/utils/seoComposable';

// Apply SEO
useSEO(
  'Newsletter Subscription',
  'Stay connected with Sadiq on Codes. Subscribe to our newsletter for the latest blog posts, coding insights, and tech updates from across Africa.',
  'Africa'
);
</script>

<style scoped>
.newsletter-container {
  @apply py-20 px-4 bg-gradient-to-b from-transparent to-[--color-background-alt] dark:to-[--color-background-dark-alt];
  background-image: url('path/to/your/background-pattern.svg');
  background-repeat: repeat;
  background-size: 200px;
}
</style>
