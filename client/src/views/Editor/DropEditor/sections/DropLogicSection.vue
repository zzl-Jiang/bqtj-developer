<template>
    <div v-if="drop" class="drop-logic-section">
        <n-collapse :default-expanded-names="['logic']" arrow-placement="right">
            <n-collapse-item name="logic" class="premium-collapse-item">
                <template #header>
                    <n-space align="center" :size="8">
                        <n-icon :component="ExtensionPuzzleOutline" color="#f2c97d" />
                        <span>逻辑行为与生命周期 (Logic)</span>
                    </n-space>
                </template>
                <div class="section-content">
                    <n-grid :cols="2" :x-gap="12" :y-gap="12">
                        <n-gi v-for="meta in DROP_LOGIC_METAS" :key="meta.key">
                            <MetaFormItem :meta="meta" v-model:modelValue="drop" :show-label="true" />
                        </n-gi>
                    </n-grid>
                </div>
            </n-collapse-item>

            <n-collapse-item name="probability" class="premium-collapse-item">
                <template #header>
                    <n-space align="center" :size="8">
                        <n-icon :component="BarChartOutline" color="#63e2b7" />
                        <span>掉落概率设置 (Probability)</span>
                    </n-space>
                </template>
                <div class="section-content">
                    <n-grid :cols="2" :x-gap="12" :y-gap="12">
                        <n-gi v-for="meta in DROP_PROBABILITY_METAS" :key="meta.key">
                            <MetaFormItem :meta="meta" v-model:modelValue="drop" :show-label="true" />
                        </n-gi>
                    </n-grid>
                </div>
            </n-collapse-item>
        </n-collapse>
    </div>
</template>

<script setup lang="ts">
import { ExtensionPuzzleOutline, BarChartOutline } from '@vicons/ionicons5';
import { useDropState } from '../hooks/useDropState';
import { DROP_LOGIC_METAS, DROP_PROBABILITY_METAS } from '../config';
import MetaFormItem from '../../../components/MetaFormItem.vue';

const { selectedDrop: drop } = useDropState();
</script>

<style scoped>
.drop-logic-section {
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
    border-color: rgba(242, 201, 125, 0.3) !important;
    background: rgba(242, 201, 125, 0.03) !important;
}
</style>
