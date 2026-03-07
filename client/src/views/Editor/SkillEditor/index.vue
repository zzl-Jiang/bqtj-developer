<!-- client/src/views/Editor/SkillEditor/index.vue -->
<template>
  <EditorLayout :has-selection="!!selectedSkill" empty-text="请在左侧选择技能或点击新增">
    <!-- 侧边栏 -->
    <template #sidebar>
      <ModuleSidebar
        title="技能定义"
        :menu-options="menuOptions"
        v-model:model-value="selectedIndex"
        show-xml-button
        @add="addSkill"
        @delete="handleDeleteItem"
        @view-xml="showXmlDrawer = true"
      />
    </template>

    <!-- 中央编辑区 -->
    <template #content>
      <div class="h-full flex flex-col">
        <!-- 复杂字段编辑器抽屉 -->
        <n-drawer v-model:show="showComplexDrawer" :width="650" placement="right">
          <n-drawer-content :title="complexDrawerTitle" closable>
            <div v-if="complexFieldType === 'target'" class="complex-editor">
              <TargetSection />
            </div>
            <div v-else-if="complexFieldType === 'visuals'" class="complex-editor">
              <VisualSection />
            </div>
          </n-drawer-content>
        </n-drawer>

        <!-- XML 预览抽屉 -->
        <n-drawer v-model:show="showXmlDrawer" :width="500" placement="right">
          <n-drawer-content title="XML 预览" closable>
            <div class="xml-drawer-content">
              <n-button type="primary" size="small" @click="copyXml" style="margin-bottom: 12px">
                复制代码
              </n-button>
              <pre class="xml-preview-box">{{ selectedSkill?.toXml() }}</pre>
            </div>
          </n-drawer-content>
        </n-drawer>

        <!-- 专业模式 -->
        <template v-if="editorModeStore.isProMode">
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
        </template>

        <!-- 向导模式 -->
        <template v-if="editorModeStore.isWizardMode">
          <WizardPanel
            v-if="selectedSkill"
            :categories="categories"
            :all-fields="allFields"
            :data="selectedSkill"
            @update:data="updateSkill"
            @edit:complex="handleComplexEdit"
            class="flex-1"
          />
        </template>
      </div>
    </template>
  </EditorLayout>
</template>

<script setup lang="ts">
import {
  BuildOutline,
  FlashOutline,
  LocateOutline,
  ImageOutline
} from '@vicons/ionicons5';
import { useSkillState } from './hooks/useSkillState';
import { useMessage, NDrawer, NDrawerContent } from 'naive-ui';
import { computed, ref } from 'vue';
import type { BulletMetaItem } from '../../Editor/BulletEditor/config/types';

// 引入通用组件
import EditorLayout from '../../components/EditorLayout.vue';
import ModuleSidebar from '../../components/ModuleSidebar.vue';
import WizardPanel from '../../components/wizard/WizardPanel.vue';

// 引入业务 Section
import BasicSection from './sections/BasicSection.vue';
import EffectSection from './sections/EffectSection.vue';
import TargetSection from './sections/TargetSection.vue';
import VisualSection from './sections/VisualSection.vue';

// 导入编辑器模式 store
import { useEditorModeStore } from '../../../store/useEditorModeStore';

// 导入字段配置
import {
  SKILL_BASE_FIELDS,
  SKILL_LOGIC_FIELDS,
  SKILL_TARGET_FIELDS,
  SKILL_FLAG_FIELDS
} from './config';
import type { SkillMetaItem } from './config/types';

// 导入向导配置
import {
  SKILL_WIZARD_CATEGORIES,
  enhanceFieldMeta
} from './config/wizard';

const message = useMessage();
const { selectedSkill, selectedIndex, menuOptions, addSkill, removeSkill } = useSkillState();
const editorModeStore = useEditorModeStore();

// 复杂字段编辑器状态
const showComplexDrawer = ref(false);
const complexFieldType = ref<string>('');
const complexDrawerTitle = computed(() => {
  const titles: Record<string, string> = {
    target: '编辑目标选择配置',
    visuals: '编辑视觉资源配置'
  };
  return titles[complexFieldType.value] || '编辑配置';
});

// XML 预览抽屉状态
const showXmlDrawer = ref(false);

// 处理复杂字段编辑
function handleComplexEdit(field: BulletMetaItem, _data: any) {
  if (field.key === 'target') {
    complexFieldType.value = 'target';
    showComplexDrawer.value = true;
  } else if (
    field.key === 'addSkillEffectImg' ||
    field.key === 'meEffectImg' ||
    field.key === 'targetEffectImg' ||
    field.key === 'pointEffectImg' ||
    field.key === 'otherEffectImg' ||
    field.key === 'stateEffectImg' ||
    field.key === 'stateEffectImg2'
  ) {
    complexFieldType.value = 'visuals';
    showComplexDrawer.value = true;
  }
}

// 复制 XML
const copyXml = () => {
  if (selectedSkill.value) {
    navigator.clipboard.writeText(selectedSkill.value.toXml());
    message.success('已复制到剪贴板');
  }
};

// 向导模式配置
const categories = SKILL_WIZARD_CATEGORIES;

// 合并所有字段配置并增强
const allFields = computed(() => {
  const allMetas: SkillMetaItem[] = [
    ...SKILL_BASE_FIELDS,
    ...SKILL_LOGIC_FIELDS,
    ...SKILL_TARGET_FIELDS,
    ...SKILL_FLAG_FIELDS
  ];
  return allMetas.map(enhanceFieldMeta);
});

// 更新技能数据
function updateSkill(newData: any) {
  if (selectedSkill.value && selectedIndex.value !== null) {
    Object.assign(selectedSkill.value, newData);
  }
}

const handleDeleteItem = (index: number) => {
  removeSkill(index);
  message.warning('技能已移除');
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

.complex-editor {
  height: 100%;
  overflow-y: auto;
}

.right-panel {
  width: 280px;
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: var(--premium-rounded);
  padding: 16px;
}

.effect-card {
  margin-bottom: 12px;
}

.effect-desc-text {
  font-size: 13px;
  line-height: 1.6;
  color: #adbac7;
  white-space: pre-line;
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
