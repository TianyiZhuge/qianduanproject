<template>
  <div class="main-page">
    <!-- 左侧：聊天/交互区域 - 古卷风格 -->
    <section class="chat-section">
      <!-- 卷轴顶部装饰 -->
      <div class="scroll-edge scroll-edge--top">
        <div class="scroll-rod"></div>
      </div>

      <div class="scroll-content">
        <header class="section-header">
          <h3 class="title title--md title--gold">
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
            <textarea class="chat-input input input--parchment" placeholder="输入指令或对话内容..." rows="2"></textarea>
            <button class="send-btn btn btn--seal">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22,2 15,22 11,13 2,9" />
              </svg>
              发送
            </button>
          </div>
        </div>
      </div>

      <!-- 卷轴底部装饰 -->
      <div class="scroll-edge scroll-edge--bottom">
        <div class="scroll-rod"></div>
      </div>
    </section>

    <!-- 右侧：状态面板 -->
    <aside class="status-section">
      <!-- 角色状态卡片 - 羊皮纸风格 -->
      <div class="status-card card-parchment">
        <div class="card-corner card-corner--tl"></div>
        <div class="card-corner card-corner--tr"></div>
        <div class="card-corner card-corner--bl"></div>
        <div class="card-corner card-corner--br"></div>
        <header class="card-header">
          <h4 class="title title--sm">当前状态</h4>
          <span class="badge badge--gold">回合 1</span>
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

      <!-- 快捷操作 - 石板风格 -->
      <div class="quick-actions card-slate">
        <header class="card-header">
          <h4 class="title title--sm title--gold">快捷操作</h4>
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

      <!-- 事件提示 - 日记页风格 -->
      <div class="events-card card-diary">
        <header class="card-header">
          <h4 class="title title--sm">事件提示</h4>
          <span class="badge badge--blood">3</span>
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
  gap: 16px;
  width: 100%;
  aspect-ratio: 16 / 9;
}

/* ============================================
   聊天区域 - 古卷风格
   ============================================ */
.chat-section {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: linear-gradient(180deg,
    hsl(225, 28%, 10%) 0%,
    hsl(220, 32%, 7%) 100%);
  border: 2px solid var(--color-royal-gold-dark);
  border-radius: var(--border-radius-lg);
  position: relative;
}

/* 卷轴边缘装饰 */
.scroll-edge {
  height: 16px;
  background: linear-gradient(90deg,
    var(--color-royal-gold-dark) 0%,
    var(--color-royal-gold) 20%,
    var(--color-royal-gold) 80%,
    var(--color-royal-gold-dark) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.scroll-edge--top {
  border-radius: var(--border-radius-lg) var(--border-radius-lg) 0 0;
}

.scroll-edge--bottom {
  border-radius: 0 0 var(--border-radius-lg) var(--border-radius-lg);
}

.scroll-rod {
  width: 60%;
  height: 4px;
  background: linear-gradient(180deg,
    var(--color-parchment) 0%,
    var(--color-aged-bronze) 50%,
    var(--color-royal-gold-dark) 100%);
  border-radius: 2px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.scroll-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background:
    linear-gradient(135deg, rgba(200, 170, 100, 0.03) 0%, transparent 50%),
    var(--pattern-lines);
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(200, 170, 100, 0.2);
  background: rgba(0, 0, 0, 0.2);
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
  opacity: 0.4;
  color: var(--color-royal-gold);
}

.placeholder-text {
  font-size: 16px;
  margin-bottom: 8px;
  color: var(--color-text-secondary);
}

.placeholder-hint {
  font-size: 13px;
  opacity: 0.6;
}

.chat-input-area {
  padding: 16px 20px;
  border-top: 1px solid rgba(200, 170, 100, 0.2);
  background: rgba(0, 0, 0, 0.15);
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

/* ============================================
   状态面板
   ============================================ */
.status-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow-y: auto;
}

/* ============================================
   羊皮纸风格卡片
   ============================================ */
.card-parchment {
  position: relative;
  padding: 16px;
  background:
    linear-gradient(135deg,
      rgba(200, 170, 100, 0.08) 0%,
      rgba(180, 150, 80, 0.03) 50%,
      rgba(200, 170, 100, 0.06) 100%),
    linear-gradient(180deg,
      hsl(225, 28%, 12%) 0%,
      hsl(220, 32%, 9%) 100%);
  border: 2px solid var(--color-royal-gold-dark);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-card);
}

/* 角落装饰 */
.card-corner {
  position: absolute;
  width: 16px;
  height: 16px;
  border: 2px solid var(--color-royal-gold);
}

.card-corner--tl {
  top: 4px;
  left: 4px;
  border-right: none;
  border-bottom: none;
}

.card-corner--tr {
  top: 4px;
  right: 4px;
  border-left: none;
  border-bottom: none;
}

.card-corner--bl {
  bottom: 4px;
  left: 4px;
  border-right: none;
  border-top: none;
}

.card-corner--br {
  bottom: 4px;
  right: 4px;
  border-left: none;
  border-top: none;
}

/* ============================================
   石板风格卡片
   ============================================ */
.card-slate {
  padding: 16px;
  background: linear-gradient(180deg,
    hsl(220, 25%, 8%) 0%,
    hsl(225, 30%, 5%) 100%);
  border: 2px solid rgba(100, 100, 120, 0.4);
  border-radius: var(--border-radius-md);
  box-shadow:
    inset 0 2px 8px rgba(0, 0, 0, 0.4),
    var(--shadow-md);
}

/* ============================================
   日记页风格卡片
   ============================================ */
.card-diary {
  padding: 16px;
  background:
    repeating-linear-gradient(
      0deg,
      transparent,
      transparent 24px,
      rgba(200, 170, 100, 0.05) 24px,
      rgba(200, 170, 100, 0.05) 25px
    ),
    linear-gradient(180deg,
      hsl(225, 28%, 11%) 0%,
      hsl(220, 32%, 8%) 100%);
  border: 1px solid rgba(200, 170, 100, 0.25);
  border-left: 3px solid var(--color-blood-red);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-card);
}

