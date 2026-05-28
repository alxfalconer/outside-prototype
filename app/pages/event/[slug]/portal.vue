<script setup lang="ts">
import { formatDate } from '~/utils/format'
import type { GalleryItem } from '~/utils/gallery'

const route = useRoute()
const { getEventBySlug } = useEvents()
const { hasPass } = usePasses()

const slug = route.params.slug as string
const event = computed(() => getEventBySlug(slug))
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

const galleryPhotos = computed((): GalleryItem[] => isPast.value ? demoGalleryItems : [])

const selectedPhoto = ref<GalleryItem | null>(null)
const loadedImages  = reactive(new Set<number>())

// ─── Official recordings ──────────────────────────────
const hasRecording = computed(() => isPast.value && !!event.value)
const RECORDING_EMBED = 'https://www.youtube.com/embed/DEH2cw2ZIyM?start=1265'

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') selectedPhoto.value = null
}

onMounted(() => document.addEventListener('keydown', handleKeydown))
onUnmounted(() => document.removeEventListener('keydown', handleKeydown))
</script>

<template>
  <main v-if="event" class="page">
    <div class="page-inner">

      <!-- Back navigation -->
      <NuxtLink :to="isPast ? '/profile' : `/event/${event.slug}`" class="back-link mono">
        {{ isPast ? '← Collection' : `← ${event.title}` }}
      </NuxtLink>

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

          <!-- Gallery -->
          <div class="portal-block">
            <div class="gallery-header">
              <h3 class="block-title label">Gallery</h3>
              <span class="gallery-note mono">
                {{ isPast ? galleryPhotos.length + ' photos' : 'Photos upload via on-site QR' }}
              </span>
            </div>
            <div v-if="isPast" class="gallery-masonry">
              <button
                v-for="(item, i) in galleryPhotos"
                :key="i"
                class="gallery-masonry-item"
                @click="selectedPhoto = item"
              >
                <div class="img-skeleton" :class="{ loaded: loadedImages.has(i) }" />
                <img
                  :src="item.src"
                  :alt="'Gallery photo ' + (i + 1)"
                  loading="lazy"
                  :class="{ 'img-loaded': loadedImages.has(i) }"
                  @load="loadedImages.add(i)"
                />
                <div class="photo-overlay">
                  <span class="photo-uploader mono">{{ item.uploader }}</span>
                  <span v-if="item.comments.length" class="photo-comment-count mono">↳ {{ item.comments.length }}</span>
                </div>
              </button>
            </div>
            <div v-else class="gallery-empty">
              <span class="mono gallery-empty-text">Photos will appear here during and after the event.</span>
            </div>
          </div>

          <!-- Official Recording -->
          <template v-if="hasRecording">
            <BaseDivider />
            <div class="portal-block">
              <div class="recording-header">
                <h3 class="block-title label">Recording</h3>
                <span class="recording-official-badge label">Official</span>
              </div>

              <div class="recording-embed">
                <iframe
                  :src="RECORDING_EMBED"
                  class="recording-iframe"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                  frameborder="0"
                />
              </div>

              <div class="recording-meta mono">
                <span>Official release — authorized by venue</span>
                <span class="rmeta-dot">·</span>
                <span>Video</span>
                <span class="rmeta-dot">·</span>
                <span class="recording-not-fan">Not fan-submitted</span>
              </div>
            </div>
          </template>

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

        </template>
      </div>

    </div>

    <!-- Lightbox — kept inside main so portal.vue has a single root node (required for page transition) -->
    <Teleport to="body">
      <Transition name="lightbox">
        <div v-if="selectedPhoto" class="lightbox" @click.self="selectedPhoto = null">
          <div class="lightbox-inner">
            <div class="lightbox-image-wrap">
              <img :src="selectedPhoto.src" class="lightbox-image" alt="Gallery photo" />
            </div>
            <div class="lightbox-panel">
              <div class="lightbox-panel-header">
                <span class="lightbox-uploader mono">{{ selectedPhoto.uploader }}</span>
                <button class="lightbox-close label" @click="selectedPhoto = null">✕</button>
              </div>
              <div class="lightbox-comments">
                <div v-for="(comment, i) in selectedPhoto.comments" :key="i" class="lightbox-comment">
                  <span class="comment-author mono">{{ comment.author }}</span>
                  <p class="comment-text">{{ comment.text }}</p>
                  <span class="comment-time mono">{{ comment.time }}</span>
                </div>
                <div v-if="selectedPhoto.comments.length === 0" class="lightbox-no-comments mono">
                  No comments yet.
                </div>
              </div>
              <div class="comment-form">
                <textarea class="comment-input" placeholder="Add a comment…" rows="2" />
                <button class="comment-submit label">Post</button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
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
  color: var(--color-past);
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
  gap: var(--space-6);
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

