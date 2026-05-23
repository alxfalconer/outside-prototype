<script setup lang="ts">
import type { EventCategory } from '~/composables/useEvents'
import type { FeedPostData } from '~/components/feed/FeedPost.vue'

const { isAuthenticated, login } = useAuth()
const { filterEvents, cities, categories } = useEvents()

// ─── Auth gate ────────────────────────────────────────────
const loginEmail    = ref('')
const loginPassword = ref('')
const loginError    = ref('')

async function handleLogin() {
  loginError.value = ''
  if (!loginEmail.value.trim() || !loginPassword.value.trim()) {
    loginError.value = 'Credentials required.'
    return
  }
  const ok = login(loginEmail.value, loginPassword.value)
  if (ok) {
    await nextTick()
    window.scrollTo({ top: SCROLL_END, behavior: 'smooth' })
  }
}

// Body scroll lock — prevent access below hero when unauthenticated
onMounted(() => {
  if (!isAuthenticated.value) document.body.style.overflow = 'hidden'
})
watch(isAuthenticated, authed => {
  document.body.style.overflow = authed ? '' : 'hidden'
})
onUnmounted(() => {
  document.body.style.overflow = ''
})

const activeTab = ref<'index' | 'feed'>('index')
const selectedCity = ref('')
const selectedCategory = ref<EventCategory | ''>('')

const filteredEvents = computed(() =>
  filterEvents(selectedCity.value || undefined, selectedCategory.value || undefined)
)

const cityOpen = ref(false)
const categoryOpen = ref(false)

function closeDropdowns() {
  cityOpen.value = false
  categoryOpen.value = false
}

// ─── Hero scroll transition ──────────────────────────────
const SCROLL_END = 400
const HEADER_H = 56
const TOP_MARGIN = 32
const FINAL_H_RATIO = 0.6
const COL_MAX = 1080
const COL_PAD = 24

const scrollY = ref(0)
const viewportH = ref(0)
const viewportW = ref(0)

const progress = computed(() => Math.min(1, scrollY.value / SCROLL_END))

const heroCopyFullStyle = computed(() => ({
  opacity: Math.max(0, 1 - progress.value * 3),
  pointerEvents: 'none' as const,
}))

const heroCopyContainedStyle = computed(() => ({
  opacity: Math.min(1, Math.max(0, (progress.value - 0.5) * 2)),
  pointerEvents: 'none' as const,
}))

function lerp(a: number, b: number, t: number) { return a + (b - a) * t }

const heroStyle = computed(() => {
  const t = progress.value
  const vh = viewportH.value
  const vw = viewportW.value
  if (!vh) return {}
  const top = lerp(0, HEADER_H + TOP_MARGIN, t)
  const height = lerp(vh, vh * FINAL_H_RATIO, t)
  const hInset = lerp(0, Math.max(COL_PAD, (vw - COL_MAX) / 2 + COL_PAD), t)
  return {
    position: 'fixed' as const,
    top: `${top}px`,
    left: `${hInset}px`,
    right: `${hInset}px`,
    height: `${height}px`,
    zIndex: 5,
  }
})

const spacerHeight = computed(() =>
  viewportH.value ? `${SCROLL_END + HEADER_H + TOP_MARGIN + viewportH.value * FINAL_H_RATIO}px` : '100vh'
)

function onScroll() { scrollY.value = window.scrollY }
function onResize() { viewportH.value = window.innerHeight; viewportW.value = window.innerWidth }

onMounted(() => {
  onResize()
  document.addEventListener('click', closeDropdowns)
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onResize, { passive: true })
})
onUnmounted(() => {
  document.removeEventListener('click', closeDropdowns)
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onResize)
})

