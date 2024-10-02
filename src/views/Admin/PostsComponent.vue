<template>
  <div
    class="flex flex-col gap-[--spacing] justify-center items-start w-full md:inset-0 h-modal md:h-full"
  >
    <SelectField
      id="category"
      name="category"
      label=""
      v-model="selectedContent"
      :options="categoryOptions"
      @onChange="fetchData"
    />

    <div v-if="loading"><LoaderComponent /></div>

    <div class="w-full" v-else>
      <TableComponent
        :headers="tableHeaders"
        :data="data"
        idKey="_id"
        editPath="/dashboard/add-posts"
        :showIndex="true"
        :showActions="true"
        @delete="handleDelete"
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
