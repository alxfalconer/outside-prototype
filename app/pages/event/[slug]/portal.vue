<script setup lang="ts">
import { formatDate } from '~/utils/format'

const route = useRoute()
const { getEventBySlug } = useEvents()
const { hasPass } = usePasses()

const event = computed(() => getEventBySlug(route.params.slug as string))
const isAttending = computed(() => event.value ? hasPass(event.value.id) : false)
const isPast = computed(() => event.value ? new Date(event.value.date) < new Date() : false)

if (!event.value) {
  throw createError({ statusCode: 404, message: 'Event not found' })
}

const MOCK_ATTENDEES = [
  'j.walsh', 'maya.r', 'sol.b', 'nadia.k', 'felix.r',
  'c.osei', 't.park', 'alex.v', 'sarah.lm', 'dan.w',
  'priya.s', 'mo.a'
]

const THREAD_SETS: Record<string, Array<{ title: string; author: string; content: string; time: string; replies: number }>> = {
  film: [
    {
      title: 'Print condition',
      author: 'j.walsh',
      content: 'The grain structure in the interior sequences is something you simply can\'t get from digital. Remarkable that it\'s held up this well.',
      time: '2 days ago',
      replies: 4
    },
    {
      title: 'On the restoration discussion',
      author: 'maya.r',
      content: 'The programmer\'s framing of the restoration process was genuinely illuminating. Wish it had gone longer.',
      time: '3 days ago',
      replies: 2
    },
    {
      title: 'First time at this venue',
      author: 'sol.b',
      content: 'The scale of the projection and the silence in the room made it feel like an event rather than a screening.',
      time: '4 days ago',
      replies: 6
    }
  ],
  music: [
    {
      title: 'The second hour',
      author: 'felix.r',
      content: 'When it dropped into that extended section — everyone felt it. I\'ve been at a lot of shows. This is in the top five.',
      time: '1 day ago',
      replies: 8
    },
    {
      title: 'Sound mix',
      author: 'c.osei',
      content: 'Sound mix at this venue is always impeccable. Last night was no exception — the low end was felt, not just heard.',
      time: '2 days ago',
      replies: 3
    },
    {
      title: 'Looking for a recording',
      author: 'nadia.k',
      content: 'Arrived late and missed the opener but caught the full set. Anyone have a recording of the intro section?',
      time: '3 days ago',
      replies: 5
    }
  ],
  exhibition: [
    {
      title: 'On the sequencing',
      author: 't.park',
      content: 'The early pieces set up something the later ones pay off in ways you don\'t anticipate. Worth a second visit.',
      time: '2 days ago',
      replies: 5
    },
    {
      title: 'Return visit',
      author: 'alex.v',
      content: 'The light in the afternoon changes the works completely. Go back if you\'ve only seen it in the morning.',
      time: '4 days ago',
      replies: 2
    },
    {
      title: 'The catalogue essay',
      author: 'sarah.lm',
      content: 'One of the best pieces of writing I\'ve read about this kind of practice. Worth getting it at the desk.',
      time: '5 days ago',
      replies: 1
    }
  ],
  performance: [
    {
      title: 'When the earth moves',
      author: 'dan.w',
      content: 'Nothing prepares you for the moment. I\'ve seen this three times now and it still lands as if it\'s new.',
      time: '1 day ago',
      replies: 9
    },
    {
      title: 'Different from last year',
      author: 'priya.s',
      content: 'More concentrated energy in the ensemble sections, less ornamentation. The company looked sharper.',
      time: '2 days ago',
      replies: 4
    },
    {
      title: 'The curtain call',
      author: 'mo.a',
      content: 'The dirt on stage during the curtain call — no one moved to leave. The room held it for a long time.',
      time: '3 days ago',
      replies: 3
    }
  ],
  lecture: [
    {
      title: 'The Q&A',
      author: 'j.walsh',
      content: 'Her answer on visibility politics was more measured than the lecture itself — ran almost 45 minutes and was the best part.',
      time: '1 day ago',
      replies: 6
    },
    {
      title: 'Was it recorded?',
      author: 'sol.b',
      content: 'Couldn\'t make it and have been hearing about it all week. Would love a link if anyone has one.',
      time: '2 days ago',
      replies: 4
    },
    {
      title: 'Theoretical framework',
      author: 'felix.r',
      content: 'The essay she referenced is in the Sternberg reader. Worth tracking down before the next one.',
      time: '3 days ago',
      replies: 2
    }
  ]
}

