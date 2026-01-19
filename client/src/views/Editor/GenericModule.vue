<template>
  <div style="padding: 20px;">
    <n-space vertical size="large">
      <n-page-header :title="title">
        <template #extra>
          <n-button type="primary" @click="onAdd">新增{{ title }}</n-button>
        </template>
      </n-page-header>

      <n-grid :cols="2" :x-gap="12" :y-gap="12">
        <n-gi v-for="(item, index) in dataList" :key="index">
          <n-card closable @close="onRemove(index)">
            <n-form-item label="名称 (ID)">
              <n-input v-model:value="item.name" placeholder="请输入名称" />
            </n-form-item>
            <template #footer>
              <n-text depth="3">预览: {{ item.toXml() }}</n-text>
            </template>
          </n-card>
        </n-gi>
      </n-grid>

      <n-empty v-if="dataList.length === 0" description="暂无数据，点击右上角新增" />
    </n-space>
  </div>
</template>

<script setup lang="ts">
// 接收父组件传入的数据列表和操作方法
const props = defineProps<{
  title: string;
  dataList: any[];
}>();

const emit = defineEmits(['add', 'remove']);

const onAdd = () => emit('add');
const onRemove = (index: number) => emit('remove', index);
</script>