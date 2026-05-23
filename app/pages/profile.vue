<script setup lang="ts">
import { formatDate } from '~/utils/format'
import type { GalleryItem } from '~/utils/gallery'

const { passes } = usePasses()
const { getEventById } = useEvents()

const activeTab = ref<'upcoming' | 'archive' | 'media'>('upcoming')

const userProfile = reactive({
  username: 'a.falconer',
  displayName: 'Alex Falconer',
  bio: 'Designer and writer based in New York. Interested in film, contemporary performance, and the architecture of cities. Attending since 2025.',
  website: 'www.falconer.work',
  joinedDate: 'March 2025',
  avatarSrc: '/my-raccoon.webp',
})

// ─── Edit modal ───────────────────────────────────────
const editOpen    = ref(false)
const editBio     = ref('')
const editWebsite = ref('')
const editAvatar  = ref('')
const avatarInput = ref<HTMLInputElement | null>(null)

function openEdit() {
  editBio.value     = userProfile.bio
  editWebsite.value = userProfile.website
  editAvatar.value  = userProfile.avatarSrc
  editOpen.value    = true
}

function handleAvatarChange(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return
  editAvatar.value = URL.createObjectURL(file)
}

function saveEdit() {
  userProfile.bio       = editBio.value
  userProfile.website   = editWebsite.value
  userProfile.avatarSrc = editAvatar.value
  editOpen.value        = false
}

function closeEdit() {
  editOpen.value = false
}

const now = new Date()

const upcomingPasses = computed(() =>
  [...passes.value]
    .filter(p => new Date(p.date) >= now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
)

const pastPasses = computed(() =>
  [...passes.value]
    .filter(p => new Date(p.date) < now)
    .sort((a, b) => new Date(b.collectedAt).getTime() - new Date(a.collectedAt).getTime())
)

// Stats derived from past attendance only
const attendedCount = computed(() => pastPasses.value.length)
const stats = computed(() => {
  const ps = pastPasses.value
  if (ps.length === 0) return null
  const venueCounts: Record<string, number> = {}
  const cityCounts: Record<string, number> = {}
  for (const p of ps) {
    venueCounts[p.venue] = (venueCounts[p.venue] ?? 0) + 1
    cityCounts[p.city] = (cityCounts[p.city] ?? 0) + 1
  }
  return {
    topVenue: Object.entries(venueCounts).sort((a, b) => b[1] - a[1])[0]?.[0],
    topCity: Object.entries(cityCounts).sort((a, b) => b[1] - a[1])[0]?.[0]
  }
})

// Recent strip — 5 most recently collected, any status
const recentPasses = computed(() =>
  [...passes.value]
    .sort((a, b) => new Date(b.collectedAt).getTime() - new Date(a.collectedAt).getTime())
    .slice(0, 5)
)

// ─── Media ────────────────────────────────────────────
const selectedMedia = ref<GalleryItem | null>(null)

function handleMediaKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') selectedMedia.value = null
}

onMounted(() => document.addEventListener('keydown', handleMediaKeydown))
onUnmounted(() => document.removeEventListener('keydown', handleMediaKeydown))
</script>

