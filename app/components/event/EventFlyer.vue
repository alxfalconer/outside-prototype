<script setup lang="ts">
import type { OutsideEvent } from '~/composables/useEvents'
import { formatDateShort } from '~/utils/format'

const props = defineProps<{
  event: OutsideEvent
  archiveMode?: boolean
  size?: 'sm' | 'md' | 'lg'
}>()

const variant = computed(() => (props.event.index - 1) % 4)

const shortTitle = computed(() => {
  const t = props.event.title
  return t.length > 40 ? t.slice(0, 38) + '…' : t
})

// Single word or very short — suitable for full-bleed treatment
const isSingleWord = computed(() => props.event.title.split(' ').length <= 2)
</script>

<template>
  <div
    class="flyer"
    :class="[
      `flyer--${event.category}`,
      `flyer--v${variant}`,
      { 'flyer--archive': archiveMode, [`flyer--${size}`]: size }
    ]"
  >
    <div class="flyer-grain" aria-hidden="true" />

    <!-- Variant 0: Full-bleed title — screenprint register -->
    <template v-if="variant === 0">
      <div class="flyer-top flyer-row">
        <span class="flyer-index-num">{{ String(event.index).padStart(3, '0') }}</span>
        <span class="flyer-cat-label">{{ event.category }}</span>
      </div>
      <div class="flyer-v0-body">
        <div class="flyer-title flyer-title--xl">{{ shortTitle }}</div>
      </div>
      <div class="flyer-bottom">
        <div class="flyer-bottom-rule" />
        <div class="flyer-row flyer-bottom-row">
          <span class="flyer-venue-text">{{ event.venue }}</span>
          <span class="flyer-date-text">{{ formatDateShort(event.date) }}</span>
        </div>
      </div>
    </template>

    <!-- Variant 1: Rave flyer — stacked information, dense -->
    <template v-else-if="variant === 1">
      <div class="flyer-v1-top">
        <div class="flyer-top-rule" />
        <div class="flyer-row flyer-v1-header">
          <span class="flyer-venue-text">{{ event.venue }}</span>
          <span class="flyer-cat-label">{{ event.category }}</span>
        </div>
      </div>
      <div class="flyer-v1-hero">
        <div class="flyer-title flyer-title--hero">{{ shortTitle }}</div>
        <div v-if="event.subtitle" class="flyer-subtitle">{{ event.subtitle }}</div>
      </div>
      <div class="flyer-v1-footer">
        <div class="flyer-rule" />
        <div class="flyer-row flyer-v1-data">
          <span class="flyer-date-text">{{ formatDateShort(event.date) }}</span>
          <span class="flyer-time-text">{{ event.time }}</span>
          <span v-if="event.doorsTime" class="flyer-doors-text">DOORS {{ event.doorsTime }}</span>
        </div>
      </div>
    </template>

    <!-- Variant 2: Institutional — Xerox program card register -->
    <template v-else-if="variant === 2">
      <div class="flyer-v2-header">
        <span class="flyer-venue-text flyer-venue-text--inst">{{ event.venue }}</span>
        <div class="flyer-v2-rule" />
      </div>
      <div class="flyer-v2-body">
        <div class="flyer-title flyer-title--inst">{{ shortTitle }}</div>
        <div v-if="event.subtitle" class="flyer-subtitle flyer-subtitle--inst">{{ event.subtitle }}</div>
      </div>
      <div class="flyer-v2-footer">
        <span class="flyer-date-text">{{ formatDateShort(event.date) }}</span>
        <span class="flyer-cat-label">{{ event.category }}</span>
      </div>
    </template>

    <!-- Variant 3: Data grid — club night listing register -->
    <template v-else>
      <div class="flyer-bg-index" aria-hidden="true">{{ String(event.index).padStart(2, '0') }}</div>
      <div class="flyer-v3-top">
        <div class="flyer-row">
          <span class="flyer-cat-label">{{ event.category }}</span>
          <span class="flyer-date-text">{{ formatDateShort(event.date) }}</span>
        </div>
        <div class="flyer-rule" />
      </div>
      <div class="flyer-v3-body">
        <div class="flyer-title flyer-title--grid">{{ shortTitle }}</div>
        <div v-if="event.subtitle" class="flyer-subtitle">{{ event.subtitle }}</div>
      </div>
      <div class="flyer-v3-bottom">
        <div class="flyer-rule" />
        <div class="flyer-row">
          <span class="flyer-venue-text">{{ event.venue }}</span>
          <span class="flyer-time-text">{{ event.time }}</span>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
/* ─── Base ─────────────────────────────────────────── */
.flyer {
  position: relative;
  aspect-ratio: 3 / 4;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: 10px;
  box-sizing: border-box;
}

.flyer-grain {
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  opacity: 0.15;
  mix-blend-mode: overlay;
  pointer-events: none;
  z-index: 1;
}

.flyer > *:not(.flyer-grain) {
  position: relative;
  z-index: 2;
}

/* ─── Category colors ───────────────────────────────── */
.flyer--film        { background: var(--flyer-film-bg);        color: var(--flyer-film-text); }
.flyer--music       { background: var(--flyer-music-bg);       color: var(--flyer-music-text); }
.flyer--lecture     { background: var(--flyer-lecture-bg);     color: var(--flyer-lecture-text); }
.flyer--exhibition  { background: var(--flyer-exhibition-bg);  color: var(--flyer-exhibition-text); }
.flyer--performance { background: var(--flyer-performance-bg); color: var(--flyer-performance-text); }

/* ─── Archive mode ──────────────────────────────────── */
.flyer--archive {
  filter: grayscale(35%) sepia(12%) contrast(0.88) brightness(0.83);
}

