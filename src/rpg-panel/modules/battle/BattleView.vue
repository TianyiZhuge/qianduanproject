<template>
  <div class="battle-view">
    <!-- 战场区域 -->
    <div class="battlefield">
      <!-- 敌方区域 -->
      <div class="army-section army-section--enemy">
        <h3 class="army-title">
          <span class="army-indicator enemy"></span>
          敌方部队
        </h3>
        <div class="units-grid">
          <UnitCard
            v-for="unit in enemyUnits"
            :key="unit.id"
            :unit="unit"
            :isActive="activeUnit?.id === unit.id"
            :isEnemy="true"
            @click="selectTarget(unit)"
          />
        </div>
      </div>

      <!-- 战场中央信息 -->
      <div class="battle-center">
        <div class="turn-indicator glass-panel">
          <span class="turn-label">当前回合</span>
          <span class="turn-number">{{ currentTurn }}</span>
        </div>
        <div class="action-log glass-panel">
          <p class="log-text">{{ lastAction || '战斗开始！' }}</p>
        </div>
      </div>

      <!-- 我方区域 -->
      <div class="army-section army-section--ally">
        <h3 class="army-title">
          <span class="army-indicator ally"></span>
          我方部队
        </h3>
        <div class="units-grid">
          <UnitCard
            v-for="unit in allyUnits"
            :key="unit.id"
            :unit="unit"
            :isActive="activeUnit?.id === unit.id"
            :isEnemy="false"
            @click="selectUnit(unit)"
          />
        </div>
      </div>
    </div>

    <!-- 底部操作栏 -->
    <div class="battle-controls glass-panel">
      <div class="selected-unit-info" v-if="selectedUnit">
        <div class="unit-portrait">
          <div class="portrait-placeholder">
            {{ selectedUnit.leader.charAt(0) }}
          </div>
        </div>
        <div class="unit-details">
          <h4 class="unit-name">{{ selectedUnit.leader }}</h4>
          <p class="unit-type">{{ selectedUnit.type }} · {{ selectedUnit.count }}人</p>
        </div>
      </div>
      <div class="selected-unit-info" v-else>
        <p class="no-selection">选择一个单位进行操作</p>
      </div>

      <div class="skill-bar">
        <button
          v-for="skill in skills"
          :key="skill.id"
          :class="['skill-btn', { 'skill-btn--disabled': !selectedUnit }]"
          :disabled="!selectedUnit"
          @click="useSkill(skill)"
        >
          <span class="skill-icon" v-html="skill.icon"></span>
          <span class="skill-name">{{ skill.name }}</span>
          <span class="skill-cost" v-if="skill.cost">{{ skill.cost }}</span>
        </button>
      </div>

      <div class="battle-actions">
        <button class="btn btn--ghost" @click="endTurn">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="13,17 18,12 13,7" />
            <polyline points="6,17 11,12 6,7" />
          </svg>
          结束回合
        </button>
        <button class="btn btn--danger" @click="retreat">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16,17 21,12 16,7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          撤退
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import UnitCard from './UnitCard.vue';

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

interface Skill {
  id: string;
  name: string;
  icon: string;
  cost?: number;
}

// 示例数据
const currentTurn = ref(1);
const lastAction = ref('');

const enemyUnits = ref<Unit[]>([
  {
    id: 'e1',
    leader: '黑骑士',
    type: '重骑兵',
    count: 120,
    maxCount: 150,
    hp: 80,
    maxHp: 100,
    attack: 45,
    defense: 35,
  },
  { id: 'e2', leader: '暗法师', type: '法师', count: 80, maxCount: 100, hp: 60, maxHp: 100, attack: 55, defense: 15 },
  {
    id: 'e3',
    leader: '兽人队长',
    type: '步兵',
    count: 200,
    maxCount: 200,
    hp: 100,
    maxHp: 100,
    attack: 35,
    defense: 25,
  },
]);

const allyUnits = ref<Unit[]>([
  {
    id: 'a1',
    leader: '艾琳娜',
    type: '圣骑士',
    count: 100,
    maxCount: 100,
    hp: 100,
    maxHp: 100,
    attack: 40,
    defense: 40,
  },
  { id: 'a2', leader: '莱昂', type: '剑士', count: 150, maxCount: 150, hp: 90, maxHp: 100, attack: 50, defense: 30 },
  { id: 'a3', leader: '米娅', type: '弓箭手', count: 80, maxCount: 80, hp: 100, maxHp: 100, attack: 45, defense: 20 },
  { id: 'a4', leader: '索菲亚', type: '治疗师', count: 50, maxCount: 50, hp: 100, maxHp: 100, attack: 15, defense: 25 },
]);

