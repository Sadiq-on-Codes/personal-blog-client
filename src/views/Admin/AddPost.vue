<template>
  <div aria-hidden="true" class="flex flex-col justify-center items-start w-full md:inset-0">
    <div class="px-5">
      <SelectField
        id="category"
        name="category"
        label=""
        v-model="selectedContent"
        :options="categoryOptions"
        :disabled="disableSelection"
      />
    </div>

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

            <div v-if="form._id && selectedContent === 'blogPosts'" class="flex flex-col gap-2">
              <label class="flex items-center">
                <input type="checkbox" v-model="sendNewsletter" class="mr-2">
                Send Newsletter
              </label>
              <label class="flex items-center">
                <input type="checkbox" v-model="postToTwitter" class="mr-2">
                Post to Twitter
              </label>
              <label class="flex items-center">
                <input type="checkbox" v-model="postToLinkedIn" class="mr-2">
                Post to LinkedIn
              </label>
            </div>

            <Button 
              @click="submitForm" 
              type="submit"
              :loading="isLoading"
              :disabled="isLoading"
            >
              {{ form._id ? 'Update' : 'Publish' }}
            </Button>
          </div>
        </form>
      </div>
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
  postToLinkedIn as apiPostToLinkedIn
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
        toolbar: true
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
  if (isLoading.value) return; // Prevent multiple submissions
  
  isLoading.value = true;
  try {
    const formData = new FormData();
    formData.append('title', form.value.title);

    // Convert tag IDs array to comma-separated string
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
        console.log('Post updated successfully');
      } else if (selectedContent.value === 'projects') {
        await updateProject(form.value._id, formData);
        console.log('Project updated successfully');
      }
    } else {
      if (selectedContent.value === 'blogPosts') {
        const response = await createBlogPost(formData);
        postId = response._id;
        console.log('Post created successfully');
      } else if (selectedContent.value === 'projects') {
        await createProject(formData);
        console.log('Project created successfully');
      }
    }

    // Perform additional actions if checkboxes are checked
    if (selectedContent.value === 'blogPosts' && postId) {
      if (sendNewsletter.value) {
        try {
          await apiSendNewsletter(postId);
          toast.success('Newsletter sent successfully');
        } catch (error) {
          console.error('Error sending newsletter:', error);
          toast.error('Failed to send newsletter');
        }
      }
      if (postToTwitter.value) {
        try {
          await apiPostToTwitter(postId);
          toast.success('Posted to Twitter successfully');
        } catch (error) {
          console.error('Error posting to Twitter:', error);
          toast.error('Failed to post to Twitter');
        }
      }
      if (postToLinkedIn.value) {
        try {
          await apiPostToLinkedIn(postId);
          toast.success('Posted to LinkedIn successfully');
        } catch (error) {
          console.error('Error posting to LinkedIn:', error);
          toast.error('Failed to post to LinkedIn');
        }
      }
    }
    
    // Redirect after successful submission
    router.push({ path: '/dashboard/view-posts' });
  } catch (error) {
    console.error('Error submitting form', error);
    toast.error('Error submitting form. Please try again.');
  } finally {
    isLoading.value = false;
  }
};

</script>

<style scoped>
.ql-container.ql-snow {
  height: 20em !important;
}
.quill-editor {
  height: 20em;
}
</style>