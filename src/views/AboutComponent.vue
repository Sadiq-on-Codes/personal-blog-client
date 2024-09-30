<template>
  <div class="about-container">
    <HeadingComponent text="About" class="mb-10 animate-fade-in" />
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-14">
      <div class="profile-card lg:col-span-1 animate-slide-in-left">
        <div class="profile-image-container">
          <img class="w-full rounded-lg shadow-2xl" src="../data/images/sadick.jpg" alt="Profile" />
        </div>
        <p class="mt-4 text-center text-[--color-post-secondary] text-sm italic">
          Tallest in this picture. 😊
        </p>
        <div class="mt-6 text-center">
          <h3 class="text-2xl font-bold text-[--color-primary]">Sadick</h3>
          <p class="text-[--color-post-secondary]">Software Developer</p>
        </div>
        <div class="mt-6 flex justify-center space-x-4">
          <a href="#" class="social-icon" aria-label="GitHub"><i class="fab fa-github"></i></a>
          <a href="#" class="social-icon" aria-label="LinkedIn"><i class="fab fa-linkedin"></i></a>
          <a href="#" class="social-icon" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
        </div>
      </div>
      <div class="about-content lg:col-span-2 animate-slide-in-right">
        <section class="mb-8 bg-gradient-to-r from-[--color-bg-secondary] to-[--color-bg-primary] p-6 rounded-lg shadow-lg">
          <h2 class="text-3xl font-bold mb-4 text-[--color-primary] border-b-2 border-[--color-accent] pb-2">About Me</h2>
          <p class="text-[--color-post-secondary] text-lg leading-relaxed">
            I'm passionate about Computers, and I love spending my free time coding. With a strong background in Computer Science and Software Development, I'm always eager to learn new things and take on exciting challenges. I'm a firm believer in continuous improvement, and I strive to bring positivity and dedication to everything I do.
          </p>
        </section>
        <section class="mb-8 bg-gradient-to-r from-[--color-bg-secondary] to-[--color-bg-primary] p-6 rounded-lg shadow-lg">
          <h2 class="text-3xl font-bold mb-6 text-[--color-primary] border-b-2 border-[--color-accent] pb-2">Skills</h2>
          <ul class="grid grid-cols-2 md:grid-cols-3 gap-4 text-[--color-post-secondary] text-lg">
            <li v-for="skill in skills" :key="skill.name" class="flex items-center skill-item">
              <span class="mr-2 text-[--color-accent] w-8"><i :class="skill.icon"></i></span>{{ skill.name }}
            </li>
          </ul>
        </section>
      </div>
    </div>
    <div class="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in">
      <section class="bg-gradient-to-br from-[--color-bg-secondary] to-[--color-bg-primary] p-6 rounded-lg shadow-lg">
        <h2 class="text-3xl font-bold mb-6 text-[--color-primary] border-b-2 border-[--color-accent] pb-2">Key Strengths</h2>
        <ul class="space-y-4 text-[--color-post-secondary] text-lg">
          <li v-for="strength in strengths" :key="strength.name" class="flex items-center strength-item">
            <span class="mr-3 text-[--color-accent] text-2xl w-8">{{ strength.icon }}</span>{{ strength.name }}
          </li>
        </ul>
      </section>
      <section class="bg-gradient-to-bl from-[--color-bg-secondary] to-[--color-bg-primary] p-6 rounded-lg shadow-lg">
        <h2 class="text-3xl font-bold mb-6 text-[--color-primary] border-b-2 border-[--color-accent] pb-2">Experience</h2>
        <ul class="space-y-6 text-[--color-post-secondary] text-lg">
          <li v-for="exp in experience" :key="exp.description" class="flex items-start experience-item">
            <span class="mr-3 text-[--color-accent] text-3xl w-8">{{ exp.icon }}</span>
            <p>{{ exp.description }}</p>
          </li>
        </ul>
      </section>
    </div>
    <section class="mt-12 animate-fade-in bg-gradient-to-t from-[--color-bg-secondary] to-[--color-bg-primary] p-6 rounded-lg shadow-lg">
      <h2 class="text-3xl font-bold mb-6 text-[--color-primary] border-b-2 border-[--color-accent] pb-2">Education</h2>
      <ul class="space-y-4 text-[--color-post-secondary] text-lg">
        <li v-for="edu in education" :key="edu.name" class="flex items-center education-item">
          <span class="mr-3 text-[--color-accent] text-2xl w-8">{{ edu.icon }}</span>{{ edu.name }}
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import HeadingComponent from '@/components/common/HeadingComponent.vue'

