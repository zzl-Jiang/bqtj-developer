<template>
    <EditorLayout :has-selection="selectedIndex !== null" empty-text="请选择或创建一个武器进行编辑">
        <template #sidebar>
            <ModuleSidebar
                title="武器列表"
                :menu-options="menuOptions"
                v-model:model-value="selectedIndex"
                show-xml-button
                @add="addArms"
                @delete="removeArms"
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
                            <pre class="xml-preview-box">{{ selectedArms?.toXml() }}</pre>
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

                        <!-- 子弹特性 -->
                        <n-tab-pane name="bullet" tab="子弹特性">
                            <template #tab>
                                <n-space :size="6" align="center" :wrap="false">
                                    <n-icon>
                                        <RocketOutline />
                                    </n-icon>
                                    <span>子弹特性</span>
                                </n-space>
                            </template>
                            <ArmsBulletSection />
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
                </template>

                <!-- 向导模式 -->
                <template v-if="editorModeStore.isWizardMode">
                    <WizardPanel
                        v-if="selectedArms"
                        :categories="categories"
                        :all-fields="allFields"
                        :data="selectedArms"
                        @update:data="updateArms"
                        class="flex-1"
                    />
                </template>
            </div>
        </template>
    </EditorLayout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { FingerPrintOutline, FlashOutline, RocketOutline, ImageOutline } from '@vicons/ionicons5';
import { useMessage, NDrawer, NDrawerContent } from 'naive-ui';
import type { BulletMetaItem } from '../BulletEditor/config/types';
import { useResponsive } from '../../../hooks/useResponsive';
import EditorLayout from '../../components/EditorLayout.vue';
import ModuleSidebar from '../../components/ModuleSidebar.vue';
import WizardPanel from '../../components/wizard/WizardPanel.vue';
import { useArmsState } from './hooks/useArmsState';
import { useEditorModeStore } from '../../../store/useEditorModeStore';

// 导入分栏组件
import ArmsBasicSection from './sections/ArmsBasicSection.vue';
import ArmsCombatSection from './sections/ArmsCombatSection.vue';
import ArmsBulletSection from './sections/ArmsBulletSection.vue';
import ArmsVisualSection from './sections/ArmsVisualSection.vue';

// 导入字段配置
import {
    ARMS_BASIC_METAS,
    ARMS_COMBAT_METAS,
    ARMS_BULLET_DAMAGE_METAS,
    ARMS_BULLET_FLAG_METAS,
    ARMS_BULLET_LIFECYCLE_METAS,
    ARMS_BULLET_TIMING_METAS,
    ARMS_BULLET_SHOOT_METAS,
    ARMS_BULLET_MOTION_METAS,
    ARMS_BULLET_SKILL_METAS,
    ARMS_BULLET_SUBOBJECT_METAS,
    ARMS_VISUAL_METAS,
    ARMS_RESOURCE_RANGE_METAS,
    ARMS_ADVANCED_METAS
} from './config';

// 导入向导配置
import {
    ARMS_WIZARD_CATEGORIES,
    enhanceFieldMeta
} from './config/wizard';

const message = useMessage();
const { selectedIndex, selectedArms, menuOptions, addArms, removeArms } = useArmsState();
const editorModeStore = useEditorModeStore();
const { isMobile } = useResponsive();

const activeTab = ref('basic');

// XML 预览抽屉状态
const showXmlDrawer = ref(false);

// 复制 XML
const copyXml = () => {
    if (selectedArms.value) {
        navigator.clipboard.writeText(selectedArms.value.toXml());
        message.success('已复制到剪贴板');
    }
};

// 向导模式配置
const categories = ARMS_WIZARD_CATEGORIES;

// 合并所有字段配置并增强
const allFields = computed(() => {
    const allMetas: BulletMetaItem[] = [
        ...ARMS_BASIC_METAS as BulletMetaItem[],
        ...ARMS_COMBAT_METAS as BulletMetaItem[],
        ...ARMS_BULLET_DAMAGE_METAS as BulletMetaItem[],
        ...ARMS_BULLET_FLAG_METAS as BulletMetaItem[],
        ...ARMS_BULLET_LIFECYCLE_METAS as BulletMetaItem[],
        ...ARMS_BULLET_TIMING_METAS as BulletMetaItem[],
        ...ARMS_BULLET_SHOOT_METAS as BulletMetaItem[],
        ...ARMS_BULLET_MOTION_METAS as BulletMetaItem[],
        ...ARMS_BULLET_SKILL_METAS as BulletMetaItem[],
        ...ARMS_BULLET_SUBOBJECT_METAS as BulletMetaItem[],
        ...ARMS_VISUAL_METAS as BulletMetaItem[],
        ...ARMS_RESOURCE_RANGE_METAS as BulletMetaItem[],
        ...ARMS_ADVANCED_METAS as BulletMetaItem[]
    ];
    return allMetas.map(enhanceFieldMeta);
});

// 更新武器数据
function updateArms(newData: any) {
    if (selectedArms.value && selectedIndex.value !== null) {
        Object.assign(selectedArms.value, newData);
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
