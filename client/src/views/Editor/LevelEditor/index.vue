<!-- client/src/views/Editor/LevelEditor/index.vue -->
<template>
  <EditorLayout :has-selection="!!selectedLevel" empty-text="请在左侧或上方选择关卡或点击新增">
    <template #sidebar>
      <ModuleSidebar
        title="关卡"
        :menu-options="menuOptions"
        v-model:model-value="selectedIndex"
        show-xml-button
        show-import-button
        @add="addLevel"
        @delete="removeLevel"
        @view-xml="showXmlDrawer = true"
        @import="showImportDialog = true"
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
              <pre class="xml-preview-box">{{ selectedLevel?.toXml() }}</pre>
            </div>
          </n-drawer-content>
        </n-drawer>

        <!-- 复杂字段编辑器抽屉 -->
        <n-drawer v-model:show="showComplexDrawer" :width="isMobile ? '100%' : 700" placement="right">
          <n-drawer-content :title="complexFieldTitle" closable>
            <div v-if="complexFieldType === 'eventG'" class="complex-editor">
              <EventSection />
            </div>
            <div v-else-if="complexFieldType === 'unitG'" class="complex-editor">
              <UnitGroupSection />
            </div>
            <div v-else-if="complexFieldType === 'rectG'" class="complex-editor">
              <MapRectSection />
            </div>
          </n-drawer-content>
        </n-drawer>

        <!-- 专业模式 -->
        <template v-if="editorModeStore.isProMode">
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
        </template>

        <!-- 向导模式 -->
        <template v-if="editorModeStore.isWizardMode">
          <WizardPanel
            v-if="selectedLevel"
            :categories="categories"
            :all-fields="allFields"
            :data="selectedLevel"
            @update:data="updateLevel"
            @edit:complex="handleComplexEdit"
            class="flex-1"
          />
        </template>

        <!-- 导入对话框 -->
        <ImportDialog
          v-model:show="showImportDialog"
          target-module="level"
          @import="handleImportLevels"
        />
      </div>
    </template>
  </EditorLayout>
</template>

<script setup lang="ts">
import { SettingsOutline, PeopleOutline, MapOutline, ListOutline } from '@vicons/ionicons5';
import { useMessage, NDrawer, NDrawerContent } from 'naive-ui';
import { useLevelState } from './hooks/useLevelState';
import { useResponsive } from '../../../hooks/useResponsive';
import EditorLayout from '../../components/EditorLayout.vue';
import ModuleSidebar from '../../components/ModuleSidebar.vue';
import WizardPanel from '../../components/wizard/WizardPanel.vue';
import ImportDialog from '../../components/ImportDialog.vue';
import { useModStore } from '../../../store/useModStore';
import { useEditorModeStore } from '../../../store/useEditorModeStore';
import { ref, watch, computed } from 'vue';
import type { BulletMetaItem } from '../../Editor/BulletEditor/config/types';
import type { LevelDefine } from '../../../models/level/LevelDefine';

import LevelBasicSection from './sections/LevelBasicSection.vue';
import UnitGroupSection from './sections/UnitGroupSection.vue';
import MapRectSection from './sections/MapRectSection.vue';
import EventSection from './sections/EventSection.vue';

// 导入字段配置
import {
  LEVEL_BASIC_METAS,
  LEVEL_INFO_METAS
} from './config';
import type { LevelMetaItem } from './config/types';

// 导入向导配置
import {
  LEVEL_WIZARD_CATEGORIES,
  enhanceFieldMeta
} from './config/wizard';

const message = useMessage();
const { selectedIndex, selectedLevel, menuOptions, addLevel, removeLevel } = useLevelState();
const modStore = useModStore();
const editorModeStore = useEditorModeStore();
const { isMobile } = useResponsive();

// 管理当前激活的页签
const activeTab = ref('basic');

// XML 预览抽屉状态
const showXmlDrawer = ref(false);

// 导入对话框状态
const showImportDialog = ref(false);

// 处理导入数据
function handleImportLevels(levels: LevelDefine[]) {
  if (!levels.length) return;

  // 将导入的关卡添加到列表中
  for (const level of levels) {
    modStore.levelList.push(level);
  }

  // 选中新导入的第一个关卡
  selectedIndex.value = modStore.levelList.length - levels.length;

  message.success(`成功导入 ${levels.length} 个关卡`);
}

// 复制 XML
const copyXml = () => {
  if (selectedLevel.value) {
    navigator.clipboard.writeText(selectedLevel.value.toXml());
    message.success('已复制到剪贴板');
  }
};

// 复杂字段编辑器状态
const showComplexDrawer = ref(false);
const complexFieldType = ref<string>('');
const complexFieldTitle = computed(() => {
  const titles: Record<string, string> = {
    eventG: '编辑事件逻辑',
    unitG: '编辑单位配置',
    rectG: '编辑区域配置'
  };
  return titles[complexFieldType.value] || '编辑配置';
});

// 处理复杂字段编辑
function handleComplexEdit(field: BulletMetaItem, _data: any) {
  if (field.complexType === 'eventG' || field.complexType === 'unitG' || field.complexType === 'rectG') {
    complexFieldType.value = field.complexType;
    showComplexDrawer.value = true;
  }
}

// 向导模式配置
const categories = LEVEL_WIZARD_CATEGORIES;

// 合并所有字段配置并增强
const allFields = computed(() => {
  const allMetas: LevelMetaItem[] = [
    ...LEVEL_BASIC_METAS,
    ...LEVEL_INFO_METAS.runtime,
    ...LEVEL_INFO_METAS.restrictions,
    ...LEVEL_INFO_METAS.misc
  ];
  return allMetas.map(enhanceFieldMeta);
});

// 更新关卡数据
function updateLevel(newData: any) {
  if (selectedLevel.value && selectedIndex.value !== null) {
    Object.assign(selectedLevel.value, newData);
  }
}

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

.complex-editor {
  height: 100%;
  overflow-y: auto;
}

.complex-editor :deep(.n-card) {
  margin-bottom: 16px;
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
