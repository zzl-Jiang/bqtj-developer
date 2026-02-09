<!-- client/src/views/Editor/SkillEditor/index.vue -->
<template>
  <EditorLayout :has-selection="!!selectedSkill" empty-text="请在左侧选择技能或点击新增">
    <!-- 侧边栏 -->
    <template #sidebar>
      <ModuleSidebar title="技能定义" :menu-options="menuOptions" v-model:model-value="selectedIndex" @add="addSkill" />
    </template>

    <!-- 中央编辑区 -->
    <template #content>
      <div class="h-full flex flex-col">
        <n-tabs type="line" animated class="flex-1" pane-class="tab-content">
          <!-- 核心配置 -->
          <n-tab-pane name="basic">
            <template #tab>
              <n-space :size="6" align="center" :wrap="false">
                <n-icon>
                  <BuildOutline />
                </n-icon>
                <span>核心配置</span>
              </n-space>
            </template>
            <BasicSection />
          </n-tab-pane>

          <!-- 技能效果 -->
          <n-tab-pane name="effects">
            <template #tab>
              <n-space :size="6" align="center" :wrap="false">
                <n-icon>
                  <FlashOutline />
                </n-icon>
                <span>技能效果</span>
              </n-space>
            </template>
            <EffectSection />
          </n-tab-pane>

          <!-- 目标选择 -->
          <n-tab-pane name="target">
            <template #tab>
              <n-space :size="6" align="center" :wrap="false">
                <n-icon>
                  <LocateOutline />
                </n-icon>
                <span>目标选择</span>
              </n-space>
            </template>
            <TargetSection />
          </n-tab-pane>

          <!-- 视觉资源 -->
          <n-tab-pane name="visuals">
            <template #tab>
              <n-space :size="6" align="center" :wrap="false">
                <n-icon>
                  <ImageOutline />
                </n-icon>
                <span>视觉资源</span>
              </n-space>
            </template>
            <VisualSection />
          </n-tab-pane>
        </n-tabs>
      </div>
    </template>

    <!-- 右侧预览与操作 -->
    <template #preview>
      <ModuleXmlPreview v-if="selectedSkill" :item="selectedSkill" @delete="handleDelete">
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
import { BuildOutline, FlashOutline, LocateOutline, ImageOutline } from '@vicons/ionicons5';
import { useSkillState } from './hooks/useSkillState';
import { useEffectLogic } from './hooks/useEffectLogic';
import { useMessage } from 'naive-ui';

// 引入通用组件
import EditorLayout from '../../components/EditorLayout.vue';
import ModuleSidebar from '../../components/ModuleSidebar.vue';
import ModuleXmlPreview from '../../components/ModuleXmlPreview.vue';

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
.h-full {
  height: 100%;
}

.flex {
  display: flex;
}

.flex-col {
  flex-direction: column;
}

.flex-1 {
  flex: 1;
}

:deep(.tab-content) {
  padding: 16px;
  overflow-y: auto;
  height: calc(100% - 45px);
  box-sizing: border-box;
}

.effect-desc-text {
  font-size: 13px;
  line-height: 1.6;
  color: #adbac7;
  white-space: pre-line;
}
</style>