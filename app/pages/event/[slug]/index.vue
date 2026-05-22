<script setup lang="ts">
import { formatDate } from '~/utils/format'

const route = useRoute()
const { getEventBySlug } = useEvents()
const { hasPass } = usePasses()

const event = computed(() => getEventBySlug(route.params.slug as string))
const isAttending = computed(() => event.value ? hasPass(event.value.id) : false)

if (!event.value) {
  throw createError({ statusCode: 404, message: 'Event not found' })
}
</script>

<template>
  <main v-if="event" class="page">
    <div class="page-inner">

      <!-- Hero body — sticky flyer left, all content right -->
      <div class="event-body">

        <div class="event-flyer-wrap">
          <EventFlyer :event="event" size="lg" />
        </div>

        <div class="event-content">

          <!-- Title block — category and attending absorbed here, not floating above layout -->
          <div class="event-title-block">
            <div class="event-title-meta">
              <span class="label event-category-label">{{ event.category }}</span>
              <span v-if="isAttending" class="label event-attending-label">Attending</span>
            </div>
            <h1 class="event-title">{{ event.title }}</h1>
            <p v-if="event.subtitle" class="event-subtitle mono">{{ event.subtitle }}</p>
          </div>

          <!-- Compressed metadata strip -->
          <div class="event-meta-strip mono">
            <span>{{ formatDate(event.date) }}</span>
            <span class="meta-dot" aria-hidden="true">·</span>
            <span>{{ event.time }}</span>
            <template v-if="event.doorsTime">
              <span class="meta-dot" aria-hidden="true">·</span>
              <span class="meta-secondary">Doors {{ event.doorsTime }}</span>
            </template>
            <span class="meta-dot" aria-hidden="true">·</span>
            <span>{{ event.venue }}</span>
            <span class="meta-dot" aria-hidden="true">·</span>
            <span>{{ event.city }}</span>
            <span class="meta-dot meta-dot--price" aria-hidden="true">·</span>
            <span class="meta-price">{{ event.price }}</span>
          </div>

          <BaseDivider />

          <!-- Purchase action — elevated before description -->
          <PassCollect :event="event" />

          <BaseDivider />

          <!-- Description -->
          <p class="event-description">{{ event.description }}</p>

          <div v-if="event.tags.length" class="event-tags">
            <span v-for="tag in event.tags" :key="tag" class="tag mono">{{ tag }}</span>
          </div>

        </div>
      </div>

      <!-- Portal — full-width, hard architectural break -->
      <div class="portal-section">
        <div class="portal-rule" />
        <div class="portal-header">
          <div class="portal-header-left">
            <h2 class="portal-label label">Event Portal</h2>
            <p class="portal-status mono">
              {{ isAttending ? 'You have access.' : 'Ticket holders only.' }}
            </p>
          </div>
          <NuxtLink :to="`/event/${event.slug}/portal`" class="portal-link label">
            {{ isAttending ? 'Enter Portal →' : 'Preview →' }}
          </NuxtLink>
        </div>

        <div class="portal-preview" :class="{ locked: !isAttending }">
          <div class="portal-preview-inner">
            <div class="preview-block">
              <span class="label">Updates</span>
              <div class="preview-lines">
                <div class="preview-line preview-line--long" />
                <div class="preview-line preview-line--med" />
                <div class="preview-line preview-line--short" />
                <div class="preview-line preview-line--long" />
                <div class="preview-line preview-line--med" />
              </div>
            </div>
            <div class="preview-block">
              <span class="label">Attending</span>
              <div class="preview-dots">
                <div v-for="i in 12" :key="i" class="preview-dot" />
              </div>
            </div>
            <div class="preview-block">
              <span class="label">Gallery</span>
              <div class="preview-grid">
                <div v-for="i in 6" :key="i" class="preview-tile" />
              </div>
            </div>
          </div>
          <!-- Overlay removed — blur communicates the lock -->
          <div v-if="!isAttending" class="portal-lock-overlay" />
        </div>
      </div>

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
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

