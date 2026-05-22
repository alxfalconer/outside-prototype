<script setup lang="ts">
import type { OutsideEvent } from '~/composables/useEvents'
import { formatDate } from '~/utils/format'

defineProps<{ event: OutsideEvent }>()
</script>

<template>
  <dl class="meta">
    <div class="meta-row">
      <dt class="label">Date</dt>
      <dd class="mono">{{ formatDate(event.date) }}</dd>
    </div>
    <div class="meta-row">
      <dt class="label">Time</dt>
      <dd class="mono">{{ event.time }}{{ event.doorsTime ? ` (Doors ${event.doorsTime})` : '' }}</dd>
    </div>
    <div class="meta-row">
      <dt class="label">Venue</dt>
      <dd class="mono">{{ event.venue }}</dd>
    </div>
    <div class="meta-row">
      <dt class="label">City</dt>
      <dd class="mono">{{ event.city }}</dd>
    </div>
    <div class="meta-row">
      <dt class="label">Price</dt>
      <dd class="mono">{{ event.price }}</dd>
    </div>
  </dl>
</template>

<style scoped>
.meta {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.meta-row {
  display: flex;
  align-items: baseline;
  gap: var(--space-3);
}

dt {
  min-width: 56px;
  flex-shrink: 0;
}

dd {
  color: var(--color-text);
}
</style>
