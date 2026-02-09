<!-- client/src/views/Editor/PngEditor/sections/PngBasicSection.vue -->
<template>
    <div v-if="selectedPng">
        <n-form label-placement="top" :model="selectedPng">
            <n-grid :cols="2" :x-gap="12">
                <n-gi v-for="meta in PNG_UI_META" :key="meta.key">
                    <MetaFormItem :meta="meta" :show-label="true" v-model:modelValue="selectedPng[meta.key]" />
                </n-gi>
            </n-grid>
        </n-form>
    </div>
</template>

<script setup lang="ts">
import { inject } from 'vue';
import type { ComputedRef } from 'vue';
import { PNG_UI_META } from '../config/pngMeta';
import { PngDefine } from '../../../../models/png/PngDefine';
import MetaFormItem from '../../../components/MetaFormItem.vue';

const selectedPng = inject<ComputedRef<PngDefine | null>>('selectedPng');
</script>
