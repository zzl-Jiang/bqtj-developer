<template>
  <div class="module-container">
    <n-layout has-sider>
      <!-- 左侧：技能目录 -->
      <n-layout-sider
        bordered
        collapse-mode="width"
        :collapsed-width="0"
        :width="240"
        show-trigger="bar"
        content-style="padding: 12px; display: flex; flex-direction: column; gap: 12px;"
      >
        <n-button type="primary" block @click="handleAddSkill">
          + 新增技能定义
        </n-button>
        <n-scrollbar>
          <n-menu
            :options="menuOptions"
            :value="selectedIndex?.toString()"
            @update:value="handleMenuClick"
          />
        </n-scrollbar>
      </n-layout-sider>

      <!-- 中间与右侧：主编辑区 -->
      <n-layout-content content-style="padding: 24px;">
        <div v-if="selectedSkill" style="display: flex; flex-direction: column; height: 100%;">
          <n-grid :cols="24" :x-gap="24" style="flex: 1">
            
            <!-- 编辑表单列 -->
            <n-gi :span="16">
              <n-tabs type="card" animated>
                <!-- 1. 核心配置：基础信息 + 状态标志 -->
                <n-tab-pane name="basic" tab="核心配置">
                  <n-space vertical size="large">
                    <n-card title="基础标识" size="small" segmented>
                      <n-grid :cols="3" :x-gap="12">
                        <n-gi v-for="meta in baseMetas" :key="meta.key">
                          <n-form-item :label="meta.label">
                            <n-select v-if="meta.type === 'select_png'" v-model:value="selectedSkill[meta.key]" placeholder="请选择" :options="pngOptions" clearable />
                            <n-input v-else v-model:value="selectedSkill[meta.key]" placeholder="请输入" />
                          </n-form-item>
                        </n-gi>
                      </n-grid>
                    </n-card>

                    <n-card title="状态标志 (开关)" size="small" segmented>
                      <n-grid :cols="4" :y-gap="12">
                        <n-gi v-for="meta in flagMetas" :key="meta.key">
                          <n-space align="center">
                            <n-switch v-model:value="selectedSkill[meta.key]" size="small" />
                            <n-text style="font-size: 12px">{{ meta.label }}</n-text>
                          </n-space>
                        </n-gi>
                      </n-grid>
                    </n-card>
                  </n-space>
                </n-tab-pane>

                <!-- 2. 技能效果 -->
                <n-tab-pane name="effects" tab="技能效果">
                  <n-card title="逻辑数值配置" size="small">
                    <n-grid :cols="3" :x-gap="20" :y-gap="12">
                      <n-gi v-for="meta in visibleLogicMetas" :key="meta.key"  :span="meta.key === 'effectType' ? 2 : 1" >
                        <n-form-item :label="meta.label">
                          
                          <!-- 触发种类 -->
                          <n-select 
                            v-if="meta.key === 'conditionType'" 
                            :value="selectedSkill[meta.key]" 
                            :options="meta.options" 
                            placeholder="选择触发种类"
                            @update:value="handleConditionTypeChange"
                          />

                          <!-- addType -->
                          <n-select 
                            v-else-if="meta.key === 'addType'" 
                            :value="selectedSkill.addType" 
                            :options="meta.options" 
                            @update:value="handleAddTypeChange"
                            placeholder="请选择效果类型"
                          />

                          <!-- effectType -->
                          <n-select 
                            v-else-if="meta.key === 'effectType'" 
                            v-model:value="selectedSkill.effectType" 
                            :options="filteredEffectOptions"
                            :render-label="renderLabel"
                            placeholder="请选择效果函数"
                          />


                          <!-- 触发细则 -->
                          <n-select 
                            v-else-if="meta.key === 'condition'" 
                            v-model:value="selectedSkill[meta.key]" 
                            :options="currentConditionOptions"
                            :placeholder="selectedSkill.conditionType ? '请选择细则' : '请先选择触发种类'"
                            :disabled="!selectedSkill.conditionType"
                            :render-label="renderLabel"
                            clearable
                          />

                          <!-- 其他普通 select -->
                          <n-select 
                            v-else-if="meta.type === 'select'" 
                            v-model:value="selectedSkill[meta.key]" 
                            placeholder="请选择"
                            :options="meta.options" 
                            :render-label="renderLabel"
                            clearable
                          />

                          <!-- 数字和其他 -->
                          <n-input-number v-else-if="meta.type === 'number'" v-model:value="selectedSkill[meta.key]" style="width: 100%" />
                          <n-input v-else v-model:value="selectedSkill[meta.key]" placeholder="请输入" />
                          
                        </n-form-item>
                      </n-gi>
                    </n-grid>
                  </n-card>
                </n-tab-pane>

                <!-- 3. Target 设置 -->
                <n-tab-pane name="target" tab="目标选择">
                  <n-card title="Target 节点详细配置" size="small">
                    <n-grid :cols="3" :x-gap="12" :y-gap="8">
                      <n-gi v-for="meta in TARGET_UI_META" :key="meta.key">
                        <n-form-item :label="meta.label">
                          <!-- 下拉选择框适配 -->
                          <n-select 
                            placeholder="请选择"
                            v-if="meta.type === 'select'" 
                            v-model:value="selectedSkill.target[meta.key]" 
                            :options="meta.options"
                            :render-label="renderLabel"
                            clearable
                          />
                          
                          <n-switch 
                            v-else-if="meta.type === 'switch'" 
                            v-model:value="selectedSkill.target[meta.key]" 
                          />
                          
                          <n-input-number 
                            v-else-if="meta.type === 'number'" 
                            v-model:value="selectedSkill.target[meta.key]" 
                            style="width: 100%" 
                          />
                          
                          <!-- 默认：文本输入 -->
                          <n-input 
                            v-else 
                            v-model:value="selectedSkill.target[meta.key]" 
                            :placeholder="meta.desc" 
                          />
                        </n-form-item>
                      </n-gi>
                    </n-grid>
                  </n-card>
                </n-tab-pane>
                
                <n-tab-pane name="optional" tab="其他属性">
                  <n-space vertical size="large">
                    <n-card title="添加进阶属性" size="small" segmented>
                      <n-space>
                        <n-select 
                          placeholder="请选择要添加的属性..." 
                          style="width: 260px" 
                          :options="availableOptions" 
                          v-model:value="pendingPropKey"
                        />
                        <n-button type="primary" :disabled="!pendingPropKey" @click="addOptionalProp">
                          确认添加
                        </n-button>
                      </n-space>
                      <template #footer>
                        <n-text depth="3" size="small">此处仅列出非常用属性，添加后即可在下方编辑。</n-text>
                      </template>
                    </n-card>

                    <!-- 动态渲染已添加的属性 -->
                    <n-card v-if="activeOptionalKeys.length > 0" title="已激活的进阶配置" size="small">
                      <n-grid :cols="2" :x-gap="20" :y-gap="12">
                        <n-gi v-for="key in activeOptionalKeys" :key="key">
                          <n-form-item :label="getPropMeta(key).label">
                            <template #header-extra>
                              <n-button text type="error" @click="removeOptionalProp(key)">移除</n-button>
                            </template>
                            <n-switch v-if="getPropMeta(key).type === 'switch'" v-model:value="selectedSkill[key]" />
                            <n-input-number v-else-if="getPropMeta(key).type === 'number'" v-model:value="selectedSkill[key]" style="width: 100%" />
                            <n-input v-else v-model:value="selectedSkill[key]" />
                          </n-form-item>
                        </n-gi>
                      </n-grid>
                    </n-card>
                  </n-space>
                </n-tab-pane>

                <!-- 4. 触发条件 -->
                <n-tab-pane name="conditions" tab="触发条件">
                  <n-space vertical size="large">
                    <n-card title="添加判定条件" size="small" segmented>
                      <n-space>
                        <n-select placeholder="选择条件属性..." style="width: 260px" :options="conditionOptions" v-model:value="pendingPropKey" />
                        <n-button type="primary" @click="addOptionalProp">确认添加</n-button>
                      </n-space>
                    </n-card>
                    <n-card v-if="activeConditionKeys.length > 0" title="已激活的条件" size="small">
                      <n-grid :cols="2" :x-gap="20" :y-gap="12">
                        <n-gi v-for="key in activeConditionKeys" :key="key">
                          <n-form-item :label="getPropMeta(key).label">
                            <template #header-extra>
                              <n-button text type="error" @click="removeOptionalProp(key)">移除</n-button>
                            </template>
                            <n-switch v-if="getPropMeta(key).type === 'switch'" v-model:value="selectedSkill[key]" />
                            <n-input-number v-else v-model:value="selectedSkill[key]" style="width: 100%" />
                          </n-form-item>
                        </n-gi>
                      </n-grid>
                    </n-card>
                  </n-space>
                </n-tab-pane>

                <!-- 5. 视觉效果 -->
                <n-tab-pane name="visuals" tab="视觉资源">
                  <n-collapse arrow-placement="right" :default-expanded-names="['1']">
                    <n-collapse-item v-for="(tag, idx) in imgTags" :key="tag" :title="tag" :name="idx">
                      <ImgUrlEditor :data="selectedSkill[tag]" />
                    </n-collapse-item>
                  </n-collapse>
                </n-tab-pane>
              </n-tabs>
            </n-gi>

            <!-- 右侧：预览与文档 -->
            <n-gi :span="8">
              <n-space vertical size="large">
                <n-card title="XML 预览" size="small" segmented>
                  <template #header-extra>
                    <n-button type="primary" size="tiny" @click="copyXml">复制代码</n-button>
                  </template>
                  <pre class="xml-preview-mini">{{ selectedSkill.toXml() }}</pre>
                </n-card>

                <n-card title="AS3 效果说明" size="small" status="info">
                  <div v-if="currentEffectDesc">
                    <n-tag type="info" size="small" style="margin-bottom: 8px">{{ selectedSkill.effectType }}</n-tag>
                    <p style="font-size: 13px; line-height: 1.6; color: #adbac7; white-space: pre-line;">{{ currentEffectDesc }}</p>
                  </div>
                  <n-text v-else depth="3">在逻辑配置中选择效果函数以查看说明</n-text>
                </n-card>

                <n-popconfirm @positive-click="confirmDelete">
                  <template #trigger>
                    <n-button type="error" block ghost>删除此技能定义</n-button>
                  </template>
                  确定要彻底删除 "{{ selectedSkill.cnName || selectedSkill.name }}" 吗？
                </n-popconfirm>
              </n-space>
            </n-gi>
          </n-grid>
        </div>
        <n-empty v-else description="请在左侧列表选择技能" style="margin-top: 100px" />
      </n-layout-content>
    </n-layout>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick, h } from 'vue';
