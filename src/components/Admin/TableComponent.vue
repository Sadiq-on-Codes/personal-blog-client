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
          <td class="px-6 py-4">
            {{ item.date }}
          </td>
          <td class="px-6 py-4">
            {{ item.author }}
          </td>
          <td class="px-6 py-4">
            <span v-if="item.tags.length > 0" class="text-gray-600 dark:text-gray-300">
              {{ item.tags.join(', ') }}
            </span>
            <span v-else class="text-gray-400 dark:text-gray-500"> No tags </span>
          </td>
          <td class="px-6 py-4">
            <router-link
              :to="{ path: '/dashboard/add-posts', query: { id: item._id } }"
              class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
            >
              Edit
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
interface BlogPost {
  _id: string
  title: string
  date: string
  author: string
  tags: string[]
}

defineProps<{
  headers: string[]
  data: BlogPost[]
}>()
</script>
