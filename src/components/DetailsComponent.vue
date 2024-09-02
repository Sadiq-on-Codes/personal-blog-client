<template>
  <section
    class="bg-[--color-background-soft] border-2 border-[--color-border] rounded-[--border-radius] mt-[--spacing]"
  >
    <div class="mx-10 sm:mx-10 py-[--padding-card]">
      <div
        class="flex sm:flex-row justify-between uppercase text-[--color-text-secondary] flex-col-reverse"
      >
        <span class="sm:text-xl text-lg">Software Developer</span>
        <div class="text-xs p-2 bg-[--color-background] flex items-center gap-2 rounded-full px-4">
          <CircleIcon />
          <span class="">Available for jobs</span>
        </div>
      </div>

      <div class="mt-12 flex gap-5 sm:flex-row justify-between items-center flex-col-reverse">
        <div class="flex flex-col gap-5">
          <p class="font-semibold sm:text-4xl text-2xl">Abubakar Sadick Yahaya</p>
          <p class="text-[--color-text-secondary] text-xl">
            I design digital products with great experience.
          </p>
          <div class="flex h-10 w-fit gap-2">
            <div class="flex items-center">
              <button
                class="bg-[--color-button-primary] border border-[--color-border] p-2 rounded-l-lg"
              >
                Hire me
              </button>
              <button
                class="bg-[--color-button-primary] p-2 border border-[--color-border] ml-0.5 rounded-r-lg h-full"
              >
                <img src="../assets/plus.svg" alt="plus_sign" />
              </button>
            </div>
            <div class="flex items-center">
              <button
                class="bg-[--color-background] p-2 border border-[--color-border] rounded-l-lg"
              >
                Copy email
              </button>
              <button
                class="bg-[--color-background] p-2 border border-[--color-border] ml-0.5 rounded-r-lg h-full"
              >
                <img src="../assets/copy.svg" alt="copy_logo" />
              </button>
            </div>
          </div>
        </div>
        <div
          class="bg-[--color-background-white] flex justify-end self-start sm:self-end sm:w-64 w-32"
        >
          <img
            class="rounded-full border-4 border-[--color-border]"
            src="../assets/avatar.svg"
            alt="avatar"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import CircleIcon from '@/assets/CircleIcon.vue'
</script>

<style></style>
