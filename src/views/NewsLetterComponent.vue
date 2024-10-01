<template>
  <div class="newsletter-container">
    <div class="mt-14 max-w-3xl mx-auto">
      <div class="flex flex-col justify-center items-center gap-6 text-center">
        <span class="text-sm text-[--color-post-primary] font-semibold uppercase tracking-wider">Stay Connected</span>
        <h2 class="text-4xl text-[--color-post-secondary2] dark:text-[--color-text-dark] font-bold leading-tight">
          Join My Newsletter
        </h2>
        <p class="text-[--color-post-secondary] text-lg max-w-2xl">
          Subscribe to receive updates on my latest blog posts, personal projects, coding insights, and occasional musings on technology and life. Never miss a post and be part of my journey!
        </p>
        <div class="w-full max-w-md">
          <form @submit.prevent="submitNewsletter" class="flex flex-col sm:flex-row gap-3">
            <input
              v-model="email"
              placeholder="Enter your email"
              class="flex-grow px-4 py-3 rounded-lg dark:bg-[--color-background] bg-[--color-background-dark] text-[--color-text-dark] dark:text-[--color-text] border border-[--color-post-secondary] focus:outline-none focus:ring-2 focus:ring-[--color-post-primary]"
              type="email"
              required
            />
            <button 
              type="submit"
              :disabled="isLoading"
              class="px-6 py-3 bg-[--color-post-primary] text-[--color-text-dark] rounded-lg font-semibold hover:bg-opacity-90 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ isLoading ? 'Subscribing...' : 'Subscribe' }}
            </button>
          </form>
          <p v-if="message" :class="['text-sm mt-2', messageClass]">
            {{ message }}
          </p>
          <p class="text-[--color-post-secondary] text-sm mt-2">
            We care about your data in our <a href="#" class="underline hover:text-[--color-post-primary]">privacy policy</a>.
          </p>
        </div>
      </div>
      <AllBlogPosts class="mt-16" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import AllBlogPosts from '@/components/AllBlogPosts.vue';

const email = ref('');
const isLoading = ref(false);
const message = ref('');
const messageType = ref<'success' | 'error' | null>(null);

const messageClass = computed(() => {
  if (messageType.value === 'success') return 'text-green-600';
  if (messageType.value === 'error') return 'text-red-600';
  return '';
});

const submitNewsletter = async () => {
  isLoading.value = true;
  message.value = '';
  messageType.value = null;

  try {
    // Simulating an API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Here you would typically make an actual API call to submit the email
    // For example:
    // await axios.post('/api/newsletter', { email: email.value });

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
  @apply py-16 px-4 bg-gradient-to-b from-transparent to-[--color-background-alt] dark:to-[--color-background-dark-alt];
}
</style>
