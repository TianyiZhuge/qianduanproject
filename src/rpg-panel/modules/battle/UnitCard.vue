<template>
  <div
    :class="[
      'unit-card',
      { 'unit-card--active': isActive },
      { 'unit-card--enemy': isEnemy },
      { 'unit-card--ally': !isEnemy },
    ]"
    @click="$emit('click')"
  >
    <!-- 塔罗牌外框 -->
    <div class="card-frame">
      <div class="frame-outer"></div>
      <div class="frame-inner"></div>

      <!-- 四角花饰 -->
      <div class="corner corner--tl"></div>
      <div class="corner corner--tr"></div>
      <div class="corner corner--bl"></div>
      <div class="corner corner--br"></div>
    </div>

    <!-- 行动指示器 -->
    <div class="action-indicator" v-if="isActive">
      <span class="indicator-text">行动中</span>
    </div>

    <!-- 卡片内容 -->
    <div class="card-content">
      <!-- 将领立绘区域 - 菱形框 -->
      <div class="card-portrait">
        <div class="portrait-frame">
          <div class="portrait-glow"></div>
          <div class="portrait-image">
            <div class="portrait-placeholder">
              {{ unit.leader.charAt(0) }}
            </div>
          </div>
        </div>
        <div class="portrait-rays"></div>
      </div>

      <!-- 兵种标签 - 缎带造型 -->
      <div class="type-ribbon">
        <span class="ribbon-text">{{ unit.type }}</span>
      </div>

      <!-- 卡片信息区域 -->
      <div class="card-info">
        <!-- 将领名称 -->
        <h4 class="leader-name">{{ unit.leader }}</h4>

        <!-- 分隔装饰 -->
        <div class="info-divider">
          <span class="divider-diamond"></span>
        </div>

        <!-- HP弧形仪表 -->
        <div class="hp-gauge">
          <div class="gauge-track">
            <div class="gauge-fill" :style="{ width: hpPercent + '%' }"></div>
          </div>
          <span class="gauge-text">{{ unit.hp }}/{{ unit.maxHp }}</span>
        </div>

        <!-- 属性徽章 -->
        <div class="stats-row">
          <div class="stat-badge stat-badge--attack">
            <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" stroke-width="2.5">
              <path
                d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"
              />
            </svg>
            <span>{{ unit.attack }}</span>
          </div>
          <div class="stat-badge stat-badge--defense">
            <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span>{{ unit.defense }}</span>
          </div>
        </div>

        <!-- 部队数量 -->
        <div class="unit-count">
          <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
          </svg>
          <span>{{ unit.count }}/{{ unit.maxCount }}</span>
        </div>
      </div>
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
/* ============================================
   塔罗牌风格单位卡片
   ============================================ */
.unit-card {
  position: relative;
  width: 150px;
  aspect-ratio: 2 / 3;
  background: linear-gradient(180deg, hsl(225, 30%, 10%) 0%, hsl(220, 35%, 6%) 100%);
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: all var(--transition-normal);
}

.unit-card:hover {
  transform: translateY(-6px) scale(1.02);
}

.unit-card--ally:hover {
  box-shadow:
    0 0 30px rgba(60, 150, 80, 0.4),
    var(--shadow-lg);
}

.unit-card--enemy:hover {
  box-shadow:
    0 0 30px rgba(180, 50, 50, 0.4),
    var(--shadow-lg);
}

.unit-card--active {
  animation: cardPulse 2s ease-in-out infinite;
}

@keyframes cardPulse {
  0%,
  100% {
    box-shadow: var(--shadow-gold);
  }
  50% {
    box-shadow: var(--shadow-gold-strong);
  }
}

/* ============================================
   塔罗牌边框系统
   ============================================ */
.card-frame {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 10;
}

.frame-outer {
  position: absolute;
  inset: 0;
  border: 3px solid var(--color-royal-gold);
  border-radius: 8px;
}

.frame-inner {
  position: absolute;
  inset: 6px;
  border: 1px solid var(--color-royal-gold-dark);
  border-radius: 4px;
}

.unit-card--ally .frame-outer {
  border-color: hsl(145, 50%, 35%);
}

.unit-card--ally .frame-inner {
  border-color: hsl(145, 45%, 25%);
}

.unit-card--enemy .frame-outer {
  border-color: var(--color-blood-red);
}

.unit-card--enemy .frame-inner {
  border-color: var(--color-blood-dark);
}

/* 四角花饰 */
.corner {
  position: absolute;
  width: 16px;
  height: 16px;
  z-index: 11;
}

.corner::before,
.corner::after {
  content: '';
  position: absolute;
  background: var(--color-royal-gold);
}

.corner::before {
  width: 100%;
  height: 2px;
}

.corner::after {
  width: 2px;
  height: 100%;
}

.corner--tl {
  top: 10px;
  left: 10px;
}
.corner--tl::before {
  top: 0;
  left: 0;
}
.corner--tl::after {
  top: 0;
  left: 0;
}

.corner--tr {
  top: 10px;
  right: 10px;
}
.corner--tr::before {
  top: 0;
  right: 0;
}
.corner--tr::after {
  top: 0;
  right: 0;
}

.corner--bl {
  bottom: 10px;
  left: 10px;
}
.corner--bl::before {
  bottom: 0;
  left: 0;
}
.corner--bl::after {
  bottom: 0;
  left: 0;
}

.corner--br {
  bottom: 10px;
  right: 10px;
}
.corner--br::before {
  bottom: 0;
  right: 0;
}
.corner--br::after {
  bottom: 0;
  right: 0;
}

.unit-card--ally .corner::before,
.unit-card--ally .corner::after {
  background: hsl(145, 55%, 40%);
}

