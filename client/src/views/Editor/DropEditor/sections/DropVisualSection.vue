<template>
    <div v-if="drop" class="drop-visual-section">
        <n-collapse :default-expanded-names="['visual']" arrow-placement="right">
            <n-collapse-item name="visual" class="premium-collapse-item">
                <template #header>
                    <n-space align="center" :size="8">
                        <n-icon :component="ImageOutline" color="#70c0e8" />
                        <span>资源预览与特效 (Visual & VFX)</span>
                    </n-space>
                </template>
                <div class="section-content">
                    <n-grid cols="1 m:2" :x-gap="12" :y-gap="12" responsive="screen">
                        <n-gi v-for="meta in DROP_VISUAL_METAS" :key="meta.key">
                            <MetaFormItem :meta="meta" v-model:modelValue="drop" :show-label="true" />
                        </n-gi>
                    </n-grid>
                </div>
            </n-collapse-item>
        </n-collapse>
    </div>
</template>

<script setup lang="ts">
import { ImageOutline } from '@vicons/ionicons5';
import { useDropState } from '../hooks/useDropState';
import { DROP_VISUAL_METAS } from '../config';
import MetaFormItem from '../../../components/MetaFormItem.vue';

const { selectedDrop: drop } = useDropState();
</script>

<style scoped>
.drop-visual-section {
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
    border-color: rgba(112, 192, 232, 0.3) !important;
    background: rgba(112, 192, 232, 0.03) !important;
}
</style>
