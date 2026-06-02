<script setup lang="ts">
useHead({ title: 'Field Notes — Outside' })

const SECTIONS = [
  { id: 'field-framework',      number: '01', title: 'Field Framework',      desc: 'What a Field is. The core loop. Principles.' },
  { id: 'metadata-ontology',    number: '02', title: 'Metadata Ontology',     desc: 'The knowledge graph. Entity definitions. Relationship types.' },
  { id: 'cultural-archetypes',  number: '03', title: 'Cultural Archetypes',   desc: 'Behavioral tendencies. How patterns become legible.' },
  { id: 'language-system',      number: '04', title: 'Language System',       desc: 'How the system speaks. Terminology. Naming decisions.' },
  { id: 'field-visualization',  number: '05', title: 'Field Visualization',   desc: 'How the Field is shown. Visual logic.' },
  { id: 'profile-architecture', number: '06', title: 'Profile Architecture',  desc: 'What a profile is. Tabs. Identity layer.' },
  { id: 'future-systems',       number: '07', title: 'Future Systems',        desc: 'Open questions. Directions not yet taken.' },
]

const activeSection = ref(SECTIONS[0].id)
const scrollProgress = ref(0)

function onScroll() {
  const scrollY = window.scrollY

  let newActive = SECTIONS[0].id
  for (const s of [...SECTIONS].reverse()) {
    const el = document.getElementById(s.id)
    if (el && el.getBoundingClientRect().top <= 120) {
      newActive = s.id
      break
    }
  }
  activeSection.value = newActive

  const el = document.getElementById(activeSection.value)
  if (el) {
    const progress = Math.max(0, Math.min(1, (scrollY - el.offsetTop + 120) / el.offsetHeight))
    scrollProgress.value = progress
  }
}

function navClick(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' })
}

