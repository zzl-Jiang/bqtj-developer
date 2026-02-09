<!-- client/src/views/Editor/LevelEditor/index.vue -->
<template>
  <EditorLayout :has-selection="!!selectedLevel" empty-text="请在左侧选择关卡或点击新增">
    <template #sidebar>
      <ModuleSidebar title="关卡" :menu-options="menuOptions" v-model:model-value="selectedIndex" @add="addLevel" />
    </template>

    <template #content>
      <div class="h-full flex flex-col">
        <n-tabs v-model:value="activeTab" type="line" animated class="flex-1" pane-class="tab-content">

          <!-- 基础与规则 (包含 Level 属性和 Info 属性) -->
          <n-tab-pane name="basic" tab="基础设置">
            <template #tab>
              <n-space :size="6" align="center" :wrap="false">
                <n-icon>
                  <SettingsOutline />
                </n-icon>
                <span>基础设置</span>
              </n-space>
            </template>
            <LevelBasicSection />
          </n-tab-pane>

          <!-- 怪物与单位 (对应 unitG) -->
          <n-tab-pane name="units" tab="单位配置 (unitG)">
            <template #tab>
              <n-space :size="6" align="center" :wrap="false">
                <n-icon>
                  <PeopleOutline />
                </n-icon>
                <span>单位配置</span>
              </n-space>
            </template>
            <UnitGroupSection />
          </n-tab-pane>

          <!-- 区域配置 (对应 rectG) -->
          <n-tab-pane name="rects" tab="区域配置 (rectG)">
            <template #tab>
              <n-space :size="6" align="center" :wrap="false">
                <n-icon>
                  <MapOutline />
                </n-icon>
                <span>区域配置</span>
              </n-space>
            </template>
            <MapRectSection />
          </n-tab-pane>

          <!-- 事件逻辑 (对应 eventG) -->
          <n-tab-pane name="events" tab="事件组 (eventG)">
            <template #tab>
              <n-space :size="6" align="center" :wrap="false">
                <n-icon>
                  <ListOutline />
                </n-icon>
                <span>事件组</span>
              </n-space>
            </template>
            <EventSection />
          </n-tab-pane>
        </n-tabs>
      </div>
    </template>

    <template #preview>
      <ModuleXmlPreview v-if="selectedLevel" :item="selectedLevel" @delete="() => removeLevel(selectedIndex!)" />
    </template>
  </EditorLayout>
</template>

<script setup lang="ts">
import { SettingsOutline, PeopleOutline, MapOutline, ListOutline } from '@vicons/ionicons5';
import { useLevelState } from './hooks/useLevelState';
import EditorLayout from '../../components/EditorLayout.vue';
import ModuleSidebar from '../../components/ModuleSidebar.vue';
import ModuleXmlPreview from '../../components/ModuleXmlPreview.vue';
import LevelBasicSection from './sections/LevelBasicSection.vue';
import UnitGroupSection from './sections/UnitGroupSection.vue';
import MapRectSection from './sections/MapRectSection.vue';
import EventSection from './sections/EventSection.vue';
import { useModStore } from '../../../store/useModStore';
import { ref, watch } from 'vue';

const { selectedIndex, selectedLevel, menuOptions, addLevel, removeLevel } = useLevelState();
const modStore = useModStore();

// 管理当前激活的页签
const activeTab = ref('basic');

// 监听全局跳转请求
watch(() => modStore.navigationRequest.timestamp, () => {
  const req = modStore.navigationRequest;

  // 只有当跳转请求是发给 'level' 模块，且指定了具体 tab 时
  if (req.module === 'level' && req.tab) {
    activeTab.value = req.tab;
    // 注意：此时 selectedIndex 会因为 modStore.jumpTo 内部修改了 activeIndexes.level 而自动改变
    // 侧边栏会自动选中对应的关卡
  }
});
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
