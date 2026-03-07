<!-- client/src/views/Editor/BulletEditor/sections/BulletBasicSection.vue -->
<template>
    <div v-if="bullet" class="basic-section">
        <n-collapse :default-expanded-names="['identity', 'visual']" arrow-placement="right">
            <!-- 身份与基础 -->
            <n-collapse-item name="identity" class="premium-collapse-item">
                <template #header>
                    <n-space align="center" :size="8">
                        <n-icon :component="FingerPrintOutline" color="var(--primary-color)" />
                        <span>身份与标识 (Identity)</span>
                    </n-space>
                </template>
                <div class="section-content">
                    <n-grid cols="1 s:2 m:3" :x-gap="12" :y-gap="12" responsive="screen">
                        <n-gi v-for="meta in BULLET_BASIC_METAS" :key="meta.key">
                            <MetaFormItem :meta="meta" v-model:modelValue="bullet[meta.key]" :show-label="true" />
                        </n-gi>
                    </n-grid>
                </div>
            </n-collapse-item>

            <!-- 视觉资源 -->
            <n-collapse-item name="visual" class="premium-collapse-item">
                <template #header>
                    <n-space align="center" :size="8">
                        <n-icon :component="ImageOutline" color="#70c0e8" />
                        <span>视觉资源 (Visual)</span>
                    </n-space>
                </template>
                <div class="section-content">
                    <n-grid cols="1 m:2" :x-gap="12" :y-gap="12" responsive="screen">
                        <n-gi v-for="meta in BULLET_VISUAL_METAS" :key="meta.key">
                            <div class="meta-label">{{ meta.label }}</div>
                            <n-input :value="getNestedValue(meta.key)"
                                @update:value="(v: any) => setNestedValue(meta.key, v)" placeholder="请输入资源路径..." />
                        </n-gi>
                    </n-grid>
                </div>
            </n-collapse-item>
        </n-collapse>
    </div>
</template>

<script setup lang="ts">
import { FingerPrintOutline, ImageOutline } from '@vicons/ionicons5';
import { useBulletState } from '../hooks/useBulletState';
import { BULLET_BASIC_METAS, BULLET_VISUAL_METAS } from '../config';
import MetaFormItem from '../../../components/MetaFormItem.vue';

const { selectedBullet: bullet } = useBulletState();

const getNestedValue = (key: string) => {
    if (!bullet.value) return '';
    const parts = key.split('.');
    let val: any = bullet.value;
    for (const part of parts) {
        val = val?.[part];
    }
    return val;
};

const setNestedValue = (key: string, value: any) => {
    if (!bullet.value) return;
    const parts = key.split('.');
    let obj: any = bullet.value;
    for (let i = 0; i < parts.length - 1; i++) {
        const part = parts[i];
        if (part !== undefined) {
            if (!obj[part]) {
                obj[part] = {};
            }
            obj = obj[part];
        }
    }
    const lastPart = parts[parts.length - 1];
    if (lastPart !== undefined && obj) {
        obj[lastPart] = value;
    }
};
</script>

<style scoped>
.basic-section {
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