async function copyAnchor(id: string) {
  try { await navigator.clipboard.writeText(`${window.location.origin}/field-notes#${id}`) } catch {}
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <div class="fn-page">

    <!-- Page intro -->
    <div class="fn-intro">
      <div class="fn-intro-inner">
        <p class="fn-eyebrow">Outside — Field Notes</p>
        <h1 class="fn-page-title">Field Notes</h1>
        <p class="fn-page-sub">A working document on the design of a cultural system.<br>This document records decisions as they are made. It will be incomplete.</p>
        <nav class="fn-mobile-nav" aria-label="Sections">
          <button
            v-for="s in SECTIONS"
            :key="s.id"
            class="fn-mobile-nav-item"
            :class="{ active: activeSection === s.id }"
            @click="navClick(s.id)"
          >{{ s.number }}</button>
        </nav>
      </div>
    </div>

    <div class="fn-layout">

      <!-- Left nav (desktop) -->
      <aside class="fn-nav" aria-label="Section navigation">
        <div class="fn-progress-track">
          <div class="fn-progress-fill" :style="{ height: `${scrollProgress * 100}%` }" />
        </div>
        <div class="fn-nav-inner">
          <p class="fn-nav-label">Ongoing</p>
          <nav class="fn-nav-list">
            <button
              v-for="s in SECTIONS"
              :key="s.id"
              class="fn-nav-item"
              :class="{ active: activeSection === s.id }"
              @click="navClick(s.id)"
            >
              <span class="fn-nav-num">{{ s.number }}</span>
              <span class="fn-nav-title">{{ s.title }}</span>
            </button>
          </nav>
        </div>
      </aside>

      <!-- Reading column -->
      <main class="fn-content">

        <!-- ─── 01 Field Framework ──────────────────────── -->
        <section id="field-framework">
          <div class="section-break">
            <div class="section-break-head">
              <span class="section-number">01</span>
              <h2 class="section-title">Field Framework</h2>
            </div>
            <p class="section-desc">What a Field is. The core loop. Principles.</p>
            <div class="section-rule" />
            <span class="section-ghost" aria-hidden="true">01</span>
          </div>

          <article class="entry" id="what-a-field-is">
            <div class="entry-meta">
              <span>Field Framework</span><span class="meta-sep">·</span><span class="meta-status">Settled</span><span class="meta-sep">·</span><span>May 2026</span>
            </div>
            <h3 class="entry-title" @click="copyAnchor('what-a-field-is')">What a Field Is</h3>
            <div class="entry-body">
              <p>A Field is not a collection. It is a topology.</p>
              <p>When a person attends events over time, they leave behind a set of choices. Each choice is a data point — but data points alone are mute. A Field is what becomes audible when those points are read together: the shape of a sensibility, the gravity of recurring interests, the distance between scenes a person inhabits.</p>
              <p>A Field has density and sparsity. It has clusters and edges. It has anchors — places returned to — and bridges — movements between worlds that rarely overlap. These structural properties are not metadata. They are meaning.</p>
              <p>A Field is not what you attended. It is the pattern that only your attendance could have produced.</p>
            </div>
          </article>

          <article class="entry" id="archive-and-field">
            <div class="entry-meta">
              <span>Field Framework</span><span class="meta-sep">·</span><span class="meta-status">Settled</span><span class="meta-sep">·</span><span>May 2026</span>
            </div>
            <h3 class="entry-title" @click="copyAnchor('archive-and-field')">The Archive and the Field</h3>
            <div class="entry-body">
              <p>An event archive answers backward-facing questions: what, where, when. It is a ledger. It establishes that something happened.</p>
              <p>A Field answers a different kind of question: <em>what kind of attention produced this record?</em></p>
              <p>The difference is epistemological. An archive treats events as endpoints. A Field treats events as evidence — evidence of taste, of curiosity, of the cultural gravitational forces pulling a person toward certain rooms and not others.</p>
              <p>An archive grows by addition. A Field grows by interpretation. You can have a large archive with a shallow Field — someone who attends widely but without coherence. You can have a sparse archive with a deep Field — someone whose few choices reveal a highly specific sensibility. Volume is not signal. Pattern is signal.</p>
              <p>The archive is the map. The Field is the territory it implies.</p>
            </div>
          </article>

          <article class="entry" id="behavioral-traces">
            <div class="entry-meta">
              <span>Field Framework</span><span class="meta-sep">·</span><span class="meta-status">Settled</span><span class="meta-sep">·</span><span>May 2026</span>
            </div>
            <h3 class="entry-title" @click="copyAnchor('behavioral-traces')">How Behavioral Traces Become Meaningful Patterns</h3>
            <div class="entry-body">
              <p>Behavior becomes meaning through comparison, repetition, and adjacency.</p>
              <p><em>Repetition</em> reveals commitment. Returning to the same venue, the same genre, the same scene is not redundancy — it is depth. Anchors form. The Field develops mass around them.</p>
              <p><em>Adjacency</em> reveals range. When a person moves between scenes that rarely share an audience — from experimental film to institutional choreography, from club music to media theory — that movement is not random. It marks a sensibility willing to hold contradiction, to find coherence across apparent distance. These are the bridges in a Field. They are its most distinctive feature.</p>
              <p><em>Comparison</em> reveals position. No Field exists in isolation. A person who attends primarily artist-run spaces occupies a different position than one who gravitates toward institutional programming — even if the event categories look identical on paper. The texture of the choices matters: independent vs. established, recurring vs. one-time, dense orbit vs. wide exploration.</p>
              <p>What Outside does is read these three dimensions simultaneously. Not to classify, but to locate. A Field places a person within a cultural landscape without reducing them to a type.</p>
            </div>
          </article>

          <article class="entry" id="interpretation-without-reduction">
            <div class="entry-meta">
              <span>Field Framework</span><span class="meta-sep">·</span><span class="meta-status">Settled</span><span class="meta-sep">·</span><span>May 2026</span>
            </div>
            <h3 class="entry-title" @click="copyAnchor('interpretation-without-reduction')">Interpretation Without Reduction</h3>
            <div class="entry-body">
              <p>A personality quiz begins with categories and assigns people to them. It is a top-down taxonomy. It mistakes labeling for understanding.</p>
              <p>Outside inverts this. It begins with behavior and reads upward toward character. The categories that emerge — if they emerge at all — are derived, not imposed.</p>
              <p>The mechanism of interpretation must be constrained by three rules. First: it must be falsifiable by new behavior. A Field is not a verdict. It should shift as attendance shifts. A Field that cannot change under the weight of new evidence is a label wearing a data costume. Second: it must describe without prescribing. Outside can say your attendance has concentrated in institutional spaces with serious programming ambition. It cannot say therefore you are this kind of person. The gap between the behavioral description and the identity inference belongs to the user. Third: it must treat absence as meaningful. A Field is defined as much by what is absent as by what is present. The gaps in a Field are not empty — they are choices, and they shape the pattern as much as attendance does.</p>
              <p>The difference between a personality quiz and a Field is that the quiz asks you to describe yourself. A Field watches what you do and describes that instead.</p>
            </div>
          </article>

          <article class="entry" id="principles">
            <div class="entry-meta">
              <span>Field Framework</span><span class="meta-sep">·</span><span class="meta-status">Settled</span><span class="meta-sep">·</span><span>May 2026</span>
            </div>
            <h3 class="entry-title" @click="copyAnchor('principles')">Principles</h3>
            <div class="entry-body">
              <p>Seven principles should guide every future product decision.</p>
              <p><em>Events are evidence, not content.</em> Outside is not in the business of surfacing event information. Events are inputs to interpretation. The product's value lives downstream of the event, not in the event itself.</p>
              <p><em>Identity is emergent, not assigned.</em> No feature should tell a user who they are. Every feature should give a user more material to understand their own pattern. The product offers interpretation. The user completes the meaning.</p>
              <p><em>Depth over breadth.</em> A single deeply attended venue relationship is more interesting than twenty superficial check-ins. Outside should weight commitment, not quantity. The system should make it more valuable to go back than to go wide for its own sake.</p>
              <p><em>The record is the value.</em> The persistent cultural record — the Field over time — is what differentiates Outside from every alternative. Features that do not contribute to or express that record are secondary. Features that erode it are dangerous.</p>
              <p><em>Legibility without reduction.</em> Outside must make complex behavioral patterns legible without flattening them. The moment the system reduces a person to a single label, it has failed. The goal is to show someone their own complexity back to them, with more resolution than they had before.</p>
              <p><em>Time is a dimension, not a filter.</em> A Field has a past, a present, and an implied trajectory. How someone's attendance has changed over time is as meaningful as where it currently sits. Outside should treat time as structural — something that reveals development — not merely as a way to narrow results.</p>
              <p><em>The loop must close.</em> Discover → Attend → Collect → Identity → Discover Again. If attending an event does not feed back into a richer understanding of what a person should discover next, the system is not working. The Field must speak forward, not only backward. Identity should sharpen discovery, not just reflect history.</p>
            </div>
          </article>
        </section>

        <!-- ─── 02 Metadata Ontology ────────────────────── -->
        <section id="metadata-ontology">
          <div class="section-break">
            <div class="section-break-head">
              <span class="section-number">02</span>
              <h2 class="section-title">Metadata Ontology</h2>
            </div>
            <p class="section-desc">The knowledge graph. Entity definitions. Relationship types.</p>
            <div class="section-rule" />
            <span class="section-ghost" aria-hidden="true">02</span>
          </div>

          <article class="entry" id="insufficient-model">
            <div class="entry-meta">
              <span>Metadata Ontology</span><span class="meta-sep">·</span><span class="meta-status">Settled</span><span class="meta-sep">·</span><span>May 2026</span>
            </div>
            <h3 class="entry-title" @click="copyAnchor('insufficient-model')">The Insufficient Model</h3>
            <div class="entry-body">
              <p>The current version of Outside understands five things about an event: its name, its venue, its date, its category, and its location. This is insufficient.</p>
              <p>A standard events database asks: <em>what is this?</em> A knowledge graph asks: <em>what does this connect to, and how?</em> These are different questions with different architectures. The first produces a list. The second produces a topology.</p>
              <p>To generate Fields, the system needs to understand cultural relationships that do not appear in any event listing. Metrograph and Anthology Film Archives are both cinemas. But the relationship between them is not simply that they share a category — it is that they share an aesthetic vocabulary, an institutional character, a position within a specific scene, and a set of audiences who move between them. None of this is captured by the current model.</p>
              <p>The metadata system must be redesigned. Not as a richer database, but as a knowledge graph — a network of entities and relationships where the edges are as important as the nodes.</p>
            </div>
          </article>

          <article class="entry" id="event-as-cultural-signal">
            <div class="entry-meta">
              <span>Metadata Ontology</span><span class="meta-sep">·</span><span class="meta-status">Settled</span><span class="meta-sep">·</span><span>May 2026</span>
            </div>
            <h3 class="entry-title" @click="copyAnchor('event-as-cultural-signal')">Event as Cultural Signal</h3>
            <div class="entry-body">
              <p>Beyond logistics, an event carries production context: where the work originated, when it was made, what format it takes, whether it is a premiere or a revival. It carries aesthetic tags — not genre classifications but sensibility descriptors: experimental, archival, theory, community, interdisciplinary, immersive, underground. These tags are relational. Their value comes not from what they say about a single event, but from the connections they enable between events and venues that otherwise appear unrelated.</p>
              <p>An event also carries a discourse position — the intellectual tradition it participates in, the conceptual conversations it enters. A screening of a structural film is not equivalent to a mainstream theatrical release even if both are categorized as cinema. The difference lies in lineage, in canonical weight, in the audience it addresses and the discourse it extends.</p>
              <p>A rule for aesthetic tags: an event should carry between two and six. More than six implies insufficient specificity. The tags must be precise enough to generate meaningful overlap, rare enough that overlap is informative.</p>
            </div>
          </article>

          <article class="entry" id="institutional-character-of-space">
            <div class="entry-meta">
              <span>Metadata Ontology</span><span class="meta-sep">·</span><span class="meta-status">Settled</span><span class="meta-sep">·</span><span>May 2026</span>
            </div>
            <h3 class="entry-title" @click="copyAnchor('institutional-character-of-space')">The Institutional Character of Space</h3>
            <div class="entry-body">
              <p>Venues are not neutral containers. They have institutional character — a governance model, an economic structure, a programming philosophy, a position within a scene. A nonprofit with a single curatorial vision occupies a different position than a commercial venue that platforms external proposals, even if both program similar events on a given night.</p>
              <p>The relevant dimensions are: how the organization sustains itself (ticketed, membership, grant-funded, bar revenue), who controls the program (curated, platform, community), how much risk the programming takes, and what institutional age the space has accumulated. A nascent space and a legacy institution are structurally different even when their calendars overlap.</p>
              <p>Relationships between venues are first-class objects in the graph — not just edges, but nodes with their own properties. Aesthetic kinship, audience overlap, institutional kinship, scene bridge, lineage: each relationship type carries a strength value, a basis (programming, audience, aesthetic, curatorial, geographic), and a flag indicating whether it crosses scene boundaries. Cross-scene relationships are the most valuable. They are where bridges form.</p>
              <p>A bridge between two venues is not a similarity. It is a traversal — a path that a person can walk between worlds that most people never connect. The system should register these traversals as high-signal events in Field construction.</p>
            </div>
          </article>

          <article class="entry" id="scenes-as-formations">
            <div class="entry-meta">
              <span>Metadata Ontology</span><span class="meta-sep">·</span><span class="meta-status">Working</span><span class="meta-sep">·</span><span>May 2026</span>
            </div>
            <h3 class="entry-title" @click="copyAnchor('scenes-as-formations')">Scenes as Cultural Formations</h3>
            <div class="entry-body">
              <p>A Scene is not a genre. It is a cultural formation — a set of spaces, practices, people, and discourse that cohere into a recognizable world. Scenes are the most important structural layer in the graph because they are the level at which Fields become legible. Individual venues are points. Scenes are the territories those points inhabit.</p>
              <p>The key property of a Scene is permeability: how easily do audiences migrate between this scene and adjacent ones? Low permeability makes bridge crossings high-signal. When someone moves from electronic music into contemporary dance — two scenes with low permeability — that movement reveals something about their sensibility that a list of attended events cannot. The system should register it accordingly.</p>
              <p>Scenes have their own ontology: a dominant position on the independent-to-institutional spectrum, a current state of health (emerging, active, established, fragmenting, legacy), and a set of relationships to adjacent and opposed scenes. Two scenes can be adjacent (share audience and aesthetic vocabulary), nested (one is a subset of another), convergent (historically separate but overlapping), or opposed (occupying competing positions). These distinctions matter for Field interpretation. Depth in a nested scene reads differently from depth in a scene with no substructure. Movement into an opposing scene is more meaningful than movement into an adjacent one.</p>
              <p>The full structure — events, venues, relationships, neighborhoods, scenes — forms a weighted knowledge graph. The person is not in the graph. They are a pattern across it: the particular subgraph illuminated by their attendance. Identity is not stored. It is read.</p>
            </div>
          </article>
        </section>

        <!-- ─── 03–07 Pending sections ─────────────────── -->
        <template v-for="s in SECTIONS.slice(2)" :key="s.id">
          <section :id="s.id">
            <div class="section-break">
              <div class="section-break-head">
                <span class="section-number">{{ s.number }}</span>
                <h2 class="section-title">{{ s.title }}</h2>
              </div>
              <p class="section-desc">{{ s.desc }}</p>
              <div class="section-rule" />
              <span class="section-ghost" aria-hidden="true">{{ s.number }}</span>
            </div>
            <p class="section-empty">No entries yet.</p>
          </section>
        </template>

      </main>
    </div>

  </div>
</template>

<style scoped>
/* ─── Page shell ────────────────────────────────────────── */
.fn-page {
  min-height: 100vh;
  background: var(--color-bg);
}

/* ─── Intro ─────────────────────────────────────────────── */
.fn-intro {
  max-width: var(--column-max);
  margin: 0 auto;
  padding: 72px var(--column-padding) 56px;
}

.fn-intro-inner {
  max-width: 680px;
}

.fn-eyebrow {
  font-family: var(--font-sans);
  font-size: 0.5rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--color-text-secondary);
  opacity: 0.55;
  margin: 0 0 20px;
}

