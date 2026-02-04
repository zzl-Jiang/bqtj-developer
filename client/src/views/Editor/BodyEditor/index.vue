<!-- client/src/views/Editor/BodyEditor/index.vue -->
<template>
  <EditorLayout :has-selection="!!selectedBody" empty-text="请在左侧选择单位或点击新增">
    <template #sidebar>
      <ModuleSidebar title="单位列表" :menu-options="menuOptions" v-model:model-value="selectedIndex" @add="addBody" />
    </template>

    <template #content>
      <div class="h-full flex flex-col">
        <n-tabs v-model:value="activeTab" type="line" animated class="flex-1" pane-class="tab-content">
          <!-- 基础信息 -->
          <n-tab-pane name="basic" tab="基础信息" style="padding: 16px;">
            <template #tab>
              <n-space :size="6" align="center" :wrap="false">
                <n-icon>
                  <PersonOutline />
                </n-icon>
                <span>基础信息</span>
              </n-space>
            </template>
            <BodyBasicSection />
          </n-tab-pane>

          <!-- 战斗数值 -->
          <n-tab-pane name="battle" tab="战斗数值">
            <template #tab>
              <n-space :size="6" align="center" :wrap="false">
                <n-icon>
                  <PulseOutline />
                </n-icon>
                <span>战斗数值</span>
              </n-space>
            </template>
            <BodyBattleSection />
          </n-tab-pane>

          <!-- 物理与运动 -->
          <n-tab-pane name="physics" tab="物理与运动">
            <template #tab>
              <n-space :size="6" align="center" :wrap="false">
                <n-icon>
                  <SpeedometerOutline />
                </n-icon>
                <span>物理运动</span>
              </n-space>
            </template>
            <BodyPhysicsSection />
          </n-tab-pane>

          <!-- 判定框 -->
          <n-tab-pane name="rect" tab="判定框">
            <template #tab>
              <n-space :size="6" align="center" :wrap="false">
                <n-icon>
                  <ScanOutline />
                </n-icon>
                <span>判定框</span>
              </n-space>
            </template>
            <BodyRectSection />
          </n-tab-pane>

          <!-- 攻击定义 -->
          <n-tab-pane name="attack" tab="攻击定义">
            <template #tab>
              <n-space :size="6" align="center" :wrap="false">
                <n-icon>
                  <FlashOutline />
                </n-icon>
                <span>攻击定义</span>
              </n-space>
            </template>
            <BodyAttackSection />
          </n-tab-pane>
        </n-tabs>
      </div>
    </template>

    <template #preview>
      <ModuleXmlPreview v-if="selectedBody" :item="selectedBody" @delete="() => removeBody(selectedIndex!)" />
    </template>
  </EditorLayout>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { PersonOutline, PulseOutline, SpeedometerOutline, FlashOutline, ScanOutline } from '@vicons/ionicons5';
import { useBodyState } from './hooks/useBodyState';

import { useModStore } from '../../../store/useModStore';
import EditorLayout from '../../components/EditorLayout.vue';
import ModuleSidebar from '../../components/ModuleSidebar.vue';
import ModuleXmlPreview from '../../components/ModuleXmlPreview.vue';

// 导入所有 Section 组件
import BodyBasicSection from './sections/BodyBasicSection.vue';
import BodyBattleSection from './sections/BodyBattleSection.vue';
import BodyPhysicsSection from './sections/BodyPhysicsSection.vue';
import BodyAttackSection from './sections/BodyAttackSection.vue';
import BodyRectSection from './sections/BodyRectSection.vue';


const { selectedIndex, selectedBody, menuOptions, addBody, removeBody } = useBodyState();
const modStore = useModStore();

// 管理当前激活的页签
const activeTab = ref('basic');

/**
 * 监听全局跳转请求 (Navigation Support)
 */
watch(() => modStore.navigationRequest.timestamp, () => {
  const req = modStore.navigationRequest;
  if (req.module === 'body' && req.tab) {
    activeTab.value = req.tab;
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
  /* Adjust based on tab header height */
  box-sizing: border-box;
}
</style>