const FEED_POSTS: FeedPostData[] = [
  {
    id: 'p1',
    authorName: 'Metrograph',
    authorType: 'venue',
    eventTitle: 'Je Tu Il Elle',
    eventSlug: 'je-tu-il-elle',
    content: 'We\'re opening our extended Akerman retrospective with Je Tu Il Elle — one of her earliest and most unguarded films. Shot in four days in 1974. 16mm print. This is the one to start with.',
    timestamp: '2 days ago',
    commentCount: 9
  },
  {
    id: 'p2',
    authorName: 'james.w',
    authorType: 'attendee',
    eventTitle: 'Objekt',
    eventSlug: 'objekt',
    content: 'Saw Objekt close at Panorama Bar two years ago — one of the best sets I\'ve heard in a club. Output is a completely different room but I don\'t think it matters. Going.',
    timestamp: '3 days ago',
    commentCount: 14
  },
  {
    id: 'p3',
    authorName: 'Anthology Film Archives',
    authorType: 'venue',
    eventTitle: 'Stalker',
    eventSlug: 'stalker',
    content: 'The new 4K restoration of Stalker from Mosfilm is genuinely revelatory. The Zone has never looked so present. We\'re screening it once — 19:30 on the 25th. Post-screening discussion.',
    timestamp: '4 days ago',
    commentCount: 22
  },
  {
    id: 'p4',
    authorName: 'maya.r',
    authorType: 'attendee',
    content: 'Is Platform as Publisher being recorded? Trying to get someone to come but they have a conflict Thursday morning.',
    timestamp: '5 days ago',
    commentCount: 6
  },
  {
    id: 'p5',
    authorName: 'BAM',
    authorType: 'venue',
    eventTitle: 'The Rite of Spring',
    eventSlug: 'rite-of-spring',
    content: 'We\'ve been working to bring Tanztheater Wuppertal back to Brooklyn for three years. The Rite of Spring on the Howard Gilman stage — dirt floor, full company. Two performances only.',
    timestamp: '1 week ago',
    commentCount: 31
  }
]
</script>

