<template>
  <header class="fixed top-0 left-0 right-0 z-50 bg-opacity-90 backdrop-blur-sm dark:bg-opacity-90 dark:backdrop-blur-sm bg-white dark:bg-gray-900 shadow-md">
    <div class="container mx-auto px-4">
      <div class="flex h-16 items-center justify-between">
        <div class="sm:hidden flex items-center justify-between w-full">
          <div class="flex items-center">
            <div class="logo mr-2"></div>
            <span class="font-bold text-xl logo-text">Sadiq on Code</span>
          </div>
          <button @click="toggleMenu" v-if="!isMenuOpen" class="text-2xl justify-self-end">☰</button>
        </div>

        <div class="items-center w-full h-full sm:flex hidden">
          <div class="flex items-center">
            <div class="logo mr-3"></div>
            <span class="font-bold text-2xl logo-text text-gradient">Sadiq on Code</span>
          </div>
          <nav class="flex text-lg items-center justify-end gap-6 ml-auto">
            <router-link
              v-for="(menuItem, index) in menuItems"
              :key="index"
              :to="{ name: menuItem.routeName }"
              class="hover:text-primary transition-colors duration-200"
              active-class="text-primary font-semibold"
              exact-active-class="text-primary font-semibold"
            >
              {{ menuItem.name }}
            </router-link>
            <DarkModeToggle />
          </nav>
        </div>

        <div
          v-if="isMenuOpen"
          class="fixed inset-0 flex flex-col items-center justify-center gap-[--spacing] dark:bg-[--color-background-dark] bg-[--color-background] text-xl z-50 w-full h-full"
        >
          <nav class="flex flex-col items-center space-y-6">
            <router-link
              v-for="(menuItem, index) in menuItems"
              :key="index"
              :to="{ name: menuItem.routeName }"
              class="hover:underline text-2xl"
              active-class="underline"
              exact-active-class="underline"
              @click="isMenuOpen = false"
            >
              {{ menuItem.name }}
            </router-link>
            <DarkModeToggle />
          </nav>

          <button @click="isMenuOpen = false" class="absolute top-4 right-4 text-3xl">
            <CloseIcon :fill="isDarkMode ? '#fff' : '#090D1F'" />
          </button>
        </div>
      </div>
    </div>
  </header>

  <!-- Mobile Menu -->
  <div
    v-if="isMenuOpen"
    class="fixed inset-0 z-[100] bg-white dark:bg-gray-900 flex flex-col items-center justify-center"
  >
    <nav class="flex flex-col items-center space-y-8">
      <router-link
        v-for="(menuItem, index) in menuItems"
        :key="index"
        :to="{ name: menuItem.routeName }"
        class="text-3xl hover:text-primary transition-colors duration-200"
        active-class="text-primary font-semibold"
        exact-active-class="text-primary font-semibold"
        @click="isMenuOpen = false"
      >
        {{ menuItem.name }}
      </router-link>
      <DarkModeToggle />
    </nav>

    <button @click="isMenuOpen = false" class="absolute top-4 right-4 text-4xl">
      &times;
    </button>
  </div>
</template>

<script setup lang="ts">
import CloseIcon from '@/components/icons/CloseIcon.vue'
import { inject, ref } from 'vue'
import DarkModeToggle from './common/DarkModeToggle.vue'

const isDarkMode = inject('isDarkMode') as boolean

const isMenuOpen = ref(false)
const menuItems = [
  { name: 'Blog', routeName: 'BlogComponent' },
  { name: 'Projects', routeName: 'ProjectsComponent' },
  { name: 'About Me', routeName: 'AboutComponent' },
  { name: 'Newsletter', routeName: 'NewsLetterComponent' }
]

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<style scoped>
/* Add your styles here */
.text-gradient {
  /* background: linear-gradient(45deg, #3b82f6, #10b981); */
  -webkit-background-clip: text;
  /* -webkit-text-fill-color: transparent; */
  background-clip: text;
}

.logo-text {
  letter-spacing: 0.05em;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
}

.logo {
  width: 30px;
  height: 30px;
  background: linear-gradient(135deg, #3b82f6, #10b981);
  border-radius: 50%;
  position: relative;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), inset 0 2px 4px rgba(255, 255, 255, 0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.logo::before {
  content: "S";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 18px;
  font-weight: bold;
  color: white;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

.logo:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15), inset 0 2px 4px rgba(255, 255, 255, 0.4);
}

@media (min-width: 640px) {
  .logo {
    width: 40px;
    height: 40px;
  }

  .logo::before {
    font-size: 24px;
  }
}

/* Add this new style */
.text-primary {
  @apply text-blue-600 dark:text-blue-400;
}

/* Add this new style for the mobile menu */
.fixed {
  position: fixed;
}

.inset-0 {
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
</style>
