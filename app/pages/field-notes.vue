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

        <!-- ─── 03 Cultural Archetypes ─────────────────── -->
        <section id="cultural-archetypes">
          <div class="section-break">
            <div class="section-break-head">
              <span class="section-number">03</span>
              <h2 class="section-title">Cultural Archetypes</h2>
            </div>
            <p class="section-desc">Behavioral tendencies. How patterns become legible.</p>
            <div class="section-rule" />
            <span class="section-ghost" aria-hidden="true">03</span>
          </div>

          <article class="entry" id="depth-and-return">
            <div class="entry-meta"><span>Cultural Archetypes</span><span class="meta-sep">·</span><span class="meta-status">Settled</span><span class="meta-sep">·</span><span>June 2026</span></div>
            <h3 class="entry-title" @click="copyAnchor('depth-and-return')">Depth and Return</h3>
            <div class="entry-body">
              <p>Archetypes defined by commitment, recurrence, and the deepening relationship with known territory.</p>
              <div class="archetype">
                <p class="archetype-name">Resident</p>
                <p class="archetype-def">Has claimed a venue as their own. Return is not discovery — it is habitation.</p>
                <ul class="archetype-signals">
                  <li>Very high recurrence at one or two specific venues</li>
                  <li>Attendance independent of specific programming; the venue is the draw</li>
                  <li>Low scene breadth; deep institutional familiarity</li>
                  <li>Membership or subscription relationship likely</li>
                </ul>
                <p class="archetype-note"><em>Example —</em> Attends Metrograph 10–14 times per year regardless of what is screening. Knows the programming cycles before they are announced.</p>
                <p class="archetype-note"><em>Distinguished from Ritualist —</em> The Resident's loyalty is to a place; the Ritualist's is to a recurring event. The Resident would attend if the programming changed. The Ritualist would follow the series to a new location.</p>
              </div>
              <div class="archetype">
                <p class="archetype-name">Ritualist</p>
                <p class="archetype-def">Structures cultural participation around recurring events. Attendance is ceremonial. Each return deepens a practice rather than extending it.</p>
                <ul class="archetype-signals">
                  <li>Consistent presence at specific recurring series across multiple years</li>
                  <li>Event selection is conservative — known quantities, repeated</li>
                  <li>Long unbroken chains of attendance at the same programs</li>
                  <li>Limited exploration outside established patterns</li>
                </ul>
                <p class="archetype-note"><em>Example —</em> Has attended the same annual festival six consecutive years. Attends the same monthly chamber series without exception.</p>
                <p class="archetype-note"><em>Distinguished from Devotee —</em> The Ritualist's relationship is with the recurring form of an event; the Devotee's is with a specific series or artist's output. The Ritualist attends because the ceremony exists; the Devotee attends because they cannot miss one.</p>
              </div>
              <div class="archetype">
                <p class="archetype-name">Dense Orbit</p>
                <p class="archetype-def">Tight concentration around a single scene or small set of venues, with deep recurring engagement. The Field has mass — it pulls everything toward a center.</p>
                <ul class="archetype-signals">
                  <li>High event count at low venue count</li>
                  <li>Significant anchor relationships — 3 or more visits to the same venue in a short window</li>
                  <li>Low cross-scene mobility</li>
                  <li>Scene dominance above 65% by event count</li>
                </ul>
                <p class="archetype-note"><em>Example —</em> 16 events attended in a year, 12 of which are at three venues within the experimental music scene.</p>
                <p class="archetype-note"><em>Distinguished from Resident —</em> Dense Orbit may include several anchors within a single scene; the Resident is specifically bound to one venue. Dense Orbit is a topological description; Resident describes a relational one.</p>
              </div>
              <div class="archetype">
                <p class="archetype-name">Returnee</p>
                <p class="archetype-def">Makes specific return visits to works already seen. The first attendance is not complete — it generates a need to return.</p>
                <ul class="archetype-signals">
                  <li>Duplicate or near-duplicate event entries in the Field</li>
                  <li>Short intervals between repeat attendances at the same event</li>
                  <li>Repeat visits concentrated at specific works rather than general venue recurrence</li>
                  <li>Higher rate of revisitation for works with long runs or extended formats</li>
                </ul>
                <p class="archetype-note"><em>Example —</em> Attended the same film on two consecutive weekends. Returned to an exhibition twice before it closed.</p>
                <p class="archetype-note"><em>Distinguished from Ritualist —</em> The Ritualist returns to events over years; the Returnee returns to a specific work within a short window. The Ritualist builds a practice; the Returnee deepens a single encounter.</p>
              </div>
              <div class="archetype">
                <p class="archetype-name">Completist</p>
                <p class="archetype-def">Works through a defined body of work with systematic thoroughness. The retrospective, the complete works, the full run — comprehensiveness is the structure.</p>
                <ul class="archetype-signals">
                  <li>High density of events clustered around a specific artist, director, or curator</li>
                  <li>Sequential attendance at survey or retrospective programs</li>
                  <li>Visible series-completion behavior in the Field record</li>
                  <li>Attends even events outside their general taste to maintain completeness</li>
                </ul>
                <p class="archetype-note"><em>Example —</em> Attended 13 of 14 screenings in a complete retrospective. Present at all five performances of a limited engagement.</p>
                <p class="archetype-note"><em>Distinguished from Archivist —</em> The Archivist is drawn to archival form and preserved work in general; the Completist is after a specific body of work in its entirety. The Archivist browses; the Completist reads cover to cover.</p>
              </div>
            </div>
          </article>

          <article class="entry" id="range-and-crossing">
            <div class="entry-meta"><span>Cultural Archetypes</span><span class="meta-sep">·</span><span class="meta-status">Settled</span><span class="meta-sep">·</span><span>June 2026</span></div>
            <h3 class="entry-title" @click="copyAnchor('range-and-crossing')">Range and Crossing</h3>
            <div class="entry-body">
              <p>Archetypes defined by movement between scenes, bridge crossings, and the management of cultural breadth.</p>
              <div class="archetype">
                <p class="archetype-name">Omnivorous</p>
                <p class="archetype-def">No dominant scene. Film, music, contemporary art, performance, and discourse represented with roughly equal weight. The breadth is not restlessness — it is appetite.</p>
                <ul class="archetype-signals">
                  <li>4 or more scenes represented with significant event counts</li>
                  <li>Multiple strong anchor relationships across different scenes simultaneously</li>
                  <li>Bridge crossings frequent and unremarkable</li>
                  <li>No single scene above 30% of total events</li>
                </ul>
                <p class="archetype-note"><em>Example —</em> 7 film events, 6 music events, 5 performance events, 4 lecture events in a 6-month period. No obvious hierarchy.</p>
                <p class="archetype-note"><em>Distinguished from Exploratory —</em> The Omnivorous pattern shows equal depth across scenes; Exploratory shows wide sampling without significant anchors. Omnivorous has come home in multiple places simultaneously. Exploratory is still looking.</p>
              </div>
              <div class="archetype">
                <p class="archetype-name">Bridge-Walker</p>
                <p class="archetype-def">Specifically seeks the intersections between scenes — events that exist at the edge of one world and another. The bridge is the destination, not the passage.</p>
                <ul class="archetype-signals">
                  <li>High proportion of events tagged as cross-disciplinary or hybrid in format</li>
                  <li>Venue selection skews toward spaces known for cross-scene programming</li>
                  <li>Low density in any single scene; the intersections are the concentration</li>
                  <li>Bridges recur across the Field rather than appearing occasionally</li>
                </ul>
                <p class="archetype-note"><em>Example —</em> Primarily attends events combining music and visual art, or theory and live performance. Gravitates to Pioneer Works, The Kitchen, and similar hybrid-format venues.</p>
                <p class="archetype-note"><em>Distinguished from Translator —</em> The Bridge-Walker seeks the crossing as an experience; the Translator carries knowledge across the crossing. The Bridge-Walker attends the bridge event; the Translator attends separately in each scene and synthesizes the distance between them.</p>
              </div>
              <div class="archetype">
                <p class="archetype-name">Satellite</p>
                <p class="archetype-def">Has a clearly dominant home scene but makes regular, deliberate forays into adjacent territories. The home scene has gravitational pull — the person always returns.</p>
                <ul class="archetype-signals">
                  <li>60–75% of events in a primary scene</li>
                  <li>Periodic clusters of activity in one or two secondary scenes</li>
                  <li>Return to the primary scene between each foray</li>
                  <li>Secondary scene attendance triggered by specific events rather than sustained interest</li>
                </ul>
                <p class="archetype-note"><em>Example —</em> Primarily attends experimental film; periodically enters contemporary art openings around major exhibitions; rarely attends music.</p>
                <p class="archetype-note"><em>Distinguished from Bridge-Walker —</em> The Satellite has a home; the Bridge-Walker doesn't. The Satellite departs and returns. The Bridge-Walker inhabits the threshold.</p>
              </div>
              <div class="archetype">
                <p class="archetype-name">Translator</p>
                <p class="archetype-def">Inhabits multiple scenes and moves between them carrying conceptual material. The same question recurs across film, performance, and lecture. The synthesis is the practice.</p>
                <ul class="archetype-signals">
                  <li>Multi-scene attendance where scenes are conceptually linked rather than aesthetically adjacent</li>
                  <li>Discourse tags cluster around shared themes across different event types</li>
                  <li>Wide scene range organized by sustained inquiry rather than casual variety</li>
                  <li>The Field shows an argument even when it does not show a pattern</li>
                </ul>
                <p class="archetype-note"><em>Example —</em> Attends films about urban space, lectures on housing policy, and performance work about domestic labor — in the same period, drawn by the same preoccupation.</p>
                <p class="archetype-note"><em>Distinguished from Omnivorous —</em> The Omnivorous Field is broad for its own sake; the Translator's breadth is organized by an ongoing inquiry. Omnivorous shows appetite; the Translator shows method.</p>
              </div>
              <div class="archetype">
                <p class="archetype-name">Cross-Disciplinary</p>
                <p class="archetype-def">Consistently crosses two or three scenes that rarely share an audience. The crossings are structural — the same pair of scenes recurs through the Field.</p>
                <ul class="archetype-signals">
                  <li>Two or three scenes with significant and roughly equal event counts</li>
                  <li>Bridge relationships visible and repeated across the temporal record</li>
                  <li>The same cross-scene pairing appears across time rather than once</li>
                  <li>Scene selection is consistent even as individual event selection varies</li>
                </ul>
                <p class="archetype-note"><em>Example —</em> Attends experimental film and contemporary music with equal weight across two years. These two scenes define the entire Field; no others appear with regularity.</p>
                <p class="archetype-note"><em>Distinguished from Bridge-Walker —</em> The Cross-Disciplinary pattern is about inhabiting multiple scenes simultaneously; the Bridge-Walker seeks the moment of crossing itself. Cross-Disciplinary has two homes; Bridge-Walker lives on the border between them.</p>
              </div>
              <div class="archetype">
                <p class="archetype-name">Migrant</p>
                <p class="archetype-def">Moves between scenes sequentially, inhabiting each one deeply before moving on. The Field shows successive phases of intense engagement — each complete in itself before the next begins.</p>
                <ul class="archetype-signals">
                  <li>Temporal clusters of scene-specific activity that shift over time</li>
                  <li>Strong anchor relationships that appear and then recede as the scene changes</li>
                  <li>Low simultaneous cross-scene activity at any given time</li>
                  <li>Each phase has a discernible beginning and end</li>
                </ul>
                <p class="archetype-note"><em>Example —</em> Heavy music attendance in the first year; near-total absence of music and concentrated art attendance in the second year. The phases do not overlap.</p>
                <p class="archetype-note"><em>Distinguished from Dispersing —</em> The Migrant leaves one scene and fully inhabits another; the Dispersing person expands from a scene rather than leaving it. The Migrant's Field shows sequential territories; the Dispersing Field shows one territory loosening into many.</p>
              </div>
              <div class="archetype">
                <p class="archetype-name">Exploratory</p>
                <p class="archetype-def">Wide ranging without a dominant anchor. The Field covers significant ground without establishing commitments. Discovery is the mode; consolidation has not yet happened — and may not be sought.</p>
                <ul class="archetype-signals">
                  <li>Events distributed across many scenes with no dominant concentration</li>
                  <li>Low recurrence at any single venue</li>
                  <li>High proportion of single-visit venues</li>
                  <li>Field grows by addition of new territories rather than depth in existing ones</li>
                </ul>
                <p class="archetype-note"><em>Example —</em> 22 events across 18 different venues in 7 different scenes in a year. Two venues visited twice; the rest visited once.</p>
                <p class="archetype-note"><em>Distinguished from Omnivorous —</em> The Omnivorous Field has depth across scenes — multiple anchors, recurring relationships. The Exploratory Field has breadth without depth. Omnivorous has landed; Exploratory is still in motion.</p>
              </div>
            </div>
          </article>

          <article class="entry" id="discovery-and-vanguard">
            <div class="entry-meta"><span>Cultural Archetypes</span><span class="meta-sep">·</span><span class="meta-status">Settled</span><span class="meta-sep">·</span><span>June 2026</span></div>
            <h3 class="entry-title" @click="copyAnchor('discovery-and-vanguard')">Discovery and Vanguard</h3>
            <div class="entry-body">
              <p>Archetypes defined by their temporal position relative to recognition — arriving early, arriving before, or seeking what precedes the event entirely.</p>
              <div class="archetype">
                <p class="archetype-name">Pioneer</p>
                <p class="archetype-def">Specifically seeks new and emerging venues — spaces in their first season, scenes before they have been named. Being present at the founding is the draw.</p>
                <ul class="archetype-signals">
                  <li>High proportion of venues with short institutional history at time of first visit</li>
                  <li>Attendance concentrated in emerging spaces before wider recognition</li>
                  <li>Early presence at venues that later become anchors for their scene</li>
                  <li>Interest declines as venues become established</li>
                </ul>
                <p class="archetype-note"><em>Example —</em> First attended three now-established venues in their opening months. Has been the first audience for several spaces that later developed significant reputations.</p>
                <p class="archetype-note"><em>Distinguished from Vanguard —</em> The Pioneer's early presence is about venue and scene; the Vanguard's is about the artist or work. The Pioneer finds the new place; the Vanguard finds the new maker.</p>
              </div>
              <div class="archetype">
                <p class="archetype-name">Vanguard</p>
                <p class="archetype-def">Arrives at artists and works before recognition forms. The Field shows consistent presence at emerging practitioners years before wider awareness. Interest is highest before institutional validation.</p>
                <ul class="archetype-signals">
                  <li>Early attendance at artists who later achieve significant recognition</li>
                  <li>Attendance at early-career work, debuts, and first presentations rather than survey retrospectives</li>
                  <li>Field shows the same artists appearing before their period of prominence</li>
                  <li>Interest declines as work enters mainstream critical discourse</li>
                </ul>
                <p class="archetype-note"><em>Example —</em> Attended a composer's first performance in New York three years before their first major institutional commission. Was not in the room for the retrospective.</p>
                <p class="archetype-note"><em>Distinguished from Early Adopter —</em> The Vanguard tracks careers; the Early Adopter tracks events. The Vanguard is there before there is a history; the Early Adopter is there at the beginning of the reception history.</p>
              </div>
              <div class="archetype">
                <p class="archetype-name">Early Adopter</p>
                <p class="archetype-def">Present at opening nights, first performances, and preview screenings. The event at the moment of first public reception carries a specific charge that later performances cannot reproduce.</p>
                <ul class="archetype-signals">
                  <li>High proportion of premiere and first-run events</li>
                  <li>Opening nights rather than extended runs; first screenings rather than repertory</li>
                  <li>Attendance decreases as a run or exhibition progresses</li>
                  <li>Low proportion of revivals or retrospective presentations</li>
                </ul>
                <p class="archetype-note"><em>Example —</em> Attends almost exclusively on opening nights. Rarely returns to anything after its initial reception period.</p>
                <p class="archetype-note"><em>Distinguished from Vanguard —</em> The Early Adopter operates at the event level; the Vanguard at the career level. The Early Adopter is present when the audience is first encountering the work. The Vanguard was present before there was a formal occasion for encounter.</p>
              </div>
              <div class="archetype">
                <p class="archetype-name">Scout</p>
                <p class="archetype-def">Attends events before they have significant public profile — unlisted gatherings, word-of-mouth events, performances with no review and no advertisement. The pre-public condition of the event is part of what is attended.</p>
                <ul class="archetype-signals">
                  <li>Attendance at events with minimal or no public documentation</li>
                  <li>Events that do not appear in mainstream cultural listings</li>
                  <li>Very low overlap with events attended by broader audiences</li>
                  <li>Network-based rather than publication-based discovery</li>
                </ul>
                <p class="archetype-note"><em>Example —</em> Primarily attends apartment concerts, unlisted screenings, and informal gatherings. Most events in the Field have no public record.</p>
                <p class="archetype-note"><em>Distinguished from Underground —</em> The Scout seeks pre-public events regardless of their formal character; the Underground seeks anti-institutional spaces regardless of public profile. A small-venue event with a public listing would satisfy the Underground; it would not satisfy the Scout.</p>
              </div>
              <div class="archetype">
                <p class="archetype-name">Archivist</p>
                <p class="archetype-def">Gravitates toward preserved, archival, and historically significant work. Their Field skews toward retrospectives, restorations, and canonical revivals. They are in a relationship with cultural history, not with what is being made now.</p>
                <ul class="archetype-signals">
                  <li>High proportion of archival screening and revival events</li>
                  <li>Attendance at preservation-focused institutions</li>
                  <li>Events tagged as retrospective, historical, or archival significantly overrepresented</li>
                  <li>Low proportion of premieres, new commissions, or debut work</li>
                </ul>
                <p class="archetype-note"><em>Example —</em> Attends almost exclusively archival film screenings and retrospective exhibitions. Has a complete relationship with Anthology Film Archives' programs over several years.</p>
                <p class="archetype-note"><em>Distinguished from Canonist —</em> The Archivist is drawn to archival form and context; the Canonist is in the act of personal canon construction. The Archivist seeks what has been preserved; the Canonist is in the act of deciding what to preserve within themselves.</p>
              </div>
            </div>
          </article>

          <article class="entry" id="institutional-position">
            <div class="entry-meta"><span>Cultural Archetypes</span><span class="meta-sep">·</span><span class="meta-status">Settled</span><span class="meta-sep">·</span><span>June 2026</span></div>
            <h3 class="entry-title" @click="copyAnchor('institutional-position')">Institutional Position</h3>
            <div class="entry-body">
              <p>Archetypes defined by their structural relationship to cultural institutions — proximity to, distance from, or specific orientation toward the formal apparatus of cultural production.</p>
              <div class="archetype">
                <p class="archetype-name">Peripheral</p>
                <p class="archetype-def">Field skews strongly toward independent, artist-run, and self-organized spaces. Not opposed to institutions — drawn to the specific texture of independent programming.</p>
                <ul class="archetype-signals">
                  <li>Low proportion of events at major institutional venues</li>
                  <li>High proportion of artist-run, cooperative, or informally organized spaces</li>
                  <li>Low proportion of ticketed or publicly funded events</li>
                  <li>Venue selection reflects programming philosophy rather than prestige</li>
                </ul>
                <p class="archetype-note"><em>Example —</em> 80% of events at small independent venues with no institutional affiliation. The remaining 20% are at institutions programming independently-minded work.</p>
                <p class="archetype-note"><em>Distinguished from Underground —</em> The Peripheral pattern describes institutional character; the Underground describes a specific resistance to formalization. The Peripheral prefers independence. The Underground is defined by refusal.</p>
              </div>
              <div class="archetype">
                <p class="archetype-name">Underground</p>
                <p class="archetype-def">Attends in spaces that resist the formal apparatus of cultural production. The venue's resistance to formalization is part of what is being attended, not incidental to it.</p>
                <ul class="archetype-signals">
                  <li>Events in spaces that are not culturally designated venues — warehouses, domestic spaces, non-spaces</li>
                  <li>Organized through informal networks rather than public channels</li>
                  <li>Events with minimal or no formal documentation</li>
                  <li>Low or no financial transaction as part of attendance</li>
                </ul>
                <p class="archetype-note"><em>Example —</em> Primarily attends DIY music events in non-venue spaces. Most events in the Field have no public existence.</p>
                <p class="archetype-note"><em>Distinguished from Pioneer —</em> The Underground is a structural position; the Pioneer is a temporal one. The Underground attends outside the institution permanently. The Pioneer is at the institution before it has been recognized as one.</p>
              </div>
              <div class="archetype">
                <p class="archetype-name">Institutional Drift</p>
                <p class="archetype-def">Field concentrated in established cultural institutions with significant programming history. The seriousness of intent that only major resources and long histories make possible is part of what is attended.</p>
                <ul class="archetype-signals">
                  <li>High proportion of events at major presenting institutions, large museums, or university-affiliated venues</li>
                  <li>Membership or sustained relationship with multiple institutions</li>
                  <li>Low proportion of independent or emerging spaces</li>
                  <li>Venue scale tends large; social formality of attendance tends high</li>
                </ul>
                <p class="archetype-note"><em>Example —</em> Almost all attendance at major presenting institutions. Very little at independent or emerging venues. Multiple institutional memberships.</p>
                <p class="archetype-note"><em>Distinguished from Monumentalist —</em> Institutional Drift is drawn to the institution; the Monumentalist is drawn to scale. A large independent production would satisfy the Monumentalist; it would not constitute Institutional Drift.</p>
              </div>
              <div class="archetype">
                <p class="archetype-name">Insider</p>
                <p class="archetype-def">Field shows access as well as taste. Attendance includes events not open to the general public — production gatherings, work-in-progress showings, programming previews. The record reflects proximity to the making of culture.</p>
                <ul class="archetype-signals">
                  <li>Attendance at non-public or semi-public events alongside formal programming</li>
                  <li>Events connected to production and programming networks</li>
                  <li>Access to works before formal public presentation</li>
                  <li>Field contains events that do not appear in public records</li>
                </ul>
                <p class="archetype-note"><em>Example —</em> Attends artist studio events, work-in-progress showings, and internal programming gatherings alongside the formal event calendar.</p>
                <p class="archetype-note"><em>Distinguished from Vanguard —</em> The Insider's access is social and relational; the Vanguard's is curatorial and observational. The Insider attends because of who they know. The Vanguard attends because of what they can see coming.</p>
              </div>
              <div class="archetype">
                <p class="archetype-name">Devotee</p>
                <p class="archetype-def">Has committed to a specific series, program, or artist's full output. Every installment is attended. No issue is missed. The series is the unit; the individual event is incidental.</p>
                <ul class="archetype-signals">
                  <li>Complete or near-complete attendance at a specific recurring series or program</li>
                  <li>Attendance does not vary with specific content; the series itself is the commitment</li>
                  <li>Low cross-venue or cross-series activity relative to total event count</li>
                  <li>Temporal record shows unbroken presence across multiple years</li>
                </ul>
                <p class="archetype-note"><em>Example —</em> Has attended every performance in a specific ongoing series for two and a half years. The gap between run two and run three is the only gap in the record.</p>
                <p class="archetype-note"><em>Distinguished from Resident —</em> The Devotee is bound to a series or an artist's output; the Resident is bound to a venue. The Devotee would follow the series to a new location. The Resident stays.</p>
              </div>
            </div>
          </article>

          <article class="entry" id="geographic-temporal-patterns">
            <div class="entry-meta"><span>Cultural Archetypes</span><span class="meta-sep">·</span><span class="meta-status">Settled</span><span class="meta-sep">·</span><span>June 2026</span></div>
            <h3 class="entry-title" @click="copyAnchor('geographic-temporal-patterns')">Geographic and Temporal Patterns</h3>
            <div class="entry-body">
              <p>Archetypes defined by how cultural participation is distributed across space and time.</p>
              <div class="archetype">
                <p class="archetype-name">Pilgrim</p>
                <p class="archetype-def">Makes deliberate journeys to attend specific events. The distance traveled is not incidental — it is meaningful. The event justifies and is transformed by the effort required to reach it.</p>
                <ul class="archetype-signals">
                  <li>Events in multiple cities or countries</li>
                  <li>Attendance at major festival events that require travel</li>
                  <li>Geographic spread of venues is wide relative to presumed home base</li>
                  <li>Specific events motivate the travel rather than general proximity to a scene</li>
                </ul>
                <p class="archetype-note"><em>Example —</em> Travels annually to attend a specific overseas festival. Has attended major events in several cities specifically because they could not be attended otherwise.</p>
                <p class="archetype-note"><em>Distinguished from Nomad —</em> The Pilgrim travels toward specific events; the Nomad follows cultural activity wherever it occurs as a structural condition. The Pilgrim makes a trip. The Nomad is always traveling.</p>
              </div>
              <div class="archetype">
                <p class="archetype-name">Nomad</p>
                <p class="archetype-def">Cultural life has no fixed geographic base. Attends wherever cultural activity is occurring — across cities, across countries, across temporary scenes. The Field does not have a home neighborhood.</p>
                <ul class="archetype-signals">
                  <li>Events spread across multiple cities and regions with no dominant base</li>
                  <li>No venue with significant recurrence</li>
                  <li>Attendance follows cultural activity rather than geographic proximity</li>
                  <li>Venue geography varies unpredictably rather than expanding from a center</li>
                </ul>
                <p class="archetype-note"><em>Example —</em> Event locations spread across five cities in a year with no dominant base. No venue appears more than twice.</p>
                <p class="archetype-note"><em>Distinguished from Itinerant —</em> The Itinerant moves across a single city without geographic constraint; the Nomad moves across cities and regions. The Itinerant has a city. The Nomad does not have a city.</p>
              </div>
              <div class="archetype">
                <p class="archetype-name">Seasonal</p>
                <p class="archetype-def">Cultural participation follows the rhythms of the cultural calendar. Dense activity in certain seasons; near-silence in others. The festival season, the fall opening, the spring programming cycle: these structure the year.</p>
                <ul class="archetype-signals">
                  <li>High event density in specific months that mirrors cultural programming seasons</li>
                  <li>Near-absence of events outside those months</li>
                  <li>Event selection aligned with seasonal programming patterns</li>
                  <li>The temporal pattern is externally regular, not internally driven</li>
                </ul>
                <p class="archetype-note"><em>Example —</em> Heavy attendance from September through December; near-empty Field from January through April. The structure is consistent across years.</p>
                <p class="archetype-note"><em>Distinguished from Sporadic —</em> The Seasonal pattern is regular and externally structured; the Sporadic pattern is irregular and internally driven. The Seasonal can be predicted by the cultural calendar. The Sporadic cannot be predicted at all.</p>
              </div>
              <div class="archetype">
                <p class="archetype-name">Sporadic</p>
                <p class="archetype-def">Intense bursts of attendance followed by extended absences. The pattern does not follow the cultural calendar. The periods of density are driven by internal conditions rather than external programming rhythms.</p>
                <ul class="archetype-signals">
                  <li>Event clusters separated by significant temporal gaps</li>
                  <li>No temporal regularity that corresponds to seasons or programming cycles</li>
                  <li>High-density periods followed by months of near-total inactivity</li>
                  <li>Clusters do not correspond to major programming events</li>
                </ul>
                <p class="archetype-note"><em>Example —</em> Twelve events over three weeks; nothing for four months; another dense cluster of eight events over two weeks. The gaps are not seasonal.</p>
                <p class="archetype-note"><em>Distinguished from Seasonal —</em> The Sporadic pattern is irregular and internally driven; the Seasonal pattern is predictable and externally structured. The Seasonal attends because the cultural calendar offers. The Sporadic attends when something internal opens.</p>
              </div>
              <div class="archetype">
                <p class="archetype-name">Itinerant</p>
                <p class="archetype-def">Moves fluidly across the entire city without a geographic home base. Borough, neighborhood, transit distance: none function as selection criteria. The whole city is the territory.</p>
                <ul class="archetype-signals">
                  <li>Events spread across multiple boroughs and neighborhoods with no dominant geography</li>
                  <li>Willingness to attend events at significant distance from presumed home base</li>
                  <li>No neighborhood clustering apparent in the Field</li>
                  <li>Geographic range is consistent rather than expanding from a center</li>
                </ul>
                <p class="archetype-note"><em>Example —</em> Events distributed roughly evenly across Manhattan, Brooklyn, and Queens. No neighborhood cluster. Long and short transit distances treated as equivalent.</p>
                <p class="archetype-note"><em>Distinguished from Pilgrim —</em> The Itinerant moves locally but without geographic constraint; the Pilgrim crosses greater distances for specific events. The Itinerant is always at home in the city. The Pilgrim leaves it.</p>
              </div>
              <div class="archetype">
                <p class="archetype-name">Parish</p>
                <p class="archetype-def">Attends within a small geographic radius. Cultural participation and local ecology are inseparable. The venues they attend define and are defined by where they live.</p>
                <ul class="archetype-signals">
                  <li>All or nearly all events at venues within a specific neighborhood or small radius</li>
                  <li>Strong recurrence at local venues</li>
                  <li>Limited willingness to travel across boroughs</li>
                  <li>Scene breadth constrained by local availability rather than by preference</li>
                </ul>
                <p class="archetype-note"><em>Example —</em> Ninety percent of events within a fifteen-minute walk. Deep familiarity with the local cultural ecology; sparse knowledge of what exists beyond it.</p>
                <p class="archetype-note"><em>Distinguished from Resident —</em> The Parish pattern is geographic; the Resident pattern is institutional. The Parish stays in the neighborhood regardless of which venue. The Resident stays at the venue regardless of the neighborhood.</p>
              </div>
            </div>
          </article>

          <article class="entry" id="mode-and-scale">
            <div class="entry-meta"><span>Cultural Archetypes</span><span class="meta-sep">·</span><span class="meta-status">Settled</span><span class="meta-sep">·</span><span>June 2026</span></div>
            <h3 class="entry-title" @click="copyAnchor('mode-and-scale')">Mode and Scale</h3>
            <div class="entry-body">
              <p>Archetypes defined by how a person prefers to encounter culture — the experiential conditions of attendance rather than the content attended.</p>
              <div class="archetype">
                <p class="archetype-name">Intimate</p>
                <p class="archetype-def">Gravitates toward small-scale events where proximity to the work is greatest. The scale of the experience is itself meaningful. The closeness is the point.</p>
                <ul class="archetype-signals">
                  <li>Event selection skews consistently toward small-capacity venues</li>
                  <li>Low attendance at major institutions or large-format events</li>
                  <li>Preference visible across scenes — applies to music, art, and performance alike</li>
                  <li>Recurrence at venues where the audience-to-work ratio is close</li>
                </ul>
                <p class="archetype-note"><em>Example —</em> Rarely attends events with audiences over 80. Gravitates toward reading series, chamber performances, and intimate gallery presentations consistently across scenes.</p>
                <p class="archetype-note"><em>Distinguished from Peripheral —</em> The Intimate preference is about scale; the Peripheral preference is about institutional character. A small institutional event would satisfy the Intimate; it would not satisfy the Peripheral.</p>
              </div>
              <div class="archetype">
                <p class="archetype-name">Monumentalist</p>
                <p class="archetype-def">Seeks ambitious, large-scale cultural productions. Major retrospectives, full-ensemble performances, landmark exhibitions. Scale is part of the work's claim. What only significant resources can produce is what they are after.</p>
                <ul class="archetype-signals">
                  <li>Attendance concentrated at major institutions and large-format events</li>
                  <li>High proportion of flagship exhibitions, full-ensemble productions, and large-scale presentations</li>
                  <li>Low proportion of intimate or informal events</li>
                  <li>Scale of production functions as a selection criterion across scenes</li>
                </ul>
                <p class="archetype-note"><em>Example —</em> Primarily attends major museum exhibitions, full orchestra concerts, and large-scale theatrical productions. Rarely attends events where the production scale is modest.</p>
                <p class="archetype-note"><em>Distinguished from Institutional Drift —</em> The Monumentalist is drawn to scale; Institutional Drift is drawn to the institution itself. A large-scale independent production would satisfy the Monumentalist. It would not constitute Institutional Drift.</p>
              </div>
              <div class="archetype">
                <p class="archetype-name">Theorist</p>
                <p class="archetype-def">Field built primarily from lectures, symposia, panels, and readings. The event is a site of discourse. Argument and text are the primary cultural form.</p>
                <ul class="archetype-signals">
                  <li>High proportion of lecture, panel, and reading events</li>
                  <li>Low proportion of pure performance or exhibition events</li>
                  <li>Venues tend toward academic institutions and alternative arts centers with strong discourse programs</li>
                  <li>Attendance often follows a specific intellectual question across venues and formats</li>
                </ul>
                <p class="archetype-note"><em>Example —</em> Primarily attends artist talks, theoretical symposia, and reading series. Rarely attends events without a significant discursive or argumentative component.</p>
                <p class="archetype-note"><em>Distinguished from Canonist —</em> The Canonist builds a personal canon through attended works; the Theorist attends the discourse around works. The Canonist experiences. The Theorist interrogates.</p>
              </div>
              <div class="archetype">
                <p class="archetype-name">Haptic</p>
                <p class="archetype-def">Prioritizes events where physical presence is irreplaceable — performance, installation, durational work. The experience cannot be adequately mediated. Being in the room is not incidental; it is the entire point.</p>
                <ul class="archetype-signals">
                  <li>High proportion of live performance and installation events</li>
                  <li>Low proportion of screenings, recordings, or static exhibitions</li>
                  <li>Preference for durational and embodied forms over fixed-object ones</li>
                  <li>Returns to the same performances rather than always seeking new work</li>
                </ul>
                <p class="archetype-note"><em>Example —</em> Primarily attends live performance, durational installations, and dance. Rarely attends film or fixed-media work. The recorded version is understood to be insufficient.</p>
                <p class="archetype-note"><em>Distinguished from Intimate —</em> The Haptic is about the irreplaceability of presence; the Intimate is about scale. A large-scale performance installation would satisfy the Haptic. It would not satisfy the Intimate.</p>
              </div>
              <div class="archetype">
                <p class="archetype-name">Witness</p>
                <p class="archetype-def">Attends alone and keeps their own record. Cultural participation is a private practice. The social life of venues is not sought. The event is sufficient in itself.</p>
                <ul class="archetype-signals">
                  <li>Solo attendance pattern visible across the record</li>
                  <li>Low engagement with post-event programming — talks, receptions, openings</li>
                  <li>Attendance at events where they know no one is unremarkable</li>
                  <li>No social dimension in the cultural record</li>
                </ul>
                <p class="archetype-note"><em>Example —</em> Attends consistently across many years. Always alone. The receptions are not attended. The openings are arrived at late and left early.</p>
                <p class="archetype-note"><em>Distinguished from Curator —</em> The Witness is defined by the private, solo relationship to attendance; the Curator by the precision and selectivity of their choices. A Witness might attend many events. A Curator might attend with others. The Witness is defined by the quality of presence; the Curator by the quality of selection.</p>
              </div>
            </div>
          </article>

          <article class="entry" id="formation-and-transition">
            <div class="entry-meta"><span>Cultural Archetypes</span><span class="meta-sep">·</span><span class="meta-status">Settled</span><span class="meta-sep">·</span><span>June 2026</span></div>
            <h3 class="entry-title" @click="copyAnchor('formation-and-transition')">Formation and Transition</h3>
            <div class="entry-body">
              <p>Archetypes defined by direction of movement — the Field as a trajectory rather than a state.</p>
              <div class="archetype">
                <p class="archetype-name">Emergent Participant</p>
                <p class="archetype-def">The Field is just beginning to form. Few events, wide scene exploration, no anchor relationships yet established. The person is in the process of finding their cultural location.</p>
                <ul class="archetype-signals">
                  <li>Low total event count</li>
                  <li>Wide scene diversity without depth in any scene</li>
                  <li>No venue visited more than once or twice</li>
                  <li>Attendance record is recent; no long-term patterns yet visible</li>
                </ul>
                <p class="archetype-note"><em>Example —</em> Eight events across six different scenes in six months. No repeats. No anchors. The Field is a scatter, not a constellation.</p>
                <p class="archetype-note"><em>Distinguished from Exploratory —</em> The Exploratory pattern describes a deliberate mode of wide-ranging; Emergent Participant describes an early developmental phase. The Exploratory person may have been attending for years. The Emergent Participant is just beginning.</p>
              </div>
              <div class="archetype">
                <p class="archetype-name">Converging</p>
                <p class="archetype-def">Moving from wide exploration toward depth. The early record shows range; the recent record shows narrowing. Scene preferences are clarifying. Anchors are beginning to form.</p>
                <ul class="archetype-signals">
                  <li>Early period shows high scene diversity; recent period shows decreasing scene count</li>
                  <li>First anchor relationships appearing — venues being visited for the second and third time</li>
                  <li>Event selection becoming more consistent in character</li>
                  <li>Direction of travel is visible in the temporal record</li>
                </ul>
                <p class="archetype-note"><em>Example —</em> Started with events across six scenes. Recent months concentrated in two scenes, with one venue appearing three times. The scatter is resolving into a shape.</p>
                <p class="archetype-note"><em>Distinguished from Dense Orbit —</em> Dense Orbit is an arrived state of concentration; Converging describes the process of arriving at it. Converging has a direction. Dense Orbit has a center.</p>
              </div>
              <div class="archetype">
                <p class="archetype-name">Dispersing</p>
                <p class="archetype-def">Moving from prior density toward range. A period of deep scene concentration is followed by expanding exploration. Established anchors are being visited less frequently. The person is ranging out.</p>
                <ul class="archetype-signals">
                  <li>Earlier period shows high scene concentration and strong anchor relationships</li>
                  <li>Recent period shows increasing scene diversity and declining recurrence at established venues</li>
                  <li>New scenes and venues appearing in the Field that have no prior presence</li>
                  <li>Direction of travel is outward from a center</li>
                </ul>
                <p class="archetype-note"><em>Example —</em> Two years of dense music scene attendance. Recent months show first art and performance events; music attendance declining but not absent. The center is loosening.</p>
                <p class="archetype-note"><em>Distinguished from Migrant —</em> The Migrant leaves one scene and fully inhabits another; the Dispersing person expands from a scene rather than departing it. Dispersing is about opening. Migrant is about moving.</p>
              </div>
              <div class="archetype">
                <p class="archetype-name">Displaced</p>
                <p class="archetype-def">Field shows a clear structural break — a before and after. Earlier and recent attendance patterns are legibly different. Something has changed that is visible in the record.</p>
                <ul class="archetype-signals">
                  <li>Visible discontinuity in the temporal record — a gap, a shift, a restart</li>
                  <li>Change in dominant scene or geographic concentration following the break</li>
                  <li>New venues appearing post-break with no connection to pre-break territory</li>
                  <li>The two periods of the Field feel like they belong to different people</li>
                </ul>
                <p class="archetype-note"><em>Example —</em> Three years of dense Brooklyn music scene attendance. A five-month gap. Then new attendance concentrated in Manhattan art and performance institutions. The records do not overlap.</p>
                <p class="archetype-note"><em>Distinguished from Migrant —</em> The Displaced pattern includes a break — a period of non-attendance — before the new Field begins forming. The Migrant shifts gradually. The Displaced restarts.</p>
              </div>
            </div>
          </article>

          <article class="entry" id="social-intellectual-modes">
            <div class="entry-meta"><span>Cultural Archetypes</span><span class="meta-sep">·</span><span class="meta-status">Settled</span><span class="meta-sep">·</span><span>June 2026</span></div>
            <h3 class="entry-title" @click="copyAnchor('social-intellectual-modes')">Social and Intellectual Modes</h3>
            <div class="entry-body">
              <p>Archetypes defined by the function attendance serves — community, inquiry, canon construction, or precision of encounter.</p>
              <div class="archetype">
                <p class="archetype-name">Community Member</p>
                <p class="archetype-def">Attends as part of a social world, not only as a cultural consumer. The programming is the occasion; the community of attendees is the continuity. The Field is partly a record of belonging.</p>
                <ul class="archetype-signals">
                  <li>High recurrence at venues with strong community identities and social ecosystems</li>
                  <li>Attendance at openings and social events alongside formal programming</li>
                  <li>Venue selection influenced by community affiliation and social relationships</li>
                  <li>Presence at events outside their usual taste if the community is there</li>
                </ul>
                <p class="archetype-note"><em>Example —</em> Attends all events at a specific venue or within a specific scene — including openings, benefits, and informal gatherings — with a consistency that exceeds curatorial interest.</p>
                <p class="archetype-note"><em>Distinguished from Resident —</em> The Resident's relationship is to the institution; the Community Member's is to the people. A venue's community could reassemble elsewhere and the Community Member would follow them. The Resident stays at the address.</p>
              </div>
              <div class="archetype">
                <p class="archetype-name">Correspondent</p>
                <p class="archetype-def">Attendance is in dialogue with their own practice — making, writing, research. The Field is a record of what they are thinking about as much as what they chose to attend. Events are part of a method.</p>
                <ul class="archetype-signals">
                  <li>Attendance clusters around specific conceptual interests that shift as practice or inquiry shifts</li>
                  <li>Wide scene range organized by sustained question rather than casual variety</li>
                  <li>Field shows the research trail of an active creative or intellectual practice</li>
                  <li>Event selection changes when the work changes</li>
                </ul>
                <p class="archetype-note"><em>Example —</em> A filmmaker who attends lectures on urbanism, performance work about architecture, and experimental films about space — all feeding a specific project. The Field changes when the project changes.</p>
                <p class="archetype-note"><em>Distinguished from Translator —</em> The Translator synthesizes across scenes in how they attend; the Correspondent uses attendance as research. The Translator's synthesis is the attendance itself. The Correspondent's synthesis happens after, in what is made or written.</p>
              </div>
              <div class="archetype">
                <p class="archetype-name">Canonist</p>
                <p class="archetype-def">In the process of building a personal canon through attended work. Each event is an act of deliberate cultural formation — seeing what must be seen, building a firsthand relationship with what matters.</p>
                <ul class="archetype-signals">
                  <li>High proportion of canonical, widely recognized, or historically significant works</li>
                  <li>Attendance at retrospectives and survey programs rather than emerging or unknown work</li>
                  <li>Systematic quality to event selection — working through a body of received significance</li>
                  <li>Low proportion of casual or convenience-driven attendance</li>
                </ul>
                <p class="archetype-note"><em>Example —</em> Has attended 14 of the historically most significant screenings available in New York in a given year. Works deliberately through important contemporary music and dance programs. The Field resembles a syllabus.</p>
                <p class="archetype-note"><em>Distinguished from Archivist —</em> The Canonist's orientation is educational and self-forming; the Archivist's is preservationist. The Canonist is receiving a tradition. The Archivist is tending it.</p>
              </div>
              <div class="archetype">
                <p class="archetype-name">Curator</p>
                <p class="archetype-def">Field is sparse but highly deliberate. Attends few events — fewer than most — but each attendance is the result of significant selection. Nothing is attended casually. The low event count is not absence but intensity of criterion.</p>
                <ul class="archetype-signals">
                  <li>Low total event count relative to years of engagement</li>
                  <li>High proportion of unusual or non-obvious event choices</li>
                  <li>Events span multiple scenes without producing a simple pattern</li>
                  <li>No evidence of convenience-driven or default attendance</li>
                </ul>
                <p class="archetype-note"><em>Example —</em> Nine events in a year. Each at a different venue and in a different scene. Each choice is considered and specific. The sparseness is the statement.</p>
                <p class="archetype-note"><em>Distinguished from Witness —</em> The Curator's defining quality is the precision of selection; the Witness's is the privacy and solitude of experience. A Curator might attend events communally. A Witness might attend many events. They diverge on selection and mode, not on each other.</p>
              </div>
            </div>
          </article>

          <article class="entry" id="note-on-overlap">
            <div class="entry-meta"><span>Cultural Archetypes</span><span class="meta-sep">·</span><span class="meta-status">Settled</span><span class="meta-sep">·</span><span>June 2026</span></div>
            <h3 class="entry-title" @click="copyAnchor('note-on-overlap')">A Note on Overlap and Movement</h3>
            <div class="entry-body">
              <p>These forty archetypes are not exclusive. A single person's Field may show the signature of several simultaneously — a Resident who is also a Theorist; a Vanguard who is also a Witness; a Converging Field moving toward Dense Orbit. The archetypes are analytical tools, not profiles.</p>
              <p>They are also not stable. The Emergent Participant may become the Archivist. The Dense Orbit may Disperse. The Migrant may eventually become the Resident. The Field is a record of a life, and lives move. What the archetypes provide is a vocabulary for describing the shape of a Field at a given moment — and for reading what direction it is traveling.</p>
            </div>
          </article>
        </section>

        <!-- ─── 04 Language System ──────────────────────── -->
        <section id="language-system">

          <div class="section-break">
            <div class="section-break-head">
              <span class="section-number">04</span>
              <h2 class="section-title">Language System</h2>
            </div>
            <p class="section-desc">How the system speaks. Terminology. Naming decisions.</p>
            <div class="section-rule" />
            <span class="section-ghost" aria-hidden="true">04</span>
          </div>

          <!-- Primary Navigation -->
          <div class="entry" id="primary-navigation">
            <div class="entry-meta">
              <span class="meta-label">Language System</span>
              <span class="meta-sep">—</span>
              <span class="meta-status">Settled</span>
            </div>
            <h3 class="entry-title" @click="copyAnchor('primary-navigation')">Primary Navigation</h3>
            <div class="entry-body">
              <p>Outside has three primary states. The language is plain and does not explain itself — the meaning accumulates through use.</p>
              <div class="lang-table">
                <div class="lang-row">
                  <span class="lang-term">Index</span>
                  <span class="lang-def">Event discovery feed. What's on.</span>
                </div>
                <div class="lang-row">
                  <span class="lang-term">Record</span>
                  <span class="lang-def">User event archive. What you've attended.</span>
                </div>
                <div class="lang-row">
                  <span class="lang-term">Field</span>
                  <span class="lang-def">Pattern layer. What your record looks like, read back to you.</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Field Sub-categories -->
          <div class="entry" id="field-subcategories">
            <div class="entry-meta">
              <span class="meta-label">Language System</span>
              <span class="meta-sep">—</span>
              <span class="meta-status">Settled</span>
            </div>
            <h3 class="entry-title" @click="copyAnchor('field-subcategories')">Field Sub-categories</h3>
            <div class="entry-body">
              <p>Within Field, five sub-categories divide the pattern layer. Each addresses a different dimension of a cultural life: recurrence, change, emergence, movement, and edge.</p>
              <div class="lang-table">
                <div class="lang-row">
                  <span class="lang-term">Affinities</span>
                  <span class="lang-def">The things you keep returning to. Recurring events, venues, themes.</span>
                </div>
                <div class="lang-row">
                  <span class="lang-term">Drift</span>
                  <span class="lang-def">How your attendance has shifted. Change over time, without judgment.</span>
                </div>
                <div class="lang-row">
                  <span class="lang-term">Signals</span>
                  <span class="lang-def">What the record is starting to suggest. Emerging patterns the system surfaces.</span>
                </div>
                <div class="lang-row">
                  <span class="lang-term">Routes</span>
                  <span class="lang-def">The paths you move through the city. Repeated movement between scenes.</span>
                </div>
                <div class="lang-row">
                  <span class="lang-term">Periphery</span>
                  <span class="lang-def">What sits at the edge of your field. Outliers that don't connect to the pattern.</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Page-Level Copy -->
          <div class="entry" id="page-level-copy">
            <div class="entry-meta">
              <span class="meta-label">Language System</span>
              <span class="meta-sep">—</span>
              <span class="meta-status">Settled</span>
            </div>
            <h3 class="entry-title" @click="copyAnchor('page-level-copy')">Page-Level Copy</h3>
            <div class="entry-body">
              <p>Each section is described in a single line. The line states what the page does — it does not sell it.</p>
              <div class="lang-table">
                <div class="lang-row">
                  <span class="lang-term">Index</span>
                  <span class="lang-def">What's on in New York.</span>
                </div>
                <div class="lang-row">
                  <span class="lang-term">Record</span>
                  <span class="lang-def">What you've attended.</span>
                </div>
                <div class="lang-row">
                  <span class="lang-term">Field</span>
                  <span class="lang-def">What your record looks like, read back to you.</span>
                </div>
                <div class="lang-row">
                  <span class="lang-term">Affinities</span>
                  <span class="lang-def">The things you keep returning to.</span>
                </div>
                <div class="lang-row">
                  <span class="lang-term">Drift</span>
                  <span class="lang-def">How your attendance has shifted.</span>
                </div>
                <div class="lang-row">
                  <span class="lang-term">Signals</span>
                  <span class="lang-def">What the record is starting to suggest.</span>
                </div>
                <div class="lang-row">
                  <span class="lang-term">Routes</span>
                  <span class="lang-def">The paths you move through the city.</span>
                </div>
                <div class="lang-row">
                  <span class="lang-term">Periphery</span>
                  <span class="lang-def">What sits at the edge of your field.</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Empty States -->
          <div class="entry" id="empty-states">
            <div class="entry-meta">
              <span class="meta-label">Language System</span>
              <span class="meta-sep">—</span>
              <span class="meta-status">Settled</span>
            </div>
            <h3 class="entry-title" @click="copyAnchor('empty-states')">Empty States</h3>
            <div class="entry-body">
              <p>Stated plainly. No apology, no encouragement, no exclamation marks. Empty states describe a condition — they do not perform concern about it.</p>
              <div class="lang-table">
                <div class="lang-row">
                  <span class="lang-term">Record — new user</span>
                  <span class="lang-def">Your record starts with the next event you attend.</span>
                </div>
                <div class="lang-row">
                  <span class="lang-term">Field — not enough data</span>
                  <span class="lang-def">Your field builds as your record does.</span>
                </div>
                <div class="lang-row">
                  <span class="lang-term">Affinities</span>
                  <span class="lang-def">Affinities take time to emerge. Keep attending.</span>
                </div>
                <div class="lang-row">
                  <span class="lang-term">Drift</span>
                  <span class="lang-def">Drift becomes visible over a longer record.</span>
                </div>
                <div class="lang-row">
                  <span class="lang-term">Signals</span>
                  <span class="lang-def">Nothing yet. Signals take time.</span>
                </div>
                <div class="lang-row">
                  <span class="lang-term">Routes</span>
                  <span class="lang-def">Routes appear once you've moved through the city a few times.</span>
                </div>
                <div class="lang-row">
                  <span class="lang-term">Periphery</span>
                  <span class="lang-def">Nothing at the edges.</span>
                </div>
                <div class="lang-row">
                  <span class="lang-term">Index — no results</span>
                  <span class="lang-def">Nothing here. Try widening the search.</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Action Language -->
          <div class="entry" id="action-language">
            <div class="entry-meta">
              <span class="meta-label">Language System</span>
              <span class="meta-sep">—</span>
              <span class="meta-status">Settled</span>
            </div>
            <h3 class="entry-title" @click="copyAnchor('action-language')">Action Language</h3>
            <div class="entry-body">
              <p>"Mark attended" is the most important call to action in the product. It should never read as "log," "check in," or "track." The act is deliberate. The word should reflect that.</p>
              <div class="lang-table">
                <div class="lang-row">
                  <span class="lang-term">Log an event</span>
                  <span class="lang-def">Mark attended</span>
                </div>
                <div class="lang-row">
                  <span class="lang-term">Remove from record</span>
                  <span class="lang-def">Remove</span>
                </div>
                <div class="lang-row">
                  <span class="lang-term">Save for later</span>
                  <span class="lang-def">Hold</span>
                </div>
                <div class="lang-row">
                  <span class="lang-term">Add to a collection</span>
                  <span class="lang-def">Collect</span>
                </div>
                <div class="lang-row">
                  <span class="lang-term">View your archive</span>
                  <span class="lang-def">Open your record</span>
                </div>
                <div class="lang-row">
                  <span class="lang-term">See your field</span>
                  <span class="lang-def">Read your field</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Pattern Language -->
          <div class="entry" id="pattern-language">
            <div class="entry-meta">
              <span class="meta-label">Language System</span>
              <span class="meta-sep">—</span>
              <span class="meta-status">Settled</span>
            </div>
            <h3 class="entry-title" @click="copyAnchor('pattern-language')">Pattern Language</h3>
            <div class="entry-body">
              <p>How the system speaks when it surfaces observations. Three rules govern all pattern copy.</p>
              <p>The system observes. It does not conclude. Never: "You love jazz." Always: "Jazz appears consistently in your record." The difference is not hedging — it is accuracy. The system reads behavior. The user decides what it means.</p>
              <p>Quantify specifically. "Seven times" is more trustworthy than "often." Numbers ground the observation and make it legible.</p>
              <p>Anchor in time. Every observation should carry a timeframe: this year, lately, over the past six months. Patterns without time are noise.</p>

              <p class="lang-section-label">Affinities</p>
              <div class="lang-example-group">
                <p class="lang-example">You've attended [Venue] nine times this year.</p>
                <p class="lang-example">[Category] appears consistently across your record.</p>
                <p class="lang-example">You tend to return to [Venue] in winter.</p>
                <p class="lang-example">You've attended [Series] every time it's appeared in your record.</p>
              </div>

              <p class="lang-section-label">Drift</p>
              <div class="lang-example-group">
                <p class="lang-example">Your record has moved toward smaller venues over the past year.</p>
                <p class="lang-example">Film has become less central to your attendance lately.</p>
                <p class="lang-example">A year ago, [Category] made up most of your record. It's a smaller part now.</p>
                <p class="lang-example">You're ranging further from [Neighborhood] than you were last year.</p>
              </div>

              <p class="lang-section-label">Signals</p>
              <div class="lang-example-group">
                <p class="lang-example">You've attended three events at [Venue] in the past month — more than usual.</p>
                <p class="lang-example">[Category] is appearing in your record with increasing frequency.</p>
                <p class="lang-example">A pattern around [Theme] is becoming visible.</p>
                <p class="lang-example">Something is shifting toward [Scene]. Worth watching.</p>
              </div>

              <p class="lang-section-label">Routes</p>
              <div class="lang-example-group">
                <p class="lang-example">You move regularly between [Neighborhood] and [Neighborhood].</p>
                <p class="lang-example">[Neighborhood A] and [Neighborhood B] appear in the same weeks, often.</p>
                <p class="lang-example">You rarely cross [boundary]. When you do, it's usually for [Category].</p>
              </div>

              <p class="lang-section-label">Periphery</p>
              <div class="lang-example-group">
                <p class="lang-example">You attended [Event Type] once. It doesn't fit the pattern.</p>
                <p class="lang-example">[Venue] appeared in your record once, last [Month]. It hasn't since.</p>
                <p class="lang-example">This sits outside your usual range. That's not a problem.</p>
              </div>
            </div>
          </div>

          <!-- Milestones -->
          <div class="entry" id="milestones">
            <div class="entry-meta">
              <span class="meta-label">Language System</span>
              <span class="meta-sep">—</span>
              <span class="meta-status">Settled</span>
            </div>
            <h3 class="entry-title" @click="copyAnchor('milestones')">Milestones</h3>
            <div class="entry-body">
              <p>Stated without ceremony. No congratulations, no confetti. Milestones are acknowledged by stating the number and making a quiet observation — nothing more.</p>
              <div class="lang-table">
                <div class="lang-row">
                  <span class="lang-term">1st event</span>
                  <span class="lang-def">Your record has started.</span>
                </div>
                <div class="lang-row">
                  <span class="lang-term">10 events</span>
                  <span class="lang-def">Ten events on record.</span>
                </div>
                <div class="lang-row">
                  <span class="lang-term">25 events</span>
                  <span class="lang-def">Your field is beginning to take shape.</span>
                </div>
                <div class="lang-row">
                  <span class="lang-term">50 events</span>
                  <span class="lang-def">Fifty events. Patterns are becoming visible.</span>
                </div>
                <div class="lang-row">
                  <span class="lang-term">100 events</span>
                  <span class="lang-def">One hundred events on record.</span>
                </div>
                <div class="lang-row">
                  <span class="lang-term">1 year</span>
                  <span class="lang-def">A year of attendance.</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Tone Principles -->
          <div class="entry" id="tone-principles">
            <div class="entry-meta">
              <span class="meta-label">Language System</span>
              <span class="meta-sep">—</span>
              <span class="meta-status">Settled</span>
            </div>
            <h3 class="entry-title" @click="copyAnchor('tone-principles')">Tone Principles</h3>
            <div class="entry-body">
              <p>Observe, don't declare. The system surfaces what's in the data. The user decides what it means.</p>
              <p>Prefer "appears" and "suggests" over "shows" and "proves." Outside is not a diagnostic tool. It reads. It does not conclude.</p>
              <p>Never tell users what they are. "You're a jazz person" is a claim the product can't make and shouldn't want to. "Jazz appears consistently in your record" is a fact.</p>
              <p>Specific is more trustworthy than vague. "Seven times this year" over "frequently." Numbers are not cold — they're honest.</p>
              <p>Restraint is the voice. If a line can be cut without losing meaning, cut it. The product's credibility comes from saying less and meaning more.</p>
              <p>Time grounds everything. Patterns without time are noise. Every observation should carry a when.</p>
            </div>
          </div>

        </section>

        <!-- ─── 05 Field Visualization ───────────────────── -->
        <section id="field-visualization">

          <div class="section-break">
            <div class="section-break-head">
              <span class="section-number">05</span>
              <h2 class="section-title">Field Visualization</h2>
            </div>
            <p class="section-desc">How the Field is shown. Visual logic.</p>
            <div class="section-rule" />
            <span class="section-ghost" aria-hidden="true">05</span>
          </div>

          <!-- The Metaphor -->
          <div class="entry" id="the-metaphor">
            <div class="entry-meta">
              <span class="meta-label">Field Visualization</span>
              <span class="meta-sep">—</span>
              <span class="meta-status">Settled</span>
            </div>
            <h3 class="entry-title" @click="copyAnchor('the-metaphor')">The Metaphor</h3>
            <div class="entry-body">
              <p>A topographic map does not explain terrain — it reveals it. Contour lines don't tell you what the land means. They show you what it is, and you read the meaning yourself.</p>
              <p>A Field map works the same way. Attendance data generates terrain. Dense attendance creates elevation. The peaks are where your cultural life concentrates most intensely. The valleys are where it doesn't reach. Routes are the paths worn between peaks. The periphery is the flat land beyond the last contour line.</p>
              <p>The map is not a summary. It is a landscape.</p>
            </div>
          </div>

          <!-- Visual Encoding -->
          <div class="entry" id="visual-encoding">
            <div class="entry-meta">
              <span class="meta-label">Field Visualization</span>
              <span class="meta-sep">—</span>
              <span class="meta-status">Settled</span>
            </div>
            <h3 class="entry-title" @click="copyAnchor('visual-encoding')">Visual Encoding</h3>
            <div class="entry-body">
              <p>Each element in the terrain corresponds to a dimension of the record. The encoding is consistent across all views of the Field.</p>
              <div class="lang-table">
                <div class="lang-row">
                  <span class="lang-term">Elevation</span>
                  <span class="lang-def">Frequency of attendance. Higher ground means more visits.</span>
                </div>
                <div class="lang-row">
                  <span class="lang-term">Contour rings</span>
                  <span class="lang-def">Density bands — 1 / 2–5 / 6–15 / 16–30 / 31+ visits.</span>
                </div>
                <div class="lang-row">
                  <span class="lang-term">Peak</span>
                  <span class="lang-def">A venue or theme you return to consistently. An Affinity.</span>
                </div>
                <div class="lang-row">
                  <span class="lang-term">Peak height</span>
                  <span class="lang-def">Total attendance count at that venue.</span>
                </div>
                <div class="lang-row">
                  <span class="lang-term">Peak proximity</span>
                  <span class="lang-def">Shared scene or cultural territory between venues.</span>
                </div>
                <div class="lang-row">
                  <span class="lang-term">Route</span>
                  <span class="lang-def">A path between two peaks attended repeatedly in the same period.</span>
                </div>
                <div class="lang-row">
                  <span class="lang-term">Route weight</span>
                  <span class="lang-def">Frequency of co-attendance.</span>
                </div>
                <div class="lang-row">
                  <span class="lang-term">Flat ground</span>
                  <span class="lang-def">Territory present in the record but without density.</span>
                </div>
                <div class="lang-row">
                  <span class="lang-term">Periphery</span>
                  <span class="lang-def">Isolated attended events with no connecting pattern.</span>
                </div>
                <div class="lang-row">
                  <span class="lang-term">Terrain change</span>
                  <span class="lang-def">Drift — peaks rising or eroding across time periods.</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Example Visualization -->
          <div class="entry" id="example-visualization">
            <div class="entry-meta">
              <span class="meta-label">Field Visualization</span>
              <span class="meta-sep">—</span>
              <span class="meta-status">Example</span>
            </div>
            <h3 class="entry-title" @click="copyAnchor('example-visualization')">Example: Field Map</h3>
            <div class="entry-body">
              <p>The following renders a sample two-year record. Three peaks of different elevations. One established route. Sparse periphery beyond the contour system.</p>
            </div>
            <div class="topo-map" aria-label="Topographic field map example">
              <div class="topo-header">
                <span class="topo-title">FIELD MAP</span>
                <span class="topo-period">2023 → 2025</span>
              </div>
              <div class="topo-body">
                <div class="topo-terrain">
                  <div class="topo-col topo-col--main">
                    <div class="topo-zone topo-zone--les">
                      <span class="topo-zone-label">LOWER EAST SIDE</span>
                      <pre class="topo-peak">· · · · · · · · · ·
