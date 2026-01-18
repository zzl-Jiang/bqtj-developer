<!-- src/views/Editor/SkillEditor/components/SkillXmlPreview.vue -->
<template>
  <n-space vertical size="large">
    <!-- XML 预览卡片 -->
    <n-card title="XML 预览" size="small" segmented>
      <template #header-extra>
        <n-button type="primary" size="tiny" @click="copyXml">复制代码</n-button>
      </template>
      <pre class="xml-preview-mini">{{ selectedSkill.toXml() }}</pre>
    </n-card>

    <!-- 文档说明卡片 -->
    <n-card title="AS3 效果说明" size="small" status="info">
      <div v-if="selectedSkill.effectType">
        <n-tag type="info" size="small" style="margin-bottom: 8px">
          {{ selectedSkill.effectType }}
        </n-tag>
        <p class="effect-desc-text">{{ currentEffectDesc }}</p>
      </div>
      <n-text v-else depth="3">未选择效果函数</n-text>
    </n-card>

    <!-- 删除操作 -->
    <n-popconfirm @positive-click="handleDelete">
      <template #trigger>
        <n-button type="error" block ghost>删除此技能定义</n-button>
      </template>
      确定要彻底删除 "{{ selectedSkill.cnName || selectedSkill.name }}" 吗？
    </n-popconfirm>
  </n-space>
</template>

<script setup lang="ts">
import { useSkillState } from '../hooks/useSkillState';
import { useEffectLogic } from '../hooks/useEffectLogic';
import { useMessage } from 'naive-ui';
import { watch } from 'vue';

const message = useMessage();
const { selectedSkill, selectedIndex, removeSkill } = useSkillState();
const { currentEffectDesc } = useEffectLogic(selectedSkill);

const copyXml = () => {
  navigator.clipboard.writeText(selectedSkill.value.toXml());
  message.success('XML 已复制到剪贴板');
};

const handleDelete = () => {
  if (selectedIndex.value !== null) {
    removeSkill(selectedIndex.value);
    message.warning('技能已移除');
  }
};


// 强制在 selectedSkill 发生任何变化（包括深层 ImageUrlDefine）时重新计算
watch(() => selectedSkill.value, () => {
}, { deep: true });
</script>

<style scoped>
.xml-preview-mini {
  background: #101014;
  color: #8abeb7;
  padding: 12px;
  font-size: 11px;
  border-radius: 4px;
  white-space: pre-wrap;
  font-family: 'Fira Code', monospace;
  max-height: 300px;
  overflow-y: auto;
}
.effect-desc-text {
  font-size: 13px;
  line-height: 1.6;
  color: #adbac7;
  white-space: pre-line;
}
</style>