<template>
  <main class="page">
    <div class="page-inner">

      <!-- Profile header -->
      <div class="profile-head">
        <div class="profile-identity">
          <img :src="userProfile.avatarSrc" alt="" class="profile-avatar" />
          <div class="profile-info">
            <h1 class="profile-name">{{ userProfile.displayName }}</h1>
            <p class="profile-username mono">{{ userProfile.username }}</p>
            <p v-if="userProfile.bio" class="profile-bio">{{ userProfile.bio }}</p>
            <a v-if="userProfile.website" :href="`https://${userProfile.website}`" target="_blank" rel="noopener" class="profile-website mono">{{ userProfile.website }}<span class="profile-website-icon">↗</span></a>
          </div>
        </div>

        <!-- Observational stats — derived, not gamified -->
        <div class="profile-stats">
          <button class="edit-profile-btn label" @click="openEdit">Edit Profile</button>
          <div class="stat">
            <span class="stat-label label">Joined</span>
            <span class="stat-value mono">{{ userProfile.joinedDate }}</span>
          </div>
          <div class="stat">
            <span class="stat-label label">Upcoming</span>
            <span class="stat-value mono">{{ upcomingPasses.length }} {{ upcomingPasses.length === 1 ? 'event' : 'events' }}</span>
          </div>
          <div class="stat">
            <span class="stat-label label">Attended</span>
            <span class="stat-value mono">{{ attendedCount }} {{ attendedCount === 1 ? 'event' : 'events' }}</span>
          </div>
          <template v-if="stats">
            <div class="stat">
              <span class="stat-label label">Top venue</span>
              <span class="stat-value mono">{{ stats.topVenue }}</span>
            </div>
          </template>
        </div>
      </div>

      <BaseDivider />

      <!-- Tab bar -->
      <div class="tab-bar">
        <button class="tab label" :class="{ active: activeTab === 'upcoming' }" @click="activeTab = 'upcoming'">
          Upcoming
        </button>
        <button class="tab label" :class="{ active: activeTab === 'archive' }" @click="activeTab = 'archive'">
          Attended
        </button>
        <button class="tab label" :class="{ active: activeTab === 'media' }" @click="activeTab = 'media'">
          Media
        </button>
      </div>

      <!-- Upcoming tab -->
      <template v-if="activeTab === 'upcoming'">
        <div v-if="upcomingPasses.length === 0" class="empty-archive">
          <p class="empty-text mono">No upcoming events.</p>
          <NuxtLink to="/" class="empty-link label">Browse events →</NuxtLink>
        </div>
        <div v-else class="passes-grid passes-grid--upcoming">
          <NuxtLink
            v-for="pass in upcomingPasses"
            :key="pass.id"
            :to="getEventById(pass.eventId) ? `/event/${getEventById(pass.eventId)!.slug}/portal` : '/'"
            class="pass-link"
          >
            <PassArtifact :pass="pass" :archiveMode="false" />
          </NuxtLink>
        </div>
      </template>

      <!-- Archive tab -->
      <template v-else-if="activeTab === 'archive'">
        <div v-if="pastPasses.length === 0" class="empty-archive">
          <p class="empty-text mono">No events attended yet.</p>
          <NuxtLink to="/" class="empty-link label">Browse events →</NuxtLink>
        </div>
        <div v-else class="passes-grid">
          <NuxtLink
            v-for="pass in pastPasses"
            :key="pass.id"
            :to="getEventById(pass.eventId) ? `/event/${getEventById(pass.eventId)!.slug}/portal` : '/'"
            class="pass-link"
          >
            <PassArtifact :pass="pass" :archiveMode="true" />
          </NuxtLink>
        </div>
        <p v-if="pastPasses.length > 0 && pastPasses.length < 5" class="archive-note mono">
          Your archive grows with every event attended.
        </p>
      </template>

      <!-- Media tab -->
      <template v-else>
        <div class="media-masonry">
          <button
            v-for="(item, i) in demoGalleryItems"
            :key="i"
            class="media-masonry-item"
            @click="selectedMedia = item"
          >
            <img :src="item.src" :alt="'Photo ' + (i + 1)" loading="lazy" />
            <div class="media-overlay">
              <span class="media-uploader mono">{{ item.uploader }}</span>
              <span v-if="item.comments.length" class="media-comment-count mono">↳ {{ item.comments.length }}</span>
            </div>
          </button>
        </div>
      </template>

    </div>

    <!-- Media lightbox -->
    <Teleport to="body">
      <Transition name="media-lightbox">
        <div v-if="selectedMedia" class="media-lightbox" @click.self="selectedMedia = null">
          <div class="media-lightbox-inner">
            <div class="media-lightbox-image-wrap">
              <img :src="selectedMedia.src" class="media-lightbox-image" alt="Photo" />
            </div>
            <div class="media-lightbox-panel">
              <div class="media-lightbox-header">
                <span class="media-lightbox-uploader mono">{{ selectedMedia.uploader }}</span>
                <button class="media-lightbox-close label" @click="selectedMedia = null">✕</button>
              </div>
              <div class="media-lightbox-comments">
                <div v-for="(comment, i) in selectedMedia.comments" :key="i" class="media-lightbox-comment">
                  <span class="mlc-author mono">{{ comment.author }}</span>
                  <p class="mlc-text">{{ comment.text }}</p>
                  <span class="mlc-time mono">{{ comment.time }}</span>
                </div>
                <div v-if="selectedMedia.comments.length === 0" class="mlc-empty mono">No comments yet.</div>
              </div>
              <div class="media-comment-form">
                <textarea class="media-comment-input" placeholder="Add a comment…" rows="2" />
                <button class="media-comment-submit label">Post</button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Edit profile modal -->
    <Teleport to="body">
    <Transition name="modal-fade">
      <div v-if="editOpen" class="modal-backdrop" @click.self="closeEdit">
        <div class="modal">
          <div class="modal-header">
            <span class="modal-title label">Edit Profile</span>
            <button class="modal-close" @click="closeEdit">×</button>
          </div>

          <div class="modal-body">
            <!-- Avatar -->
            <div class="modal-field">
              <span class="modal-label label">Photo</span>
              <div class="avatar-edit" @click="avatarInput?.click()">
                <img :src="editAvatar" alt="" class="avatar-preview" />
                <span class="avatar-edit-hint label">Change</span>
              </div>
              <input
                ref="avatarInput"
                type="file"
                accept="image/*"
                class="avatar-file-input"
                @change="handleAvatarChange"
              />
            </div>

            <!-- Bio -->
            <div class="modal-field">
              <label class="modal-label label" for="edit-bio">Bio</label>
              <textarea
                id="edit-bio"
                v-model="editBio"
                class="modal-textarea"
                rows="4"
                spellcheck="false"
              />
            </div>

            <!-- Website -->
            <div class="modal-field">
              <label class="modal-label label" for="edit-website">Website</label>
              <input
                id="edit-website"
                v-model="editWebsite"
                type="text"
                class="modal-input"
                spellcheck="false"
              />
            </div>
          </div>

          <div class="modal-footer">
            <button class="modal-cancel label" @click="closeEdit">Cancel</button>
            <button class="modal-save label" @click="saveEdit">Save</button>
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
  padding: var(--space-5) var(--column-padding) var(--space-7);
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

