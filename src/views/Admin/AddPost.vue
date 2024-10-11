<template>
  <div class="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
    <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-8">
      {{ form._id ? 'Edit' : 'Create' }} {{ selectedContent === 'blogPosts' ? 'Blog Post' : 'Project' }}
    </h1>

    <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-6">
      <SelectField
        id="category"
        name="category"
        label="Content Type"
        v-model="selectedContent"
        :options="categoryOptions"
        :disabled="disableSelection"
        class="mb-6"
      />

      <form @submit.prevent="submitForm" class="space-y-6">
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
            v-if="selectedContent === 'blogPosts'"
            v-model="form.author"
            id="author"
            name="author"
            type="text"
            placeholder="Enter author's name"
            label="Author"
            required
          />

          <InputComponent
            v-if="selectedContent === 'blogPosts'"
            v-model="form.date"
            id="date"
            name="date"
            type="date"
            :placeholder="todayDate"
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

          <SelectComponent v-model="form.tags" :options="tags" />

          <TextAreaComponent
            v-model="form.description"
            v-if="selectedContent === 'projects'"
            id="description"
            name="description"
            placeholder="Select image"
            label="Content"
            ref="projectTextArea"
          />

          <div v-if="selectedContent === 'blogPosts'">
            <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Content
            </label>
            <div v-if="editMode" id="description" ref="descriptionContainer" class="quill-editor"></div>
            <div v-else>
              <QuillEditor v-model:content="form.description" theme="snow" toolbar="full" />
            </div>
          </div>

          <div v-if="form._id && selectedContent === 'blogPosts'" class="space-y-4 bg-gray-100 dark:bg-gray-700 p-4 rounded-md">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">Additional Actions</h3>
            <div class="flex flex-col gap-2">
              <label class="inline-flex items-center">
                <input type="checkbox" v-model="sendNewsletter" class="form-checkbox h-5 w-5 text-blue-600">
                <span class="ml-2 text-gray-700 dark:text-gray-300">Send Newsletter</span>
              </label>
              <label class="inline-flex items-center">
                <input type="checkbox" v-model="postToTwitter" class="form-checkbox h-5 w-5 text-blue-600">
                <span class="ml-2 text-gray-700 dark:text-gray-300">Post to Twitter</span>
              </label>
              <label class="inline-flex items-center">
                <input type="checkbox" v-model="postToLinkedIn" class="form-checkbox h-5 w-5 text-blue-600">
                <span class="ml-2 text-gray-700 dark:text-gray-300">Post to LinkedIn</span>
              </label>
              <label class="inline-flex items-center">
                <input type="checkbox" v-model="postToFacebook" class="form-checkbox h-5 w-5 text-blue-600">
                <span class="ml-2 text-gray-700 dark:text-gray-300">Post to Facebook</span>
              </label>
            </div>
          </div>

          <Button 
            @click="submitForm" 
            type="submit"
            :loading="isLoading"
            :disabled="isLoading"
            class="w-full"
          >
            {{ form._id ? 'Update' : 'Publish' }}
          </Button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Button from '@/components/common/ButtonComponent.vue'
import InputComponent from '@/components/common/InputComponent.vue'
import Quill from 'quill'
import { QuillEditor } from '@vueup/vue-quill'
import 'quill/dist/quill.snow.css'
import {
  createBlogPost,
  updateBlogPost,
  fetchBlogPostById,
  createProject,
  updateProject,
  fetchProjectById,
  fetchTags,
  sendNewsletter as apiSendNewsletter,
  postToTwitter as apiPostToTwitter,
  postToLinkedIn as apiPostToLinkedIn,
  postToFacebook as apiPostToFacebook
} from '@/services/apiServices'
import SelectField from '@/components/common/SingleSelectComponent.vue'
import TextAreaComponent from '@/components/common/TextAreaComponent.vue'
import type { Post } from '@/types'
import { usePostStore } from '@/stores'
import SelectComponent from '@/components/common/SelectComponent.vue'
import { useToast } from 'vue-toastification'

const form = ref<Post>({
  _id: '',
  title: '',
  author: '',
  date: new Date().toISOString().split('T')[0], 
  image: null,
  description: '',
  tags: []
})

const store = usePostStore()
const router = useRouter()

const selectedContent = ref(store.selectedContent)
const categoryOptions: any = [
  { value: 'projects', text: 'Projects' },
  { value: 'blogPosts', text: 'Blog Posts' }
]

const route = useRoute()
const descriptionContainer = ref<HTMLElement | null>(null)
const editMode = ref(false)
const disableSelection = ref(false)
const tags = ref()

