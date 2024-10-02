<template>
  <div class="about-container dark:text-white">
    <HeadingComponent text="About Me" class="mb-10 animate-fade-in" />
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
        <div class="hero-cta">
          <a href="#contact" class="cta-button">Get in Touch</a>
        </div>
      </div>
    </div>

    <section class="skills-section">
      <h2 class="section-title">Skills & Expertise</h2>
      <div class="skills-grid">
        <div v-for="skill in skills" :key="skill.name" class="skill-item">
          <div class="skill-icon-wrapper">
            <i :class="skill.icon"></i>
          </div>
          <span class="skill-name">{{ skill.name }}</span>
          <div class="skill-level-bar">
            <div class="skill-level-fill" :style="{ width: skill.level + '%' }"></div>
          </div>
        </div>
      </div>
    </section>

    <section class="experience-section">
      <h2 class="section-title">Professional Journey</h2>
      <div class="timeline">
        <div v-for="(exp, index) in experience" :key="index" class="timeline-item">
          <div class="timeline-content">
            <h3 class="timeline-title">{{ exp.title }}</h3>
            <p class="timeline-period">{{ exp.period }}</p>
            <p class="timeline-description">{{ exp.description }}</p>
            <ul class="timeline-achievements">
              <li v-for="(achievement, achIndex) in exp.achievements" :key="achIndex">
                {{ achievement }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section class="education-section">
      <h2 class="section-title">Education & Certifications</h2>
      <div class="education-grid">
        <div v-for="edu in education" :key="edu.name" class="education-item">
          <div class="education-icon-wrapper">
            <span class="education-icon">{{ edu.icon }}</span>
          </div>
          <h3 class="education-title">{{ edu.name }}</h3>
          <!-- <p class="education-institution">{{ edu.institution }}</p>
          <p class="education-year">{{ edu.year }}</p> -->
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
  { name: 'JavaScript', icon: 'fab fa-js', level: 90 },
  { name: 'TypeScript', icon: 'fas fa-code', level: 85 },
  { name: 'Vue.js', icon: 'fab fa-vuejs', level: 95 },
  { name: 'React', icon: 'fab fa-react', level: 80 },
  { name: 'Git', icon: 'fab fa-git-alt', level: 85 },
  { name: 'Docker', icon: 'fab fa-docker', level: 75 },
  { name: 'AWS', icon: 'fab fa-aws', level: 70 },
  { name: 'Jenkins', icon: 'fab fa-jenkins', level: 65 },
])

const experience = ref([
{
    title: 'Technical Lead',
    period: 'Sep 2023 - Dec 2024',
    description: 'Led cross-functional teams in developing an innovative ERP system, revolutionizing enterprise operations.',
    icon: 'fas fa-project-diagram',
    achievements: [
      'Spearheaded micro frontend architecture implementation, enhancing system flexibility and scalability',
      'Reduced technical debt through robust coding standards and design principles',
      'Improved release process, increasing annual deployment frequency',
      'Led 10 cross-functional teams in successful ERP module development and implementation'
    ]
  },
  { 
    title: 'Senior Software Developer',
    period: 'Jan 2019 - Sep 2023',
    description: 'Led development of enterprise solutions, optimizing operations for tech and retail clients.',
    icon: 'fas fa-laptop-code',
    achievements: [
      'Increased system efficiency by 40% through code optimization',
      'Mentored junior developers, improving team productivity by 25%',
      'Implemented CI/CD pipeline, reducing deployment time by 60%',
      'Enhanced user experience in a ride recording app with optimized flow, localization, and automated 360° video retrieval',
      'Improved QR code scanning to 100% success rate, boosting application reliability',
      'Developed resource management and automated staffing solution, streamlining HR processes',
      'Created integrated contract management system, enabling in-app signing and improving document accessibility'
    ]
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
  padding-top: 2rem;
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
  position: relative;
  overflow: hidden;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  /* background: linear-gradient(135deg, rgba(var(--color-primary-rgb), 0.1), rgba(var(--color-accent-rgb), 0.1)); */
  z-index: 0;
}

.profile-card, .hero-content {
  position: relative;
  z-index: 1;
}

.profile-card {
  flex: 0 0 40%;
  text-align: center;
  padding: 3rem;
  /* background: rgba(255, 255, 255, 0.1); */
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
  animation: float 6s ease-in-out infinite;
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
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
  -webkit-background-clip: text;
  margin-bottom: 1.5rem;
}

.hero-text {
  font-size: 1.2rem;
  line-height: 1.8;
  margin-bottom: 2rem;
}

.hero-cta {
  margin-top: 2rem;
}

.cta-button, .contact-button {
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
  box-shadow: 0 4px 6px rgba(var(--color-primary-rgb), 0.2);
}

.cta-button:hover, .contact-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 12px rgba(var(--color-primary-rgb), 0.3);
}

.section-title {
  font-size: 1.6rem;
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
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
}

.skill-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;
  background-color: var(--color-bg-secondary);
  border-radius: 1rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.skill-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
}

