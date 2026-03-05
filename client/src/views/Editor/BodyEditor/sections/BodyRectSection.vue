<!-- client/src/views/Editor/BodyEditor/sections/BodyRectSection.vue -->
<template>
  <div v-if="body" class="rect-section">
    <n-grid :cols="1" :y-gap="20">

      <!-- 站立/下蹲碰撞体积 -->
      <n-gi>
        <n-card title="基础碰撞体积限制 (Collision Boxes)" size="small" class="premium-card">
          <template #header-extra>
            <n-icon :component="ScanOutline" color="var(--primary-color)" size="20" />
          </template>
          <n-grid :cols="2" :x-gap="20">
            <n-gi>
              <div class="mini-form-item">
                <div class="mini-label">站立状态碰撞 (hitRect)</div>
                <RectInput v-model="body.hitRect" />
              </div>
            </n-gi>
            <n-gi>
              <div class="mini-form-item">
                <div class="mini-label">下蹲状态碰撞 (squatHitRect)</div>
                <div v-if="!body.squatHitRect">
                  <n-button dashed block @click="initSquatHitRect" class="dashed-btn">
                    <template #icon><n-icon>
                        <AddIcon />
                      </n-icon></template>
                    激活下蹲碰撞
                  </n-button>
                </div>
                <div v-else class="active-rect-container">
                  <RectInput v-model="body.squatHitRect" />
                  <n-button size="tiny" type="error" quaternary @click="body.squatHitRect = undefined"
                    class="remove-btn">
                    <template #icon><n-icon>
                        <TrashIcon />
                      </n-icon></template>
                    移除下蹲配置
                  </n-button>
                </div>
              </div>
            </n-gi>
          </n-grid>
        </n-card>
      </n-gi>

      <!-- 受伤判定框数组 -->
      <n-gi>
        <n-card title="身体部位详细判定 (Hurt Body Parts)" size="small" class="premium-card">
          <template #header-extra>
            <n-button size="small" type="primary" secondary @click="addHurtRect" round>
              <template #icon><n-icon>
                  <AddIcon />
                </n-icon></template>
              添加新部位
            </n-button>
          </template>

          <div class="hurt-rects-content">
            <n-empty v-if="!body.hurtRectArr || body.hurtRectArr.length === 0" description="点击上方按钮定义身体判定区域"
              class="py-8" />

            <n-grid v-else :cols="1" :y-gap="12">
              <n-gi v-for="(_rect, index) in body.hurtRectArr" :key="index">
                <div class="hurt-rect-item">
                  <div class="item-header">
                    <div class="item-title">
                      <n-badge :value="index + 1" :color="index === 0 ? '#e88080' : '#18a058'" class="mr-2" />
                      {{ getHurtRectLabel(index) }}
                    </div>
                    <n-button circle size="tiny" type="error" quaternary @click="removeHurtRect(index)">
                      <template #icon><n-icon>
                          <TrashIcon />
                        </n-icon></template>
                    </n-button>
                  </div>
                  <div class="item-content">
                    <RectInput v-model="body.hurtRectArr[index]" />
                  </div>
                </div>
              </n-gi>
            </n-grid>
          </div>

          <n-divider class="premium-divider" />

          <n-alert type="info" class="premium-alert" :bordered="false">
            <template #icon><n-icon>
                <InformationCircleOutline />
              </n-icon></template>
            <div class="alert-content">
              <b>判定逻辑：</b>
              <div>1. 通常定义顺序：<b>要害部位</b> (0) → <b>站立身体</b> (1) → <b>下蹲身体</b> (2)</div>
              <div>2. 若仅有 1 个判定框，该框将覆盖所有受击情境。</div>
              <div>3. 多出的判定框将作为额外的全身均质受击区。</div>
            </div>
          </n-alert>
        </n-card>
      </n-gi>

    </n-grid>
  </div>
</template>

<script setup lang="ts">
import { useBodyState } from '../hooks/useBodyState';
import RectInput from '../components/RectInput.vue';
import {
  Add as AddIcon,
  Trash as TrashIcon,
  ScanOutline,
  InformationCircleOutline
} from '@vicons/ionicons5';

const { selectedBody: body } = useBodyState();

const initSquatHitRect = () => {
  if (body.value) {
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
  const labels = ['要害部位 (Critical Peak)', '常规躯干 (Body Main)', '下蹲躯干 (Crouch Main)'];
  return labels[index] || `自定义躯体部位 ${index + 1}`;
};
</script>

<style scoped>
.rect-section {
  padding-bottom: 32px;
}

.mini-form-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.mini-label {
  font-size: 11px;
  font-weight: 600;
  opacity: 0.5;
  padding-left: 2px;
}

.dashed-btn {
  height: 42px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.01);
}

.active-rect-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.remove-btn {
  align-self: flex-end;
  font-size: 11px;
  opacity: 0.6;
}

.remove-btn:hover {
  opacity: 1;
}

.hurt-rects-content {
  padding-top: 8px;
}

.hurt-rect-item {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.04);
  border-radius: 12px;
  padding: 12px 16px;
  transition: all 0.3s ease;
}

.hurt-rect-item:hover {
  background: rgba(255, 255, 255, 0.04);
  border-color: rgba(255, 255, 255, 0.08);
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.item-title {
  font-size: 13px;
  font-weight: 700;
  display: flex;
  align-items: center;
}

.mr-2 {
  margin-right: 8px;
}

.py-8 {
  padding: 32px 0;
}

.premium-divider {
  margin: 20px 0;
  opacity: 0.05;
}

.premium-alert {
  background: rgba(112, 192, 232, 0.05) !important;
  border: 1px solid rgba(112, 192, 232, 0.1) !important;
  border-radius: 12px;
}

.alert-content {
  font-size: 12px;
  line-height: 1.8;
  opacity: 0.8;
}
</style>
