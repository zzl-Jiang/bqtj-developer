<!-- client/src/views/Editor/SayEditor/index.vue -->
<template>
  <EditorLayout :has-selection="!!selectedSayList" empty-text="请选择对话组或点击新增">
    <template #sidebar>
      <ModuleSidebar title="对话组" :menu-options="menuOptions" v-model:model-value="selectedIndex" @add="addSay" />
    </template>

    <template #content>
      <div class="h-full flex flex-col">
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

    <template #preview>
      <ModuleXmlPreview v-if="selectedSayList" :item="selectedSayList" @delete="removeSay(selectedIndex!)" />
    </template>
  </EditorLayout>
</template>

<script setup lang="ts">
import { SettingsOutline, ChatbubblesOutline } from '@vicons/ionicons5';
import EditorLayout from '../../components/EditorLayout.vue';
import ModuleSidebar from '../../components/ModuleSidebar.vue';
import ModuleXmlPreview from '../../components/ModuleXmlPreview.vue';
import SayBasicSection from './sections/SayBasicSection.vue';
import SayContentSection from './sections/SayContentSection.vue';
import { useSayState } from './hooks/useSayState';

const { selectedIndex, selectedSayList, menuOptions, addSay, removeSay } = useSayState();
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