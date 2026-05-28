<script setup lang="ts">
import type { FieldNodeState, FieldEdge, TimeFilter, Scene } from '~/utils/fieldData'
import { demoGalleryItems } from '~/utils/gallery'

// ─── Constants ────────────────────────────────────────
const BENTO_IMGS = demoGalleryItems.map(item => item.src)

// Each bento photo linked to a field venue
const BENTO_VENUES: string[] = [
  'metrograph',       // 00-3.jpg         — film screening
  'bam',              // wrestling show   — live performance
  'kitchen',          // large installation — contemporary art
  'knockdown',        // house show       — club/music
  'output',           // iceage live      — live music
  'drawing-center',   // microscope gallery — gallery
  'pioneer-works',    // nam june paik    — interdisciplinary
  'new-school',       // curtain call     — performance/lecture
]

const FILTERS: { value: TimeFilter; label: string }[] = [
  { value: 'all', label: 'All Time' },
  { value: '6m',  label: 'Last 6 Months' },
  { value: '1m',  label: 'This Month' },
]

interface ClusterLabel { text: string; x: number; y: number; scenes: Scene[] }

const CLUSTER_LABELS: Record<TimeFilter, ClusterLabel[]> = {
  all: [
    { text: 'EXPERIMENTAL FILM',  x: 248, y: 108, scenes: ['film'] },
    { text: 'CLUB / LIVE',         x: 656, y: 100, scenes: ['music'] },
    { text: 'CONTEMPORARY ART',   x: 428, y:  40, scenes: ['art'] },
    { text: 'CRITICAL DISCOURSE', x: 148, y: 266, scenes: ['lecture', 'performance'] },
  ],
  '6m': [
    { text: 'EXPERIMENTAL FILM',  x: 250, y: 108, scenes: ['film'] },
    { text: 'CLUB / LIVE',         x: 660, y: 100, scenes: ['music'] },
    { text: 'CONTEMPORARY ART',   x: 426, y:  40, scenes: ['art'] },
  ],
  '1m': [],
}

// Institutional character per venue (used to generate tendency language)
const INSTITUTIONAL: Record<string, boolean> = {
  'metrograph':       false,
  'anthology':        true,
  'knockdown':        false,
  'output':           false,
  'national-sawdust': true,
  'kitchen':          true,
  'drawing-center':   true,
  'pioneer-works':    true,
  'new-school':       true,
  'bam':              true,
}

function scenePhrase(scene: Scene, institutional: boolean): string {
  if (scene === 'film')        return institutional ? 'archival cinema'           : 'independent film'
  if (scene === 'music')       return institutional ? 'contemporary music'        : 'experimental music'
  if (scene === 'art')         return institutional ? 'contemporary art'          : 'artist-run spaces'
  if (scene === 'lecture')     return institutional ? 'institutional programming' : 'independent discourse'
  if (scene === 'performance') return institutional ? 'choreography & performance': 'experimental performance'
  return scene
}

const SUGGESTED_ADJACENCY: Record<string, string> = {
  'Omnivorous':           'live cinema · sound art · media theory',
  'Archivist':            'film preservation · cinema history · moving image art',
  'Cross-Disciplinary':   'interdisciplinary festivals · artist residencies · hybrid performance',
  'Dense Orbit':          'artist talks · venue membership · recurring series',
  'Institutional Drift':  'alternative spaces · nonprofit programming · artist-run venues',
  'Scene Migratory':      'touring productions · pop-up performance · temporary exhibitions',
  'Peripheral':           'opening nights · emerging venues · off-programme events',
  'Emerging Participant': 'recurring series · local institutions · venue membership',
  'Ritualistic':          'touring acts · seasonal programming · late-night events',
  'Exploratory':          'multi-venue programming · new spaces · city-wide series',
}

const SVG_H   = 320
const SCALE_Y = SVG_H / 380

