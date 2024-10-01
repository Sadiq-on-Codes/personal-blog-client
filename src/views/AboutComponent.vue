<template>
  <div class="about-container">
    <HeadingComponent text="About" class="mb-10 animate-fade-in" />
    <div class="hero-section">
      <div class="profile-card">
        <div class="profile-image-container">
          <img class="profile-image" src="../data/images/sadick.jpg" alt="Profile" />
        </div>
        <p class="title">Software Developer</p>
        <div class="social-icons">
          <a href="https://github.com/SadickYahaya" class="social-icon" aria-label="GitHub"><i class="fab fa-github"></i></a>
          <a href="https://www.linkedin.com/in/abubakar-sadick-y-57a858b0/" class="social-icon" aria-label="LinkedIn"><i class="fab fa-linkedin"></i></a>
          <a href="https://www.credly.com/users/sadick-abubakar-yahaya" class="social-icon" aria-label="Credly"><i class="fab fa-credly"></i></a>
        </div>
      </div>
      <div class="hero-content">
        <h2 class="hero-greeting">Hello, I'm Sadick</h2>
        <p class="hero-text">
          Passionate about computers and coding, I bring 5 years of experience as a Software Developer to the table. With a strong foundation in Computer Science and a knack for problem-solving, I'm always eager to take on new challenges and push the boundaries of what's possible in tech.
        </p>
        <a href="#contact" class="cta-button">Let's Collaborate</a>
      </div>
    </div>

    <section class="skills-section">
      <h2 class="section-title">Skills & Expertise</h2>
      <div class="skills-grid">
        <div v-for="skill in skills" :key="skill.name" class="skill-item">
          <i :class="skill.icon"></i>
          <span>{{ skill.name }}</span>
        </div>
      </div>
    </section>

    <section class="experience-section">
      <h2 class="section-title">Professional Journey</h2>
      <div class="timeline">
        <div v-for="(exp, index) in experience" :key="index" class="timeline-item">
          <div class="timeline-icon">{{ exp.icon }}</div>
          <div class="timeline-content">
            <h3 class="timeline-title">{{ exp.title }}</h3>
            <p class="timeline-description">{{ exp.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="education-section">
      <h2 class="section-title">Education & Certifications</h2>
      <div class="education-grid">
        <div v-for="edu in education" :key="edu.name" class="education-item">
          <span class="education-icon">{{ edu.icon }}</span>
          <h3 class="education-title">{{ edu.name }}</h3>
        </div>
      </div>
    </section>

    <section id="contact" class="contact-section">
      <h2 class="section-title">Let's Connect</h2>
      <p class="contact-text">Ready to bring your ideas to life? Let's create something amazing together!</p>
      <a href="mailto:sadickashton@live.com" class="contact-button">
        <i class="fas fa-paper-plane"></i>
        Send Me a Message
      </a>
    </section>
  </div>
</template>

<script setup lang="ts">
import HeadingComponent from '@/components/common/HeadingComponent.vue';
import { ref } from 'vue'

const skills = ref([
  { name: 'JavaScript', icon: 'fab fa-js' },
  { name: 'TypeScript', icon: 'fas fa-code' },
  { name: 'Vue.js', icon: 'fab fa-vuejs' },
  { name: 'React', icon: 'fab fa-react' },
  { name: 'Git', icon: 'fab fa-git-alt' },
  { name: 'Docker', icon: 'fab fa-docker' },
  { name: 'AWS', icon: 'fab fa-aws' },
  { name: 'Jenkins', icon: 'fab fa-jenkins' },
])

const experience = ref([
  { 
    title: 'Senior Software Developer',
    description: 'Led development of enterprise solutions, optimizing operations for tech and retail clients.',
    icon: '💼'
  },
  {
    title: 'Technical Lead',
    description: 'Spearheaded the creation of an innovative ERP system, boosting enterprise efficiency.',
    icon: '🚀'
  }
])

const education = ref([
  { name: 'B.Sc. in Computer Science', icon: '🎓' },
  { name: 'AWS Certified Practitioner', icon: '☁️' }
])
</script>

<style scoped>
.about-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  color: var(--color-text);
  background-color: var(--color-bg-primary);
}

.hero-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 4rem;
  background: linear-gradient(135deg, var(--color-bg-secondary), var(--color-bg-primary));
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.profile-card {
  flex: 0 0 40%;
  text-align: center;
  padding: 3rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-right: 1px solid rgba(255, 255, 255, 0.1);
}

.profile-image-container {
  position: relative;
  width: 200px;
  height: 200px;
  margin: 0 auto 2rem;
  overflow: hidden;
  border-radius: 50%;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
}

.profile-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.profile-image-container:hover .profile-image {
  transform: scale(1.1);
}

.name {
  font-size: 2.5rem;
  font-weight: bold;
  color: var(--color-primary);
  margin-bottom: 0.5rem;
}

.title {
  font-size: 1.2rem;
  color: var(--color-post-secondary);
  margin-bottom: 1rem;
}

.social-icons {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.social-icon {
  font-size: 1.5rem;
  color: var(--color-post-secondary);
  transition: color 0.3s ease, transform 0.3s ease;
}

.social-icon:hover {
  color: var(--color-accent);
  transform: translateY(-3px);
}

.hero-content {
  flex: 0 0 60%;
  padding: 3rem;
}

.hero-greeting {
  font-size: 3rem;
  font-weight: bold;
  color: var(--color-primary);
  margin-bottom: 1rem;
  animation: fadeInUp 0.8s ease;
}

.hero-text {
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  color: var(--color-text);
  animation: fadeInUp 1s ease 0.2s;
  animation-fill-mode: both;
}

.cta-button {
  display: inline-block;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, var(--color-accent), var(--color-primary));
  color: var(--color-bg-primary);
  text-decoration: none;
  border-radius: 2rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  animation: fadeInUp 1.2s ease 0.4s;
  animation-fill-mode: both;
}

.cta-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.section-title {
  font-size: 2.0rem;
  font-weight: bold;
  color: var(--color-primary);
  margin-bottom: 1rem;
  position: relative;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 0;
  width: 50px;
  height: 4px;
  background-color: var(--color-accent);
}

.skills-section, .experience-section, .education-section, .contact-section {
  margin-bottom: 4rem;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1.5rem;
}

.skill-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  background-color: var(--color-bg-secondary);
  border-radius: 0.5rem;
  transition: transform 0.3s ease;
}

