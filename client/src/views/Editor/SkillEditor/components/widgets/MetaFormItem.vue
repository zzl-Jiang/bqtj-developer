<!-- src/views/Editor/SkillEditor/components/widgets/MetaFormItem.vue -->
<template>
  <n-form-item :label="showLabel ? meta.label : ''" :show-label="showLabel">
    <!-- 使用 label 插槽自定义标题区域 -->
    <template #label v-if="showLabel">
      <n-space align="center" :size="4">
        <span>{{ meta.label }}</span>
        <!-- 只有当配置中存在 desc 时才显示详情按钮 -->
        <n-popover v-if="meta.desc" trigger="hover" :width="240" scrollable>
          <template #trigger>
            <n-text depth="3" style="cursor: help; line-height: 0;">
              <span style="font-size: 14px;">ⓘ</span> <!-- 也可以换成图标库的图标 -->
            </n-text>
          </template>
          <div style="font-size: 12px; line-height: 1.6;">
            <div style="font-weight: bold; margin-bottom: 4px;">{{ meta.label }} 详情</div>
            <span style="white-space: pre-line;">{{ meta.desc }}</span>
          </div>
        </n-popover>
      </n-space>
    </template>

    <!-- 图片选择器 -->
    <n-select 
      v-if="meta.type === 'select_png'" 
      v-model:value="modelValue" 
      :options="pngOptions" 
      clearable 
      placeholder="选择图片资源..." 
    />

    <!-- 普通下拉框 -->
    <n-select 
      v-else-if="meta.type === 'select'" 
      v-model:value="modelValue" 
      :options="meta.options" 
      :render-label="renderLabel" 
      filterable
      clearable 
      placeholder="请选择" 
    />
    
    <!-- 多选标签选择器 -->
    <n-select
      v-else-if="meta.type === 'multi_select'"
      v-model:value="modelValue"
      multiple
      filterable
      tag
      :options="meta.options || []"
      :render-label="renderLabelLong" 
      :render-tag="renderTag" 
      placeholder="请选择 (支持多项)"
      clearable
    />

    <!-- 数字输入 -->
    <n-input-number 
      v-else-if="meta.type === 'number'" 
      v-model:value="modelValue" 
      style="width: 100%" 
      placeholder="请输入数值" 
    />

    <!-- 开关 -->
    <n-switch 
      v-else-if="meta.type === 'switch'" 
      v-model:value="modelValue" 
    />

    <!-- 默认文本输入 -->
    <n-input 
      v-else 
      v-model:value="modelValue" 
      :placeholder="meta.desc || '请输入内容'" 
    />
  </n-form-item>
</template>

<script setup lang="ts">
import { computed, h } from 'vue';
import { useModStore } from '../../../../../store/useModStore';
import { NTag } from 'naive-ui';

const props = defineProps(['meta', 'modelValue', 'showLabel']);
const emit = defineEmits(['update:modelValue']);

const modStore = useModStore();

// 实现 v-model
const modelValue = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
});

// 获取 PNG 选项 (从 Store 读)
const pngOptions = computed(() => 
  modStore.pngList.map(p => ({ label: "png/" + p.name, value: "png/" + p.name }))
);

// 下拉框增强渲染 (带描述)
// 一行描述
const renderLabel = (option: any) => {
  return h('div', { style: { padding: '4px 0' } }, [
    h('div', { style: { fontSize: '14px' } }, option.label),
    option.desc ? h('div', { style: { fontSize: '12px', opacity: 0.5 } }, option.desc) : null
  ]);
};
// 全部描述
const renderLabelLong = (option: any) => {
  return h('div', { style: { padding: '4px 0' } }, [
    h('div', { style: { fontSize: '14px' } }, option.label),
    option.desc ? h('div', { style: { fontSize: '12px', opacity: 0.5, whiteSpace: 'normal' } }, option.desc) : null
  ]);
};

// 标签渲染只显示名称
const renderTag = ({ option, handleClose }: { option: any, handleClose: () => void }) => {
  return h(
    NTag,
    {
      type: 'info',
      closable: true,
      onClose: (e: MouseEvent) => {
        e.stopPropagation();
        handleClose();
      }
    },
    { 
      // 只渲染选项的 label 字符串，不渲染 desc
      default: () => option.label 
    }
  );
};
</script>