<template>
  <main class="page">

    <!-- Spacer reserves flow space while hero is fixed -->
    <div class="hero-spacer" :style="{ height: spacerHeight }" />

    <!-- Hero video — position driven by scroll -->
    <div class="hero" :style="heroStyle">
      <div class="hero-inner">
        <video
          class="hero-video"
          src="/outside-reel-glow.mp4"
          autoplay
          muted
          loop
          playsinline
          :style="{ opacity: isAuthenticated ? 1 : 0.7, filter: isAuthenticated ? 'none' : 'blur(32px)', transition: 'opacity 1200ms ease, filter 1200ms ease' }"
        />
        <div class="hero-fade" />

        <!-- Full-screen copy: logo era + "Something is happening." -->
        <div class="hero-copy hero-copy-full" :style="heroCopyFullStyle">
          <p class="hero-headline">Something is happening.</p>
        </div>

        <!-- Contained copy: "Presence leaves a record." -->
        <div class="hero-copy hero-copy-contained" :style="heroCopyContainedStyle">
          <p class="hero-presence-lead">Presence leaves a record.</p>
          <p class="hero-presence-sub">Collect experiences across New York City.</p>
        </div>

        <!-- Auth gate — overlaid on hero when unauthenticated -->
        <Transition name="auth-fade">
          <div v-if="!isAuthenticated" class="auth-gate">
            <div class="auth-body">
              <form class="auth-row" @submit.prevent="handleLogin" novalidate>
                <div class="auth-col">
                  <input
                    v-model="loginEmail"
                    type="email"
                    class="auth-input"
                    placeholder="Email"
                    autocomplete="email"
                    spellcheck="false"
                  />
                </div>
                <div class="auth-col">
                  <input
                    v-model="loginPassword"
                    type="password"
                    class="auth-input"
                    placeholder="Password"
                    autocomplete="current-password"
                  />
                </div>
                <button type="submit" class="auth-enter">Enter →</button>
              </form>
              <p v-if="loginError" class="auth-error">{{ loginError }}</p>
            </div>
            <div class="auth-meta">
              <span class="auth-meta-item">Signal Area — New York City</span>
            </div>
          </div>
        </Transition>
      </div>
    </div>

    <div v-show="isAuthenticated" id="index-content" class="page-inner">

      <!-- Page header -->
      <div id="event-index" class="page-header">
        <h1 class="page-title">
          <span v-if="activeTab === 'index'">Upcoming Events</span>
          <span v-else>Feed</span>
        </h1>
        <div class="tab-bar">
          <button
            class="tab label"
            :class="{ active: activeTab === 'index' }"
            @click="activeTab = 'index'"
          >
            Experiences
          </button>
          <button
            class="tab label"
            :class="{ active: activeTab === 'feed' }"
            @click="activeTab = 'feed'"
          >
            Feed
          </button>
        </div>
      </div>

      <!-- Event Index tab -->
      <template v-if="activeTab === 'index'">
        <!-- Filters -->
        <div class="filters">

          <!-- Borough dropdown -->
          <div class="filter-dropdown" :class="{ open: cityOpen }" @click.stop>
            <button
              class="filter-trigger label"
              :class="{ active: selectedCity }"
              @click="cityOpen = !cityOpen; categoryOpen = false"
            >
              {{ selectedCity || 'All Boroughs' }}
              <span class="filter-caret">{{ cityOpen ? '↑' : '↓' }}</span>
            </button>
            <div v-if="cityOpen" class="filter-menu">
              <button
                class="filter-option label"
                :class="{ active: !selectedCity }"
                @click="selectedCity = ''; cityOpen = false"
              >All Boroughs</button>
              <button
                v-for="city in cities"
                :key="city"
                class="filter-option label"
                :class="{ active: selectedCity === city }"
                @click="selectedCity = city; cityOpen = false"
              >{{ city }}</button>
            </div>
          </div>

          <!-- Category dropdown -->
          <div class="filter-dropdown" :class="{ open: categoryOpen }" @click.stop>
            <button
              class="filter-trigger label"
              :class="{ active: selectedCategory }"
              @click="categoryOpen = !categoryOpen; cityOpen = false"
            >
              {{ selectedCategory || 'All Categories' }}
              <span class="filter-caret">{{ categoryOpen ? '↑' : '↓' }}</span>
            </button>
            <div v-if="categoryOpen" class="filter-menu">
              <button
                class="filter-option label"
                :class="{ active: !selectedCategory }"
                @click="selectedCategory = ''; categoryOpen = false"
              >All Categories</button>
              <button
                v-for="cat in categories"
                :key="cat"
                class="filter-option label"
                :class="{ active: selectedCategory === cat }"
                @click="selectedCategory = cat; categoryOpen = false"
              >{{ cat }}</button>
            </div>
          </div>

          <span v-if="selectedCity || selectedCategory" class="filter-count label">
            {{ filteredEvents.length }} events
          </span>
          <button
            v-if="selectedCity || selectedCategory"
            class="filter-clear label"
            @click="selectedCity = ''; selectedCategory = ''"
          >
            Clear ×
          </button>

        </div>

        <!-- Column headers -->
        <div class="list-header">
          <span class="label">#</span>
          <span class="label">Type</span>
          <span class="label">Event</span>
          <span class="label">Venue</span>
          <span class="label">Date</span>
          <span class="label">Price</span>
          <span />
        </div>

        <!-- Event rows -->
        <TransitionGroup name="filter-row" tag="div" class="event-list" appear>
          <EventRow
            v-for="(event, i) in filteredEvents"
            :key="event.id"
            :event="event"
            :style="{ '--i': i }"
          />
        </TransitionGroup>

        <div v-if="filteredEvents.length === 0" class="empty-state mono">
          No events match the selected filters.
        </div>
      </template>

      <!-- Feed tab -->
      <template v-else>
        <TransitionGroup name="filter-row" tag="div" class="feed" appear>
          <FeedPost
            v-for="(post, i) in FEED_POSTS"
            :key="post.id"
            :post="post"
            :style="{ '--i': i }"
          />
        </TransitionGroup>
      </template>

    </div>
  </main>
</template>

<style scoped>
.page {
  min-height: calc(100vh - var(--header-height));
}

/* ─── Hero ──────────────────────────────────────────── */
.hero {
  /* position/size driven by JS via inline style */
  overflow: hidden;
}

.hero-inner {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: var(--color-bg);
}

.hero-video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.hero-fade {
  position: absolute;
  inset: 0;
  background: rgba(8, 8, 8, 0.45);
  pointer-events: none;
}

