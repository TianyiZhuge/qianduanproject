<template>
  <div class="main-page">
    <!-- 左侧：聊天/交互区域 -->
    <section class="chat-section glass-panel">
      <header class="section-header">
        <h3 class="title title--md">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          交互终端
        </h3>
        <div class="header-actions">
          <button class="btn btn--ghost btn--sm" title="清空对话">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="3,6 5,6 21,6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
          </button>
        </div>
      </header>

      <div class="chat-messages" ref="chatContainer">
        <!-- 消息列表将由酒馆本身处理，这里只是展示框架 -->
        <div class="chat-placeholder">
          <div class="placeholder-icon">
            <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.5">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4" />
              <path d="M12 8h.01" />
            </svg>
          </div>
          <p class="placeholder-text">等待交互内容加载...</p>
          <p class="placeholder-hint">此区域将显示与角色的对话内容</p>
        </div>
      </div>

      <div class="chat-input-area">
        <div class="input-wrapper">
          <textarea class="chat-input input" placeholder="输入指令或对话内容..." rows="2"></textarea>
          <button class="send-btn btn btn--primary">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22,2 15,22 11,13 2,9" />
            </svg>
            发送
          </button>
        </div>
      </div>
    </section>

    <!-- 右侧：状态面板 -->
    <aside class="status-section">
      <!-- 角色状态卡片 -->
      <div class="status-card glass-panel">
        <header class="card-header">
          <h4 class="title title--sm">当前状态</h4>
          <span class="badge badge--primary">回合 1</span>
        </header>
        <div class="status-content">
          <div class="status-row">
            <span class="status-label">行动点</span>
            <div class="status-bar">
              <div class="status-bar__fill" style="width: 100%"></div>
            </div>
            <span class="status-value">3/3</span>
          </div>
          <div class="status-row">
            <span class="status-label">资源</span>
            <div class="status-bar status-bar--gold">
              <div class="status-bar__fill" style="width: 75%"></div>
            </div>
            <span class="status-value">750</span>
          </div>
          <div class="status-row">
            <span class="status-label">士气</span>
            <div class="status-bar status-bar--success">
              <div class="status-bar__fill" style="width: 85%"></div>
            </div>
            <span class="status-value">85%</span>
          </div>
        </div>
      </div>

      <!-- 快捷操作 -->
      <div class="quick-actions glass-panel">
        <header class="card-header">
          <h4 class="title title--sm">快捷操作</h4>
        </header>
        <div class="actions-grid">
          <button class="action-btn" @click="openBattleModal">
            <span class="action-icon">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
                <path
                  d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"
                />
              </svg>
            </span>
            <span class="action-label">战斗</span>
          </button>
          <button class="action-btn">
            <span class="action-icon">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <line x1="3" y1="9" x2="21" y2="9" />
                <line x1="9" y1="21" x2="9" y2="9" />
              </svg>
            </span>
            <span class="action-label">地图</span>
          </button>
          <button class="action-btn">
            <span class="action-icon">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                <line x1="7" y1="7" x2="7.01" y2="7" />
              </svg>
            </span>
            <span class="action-label">背包</span>
          </button>
          <button class="action-btn">
            <span class="action-icon">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
              </svg>
            </span>
            <span class="action-label">日志</span>
          </button>
        </div>
      </div>

      <!-- 事件提示 -->
      <div class="events-card glass-panel">
        <header class="card-header">
          <h4 class="title title--sm">事件提示</h4>
          <span class="badge">3</span>
        </header>
        <div class="events-list">
          <div class="event-item event-item--warning">
            <span class="event-dot"></span>
            <span class="event-text">敌军正在集结</span>
          </div>
          <div class="event-item event-item--info">
            <span class="event-dot"></span>
            <span class="event-text">新的招募机会</span>
          </div>
          <div class="event-item event-item--success">
            <span class="event-dot"></span>
            <span class="event-text">资源采集完成</span>
          </div>
        </div>
      </div>
    </aside>
  </div>
</template>

<script setup lang="ts">
import { useModalStore } from '../../stores/modalStore';
import BattleView from '../battle/BattleView.vue';

const modalStore = useModalStore();

function openBattleModal() {
  modalStore.open({
    title: '战斗界面',
    component: BattleView,
    size: 'full',
  });
}
</script>

<style scoped>
.main-page {
  display: grid;
  grid-template-columns: 1fr 280px;
  gap: 12px;
  width: 100%;
  aspect-ratio: 16 / 9;
}

/* === 聊天区域 === */
.chat-section {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: var(--border-subtle);
}

.section-header .title {
  display: flex;
  align-items: center;
  gap: 10px;
}

.header-actions {
  display: flex;
  gap: 8px;
}

.btn--sm {
  padding: 6px 10px;
  font-size: 13px;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}

.chat-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  text-align: center;
  color: var(--color-text-muted);
}

.placeholder-icon {
  margin-bottom: 16px;
  opacity: 0.5;
}

.placeholder-text {
  font-size: 16px;
  margin-bottom: 8px;
}

.placeholder-hint {
  font-size: 13px;
  opacity: 0.7;
}

.chat-input-area {
  padding: 16px 20px;
  border-top: var(--border-subtle);
}

.input-wrapper {
  display: flex;
  gap: 12px;
  align-items: flex-end;
}

.chat-input {
  flex: 1;
  resize: none;
  min-height: 44px;
}

.send-btn {
  flex-shrink: 0;
}

/* === 状态面板 === */
.status-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow-y: auto;
}

.status-card,
.quick-actions,
.events-card {
  padding: 16px;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

/* === 状态条 === */
.status-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.status-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.status-label {
  font-size: 13px;
  color: var(--color-text-secondary);
  width: 60px;
}

.status-bar {
  flex: 1;
  height: 8px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  overflow: hidden;
}

.status-bar__fill {
  height: 100%;
  background: var(--gradient-primary);
  border-radius: 4px;
  transition: width var(--transition-normal);
}

.status-bar--gold .status-bar__fill {
  background: var(--gradient-gold);
}

.status-bar--success .status-bar__fill {
  background: var(--color-success);
}

.status-value {
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text-primary);
  min-width: 40px;
  text-align: right;
}

/* === 快捷操作 === */
.actions-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.action-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 16px 12px;
  background: rgba(0, 0, 0, 0.2);
  border: var(--border-subtle);
  border-radius: var(--border-radius-md);
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: all var(--transition-normal);
}

.action-btn:hover {
  background: rgba(155, 89, 255, 0.1);
  border-color: var(--color-accent-primary);
  color: var(--color-text-primary);
  transform: translateY(-2px);
}

.action-btn:hover .action-icon {
  color: var(--color-accent-primary);
}

.action-icon {
  transition: color var(--transition-normal);
}

.action-label {
  font-size: 13px;
  font-weight: 500;
}

/* === 事件列表 === */
.events-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.event-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: var(--border-radius-sm);
  font-size: 13px;
}

.event-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.event-item--warning .event-dot {
  background: var(--color-warning);
}
.event-item--info .event-dot {
  background: var(--color-info);
}
.event-item--success .event-dot {
  background: var(--color-success);
}
.event-item--danger .event-dot {
  background: var(--color-danger);
}

.event-text {
  color: var(--color-text-secondary);
}
</style>