.fn-page-title {
  font-family: var(--font-sans);
  font-size: clamp(2rem, 3.5vw, 3rem);
  font-weight: 300;
  letter-spacing: -0.03em;
  line-height: 1.05;
  color: var(--color-text);
  margin: 0 0 20px;
}

.fn-page-sub {
  font-family: var(--font-sans);
  font-size: var(--text-body);
  line-height: 1.7;
  color: var(--color-text-secondary);
  margin: 0 0 32px;
}

/* ─── Mobile section index ───────────────────────────────── */
.fn-mobile-nav {
  display: none;
  gap: 4px;
}

.fn-mobile-nav-item {
  background: none;
  border: none;
  padding: 6px 10px;
  cursor: pointer;
  font-family: var(--font-sans);
  font-size: 0.5625rem;
  letter-spacing: 0.1em;
  color: var(--color-text-secondary);
  opacity: 0.45;
  transition: opacity 150ms ease, color 150ms ease;
  border: 1px solid transparent;
}

.fn-mobile-nav-item:hover { opacity: 0.8; }
.fn-mobile-nav-item.active {
  opacity: 1;
  color: var(--color-text);
  border-color: var(--color-border);
}

/* ─── Layout grid ────────────────────────────────────────── */
.fn-layout {
  display: grid;
  grid-template-columns: 220px 1fr;
  max-width: var(--column-max);
  margin: 0 auto;
  padding: 0 var(--column-padding);
}

