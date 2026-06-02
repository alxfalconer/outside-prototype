<template>
  <footer class="footer">
    <div class="footer-inner">

      <!-- Primary grid -->
      <div class="footer-grid">

        <div class="footer-col footer-col--location">
          <span class="footer-city">New York City</span>
          <p class="footer-tagline">Cultural index and attendance archive.</p>
        </div>

        <div class="footer-col footer-col--links">
          <nav class="footer-nav">
            <NuxtLink to="/field-notes" class="footer-link">Field Notes</NuxtLink>
            <a href="#" class="footer-link">Contact</a>
            <a href="#" class="footer-link">Terms of Use</a>
            <a href="#" class="footer-link">Privacy Policy</a>
          </nav>
        </div>

      </div>

      <!-- Bottom bar -->
      <div class="footer-bar">
        <span class="footer-copy">© 2026 Outside. All rights reserved.</span>
        <span class="footer-sys">Outside — Cultural Archive System — New York</span>
      </div>

    </div>
  </footer>
</template>

<style scoped>
.footer {
  position: relative;
  z-index: 10;
  background: var(--color-bg);
  border-top: 1px solid var(--color-border);
  width: 100%;
}

.footer-inner {
  max-width: var(--column-max);
  margin: 0 auto;
  padding: 0 var(--column-padding);
}

/* ─── Primary grid ──────────────────────────────────── */
.footer-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-bottom: 1px solid var(--color-border);
}

.footer-col {
  padding: var(--space-5) 0;
}

.footer-col--location {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.footer-col--links {
  border-left: 1px solid var(--color-border);
  padding-left: var(--space-4);
}

/* ─── City mark ─────────────────────────────────────── */
.footer-city {
  display: block;
  font-family: var(--font-sans);
  font-size: clamp(0.9rem, 1.4vw, 1.25rem);
  font-weight: 500;
  line-height: 0.88;
  letter-spacing: -0.03em;
  color: var(--color-text);
}

/* ─── Tagline ────────────────────────────────────────── */
.footer-tagline {
  font-family: var(--font-sans);
  font-size: var(--text-body);
  line-height: 1.4;
  color: var(--color-text-secondary);
  font-weight: 400;
}

/* ─── Nav links ─────────────────────────────────────── */
.footer-nav {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.footer-link {
  font-family: var(--font-mono);
  font-size: 0.5rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-text-secondary);
  padding: 5px 0;
  border-bottom: 1px solid var(--color-border);
  transition: color var(--transition-subtle);
  white-space: nowrap;
}

.footer-link:last-child {
  border-bottom: none;
}

.footer-link:hover {
  color: var(--color-text);
}

/* ─── Bottom bar ─────────────────────────────────────── */
.footer-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-2) 0;
}

.footer-copy,
.footer-sys {
  font-family: var(--font-mono);
  font-size: var(--text-label);
  letter-spacing: 0.04em;
  color: var(--color-text-secondary);
}

.footer-sys {
  opacity: 0.4;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

/* ─── Mobile ─────────────────────────────────────────── */
@media (max-width: 768px) {
  .footer-grid {
    grid-template-columns: 1fr;
  }

  .footer-col--links {
    border-left: none;
    border-top: 1px solid var(--color-border);
    padding-left: 0;
    padding-top: var(--space-4);
    padding-bottom: var(--space-4);
  }

  .footer-col--location {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
    padding-bottom: var(--space-4);
  }

  .footer-city {
    font-size: clamp(2.25rem, 8vw, 3rem);
  }

  .footer-bar {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-1);
    padding: var(--space-3) 0;
  }
}

@media (max-width: 480px) {
  .footer-sys {
    display: none;
  }
}
</style>
