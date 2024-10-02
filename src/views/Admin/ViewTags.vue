<template>
    <div
      class="flex flex-col gap-[--spacing] justify-center items-start w-full md:inset-0 h-modal md:h-full"
    >
      <div v-if="loading"><LoaderComponent /></div>
  
      <div class="w-full" v-else>
        <TableComponent
          :headers="tableHeaders"
          :data="processedData"
          idKey="_id"
          editPath="/dashboard/add-tags"
          :showIndex="true"
          :showActions="true"
          @delete="handleDelete"
        >
          <template #preview="{ item }">
            <span
              :style="{
                color: item.textColor,
                backgroundColor: item.bgColor,
                padding: '2px 6px',
                borderRadius: '4px'
              }"
            >
              {{ item.tag }}
            </span>
          </template>
        </TableComponent>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from 'vue'
  import { fetchTags } from '@/services/apiServices'
  import TableComponent from '@/components/Admin/TableComponent.vue'
  import LoaderComponent from '@/components/common/LoaderComponent.vue'
  
  const data = ref([])
  const loading = ref(false)
  
  const tableHeaders = [
    { key: 'tag', label: 'Tag Name' },
    { key: 'textColor', label: 'Text Color' },
    { key: 'bgColor', label: 'Background Color' },
    { key: 'preview', label: 'Preview' },
  ]
  
  const processedData = computed(() => data.value)
  
  const fetchData = async () => {
    loading.value = true
    try {
      data.value = await fetchTags()
    } catch (error) {
      console.error('Error fetching tags:', error)
    } finally {
      loading.value = false
    }
  }
  
  const handleDelete = async (id) => {
    // try {
    //   await deleteTag(id)
    //   await fetchData()
    // } catch (error) {
    //   console.error('Error deleting tag:', error)
    // }
  }
  
  onMounted(() => {
    fetchData()
  })
  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>
