<!-- client/src/views/Editor/BulletEditor/index.vue -->
<template>
    <EditorLayout :has-selection="selectedIndex !== null" empty-text="请选择或创建一个子弹进行编辑">
        <template #sidebar>
            <ModuleSidebar title="子弹列表" :menu-options="menuOptions" v-model:model-value="selectedIndex"
                @add="modStore.addBullet" />
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
                        <BulletBasicSection />
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
                        <BulletCombatSection />
                    </n-tab-pane>

                    <!-- 逻辑行为 -->
                    <n-tab-pane name="logic" tab="逻辑行为">
                        <template #tab>
                            <n-space :size="6" align="center" :wrap="false">
                                <n-icon>
                                    <ExtensionPuzzleOutline />
                                </n-icon>
                                <span>逻辑行为</span>
                            </n-space>
                        </template>
                        <BulletLogicSection />
                    </n-tab-pane>

                    <!-- 物理运动 -->
                    <n-tab-pane name="motion" tab="物理运动">
                        <template #tab>
                            <n-space :size="6" align="center" :wrap="false">
                                <n-icon>
                                    <SpeedometerOutline />
                                </n-icon>
                                <span>物理运动</span>
                            </n-space>
                        </template>
                        <BulletMotionSection />
                    </n-tab-pane>
                </n-tabs>
            </div>
        </template>

        <template #preview>
            <ModuleXmlPreview v-if="selectedBullet" :item="selectedBullet"
                @delete="() => modStore.removeBullet(selectedIndex!)" />
        </template>
    </EditorLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { FingerPrintOutline, FlashOutline, ExtensionPuzzleOutline, SpeedometerOutline } from '@vicons/ionicons5';
import EditorLayout from '../../components/EditorLayout.vue';
import ModuleSidebar from '../../components/ModuleSidebar.vue';
import ModuleXmlPreview from '../../components/ModuleXmlPreview.vue';
import { useModStore } from '../../../store/useModStore';
import { useBulletState } from './hooks/useBulletState';

// 导入分栏组件
import BulletBasicSection from './sections/BulletBasicSection.vue';
import BulletCombatSection from './sections/BulletCombatSection.vue';
import BulletLogicSection from './sections/BulletLogicSection.vue';
import BulletMotionSection from './sections/BulletMotionSection.vue';

const modStore = useModStore();
const { selectedIndex, selectedBullet, menuOptions } = useBulletState();

const activeTab = ref('basic');
</script>

<style scoped>
.xml-preview {
    background: rgba(0, 0, 0, 0.3);
    padding: 12px;
    border-radius: 4px;
    max-height: 100%;
}

pre {
    margin: 0;
    white-space: pre-wrap;
    word-break: break-all;
    font-family: var(--font-mono);
    font-size: 12px;
    color: #adbac7;
}
</style>
