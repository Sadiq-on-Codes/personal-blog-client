<template>
  <div class="empty-state" :class="{ 'empty-state--compact': compact }">
    <div v-if="icon" class="empty-state__icon-wrapper">
      <img v-if="typeof icon === 'string'" :src="icon" :alt="altText" class="empty-state__icon">
      <component v-else :is="icon" class="empty-state__icon" />
    </div>
    <h3 class="empty-state__title">{{ title }}</h3>
    <p class="empty-state__message">{{ message }}</p>
    <slot name="action"></slot>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  icon: {
    type: [String, Object],
    default: null
  },
  altText: {
    type: String,
    default: 'Empty state icon'
  },
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  compact: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 3rem;

  border-radius: 12px;
  transition: all 0.3s ease;
}

.empty-state--compact {
  padding: 2rem;
}

.empty-state__icon-wrapper {
  margin-bottom: 1.5rem;
}

.empty-state__icon {
  width: 80px;
  height: 80px;
  object-fit: contain;
}

.empty-state__title {
  font-size: 1.75rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: var(--title-color, #2c3e50);
}

.empty-state__message {
  font-size: 1.1rem;
  line-height: 1.5;
  color: var(--message-color, #6c757d);
  max-width: 80%;
  margin-bottom: 1.5rem;
}

@media (max-width: 768px) {
  .empty-state {
    padding: 2rem;
  }

  .empty-state--compact {
    padding: 1.5rem;
  }

  .empty-state__icon {
    width: 60px;
    height: 60px;
  }

  .empty-state__title {
    font-size: 1.5rem;
  }

  .empty-state__message {
    font-size: 1rem;
  }
}
</style>
