<!-- client/src/views/Editor/PngEditor/index.vue -->
<template>
  <EditorLayout :has-selection="!!selectedPng" empty-text="请在左侧选择图片资源或点击新增">
    <template #sidebar>
      <ModuleSidebar
        title="资源列表"
        :menu-options="menuOptions"
        v-model:model-value="selectedIndex"
        show-xml-button
        @add="addPng"
        @delete="removePng"
        @view-xml="showXmlDrawer = true"
      />
    </template>

    <template #content>
      <div class="h-full flex flex-col">
        <!-- XML 预览抽屉 -->
        <n-drawer v-model:show="showXmlDrawer" :width="isMobile ? '100%' : 500" placement="right">
          <n-drawer-content title="XML 预览" closable>
            <div class="xml-drawer-content">
              <n-button type="primary" size="small" @click="copyXml" style="margin-bottom: 12px">
                复制代码
              </n-button>
              <pre class="xml-preview-box">{{ selectedPng?.toXml() }}</pre>
            </div>
          </n-drawer-content>
        </n-drawer>

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
  </EditorLayout>
</template>

<script setup lang="ts">
import { ref, provide } from 'vue';
import { ImageOutline } from '@vicons/ionicons5';
import { useMessage, NDrawer, NDrawerContent } from 'naive-ui';
import { useResponsive } from '../../../hooks/useResponsive';
import { usePngState } from './hooks/usePngState';
import EditorLayout from '../../components/EditorLayout.vue';
import ModuleSidebar from '../../components/ModuleSidebar.vue';
import PngBasicSection from './sections/PngBasicSection.vue';

const message = useMessage();
const { selectedIndex, selectedPng, menuOptions, addPng, removePng } = usePngState();
const { isMobile } = useResponsive();

// 提供给子组件使用
provide('selectedPng', selectedPng);

// XML 预览抽屉状态
const showXmlDrawer = ref(false);

// 复制 XML
const copyXml = () => {
  if (selectedPng.value) {
    navigator.clipboard.writeText(selectedPng.value.toXml());
    message.success('已复制到剪贴板');
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

.xml-drawer-content {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.xml-preview-box {
  background: #101014;
  color: #8abeb7;
  padding: 12px;
  font-size: 11px;
  border-radius: 4px;
  white-space: pre-wrap;
  word-break: break-all;
  font-family: 'Fira Code', monospace;
  flex: 1;
  overflow-y: auto;
}
</style>
