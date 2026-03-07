<template>
    <div
        class="field-card"
        :class="{
            'is-filled': hasValue,
            'is-core': meta.importance === 'core',
            'is-advanced': meta.importance === 'advanced',
            'is-optional': meta.importance === 'optional'
        }"
        @click="$emit('click')"
    >
        <!-- 左侧：图标和标签 -->
        <div class="field-main">
            <div class="field-icon" :style="{ color: iconColor }">
                <n-icon :component="getIcon()" :size="18" />
            </div>

            <div class="field-info">
                <div class="field-header">
                    <span class="field-label">{{ meta.label }}</span>

                    <!-- 重要性标签 -->
                    <n-tag
                        v-if="meta.importance"
                        :type="importanceType"
                        size="tiny"
                        class="importance-tag"
                    >
                        {{ importanceText }}
                    </n-tag>
                </div>

                <!-- 值预览 -->
                <div class="field-value-wrapper">
                    <template v-if="meta.isComplex">
                        <span class="field-complex-hint">{{ meta.complexDesc || '点击配置' }}</span>
                    </template>
                    <template v-else-if="hasValue">
                        <span class="field-value" :title="displayValue">
                            {{ displayValue }}
                        </span>
                    </template>
                    <template v-else>
                        <span class="field-empty">未配置</span>
                    </template>
                </div>
            </div>
        </div>

        <!-- 右侧：编辑按钮 -->
        <div class="field-actions">
            <n-button
                quaternary
                circle
                size="small"
                @click.stop="$emit('edit')"
            >
                <template #icon>
                    <n-icon :component="getEditIcon" />
                </template>
            </n-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { NIcon, NTag, NButton } from 'naive-ui';
import {
    CreateOutline,
    AddOutline,
    SettingsOutline,
    FlashOutline,
    HeartOutline,
    ShieldCheckmarkOutline,
    ImageOutline,
    ListOutline,
    ToggleOutline,
    ColorWandOutline,
    SpeedometerOutline,
    RocketOutline
} from '@vicons/ionicons5';
import type { BulletMetaItem } from '../../Editor/BulletEditor/config/types';
import type { ImportanceLevel } from '../../Editor/config/sharedTypes';

const props = defineProps<{
    meta: BulletMetaItem;
    value: any;
}>();

defineEmits<{
    click: [];
    edit: [];
}>();

const getIcon = () => {
    const label = props.meta.label.toLowerCase();

    if (label.includes('血') || label.includes('生命')) return HeartOutline;
    if (label.includes('攻') || label.includes('伤害') || label.includes('威力')) return FlashOutline;
    if (label.includes('防')) return ShieldCheckmarkOutline;
    if (label.includes('图') || label.includes('画')) return ImageOutline;
    if (label.includes('速') || label.includes('射')) return SpeedometerOutline;
    if (label.includes('弹') || label.includes('弹夹')) return RocketOutline;
    if (props.meta.type === 'select' || props.meta.type === 'multi_select') return ListOutline;
    if (props.meta.type === 'switch') return ToggleOutline;
    if (props.meta.type === 'number') return SettingsOutline;

    return ColorWandOutline;
};

const iconColor = computed(() => {
    const label = props.meta.label.toLowerCase();

    if (label.includes('血') || label.includes('生命')) return '#e88080';
    if (label.includes('攻') || label.includes('伤害')) return '#f2c97d';
    if (label.includes('防')) return '#70c0e8';
    if (label.includes('速')) return '#63e2b7';

    return 'rgba(255, 255, 255, 0.5)';
});

// 重要性标签
const importanceType = computed(() => {
    const map: Record<ImportanceLevel, any> = {
        core: 'error',
        advanced: 'info',
        optional: 'default'
    };
    return map[props.meta.importance!] || 'default';
});

const importanceText = computed(() => {
    const map: Record<ImportanceLevel, string> = {
        core: '必填',
        advanced: '推荐',
        optional: '可选'
    };
    return map[props.meta.importance!] || '';
});

// 是否有值
const hasValue = computed(() => {
    return props.value !== undefined && props.value !== null && props.value !== '';
});

// 编辑按钮图标
const getEditIcon = computed(() => {
    if (props.meta.isComplex) {
        return SettingsOutline;
    }
    return hasValue.value ? CreateOutline : AddOutline;
});

// 显示值
const displayValue = computed(() => {
    if (!hasValue.value) return '';

    const val = props.value;

    if (typeof val === 'boolean') {
        return val ? '开启' : '关闭';
    }

    if (Array.isArray(val)) {
        return `${val.length} 项`;
    }

    if (typeof val === 'object') {
        return '已配置';
    }

    const str = String(val);
    if (str.length > 15) {
        return str.slice(0, 15) + '...';
    }

    return str;
});
</script>

<style scoped>
.field-card {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    padding: 8px 12px;
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.04);
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.25s ease;
}

.field-card:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.1);
    transform: translateX(4px);
}

.field-card.is-filled {
    border-color: rgba(24, 160, 88, 0.15);
    background: rgba(24, 160, 88, 0.03);
}

.field-card.is-core {
    border-left: 2px solid #e88080;
}

.field-card.is-advanced {
    border-left: 2px solid #70c0e8;
}

.field-main {
    display: flex;
    align-items: center;
    gap: 12px;
    flex: 1;
    min-width: 0;
}

.field-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    background: rgba(255, 255, 255, 0.03);
    border-radius: 6px;
    flex-shrink: 0;
}

.field-info {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.field-header {
    display: flex;
    align-items: center;
    gap: 8px;
}

.field-label {
    font-size: 12px;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.85);
}

.importance-tag {
    font-size: 10px;
    padding: 0 6px;
    height: 18px;
}

.field-value-wrapper {
    font-size: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.field-value {
    color: rgba(24, 160, 88, 0.8);
    font-weight: 500;
}

.field-empty {
    color: rgba(255, 255, 255, 0.3);
    font-style: italic;
}

.field-complex-hint {
    color: #63e2b7;
    font-size: 11px;
}

.field-actions {
    opacity: 0;
    transition: opacity 0.2s ease;
}

.field-card:hover .field-actions {
    opacity: 1;
}
</style>
