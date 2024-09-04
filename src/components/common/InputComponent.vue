<!-- components/InputField.vue -->
<template>
  <div>
    <label :for="id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
      {{ label }}
    </label>
    <input
      :type="type"
      :id="id"
      :name="name"
      :placeholder="placeholder"
      :class="inputClass"
      :required="required"
      :value="modelValue"
      @input="onInput"
    />
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  type: {
    type: String,
    default: 'text',
  },
  id: String,
  name: String,
  placeholder: String,
  label: String,
  inputClass: {
    type: String,
    default: 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
  },
  required: {
    type: Boolean,
    default: false,
  },
  modelValue: String, // Add modelValue prop to support v-model
});

const emit = defineEmits(['update:modelValue']);

const onInput = (event) => {
  emit('update:modelValue', event.target.value);
};
</script>
