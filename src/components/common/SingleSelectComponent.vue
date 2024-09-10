<template>
    <div>
      <label :for="id" class=" w-full block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {{ label }}
      </label>
      <select
        :id="id"
        :name="name"
        :class="selectClass"
        :required="required"
        :value="modelValue"
        @change="onChange"
        :disabled="disabled"
      >
        <option v-if="!defaultOption" value="" disabled>Select an option</option>
        <option v-for="option in options" :key="option.value" :value="option.value">
          {{ option.text || option.tag }}
        </option>
      </select>
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps, defineEmits } from 'vue'
  
  interface Option {
    value: string | number;
    text: string;
    tag: string;
  }
  
  defineProps({
    id: String,
    name: String,
    label: String,
    selectClass: {
      type: String,
      default:
        'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
    },
    required: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    modelValue: [String, Number],
    options: {
      type: Array as () => Option[],
      default: () => []
    },
    defaultOption: {
      type: Boolean,
      default: true
    }
  })
  
  const emit = defineEmits(['update:modelValue'])
  
  const onChange = (event: Event) => {
    const target = event.target as HTMLSelectElement
    emit('update:modelValue', target.value)
  }
  </script>
  