/* ─── Profile head ──────────────────────────────────── */
.profile-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--space-4);
}

.profile-identity {
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
}

.profile-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  object-position: center 30%;
  flex-shrink: 0;
  display: block;
  border: 1px solid var(--color-border);
  transform: scale(1.35);
}

.profile-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.profile-name {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 400;
  letter-spacing: -0.01em;
  line-height: 1.05;
}

.profile-username {
  color: var(--color-text-secondary);
  font-size: var(--text-meta);
}

.profile-bio {
  color: #b8b8b8;
  font-size: 0.8125rem;
  line-height: 1.6;
  max-width: 44ch;
  margin-top: 14px;
}

.profile-website {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin-top: 14px;
  font-size: var(--text-label);
  color: var(--color-text);
  letter-spacing: 0.02em;
  transition: opacity var(--transition-subtle);
}

.profile-website:hover {
  opacity: 0.7;
}

.profile-website-icon {
  font-size: 0.6rem;
  opacity: 0.6;
}

/* ─── Stats ─────────────────────────────────────────── */
.profile-stats {
  display: flex;
  flex-direction: column;
  gap: 8px;
  text-align: right;
}

.edit-profile-btn {
  background: none;
  border: 1px solid var(--color-border);
  padding: 4px 9px;
  cursor: pointer;
  color: var(--color-text-secondary);
  font-size: 0.5rem;
  align-self: flex-end;
  transition: border-color var(--transition-subtle), color var(--transition-subtle);
  margin-bottom: var(--space-3);
}

.edit-profile-btn:hover {
  border-color: var(--color-text-secondary);
  color: var(--color-text);
}

.stat {
  display: flex;
  align-items: baseline;
  gap: var(--space-2);
  justify-content: flex-end;
}

.stat-label {
  color: var(--color-text-secondary);
}

.stat-value {
  font-size: var(--text-label);
  color: var(--color-text);
  letter-spacing: 0.04em;
}

/* ─── Attendance strip ──────────────────────────────── */
.attendance-strip {
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
}

.strip-label {
  padding-top: 4px;
  flex-shrink: 0;
  width: 48px;
}

.strip-items {
  display: flex;
  gap: var(--space-1);
  overflow-x: auto;
  flex: 1;
}

.strip-item {
  width: 56px;
  flex-shrink: 0;
}

/* ─── Tabs ──────────────────────────────────────────── */
.tab-bar {
  display: flex;
  gap: var(--space-3);
}

.tab {
  background: none;
  border: none;
  padding: 0 0 6px;
  cursor: pointer;
  color: var(--color-text-secondary);
  transition: color var(--transition-subtle);
  border-bottom: 1px solid transparent;
}

.tab:hover,
.tab.active {
  color: var(--color-text);
}

.tab.active {
  border-bottom-color: var(--color-text);
}

/* ─── Passes grid ───────────────────────────────────── */
.passes-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-3);
}

.pass-link {
  display: block;
  text-decoration: none;
  cursor: pointer;
  transition: opacity var(--transition-subtle);
}

