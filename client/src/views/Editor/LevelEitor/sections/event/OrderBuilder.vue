<!-- client/src/views/Editor/LevelEitor/sections/event/OrderBuilder.vue -->
<template>
  <div class="order-card" :class="{ 'is-manual': isManual }">
    <!-- 顶部操作行 -->
    <div class="order-header">
      <n-space align="center" :size="12">
        <n-badge :value="index + 1" color="#999" />
        <n-select 
          v-model:value="selectedOrderValue" 
          :options="orderOptions" 
          size="small"
          placeholder="选择指令类型"
          style="width: 180px"
          @update:value="onTypeChange"
        />
        <n-tag v-if="currentMeta" size="small" :type="getGroupType(currentMeta.group)" quaternary>
          {{ currentMeta.group }}
        </n-tag>
      </n-space>

      <n-space>
        <n-button quaternary circle size="small" @click="isManual = !isManual" :type="isManual ? 'warning' : 'default'">
          <template #icon><n-icon><CodeWorkingOutline /></n-icon></template>
        </n-button>
        <n-button quaternary circle size="small" type="error" @click="$emit('delete')">
          <template #icon><n-icon><TrashOutline /></n-icon></template>
        </n-button>
      </n-space>
    </div>

    <!-- 指令参数表单区 -->
    <div class="order-body">
      <!-- 自动填充模式 -->
      <div v-if="!isManual && currentMeta" class="fields-grid">
        <n-grid :cols="2" :x-gap="12" :y-gap="8">
          <n-gi v-for="field in currentMeta.fields" :key="field.key">
            <div class="field-item">
              <span class="field-label">{{ field.label }}</span>
              <!-- 下拉选择类型 -->
              <n-select 
                v-if="field.type === 'select'"
                v-model:value="fieldsData[field.key]" 
                :options="field.options"
                :render-label="renderOptionLabel"
                size="small"
                filterable
                clearable
                tag
                :placeholder="field.placeholder"
                @update:value="syncToRaw"
              />

              <!-- 默认文本输入类型 -->
              <n-input 
                v-else
                v-model:value="fieldsData[field.key]" 
                size="small"
                :placeholder="field.placeholder"
                @update:value="syncToRaw"
              />
              
              <div v-if="field.type === 'select' && getFieldDesc(field)" class="field-tip">
                {{ getFieldDesc(field) }}
              </div>
            </div>
          </n-gi>
        </n-grid>
      </div>

      <!-- 手动代码模式 -->
      <div v-if="isManual" class="manual-area">
        <n-input 
          v-model:value="localXmlText" 
          type="textarea"
          :autosize="{ minRows: 1, maxRows: 3 }"
          placeholder="请输入指令原始字符串..."
          @update:value="onManualInput"
        />
      </div>

      <!-- 无选择占位 -->
      <n-empty v-if="!currentMeta && !isManual" size="small" description="请选择指令类型" />
    </div>

    <!-- 底部说明栏 -->
    <div v-if="currentMeta" class="order-footer">
      <n-text depth="3" class="desc-text">
        <n-icon><InformationCircleOutline style="vertical-align: middle; margin-right: 4px;" /></n-icon>
        {{ currentMeta.desc }}
      </n-text>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch, h } from 'vue';
import { ORDER_METAS } from '../../config';
import { TrashOutline, CodeWorkingOutline, InformationCircleOutline } from '@vicons/ionicons5';

const props = defineProps<{ modelValue: string, index: number }>();
const emit = defineEmits(['update:modelValue', 'delete']);

const isManual = ref(false);
const localXmlText = ref(props.modelValue);
const selectedOrderValue = ref<string | null>(null);
const fieldsData = reactive<any>({});

const orderOptions = ORDER_METAS.map(m => ({ label: m.label, value: m.value, group: m.group }));

const currentMeta = computed(() => ORDER_METAS.find(m => m.value === selectedOrderValue.value));

