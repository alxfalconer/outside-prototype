<script setup lang="ts">
const { passCount } = usePasses()
const route = useRoute()

const isEventRoute = computed(() => route.path.startsWith('/event/'))
const parentSlug = computed(() => {
  const parts = route.path.split('/')
  return parts[2] ?? null
})
</script>

<template>
  <header class="header">
    <div class="header-inner">
      <div class="header-left">
        <NuxtLink v-if="isEventRoute" :to="parentSlug && route.path.includes('/portal') ? `/event/${parentSlug}` : '/'" class="back mono">
          ←
        </NuxtLink>
        <NuxtLink to="/" class="wordmark mono">OUTSIDE</NuxtLink>
      </div>

      <nav class="header-nav">
        <NuxtLink to="/" class="nav-item label" :class="{ active: route.path === '/' }">Index</NuxtLink>
        <NuxtLink to="/profile" class="nav-item label" :class="{ active: route.path === '/profile' }">
          Archive<span v-if="passCount > 0" class="pass-count">{{ passCount }}</span>
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--color-bg);
  border-bottom: 1px solid var(--color-border);
  height: var(--header-height);
}

.header-inner {
  max-width: var(--column-max);
  margin: 0 auto;
  padding: 0 var(--column-padding);
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-left {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.back {
  color: var(--color-text-secondary);
  transition: color var(--transition-subtle);
}

.back:hover {
  color: var(--color-text);
}

.wordmark {
  font-size: var(--text-meta);
  font-weight: 500;
  letter-spacing: var(--tracking-label);
  color: var(--color-text);
}

.header-nav {
  display: flex;
  align-items: center;
  gap: var(--space-4);
}

.nav-item {
  color: var(--color-text-secondary);
  transition: color var(--transition-subtle);
  display: flex;
  align-items: center;
  gap: 6px;
}

.nav-item:hover,
.nav-item.active {
  color: var(--color-text);
}

.pass-count {
  font-family: var(--font-mono);
  font-size: var(--text-label);
  color: var(--color-accent);
  letter-spacing: 0;
}
</style>