.hero-copy {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  pointer-events: none;
  text-align: center;
  padding: 0 var(--column-padding);
}

.hero-copy-contained {
  align-items: flex-start;
  justify-content: flex-end;
  text-align: left;
  padding: 0 var(--column-padding) var(--column-padding);
}

.hero-headline {
  margin: 0;
  white-space: nowrap;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: clamp(0.5rem, 0.7vw, 0.75rem);
  font-weight: 500;
  letter-spacing: -0.02em;
  color: rgba(255, 255, 255, 0.65);
  -webkit-font-smoothing: antialiased;
}

.hero-presence-lead {
  margin: 0;
  font-family: var(--font-sans);
  font-size: clamp(1.15rem, 1.7vw, 1.5rem);
  font-weight: 400;
  line-height: 1.04;
  letter-spacing: -0.03em;
  color: rgba(255, 255, 255, 0.92);
  -webkit-font-smoothing: antialiased;
}

.hero-presence-sub {
  margin: 0;
  font-family: var(--font-sans);
  font-size: var(--text-meta);
  font-weight: 400;
  letter-spacing: -0.01em;
  color: rgba(255, 255, 255, 0.6);
}

.page-inner {
  position: relative;
  z-index: 10;
  background: var(--color-bg);
  max-width: var(--column-max);
  margin: 0 auto;
  padding: var(--space-4) var(--column-padding) var(--space-7);
}

/* ─── Page header ───────────────────────────────────── */
.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-4);
  padding-bottom: var(--space-3);
  border-bottom: 1px solid var(--color-border);
}

.page-title {
  font-family: var(--font-sans);
  font-size: var(--text-body);
  font-weight: 400;
  letter-spacing: 0;
  color: var(--color-text-secondary);
}

/* ─── Tabs ──────────────────────────────────────────── */
.tab-bar {
  display: flex;
  gap: var(--space-3);
}

.tab {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  color: var(--color-text-secondary);
  transition: color var(--transition-subtle);
  padding-bottom: 4px;
  border-bottom: 1px solid transparent;
}

.tab:hover,
.tab.active {
  color: var(--color-text);
}

.tab.active {
  border-bottom-color: var(--color-text);
}

/* ─── Filters ───────────────────────────────────────── */
.filters {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  margin-bottom: var(--space-4);
}

.filter-dropdown {
  position: relative;
}

.filter-trigger {
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: 1px solid var(--color-border);
  padding: 8px 12px;
  cursor: pointer;
  color: var(--color-text-secondary);
  font-size: 0.5625rem;
  transition: border-color var(--transition-subtle), color var(--transition-subtle);
  white-space: nowrap;
}

.filter-trigger:hover,
.filter-dropdown.open .filter-trigger {
  border-color: var(--color-text-secondary);
  color: var(--color-text);
}

.filter-trigger.active {
  color: var(--color-text);
  border-color: var(--color-text-secondary);
}

.filter-caret {
  opacity: 0.5;
  font-size: 0.6rem;
  line-height: 1;
}

.filter-menu {
  position: absolute;
  top: calc(100% + 2px);
  left: 0;
  min-width: 100%;
  background: var(--color-surface-raised);
  border: 1px solid var(--color-border);
  z-index: 50;
  display: flex;
  flex-direction: column;
}

.filter-option {
  background: none;
  border: none;
  padding: 9px 12px;
  text-align: left;
  cursor: pointer;
  color: var(--color-text-secondary);
  font-size: 0.5625rem;
  transition: color var(--transition-subtle), background var(--transition-subtle);
  white-space: nowrap;
  border-bottom: 1px solid var(--color-border);
}

.filter-option:last-child {
  border-bottom: none;
}

.filter-option:hover {
  color: var(--color-text);
  background: rgba(255, 255, 255, 0.05);
}

.filter-option.active {
  color: var(--color-text);
}

.filter-count {
  color: var(--color-text-secondary);
  padding: 8px 4px;
  font-size: 0.5625rem;
}

