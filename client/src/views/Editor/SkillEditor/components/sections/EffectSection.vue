<!-- src/views/Editor/SkillEditor/components/sections/EffectSection.vue -->
<template>
  <n-space vertical size="large" v-if="selectedSkill">
    <n-card title="核心配置" size="small">
      <n-grid :cols="3" :x-gap="20" :y-gap="12">
        <n-gi v-for="meta in coreMetas" :key="meta.key" :span="meta.key === 'effectType' ? 2 : 1">
          <MetaFormItem 
            v-bind="getProps(meta)"
            :show-label="true" 
            @update:model-value="(val) => handleUpdate(meta.key, val)" 
          />
        </n-gi>
      </n-grid>
    </n-card>
    
    <!-- 已激活的进阶配置 -->
    <n-card v-if="activeOptionalMetas.length > 0" title="进阶数值 (已开启)" size="small" segmented>
      <n-grid :cols="3" :x-gap="20" :y-gap="12">
        <n-gi v-for="meta in activeOptionalMetas" :key="meta.key">
          <div class="optional-item-box">
            <div class="item-header">
              <n-space align="center" :size="4">
                <span class="item-label">{{ meta.label }}</span>
                <!-- 添加一个详情按钮 -->
                <n-popover v-if="meta.desc" trigger="hover" :width="200">
                  <template #trigger>
                    <n-text depth="3" style="cursor: help;">ⓘ</n-text>
                  </template>
                  <div style="font-size: 12px; white-space: pre-line;">{{ meta.desc }}</div>
                </n-popover>
              </n-space>
              
              <n-button text type="error" size="tiny" @click="removeProperty(meta.key)">移除</n-button>
            </div>
            <!-- 避免名称重复 -->
            <MetaFormItem 
              :meta="meta" 
              v-model:modelValue="selectedSkill[meta.key]" 
              :show-label="false" 
            />
          </div>
        </n-gi>
      </n-grid>
    </n-card>
    
    <!-- 添加更多属性的引导 -->
    <n-card size="small" style="background: transparent; border: 1px dashed #444;">
      <n-space align="center">
        <n-text depth="3">添加更多属性？</n-text>
        <n-select
          v-model:value="pendingPropKey"
          style="width: 400px"
          placeholder="选择属性..."
          searchable
          clearable
          :options="addableOptions"
        />
        
        <!-- 确认添加按钮 -->
        <n-button 
          type="primary" 
          secondary 
          :disabled="!pendingPropKey" 
          @click="confirmAddProperty"
        >
          添加属性
        </n-button>
      </n-space>

      <!-- 描述预览区域 -->
      <transition name="fade-down">
        <div v-if="pendingPropPreview" style="margin-top: 10px;">
          <n-alert :title="`属性说明: ${pendingPropPreview.label}`" type="info" ghost>
            {{ pendingPropPreview.desc || '该属性暂无详细描述。' }}
          </n-alert>
        </div>
      </transition>
    </n-card>
  </n-space>
</template>

<script setup lang="ts">
import { ref, computed, nextTick } from 'vue';
import { useSkillState } from '../../hooks/useSkillState';
import { useEffectLogic } from '../../hooks/useEffectLogic';
import { CONDITION_OPTIONS_MAP, LOGIC_META } from '../../config';
import MetaFormItem from '../widgets/MetaFormItem.vue';

const { selectedSkill } = useSkillState();
const { 
  visibleLogicMetas, 
  filteredEffectOptions, 
  handleAddTypeChange,
  checkEffectTypeValid
} = useEffectLogic(selectedSkill);

// 用于记录当前下拉框选中的 Key
const pendingPropKey = ref<string | null>(null);

// 预览当前选中的属性描述
const pendingPropPreview = computed(() => {
  if (!pendingPropKey.value) return null;
  // 从原始配置中找到对应的 meta 对象
  const meta = LOGIC_META.find(m => m.key === pendingPropKey.value);
  return meta ? { label: meta.label, desc: meta.desc, key: meta.key } : null;
});

// 非可选 且 符合 vIf 条件
const coreMetas = computed(() => 
  visibleLogicMetas.value.filter(m => !m.isOptional)
);

// 已激活的可选属性：是可选 且 符合 vIf 且 不为 undefined
const activeOptionalMetas = computed(() => 
  visibleLogicMetas.value.filter(m => m.isOptional && selectedSkill.value?.[m.key] !== undefined)
);

// 可添加列表：是可选 且 符合 vIf 且 当前是 undefined
const addableOptions = computed(() => 
  visibleLogicMetas.value
    .filter(m => m.isOptional && selectedSkill.value?.[m.key] === undefined)
    .map(m => ({ label: m.label, value: m.key }))
);

const confirmAddProperty = () => {
  const skill = selectedSkill.value;
  const key = pendingPropKey.value;
  if (!skill || !key) return;

  // 执行添加逻辑
  else if (key.endsWith('B')) selectedSkill.value[key] = false;
  else selectedSkill.value[key] = null;

  // 添加成功后，清空下拉框选中项
  pendingPropKey.value = null;
  
  // 如果添加的是 doGap，触发校验
  if (pendingPropKey.value === 'doGap') {
    nextTick(() => {
      checkEffectTypeValid();
    });
  }
};

const removeProperty = (key: string) => {
  if (selectedSkill.value) selectedSkill.value[key] = undefined;
  
  // 如果移除的是 doGap，触发一次效验
  if (key === 'doGap') {
    // 因为计算属性 filteredEffectOptions 是响应式的
    // 需要等它更新后再校验
    nextTick(() => {
      checkEffectTypeValid();
    });
  }
};

// 处理复杂的联动逻辑
const handleUpdate = (key: string, val: any) => {
  const skill = selectedSkill.value;
  if (!skill) return;

  if (key.startsWith('obj_')) {
    const realKey = key.replace('obj_', '');
    
    const targetObj = skill.obj as any; 
    
    if (val === undefined || val === '') {
      delete targetObj[realKey];
    } else {
      targetObj[realKey] = val;
    }
  } else {
    const targetSkill = skill as any; 
    if (key === 'conditionType') handleConditionTypeChange(val);
    else if (key === 'addType') handleAddTypeChange(val);
    else targetSkill[key] = val;
  }
};

// 动态获取 Props
const getProps = (meta: any) => {
  const base = { meta, modelValue: selectedSkill.value?.[meta.key] };
  if (meta.key === 'effectType') return { ...base, meta: { ...meta, options: filteredEffectOptions.value } };
  if (meta.key === 'condition') return { ...base, meta: { ...meta, options: currentConditionOptions.value }, disabled: !selectedSkill.value?.conditionType };
  return base;
};

// 触发细则逻辑
const currentConditionOptions = computed(() => {
  const type = selectedSkill.value?.conditionType;
  return type ? CONDITION_OPTIONS_MAP[type] || [] : [];
});

const handleConditionTypeChange = (val: string) => {
  if (selectedSkill.value) {
    selectedSkill.value.conditionType = val;
    selectedSkill.value.condition = val === 'active' ? 'avtiveSkillCdOver' : 'interval';
  }
};
</script>
<style scoped>
.optional-item-box {
  display: flex;
  flex-direction: column;
}
.item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px; /* 紧贴输入框 */
}
.item-label {
  font-size: 13px;
  font-weight: bold;
  color: #adbac7;
}
/* 移除按钮悬浮变红 */
.item-header .n-button:hover {
  background-color: rgba(255, 0, 0, 0.1);
}
</style>