<script setup lang="ts">
export interface FeedPostData {
  id: string
  authorName: string
  authorType: 'venue' | 'attendee'
  eventTitle?: string
  eventSlug?: string
  content: string
  timestamp: string
  commentCount: number
}

defineProps<{ post: FeedPostData }>()
</script>

<template>
  <article class="post">
    <div class="post-header">
      <div class="post-author">
        <span class="post-name" :class="{ venue: post.authorType === 'venue' }">{{ post.authorName }}</span>
        <span class="label post-type">{{ post.authorType }}</span>
      </div>
      <span class="mono post-time">{{ post.timestamp }}</span>
    </div>

    <NuxtLink v-if="post.eventTitle && post.eventSlug" :to="`/event/${post.eventSlug}`" class="post-event-link mono">
      ↳ {{ post.eventTitle }}
    </NuxtLink>

    <p class="post-content">{{ post.content }}</p>

    <div class="post-footer">
      <button class="post-comments mono">
        {{ post.commentCount }} {{ post.commentCount === 1 ? 'comment' : 'comments' }}
      </button>
    </div>
  </article>
</template>

<style scoped>
.post {
  padding: var(--space-3) 0;
  border-top: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.post:last-child {
  border-bottom: 1px solid var(--color-border);
}

.post-header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: var(--space-2);
}

.post-author {
  display: flex;
  align-items: baseline;
  gap: var(--space-1);
}

.post-name {
  font-size: var(--text-body);
  font-weight: 500;
}

.post-name.venue {
  color: #d4a840;
}

.post-type {
  opacity: 0.5;
}

.post-time {
  font-size: var(--text-label);
  color: var(--color-text-secondary);
  letter-spacing: 0.04em;
  flex-shrink: 0;
}

.post-event-link {
  font-size: var(--text-label);
  color: var(--color-text-secondary);
  letter-spacing: 0.04em;
  transition: color var(--transition-subtle);
}

.post-event-link:hover {
  color: var(--color-text);
}

.post-content {
  font-size: var(--text-body);
  line-height: 1.7;
  color: var(--color-text);
  max-width: 60ch;
}

.post-footer {
  margin-top: var(--space-1);
}

.post-comments {
  font-size: var(--text-label);
  color: var(--color-text-secondary);
  letter-spacing: 0.04em;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  transition: color var(--transition-subtle);
}

.post-comments:hover {
  color: var(--color-text);
}
</style>
