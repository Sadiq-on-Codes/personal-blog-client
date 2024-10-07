<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-6">Manage {{ contentTypeTitle }}</h1>
    
    <div class="mb-6">
      <SelectField
        id="category"
        name="category"
        label="Select Content Type"
        v-model="selectedContent"
        :options="categoryOptions"
        @onChange="fetchData"
        class="w-full md:w-64"
      />
    </div>

    <div v-if="loading" class="flex justify-center items-center h-64">
      <LoaderComponent />
    </div>

    <div v-else-if="data.length === 0" class="text-center py-8">
      <p class="text-xl text-gray-600">No {{ contentTypeTitle.toLowerCase() }} found.</p>
    </div>

    <div v-else class="w-full overflow-x-auto">
      <TableComponent
        :headers="tableHeaders"
        :data="data"
        idKey="_id"
        editPath="/dashboard/add-posts"
        :showIndex="true"
        :showActions="true"
        @delete="handleDelete"
        :is-loading="loading"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, computed } from 'vue'
import { fetchBlogPosts, fetchProjects, deleteProject, deleteBlogPost } from '@/services/apiServices'
import TableComponent from '@/components/Admin/TableComponent.vue'
import SelectField from '@/components/common/SingleSelectComponent.vue'
import { usePostStore } from '@/stores'
import LoaderComponent from '@/components/common/LoaderComponent.vue'

const store = usePostStore()
const data = ref([])
const loading = ref(false)
const selectedContent = ref(store.selectedContent || 'blogPosts')

const tableHeaders = computed(() => {
  if (selectedContent.value === 'projects') {
    return [
      { key: 'title', label: 'Title', type: 'truncate' },
      { key: 'tags', label: 'Tags', type: 'tags' },
    ]
  } else {
    return [
      { key: 'title', label: 'Title', type: 'truncate' },
      { key: 'date', label: 'Date Published' },
      { key: 'author', label: 'Author' },
      { key: 'tags', label: 'Tags', type: 'tags' },
    ]
  }
})

const fetchData = async () => {
  loading.value = true
  try {
    if (selectedContent.value === 'projects') {
      store.setSelectedContent(selectedContent.value)
      data.value = await fetchProjects()
    } else {
      store.setSelectedContent(selectedContent.value)
      data.value = await fetchBlogPosts()
    }
  } catch (error) {
    console.error('Error fetching data:', error)
  } finally {
    loading.value = false
  }
}

const categoryOptions = [
  { value: 'projects', text: 'Projects' },
  { value: 'blogPosts', text: 'Blog Posts' }
]

const handleDelete = async (id) => {
  try {
    if (selectedContent.value === 'projects') {
      await deleteProject(id)
    } else {
      await deleteBlogPost(id)
    }
    await fetchData()
  } catch (error) {
    console.error('Error deleting item:', error)
  }
}

const contentTypeTitle = computed(() => 
  selectedContent.value === 'projects' ? 'Projects' : 'Blog Posts'
)

onMounted(() => {
  fetchData()
})

watch(selectedContent, () => {
  fetchData()
  store.setSelectedContent(selectedContent.value)
})
</script>

<style scoped>
/* Add your styles here */
</style>
