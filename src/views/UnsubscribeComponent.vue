<template>
  <div class="flex justify-center pt-32 pb-24 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 bg-white p-6 rounded-xl shadow-md">
      <h1 class="text-3xl font-bold text-center text-gray-900">Newsletter Unsubscribe</h1>
      <div v-if="loading" class="text-center">
        <p class="text-gray-600">Processing your request...</p>
        <div class="loader mx-auto mt-4"></div>
      </div>
      <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <p>{{ error }}</p>
        <button @click="retryUnsubscribe" class="mt-4 w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Retry
        </button>
      </div>
      <div v-else-if="unsubscribed" class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
        <p>You have been successfully unsubscribed from our newsletter.</p>
        <p class="mt-2">We're sorry to see you go. If you change your mind, you can always subscribe again.</p>
        <button @click="goHome" class="mt-4 w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Return to Home
        </button>
      </div>
      <div v-else class="text-center">
        <p class="text-gray-600">Are you sure you want to unsubscribe from our newsletter?</p>
        <div class="mt-4 space-y-2">
          <button @click="confirmUnsubscribe" class="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
            Confirm Unsubscribe
          </button>
          <button @click="goHome" class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { unsubscribeFromNewsletter } from '@/services/apiServices';

const route = useRoute();
const router = useRouter();
const loading = ref(false);
const error = ref('');
const unsubscribed = ref(false);

const confirmUnsubscribe = async () => {
  loading.value = true;
  error.value = '';
  try {
    const subscriberId = route.params.id as string;
    await unsubscribeFromNewsletter(subscriberId);
    unsubscribed.value = true;
  } catch (err) {
    error.value = 'An error occurred while unsubscribing. Please try again later.';
    console.error('Unsubscribe error:', err);
  } finally {
    loading.value = false;
  }
};

const retryUnsubscribe = () => {
  error.value = '';
  confirmUnsubscribe();
};

const goHome = () => {
  router.push('/');
};
</script>

<style scoped>
.loader {
  border: 4px solid #e2e8f0; /* border-gray-200 */
  border-top: 4px solid #3498db; /* border-blue-500 */
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