const mockThreads = computed(() =>
  THREAD_SETS[event.value?.category ?? 'film'] ?? THREAD_SETS.film
)

const GALLERY_PHOTOS: Record<string, string[]> = {
  film: [
    'radial-gradient(ellipse 20% 90% at 88% 8%, #2a2214 0%, #101008 30%, #060606 100%)',
    'radial-gradient(ellipse 100% 50% at 50% 100%, #1e1a10 0%, #0c0a08 40%, #040404 100%)',
    'linear-gradient(180deg, #080808 0%, #060606 40%, #0a0808 100%)',
    'radial-gradient(ellipse 40% 55% at 48% 35%, #2c1e10 0%, #0c0808 55%, #040404 100%)',
    'linear-gradient(160deg, #080c14 0%, #060810 50%, #040408 100%)',
    'linear-gradient(180deg, #141008 0%, #0c0a06 50%, #080806 100%)',
    'radial-gradient(ellipse 70% 30% at 50% 70%, #1a1408 0%, #080808 60%, #040404 100%)',
    'linear-gradient(135deg, #060606 0%, #0a0808 100%)',
    'radial-gradient(ellipse 50% 50% at 45% 45%, #201810 0%, #0a0808 50%, #040404 100%)'
  ],
  music: [
    'radial-gradient(ellipse 80% 30% at 50% 0%, #281a04 0%, #0c0804 50%, #040404 100%)',
    'linear-gradient(180deg, #060408 0%, #040406 100%)',
    'radial-gradient(ellipse 50% 40% at 40% 30%, #1e0830 0%, #08040e 55%, #040206 100%)',
    'radial-gradient(ellipse 18% 55% at 50% 25%, #302010 0%, transparent 45%), linear-gradient(180deg, #060406 0%, #040404 100%)',
    'linear-gradient(150deg, #0c0810 0%, #100c18 35%, #060408 100%)',
    'radial-gradient(ellipse 70% 20% at 50% 80%, #200808 0%, #0c0404 50%, #040404 100%)',
    'radial-gradient(ellipse 90% 50% at 50% 60%, #180a04 0%, #080404 60%, #040404 100%)',
    'radial-gradient(ellipse 40% 60% at 60% 20%, #081808 0%, #040804 50%, #040404 100%)',
    'linear-gradient(180deg, #0e0a08 0%, #080808 100%)'
  ],
  exhibition: [
    'linear-gradient(180deg, #d8d4cc 0%, #c4c0b8 100%)',
    'radial-gradient(ellipse 60% 45% at 50% 40%, #e0dcd4 0%, #b8b4ae 100%)',
    'radial-gradient(ellipse 50% 40% at 50% 50%, #241c10 0%, #080808 60%, #040404 100%)',
    'radial-gradient(ellipse 80% 60% at 50% 70%, #ccc8c0 0%, #a8a4a0 100%)',
    'radial-gradient(ellipse 80% 50% at 50% 50%, #201810 0%, #060606 50%, #040404 100%)',
    'linear-gradient(135deg, #dcd8d2 0%, #c0bcb8 100%)',
    'linear-gradient(160deg, #d4d0c8 0%, #bab6b0 100%)',
    'linear-gradient(180deg, #c8c4bc 0%, #b0ada8 100%)',
    'linear-gradient(180deg, #0c0a08 0%, #060606 100%)'
  ],
  performance: [
    'radial-gradient(ellipse 100% 30% at 50% 100%, #201208 0%, #0c0808 50%, #040404 100%)',
    'radial-gradient(ellipse 30% 65% at 50% 30%, #2e1c08 0%, #0c0806 55%, #040404 100%)',
    'radial-gradient(ellipse 80% 40% at 50% 50%, #1c1008 0%, #0a0808 60%, #040404 100%)',
    'linear-gradient(180deg, #060408 0%, #040406 100%)',
    'radial-gradient(ellipse 40% 40% at 40% 60%, #181008 0%, #080808 60%, #040404 100%)',
    'radial-gradient(ellipse 60% 20% at 50% 0%, #241808 0%, #0c0808 40%, #040404 100%)',
    'linear-gradient(180deg, #0c0808 0%, #060606 100%)',
    'radial-gradient(ellipse 100% 50% at 50% 100%, #1a1208 0%, #0a0808 50%, #040404 100%)',
    'radial-gradient(ellipse 60% 60% at 50% 50%, #141008 0%, #060606 60%, #040404 100%)'
  ],
  lecture: [
    'radial-gradient(ellipse 40% 55% at 48% 30%, #302820 0%, #0e0c08 55%, #040404 100%)',
    'linear-gradient(180deg, #0c0a08 0%, #080808 100%)',
    'linear-gradient(180deg, #d8d4cc 0%, #b0ada8 100%)',
    'radial-gradient(ellipse 80% 30% at 50% 60%, #201a10 0%, #0a0a08 60%, #040404 100%)',
    'linear-gradient(160deg, #ccc8c0 0%, #b0ada8 100%)',
    'linear-gradient(180deg, #1c1814 0%, #0c0c0c 100%)',
    'linear-gradient(135deg, #d0ccc4 0%, #b8b4ae 100%)',
    'radial-gradient(ellipse 35% 55% at 45% 35%, #281e14 0%, #0a0808 60%, #040404 100%)',
    'radial-gradient(ellipse 70% 40% at 50% 70%, #1a1410 0%, #080808 60%, #040404 100%)'
  ]
}

