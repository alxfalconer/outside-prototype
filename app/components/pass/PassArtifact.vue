<script setup lang="ts">
import type { Pass } from '~/composables/usePasses'
import { formatDate, formatTimestamp } from '~/utils/format'
import { useEvents } from '~/composables/useEvents'

const props = defineProps<{ pass: Pass; archiveMode?: boolean }>()

const { getEventById } = useEvents()
const event = computed(() => getEventById(props.pass.eventId))
</script>

<template>
  <article class="pass" :class="[`pass--${pass.category}`, { 'pass--archive': archiveMode }]">
    <!-- Left: ticket stub edge + flyer -->
    <div class="pass-left">
      <div class="pass-stub-label label">{{ pass.category }}</div>
      <div v-if="event" class="pass-flyer">
        <EventFlyer :event="event" :archiveMode="props.archiveMode ?? true" size="sm" />
      </div>
    </div>

    <!-- Right: pass information -->
    <div class="pass-info">
      <div class="pass-header">
        <span class="label pass-issuer-label">Outside</span>
        <span class="pass-number mono">{{ pass.passNumber }}</span>
      </div>

      <div class="pass-title-block">
        <h3 class="pass-title">{{ pass.eventTitle }}</h3>
        <p v-if="pass.eventSubtitle" class="pass-subtitle mono">{{ pass.eventSubtitle }}</p>
      </div>

      <div class="pass-meta">
        <div class="pass-meta-row">
          <span class="mono">{{ pass.venue }}</span>
          <span class="mono">{{ formatDate(pass.date) }}</span>
        </div>
        <div class="pass-meta-row">
          <span class="mono">{{ pass.city }}</span>
          <span class="mono">{{ pass.time }}</span>
        </div>
      </div>

      <div class="pass-footer">
        <span class="pass-collected mono">Collected {{ formatTimestamp(pass.collectedAt) }}</span>
      </div>
    </div>
  </article>
</template>

<style scoped>
.pass {
  display: grid;
  grid-template-columns: 72px 1fr;
  gap: 0;
  background: var(--color-surface-raised);
  border: 1px solid var(--color-border);
  border-left: 6px solid var(--color-accent);
  overflow: hidden;
  transition: border-color var(--transition-subtle);
}

.pass:hover {
  border-color: var(--color-text-secondary);
  border-left-color: var(--color-accent);
}

/* ─── Archive / past state ──────────────────────────── */
.pass--archive {
  border-left-color: var(--color-past);
}

.pass--archive:hover {
  border-left-color: var(--color-past);
}

.pass--archive .pass-number {
  color: var(--color-past);
}

/* ─── Left stub ─────────────────────────────────────── */
.pass-left {
  display: flex;
  flex-direction: column;
  border-right: 1px solid var(--color-border);
  overflow: hidden;
}

.pass-stub-label {
  padding: 8px 6px 6px;
  color: var(--color-text-secondary);
  opacity: 0.5;
  writing-mode: vertical-lr;
  transform: rotate(180deg);
  align-self: flex-end;
  font-size: 0.5rem;
  letter-spacing: 0.14em;
}

.pass-flyer {
  flex: 1;
}

/* ─── Right info ────────────────────────────────────── */
.pass-info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: var(--space-1);
  padding: 10px 12px;
  min-height: 0;
}

.pass-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.pass-issuer-label {
  color: var(--color-text-secondary);
  opacity: 0.5;
}

.pass-number {
  font-size: var(--text-label);
  color: var(--color-accent);
  letter-spacing: 0.06em;
  font-weight: 700;
}

.pass-title-block {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.pass-title {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1.0;
  letter-spacing: -0.01em;
  color: var(--color-text);
}

.pass-subtitle {
  color: var(--color-text-secondary);
  font-size: 0.6875rem;
  line-height: 1.4;
}

.pass-meta {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.pass-meta-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.pass-meta-row .mono {
  font-size: var(--text-label);
  color: var(--color-text-secondary);
  letter-spacing: 0.03em;
}

.pass-footer {
  padding-top: 6px;
  border-top: 1px solid var(--color-border);
}

.pass-collected {
  font-size: 0.5625rem;
  color: var(--color-text-secondary);
  opacity: 0.45;
  letter-spacing: 0.03em;
}

@media (max-width: 480px) {
  .pass {
    grid-template-columns: 56px 1fr;
  }

  .pass-title {
    font-size: 1.25rem;
  }
}
</style>
