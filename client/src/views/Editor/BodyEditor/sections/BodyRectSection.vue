<!-- client/src/views/Editor/BodyEditor/sections/BodyRectSection.vue -->
<template>
  <div v-if="body">
    <n-grid :cols="1" :y-gap="16">

      <!-- 站立/下蹲碰撞体积 -->
      <n-gi>
        <n-card title="基础碰撞体积 (Collision)" size="small">
          <n-grid :cols="2" :x-gap="12">
            <n-gi>
              <n-form-item label="站立碰撞 (hitRect)">
                <RectInput v-model="body.hitRect" />
              </n-form-item>
            </n-gi>
            <n-gi>
              <n-form-item label="下蹲碰撞 (squatHitRect)">
                <div v-if="!body.squatHitRect">
                  <n-button dashed block @click="initSquatHitRect">启用下蹲碰撞</n-button>
                </div>
                <div v-else class="flex flex-col gap-2">
                  <RectInput v-model="body.squatHitRect" />
                  <n-button size="tiny" type="error" secondary @click="body.squatHitRect = undefined">移除</n-button>
                </div>
              </n-form-item>
            </n-gi>
          </n-grid>
        </n-card>
      </n-gi>

      <!-- 受伤判定框数组 -->
      <n-gi>
        <n-card title="身体判定框 (Hurt Rects)" size="small">
          <template #header-extra>
            <n-button size="small" type="primary" secondary @click="addHurtRect">
              <template #icon><n-icon>
                  <AddIcon />
                </n-icon></template>
              添加
            </n-button>
          </template>

          <n-empty v-if="!body.hurtRectArr || body.hurtRectArr.length === 0" description="暂无受伤判定框" />

          <n-grid v-else :cols="1" :y-gap="8">
            <n-gi v-for="(_rect, index) in body.hurtRectArr" :key="index">
              <n-card size="small" embedded :title="getHurtRectLabel(index)">
                <div class="flex items-center gap-2">
                  <div class="flex-1">
                    <RectInput v-model="body.hurtRectArr[index]" />
                  </div>
                  <n-button size="tiny" type="error" ghost @click="removeHurtRect(index)">
                    <template #icon><n-icon>
                        <TrashIcon />
                      </n-icon></template>
                  </n-button>
                </div>
              </n-card>
            </n-gi>
          </n-grid>

          <n-alert type="info" class="mt-4" :bordered="false" title="判定框逻辑说明">
            <ul class="pl-4 m-0 text-xs">
              <li>通常定义 3 条：<b>1. 要害 </b>、<b>2. 站立 </b>、<b>3. 下蹲 </b>。</li>
              <li>如果<b>仅定义 1 条</b>：该框将作为所有状态（含要害/下蹲）的基础受击区域。</li>
            </ul>
          </n-alert>
        </n-card>
      </n-gi>

    </n-grid>
  </div>
</template>

<script setup lang="ts">
import { useBodyState } from '../hooks/useBodyState';
import RectInput from '../components/RectInput.vue';
import { Add as AddIcon, Trash as TrashIcon } from '@vicons/ionicons5';

const { selectedBody: body } = useBodyState();

const initSquatHitRect = () => {
  if (body.value) {
    // Default relative to hitRect or standard values
    body.value.squatHitRect = { x: -12, y: -50, width: 24, height: 50 };
  }
};

const addHurtRect = () => {
  if (body.value) {
    if (!body.value.hurtRectArr) body.value.hurtRectArr = [];
    body.value.hurtRectArr.push({ x: -12, y: -70, width: 24, height: 70 });
  }
};

const removeHurtRect = (index: number) => {
  if (body.value && body.value.hurtRectArr) {
    body.value.hurtRectArr.splice(index, 1);
  }
};

const getHurtRectLabel = (index: number) => {
  const labels = ['要害受伤 (Critical)', '站立受伤 (Standing)', '下蹲受伤 (Squatting)'];
  return labels[index] || `额外判定框 ${index + 1}`;
};
</script>

<style scoped>
.flex {
  display: flex;
}

.items-center {
  align-items: center;
}

.gap-2 {
  gap: 8px;
}

.flex-1 {
  flex: 1;
}

.flex-col {
  flex-direction: column;
}

.mt-4 {
  margin-top: 1rem;
}
</style>