import { useModStore } from '../../store/useModStore';
import { CONDITION_OPTIONS_MAP, EFFECT_TYPE_OPTIONS, SKILL_UI_META } from './configs/skillMeta';
import { TARGET_UI_META, OPTIONAL_PROPS } from './configs/skillMeta';
import ImgUrlEditor from './components/ImgUrlEditor.vue';
import { useMessage } from 'naive-ui';

const modStore = useModStore();
const message = useMessage();
const selectedIndex = ref<number | null>(null);
const nameInputRef = ref<any>(null);
const pendingPropKey = ref<string | null>(null);
const activeOptionalKeys = ref<string[]>([]);

// --- 数据过滤与分组 ---

// 核心配置 - 基础信息
const baseMetas = computed(() => SKILL_UI_META.filter(m => m.group === 'base'));

// 核心配置 - 标志位
const flagMetas = computed(() => SKILL_UI_META.filter(m => m.group === 'flags'));

// 技能效果 - 逻辑数值
const logicMetas = computed(() => SKILL_UI_META.filter(m => m.group === 'logic'));

// 创建一个新的计算属性，专门负责过滤显示的字段
const visibleLogicMetas = computed(() => {
  // 如果当前没选技能，直接返回空
  if (!selectedSkill.value) return [];

  // 对原始的 logicMetas 进行过滤
  return logicMetas.value.filter(meta => {
    // 如果没有配置 vIf 函数，默认显示
    if (!meta.vIf) return true;
    // 如果配置了 vIf，则执行该函数判断是否显示
    return meta.vIf(selectedSkill.value);
  });
});