/* ─── Left nav ───────────────────────────────────────────── */
.fn-nav {
  position: sticky;
  top: var(--header-height);
  height: calc(100vh - var(--header-height));
  overflow: hidden;
  padding: 0 32px 48px 0;
  display: flex;
  align-items: flex-start;
}

.fn-progress-track {
  width: 1px;
  height: 100%;
  background: rgba(255, 255, 255, 0.06);
  flex-shrink: 0;
  position: relative;
  margin-right: 20px;
  align-self: stretch;
}

.fn-progress-fill {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background: rgba(255, 255, 255, 0.32);
  transition: height 100ms linear;
}

.fn-nav-inner {
  padding-top: 40px;
  display: flex;
  flex-direction: column;
  gap: 0;
}

.fn-nav-label {
  font-family: var(--font-sans);
  font-size: 0.5rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--color-text-secondary);
  opacity: 0.35;
  margin: 0 0 16px;
}

.fn-nav-list {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.fn-nav-item {
  display: flex;
  align-items: baseline;
  gap: 10px;
  background: none;
  border: none;
  padding: 6px 0;
  cursor: pointer;
  text-align: left;
  transition: opacity 200ms ease;
  opacity: 0.25;
}

.fn-nav-item:hover  { opacity: 0.55; }
.fn-nav-item.active { opacity: 0.82; }

.fn-nav-num {
  font-family: var(--font-sans);
  font-size: 0.4375rem;
  letter-spacing: 0.1em;
  color: var(--color-text-secondary);
  flex-shrink: 0;
}

.fn-nav-title {
  font-family: var(--font-sans);
  font-size: 0.5625rem;
  letter-spacing: 0.04em;
  color: var(--color-text);
  line-height: 1.4;
}

/* ─── Reading column ─────────────────────────────────────── */
.fn-content {
  max-width: 680px;
  padding: 56px 0 160px 48px;
}

/* ─── Section breaks ─────────────────────────────────────── */
section {
  margin-bottom: 96px;
}

.section-break {
  position: relative;
  margin-bottom: 64px;
  padding-bottom: 56px;
}

.section-break-head {
  display: flex;
  align-items: baseline;
  gap: 16px;
  margin-bottom: 10px;
}

.section-number {
  font-family: var(--font-sans);
  font-size: 0.5rem;
  letter-spacing: 0.18em;
  color: var(--color-text-secondary);
  opacity: 0.4;
}

.section-title {
  font-family: var(--font-sans);
  font-size: 0.625rem;
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--color-text);
  opacity: 0.55;
  margin: 0;
}

