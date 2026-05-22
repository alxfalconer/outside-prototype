<script setup lang="ts">
import { formatDate } from '~/utils/format'

const { passes, passCount, stats } = usePasses()
const { getEventById } = useEvents()

const activeTab = ref<'archive' | 'media'>('archive')

const MOCK_USER = {
  username: 'a.falconer',
  displayName: 'Alex Falconer',
  bio: 'New York.',
  joinedDate: 'March 2025',
  initials: 'AF'
}

const sortedPasses = computed(() =>
  [...passes.value].sort((a, b) =>
    new Date(b.collectedAt).getTime() - new Date(a.collectedAt).getTime()
  )
)

// Last 5 passes for the attendance strip
const recentPasses = computed(() => sortedPasses.value.slice(0, 5))
</script>

<template>
  <main class="page">
    <div class="page-inner">

      <!-- Profile header -->
      <div class="profile-head">
        <div class="profile-identity">
          <div class="profile-avatar">{{ MOCK_USER.initials }}</div>
          <div class="profile-info">
            <h1 class="profile-name">{{ MOCK_USER.displayName }}</h1>
            <p class="profile-username mono">{{ MOCK_USER.username }}</p>
            <p v-if="MOCK_USER.bio" class="profile-bio">{{ MOCK_USER.bio }}</p>
          </div>
        </div>

        <!-- Observational stats — derived, not gamified -->
        <div class="profile-stats">
          <div class="stat">
            <span class="stat-label label">Joined</span>
            <span class="stat-value mono">{{ MOCK_USER.joinedDate }}</span>
          </div>
          <div class="stat">
            <span class="stat-label label">Attended</span>
            <span class="stat-value mono">{{ passCount }} {{ passCount === 1 ? 'event' : 'events' }}</span>
          </div>
          <template v-if="stats">
            <div class="stat">
              <span class="stat-label label">Top venue</span>
              <span class="stat-value mono">{{ stats.topVenue }}</span>
            </div>
            <div class="stat">
              <span class="stat-label label">Top city</span>
              <span class="stat-value mono">{{ stats.topCity }}</span>
            </div>
          </template>
        </div>
      </div>

      <!-- Attendance strip — last 5 events as flyer thumbnails -->
      <div v-if="recentPasses.length > 0" class="attendance-strip">
        <span class="label strip-label">Recent</span>
        <div class="strip-items">
          <div
            v-for="pass in recentPasses"
            :key="pass.id"
            class="strip-item"
          >
            <template v-if="getEventById(pass.eventId)">
              <NuxtLink :to="`/event/${getEventById(pass.eventId)!.slug}`">
                <EventFlyer
                  :event="getEventById(pass.eventId)!"
                  :archiveMode="true"
                  size="sm"
                />
              </NuxtLink>
            </template>
          </div>
        </div>
      </div>

      <BaseDivider />

      <!-- Tab bar -->
      <div class="tab-bar">
        <button class="tab label" :class="{ active: activeTab === 'archive' }" @click="activeTab = 'archive'">
          Ticket Archive
        </button>
        <button class="tab label" :class="{ active: activeTab === 'media' }" @click="activeTab = 'media'">
          Media
        </button>
      </div>

      <!-- Archive tab -->
      <template v-if="activeTab === 'archive'">
        <div v-if="sortedPasses.length === 0" class="empty-archive">
          <p class="empty-text mono">No events attended yet.</p>
          <NuxtLink to="/" class="empty-link label">Browse events →</NuxtLink>
        </div>
        <div v-else class="passes-grid">
          <PassArtifact
            v-for="pass in sortedPasses"
            :key="pass.id"
            :pass="pass"
          />
        </div>
        <p v-if="sortedPasses.length > 0 && sortedPasses.length < 5" class="archive-note mono">
          Your archive grows with every event attended.
        </p>
      </template>

      <!-- Media tab — implied surface -->
      <template v-else>
        <div class="media-placeholder">
          <p class="media-text mono">Event photos upload via on-site QR scan.</p>
          <p class="media-subtext mono">Photos taken at events appear here, timestamped and linked to the event.</p>
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
  padding: var(--space-5) var(--column-padding) var(--space-7);
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

