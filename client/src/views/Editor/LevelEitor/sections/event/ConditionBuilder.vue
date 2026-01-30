<!-- client/src/views/Editor/LevelEitor/sections/event/ConditionBuilder.vue -->
<template>
  <n-space vertical>
    <!-- 第一行：类型选择与模式切换 -->
    <n-input-group>
      <n-input-group-label style="width: 100px">触发类型</n-input-group-label>
      <n-select 
        v-model:value="state.type" 
        :options="CONDITION_TYPES" 
        filterable
        placeholder="选择条件类型..."
        @update:value="onTypeChange"
      />
      <n-button @click="isManual = !isManual" :type="isManual ? 'warning' : 'default'">
        <template #icon>
          <n-icon><CodeWorkingOutline v-if="isManual" /><SettingsOutline v-else /></n-icon>
        </template>
        {{ isManual ? '返回配置' : '手动编辑' }}
      </n-button>
    </n-input-group>

    <!-- 说明卡片：无论是配置还是手动模式都显示，方便参考 -->
    <n-alert v-if="currentMeta" type="info" :show-icon="false" dense class="meta-alert">
      <div class="meta-desc">
        <n-text strong>说明：</n-text>{{ currentMeta.desc }}
      </div>
      <div v-if="currentMeta.example" class="meta-example">
        <n-text depth="3">格式示例：</n-text>
        <code class="code-tag">{{ currentMeta.example }}</code>
      </div>
    </n-alert>

    <!-- 可视化表单区域：仅在非手动模式显示 -->
    <div v-if="!isManual" class="builder-form-area">
      
      <!-- 数量比较类 -->
      <n-space v-if="isCompareType" align="center">
        <n-select v-model:value="state.op" :options="OPERATOR_OPTIONS" style="width: 120px" @update:value="updateXml" />
        <n-input-number v-model:value="state.compareValue" :min="0" @update:value="updateXml" />
      </n-space>

      <!-- 区域碰撞 -->
      <n-grid v-else-if="state.type === 'hitMapRect'" :cols="2" :x-gap="12">
        <n-gi>
          <n-input v-model:value="state.rectId" placeholder="区域ID (rectId)" @update:value="updateXml">
            <template #prefix><n-text depth="3">区域</n-text></template>
          </n-input>
        </n-gi>
        <n-gi>
          <n-input v-model:value="state.bodyId" placeholder="单位ID (p1)" @update:value="updateXml">
            <template #prefix><n-text depth="3">单位</n-text></template>
          </n-input>
        </n-gi>
      </n-grid>

      <!-- 掉落物拾取检测 -->
      <n-space v-else-if="state.type === 'dropBodyLess'" align="center">
      <n-text>场上的</n-text>
      <n-input 
          v-model:value="state.typeId" 
          placeholder="掉落物ID (如 addCoin_task)" 
          style="width: 200px"
          @update:value="updateXml" 
      />
      <n-text>数量少于</n-text>
      <n-input-number 
          v-model:value="state.value" 
          :min="1" 
          style="width: 100px"
          @update:value="updateXml" 
      />
      </n-space>

      <!-- 对话结束 -->
      <n-space v-else-if="state.type === 'say'" align="center">
        <n-tag type="info" size="small">对话结束判定</n-tag>
        <n-input v-model:value="state.value" placeholder="对话ID (s1)" @update:value="updateXml" />
      </n-space>

      <!-- 单位间距 -->
      <n-space v-else-if="state.type === 'bodyGap'" vertical>
        <n-space align="center">
          <n-select v-model:value="state.op" :options="OPERATOR_OPTIONS" style="width: 120px" @update:value="updateXml" />
          <n-input-number v-model:value="state.compareValue" @update:value="updateXml" />
        </n-space>
        <n-grid :cols="2" :x-gap="12">
          <n-gi>
            <n-input v-model:value="state.bodyId" placeholder="单位A ID" @update:value="updateXml" />
          </n-gi>
          <n-gi>
            <n-input v-model:value="state.bodyEvent" placeholder="单位B ID" @update:value="updateXml" />
          </n-gi>
        </n-grid>
      </n-space>

      <!-- 默认/通用 -->
      <n-grid v-else :cols="3" :x-gap="8">
        <n-gi><n-input v-model:value="state.typeId" placeholder="typeId" @update:value="updateXml" /></n-gi>
        <n-gi><n-input v-model:value="state.value" placeholder="value" @update:value="updateXml" /></n-gi>
        <n-gi><n-input v-model:value="state.valueId" placeholder="valueId" @update:value="updateXml" /></n-gi>
      </n-grid>
    </div>

    <!-- 原始代码输入：手动模式下高亮 -->
    <n-input-group>
      <n-input-group-label size="small" :style="{color: isManual ? '#f0a020' : '#666'}">
        {{ isManual ? '🔧 代码编辑' : '📝 代码预览' }}
      </n-input-group-label>
      <n-input 
        v-model:value="rawXmlText" 
        :readonly="!isManual" 
        size="small" 
        :placeholder="isManual ? '请输入 xmlText 字符串' : '选择类型以生成代码'"
        :status="isManual ? 'warning' : undefined"
        @update:value="onManualInput"
      />
    </n-input-group>
  </n-space>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue';
