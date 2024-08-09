<template>
    <div>
      <!-- Header with Hamburger Menu -->
      <div class="flex h-16 items-center justify-between px-4 sm:px-10">
        <!-- Logo -->
        <div
          class="flex items-center justify-center w-16 bg-[--color-background-soft] rounded-full border-2 border-[--color-border]"
        >
          <img src="../assets/logo.svg" alt="logo">
        </div>
  
        <!-- Hamburger Icon (visible on mobile) -->
        <button 
          @click="toggleMenu" 
          class="text-2xl sm:hidden"
        >
          ☰
        </button>
  
        <!-- Menu Bar (hidden on mobile, visible on larger screens) -->
        <div
          class="flex w-full bg-[--color-background-soft] rounded-full border-2 border-[--color-border] sm:flex hidden"
        >
          <div class="flex text-xl items-center justify-between mx-10 w-full">
            <a
              v-for="(menuItem, index) in ['ABOUT', 'PORTFOLIO', 'CONTACT']"
              :key="index"
              :href="'#' + menuItem.toLowerCase()"
              :class="{
                'text-[--color-text-hover] font-bold': activeMenuItem === menuItem,
                'hover:text-[--color-text-hover] font-semibold': true
              }"
              @click="setActiveMenuItem(menuItem)"
            >
              {{ menuItem }}
            </a>
          </div>
        </div>
      </div>
  
      <!-- Mobile Menu (visible when hamburger is clicked) -->
      <div v-if="isMenuOpen" class="flex flex-col text-xl items-center mt-4 sm:hidden">
        <a
          v-for="(menuItem, index) in ['ABOUT', 'PORTFOLIO', 'CONTACT']"
          :key="index"
          :href="'#' + menuItem.toLowerCase()"
          :class="{
            'text-[--color-text-hover] font-bold': activeMenuItem === menuItem,
            'hover:text-[--color-text-hover] font-semibold': true
          }"
          @click="closeMenu(menuItem)"
        >
          {{ menuItem }}
        </a>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  
  const activeMenuItem = ref('');
  const isMenuOpen = ref(false);
  
  const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
  };
  
  const setActiveMenuItem = (menuItem: string) => {
    activeMenuItem.value = menuItem;
  };
  
  const closeMenu = (menuItem: string) => {
    setActiveMenuItem(menuItem); // Set the active menu item
    isMenuOpen.value = false; // Close menu after selection
  };
  </script>
  
  <style></style>
  