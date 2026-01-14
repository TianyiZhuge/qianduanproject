<template>
  <div class="page-container">
    <div class="page-header glass-panel">
      <h2 class="title title--lg title--gradient">征服</h2>
      <p class="page-desc">世界地图与领土扩张</p>
    </div>

    <div class="page-content">
      <div class="placeholder-card glass-panel">
        <div class="placeholder-icon">
          <svg viewBox="0 0 24 24" width="64" height="64" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="12" cy="12" r="10" />
            <path d="M2 12h20" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
        </div>
        <h3 class="placeholder-title">征服模块</h3>
        <p class="placeholder-text">此模块正在开发中</p>
        <div class="placeholder-features">
          <div class="feature-item">
            <span class="feature-dot"></span>
            <span>世界地图</span>
          </div>
          <div class="feature-item">
            <span class="feature-dot"></span>
            <span>领土管理</span>
          </div>
          <div class="feature-item">
            <span class="feature-dot"></span>
            <span>战役规划</span>
          </div>
          <div class="feature-item">
            <span class="feature-dot"></span>
            <span>外交系统</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: calc(100vh - 140px);
}

.page-header {
  padding: 24px;
  text-align: center;
}

.page-desc {
  margin-top: 8px;
  color: var(--color-text-secondary);
}

.page-content {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.placeholder-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 48px;
  text-align: center;
  max-width: 400px;
}

.placeholder-icon {
  color: var(--color-accent-tertiary);
  margin-bottom: 24px;
  opacity: 0.6;
}

.placeholder-title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 8px;
}

.placeholder-text {
  color: var(--color-text-muted);
  margin-bottom: 24px;
}

.placeholder-features {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: var(--border-radius-md);
  color: var(--color-text-secondary);
}

.feature-dot {
  width: 8px;
  height: 8px;
  background: var(--color-accent-tertiary);
  border-radius: 50%;
}
</style>
