<!-- components/Checkbox.vue -->
<template>
    <div class="flex items-start">
      <div class="flex items-center h-5">
        <input
          :id="id"
          aria-describedby="terms"
          type="checkbox"
          :class="checkboxClass"
          :required="required"
        />
      </div>
      <div class="ml-3 text-sm">
        <label :for="id" class="font-light text-gray-500 dark:text-gray-300">
          {{ label }}
          <a
            :href="linkHref"
            class="font-medium text-primary-600 hover:underline dark:text-primary-500"
          >
            {{ linkText }}
          </a>
        </label>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps } from 'vue';
  
defineProps({
    id: String,
    checkboxClass: {
      type: String,
      default: 'w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800',
    },
    required: {
      type: Boolean,
      default: false,
    },
    label: String,
    linkHref: {
      type: String,
      default: '#',
    },
    linkText: {
      type: String,
      default: 'Terms and Conditions',
    },
  });
  </script>
  