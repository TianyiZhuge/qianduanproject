<template>
  <div class="rpg-app">
    <!-- 顶部三角形装饰带 -->
    <div class="top-decoration">
      <div class="decoration-line"></div>
      <div class="decoration-triangles">
        <span class="triangle"></span>
        <span class="triangle"></span>
        <span class="triangle"></span>
        <span class="diamond"></span>
        <span class="triangle"></span>
        <span class="triangle"></span>
        <span class="triangle"></span>
      </div>
    </div>

    <!-- 顶部导航栏 - 书脊风格 -->
    <header class="top-nav">
      <!-- 左侧装饰线 -->
      <div class="nav-edge nav-edge--left"></div>

      <div class="nav-brand">
        <div class="brand-crest">
          <div class="crest-outer"></div>
          <div class="crest-inner">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
        </div>
        <div class="brand-title">
          <span class="brand-text">战略指挥部</span>
          <span class="brand-subtitle">STRATEGIC COMMAND</span>
        </div>
      </div>

      <nav class="nav-tabs">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          :class="['nav-tab', { 'nav-tab--active': activeTab === tab.id }]"
          @click="activeTab = tab.id"
        >
          <span class="nav-tab__bookmark"></span>
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

      <!-- 右侧装饰线 -->
      <div class="nav-edge nav-edge--right"></div>
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
  height: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0;
  gap: 0;
  overflow-y: auto;
  overflow-x: hidden;
}

/* ============================================
   顶部装饰带 - 三角形与菱形
   ============================================ */
.top-decoration {
  position: relative;
  padding: 8px 0;
  background: linear-gradient(180deg, rgba(200, 170, 100, 0.1) 0%, transparent 100%);
}

.decoration-line {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--gradient-border-gold);
}

.decoration-triangles {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
}

.triangle {
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 8px solid var(--color-royal-gold);
  opacity: 0.6;
}

.diamond {
  width: 10px;
  height: 10px;
  background: var(--color-royal-gold);
  transform: rotate(45deg);
  box-shadow: 0 0 10px rgba(200, 160, 60, 0.5);
}

/* ============================================
   导航栏 - 书脊风格
   ============================================ */
.top-nav {
  position: relative;
  z-index: var(--z-dropdown);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 24px;
  flex-wrap: wrap;
  gap: 12px;
  background: linear-gradient(180deg, hsl(225, 30%, 12%) 0%, hsl(220, 35%, 8%) 100%);
  border-bottom: 2px solid var(--color-royal-gold-dark);
  box-shadow:
    inset 0 1px 0 rgba(200, 170, 100, 0.15),
    var(--shadow-md);
}

/* 左右装饰线 */
.nav-edge {
  position: absolute;
  top: 8px;
  bottom: 8px;
  width: 3px;
  background: linear-gradient(
    180deg,
    var(--color-royal-gold) 0%,
    var(--color-royal-gold-dark) 50%,
    var(--color-royal-gold) 100%
  );
  border-radius: 2px;
}

.nav-edge--left {
  left: 8px;
}

.nav-edge--right {
  right: 8px;
}

/* ============================================
   品牌标识 - 纹章风格
   ============================================ */
.nav-brand {
  display: flex;
  align-items: center;
  gap: 14px;
}

.brand-crest {
  position: relative;
  width: 44px;
  height: 44px;
}

.crest-outer {
  position: absolute;
  inset: 0;
  background: var(--gradient-gold);
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  animation: glowGold 3s ease-in-out infinite;
}

.crest-inner {
  position: absolute;
  inset: 3px;
  background: var(--color-ink-black);
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-royal-gold);
}

.crest-inner svg {
  width: 20px;
  height: 20px;
}

.brand-title {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.brand-text {
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 700;
  background: var(--gradient-gold);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: 0.05em;
}

.brand-subtitle {
  font-family: var(--font-primary);
  font-size: 9px;
  font-weight: 500;
  color: var(--color-text-muted);
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

/* ============================================
   导航标签 - 书签造型
   ============================================ */
.nav-tabs {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
}

.nav-tab {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  font-family: var(--font-primary);
  font-size: 13px;
  font-weight: 500;
  color: var(--color-text-secondary);
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(200, 170, 100, 0.2);
  border-radius: 0;
  cursor: pointer;
  transition: all var(--transition-normal);
  position: relative;
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%);
}

.nav-tab__bookmark {
  position: absolute;
  top: 0;
  left: 0;
  width: 3px;
  height: 100%;
  background: var(--color-royal-gold-dark);
  opacity: 0;
  transition: opacity var(--transition-normal);
}

.nav-tab:hover {
  color: var(--color-text-primary);
  background: rgba(200, 170, 100, 0.1);
  border-color: rgba(200, 170, 100, 0.4);
}

.nav-tab:hover .nav-tab__bookmark {
  opacity: 0.5;
}

.nav-tab--active {
  color: var(--color-text-primary);
  background: rgba(200, 170, 100, 0.15);
  border-color: var(--color-royal-gold);
  box-shadow: 0 0 15px rgba(200, 160, 60, 0.2);
}

.nav-tab--active .nav-tab__bookmark {
  opacity: 1;
  background: var(--color-royal-gold);
  box-shadow: 0 0 10px rgba(200, 160, 60, 0.5);
}

.nav-tab__icon {
  display: flex;
  align-items: center;
  opacity: 0.7;
  transition: all var(--transition-normal);
}

.nav-tab:hover .nav-tab__icon {
  opacity: 1;
}

.nav-tab--active .nav-tab__icon {
  opacity: 1;
  color: var(--color-royal-gold);
}

.nav-tab__label {
  letter-spacing: 0.03em;
}

/* ============================================
   导航操作按钮
   ============================================ */
.nav-actions {
  display: flex;
  gap: 8px;
}

.nav-action-btn {
  padding: 10px;
  border-radius: 0;
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 4px), calc(100% - 4px) 100%, 0 100%);
}

/* ============================================
   主内容区域
   ============================================ */
.main-content {
  position: relative;
  z-index: var(--z-base);
  padding: 16px;
  flex: 1;
  min-height: 0;
}

/* ============================================
   页面切换动画 - 翻页效果
   ============================================ */
.page-enter-active {
  animation: pageFlip 0.4s ease forwards;
}

.page-leave-active {
  animation: fadeOut 0.2s ease forwards;
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

/* ============================================
   模态框动画
   ============================================ */
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