const getGroupType = (group: string) => {
  const map: any = {
    '生成': 'success',
    '对话': 'info',
    '关卡控制': 'warning',
    '单位属性': 'error'
  };
  return map[group] || 'default';
};

// 解析原始字符串并填充 UI
const parseRaw = (text: string) => {
  if (!text || text.trim() === '') {
    isManual.value = false;
    selectedOrderValue.value = null;
    return;
  }

  const meta = ORDER_METAS.find(m => {
    // 检查一级匹配 (如 createUnit:, body:)
    const primaryMatch = text.startsWith(m.value + ':') || text.startsWith(m.value + ';');
    if (primaryMatch) return true;

    // 检查二级匹配 (遍历 fields 里的 select options)
    return m.fields.some(field => {
      if (field.type === 'select' && field.options) {
        return field.options.some(opt => 
          text.startsWith(opt.value + ':') || text.startsWith(opt.value + ';')
        );
      }
      return false;
    });
  });

  if (meta) {
    selectedOrderValue.value = meta.value;
    // 使用 meta 自带的解析器处理
    const parsed = meta.parse(text);
    // 清空旧数据并合并新数据
    Object.keys(fieldsData).forEach(key => delete fieldsData[key]);
    Object.assign(fieldsData, parsed);
    isManual.value = false;
  } else {
    // 确实不认识这个指令
    isManual.value = true;
  }
};

// 从 UI 同步到 Raw 字符串
const syncToRaw = () => {
  if (currentMeta.value) {
    const newText = currentMeta.value.build(fieldsData);
    localXmlText.value = newText;
    emit('update:modelValue', newText);
  }
};

const onTypeChange = () => {
  // 切换指令类型时重置数据
  Object.keys(fieldsData).forEach(key => delete fieldsData[key]);
  syncToRaw();
};

const onManualInput = (val: string) => {
  emit('update:modelValue', val);
  // 尝试在手动输入时解析回 UI
  parseRaw(val);
};

// 渲染下拉框标签，同时显示说明（如果选项有的话）
const renderOptionLabel = (option: any) => {
  return h('div', [
    h('div', option.label),
    option.desc ? h('div', { style: 'font-size: 11px; opacity: 0.6;' }, option.desc) : null
  ]);
};

// 获取当前选中项的详细描述
const getFieldDesc = (field: any) => {
  const currentVal = fieldsData[field.key];
  if (!currentVal || !field.options) return '';
  
  // 在嵌套的 group 中查找对应的选项
  let found: any = null;
  field.options.forEach((opt: any) => {
    if (opt.children) {
      const child = opt.children.find((c: any) => c.value === currentVal);
      if (child) found = child;
    } else if (opt.value === currentVal) {
      found = opt;
    }
  });
  return found?.desc || '';
};

// 初始化
parseRaw(props.modelValue);

watch(() => props.modelValue, (v) => {
  if (v !== localXmlText.value) {
    localXmlText.value = v;
    parseRaw(v);
  }
});
</script>

<style scoped>
.order-card {
  border: 1px solid #efeff5;
  border-radius: 8px;
  margin-bottom: 12px;
  transition: all 0.3s ease;
  overflow: hidden;
}

.order-card:hover {
  border-color: #18a058;
  box-shadow: 0 2px 8px rgba(24, 160, 88, 0.1);
}

.order-card.is-manual {
  border-color: #f0a020;
}

.order-header {
  padding: 8px 12px;
  border-bottom: 1px solid #efeff5;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.order-body {
  padding: 12px;
}

.fields-grid {
  width: 100%;
}

.field-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.field-label {
  font-size: 12px;
  color: #888;
  font-weight: 500;
}
.field-tip {
  font-size: 11px;
  color: #67b88d; /* 绿色提示文字 */
  margin-top: 2px;
  line-height: 1.2;
}

.order-footer {
  padding: 6px 12px;
  border-top: 1px dashed #efeff5;
}

.desc-text {
  font-size: 12px;
  font-style: italic;
}

.manual-area {
  padding: 4px 0;
}
</style>