<!-- client/src/views/Editor/SkillEditor/index.vue -->
<template>
  <EditorLayout 
    :has-selection="!!selectedSkill" 
    empty-text="请在左侧选择技能或点击新增"
  >
    <!-- 侧边栏 -->
    <template #sidebar>
      <ModuleSidebar 
        title="技能定义"
        :menu-options="menuOptions"
        v-model:model-value="selectedIndex"
        @add="addSkill"
      />
    </template>

    <!-- 中央编辑区 -->
    <template #content>
      <n-tabs type="card" animated>
        <n-tab-pane name="basic" tab="核心配置">
          <BasicSection />
        </n-tab-pane>
        <n-tab-pane name="effects" tab="技能效果">
          <EffectSection />
        </n-tab-pane>
        <n-tab-pane name="target" tab="目标选择">
          <TargetSection />
        </n-tab-pane>
        <n-tab-pane name="visuals" tab="视觉资源">
          <VisualSection />
        </n-tab-pane>
      </n-tabs>
    </template>

    <!-- 右侧预览与操作 -->
    <template #preview>
      <ModuleXmlPreview 
        v-if="selectedSkill"
        :item="selectedSkill" 
        @delete="handleDelete"
      >
        <!-- 技能特有的扩展说明 -->
        <template #extra>
          <n-card title="AS3 效果说明" size="small" status="info">
            <div v-if="selectedSkill.effectType">
              <n-tag type="info" size="small" style="margin-bottom: 8px">
                {{ selectedSkill.effectType }}
              </n-tag>
              <p class="effect-desc-text">{{ currentEffectDesc }}</p>
            </div>
            <n-text v-else depth="3">未选择效果函数</n-text>
          </n-card>
        </template>
      </ModuleXmlPreview>
    </template>
  </EditorLayout>
</template>

<script setup lang="ts">
import { useSkillState } from './hooks/useSkillState';
import { useEffectLogic } from './hooks/useEffectLogic';
import { useMessage } from 'naive-ui';

// 引入通用组件
import EditorLayout from '../../components/EditorLayout.vue';
import ModuleSidebar from '../..//components/ModuleSidebar.vue';
import ModuleXmlPreview from '../..//components/ModuleXmlPreview.vue';

// 引入业务 Section
import BasicSection from './sections/BasicSection.vue';
import EffectSection from './sections/EffectSection.vue';
import TargetSection from './sections/TargetSection.vue';
import VisualSection from './sections/VisualSection.vue';

const message = useMessage();
const { selectedSkill, selectedIndex, menuOptions, addSkill, removeSkill } = useSkillState();
const { currentEffectDesc } = useEffectLogic(selectedSkill);

const handleDelete = () => {
  if (selectedIndex.value !== null) {
    removeSkill(selectedIndex.value);
    message.warning('技能已移除');
  }
};
</script>

<style scoped>
.effect-desc-text {
  font-size: 13px;
  line-height: 1.6;
  color: #adbac7;
  white-space: pre-line;
}
</style>