.gallery-masonry {
  columns: 3;
  column-gap: 4px;
}

.gallery-masonry-item {
  break-inside: avoid;
  display: block;
  position: relative;
  width: 100%;
  margin-bottom: 4px;
  border: none;
  padding: 0;
  background: none;
  cursor: pointer;
  overflow: hidden;
  min-height: 120px;
}

.gallery-masonry-item img {
  width: 100%;
  height: auto;
  display: block;
  opacity: 0;
  transition: opacity 400ms ease;
}

.gallery-masonry-item img.img-loaded {
  opacity: 1;
}

.gallery-masonry-item:hover img.img-loaded {
  opacity: 0.88;
}

/* ─── Skeleton ──────────────────────────────────────── */
.img-skeleton {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    var(--color-surface) 25%,
    rgba(255, 255, 255, 0.04) 50%,
    var(--color-surface) 75%
  );
  background-size: 300% 100%;
  animation: skeleton-shimmer 1.6s ease infinite;
  transition: opacity 300ms ease;
}

.img-skeleton.loaded {
  opacity: 0;
  pointer-events: none;
}

@keyframes skeleton-shimmer {
  0%   { background-position: 100% 0; }
  100% { background-position: -100% 0; }
}

.photo-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 55%);
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: 8px;
  opacity: 0;
  transition: opacity var(--transition-fade);
}

.gallery-masonry-item:hover .photo-overlay {
  opacity: 1;
}

.photo-uploader {
  font-size: 0.5625rem;
  color: #f5f5f5;
  letter-spacing: 0.04em;
  line-height: 1;
}

.photo-comment-count {
  font-size: 0.5rem;
  color: rgba(245, 245, 245, 0.6);
  letter-spacing: 0.04em;
  line-height: 1;
}

/* ─── Lightbox transition ───────────────────────────── */
.lightbox-enter-active {
  transition: opacity 300ms var(--ease-out-quart);
}
.lightbox-leave-active {
  transition: opacity 180ms ease;
}
.lightbox-enter-from,
.lightbox-leave-to {
  opacity: 0;
}

.lightbox-enter-active .lightbox-inner {
  transition: opacity 300ms var(--ease-out-quart), transform 300ms var(--ease-out-quart);
}
.lightbox-leave-active .lightbox-inner {
  transition: opacity 180ms ease, transform 180ms ease;
}
.lightbox-enter-from .lightbox-inner {
  opacity: 0;
  transform: scale(0.97) translateY(10px);
}
.lightbox-leave-to .lightbox-inner {
  opacity: 0;
  transform: scale(0.97) translateY(6px);
}

/* ─── Lightbox ──────────────────────────────────────── */
.lightbox {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.92);
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lightbox-inner {
  display: flex;
  align-items: stretch;
  max-height: 90vh;
  background: var(--color-surface-raised);
  border: 1px solid var(--color-border);
  overflow: hidden;
}

.lightbox-image-wrap {
  flex: 0 0 auto;
  background: #060606;
}

.lightbox-image {
  display: block;
  height: auto;
  width: auto;
  max-height: 90vh;
  max-width: calc(100vw - 300px);
}

