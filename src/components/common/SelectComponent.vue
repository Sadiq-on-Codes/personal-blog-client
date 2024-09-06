<template>
    <div>
      <Multiselect
        v-model="selectedValues"
        :options="availableOptions"
        :taggable="true"
        @tag="handleTag"
        track-by="code"
        label="name"
        placeholder="Select or add tags"
      />
    </div>
  </template>
  
  <script setup>
  import { ref, defineProps, defineEmits } from 'vue'
  import Multiselect from 'vue-multiselect'
  
  // Props for customizing the component
  const props = defineProps({
    modelValue: {
      type: Array,
      default: () => []
    },
    options: {
      type: Array,
      default: () => []
    }
  })
  
  // Emits
  const emit = defineEmits(['update:modelValue'])
  
  // Reactive properties
  const selectedValues = ref([...props.modelValue])
  const availableOptions = ref([...props.options])
  
  // Method to handle adding new tags
  const handleTag = (newTag) => {
    const tag = {
      name: newTag,
      code: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000))
    }
    availableOptions.value.push(tag)
    selectedValues.value.push(tag)
    emit('update:modelValue', selectedValues.value)
  }
  </script>
  
  <style scoped>
  /* Add component-specific styles here */
  </style>
  