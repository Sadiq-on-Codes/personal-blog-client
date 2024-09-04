<template>
  <div>
    <!-- <HeadingComponent text="Newsletter" /> -->
    <div class="mt-14">
      <div class="flex flex-col justify-center items-center gap-[--spacing]">
        <span class="text-sm text-[--color-post-primary] font-semibold">Newsletter</span>
        <span
          class="text-3xl text-[--color-post-secondary2] dark:text-[--color-text-dark] font-semibold"
          >Stories and interviews</span
        >
        <span class="text-[--color-post-secondary] text-lg"
          >Subscribe to learn about new product features, the latest in technology, solutions, and
          updates.</span
        >
        <div class="flex gap-2">
          <div class="">
            <input placeholder="Enter your email" class="px-4 w-full h-12 dark:bg-[--color-background] bg-[--color-background-dark] text-[--color-text-dark] dark:text-[--color-text] rounded-xl" type="text" />
            <p class="text-[--color-post-secondary] text-sm mt-1"
              >We care about your data in our privacy policy.</p
            >
          </div>
          <button class="px-4 h-12 bg-[--color-post-primary] text-[--color-text-dark] rounded-xl">Subscribe</button>
        </div>
      </div>
      <AllBlogPosts />
    </div>
  </div>
</template>
<script setup lang="ts">
import AllBlogPosts from '@/components/AllBlogPosts.vue';
import HeadingComponent from '@/components/common/HeadingComponent.vue'
</script>
<style></style>
