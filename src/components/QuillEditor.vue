<template>
  <div class="quill-editor">
    <div ref="quillContainer"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const quillContainer = ref<HTMLElement | null>(null)
let quill: Quill | null = null

onMounted(() => {
  if (quillContainer.value) {
    quill = new Quill(quillContainer.value, {
      theme: 'snow',
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],
          ['blockquote', 'code-block'],
          [{ 'header': 1 }, { 'header': 2 }],
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          [{ 'script': 'sub'}, { 'script': 'super' }],
          [{ 'indent': '-1'}, { 'indent': '+1' }],
          [{ 'direction': 'rtl' }],
          [{ 'size': ['small', false, 'large', 'huge'] }],
          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
          [{ 'color': [] }, { 'background': [] }],
          [{ 'font': [] }],
          [{ 'align': [] }],
          ['clean'],
          ['link', 'image', 'video']
        ]
      }
    })

    quill.on('text-change', () => {
      emit('update:modelValue', JSON.stringify(quill!.getContents()))
    })

    // Set initial content
    if (props.modelValue) {
      try {
        const content = JSON.parse(props.modelValue)
        quill.setContents(content)
      } catch (error) {
        console.error('Error parsing content:', error)
        quill.setText(props.modelValue)
      }
    }
  }
})

watch(() => props.modelValue, (newValue) => {
  if (quill && newValue !== JSON.stringify(quill.getContents())) {
    try {
      const content = JSON.parse(newValue)
      quill.setContents(content)
    } catch (error) {
      console.error('Error parsing content:', error)
      quill.setText(newValue)
    }
  }
})
</script>

<style scoped>
.quill-editor {
  height: 400px;
}
</style>