const skills = ref([
  { name: 'JavaScript', icon: 'fab fa-js' },
  { name: 'TypeScript', icon: 'fas fa-code' },
  { name: 'Vue.js', icon: 'fab fa-vuejs' },
  { name: 'React', icon: 'fab fa-react' },
  { name: 'Git', icon: 'fab fa-git-alt' },
  { name: 'JIRA', icon: 'fab fa-jira' },
  { name: 'Docker', icon: 'fab fa-docker' },
  { name: 'Microsoft 365', icon: 'fab fa-microsoft' },
  { name: 'Google Suite', icon: 'fab fa-google' },
  { name: 'Slack', icon: 'fab fa-slack' },
  { name: 'AWS', icon: 'fab fa-aws' },
  { name: 'Jenkins', icon: 'fab fa-jenkins' },
])

const strengths = ref([
  { name: 'Technical Proficiency', icon: '💻' },
  { name: 'Collaborative Team Player', icon: '👥' },
  { name: 'Problem-Solving Skills', icon: '🧩' },
  { name: 'Attention to Detail', icon: '🔍' }
])

const experience = ref([
  { 
    description: '5 years of experience as a Software developer, working on a variety of projects for clients in the tech and retail industries',
    icon: '💼'
  },
  {
    description: 'Led the development of an Enterprise Resource Planning (ERP) system as a Technical Lead, optimizing daily operations and enhancing overall efficiency for the enterprise.',
    icon: '📈'
  }
])

const education = ref([
  { name: 'Bachelor\'s Degree in Computer Science', icon: '🎓' },
  { name: 'AWS Certified Practitioner', icon: '☁️' }
])
</script>

<style scoped>
.about-container {
  max-width: 1200px;
  margin: 0 auto;
}

.profile-card {
  background: linear-gradient(135deg, var(--color-bg-secondary), var(--color-bg-primary));
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

.profile-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
}

.profile-image-container img {
  transition: transform 0.3s ease-in-out;
  border: 4px solid var(--color-accent);
}

.profile-image-container img:hover {
  transform: scale(1.05);
}

.social-icon {
  font-size: 1.5rem;
  color: var(--color-post-secondary);
  transition: color 0.3s ease-in-out, transform 0.3s ease-in-out;
}

.social-icon:hover {
  color: var(--color-accent);
  transform: scale(1.2);
}

.skill-item, .strength-item, .experience-item, .education-item {
  transition: transform 0.3s ease-in-out, background-color 0.3s ease-in-out;
  padding: 0.5rem;
  border-radius: 0.5rem;
}

.skill-item:hover, .strength-item:hover, .experience-item:hover, .education-item:hover {
  transform: translateX(10px);
  background-color: rgba(var(--color-accent-rgb), 0.1);
}

.animate-fade-in {
  animation: fadeIn 1s ease-out;
}

.animate-slide-in-left {
  animation: slideInLeft 1s ease-out;
}

.animate-slide-in-right {
  animation: slideInRight 1s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideInLeft {
  from { transform: translateX(-50px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}

@keyframes slideInRight {
  from { transform: translateX(50px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}

:root {
  --color-accent-rgb: 97, 218, 251; /* Replace with your accent color's RGB values */
}
</style>
