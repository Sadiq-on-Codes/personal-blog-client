<template>
  <div class="relative w-full overflow-x-auto shadow-md sm:rounded-lg">
    <LoaderComponent :isLoading="isLoading" v-if="isLoading" />
    <table v-else class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th v-for="header in headers" :key="header.key" scope="col" class="px-6 py-3">
            {{ header.label }}
          </th>
          <th v-if="showActions" scope="col" class="px-6 py-3">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item) in data"
          :key="item.id"
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
        >
          <td v-for="header in headers" :key="header.key" class="px-6 py-4">
            <component
              v-if="header.component"
              :is="header.component"
              :value="item[header.key]"
              :item="item"
            />
            <template v-else-if="header.key === 'tags' && Array.isArray(item[header.key])">
              {{ item[header.key].map((tag: Pin) => tag.tag).join(', ') }}
            </template>
            <template v-else>
              {{ item[header.key] }}
            </template>
          </td>
          <td v-if="showActions" class="px-6 py-4 flex space-x-2">
            <router-link
              v-if="editPath"
              :to="{ path: editPath, query: { id: item._id } }"
              class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
            >
              Edit
            </router-link>
            <span 
              @click="openDeleteModal(item._id)"
              class="cursor-pointer font-medium text-red-600 dark:text-red-500 hover:underline"
            >
              Delete
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  
  <DeleteComponent 
    :is-open="isDeleteModalOpen" 
    @confirm="confirmDelete" 
    @close="closeDeleteModal"
  />
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import DeleteComponent from '../DeleteComponent.vue';
import LoaderComponent from '../common/LoaderComponent.vue'; 
import type { Pin } from '@/types';

interface Header {
  key: string;
  label: string;
  component?: any;
}

const props = defineProps<{
  headers: Header[]
  data: any[]
  editPath?: string
  isLoading: boolean 
}>()

const emit = defineEmits(['delete'])

const isDeleteModalOpen = ref(false)
const itemToDeleteId = ref<string | null>(null)

const openDeleteModal = (id: string) => {
  itemToDeleteId.value = id
  isDeleteModalOpen.value = true
}

const closeDeleteModal = () => {
  isDeleteModalOpen.value = false
  itemToDeleteId.value = null
}

const confirmDelete = () => {
  if (itemToDeleteId.value) {
    emit('delete', itemToDeleteId.value)
    closeDeleteModal()
  }
}

const showActions = computed(() => props.editPath)
</script>