· ·░░░░░░░░░░░░· · ·
· ░░░▒▒▒▒▒▒▒▒░░░ ·
·░░▒▒▒▒▓▓▓▓▒▒▒▒░░·
·░░▒▒▒▓▓████▓▓▒▒░░·
·░░▒▒▒▒▓▓▓▓▒▒▒▒░░·
· ░░░▒▒▒▒▒▒▒▒░░░ ·
· · ░░░░░░░░░░ · ·
  · · · · · · · ·</pre>
                      <div class="topo-peak-label">
                        <span class="topo-peak-marker topo-peak-marker--major">▲</span>
                        <span class="topo-peak-name">Metrograph</span>
                        <span class="topo-peak-count">41 visits</span>
                        <span class="topo-peak-tags">film · repertory · arthouse</span>
                      </div>
                    </div>
                  </div>
                  <div class="topo-col topo-col--side">
                    <div class="topo-zone topo-zone--bk">
                      <span class="topo-zone-label">RED HOOK</span>
                      <pre class="topo-peak">· · · · · · ·
· ·░░░░░░░· ·
·░░░▒▒▒▒▒░░░·
·░░▒▒▒▓▓▒▒░░·
·░░░▒▒▒▒▒░░░·
· ·░░░░░░░· ·
  · · · · · ·</pre>
                      <div class="topo-peak-label">
                        <span class="topo-peak-marker topo-peak-marker--major">▲</span>
                        <span class="topo-peak-name">Pioneer Works</span>
                        <span class="topo-peak-count">19 visits</span>
                        <span class="topo-peak-tags">sound · performance</span>
                      </div>
                    </div>
                    <div class="topo-zone topo-zone--dumbo">
                      <span class="topo-zone-label">DUMBO</span>
                      <pre class="topo-peak">· · · · · ·
