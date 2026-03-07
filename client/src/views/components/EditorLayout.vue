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
  grid-template-columns: auto 1fr;
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
  max-width: 1200px;
  margin: 0 auto;
}

.empty-state {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
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
