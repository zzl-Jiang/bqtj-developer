<!-- client/src/views/components/ModuleSidebar.vue -->
<template>
  <div class="module-sidebar">
    <div class="sidebar-header">
      <div class="header-title">{{ title }}</div>
      <n-button type="primary" size="small" circle @click="$emit('add')" class="add-btn">
        <template #icon>
          <n-icon><AddOutline /></n-icon>
        </template>
      </n-button>
    </div>

    <div class="menu-wrapper">
      <n-scrollbar>
        <div class="menu-list">
          <div
            v-for="item in menuOptions"
            :key="item.key"
            class="menu-item"
            :class="{ active: modelValue === item.key }"
            @click="handleSelect(item.key)"
          >
            <div class="menu-item-content">
              <n-icon v-if="item.icon" class="menu-item-icon">
                <component :is="item.icon" />
              </n-icon>
              <span class="menu-item-label">{{ item.label }}</span>
            </div>
            <n-popconfirm @positive-click="$emit('delete', item.key)">
              <template #trigger>
                <n-button
                  type="error"
                  text
                  size="tiny"
                  class="delete-btn"
                  @click.stop
                >
                  <template #icon>
                    <n-icon><TrashOutline /></n-icon>
                  </template>
                </n-button>
              </template>
              确定要删除该项吗？
            </n-popconfirm>
          </div>
        </div>
      </n-scrollbar>
    </div>

    <!-- 底部工具栏 -->
    <div v-if="modelValue !== null && showXmlButton" class="sidebar-footer">
      <n-button type="primary" block ghost size="small" @click="$emit('view-xml')">
        <template #icon>
          <n-icon><CodeOutline /></n-icon>
        </template>
        查看 XML
      </n-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { AddOutline, TrashOutline, CodeOutline } from '@vicons/ionicons5';

interface MenuOption {
  key: string | number;
  label: string;
  icon?: any;
}

const props = defineProps<{
  title: string;
  menuOptions: MenuOption[];
  modelValue: string | number | null;
  showXmlButton?: boolean;
}>();

const emit = defineEmits(['add', 'delete', 'view-xml', 'update:modelValue']);

const handleSelect = (key: string | number) => {
  emit('update:modelValue', key);
};
</script>

<style scoped>
.module-sidebar {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: var(--premium-rounded);
  overflow: hidden;
}

.sidebar-header {
  padding: 16px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  background: rgba(255, 255, 255, 0.02);
}

.header-title {
  font-size: 15px;
  font-weight: 700;
  opacity: 0.8;
}

.add-btn {
  box-shadow: 0 4px 12px rgba(24, 160, 88, 0.3);
}

.menu-wrapper {
  flex: 1;
  padding: 8px;
  overflow-y: auto;
}

.menu-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.menu-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.menu-item:hover {
  background: rgba(255, 255, 255, 0.05);
}

.menu-item.active {
  background: rgba(24, 160, 88, 0.1);
  color: #18a058;
}

.menu-item-content {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  overflow: hidden;
}

.menu-item-icon {
  font-size: 16px;
  flex-shrink: 0;
}

.menu-item-label {
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.delete-btn {
  opacity: 0;
  transition: opacity 0.2s;
  flex-shrink: 0;
}

.menu-item:hover .delete-btn {
  opacity: 1;
}

.sidebar-footer {
  padding: 12px 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  background: rgba(0, 0, 0, 0.2);
}
</style>