/* ─── Profile head ──────────────────────────────────── */
.profile-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--space-4);
}

.profile-identity {
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
}

.profile-avatar {
  width: 48px;
  height: 48px;
  background: var(--color-surface-raised);
  border: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-mono);
  font-size: var(--text-label);
  font-weight: 500;
  letter-spacing: var(--tracking-label);
  color: var(--color-text-secondary);
  flex-shrink: 0;
}

.profile-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.profile-name {
  font-family: var(--font-display);
  font-size: 1.75rem;
  font-weight: 600;
  letter-spacing: -0.01em;
  line-height: 1.05;
}

.profile-username {
  color: var(--color-text-secondary);
  font-size: var(--text-meta);
}

.profile-bio {
  color: var(--color-text-secondary);
  font-size: var(--text-body);
  margin-top: 4px;
}

/* ─── Stats ─────────────────────────────────────────── */
.profile-stats {
  display: flex;
  flex-direction: column;
  gap: 8px;
  text-align: right;
}

.stat {
  display: flex;
  align-items: baseline;
  gap: var(--space-2);
  justify-content: flex-end;
}

.stat-label {
  color: var(--color-text-secondary);
}

.stat-value {
  font-size: var(--text-label);
  color: var(--color-text);
  letter-spacing: 0.04em;
}

/* ─── Attendance strip ──────────────────────────────── */
.attendance-strip {
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
}

.strip-label {
  padding-top: 4px;
  flex-shrink: 0;
  width: 48px;
}

.strip-items {
  display: flex;
  gap: var(--space-1);
  overflow-x: auto;
  flex: 1;
}

.strip-item {
  width: 56px;
  flex-shrink: 0;
}

/* ─── Tabs ──────────────────────────────────────────── */
.tab-bar {
  display: flex;
  gap: var(--space-3);
}

.tab {
  background: none;
  border: none;
  padding: 0 0 6px;
  cursor: pointer;
  color: var(--color-text-secondary);
  transition: color var(--transition-subtle);
  border-bottom: 1px solid transparent;
}

.tab:hover,
.tab.active {
  color: var(--color-text);
}

.tab.active {
  border-bottom-color: var(--color-text);
}

/* ─── Passes grid ───────────────────────────────────── */
.passes-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-3);
}

/* Slight rotation variance — creates accumulated artifact feeling */
.passes-grid :deep(.pass:nth-child(4n+1)) { transform: rotate(0.4deg); }
.passes-grid :deep(.pass:nth-child(4n+2)) { transform: rotate(-0.5deg); }
.passes-grid :deep(.pass:nth-child(4n+3)) { transform: rotate(0.3deg); }
.passes-grid :deep(.pass:nth-child(4n))   { transform: rotate(-0.2deg); }

/* ─── Archive note ──────────────────────────────────── */
.archive-note {
  font-size: var(--text-label);
  color: var(--color-text-secondary);
  opacity: 0.4;
  letter-spacing: 0.03em;
  padding-top: var(--space-3);
}

/* ─── Empty / placeholder states ───────────────────── */
.empty-archive {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  padding: var(--space-5) 0;
}

.empty-text {
  font-size: var(--text-label);
  color: var(--color-text-secondary);
  letter-spacing: 0.04em;
}

.empty-link {
  color: var(--color-text-secondary);
  transition: color var(--transition-subtle);
  align-self: flex-start;
}

.empty-link:hover {
  color: var(--color-text);
}

.media-placeholder {
  padding: var(--space-5) 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.media-text {
  font-size: var(--text-label);
  color: var(--color-text-secondary);
  letter-spacing: 0.04em;
}

.media-subtext {
  font-size: var(--text-label);
  color: var(--color-text-secondary);
  opacity: 0.5;
  letter-spacing: 0.04em;
}

/* ─── Responsive ────────────────────────────────────── */
@media (max-width: 640px) {
  .profile-head {
    flex-direction: column;
  }

  .profile-stats {
    text-align: left;
    align-items: flex-start;
  }

  .stat {
    justify-content: flex-start;
  }

  .passes-grid {
    grid-template-columns: 1fr;
  }
}
</style>
