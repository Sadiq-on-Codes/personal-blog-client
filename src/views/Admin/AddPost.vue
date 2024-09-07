<template>
  <div aria-hidden="true" class="flex justify-center items-start w-full md:inset-0 md:h-screen">
    <div class="relative w-full p-4 h-full md:h-auto">
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
              @change="handleFileUpload"
            />

            <div>
              <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Content
              </label>
              <div ref="descriptionContainer" class="quill-editor">
                <!-- Quill Editor will be initialized here -->
              </div>
            </div>

            <Button @click="submitForm" type="submit">
              {{ form._id ? 'Update' : 'Publish' }}
            </Button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Button from '@/components/common/ButtonComponent.vue'
import InputComponent from '@/components/common/InputComponent.vue'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'
import { createPost, updateBlogPost, fetchBlogPostById } from '@/services/apiServices'
import type { Post } from '@/types'

const form = ref<Post>({
  _id: '',
  title: '',
  author: '',
  date: '',
  image: null,
  description: ''
})

const route = useRoute()
const router = useRouter()
const descriptionContainer = ref<HTMLElement | null>(null)

// Fetch existing post data for editing
onMounted(async () => {
  const id = route.query.id as string
  if (id) {
    try {
      const post = await fetchBlogPostById(id)
      form.value = post
      setQuillContent(post.description)
    } catch (error) {
      console.error('Error fetching post data', error)
    }
  }
})

// Initialize Quill Editor and set content
const setQuillContent = (content: string) => {
  if (descriptionContainer.value) {
    const quill = new Quill(descriptionContainer.value, {
      theme: 'snow',
      readOnly: false,
      modules: {
        toolbar: true
      }
    })
    
    // Parse and set the content
    const descriptionContent = JSON.parse(content)
    quill.setContents(descriptionContent)
    
    // Update form when content changes
    quill.on('text-change', () => {
      form.value.description = JSON.stringify(quill.getContents())
    })
  }
}

// Handle image file upload
const handleFileUpload = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files.length > 0) {
    form.value.image = input.files[0]
  }
}

// Convert Quill content to string
const getDescriptionAsString = (): string => {
  return typeof form.value.description === 'object'
    ? JSON.stringify(form.value.description)
    : form.value.description as string
}

// Submit the form
const submitForm = async () => {
  try {
    const formData = new FormData()
    formData.append('title', form.value.title)
    formData.append('author', form.value.author)
    formData.append('date', form.value.date)
    formData.append('description', getDescriptionAsString())
    if (form.value.image) {
      formData.append('image', form.value.image)
    }

    if (form.value._id) {
      await updateBlogPost(form.value._id, formData)
      console.log('Post updated successfully')
    } else {
      await createPost(formData)
      console.log('Post created successfully')
    }

    router.push({ path: '/dashboard/view-posts' }) // Navigate to the posts list or wherever you need
  } catch (error) {
    console.error('Error submitting form', error)
  }
}
</script>

<style scoped>
.ql-container.ql-snow {
  height: 20em !important;
}
.quill-editor {
  height: 20em;
}
</style>
