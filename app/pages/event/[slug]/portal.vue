<script setup lang="ts">
const route = useRoute()
const { getEventBySlug } = useEvents()
const { hasPass } = usePasses()

const event = computed(() => getEventBySlug(route.params.slug as string))
const isAttending = computed(() => event.value ? hasPass(event.value.id) : false)

if (!event.value) {
  throw createError({ statusCode: 404, message: 'Event not found' })
}

const MOCK_ATTENDEES = [
  'j.walsh', 'maya.r', 'sol.b', 'nadia.k', 'felix.r',
  'c.osei', 't.park', 'alex.v', 'sarah.lm', 'dan.w',
  'priya.s', 'mo.a'
]

const MOCK_UPDATES = [
  {
    id: 'u1',
    author: event.value?.venue ?? 'Venue',
    content: `Doors at ${event.value?.doorsTime ?? event.value?.time}. ${event.value?.category === 'film' ? 'The film begins promptly — no late seating. Running time approx. 160 minutes.' : 'Program begins at ' + event.value?.time + '. Arrive early.'}`,
    time: '1 day ago'
  },
  {
    id: 'u2',
    author: event.value?.venue ?? 'Venue',
    content: 'A brief introduction by the programming team will precede the event. Post-event discussion to follow in the lobby.',
    time: '3 days ago'
  }
]
</script>

<template>
  <main v-if="event" class="page">
    <div class="page-inner">

      <!-- Portal identity -->
      <div class="portal-head">
        <NuxtLink :to="`/event/${event.slug}`" class="back-link mono">← {{ event.title }}</NuxtLink>
        <div class="portal-title-row">
          <h1 class="portal-title">Event Portal</h1>
          <span v-if="isAttending" class="label attending-badge">Attending</span>
          <span v-else class="label locked-badge">Locked</span>
        </div>
      </div>

      <!-- Locked gate -->
      <div v-if="!isAttending" class="locked-gate">
        <BaseDivider />
        <div class="locked-message">
          <p class="locked-text mono">This portal is only accessible to ticket holders.</p>
          <NuxtLink :to="`/event/${event.slug}`" class="locked-cta label">
            Purchase a ticket →
          </NuxtLink>
        </div>

        <!-- Structural silhouette — depth implied, not labeled -->
        <div class="locked-silhouette">
          <div class="sil-block">
            <div class="sil-label" />
            <div class="sil-line sil-line--full" />
            <div class="sil-line sil-line--med" />
            <div class="sil-line sil-line--long" />
            <div class="sil-line sil-line--full" />
            <div class="sil-line sil-line--med" />
          </div>
          <div class="sil-block">
            <div class="sil-label" />
            <div class="sil-avatars">
              <div v-for="i in 12" :key="i" class="sil-avatar" />
            </div>
          </div>
          <div class="sil-block">
            <div class="sil-label" />
            <div class="sil-photo-grid">
              <div v-for="i in 9" :key="i" class="sil-photo" />
            </div>
          </div>
        </div>
      </div>

      <!-- Unlocked portal content -->
      <template v-else>
        <!-- Updates -->
        <section class="portal-section">
          <h2 class="section-title label">Updates</h2>
          <div class="updates-list">
            <article v-for="update in MOCK_UPDATES" :key="update.id" class="update">
              <div class="update-header">
                <span class="update-author">{{ update.author }}</span>
                <span class="mono update-time">{{ update.time }}</span>
              </div>
              <p class="update-content">{{ update.content }}</p>
            </article>
          </div>
        </section>

        <BaseDivider />

        <!-- Attendees -->
        <section class="portal-section">
          <h2 class="section-title label">Attending <span class="count mono">{{ MOCK_ATTENDEES.length }}</span></h2>
          <div class="attendee-list">
            <span v-for="name in MOCK_ATTENDEES" :key="name" class="attendee mono">{{ name }}</span>
          </div>
        </section>

        <BaseDivider />

        <!-- Gallery — locked until QR scan -->
        <section class="portal-section">
          <div class="gallery-header">
            <h2 class="section-title label">Gallery</h2>
            <span class="gallery-note mono">Event photos upload via on-site QR</span>
          </div>
          <div class="gallery-empty">
            <span class="mono gallery-empty-text">Photos will appear here during and after the event.</span>
          </div>
        </section>
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

