<!-- src/views/Editor/SkillEditor/index.vue -->
<template>
  <!-- 注意：设置 position="absolute" 以填满父容器 -->
  <n-layout has-sider position="absolute">
    
    <!-- 左侧技能列表 -->
    <SkillSidebar />

    <!-- 中央内容区 -->
    <n-layout-content content-style="padding: 24px;">
      <div v-if="selectedSkill" class="editor-inner-wrapper">
        <n-grid :cols="24" :x-gap="24">
          
          <!-- 中间：表单编辑区 -->
          <n-gi :span="16">
            <n-tabs type="card" animated>
              <n-tab-pane name="basic" tab="核心配置">
                <BasicSection />
              </n-tab-pane>
              <n-tab-pane name="effects" tab="技能效果">
                <EffectSection />
              </n-tab-pane>
              <n-tab-pane name="target" tab="目标选择">
                <TargetSection />
              </n-tab-pane>
              <n-tab-pane name="visuals" tab="视觉资源">
                <VisualSection />
              </n-tab-pane>
            </n-tabs>
          </n-gi>

          <!-- 右侧：XML预览与说明 -->
          <n-gi :span="8">
            <SkillXmlPreview />
          </n-gi>

        </n-grid>
      </div>
      
      <!-- 未选择技能时的空状态 -->
      <n-empty 
        v-else 
        description="请在左侧选择技能或点击新增" 
        style="margin-top: 100px" 
      />
    </n-layout-content>

  </n-layout>
</template>

<script setup lang="ts">
import { useSkillState } from './hooks/useSkillState';
import SkillSidebar from './components/SkillSidebar.vue';
import SkillXmlPreview from './components/SkillXmlPreview.vue';
import BasicSection from './components/sections/BasicSection.vue';
import EffectSection from './components/sections/EffectSection.vue';
import TargetSection from './components/sections/TargetSection.vue';
import VisualSection from './components/sections/VisualSection.vue';

// 只需要引入状态，判断 selectedSkill 是否存在即可
const { selectedSkill } = useSkillState();
</script>

<style scoped>
.editor-inner-wrapper {
  height: 100%;
  overflow-x: hidden;
}

/* 统一 Tab 样式微调 */
:deep(.n-tabs-nav) {
  margin-bottom: 16px;
}
</style>