.skill-icon-wrapper {
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-bg-primary);
  border-radius: 50%;
  margin-bottom: 1rem;
}

.skill-item i {
  font-size: 2rem;
  color: var(--color-accent);
}

.skill-name {
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: var(--color-primary);
}

.skill-level-bar {
  width: 100%;
  height: 6px;
  background-color: var(--color-bg-primary);
  border-radius: 3px;
  overflow: hidden;
}

.skill-level-fill {
  height: 100%;
  background-color: var(--color-accent);
  transition: width 1s ease-in-out;
}

.timeline {
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 0;
}

.timeline::after {
  content: '';
  position: absolute;
  width: 6px;
  background-color: var(--color-accent);
  top: 0;
  bottom: 0;
  left: 50%;
  margin-left: -3px;
}

.timeline-item {
  padding: 10px;
  position: relative;
  background-color: inherit;
  width: 45%;
  box-sizing: border-box;
}

.timeline-item::after {
  content: '';
  position: absolute;
  width: 25px;
  height: 25px;
  right: -17px;
  background-color: var(--color-bg-primary);
  top: 15px;
  z-index: 1;
}

.timeline-item:nth-child(even) {
  left: 50%;
}

.timeline-item:nth-child(odd) {
  left: 0;
}

.timeline-item:nth-child(odd)::after {
  left: auto;
  right: -16px;
}

.timeline-icon {
  position: absolute;
  background-color: var(--color-accent);
  color: var(--color-bg-primary);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  z-index: 2;
  top: 3px;
}

.timeline-item:nth-child(odd) .timeline-icon {
  right: -25px;
}

.timeline-item:nth-child(even) .timeline-icon {
  left: -25px;
}

.timeline-content {
  padding: 20px 30px;
  background-color: var(--color-bg-secondary);
  position: relative;
  border-radius: 6px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
}

.timeline-item:nth-child(odd) .timeline-content {
  text-align: right;
}

.timeline-title {
  font-size: 1.4rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: var(--color-primary);
}

.timeline-period {
  font-size: 0.9rem;
  color: var(--color-post-secondary);
  margin-bottom: 1rem;
}

.timeline-description {
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.timeline-achievements {
  list-style-type: none;
  padding-left: 0;
}

.timeline-achievements li {
  position: relative;
  padding-left: 20px;
  margin-bottom: 0.5rem;
}

.timeline-achievements li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: var(--color-accent);
}

.education-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.education-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 2rem;
  background-color: var(--color-bg-secondary);
  border-radius: 1rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.education-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
}

.education-icon-wrapper {
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-bg-primary);
  border-radius: 50%;
  margin-bottom: 1rem;
}

.education-icon {
  font-size: 2.5rem;
}

.education-title {
  font-size: 1.2rem;
  font-weight: bold;
  color: var(--color-primary);
  margin-bottom: 0.5rem;
}

.education-institution {
  font-size: 1rem;
  margin-bottom: 0.25rem;
}

.education-year {
  font-size: 0.9rem;
  color: var(--color-post-secondary);
}

.contact-section {
  text-align: center;
  background: linear-gradient(135deg, var(--color-bg-secondary), var(--color-bg-primary));
  padding: 4rem 2rem;
  border-radius: 1rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.contact-text {
  font-size: 1.3rem;
  margin-bottom: 2rem;
  color: var(--color-text);
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

@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
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

  .timeline::after {
    left: 0;
  }
  
  .timeline-item {
    width: 100%;
    /* padding-left: 30px; */
    /* padding-right: 0; */
  }
  
  .timeline-item::after {
    left: -9px;
  }
  
  .timeline-item:nth-child(even) {
    left: 0;
  }
  
  .timeline-item:nth-child(odd) {
    left: 0;
  }
  
  .timeline-item:nth-child(odd)::after {
    left: -9px;
    right: auto;
  }
  
  .timeline-icon {
    left: -25px !important;
    width: 40px;
    height: 40px;
    font-size: 1.2rem;
  }

  .timeline-content {
    width: 100%;
    padding: 15px 20px;
  }

  .timeline-item:nth-child(odd) .timeline-content {
    text-align: left;
  }

  .timeline-title {
    font-size: 1.2rem;
  }

  .timeline-description,
  .timeline-achievements li {
    font-size: 0.9rem;
  }

  .skills-section,
  .experience-section,
  .education-section,
  .contact-section {
    margin-bottom: 3rem;
  }

  .section-title {
    font-size: 1.4rem;
  }

  .contact-text {
    font-size: 1.1rem;
  }

  .cta-button,
  .contact-button {
    padding: 0.8rem 1.5rem;
    font-size: 0.9rem;
  }

  .hero-greeting {
    font-size: 2.5rem; 
  }

  .hero-text {
    font-size: 1rem; 
  }

  .skills-grid,
  .education-grid {
    grid-template-columns: 1fr;
  }

  .skill-item,
  .education-item {
    width: 100%;
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