.filter-clear {
  background: none;
  border: none;
  padding: 8px 4px;
  cursor: pointer;
  color: var(--color-text-secondary);
  font-size: 0.5625rem;
  transition: color var(--transition-subtle);
}

.filter-clear:hover {
  color: var(--color-text);
}

/* ─── List header ───────────────────────────────────── */
.list-header {
  display: grid;
  grid-template-columns: 40px 120px 1fr 160px 72px 48px 20px;
  gap: var(--space-2);
  padding: 0 0 var(--space-2) 12px;
  border-bottom: 1px solid var(--color-border);
  margin-bottom: 0;
}


/* ─── Filter row transition ─────────────────────────── */
.filter-row-enter-active {
  transition: opacity 220ms ease;
  transition-delay: calc(var(--i) * 28ms);
}

.filter-row-leave-active {
  transition: opacity 100ms ease;
  transition-delay: calc(var(--i) * 16ms);
}

.filter-row-enter-from,
.filter-row-leave-to {
  opacity: 0;
}

.filter-row-move {
  transition: transform 220ms ease;
}

/* ─── Feed ──────────────────────────────────────────── */
.feed {
  display: flex;
  flex-direction: column;
}

/* ─── Auth gate ─────────────────────────────────────── */
.auth-gate {
  position: absolute;
  inset: 0;
  z-index: 2;
}

.auth-body {
  position: absolute;
  top: 53%;
  left: 50%;
  transform: translateX(-50%);
  width: min(320px, calc(100% - 48px));
}

.auth-row {
  display: grid;
  grid-template-columns: 1fr 1fr auto;
  align-items: end;
  gap: var(--space-3);
  padding: var(--space-2) 0;
}

.auth-col {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}

.auth-col-label {
  font-family: var(--font-mono);
  font-size: 0.45rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.65);
}

.auth-input {
  background: transparent;
  border: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.18);
  padding: 5px 0;
  font-family: var(--font-mono);
  font-size: 0.6rem;
  letter-spacing: 0.04em;
  color: rgba(255, 255, 255, 0.85);
  outline: none;
  transition: border-color var(--transition-subtle);
  width: 100%;
  min-width: 0;
}

.auth-input::placeholder {
  color: rgba(255, 255, 255, 0.35);
  font-family: var(--font-mono);
  font-size: 0.55rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.auth-input:focus {
  border-bottom-color: rgba(255, 255, 255, 0.5);
}

.auth-enter {
  background: none;
  border: none;
  padding: 5px 12px;
  cursor: pointer;
  font-family: var(--font-mono);
  font-size: 0.55rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.65);
  transition: color var(--transition-subtle);
  white-space: nowrap;
}

.auth-enter:hover {
  color: rgba(255, 255, 255, 0.95);
}

.auth-error {
  font-family: var(--font-mono);
  font-size: 0.45rem;
  letter-spacing: 0.08em;
  color: rgba(255, 255, 255, 0.35);
  text-transform: uppercase;
  margin-top: var(--space-1);
}

.auth-meta {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: var(--space-3) var(--column-padding);
  display: flex;
  justify-content: center;
  gap: var(--space-5);
}

.auth-meta-item {
  font-family: var(--font-mono);
  font-size: 0.45rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.22);
}

.auth-fade-leave-active {
  transition: opacity 350ms ease;
}
.auth-fade-leave-to {
  opacity: 0;
}

/* ─── Empty state ───────────────────────────────────── */
.empty-state {
  font-size: var(--text-label);
  color: var(--color-text-secondary);
  padding: var(--space-5) 0;
  letter-spacing: 0.04em;
}

/* ─── Responsive ────────────────────────────────────── */
@media (max-width: 768px) {
  .page-inner {
    padding: var(--space-3) var(--column-padding) var(--space-6);
  }

  .page-header {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-2);
    margin-bottom: var(--space-3);
  }

  .filters {
    flex-wrap: wrap;
    gap: var(--space-1);
  }

  .list-header {
    display: none;
  }
}

@media (max-width: 480px) {
  .page-inner {
    padding-left: var(--space-2);
    padding-right: var(--space-2);
  }
}
</style>
