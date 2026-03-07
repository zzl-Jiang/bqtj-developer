<template>
    <EditorLayout :has-selection="selectedIndex !== null" empty-text="请选择或创建一个武器进行编辑">
        <template #sidebar>
            <ModuleSidebar title="武器列表" :menu-options="menuOptions" v-model:model-value="selectedIndex"
                @add="addArms" />
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
                        <ArmsBasicSection />
                    </n-tab-pane>

                    <!-- 战斗设定 -->
                    <n-tab-pane name="combat" tab="战斗设定">
                        <template #tab>
                            <n-space :size="6" align="center" :wrap="false">
                                <n-icon>
                                    <FlashOutline />
                                </n-icon>
                                <span>战斗设定</span>
                            </n-space>
                        </template>
                        <ArmsCombatSection />
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
                        <ArmsVisualSection />
                    </n-tab-pane>
                </n-tabs>
            </div>
        </template>

        <template #preview>
            <ModuleXmlPreview v-if="selectedArms" :item="selectedArms" @delete="() => removeArms(selectedIndex!)" />
        </template>
    </EditorLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { FingerPrintOutline, FlashOutline, ImageOutline } from '@vicons/ionicons5';
import EditorLayout from '../../components/EditorLayout.vue';
import ModuleSidebar from '../../components/ModuleSidebar.vue';
import ModuleXmlPreview from '../../components/ModuleXmlPreview.vue';
import { useArmsState } from './hooks/useArmsState';

// 导入分栏组件
import ArmsBasicSection from './sections/ArmsBasicSection.vue';
import ArmsCombatSection from './sections/ArmsCombatSection.vue';
import ArmsVisualSection from './sections/ArmsVisualSection.vue';

const { selectedIndex, selectedArms, menuOptions, addArms, removeArms } = useArmsState();

const activeTab = ref('basic');
</script>

<style scoped>
:deep(.tab-content) {
    padding: 16px;
    overflow-y: auto;
}
</style>
