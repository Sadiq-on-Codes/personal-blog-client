<template>
    <div>
      <label :for="id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {{ label }}
      </label>
      <textarea
        :id="id"
        :name="name"
        :placeholder="placeholder"
        :class="textareaClass"
        :required="required"
        :value="modelValue"
        @input="onInput"
        :rows="rows"
      />
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps, defineEmits } from 'vue'
  
  defineProps({
    id: String,
    name: String,
    placeholder: String,
    label: String,
    textareaClass: {
      type: String,
      default:
        'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
    },
    required: {
      type: Boolean,
      default: false
    },
    modelValue: String, // Add modelValue prop to support v-model
    rows: {
      type: Number,
      default: 4 // Default number of rows
    }
  })
  
  const emit = defineEmits(['update:modelValue'])
  
  const onInput = (event: any) => {
    emit('update:modelValue', event.target.value)
  }
  </script>
  