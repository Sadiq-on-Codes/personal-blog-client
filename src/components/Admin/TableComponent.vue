<template>
  <div class="relative w-full overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" class="px-6 py-3">Number</th>
          <th v-for="header in headers" :key="header" scope="col" class="px-6 py-3">
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in data"
          :key="item._id"
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
        >
          <td class="px-6 py-4">
            {{ index + 1 }}
          </td>
          <td class="px-6 py-4">
            {{ item._id }}
          </td>
          <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {{ item.title.slice(0, 35) }}
          </td>
          <td v-if="!isProject" class="px-6 py-4">
            {{ item.date }}
          </td>
          <td v-if="!isProject" class="px-6 py-4">
            {{ item.author }}
          </td>
          <!-- <td v-if="isProject" class="px-6 py-4">
            {{ item.description }}
          </td> -->
          <td class="px-6 py-4">
            <div v-if="item.tags.length > 0" class="flex flex-wrap">
              <span
                v-for="tag in item.tags"
                :key="tag._id"
                :style="{ color: tag.textColor, backgroundColor: tag.bgColor }"
                class="text-gray-600 dark:text-gray-300 py-1 px-2 m-0.5 rounded-full"
              >
                {{ tag.tag }}
              </span>
            </div>
            <span v-else >No tags</span>
          </td>
          <td class="px-6 py-4">
            <router-link
              :to="{ path: path, query: { id: item._id } }"
              class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
            >
              Edit
            </router-link>
          </td>
          <td class="px-6 py-4">
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
import { ref } from 'vue'
import type { Post } from '@/types'
import DeleteComponent from '../DeleteComponent.vue';

const props = defineProps<{
  headers: string[]
  data: Post[]
  path: string
  isProject: {
    type: Boolean
    default: false
  }
}>()

const emit = defineEmits(['delete'])

const isDeleteModalOpen = ref(false)
const itemToDeleteId = ref<string | null>(null)

const openDeleteModal = (id: string) => {
  itemToDeleteId.value = id
  console.log(id);
  
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
</script>