// ─── State ────────────────────────────────────────────
const containerRef   = ref<HTMLDivElement | null>(null)
const containerWidth = ref(800)
const timeFilter     = ref<TimeFilter>('all')
const displayedNodes = ref<FieldNodeState[]>([])
const displayedEdges = ref<FieldEdge[]>([])
const visible        = ref(false)
const enterPhase     = ref<'hidden' | 'entering' | 'done'>('hidden')
const hoveredId      = ref<string | null>(null)
const selectedId     = ref<string | null>(null)

// ─── Derived ──────────────────────────────────────────
const scaleX = computed(() => containerWidth.value / 800)

const scaledNodes = computed(() =>
  displayedNodes.value.map(n => ({ ...n, sx: n.x * scaleX.value, sy: n.y * SCALE_Y }))
)

const sliderThumbLeft = computed(() => {
  const idx = FILTERS.findIndex(f => f.value === timeFilter.value)
  return `${(idx / (FILTERS.length - 1)) * 100}%`
})

const nodeMap = computed(() => new Map(scaledNodes.value.map(n => [n.id, n])))

const activeId = computed(() => hoveredId.value ?? selectedId.value)

const connectedIds = computed((): Set<string> => {
  const id = activeId.value
  if (!id) return new Set()
  const ids = new Set<string>()
  for (const e of displayedEdges.value) {
    if (e.source === id) ids.add(e.target)
    if (e.target === id) ids.add(e.source)
  }
  return ids
})

const bridgeNodeIds = computed((): Set<string> => {
  const ids = new Set<string>()
  for (const e of displayedEdges.value) {
    if (e.bridge) { ids.add(e.source); ids.add(e.target) }
  }
  return ids
})

const activeClusterLabels = computed(() => CLUSTER_LABELS[timeFilter.value] ?? [])

// ─── Node sizing ──────────────────────────────────────
function nodeW(n: FieldNodeState) {
  return n.weight > 1 ? 14 : bridgeNodeIds.value.has(n.id) ? 8 : 6
}
function nodeH(n: FieldNodeState) {
  return n.weight > 1 ? 8 : bridgeNodeIds.value.has(n.id) ? 5 : 4
}

function baseTierOpacity(n: FieldNodeState): number {
  if (n.weight > 1) return 0.85
  return bridgeNodeIds.value.has(n.id) ? 0.62 : 0.42
}

function nodeOpacity(n: FieldNodeState): number {
  const base = baseTierOpacity(n)
  if (!activeId.value) return base
  if (activeId.value === n.id) return 1
  if (connectedIds.value.has(n.id)) return Math.max(base, 0.6)
  return 0.08
}

function edgeBaseOpacity(e: FieldEdge): number {
  if (activeId.value) {
    return (e.source === activeId.value || e.target === activeId.value) ? 0.55 : 0.02
  }
  return e.bridge ? 0.1 : e.strength * 0.2
}

function clusterLabelOpacity(cl: ClusterLabel): number {
  const isRelevant = activeId.value
    ? scaledNodes.value.some(n => n.id === activeId.value && cl.scenes.includes(n.scene))
    : false
  return isRelevant ? 0.2 : 0.045
}

// ─── Animated styles ──────────────────────────────────
function nodeStyle(n: FieldNodeState, idx: number): Record<string, string | number> {
  if (enterPhase.value === 'hidden') return { opacity: 0 }
  if (enterPhase.value === 'entering') {
    const d = n.weight > 1 ? 60 : bridgeNodeIds.value.has(n.id) ? 200 : 330 + idx * 28
    return { opacity: baseTierOpacity(n), transition: `opacity 520ms ease ${d}ms` }
  }
  return { opacity: nodeOpacity(n), transition: 'opacity 160ms ease' }
}

function edgeStyle(e: FieldEdge): Record<string, string | number> {
  if (enterPhase.value === 'hidden') return { opacity: 0 }
  if (enterPhase.value === 'entering') {
    const d = e.bridge ? 520 : 400
    return { opacity: edgeBaseOpacity(e), transition: `opacity 500ms ease ${d}ms` }
  }
  return { opacity: edgeBaseOpacity(e), transition: 'opacity 180ms ease' }
}

