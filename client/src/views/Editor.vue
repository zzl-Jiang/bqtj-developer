<template>
  <n-layout has-sider style="min-height: calc(100vh - 120px);">
    <!-- 大类导航折叠 -->
    <n-layout-sider
      bordered
      collapse-mode="width"
      :collapsed-width="15"
      :width="200"
      show-trigger="arrow-circle"
      @collapse="isCollapsed = true"
      @expand="isCollapsed = false"
    >
      <n-menu
        v-model:value="activeModule"
        :collapsed="isCollapsed"
        :collapsed-icon-size="22"
        :options="menuOptions"
      />
    </n-layout-sider>

    <n-layout-content content-style="padding: 24px;">
      <!-- 添加一个 key 强制重新渲染，或者确保组件存在 -->
      <div v-if="activeModule === 'summary'">
        <SummaryModule />
      </div>
      <div v-if="activeModule === 'png'">
        <PngModule />
      </div>
      <div v-else-if="activeModule === 'skill'">
        <SkillModule />
      </div>
    </n-layout-content>
  </n-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { MenuOption } from 'naive-ui';
import SummaryModule from './Editor/SummaryModule.vue';
import PngModule from './Editor/PngModule.vue';
import SkillModule from './Editor/SkillModule.vue';

const activeModule = ref('summary');
const isCollapsed = ref(false);

const menuOptions: MenuOption[] = [
  {
    label: '显示汇总 (Summary)',
    key: 'summary'
  },
  {
    label: '资源模块 (PNG)',
    key: 'png'
  },
  {
    label: '技能模块 (Skill)',
    key: 'skill'
  }
];
</script>