<template>
  <div class="page-container">
    <div class="page-header glass-panel">
      <h2 class="title title--lg title--gradient">调教</h2>
      <p class="page-desc">训练和提升将领能力</p>
    </div>

    <div class="page-content">
      <div class="placeholder-card glass-panel">
        <div class="placeholder-icon">
          <svg viewBox="0 0 24 24" width="64" height="64" fill="none" stroke="currentColor" stroke-width="1.5">
            <path
              d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"
            />
          </svg>
        </div>
        <h3 class="placeholder-title">调教模块</h3>
        <p class="placeholder-text">此模块正在开发中</p>
        <div class="placeholder-features">
          <div class="feature-item">
            <span class="feature-dot"></span>
            <span>将领训练</span>
          </div>
          <div class="feature-item">
            <span class="feature-dot"></span>
            <span>技能学习</span>
          </div>
          <div class="feature-item">
            <span class="feature-dot"></span>
            <span>属性提升</span>
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
  gap: 12px;
  width: 100%;
  aspect-ratio: 16 / 9;
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
  color: var(--color-accent-primary);
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
  background: var(--color-accent-primary);
  border-radius: 50%;
}
</style>
