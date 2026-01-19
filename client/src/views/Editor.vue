<template>
  <n-layout has-sider style="height: 100vh;">
    <n-layout-sider
      bordered
      collapse-mode="width"
      :collapsed-width="64"
      :width="200"
      show-trigger="arrow-circle"
    >
      <n-menu
        v-model:value="activeModule"
        :options="menuOptions"
      />
    </n-layout-sider>

    <n-layout-content content-style="padding: 0;">
      <!-- 使用 keep-alive 可以在切换模块时保留编辑状态 -->
      <keep-alive>
        <component :is="currentModuleComponent" />
      </keep-alive>
    </n-layout-content>
  </n-layout>
</template>

<script setup lang="ts">
import { ref, computed, h } from 'vue';
import { useModStore } from '../store/useModStore';
import SummaryModule from './Editor/SummaryModule.vue';
import PngModule from './Editor/PngModule.vue';
import SkillEditor from './Editor/SkillEditor/index.vue';
import GenericModule from './Editor/GenericModule.vue';

const modStore = useModStore();
const activeModule = ref('summary');

const menuOptions = [
  { label: '显示汇总', key: 'summary' },
  { label: '资源模块 (PNG)', key: 'png' },
  { label: '技能模块', key: 'skill' },
  { key: 'divider', type: 'divider' },
  { label: '关卡设计', key: 'level' },
  { label: '单位定义', key: 'body' },
  { label: '子弹效果', key: 'bullet' },
  { label: '武器定义', key: 'arms' },
  { label: '剧情对话', key: 'say' },
];

// 使用渲染函数或包裹组件来复用 GenericModule
const currentModuleComponent = computed(() => {
  switch (activeModule.value) {
    case 'summary': return SummaryModule;
    case 'png': return PngModule;
    case 'skill': return SkillEditor;
    
    // 以下五个模块共用 GenericModule，但传入不同的 Props 和 Actions
    case 'level': 
      return h(GenericModule, { 
        title: '关卡', 
        dataList: modStore.levelList,
        onAdd: () => modStore.addLevel(),
        onRemove: (i: number) => modStore.removeLevel(i)
      });
    case 'body':
      return h(GenericModule, { 
        title: '单位', 
        dataList: modStore.bodyList,
        onAdd: () => modStore.addBody(),
        onRemove: (i: number) => modStore.removeBody(i)
      });
    case 'bullet':
      return h(GenericModule, { 
        title: '子弹', 
        dataList: modStore.bulletList,
        onAdd: () => modStore.addBullet(),
        onRemove: (i: number) => modStore.removeBullet(i)
      });
    case 'arms':
      return h(GenericModule, { 
        title: '武器', 
        dataList: modStore.armsList,
        onAdd: () => modStore.addArms(),
        onRemove: (i: number) => modStore.removeArms(i)
      });
    case 'say':
      return h(GenericModule, { 
        title: '对话', 
        dataList: modStore.sayList,
        onAdd: () => modStore.addSay(),
        onRemove: (i: number) => modStore.removeSay(i)
      });

    default: return SummaryModule;
  }
});
</script>