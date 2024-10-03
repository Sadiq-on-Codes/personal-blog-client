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
          :showIndex="true"
          :showActions="false"
        >
          <template #subscriptionDate="{ item }">
            {{ formatDate(item.subscriptionDate) }}
          </template>
        </TableComponent>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from 'vue'
  import { fetchNewsletterSubscribers } from '@/services/apiServices.ts'
  import TableComponent from '@/components/Admin/TableComponent.vue'
  import LoaderComponent from '@/components/common/LoaderComponent.vue'
  
  const data = ref([])
  const loading = ref(false)
  
  const tableHeaders = [
    { key: 'email', label: 'Email' },
    { key: 'subscriptionDate', label: 'Subscription Date' },
  ]
  
  const processedData = computed(() => data.value)
  
  const fetchData = async () => {
    loading.value = true
    try {
      data.value = await fetchNewsletterSubscribers()
    } catch (error) {
      console.error('Error fetching subscribers:', error)
    } finally {
      loading.value = false
    }
  }
  
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }
  
  onMounted(() => {
    fetchData()
  })
  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>
