<!-- src/views/Editor/SkillEditor/components/sections/VisualSection.vue -->
<template>
  <div class="visual-container" v-if="selectedSkill">
    <n-collapse arrow-placement="right" :default-expanded-names="[0]">
      <n-collapse-item 
        v-for="(tag, idx) in imgTags" 
        :key="tag" 
        :title="tag" 
        :name="idx"
      >
        <!-- 使用原有的图片编辑器组件 -->
        <ImgUrlEditor :data="selectedSkill[tag]" />
        
        <template #header-extra>
          <n-tag v-if="hasData(tag)" size="tiny" type="success">已配置</n-tag>
        </template>
      </n-collapse-item>
    </n-collapse>
  </div>
</template>

<script setup lang="ts">
import { useSkillState } from '../../hooks/useSkillState';
import ImgUrlEditor from '../widgets/ImgUrlEditor.vue';

const { selectedSkill } = useSkillState();

// 资源标签列表
const imgTags = [
  "addSkillEffectImg", "meEffectImg", "targetEffectImg", 
  "pointEffectImg", "otherEffectImg", "stateEffectImg", "stateEffectImg2"
];

// 判断该项是否已填充数据（用于在 Header 显示状态）
const hasData = (tag: string) => {
  const obj = selectedSkill.value?.[tag];
  return obj && (obj.url || obj.imgUrl);
};
</script>

<style scoped>
.visual-container {
  background: #18181c;
  padding: 12px;
  border-radius: 4px;
}
</style>