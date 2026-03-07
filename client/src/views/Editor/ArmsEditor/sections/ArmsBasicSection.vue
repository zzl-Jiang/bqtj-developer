<template>
    <div v-if="arms" class="arms-basic-section">
        <n-collapse :default-expanded-names="['identity', 'info']" arrow-placement="right">
            <!-- 标识与核心 -->
            <n-collapse-item name="identity" class="premium-collapse-item">
                <template #header>
                    <n-space align="center" :size="8">
                        <n-icon :component="FingerPrintOutline" color="#18a058" />
                        <span>核心标识与分级 (Identity & Grade)</span>
                    </n-space>
                </template>
                <div class="section-content">
                    <n-grid :cols="3" :x-gap="12" :y-gap="12">
                        <n-gi v-for="meta in ARMS_BASIC_METAS" :key="meta.key">
                            <MetaFormItem :meta="meta" v-model:modelValue="arms" :show-label="true" />
                        </n-gi>
                    </n-grid>
                </div>
            </n-collapse-item>

            <!-- 描述与说明 -->
            <n-collapse-item name="info" class="premium-collapse-item">
                <template #header>
                    <n-space align="center" :size="8">
                        <n-icon :component="InformationCircleOutline" color="#70c0e8" />
                        <span>文本描述与说明 (Description)</span>
                    </n-space>
                </template>
                <div class="section-content">
                    <n-space vertical>
                        <div class="meta-label">获取描述 (description)</div>
                        <n-input type="textarea" v-model:value="arms.description" placeholder="请输入如何获得该武器的描述..." />

                        <div class="meta-label mt-2">特殊说明 (info)</div>
                        <n-input type="textarea" v-model:value="arms.info" placeholder="请输入武器的特殊效果或背景说明..." />
                    </n-space>
                </div>
            </n-collapse-item>
        </n-collapse>
    </div>
</template>

<script setup lang="ts">
import { FingerPrintOutline, InformationCircleOutline } from '@vicons/ionicons5';
import { useArmsState } from '../hooks/useArmsState';
import { ARMS_BASIC_METAS } from '../config';
import MetaFormItem from '../../../components/MetaFormItem.vue';

const { selectedArms: arms } = useArmsState();
</script>

<style scoped>
.arms-basic-section {
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
