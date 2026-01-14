<template>
  <div
    :class="[
      'unit-card',
      { 'unit-card--active': isActive },
      { 'unit-card--enemy': isEnemy },
      { 'unit-card--ally': !isEnemy }
    ]"
    @click="$emit('click')"
  >
    <!-- 卡片边框光效 -->
    <div class="card-glow" v-if="isActive"></div>

    <!-- 将领立绘区域 -->
    <div class="card-portrait">
      <div class="portrait-image">
        <!-- 占位符，实际使用时替换为图片 -->
        <div class="portrait-placeholder">
          {{ unit.leader.charAt(0) }}
        </div>
      </div>
      <div class="portrait-overlay"></div>
    </div>

    <!-- 卡片信息区域 -->
    <div class="card-info">
      <!-- 将领名称 -->
      <h4 class="leader-name">{{ unit.leader }}</h4>

      <!-- 兵种类型 -->
      <div class="unit-type">
        <span class="type-badge">{{ unit.type }}</span>
      </div>

      <!-- 部队数量 -->
      <div class="unit-count">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
        <span>{{ unit.count }}/{{ unit.maxCount }}</span>
      </div>

      <!-- HP条 -->
      <div class="hp-bar">
        <div class="hp-bar__fill" :style="{ width: hpPercent + '%' }"></div>
        <span class="hp-text">{{ unit.hp }}/{{ unit.maxHp }}</span>
      </div>

      <!-- 属性简览 -->
      <div class="stats-row">
        <div class="stat">
          <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
          </svg>
          {{ unit.attack }}
        </div>
        <div class="stat">
          <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
          {{ unit.defense }}
        </div>
      </div>
    </div>

    <!-- 行动指示器 -->
    <div class="action-indicator" v-if="isActive">
      <span class="indicator-text">行动中</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Unit {
  id: string;
  leader: string;
  type: string;
  count: number;
  maxCount: number;
  hp: number;
  maxHp: number;
  attack: number;
  defense: number;
}

const props = defineProps<{
  unit: Unit;
  isActive?: boolean;
  isEnemy?: boolean;
}>();

defineEmits(['click']);

const hpPercent = computed(() => (props.unit.hp / props.unit.maxHp) * 100);
</script>

<style scoped>
.unit-card {
  position: relative;
  width: 160px;
  background: var(--glass-bg);
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  cursor: pointer;
  transition: all var(--transition-normal);
}

.unit-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.unit-card--ally:hover {
  border-color: var(--color-success);
  box-shadow: 0 0 20px rgba(40, 167, 69, 0.3);
}

.unit-card--enemy:hover {
  border-color: var(--color-danger);
  box-shadow: 0 0 20px rgba(220, 53, 69, 0.3);
}

.unit-card--active {
  animation: glow 2s ease-in-out infinite;
}

.unit-card--active.unit-card--ally {
  border-color: var(--color-success);
  box-shadow: 0 0 25px rgba(40, 167, 69, 0.5);
}

.unit-card--active.unit-card--enemy {
  border-color: var(--color-danger);
  box-shadow: 0 0 25px rgba(220, 53, 69, 0.5);
}

/* === 光效 === */
.card-glow {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: conic-gradient(
    from 0deg,
    transparent,
    var(--color-accent-primary),
    transparent,
    transparent
  );
  animation: rotate 3s linear infinite;
  opacity: 0.3;
  z-index: 0;
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* === 立绘区域 === */
.card-portrait {
  position: relative;
  height: 100px;
  overflow: hidden;
}

.portrait-image {
  width: 100%;
  height: 100%;
}

.portrait-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36px;
  font-weight: 700;
  color: var(--color-text-primary);
}

.unit-card--ally .portrait-placeholder {
  background: linear-gradient(135deg, hsl(200, 60%, 25%) 0%, hsl(220, 50%, 20%) 100%);
}

.unit-card--enemy .portrait-placeholder {
  background: linear-gradient(135deg, hsl(0, 50%, 25%) 0%, hsl(350, 40%, 20%) 100%);
}

.portrait-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 40px;
  background: linear-gradient(to top, var(--glass-bg), transparent);
}

/* === 信息区域 === */
.card-info {
  position: relative;
  z-index: 1;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.leader-name {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text-primary);
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.unit-type {
  display: flex;
}

.type-badge {
  font-size: 11px;
  padding: 2px 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  color: var(--color-text-secondary);
}

.unit-count {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: var(--color-text-secondary);
}

/* === HP条 === */
.hp-bar {
  position: relative;
  height: 16px;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 8px;
  overflow: hidden;
}

.hp-bar__fill {
  height: 100%;
  background: linear-gradient(90deg, var(--color-danger) 0%, var(--color-success) 100%);
  border-radius: 8px;
  transition: width var(--transition-normal);
}

.hp-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 10px;
  font-weight: 600;
  color: white;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
}

/* === 属性 === */
.stats-row {
  display: flex;
  gap: 12px;
}

.stat {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  color: var(--color-text-secondary);
}

/* === 行动指示器 === */
.action-indicator {
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 2;
}

.indicator-text {
  font-size: 10px;
  padding: 3px 8px;
  background: var(--color-accent-primary);
  color: white;
  border-radius: 10px;
  font-weight: 600;
  animation: pulse 1.5s ease-in-out infinite;
}
</style>