.pass-link:hover {
  opacity: 0.8;
}

/* Slight rotation variance — archive only, accumulated artifact feeling */
.passes-grid:not(.passes-grid--upcoming) .pass-link:nth-child(4n+1) { transform: rotate(0.4deg); }
.passes-grid:not(.passes-grid--upcoming) .pass-link:nth-child(4n+2) { transform: rotate(-0.5deg); }
.passes-grid:not(.passes-grid--upcoming) .pass-link:nth-child(4n+3) { transform: rotate(0.3deg); }
.passes-grid:not(.passes-grid--upcoming) .pass-link:nth-child(4n)   { transform: rotate(-0.2deg); }

/* ─── Archive note ──────────────────────────────────── */
.archive-note {
  font-size: var(--text-label);
  color: var(--color-text-secondary);
  opacity: 0.4;
  letter-spacing: 0.03em;
  padding-top: var(--space-3);
}

/* ─── Empty / placeholder states ───────────────────── */
.empty-archive {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  padding: var(--space-5) 0;
}

.empty-text {
  font-size: var(--text-label);
  color: var(--color-text-secondary);
  letter-spacing: 0.04em;
}

.empty-link {
  color: var(--color-text-secondary);
  transition: color var(--transition-subtle);
  align-self: flex-start;
}

.empty-link:hover {
  color: var(--color-text);
}

/* ─── Media masonry ─────────────────────────────────── */
.media-masonry {
  columns: 3;
  column-gap: 4px;
}

.media-masonry-item {
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
}

.media-masonry-item img {
  width: 100%;
  height: auto;
  display: block;
  transition: opacity var(--transition-subtle);
}

.media-masonry-item:hover img {
  opacity: 0.88;
}

.media-overlay {
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

.media-masonry-item:hover .media-overlay {
  opacity: 1;
}

.media-uploader {
  font-size: 0.5625rem;
  color: #f5f5f5;
  letter-spacing: 0.04em;
  line-height: 1;
}

.media-comment-count {
  font-size: 0.5rem;
  color: rgba(245, 245, 245, 0.6);
  letter-spacing: 0.04em;
  line-height: 1;
}

/* ─── Media lightbox ────────────────────────────────── */
.media-lightbox-enter-active {
  transition: opacity 300ms var(--ease-out-quart);
}
.media-lightbox-leave-active {
  transition: opacity 180ms ease;
}
.media-lightbox-enter-from,
.media-lightbox-leave-to {
  opacity: 0;
}

.media-lightbox-enter-active .media-lightbox-inner {
  transition: opacity 300ms var(--ease-out-quart), transform 300ms var(--ease-out-quart);
}
.media-lightbox-leave-active .media-lightbox-inner {
  transition: opacity 180ms ease, transform 180ms ease;
}
.media-lightbox-enter-from .media-lightbox-inner {
  opacity: 0;
  transform: scale(0.97) translateY(10px);
}
.media-lightbox-leave-to .media-lightbox-inner {
  opacity: 0;
  transform: scale(0.97) translateY(6px);
}

.media-lightbox {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.92);
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
}

.media-lightbox-inner {
  display: flex;
  align-items: stretch;
  max-height: 90vh;
  background: var(--color-surface-raised);
  border: 1px solid var(--color-border);
  overflow: hidden;
}

.media-lightbox-image-wrap {
  flex: 0 0 auto;
  background: #060606;
}

.media-lightbox-image {
  display: block;
  height: auto;
  width: auto;
  max-height: 90vh;
  max-width: calc(100vw - 300px);
}

.media-lightbox-panel {
  width: 300px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  border-left: 1px solid var(--color-border);
  overflow: hidden;
  min-height: 0;
}

.media-lightbox-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-2) var(--space-2) var(--space-2) var(--space-3);
  border-bottom: 1px solid var(--color-border);
  flex-shrink: 0;
}

.media-lightbox-uploader {
  font-size: var(--text-label);
  color: var(--color-text-secondary);
  letter-spacing: 0.04em;
}

.media-lightbox-close {
  background: none;
  border: none;
  padding: 4px 8px;
  cursor: pointer;
  color: var(--color-text-secondary);
  font-size: 0.625rem;
  letter-spacing: 0.08em;
  transition: color var(--transition-subtle);
}

.media-lightbox-close:hover {
  color: var(--color-text);
}

.media-lightbox-comments {
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  flex: 1;
}

.media-lightbox-comment {
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: var(--space-2) var(--space-3);
  border-bottom: 1px solid var(--color-border);
}

