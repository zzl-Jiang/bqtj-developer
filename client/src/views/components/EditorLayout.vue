<!-- client/src/views/components/EditorLayout.vue -->
<template>
  <div class="editor-layout">
    <!-- 桌面端侧边栏 -->
    <div v-if="!isMobile" class="sidebar-wrapper" :class="{ collapsed: isCollapsed }">
      <slot name="sidebar"></slot>
    </div>

    <!-- 移动端抽屉 -->
    <n-drawer
      v-else
      v-model:show="mobileDrawerVisible"
      :width="300"
      placement="left"
      :auto-focus="false"
      class="mobile-sidebar-drawer"
    >
      <n-drawer-content :native-scrollbar="false" class="mobile-drawer-content">
        <slot name="sidebar"></slot>
      </n-drawer-content>
    </n-drawer>

    <!-- 中央内容区 -->
    <div class="main-container">
      <!-- 移动端菜单按钮 -->
      <div v-if="isMobile" class="mobile-header">
        <n-button quaternary circle @click="mobileDrawerVisible = true">
          <template #icon>
            <n-icon size="24"><MenuOutline /></n-icon>
          </template>
        </n-button>
        <span class="mobile-title">编辑器</span>
      </div>

      <div v-if="hasSelection" class="content-scroll" :class="{ 'has-mobile-header': isMobile }">
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
import { ref, provide } from 'vue';
import { NEmpty, NDrawer, NDrawerContent, NButton, NIcon } from 'naive-ui';
import { MenuOutline } from '@vicons/ionicons5';
import { useResponsive } from '../../hooks/useResponsive';

defineProps<{
  hasSelection: boolean;
  emptyText: string;
}>();

const { isMobile, isSmallScreen } = useResponsive();
const mobileDrawerVisible = ref(false);
const isCollapsed = ref(false);

// 提供给子组件使用
provide('isMobile', isMobile);
provide('isSmallScreen', isSmallScreen);
provide('closeMobileDrawer', () => {
  mobileDrawerVisible.value = false;
});
</script>

<style scoped>
.editor-layout {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 24px;
  height: calc(100vh - 120px);
  padding: 0 24px;
}

/* 平板和小屏幕下调整布局 - 与 isMobile 断点保持一致 (768px) */
@media (max-width: 767px) {
  .editor-layout {
    grid-template-columns: 1fr;
    gap: 16px;
    padding: 0 16px;
  }
}

/* 中等屏幕 (768px-1023px) - 侧边栏缩小 */
@media (min-width: 768px) and (max-width: 1023px) {
  .editor-layout {
    grid-template-columns: auto 1fr;
    gap: 16px;
    padding: 0 16px;
  }

  .sidebar-wrapper {
    width: 240px !important;
    min-width: 240px !important;
    display: block !important;
  }
}

.sidebar-wrapper {
  width: 260px;
  height: 100%;
  min-width: 260px;
  transition: width 0.3s ease;
  overflow: hidden;
}

.sidebar-wrapper.collapsed {
  width: 64px;
  min-width: 64px;
}

/* 小屏幕下隐藏桌面侧边栏 */
@media (max-width: 767px) {
  .sidebar-wrapper {
    display: none;
  }
}

.main-container {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: var(--premium-rounded);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.mobile-header {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  background: rgba(255, 255, 255, 0.02);
}

.mobile-title {
  margin-left: 12px;
  font-size: 16px;
  font-weight: 600;
}

.content-scroll {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
}

/* 有移动端头部时的内容区域调整 */
.content-scroll.has-mobile-header {
  padding-top: 16px;
}

/* 小屏幕下减少内边距 */
@media (max-width: 767px) {
  .content-scroll {
    padding: 16px;
  }
}

.content-inner {
  max-width: 1200px;
  margin: 0 auto;
}

/* 小屏幕下内容区域占满宽度 */
@media (max-width: 767px) {
  .content-inner {
    max-width: 100%;
  }
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

/* 移动端抽屉样式 */
:global(.mobile-sidebar-drawer .n-drawer-body-content-wrapper) {
  padding: 0 !important;
}

:global(.mobile-drawer-content) {
  height: 100%;
}

:global(.mobile-drawer-content .n-drawer-body) {
  height: 100%;
  padding: 0px !important;
}

:global(.mobile-drawer-content .module-sidebar) {
  height: 100%;
}
</style>
