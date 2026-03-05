<!-- client/src/views/Editor/BodyEditor/sections/BodyBasicSection.vue -->
<template>
  <div v-if="body" class="basic-section">
    <n-collapse :default-expanded-names="['identity']" arrow-placement="right">
      <!-- 身份与描述 -->
      <n-collapse-item name="identity" class="premium-collapse-item">
        <template #header>
          <n-space align="center" :size="8">
            <n-icon :component="FingerPrintOutline" color="var(--primary-color)" />
            <span>基本身份与描述 (Identity)</span>
          </n-space>
        </template>
        <div class="section-content">
          <n-grid :cols="3" :x-gap="12" :y-gap="12">
            <n-gi v-for="meta in identityMetas" :key="meta.key">
              <MetaFormItem :meta="meta" v-model:modelValue="body[meta.key]" :show-label="true" />
            </n-gi>
          </n-grid>
        </div>
      </n-collapse-item>

      <!-- 类型与阵营 -->
      <n-collapse-item name="type" class="premium-collapse-item">
        <template #header>
          <n-space align="center" :size="8">
            <n-icon :component="PeopleOutline" color="#f2c97d" />
            <span>类型与阵营 (Type & Race)</span>
          </n-space>
        </template>
        <div class="section-content">
          <n-grid :cols="3" :x-gap="12" :y-gap="12">
            <n-gi v-for="meta in typeMetas" :key="meta.key">
              <MetaFormItem :meta="meta" v-model:modelValue="body[meta.key]" :show-label="true" />
            </n-gi>
          </n-grid>
        </div>
      </n-collapse-item>

      <!-- 资源与外观 -->
      <n-collapse-item name="assets" class="premium-collapse-item">
        <template #header>
          <n-space align="center" :size="8">
            <n-icon :component="ImageOutline" color="#70c0e8" />
            <span>资源与外观 (Assets)</span>
          </n-space>
        </template>
        <div class="section-content">
          <n-grid :cols="3" :x-gap="12" :y-gap="12">
            <n-gi v-for="meta in assetMetas" :key="meta.key">
              <MetaFormItem :meta="meta" v-model:modelValue="body[meta.key]" :show-label="true" />
            </n-gi>
          </n-grid>
        </div>
      </n-collapse-item>

      <!-- 行为控制 -->
      <n-collapse-item name="behavior" class="premium-collapse-item">
        <template #header>
          <n-space align="center" :size="8">
            <n-icon :component="ExtensionPuzzleOutline" color="#e88080" />
            <span>行为与控制 (Behavior)</span>
          </n-space>
        </template>
        <div class="section-content">
          <n-grid :cols="3" :x-gap="12" :y-gap="12">
            <n-gi v-for="meta in behaviorMetas" :key="meta.key">
              <MetaFormItem :meta="meta" v-model:modelValue="body[meta.key]" :show-label="true" />
            </n-gi>
          </n-grid>
        </div>
      </n-collapse-item>
    </n-collapse>

    <!-- Hero 专属配置 -->
    <n-card v-if="body.systemType === 'hero'" title="英雄专属配置 (Hero Config)" size="small"
      class="premium-card hero-config">
      <template #header-extra>
        <n-tag type="warning" size="small" round>HERO ONLY</n-tag>
      </template>
      <n-grid :cols="2" :x-gap="12" :y-gap="12">
        <n-gi v-for="meta in BODY_HERO_METAS" :key="meta.key">
          <MetaFormItem :meta="meta" v-model:modelValue="body[meta.key]" :show-label="true" />
        </n-gi>
      </n-grid>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { FingerPrintOutline, PeopleOutline, ImageOutline, ExtensionPuzzleOutline } from '@vicons/ionicons5';
import { useBodyState } from '../hooks/useBodyState';
import { BODY_BASIC_METAS, BODY_HERO_METAS } from '../config';
import MetaFormItem from '../../../components/MetaFormItem.vue';

const { selectedBody: body } = useBodyState();

// 分组定义
const groupKeys = {
  identity: ['name', 'cnName', 'description', 'map', 'shell', 'skillArr', 'bossSkillArr', 'bossSkillArrCn', 'demBossSkillArr'],
  type: ['systemType', 'raceType', 'sex', 'canBossB', 'extraDropArmsB'],
  assets: ['swfUrl', 'swfName', 'bmpUrl', 'headIconUrl', 'imgType', 'imgArr', 'dieEffectPartName'],
  behavior: ['normalScaleX', 'lockLeftB', 'flipCtrlBy', 'rotateBySlopeB', 'shell']
};

const filterMetas = (keys: string[]) => BODY_BASIC_METAS.filter(m => keys.includes(m.key));

const identityMetas = computed(() => filterMetas(groupKeys.identity));
const typeMetas = computed(() => filterMetas(groupKeys.type));
const assetMetas = computed(() => filterMetas(groupKeys.assets));
const behaviorMetas = computed(() => filterMetas(groupKeys.behavior));
</script>

<style scoped>
.basic-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.section-content {
  padding: 12px 0 20px 0;
}

.hero-config {
  margin-top: 8px;
  border: 1px dashed rgba(242, 201, 125, 0.3) !important;
}

:deep(.n-collapse-item__header) {
  border: 1px solid rgba(255, 255, 255, 0.05) !important;
  background: rgba(255, 255, 255, 0.02) !important;
  transition: all 0.3s ease !important;
}

:deep(.n-collapse-item__header--active) {
  border-color: rgba(24, 160, 88, 0.3) !important;
  background: rgba(24, 160, 88, 0.03) !important;
}
</style>
