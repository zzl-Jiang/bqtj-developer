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
        v-model:value="modStore.activeModule"
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
import { computed, h } from 'vue';
import { useModStore } from '../store/useModStore';
import SummaryModule from './Editor/SummaryModule.vue';
import PngModule from './Editor/PngModule.vue';
import SkillEditor from './Editor/SkillEditor/index.vue';
import LevelEditor from './Editor/LevelEitor/index.vue';
import SayEditor from './Editor/SayEditor/index.vue';
import GenericModule from './Editor/GenericModule.vue';

const modStore = useModStore();

const menuOptions = [
  { label: '显示汇总', key: 'summary' },
  { label: '关卡设计', key: 'level' },
  { label: '技能模块', key: 'skill' },
  { label: '剧情对话', key: 'say' },
  { label: '资源模块 (PNG)', key: 'png' },
  { key: 'divider', type: 'divider' },
  { label: '单位定义', key: 'body' },
  { label: '子弹效果', key: 'bullet' },
  { label: '武器定义', key: 'arms' },
  { label: '效果掉落', key: 'drop' },
];

// 使用渲染函数或包裹组件来复用 GenericModule
const currentModuleComponent = computed(() => {
  switch (modStore.activeModule) {
    case 'summary': return SummaryModule;
    case 'png': return PngModule;
    case 'skill': return SkillEditor;
    case 'level': return LevelEditor;
    case 'say': return SayEditor;
    
    // 以下模块共用 GenericModule，但传入不同的 Props 和 Actions
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
    case 'drop':
      return h(GenericModule, { 
        title: '掉落', 
        dataList: modStore.dropList,
        onAdd: () => modStore.addDrop(),
        onRemove: (i: number) => modStore.removeDrop(i)
      });

    default: return SummaryModule;
  }
});
</script>