<template>
  <div class="newsletter-container">
    <div class="mt-14 max-w-4xl mx-auto">
      <div class="flex flex-col justify-center items-center gap-8 text-center">
        <span class="text-sm text-[--color-post-primary] font-semibold uppercase tracking-wider bg-[--color-post-primary-light] px-4 py-1 rounded-full">Stay Connected</span>
        <h2 class="text-5xl text-[--color-post-secondary2] dark:text-[--color-text-dark] font-bold leading-tight">
          Join My Newsletter
        </h2>
        <p class="text-[--color-post-secondary] text-xl max-w-2xl">
          Subscribe to receive updates on my latest blog posts, personal projects, coding insights, and occasional musings on technology and life. Never miss a post and be part of my journey!
        </p>
        <div class="w-full max-w-md">
          <form @submit.prevent="submitNewsletter" class="flex flex-col sm:flex-row gap-3">
            <input
              v-model="email"
              placeholder="Enter your email"
              class="flex-grow px-4 py-3 rounded-full dark:bg-[--color-background] bg-[--color-background-dark] text-[--color-text-dark] dark:text-[--color-text] border border-[--color-post-secondary] focus:outline-none focus:ring-2 focus:ring-[--color-post-primary] transition-all duration-300"
              type="email"
              required
            />
            <button 
              type="submit"
              :disabled="isLoading"
              class="px-6 py-3 bg-[--color-post-primary] text-[--color-text-dark] rounded-full font-semibold hover:bg-opacity-90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
            >
              <span v-if="!isLoading">Subscribe</span>
              <span v-else class="flex items-center justify-center">
                <svg class="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Subscribing...
              </span>
            </button>
          </form>
          <p v-if="message" :class="['text-sm mt-2', messageClass]">
            {{ message }}
          </p>
          <p class="text-[--color-post-secondary] text-sm mt-2">
            We care about your data in our <router-link to="/privacy-policy" class="underline hover:text-[--color-post-primary] transition-colors duration-200">privacy policy</router-link>.
          </p>
        </div>
      </div>
      <AllBlogPosts class="mt-20" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import AllBlogPosts from '@/components/AllBlogPosts.vue';
import { subscribeToNewsletter } from '@/services/apiServices';
import { useSEO } from '@/utils/seoComposable';

const email = ref('');
const isLoading = ref(false);
const message = ref('');
const messageType = ref<'success' | 'error' | null>(null);

const messageClass = computed(() => {
  if (messageType.value === 'success') return 'text-green-600';
  if (messageType.value === 'error') return 'text-red-600';
  return '';
});

// Apply SEO
useSEO(
  'Newsletter Subscription',
  'Stay connected with Sadiq on Codes. Subscribe to our newsletter for the latest blog posts, coding insights, and tech updates from across Africa.',
  'Africa'
);

const submitNewsletter = async () => {
  isLoading.value = true;
  message.value = '';
  messageType.value = null;

  try {
    await subscribeToNewsletter(email.value)

    message.value = 'Thank you for subscribing!';
    messageType.value = 'success';
    email.value = '';
  } catch (error) {
    message.value = 'An error occurred. Please try again.';
    messageType.value = 'error';
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.newsletter-container {
  @apply py-20 px-4 bg-gradient-to-b from-transparent to-[--color-background-alt] dark:to-[--color-background-dark-alt];
  background-image: url('path/to/your/background-pattern.svg');
  background-repeat: repeat;
  background-size: 200px;
}
</style>
