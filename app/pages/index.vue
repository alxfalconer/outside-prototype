<script setup lang="ts">
import type { EventCategory } from '~/composables/useEvents'
import type { FeedPostData } from '~/components/feed/FeedPost.vue'

const { filterEvents, cities, categories } = useEvents()

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
        />
        <div class="hero-fade" />
        <p class="hero-headline">Something is happening.</p>
      </div>
    </div>

    <div id="index-content" class="page-inner">

      <!-- Page header -->
      <div class="page-header">
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
        <div class="feed">
          <FeedPost
            v-for="post in FEED_POSTS"
            :key="post.id"
            :post="post"
          />
        </div>
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

.hero-headline {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;
  white-space: nowrap;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: clamp(0.625rem, 0.9vw, 0.875rem);
  font-weight: 500;
  line-height: 0.93;
  letter-spacing: -0.02em;
  text-align: center;
  color: rgba(255, 255, 255, 0.9);
  -webkit-font-smoothing: antialiased;
  pointer-events: none;
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