· ·░░░░░· ·
· ·░░▒▒░· ·
· · ░░░ · ·
  · · · · ·</pre>
                      <div class="topo-peak-label">
                        <span class="topo-peak-marker topo-peak-marker--minor">△</span>
                        <span class="topo-peak-name">St. Ann's Warehouse</span>
                        <span class="topo-peak-count">8 visits</span>
                        <span class="topo-peak-tags">theater · dance</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="topo-route">
                  <div class="topo-route-line">
                    <span class="topo-route-dash"></span>
                  </div>
                  <span class="topo-route-label">ROUTE — Lower East Side → Red Hook · 14×</span>
                </div>

                <div class="topo-periphery">
                  <div class="topo-periphery-dots">
                    <span class="topo-dot">·</span>
                    <span class="topo-dot">·</span>
                    <span class="topo-dot">·</span>
                    <span class="topo-dot">·</span>
                  </div>
                  <span class="topo-periphery-label">◦ periphery — 1–2 visits, no pattern</span>
                </div>
              </div>
              <div class="topo-footer">
                <span class="topo-key-label">KEY</span>
                <span class="topo-key-item"><span class="topo-key-glyph">·</span> 1</span>
                <span class="topo-key-item"><span class="topo-key-glyph topo-key-glyph--1">░</span> 2–5</span>
                <span class="topo-key-item"><span class="topo-key-glyph topo-key-glyph--2">▒</span> 6–15</span>
                <span class="topo-key-item"><span class="topo-key-glyph topo-key-glyph--3">▓</span> 16–30</span>
                <span class="topo-key-item"><span class="topo-key-glyph topo-key-glyph--4">█</span> 31+</span>
                <span class="topo-key-item"><span class="topo-key-glyph">— —</span> route</span>
              </div>
            </div>
            <div class="entry-body" style="margin-top: 32px;">
              <p><em>Metrograph</em> is the dominant peak — four contour rings, the deepest record in the field. <em>Pioneer Works</em> is a substantial secondary formation, distinct in geography and cultural character. The route between them — 14 co-attended periods across two years — is the most traveled path in the field. <em>St. Ann's Warehouse</em> is smaller: returning, but not yet a dominant peak. The periphery sits beyond the contour system, unconnected.</p>
            </div>
          </div>

          <!-- Primary View -->
          <div class="entry" id="primary-view">
            <div class="entry-meta">
              <span class="meta-label">Field Visualization</span>
              <span class="meta-sep">—</span>
              <span class="meta-status">Settled</span>
            </div>
            <h3 class="entry-title" @click="copyAnchor('primary-view')">Primary View</h3>
            <div class="entry-body">
              <p>When you open Field, you see the map. No numbers on entry. No list. The terrain renders first. Peaks emerge from a dark ground. Contour rings establish elevation. Routes draw thin lines between the highest points. Peripheral dots sit at the edges, unconnected.</p>
              <p>The map has been computed from your record. It will look different in six months. Some peaks will be higher. Some will have eroded. New ground may be rising.</p>
              <p>Tap any peak to surface its data: venue name, attendance count, the date of your first visit, your last. A time slider at the bottom moves through your record chronologically, animating the terrain's formation. You can watch the map grow.</p>
            </div>
          </div>

          <!-- Sub-section Design -->
          <div class="entry" id="subsection-design">
            <div class="entry-meta">
              <span class="meta-label">Field Visualization</span>
              <span class="meta-sep">—</span>
              <span class="meta-status">Settled</span>
            </div>
            <h3 class="entry-title" @click="copyAnchor('subsection-design')">Sub-section Design</h3>
            <div class="entry-body">
              <p><em>Affinities — Your high ground.</em> The peaks, named and ranked. A list view extracted from the map: highest-elevation venues ordered by attendance. Each entry carries a one-line observation drawn from the data. Below the venue list, a secondary view shows thematic affinities — recurring categories cutting across venues, rendered as a smaller terrain.</p>
              <p><em>Drift — How the terrain has shifted.</em> A before/after comparison across two time periods — default: this year vs. last year. Two terrain views side by side. Where peaks have grown, a rising indicator. Where peaks have eroded, a subsiding indicator. New formations that didn't exist in the earlier period are marked distinctly. The terrain comparison is the primary visual; copy below it is the reading.</p>
              <p><em>Signals — New ground rising.</em> The map redraws to highlight areas where elevation has increased in the last 60–90 days — venues attended more frequently than their historical average. These are lit differently from established peaks: not yet fully formed, contour rings thinner and lighter. Signals are observations about your own behavior, surfaced before you've consciously registered them.</p>
              <p><em>Routes — The paths between peaks.</em> The terrain darkens and peaks reduce. What remains are the paths: thin lines connecting co-attended venues, line weight corresponding to frequency. A list view below names each route with a count and temporal pattern.</p>
              <p><em>Periphery — Beyond the contours.</em> The map zooms to the area beyond the last contour ring. Isolated dots, scattered, no elevation. A list names each attended event that has not generated return. Copy at the top of the section: <em>These sit outside your field's current pattern. That may change.</em></p>
            </div>
          </div>

          <!-- Rendering Notes -->
          <div class="entry" id="rendering-notes">
            <div class="entry-meta">
              <span class="meta-label">Field Visualization</span>
              <span class="meta-sep">—</span>
              <span class="meta-status">Technical</span>
            </div>
            <h3 class="entry-title" @click="copyAnchor('rendering-notes')">Rendering Notes</h3>
            <div class="entry-body">
              <p>SVG-based. Each contour ring is a closed path computed from attendance data using a kernel density function centered on the venue's geographic coordinates. The terrain builds in passes: lowest contour first, highest last.</p>
              <p>The map uses real geographic coordinates — venues are placed at their actual positions in the city. Elevation is attendance density, not physical elevation. The city grid beneath is visible as a faint underlay, present enough to orient but not to dominate.</p>
              <p>Color: a single warm tone for elevation against a dark field. Contour rings are distinguished by opacity, not hue. Routes are hairlines. The periphery uses the same marker as the lowest attendance band.</p>
              <p>Interaction is minimal. Tap a peak to surface its data. Move the time slider to watch the terrain form. The map is not a dashboard — it does not invite filtering, sorting, or rearranging. It is read, not operated.</p>
            </div>
          </div>

          <!-- Accretion: The Metaphor -->
          <div class="entry" id="accretion-metaphor">
            <div class="entry-meta">
              <span class="meta-label">Field Visualization</span>
              <span class="meta-sep">—</span>
              <span class="meta-status">Study</span>
            </div>
            <h3 class="entry-title" @click="copyAnchor('accretion-metaphor')">Accretion Layer — The Metaphor</h3>
            <div class="entry-body">
              <p>Accretion is how things become what they are through time and deposit. Stalactites form drop by drop, mineral on mineral, over centuries. Coral reefs build from successive generations of organism and sediment. Sedimentary rock is a record of everything the environment laid down, compressed into readable strata.</p>
              <p>A cultural field accretes the same way. Every attended event leaves a deposit. The deposit falls in a specific position — determined by what it was and when it happened. Over time, deposits build. Some columns grow thick. Others stay thin. Some never form at all.</p>
              <p>The accretion field shows the cross-section of your record — not as a map of where you've been, but as a geological record of what you've attended, and for how long.</p>
              <p>The topographic map shows space: where in the city does your cultural life live? The accretion field shows time: how did this field form? What was laid down first? What has been accreting steadily? What appeared recently and is still building? They are complementary views of the same record. The topographic map is the overhead view of the terrain. The accretion field is the core sample pulled from it.</p>
            </div>
          </div>

          <!-- Accretion: Visual Encoding -->
          <div class="entry" id="accretion-encoding">
            <div class="entry-meta">
              <span class="meta-label">Field Visualization</span>
              <span class="meta-sep">—</span>
              <span class="meta-status">Study</span>
            </div>
            <h3 class="entry-title" @click="copyAnchor('accretion-encoding')">Accretion Layer — Visual Encoding</h3>
            <div class="entry-body">
              <p>Each element in the cross-section corresponds to a dimension of the record. Time runs from base (oldest) to surface (now). Columns represent cultural categories. Density represents attendance volume per period.</p>
              <div class="lang-table">
                <div class="lang-row">
                  <span class="lang-term">Column</span>
                  <span class="lang-def">A cultural category — film, sound, performance, theater.</span>
                </div>
                <div class="lang-row">
                  <span class="lang-term">Column height</span>
                  <span class="lang-def">Total depth of attendance in that category.</span>
                </div>
                <div class="lang-row">
                  <span class="lang-term">Deposit density</span>
                  <span class="lang-def">Attendance volume in that time band.</span>
                </div>
                <div class="lang-row">
                  <span class="lang-term">Base</span>
                  <span class="lang-def">Oldest attendance on record.</span>
                </div>
                <div class="lang-row">
                  <span class="lang-term">Surface</span>
                  <span class="lang-def">Most recent attendance — the field as it stands now.</span>
                </div>
                <div class="lang-row">
                  <span class="lang-term">Dense upper layers</span>
                  <span class="lang-def">Active, current accumulation.</span>
                </div>
                <div class="lang-row">
                  <span class="lang-term">Dense lower layers</span>
                  <span class="lang-def">Long-established, foundational.</span>
                </div>
                <div class="lang-row">
                  <span class="lang-term">Gap in column</span>
                  <span class="lang-def">A period of dormancy in that category.</span>
                </div>
                <div class="lang-row">
                  <span class="lang-term">Thin isolated column</span>
                  <span class="lang-def">Attended rarely. Never built into a formation.</span>
                </div>
                <div class="lang-row">
                  <span class="lang-term">Surface growth rate</span>
                  <span class="lang-def">Direction of Drift — which columns are currently building.</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Accretion: Example Visualization -->
          <div class="entry" id="accretion-visualization">
            <div class="entry-meta">
              <span class="meta-label">Field Visualization</span>
              <span class="meta-sep">—</span>
              <span class="meta-status">Example</span>
            </div>
            <h3 class="entry-title" @click="copyAnchor('accretion-visualization')">Accretion Layer — Example</h3>
            <div class="entry-body">
              <p>Three active categories at different stages of formation, one dormant, four others near-absent. Time runs from base (oldest) to surface (now).</p>
            </div>
            <div class="topo-map" aria-label="Accretion field cross-section example">
              <div class="topo-header">
                <span class="topo-title">ACCRETION FIELD</span>
                <span class="topo-period">2021–2025</span>
              </div>
              <div class="topo-body">
                <div class="acc-field-wrap">
                  <div class="acc-axis">
                    <span class="acc-axis-label">now</span>
                    <span class="acc-axis-label">2025</span>
                    <span class="acc-axis-label acc-axis-label--mid">2024</span>
                    <span class="acc-axis-label acc-axis-label--mid">2023</span>
                    <span class="acc-axis-label acc-axis-label--mid">2022</span>
                    <span class="acc-axis-label acc-axis-label--old">2021</span>
                  </div>
                  <div class="acc-field">
                    <div class="acc-surface-line">
                      <span class="acc-surface-label">─ surface</span>
                    </div>
                    <pre class="acc-pre">██████  ░░░░░  ░░░   ·    ·    ·                        ·
