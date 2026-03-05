<!-- client/src/views/components/ModuleSidebar.vue -->
<template>
  <div class="module-sidebar">
    <div class="sidebar-header">
      <div class="header-title">{{ title }}</div>
      <n-button type="primary" size="small" circle @click="$emit('add')" class="add-btn">
        <template #icon><n-icon>
            <AddOutline />
          </n-icon></template>
      </n-button>
    </div>

    <div class="menu-wrapper">
      <n-scrollbar>
        <n-menu :options="menuOptions" :value="modelValue?.toString()" @update:value="handleUpdate" />
      </n-scrollbar>
    </div>
  </div>
</template>

<script setup lang="ts">
import { AddOutline } from '@vicons/ionicons5';
const props = defineProps<{
  title: string;
  menuOptions: any[];
  modelValue: number | null;
}>();

const emit = defineEmits(['add', 'update:modelValue']);

const handleUpdate = (key: string) => {
  emit('update:modelValue', parseInt(key));
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
}

:deep(.n-menu-item-content) {
  border-radius: 12px !important;
  margin-bottom: 4px;
  transition: all 0.3s ease;
}

:deep(.n-menu-item-content:hover) {
  background: rgba(255, 255, 255, 0.05) !important;
}

:deep(.n-menu-item-content.n-menu-item-content--selected) {
  background: rgba(24, 160, 88, 0.1) !important;
  color: #18a058 !important;
}

:deep(.n-menu-item-content.n-menu-item-content--selected::before) {
  background: #18a058 !important;
}
</style>