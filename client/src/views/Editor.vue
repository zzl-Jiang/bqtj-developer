<template>
  <div class="editor-container">
    <DashboardNav />

    <div class="module-content">
      <transition name="module-fade" mode="out-in">
        <keep-alive>
          <component :is="currentModuleComponent" :key="modStore.activeModule" />
        </keep-alive>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, h } from 'vue';
import { useModStore } from '../store/useModStore';
import DashboardNav from './components/DashboardNav.vue';
import SummaryModule from './Editor/SummaryModule.vue';
import PngEditor from './Editor/PngEditor/index.vue';
import SkillEditor from './Editor/SkillEditor/index.vue';
import LevelEditor from './Editor/LevelEditor/index.vue';
import SayEditor from './Editor/SayEditor/index.vue';
import BodyEditor from './Editor/BodyEditor/index.vue';
import GenericModule from './Editor/GenericModule.vue';

const modStore = useModStore();

const currentModuleComponent = computed(() => {
  switch (modStore.activeModule) {
    case 'summary': return SummaryModule;
    case 'png': return PngEditor;
    case 'skill': return SkillEditor;
    case 'level': return LevelEditor;
    case 'body': return BodyEditor;
    case 'say': return SayEditor;

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

<style scoped>
.editor-container {
  min-height: calc(100vh - 120px);
  padding: 20px 0;
}

.module-content {
  position: relative;
  width: 100%;
}

/* 模块切换过渡动画 */
.module-fade-enter-active,
.module-fade-leave-active {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.module-fade-enter-from {
  opacity: 0;
  transform: translateY(12px);
}

.module-fade-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}
</style>
