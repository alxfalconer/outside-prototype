<script setup lang="ts">
const { passCount } = usePasses()
const route = useRoute()

const isEventRoute = computed(() => route.path.startsWith('/event/'))
const parentSlug = computed(() => {
  const parts = route.path.split('/')
  return parts[2] ?? null
})

const isIndex = computed(() => route.path === '/')

// ─── Constants (must match index.vue) ────────────────────
const SCROLL_END  = 400
const HEADER_H    = 56
const COL_MAX     = 1080
const COL_PAD     = 24
const HERO_SCALE  = 2.0
const LOGO_NAT_H  = 18
const PHRASE_H    = 12   // approx rendered height of hero headline
const GAP         = 14   // gap between logo bottom and phrase top in hero

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

async function onIndexClick(e: Event) {
  e.preventDefault()
  if (route.path !== '/') {
    await navigateTo('/')
    // Wait for page transition (200ms) + component mount + spacer measurement
    setTimeout(() => {
      document.getElementById('index-content')?.scrollIntoView({ behavior: 'smooth' })
    }, 280)
  } else {
    document.getElementById('index-content')?.scrollIntoView({ behavior: 'smooth' })
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
// Exists only on the index page while the transition is in progress.
// It starts centered above the hero phrase and interpolates to the
// natural navbar logo position as the user scrolls.

const isTraveling = computed(() =>
  isIndex.value && scrollProgress.value < 1
)

const travelingLogoStyle = computed(() => {
  if (!isTraveling.value || !viewportH.value || !logoNatW.value) return null

  const t   = scrollProgress.value
  const vw  = viewportW.value
  const vh  = viewportH.value
  const lw  = logoNatW.value

  // Hero start: logo center sits above the centered phrase
  const heroLogoH = LOGO_NAT_H * HERO_SCALE
  const startCX   = vw / 2
  const startCY   = vh / 2 - PHRASE_H / 2 - GAP - heroLogoH / 2

  // Navbar end: logo center in its natural header position
  const navLeft = Math.max(COL_PAD, (vw - COL_MAX) / 2 + COL_PAD)
  const endCX   = navLeft + lw / 2
  const endCY   = HEADER_H / 2

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

// Real logo: invisible while traveling logo is active so there's no double
const realLogoStyle = computed(() => ({
  opacity:    isTraveling.value ? 0 : 1,
  transition: 'opacity 80ms linear',
}))

// Nav items fade in with scroll progress; unclickable at near-zero opacity
const navStyle = computed(() => ({
  opacity:       isIndex.value ? scrollProgress.value : 1,
  pointerEvents: (isIndex.value && scrollProgress.value < 0.1)
    ? ('none' as const)
    : ('auto' as const),
}))
</script>

<template>
  <header class="header" :class="{ transparent: isIndex && !scrolled }">
    <div class="header-inner">
      <div class="header-left">
        <NuxtLink
          v-if="isEventRoute"
          :to="parentSlug && route.path.includes('/portal') ? `/event/${parentSlug}` : '/'"
          class="back mono"
        >
          ←
        </NuxtLink>
        <NuxtLink to="/" class="wordmark">
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

      <nav class="header-nav" :style="navStyle">
        <NuxtLink to="/" class="nav-item label" :class="{ active: route.path === '/' }" @click="onIndexClick">Index</NuxtLink>
        <NuxtLink to="/profile" class="nav-item label" :class="{ active: route.path === '/profile' }">
          Collection<span v-if="passCount > 0" class="pass-count">{{ passCount }}</span>
        </NuxtLink>
      </nav>
    </div>
  </header>

  <!-- Traveling logo: fixed, scroll-driven, only active during hero transition -->
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
  display: flex;
  align-items: center;
}

.wordmark-logo {
  height: 18px;
  width: auto;
  display: block;
}

.header-nav {
  display: flex;
  align-items: center;
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
