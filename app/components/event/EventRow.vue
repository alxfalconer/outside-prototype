<script setup lang="ts">
import type { OutsideEvent } from '~/composables/useEvents'
import { formatDateShort } from '~/utils/format'

const props = defineProps<{ event: OutsideEvent }>()

const { hasPass, collectPass } = usePasses()

const isExpanded = ref(false)
const isSaved = ref(false)
const isReminded = ref(false)
const purchaseState = ref<'idle' | 'processing' | 'done'>('idle')

const isAttending = computed(() => hasPass(props.event.id))

function toggle() {
  isExpanded.value = !isExpanded.value
}

async function handlePurchase() {
  if (isAttending.value || purchaseState.value !== 'idle') return
  purchaseState.value = 'processing'
  await new Promise(r => setTimeout(r, 800))
  collectPass(props.event)
  purchaseState.value = 'done'
}

const purchaseLabel = computed(() => {
  if (isAttending.value || purchaseState.value === 'done') return 'ATTENDING'
  if (purchaseState.value === 'processing') return 'PROCESSING…'
  return 'PURCHASE'
})
</script>

<template>
  <div class="row-wrap" :class="{ expanded: isExpanded, attending: isAttending }">

    <!-- Collapsed row — always visible -->
    <button class="row" @click="toggle" :aria-expanded="isExpanded">
      <span class="row-index mono">{{ String(event.index).padStart(3, '0') }}</span>
      <span class="row-category label">{{ event.category }}</span>
      <span class="row-title">{{ event.title }}</span>
      <span class="row-venue mono">{{ event.venue }}</span>
      <span class="row-date mono">{{ formatDateShort(event.date) }}</span>
      <span class="row-price mono">{{ event.price }}</span>
      <span class="row-toggle" aria-hidden="true">{{ isExpanded ? '−' : '+' }}</span>
    </button>

    <!-- Expandable card — CSS grid animation, no JS height measurement -->
    <div class="card-shell" :class="{ open: isExpanded }">
      <div class="card-inner">
        <div class="card">
          <div class="card-flyer">
            <EventFlyer :event="event" />
          </div>
          <div class="card-body">
            <div class="card-header">
              <span class="label">{{ event.category }}</span>
              <NuxtLink :to="`/event/${event.slug}`" class="card-detail-link mono" @click.stop>
                Full details →
              </NuxtLink>
            </div>
            <h2 class="card-title">{{ event.title }}</h2>
            <p v-if="event.subtitle" class="card-subtitle mono">{{ event.subtitle }}</p>
            <div class="card-meta-strip mono">
              <span>{{ formatDateShort(event.date) }}</span>
              <span class="strip-dot" aria-hidden="true">·</span>
              <span>{{ event.time }}</span>
              <template v-if="event.doorsTime">
                <span class="strip-dot" aria-hidden="true">·</span>
                <span class="strip-secondary">Doors {{ event.doorsTime }}</span>
              </template>
              <span class="strip-dot" aria-hidden="true">·</span>
              <span>{{ event.venue }}</span>
              <span class="strip-dot" aria-hidden="true">·</span>
              <span>{{ event.city }}</span>
              <span class="strip-dot strip-dot--price" aria-hidden="true">·</span>
              <span class="strip-price">{{ event.price }}</span>
            </div>
            <p class="card-description">{{ event.description }}</p>
            <div class="card-actions">
              <button
                class="action action--primary"
                :class="{ attending: isAttending || purchaseState === 'done', processing: purchaseState === 'processing' }"
                :disabled="isAttending || purchaseState !== 'idle'"
                @click.stop="handlePurchase"
              >
                {{ purchaseLabel }}
              </button>
              <button
                class="action"
                :class="{ active: isSaved }"
                @click.stop="isSaved = !isSaved"
              >
                {{ isSaved ? 'SAVED' : 'SAVE' }}
              </button>
              <button
                class="action"
                :class="{ active: isReminded }"
                @click.stop="isReminded = !isReminded"
              >
                {{ isReminded ? 'REMINDED' : 'REMIND ME' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
/* ─── Row wrap ──────────────────────────────────────── */
.row-wrap {
  border-top: 1px solid var(--color-border);
  transition: border-color var(--transition-subtle);
}

.row-wrap:last-child {
  border-bottom: 1px solid var(--color-border);
}

.row-wrap.attending .row-index {
  color: var(--color-accent);
}

/* ─── Collapsed row ─────────────────────────────────── */
.row {
  display: grid;
  grid-template-columns: 40px 80px 1fr 160px 72px 48px 20px;
  align-items: center;
  gap: var(--space-2);
  width: 100%;
  padding: 11px 0;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  transition: background var(--transition-subtle);
}

.row:hover {
  background: transparent;
}

.row:hover .row-title {
  color: var(--color-text);
}

.row-index {
  color: var(--color-text-secondary);
  font-size: var(--text-label);
}

.row-category {
  text-align: left;
}

.row-title {
  font-size: var(--text-body);
  font-weight: 400;
  color: var(--color-text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: color var(--transition-subtle);
}

.row-venue,
.row-date,
.row-price {
  color: var(--color-text-secondary);
  font-size: var(--text-label);
  letter-spacing: 0.04em;
  text-align: left;
}

.row-toggle {
  font-family: var(--font-mono);
  font-size: var(--text-meta);
  color: var(--color-text-secondary);
  text-align: right;
}

/* ─── Expand animation — CSS grid trick ─────────────── */
.card-shell {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows var(--transition-expand);
}

.card-shell.open {
  grid-template-rows: 1fr;
}

.card-inner {
  overflow: hidden;
}

/* ─── Expanded card ─────────────────────────────────── */
.card {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: var(--space-4);
  padding: var(--space-4) 0 var(--space-5);
  border-top: 1px solid var(--color-border);
}

.card-flyer {
  width: 200px;
  flex-shrink: 0;
}

.card-body {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.card-detail-link {
  color: var(--color-text-secondary);
  font-size: var(--text-label);
  letter-spacing: var(--tracking-label);
  text-transform: uppercase;
  transition: color var(--transition-subtle);
}

.card-detail-link:hover {
  color: var(--color-text);
}

.card-title {
  font-family: var(--font-display);
  font-size: 1.625rem;
  font-weight: 700;
  line-height: 1.05;
  letter-spacing: -0.01em;
}

.card-subtitle {
  color: var(--color-text-secondary);
}

.card-meta-strip {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 5px;
  font-size: var(--text-label);
  color: var(--color-text-secondary);
  letter-spacing: 0.03em;
  line-height: 1.8;
}

.strip-dot {
  color: var(--color-text-secondary);
  opacity: 0.4;
  font-size: 0.5rem;
  align-self: center;
}

.strip-dot--price {
  opacity: 0.55;
}

.strip-secondary {
  opacity: 0.7;
}

.strip-price {
  color: var(--color-text);
}

.card-description {
  font-size: var(--text-body);
  color: var(--color-text-secondary);
  line-height: 1.7;
  max-width: 52ch;
}

/* ─── Actions ───────────────────────────────────────── */
.card-actions {
  display: flex;
  gap: var(--space-3);
  margin-top: var(--space-1);
  align-items: center;
}

.action {
  font-family: var(--font-mono);
  font-size: var(--text-label);
  font-weight: 500;
  letter-spacing: var(--tracking-label);
  text-transform: uppercase;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  color: var(--color-text-secondary);
  transition: color var(--transition-subtle);
}

.action--primary {
  border: 1px solid var(--color-border);
  padding: 6px 12px;
}

.action:hover:not(:disabled) {
  color: var(--color-text);
}

.action--primary:hover:not(:disabled) {
  border-color: var(--color-text-secondary);
  color: var(--color-text);
}

.action.attending,
.action.active {
  color: var(--color-accent);
  border-color: var(--color-accent);
}

.action:disabled {
  cursor: default;
}

/* ─── Responsive ────────────────────────────────────── */
@media (max-width: 768px) {
  .row {
    grid-template-columns: 32px 64px 1fr 48px 20px;
  }

  .row-venue,
  .row-price {
    display: none;
  }

  .card {
    grid-template-columns: 1fr;
  }

  .card-flyer {
    width: 100%;
    max-width: 240px;
  }
}
</style>
