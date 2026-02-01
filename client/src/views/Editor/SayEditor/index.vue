<!-- client/src/views/Editor/SayEditor/index.vue -->
<template>
  <EditorLayout :has-selection="!!selectedSayList" empty-text="请选择对话组或点击新增">
    <template #sidebar>
      <ModuleSidebar 
        title="对话组"
        :menu-options="menuOptions"
        v-model:model-value="selectedIndex"
        @add="addSay"
      />
    </template>

    <template #content>
      <n-tabs type="line" animated>
        <n-tab-pane name="basic" tab="基础配置">
          <SayBasicSection />
        </n-tab-pane>
        <n-tab-pane name="list" tab="对话内容管理">
          <SayContentSection />
        </n-tab-pane>
      </n-tabs>
    </template>

    <template #preview>
      <ModuleXmlPreview 
        v-if="selectedSayList"
        :item="selectedSayList" 
        @delete="removeSay(selectedIndex!)"
      />
    </template>
  </EditorLayout>
</template>

<script setup lang="ts">
import EditorLayout from '../../components/EditorLayout.vue';
import ModuleSidebar from '../../components/ModuleSidebar.vue';
import ModuleXmlPreview from '../../components/ModuleXmlPreview.vue';
import SayBasicSection from './sections/SayBasicSection.vue';
import SayContentSection from './sections/SayContentSection.vue';
import { useSayState } from './hooks/useSayState';

const { selectedIndex, selectedSayList, menuOptions, addSay, removeSay } = useSayState();
</script>