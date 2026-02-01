<!-- client/src/views/Editor/SayEditor/sections/SayContentSection.vue -->
<template>
  <div v-if="sayList">
    <div class="flex justify-between items-center mb-4">
      <n-h3 prefix="bar">对话行管理</n-h3>
      <n-button type="primary" @click="handleAddSayRow">
        <template #icon><n-icon><AddOutline /></n-icon></template>
        添加对话行
      </n-button>
    </div>

    <n-list bordered style="margin-top: 10px;">
      <draggable 
        v-model="sayList.arr" 
        item-key="index" 
        handle=".drag-handle"
        animation="300"
      >
        <template #item="{ element: row, index: rIdx }">
          <n-list-item :id="`sayRow-${rIdx}`">
            <template #prefix>
              <!-- 拖拽手柄 -->
              <n-icon class="drag-handle"><ReorderFourOutline /></n-icon>
            </template>

            <!-- 默认折叠：default-expanded-names 为空即可 -->
            <n-collapse :default-expanded-names="[]" arrow-placement="right">
              <n-collapse-item :name="rIdx">
                <!-- 标题槽：显示 Target 和内容预览 -->
                <template #header>
                  <div class="header-content">
                    <span class="row-index">#{{ String(rIdx + 1).padStart(2, '0') }}</span>
                    <n-tag :bordered="false" type="info" size="small">
                      {{ row.target || '无对象' }}
                    </n-tag>
                    <div v-if="row.pointer">
                      <n-tag :bordered="false" type="warning" size="small" style="margin-left: 4px;">
                        {{ row.pointer }}
                      </n-tag>
                    </div>
                    <span class="preview-text">
                      {{ row.contentArr[0] || '(内容为空)' }}
                    </span>
                  </div>
                </template>

                <!-- 操作槽 -->
                <template #header-extra>
                  <div @click.stop> <!-- 阻止点击删除时触发折叠 -->
                    <n-popconfirm
                      @positive-click="sayList.arr.splice(rIdx, 1)"
                      positive-text="确定"
                      negative-text="取消"
                    >
                      <template #trigger>
                        <n-button quaternary circle type="error" size="tiny">
                          <template #icon><n-icon><TrashOutline /></n-icon></template>
                        </n-button>
                      </template>
                      确定要删除第 {{ rIdx + 1 }} 行对话吗？
                    </n-popconfirm>
                  </div>
                </template>

                <!-- 展开后的详细编辑区 -->
                <div class="editor-detail">
                  <n-grid :cols="4" :x-gap="12" :y-gap="6">
                    <n-gi v-for="meta in SAY_ITEM_METAS" :key="meta.key">
                      <div :id="`sayRow-${rIdx}-${meta.key}`">
                        <MetaFormItem 
                          :meta="meta" 
                          v-model:modelValue="row[meta.key]" 
                          :show-label="true"
                        />
                      </div>
                    </n-gi>

                    <n-gi :span="4">
                      <span>内容文本 (随机抽取一条)</span>
                      
                      <div v-for="(_, cIdx) in row.contentArr" :key="cIdx" class="content-input-row">
                        <n-input 
                          v-model:value="row.contentArr[cIdx]" 
                          type="textarea" 
                          :autosize="{ minRows: 1 }" 
                          placeholder="输入对话内容..."
                        />
                        <n-popconfirm 
                          v-if="row.contentArr.length > 1" 
                          @positive-click="row.contentArr.splice(cIdx, 1)"
                        >
                          <template #trigger>
                            <n-button quaternary circle type="error" size="tiny">
                              <template #icon><n-icon><TrashOutline /></n-icon></template>
                            </n-button>
                          </template>
                          删除此条？
                        </n-popconfirm>
                      </div>
                      
                      <n-button size="tiny" dashed block @click="row.contentArr.push('')" style="margin-top: 8px;">
                        + 增加备选文本 (不推荐)
                      </n-button>
                    </n-gi>
                  </n-grid>
                </div>
              </n-collapse-item>
            </n-collapse>
          </n-list-item>
        </template>
      </draggable>
    </n-list>
  </div>
</template>

<script setup lang="ts">
import draggable from 'vuedraggable';
import { useSayState } from '../hooks/useSayState';
import { SAY_ITEM_METAS } from '../config';
import MetaFormItem from '../../../components/MetaFormItem.vue';
import { AddOutline, ReorderFourOutline, TrashOutline } from '@vicons/ionicons5';
import { SayDefine } from '../../../../models/say/SayDefine';
import { useSectionNavigator } from '../../../../hooks/useSectionNavigator';

const { selectedSayList: sayList } = useSayState();

useSectionNavigator({
  module: 'say',
  tab: 'list',
  list: () => sayList.value?.arr || [],
  onFound: (item) => {
    const idx = sayList.value?.arr.indexOf(item);
    const el = document.getElementById(`sayRow-${idx}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
});

const handleAddSayRow = () => {
  sayList.value?.arr.push(new SayDefine());
};
</script>

<style scoped>
.drag-handle { 
  cursor: grab; 
  font-size: 20px; 
  opacity: 0.5;
  transition: opacity 0.3s;
}
.drag-handle:hover {
  opacity: 1;
}

.header-content {
  display: flex;
  align-items: center;
  flex: 1;
  padding-right: 12px;
}

/* 行数显示样式 */
.row-index {
  font-family: 'Fira Code', 'Courier New', monospace;
  font-weight: 600;
  font-size: 13px;
  color: var(--n-primary-color);
  margin-right: 6px;
  min-width: 20px;
  user-select: none;
}

.preview-text {
  flex: 1;
  font-size: 13px;
  color: var(--n-text-color-3);
  margin-left: 5px;
}

.editor-detail {
  padding: 12px;
  border-radius: 4px;
  background-color: var(--n-card-color);
  border: 1px solid var(--n-border-color);
  margin-top: 4px;
}

.content-input-row { 
  display: flex; 
  gap: 8px; 
  align-items: center; 
  margin: 8px 0;
}

/* 深度选择器微调折叠面板样式 */
:deep(.n-collapse-item__header) {
  padding: 8px 0 !important;
}
:deep(.n-collapse-item__content-inner) {
  padding-top: 0 !important;
}
</style>