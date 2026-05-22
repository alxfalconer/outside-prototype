<script setup lang="ts">
import type { OutsideEvent } from '~/composables/useEvents'

const props = defineProps<{ event: OutsideEvent }>()

const { hasPass, collectPass, getPass } = usePasses()

const status = ref<'idle' | 'processing' | 'complete'>('idle')
const newPass = ref<ReturnType<typeof getPass>>(undefined)

const isAttending = computed(() => hasPass(props.event.id))
const existingPass = computed(() => getPass(props.event.id))

const cycleChars = ['—', '/', '—', '\\']
let charIndex = 0
const cycleChar = ref('—')
let cycleInterval: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  if (isAttending.value) status.value = 'complete'
})

onUnmounted(() => {
  if (cycleInterval) clearInterval(cycleInterval)
})

async function handleCollect() {
  if (status.value !== 'idle' || isAttending.value) return

  status.value = 'processing'
  charIndex = 0
  cycleInterval = setInterval(() => {
    charIndex = (charIndex + 1) % cycleChars.length
    cycleChar.value = cycleChars[charIndex]
  }, 420)

  await new Promise(r => setTimeout(r, 1600))

  if (cycleInterval) { clearInterval(cycleInterval); cycleInterval = null }

  newPass.value = collectPass(props.event)
  status.value = 'complete'
}
</script>

<template>
  <div class="collect">
    <!-- Idle / processing -->
    <div v-if="status !== 'complete'" class="collect-action">
      <button
        class="collect-btn"
        :class="{ processing: status === 'processing' }"
        :disabled="status === 'processing'"
        @click="handleCollect"
      >
        <span v-if="status === 'idle'">PURCHASE TICKET</span>
        <span v-else class="processing-text">
          PROCESSING <span class="cycle-char mono">{{ cycleChar }}</span>
        </span>
      </button>
      <p class="collect-hint mono">No payment required in prototype</p>
    </div>

    <!-- Complete: show pass artifact -->
    <Transition name="pass-reveal">
      <div v-if="status === 'complete'" class="collect-complete">
        <div class="collect-status">
          <span class="label attending-label">Attending</span>
          <NuxtLink :to="`/profile`" class="mono archive-link">View archive →</NuxtLink>
        </div>
        <PassArtifact v-if="existingPass || newPass" :pass="(existingPass || newPass)!" />
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.collect {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.collect-action {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.collect-btn {
  font-family: var(--font-mono);
  font-size: var(--text-label);
  font-weight: 500;
  letter-spacing: var(--tracking-label);
  text-transform: uppercase;
  color: var(--color-text);
  background: none;
  border: 1px solid var(--color-text-secondary);
  padding: 10px 20px;
  cursor: pointer;
  transition: border-color var(--transition-subtle), color var(--transition-subtle);
  align-self: flex-start;
}

.collect-btn:hover:not(:disabled) {
  border-color: var(--color-text);
}

.collect-btn.processing {
  color: var(--color-text-secondary);
  cursor: default;
}

.processing-text {
  display: flex;
  align-items: center;
  gap: 8px;
}

.cycle-char {
  display: inline-block;
  width: 1ch;
  color: var(--color-text-secondary);
}

.collect-hint {
  font-size: var(--text-label);
  color: var(--color-text-secondary);
  opacity: 0.4;
  letter-spacing: 0.04em;
}

/* Complete state */
.collect-complete {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.collect-status {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.attending-label {
  color: var(--color-accent);
}

.archive-link {
  font-size: var(--text-label);
  color: var(--color-text-secondary);
  letter-spacing: var(--tracking-label);
  text-transform: uppercase;
  transition: color var(--transition-subtle);
}

.archive-link:hover {
  color: var(--color-text);
}

/* Pass reveal — snaps in with slight spring overshoot */
.pass-reveal-enter-active {
  transition: opacity 280ms ease-out, transform 400ms var(--ease-spring);
}

.pass-reveal-enter-from {
  opacity: 0;
  transform: translateY(16px) scale(0.97);
}
</style>
