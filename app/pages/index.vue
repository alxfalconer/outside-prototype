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
    <div class="page-inner">

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
            Event Index
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
          <select v-model="selectedCity" class="filter-select mono">
            <option value="">All cities</option>
            <option v-for="city in cities" :key="city" :value="city">{{ city }}</option>
          </select>
          <select v-model="selectedCategory" class="filter-select mono">
            <option value="">All categories</option>
            <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
          </select>
          <span v-if="selectedCity || selectedCategory" class="filter-count mono">
            {{ filteredEvents.length }} events
          </span>
          <button
            v-if="selectedCity || selectedCategory"
            class="filter-clear label"
            @click="selectedCity = ''; selectedCategory = ''"
          >
            Clear
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
        <div class="event-list">
          <EventRow
            v-for="event in filteredEvents"
            :key="event.id"
            :event="event"
          />
        </div>

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

.page-inner {
  max-width: var(--column-max);
  margin: 0 auto;
  padding: var(--space-3) var(--column-padding) var(--space-7);
}

/* ─── Page header ───────────────────────────────────── */
.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-2);
  padding-bottom: var(--space-2);
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
  margin-bottom: var(--space-2);
}

.filter-select {
  font-size: var(--text-label);
  letter-spacing: var(--tracking-label);
  text-transform: uppercase;
  color: var(--color-text-secondary);
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  padding: 6px 10px;
  cursor: pointer;
  appearance: none;
  transition: border-color var(--transition-subtle), color var(--transition-subtle);
}

.filter-select:hover,
.filter-select:focus {
  border-color: var(--color-text-secondary);
  color: var(--color-text);
  outline: none;
}

.filter-count {
  font-size: var(--text-label);
  color: var(--color-text-secondary);
  letter-spacing: 0.04em;
}

.filter-clear {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  color: var(--color-text-secondary);
  transition: color var(--transition-subtle);
}

.filter-clear:hover {
  color: var(--color-text);
}

/* ─── List header ───────────────────────────────────── */
.list-header {
  display: grid;
  grid-template-columns: 40px 80px 1fr 160px 72px 48px 20px;
  gap: var(--space-2);
  padding: 0 0 var(--space-1);
  border-bottom: 1px solid var(--color-border);
  margin-bottom: 0;
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
</style>
