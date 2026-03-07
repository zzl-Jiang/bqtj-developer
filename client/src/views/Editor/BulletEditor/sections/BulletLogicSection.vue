<!-- client/src/views/Editor/BulletEditor/sections/BulletLogicSection.vue -->
<template>
    <div v-if="bullet" class="logic-section">
        <n-collapse :default-expanded-names="['behavior', 'life']" arrow-placement="right">
            <!-- 行为控制 (布尔值) -->
            <n-collapse-item name="behavior" class="premium-collapse-item">
                <template #header>
                    <n-space align="center" :size="8">
                        <n-icon :component="ExtensionPuzzleOutline" color="#70c0e8" />
                        <span>核心行为开关 (Behavior Flags)</span>
                    </n-space>
                </template>
                <div class="section-content">
                    <n-grid :cols="3" :x-gap="12" :y-gap="12">
                        <n-gi v-for="meta in BULLET_BEHAVIOR_METAS" :key="meta.key">
                            <MetaFormItem :meta="meta" v-model:modelValue="bullet[meta.key]" :show-label="true" />
                        </n-gi>
                    </n-grid>
                </div>
            </n-collapse-item>

            <!-- 生命周期与技能 -->
            <n-collapse-item name="life" class="premium-collapse-item">
                <template #header>
                    <n-space align="center" :size="8">
                        <n-icon :component="HourglassOutline" color="#f2c97d" />
                        <span>生命周期与技能 (Life & Skills)</span>
                    </n-space>
                </template>
                <div class="section-content">
                    <n-grid :cols="2" :x-gap="24" :y-gap="12">
                        <!-- 直接暴露一些关键的数字属性，如果 MetaFormItem 不够直观 -->
                        <n-gi>
                            <div class="meta-label">存活时间 (bulletLife)</div>
                            <n-input-number v-model:value="bullet.bulletLife" :precision="2" />
                        </n-gi>
                        <n-gi>
                            <div class="meta-label">随机存活时间 (lifeRandom)</div>
                            <n-input-number v-model:value="bullet.lifeRandom" :precision="2" />
                        </n-gi>
                        <n-gi :span="2">
                            <div class="meta-label">绑定技能 (skillArr)</div>
                            <n-select v-model:value="bullet.skillArr" multiple filterable tag
                                placeholder="输入技能 ID 并回车" />
                        </n-gi>
                    </n-grid>
                </div>
            </n-collapse-item>
        </n-collapse>
    </div>
</template>

<script setup lang="ts">
import { ExtensionPuzzleOutline, HourglassOutline } from '@vicons/ionicons5';
import { useBulletState } from '../hooks/useBulletState';
import { BULLET_BEHAVIOR_METAS } from '../config';
import MetaFormItem from '../../../components/MetaFormItem.vue';

const { selectedBullet: bullet } = useBulletState();
</script>

<style scoped>
.logic-section {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.section-content {
    padding: 12px 0 20px 0;
}

.meta-label {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.5);
    margin-bottom: 4px;
}

:deep(.n-collapse-item__header) {
    border: 1px solid rgba(255, 255, 255, 0.05) !important;
    background: rgba(255, 255, 255, 0.02) !important;
    transition: all 0.3s ease !important;
    border-radius: 8px !important;
    margin-bottom: 8px;
}

:deep(.n-collapse-item__header--active) {
    border-color: rgba(112, 192, 232, 0.3) !important;
    background: rgba(112, 192, 232, 0.03) !important;
}
</style>
