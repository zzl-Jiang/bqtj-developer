<!-- client/src/views/Editor/PngEditor/index.vue -->
<template>
  <EditorLayout :has-selection="!!selectedPng" empty-text="请在左侧选择图片资源或点击新增">
    <template #sidebar>
      <ModuleSidebar title="资源列表" :menu-options="menuOptions" v-model:model-value="selectedIndex" @add="addPng" />
    </template>

    <template #content>
      <div class="h-full flex flex-col">
        <n-tabs type="line" animated class="flex-1" pane-class="tab-content">
          <n-tab-pane name="basic" tab="基础信息">
            <template #tab>
              <n-space :size="6" align="center" :wrap="false">
                <n-icon>
                  <ImageOutline />
                </n-icon>
                <span>基础信息</span>
              </n-space>
            </template>
            <PngBasicSection />
          </n-tab-pane>
        </n-tabs>
      </div>
    </template>

    <template #preview>
      <ModuleXmlPreview v-if="selectedPng" :item="selectedPng" @delete="() => removePng(selectedIndex!)" />
    </template>
  </EditorLayout>
</template>

<script setup lang="ts">
import { provide } from 'vue';
import { ImageOutline } from '@vicons/ionicons5';
import { usePngState } from './hooks/usePngState';
import EditorLayout from '../../components/EditorLayout.vue';
import ModuleSidebar from '../../components/ModuleSidebar.vue';
import ModuleXmlPreview from '../../components/ModuleXmlPreview.vue';
import PngBasicSection from './sections/PngBasicSection.vue';

const { selectedIndex, selectedPng, menuOptions, addPng, removePng } = usePngState();

// 提供给子组件使用
provide('selectedPng', selectedPng);
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
</style>