.lightbox-panel {
  width: 300px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  border-left: 1px solid var(--color-border);
  overflow: hidden;
  min-height: 0;
}

.lightbox-panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-2) var(--space-2) var(--space-2) var(--space-3);
  border-bottom: 1px solid var(--color-border);
  flex-shrink: 0;
}

.lightbox-uploader {
  font-size: var(--text-label);
  color: var(--color-text-secondary);
  letter-spacing: 0.04em;
}

.lightbox-close {
  background: none;
  border: none;
  padding: 4px 8px;
  cursor: pointer;
  color: var(--color-text-secondary);
  font-size: 0.625rem;
  letter-spacing: 0.08em;
  transition: color var(--transition-subtle);
}

.lightbox-close:hover {
  color: var(--color-text);
}

.lightbox-comments {
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  flex: 1;
}

.lightbox-comment {
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: var(--space-2) var(--space-3);
  border-bottom: 1px solid var(--color-border);
}

.comment-author {
  font-size: var(--text-label);
  color: var(--color-text);
  letter-spacing: 0.04em;
  font-weight: 700;
}

.comment-text {
  font-size: var(--text-meta);
  line-height: 1.6;
  color: var(--color-text-secondary);
}

.comment-time {
  font-size: 0.5625rem;
  color: var(--color-text-secondary);
  letter-spacing: 0.04em;
  opacity: 0.5;
}

.lightbox-no-comments {
  padding: var(--space-3);
  font-size: var(--text-label);
  color: var(--color-text-secondary);
  letter-spacing: 0.04em;
  opacity: 0.5;
}

/* ─── Comment form ──────────────────────────────────── */
.comment-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  padding: var(--space-2) var(--space-3);
  border-top: 1px solid var(--color-border);
  flex-shrink: 0;
}

.comment-input {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  color: var(--color-text);
  font-family: var(--font-sans);
  font-size: var(--text-meta);
  line-height: 1.5;
  padding: 8px 10px;
  resize: none;
  outline: none;
  transition: border-color var(--transition-subtle);
}

.comment-input::placeholder {
  color: var(--color-text-secondary);
  opacity: 0.5;
}

.comment-input:focus {
  border-color: var(--color-text-secondary);
}

.comment-submit {
  align-self: flex-end;
  background: none;
  border: 1px solid var(--color-border);
  padding: 6px 14px;
  cursor: pointer;
  color: var(--color-text-secondary);
  transition: color var(--transition-subtle), border-color var(--transition-subtle);
}

.comment-submit:hover {
  color: var(--color-text);
  border-color: var(--color-text-secondary);
}

.gallery-empty {
  padding: var(--space-5) 0;
}

.gallery-empty-text {
  font-size: var(--text-label);
  color: var(--color-text-secondary);
  letter-spacing: 0.04em;
  opacity: 0.5;
}

/* ─── Official Recording ────────────────────────────── */
.recording-header {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.recording-official-badge {
  font-size: 0.45rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-text-secondary);
  border: 1px solid var(--color-border);
  padding: 2px 6px;
  opacity: 0.7;
}

.recording-embed {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  background: #080808;
  border: 1px solid var(--color-border);
  overflow: hidden;
}

.recording-iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.recording-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 5px;
  font-size: 0.5rem;
  letter-spacing: 0.06em;
  color: var(--color-text-secondary);
  opacity: 0.55;
  padding-top: var(--space-1);
}

.rmeta-dot {
  opacity: 0.4;
  font-size: 0.4rem;
}

.recording-not-fan {
  font-style: italic;
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

  .locked-silhouette {
    grid-template-columns: 1fr;
    padding: var(--space-3);
    gap: var(--space-3);
  }

  .gallery-masonry {
    columns: 2;
  }
}

@media (max-width: 480px) {
  .gallery-masonry {
    columns: 1;
  }
}

@media (max-width: 480px) {
  .page-inner {
    padding-left: var(--space-2);
    padding-right: var(--space-2);
  }

  .gallery-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