██████  ░░░░░  ░░    ·    ·    ·                        ·
█████▓  ▒▒▒▒   ░·    ·                                  ·
█████▓  ▒▒▒▒▒  ░░    ·    ·
█████▓  ▒▒▒▒   ░     ·
████▓▓  ▒▒▒    ·     ·
▓▓▓▓▓▓  ░░░░   ·     ·    ·
▓▓▓▓▓▓  ░░░    ·
▓▓▓▓▓   ░      ·
▒▒▒▒▒▒
▒▒▒▒▒▒
▒▒▒▒▒
░░░░░░
░░░░░
·</pre>
                    <div class="acc-base-line">
                      <span class="acc-surface-label">─ base</span>
                    </div>
                  </div>
                </div>

                <div class="acc-columns">
                  <div class="acc-col-group">
                    <span class="acc-col-name">FILM</span>
                    <span class="acc-col-venues">Metrograph · Anthology · Film Arch.</span>
                  </div>
                  <div class="acc-col-group">
                    <span class="acc-col-name">SOUND</span>
                    <span class="acc-col-venues">Pioneer Works · Issue Project</span>
                  </div>
                  <div class="acc-col-group">
                    <span class="acc-col-name">PERF</span>
                    <span class="acc-col-venues">St. Ann's Warehouse</span>
                  </div>
                  <div class="acc-col-group">
                    <span class="acc-col-name">THTR</span>
                    <span class="acc-col-venues">&nbsp;</span>
                  </div>
                  <div class="acc-col-group">
                    <span class="acc-col-name">DANCE</span>
                    <span class="acc-col-venues">&nbsp;</span>
                  </div>
                  <div class="acc-col-group acc-col-group--dim">
                    <span class="acc-col-name">LECT</span>
                    <span class="acc-col-venues">&nbsp;</span>
                  </div>
                  <div class="acc-col-group acc-col-group--dim">
                    <span class="acc-col-name">VISL</span>
                    <span class="acc-col-venues">&nbsp;</span>
                  </div>
                  <div class="acc-col-group acc-col-group--dim">
                    <span class="acc-col-name">OTHER</span>
                    <span class="acc-col-venues">&nbsp;</span>
                  </div>
                </div>
              </div>
              <div class="topo-footer">
                <span class="topo-key-label">DENSITY</span>
                <span class="topo-key-item"><span class="topo-key-glyph">·</span> 1</span>
                <span class="topo-key-item"><span class="topo-key-glyph topo-key-glyph--1">░</span> 2–4</span>
                <span class="topo-key-item"><span class="topo-key-glyph topo-key-glyph--2">▒</span> 5–9</span>
                <span class="topo-key-item"><span class="topo-key-glyph topo-key-glyph--3">▓</span> 10–19</span>
                <span class="topo-key-item"><span class="topo-key-glyph topo-key-glyph--4">█</span> 20+</span>
              </div>
            </div>
            <div class="entry-body" style="margin-top: 32px;">
              <p>The film column is the foundational formation — it has been accreting since the record began. The sound column is more recent: it doesn't appear until 2023, but its growth rate in the upper layers is visible. It is building quickly toward the surface. Performance is sporadic — thin deposits appearing and disappearing across seasons, never building into a coherent formation. Theater, dance, lectures, visual art: barely present. Single marks, no continuity.</p>
              <p>The surface is the current field. The base is where it started. The distance between them is the record.</p>
            </div>
          </div>

          <!-- Accretion: Sub-sections -->
          <div class="entry" id="accretion-subsections">
            <div class="entry-meta">
              <span class="meta-label">Field Visualization</span>
              <span class="meta-sep">—</span>
              <span class="meta-status">Study</span>
            </div>
            <h3 class="entry-title" @click="copyAnchor('accretion-subsections')">Accretion Layer — Sub-section Design</h3>
            <div class="entry-body">
              <p><em>Affinities — Your deepest formations.</em> The columns with the most accumulated material. Ranked by total depth: column name, date the column opened, date of most recent deposit, and a one-line observation about whether it is currently active or dormant.</p>
              <p><em>Drift — What the surface layer shows.</em> The field redraws showing only the most recent time band. Some columns are actively receiving deposits; others have gone dormant. The surface layer is separated from the rest of the field. Below it, a faint trace of the previous band. You can see which columns are live and which are not.</p>
              <p><em>Signals — New formations appearing.</em> Columns with recent deposits in categories with little prior accumulation. The column was bare last season. Now it has two or three deposits. New formations are rendered distinctly — lighter, less settled, at the surface edge.</p>
              <p><em>Routes — Columns that accrete together.</em> Categories that consistently receive deposits in the same time band. Film and sound appearing in the same weeks, repeatedly, over two years. The co-deposit pattern shows as horizontal banding across two columns sharing the same active rows. Routes expressed as temporal co-occurrence rather than geographic movement.</p>
              <p><em>Periphery — The thin columns at the field's edge.</em> Sorted far right: all categories with only one or two deposits, never building a formation. Named, dated, present in the record but not part of the field.</p>
            </div>
          </div>

          <!-- Nautical Drift: The Metaphor -->
          <div class="entry" id="drift-metaphor">
            <div class="entry-meta">
              <span class="meta-label">Field Visualization</span>
              <span class="meta-sep">—</span>
              <span class="meta-status">Study</span>
            </div>
            <h3 class="entry-title" @click="copyAnchor('drift-metaphor')">Nautical Drift — The Metaphor</h3>
            <div class="entry-body">
              <p>A nautical drift chart doesn't show where a ship is. It shows where the current is taking it. Vectors plotted across a chart surface reveal the direction and velocity of water movement at every point in the field — a picture not of position, but of force in motion.</p>
              <p>The cultural drift chart works the same way. Your attendance record is not just a position — it is a system of forces currently in motion. Some categories are building momentum. Some are losing it. Some are stable. The drift chart makes these forces visible simultaneously, as a field of vectors, each one showing where something is moving and how fast.</p>
              <p>The topographic map answers: where is your cultural life? The accretion field answers: how did it form? The drift chart answers: where is it going?</p>
              <p>It is the only view that points toward the future rather than the past.</p>
            </div>
          </div>

          <!-- Nautical Drift: Visual Encoding -->
          <div class="entry" id="drift-encoding">
            <div class="entry-meta">
              <span class="meta-label">Field Visualization</span>
              <span class="meta-sep">—</span>
              <span class="meta-status">Study</span>
            </div>
            <h3 class="entry-title" @click="copyAnchor('drift-encoding')">Nautical Drift — Visual Encoding</h3>
            <div class="entry-body">
              <p>The chart plots a two-axis cultural space. Vectors at each point show the direction and strength of current drift. The overall pattern of vectors — laminar or turbulent, slow or fast, eastward or north — is the reading.</p>
              <div class="lang-table">
                <div class="lang-row">
                  <span class="lang-term">X-axis</span>
                  <span class="lang-def">Canonical / established → experimental / emerging.</span>
                </div>
                <div class="lang-row">
                  <span class="lang-term">Y-axis</span>
                  <span class="lang-def">Concentrated / deep → ranging / broad.</span>
                </div>
                <div class="lang-row">
                  <span class="lang-term">Vector direction</span>
                  <span class="lang-def">Where that part of the field is currently moving.</span>
                </div>
                <div class="lang-row">
                  <span class="lang-term">Vector length</span>
                  <span class="lang-def">Rate of change — how fast the drift is moving.</span>
                </div>
                <div class="lang-row">
                  <span class="lang-term">Laminar flow</span>
                  <span class="lang-def">Consistent vectors pointing the same direction — sustained, settled drift.</span>
                </div>
                <div class="lang-row">
                  <span class="lang-term">Turbulence</span>
                  <span class="lang-def">Conflicting vectors — a period of transition or reversal.</span>
                </div>
                <div class="lang-row">
                  <span class="lang-term">Still water</span>
                  <span class="lang-def">Dot with no vector — no measurable movement in that zone.</span>
                </div>
                <div class="lang-row">
                  <span class="lang-term">Current label</span>
                  <span class="lang-def">A named cultural force driving a particular vector cluster.</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Nautical Drift: Example Visualization -->
          <div class="entry" id="drift-visualization">
            <div class="entry-meta">
              <span class="meta-label">Field Visualization</span>
              <span class="meta-sep">—</span>
              <span class="meta-status">Example</span>
            </div>
            <h3 class="entry-title" @click="copyAnchor('drift-visualization')">Nautical Drift — Example</h3>
            <div class="entry-body">
              <p>A field in active eastward drift — moving toward experimental territory — with a developing northeast current in the upper quadrant. Still water in the lower-left.</p>
            </div>
            <div class="topo-map" aria-label="Nautical drift chart example">
              <div class="topo-header">
                <span class="topo-title">DRIFT CHART</span>
                <span class="topo-period">current season · 2025</span>
              </div>
              <div class="topo-body">
                <div class="drift-field-wrap">
                  <div class="drift-y-labels">
                    <span class="drift-axis-label">ranging</span>
                    <span class="drift-axis-label drift-axis-label--dim">concentrated</span>
                  </div>
                  <div class="drift-field-inner">
                    <pre class="drift-pre">·      ·      ·      ↗      ↑      ↑      ·
