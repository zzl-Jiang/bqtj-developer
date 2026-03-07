<!-- client/src/views/Editor/SkillEditor/sections/BasicSection.vue -->
<template>
  <div class="section-container" v-if="selectedSkill">
    <n-space vertical size="large">

      <!-- 基础标识卡片 -->
      <n-card title="基础标识" size="small" segmented>
        <n-grid :cols="3" :x-gap="12">
          <!-- 遍历基础元数据 -->
          <n-gi v-for="meta in baseMetas" :key="meta.key">
            <MetaFormItem :meta="meta" :show-label="true" v-model:modelValue="selectedSkill[meta.key]" />
          </n-gi>
        </n-grid>
      </n-card>

      <!-- 状态标志卡片 (开关类) -->
      <n-card title="状态标志 (开关)" size="small" segmented>
        <n-grid :cols="4" :x-gap="12" :y-gap="12">
          <n-gi v-for="meta in flagMetas" :key="meta.key">
            <MetaFormItem :meta="meta" :show-label="true" v-model:modelValue="selectedSkill[meta.key]" />
          </n-gi>
        </n-grid>
      </n-card>

    </n-space>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useSkillState } from '../hooks/useSkillState';
import { SKILL_BASE_FIELDS, SKILL_FLAG_FIELDS } from '../config';
import MetaFormItem from '../../../components/MetaFormItem.vue';

const { selectedSkill } = useSkillState();

// 提取基础信息配置
const baseMetas = computed(() =>
  SKILL_BASE_FIELDS.filter(m => m.group === 'base')
);

// 提取标志位配置
const flagMetas = computed(() =>
  SKILL_FLAG_FIELDS.filter(m => m.group === 'flags')
);
</script>

<style scoped>
.section-container {
  padding: 4px;
}
</style>