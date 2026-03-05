<!-- client/src/views/Editor/BodyEditor/sections/BodyAttackSection.vue -->
<template>
  <div v-if="body" class="attack-section">
    <div class="header-actions">
      <div class="header-title">
        <n-icon :component="FlashOutline" color="var(--primary-color)" size="22" />
        <n-h3 style="margin: 0">攻击动作列表 (Attack Actions)</n-h3>
      </div>
      <n-button type="primary" size="small" @click="addHurt" round>
        <template #icon><n-icon>
            <AddIcon />
          </n-icon></template>
        新增动作
      </n-button>
    </div>

    <!-- 动作列表 -->
    <n-card class="premium-card table-card">
      <n-data-table :columns="columns" :data="body.hurtArr" :row-key="(row: any) => row" size="small" :max-height="500"
        class="premium-table" />
    </n-card>

    <!-- 详情编辑抽屉 -->
    <n-drawer v-model:show="drawerVisible" :width="560" placement="right" class="premium-drawer">
      <n-drawer-content :title="`编辑动作: ${editingHurt?.cn || editingHurt?.imgLabel || '未命名'}`" closable>
        <template #header-extra>
          <n-tag type="warning" size="small" v-if="editingHurt?.imgLabel" round>Label: {{ editingHurt.imgLabel
          }}</n-tag>
        </template>

        <n-form v-if="editingHurt" label-placement="top" size="medium">
          <n-tabs type="line" animated justify-content="space-evenly" class="premium-tabs">
            <!-- Tab 1: 基础 Basic -->
            <n-tab-pane name="basic">
              <template #tab>
                <n-space align="center" :size="4">
                  <n-icon :component="InformationCircleOutline" />基础
                </n-space>
              </template>
              <div class="tab-pane-content">
                <n-grid :cols="2" :x-gap="12" :y-gap="12">
                  <n-gi v-for="meta in ATTACK_METAS.basic" :key="meta.key">
                    <MetaFormItem :meta="meta" v-model:modelValue="editingHurt[meta.key]" :show-label="true" />
                  </n-gi>
                </n-grid>
              </div>
            </n-tab-pane>

            <!-- Tab 2: 伤害 Damage -->
            <n-tab-pane name="hurt">
              <template #tab>
                <n-space align="center" :size="4">
                  <n-icon :component="FlameOutline" />数值
                </n-space>
              </template>
              <div class="tab-pane-content">
                <n-grid :cols="2" :x-gap="12" :y-gap="12">
                  <n-gi v-for="m in ATTACK_METAS.hurt" :key="m.key">
                    <MetaFormItem :meta="m" v-model:modelValue="editingHurt[m.key]" :show-label="true" />
                  </n-gi>
                </n-grid>
              </div>
            </n-tab-pane>

            <!-- Tab 3: 判定 Hitbox -->
            <n-tab-pane name="hitbox">
              <template #tab>
                <n-space align="center" :size="4">
                  <n-icon :component="ScanOutline" />判定
                </n-space>
              </template>
              <div class="tab-pane-content">
                <n-card embedded :bordered="false" class="inner-card">
                  <template #header>
                    <div class="inner-card-header">
                      <span>碰撞判定框 (grapRect)</span>
                    </div>
                  </template>
                  <div v-if="!editingHurt.grapRect">
                    <n-button dashed block @click="editingHurt.grapRect = { x: 0, y: 0, width: 0, height: 0 }"
                      class="dashed-btn">
                      <template #icon><n-icon>
                          <AddIcon />
                        </n-icon></template>
                      启用图形判定
                    </n-button>
                  </div>
                  <div v-else class="active-rect-container">
                    <RectInput v-model="editingHurt.grapRect" />
                    <n-button size="tiny" type="error" quaternary @click="editingHurt.grapRect = null"
                      class="remove-btn">
                      <template #icon><n-icon>
                          <TrashIcon />
                        </n-icon></template>
                      移除判定框
                    </n-button>
                  </div>
                </n-card>
                <div class="mt-6">
                  <n-grid :cols="2" :x-gap="12" :y-gap="12">
                    <n-gi v-for="meta in ATTACK_METAS.range" :key="meta.key">
                      <MetaFormItem :meta="meta" v-model:modelValue="editingHurt[meta.key]" :show-label="true" />
                    </n-gi>
                  </n-grid>
                </div>
              </div>
            </n-tab-pane>

            <!-- Tab 4: 物理 Physics -->
            <n-tab-pane name="physics">
              <template #tab>
                <n-space align="center" :size="4">
                  <n-icon :component="RocketOutline" />物理
                </n-space>
              </template>
              <div class="tab-pane-content">
                <n-grid :cols="2" :x-gap="12" :y-gap="12">
                  <n-gi v-for="meta in ATTACK_METAS.physics" :key="meta.key">
                    <MetaFormItem :meta="meta" v-model:modelValue="editingHurt[meta.key]" :show-label="true" />
                  </n-gi>
                </n-grid>
              </div>
            </n-tab-pane>

            <!-- Tab 5: 逻辑 Logic -->
            <n-tab-pane name="logic">
              <template #tab>
                <n-space align="center" :size="4">
                  <n-icon :component="ExtensionPuzzleOutline" />逻辑
                </n-space>
              </template>
              <div class="tab-pane-content">
                <n-grid :cols="2" :x-gap="12" :y-gap="12">
                  <n-gi v-for="meta in ATTACK_METAS.logic" :key="meta.key">
                    <MetaFormItem :meta="meta" v-model:modelValue="editingHurt[meta.key]" :show-label="true" />
                  </n-gi>
                </n-grid>
              </div>
            </n-tab-pane>
          </n-tabs>
        </n-form>
      </n-drawer-content>
    </n-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref, h } from 'vue';
