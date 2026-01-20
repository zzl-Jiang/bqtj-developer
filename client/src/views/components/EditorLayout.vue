<!-- client/src/views/components/EditorLayout.vue -->
<template>
  <n-layout has-sider position="absolute">
    <!-- 左侧槽位 -->
    <slot name="sidebar"></slot>

    <!-- 中央内容区 -->
    <n-layout-content content-style="padding: 24px; position: relative;">
      <div v-if="hasSelection" class="editor-content-inner">
        <slot name="content"></slot>
      </div>
      <n-empty v-else :description="emptyText" style="margin-top: 120px" />
    </n-layout-content>

    <!-- 右侧预览区 -->
    <n-layout-sider
      v-if="hasSelection"
      :width="320"
      bordered
      content-style="padding: 20px;"
    >
      <slot name="preview"></slot>
    </n-layout-sider>
  </n-layout>
</template>

<script setup lang="ts">
defineProps<{
  hasSelection: boolean;
  emptyText: string;
}>();
</script>

<style scoped>
.editor-content-inner {
  max-width: 1200px;
  margin: 0 auto;
}
</style>