/* ─── Shared typography ─────────────────────────────── */
.flyer-cat-label {
  font-family: var(--font-mono);
  font-size: 0.5625rem;
  font-weight: 400;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  opacity: 0.55;
}

.flyer-index-num {
  font-family: var(--font-mono);
  font-size: 0.5625rem;
  opacity: 0.25;
  letter-spacing: 0.08em;
}

.flyer-venue-text,
.flyer-date-text,
.flyer-time-text,
.flyer-doors-text {
  font-family: var(--font-mono);
  font-size: 0.5625rem;
  letter-spacing: 0.05em;
  opacity: 0.65;
}

.flyer-subtitle {
  font-family: var(--font-mono);
  font-size: 0.5625rem;
  letter-spacing: 0.03em;
  opacity: 0.5;
  margin-top: 5px;
  line-height: 1.4;
}

/* ─── Display titles ────────────────────────────────── */
.flyer-title {
  font-family: var(--font-display);
  line-height: 1.0;
  letter-spacing: -0.01em;
}

.flyer-title--xl {
  font-size: clamp(1.5rem, 6vw, 2.5rem);
  font-weight: 700;
  line-height: 1.05;
}

.flyer-title--hero {
  font-size: clamp(1.75rem, 7.5vw, 3.25rem);
  font-weight: 700;
  line-height: 0.95;
  letter-spacing: -0.02em;
}

.flyer-title--inst {
  font-size: clamp(1.1rem, 4.5vw, 2rem);
  font-weight: 600;
  line-height: 1.1;
}

.flyer-title--grid {
  font-size: clamp(1rem, 4vw, 1.75rem);
  font-weight: 700;
  line-height: 1.05;
}

/* ─── Layout helpers ────────────────────────────────── */
.flyer-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.flyer-rule {
  border: none;
  border-top: 1px solid currentColor;
  opacity: 0.2;
  width: 100%;
}

/* ─── Variant 0: Screenprint ────────────────────────── */
.flyer--v0 {
  justify-content: space-between;
}

.flyer--v0 .flyer-top {
  margin-bottom: 4px;
}

.flyer--v0 .flyer-v0-body {
  flex: 1;
  display: flex;
  align-items: center;
  padding: 6px 0;
}

.flyer--v0 .flyer-bottom-rule {
  border-top: 1px solid currentColor;
  opacity: 0.2;
  margin-bottom: 6px;
}

.flyer--v0 .flyer-bottom-row {
  align-items: flex-end;
}

/* ─── Variant 1: Rave flyer ─────────────────────────── */
.flyer--v1 {
  justify-content: space-between;
}

.flyer--v1 .flyer-top-rule {
  border-top: 1px solid currentColor;
  opacity: 0.25;
  width: 100%;
  margin-bottom: 5px;
}

.flyer--v1 .flyer-v1-header {
  align-items: center;
  margin-bottom: 0;
}

.flyer--v1 .flyer-v1-hero {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 8px 0;
}

.flyer--v1 .flyer-v1-data {
  margin-top: 5px;
  gap: 8px;
  align-items: flex-end;
}

/* ─── Variant 2: Institutional / Xerox ─────────────── */
.flyer--v2 {
  justify-content: space-between;
}

.flyer--v2 .flyer-v2-header {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.flyer--v2 .flyer-venue-text--inst {
  font-size: 0.625rem;
  font-weight: 400;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  opacity: 0.8;
}

.flyer--v2 .flyer-v2-rule {
  border-top: 2px solid currentColor;
  opacity: 0.7;
  width: 100%;
}

.flyer--v2 .flyer-v2-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
  padding: 8px 0;
}

.flyer--v2 .flyer-subtitle--inst {
  font-size: 0.5rem;
  line-height: 1.5;
}

.flyer--v2 .flyer-v2-footer {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

/* ─── Variant 3: Data grid ──────────────────────────── */
.flyer--v3 {
  justify-content: space-between;
}

.flyer-bg-index {
  position: absolute;
  bottom: -12px;
  right: -6px;
  font-family: var(--font-display);
  font-size: 6.5rem;
  font-weight: 700;
  opacity: 0.07;
  line-height: 1;
  pointer-events: none;
  z-index: 0;
  letter-spacing: -0.04em;
}

.flyer--v3 .flyer-v3-top {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.flyer--v3 .flyer-v3-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
  padding: 6px 0;
}

.flyer--v3 .flyer-v3-bottom {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

/* ─── Sizes ─────────────────────────────────────────── */
.flyer--sm {
  padding: 6px;
}

.flyer--sm .flyer-title--xl,
.flyer--sm .flyer-title--hero,
.flyer--sm .flyer-title--inst,
.flyer--sm .flyer-title--grid {
  font-size: 0.75rem;
  line-height: 1.1;
}

.flyer--sm .flyer-cat-label,
.flyer--sm .flyer-venue-text,
.flyer--sm .flyer-date-text,
.flyer--sm .flyer-time-text,
.flyer--sm .flyer-doors-text,
.flyer--sm .flyer-subtitle,
.flyer--sm .flyer-index-num {
  font-size: 0.4375rem;
}

.flyer--sm .flyer-bg-index {
  font-size: 3.5rem;
}

.flyer--lg .flyer-title--xl   { font-size: clamp(2rem, 4.5vw, 3.5rem); }
.flyer--lg .flyer-title--hero { font-size: clamp(2.5rem, 6vw, 4.5rem); }
.flyer--lg .flyer-title--inst { font-size: clamp(1.5rem, 3.5vw, 2.75rem); }
.flyer--lg .flyer-title--grid { font-size: clamp(1.5rem, 3.5vw, 2.5rem); }
</style>
