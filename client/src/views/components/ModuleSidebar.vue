<template>
  <n-layout-sider
    bordered
    collapse-mode="width"
    :collapsed-width="0"
    :width="240"
    show-trigger="bar"
    content-style="padding: 12px; display: flex; flex-direction: column; gap: 12px;"
  >
    <n-button type="primary" block @click="$emit('add')">
      + 新增{{ title }}
    </n-button>

    <n-scrollbar>
      <n-menu
        :options="menuOptions"
        :value="modelValue?.toString()"
        @update:value="handleUpdate"
      />
    </n-scrollbar>
  </n-layout-sider>
</template>

<script setup lang="ts">
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