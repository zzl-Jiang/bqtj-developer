<!-- client/src/views/Editor/BulletEditor/sections/BulletMotionSection.vue -->
<template>
    <div v-if="bullet" class="motion-section">
        <n-collapse :default-expanded-names="['basic', 'advanced']" arrow-placement="right">
            <!-- 基础位移 -->
            <n-collapse-item name="basic" class="premium-collapse-item">
                <template #header>
                    <n-space align="center" :size="8">
                        <n-icon :component="SpeedometerOutline" color="#18a058" />
                        <span>基础位移与重力 (Basic Motion)</span>
                    </n-space>
                </template>
                <div class="section-content">
                    <n-grid :cols="3" :x-gap="12" :y-gap="12">
                        <n-gi v-for="meta in BULLET_MOTION_METAS" :key="meta.key">
                            <MetaFormItem :meta="meta" v-model:modelValue="bullet" :show-label="true" />
                        </n-gi>
                    </n-grid>
                </div>
            </n-collapse-item>

            <!-- 特殊运动 -->
            <n-collapse-item name="advanced" class="premium-collapse-item">
                <template #header>
                    <n-space align="center" :size="8">
                        <n-icon :component="SyncOutline" color="#70c0e8" />
                        <span>特殊运动与缩放 (Advanced & Trace)</span>
                    </n-space>
                </template>
                <div class="section-content">
                    <n-grid :cols="3" :x-gap="12" :y-gap="12">
                        <!-- 反弹设置 -->
                        <n-gi v-for="meta in BULLET_BOUNCE_METAS" :key="meta.key">
                            <MetaFormItem :meta="meta" v-model:modelValue="bullet" :show-label="true" />
                        </n-gi>

                        <!-- 追踪设置 -->
                        <n-gi v-for="meta in BULLET_FOLLOW_METAS" :key="meta.key">
                            <MetaFormItem :meta="meta" v-model:modelValue="bullet" :show-label="true" />
                        </n-gi>
                    </n-grid>
                </div>
            </n-collapse-item>
        </n-collapse>
    </div>
</template>

<script setup lang="ts">
import { SpeedometerOutline, SyncOutline } from '@vicons/ionicons5';
import { useBulletState } from '../hooks/useBulletState';
import {
    BULLET_MOTION_METAS,
    BULLET_BOUNCE_METAS,
    BULLET_FOLLOW_METAS
} from '../config';
import MetaFormItem from '../../../components/MetaFormItem.vue';

const { selectedBullet: bullet } = useBulletState();
</script>

<style scoped>
.motion-section {
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
    border-color: rgba(24, 160, 88, 0.3) !important;
    background: rgba(24, 160, 88, 0.03) !important;
}
</style>
