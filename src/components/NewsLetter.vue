<template>
    <div :class="[{ 'overlay': letterOverlay }]">
        <div :class="[{ 'bg-white p-4 rounded-xl': letterOverlay }]"
            class="flex flex-col justify-center items-center gap-8 text-center sm:mx-0 mx-4">
            <div :class="[{ 'flex-col': !letterOverlay }]"
                class="text-4xl w-full flex justify-between items-center text-[--color-post-primary] font-semibold uppercase tracking-wider bg-[--color-post-primary-light] px-4 rounded-full">
                <span class="justify-self-center text-sm">Stay Connected</span>
                <button v-if="letterOverlay" @click.prevent="setVisitedState()"
                    class="justify-self-end" aria-label="Close menu">
                    &times;
                </button>
            </div>

            <h2 v-if="!letterOverlay"
                class="text-5xl text-[--color-post-secondary2] dark:text-[--color-text-dark] font-bold leading-tight">
                {{ letterOverlay ? 'Subscribe' : 'Join My Newsletter' }}
            </h2>
            <p :class="[{ 'text-sm': letterOverlay }]" class="text-[--color-post-secondary] text-xl max-w-2xl">
                {{ hasVisited ? subscriptionMessageMain : subscriptionMessage }}
            </p>
            <div class="w-full max-w-md">
                <form @submit.prevent="submitNewsletter" class="flex flex-col sm:flex-row gap-3">
                    <input v-model="email" placeholder="Enter your email"
                        class="flex-grow px-4 py-3 rounded-full dark:bg-[--color-background] bg-[--color-background-dark] text-[--color-text-dark] dark:text-[--color-text] border border-[--color-post-secondary] focus:outline-none focus:ring-2 focus:ring-[--color-post-primary] transition-all duration-300"
                        type="email" required />
                    <button type="submit" :disabled="isLoading"
                        class="px-6 py-3 bg-[--color-post-primary] text-[--color-text-dark] rounded-full font-semibold hover:bg-opacity-90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105">
                        <span v-if="!isLoading">Subscribe</span>
                        <span v-else class="flex items-center justify-center">
                            <svg class="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                    stroke-width="4">
                                </circle>
                                <path class="opacity-75" fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                </path>
                            </svg>
                            Subscribing...
                        </span>
                    </button>
                </form>
                <p v-if="message" :class="['text-sm mt-2', messageClass]">
                    {{ message }}
                </p>
                <p class="text-[--color-post-secondary] text-sm mt-2">
                    We care about your data in our <router-link to="/privacy-policy"
                        class="underline hover:text-[--color-post-primary] transition-colors duration-200">privacy
                        policy</router-link>.
                </p>
            </div>
        </div>
    </div>

</template>
<script setup lang="ts">
import { subscribeToNewsletter } from '@/services/apiServices';
import { ref, computed, onMounted, watch } from 'vue';

const props = defineProps({
    newsletterOverlay: {
        type: Boolean,
        default: false,
    }
})

const email = ref('');
const isLoading = ref(false);
const message = ref('');
const messageType = ref<'success' | 'error' | null>(null);
const hasVisited = ref(false);
const letterOverlay = ref(false)

const subscriptionMessageMain = 'Subscribe to receive updates on my latest blog posts, personal projects, coding insights, and occasional musings on technology and life. Never miss a post and be part of my journey!'
const subscriptionMessage = 'Hi there! Would you like to stay in the loop with my latest blog posts, exciting personal projects, coding insights, and thoughtful musings on technology and life? Join us and never miss an update be part of this journey!'

const messageClass = computed(() => {
    if (messageType.value === 'success') return 'text-green-600';
    if (messageType.value === 'error') return 'text-red-600';
    return '';
});

onMounted(() => {
    hasVisited.value = localStorage.getItem('hasVisited') === 'true';
    letterOverlay.value = props.newsletterOverlay;
});

const setVisitedState = () => {
    localStorage.setItem('hasVisited', 'true');
    letterOverlay.value = false;
}

const submitNewsletter = async () => {
    isLoading.value = true;
    message.value = '';
    messageType.value = null;

    try {
        await subscribeToNewsletter(email.value);
        message.value = 'Thank you for subscribing!';
        messageType.value = 'success';
        email.value = '';
        setVisitedState()
    } catch (error) {
        message.value = 'An error occurred. Please try again.';
        messageType.value = 'error';
    } finally {
        isLoading.value = false;
    }
};

watch(hasVisited, (newValue) => {
    if (newValue) {
        letterOverlay.value = false; 
    }
});
</script>
<style>
.overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    /* Semi-transparent background */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    /* Ensure it appears above other content */
}
</style>
