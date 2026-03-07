<!-- client/src/views/Editor/LevelEditor/sections/event/OrderBuilder.vue -->
<template>
  <div class="order-card" :class="{ 'is-manual': isManual }">
    <!-- 顶部操作行 -->
    <div class="order-header">
      <n-space align="center" :size="12">
        <n-badge :value="index + 1" color="#999" />
        <!-- 分类选择 -->
        <n-select
          v-model:value="selectedCategory"
          :options="categoryOptions"
          size="small"
          placeholder="选择分类"
          style="width: 140px"
          @update:value="onCategoryChange"
        />
        <!-- 指令选择 -->
        <n-select
          v-model:value="selectedOrderValue"
          :options="filteredOrderOptions"
          size="small"
          placeholder="选择指令"
          style="width: 180px"
          :disabled="!selectedCategory"
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
          <!-- 有预定义字段的指令（复杂指令） -->
          <template v-if="currentMeta.fields && currentMeta.fields.length > 0">
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
          </template>

          <!-- 无预定义字段的简单指令 - 显示默认参数输入 -->
          <template v-else>
            <n-gi :span="2">
              <div class="field-item">
                <span class="field-label">参数</span>
                <n-input
                  v-model:value="fieldsData.params"
                  size="small"
                  :placeholder="getParamPlaceholder(currentMeta.value)"
                  @update:value="syncToRaw"
                />
                <div class="field-tip">{{ currentMeta.desc }}</div>
              </div>
            </n-gi>
          </template>
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
const selectedCategory = ref<string | null>(null);
const fieldsData = reactive<any>({});

// 分类选项
const categoryOptions = [
  { label: '图像效果', value: '图像效果' },
  { label: '系统操作', value: '系统操作' },
  { label: '群体控制', value: '群体控制' },
  { label: '单位操作', value: '单位操作' },
  { label: '关卡控制', value: '关卡控制' }
];

// 所有指令选项（扁平化）
const orderOptions = ORDER_METAS.map(m => ({ label: m.label, value: m.value, group: m.group }));

// 根据选中分类过滤指令选项
const filteredOrderOptions = computed(() => {
  if (!selectedCategory.value) return [];
  return orderOptions.filter(o => o.group === selectedCategory.value);
});

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

// 获取参数输入占位提示
const getParamPlaceholder = (orderValue: string): string => {
  const placeholders: Record<string, string> = {
    'createUnit': '请输入发兵组ID（如 enemy1, we1）',
    'createDrop': '请输入掉落配置ID',
    'createEffect': '特效路径;x,y;图层名',
    'addWeather': '天气类型(rain/heat);强度(0-10);持续时间',
    'sceneScale': '缩放倍率（如 0.5）',
    'sceneMc:show': '层级ID;子元件名',
    'sceneMc:hide': '层级ID;子元件名',
    'addNormalEffect': '特效路径;x,y;图层名',
    'heroEverParasitic': '目标单位ID',
    'followPoint': '区域ID（如 r1）',
    'movePoint': 'x坐标,y坐标（如 466,1180）',
    'lockShootXY': 'x坐标,y坐标',
    'addSkill': '技能ID',
    'addSkillLock': '技能ID',
    'addState': '状态ID（如 godHiding_things）',
    'moveSpeedMul': '倍率（如 0.3）',
    'changeHead': '头部素材名（如 WenJie:head）',
    'addEffectInBody': '特效路径',
    'showPointer': '区域ID',
    'shake': '震动幅度名',
    'cameraFocus': '目标单位ID'
  };
  return placeholders[orderValue] || '请输入参数，多个参数用分号分隔';
};

// 解析原始字符串并填充 UI
const parseRaw = (text: string) => {
  if (!text || text.trim() === '') {
    isManual.value = false;
    selectedOrderValue.value = null;
    selectedCategory.value = null;
    return;
  }

  const meta = ORDER_METAS.find(m => {
    // 检查一级匹配 (如 createUnit:, body:)
    const primaryMatch = text.startsWith(m.value + ':') || text.startsWith(m.value + ';');
    if (primaryMatch) return true;

    // 检查二级匹配 (遍历 fields 里的 select options)
    if (!m.fields || !Array.isArray(m.fields)) return false;
    return m.fields.some((field: any) => {
      if (field.type === 'select' && field.options) {
        return field.options.some((opt: any) =>
          text.startsWith(opt.value + ':') || text.startsWith(opt.value + ';')
        );
      }
      return false;
    });
  });

  if (meta) {
    selectedOrderValue.value = meta.value;
    selectedCategory.value = meta.group;
    // 清空旧数据
    Object.keys(fieldsData).forEach(key => delete fieldsData[key]);
    // 使用 meta 自带的解析器处理，如果不存在则使用默认解析
    if (typeof meta.parse === 'function') {
      const parsed = meta.parse(text);
      Object.assign(fieldsData, parsed);
    } else {
      // 默认解析：提取参数部分（作为单个字符串）
      const prefix = meta.value + ':';
      const prefix2 = meta.value + ';';
      let params = '';
      if (text.startsWith(prefix)) {
        params = text.substring(prefix.length);
      } else if (text.startsWith(prefix2)) {
        params = text.substring(prefix2.length);
      }
      // 简单指令直接使用 params 字段存储完整参数
      fieldsData.params = params;
    }
    isManual.value = false;
  } else {
    // 确实不认识这个指令
    isManual.value = true;
  }
};

// 从 UI 同步到 Raw 字符串
const syncToRaw = () => {
  if (currentMeta.value) {
    let newText: string;
    if (typeof currentMeta.value.build === 'function') {
      newText = currentMeta.value.build(fieldsData);
    } else {
      // 默认构建：指令名:参数
      const params = fieldsData.params || '';
      newText = params ? `${currentMeta.value.value}:${params}` : `${currentMeta.value.value}:`;
    }
    localXmlText.value = newText;
    emit('update:modelValue', newText);
  }
};

const onCategoryChange = () => {
  // 切换分类时重置指令选择
  selectedOrderValue.value = null;
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
  transition: all 0.3 ease;
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
