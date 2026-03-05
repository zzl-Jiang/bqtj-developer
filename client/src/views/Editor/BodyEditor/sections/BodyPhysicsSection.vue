<!-- client/src/views/Editor/BodyEditor/sections/BodyPhysicsSection.vue -->
<template>
  <div v-if="body" class="physics-section">
    <n-grid :x-gap="20" :y-gap="20" cols="1 l:2" responsive="screen">

      <!-- 左侧：物理 & 移动 -->
      <n-gi>
        <n-space vertical :size="20">

          <!-- 基础限制 -->
          <n-card title="速度与跳跃限制 (Movement Limits)" size="small" class="premium-card">
            <template #header-extra>
              <n-icon :component="SpeedometerOutline" color="var(--primary-color)" size="20" />
            </template>
            <n-grid :cols="3" :x-gap="12">
              <n-gi>
                <div class="mini-form-item">
                  <div class="mini-label">最大水平速度</div>
                  <n-input-number v-model:value="body.maxVx" size="small" :step="0.5" />
                </div>
              </n-gi>
              <n-gi>
                <div class="mini-form-item">
                  <div class="mini-label">最大垂直速度</div>
                  <n-input-number v-model:value="body.maxVy" size="small" :step="0.5" />
                </div>
              </n-gi>
              <n-gi>
                <div class="mini-form-item">
                  <div class="mini-label">最大跳跃次数</div>
                  <n-input-number v-model:value="body.maxJumpNum" size="small" min="0" />
                </div>
              </n-gi>
            </n-grid>
          </n-card>

          <!-- 物理参数 -->
          <n-card title="物理引擎参数 (Physics Engine)" size="small" class="premium-card">
            <template #header-extra>
              <n-icon :component="PhysicsIcon" color="#70c0e8" size="20" />
            </template>

            <div class="stat-group">
              <div class="group-header">
                <n-icon :component="ArrowDownOutline" />
                <span>受力与阻力控制 (Forces & Friction)</span>
              </div>
              <n-grid :cols="2" :x-gap="12" :y-gap="12">
                <n-gi v-for="meta in forceMetas" :key="meta.key">
                  <MetaFormItem :meta="meta" v-model:modelValue="body.motionD[meta.key]" :show-label="true" />
                </n-gi>
              </n-grid>
            </div>

            <n-divider class="premium-divider" />

            <div class="stat-group">
              <div class="group-header">
                <n-icon :component="BicycleOutline" />
                <span>地面与空中行为 (Motion Behavior)</span>
              </div>
              <n-grid :cols="2" :x-gap="12" :y-gap="12">
                <n-gi v-for="meta in behaviorMetas" :key="meta.key">
                  <MetaFormItem :meta="meta" v-model:modelValue="body.motionD[meta.key]" :show-label="true" />
                </n-gi>
              </n-grid>
            </div>
          </n-card>

        </n-space>
      </n-gi>

      <!-- 右侧：AI & 扩展 -->
      <n-gi>
        <n-space vertical :size="20">

          <!-- AI 逻辑 -->
          <n-card title="AI 感知与决策 (AI Decision)" size="small" class="premium-card">
            <template #header-extra>
              <n-icon color="#f2c97d" size="20"><i class="ad-brain" /></n-icon>
            </template>
            <n-grid :cols="2" :x-gap="12" :y-gap="12" class="p-2">
              <n-gi v-for="meta in BODY_AI_METAS" :key="meta.key">
                <MetaFormItem :meta="meta" v-model:modelValue="body[meta.key]" :show-label="true" />
              </n-gi>
            </n-grid>
          </n-card>

          <!-- 移动扩展 -->
          <n-card title="特殊移动扩展 (Special Moves)" size="small" class="premium-card">
            <template #header-extra>
              <n-icon :component="ExtensionPuzzleOutline" color="#e88080" size="20" />
            </template>
            <n-grid :cols="2" :x-gap="12" :y-gap="12">
              <n-gi v-for="meta in BODY_MOVE_EXT_METAS" :key="meta.key">
                <MetaFormItem :meta="meta" v-model:modelValue="body[meta.key]" :show-label="true" />
              </n-gi>
            </n-grid>
          </n-card>

        </n-space>
      </n-gi>
    </n-grid>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import {
  SpeedometerOutline,
  ArrowDownOutline,
  BicycleOutline,
  ExtensionPuzzleOutline,
  AppsOutline as PhysicsIcon
} from '@vicons/ionicons5';
import { useBodyState } from '../hooks/useBodyState';
import { BODY_PHYSICS_METAS, BODY_AI_METAS, BODY_MOVE_EXT_METAS } from '../config';
import MetaFormItem from '../../../components/MetaFormItem.vue';

const { selectedBody: body } = useBodyState();

const forceKeys = ['F_G', 'F_I', 'F_F', 'F_AIR'];
const forceMetas = computed(() => BODY_PHYSICS_METAS.filter(m => forceKeys.includes(m.key)));
const behaviorMetas = computed(() => BODY_PHYSICS_METAS.filter(m => !forceKeys.includes(m.key)));
</script>

<style scoped>
.physics-section {
  padding-bottom: 32px;
}

.mini-form-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.mini-label {
  font-size: 11px;
  font-weight: 600;
  opacity: 0.5;
  padding-left: 2px;
}

.stat-group {
  margin-bottom: 4px;
}

.group-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 700;
  opacity: 0.6;
  margin-bottom: 20px;
  color: #fff;
  padding-left: 4px;
}

.premium-divider {
  margin: 16px 0 24px 0;
  opacity: 0.05;
}

:deep(.n-input-number) {
  border-radius: 8px !important;
}
</style>