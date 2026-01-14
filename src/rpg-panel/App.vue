<template>
  <div class="rpg-app">
    <!-- 背景装饰 -->
    <div class="bg-decoration">
      <div class="bg-orb bg-orb--1"></div>
      <div class="bg-orb bg-orb--2"></div>
      <div class="bg-orb bg-orb--3"></div>
    </div>

    <!-- 顶部导航栏 -->
    <header class="top-nav glass-panel">
      <div class="nav-brand">
        <div class="brand-icon">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
        </div>
        <span class="brand-text">战略指挥部</span>
      </div>

      <nav class="nav-tabs">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          :class="['nav-tab', { 'nav-tab--active': activeTab === tab.id }]"
          @click="activeTab = tab.id"
        >
          <span class="nav-tab__icon" v-html="tab.icon"></span>
          <span class="nav-tab__label">{{ tab.label }}</span>
        </button>
      </nav>

      <div class="nav-actions">
        <button class="btn btn--ghost nav-action-btn" title="设置">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="3" />
            <path
              d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"
            />
          </svg>
        </button>
      </div>
    </header>

    <!-- 主内容区域 -->
    <main class="main-content">
      <Transition name="page" mode="out-in">
        <component :is="currentPageComponent" :key="activeTab" />
      </Transition>
    </main>

    <!-- 模态框容器 -->
    <Teleport to="body">
      <Transition name="modal">
        <Modal v-if="modalStore.isOpen" />
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useLocalStorage } from '@vueuse/core';

// 页面组件
import MainPage from './modules/main/MainPage.vue';
import TrainingPage from './modules/training/TrainingPage.vue';
import DevelopmentPage from './modules/development/DevelopmentPage.vue';
import ConquestPage from './modules/conquest/ConquestPage.vue';
import FormationPage from './modules/formation/FormationPage.vue';
import Modal from './components/Modal.vue';

// Store
import { useModalStore } from './stores/modalStore';

const modalStore = useModalStore();

// 导航标签配置
const tabs = [
  {
    id: 'main',
    label: '主界面',
    icon: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></svg>',
  },
  {
    id: 'training',
    label: '调教',
    icon: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>',
  },
  {
    id: 'development',
    label: '发展',
    icon: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20V10"/><path d="M18 20V4"/><path d="M6 20v-4"/></svg>',
  },
  {
    id: 'conquest',
    label: '征服',
    icon: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
  },
  {
    id: 'formation',
    label: '编制',
    icon: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  },
];

// 当前激活的标签页
const activeTab = useLocalStorage<string>('rpg-panel:active-tab', 'main');

// 根据标签返回对应的页面组件
const currentPageComponent = computed(() => {
  const pageMap: Record<string, any> = {
    main: MainPage,
    training: TrainingPage,
    development: DevelopmentPage,
    conquest: ConquestPage,
    formation: FormationPage,
  };
  return pageMap[activeTab.value] || MainPage;
});
</script>

<style scoped>
.rpg-app {
  position: relative;
  width: 100%;
  min-width: 800px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow-x: auto;
  overflow-y: hidden;
}

/* === 背景装饰 === */
.bg-decoration {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}

.bg-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.3;
}

.bg-orb--1 {
  width: 400px;
  height: 400px;
  background: var(--color-accent-primary);
  top: -100px;
  right: -100px;
  animation: float 20s ease-in-out infinite;
}

.bg-orb--2 {
  width: 300px;
  height: 300px;
  background: var(--color-accent-secondary);
  bottom: -50px;
  left: -50px;
  animation: float 25s ease-in-out infinite reverse;
}

.bg-orb--3 {
  width: 200px;
  height: 200px;
  background: var(--color-accent-tertiary);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: pulse 10s ease-in-out infinite;
}

@keyframes float {
  0%,
  100% {
    transform: translate(0, 0);
  }
  25% {
    transform: translate(-20px, 20px);
  }
  50% {
    transform: translate(20px, -20px);
  }
  75% {
    transform: translate(-10px, -10px);
  }
}

/* === 顶部导航 === */
.top-nav {
  position: sticky;
  top: 0;
  z-index: var(--z-dropdown);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 24px;
  margin: 16px;
  margin-bottom: 0;
}

.nav-brand {
  display: flex;
  align-items: center;
  gap: 12px;
}

.brand-icon {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--gradient-primary);
  border-radius: var(--border-radius-md);
  color: white;
}

.brand-icon svg {
  width: 20px;
  height: 20px;
}

.brand-text {
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 600;
  background: var(--gradient-gold);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* === 导航标签 === */
.nav-tabs {
  display: flex;
  gap: 4px;
}

.nav-tab {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  font-family: var(--font-primary);
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text-secondary);
  background: transparent;
  border: none;
  border-radius: var(--border-radius-md);
  cursor: pointer;
  transition: all var(--transition-normal);
  position: relative;
}

.nav-tab::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  background: var(--gradient-primary);
  border-radius: 1px;
  transform: translateX(-50%);
  transition: width var(--transition-normal);
}

.nav-tab:hover {
  color: var(--color-text-primary);
  background: rgba(255, 255, 255, 0.05);
}

.nav-tab--active {
  color: var(--color-text-primary);
  background: rgba(155, 89, 255, 0.1);
}

.nav-tab--active::after {
  width: 60%;
}

.nav-tab__icon {
  display: flex;
  align-items: center;
  opacity: 0.8;
}

.nav-tab--active .nav-tab__icon {
  opacity: 1;
  color: var(--color-accent-primary);
}

/* === 导航操作按钮 === */
.nav-actions {
  display: flex;
  gap: 8px;
}

.nav-action-btn {
  padding: 8px;
  border-radius: var(--border-radius-md);
}

/* === 主内容区域 === */
.main-content {
  flex: 1;
  padding: 16px;
  position: relative;
  z-index: var(--z-base);
}

/* === 页面切换动画 === */
.page-enter-active,
.page-leave-active {
  transition: all 0.3s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

/* === 模态框动画 === */
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