·      ·     ──►    ──►    ─↗    ━━↑     ↑
·     ─►    ──►    ━━►    ━━►   ━━↗      ·
·      ·     ─►    ──►    ──►     ·      ·
·      ·      ·     ─►     ─►     ·      ·
·      ·      ·      ·      ·      ·      ·</pre>
                    <div class="drift-x-labels">
                      <span class="drift-axis-label">canonical</span>
                      <span class="drift-axis-label drift-axis-label--dim">experimental</span>
                    </div>
                  </div>
                </div>

                <div class="drift-readings">
                  <p class="drift-section-head">Active currents</p>
                  <div class="drift-reading">
                    <span class="drift-reading-arrow drift-reading-arrow--strong">━━►</span>
                    <span class="drift-reading-name">Sound / experimental</span>
                    <span class="drift-reading-note">Strong eastward. The dominant current. Building for two seasons.</span>
                  </div>
                  <div class="drift-reading">
                    <span class="drift-reading-arrow drift-reading-arrow--mod">──►</span>
                    <span class="drift-reading-name">Film</span>
                    <span class="drift-reading-note">Moderate, steady. Holding established ground while expanding.</span>
                  </div>
                  <div class="drift-reading">
                    <span class="drift-reading-arrow">━━↑</span>
                    <span class="drift-reading-name">Venue scale</span>
                    <span class="drift-reading-note">Developing northward. Attendance ranging more broadly this season.</span>
                  </div>
                  <p class="drift-section-head">Still water</p>
                  <div class="drift-reading">
                    <span class="drift-reading-arrow drift-reading-arrow--still">─►</span>
                    <span class="drift-reading-name">Theater</span>
                    <span class="drift-reading-note">Minimal movement. No measurable current.</span>
                  </div>
                  <div class="drift-reading">
                    <span class="drift-reading-arrow drift-reading-arrow--still">·</span>
                    <span class="drift-reading-name">Dance, lectures, visual</span>
                    <span class="drift-reading-note">Still water. These zones are not in motion.</span>
                  </div>
                </div>
              </div>
              <div class="topo-footer">
                <span class="topo-key-label">KEY</span>
                <span class="topo-key-item"><span class="topo-key-glyph">·</span> still</span>
                <span class="topo-key-item"><span class="topo-key-glyph">─►</span> slight</span>
                <span class="topo-key-item"><span class="topo-key-glyph topo-key-glyph--2">──►</span> moderate</span>
                <span class="topo-key-item"><span class="topo-key-glyph topo-key-glyph--4">━━►</span> strong</span>
              </div>
            </div>
            <div class="entry-body" style="margin-top: 32px;">
              <p>The dominant current runs eastward through the middle of the field — toward experimental, emerging territory. It is strongest in the central zone and weakens at the edges. In the upper-right quadrant, the current bends north: as the field moves into experimental territory, it is simultaneously beginning to range more broadly. The lower-left remains still. This is a field in confident, directional motion — not scattered, not reversed, not turbulent. A single sustained current with a developing secondary flow.</p>
            </div>
          </div>

          <!-- Nautical Drift: Sub-sections -->
          <div class="entry" id="drift-subsections">
            <div class="entry-meta">
              <span class="meta-label">Field Visualization</span>
              <span class="meta-sep">—</span>
              <span class="meta-status">Study</span>
            </div>
            <h3 class="entry-title" @click="copyAnchor('drift-subsections')">Nautical Drift — Sub-section Design</h3>
            <div class="entry-body">
              <p><em>Affinities — The stable currents.</em> The vectors that have been pointing in the same direction for the longest time. These are not the strongest — they are the most consistent. A moderate current that has run east for three years is more of an Affinity than a strong current that appeared last month.</p>
              <p><em>Drift — The whole chart.</em> In the nautical view, Drift is not a sub-section — it is the primary view. The entire chart is a picture of drift. Time filters reveal how the current has changed direction over the record's history. A year ago the primary current ran south; now it runs east. That turn is Drift.</p>
              <p><em>Signals — New currents forming.</em> Vectors that have appeared recently and are strengthening rapidly. The chart highlights these with a distinct rendering: lighter, unsettled, still finding their direction. A Signal is a current that wasn't on the chart last season.</p>
              <p><em>Routes — Laminar flow between zones.</em> Where the current runs smoothly and consistently between two parts of the field — two cultural zones with aligned drift. Routes in the nautical view are corridors of steady flow rather than paths on a map.</p>
              <p><em>Periphery — Still water.</em> The zones where no vector exists. No drift. No current. Not dormant — genuinely still. The edges of the chart where the cultural field has no motion at all.</p>
            </div>
          </div>

          <!-- ─── Terrain Rendering Studies ──────────────── -->

          <!-- Study I — Contour Line -->
          <div class="entry" id="terrain-study-contour">
            <div class="entry-meta">
              <span class="meta-label">Field Visualization</span>
              <span class="meta-sep">—</span>
              <span class="meta-status">Candidate</span>
            </div>
            <h3 class="entry-title" @click="copyAnchor('terrain-study-contour')">Terrain Study I — Contour Line</h3>
            <div class="entry-body">
              <p><strong>Reference.</strong> Swiss Federal Atlas (Swisstopo), USGS topographic quadrangles. Closed curves at equal elevation intervals. Index contours drawn at increased weight every third ring. Summit marked with a solid point.</p>
              <p><strong>Advantages.</strong> Maximum clarity at any scale. Ring count communicates relative elevation without ambiguity. Immediately recognizable as a map object — no translation required.</p>
              <p><strong>Disadvantages.</strong> Conveys form, not mass. Two peaks with very different attendance can look similar if ring counts are close. Communicates shape better than weight.</p>
              <p><strong>Field support.</strong> Positions the terrain as document, not visualization. The contour line is precise, universal, and pre-digital. A Field rendered this way reads as something surveyed, not generated.</p>
            </div>
            <div class="terrain-study">
              <div class="terrain-study-header">
                <span class="terrain-study-title">TERRAIN STUDY I — CONTOUR LINE</span>
                <span class="terrain-study-period">2023 → 2025</span>
              </div>
              <div class="terrain-study-body">
                <svg class="terrain-svg" viewBox="0 0 520 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <line x1="0" y1="50"  x2="520" y2="50"  stroke="currentColor" stroke-width="0.3" opacity="0.07"/>
                  <line x1="0" y1="100" x2="520" y2="100" stroke="currentColor" stroke-width="0.3" opacity="0.07"/>
                  <line x1="0" y1="150" x2="520" y2="150" stroke="currentColor" stroke-width="0.3" opacity="0.07"/>
                  <line x1="80"  y1="0" x2="80"  y2="200" stroke="currentColor" stroke-width="0.3" opacity="0.07"/>
                  <line x1="160" y1="0" x2="160" y2="200" stroke="currentColor" stroke-width="0.3" opacity="0.07"/>
                  <line x1="240" y1="0" x2="240" y2="200" stroke="currentColor" stroke-width="0.3" opacity="0.07"/>
                  <line x1="320" y1="0" x2="320" y2="200" stroke="currentColor" stroke-width="0.3" opacity="0.07"/>
                  <line x1="400" y1="0" x2="400" y2="200" stroke="currentColor" stroke-width="0.3" opacity="0.07"/>
                  <line x1="480" y1="0" x2="480" y2="200" stroke="currentColor" stroke-width="0.3" opacity="0.07"/>
                  <path d="M 165 100 C 225 78 278 100 335 110" fill="none" stroke="currentColor" stroke-width="0.7" stroke-dasharray="3 3" opacity="0.28"/>
                  <ellipse cx="165" cy="100" rx="120" ry="62" fill="none" stroke="currentColor" stroke-width="0.4"  opacity="0.20"/>
                  <ellipse cx="165" cy="100" rx="102" ry="53" fill="none" stroke="currentColor" stroke-width="0.4"  opacity="0.28"/>
                  <ellipse cx="165" cy="100" rx="84"  ry="44" fill="none" stroke="currentColor" stroke-width="0.85" opacity="0.38"/>
                  <ellipse cx="165" cy="100" rx="67"  ry="35" fill="none" stroke="currentColor" stroke-width="0.4"  opacity="0.46"/>
                  <ellipse cx="165" cy="100" rx="51"  ry="26" fill="none" stroke="currentColor" stroke-width="0.4"  opacity="0.55"/>
                  <ellipse cx="165" cy="100" rx="36"  ry="18" fill="none" stroke="currentColor" stroke-width="0.85" opacity="0.65"/>
                  <ellipse cx="165" cy="100" rx="22"  ry="11" fill="none" stroke="currentColor" stroke-width="0.4"  opacity="0.75"/>
                  <ellipse cx="165" cy="100" rx="10"  ry="5"  fill="none" stroke="currentColor" stroke-width="0.4"  opacity="0.87"/>
                  <circle cx="165" cy="100" r="2.5" fill="currentColor" opacity="0.9"/>
                  <ellipse cx="335" cy="110" rx="76"  ry="40" fill="none" stroke="currentColor" stroke-width="0.4"  opacity="0.20"/>
                  <ellipse cx="335" cy="110" rx="60"  ry="31" fill="none" stroke="currentColor" stroke-width="0.4"  opacity="0.32"/>
                  <ellipse cx="335" cy="110" rx="45"  ry="23" fill="none" stroke="currentColor" stroke-width="0.85" opacity="0.46"/>
                  <ellipse cx="335" cy="110" rx="30"  ry="15" fill="none" stroke="currentColor" stroke-width="0.4"  opacity="0.60"/>
                  <ellipse cx="335" cy="110" rx="16"  ry="8"  fill="none" stroke="currentColor" stroke-width="0.4"  opacity="0.75"/>
                  <circle cx="335" cy="110" r="2" fill="currentColor" opacity="0.9"/>
                  <ellipse cx="460" cy="84" rx="48"   ry="26" fill="none" stroke="currentColor" stroke-width="0.4"  opacity="0.18"/>
                  <ellipse cx="460" cy="84" rx="34"   ry="18" fill="none" stroke="currentColor" stroke-width="0.4"  opacity="0.34"/>
                  <ellipse cx="460" cy="84" rx="20"   ry="10" fill="none" stroke="currentColor" stroke-width="0.4"  opacity="0.54"/>
                  <circle cx="460" cy="84" r="1.5" fill="currentColor" opacity="0.85"/>
                  <text x="165" y="88" text-anchor="middle" font-family="var(--font-mono)" font-size="7"   letter-spacing="0.08em" fill="currentColor" opacity="0.72">FILM</text>
                  <text x="335" y="98" text-anchor="middle" font-family="var(--font-mono)" font-size="6"   letter-spacing="0.07em" fill="currentColor" opacity="0.65">SOUND</text>
                  <text x="460" y="73" text-anchor="middle" font-family="var(--font-mono)" font-size="5.5" letter-spacing="0.07em" fill="currentColor" opacity="0.58">PERF.</text>
                </svg>
              </div>
              <div class="terrain-study-footer">
                <span class="terrain-study-note">Contour interval: 10 visits · Index contour (heavy): every 30 visits · ● Summit · — — Route</span>
              </div>
            </div>
          </div>

          <!-- Study II — Elevation Band -->
          <div class="entry" id="terrain-study-bands">
            <div class="entry-meta">
              <span class="meta-label">Field Visualization</span>
              <span class="meta-sep">—</span>
              <span class="meta-status">Candidate</span>
            </div>
            <h3 class="entry-title" @click="copyAnchor('terrain-study-bands')">Terrain Study II — Elevation Band</h3>
            <div class="entry-body">
              <p><strong>Reference.</strong> NOAA bathymetric charts, geological bedrock sections. Terrain expressed through filled tonal zones rather than outlines — light at the base, deepening toward the summit. No contour lines.</p>
              <p><strong>Advantages.</strong> Communicates mass and weight immediately. A dominant peak reads as visually heavier without ring-counting. More gestural, less technical.</p>
              <p><strong>Disadvantages.</strong> Loses interval precision. Exact thresholds are ambiguous without explicit lines. Territory edges dissolve into the background without outline definition.</p>
              <p><strong>Field support.</strong> The tonal gradient suggests terrain accumulated over time — like sediment. Supports the idea that attendance builds a landscape rather than fills a chart.</p>
            </div>
            <div class="terrain-study">
              <div class="terrain-study-header">
                <span class="terrain-study-title">TERRAIN STUDY II — ELEVATION BAND</span>
                <span class="terrain-study-period">2023 → 2025</span>
              </div>
              <div class="terrain-study-body">
                <svg class="terrain-svg" viewBox="0 0 520 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <ellipse cx="165" cy="100" rx="120" ry="62" fill="currentColor" opacity="0.05"/>
                  <ellipse cx="165" cy="100" rx="102" ry="53" fill="currentColor" opacity="0.05"/>
                  <ellipse cx="165" cy="100" rx="84"  ry="44" fill="currentColor" opacity="0.05"/>
                  <ellipse cx="165" cy="100" rx="67"  ry="35" fill="currentColor" opacity="0.06"/>
                  <ellipse cx="165" cy="100" rx="51"  ry="26" fill="currentColor" opacity="0.07"/>
                  <ellipse cx="165" cy="100" rx="36"  ry="18" fill="currentColor" opacity="0.09"/>
                  <ellipse cx="165" cy="100" rx="20"  ry="10" fill="currentColor" opacity="0.12"/>
                  <ellipse cx="165" cy="100" rx="120" ry="62" fill="none" stroke="currentColor" stroke-width="0.5" opacity="0.25"/>
                  <circle cx="165" cy="100" r="2.5" fill="currentColor" opacity="0.72"/>
                  <ellipse cx="335" cy="110" rx="76"  ry="40" fill="currentColor" opacity="0.05"/>
                  <ellipse cx="335" cy="110" rx="58"  ry="30" fill="currentColor" opacity="0.05"/>
                  <ellipse cx="335" cy="110" rx="40"  ry="21" fill="currentColor" opacity="0.07"/>
                  <ellipse cx="335" cy="110" rx="22"  ry="11" fill="currentColor" opacity="0.10"/>
                  <ellipse cx="335" cy="110" rx="76"  ry="40" fill="none" stroke="currentColor" stroke-width="0.5" opacity="0.22"/>
                  <circle cx="335" cy="110" r="2" fill="currentColor" opacity="0.72"/>
                  <ellipse cx="460" cy="84" rx="48"   ry="26" fill="currentColor" opacity="0.05"/>
                  <ellipse cx="460" cy="84" rx="32"   ry="17" fill="currentColor" opacity="0.07"/>
                  <ellipse cx="460" cy="84" rx="18"   ry="9"  fill="currentColor" opacity="0.10"/>
                  <ellipse cx="460" cy="84" rx="48"   ry="26" fill="none" stroke="currentColor" stroke-width="0.5" opacity="0.18"/>
                  <circle cx="460" cy="84" r="1.5" fill="currentColor" opacity="0.65"/>
                  <text x="165" y="95"  text-anchor="middle" font-family="var(--font-mono)" font-size="7"   letter-spacing="0.08em" fill="currentColor" opacity="0.75">FILM</text>
                  <text x="335" y="105" text-anchor="middle" font-family="var(--font-mono)" font-size="6"   letter-spacing="0.07em" fill="currentColor" opacity="0.68">SOUND</text>
                  <text x="460" y="79"  text-anchor="middle" font-family="var(--font-mono)" font-size="5.5" letter-spacing="0.07em" fill="currentColor" opacity="0.62">PERF.</text>
                </svg>
              </div>
              <div class="terrain-study-footer">
                <span class="terrain-study-note">7 stacked tonal bands · Edge: 5% opacity · Summit: 49% cumulative · Outer stroke defines territory boundary</span>
              </div>
            </div>
          </div>

          <!-- Study III — Stipple -->
          <div class="entry" id="terrain-study-stipple">
            <div class="entry-meta">
              <span class="meta-label">Field Visualization</span>
              <span class="meta-sep">—</span>
              <span class="meta-status">Candidate</span>
            </div>
            <h3 class="entry-title" @click="copyAnchor('terrain-study-stipple')">Terrain Study III — Stipple</h3>
            <div class="entry-body">
              <p><strong>Reference.</strong> 19th-century atlas engraving (Baedeker, early Michelin), geological survey illustration, natural history museum diagrams. Dot density represents elevation — the technique predates digital data visualization.</p>
              <p><strong>Advantages.</strong> Highly distinctive visual identity. No analogue in contemporary data visualization — reads as analog and considered. Each dot reads as an individual observation.</p>
              <p><strong>Disadvantages.</strong> Dense stipple is visually demanding. Density gradients can be subtle at small reproduction sizes and require consistent display calibration.</p>
              <p><strong>Field support.</strong> Stipple carries the weight of the archive. Each dot is an observation; the cumulative field is the record. Supports attendance as accumulation rather than summary.</p>
            </div>
            <div class="terrain-study">
              <div class="terrain-study-header">
                <span class="terrain-study-title">TERRAIN STUDY III — STIPPLE</span>
                <span class="terrain-study-period">2023 → 2025</span>
              </div>
              <div class="terrain-study-body">
                <svg class="terrain-svg" viewBox="0 0 520 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <defs>
                    <pattern id="ts3-p1" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                      <circle cx="10" cy="10" r="0.65" fill="currentColor" opacity="0.45"/>
                    </pattern>
                    <pattern id="ts3-p2" x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse">
                      <circle cx="7" cy="7" r="0.75" fill="currentColor" opacity="0.55"/>
                    </pattern>
                    <pattern id="ts3-p3" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                      <circle cx="5" cy="5" r="0.85" fill="currentColor" opacity="0.65"/>
                    </pattern>
                    <pattern id="ts3-p4" x="0" y="0" width="7" height="7" patternUnits="userSpaceOnUse">
                      <circle cx="3.5" cy="3.5" r="1.0" fill="currentColor" opacity="0.75"/>
                    </pattern>
                    <pattern id="ts3-p5" x="0" y="0" width="5" height="5" patternUnits="userSpaceOnUse">
                      <circle cx="2.5" cy="2.5" r="1.3" fill="currentColor" opacity="0.85"/>
                    </pattern>
                  </defs>
                  <ellipse cx="165" cy="100" rx="120" ry="62" fill="url(#ts3-p1)"/>
                  <ellipse cx="165" cy="100" rx="96"  ry="50" fill="url(#ts3-p2)"/>
                  <ellipse cx="165" cy="100" rx="72"  ry="37" fill="url(#ts3-p3)"/>
                  <ellipse cx="165" cy="100" rx="46"  ry="24" fill="url(#ts3-p4)"/>
                  <ellipse cx="165" cy="100" rx="22"  ry="11" fill="url(#ts3-p5)"/>
                  <circle cx="165" cy="100" r="3" fill="currentColor" opacity="0.9"/>
                  <ellipse cx="335" cy="110" rx="76"  ry="40" fill="url(#ts3-p1)"/>
                  <ellipse cx="335" cy="110" rx="57"  ry="30" fill="url(#ts3-p2)"/>
                  <ellipse cx="335" cy="110" rx="38"  ry="20" fill="url(#ts3-p3)"/>
                  <ellipse cx="335" cy="110" rx="20"  ry="10" fill="url(#ts3-p4)"/>
                  <circle cx="335" cy="110" r="2.2" fill="currentColor" opacity="0.9"/>
                  <ellipse cx="460" cy="84"  rx="48"  ry="26" fill="url(#ts3-p1)"/>
                  <ellipse cx="460" cy="84"  rx="32"  ry="17" fill="url(#ts3-p2)"/>
                  <ellipse cx="460" cy="84"  rx="16"  ry="8"  fill="url(#ts3-p3)"/>
                  <circle cx="460" cy="84" r="1.8" fill="currentColor" opacity="0.88"/>
                  <text x="165" y="28" text-anchor="middle" font-family="var(--font-mono)" font-size="7"   letter-spacing="0.08em" fill="currentColor" opacity="0.72">FILM</text>
                  <line x1="165" y1="31" x2="165" y2="38" stroke="currentColor" stroke-width="0.5" opacity="0.35"/>
                  <text x="335" y="62" text-anchor="middle" font-family="var(--font-mono)" font-size="6"   letter-spacing="0.07em" fill="currentColor" opacity="0.65">SOUND</text>
                  <line x1="335" y1="65" x2="335" y2="70" stroke="currentColor" stroke-width="0.5" opacity="0.35"/>
                  <text x="460" y="50" text-anchor="middle" font-family="var(--font-mono)" font-size="5.5" letter-spacing="0.07em" fill="currentColor" opacity="0.60">PERF.</text>
                  <line x1="460" y1="53" x2="460" y2="58" stroke="currentColor" stroke-width="0.5" opacity="0.35"/>
                </svg>
              </div>
              <div class="terrain-study-footer">
                <span class="terrain-study-note">5 density zones · Dot spacing: 5px (summit) → 20px (base) · Dot radius: 1.3 → 0.65 · ● Summit</span>
              </div>
            </div>
          </div>

          <!-- Study IV — Slope Hatching -->
          <div class="entry" id="terrain-study-hatching">
            <div class="entry-meta">
              <span class="meta-label">Field Visualization</span>
              <span class="meta-sep">—</span>
              <span class="meta-status">Candidate</span>
            </div>
            <h3 class="entry-title" @click="copyAnchor('terrain-study-hatching')">Terrain Study IV — Slope Hatching</h3>
            <div class="entry-body">
              <p><strong>Reference.</strong> Lehmann's slope hatching method (1799), historical Swiss and Austrian mountain surveys, copper-plate atlas engraving. Line density encodes slope gradient — steeper terrain carries denser hatching.</p>
              <p><strong>Advantages.</strong> Communicates gradient, not just elevation. Line direction and density imply the shape of slope. The most distinctly pre-digital of the five approaches.</p>
              <p><strong>Disadvantages.</strong> Fine lines at high density can create aliasing artifacts on screen. Density variation requires careful calibration to remain legible at smaller display sizes.</p>
              <p><strong>Field support.</strong> Positions the Field as something mapped before analytics existed as a language. The historical association places cultural activity in a tradition of careful observation — not extraction.</p>
            </div>
            <div class="terrain-study">
              <div class="terrain-study-header">
                <span class="terrain-study-title">TERRAIN STUDY IV — SLOPE HATCHING</span>
                <span class="terrain-study-period">2023 → 2025</span>
              </div>
              <div class="terrain-study-body">
                <svg class="terrain-svg" viewBox="0 0 520 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <defs>
                    <pattern id="ts4-h1" x="0" y="0" width="18" height="18" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                      <line x1="0" y1="0" x2="0" y2="18" stroke="currentColor" stroke-width="0.30" opacity="0.28"/>
                    </pattern>
                    <pattern id="ts4-h2" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                      <line x1="0" y1="0" x2="0" y2="12" stroke="currentColor" stroke-width="0.35" opacity="0.40"/>
                    </pattern>
                    <pattern id="ts4-h3" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                      <line x1="0" y1="0" x2="0" y2="8"  stroke="currentColor" stroke-width="0.45" opacity="0.55"/>
                    </pattern>
                    <pattern id="ts4-h4" x="0" y="0" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                      <line x1="0" y1="0" x2="0" y2="5"  stroke="currentColor" stroke-width="0.55" opacity="0.68"/>
                    </pattern>
                    <pattern id="ts4-h5" x="0" y="0" width="3" height="3" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                      <line x1="0" y1="0" x2="0" y2="3"  stroke="currentColor" stroke-width="0.70" opacity="0.80"/>
                    </pattern>
                  </defs>
                  <ellipse cx="165" cy="100" rx="120" ry="62" fill="url(#ts4-h1)"/>
                  <ellipse cx="165" cy="100" rx="96"  ry="50" fill="url(#ts4-h2)"/>
                  <ellipse cx="165" cy="100" rx="72"  ry="37" fill="url(#ts4-h3)"/>
                  <ellipse cx="165" cy="100" rx="46"  ry="24" fill="url(#ts4-h4)"/>
                  <ellipse cx="165" cy="100" rx="22"  ry="11" fill="url(#ts4-h5)"/>
                  <ellipse cx="165" cy="100" rx="120" ry="62" fill="none" stroke="currentColor" stroke-width="0.5" opacity="0.35"/>
                  <circle cx="165" cy="100" r="2.5" fill="currentColor" opacity="0.9"/>
                  <ellipse cx="335" cy="110" rx="76"  ry="40" fill="url(#ts4-h1)"/>
                  <ellipse cx="335" cy="110" rx="57"  ry="30" fill="url(#ts4-h2)"/>
                  <ellipse cx="335" cy="110" rx="38"  ry="20" fill="url(#ts4-h3)"/>
                  <ellipse cx="335" cy="110" rx="20"  ry="10" fill="url(#ts4-h4)"/>
                  <ellipse cx="335" cy="110" rx="76"  ry="40" fill="none" stroke="currentColor" stroke-width="0.5" opacity="0.30"/>
                  <circle cx="335" cy="110" r="2" fill="currentColor" opacity="0.9"/>
                  <ellipse cx="460" cy="84"  rx="48"  ry="26" fill="url(#ts4-h1)"/>
                  <ellipse cx="460" cy="84"  rx="32"  ry="17" fill="url(#ts4-h2)"/>
                  <ellipse cx="460" cy="84"  rx="16"  ry="8"  fill="url(#ts4-h3)"/>
                  <ellipse cx="460" cy="84"  rx="48"  ry="26" fill="none" stroke="currentColor" stroke-width="0.5" opacity="0.25"/>
                  <circle cx="460" cy="84" r="1.5" fill="currentColor" opacity="0.85"/>
                  <text x="165" y="28" text-anchor="middle" font-family="var(--font-mono)" font-size="7"   letter-spacing="0.08em" fill="currentColor" opacity="0.75">FILM</text>
                  <line x1="165" y1="31" x2="165" y2="38" stroke="currentColor" stroke-width="0.5" opacity="0.4"/>
                  <text x="335" y="62" text-anchor="middle" font-family="var(--font-mono)" font-size="6"   letter-spacing="0.07em" fill="currentColor" opacity="0.68">SOUND</text>
                  <line x1="335" y1="65" x2="335" y2="70" stroke="currentColor" stroke-width="0.5" opacity="0.38"/>
                  <text x="460" y="50" text-anchor="middle" font-family="var(--font-mono)" font-size="5.5" letter-spacing="0.07em" fill="currentColor" opacity="0.62">PERF.</text>
                  <line x1="460" y1="53" x2="460" y2="58" stroke="currentColor" stroke-width="0.5" opacity="0.35"/>
                </svg>
              </div>
              <div class="terrain-study-footer">
                <span class="terrain-study-note">Line spacing: 3px (summit) → 18px (base) · 45° diagonal · Line weight: 0.7 → 0.3 · ● Summit</span>
              </div>
            </div>
          </div>

          <!-- Study V — Labeled Isoline -->
          <div class="entry" id="terrain-study-isoline">
            <div class="entry-meta">
              <span class="meta-label">Field Visualization</span>
              <span class="meta-sep">—</span>
              <span class="meta-status">Candidate</span>
            </div>
            <h3 class="entry-title" @click="copyAnchor('terrain-study-isoline')">Terrain Study V — Labeled Isoline</h3>
            <div class="entry-body">
              <p><strong>Reference.</strong> Meteorological pressure charts (NOAA, DWD), oceanographic depth surveys, scientific journal cartography. Contour lines annotated with numeric values at breaks in the path — the most information-dense cartographic technique.</p>
              <p><strong>Advantages.</strong> The only approach where exact thresholds are immediately readable without a separate legend. Combines contour precision with direct labeling. Most explicit about the underlying data.</p>
              <p><strong>Disadvantages.</strong> Labels require careful placement to avoid obscuring terrain. At small reproduction sizes, numeric labels crowd together. The most demanding layout to maintain as data changes.</p>
              <p><strong>Field support.</strong> Positions the terrain as precise observation — a document that contains its own key. Supports the idea of the Field as exact measure, not approximate impression.</p>
            </div>
            <div class="terrain-study">
              <div class="terrain-study-header">
                <span class="terrain-study-title">TERRAIN STUDY V — LABELED ISOLINE</span>
                <span class="terrain-study-period">2023 → 2025</span>
              </div>
              <div class="terrain-study-body">
                <svg class="terrain-svg" viewBox="0 0 640 220" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <line x1="0" y1="55"  x2="640" y2="55"  stroke="currentColor" stroke-width="0.3" opacity="0.06"/>
                  <line x1="0" y1="110" x2="640" y2="110" stroke="currentColor" stroke-width="0.3" opacity="0.06"/>
                  <line x1="0" y1="165" x2="640" y2="165" stroke="currentColor" stroke-width="0.3" opacity="0.06"/>
                  <line x1="80"  y1="0" x2="80"  y2="220" stroke="currentColor" stroke-width="0.3" opacity="0.06"/>
                  <line x1="160" y1="0" x2="160" y2="220" stroke="currentColor" stroke-width="0.3" opacity="0.06"/>
                  <line x1="240" y1="0" x2="240" y2="220" stroke="currentColor" stroke-width="0.3" opacity="0.06"/>
                  <line x1="320" y1="0" x2="320" y2="220" stroke="currentColor" stroke-width="0.3" opacity="0.06"/>
                  <line x1="400" y1="0" x2="400" y2="220" stroke="currentColor" stroke-width="0.3" opacity="0.06"/>
                  <line x1="480" y1="0" x2="480" y2="220" stroke="currentColor" stroke-width="0.3" opacity="0.06"/>
                  <line x1="560" y1="0" x2="560" y2="220" stroke="currentColor" stroke-width="0.3" opacity="0.06"/>
                  <ellipse cx="155" cy="110" rx="120" ry="65" fill="currentColor" opacity="0.04"/>
                  <ellipse cx="155" cy="110" rx="96"  ry="52" fill="currentColor" opacity="0.04"/>
                  <ellipse cx="155" cy="110" rx="72"  ry="39" fill="currentColor" opacity="0.05"/>
                  <ellipse cx="155" cy="110" rx="50"  ry="27" fill="currentColor" opacity="0.06"/>
                  <ellipse cx="155" cy="110" rx="28"  ry="15" fill="currentColor" opacity="0.08"/>
                  <ellipse cx="155" cy="110" rx="120" ry="65" fill="none" stroke="currentColor" stroke-width="0.45" opacity="0.35"/>
                  <ellipse cx="155" cy="110" rx="96"  ry="52" fill="none" stroke="currentColor" stroke-width="0.45" opacity="0.42"/>
                  <ellipse cx="155" cy="110" rx="72"  ry="39" fill="none" stroke="currentColor" stroke-width="0.90" opacity="0.52"/>
                  <ellipse cx="155" cy="110" rx="50"  ry="27" fill="none" stroke="currentColor" stroke-width="0.45" opacity="0.60"/>
                  <ellipse cx="155" cy="110" rx="28"  ry="15" fill="none" stroke="currentColor" stroke-width="0.90" opacity="0.72"/>
                  <rect x="147" y="38"  width="16" height="10" style="fill: var(--color-bg)"/>
                  <text x="155" y="46"  text-anchor="middle" font-family="var(--font-mono)" font-size="6.5" fill="currentColor" opacity="0.70">10</text>
                  <rect x="147" y="51"  width="16" height="10" style="fill: var(--color-bg)"/>
                  <text x="155" y="59"  text-anchor="middle" font-family="var(--font-mono)" font-size="6.5" fill="currentColor" opacity="0.70">20</text>
                  <rect x="147" y="64"  width="16" height="10" style="fill: var(--color-bg)"/>
                  <text x="155" y="72"  text-anchor="middle" font-family="var(--font-mono)" font-size="6.5" fill="currentColor" opacity="0.72">30</text>
                  <rect x="147" y="76"  width="16" height="10" style="fill: var(--color-bg)"/>
                  <text x="155" y="84"  text-anchor="middle" font-family="var(--font-mono)" font-size="6.5" fill="currentColor" opacity="0.72">40</text>
                  <rect x="147" y="88"  width="16" height="10" style="fill: var(--color-bg)"/>
                  <text x="155" y="96"  text-anchor="middle" font-family="var(--font-mono)" font-size="6.5" fill="currentColor" opacity="0.72">50</text>
                  <circle cx="155" cy="110" r="2.5" fill="currentColor" opacity="0.88"/>
                  <ellipse cx="385" cy="115" rx="80"  ry="43" fill="currentColor" opacity="0.04"/>
                  <ellipse cx="385" cy="115" rx="60"  ry="32" fill="currentColor" opacity="0.05"/>
                  <ellipse cx="385" cy="115" rx="42"  ry="22" fill="currentColor" opacity="0.06"/>
                  <ellipse cx="385" cy="115" rx="24"  ry="13" fill="currentColor" opacity="0.08"/>
                  <ellipse cx="385" cy="115" rx="80"  ry="43" fill="none" stroke="currentColor" stroke-width="0.45" opacity="0.32"/>
                  <ellipse cx="385" cy="115" rx="60"  ry="32" fill="none" stroke="currentColor" stroke-width="0.45" opacity="0.42"/>
                  <ellipse cx="385" cy="115" rx="42"  ry="22" fill="none" stroke="currentColor" stroke-width="0.90" opacity="0.52"/>
                  <ellipse cx="385" cy="115" rx="24"  ry="13" fill="none" stroke="currentColor" stroke-width="0.45" opacity="0.62"/>
                  <rect x="461"  y="110" width="14" height="10" style="fill: var(--color-bg)"/>
                  <text x="468"  y="117" text-anchor="middle" font-family="var(--font-mono)" font-size="6.5" fill="currentColor" opacity="0.65">10</text>
                  <rect x="423"  y="110" width="14" height="10" style="fill: var(--color-bg)"/>
                  <text x="430"  y="117" text-anchor="middle" font-family="var(--font-mono)" font-size="6.5" fill="currentColor" opacity="0.67">30</text>
                  <circle cx="385" cy="115" r="2" fill="currentColor" opacity="0.88"/>
                  <ellipse cx="558" cy="92"  rx="50"  ry="28" fill="currentColor" opacity="0.04"/>
                  <ellipse cx="558" cy="92"  rx="30"  ry="16" fill="currentColor" opacity="0.06"/>
                  <ellipse cx="558" cy="92"  rx="50"  ry="28" fill="none" stroke="currentColor" stroke-width="0.45" opacity="0.28"/>
                  <ellipse cx="558" cy="92"  rx="30"  ry="16" fill="none" stroke="currentColor" stroke-width="0.45" opacity="0.45"/>
                  <circle cx="558" cy="92" r="1.5" fill="currentColor" opacity="0.82"/>
                  <text x="75"  y="18" font-family="var(--font-mono)" font-size="6.5" letter-spacing="0.08em" fill="currentColor" opacity="0.60">FILM</text>
                  <text x="314" y="18" font-family="var(--font-mono)" font-size="6.5" letter-spacing="0.08em" fill="currentColor" opacity="0.55">SOUND</text>
                  <text x="510" y="18" font-family="var(--font-mono)" font-size="6.5" letter-spacing="0.08em" fill="currentColor" opacity="0.50">PERF.</text>
                </svg>
              </div>
              <div class="terrain-study-footer">
                <div class="terrain-study-legend">
                  <span class="terrain-study-legend-item">Numeric labels: visit thresholds at contour break · Index contours (heavy line): 30 and 50 visits</span>
                  <span class="terrain-study-legend-item">Film: fully labeled · Sound: partially labeled (10, 30) · Performance: unlabeled</span>
                </div>
              </div>
            </div>
          </div>

        </section>

        <!-- ─── 06–07 Pending sections ─────────────────── -->
        <template v-for="s in SECTIONS.slice(5)" :key="s.id">
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

