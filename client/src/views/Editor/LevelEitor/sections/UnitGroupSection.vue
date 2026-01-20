<!-- client/src/views/Editor/LevelEitor/sections/UnitGroupSection.vue -->
<template>
  <div v-if="level && level.unitG">
    <!-- 全局默认设置 -->
    <n-card title="全局默认配置 (allDefault)" size="small" class="mb-4" :segmented="true">
      <template #header-extra>
        <!-- 添加属性按钮 -->
        <n-dropdown 
          trigger="click" 
          :options="addPropertyOptions" 
          @select="handleAddProperty"
          scrollable
          style="max-height: 250px"
        >
          <n-button type="primary" size="tiny" ghost>
            <template #icon><n-icon><AddOutline /></n-icon></template>
            添加覆盖属性
          </n-button>
        </n-dropdown>
      </template>

      <n-grid :cols="3" :x-gap="12" :y-gap="12">
        <!-- 固定显示的 AI 指令 -->
        <n-gi>
          <MetaFormItem 
            :meta="AI_ORDER_META" 
            v-model:modelValue="level.unitG.allDefault.aiOrder" 
            :show-label="true" 
          />
        </n-gi>

        <!-- 动态生成的已添加属性 -->
        <n-gi v-for="meta in activeExtraProperties" :key="meta.key">
          <div class="dynamic-property-item">
            <MetaFormItem 
              :meta="meta" 
              v-model:modelValue="level.unitG.allDefault[meta.key]" 
              :show-label="true" 
            />
            <!-- 删除按钮 -->
            <n-button 
              quaternary 
              circle 
              size="tiny" 
              type="error" 
              class="delete-btn"
              @click="removeProperty(meta.key)"
            >
              <template #icon><n-icon><TrashOutline /></n-icon></template>
            </n-button>
          </div>
        </n-gi>
      </n-grid>
    </n-card>

    <!-- 发兵集列表 (unitOrder) -->
    <div class="flex justify-between items-center mb-2">
      <n-h3 prefix="bar">发兵集列表 (unitOrder)</n-h3>
      <n-button type="primary" ghost @click="handleAddGroup">添加发兵集</n-button>
    </div>

    <n-collapse arrow-placement="right" :default-expanded-names="[]" style="margin-top: 20px;">
      <n-collapse-item 
        v-for="(group, gIdx) in level.unitG.unitOrders" 
        :key="gIdx" 
        :name="gIdx"
        class="group-item"
      >
        <template #header>
          <n-space style="padding: 10px">
            <n-tag type="info" size="small">{{ group.camp || 'enemy' }}</n-tag>
            <n-text strong>{{ group.id || '未命名组' }}</n-text>
            <n-text depth="3">({{ group.arr.length }} 个单位)</n-text>
          </n-space>
        </template>
        
        <template #header-extra>
          <n-button-group size="tiny" style="margin-right: 8px;">
            <n-button @click.stop="handleAddUnit(group)">添加单位</n-button>
            <n-button type="error" ghost @click.stop="handleRemoveGroup(Number(gIdx))">删除组</n-button>
          </n-button-group>
        </template>

        <!-- 组属性设置 -->
        <n-grid :cols="3" :x-gap="12" class="mb-4 p-2">
          <n-gi v-for="meta in GROUP_METAS" :key="meta.key">
            <MetaFormItem 
              :meta="meta" 
              v-model:modelValue="group[meta.key]" 
              :show-label="true" 
            />
          </n-gi>
        </n-grid>

        <!-- 单位列表表格 -->
        <n-table size="small" :single-line="false" style="padding: 8px; margin-bottom: 10px;">
          <thead>
            <tr>
              <th>中文名 (cnName)</th>
              <th>类型</th>
              <th>生命/伤害倍率</th>
              <th>数量/权重</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(unit, uIdx) in group.arr" :key="uIdx">
              <td>{{ unit.cnName || '-' }}</td>
              <td><n-tag size="small" :type="unit.unitType === 'boss' ? 'error' : 'default'">{{ unit.unitType }}</n-tag></td>
              <td>{{ unit.lifeMul }} / {{ unit.dpsMul }}</td>
              <td>{{ unit.num }}</td>
              <td>
                <n-button size="tiny" secondary type="info" @click="editUnit(unit)">详情</n-button>
                <n-button size="tiny" secondary type="error" @click="group.arr.splice(uIdx, 1)" class="ml-2">移除</n-button>
              </td>
            </tr>
          </tbody>
        </n-table>
      </n-collapse-item>
    </n-collapse>

    <!-- 单位详情编辑抽屉 -->
    <n-drawer v-model:show="showDrawer" :width="600" placement="right">
      <n-drawer-content :title="`编辑单位: ${editingUnit?.cnName || '未命名'}`" closable>
        <div v-if="editingUnit">
          <n-tabs type="line" animated>
            <n-tab-pane name="basic" tab="基础信息">
              <n-grid :cols="2" :x-gap="12" :y-gap="8">
                <n-gi v-for="meta in UNIT_METAS.basic" :key="meta.key">
                  <MetaFormItem :meta="meta" v-model:modelValue="editingUnit[meta.key]" :show-label="true" />
                </n-gi>
              </n-grid>
            </n-tab-pane>
            <n-tab-pane name="stats" tab="数值倍率">
              <n-grid :cols="2" :x-gap="12" :y-gap="8">
                <n-gi v-for="meta in UNIT_METAS.stats" :key="meta.key">
                  <MetaFormItem :meta="meta" v-model:modelValue="editingUnit[meta.key]" :show-label="true" />
                </n-gi>
              </n-grid>
            </n-tab-pane>
            <n-tab-pane name="flags" tab="开关标志">
              <n-grid :cols="2" :x-gap="12" :y-gap="8">
                <n-gi v-for="meta in UNIT_METAS.flags" :key="meta.key">
                  <MetaFormItem :meta="meta" v-model:modelValue="editingUnit[meta.key]" :show-label="true" />
                </n-gi>
              </n-grid>
            </n-tab-pane>
            <n-tab-pane name="logic" tab="战斗逻辑">
              <n-grid :cols="2" :x-gap="12" :y-gap="8">
                <n-gi v-for="meta in UNIT_METAS.logic" :key="meta.key">
                  <MetaFormItem :meta="meta" v-model:modelValue="editingUnit[meta.key]" :show-label="true" />
                </n-gi>
              </n-grid>
            </n-tab-pane>
          </n-tabs>
        </div>
      </n-drawer-content>
    </n-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useLevelState } from '../hooks/useLevelState';
