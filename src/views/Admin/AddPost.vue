<template>
  <div aria-hidden="true" class="flex justify-center items-start w-full md:inset-0 md:h-full">
    <div class="relative p-4 h-full md:h-auto">
      <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
        <form @submit.prevent="submitForm">
          <div class="flex flex-col gap-[--spacing]">
            <InputComponent
              v-model="form.title"
              id="title"
              name="title"
              type="text"
              placeholder="Enter title"
              label="Title"
              required
            />

            <InputComponent
              v-model="form.author"
              id="author"
              name="author"
              type="text"
              placeholder="Enter author's name"
              label="Author"
              required
            />

            <InputComponent
              v-model="form.date"
              id="date"
              name="date"
              type="date"
              placeholder="Select date"
              label="Date"
              required
            />

            <InputComponent
              id="image"
              name="image"
              type="file"
              placeholder="Select image"
              label="Image"
              required
              @change="handleFileUpload"
            />

            <div class="">
              <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Content
              </label>
              <div>
                <QuillEditor v-model:content="form.description" theme="snow" toolbar="full" />
              </div>
            </div>

            <Button @click="submitForm" type="submit">
              {{ 'Publish' }}
            </Button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import Button from '@/components/common/ButtonComponent.vue'
import InputComponent from '@/components/common/InputComponent.vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import type { Post } from '@/types'
import { createPost } from '@/services/apiServices'

const form = reactive<Post>({
  title: '',
  author: '',
  date: '',
  image: null,
  description: ''
})

const handleFileUpload = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files.length > 0) {
    form.image = input.files[0]
  }
}

const getDescriptionAsString = (): string => {
  if (typeof form.description === 'object') {
    return JSON.stringify(form.description)
  }
  return form.description as string
}

const submitForm = async () => {
  try {
    const formData = new FormData()
    formData.append('title', form.title)
    formData.append('author', form.author)
    formData.append('date', form.date)
    formData.append('description', getDescriptionAsString())
    if (form.image) {
      formData.append('image', form.image)
    }

    const response = await createPost(formData)

    console.log('Form submitted successfully', response)
  } catch (error) {
    console.error('Error submitting form', error)
  }
}
</script>
<style>
.ql-container {
  height: 20em !important;
}
</style>
