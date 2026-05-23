<script setup lang="ts">
const { passCount } = usePasses()
const { isAuthenticated, logout } = useAuth()

function handleLogout() {
  logout()
  window.location.replace('/')
}
const route = useRoute()

const isEventRoute = computed(() => route.path.startsWith('/event/'))
const parentSlug = computed(() => {
  const parts = route.path.split('/')
  return parts[2] ?? null
})

const isIndex = computed(() => route.path === '/')

// ─── Constants (must match index.vue) ────────────────────
const SCROLL_END = 400
const HEADER_H   = 56
const HERO_SCALE = 2.0
const LOGO_NAT_H = 18
const PHRASE_H   = 12
const GAP        = 14

// ─── State ───────────────────────────────────────────────
const scrollProgress = ref(0)
const scrolled       = ref(false)
const viewportW      = ref(0)
const viewportH      = ref(0)
const logoNatW       = ref(0)
const logoRef        = ref<HTMLImageElement | null>(null)

function lerp(a: number, b: number, t: number) { return a + (b - a) * t }

function measure() {
  viewportW.value = window.innerWidth
  viewportH.value = window.innerHeight
  if (logoRef.value?.offsetWidth) logoNatW.value = logoRef.value.offsetWidth
}

function onScroll() {
  const y = window.scrollY
  scrollProgress.value = Math.min(1, y / SCROLL_END)
  scrolled.value = y > 80
}

async function onLogoClick(e: Event) {
  if (route.path !== '/') {
    e.preventDefault()
    await navigateTo('/')
    setTimeout(() => window.scrollTo(0, 0), 50)
  }
}

async function onIndexClick(e: Event) {
  e.preventDefault()
  if (route.path !== '/') {
    await navigateTo('/')
    setTimeout(() => {
      document.getElementById('event-index')?.scrollIntoView({ behavior: 'smooth' })
    }, 280)
  } else {
    document.getElementById('event-index')?.scrollIntoView({ behavior: 'smooth' })
  }
}

onMounted(() => {
  measure()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', measure, { passive: true })
})
onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', measure)
})

// ─── Traveling logo ───────────────────────────────────────
// Logo is now centered in the navbar — the animation is a pure
// vertical drop + scale with no horizontal movement.

const isTraveling = computed(() =>
  isIndex.value && scrollProgress.value < 1
)

const travelingLogoStyle = computed(() => {
  if (!isTraveling.value || !viewportH.value || !logoNatW.value) return null

  const t  = scrollProgress.value
  const vw = viewportW.value
  const vh = viewportH.value
  const lw = logoNatW.value

  // Start: centered above hero phrase
  const heroLogoH = LOGO_NAT_H * HERO_SCALE
  const startCX   = vw / 2
  const startCY   = vh / 2 - PHRASE_H / 2 - GAP - heroLogoH / 2

  // End: centered in navbar (pure vertical movement)
  const endCX = vw / 2
  const endCY = HEADER_H / 2

  return {
    position: 'fixed' as const,
    left:     `${lerp(startCX, endCX, t)}px`,
    top:      `${lerp(startCY, endCY, t)}px`,
    height:   `${LOGO_NAT_H}px`,
    width:    `${lw}px`,
    transform: `translate(-50%, -50%) scale(${lerp(HERO_SCALE, 1, t)})`,
    transformOrigin: 'center',
    zIndex:   200,
    pointerEvents: 'none' as const,
  }
})

const realLogoStyle = computed(() => ({
  opacity:    isTraveling.value ? 0 : 1,
  transition: 'opacity 80ms linear',
}))

const navStyle = computed(() => {
  if (!isAuthenticated.value) return { opacity: 0, pointerEvents: 'none' as const }
  if (!isIndex.value) return { opacity: 1 }
  return {
    opacity: scrollProgress.value,
    pointerEvents: scrollProgress.value < 0.1 ? ('none' as const) : ('auto' as const),
  }
})
</script>

<template>
  <header class="header" :class="{ transparent: isIndex && !scrolled }">
    <div class="header-inner">

      <!-- Left: user identity -->
      <div class="header-left">
        <NuxtLink
          v-if="isEventRoute"
          :to="parentSlug && route.path.includes('/portal') ? `/event/${parentSlug}` : '/'"
          class="back mono"
        >
          ←
        </NuxtLink>
        <div class="header-user" :style="navStyle">
          <img src="/avatar.webp" alt="" class="header-avatar" />
          <span class="header-username label">a.falconer</span>
        </div>
      </div>

      <!-- Center: logo -->
      <div class="header-center">
        <NuxtLink to="/" class="wordmark" @click="onLogoClick">
          <img
            ref="logoRef"
            src="/logo.png"
            alt="Outside"
            class="wordmark-logo"
            :style="realLogoStyle"
            @load="measure"
          />
        </NuxtLink>
      </div>

      <!-- Right: nav -->
      <nav class="header-nav" :style="navStyle">
        <NuxtLink to="/" class="nav-item label" :class="{ active: route.path === '/' }" @click="onIndexClick">Index</NuxtLink>
        <NuxtLink to="/profile" class="nav-item label" :class="{ active: route.path === '/profile' }">
          Archive<span v-if="passCount > 0" class="pass-count">{{ passCount }}</span>
        </NuxtLink>
        <button class="nav-item nav-logout label" @click="handleLogout">Log out</button>
      </nav>

    </div>
  </header>

  <Teleport to="body">
    <img
      v-if="isTraveling && travelingLogoStyle"
      src="/logo.png"
      alt=""
      class="traveling-logo"
      :style="travelingLogoStyle"
    />
  </Teleport>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--color-bg);
  border-bottom: 1px solid var(--color-border);
  height: var(--header-height);
  transition: background 400ms ease, border-color 400ms ease;
}

.header.transparent {
  background: transparent;
  border-bottom-color: transparent;
}

.header-inner {
  max-width: var(--column-max);
  margin: 0 auto;
  padding: 0 var(--column-padding);
  height: 100%;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
}

/* ─── Left ───────────────────────────────────────────── */
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

.header-user {
  display: flex;
  align-items: center;
  gap: 8px;
}

.header-avatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  object-fit: cover;
  display: block;
  border: 1px solid var(--color-border);
  flex-shrink: 0;
}

.header-username {
  color: var(--color-text-secondary);
  font-size: var(--text-label);
  text-transform: none;
  letter-spacing: 0;
}

/* ─── Center ─────────────────────────────────────────── */
.header-center {
  display: flex;
  justify-content: center;
}

.wordmark {
  display: flex;
  align-items: center;
}

.wordmark-logo {
  height: 18px;
  width: auto;
  display: block;
}

/* ─── Right ──────────────────────────────────────────── */
.header-nav {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: var(--space-4);
}

@media (max-width: 480px) {
  .header-nav {
    gap: var(--space-3);
  }
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

.nav-logout {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  opacity: 0.45;
  transition: opacity var(--transition-subtle);
}

.nav-logout:hover {
  opacity: 1;
}

.pass-count {
  font-family: var(--font-mono);
  font-size: var(--text-label);
  color: var(--color-accent);
  letter-spacing: 0;
}

.traveling-logo {
  display: block;
}
</style>