function clusterStyle(cl: ClusterLabel): Record<string, string | number> {
  if (enterPhase.value === 'hidden') return { opacity: 0 }
  if (enterPhase.value === 'entering') {
    return { opacity: clusterLabelOpacity(cl), transition: 'opacity 600ms ease 580ms' }
  }
  return { opacity: clusterLabelOpacity(cl), transition: 'opacity 250ms ease' }
}

function labelOpacity(n: FieldNodeState): number {
  if (n.weight > 1) {
    if (!activeId.value) return 0.5
    if (activeId.value === n.id) return 0.9
    if (connectedIds.value.has(n.id)) return 0.75
    return 0.05
  }
  return (activeId.value === n.id || selectedId.value === n.id) ? 0.9 : 0
}

// ─── Bridge labels ────────────────────────────────────
function nodePos(id: string, axis: 'x' | 'y'): number {
  const n = nodeMap.value.get(id)
  return n ? (axis === 'x' ? n.sx : n.sy) : 0
}

function getBridgeLabel(e: FieldEdge): string {
  const src = displayedNodes.value.find(n => n.id === e.source)
  const tgt = displayedNodes.value.find(n => n.id === e.target)
  return src && tgt ? `${src.scene}  ↔  ${tgt.scene}` : ''
}

function bridgeLabelOpacity(e: FieldEdge): number {
  if (!activeId.value) return 0
  return (activeId.value === e.source || activeId.value === e.target) ? 0.5 : 0
}

// ─── Stats ────────────────────────────────────────────
const fieldStats = computed(() => ({
  venues: displayedNodes.value.length,
  events: displayedNodes.value.reduce((s, n) => s + n.weight, 0),
  scenes: new Set(displayedNodes.value.map(n => n.scene)).size,
}))

// ─── Cultural tendency ────────────────────────────────
const fieldTendency = computed(() => {
  const nodes = displayedNodes.value
  const edges = displayedEdges.value
  const filter = timeFilter.value

  if (!nodes.length) {
    return {
      code: 'Emerging Participant',
      paragraph: 'Your attendance history is still forming. Check back as your field develops.',
      recentTendency: null,
      suggestedAdjacency: SUGGESTED_ADJACENCY['Emerging Participant'],
    }
  }

  const bridges      = edges.filter(e => e.bridge)
  const scenes       = [...new Set(nodes.map(n => n.scene))] as Scene[]
  const sceneCount   = scenes.length
  const counts: Record<string, number> = {}
  for (const n of nodes) counts[n.scene] = (counts[n.scene] ?? 0) + n.weight
  const sorted       = Object.entries(counts).sort((a, b) => b[1] - a[1])
  const topScene     = sorted[0]?.[0] as Scene | undefined
  const topWeight    = sorted[0]?.[1] ?? 0
  const totalWeight  = nodes.reduce((s, n) => s + n.weight, 0)
  const dominance    = totalWeight > 0 ? topWeight / totalWeight : 0
  const anchors      = nodes.filter(n => n.weight > 1)
  const instCount    = nodes.filter(n => INSTITUTIONAL[n.id]).length
  const instRatio    = nodes.length > 0 ? instCount / nodes.length : 0

  // Recent tendency: top 2 scenes expressed as curator phrases
  const topTwo = sorted.slice(0, 2).map(([scene]) => {
    const sceneNodes  = nodes.filter(n => n.scene === scene)
    const sceneInst   = sceneNodes.filter(n => INSTITUTIONAL[n.id]).length / sceneNodes.length
    return scenePhrase(scene as Scene, sceneInst > 0.5)
  })
  const recentTendency = topTwo.join(' · ')

  let code: string
  let paragraph: string

  if (bridges.length >= 2 && sceneCount >= 4) {
    code = 'Omnivorous'
    paragraph = `You move fluidly between ${scenes.slice(0, 3).join(', ')}, and other environments instead of settling into a single scene.`
  } else if (bridges.length >= 2 && sceneCount === 3) {
    code = 'Cross-Disciplinary'
    paragraph = `Your attendance consistently crosses between ${scenes.join(', ')} — environments that rarely share an audience.`
  } else if (topScene === 'film' && dominance >= 0.4 && anchors.some(n => n.scene === 'film')) {
    code = 'Archivist'
    paragraph = `Your attendance gravitates toward cinematic and archival spaces, returning to the same venues rather than sampling widely.`
  } else if (dominance >= 0.65 && anchors.length >= 2) {
    code = 'Dense Orbit'
    paragraph = `Your attendance concentrates tightly around ${topScene} — returning to the same venues regularly rather than expanding outward.`
  } else if (instRatio <= 0.3 && totalWeight >= 3) {
    code = 'Peripheral'
    paragraph = `Your attendance skews toward smaller, independent spaces rather than established institutional venues.`
  } else if (instRatio >= 0.8 && totalWeight >= 4) {
    code = 'Institutional Drift'
    paragraph = `Your attendance has concentrated in established cultural institutions with serious programming ambition.`
  } else if (filter === '1m' || nodes.length <= 2) {
    const upcoming = nodes.filter(n => n.upcomingCount > 0)
    code = 'Emerging Participant'
    paragraph = upcoming.length > 0
      ? `Coming up: ${upcoming.map(n => n.name).join(' and ')}. The field is quiet, but forming.`
      : `Sparse activity this period — between cycles, or the field is just starting to form.`
  } else if (bridges.length === 1) {
    code = 'Scene Migratory'
    const src = nodes.find(n => n.id === bridges[0]!.source)
    const tgt = nodes.find(n => n.id === bridges[0]!.target)
    paragraph = `Your attendance occupies an edge position between ${src?.scene ?? 'two'} and ${tgt?.scene ?? 'different'} environments — not fully embedded in either.`
  } else {
    code = 'Exploratory'
    paragraph = `Your attendance is distributed without a dominant anchor across ${sceneCount} scenes.`
  }

  return {
    code,
    paragraph,
    recentTendency,
    suggestedAdjacency: SUGGESTED_ADJACENCY[code] ?? null,
  }
})

