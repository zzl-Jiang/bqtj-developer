<!-- client/src/views/Editor/BodyEditor/sections/BodyAttackSection.vue -->
<template>
  <div v-if="body">
    <div class="flex justify-between items-center mb-4">
      <n-h3 prefix="bar" style="margin: 0">攻击动作列表</n-h3>
      <n-button type="primary" size="small" @click="addHurt">
        <template #icon><n-icon>
            <AddIcon />
          </n-icon></template>
        添加动作
      </n-button>
    </div>

    <!-- 动作列表 -->
    <n-data-table :columns="columns" :data="body.hurtArr" :row-key="(row: any) => row" size="small" :max-height="500" />

    <!-- 详情编辑抽屉 -->
    <n-drawer v-model:show="drawerVisible" :width="520">
      <n-drawer-content :title="`编辑: ${editingHurt?.cn || editingHurt?.imgLabel || '未命名'}`" closable>
        <template #header-extra>
          <n-tag type="warning" size="small" v-if="editingHurt?.imgLabel">Label: {{ editingHurt.imgLabel }}</n-tag>
        </template>

        <n-form v-if="editingHurt" label-placement="left" :label-width="100" size="small">
          <n-tabs type="segment" animated>

            <!-- Tab 1: 基础 Basic -->
            <n-tab-pane name="basic" tab="基础信息">
              <n-card embedded :bordered="false">
                <MetaFormItem v-for="m in ATTACK_METAS.basic" :key="m.key" :meta="m"
                  v-model:modelValue="editingHurt[m.key]" :show-label="true" />
              </n-card>
            </n-tab-pane>

            <!-- Tab 2: 伤害 Damage -->
            <n-tab-pane name="hurt" tab="伤害数值">
              <n-card embedded :bordered="false">
                <n-grid :cols="1" :y-gap="12">
                  <n-gi v-for="m in ATTACK_METAS.hurt" :key="m.key">
                    <MetaFormItem :meta="m" v-model:modelValue="editingHurt[m.key]" :show-label="true" />
                  </n-gi>
                </n-grid>
              </n-card>
            </n-tab-pane>

            <!-- Tab 3: 判定 Hitbox -->
            <n-tab-pane name="hitbox" tab="判定范围">
              <n-card embedded :bordered="false" title="判定框 (grapRect)">
                <div v-if="!editingHurt.grapRect">
                  <n-button dashed block
                    @click="editingHurt.grapRect = { x: 0, y: 0, width: 0, height: 0 }">启用判定框</n-button>
                </div>
                <div v-else>
                  <RectInput v-model="editingHurt.grapRect" />
                  <n-button size="tiny" type="error" secondary class="mt-2"
                    @click="editingHurt.grapRect = null">移除</n-button>
                </div>
              </n-card>
              <n-alert type="info" class="mt-4" :bordered="false">
                定义攻击生效的矩形区域，相对于单位中心点。
              </n-alert>
            </n-tab-pane>


            <!-- Tab 4: 逻辑 Logic -->
            <n-tab-pane name="logic" tab="高级逻辑">
              <n-card embedded :bordered="false">
                <MetaFormItem v-for="m in ATTACK_METAS.logic" :key="m.key" :meta="m"
                  v-model:modelValue="editingHurt[m.key]" :show-label="true" />
              </n-card>
            </n-tab-pane>

          </n-tabs>
        </n-form>
      </n-drawer-content>
    </n-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref, h } from 'vue';
import { NButton, NTag, NSpace, useDialog } from 'naive-ui';
import { Add as AddIcon } from '@vicons/ionicons5';
import { useBodyState } from '../hooks/useBodyState';
import { ATTACK_METAS } from '../config';
import { BodyAttackDefine } from '../../../../models/body/BodyAttackDefine';
import MetaFormItem from '../../../components/MetaFormItem.vue';
import RectInput from '../components/RectInput.vue';

const { selectedBody: body } = useBodyState();

const dialog = useDialog();

const drawerVisible = ref(false);
const editingHurt = ref<any>(null);

const addHurt = () => {
  const newHurt = BodyAttackDefine.createDefault(`attack_${(body.value?.hurtArr.length || 0) + 1}`);
  body.value?.hurtArr.push(newHurt);
};

const openHurtDrawer = (hurt: any) => {
  editingHurt.value = hurt;
  drawerVisible.value = true;
};

const handleRemove = (row: any, index: number) => {
  dialog.warning({
    title: '确认删除',
    content: `确定要删除攻击动作 "${row.cn || row.imgLabel}" 吗？`,
    positiveText: '删除',
    negativeText: '取消',
    onPositiveClick: () => {
      body.value?.hurtArr.splice(index, 1);
    }
  });
};

// Define columns for NDataTable
const columns = [
  {
    title: '名称',
    key: 'cn',
    width: 120,
    render: (row: any) => row.cn || m('em', { style: 'color: #999' }, '未命名')
  },
  {
    title: 'Label',
    key: 'imgLabel',
    width: 120,
    render: (row: any) => h(NTag, { size: 'small', type: 'info', bordered: false }, { default: () => row.imgLabel || '?' })
  },
  {
    title: '属性',
    key: 'tags',
    render: (row: any) => {
      const tags = [];
      if (row.bulletLabel) tags.push(h(NTag, { size: 'tiny', type: 'warning', style: 'margin-right: 4px' }, { default: () => '弹' }));
      if (row.skillArr?.length) tags.push(h(NTag, { size: 'tiny', type: 'success' }, { default: () => `技 ${row.skillArr.length}` }));
      return tags.length ? h('div', tags) : null;
    }
  },
  {
    title: '操作',
    key: 'actions',
    width: 130,
    render(row: any, index: number) {
      return h(NSpace, null, {
        default: () => [
          h(NButton, { size: 'tiny', secondary: true, type: 'info', onClick: () => openHurtDrawer(row) }, { default: () => '编辑' }),
          h(NButton, { size: 'tiny', secondary: true, type: 'error', onClick: () => handleRemove(row, index) }, { default: () => '删' })
        ]
      });
    }
  }
];

// Helper for 'em' tag which is not a component
const m = h;

</script>

<style scoped>
.mb-4 {
  margin-bottom: 1rem;
}

.mt-4 {
  margin-top: 1rem;
}
</style>