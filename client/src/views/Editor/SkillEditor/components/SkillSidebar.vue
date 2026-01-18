<!-- src/views/Editor/SkillEditor/components/SkillSidebar.vue -->
<template>
  <n-layout-sider
    bordered
    collapse-mode="width"
    :collapsed-width="0"
    :width="240"
    show-trigger="bar"
    content-style="padding: 12px; display: flex; flex-direction: column; gap: 12px;"
  >
    <!-- 使用 Hook 中的 addSkill -->
    <n-button type="primary" block @click="addSkill">
      + 新增技能定义
    </n-button>

    <n-scrollbar>
      <!-- 使用 Hook 中的 menuOptions 和 selectedIndex -->
      <n-menu
        :options="menuOptions"
        :value="selectedIndex?.toString()"
        @update:value="handleMenuClick"
      />
    </n-scrollbar>
  </n-layout-sider>
</template>

<script setup lang="ts">
import { useSkillState } from '../hooks/useSkillState';

const { menuOptions, selectedIndex, addSkill } = useSkillState();

const handleMenuClick = (key: string) => {
  // 在 useSkillState 里添加一个设置索引的方法会更好，或者直接在这里改
  selectedIndex.value = parseInt(key);
};
</script>