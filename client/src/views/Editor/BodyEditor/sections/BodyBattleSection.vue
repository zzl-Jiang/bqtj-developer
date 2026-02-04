<!-- client/src/views/Editor/BodyEditor/sections/BodyBattleSection.vue -->

<template>
  <div v-if="body">
    <n-grid :x-gap="12" :y-gap="12" cols="1 s:1 m:2" responsive="screen">
      <!-- Left Column: Battle Stats -->
      <n-gi>
        <n-card title="战斗数值 (Battle Stats)" size="small" class="h-full">

          <n-divider title-placement="left" style="margin-top: 0; margin-bottom: 12px; font-size: 12px; color: #999;">
            生存 & 防御 (Survival)
          </n-divider>
          <n-grid :cols="2" :x-gap="12" :y-gap="12">
            <n-gi v-for="meta in survivalMetas" :key="meta.key">
              <MetaFormItem :meta="meta" v-model:modelValue="body[meta.key]" :show-label="true" />
            </n-gi>
          </n-grid>

          <n-divider title-placement="left"
            style="margin-top: 16px; margin-bottom: 12px; font-size: 12px; color: #999;">
            攻击 & 其它 (Offense & Misc)
          </n-divider>
          <n-grid :cols="2" :x-gap="12" :y-gap="12">
            <n-gi v-for="meta in offenseMetas" :key="meta.key">
              <MetaFormItem :meta="meta" v-model:modelValue="body[meta.key]" :show-label="true" />
            </n-gi>
            <n-gi v-for="meta in miscMetas" :key="meta.key">
              <MetaFormItem :meta="meta" v-model:modelValue="body[meta.key]" :show-label="true" />
            </n-gi>
          </n-grid>

        </n-card>
      </n-gi>

      <!-- Right Column: UI & Preview (Concept) -->
      <n-gi>
        <n-card title="界面显示 (UI Display)" size="small">
          <n-grid :cols="1" :y-gap="12">
            <n-gi v-for="meta in BODY_LIFEBAR_METAS" :key="meta.key">
              <MetaFormItem :meta="meta" v-model:modelValue="body[meta.key]" :show-label="true" />
            </n-gi>
          </n-grid>
        </n-card>

        <!-- Placeholder for future visualizer or stats summary -->
        <n-alert title="数值提示" type="info" class="mt-4" :bordered="false">
          <ul class="pl-4 list-disc text-xs">
            <li>生命系数影响最终血量</li>
            <li>僵直系数 0.2 表示受到 20% 血量伤害时进入僵直</li>
            <li>爆头倍率默认 2.0</li>
            <li>双层血条只适用于虚晶蝎</li>
          </ul>
        </n-alert>
      </n-gi>
    </n-grid>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useBodyState } from '../hooks/useBodyState';
import { BODY_BATTLE_METAS, BODY_LIFEBAR_METAS } from '../config';
import MetaFormItem from '../../../components/MetaFormItem.vue';

const { selectedBody: body } = useBodyState();

const survivalKeys = ['lifeRatio', 'defenceRatio', 'rosRatio', 'headHurtMul'];
const offenseKeys = ['shootLenMul', 'nextAttackTime', 'superDpsAdd', 'avtiveSkillCdOverT'];

const survivalMetas = computed(() => BODY_BATTLE_METAS.filter(m => survivalKeys.includes(m.key)));
const offenseMetas = computed(() => BODY_BATTLE_METAS.filter(m => offenseKeys.includes(m.key)));
const miscMetas = computed(() => BODY_BATTLE_METAS.filter(m => !survivalKeys.includes(m.key) && !offenseKeys.includes(m.key)));

</script>

<style scoped>
.mt-4 {
  margin-top: 1rem;
}

.h-full {
  height: 100%;
}

.text-xs {
  font-size: 0.75rem;
}

.pl-4 {
  padding-left: 1rem;
}
</style>