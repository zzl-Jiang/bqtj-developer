<template>
  <div class="meta-form-item" :class="{ 'is-disabled': meta.disabled }">
    <n-form-item :show-label="showLabel" :label-placement="props.labelPlacement || 'top'">
      <!-- Custom Label Area -->
      <template #label v-if="showLabel">
        <div class="label-container">
          <div class="label-main">
            <n-icon v-if="getIcon()" :component="getIcon()" class="label-icon" :style="{ color: getIconColor() }" />
            <span class="label-text">{{ meta.label }}</span>
            <n-text v-if="meta.disabled" depth="3" class="lock-icon">
              <n-icon>
                <LockClosedOutline />
              </n-icon>
            </n-text>
          </div>

          <n-popover v-if="meta.desc" trigger="hover" :width="280" scrollable>
            <template #trigger>
              <div class="info-trigger">
                <n-icon>
                  <InformationCircleOutline />
                </n-icon>
              </div>
            </template>
            <div class="popover-content">
              <div class="popover-header">
                <n-icon :component="getIcon()" v-if="getIcon()" :style="{ color: getIconColor() }" />
                <span>{{ meta.label }}</span>
              </div>
              <div class="popover-desc">{{ meta.desc }}</div>
            </div>
          </n-popover>
        </div>
      </template>

      <!-- Input Components -->
      <div class="input-wrapper">
        <!-- Image Selector -->
        <n-select v-if="meta.type === 'select_png'" v-model:value="modelValue" :options="pngOptions"
          :disabled="meta.disabled" filterable tag clearable placeholder="选择图片资源..." />

        <!-- Regular Select -->
        <n-select v-else-if="meta.type === 'select'" v-model:value="modelValue" :options="meta.options"
          :disabled="meta.disabled" :render-label="renderLabel" filterable tag clearable placeholder="请选择" />

        <!-- Multi Select -->
        <n-select v-else-if="meta.type === 'multi_select'" v-model:value="modelValue" multiple filterable tag
          :options="meta.options || []" :disabled="meta.disabled" :render-label="renderLabelLong"
          :render-tag="renderTag" placeholder="请选择 (支持多项)" clearable />

        <!-- Number Input -->
        <n-input-number v-else-if="meta.type === 'number'" v-model:value="modelValue" :disabled="meta.disabled"
          style="width: 100%" placeholder="请输入数值" button-placement="both" />

        <!-- Switch -->
        <n-switch v-else-if="meta.type === 'switch'" v-model:value="modelValue" :disabled="meta.disabled">
          <template #checked>开启</template>
          <template #unchecked>关闭</template>
        </n-switch>

        <!-- Default Text Input -->
        <n-input v-else v-model:value="modelValue" :placeholder="meta.desc || '请输入内容'" :disabled="meta.disabled"
          clearable @update:value="handleStringUpdate" />
      </div>
    </n-form-item>
  </div>
</template>

<script setup lang="ts">
import { computed, h } from 'vue';
import { useModStore } from '../../store/useModStore';
import { NTag, NIcon } from 'naive-ui';
import {
  InformationCircleOutline,
  LockClosedOutline,
  FlashOutline,
  ShieldCheckmarkOutline,
  SettingsOutline,
  ImageOutline,
  ListOutline,
  ToggleOutline,
  CreateOutline,
  HeartOutline,
  ColorWandOutline
} from '@vicons/ionicons5';

const props = defineProps(['meta', 'modelValue', 'showLabel', 'labelPlacement']);
const emit = defineEmits(['update:modelValue']);

const modStore = useModStore();

// Model implementation
const modelValue = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
});

// PNG Options
const pngOptions = computed(() =>
  modStore.pngList.map(p => ({ label: "png/" + p.name, value: "png/" + p.name }))
);

/**
 * Infer icon based on meta info
 */
