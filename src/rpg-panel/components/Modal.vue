<template>
  <div class="modal-overlay" @click.self="handleOverlayClick">
    <div :class="['modal-container', `modal-container--${config.size}`]" class="glass-panel--elevated">
      <!-- 模态框头部 -->
      <header v-if="config.title || config.closable" class="modal-header">
        <h2 v-if="config.title" class="modal-title title title--md">{{ config.title }}</h2>
        <button v-if="config.closable" class="modal-close" @click="modalStore.close" title="关闭">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </header>

      <!-- 模态框内容 -->
      <div class="modal-body">
        <component v-if="config.component" :is="config.component" v-bind="config.props || {}" />
        <slot v-else />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue';
import { useModalStore } from '../stores/modalStore';

const modalStore = useModalStore();
const config = computed(() => modalStore.config);

function handleOverlayClick() {
  if (config.value.closable) {
    modalStore.close();
  }
}

// ESC 键关闭
function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && config.value.closable) {
    modalStore.close();
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown);
  document.body.style.overflow = 'hidden';
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown);
  document.body.style.overflow = '';
});
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: var(--z-modal);
  padding: 24px;
  animation: fadeIn var(--transition-fast) ease;
}

.modal-container {
  display: flex;
  flex-direction: column;
  max-height: 90vh;
  animation: scaleIn var(--transition-normal) ease;
}

.modal-container--sm {
  width: 100%;
  max-width: 400px;
}
.modal-container--md {
  width: 100%;
  max-width: 560px;
}
.modal-container--lg {
  width: 100%;
  max-width: 720px;
}
.modal-container--xl {
  width: 100%;
  max-width: 960px;
}
.modal-container--full {
  width: 100%;
  max-width: calc(100vw - 48px);
  height: calc(100vh - 48px);
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: var(--border-subtle);
}

.modal-title {
  margin: 0;
}

.modal-close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: transparent;
  border: none;
  border-radius: var(--border-radius-sm);
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.modal-close:hover {
  background: rgba(255, 255, 255, 0.1);
  color: var(--color-text-primary);
}

.modal-body {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}
</style>
