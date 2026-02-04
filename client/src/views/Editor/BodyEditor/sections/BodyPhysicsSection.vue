<!-- client/src/views/Editor/BodyEditor/sections/BodyPhysicsSection.vue -->
<template>
  <div v-if="body">
    <n-grid :x-gap="16" :y-gap="16" cols="1 l:2" responsive="screen">

      <!-- Left Column: Physics & Motion -->
      <n-gi>
        <n-space vertical size="large">

          <!-- Basic Limits -->
          <n-card title="基础速度限制 (Limits)" size="small">
            <template #header-extra><n-tag size="small" type="info">Basic</n-tag></template>
            <n-grid :cols="3" :x-gap="8">
              <n-gi>
                <n-form-item label="水平限速 (MaxVx)">
                  <n-input-number v-model:value="body.maxVx" size="small" :step="0.5" />
                </n-form-item>
              </n-gi>
              <n-gi>
                <n-form-item label="垂直限速 (MaxVy)">
                  <n-input-number v-model:value="body.maxVy" size="small" :step="0.5" />
                </n-form-item>
              </n-gi>
              <n-gi>
                <n-form-item label="最大跳跃 (JumpNum)">
                  <n-input-number v-model:value="body.maxJumpNum" size="small" min="0" />
                </n-form-item>
              </n-gi>
            </n-grid>
          </n-card>

          <!-- Physics Engine (motionD) -->
          <n-card title="物理参数 (Physics Engine)" size="small">
            <template #header-extra><n-text depth="3" class="text-xs">motionD.*</n-text></template>

            <n-divider title-placement="left" style="margin: 0 0 12px 0; font-size: 12px; color: #999;">力与阻力
              (Forces)</n-divider>
            <n-grid :cols="2" :x-gap="12" :y-gap="12">
              <n-gi v-for="meta in forceMetas" :key="meta.key">
                <MetaFormItem :meta="meta" v-model:modelValue="body.motionD[meta.key]" :show-label="true" />
              </n-gi>
            </n-grid>

            <n-divider title-placement="left" style="margin: 12px 0 12px 0; font-size: 12px; color: #999;">运动行为
              (Behavior)</n-divider>
            <n-grid :cols="2" :x-gap="12" :y-gap="12">
              <n-gi v-for="meta in behaviorMetas" :key="meta.key">
                <MetaFormItem :meta="meta" v-model:modelValue="body.motionD[meta.key]" :show-label="true" />
              </n-gi>
            </n-grid>
          </n-card>

        </n-space>
      </n-gi>

      <!-- Right Column: AI & Extensions -->
      <n-gi>
        <n-space vertical size="large">

          <!-- AI Logic -->
          <n-card title="AI 逻辑与感知 (AI Logic)" size="small">
            <template #header-extra><n-icon color="#e6a23c"><i class="ad-brain" /></n-icon></template>
            <n-grid :cols="2" :x-gap="12" :y-gap="12">
              <n-gi v-for="meta in BODY_AI_METAS" :key="meta.key">
                <MetaFormItem :meta="meta" v-model:modelValue="body[meta.key]" :show-label="true" />
              </n-gi>
            </n-grid>
          </n-card>

          <!-- Movement Extensions -->
          <n-card title="移动扩展 (Extensions)" size="small">
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
import { useBodyState } from '../hooks/useBodyState';
import { BODY_PHYSICS_METAS, BODY_AI_METAS, BODY_MOVE_EXT_METAS } from '../config';
import MetaFormItem from '../../../components/MetaFormItem.vue';

const { selectedBody: body } = useBodyState();

const forceKeys = ['F_G', 'F_I', 'F_F', 'F_AIR'];
const forceMetas = computed(() => BODY_PHYSICS_METAS.filter(m => forceKeys.includes(m.key)));
const behaviorMetas = computed(() => BODY_PHYSICS_METAS.filter(m => !forceKeys.includes(m.key)));
</script>

<style scoped>
.text-xs {
  font-size: 12px;
}
</style>