/* ─── Language tables ────────────────────────────────────── */
.lang-table {
  margin: 28px 0 0;
  border-top: 1px solid rgba(255, 255, 255, 0.07);
}

.lang-row {
  display: grid;
  grid-template-columns: 160px 1fr;
  gap: 24px;
  padding: 12px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  align-items: baseline;
}

.lang-term {
  font-family: var(--font-mono);
  font-size: 0.6875rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--color-text);
  opacity: 0.55;
  flex-shrink: 0;
}

.lang-def {
  font-family: var(--font-sans);
  font-size: var(--text-body);
  line-height: 1.6;
  color: var(--color-text);
  opacity: 0.7;
}

.lang-section-label {
  font-family: var(--font-mono);
  font-size: 0.6rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-text-secondary);
  opacity: 0.45;
  margin: 32px 0 12px !important;
}

.lang-example-group {
  margin-bottom: 8px;
  padding: 16px 20px;
  background: rgba(255, 255, 255, 0.02);
  border-left: 1px solid rgba(255, 255, 255, 0.07);
}

.lang-example {
  font-family: var(--font-sans);
  font-size: var(--text-meta);
  line-height: 1.7;
  color: var(--color-text-secondary);
  opacity: 0.75;
  margin: 0 0 6px !important;
  font-style: italic;
}

