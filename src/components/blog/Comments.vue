<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { Comment } from '../../data/posts'
import { getRelativeTime } from '../../data/posts'

const props = defineProps<{
  comments: Comment[]
  postSlug: string
}>()

const emit = defineEmits<{
  'add-comment': [comment: Omit<Comment, 'id' | 'createdAt' | 'likes' | 'replies'>]
}>()

const { t, locale } = useI18n()

const newComment = ref({
  author: '',
  email: '',
  content: ''
})

const replyingTo = ref<string | null>(null)
const replyContent = ref('')
const replyAuthor = ref('')
const replyEmail = ref('')

const isFormValid = computed(() => {
  return newComment.value.author.trim() &&
         newComment.value.email.trim() &&
         newComment.value.content.trim()
})

const isReplyValid = computed(() => {
  return replyAuthor.value.trim() &&
         replyEmail.value.trim() &&
         replyContent.value.trim()
})

const submitComment = () => {
  if (!isFormValid.value) return

  emit('add-comment', {
    author: newComment.value.author.trim(),
    email: newComment.value.email.trim(),
    content: newComment.value.content.trim()
  })

  // Reset form
  newComment.value = { author: '', email: '', content: '' }
}

const startReply = (commentId: string) => {
  replyingTo.value = commentId
  replyContent.value = ''
}

const cancelReply = () => {
  replyingTo.value = null
  replyContent.value = ''
  replyAuthor.value = ''
  replyEmail.value = ''
}

const submitReply = (parentId: string) => {
  if (!isReplyValid.value) return

  // In a real app, this would call an API
  console.log('Reply to:', parentId, {
    author: replyAuthor.value,
    email: replyEmail.value,
    content: replyContent.value
  })

  cancelReply()
}

const likeComment = (commentId: string) => {
  // In a real app, this would call an API
  console.log('Like comment:', commentId)
}
</script>

<template>
  <section class="comments-section">
    <h2 class="comments-title">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
      {{ t('post.comments') }}
      <span class="comments-count">({{ comments.length }})</span>
    </h2>

    <!-- Comment Form -->
    <form class="comment-form" @submit.prevent="submitComment">
      <div class="form-row">
        <input
          v-model="newComment.author"
          type="text"
          :placeholder="t('post.yourName')"
          class="form-input"
          required
        />
        <input
          v-model="newComment.email"
          type="email"
          :placeholder="t('post.yourEmail')"
          class="form-input"
          required
        />
      </div>
      <textarea
        v-model="newComment.content"
        :placeholder="t('post.writeComment')"
        class="form-textarea"
        rows="4"
        required
      />
      <button type="submit" class="submit-btn" :disabled="!isFormValid">
        {{ t('post.submit') }}
      </button>
    </form>

    <!-- Comments List -->
    <div class="comments-list">
      <template v-if="comments.length > 0">
        <div v-for="comment in comments" :key="comment.id" class="comment">
          <div class="comment-avatar">
            {{ comment.author.charAt(0).toUpperCase() }}
          </div>
          <div class="comment-body">
            <div class="comment-header">
              <span class="comment-author">{{ comment.author }}</span>
              <span class="comment-date">{{ getRelativeTime(comment.createdAt, locale) }}</span>
            </div>
            <p class="comment-content">{{ comment.content }}</p>
            <div class="comment-actions">
              <button class="action-btn" @click="likeComment(comment.id)">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
                {{ comment.likes }} {{ t('post.likes') }}
              </button>
              <button class="action-btn" @click="startReply(comment.id)">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="9 17 4 12 9 7"/>
                  <path d="M20 18v-2a4 4 0 0 0-4-4H4"/>
                </svg>
                {{ t('post.reply') }}
              </button>
            </div>

            <!-- Reply Form -->
            <div v-if="replyingTo === comment.id" class="reply-form">
              <div class="form-row">
                <input
                  v-model="replyAuthor"
                  type="text"
                  :placeholder="t('post.yourName')"
                  class="form-input"
                />
                <input
                  v-model="replyEmail"
                  type="email"
                  :placeholder="t('post.yourEmail')"
                  class="form-input"
                />
              </div>
              <textarea
                v-model="replyContent"
                :placeholder="t('post.writeComment')"
                class="form-textarea"
                rows="3"
              />
              <div class="reply-actions">
                <button type="button" class="cancel-btn" @click="cancelReply">
                  {{ t('common.cancel') }}
                </button>
                <button type="button" class="submit-btn small" :disabled="!isReplyValid" @click="submitReply(comment.id)">
                  {{ t('post.reply') }}
                </button>
              </div>
            </div>

            <!-- Nested Replies -->
            <div v-if="comment.replies && comment.replies.length > 0" class="replies">
              <div v-for="reply in comment.replies" :key="reply.id" class="comment reply">
                <div class="comment-avatar small">
                  {{ reply.author.charAt(0).toUpperCase() }}
                </div>
                <div class="comment-body">
                  <div class="comment-header">
                    <span class="comment-author">{{ reply.author }}</span>
                    <span class="comment-date">{{ getRelativeTime(reply.createdAt, locale) }}</span>
                  </div>
                  <p class="comment-content">{{ reply.content }}</p>
                  <div class="comment-actions">
                    <button class="action-btn" @click="likeComment(reply.id)">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                      </svg>
                      {{ reply.likes }} {{ t('post.likes') }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>

      <!-- Empty State -->
      <div v-else class="empty-comments">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
        <p>{{ t('post.noComments') }}</p>
        <span>{{ t('post.beFirstComment') }}</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.comments-section {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid var(--border-color);
}

.comments-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
}

