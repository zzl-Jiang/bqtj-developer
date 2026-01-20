<!-- client/src/views/Editor/SkillEditor/sections/BasicSection.vue -->
<template>
  <div class="section-container" v-if="selectedSkill">
    <n-space vertical size="large">
      
      <!-- 基础标识卡片 -->
      <n-card title="基础标识" size="small" segmented>
        <n-grid :cols="3" :x-gap="12">
          <!-- 遍历基础元数据 -->
          <n-gi v-for="meta in baseMetas" :key="meta.key">
            <MetaFormItem 
              :meta="meta"
              :show-label="true"
              v-model:modelValue="selectedSkill[meta.key]" 
            />
          </n-gi>
        </n-grid>
      </n-card>

      <!-- 状态标志卡片 (开关类) -->
      <n-card title="状态标志 (开关)" size="small" segmented>
        <n-grid :cols="4" :y-gap="12">
          <n-gi v-for="meta in flagMetas" :key="meta.key">
            <!-- 在 Section 层级处理开关的小布局，或者封装进 MetaFormItem -->
            <n-space align="center">
              <n-switch v-model:value="selectedSkill[meta.key]" size="small" />
              <n-text style="font-size: 13px">{{ meta.label }}</n-text>
            </n-space>
          </n-gi>
        </n-grid>
      </n-card>

    </n-space>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useSkillState } from '../hooks/useSkillState';
import { BASE_META, FLAG_META } from '../config';
import MetaFormItem from '../../../components/MetaFormItem.vue';

const { selectedSkill } = useSkillState();

// 提取基础信息配置
const baseMetas = computed(() => 
  BASE_META.filter(m => m.group === 'base')
);

// 提取标志位配置
const flagMetas = computed(() => 
  FLAG_META.filter(m => m.group === 'flags')
);
</script>

<style scoped>
.section-container {
  padding: 4px;
}
</style>