<template>
  <div class="flex h-screen bg-gray-100 dark:bg-gray-900">
    <!-- Sidebar -->
    <aside class="w-[20%] bg-white dark:bg-gray-800 shadow-md">
      <div class="flex items-center justify-center h-16 border-b dark:border-gray-700">
        <span class="text-xl font-semibold">Yahaya A. Sadick</span>
      </div>
      <nav class="mt-6">
        <router-link
          v-for="item in menuItems"
          :key="item.path"
          :to="item.path"
          class="flex items-center px-6 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <component :is="item.icon" class="w-5 h-5 mr-3" />
          {{ item.name }}
        </router-link>
      </nav>
    </aside>

    <!-- Main content -->
    <div class="flex flex-col w-[80%]">
      <!-- Top navbar -->
      <header class="bg-white dark:bg-gray-800 shadow-sm z-10">
        <div class="flex items-center justify-end h-16 px-6">
          <div class="flex items-center">
            <p class="text-gray-600 dark:text-gray-300 mr-4">{{ 'Welcome, ' + decodedToken?.user?.username }}</p>
            <DarkModeToggle />
            <div class="ml-4 relative">
              <button @click="toggleUserMenu" class="flex items-center focus:outline-none">
                <img class="h-8 w-8 rounded-full" src="https://via.placeholder.com/150" alt="User avatar" />
              </button>
              <div v-if="userMenuOpen" class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                <!-- <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</a>
                <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a> -->
                <a @click="logout" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">Logout</a>
              </div>
            </div>
          </div>
        </div>
      </header>

      <!-- Router view container -->
      <main class="">
        <div class="h-full p-6">
          <router-view></router-view>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { jwtDecode } from 'jwt-decode'
import { useRouter } from 'vue-router'
import DarkModeToggle from '@/components/common/DarkModeToggle.vue'
import PostIcon from '@/components/icons/PostIcon.vue'
import AddIcon from '@/components/icons/AddIcon.vue'

const router = useRouter()
const userMenuOpen = ref(false)
const decodedToken = ref<any>(null)

const toggleUserMenu = () => {
  userMenuOpen.value = !userMenuOpen.value
}

const logout = () => {
  localStorage.removeItem('token')
  router.push('/register')
}

const menuItems = [
  { name: 'View Posts', path: '/dashboard/view-posts', icon: PostIcon },
  { name: 'Add Post', path: '/dashboard/add-posts', icon: AddIcon },
  { name: 'View Tags', path: '/dashboard/view-tags', icon: PostIcon },
  { name: 'Add Tags', path: '/dashboard/add-tags', icon: AddIcon },
  { name: 'View Subscribers', path: '/dashboard/view-subscribers', icon: PostIcon },
]

onMounted(() => {
  const token = localStorage.getItem('token')
  if (token) {
    try {
      decodedToken.value = jwtDecode(token)
      console.log(decodedToken.value);
      
    } catch (error) {
      console.error('Error decoding token:', error)
    }
  }
})
</script>

<style scoped>
/* Add any additional styles here if needed */
</style>