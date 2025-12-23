<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-brand">
          <div class="logo">
            <img src="/logo.svg" alt="Noveris" class="logo-icon" />
            <span class="logo-text">Noveris</span>
          </div>
          <p class="footer-desc">{{ t('home.description') }}</p>
        </div>

        <div class="footer-links">
          <div class="link-group">
            <h4>Links</h4>
            <a href="https://github.com/Noveris-AI" target="_blank">GitHub</a>
          </div>
          <div class="link-group">
            <h4>Contact</h4>
            <a href="mailto:novatra.ai@novatra.cn">novatra.ai@novatra.cn</a>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <p>&copy; {{ currentYear }} Noveris. {{ t('footer.rights') }}</p>
        <p class="powered-by">{{ t('footer.poweredBy') }}</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: var(--bg-secondary);
  border-top: 1px solid var(--border-color);
  padding: 3rem 0 1.5rem;
  margin-top: auto;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.footer-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 4rem;
  margin-bottom: 2rem;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 700;
  font-size: 1.25rem;
  color: var(--text-primary);
  margin-bottom: 1rem;
}

.logo-icon {
  width: 36px;
  height: 36px;
}

.logo-text {
  background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.footer-desc {
  color: var(--text-secondary);
  max-width: 400px;
  line-height: 1.6;
}

.footer-links {
  display: flex;
  gap: 3rem;
}

.link-group h4 {
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-secondary);
  margin-bottom: 1rem;
}

.link-group a {
  display: block;
  color: var(--text-primary);
  text-decoration: none;
  margin-bottom: 0.5rem;
  transition: color 0.2s;
}

.link-group a:hover {
  color: var(--accent-color);
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border-color);
  color: var(--text-secondary);
  font-size: 0.875rem;
}

.powered-by {
  opacity: 0.7;
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .footer-bottom {
    flex-direction: column;
    gap: 0.5rem;
    text-align: center;
  }
}
</style>