/* ─── Hero body ─────────────────────────────────────── */
.event-body {
  display: grid;
  grid-template-columns: 360px 1fr;
  gap: var(--space-5);
  align-items: start;
}

.event-flyer-wrap {
  position: sticky;
  top: calc(var(--header-height) + var(--space-3));
  width: 360px;
}

/* ─── Content column ────────────────────────────────── */
.event-content {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

/* ─── Title block ───────────────────────────────────── */
.event-title-block {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.event-title-meta {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  margin-bottom: 4px;
}

.event-category-label {
  color: var(--color-text-secondary);
}

.event-attending-label {
  color: var(--color-accent);
}

.event-title {
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 4vw, 4rem);
  font-weight: 700;
  line-height: 0.95;
  letter-spacing: -0.02em;
  color: var(--color-text);
}

.event-subtitle {
  color: var(--color-text-secondary);
  font-size: var(--text-meta);
  letter-spacing: 0.02em;
}

/* ─── Metadata strip ────────────────────────────────── */
.event-meta-strip {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 5px;
  font-size: var(--text-label);
  color: var(--color-text-secondary);
  letter-spacing: 0.03em;
  line-height: 1.8;
}

.meta-dot {
  color: var(--color-text-secondary);
  opacity: 0.4;
  font-size: 0.5rem;
  line-height: 1;
  align-self: center;
}

.meta-dot--price {
  opacity: 0.5;
}

.meta-price {
  color: var(--color-text);
}

.meta-secondary {
  color: var(--color-text-secondary);
  opacity: 0.7;
}

/* ─── Description ───────────────────────────────────── */
.event-description {
  font-size: var(--text-body);
  line-height: 1.85;
  color: var(--color-text-secondary);
  max-width: 52ch;
}

.event-tags {
  display: flex;
  gap: var(--space-1);
  flex-wrap: wrap;
}

.tag {
  font-size: var(--text-label);
  color: var(--color-text-secondary);
  border: 1px solid var(--color-border);
  padding: 4px 8px;
  letter-spacing: 0.04em;
}

/* ─── Portal section — hard architectural break ─────── */
.portal-section {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  margin-top: var(--space-5);
}

.portal-rule {
  border-top: 1px solid var(--color-border);
}

.portal-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.portal-header-left {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.portal-label {
  color: var(--color-text);
}

.portal-status {
  font-size: var(--text-label);
  color: var(--color-text-secondary);
  letter-spacing: 0.03em;
}

.portal-link {
  color: var(--color-text-secondary);
  transition: color var(--transition-subtle);
}

.portal-link:hover {
  color: var(--color-text);
}

/* ─── Portal preview silhouette ─────────────────────── */
.portal-preview {
  position: relative;
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  overflow: hidden;
}

.portal-preview.locked .portal-preview-inner {
  filter: blur(6px);
  pointer-events: none;
  user-select: none;
}

.portal-preview-inner {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-4);
  padding: var(--space-5);
}

.preview-block {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.preview-lines {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.preview-line {
  height: 8px;
  background: var(--color-border);
}

.preview-line--long  { width: 100%; }
.preview-line--med   { width: 70%; }
.preview-line--short { width: 45%; }

.preview-dots {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.preview-dot {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--color-border);
}

.preview-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 6px;
}

.preview-tile {
  aspect-ratio: 4 / 3;
  background: var(--color-border);
}

/* Blur overlay — no text, the blur speaks for itself */
.portal-lock-overlay {
  position: absolute;
  inset: 0;
  background: rgba(8, 8, 8, 0.45);
}

/* ─── Responsive ────────────────────────────────────── */
@media (max-width: 768px) {
  .page-inner {
    gap: var(--space-3);
  }

  .event-body {
    grid-template-columns: 1fr;
    gap: var(--space-3);
  }

  .event-flyer-wrap {
    position: static;
    width: 100%;
    max-width: 320px;
  }

  .event-title {
    font-size: clamp(2rem, 8vw, 3rem);
  }
}
</style>