.lang-example:last-child {
  margin-bottom: 0 !important;
}

/* ─── Archetypes ─────────────────────────────────────────── */
.archetype {
  margin-bottom: 48px;
  padding-bottom: 48px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.archetype:last-child {
  border-bottom: none;
  padding-bottom: 0;
  margin-bottom: 0;
}

.archetype-name {
  font-family: var(--font-sans);
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: -0.01em;
  color: var(--color-text);
  margin: 0 0 10px;
}

.archetype-def {
  font-family: var(--font-sans);
  font-size: var(--text-body);
  font-style: italic;
  color: var(--color-text);
  opacity: 0.78;
  margin: 0 0 16px;
  line-height: 1.6;
}

.archetype-signals {
  list-style: none;
  padding: 0;
  margin: 0 0 16px;
}

.archetype-signals li {
  font-family: var(--font-sans);
  font-size: var(--text-meta);
  line-height: 1.65;
  color: var(--color-text-secondary);
  padding-left: 18px;
  position: relative;
  margin-bottom: 5px;
}

.archetype-signals li::before {
  content: '—';
  position: absolute;
  left: 0;
  opacity: 0.3;
}

.archetype-note {
  font-family: var(--font-sans);
  font-size: var(--text-meta);
  line-height: 1.65;
  color: var(--color-text-secondary);
  opacity: 0.8;
  margin: 0 0 8px;
}

.archetype-note:last-child {
  margin-bottom: 0;
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

/* ─── Topographic map ───────────────────────────────────── */
.topo-map {
  margin: 36px 0 0;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  overflow: hidden;
  font-family: var(--font-mono);
}

.topo-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.03);
}

