<template>
    <div v-if="arms" class="arms-resource-section">
        <n-collapse :default-expanded-names="['ranges']" arrow-placement="right">
            <!-- 随机生成范围 -->
            <n-collapse-item name="ranges" class="premium-collapse-item">
                <template #header>
                    <n-space align="center" :size="8">
                        <n-icon :component="SyncOutline" color="#18a058" />
                        <span>资源/零件范围 (Resource Ranges)</span>
                    </n-space>
                </template>
                <div class="section-content">
                    <n-alert type="info" class="mb-4" :show-icon="false">
                        这些设置主要用于“随机武器”生成逻辑，定义了各个部件可供随机选择的路径。
                    </n-alert>
                    <n-grid cols="1 m:2" :x-gap="12" :y-gap="12" responsive="screen">
                        <n-gi v-for="meta in ARMS_RESOURCE_RANGE_METAS" :key="meta.key">
                            <MetaFormItem :meta="meta" v-model:modelValue="arms" :show-label="true" />
                        </n-gi>
                    </n-grid>
                </div>
            </n-collapse-item>
        </n-collapse>
    </div>
</template>

<script setup lang="ts">
import { SyncOutline } from '@vicons/ionicons5';
import { useArmsState } from '../hooks/useArmsState';
import { ARMS_RESOURCE_RANGE_METAS } from '../config';
import MetaFormItem from '../../../components/MetaFormItem.vue';

const { selectedArms: arms } = useArmsState();
</script>

<style scoped>
.arms-resource-section {
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
