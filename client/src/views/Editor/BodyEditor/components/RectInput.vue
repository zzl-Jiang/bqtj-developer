<!-- client/src/views/Editor/BodyEditor/components/RectInput.vue -->
<template>
    <div class="rect-input">
        <n-input-group size="small">
            <n-input-group-label>X</n-input-group-label>
            <n-input-number v-model:value="modelValue.x" :show-button="false" placeholder="X" />
            <n-input-group-label>Y</n-input-group-label>
            <n-input-number v-model:value="modelValue.y" :show-button="false" placeholder="Y" />
        </n-input-group>
        <n-input-group size="small" style="margin-top: 4px;">
            <n-input-group-label>W</n-input-group-label>
            <n-input-number v-model:value="modelValue.width" :min="0" :show-button="false" placeholder="W" />
            <n-input-group-label>H</n-input-group-label>
            <n-input-number v-model:value="modelValue.height" :min="0" :show-button="false" placeholder="H" />
        </n-input-group>
    </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import type { IO_Rectangle } from '../../../../models/common/IO_Rectangle';


defineProps({
    modelValue: {
        type: Object as PropType<IO_Rectangle>,
        required: true,
        default: () => ({ x: 0, y: 0, width: 0, height: 0 })
    }
});

defineEmits(['update:modelValue']);
</script>

<style scoped>
.rect-input {
    display: flex;
    flex-direction: column;
}
</style>
