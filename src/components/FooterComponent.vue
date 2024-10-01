<template>
  <footer class="footer">
    <div class="footer-content">
      <p class="copyright">&copy; {{ new Date().getFullYear() }} Yahaya A. Sadick</p>
      <div class="social-links">
        <a href="https://github.com/SadickYahaya" target="_blank" rel="noopener noreferrer" class="social-link">
          <i class="fab fa-github"></i>
          <span>GitHub</span>
        </a>
        <a href="https://www.linkedin.com/in/abubakar-sadick-y-57a858b0/" target="_blank" rel="noopener noreferrer" class="social-link">
          <i class="fab fa-linkedin"></i>
          <span>LinkedIn</span>
        </a>
        <a href="mailto:sadickashton@live.com" class="social-link">
          <i class="fas fa-envelope"></i>
          <span>Email</span>
        </a>
        <a href="https://www.credly.com/users/sadick-abubakar-yahaya" target="_blank" rel="noopener noreferrer" class="social-link">
          <i class="fas fa-certificate"></i>
          <span>Credly</span>
        </a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  padding: 2rem 0;
  margin-top: 3rem;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.copyright {
  font-size: 0.9rem;
  color: #6c757d;
  margin-bottom: 1rem;
}

.social-links {
  display: flex;
  gap: 1.5rem;
}

.social-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #495057;
  text-decoration: none;
  transition: color 0.3s ease;
}

.social-link:hover {
  color: #007bff;
}

.social-link i {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.social-link span {
  font-size: 0.8rem;
}

@media (max-width: 768px) {
  .social-links {
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>
