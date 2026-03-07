<template>
    <EditorLayout :has-selection="selectedIndex !== null" empty-text="请选择或创建一个掉落项进行编辑">
        <template #sidebar>
            <ModuleSidebar title="掉落列表" :menu-options="menuOptions" v-model:model-value="selectedIndex"
                @add="addDrop" />
        </template>

        <template #content>
            <div class="h-full flex flex-col">
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
            </div>
        </template>

        <template #preview>
            <ModuleXmlPreview v-if="selectedDrop" :item="selectedDrop" @delete="() => removeDrop(selectedIndex!)" />
        </template>
    </EditorLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { FingerPrintOutline, ImageOutline, ExtensionPuzzleOutline } from '@vicons/ionicons5';
import EditorLayout from '../../components/EditorLayout.vue';
import ModuleSidebar from '../../components/ModuleSidebar.vue';
import ModuleXmlPreview from '../../components/ModuleXmlPreview.vue';
import { useDropState } from './hooks/useDropState';

// 导入分栏组件
import DropBasicSection from './sections/DropBasicSection.vue';
import DropVisualSection from './sections/DropVisualSection.vue';
import DropLogicSection from './sections/DropLogicSection.vue';

const { selectedIndex, selectedDrop, menuOptions, addDrop, removeDrop } = useDropState();

const activeTab = ref('basic');
</script>

<style scoped>
:deep(.tab-content) {
    padding: 16px;
    overflow-y: auto;
}
</style>
