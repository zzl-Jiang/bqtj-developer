<template>
    <div
        class="category-card"
        :class="{ 'is-active': isActive, 'is-hovered': isHovered }"
        @click="$emit('click')"
        @mouseenter="isHovered = true"
        @mouseleave="isHovered = false"
    >
        <!-- 图标区域 -->
        <div class="card-icon-wrapper" :style="{ backgroundColor: `${category.iconColor}15` }">
            <n-icon :component="getIcon()" :color="category.iconColor" :size="28" />
        </div>

        <!-- 内容区域 -->
        <div class="card-content">
            <div class="card-header">
                <span class="card-title">{{ category.label }}</span>
                <n-tag
                    v-if="completion === 100"
                    type="success"
                    size="tiny"
                    class="completion-tag"
                >
                    完成
                </n-tag>
            </div>

            <p class="card-desc">{{ category.description }}</p>

            <!-- 完成度进度条 -->
            <div class="progress-wrapper">
                <div class="progress-info">
                    <span class="progress-label">配置进度</span>
                    <span class="progress-value" :style="{ color: completionColor }">
                        {{ completion }}%
                    </span>
                </div>
                <div class="progress-bar">
                    <div
                        class="progress-fill"
                        :style="{
                            width: `${completion}%`,
                            backgroundColor: completionColor
                        }"
                    />
                </div>
            </div>

            <!-- 字段数量 -->
            <div class="field-count">
                <n-icon :component="ListOutline" :size="12" />
                <span>{{ filledFields }}/{{ totalFields }} 个字段</span>
            </div>
        </div>

        <!-- 激活指示器 -->
        <div v-if="isActive" class="active-indicator" :style="{ backgroundColor: category.iconColor }" />
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { NIcon, NTag } from 'naive-ui';
import {
    FlashOutline,
    ImageOutline,
    ListOutline,
    SettingsOutline,
    ShieldOutline,
    SpeedometerOutline,
    RocketOutline,
    ArchiveOutline,
    HeartOutline,
    ColorWandOutline
} from '@vicons/ionicons5';
import type { CategoryConfig } from '../../Editor/BulletEditor/config/types';

const props = defineProps<{
    category: CategoryConfig;
    isActive: boolean;
    completion: number;
    filledFields: number;
    totalFields: number;
}>();

defineEmits<{
    click: [];
}>();

const isHovered = ref(false);

// 图标映射
const iconMap: Record<string, any> = {
    FlashOutline,
    ImageOutline,
    ListOutline,
    SettingsOutline,
    ShieldOutline,
    SpeedometerOutline,
    RocketOutline,
    ArchiveOutline,
    HeartOutline,
    ColorWandOutline
};

const getIcon = () => {
    return iconMap[props.category.icon] || SettingsOutline;
};

// 根据完成度计算颜色
const completionColor = computed(() => {
    if (props.completion === 100) return '#18a058';
    if (props.completion >= 60) return '#f2c97d';
    if (props.completion >= 30) return '#70c0e8';
    return '#666';
});
</script>

<style scoped>
.category-card {
    display: flex;
    gap: 16px;
    padding: 16px;
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
}

.category-card:hover {
    background: rgba(255, 255, 255, 0.04);
    border-color: rgba(255, 255, 255, 0.1);
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.category-card.is-active {
    background: rgba(24, 160, 88, 0.05);
    border-color: rgba(24, 160, 88, 0.3);
}

.card-icon-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 56px;
    height: 56px;
    border-radius: 12px;
    flex-shrink: 0;
    transition: transform 0.3s ease;
}

.category-card:hover .card-icon-wrapper {
    transform: scale(1.05);
}

.card-content {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
}

.card-title {
    font-size: 15px;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.9);
}

.completion-tag {
    font-size: 11px;
}

.card-desc {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.5);
    line-height: 1.5;
    margin: 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.progress-wrapper {
    margin-top: auto;
}

.progress-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 4px;
}

.progress-label {
    font-size: 11px;
    color: rgba(255, 255, 255, 0.4);
}

.progress-value {
    font-size: 12px;
    font-weight: 600;
    transition: color 0.3s ease;
}

.progress-bar {
    height: 4px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 2px;
    overflow: hidden;
}

.progress-fill {
    height: 100%;
    border-radius: 2px;
    transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.3s ease;
}

.field-count {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 11px;
    color: rgba(255, 255, 255, 0.4);
    margin-top: 4px;
}

.active-indicator {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 3px;
    height: 40%;
    border-radius: 0 2px 2px 0;
    opacity: 0.8;
}
</style>
