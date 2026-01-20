<!-- client/src/views/Editor/LevelEitor/sections/LevelBasicSection.vue -->
<template>
  <n-form v-if="level" :label-width="100">
    <n-alert title="预览环境限制说明" type="warning" closable class="mb-4">
      当前编辑器基于开发者模式环境配置，部分高级继承属性 (Fixed) 和 全局掉落配置 (Drop) 已被硬编码禁用，请直接在下方具体页签配置关卡内容。
    </n-alert>

    <!-- 基础参数卡片 -->
    <n-card title="基础参数" size="small" class="mb-4">
      <n-grid :cols="3" :x-gap="12">
        <n-gi v-for="meta in LEVEL_BASIC_METAS" :key="meta.key">
          <MetaFormItem
            :meta="meta"
            v-model:modelValue="level[meta.key]"
            :show-label="true"
          />
        </n-gi>
      </n-grid>
    </n-card>

    <!-- Info 运行配置卡片 -->
    <n-card title="运行规则 (Info)" size="small">
      <n-tabs type="line" animated>
        <n-tab-pane name="basic" tab="核心数值">
          <n-grid :cols="3" :x-gap="12">
            <n-gi v-for="meta in LEVEL_INFO_METAS.runtime" :key="meta.key">
              <!-- 注意这里绑定的是 level.info[key] -->
              <MetaFormItem
                :meta="meta"
                v-model:modelValue="level.info[meta.key]"
                :show-label="true"
              />
            </n-gi>
          </n-grid>
        </n-tab-pane>

        <n-tab-pane name="limit" tab="功能限制">
          <n-grid :cols="4" :x-gap="12">
            <n-gi v-for="meta in LEVEL_INFO_METAS.restrictions" :key="meta.key">
              <!-- 布尔值会自动渲染成开关/勾选框 -->
              <MetaFormItem
                :meta="meta"
                v-model:modelValue="level.info[meta.key]"
                :show-label="true"
              />
            </n-gi>
          </n-grid>
        </n-tab-pane>
        
        <n-tab-pane name="other" tab="扩展">
           <n-grid :cols="2" :x-gap="12">
            <n-gi v-for="meta in LEVEL_INFO_METAS.misc" :key="meta.key">
              <MetaFormItem
                :meta="meta"
                v-model:modelValue="level.info[meta.key]"
                :show-label="true"
              />
            </n-gi>
          </n-grid>
        </n-tab-pane>
      </n-tabs>
    </n-card>

    <!-- 展示禁用的标签 -->
    <n-card title="继承与掉落 (fixed / drop, 已禁用)" size="small" style="opacity: 0.7;">
      <n-tabs type="segment">
        <n-tab-pane name="fixed" tab="继承配置 (Fixed)">
          <div style="padding: 16px;">
            <n-h4 prefix="bar" align-text>
              <n-text type="warning">继承机制锁定</n-text>
            </n-h4>
            <n-blockquote>
              根据 AS3 源代码 <code>LevelDefine.as</code> 的逻辑：<br/>
              在 TempGetter 加载流程中，<code>fixed.target</code> 会被强制清空。<br/>
              <strong>后果：</strong> 关卡无法从父级关卡获取任何 UnitG 或 EventG 配置。
            </n-blockquote>
          </div>
        </n-tab-pane>
         
        <n-tab-pane name="drop" tab="掉落配置 (Drop)">
          <div style="padding: 16px;">
            <n-h4 prefix="bar" align-text>
              <n-text type="warning">掉落逻辑锁定</n-text>
            </n-h4>
            <n-blockquote>
              根据 AS3 源代码 <code>LevelDefine.as</code> 的逻辑：<br/>
              在 TempGetter 加载流程中，引擎已执行 <code>this.drop.noB = true</code> 。<br/>
              <strong>后果：</strong> 关卡无法自定义与修改任何自定义掉落配置。
            </n-blockquote>
          </div>
        </n-tab-pane>
      </n-tabs>
    </n-card>
  </n-form>
</template>

<script setup lang="ts">
import { useLevelState } from '../hooks/useLevelState';
import MetaFormItem from '../../../components/MetaFormItem.vue';
import { LEVEL_BASIC_METAS, LEVEL_INFO_METAS } from '../config';

const { selectedLevel: level } = useLevelState();
</script>