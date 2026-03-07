<!-- client/src/views/Editor/BulletEditor/index.vue -->
<template>
    <EditorLayout :has-selection="selectedIndex !== null" empty-text="请选择或创建一个子弹进行编辑">
        <template #sidebar>
            <ModuleSidebar
                title="子弹列表"
                :menu-options="menuOptions"
                v-model:model-value="selectedIndex"
                show-xml-button
                @add="modStore.addBullet"
                @delete="modStore.removeBullet"
                @view-xml="showXmlDrawer = true"
            />
        </template>

        <template #content>
            <div class="h-full flex flex-col">
                <!-- XML 预览抽屉 -->
                <n-drawer v-model:show="showXmlDrawer" :width="500" placement="right">
                    <n-drawer-content title="XML 预览" closable>
                        <div class="xml-drawer-content">
                            <n-button type="primary" size="small" @click="copyXml" style="margin-bottom: 12px">
                                复制代码
                            </n-button>
                            <pre class="xml-preview-box">{{ selectedBullet?.toXml() }}</pre>
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
                </template>

                <!-- 向导模式 -->
                <template v-if="editorModeStore.isWizardMode">
                    <WizardPanel
                        v-if="selectedBullet"
                        :categories="categories"
                        :all-fields="allFields"
                        :data="selectedBullet"
                        @update:data="updateBullet"
                        class="flex-1"
                    />
                </template>
            </div>
        </template>
    </EditorLayout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { FingerPrintOutline, FlashOutline, ExtensionPuzzleOutline, SpeedometerOutline } from '@vicons/ionicons5';
import { useMessage, NDrawer, NDrawerContent } from 'naive-ui';
import type { BulletMetaItem } from './config/types';
import EditorLayout from '../../components/EditorLayout.vue';
import ModuleSidebar from '../../components/ModuleSidebar.vue';
import WizardPanel from '../../components/wizard/WizardPanel.vue';
import { useModStore } from '../../../store/useModStore';
import { useBulletState } from './hooks/useBulletState';
import { useEditorModeStore } from '../../../store/useEditorModeStore';

// 导入分栏组件
import BulletBasicSection from './sections/BulletBasicSection.vue';
import BulletCombatSection from './sections/BulletCombatSection.vue';
import BulletLogicSection from './sections/BulletLogicSection.vue';
import BulletMotionSection from './sections/BulletMotionSection.vue';

// 导入字段配置
import {
    BULLET_BASIC_METAS,
    BULLET_HURT_METAS,
    BULLET_BEHAVIOR_METAS,
    BULLET_SHOOT_METAS,
    BULLET_FLAG_METAS,
    BULLET_MOTION_METAS,
    BULLET_GATLIN_METAS,
    BULLET_SPEED_DETAIL_METAS,
    BULLET_FOLLOW_METAS,
    BULLET_BOUNCE_METAS,
    BULLET_SKILL_METAS,
    BULLET_BOOM_METAS,
    BULLET_LINE_METAS,
    BULLET_VISUAL_METAS
} from './config';

// 导入向导配置
import {
    BULLET_WIZARD_CATEGORIES,
    enhanceFieldMeta
} from './config/wizard';

const message = useMessage();
const modStore = useModStore();
const { selectedIndex, selectedBullet, menuOptions } = useBulletState();
const editorModeStore = useEditorModeStore();

const activeTab = ref('basic');

// XML 预览抽屉状态
const showXmlDrawer = ref(false);

// 复制 XML
const copyXml = () => {
    if (selectedBullet.value) {
        navigator.clipboard.writeText(selectedBullet.value.toXml());
        message.success('已复制到剪贴板');
    }
};

// 向导模式配置
const categories = BULLET_WIZARD_CATEGORIES;

// 合并所有字段配置并增强
const allFields = computed(() => {
    const allMetas: BulletMetaItem[] = [
        ...BULLET_BASIC_METAS,
        ...BULLET_HURT_METAS,
        ...BULLET_BEHAVIOR_METAS,
        ...BULLET_SHOOT_METAS,
        ...BULLET_FLAG_METAS,
        ...BULLET_MOTION_METAS,
        ...BULLET_GATLIN_METAS,
        ...BULLET_SPEED_DETAIL_METAS,
        ...BULLET_FOLLOW_METAS,
        ...BULLET_BOUNCE_METAS,
        ...BULLET_SKILL_METAS,
        ...BULLET_BOOM_METAS,
        ...BULLET_LINE_METAS,
        ...BULLET_VISUAL_METAS
    ];
    return allMetas.map(enhanceFieldMeta);
});

// 更新子弹数据
function updateBullet(newData: any) {
    if (selectedBullet.value && selectedIndex.value !== null) {
        Object.assign(selectedBullet.value, newData);
    }
}
</script>

<style scoped>
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