.section-desc {
  font-family: var(--font-sans);
  font-size: var(--text-meta);
  color: var(--color-text-secondary);
  margin: 0;
  opacity: 0.6;
}

.section-rule {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: var(--color-border);
  opacity: 0.5;
}

.section-ghost {
  position: absolute;
  right: -8px;
  top: -24px;
  font-family: var(--font-sans);
  font-size: 7rem;
  font-weight: 300;
  letter-spacing: -0.04em;
  line-height: 1;
  color: var(--color-text);
  opacity: 0.04;
  pointer-events: none;
  user-select: none;
}

/* ─── Entries ────────────────────────────────────────────── */
.entry {
  margin-bottom: 72px;
}

.entry-meta {
  display: flex;
  align-items: center;
  gap: 0;
  margin-bottom: 14px;
  font-family: var(--font-sans);
  font-size: 0.5rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-text-secondary);
  opacity: 0.45;
}

.meta-sep {
  margin: 0 8px;
  opacity: 0.5;
}

.meta-status {
  color: var(--color-text-secondary);
}

.entry-title {
  font-family: var(--font-sans);
  font-size: clamp(1.25rem, 2vw, 1.625rem);
  font-weight: 300;
  letter-spacing: -0.025em;
  line-height: 1.2;
  color: var(--color-text);
  margin: 0 0 28px;
  cursor: pointer;
}

