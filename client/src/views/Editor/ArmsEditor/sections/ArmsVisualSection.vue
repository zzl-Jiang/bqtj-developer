<template>
    <div v-if="arms" class="arms-visual-section">
        <n-collapse :default-expanded-names="['resources', 'vfx']" arrow-placement="right">
            <!-- 资源路径 -->
            <n-collapse-item name="resources" class="premium-collapse-item">
                <template #header>
                    <n-space align="center" :size="8">
                        <n-icon :component="ImageOutline" color="#18a058" />
                        <span>资源路径与标识 (Resources)</span>
                    </n-space>
                </template>
                <div class="section-content">
                    <n-grid cols="1 m:2" :x-gap="12" :y-gap="12" responsive="screen">
                        <n-gi v-for="meta in ARMS_VISUAL_METAS.slice(0, 2)" :key="meta.key">
                            <MetaFormItem :meta="meta" v-model:modelValue="arms" :show-label="true" />
                        </n-gi>
                    </n-grid>
                </div>
            </n-collapse-item>

            <!-- 特效与音效 -->
            <n-collapse-item name="vfx" class="premium-collapse-item">
                <template #header>
                    <n-space align="center" :size="8">
                        <n-icon :component="ColorWandOutline" color="#70c0e8" />
                        <span>视觉特效与音效 (VFX & Audio)</span>
                    </n-space>
                </template>
                <div class="section-content">
                    <n-grid cols="1 m:2" :x-gap="12" :y-gap="12" responsive="screen">
                        <n-gi v-for="meta in ARMS_VISUAL_METAS.slice(2)" :key="meta.key">
                            <MetaFormItem :meta="meta" v-model:modelValue="arms" :show-label="true" />
                        </n-gi>
                    </n-grid>
                </div>
            </n-collapse-item>
        </n-collapse>
    </div>
</template>

<script setup lang="ts">
import { ImageOutline, ColorWandOutline } from '@vicons/ionicons5';
import { useArmsState } from '../hooks/useArmsState';
import { ARMS_VISUAL_METAS } from '../config';
import MetaFormItem from '../../../components/MetaFormItem.vue';

const { selectedArms: arms } = useArmsState();
</script>

<style scoped>
.arms-visual-section {
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
    border-color: rgba(24, 160, 88, 0.3) !important;
    background: rgba(24, 160, 88, 0.03) !important;
}
</style>
