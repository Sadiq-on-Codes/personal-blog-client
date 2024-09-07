<template>
  <div class="mt-[--spacing]">
    <span class="text-xl">Recent blog posts</span>
    <div class="grid sm:grid-cols-2 grid-cols-1 gap-[--spacing]">
      <div>
        <router-link
          v-if="blogPosts?.length > 0"
          :to="{ name: 'BlogDetailsPage', params: { id: blogPosts[0]?._id } }"
        >
          <BlogPost :blogPost="blogPosts[0]" :isHalfHeight="false" layout="vertical" />
        </router-link>
        <p v-else>No posts available.</p>
      </div>

      <div class="flex flex-col gap-[--spacing]">
        <router-link v-if="blogPosts?.length > 0" :to="{ name: 'BlogDetailsPage', params: { id: blogPosts[0]?._id } }">
          <BlogPost :blogPost="blogPosts[1]" :isHalfHeight="false" layout="horizontal" />
        </router-link>
        <router-link v-if="blogPosts?.length > 0" :to="{ name: 'BlogDetailsPage', params: { id: blogPosts[0]?._id } }">
          <BlogPost :blogPost="blogPosts[2]" :isHalfHeight="false" layout="horizontal" />
        </router-link>
      </div>
    </div>
    <div class="mt-14">
      <router-link v-if="blogPosts?.length > 0" :to="{ name: 'BlogDetailsPage', params: { id: blogPosts[0]?._id } }">
        <BlogPost
          :blogPost="blogPosts[3]"
          :isHalfHeight="false"
          layout="horizontal"
          :reverse="true"
        />
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { fetchBlogPosts } from '@/services/apiServices'
import { onMounted, ref } from 'vue'
import BlogPost from './PostComponent.vue'

const blogPosts = ref()

onMounted(async () => {
  blogPosts.value = await fetchBlogPosts()
})
</script>

<style scoped>
.grid-cols-2 > div {
  height: 100%;
}
</style>
