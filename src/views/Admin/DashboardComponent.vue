<template>
  <div class="flex flex-col md:flex-row h-screen">
    <aside class="w-full md:w-[20%] shadow-md">
      <div class="flex items-center justify-between md:justify-center h-16 border-b dark:border-gray-700 px-4 md:px-0">
        <div class="flex items-center">
            <div class="logo mr-2"></div>
            <span class="font-bold text-xl logo-text">Sadiq on Codes</span>
          </div>
        <button @click="toggleSidebar" class="md:hidden">
          ☰
        </button>
      </div>
      <nav class="mt-6" :class="{ 'hidden md:block': !sidebarOpen }">
        <router-link
          v-for="item in menuItems"
          :key="item.path"
          :to="item.path"
          class="flex items-center px-6 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <i :class="[item.icon, 'w-5 h-5 mr-3']"></i>
          {{ item.name }}
        </router-link>
      </nav>
    </aside>

    <div class="flex flex-col w-full md:w-[80%]">
      <header class="bg-white dark:bg-gray-800 shadow-sm z-10">
        <div class="flex items-center justify-between md:justify-end h-16 px-4 md:px-6">
          <button @click="toggleSidebar" class="md:hidden">
            <MenuIcon class="w-6 h-6" />
          </button>
          <div class="flex items-center">
            <p class="text-gray-600 dark:text-gray-300 mr-4">{{ 'Welcome, ' + decodedToken?.user?.username }}</p>
            <DarkModeToggle />
            <div class="ml-4 relative">
              <button @click="toggleUserMenu" class="flex items-center focus:outline-none">
                <img class="h-8 w-8 rounded-full" src="https://via.placeholder.com/150" alt="User avatar" />
              </button>
              <div v-if="userMenuOpen" class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                <a @click="logout" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">Logout</a>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main class="overflow-auto">
        <div class="h-full p-4 md:p-6">
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

const router = useRouter()
const userMenuOpen = ref(false)
const decodedToken = ref<any>(null)
const sidebarOpen = ref(false)

const toggleUserMenu = () => {
  userMenuOpen.value = !userMenuOpen.value
}

const logout = () => {
  localStorage.removeItem('token')
  router.push('/register')
}

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
}

const menuItems = [
  { name: 'View Posts', path: '/dashboard/view-posts', icon: 'fas fa-newspaper' },
  { name: 'Add Post', path: '/dashboard/add-posts', icon: 'fas fa-plus' },
  { name: 'View Tags', path: '/dashboard/view-tags', icon: 'fas fa-tags' },
  { name: 'Add Tags', path: '/dashboard/add-tags', icon: 'fas fa-plus' },
  { name: 'View Subscribers', path: '/dashboard/view-subscribers', icon: 'fas fa-users' },
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
.logo-text {
  letter-spacing: 0.05em;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
}

.logo {
  width: 30px;
  height: 30px;
  background: linear-gradient(135deg, #3b82f6, #10b981);
  border-radius: 50%;
  position: relative;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), inset 0 2px 4px rgba(255, 255, 255, 0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.logo::before {
  content: "S";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 18px;
  font-weight: bold;
  color: white;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

.logo:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15), inset 0 2px 4px rgba(255, 255, 255, 0.4);
}
</style>