import { CONDITION_TYPES, OPERATOR_OPTIONS, CONDITION_METAS } from '../../config';
import { SettingsOutline, CodeWorkingOutline } from '@vicons/ionicons5';

const props = defineProps<{ modelValue: string }>();
const emit = defineEmits(['update:modelValue']);

const isManual = ref(false);
const rawXmlText = ref(props.modelValue || '');

// 查找当前元数据用于显示说明
const currentMeta = computed(() => 
  CONDITION_METAS.find(m => m.value === state.type)
);

const state = reactive({
  type: '',
  typeId: '',
  value: '',
  valueId: '',
  compareValue: 0,
  compareType: '=',
  op: 'equal', 
  bodyId: '',
  bodyEvent: '',
  rectId: '',
  eventId: '',
});

const isCompareType = computed(() => {
  return ['enemyNumber', 'mineNumber', 'number', 'liveEnemyNumber', 'enemyNumberFast', 'frontEnemyNumber', 'rightEnemyNumber', 'weNumber'].includes(state.type);
});

// 解析逻辑 (逻辑不变，保持之前的实现)
const parseXml = (text: string) => {
  if (!text) return;
  const parts = text.split(';');
  const firstPart = parts[0] || '';
  let [type, val] = firstPart.split(':');
  if (type == null) type = '';
  if (val == null) val = '';
  
  state.type = type;
  
  const parseCompare = (str: string) => {
    if (str.includes('less_')) {
      state.op = 'less';
      state.compareValue = Number(str.split('_')[1]);
    } else if (str.includes('greater_')) {
      state.op = 'greater';
      state.compareValue = Number(str.split('_')[1]);
    } else {
      state.op = 'equal';
      state.compareValue = Number(str);
    }
  };

  if (isCompareType.value) {
    parseCompare(val);
  } else if (type === 'hitMapRect') {
    state.rectId = val;
    state.bodyId = parts[1] || '';
  } else if (type === 'say') {
    state.typeId = val;
    state.value = parts[1] || '';
  } else if (['affterDoLevelEvent', 'affterDelLevelEvent'].includes(type)) {
    state.eventId = val;
  } else if (type === 'bodyGap') {
    parseCompare(val);
    state.bodyId = parts[1] || '';
    state.bodyEvent = parts[2] || '';
  } else if (type === 'dropBodyLess') {
    state.typeId = val;
    state.value = parts[1] || '1';
  } else {
    state.typeId = val;
    state.value = parts[1] || '';
    state.valueId = parts[2] || '';
  }
};

const updateXml = () => {
  if (isManual.value) return;

  let text = '';
  const getOpStr = () => {
    if (state.op === 'less') return `less_${state.compareValue}`;
    if (state.op === 'greater') return `greater_${state.compareValue}`;
    return `${state.compareValue}`;
  };

  if (isCompareType.value) {
    text = `${state.type}:${getOpStr()}`;
  } else if (state.type === 'hitMapRect') {
    text = `hitMapRect:${state.rectId};${state.bodyId}`;
  } else if (state.type === 'say') {
    text = `say:listOver;${state.value}`;
  } else if (['affterDoLevelEvent', 'affterDelLevelEvent'].includes(state.type)) {
    text = `${state.type}:${state.eventId}`;
  } else if (state.type === 'bodyGap') {
    text = `bodyGap:${getOpStr()};${state.bodyId};${state.bodyEvent}`;
  } else if (state.type === 'dropBodyLess') {
    text = `dropBodyLess:${state.typeId};${state.value}`;
  } else {
    text = `${state.type}:${state.typeId}`;
    if (state.value) text += `;${state.value}`;
    if (state.valueId) text += `;${state.valueId}`;
  }

  rawXmlText.value = text;
  emit('update:modelValue', text);
};

const onTypeChange = () => {
  if (state.type === 'say') state.typeId = 'listOver';
  updateXml();
};

const onManualInput = (val: string) => {
  rawXmlText.value = val;
  emit('update:modelValue', val);
  // 手动输入时也尝试解析，以便用户切回配置模式时，表单是对应的
  parseXml(val);
};

parseXml(props.modelValue);

watch(() => props.modelValue, (newVal) => {
  if (newVal !== rawXmlText.value) {
    rawXmlText.value = newVal || '';
    parseXml(rawXmlText.value);
  }
});
</script>

<style scoped>
.meta-alert {
  margin: 4px 0;
}
.meta-desc {
  font-size: 13px;
  line-height: 1.5;
}
.meta-example {
  margin-top: 4px;
  font-size: 12px;
}
.code-tag {
  background: rgba(0,0,0,0.05);
  padding: 2px 6px;
  border-radius: 4px;
  font-family: monospace;
}
.builder-form-area {
  padding: 16px;
  border: 1px dashed #e0e0e0;
  border-radius: 8px;
}
</style>