// ─── Filter ───────────────────────────────────────────
async function setFilter(f: TimeFilter) {
  if (f === timeFilter.value) return
  visible.value = false
  await new Promise(r => setTimeout(r, 220))
  timeFilter.value = f
  updateField()
  await nextTick()
  visible.value = true
}

function updateField() {
  const nodes = getFilteredNodes(timeFilter.value)
  displayedNodes.value = nodes
  displayedEdges.value = getFilteredEdges(new Set(nodes.map(n => n.id)))
}

function handleClick(id: string) {
  selectedId.value = selectedId.value === id ? null : id
}

function bentoEnter(i: number) {
  const id = BENTO_VENUES[i]
  if (id && displayedNodes.value.some(n => n.id === id)) hoveredId.value = id
}

function bentoLeave() {
  hoveredId.value = null
}

onMounted(() => {
  if (containerRef.value) containerWidth.value = containerRef.value.clientWidth || 800
  updateField()

  const ro = new ResizeObserver(([e]) => { if (e) containerWidth.value = e.contentRect.width })
  if (containerRef.value) ro.observe(containerRef.value)
  onUnmounted(() => ro.disconnect())

  requestAnimationFrame(() => {
    visible.value = true
    enterPhase.value = 'entering'
    setTimeout(() => { enterPhase.value = 'done' }, 1100)
  })
})
</script>