.skill-item:hover {
  transform: translateY(-5px);
}

.skill-item i {
  font-size: 2rem;
  color: var(--color-accent);
  margin-bottom: 0.5rem;
}

.timeline {
  position: relative;
  padding: 2rem 0;
}

.timeline::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  width: 2px;
  height: 100%;
  background-color: var(--color-accent);
}

.timeline-item {
  display: flex;
  justify-content: flex-end;
  padding-right: 30px;
  position: relative;
  margin-bottom: 2rem;
}

.timeline-item:nth-child(even) {
  justify-content: flex-start;
  padding-left: 30px;
  padding-right: 0;
}

.timeline-icon {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--color-accent);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
}

.timeline-content {
  width: 45%;
  padding: 1.5rem;
  background-color: var(--color-bg-secondary);
  border-radius: 0.5rem;
}

.timeline-title {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.education-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.education-item {
  text-align: center;
  padding: 2rem;
  background-color: var(--color-bg-secondary);
  border-radius: 0.5rem;
  transition: transform 0.3s ease;
}

.education-item:hover {
  transform: translateY(-5px);
}

.education-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  display: block;
}

.education-title {
  font-size: 1.2rem;
  font-weight: bold;
}

.contact-section {
  text-align: center;
}

.contact-text {
  font-size: 1.2rem;
  margin-bottom: 2rem;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .hero-section {
    flex-direction: column;
  }

  .profile-card, .hero-content {
    flex: 0 0 100%;
    padding: 2rem;
  }

  .profile-card {
    border-right: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .timeline::before {
    left: 0;
  }

  .timeline-item, .timeline-item:nth-child(even) {
    justify-content: flex-start;
    padding-left: 30px;
    padding-right: 0;
  }

  .timeline-icon {
    left: 0;
  }

  .timeline-content {
    width: 100%;
  }

  .hero-greeting {
    font-size: 2.5rem; 
  }

  .hero-text {
    font-size: 1rem; 
  }

  .skills-grid {
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); 
  }

  .education-grid {
    grid-template-columns: 1fr; 
  }

  .section-title {
    font-size: 1.8rem; 
  }
}

@media (max-width: 480px) {
  .about-container {
    padding: 1rem; 
  }

  .profile-image-container {
    width: 150px; 
    height: 150px;
  }

  .hero-greeting {
    font-size: 2rem; 
  }

  .cta-button {
    padding: 0.8rem 1.5rem;
  }
}
</style>