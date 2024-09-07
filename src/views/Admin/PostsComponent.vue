<template>
  <div class="flex flex-col gap-[--spacing] justify-center items-start w-full md:inset-0 h-modal md:h-full">
    <SelectField
      id="category"
      name="category"
      label=""
      v-model="selectedContent"
      :options="categoryOptions"
      @onChange="fetchData"
    />

    <div v-if="loading">Loading...</div>

    <div class="w-full" v-else>
      <ul v-if="selectedContent === 'projects'">
        <li v-for="project in data" :key="project._id">{{ project.name }}</li>
      </ul>
      <div v-if="selectedContent === 'blogPosts'">
        <TableComponent
          :headers="['Id', 'Title', 'Data Published', 'Author', 'Tags', 'Edit']"
          :data="data"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { fetchBlogPosts, Projects } from '@/services/apiServices'
import TableComponent from '@/components/Admin/TableComponent.vue'
import SelectComponent from '@/components/common/SelectComponent.vue'
import SelectField from '@/components/common/SingleSelectComponent.vue'

const selectedContent = ref('blogPosts')
const data = ref([])
const loading = ref(false)
const title = ref('Projects')

const fetchData = async () => {
  loading.value = true
  try {
    if (selectedContent.value === 'projects') {
      const response = await Projects()
      data.value = response.data
      title.value = 'Projects'
    } else {
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

onMounted(() => {
  fetchData()
})

watch(selectedContent, () => {
  fetchData()
})
</script>

<style scoped>
/* Add your styles here */
</style>
