<template>
    <div class="editor-mode-switch">
        <n-radio-group v-model:value="mode" size="small" class="mode-radio-group">
            <n-radio-button value="pro" class="mode-radio-button">
                <span class="mode-icon">⚡</span>
                <span class="mode-label">专业模式</span>
            </n-radio-button>
            <n-radio-button value="wizard" class="mode-radio-button">
                <span class="mode-icon">🧭</span>
                <span class="mode-label">向导模式</span>
            </n-radio-button>
        </n-radio-group>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { NRadioGroup, NRadioButton } from 'naive-ui';

type EditorMode = 'pro' | 'wizard';

const props = defineProps<{
    modelValue: EditorMode;
}>();

const emit = defineEmits<{
    'update:modelValue': [value: EditorMode];
}>();

const mode = computed({
    get: () => props.modelValue,
    set: (val) => emit('update:modelValue', val)
});
</script>

<style scoped>
.editor-mode-switch {
    display: flex;
    justify-content: center;
    padding: 12px 16px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    background: rgba(255, 255, 255, 0.01);
}

.mode-radio-group {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
    padding: 4px;
}

.mode-radio-button {
    display: flex;
    align-items: center;
    gap: 6px;
}

.mode-icon {
    font-size: 14px;
}

.mode-label {
    font-size: 13px;
    font-weight: 500;
}

:deep(.n-radio-button) {
    border-radius: 6px !important;
    transition: all 0.3s ease;
    border: none !important;
    background: transparent !important;
}

:deep(.n-radio-button--checked) {
    background: rgba(24, 160, 88, 0.2) !important;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2) !important;
}

:deep(.n-radio-button__label) {
    padding: 6px 16px !important;
}
</style>
