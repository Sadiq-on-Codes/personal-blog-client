<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 mt-[--spacing] gap-[--spacing]">
    <div
      class="border-2 border-[--color-border] px-[--padding-card] py-[--spacing] rounded-[--border-radius]"
    >
      <HeadingComponent text="Experience"  />
      <div
        v-for="(role, index) in roles"
        :key="index"
        class="flex justify-between items-center gap-[--spacing] mt-[--spacing]"
      >
        <div>
          <img class="inline mr-2 w-5 h-5" :src="role.companyLogo" alt="" />
          <span class="hover:text-[--color-text-hover] cursor-pointer"
            >{{ role.roleName }} at {{ role.company }}</span
          >
        </div>
        <span class="text-[--color-text-secondary]">{{ role.startDate }} - {{ role.endDate }}</span>
      </div>
    </div>
    <div>
      <div
        class="border-2 border-[--color-border] px-[--padding-card] py-[--spacing] rounded-[--border-radius] gradient-corner-right relative"
      >
        <HeadingComponent text="Tech Stack" align="center" />
        <div class="flex justify-center items-center gap-[--spacing] mt-[--spacing] z-10">
          <img src="../assets/html.svg" alt="" />
          <img src="../assets/css.svg" alt="" />
          <img src="../assets/javascript.svg" alt="" />
          <img src="../assets/react.svg" alt="" />
        </div>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 mt-[--spacing] gap-[--spacing]">
        <div
          class="border-2 border-[--color-border] p-[--padding-card] rounded-[--border-radius] gradient-corner-right"
        ></div>
        <div
          class="border-2 border-[--color-border] p-[--padding-card] rounded-[--border-radius] gradient-corner-left"
        ></div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import CircleIcon from '@/assets/CircleIcon.vue'
import { roles } from '../data/roles'
import HeadingComponent from './reussables/HeadingComponent.vue'
</script>

<style></style>
