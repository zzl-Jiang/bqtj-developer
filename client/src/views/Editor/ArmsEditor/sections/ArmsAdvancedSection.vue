<template>
    <div v-if="arms" class="arms-advanced-section">
        <n-collapse :default-expanded-names="['mode', 'evolution']" arrow-placement="right">
            <!-- 特殊模式 (蓄力与记录) -->
            <n-collapse-item name="mode" class="premium-collapse-item">
                <template #header>
                    <n-space align="center" :size="8">
                        <n-icon :component="ExtensionPuzzleOutline" color="#f2c97d" />
                        <span>特殊击发模式 (Crossbow & Record)</span>
                    </n-space>
                </template>
                <div class="section-content">
                    <n-grid cols="1 s:2 m:3" :x-gap="12" :y-gap="12" responsive="screen">
                        <n-gi v-for="meta in ARMS_ADVANCED_METAS.slice(0, 5)" :key="meta.key">
                            <MetaFormItem :meta="meta" v-model:modelValue="arms" :show-label="true" />
                        </n-gi>
                    </n-grid>
                </div>
            </n-collapse-item>

            <!-- 进化与合成 -->
            <n-collapse-item name="evolution" class="premium-collapse-item">
                <template #header>
                    <n-space align="center" :size="8">
                        <n-icon :component="FlashOutline" color="#18a058" />
                        <span>进化、合成与等级 (Evolution & Compose)</span>
                    </n-space>
                </template>
                <div class="section-content">
                    <n-grid cols="1 s:2 m:3" :x-gap="12" :y-gap="12" responsive="screen">
                        <n-gi v-for="meta in ARMS_ADVANCED_METAS.slice(5)" :key="meta.key">
                            <MetaFormItem :meta="meta" v-model:modelValue="arms" :show-label="true" />
                        </n-gi>
                    </n-grid>
                </div>
            </n-collapse-item>
        </n-collapse>
    </div>
</template>

<script setup lang="ts">
import { ExtensionPuzzleOutline, FlashOutline } from '@vicons/ionicons5';
import { useArmsState } from '../hooks/useArmsState';
import { ARMS_ADVANCED_METAS } from '../config';
import MetaFormItem from '../../../components/MetaFormItem.vue';

const { selectedArms: arms } = useArmsState();
</script>

<style scoped>
.arms-advanced-section {
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
