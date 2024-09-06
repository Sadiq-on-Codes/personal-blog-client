<template>
    <div class="flex justify-center items-start w-full md:inset-0 h-modal md:h-full">
      <select v-model="selectedContent" @change="fetchData">
        <option value="projects">Projects</option>
        <option value="blogPosts">Blog Posts</option>
      </select>
  
      <div v-if="loading">Loading...</div>
  
      <div v-else>
        <h1>{{ title }}</h1>
        <ul v-if="selectedContent === 'projects'">
          <li v-for="project in data" :key="project._id">{{ project.name }}</li>
        </ul>
        <div v-if="selectedContent === 'blogPosts'">
          <div v-for="post in data" :key="post._id">
            <h2>{{ post.title }}</h2>
            <p>{{ post.content }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, watch, onMounted } from 'vue';
  import { Projects, BlogPosts } from '@/services/apiServices';
  
  const selectedContent = ref('projects');
  const data = ref([]);
  const loading = ref(false);
  const title = ref('Projects');
  
  const fetchData = async () => {
    loading.value = true;
    try {
      if (selectedContent.value === 'projects') {
        const response = await Projects();
        data.value = response.data;
        title.value = 'Projects';
      } else {
        const response = await BlogPosts();
        data.value = response.data;
        title.value = 'Blog Posts';
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      loading.value = false;
    }
  };
  
  onMounted(() => {
    fetchData();
  });
  
  watch(selectedContent, () => {
    fetchData();
  });
  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>
  