// 条件类
const CONDITION_KEYS = ['mustLv', 'ignoreSilenceB', 'ignoreImmunityB']; 

// 获取进阶属性中属于“条件”的部分
const conditionOptions = computed(() => {
  return OPTIONAL_PROPS
    .filter(p => CONDITION_KEYS.includes(p.key) && !activeOptionalKeys.value.includes(p.key))
    .map(p => ({ label: p.label, value: p.key }));
});

// 动态渲染用的辅助函数：过滤已激活的 Key 到不同面板
const activeConditionKeys = computed(() => activeOptionalKeys.value.filter(k => CONDITION_KEYS.includes(k)));

// 获取尚未被添加的属性列表，供下拉框选择
const availableOptions = computed(() => {
  return OPTIONAL_PROPS
    .filter(p => !activeOptionalKeys.value.includes(p.key))
    .map(p => ({ label: p.label, value: p.key }));
});

// 根据 Key 获取元数据
const getPropMeta = (key: string) => {
  return OPTIONAL_PROPS.find(p => p.key === key) || { label: key, type: 'string' };
};

// 添加属性到界面
const addOptionalProp = () => {
  if (pendingPropKey.value) {
    activeOptionalKeys.value.push(pendingPropKey.value);
    pendingPropKey.value = null;
    message.success('已添加配置项');
  }
};

// 移除界面上的属性（并重置为默认值，以免 XML 导出）
const removeOptionalProp = (key: string) => {
  activeOptionalKeys.value = activeOptionalKeys.value.filter(k => k !== key);
  // 这里可以根据类型重置回默认值
  const meta = getPropMeta(key);
  if (meta.type === 'switch') selectedSkill.value[key] = false;
  else if (meta.type === 'number') selectedSkill.value[key] = (key === 'firstCd' ? -1 : 0);
  else selectedSkill.value[key] = "";
};