<template>
  <div class="cultural-field">
    <div ref="containerRef" class="field-module">

      <!-- Identity: left = emotional layer, right = supporting signal -->
      <div
        class="field-identity"
        :style="{ opacity: visible ? 1 : 0, transition: 'opacity 280ms ease' }"
      >
        <div class="identity-left">
          <p class="tendency-eyebrow">Current field tendency</p>
          <h2 class="tendency-code">{{ fieldTendency.code }}</h2>
          <p class="tendency-para">{{ fieldTendency.paragraph }}</p>
          <div v-if="fieldTendency.recentTendency" class="readout-row">
            <span class="readout-key">Recent tendency</span>
            <span class="readout-val">{{ fieldTendency.recentTendency }}</span>
          </div>
        </div>
        <div class="identity-right">
          <div class="image-bento">
            <img
              v-for="(src, i) in BENTO_IMGS"
              :key="i"
              :src="src"
              class="bento-img"
              :class="{ 'bento-img--active': hoveredId === BENTO_VENUES[i] }"
              alt=""
              draggable="false"
              @mouseenter="bentoEnter(i)"
              @mouseleave="bentoLeave"
            />
          </div>
        </div>
      </div>

      <div class="field-rule" />

      <!-- Supporting graph -->
      <svg
        :width="containerWidth"
        :height="SVG_H"
        :viewBox="`0 0 ${containerWidth} ${SVG_H}`"
        :style="{ opacity: visible ? 1 : 0, transition: 'opacity 260ms ease', display: 'block' }"
        aria-hidden="true"
      >
        <defs>
          <pattern id="field-dot-grid" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="12" cy="12" r="0.55" class="grid-dot" />
          </pattern>
          <radialGradient id="field-glow" cx="50%" cy="50%" r="50%" gradientUnits="objectBoundingBox">
            <stop offset="0%"   stop-color="#ffffff" stop-opacity="0.04" />
            <stop offset="65%"  stop-color="#ffffff" stop-opacity="0.01" />
            <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
          </radialGradient>
        </defs>

        <rect width="100%" height="100%" fill="url(#field-glow)" pointer-events="none" />
        <rect width="100%" height="100%" fill="url(#field-dot-grid)" pointer-events="none" />
        <rect class="scan-beam" x="0" y="0" width="2" :height="SVG_H" pointer-events="none" />

        <!-- Cluster labels -->
        <text
          v-for="cl in activeClusterLabels"
          :key="cl.text"
          :x="cl.x * scaleX"
          :y="cl.y * SCALE_Y"
          text-anchor="middle"
          class="cluster-label"
          :style="clusterStyle(cl)"
        >{{ cl.text }}</text>

        <!-- Edges -->
        <line
          v-for="e in displayedEdges"
          :key="`${e.source}-${e.target}`"
          :x1="nodePos(e.source, 'x')" :y1="nodePos(e.source, 'y')"
          :x2="nodePos(e.target, 'x')" :y2="nodePos(e.target, 'y')"
          class="field-edge"
          :class="{ bridge: e.bridge }"
          :style="edgeStyle(e)"
        />

        <!-- Bridge labels on hover -->
        <text
          v-for="e in displayedEdges.filter(edge => edge.bridge)"
          :key="`bl-${e.source}-${e.target}`"
          :x="(nodePos(e.source, 'x') + nodePos(e.target, 'x')) / 2"
          :y="(nodePos(e.source, 'y') + nodePos(e.target, 'y')) / 2 - 7"
          text-anchor="middle"
          class="bridge-label"
          :style="{ opacity: bridgeLabelOpacity(e), transition: 'opacity 150ms ease' }"
        >{{ getBridgeLabel(e) }}</text>

        <!-- Nodes -->
        <g
          v-for="(n, i) in scaledNodes"
          :key="n.id"
          :transform="`translate(${n.sx}, ${n.sy})`"
          class="field-node"
          :style="nodeStyle(n, i)"
          @mouseenter="hoveredId = n.id"
          @mouseleave="hoveredId = null"
          @click="handleClick(n.id)"
        >
          <rect x="-18" y="-14" width="36" height="28" class="node-hit" />
          <rect
            :x="-nodeW(n) / 2"
            :y="-nodeH(n) / 2"
            :width="nodeW(n)"
            :height="nodeH(n)"
            class="node-mark"
            :class="{
              anchor:           n.weight > 1,
              'bridge-adj':     n.weight === 1 && bridgeNodeIds.has(n.id),
              selected:         selectedId === n.id,
              'color-upcoming': n.upcomingCount > 0,
              'color-attended': n.upcomingCount === 0,
            }"
          />
          <text
            :x="n.x < 250 ? -(nodeW(n) / 2 + 7) : (nodeW(n) / 2 + 7)"
            y="1"
            dominant-baseline="central"
            :text-anchor="n.x < 250 ? 'end' : 'start'"
            class="node-label"
            :style="{
              opacity: labelOpacity(n),
              fill: activeId === n.id ? '#ffffff' : undefined,
              transition: 'opacity 150ms ease, fill 150ms ease',
            }"
          >{{ n.name }}</text>
        </g>
      </svg>

      <!-- Footer: filter + stats -->
      <div class="field-footer">
        <div class="time-slider">
          <div class="slider-track-row">
            <div
              v-for="(f, i) in FILTERS"
              :key="f.value"
              class="slider-tick"
              :style="{ left: `${(i / (FILTERS.length - 1)) * 100}%` }"
            />
            <div class="slider-rail" />
            <div class="slider-thumb" :style="{ left: sliderThumbLeft }" />
          </div>
          <div class="slider-labels">
            <button
              v-for="f in FILTERS"
              :key="f.value"
              class="slider-label"
              :class="{ active: timeFilter === f.value }"
              @click="setFilter(f.value)"
            >{{ f.label }}</button>
          </div>
        </div>
        <p class="field-stats">
          {{ fieldStats.venues }} venues
          <span class="stat-sep">·</span>
          {{ fieldStats.events }} events
          <span class="stat-sep">·</span>
          {{ fieldStats.scenes }} scenes
        </p>
      </div>

    </div>
  </div>
