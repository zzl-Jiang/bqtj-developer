<!-- client/src/views/components/EditorLayout.vue -->
<template>
  <div class="editor-layout">
    <!-- 左侧模块 -->
    <div class="sidebar-wrapper">
      <slot name="sidebar"></slot>
    </div>

    <!-- 中央内容区 -->
    <div class="main-container">
      <div v-if="hasSelection" class="content-scroll">
        <div class="content-inner">
          <slot name="content"></slot>
        </div>
      </div>
      <div v-else class="empty-state">
        <n-empty :description="emptyText" />
      </div>
    </div>

    <!-- 右侧预览区 -->
    <div v-if="hasSelection" class="preview-wrapper">
      <slot name="preview"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NEmpty } from 'naive-ui';
defineProps<{
  hasSelection: boolean;
  emptyText: string;
}>();
</script>

<style scoped>
.editor-layout {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 24px;
  height: calc(100vh - 120px);
  padding: 0 24px;
}

.sidebar-wrapper {
  width: 260px;
  height: 100%;
}

.main-container {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: var(--premium-rounded);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.content-scroll {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
}

.content-inner {
  max-width: 1000px;
  margin: 0 auto;
}

.empty-state {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.preview-wrapper {
  width: 320px;
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: var(--premium-rounded);
  padding: 20px;
  overflow-y: auto;
}

/* Scrollbar adjustment */
.content-scroll::-webkit-scrollbar {
  width: 6px;
}

.content-scroll::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
}
</style>