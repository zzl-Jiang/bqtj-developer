<template>
  <n-layout has-sider style="height: 100vh;">
    <n-layout-sider
      bordered
      collapse-mode="width"
      :collapsed-width="64"
      :width="200"
      show-trigger="arrow-circle"
    >
      <n-menu
        v-model:value="activeModule"
        :options="menuOptions"
      />
    </n-layout-sider>

    <n-layout-content content-style="padding: 0;">
      <!-- 使用 keep-alive 可以在切换模块时保留编辑状态 -->
      <keep-alive>
        <component :is="currentModuleComponent" />
      </keep-alive>
    </n-layout-content>
  </n-layout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import SummaryModule from './Editor/SummaryModule.vue';
import PngModule from './Editor/PngModule.vue';
import SkillEditor from './Editor/SkillEditor/index.vue';

const activeModule = ref('summary');

const menuOptions = [
  { label: '显示汇总', key: 'summary' },
  { label: '资源模块', key: 'png' },
  { label: '技能模块', key: 'skill' }
];

// 动态组件映射
const currentModuleComponent = computed(() => {
  switch (activeModule.value) {
    case 'summary': return SummaryModule;
    case 'png': return PngModule;
    case 'skill': return SkillEditor;
    default: return SummaryModule;
  }
});
</script>