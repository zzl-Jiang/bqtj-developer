<!-- client/src/views/Editor/SayEditor/index.vue -->
<template>
  <EditorLayout :has-selection="!!selectedSayList" empty-text="请选择对话组或点击新增">
    <template #sidebar>
      <ModuleSidebar
        title="对话组"
        :menu-options="menuOptions"
        v-model:model-value="selectedIndex"
        show-xml-button
        @add="addSay"
        @delete="removeSay"
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
              <pre class="xml-preview-box">{{ selectedSayList?.toXml() }}</pre>
            </div>
          </n-drawer-content>
        </n-drawer>

        <n-tabs type="line" animated class="flex-1" pane-class="tab-content">
          <n-tab-pane name="basic" tab="基础配置">
            <template #tab>
              <n-space :size="6" align="center" :wrap="false">
                <n-icon>
                  <SettingsOutline />
                </n-icon>
                <span>基础配置</span>
              </n-space>
            </template>
            <SayBasicSection />
          </n-tab-pane>
          <n-tab-pane name="list" tab="对话内容管理">
            <template #tab>
              <n-space :size="6" align="center" :wrap="false">
                <n-icon>
                  <ChatbubblesOutline />
                </n-icon>
                <span>对话内容管理</span>
              </n-space>
            </template>
            <SayContentSection />
          </n-tab-pane>
        </n-tabs>
      </div>
    </template>
  </EditorLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { SettingsOutline, ChatbubblesOutline } from '@vicons/ionicons5';
import { useMessage, NDrawer, NDrawerContent } from 'naive-ui';
import { useResponsive } from '../../../hooks/useResponsive';
import EditorLayout from '../../components/EditorLayout.vue';
import ModuleSidebar from '../../components/ModuleSidebar.vue';
import SayBasicSection from './sections/SayBasicSection.vue';
import SayContentSection from './sections/SayContentSection.vue';
import { useSayState } from './hooks/useSayState';

const message = useMessage();
const { selectedIndex, selectedSayList, menuOptions, addSay, removeSay } = useSayState();
const { isMobile } = useResponsive();

// XML 预览抽屉状态
const showXmlDrawer = ref(false);

// 复制 XML
const copyXml = () => {
  if (selectedSayList.value) {
    navigator.clipboard.writeText(selectedSayList.value.toXml());
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
