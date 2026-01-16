<template>
  <!-- 使用相对布局充满父容器 -->
  <div class="module-container">
    <n-layout has-sider>
      
      <!-- 第二层侧边栏：资源列表 -->
      <n-layout-sider
        bordered
        collapse-mode="width"
        :collapsed-width="0"
        :width="240"
        show-trigger="bar"
        content-style="padding: 12px; display: flex; flex-direction: column; gap: 12px; overflow: hidden"
      >
        <n-button type="primary" block @click="handleAddPng">
          + 新增图片资源
        </n-button>
        
        <n-scrollbar>
          <n-menu
            :options="menuOptions"
            :value="selectedIndex?.toString()"
            @update:value="handleMenuClick"
          />
        </n-scrollbar>
      </n-layout-sider>

      <!-- 主内容区：编辑 + XML 预览 -->
      <n-layout-content content-style="padding: 24px; display: flex; flex-direction: column; gap: 24px;">
        
        <div v-if="selectedPng" style="flex: 1;">
          <n-grid :cols="24" :x-gap="24">
            <!-- 左侧：表单 -->
            <n-gi :span="15">
              <n-card :title="`资源详情: ${selectedPng.name}`" segmented size="small">
                <template #header-extra>
                  <n-popconfirm @positive-click="confirmDelete">
                    <template #trigger>
                      <n-button type="error" ghost size="small">删除此资源</n-button>
                    </template>
                    确定要彻底删除这个资源吗？此操作不可撤销。
                  </n-popconfirm>
                </template>

                <n-form label-placement="top" :model="selectedPng">
                  <n-grid :cols="2" :x-gap="12">
                    <n-gi v-for="meta in PNG_UI_META" :key="meta.key">
                      <n-form-item :label="meta.label">
                        <n-input-number v-if="meta.type === 'number'" v-model:value="selectedPng[meta.key]" style="width: 100%" />
                        <n-input 
                          v-else 
                          :ref="(el: any) => { if (meta.key === 'name') nameInputRef = el }"
                          v-model:value="selectedPng[meta.key]" 
                          :placeholder="meta.desc" 
                        />
                      </n-form-item>
                    </n-gi>
                  </n-grid>
                </n-form>
              </n-card>
            </n-gi>

            <!-- 右侧：实时预览 -->
            <n-gi :span="9">
              <n-card title="XML 实时预览" size="small" segmented style="height: 100%">
                <template #header-extra>
                  <n-button type="primary" size="tiny" @click="copySingleXml">复制单条</n-button>
                </template>
                <pre class="xml-preview-mini">{{ selectedPng.toXml() }}</pre>
                
                <n-divider title-placement="left">模块汇总</n-divider>
                <n-button type="success" secondary block size="small" @click="copyAllXml">
                  复制整个 father 节点 (共 {{ modStore.pngList.length }} 条)
                </n-button>
              </n-card>
            </n-gi>
          </n-grid>
        </div>

        <n-empty v-else description="请在左侧列表选择资源，或者点击上方按钮新增" style="margin-top: 100px" />
      </n-layout-content>
    </n-layout>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue';
import { useModStore } from '../../store/useModStore';
import { PNG_UI_META } from './configs/pngMeta';
import { useMessage } from 'naive-ui';

const modStore = useModStore();
const message = useMessage();
const selectedIndex = ref<number | null>(null);
const nameInputRef = ref<any>(null); // 用于绑定输入框

// 自动选中第一个逻辑
onMounted(() => {
  if (modStore.pngList.length > 0 && selectedIndex.value === null) {
    selectedIndex.value = 0;
  }
});

// 修改新增逻辑
const handleAddPng = async () => {
  modStore.addPng();
  // 选中最新添加的那个
  selectedIndex.value = modStore.pngList.length - 1;
  
  // 等待 DOM 更新后聚焦到名称输入框
  await nextTick();
  if (nameInputRef.value) {
    nameInputRef.value.focus();
  } else {
    console.warn('未找到 nameInputRef 实例');
  }
};

// 将 Pinia 的列表映射为 Naive UI Menu 的格式
const menuOptions = computed(() => {
  return modStore.pngList.map((png, index) => ({
    label: png.name || `未命名_${index}`,
    key: index.toString()
  }));
});

const selectedPng = computed(() => {
  if (selectedIndex.value === null) return null;
  return modStore.pngList[selectedIndex.value];
});

const handleMenuClick = (key: string) => {
  selectedIndex.value = parseInt(key);
};

// 删除逻辑
const confirmDelete = () => {
  if (selectedIndex.value !== null) {
    modStore.removePng(selectedIndex.value);
    selectedIndex.value = null;
    message.success('资源已删除');
  }
};

// 复制逻辑
const copySingleXml = () => {
  if (selectedPng.value) {
    navigator.clipboard.writeText(selectedPng.value.toXml());
    message.success('单条 XML 已复制');
  }
};

const copyAllXml = () => {
  let xml = '<father name="png" cn="资源">\n';
  modStore.pngList.forEach(png => {
    xml += `  ${png.toXml()}\n`;
  });
  xml += '</father>';
  navigator.clipboard.writeText(xml);
  message.success('汇总 XML 已复制');
};
</script>

<style scoped>
.module-container {
  height: 100%;
  position: relative;
}

.xml-preview-mini {
  background: #101014;
  color: #8abeb7;
  padding: 10px;
  font-size: 11px;
  border-radius: 4px;
  white-space: pre-wrap;
  word-break: break-all;
  font-family: 'Fira Code', monospace;
}

/* 激活菜单项微调 */
:deep(.n-menu-item--selected) {
  background-color: rgba(24, 160, 88, 0.1) !important;
}
</style>