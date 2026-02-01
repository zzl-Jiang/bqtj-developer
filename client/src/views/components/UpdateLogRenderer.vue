<!-- client/src/views/components/UpdateLogRenderer.vue -->
<template>
  <div class="changelog-container">
    <div v-for="(block, bIdx) in blocks" :key="bIdx" class="log-block">
      
      <!-- 标题渲染 -->
      <n-h2 v-if="block.type === 'title'" prefix="bar" align-text>
        {{ block.content }}
      </n-h2>

      <!-- 普通文本 -->
      <n-text v-else-if="block.type === 'text'" depth="2" component="p" style="line-height: 1.6;">
        {{ block.content }}
      </n-text>

      <!-- 功能特性卡片 -->
      <n-card v-else-if="block.type === 'feature'" size="small" class="feature-card" embedded>
        <template #header>
          <n-space align="center" :size="8">
            <n-tag size="small" type="primary" quaternary v-if="block.tag">{{ block.tag }}</n-tag>
            <n-text strong>{{ block.title }}</n-text>
          </n-space>
        </template>
        <n-text depth="3" style="font-size: 13px;">{{ block.desc }}</n-text>
      </n-card>

      <!-- 列表渲染 -->
      <n-ul v-else-if="block.type === 'list'">
        <n-li v-for="(item, iIdx) in block.content" :key="iIdx">
          <n-text depth="2">{{ item }}</n-text>
        </n-li>
      </n-ul>

      <!-- 警告渲染 -->
      <n-alert v-else-if="block.type === 'warning'" :title="block.title" type="warning" size="small">
        {{ block.content }}
      </n-alert>

      <!-- 动作跳转按钮 -->
      <div v-else-if="block.type === 'action'" class="action-area">
        <n-button type="primary" round @click="handleAction(block.module)">
          {{ block.label }}
        </n-button>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import type { LogBlock } from '../../types/changelog';
import { useModStore } from '../../store/useModStore';
import { useRouter } from 'vue-router';

defineProps<{ blocks: LogBlock[] }>();
const modStore = useModStore();
const router = useRouter();

const handleAction = (moduleKey: any) => {
  modStore.activeModule = moduleKey;
  router.push('/editor');
};
</script>

<style scoped>
.changelog-container { display: flex; flex-direction: column; gap: 16px; }
.log-block { margin-bottom: 8px; }
.feature-card { border-radius: 8px; border-left: 4px solid #18a058; }
.action-area { display: flex; justify-content: center; padding: 20px 0; }
</style>