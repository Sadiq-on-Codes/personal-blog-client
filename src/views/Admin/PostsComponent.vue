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
      <ul v-if="selectedContent === 'projects'">
        <TableComponent
          :headers="['Id', 'Title', 'Tags', 'Edit', 'Delete']"
          :data="data"
          path="/dashboard/add-posts"
          isProject="true"
          @delete="handleDelete"
        />
      </ul>
      <div v-if="selectedContent === 'blogPosts'">
        <TableComponent
          :headers="['Id', 'Title', 'Data Published', 'Author', 'Tags', 'Edit', 'Delete']"
          :data="data"
          path="/dashboard/add-posts"
          @delete="handleDelete"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { fetchBlogPosts, fetchProjects, deleteProject, deleteBlogPost } from '@/services/apiServices'
import TableComponent from '@/components/Admin/TableComponent.vue'
import SelectField from '@/components/common/SingleSelectComponent.vue'
import { usePostStore } from '@/stores'
import LoaderComponent from '@/components/common/LoaderComponent.vue'

const store = usePostStore()
const data = ref([])
const loading = ref(false)
const selectedContent = ref(store.selectedContent || 'blogPosts')

const fetchData = async () => {
  loading.value = true
  try {
    if (selectedContent.value === 'projects') {
      store.setSelectedContent(selectedContent.value)
      console.log(selectedContent.value)
      console.log(store.selectedContent)

      data.value = await fetchProjects()
    } else {
      store.setSelectedContent(selectedContent.value)
      console.log(selectedContent.value)
      console.log(store.selectedContent)
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
  store.setSelectedContent(selectedContent)
})
</script>

<style scoped>
/* Add your styles here */
</style>