.mlc-author {
  font-size: var(--text-label);
  color: var(--color-text);
  letter-spacing: 0.04em;
  font-weight: 700;
}

.mlc-text {
  font-size: var(--text-meta);
  line-height: 1.6;
  color: var(--color-text-secondary);
}

.mlc-time {
  font-size: 0.5625rem;
  color: var(--color-text-secondary);
  letter-spacing: 0.04em;
  opacity: 0.5;
}

.mlc-empty {
  padding: var(--space-3);
  font-size: var(--text-label);
  color: var(--color-text-secondary);
  letter-spacing: 0.04em;
  opacity: 0.5;
}

.media-comment-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  padding: var(--space-2) var(--space-3);
  border-top: 1px solid var(--color-border);
  flex-shrink: 0;
}

.media-comment-input {
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

.media-comment-input::placeholder {
  color: var(--color-text-secondary);
  opacity: 0.5;
}

.media-comment-input:focus {
  border-color: var(--color-text-secondary);
}

.media-comment-submit {
  align-self: flex-end;
  background: none;
  border: 1px solid var(--color-border);
  padding: 6px 14px;
  cursor: pointer;
  color: var(--color-text-secondary);
  transition: color var(--transition-subtle), border-color var(--transition-subtle);
}

.media-comment-submit:hover {
  color: var(--color-text);
  border-color: var(--color-text-secondary);
}

/* ─── Responsive ────────────────────────────────────── */
@media (max-width: 640px) {
  .page-inner {
    padding: var(--space-4) var(--column-padding) var(--space-6);
    gap: var(--space-3);
  }

  .profile-head {
    flex-direction: column;
  }

  .profile-stats {
    text-align: left;
    align-items: flex-start;
    flex-direction: row;
    flex-wrap: wrap;
    gap: var(--space-3);
  }

  .stat {
    justify-content: flex-start;
  }

  .passes-grid {
    grid-template-columns: 1fr;
  }

  .tab-bar {
    gap: var(--space-2);
  }
}

@media (max-width: 480px) {
  .page-inner {
    padding-left: var(--space-2);
    padding-right: var(--space-2);
  }
}

/* ─── Edit modal ─────────────────────────────────────── */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-4);
}

.modal {
  background: var(--color-surface-raised);
  border: 1px solid var(--color-border);
  width: min(420px, 100%);
  display: flex;
  flex-direction: column;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-3) var(--space-4);
  border-bottom: 1px solid var(--color-border);
}

.modal-title {
  color: var(--color-text-secondary);
  font-size: var(--text-label);
}

.modal-close {
  background: none;
  border: none;
  color: var(--color-text-secondary);
  cursor: pointer;
  font-size: 1rem;
  line-height: 1;
  padding: 0;
  transition: color var(--transition-subtle);
}

.modal-close:hover {
  color: var(--color-text);
}

.modal-body {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  padding: var(--space-4);
}

.modal-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.modal-label {
  font-size: 0.5rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-text-secondary);
}

.modal-input,
.modal-textarea {
  background: transparent;
  border: none;
  border-bottom: 1px solid var(--color-border);
  padding: 6px 0;
  font-family: var(--font-mono);
  font-size: var(--text-label);
  letter-spacing: 0.02em;
  color: var(--color-text);
  outline: none;
  transition: border-color var(--transition-subtle);
  resize: none;
  width: 100%;
}

.modal-input:focus,
.modal-textarea:focus {
  border-bottom-color: var(--color-text-secondary);
}

.avatar-edit {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  cursor: pointer;
}

.avatar-preview {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid var(--color-border);
}

.avatar-edit-hint {
  font-size: 0.5rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-text-secondary);
  transition: color var(--transition-subtle);
}

.avatar-edit:hover .avatar-edit-hint {
  color: var(--color-text);
}

.avatar-file-input {
  display: none;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  border-top: 1px solid var(--color-border);
}

.modal-cancel {
  background: none;
  border: none;
  padding: 6px 0;
  cursor: pointer;
  color: var(--color-text-secondary);
  font-size: var(--text-label);
  transition: color var(--transition-subtle);
}

.modal-cancel:hover {
  color: var(--color-text);
}

.modal-save {
  background: none;
  border: 1px solid var(--color-border);
  padding: 6px 16px;
  cursor: pointer;
  color: var(--color-text);
  font-size: var(--text-label);
  transition: border-color var(--transition-subtle);
}

.modal-save:hover {
  border-color: var(--color-text-secondary);
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 200ms ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>