.unit-card--enemy .corner::before,
.unit-card--enemy .corner::after {
  background: var(--color-blood-red);
}

/* ============================================
   卡片内容区域
   ============================================ */
.card-content {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 12px 10px 10px;
  z-index: 1;
}

/* ============================================
   立绘区域 - 菱形框
   ============================================ */
.card-portrait {
  position: relative;
  display: flex;
  justify-content: center;
  margin-bottom: 6px;
}

.portrait-frame {
  position: relative;
  width: 70px;
  height: 70px;
}

.portrait-glow {
  position: absolute;
  inset: -4px;
  background: var(--color-royal-gold);
  clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
  opacity: 0.8;
  animation: glowGold 3s ease-in-out infinite;
}

.unit-card--ally .portrait-glow {
  background: hsl(145, 55%, 40%);
  animation: none;
}

.unit-card--enemy .portrait-glow {
  background: var(--color-blood-red);
  animation: glowBlood 3s ease-in-out infinite;
}

.portrait-image {
  position: absolute;
  inset: 0;
  background: var(--color-ink-black);
  clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
  overflow: hidden;
}

.portrait-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-display);
  font-size: 28px;
  font-weight: 700;
  color: var(--color-parchment);
}

.unit-card--ally .portrait-placeholder {
  background: linear-gradient(135deg, hsl(145, 40%, 20%) 0%, hsl(160, 35%, 15%) 100%);
}

.unit-card--enemy .portrait-placeholder {
  background: linear-gradient(135deg, hsl(355, 50%, 25%) 0%, hsl(350, 45%, 18%) 100%);
}

/* 放射光线效果 */
.portrait-rays {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 100px;
  background: repeating-conic-gradient(from 0deg, transparent 0deg 10deg, rgba(200, 170, 100, 0.03) 10deg 20deg);
  opacity: 0.5;
  z-index: -1;
}

/* ============================================
   兵种标签 - 缎带造型
   ============================================ */
.type-ribbon {
  position: relative;
  display: flex;
  justify-content: center;
  margin-bottom: 8px;
}

.ribbon-text {
  display: inline-block;
  padding: 3px 16px;
  background: var(--gradient-gold);
  color: var(--color-ink-black);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.05em;
  clip-path: polygon(8px 0%, calc(100% - 8px) 0%, 100% 50%, calc(100% - 8px) 100%, 8px 100%, 0% 50%);
}

.unit-card--ally .ribbon-text {
  background: linear-gradient(135deg, hsl(145, 50%, 35%) 0%, hsl(145, 55%, 45%) 100%);
  color: var(--color-parchment);
}

.unit-card--enemy .ribbon-text {
  background: var(--gradient-blood);
  color: var(--color-parchment);
}

/* ============================================
   信息区域
   ============================================ */
.card-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
  text-align: center;
}

.leader-name {
  font-family: var(--font-display);
  font-size: 13px;
  font-weight: 600;
  color: var(--color-parchment);
  margin: 0;
  letter-spacing: 0.03em;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
}

/* 分隔装饰 */
.info-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 0;
}

.divider-diamond {
  width: 6px;
  height: 6px;
  background: var(--color-royal-gold);
  transform: rotate(45deg);
}

.unit-card--ally .divider-diamond {
  background: hsl(145, 55%, 40%);
}

.unit-card--enemy .divider-diamond {
  background: var(--color-blood-red);
}

/* ============================================
   HP仪表
   ============================================ */
.hp-gauge {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.gauge-track {
  width: 100%;
  height: 6px;
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(200, 170, 100, 0.3);
  border-radius: 3px;
  overflow: hidden;
}

.gauge-fill {
  height: 100%;
  background: var(--gradient-blood);
  border-radius: 2px;
  transition: width var(--transition-normal);
  box-shadow: 0 0 6px rgba(180, 50, 50, 0.5);
}

.unit-card--ally .gauge-fill {
  background: linear-gradient(90deg, hsl(145, 50%, 30%) 0%, hsl(145, 55%, 45%) 100%);
  box-shadow: 0 0 6px rgba(60, 150, 80, 0.5);
}

.gauge-text {
  font-size: 9px;
  font-weight: 600;
  color: var(--color-text-secondary);
}

/* ============================================
   属性徽章
   ============================================ */
.stats-row {
  display: flex;
  justify-content: center;
  gap: 8px;
}

.stat-badge {
  display: flex;
  align-items: center;
  gap: 3px;
  padding: 2px 6px;
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(200, 170, 100, 0.3);
  border-radius: 3px;
  font-size: 10px;
  font-weight: 600;
  color: var(--color-text-secondary);
}

.stat-badge--attack {
  border-color: rgba(180, 50, 50, 0.5);
}

.stat-badge--attack svg {
  color: var(--color-blood-red);
}

.stat-badge--defense {
  border-color: rgba(60, 150, 80, 0.5);
}

.stat-badge--defense svg {
  color: var(--color-success);
}

/* ============================================
   部队数量
   ============================================ */
.unit-count {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  font-size: 10px;
  color: var(--color-text-muted);
  margin-top: auto;
}

/* ============================================
   行动指示器
   ============================================ */
.action-indicator {
  position: absolute;
  top: 6px;
  right: 6px;
  z-index: 12;
}

.indicator-text {
  font-size: 9px;
  padding: 3px 8px;
  background: var(--gradient-gold);
  color: var(--color-ink-black);
  border-radius: 3px;
  font-weight: 700;
  letter-spacing: 0.03em;
  box-shadow: 0 0 10px rgba(200, 160, 60, 0.5);
  animation: pulse 1.5s ease-in-out infinite;
}
</style>