import { NButton, NTag, NSpace, useDialog, NIcon } from 'naive-ui';
import {
  Add as AddIcon,
  Trash as TrashIcon,
  FlashOutline,
  InformationCircleOutline,
  FlameOutline,
  ScanOutline,
  RocketOutline,
  ExtensionPuzzleOutline,
  CreateOutline
} from '@vicons/ionicons5';
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
    title: '确认删除动作',
    content: `确定要永久删除攻击动作 "${row.cn || row.imgLabel}" 吗？此操作不可撤销。`,
    positiveText: '确认删除',
    negativeText: '手滑了',
    onPositiveClick: () => {
      body.value?.hurtArr.splice(index, 1);
    }
  });
};

const columns = [
  {
    title: '名称',
    key: 'cn',
    width: 140,
    render: (row: any) => h('div', { class: 'action-name' }, [
      h(NIcon, { component: CreateOutline, size: 14, class: 'mr-1 opacity-50' }),
      row.cn || h('em', { style: 'color: #777' }, '未命名')
    ])
  },
  {
    title: '标签 (Label)',
    key: 'imgLabel',
    width: 140,
    render: (row: any) => h(NTag, { size: 'small', type: 'info', bordered: false, round: true }, { default: () => row.imgLabel || '?' })
  },
  {
    title: '额外属性',
    key: 'tags',
    render: (row: any) => {
      const tags = [];
      if (row.bulletLabel) tags.push(h(NTag, { size: 'tiny', type: 'warning', style: 'margin-right: 6px' }, { default: () => '远程/子弹' }));
      if (row.skillArr?.length) tags.push(h(NTag, { size: 'tiny', type: 'success' }, { default: () => `${row.skillArr.length} 个子动作` }));
      return tags.length ? h('div', tags) : h('span', { style: 'opacity: 0.3; font-size: 11px' }, '无额外扩展');
    }
  },
  {
    title: '操作',
    key: 'actions',
    width: 150,
    render(row: any, index: number) {
      return h(NSpace, null, {
        default: () => [
          h(NButton, { size: 'tiny', strong: true, secondary: true, type: 'info', onClick: () => openHurtDrawer(row) }, { default: () => '配置' }),
          h(NButton, { size: 'tiny', strong: true, quaternary: true, type: 'error', onClick: () => handleRemove(row, index) }, { default: () => '移除' })
        ]
      });
    }
  }
];

</script>

<style scoped>
.attack-section {
  padding-bottom: 24px;
}

.header-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.header-title {
  display: flex;
  align-items: center;
  gap: 10px;
}

.table-card {
  border-radius: 16px !important;
  overflow: hidden;
}

.premium-table {
  background: transparent !important;
}

.tab-pane-content {
  padding: 16px 4px;
}

.inner-card {
  border-radius: 12px !important;
  border: 1px solid rgba(255, 255, 255, 0.04) !important;
  background: rgba(255, 255, 255, 0.01) !important;
}

.inner-card-header {
  font-size: 13px;
  font-weight: 700;
  opacity: 0.7;
}

.dashed-btn {
  height: 48px;
  border-radius: 10px;
}

.active-rect-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.remove-btn {
  align-self: flex-end;
  opacity: 0.6;
}

.mt-6 {
  margin-top: 1.5rem;
}

.mr-1 {
  margin-right: 4px;
}

.opacity-50 {
  opacity: 0.5;
}

.action-name {
  display: flex;
  align-items: center;
  font-weight: 600;
}
</style>
