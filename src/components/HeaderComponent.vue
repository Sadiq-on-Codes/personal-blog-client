<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 bg-opacity-90 backdrop-blur-sm dark:bg-opacity-90 dark:backdrop-blur-sm bg-white dark:bg-gray-900 shadow-md">
    <div class="container mx-auto px-4">
      <nav class="flex h-16 items-center justify-between" aria-label="Main Navigation">
        <div class="sm:hidden flex items-center justify-between w-full">
          <a href="/" class="flex items-center">
            <div class="logo mr-3" aria-hidden="true">
              <img src="../assets/logo-main.svg" alt="logo" class="w-8 h-8">
            </div>
            <span class="font-bold text-2xl logo-text">Sadiq on Codes</span>
          </a>
          <button @click="toggleMenu" v-if="!isMenuOpen" class="text-2xl justify-self-end"
            aria-label="Open menu">☰</button>
        </div>

        <div class="items-center w-full h-full sm:flex hidden">
          <a href="/" class="flex items-center">
            <div class="logo mr-3" aria-hidden="true">
              <img src="../assets/logo-main.svg" alt="logo" class="w-8 h-8">
            </div>
            <span class="font-bold text-2xl logo-text">Sadiq on Codes</span>
          </a>
          <ul class="flex text-lg items-center justify-end gap-6 ml-auto">
            <li v-for="(menuItem, index) in menuItems" :key="index">
              <router-link :to="{ name: menuItem.routeName }" class="hover:text-primary transition-colors duration-200"
                active-class="text-primary font-semibold" exact-active-class="text-primary font-semibold">
                {{ menuItem.name }}
              </router-link>
            </li>
            <li>
              <DarkModeToggle />
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </header>

  <!-- Mobile Menu -->
  <dialog v-if="isMenuOpen"
    class="fixed inset-0 z-[100] bg-white dark:bg-gray-900 flex flex-col items-center justify-center pt-16 w-full h-full overflow-y-auto">
    <nav class="flex flex-col items-center space-y-8 w-full" aria-label="Mobile Navigation">
      <router-link v-for="(menuItem, index) in menuItems" :key="index" :to="{ name: menuItem.routeName }"
        class="text-3xl text-gray-800 dark:text-white hover:text-primary transition-colors duration-200 w-full text-center py-4"
        active-class="text-primary font-semibold" exact-active-class="text-primary font-semibold"
        @click="isMenuOpen = false">
        {{ menuItem.name }}
      </router-link>
      <DarkModeToggle />
    </nav>

    <button @click="isMenuOpen = false" class="absolute top-4 right-4 text-4xl p-2 text-gray-800 dark:text-white"
      aria-label="Close menu">
      &times;
    </button>
  </dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DarkModeToggle from './common/DarkModeToggle.vue'

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
.text-gradient {
  -webkit-background-clip: text;
  background-clip: text;
}

.logo-text {
  letter-spacing: 0.05em;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
}

.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #3b82f6, #10b981);
  border-radius: 8px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.logo svg {
  width: 24px;
  height: 24px;
  color: white;
}

.logo:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
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

/* Update the mobile menu styles */
dialog {
  margin: 0;
  padding: 0;
  border: none;
  background: rgba(255, 255, 255, 1);
  /* Fully opaque white background */
}

dialog.dark {
  background: rgba(17, 24, 39, 1);
  /* Fully opaque dark background (adjust color as needed) */
}

dialog::backdrop {
  background: rgba(0, 0, 0, 0.5);
}

/* Add smooth transition for menu items */
dialog a {
  transition: background-color 0.2s ease;
}

dialog a:active {
  background-color: rgba(0, 0, 0, 0.1);
}
</style>
