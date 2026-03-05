<!-- client/src/views/Editor/BodyEditor/sections/BodyBattleSection.vue -->
<template>
  <div v-if="body" class="battle-section">
    <n-grid :x-gap="16" :y-gap="16" cols="1 s:1 m:2" responsive="screen">
      <!-- 左侧：战斗属性 -->
      <n-gi>
        <n-card title="战斗数值核心 (Battle Core)" size="small" class="premium-card h-full">
          <template #header-extra>
            <n-icon :component="FlashOutline" size="20" color="var(--primary-color)" />
          </template>

          <div class="stat-group">
            <div class="group-header">
              <n-icon :component="ShieldCheckmarkOutline" />
              <span>生存与防御 (Survival & Defense)</span>
            </div>
            <n-grid :cols="2" :x-gap="12" :y-gap="12">
              <n-gi v-for="meta in survivalMetas" :key="meta.key">
                <MetaFormItem :meta="meta" v-model:modelValue="body[meta.key]" :show-label="true" />
              </n-gi>
            </n-grid>
          </div>

          <n-divider class="premium-divider" />

          <div class="stat-group">
            <div class="group-header">
              <n-icon :component="FlameOutline" />
              <span>攻击与机能 (Offense & Performance)</span>
            </div>
            <n-grid :cols="2" :x-gap="12" :y-gap="12">
              <n-gi v-for="meta in offenseMetas" :key="meta.key">
                <MetaFormItem :meta="meta" v-model:modelValue="body[meta.key]" :show-label="true" />
              </n-gi>
              <n-gi v-for="meta in miscMetas" :key="meta.key">
                <MetaFormItem :meta="meta" v-model:modelValue="body[meta.key]" :show-label="true" />
              </n-gi>
            </n-grid>
          </div>
        </n-card>
      </n-gi>

      <!-- 右侧: UI & 提示 -->
      <n-gi>
        <n-space vertical :size="16">
          <n-card title="生命条显示 (UI Lifebar)" size="small" class="premium-card">
            <template #header-extra>
              <n-icon :component="ColorWandOutline" size="20" color="#70c0e8" />
            </template>
            <n-grid :cols="1" :y-gap="12">
              <n-gi v-for="meta in BODY_LIFEBAR_METAS" :key="meta.key">
                <MetaFormItem :meta="meta" v-model:modelValue="body[meta.key]" :show-label="true" />
              </n-gi>
            </n-grid>
          </n-card>

          <n-alert title="属性配置指南" type="info" class="premium-alert" :bordered="false">
            <template #icon>
              <n-icon>
                <InformationCircleOutline />
              </n-icon>
            </template>
            <div class="alert-content">
              <div>• <b>生命系数</b>: 基础血量的放大倍率，如 2.5 表示 2.5 倍血量。</div>
              <div>• <b>僵直阈值</b>: 当瞬时伤害超过此比例（如 0.2/20%）时进入僵硬。</div>
              <div>• <b>爆头倍率</b>: 击中头部时的伤害权重，通常为 2.0。</div>
              <div>• <b>双层血条</b>: 仅核心 BOSS/特定大型精英单位建议开启。</div>
            </div>
          </n-alert>
        </n-space>
      </n-gi>
    </n-grid>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import {
  FlashOutline,
  ShieldCheckmarkOutline,
  FlameOutline,
  ColorWandOutline,
  InformationCircleOutline
} from '@vicons/ionicons5';
import { useBodyState } from '../hooks/useBodyState';
import { BODY_BATTLE_METAS, BODY_LIFEBAR_METAS } from '../config';
import MetaFormItem from '../../../components/MetaFormItem.vue';

const { selectedBody: body } = useBodyState();

const survivalKeys = ['lifeRatio', 'defenceRatio', 'rosRatio', 'headHurtMul'];
const offenseKeys = ['shootLenMul', 'nextAttackTime', 'superDpsAdd', 'avtiveSkillCdOverT'];

const survivalMetas = computed(() => BODY_BATTLE_METAS.filter(m => survivalKeys.includes(m.key)));
const offenseMetas = computed(() => BODY_BATTLE_METAS.filter(m => offenseKeys.includes(m.key)));
const miscMetas = computed(() => BODY_BATTLE_METAS.filter(m => !survivalKeys.includes(m.key) && !offenseKeys.includes(m.key)));
</script>

<style scoped>
.battle-section {
  padding-bottom: 24px;
}

.h-full {
  height: 100%;
}

.stat-group {
  margin-bottom: 8px;
}

.group-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 700;
  opacity: 0.6;
  margin-bottom: 16px;
  color: #fff;
}

.premium-divider {
  margin: 12px 0 20px 0;
  opacity: 0.05;
}

.premium-alert {
  background: rgba(112, 192, 232, 0.05) !important;
  border: 1px solid rgba(112, 192, 232, 0.1) !important;
  border-radius: 12px;
}

.alert-content {
  font-size: 12px;
  line-height: 1.8;
  opacity: 0.8;
}
</style>
