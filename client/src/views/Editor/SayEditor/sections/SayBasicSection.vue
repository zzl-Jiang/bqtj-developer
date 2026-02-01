<!-- client/src/views/Editor/SayEditor/sections/SayBasicSection.vue -->
<template>
  <n-form v-if="sayList" :label-width="100">
    <n-card title="对话组全局定义" size="small">
      <n-grid :cols="3" :x-gap="12">
        <!-- 使用 v-for 循环渲染，方便扩展 -->
        <n-gi v-for="meta in dynamicMetas" :key="meta.key">
          <!-- 添加 :id 适配跳转功能 -->
          <div :id="`sayBasic-${meta.key}`">
            <MetaFormItem 
              :meta="meta" 
              v-model:modelValue="sayList[meta.key]" 
              :show-label="true"
            />
          </div>
        </n-gi>
      </n-grid>
    </n-card>
  </n-form>
</template>

<script setup lang="ts">
import { useSayState } from '../hooks/useSayState';
import { SAY_LIST_METAS } from '../config';
import MetaFormItem from '../../../components/MetaFormItem.vue';
import { useSectionNavigator } from '../../../../hooks/useSectionNavigator';
import { computed } from 'vue';
import { useModStore } from '../../../../store/useModStore';

const { selectedSayList: sayList } = useSayState();
const modStore = useModStore();

/**
 * 动态生成 Meta 配置
 */
const dynamicMetas = computed(() => {
  return SAY_LIST_METAS.map(meta => {
    // 找到 levelName 这一项
    if (meta.key === 'levelName') {
      return {
        ...meta,
        // 将 store 里的关卡列表映射为 Select 选项
        options: modStore.levelList.map(lvl => ({
          label: `${lvl.name} (${lvl.cnName || '未命名'})`,
          value: lvl.name || undefined
        }))
      };
    }
    return meta;
  });
});

// 注册跳转监听，允许从全局诊断直接定位到 basic 页签下的具体字段
useSectionNavigator({
  module: 'say',
  tab: 'basic',
  list: () => sayList.value ? [sayList.value] : [],
  onFound: (item) => {
    // subId 对应 meta.key
    const fieldKey = item.navigationRequest.subId;
    if (fieldKey) {
      const el = document.getElementById(`sayBasic-${fieldKey}`);
      if (el) {
        el.style.transition = 'all 0.5s';
        el.style.backgroundColor = 'rgba(24, 160, 88, 0.2)'; 
        setTimeout(() => el.style.backgroundColor = 'transparent', 2000);
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }
});
</script>