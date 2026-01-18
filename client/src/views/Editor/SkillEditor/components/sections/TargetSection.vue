<!-- src/views/Editor/SkillEditor/components/sections/TargetSection.vue -->
<template>
  <n-card title="Target 节点详细配置" size="small" v-if="selectedSkill">
    <n-grid :cols="3" :x-gap="12" :y-gap="8">
      <n-gi v-for="meta in TARGET_META" :key="meta.key">
        <!-- 注意：这里 v-model 绑定的是 selectedSkill.target[key] -->
        <MetaFormItem 
          :meta="meta"
          :show-label="true"
          v-model:model-value="selectedSkill.target[meta.key]" 
        />
      </n-gi>
    </n-grid>
  </n-card>
</template>

<script setup lang="ts">
import { useSkillState } from '../../hooks/useSkillState';
import { TARGET_META } from '../../config';
import MetaFormItem from '../widgets/MetaFormItem.vue';

const { selectedSkill } = useSkillState();
</script>