const getIcon = () => {
  const label = props.meta.label.toLowerCase();
  const type = props.meta.type;

  if (label.includes('血') || label.includes('生命') || label.includes('hp')) return HeartOutline;
  if (label.includes('攻') || label.includes('伤害') || label.includes('power')) return FlashOutline;
  if (label.includes('防') || label.includes('判')) return ShieldCheckmarkOutline;
  if (label.includes('图') || label.includes('画') || type === 'select_png') return ImageOutline;
  if (type === 'select' || type === 'multi_select') return ListOutline;
  if (type === 'switch') return ToggleOutline;
  if (type === 'number') return SettingsOutline;
  if (label.includes('名') || label.includes('id')) return CreateOutline;

  return ColorWandOutline;
};

const getIconColor = () => {
  const label = props.meta.label.toLowerCase();
  if (label.includes('血') || label.includes('生命')) return '#e88080';
  if (label.includes('攻') || label.includes('伤害')) return '#f2c97d';
  if (label.includes('防') || label.includes('判')) return '#70c0e8';
  return 'var(--primary-color)';
};

// Select renderers
const renderLabel = (option: any) => {
  return h('div', { style: { padding: '4px 0' } }, [
    h('div', { style: { fontSize: '14px', fontWeight: '500' } }, option.label),
    option.desc ? h('div', { style: { fontSize: '12px', opacity: 0.5 } }, option.desc) : null
  ]);
};

const renderLabelLong = (option: any) => {
  return h('div', { style: { padding: '4px 0' } }, [
    h('div', { style: { fontSize: '14px', fontWeight: '500' } }, option.label),
    option.desc ? h('div', { style: { fontSize: '12px', opacity: 0.5, whiteSpace: 'normal' } }, option.desc) : null
  ]);
};

const renderTag = ({ option, handleClose }: { option: any, handleClose: () => void }) => {
  return h(
    NTag,
    {
      type: 'info',
      closable: true,
      onClose: (e: MouseEvent) => {
        e.stopPropagation();
        handleClose();
      },
      style: { borderRadius: '6px' }
    },
    { default: () => option.label }
  );
};

const handleStringUpdate = (val: string | null) => {
  const finalValue = (val === '' || val === null) ? undefined : val;
  emit('update:modelValue', finalValue);
};
</script>

<style scoped>
.meta-form-item {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.04);
  padding: 12px 16px;
  border-radius: 12px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  margin-bottom: 8px;
}

.meta-form-item:hover {
  background: rgba(255, 255, 255, 0.04);
  border-color: rgba(24, 160, 88, 0.2);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.label-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 4px;
}

.label-main {
  display: flex;
  align-items: center;
  gap: 8px;
}

.label-icon {
  font-size: 16px;
  opacity: 0.9;
}

.label-text {
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.3px;
  color: rgba(255, 255, 255, 0.85);
}

.lock-icon {
  font-size: 12px;
  display: flex;
  align-items: center;
}

.info-trigger {
  color: rgba(255, 255, 255, 0.3);
  cursor: help;
  font-size: 16px;
  display: flex;
  align-items: center;
  transition: color 0.2s ease;
}

.info-trigger:hover {
  color: var(--primary-color);
}

.input-wrapper {
  margin-top: 4px;
}

.popover-content {
  padding: 4px;
}

.popover-header {
  font-weight: 700;
  font-size: 14px;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  padding-bottom: 6px;
}

.popover-desc {
  font-size: 12px;
  line-height: 1.6;
  opacity: 0.8;
  white-space: pre-line;
}

:deep(.n-form-item-blank) {
  display: block !important;
}

:deep(.n-form-item .n-form-item-label) {
  padding: 0 0 4px 0 !important;
  margin-bottom: 0 !important;
}

:deep(.n-input),
:deep(.n-input-number),
:deep(.n-select) {
  border-radius: 8px !important;
}

:deep(.n-input:hover),
:deep(.n-input:focus) {
  border-color: var(--primary-color) !important;
}

.is-disabled {
  opacity: 0.7;
  filter: grayscale(0.5);
}
</style>