.comments-title svg {
  color: var(--accent-color);
}

.comments-count {
  font-size: 1rem;
  font-weight: 500;
  color: var(--text-tertiary);
}

/* Comment Form */
.comment-form {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 0.75rem 1rem;
  font-family: var(--font-sans);
  font-size: 0.95rem;
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  color: var(--text-primary);
  transition: all var(--transition-fast);
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: var(--accent-color);
  box-shadow: 0 0 0 3px var(--accent-bg);
}

.form-textarea {
  resize: vertical;
  min-height: 100px;
}

.submit-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end));
  color: white;
  font-family: var(--font-sans);
  font-size: 0.95rem;
  font-weight: 600;
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-fast);
  margin-top: 1rem;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.submit-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.submit-btn.small {
  padding: 0.5rem 1rem;
  font-size: 0.85rem;
  margin-top: 0;
}

/* Comments List */
.comments-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.comment {
  display: flex;
  gap: 1rem;
}

.comment-avatar {
  width: 48px;
  height: 48px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end));
  color: white;
  font-size: 1.25rem;
  font-weight: 700;
  border-radius: var(--radius-full);
}

.comment-avatar.small {
  width: 36px;
  height: 36px;
  font-size: 1rem;
}

.comment-body {
  flex: 1;
  min-width: 0;
}

.comment-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
}

.comment-author {
  font-family: var(--font-sans);
  font-weight: 600;
  color: var(--text-primary);
}

.comment-date {
  font-size: 0.85rem;
  color: var(--text-tertiary);
}

.comment-content {
  color: var(--text-secondary);
  line-height: 1.7;
  margin-bottom: 0.75rem;
}

.comment-actions {
  display: flex;
  gap: 1rem;
}

.action-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem 0.75rem;
  font-family: var(--font-sans);
  font-size: 0.85rem;
  color: var(--text-tertiary);
  background: none;
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.action-btn:hover {
  color: var(--accent-color);
  background: var(--accent-bg);
}

/* Reply Form */
.reply-form {
  margin-top: 1rem;
  padding: 1rem;
  background: var(--bg-secondary);
  border-radius: var(--radius-md);
}

.reply-form .form-row {
  grid-template-columns: 1fr 1fr;
}

.reply-form .form-textarea {
  min-height: 80px;
}

.reply-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 0.75rem;
}

.cancel-btn {
  padding: 0.5rem 1rem;
  font-family: var(--font-sans);
  font-size: 0.85rem;
  color: var(--text-secondary);
  background: none;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.cancel-btn:hover {
  background: var(--bg-tertiary);
}

/* Replies */
.replies {
  margin-top: 1rem;
  padding-left: 1rem;
  border-left: 2px solid var(--border-color);
}

.comment.reply {
  padding-top: 1rem;
}

/* Empty State */
.empty-comments {
  text-align: center;
  padding: 3rem;
  background: var(--bg-secondary);
  border-radius: var(--radius-lg);
}

.empty-comments svg {
  color: var(--text-tertiary);
  margin-bottom: 1rem;
}

.empty-comments p {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.empty-comments span {
  font-size: 0.95rem;
  color: var(--text-tertiary);
}

/* Responsive */
@media (max-width: 640px) {
  .form-row {
    grid-template-columns: 1fr;
  }

  .reply-form .form-row {
    grid-template-columns: 1fr;
  }

  .comment-avatar {
    width: 40px;
    height: 40px;
    font-size: 1rem;
  }
}
</style>
