<!-- client/src/views/Editor/components/ImgUrlEditor.vue -->
<template>
  <n-form label-placement="left" label-width="80" size="small">
    <n-grid :cols="2" :x-gap="12">
      <n-gi :span="2">
        <n-form-item label="资源路径">
          <n-input
            v-model:value="data.url"
            placeholder="请输入。实际属性比较复杂，门槛高、较难调用，这里暂时只列出了常用属性。"
          />
        </n-form-item>
      </n-gi>
      <n-gi>
        <n-form-item label="影响部位">
          <n-select
            v-model:value="data.partType"
            multiple
            filterable
            :options="data.partTypeOpt"
            placeholder="请选择 (支持多项)"
          />
        </n-form-item>
      </n-gi>
      <n-gi>
        <n-form-item label="动画帧数">
          <n-input-number
            v-model:value="data.raNum"
            :step="1"
            placeholder="请输入数量"
          />
        </n-form-item>
      </n-gi>
      <n-gi>
        <n-form-item label="音效路径">
          <n-input
            v-model:value="data.soundUrl"
            placeholder="请输入"
          />
        </n-form-item>
      </n-gi>
      <n-gi>
        <n-form-item label="音量">
          <n-input-number
            v-model:value="data.soundVolume"
            :step="0.1"
            placeholder="请输入数量"
          />
        </n-form-item>
      </n-gi>
      <n-gi>
        <n-form-item label="跟随部位">
          <n-switch
            v-model:value="data.followPartRaB"
          />
        </n-form-item>
      </n-gi>
      <n-gi>
        <n-form-item label="混合模式">
          <n-select
            v-model:value="data.con"
            :options="data.conOpt"
            placeholder="请选择"
          />
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