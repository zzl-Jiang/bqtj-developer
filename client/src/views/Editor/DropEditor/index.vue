<template>
    <EditorLayout :has-selection="selectedIndex !== null" empty-text="请在左侧或上方选择掉落或点击新增">
        <template #sidebar>
            <ModuleSidebar
                title="掉落列表"
                :menu-options="menuOptions"
                v-model:model-value="selectedIndex"
                show-xml-button
                @add="addDrop"
                @delete="removeDrop"
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
                            <pre class="xml-preview-box">{{ selectedDrop?.toXml() }}</pre>
                        </div>
                    </n-drawer-content>
                </n-drawer>

                <!-- 专业模式 -->
                <template v-if="editorModeStore.isProMode">
                    <n-tabs v-model:value="activeTab" type="line" animated class="flex-1" pane-class="tab-content">
                        <!-- 基础信息 -->
                        <n-tab-pane name="basic" tab="基础信息">
                            <template #tab>
                                <n-space :size="6" align="center" :wrap="false">
                                    <n-icon>
                                        <FingerPrintOutline />
                                    </n-icon>
                                    <span>基础属性</span>
                                </n-space>
                            </template>
                            <DropBasicSection />
                        </n-tab-pane>

                        <!-- 视觉资源 -->
                        <n-tab-pane name="visual" tab="视觉资源">
                            <template #tab>
                                <n-space :size="6" align="center" :wrap="false">
                                    <n-icon>
                                        <ImageOutline />
                                    </n-icon>
                                    <span>视觉资源</span>
                                </n-space>
                            </template>
                            <DropVisualSection />
                        </n-tab-pane>

                        <!-- 逻辑设定 -->
                        <n-tab-pane name="logic" tab="逻辑设定">
                            <template #tab>
                                <n-space :size="6" align="center" :wrap="false">
                                    <n-icon>
                                        <ExtensionPuzzleOutline />
                                    </n-icon>
                                    <span>逻辑设定</span>
                                </n-space>
                            </template>
                            <DropLogicSection />
                        </n-tab-pane>
                    </n-tabs>
                </template>

                <!-- 向导模式 -->
                <template v-if="editorModeStore.isWizardMode">
                    <WizardPanel
                        v-if="selectedDrop"
                        :categories="categories"
                        :all-fields="allFields"
                        :data="selectedDrop"
                        @update:data="updateDrop"
                        class="flex-1"
                    />
                </template>
            </div>
        </template>
    </EditorLayout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { FingerPrintOutline, ImageOutline, ExtensionPuzzleOutline } from '@vicons/ionicons5';
import { useMessage, NDrawer, NDrawerContent } from 'naive-ui';
import { useResponsive } from '../../../hooks/useResponsive';
import EditorLayout from '../../components/EditorLayout.vue';
import ModuleSidebar from '../../components/ModuleSidebar.vue';
import WizardPanel from '../../components/wizard/WizardPanel.vue';
import { useDropState } from './hooks/useDropState';
import { useEditorModeStore } from '../../../store/useEditorModeStore';

// 导入分栏组件
import DropBasicSection from './sections/DropBasicSection.vue';
import DropVisualSection from './sections/DropVisualSection.vue';
import DropLogicSection from './sections/DropLogicSection.vue';

// 导入字段配置
import {
    DROP_BASIC_METAS,
    DROP_VISUAL_METAS,
    DROP_LOGIC_METAS,
    DROP_PROBABILITY_METAS
} from './config';
import type { DropMetaItem } from './config/types';

// 导入向导配置
import {
    DROP_WIZARD_CATEGORIES,
    enhanceFieldMeta
} from './config/wizard';

const message = useMessage();
const { selectedIndex, selectedDrop, menuOptions, addDrop, removeDrop } = useDropState();
const editorModeStore = useEditorModeStore();
const { isMobile } = useResponsive();

const activeTab = ref('basic');

// XML 预览抽屉状态
const showXmlDrawer = ref(false);

// 复制 XML
const copyXml = () => {
    if (selectedDrop.value) {
        navigator.clipboard.writeText(selectedDrop.value.toXml());
        message.success('已复制到剪贴板');
    }
};

// 向导模式配置
const categories = DROP_WIZARD_CATEGORIES;

// 合并所有字段配置并增强
const allFields = computed(() => {
    const allMetas: DropMetaItem[] = [
        ...DROP_BASIC_METAS,
        ...DROP_VISUAL_METAS,
        ...DROP_LOGIC_METAS,
        ...DROP_PROBABILITY_METAS
    ];
    return allMetas.map(enhanceFieldMeta);
});

// 更新掉落数据
function updateDrop(newData: any) {
    if (selectedDrop.value && selectedIndex.value !== null) {
        Object.assign(selectedDrop.value, newData);
    }
}
</script>

<style scoped>
:deep(.tab-content) {
    padding: 16px;
    overflow-y: auto;
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