/* ============================================
   通用卡片头部
   ============================================ */
.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(200, 170, 100, 0.15);
}

/* ============================================
   状态条
   ============================================ */
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
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(200, 170, 100, 0.2);
  border-radius: 4px;
  overflow: hidden;
}

.status-bar__fill {
  height: 100%;
  background: var(--gradient-blood);
  border-radius: 3px;
  transition: width var(--transition-normal);
  box-shadow: 0 0 8px rgba(180, 50, 50, 0.4);
}

.status-bar--gold .status-bar__fill {
  background: var(--gradient-gold);
  box-shadow: 0 0 8px rgba(200, 160, 60, 0.4);
}

.status-bar--success .status-bar__fill {
  background: linear-gradient(90deg, hsl(145, 55%, 30%) 0%, hsl(145, 60%, 40%) 100%);
  box-shadow: 0 0 8px rgba(60, 150, 80, 0.4);
}

.status-value {
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text-primary);
  min-width: 40px;
  text-align: right;
}

/* ============================================
   快捷操作
   ============================================ */
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
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(200, 170, 100, 0.2);
  border-radius: var(--border-radius-md);
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: all var(--transition-normal);
}

.action-btn:hover {
  background: rgba(200, 170, 100, 0.1);
  border-color: var(--color-royal-gold);
  color: var(--color-text-primary);
  transform: translateY(-2px);
  box-shadow: var(--shadow-gold);
}

.action-btn:hover .action-icon {
  color: var(--color-royal-gold);
}

.action-icon {
  transition: color var(--transition-normal);
}

.action-label {
  font-size: 13px;
  font-weight: 500;
}

/* ============================================
   事件列表
   ============================================ */
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
  border-left: 3px solid transparent;
  font-size: 13px;
  transition: all var(--transition-fast);
}

.event-item:hover {
  background: rgba(0, 0, 0, 0.3);
}

.event-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.event-item--warning {
  border-left-color: var(--color-warning);
}
.event-item--warning .event-dot {
  background: var(--color-warning);
  box-shadow: 0 0 8px var(--color-warning);
}

.event-item--info {
  border-left-color: var(--color-info);
}
.event-item--info .event-dot {
  background: var(--color-info);
  box-shadow: 0 0 8px var(--color-info);
}

.event-item--success {
  border-left-color: var(--color-success);
}
.event-item--success .event-dot {
  background: var(--color-success);
  box-shadow: 0 0 8px var(--color-success);
}

.event-item--danger {
  border-left-color: var(--color-danger);
}
.event-item--danger .event-dot {
  background: var(--color-danger);
  box-shadow: 0 0 8px var(--color-danger);
}

.event-text {
  color: var(--color-text-secondary);
}
</style>