const todayDate = computed(() => {
  return new Date().toISOString().split('T')[0]
})

const isLoading = ref(false)

const sendNewsletter = ref(false)
const postToTwitter = ref(false)
const postToLinkedIn = ref(false)
const postToFacebook = ref(false)
const toast = useToast()

onMounted(async () => {
  const id = route.query.id as string
  if (id) {
    editMode.value = true
    disableSelection.value = true
    try {
      if (selectedContent.value === 'blogPosts') {
        const post = await fetchBlogPostById(id)
        form.value = post
        setQuillContent(post.description)
      } else if (selectedContent.value === 'projects') {
        const project = await fetchProjectById(id)
        form.value = project
      }
    } catch (error) {
      console.error('Error fetching data', error)
    }
  } else {
    selectedContent.value = 'blogPosts'
  }
  (async function () {
    tags.value = await fetchTags()
  })()
})

watch(selectedContent, (newContent) => {
  if (newContent === 'blogPosts' && descriptionContainer.value) {
    setQuillContent(form.value.description)
  }
  store.setSelectedContent(selectedContent.value)
})

const setQuillContent = (content: string) => {
  if (descriptionContainer.value) {
    const quill = new Quill(descriptionContainer.value, {
      theme: 'snow',
      readOnly: false,
      modules: {
        toolbar:  [
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

    const descriptionContent = JSON.parse(content)
    quill.setContents(descriptionContent)

    quill.on('text-change', () => {
      form.value.description = JSON.stringify(quill.getContents())
    })
  }
}

const handleFileUpload = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files.length > 0) {
    form.value.image = input.files[0]
  }
}

const getDescriptionAsString = (): string => {
  return typeof form.value.description === 'object'
    ? JSON.stringify(form.value.description)
    : (form.value.description as string)
}

const submitForm = async () => {
  if (isLoading.value) return; 
  
  isLoading.value = true;
  try {
    const formData = new FormData();
    formData.append('title', form.value.title);

    const tagsString = form.value.tags.map(tag => tag._id).join(',');
    formData.append('tags', tagsString);

    if (selectedContent.value === 'blogPosts') {
      formData.append('author', form.value.author);
      formData.append('date', form.value.date);
    }

    formData.append('description', getDescriptionAsString());

    if (form.value.image) {
      formData.append('image', form.value.image);
    }

    let postId;
    if (form.value._id) {
      if (selectedContent.value === 'blogPosts') {
        await updateBlogPost(form.value._id, formData);
        postId = form.value._id;
        toast.success('Post updated successfully');
      } else if (selectedContent.value === 'projects') {
        await updateProject(form.value._id, formData);
        toast.success('Project updated successfully');
      }
    } else {
      if (selectedContent.value === 'blogPosts') {
        const response = await createBlogPost(formData);
        postId = response._id;
        toast.success('Post created successfully');
      } else if (selectedContent.value === 'projects') {
        await createProject(formData);
        toast.success('Project created successfully');
      }
    }

    if (selectedContent.value === 'blogPosts' && postId) {
      if (sendNewsletter.value) {
        try {
          await apiSendNewsletter(postId);
          toast.success('Newsletter sent successfully');
        } catch (error) {
          toast.error('Failed to send newsletter');
        }
      }
      if (postToTwitter.value) {
        try {
          await apiPostToTwitter(postId);
          toast.success('Posted to Twitter successfully');
        } catch (error) {
          toast.error('Failed to post to Twitter');
        }
      }
      if (postToLinkedIn.value) {
        try {
          await apiPostToLinkedIn(postId);
          toast.success('Posted to LinkedIn successfully');
        } catch (error) {
          toast.error('Failed to post to LinkedIn');
        }
      }
      if (postToFacebook.value) {
        try {
          await apiPostToFacebook(postId);
          toast.success('Posted to Facebook successfully');
        } catch (error) {
          toast.error('Failed to post to Facebook');
        }
      }
    }
  
    router.push({ path: '/dashboard/view-posts' });

  } catch (error) {
    toast.error('Error submitting form. Please try again.');
  } finally {
    isLoading.value = false;
  }
};

</script>

<style scoped>
.ql-container.ql-snow {
  height: 20em !important;
  border-radius: 0.375rem;
}
.quill-editor {
  height: 20em;
}
/* Add transitions for smooth interactions */
.form-checkbox, .form-input, .form-select, .form-textarea {
  transition: all 0.2s ease-in-out;
}
.form-checkbox:hover, .form-input:hover, .form-select:hover, .form-textarea:hover {
  border-color: #4a5568;
}
</style>