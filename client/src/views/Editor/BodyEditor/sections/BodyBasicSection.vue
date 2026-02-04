<!-- client/src/views/Editor/BodyEditor/sections/BodyBasicSection.vue -->
<template>
  <div v-if="body">
    <n-collapse :default-expanded-names="['identity']">

      <!-- 身份与描述 -->
      <n-collapse-item title="基本身份 (Identity)" name="identity">
        <n-card embedded size="small">
          <n-grid :cols="3" :x-gap="12" :y-gap="12">
            <n-gi v-for="meta in identityMetas" :key="meta.key">
              <MetaFormItem :meta="meta" v-model:modelValue="body[meta.key]" :show-label="true" />
            </n-gi>
          </n-grid>
        </n-card>
      </n-collapse-item>

      <!-- 类型与阵营 -->
      <n-collapse-item title="类型与阵营 (Type & Race)" name="type">
        <n-card embedded size="small">
          <n-grid :cols="3" :x-gap="12" :y-gap="12">
            <n-gi v-for="meta in typeMetas" :key="meta.key">
              <MetaFormItem :meta="meta" v-model:modelValue="body[meta.key]" :show-label="true" />
            </n-gi>
          </n-grid>
        </n-card>
      </n-collapse-item>

      <!-- 资源与外观 -->
      <n-collapse-item title="资源与外观 (Assets)" name="assets">
        <n-card embedded size="small">
          <n-grid :cols="3" :x-gap="12" :y-gap="12">
            <n-gi v-for="meta in assetMetas" :key="meta.key">
              <MetaFormItem :meta="meta" v-model:modelValue="body[meta.key]" :show-label="true" />
            </n-gi>
          </n-grid>
        </n-card>
      </n-collapse-item>

      <!-- 行为控制 -->
      <n-collapse-item title="行为与控制 (Behavior)" name="behavior">
        <n-card embedded size="small">
          <n-grid :cols="3" :x-gap="12" :y-gap="12">
            <n-gi v-for="meta in behaviorMetas" :key="meta.key">
              <MetaFormItem :meta="meta" v-model:modelValue="body[meta.key]" :show-label="true" />
            </n-gi>
          </n-grid>
        </n-card>
      </n-collapse-item>

    </n-collapse>

    <!-- Hero 专属配置 (独立卡片) -->
    <n-card v-if="body.systemType === 'hero'" title="英雄专属配置 (Hero Config)" size="small" class="mt-4 border-primary">
      <template #header-extra>
        <n-tag type="warning" size="small">HERO ONLY</n-tag>
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
.mt-4 {
  margin-top: 1rem;
}

.border-primary {
  border: 1px solid #63e2b7;
}
</style>