</template>

<style scoped>
.cultural-field {
  display: flex;
  flex-direction: column;
}

/* ─── Module shell ───────────────────────────────────── */
.field-module {
  --field-green:  #5cb82e;
  --field-orange: #c47c2e;
  background: #0c0c0c;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 2px;
  overflow: hidden;
}

.field-rule {
  height: 1px;
  background: rgba(255, 255, 255, 0.06);
}

/* ─── Identity layout ────────────────────────────────── */
.field-identity {
  display: flex;
  position: relative;
}

.identity-left {
  flex: 0 0 40%;
  padding: 48px 24px 48px 28px;
  display: flex;
  flex-direction: column;
}

.identity-right {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 40%;
  right: 0;
  overflow: hidden;
}

.tendency-eyebrow {
  font-family: var(--font-sans);
  font-size: 0.5625rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.28);
  margin: 0 0 14px;
}

.tendency-code {
  font-family: var(--font-sans);
  font-size: 1.75rem;
  color: rgba(255, 255, 255, 0.92);
  font-weight: 600;
  line-height: 1;
  margin: 0 0 20px;
}

.tendency-para {
  font-family: var(--font-sans);
  font-size: 0.875rem;
  line-height: 1.7;
  letter-spacing: 0.01em;
  color: rgba(255, 255, 255, 0.52);
  margin: 0 0 24px;
}

/* ─── Readouts ───────────────────────────────────────── */
.readout-row {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.readout-key {
  font-family: var(--font-sans);
  font-size: 0.5rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.25);
}

.readout-val {
  font-family: var(--font-sans);
  font-size: 0.7rem;
  line-height: 1.5;
  letter-spacing: 0.01em;
  color: rgba(255, 255, 255, 0.8);
}

/* ─── Image bento ────────────────────────────────────── */
.image-bento {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 4px;
  padding: 10px 10px 10px 12px;
  box-sizing: border-box;
}

.bento-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  border-radius: 4px;
  min-height: 0;
  cursor: pointer;
  transition: box-shadow 160ms ease, opacity 160ms ease;
}

.bento-img--active {
  box-shadow: inset 0 0 0 1.5px rgba(255, 255, 255, 0.55);
}

.image-bento:hover .bento-img:not(.bento-img--active) {
  opacity: 0.45;
}

