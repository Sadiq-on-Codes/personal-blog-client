<template>
  <div>
    <HeadingComponent text="About" />
    <div class="flex justify-center flex-col mt-14 gap-[--spacing]">
      <div>
        <img class="w-full" src="../data/images/IMG_2773.JPEG" alt="" />
        <p class="mt-2 text-center text-[--color-post-secondary] text-sm">
          Tallest in this picture.😊
        </p>
      </div>
      <div>
        <span class="text-xl">About Me</span>
        <p class="text-[--color-post-secondary] text-lg">
          I'm passionate about Computers, and I love spending my free time coding. I have a
          background in Computer Science/Software Development, and I'm always eager to learn new
          things and take on new challenges.. I'm a firm believer in continuous Improvement, and I
          strive to bring positivity and dedication to everything I do.
        </p>
      </div>
      <div>
        <span class="text-xl">Skills</span>
        <ul class="ml-5 text-[--color-post-secondary] text-lg list-disc">
          <li>Programming Languages: JavaScript and TypeScript</li>
          <li>Web Frameworks: Vue.js and React</li>
          <li>Tools: Git, JIRA, VS Code, Microsoft 365, Google Suite</li>
          <li>Project Management: SDLC, Agile Methodology</li>
          <li>Collaboration and Communication Tools: Slack and Microsoft Teams</li>
        </ul>
      </div>
      <div>
        <span class="text-xl">Key Strengths</span>
        <ul class="ml-5 text-[--color-post-secondary] text-lg list-disc">
          <li>Technical Proficiency</li>
          <li>Collaborative Team Player</li>
          <li>Problem-Solving Skills</li>
          <li>Attention to Detail</li>
        </ul>
      </div>
      <div>
        <span class="text-xl">Experience</span>
        <ul class="ml-5 text-[--color-post-secondary] text-lg list-disc">
          <li>
            5 years of experience as a Software developer, working on a variety of projects for
            clients in the tech and retail industries
          </li>
          <li>
            Led the development of an Enterprise Resource Planning (ERP) system as a Technical Lead,
            optimizing daily operations and enhancing overall efficiency for the enterprise.
          </li>
        </ul>
      </div>
      <div>
        <span class="text-xl">Education</span>
        <ul class="ml-5 text-[--color-post-secondary] text-lg list-disc">
          <li>Bachelors Degree in Computer Science</li>
          <li>AWS Certified Praticioner</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import HeadingComponent from '@/components/common/HeadingComponent.vue'
</script>
<style></style>
