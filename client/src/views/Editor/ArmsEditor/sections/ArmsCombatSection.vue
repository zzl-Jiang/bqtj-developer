<template>
    <div v-if="arms" class="arms-combat-section">
        <n-collapse :default-expanded-names="['power', 'reload']" arrow-placement="right">
            <!-- 威力与规模 -->
            <n-collapse-item name="power" class="premium-collapse-item">
                <template #header>
                    <n-space align="center" :size="8">
                        <n-icon :component="FlashOutline" color="#f2c97d" />
                        <span>威力与弹药规模 (Power & Capacity)</span>
                    </n-space>
                </template>
                <div class="section-content">
                    <n-grid :cols="3" :x-gap="12" :y-gap="12">
                        <n-gi v-for="meta in ARMS_COMBAT_METAS" :key="meta.key">
                            <MetaFormItem :meta="meta" v-model:modelValue="arms" :show-label="true" />
                        </n-gi>
                    </n-grid>
                </div>
            </n-collapse-item>

            <!-- 频率与手感 -->
            <n-collapse-item name="reload" class="premium-collapse-item">
                <template #header>
                    <n-space align="center" :size="8">
                        <n-icon :component="ReloadOutline" color="#70c0e8" />
                        <span>射击手感与频率 (Fire Rate & Handling)</span>
                    </n-space>
                </template>
                <div class="section-content">
                    <n-grid :cols="3" :x-gap="12" :y-gap="12">
                        <n-gi v-for="meta in ARMS_COMBAT_METAS.slice(6)" :key="meta.key">
                            <MetaFormItem :meta="meta" v-model:modelValue="arms" :show-label="true" />
                        </n-gi>
                    </n-grid>
                </div>
            </n-collapse-item>
        </n-collapse>
    </div>
</template>

<script setup lang="ts">
import { FlashOutline, ReloadOutline } from '@vicons/ionicons5';
import { useArmsState } from '../hooks/useArmsState';
import { ARMS_COMBAT_METAS } from '../config';
import MetaFormItem from '../../../components/MetaFormItem.vue';

const { selectedArms: arms } = useArmsState();
</script>

<style scoped>
.arms-combat-section {
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
