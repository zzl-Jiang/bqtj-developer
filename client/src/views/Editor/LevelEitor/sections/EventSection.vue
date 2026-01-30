<!-- client/src/views/Editor/LevelEitor/sections/EventSection.vue -->
<template>
  <div v-if="level && level.eventG">
    <div class="flex justify-between items-center mb-4">
      <n-h3 prefix="bar">逻辑事件组 (eventG)</n-h3>
      <n-button type="primary" ghost @click="handleAddGroup">
        <template #icon><n-icon><AddOutline /></n-icon></template>
        添加事件组 (Group)
      </n-button>
      <span style="margin-left: 20px; justify-self: center;">事件组间同时运行，事件组内按顺序运行。</span>
    </div>

    <!-- 顶层：事件组 Collapse -->
    <n-collapse arrow-placement="right" >
      <n-collapse-item 
        v-for="(group, gIdx) in level.eventG.groups" 
        :key="gIdx" 
        :name="gIdx"
        class="group-item"
      >
        <template #header>
          <n-space align="center">
            <n-badge :value="Number(gIdx) + 1" color="#18a058" />
            <n-text strong>事件波次 / 逻辑包</n-text>
            <n-text depth="3">({{ group.events.length }} 个事件)</n-text>
          </n-space>
        </template>

        <template #header-extra>
          <n-button-group size="tiny" style="margin-right: 8px;">
            <n-button @click.stop="handleAddEvent(group)">添加事件</n-button>
            <n-button type="error" ghost @click.stop="level.eventG.groups.splice(gIdx, 1)">删除组</n-button>
          </n-button-group>
        </template>

        <!-- 事件列表：每个组内的具体事件 -->
        <n-list bordered clickable hoverable>
          <n-list-item v-for="(event, eIdx) in group.events" :key="eIdx" @click="editEvent(event)">
            <n-thing>
              <template #header>
                <n-tag size="small" type="primary" class="mr-2">{{ event.id || 'Unnamed Event' }}</n-tag>
                <n-text depth="2" small>条件: {{ event.condition.xmlText || '(未设置)' }}</n-text>
              </template>
              <template #header-extra>
                <n-button size="tiny" quaternary type="error" @click.stop="group.events.splice(eIdx, 1)">
                  <template #icon><n-icon><TrashOutline /></n-icon></template>
                </n-button>
              </template>
              <div class="order-preview">
                指令数: <n-number-animation :from="0" :to="event.orders.length" /> 条
              </div>
            </n-thing>
          </n-list-item>
          <n-empty v-if="group.events.length === 0" size="small" description="该组暂无事件" />
        </n-list>
      </n-collapse-item>
    </n-collapse>

    <!-- 事件编辑详情抽屉 -->
    <n-drawer v-model:show="showDrawer" :width="650" placement="right">
      <n-drawer-content :title="`编辑事件: ${editingEvent?.id || '新事件'}`" closable>
        <div v-if="editingEvent">
          <n-form :label-width="100">
            <!-- 基础识别 -->
            <n-form-item label="事件 ID">
              <n-input v-model:value="editingEvent.id" placeholder="建议命名如: wave1_start" />
            </n-form-item>

            <!-- 条件配置 (Condition) -->
            <n-card title="触发条件 (Condition)" size="small" embedded class="mb-4">
              <n-grid :cols="2" :x-gap="12" class="mb-2">
                <n-gi v-for="meta in EVENT_CONDITION_METAS" :key="meta.key">
                  <MetaFormItem :meta="meta" v-model:modelValue="editingEvent.condition[meta.key]" :show-label="true" />
                </n-gi>
              </n-grid>
              
              <n-divider title-placement="left">详细逻辑</n-divider>
              
              <ConditionBuilder v-model="editingEvent.condition.xmlText" />
            </n-card>

            <!-- 指令列表 (Orders) -->
            <n-card title="执行指令序列 (Orders)" size="small" embedded>
              <template #header-extra>
                <n-button size="small" type="primary" secondary @click="handleAddOrder">
                  <template #icon><n-icon><AddOutline /></n-icon></template>
                  插入新指令
                </n-button>
              </template>

              <div class="orders-container">
                <OrderBuilder 
                  v-for="(order, oIdx) in editingEvent.orders" 
                  :key="oIdx"
                  v-model="order.xmlText"
                  :index="oIdx"
                  @delete="editingEvent.orders.splice(oIdx, 1)"
                />

                <n-empty v-if="editingEvent.orders.length === 0" description="暂无指令，点击右上角添加" />
              </div>
            </n-card>
          </n-form>
        </div>
      </n-drawer-content>
    </n-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useLevelState } from '../hooks/useLevelState';
import MetaFormItem from '../../../components/MetaFormItem.vue';
import { EVENT_CONDITION_METAS } from '../config';
import { LevelEventGroup } from '../../../../models/level/event/LevelEventDefineGroup';
import { LevelEventDefine } from '../../../../models/level/event/LevelEventDefine';
import { LevelEventOrderDefine } from '../../../../models/level/event/LevelEventOrderDefine';
import ConditionBuilder from './event/ConditionBuilder.vue';
import OrderBuilder from './event/OrderBuilder.vue';
import { TrashOutline, AddOutline } from '@vicons/ionicons5';
import { useSectionNavigator } from '../../../../hooks/useSectionNavigator';

const { selectedLevel: level } = useLevelState();

const showDrawer = ref(false);
const editingEvent = ref<LevelEventDefine | null>(null);

const handleAddGroup = () => {
  const newGroup = new LevelEventGroup();
  level.value?.eventG.groups.push(newGroup);
};

const handleAddEvent = (group: LevelEventGroup) => {
  const newEvent = new LevelEventDefine();
  newEvent.id = "event_" + (group.events.length + 1);
  group.events.push(newEvent);
};

const editEvent = (event: LevelEventDefine) => {
  editingEvent.value = event;
  showDrawer.value = true;
};

const handleAddOrder = () => {
  if (editingEvent.value) {
    const newOrder = new LevelEventOrderDefine();
    editingEvent.value.orders.push(newOrder);
  }
};

// 跳转监听
useSectionNavigator({
  module: 'level',
  tab: 'events',
  list: () => level.value?.eventG.groups.flatMap(g => g.events),
  onFound: (event) => editEvent(event)
});
</script>

<style scoped>
.group-item {
  border: 1px solid #efeff5;
  margin-bottom: 12px;
  border-radius: 8px;
  overflow: hidden;
  padding: 10px;
}
.order-preview {
  font-size: 12px;
  color: #999;
  margin-top: 4px;
}
.order-input-item {
  display: flex;
  gap: 8px;
  align-items: center;
}
.orders-container {
  padding: 8px 0;
  max-height: 60vh; /* 防止指令过多导致抽屉过长 */
  overflow-y: auto;
}
.mb-4 { margin-bottom: 1rem; }
.mr-2 { margin-right: 0.5rem; }

/* 下面是对部分 naive-ui 组件的调整。原本的样式不符合界面布局，需要微调。 */
:deep(.n-collapse .n-collapse-item:not(:first-child)) {
  border-top: 1px solid #efeff5 !important;
}
:deep(.n-collapse .n-collapse-item .n-collapse-item__header) {
  padding: 0 !important;
}
</style>