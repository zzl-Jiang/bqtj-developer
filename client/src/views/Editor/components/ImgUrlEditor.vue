<!-- client/src/views/Editor/components/ImgUrlEditor.vue -->
<template>
  <n-form label-placement="left" label-width="80" size="small">
    <n-grid :cols="2" :x-gap="12">
      <n-gi :span="2">
        <n-form-item label="资源路径">
          <n-input v-model:value="data.url" placeholder="effects/..." />
        </n-form-item>
      </n-gi>
      <n-gi>
        <n-form-item label="音效路径">
          <n-input v-model:value="data.soundUrl" />
        </n-form-item>
      </n-gi>
      <n-gi>
        <n-form-item label="音量">
          <n-input-number v-model:value="data.soundVolume" :step="0.1" />
        </n-form-item>
      </n-gi>
      <n-gi>
        <n-form-item label="震动">
          <n-input v-model:value="data.shake" placeholder="type:small..." />
        </n-form-item>
      </n-gi>
      <n-gi>
        <n-form-item label="混合模式">
          <n-input v-model:value="data.con" placeholder="add / filter" />
        </n-form-item>
      </n-gi>
      <n-gi>
        <n-form-item label="底层显示">
          <n-switch v-model:value="data.bottomLayerB" />
        </n-form-item>
      </n-gi>
    </n-grid>
  </n-form>
</template>

<script setup lang="ts">
const props = defineProps<{ data: any }>();
</script>