/* Row 1: wide · small · small */
.bento-img:nth-child(1) { grid-column: 1 / 3; }
.bento-img:nth-child(2) { grid-column: 3; }
.bento-img:nth-child(3) { grid-column: 4; }
/* Row 2: small · small · wide */
.bento-img:nth-child(4) { grid-column: 1; }
.bento-img:nth-child(5) { grid-column: 2; }
.bento-img:nth-child(6) { grid-column: 3 / 5; }
/* Row 3: wide · wide */
.bento-img:nth-child(7) { grid-column: 1 / 3; }
.bento-img:nth-child(8) { grid-column: 3 / 5; }

/* ─── Graph ──────────────────────────────────────────── */
.grid-dot {
  fill: rgba(255, 255, 255, 0.06);
}

.scan-beam {
  fill: rgba(255, 255, 255, 0.015);
  animation: field-scan 20s linear infinite;
}

@keyframes field-scan {
  0%   { transform: translateX(0px);    opacity: 0; }
  4%   { opacity: 1; }
  96%  { opacity: 0.5; }
  100% { transform: translateX(1400px); opacity: 0; }
}

.cluster-label {
  font-family: var(--font-sans);
  font-size: 13px;
  letter-spacing: 0.12em;
  fill: rgba(255, 255, 255, 0.85);
  pointer-events: none;
  user-select: none;
}

.field-edge {
  stroke: rgba(255, 255, 255, 0.45);
  stroke-width: 0.5;
  fill: none;
}

.field-edge.bridge {
  stroke-dasharray: 2 6;
}

.field-node { cursor: pointer; }

.node-hit {
  fill: transparent;
  stroke: none;
}

.node-mark {
  fill: none;
  stroke: rgba(255, 255, 255, 0.45);
  stroke-width: 0.75;
}

.node-mark.anchor {
  fill: rgba(255, 255, 255, 0.75);
  stroke: none;
}

.node-mark.bridge-adj {
  stroke: rgba(255, 255, 255, 0.45);
  stroke-width: 0.75;
}

.node-mark.color-upcoming               { stroke: var(--field-green); }
.node-mark.anchor.color-upcoming        { fill:   var(--field-green); stroke: none; }
.node-mark.color-attended               { stroke: var(--field-orange); }
.node-mark.anchor.color-attended        { fill:   var(--field-orange); stroke: none; }

.node-mark.selected {
  fill: rgba(255, 255, 255, 0.95) !important;
  stroke: none !important;
}

.node-label {
  font-family: var(--font-sans);
  font-size: 11px;
  letter-spacing: 0.05em;
  fill: rgba(255, 255, 255, 0.5);
  pointer-events: none;
  user-select: none;
}

.bridge-label {
  font-family: var(--font-sans);
  font-size: 10px;
  letter-spacing: 0.08em;
  fill: rgba(255, 255, 255, 0.45);
  pointer-events: none;
  user-select: none;
}

/* ─── Footer ─────────────────────────────────────────── */
.field-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 28px;
}

/* ─── Time slider ────────────────────────────────────── */
.time-slider {
  display: flex;
  flex-direction: column;
  gap: 7px;
  width: 180px;
  flex-shrink: 0;
}

.slider-track-row {
  position: relative;
  height: 12px;
  display: flex;
  align-items: center;
}

.slider-rail {
  position: absolute;
  left: 0;
  right: 0;
  height: 1px;
  background: rgba(255, 255, 255, 0.14);
}

.slider-tick {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 1px;
  height: 5px;
  background: rgba(255, 255, 255, 0.18);
}

.slider-thumb {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 6px;
  height: 6px;
  background: rgba(255, 255, 255, 0.78);
  transition: left 320ms ease;
  pointer-events: none;
}

.slider-labels {
  display: flex;
  justify-content: space-between;
}

.slider-label {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  font-family: var(--font-sans);
  font-size: 0.5625rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.28);
  transition: color 200ms ease;
}

.slider-label:hover  { color: rgba(255, 255, 255, 0.55); }
.slider-label.active { color: rgba(255, 255, 255, 0.75); }

/* ─── Stats ──────────────────────────────────────────── */
.field-stats {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-family: var(--font-sans);
  font-size: 0.5625rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.18);
  margin: 0;
}

.stat-sep { opacity: 0.5; }
</style>
