<!-- client/src/views/Editor/BulletEditor/sections/BulletCombatSection.vue -->
<template>
    <div v-if="bullet" class="combat-section">
        <n-collapse :default-expanded-names="['hurt', 'crit']" arrow-placement="right">
            <!-- 基础伤害 -->
            <n-collapse-item name="hurt" class="premium-collapse-item">
                <template #header>
                    <n-space align="center" :size="8">
                        <n-icon :component="FlashOutline" color="#e88080" />
                        <span>伤害设定 (Hurt)</span>
                    </n-space>
                </template>
                <div class="section-content">
                    <n-grid cols="1 s:2 m:3" :x-gap="12" :y-gap="12" responsive="screen">
                        <n-gi v-for="meta in BULLET_HURT_METAS" :key="meta.key">
                            <MetaFormItem :meta="meta" v-model:modelValue="bullet[meta.key]" :show-label="true" />
                        </n-gi>
                    </n-grid>
                </div>
            </n-collapse-item>

            <!-- 暴击设定 -->
            <n-collapse-item name="crit" class="premium-collapse-item">
                <template #header>
                    <n-space align="center" :size="8">
                        <n-icon :component="FlameOutline" color="#f2c97d" />
                        <span>暴击与击退 (Crit & Physics Kick)</span>
                    </n-space>
                </template>
                <div class="section-content">
                    <n-grid cols="1 s:2 m:3" :x-gap="12" :y-gap="12" responsive="screen">
                        <n-gi>
                            <div class="meta-label">暴击系数 (critD.mul)</div>
                            <n-input-number v-model:value="bullet.critD!.mul" :precision="2" placeholder="默认 1.5" />
                        </n-gi>
                        <n-gi>
                            <div class="meta-label">击退力 (beatBack)</div>
                            <n-input-number v-model:value="bullet.beatBack" placeholder="请输入..." />
                        </n-gi>
                        <n-gi>
                            <div class="meta-label">击中震动 (targetShakeValue)</div>
                            <n-input-number v-model:value="bullet.targetShakeValue" placeholder="请输入..." />
                        </n-gi>
                    </n-grid>
                </div>
            </n-collapse-item>
        </n-collapse>
    </div>
</template>

<script setup lang="ts">
import { FlashOutline, FlameOutline } from '@vicons/ionicons5';
import { useBulletState } from '../hooks/useBulletState';
import { BULLET_HURT_METAS } from '../config';
import MetaFormItem from '../../../components/MetaFormItem.vue';

const { selectedBullet: bullet } = useBulletState();
</script>

<style scoped>
.combat-section {
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
    border-color: rgba(232, 128, 128, 0.3) !important;
    background: rgba(232, 128, 128, 0.03) !important;
}
</style>