// 7个视觉资源标签名
const imgTags = [
  "addSkillEffectImg", "meEffectImg", "targetEffectImg", 
  "pointEffectImg", "otherEffectImg", "stateEffectImg", "stateEffectImg2"
];

// 监听条件种类的改变
const handleConditionTypeChange = (val: string) => {
  if (selectedSkill.value) {
    selectedSkill.value.conditionType = val;
    // 自动切换对应的默认 condition
    if (val === 'active') {
      selectedSkill.value.condition = 'avtiveSkillCdOver';
    } else {
      selectedSkill.value.condition = 'interval';
    }
  }
};

// 动态获取下拉列表
const currentConditionOptions = computed(() => {
  const type = selectedSkill.value?.conditionType;
  if (!type) return [];
  return CONDITION_OPTIONS_MAP[type] || [];
});

// --- 计算属性 ---
const selectedSkill = computed(() => 
  selectedIndex.value !== null ? modStore.skillList[selectedIndex.value] : null
);

const menuOptions = computed(() => 
  modStore.skillList.map((s, i) => ({
    label: s.cnName || s.name || `未命名_${i}`,
    key: i.toString()
  }))
);

const pngOptions = computed(() => 
  modStore.pngList.map(p => ({
    label: "png/" + p.name,
    value: "png/" + p.name
  }))
);


const renderLabel = (option: any) => {
  return h(
    'div',
    {
      style: {
        display: 'flex',
        flexDirection: 'column',
        lineHeight: '1.4',
        padding: '4px 0'
      }
    },
    [
      // 第一行：显示 label
      h('div', { style: { fontSize: '14px' } }, option.label),
      // 第二行：如果存在 desc，则显示描述
      option.desc 
        ? h('div', { style: { fontSize: '12px', opacity: 0.5 } }, option.desc) 
        : null
    ]
  );
};

const currentEffectDesc = computed(() => {
  const skill = selectedSkill.value;
  if (!skill) return null;

  const targetOption = EFFECT_TYPE_OPTIONS.find(opt => opt.value === skill.effectType);
  if (!targetOption) return "请在左侧技能效果页选择效果函数以查看说明";

  // 如果当前 addType 不支持该函数（虽然下拉框过滤了，但万一数据异常）
  if (!targetOption.category.includes(skill.addType)) {
    return `[警告：当前函数不匹配添加类型]\n\n${targetOption.desc}`;
  }

  return targetOption.desc;
});

const filteredEffectOptions = computed(() => {
  const addType = selectedSkill.value?.addType;
  if (!addType) return EFFECT_TYPE_OPTIONS; // 如果没选 addType，显示全部（或根据需求显示空）

  return EFFECT_TYPE_OPTIONS.filter(opt => opt.category.includes(addType));
});

// 当 addType 改变时，检查 effectType 是否还合法
const handleAddTypeChange = (val: number) => {
  if (selectedSkill.value) {
    selectedSkill.value.addType = val;
    
    // 获取新 addType 对应的合法值列表
    const legalValues = filteredEffectOptions.value.map(o => o.value);
    
    // 如果当前的 effectType 不在合法列表里，重置为 'no'
    if (!legalValues.includes(selectedSkill.value.effectType)) {
      selectedSkill.value.effectType = 'no';
    }
  }
};

// --- 交互方法 ---
onMounted(() => {
  if (modStore.skillList.length > 0) selectedIndex.value = 0;
});

const handleMenuClick = (key: string) => {
  selectedIndex.value = parseInt(key);
};

const handleAddSkill = async () => {
  modStore.addSkill();
  selectedIndex.value = modStore.skillList.length - 1;
  await nextTick();
  // 注意：在 Tab 切换后，ref 可能会丢失，这里需要确保在正确的 Tab 下聚焦
  nameInputRef.value?.focus();
};

const confirmDelete = () => {
  if (selectedIndex.value !== null) {
    modStore.removeSkill(selectedIndex.value);
    selectedIndex.value = modStore.skillList.length > 0 ? 0 : null;
    message.success('技能已删除');
  }
};

const copyXml = () => {
  if (selectedSkill.value) {
    navigator.clipboard.writeText(selectedSkill.value.toXml());
    message.success('XML 已复制');
  }
};
</script>

<style scoped>
.module-container { height: 100%; position: relative; }
.xml-preview-mini {
  background: #101014;
  color: #8abeb7;
  padding: 12px;
  font-size: 11px;
  border-radius: 4px;
  white-space: pre-wrap;
  font-family: 'Fira Code', monospace;
  max-height: 250px;
  overflow-y: auto;
}
:deep(.n-form-item-label) { font-weight: bold; font-size: 12px; }
</style>