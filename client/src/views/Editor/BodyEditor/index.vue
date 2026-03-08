<!-- client/src/views/Editor/BodyEditor/index.vue -->
<template>
  <EditorLayout :has-selection="!!selectedBody" empty-text="请在左侧或上方选择单位或点击新增">
    <template #sidebar>
      <ModuleSidebar
        title="单位列表"
        :menu-options="menuOptions"
        v-model:model-value="selectedIndex"
        show-xml-button
        @add="addBody"
        @delete="removeBody"
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
              <pre class="xml-preview-box">{{ selectedBody?.toXml() }}</pre>
            </div>
          </n-drawer-content>
        </n-drawer>

        <!-- 专业模式 -->
        <template v-if="editorModeStore.isProMode">
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
        </template>

        <!-- 向导模式 -->
        <template v-if="editorModeStore.isWizardMode">
          <WizardPanel
            v-if="selectedBody"
            :categories="categories"
            :all-fields="allFields"
            :data="selectedBody"
            @update:data="updateBody"
            class="flex-1"
          />
        </template>
      </div>
    </template>
  </EditorLayout>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { PersonOutline, PulseOutline, SpeedometerOutline, FlashOutline, ScanOutline } from '@vicons/ionicons5';
import { useMessage, NDrawer, NDrawerContent } from 'naive-ui';
import { useResponsive } from '../../../hooks/useResponsive';
import { useBodyState } from './hooks/useBodyState';

import { useModStore } from '../../../store/useModStore';
import { useEditorModeStore } from '../../../store/useEditorModeStore';
import EditorLayout from '../../components/EditorLayout.vue';
import ModuleSidebar from '../../components/ModuleSidebar.vue';
import WizardPanel from '../../components/wizard/WizardPanel.vue';

// 导入所有 Section 组件
import BodyBasicSection from './sections/BodyBasicSection.vue';
import BodyBattleSection from './sections/BodyBattleSection.vue';
import BodyPhysicsSection from './sections/BodyPhysicsSection.vue';
import BodyAttackSection from './sections/BodyAttackSection.vue';
import BodyRectSection from './sections/BodyRectSection.vue';

// 导入字段配置
import {
  BODY_BASIC_METAS,
  BODY_HERO_METAS,
  BODY_LIFEBAR_METAS,
  BODY_BATTLE_METAS,
  BODY_PHYSICS_METAS,
  BODY_MOVE_EXT_METAS
} from './config';
import type { BodyMetaItem } from './config/types';

// 导入向导配置
import {
  BODY_WIZARD_CATEGORIES,
  enhanceFieldMeta
} from './config/wizard';

const message = useMessage();
const { selectedIndex, selectedBody, menuOptions, addBody, removeBody } = useBodyState();
const modStore = useModStore();
const editorModeStore = useEditorModeStore();
const { isMobile } = useResponsive();

// 管理当前激活的页签
const activeTab = ref('basic');

// XML 预览抽屉状态
const showXmlDrawer = ref(false);

// 复制 XML
const copyXml = () => {
  if (selectedBody.value) {
    navigator.clipboard.writeText(selectedBody.value.toXml());
    message.success('已复制到剪贴板');
  }
};

// 向导模式配置
const categories = BODY_WIZARD_CATEGORIES;

// 合并所有字段配置并增强
const allFields = computed(() => {
  const allMetas: BodyMetaItem[] = [
    ...BODY_BASIC_METAS,
    ...BODY_HERO_METAS,
    ...BODY_LIFEBAR_METAS,
    ...BODY_BATTLE_METAS,
    ...BODY_PHYSICS_METAS,
    ...BODY_MOVE_EXT_METAS
  ];
  return allMetas.map(enhanceFieldMeta);
});

// 更新单位数据
function updateBody(newData: any) {
  if (selectedBody.value && selectedIndex.value !== null) {
    Object.assign(selectedBody.value, newData);
  }
}

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
