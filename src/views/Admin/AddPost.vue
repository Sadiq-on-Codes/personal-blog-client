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
import { ref, onMounted, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
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
  fetchTags
} from '@/services/apiServices'
import SelectField from '@/components/common/SingleSelectComponent.vue'
import TextAreaComponent from '@/components/common/TextAreaComponent.vue'
import type { Post } from '@/types'
import { usePostStore } from '@/stores'
import SelectComponent from '@/components/common/SelectComponent.vue'

const form = ref<Post>({
  _id: '',
  title: '',
  author: '',
  date: new Date().toISOString().split('T')[0], // Set default date to today
  image: null,
  description: '',
  tags: []
})

const store = usePostStore()

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
    const result: any = await fetchTags()
    tags.value =  result.data
    
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
  try {
    const formData = new FormData();
    formData.append('title', form.value.title);

    // Append each tag separately
    form.value.tags.forEach((tag) => {
      formData.append('tags', tag._id);
    });

    if (selectedContent.value === 'blogPosts') {
      formData.append('author', form.value.author);
      formData.append('date', form.value.date);
    }

    formData.append('description', getDescriptionAsString());

    if (form.value.image) {
      formData.append('image', form.value.image);
    }

    if (form.value._id) {
      if (selectedContent.value === 'blogPosts') {
        await updateBlogPost(form.value._id, formData);
        console.log('Post updated successfully');
      } else if (selectedContent.value === 'projects') {
        await updateProject(form.value._id, formData);
        console.log('Project updated successfully');
      }
    } else {
      if (selectedContent.value === 'blogPosts') {
        await createBlogPost(formData);
        console.log('Post created successfully');
      } else if (selectedContent.value === 'projects') {
        await createProject(formData);
        console.log('Project created successfully');
      }
    }
    // router.push({ path: '/dashboard/view-posts' });
  } catch (error) {
    console.error('Error submitting form', error);
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
