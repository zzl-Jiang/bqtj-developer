<!-- src/views/components/ModuleXmlPreview.vue -->
<template>
  <n-space vertical size="large">
    <n-card title="XML 预览" size="small" segmented>
      <template #header-extra>
        <n-button type="primary" size="tiny" @click="copyXml">复制代码</n-button>
      </template>
      <pre class="xml-preview-box">{{ item.toXml() }}</pre>
    </n-card>

    <!-- 特殊扩展槽位（用于放说明文档等） -->
    <slot name="extra"></slot>

    <n-popconfirm @positive-click="$emit('delete')">
      <template #trigger>
        <n-button type="error" block ghost>删除此定义</n-button>
      </template>
      确定要彻底删除该项吗？
    </n-popconfirm>
  </n-space>
</template>

<script setup lang="ts">
import { useMessage } from 'naive-ui';

const props = defineProps<{
  item: { toXml: () => string };
}>();

const emit = defineEmits(['delete']);
const message = useMessage();

const copyXml = () => {
  navigator.clipboard.writeText(props.item.toXml());
  message.success('已复制到剪贴板');
};
</script>

<style scoped>
.xml-preview-box {
  background: #101014;
  color: #8abeb7;
  padding: 12px;
  font-size: 11px;
  border-radius: 4px;
  white-space: pre-wrap;
  word-break: break-all;
  font-family: 'Fira Code', monospace;
  max-height: 350px;
  overflow-y: auto;
}
</style>