const galleryPhotos = computed(() => {
  if (!event.value || !isPast.value) return []
  return GALLERY_PHOTOS[event.value.category] ?? GALLERY_PHOTOS.film
})
</script>

<template>
  <main v-if="event" class="page">
    <div class="page-inner">

      <!-- Back navigation -->
      <NuxtLink :to="`/event/${event.slug}`" class="back-link mono">← {{ event.title }}</NuxtLink>

      <!-- Event hero — matches event page layout -->
      <div class="event-body">

        <div class="event-flyer-wrap">
          <EventFlyer :event="event" :archiveMode="isPast" size="lg" />
        </div>

        <div class="event-content">

          <div class="event-title-block">
            <div class="event-title-meta">
              <span class="label event-category-label">{{ event.category }}</span>
              <span v-if="isAttending" class="label" :class="isPast ? 'attended-label' : 'attending-label'">
                {{ isPast ? 'Attended' : 'Attending' }}
              </span>
            </div>
            <h1 class="event-title">{{ event.title }}</h1>
            <p v-if="event.subtitle" class="event-subtitle mono">{{ event.subtitle }}</p>
          </div>

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

          <p class="event-description">{{ event.description }}</p>

          <div v-if="event.tags.length" class="event-tags">
            <span v-for="tag in event.tags" :key="tag" class="tag mono">{{ tag }}</span>
          </div>

        </div>
      </div>

      <!-- Portal section — unlocked below event content -->
      <div class="portal-section">
        <div class="portal-rule" />
        <div class="portal-header">
          <div class="portal-header-left">
            <h2 class="portal-label label">Portal</h2>
            <p class="portal-status mono">
              {{ isAttending ? 'Unlocked.' : 'Ticket holders only.' }}
            </p>
          </div>
        </div>

        <!-- Locked gate -->
        <div v-if="!isAttending" class="locked-gate">
          <p class="locked-text mono">This portal is only accessible to ticket holders.</p>
          <NuxtLink :to="`/event/${event.slug}`" class="locked-cta label">
            Purchase a ticket →
          </NuxtLink>
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

          <!-- Threads -->
          <div class="portal-block">
            <h3 class="block-title label">
              Threads <span class="count mono">{{ mockThreads.length }}</span>
            </h3>
            <div class="threads-list">
              <article v-for="(thread, i) in mockThreads" :key="i" class="thread">
                <h4 class="thread-title">{{ thread.title }}</h4>
                <div class="thread-byline mono">
                  <span class="thread-author">{{ thread.author }}</span>
                  <span class="byline-dot">·</span>
                  <span>{{ thread.time }}</span>
                </div>
                <p class="thread-body">{{ thread.content }}</p>
                <span class="thread-replies mono">↳ {{ thread.replies }} {{ thread.replies === 1 ? 'reply' : 'replies' }}</span>
              </article>
            </div>
          </div>

          <BaseDivider />

          <!-- Attendees -->
          <div class="portal-block">
            <h3 class="block-title label">
              {{ isPast ? 'Attendees' : 'Attending' }} <span class="count mono">{{ MOCK_ATTENDEES.length }}</span>
            </h3>
            <div class="attendee-list">
              <span v-for="name in MOCK_ATTENDEES" :key="name" class="attendee mono">{{ name }}</span>
            </div>
          </div>

          <BaseDivider />

          <!-- Gallery -->
          <div class="portal-block">
            <div class="gallery-header">
              <h3 class="block-title label">Gallery</h3>
              <span class="gallery-note mono">
                {{ isPast ? galleryPhotos.length + ' photos' : 'Photos upload via on-site QR' }}
              </span>
            </div>
            <div v-if="isPast" class="gallery-grid">
              <div
                v-for="(photo, i) in galleryPhotos"
                :key="i"
                class="gallery-photo"
                :style="{ background: photo }"
              />
            </div>
            <div v-else class="gallery-empty">
              <span class="mono gallery-empty-text">Photos will appear here during and after the event.</span>
            </div>
          </div>

        </template>
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