const activeUnit = ref<Unit | null>(allyUnits.value[0]);
const selectedUnit = ref<Unit | null>(null);

const skills: Skill[] = [
  {
    id: 'attack',
    name: '普通攻击',
    icon: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>',
  },
  {
    id: 'skill1',
    name: '技能一',
    icon: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13,2 3,14 12,14 11,22 21,10 12,10"/></svg>',
    cost: 2,
  },
  {
    id: 'skill2',
    name: '技能二',
    icon: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
    cost: 3,
  },
  {
    id: 'defend',
    name: '防御',
    icon: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
  },
];

function selectUnit(unit: Unit) {
  selectedUnit.value = unit;
}

function selectTarget(unit: Unit) {
  if (selectedUnit.value) {
    lastAction.value = `${selectedUnit.value.leader} 准备攻击 ${unit.leader}`;
  }
}

function useSkill(skill: Skill) {
  if (selectedUnit.value) {
    lastAction.value = `${selectedUnit.value.leader} 使用了 ${skill.name}`;
  }
}

function endTurn() {
  currentTurn.value++;
  lastAction.value = '回合结束，敌方行动中...';
}

function retreat() {
  lastAction.value = '正在撤退...';
}
</script>

<style scoped>
.battle-view {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
}

/* === 战场区域 === */
.battlefield {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 20px;
  overflow-y: auto;
}

.army-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.army-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.army-indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.army-indicator.enemy {
  background: var(--color-danger);
  box-shadow: 0 0 10px var(--color-danger);
}

.army-indicator.ally {
  background: var(--color-success);
  box-shadow: 0 0 10px var(--color-success);
}

.units-grid {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

/* === 战场中央 === */
.battle-center {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  padding: 16px;
}

.turn-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 24px;
}

.turn-label {
  font-size: 12px;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.turn-number {
  font-family: var(--font-display);
  font-size: 32px;
  font-weight: 700;
  background: var(--gradient-gold);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.action-log {
  padding: 12px 20px;
  max-width: 400px;
}

.log-text {
  font-size: 14px;
  color: var(--color-text-secondary);
  text-align: center;
}

/* === 底部控制栏 === */
.battle-controls {
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 16px 24px;
  border-radius: var(--border-radius-lg) var(--border-radius-lg) 0 0;
}

.selected-unit-info {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 200px;
}

.unit-portrait {
  width: 48px;
  height: 48px;
  border-radius: var(--border-radius-md);
  overflow: hidden;
  border: 2px solid var(--color-accent-primary);
}

.portrait-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--gradient-primary);
  font-size: 20px;
  font-weight: 700;
}

.unit-name {
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 2px;
}

.unit-type {
  font-size: 13px;
  color: var(--color-text-secondary);
}

.no-selection {
  color: var(--color-text-muted);
  font-size: 14px;
}

/* === 技能栏 === */
.skill-bar {
  flex: 1;
  display: flex;
  gap: 10px;
  justify-content: center;
}

.skill-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 12px 16px;
  min-width: 80px;
  background: rgba(0, 0, 0, 0.3);
  border: var(--border-subtle);
  border-radius: var(--border-radius-md);
  color: var(--color-text-primary);
  cursor: pointer;
  transition: all var(--transition-normal);
  position: relative;
}

.skill-btn:hover:not(.skill-btn--disabled) {
  background: rgba(155, 89, 255, 0.2);
  border-color: var(--color-accent-primary);
  transform: translateY(-2px);
}

.skill-btn--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.skill-icon {
  display: flex;
  color: var(--color-accent-primary);
}

.skill-name {
  font-size: 12px;
  font-weight: 500;
}

.skill-cost {
  position: absolute;
  top: 4px;
  right: 4px;
  font-size: 10px;
  padding: 2px 6px;
  background: var(--color-accent-secondary);
  color: hsl(230, 25%, 10%);
  border-radius: 10px;
  font-weight: 600;
}

/* === 战斗操作 === */
.battle-actions {
  display: flex;
  gap: 10px;
}

.btn--danger {
  background: rgba(220, 53, 69, 0.2);
  border-color: var(--color-danger);
  color: var(--color-danger);
}

.btn--danger:hover {
  background: var(--color-danger);
  color: white;
  box-shadow: 0 0 20px rgba(220, 53, 69, 0.3);
}
</style>
