<template>
  <div>
    <section>
      <div class="flex flex-col items-center justify-center px-6 h-screen py-8 mx-auto lg:py-0">
        <div
          class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
        >
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div class="flex justify-between items-center">
              <h1
                class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
              >
                {{ mode === 'register' ? 'Create an account' : 'Login' }}
              </h1>

              <DarkModeToggle :reduceSize="true" />
            </div>

            <form class="space-y-4 md:space-y-6" @submit.prevent="submitForm">
              <InputField
                v-if="mode === 'register'"
                id="username"
                name="username"
                type="text"
                placeholder="Username"
                label="Username"
                required
                v-model="username"
              />
              <InputField
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                label="Your email"
                required
                v-model="email"
              />
              <InputField
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                label="Password"
                required
                v-model="password"
              />
              <Checkbox
                v-if="mode === 'register'"
                id="terms"
                label="I accept the"
                linkHref="#"
                linkText="Terms and Conditions"
                required
              />
              <Button @click="submitForm">{{
                mode === 'register' ? 'Create an account' : 'Login'
              }}</Button>
              <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                {{ mode === 'register' ? 'Already have an account?' : 'Don’t have an account?' }}
                <a
                  href="#"
                  class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  @click.prevent="toggleMode"
                >
                  {{ mode === 'register' ? 'Login here' : 'Register here' }}
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import InputField from '@/components/common/InputComponent.vue'
import Checkbox from '@/components/common/CheckboxComponent.vue'
import Button from '@/components/common/ButtonComponent.vue'
import DarkModeToggle from '@/components/common/DarkModeToggle.vue'
import { API_URL } from '@/utils'

const mode = ref<'login' | 'register'>('login')
const username = ref('')
const email = ref('')
const password = ref('')
const router = useRouter()

const submitForm = async () => {
  try {
    const url =
      mode.value === 'register'
        ? `${API_URL}/api/auth/register`
        : `${API_URL}/api/auth/login`

    const data =
      mode.value === 'register'
        ? {
            username: username.value,
            email: email.value,
            password: password.value
          }
        : {
            email: email.value,
            password: password.value
          }

    const response = await axios.post(url, data)
    localStorage.setItem('token', response.data.token)
    router.push('/dashboard/add-posts')
  } catch (error: any) {
    console.error(
      `${mode.value === 'register' ? 'Registration' : 'Login'} error:`,
      error.response.data.msg
    )
    alert(error.response.data.msg)
  }
}

const toggleMode = () => {
  mode.value = mode.value === 'register' ? 'login' : 'register'
}
</script>