import MetaFormItem from '../../../components/MetaFormItem.vue';
import { AI_ORDER_META, GROUP_METAS, UNIT_METAS } from '../config';
import { UnitOrderDefine } from '../../../../models/level/unit/UnitOrderDefine';
import { OneUnitOrderDefine } from '../../../../models/level/unit/OneUnitOrderDefine';
import { TrashOutline, AddOutline } from '@vicons/ionicons5';

const { selectedLevel: level } = useLevelState();

const showDrawer = ref(false);
const editingUnit = ref<any>(null);

const handleAddGroup = () => {
  const newGroup = new UnitOrderDefine();
  newGroup.id = "group_" + (level.value?.unitG.unitOrders.length ?? 0 + 1);
  level.value?.unitG.unitOrders.push(newGroup);
};

const handleRemoveGroup = (idx: number) => {
  level.value?.unitG.unitOrders.splice(idx, 1);
};

const handleAddUnit = (group: UnitOrderDefine) => {
  const newUnit = new OneUnitOrderDefine();
  newUnit.cnName = "新单位";
  group.arr.push(newUnit);
};

const editUnit = (unit: OneUnitOrderDefine) => {
  editingUnit.value = unit;
  showDrawer.value = true;
};

// 获取所有可选的 Meta 列表（排除掉固定显示的 aiOrder）
const ALL_AVAILABLE_METAS = computed(() => {
  const all = [
    ...UNIT_METAS.basic,
    ...UNIT_METAS.stats,
    ...UNIT_METAS.logic,
    ...UNIT_METAS.flags
  ];
  return all.filter(m => m.key !== 'aiOrder');
});

// 找出当前已经在 allDefault 中设置了值的属性（排除 undefined 和 aiOrder）
const activeExtraProperties = computed(() => {
  if (!level.value?.unitG?.allDefault) return [];
  return ALL_AVAILABLE_METAS.value.filter(meta => 
    level.value?.unitG.allDefault[meta.key] !== undefined && meta.key !== 'aiOrder'
  );
});

// 点击下拉菜单添加属性
const handleAddProperty = (key: string) => {
  const meta = ALL_AVAILABLE_METAS.value.find(m => m.key === key);
  if (meta) {
    // 根据类型给一个初始值，避免 undefined
    let defaultValue: any = '';
    if (meta.type === 'number') defaultValue = 1;
    if (meta.type === 'boolean') defaultValue = true;
    
    if (level.value) level.value.unitG.allDefault[key] = defaultValue;
  }
};

// 下拉菜单的选项
const addPropertyOptions = computed(() => {
  // 只列出还没有被添加的属性
  return ALL_AVAILABLE_METAS.value
    .filter(meta => level.value?.unitG.allDefault[meta.key] === undefined)
    .map(meta => ({
      label: `${meta.label}`,
      key: meta.key
    }));
});

// 移除属性
const removeProperty = (key: string) => {
  if (level.value) level.value.unitG.allDefault[key] = undefined;
};
</script>

<style scoped>
.group-item {
  border: 1px solid #efeff5;
  margin-bottom: 8px;
  border-radius: 4px;
}
.mb-4 { margin-bottom: 1rem; }
.p-2 { padding: 0.5rem; }
.ml-2 { margin-left: 0.5rem; }
.mr-2 { margin-right: 0.5rem; }

.dynamic-property-item {
  position: relative;
  border: 1px dashed #e0e0e0;
  padding: 8px;
  border-radius: 4px;
}

.delete-btn {
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: white !important;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}


/* 下面是对部分 naive-ui 组件的调整。原本的样式不符合界面布局，需要微调。 */
:deep(.n-collapse .n-collapse-item:not(:first-child)) {
  border-top: 1px solid #efeff5 !important;
}
:deep(.n-collapse .n-collapse-item .n-collapse-item__header) {
  padding: 0 !important;
}
</style>