.entry-title:hover {
  opacity: 0.75;
}

.entry-body p {
  font-family: var(--font-sans);
  font-size: 1rem;
  line-height: 1.82;
  letter-spacing: -0.005em;
  color: var(--color-text);
  opacity: 0.72;
  margin: 0 0 22px;
}

.entry-body p:last-child {
  margin-bottom: 0;
}

.entry-body em {
  font-style: italic;
  color: var(--color-text);
  opacity: 1;
}

/* ─── Empty state ────────────────────────────────────────── */
.section-empty {
  font-family: var(--font-sans);
  font-size: var(--text-meta);
  color: var(--color-text-secondary);
  opacity: 0.28;
  margin: 0;
  font-style: italic;
}

/* ─── Mobile ─────────────────────────────────────────────── */
@media (max-width: 1024px) {
  .fn-layout {
    grid-template-columns: 1fr;
  }
  .fn-nav {
    display: none;
  }
  .fn-mobile-nav {
    display: flex;
    flex-wrap: wrap;
  }
  .fn-content {
    padding: 40px 0 96px;
    max-width: 100%;
  }
}

@media (max-width: 768px) {
  .fn-intro {
    padding: 48px var(--column-padding) 40px;
  }
  .section-ghost {
    display: none;
  }
  .entry-body p {
    font-size: 0.9375rem;
    line-height: 1.78;
  }
}
</style>