.topo-title {
  font-size: 0.5rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--color-text);
  opacity: 0.5;
}

.topo-period {
  font-size: 0.5rem;
  letter-spacing: 0.1em;
  color: var(--color-text-secondary);
  opacity: 0.35;
}

.topo-body {
  padding: 28px 24px 20px;
  background: rgba(255, 255, 255, 0.01);
}

.topo-terrain {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 24px;
}

.topo-col {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.topo-zone {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.topo-zone-label {
  font-size: 0.45rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--color-text-secondary);
  opacity: 0.3;
}

.topo-peak {
  font-family: var(--font-mono);
  font-size: 0.6rem;
  line-height: 1.55;
  color: var(--color-text);
  opacity: 0.65;
  margin: 0;
  white-space: pre;
  letter-spacing: 0.05em;
}

.topo-peak-label {
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 6px;
  padding-top: 4px;
}

.topo-peak-marker {
  font-size: 0.55rem;
  color: var(--color-text);
}

.topo-peak-marker--major {
  opacity: 0.8;
}

.topo-peak-marker--minor {
  opacity: 0.45;
}

.topo-peak-name {
  font-size: 0.6rem;
  letter-spacing: 0.04em;
  color: var(--color-text);
  opacity: 0.75;
}

.topo-peak-count {
  font-size: 0.5rem;
  letter-spacing: 0.06em;
  color: var(--color-text-secondary);
  opacity: 0.45;
}

.topo-peak-tags {
  font-size: 0.48rem;
  letter-spacing: 0.05em;
  color: var(--color-text-secondary);
  opacity: 0.3;
  width: 100%;
}

.topo-route {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  margin-bottom: 16px;
}

.topo-route-line {
  flex-shrink: 0;
  width: 48px;
  height: 1px;
  background: repeating-linear-gradient(
    to right,
    rgba(255, 255, 255, 0.3) 0px,
    rgba(255, 255, 255, 0.3) 4px,
    transparent 4px,
    transparent 8px
  );
}

.topo-route-label {
  font-size: 0.48rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-text-secondary);
  opacity: 0.4;
}

.topo-periphery {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 0;
}

.topo-periphery-dots {
  display: flex;
  gap: 6px;
}

.topo-dot {
  font-family: var(--font-mono);
  font-size: 0.6rem;
  color: var(--color-text);
  opacity: 0.2;
}

.topo-periphery-label {
  font-size: 0.48rem;
  letter-spacing: 0.08em;
  color: var(--color-text-secondary);
  opacity: 0.3;
  font-style: italic;
}

.topo-footer {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 10px 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.02);
  flex-wrap: wrap;
}

.topo-key-label {
  font-size: 0.45rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--color-text-secondary);
  opacity: 0.3;
  margin-right: 4px;
}

.topo-key-item {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.48rem;
  letter-spacing: 0.06em;
  color: var(--color-text-secondary);
  opacity: 0.4;
}

.topo-key-glyph {
  font-family: var(--font-mono);
  font-size: 0.55rem;
  opacity: 0.35;
}

.topo-key-glyph--1 { opacity: 0.45; }
.topo-key-glyph--2 { opacity: 0.6; }
.topo-key-glyph--3 { opacity: 0.75; }
.topo-key-glyph--4 { opacity: 0.9; }

/* ─── Accretion field ───────────────────────────────────── */
.acc-field-wrap {
  display: flex;
  gap: 0;
  margin-bottom: 20px;
}

.acc-axis {
  display: flex;
  flex-direction: column-reverse;
  justify-content: space-between;
  padding-right: 12px;
  padding-top: 20px;
  padding-bottom: 20px;
  flex-shrink: 0;
  width: 36px;
}

.acc-axis-label {
  font-family: var(--font-mono);
  font-size: 0.45rem;
  letter-spacing: 0.08em;
  color: var(--color-text-secondary);
  opacity: 0.3;
  text-align: right;
}

.acc-axis-label--mid { opacity: 0.2; }
.acc-axis-label--old { opacity: 0.15; }

.acc-field {
  flex: 1;
  min-width: 0;
}

.acc-surface-line,
.acc-base-line {
  padding: 4px 0;
}

.acc-surface-label {
  font-family: var(--font-mono);
  font-size: 0.45rem;
  letter-spacing: 0.1em;
  color: var(--color-text-secondary);
  opacity: 0.25;
}

.acc-pre {
  font-family: var(--font-mono);
  font-size: 0.6rem;
  line-height: 1.6;
  color: var(--color-text);
  opacity: 0.62;
  margin: 0;
  white-space: pre;
  letter-spacing: 0.05em;
  overflow-x: auto;
}

.acc-columns {
  display: flex;
  gap: 0;
  padding-top: 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  margin-left: 48px;
  overflow-x: auto;
}

.acc-col-group {
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-width: 72px;
  flex-shrink: 0;
}

.acc-col-group--dim .acc-col-name {
  opacity: 0.25;
}

.acc-col-name {
  font-family: var(--font-mono);
  font-size: 0.5rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-text);
  opacity: 0.45;
}

.acc-col-venues {
  font-family: var(--font-sans);
  font-size: 0.48rem;
  line-height: 1.5;
  color: var(--color-text-secondary);
  opacity: 0.3;
}

/* ─── Nautical drift chart ──────────────────────────────── */
.drift-field-wrap {
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
}

.drift-y-labels {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 28px;
  flex-shrink: 0;
  width: 64px;
  align-items: flex-end;
}

.drift-field-inner {
  flex: 1;
  min-width: 0;
}

.drift-axis-label {
  font-family: var(--font-mono);
  font-size: 0.45rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-text-secondary);
  opacity: 0.35;
}

.drift-axis-label--dim {
  opacity: 0.18;
}

.drift-pre {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  line-height: 2;
  color: var(--color-text);
  opacity: 0.6;
  margin: 0 0 8px;
  white-space: pre;
  overflow-x: auto;
  letter-spacing: 0.1em;
}

.drift-x-labels {
  display: flex;
  justify-content: space-between;
  padding-top: 4px;
}

.drift-readings {
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.drift-section-head {
  font-family: var(--font-mono);
  font-size: 0.5rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-text-secondary);
  opacity: 0.3;
  margin: 16px 0 8px;
}

.drift-section-head:first-child {
  margin-top: 0;
}

.drift-reading {
  display: grid;
  grid-template-columns: 40px 120px 1fr;
  gap: 12px;
  align-items: baseline;
  padding: 6px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
}

.drift-reading:last-child {
  border-bottom: none;
}

.drift-reading-arrow {
  font-family: var(--font-mono);
  font-size: 0.6rem;
  letter-spacing: 0.05em;
  color: var(--color-text);
  opacity: 0.7;
  flex-shrink: 0;
}

.drift-reading-arrow--strong { opacity: 0.85; }
.drift-reading-arrow--mod    { opacity: 0.65; }
.drift-reading-arrow--still  { opacity: 0.25; }

.drift-reading-name {
  font-family: var(--font-mono);
  font-size: 0.55rem;
  letter-spacing: 0.06em;
  color: var(--color-text);
  opacity: 0.55;
}

.drift-reading-note {
  font-family: var(--font-sans);
  font-size: var(--text-meta);
  line-height: 1.5;
  color: var(--color-text-secondary);
  opacity: 0.45;
  font-style: italic;
}

/* ─── Terrain Studies (SVG-based) ────────────────────────── */
.terrain-study {
  margin-top: 36px;
  border: 1px solid var(--color-border);
  overflow: hidden;
}

.terrain-study-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  border-bottom: 1px solid var(--color-border);
}

.terrain-study-title {
  font-family: var(--font-mono);
  font-size: 0.5rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--color-text);
  opacity: 0.5;
}

.terrain-study-period {
  font-family: var(--font-mono);
  font-size: 0.5rem;
  letter-spacing: 0.10em;
  color: var(--color-text-secondary);
  opacity: 0.35;
}

.terrain-study-body {
  padding: 24px;
  overflow-x: auto;
}

.terrain-svg {
  width: 100%;
  height: auto;
  display: block;
  color: var(--color-text);
  min-width: 320px;
}

.terrain-study-footer {
  padding: 10px 16px;
  border-top: 1px solid var(--color-border);
}

.terrain-study-note {
  font-family: var(--font-mono);
  font-size: var(--text-label);
  letter-spacing: 0.06em;
  color: var(--color-text-secondary);
  opacity: 0.65;
  line-height: 1.5;
}

.terrain-study-legend {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.terrain-study-legend-item {
  font-family: var(--font-mono);
  font-size: var(--text-label);
  letter-spacing: 0.05em;
  color: var(--color-text-secondary);
  opacity: 0.65;
  line-height: 1.5;
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
  .topo-terrain {
    grid-template-columns: 1fr;
  }
  .topo-peak {
    font-size: 0.55rem;
  }
  .topo-footer {
    gap: 10px;
  }
  .acc-pre {
    font-size: 0.5rem;
  }
  .acc-columns {
    flex-wrap: wrap;
    gap: 12px;
  }
  .acc-col-group {
    min-width: 56px;
  }
  .drift-y-labels {
    display: none;
  }
  .drift-reading {
    grid-template-columns: 36px 100px 1fr;
    gap: 8px;
  }
  .drift-pre {
    font-size: 0.5rem;
    line-height: 1.8;
  }
}
</style>
