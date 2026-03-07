<template>
    <div v-if="arms" class="arms-bullet-section">
        <n-collapse :default-expanded-names="['damage', 'flags']" arrow-placement="right">
            <!-- 伤害效果与暴击 -->
            <n-collapse-item name="damage" class="premium-collapse-item">
                <template #header>
                    <n-space align="center" :size="8">
                        <n-icon :component="HeartDislikeOutline" color="#e88080" />
                        <span>伤害效果与暴击 (Damage & Crit)</span>
                    </n-space>
                </template>
                <div class="section-content">
                    <n-grid :cols="3" :x-gap="12" :y-gap="12">
                        <n-gi v-for="meta in ARMS_BULLET_DAMAGE_METAS" :key="meta.key">
                            <MetaFormItem :meta="meta" v-model:modelValue="arms" :show-label="true" />
                        </n-gi>
                    </n-grid>
                </div>
            </n-collapse-item>

            <!-- 行为标志 -->
            <n-collapse-item name="flags" class="premium-collapse-item">
                <template #header>
                    <n-space align="center" :size="8">
                        <n-icon :component="ToggleOutline" color="#63e2b7" />
                        <span>行为标志 (Behavior Flags)</span>
                    </n-space>
                </template>
                <div class="section-content">
                    <n-grid :cols="3" :x-gap="12" :y-gap="12">
                        <n-gi v-for="meta in ARMS_BULLET_FLAG_METAS" :key="meta.key">
                            <MetaFormItem :meta="meta" v-model:modelValue="arms" :show-label="true" />
                        </n-gi>
                    </n-grid>
                </div>
            </n-collapse-item>

            <!-- 生命周期与碰撞 -->
            <n-collapse-item name="lifecycle" class="premium-collapse-item">
                <template #header>
                    <n-space align="center" :size="8">
                        <n-icon :component="TimeOutline" color="#a8c5f0" />
                        <span>生命周期与碰撞 (Lifecycle)</span>
                    </n-space>
                </template>
                <div class="section-content">
                    <n-grid :cols="3" :x-gap="12" :y-gap="12">
                        <n-gi v-for="meta in ARMS_BULLET_LIFECYCLE_METAS.concat(ARMS_BULLET_TIMING_METAS)" :key="meta.key">
                            <MetaFormItem :meta="meta" v-model:modelValue="arms" :show-label="true" />
                        </n-gi>
                    </n-grid>
                </div>
            </n-collapse-item>

            <!-- 发射与运动 -->
            <n-collapse-item name="shoot" class="premium-collapse-item">
                <template #header>
                    <n-space align="center" :size="8">
                        <n-icon :component="RocketOutline" color="#70c0e8" />
                        <span>发射与运动 (Shoot & Motion)</span>
                    </n-space>
                </template>
                <div class="section-content">
                    <n-grid :cols="3" :x-gap="12" :y-gap="12">
                        <n-gi v-for="meta in ARMS_BULLET_SHOOT_METAS.concat(ARMS_BULLET_MOTION_METAS)" :key="meta.key">
                            <MetaFormItem :meta="meta" v-model:modelValue="arms" :show-label="true" />
                        </n-gi>
                    </n-grid>
                </div>
            </n-collapse-item>

            <!-- 技能与特效 -->
            <n-collapse-item name="skills" class="premium-collapse-item">
                <template #header>
                    <n-space align="center" :size="8">
                        <n-icon :component="SparklesOutline" color="#f2c97d" />
                        <span>技能数组与特效 (Skills)</span>
                    </n-space>
                </template>
                <div class="section-content">
                    <n-grid :cols="3" :x-gap="12" :y-gap="12">
                        <n-gi v-for="meta in ARMS_BULLET_SKILL_METAS.concat(ARMS_BULLET_SUBOBJECT_METAS)" :key="meta.key">
                            <MetaFormItem :meta="meta" v-model:modelValue="arms" :show-label="true" />
                        </n-gi>
                    </n-grid>
                </div>
            </n-collapse-item>
        </n-collapse>
    </div>
</template>

<script setup lang="ts">
import { HeartDislikeOutline, ToggleOutline, TimeOutline, RocketOutline, SparklesOutline } from '@vicons/ionicons5';
import { useArmsState } from '../hooks/useArmsState';
import {
    ARMS_BULLET_DAMAGE_METAS,
    ARMS_BULLET_FLAG_METAS,
    ARMS_BULLET_LIFECYCLE_METAS,
    ARMS_BULLET_TIMING_METAS,
    ARMS_BULLET_SHOOT_METAS,
    ARMS_BULLET_MOTION_METAS,
    ARMS_BULLET_SKILL_METAS,
    ARMS_BULLET_SUBOBJECT_METAS
} from '../config';
import MetaFormItem from '../../../components/MetaFormItem.vue';

const { selectedArms: arms } = useArmsState();
</script>

<style scoped>
.arms-bullet-section {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.section-content {
    padding: 12px 0 20px 0;
}

:deep(.n-collapse-item__header) {
    border: 1px solid rgba(255, 255, 255, 0.05) !important;
    background: rgba(255, 255, 255, 0.02) !important;
    transition: all 0.3s ease !important;
    border-radius: 8px !important;
    margin-bottom: 8px;
}

:deep(.n-collapse-item__header--active) {
    border-color: rgba(232, 128, 128, 0.3) !important;
    background: rgba(232, 128, 128, 0.03) !important;
}
</style>