/* ─── Back link ─────────────────────────────────────── */
.back-link {
  font-size: var(--text-label);
  color: var(--color-text-secondary);
  letter-spacing: 0.04em;
  transition: color var(--transition-subtle);
  align-self: flex-start;
}

.back-link:hover {
  color: var(--color-text);
}

/* ─── Event hero — mirrors event page ───────────────── */
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

.attending-label {
  color: var(--color-accent);
}

.attended-label {
  color: var(--color-text-secondary);
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

/* ─── Description + tags ────────────────────────────── */
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

/* ─── Portal section ────────────────────────────────── */
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

/* ─── Locked gate ───────────────────────────────────── */
.locked-gate {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
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
  margin-top: var(--space-2);
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
}

.sil-photo {
  aspect-ratio: 1;
  background: var(--color-border);
}

/* ─── Portal blocks ─────────────────────────────────── */
.portal-block {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.block-title {
  color: var(--color-text);
  display: flex;
  align-items: center;
  gap: var(--space-1);
}

.count {
  font-size: var(--text-label);
  color: var(--color-text-secondary);
}

/* ─── Threads ───────────────────────────────────────── */
.threads-list {
  display: flex;
  flex-direction: column;
}

.thread {
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: var(--space-3) 0;
  border-top: 1px solid var(--color-border);
}

.thread-title {
  font-size: var(--text-body);
  font-weight: 500;
  color: var(--color-text);
  line-height: 1.3;
}

.thread-byline {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: var(--text-label);
  color: var(--color-text-secondary);
  letter-spacing: 0.04em;
  opacity: 0.6;
}

.byline-dot {
  opacity: 0.5;
  font-size: 0.5rem;
  align-self: center;
}

.thread-body {
  font-size: var(--text-body);
  line-height: 1.7;
  color: var(--color-text-secondary);
  max-width: 60ch;
  margin-top: 2px;
}

.thread-replies {
  font-size: var(--text-label);
  color: var(--color-text-secondary);
  letter-spacing: 0.04em;
  opacity: 0.5;
  margin-top: 2px;
}

/* ─── Attendees ─────────────────────────────────────── */
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

/* ─── Gallery ───────────────────────────────────────── */
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

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3px;
}

.gallery-photo {
  aspect-ratio: 1;
  position: relative;
}

.gallery-photo::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 180px 180px;
  opacity: 0.1;
  mix-blend-mode: overlay;
  pointer-events: none;
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

/* ─── Responsive ────────────────────────────────────── */
@media (max-width: 768px) {
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