/* ─── Head ──────────────────────────────────────────── */
.portal-head {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.back-link {
  font-size: var(--text-label);
  color: var(--color-text-secondary);
  letter-spacing: 0.04em;
  transition: color var(--transition-subtle);
}

.back-link:hover {
  color: var(--color-text);
}

.portal-title-row {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.portal-title {
  font-family: var(--font-display);
  font-size: clamp(1.75rem, 3.5vw, 2.5rem);
  font-weight: 700;
  letter-spacing: -0.01em;
  line-height: 1.0;
}

.attending-badge { color: var(--color-accent); }
.locked-badge    { color: var(--color-text-secondary); }

/* ─── Locked gate ───────────────────────────────────── */
.locked-gate {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.locked-message {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  padding: var(--space-1) 0;
}

.locked-text {
  font-size: var(--text-label);
  color: var(--color-text-secondary);
  letter-spacing: 0.04em;
}

.locked-cta {
  color: var(--color-text-secondary);
  transition: color var(--transition-subtle);
  align-self: flex-start;
}

.locked-cta:hover {
  color: var(--color-text);
}

.locked-silhouette {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-4);
  padding: var(--space-5);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  filter: blur(5px);
  pointer-events: none;
  user-select: none;
  opacity: 0.45;
}

.sil-block {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.sil-label {
  height: 8px;
  width: 48px;
  background: var(--color-border);
}

.sil-line {
  height: 8px;
  background: var(--color-border);
}

.sil-line--full { width: 100%; }
.sil-line--med  { width: 65%; }
.sil-line--long { width: 80%; }

.sil-avatars {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: var(--space-1);
}

.sil-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--color-border);
}

.sil-photo-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4px;
  margin-top: var(--space-1);
  min-height: 120px;
}

.sil-photo {
  aspect-ratio: 1;
  background: var(--color-border);
}

/* ─── Unlocked sections ─────────────────────────────── */
.portal-section {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.section-title {
  color: var(--color-text);
  display: flex;
  align-items: center;
  gap: var(--space-1);
}

.count {
  font-size: var(--text-label);
  color: var(--color-text-secondary);
}

/* Updates */
.updates-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.update {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  padding: var(--space-2) 0;
  border-top: 1px solid var(--color-border);
}

.update-header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
}

.update-author {
  font-size: var(--text-body);
  font-weight: 500;
}

.update-time {
  font-size: var(--text-label);
  color: var(--color-text-secondary);
  letter-spacing: 0.04em;
}

.update-content {
  font-size: var(--text-body);
  line-height: 1.7;
  color: var(--color-text-secondary);
  max-width: 60ch;
}

/* Attendees */
.attendee-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-1);
}

.attendee {
  font-size: var(--text-label);
  color: var(--color-text-secondary);
  border: 1px solid var(--color-border);
  padding: 4px 8px;
  letter-spacing: 0.04em;
  transition: color var(--transition-subtle), border-color var(--transition-subtle);
}

.attendee:hover {
  color: var(--color-text);
  border-color: var(--color-text-secondary);
}

/* Gallery */
.gallery-header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
}

.gallery-note {
  font-size: var(--text-label);
  color: var(--color-text-secondary);
  letter-spacing: 0.04em;
  opacity: 0.6;
}

.gallery-empty {
  padding: var(--space-5) 0;
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
}

.gallery-empty-text {
  font-size: var(--text-label);
  color: var(--color-text-secondary);
  letter-spacing: 0.04em;
  opacity: 0.5;
}
</style>
