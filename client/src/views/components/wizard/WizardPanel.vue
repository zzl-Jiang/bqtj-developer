<template>
    <div class="wizard-panel">
        <!-- 顶部：分类卡片网格 -->
        <div class="wizard-top">
            <div class="category-grid">
                <CategoryCard
                    v-for="category in categories"
                    :key="category.id"
                    :category="category"
                    :is-active="selectedCategory === category.id"
                    :completion="getCategoryCompletion(category)"
                    :filled-fields="getFilledFieldsCount(category)"
                    :total-fields="category.fields.length"
                    @click="selectCategory(category.id)"
                />
            </div>
        </div>

        <!-- 分隔线 -->
        <div class="divider" />

        <!-- 底部：字段编辑区 + 帮助面板并排 -->
        <div class="wizard-main">
            <!-- 左侧：筛选栏 + 字段卡片 -->
            <div class="wizard-left">
                <!-- 筛选栏 -->
                <div class="filter-bar">
                    <n-radio-group v-model:value="importanceFilter" size="small">
                        <n-radio-button value="all">全部</n-radio-button>
                        <n-radio-button value="core">核心</n-radio-button>
                        <n-radio-button value="advanced">进阶</n-radio-button>
                    </n-radio-group>

                    <n-input
                        v-model:value="searchQuery"
                        placeholder="搜索字段..."
                        size="small"
                        clearable
                        style="width: 200px"
                    >
                        <template #prefix>
                            <n-icon :component="SearchOutline" />
                        </template>
                    </n-input>
                </div>

                <!-- 字段卡片网格 -->
                <div v-if="filteredFields.length > 0" class="fields-grid">
                    <FieldCard
                        v-for="field in filteredFields"
                        :key="field.key"
                        :meta="field"
                        :value="getFieldValue(field.key)"
                        @click="openFieldEditor(field)"
                        @edit="openFieldEditor(field)"
                    />
                </div>

                <!-- 空状态 -->
                <div v-else class="empty-fields">
                    <n-empty description="暂无匹配字段">
                        <template #icon>
                            <n-icon :component="SearchOutline" />
                        </template>
                    </n-empty>
                </div>
            </div>

            <!-- 右侧：帮助面板 -->
            <div class="wizard-right">
                <HelperPanel
                    :category="currentCategory"
                    :fields="currentCategoryFields"
                    :wiki-link="currentCategory?.id"
                    :tips="currentTips"
                />
            </div>
        </div>

        <!-- 字段编辑对话框 -->
        <n-modal
            v-model:show="showFieldModal"
            :title="editingField?.label"
            preset="card"
            class="field-edit-modal"
            :bordered="false"
            segmented
        >
            <template #header-extra v-if="editingField?.importance">
                <n-tag :type="getImportanceType(editingField.importance)">
                    {{ getImportanceText(editingField.importance) }}
                </n-tag>
            </template>

            <div v-if="editingField" class="field-editor-content">
                <!-- 字段说明 -->
                <n-alert v-if="editingField.docContent" type="info" :show-icon="false" class="field-doc">
                    {{ editingField.docContent }}
                </n-alert>

                <!-- 字段输入 -->
                <MetaFormItem
                    :meta="editingField"
                    v-model:modelValue="editingData"
                    :show-label="false"
                />

                <!-- 示例值 -->
                <div v-if="editingField.exampleValue !== undefined" class="example-value">
                    <span class="example-label">示例值：</span>
                    <span class="example-text">{{ editingField.exampleValue }}</span>
                </div>

                <!-- Wiki 链接 -->
                <a
                    v-if="editingField.wikiLink"
                    :href="getWikiLink(editingField.wikiLink)"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="field-wiki-link"
                >
                    <n-icon :component="OpenOutline" />
                    <span>查看 Wiki 详细说明</span>
                </a>
            </div>

            <template #footer>
                <n-space justify="end">
                    <n-button @click="showFieldModal = false">取消</n-button>
                    <n-button type="primary" @click="saveField">确定</n-button>
                </n-space>
            </template>
        </n-modal>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import {
    NRadioGroup,
    NRadioButton,
    NInput,
    NIcon,
    NModal,
    NTag,
    NAlert,
    NSpace,
    NButton,
    NEmpty
} from 'naive-ui';
import {
    SearchOutline,
    OpenOutline
} from '@vicons/ionicons5';
import CategoryCard from './CategoryCard.vue';
import FieldCard from './FieldCard.vue';
import HelperPanel from './HelperPanel.vue';
import MetaFormItem from '../MetaFormItem.vue';
import type { CategoryConfig, BulletMetaItem } from '../../Editor/BulletEditor/config/types';
import type { ImportanceLevel } from '../../Editor/config/sharedTypes';

const props = defineProps<{
    categories: CategoryConfig[];
    allFields: BulletMetaItem[];
    data: any;
}>();

const emit = defineEmits<{
    'update:data': [value: any];
    'edit:complex': [field: BulletMetaItem, data: any];
}>();

// 状态
const selectedCategory = ref<string>('');
const importanceFilter = ref<'all' | 'core' | 'advanced'>('all');
const searchQuery = ref('');
const showFieldModal = ref(false);
const editingField = ref<BulletMetaItem | null>(null);
const editingData = ref<any>({});

// 初始化选中第一个分类
watch(() => props.categories, (cats) => {
    if (cats.length > 0 && !selectedCategory.value) {
        const firstCat = cats[0];
        if (firstCat?.id) {
            selectedCategory.value = firstCat.id;
        }
    }
}, { immediate: true });

// 当前分类
const currentCategory = computed(() => {
    return props.categories.find(c => c.id === selectedCategory.value);
});

// 当前分类的字段
const currentCategoryFields = computed(() => {
    if (!currentCategory.value) return [];
    return props.allFields.filter(f =>
        currentCategory.value!.fields.includes(f.key)
    );
});

// 筛选后的字段
const filteredFields = computed(() => {
    let fields = currentCategoryFields.value;

    // 按重要性筛选
    if (importanceFilter.value !== 'all') {
        fields = fields.filter(f => f.importance === importanceFilter.value);
    }

    // 按搜索词筛选
    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        fields = fields.filter(f =>
            f.label.toLowerCase().includes(query) ||
            f.key.toLowerCase().includes(query) ||
            (f.desc && f.desc.toLowerCase().includes(query))
        );
    }

    // 排序：核心在前，进阶其次，可选最后
    const importanceOrder: Record<string, number> = { core: 0, advanced: 1, optional: 2 };
    return fields.sort((a, b) => {
        return (importanceOrder[a.importance || 'optional'] || 2) -
               (importanceOrder[b.importance || 'optional'] || 2);
    });
});

// 当前提示
const currentTips = computed(() => {
    const tips: string[] = [];
    if (!currentCategory.value) return tips;

    const completion = getCategoryCompletion(currentCategory.value);

    if (completion === 0) {
        tips.push('该分类下还没有配置任何字段，建议从核心字段开始');
    } else if (completion < 50) {
        tips.push('完成度较低，建议继续完善核心字段');
    } else if (completion === 100) {
        tips.push('该分类已配置完成！');
    }

    const coreFields = currentCategoryFields.value.filter(f => f.importance === 'core');
    const filledCoreFields = coreFields.filter(f => hasValue(f.key));
    if (coreFields.length > 0 && filledCoreFields.length < coreFields.length) {
        tips.push(`还有 ${coreFields.length - filledCoreFields.length} 个核心字段未配置`);
    }

    return tips;
});

// 方法
function selectCategory(id: string) {
    selectedCategory.value = id;
    searchQuery.value = '';
    importanceFilter.value = 'all';
}

function getCategoryCompletion(category?: CategoryConfig): number {
    if (!category) return 0;
    const total = category.fields.length;
    if (total === 0) return 0;
    const filled = category.fields.filter(key => hasValue(key)).length;
    return Math.round((filled / total) * 100);
}

function getFilledFieldsCount(category: CategoryConfig): number {
    return category.fields.filter(key => hasValue(key)).length;
}

function hasValue(key: string): boolean {
    const value = getFieldValue(key);
    return value !== undefined && value !== null && value !== '';
}

function getFieldValue(key: string): any {
    if (!props.data) return undefined;
    const keys = key.split('.');
    let val = props.data;
    for (const k of keys) {
        val = val?.[k];
        if (val === undefined) break;
    }
    return val;
}

function openFieldEditor(field: BulletMetaItem) {
    // 复杂字段触发特殊事件，由父组件处理
    if (field.isComplex) {
        emit('edit:complex', field, props.data);
        return;
    }
    editingField.value = field;
    editingData.value = props.data;
    showFieldModal.value = true;
}

function saveField() {
    if (editingField.value) {
        emit('update:data', { ...editingData.value });
    }
    showFieldModal.value = false;
}

function getImportanceType(level?: ImportanceLevel) {
    const map: Record<ImportanceLevel, any> = {
        core: 'error',
        advanced: 'info',
        optional: 'default'
    };
    return map[level!] || 'default';
}

function getImportanceText(level?: ImportanceLevel) {
    const map: Record<ImportanceLevel, string> = {
        core: '核心',
        advanced: '进阶',
        optional: '可选'
    };
    return map[level!] || '';
}

function getWikiLink(link: string): string {
    return `https://bqtj.huijiwiki.com/wiki/${encodeURIComponent(link)}`;
}
</script>

<style scoped>
.wizard-panel {
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: hidden;
}

/* 上半部分：分类卡片 */
.wizard-top {
    flex: 0 0 auto;
    padding: 16px;
}

@media (max-width: 1200px) {
    .wizard-top {
        padding: 12px;
    }
}

.category-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
}

@media (max-width: 1400px) {
    .category-grid {
        grid-template-columns: repeat(3, 1fr);
    }
}

@media (max-width: 1200px) {
    .category-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 900px) {
    .category-grid {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 640px) {
    .category-grid {
        grid-template-columns: 1fr;
        gap: 6px;
    }

    .wizard-top {
        padding: 6px 8px;
    }

    .wizard-left {
        padding: 8px;
    }

    .filter-bar {
        margin-bottom: 8px;
        gap: 6px;
    }
}

/* 分隔线 */
.divider {
    height: 1px;
    background: rgba(255, 255, 255, 0.05);
    margin: 0 16px;
    flex-shrink: 0;
}

/* 下半部分：主内容区（左右布局） */
.wizard-main {
    flex: 1;
    display: flex;
    overflow: hidden;
    min-height: 0;
}

/* 左侧：字段编辑区 */
.wizard-left {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    padding: 16px;
    min-width: 0;
}

/* 右侧：帮助面板 */
.wizard-right {
    width: 300px;
    flex-shrink: 0;
    border-left: 1px solid rgba(255, 255, 255, 0.05);
    overflow-y: auto;
}

@media (max-width: 1200px) {
    .wizard-right {
        width: 220px;
    }

    .wizard-left {
        padding: 12px;
    }
}

@media (max-width: 900px) {
    .wizard-main {
        flex-direction: column;
    }

    .wizard-right {
        width: 100%;
        border-left: none;
        border-top: 1px solid rgba(255, 255, 255, 0.05);
        max-height: 200px;
    }
}

.filter-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
    flex-shrink: 0;
    flex-wrap: wrap;
    gap: 8px;
}

@media (max-width: 640px) {
    .filter-bar {
        flex-direction: column;
        align-items: stretch;
    }

    .filter-bar .n-input {
        width: 100% !important;
    }
}

.fields-grid {
    flex: 1;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 8px;
    overflow-y: auto;
    padding-right: 8px;
    align-content: start;
}

@media (max-width: 640px) {
    .fields-grid {
        grid-template-columns: 1fr;
    }
}

.empty-fields {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
}

/* 字段编辑对话框 */
.field-editor-content {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.field-doc {
    background: rgba(24, 160, 88, 0.1) !important;
    border: 1px solid rgba(24, 160, 88, 0.2) !important;
}

.example-value {
    display: flex;
    gap: 8px;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.5);
}

.example-label {
    color: rgba(255, 255, 255, 0.3);
}

.example-text {
    color: #f2c97d;
    font-family: monospace;
}

.field-wiki-link {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    color: #63e2b7;
    text-decoration: none;
    padding: 8px 12px;
    background: rgba(24, 160, 88, 0.1);
    border-radius: 6px;
    transition: background 0.2s ease;
}

.field-wiki-link:hover {
    background: rgba(24, 160, 88, 0.15);
}

/* 字段编辑对话框响应式 */
:global(.field-edit-modal) {
    width: 480px;
    max-width: 90vw;
}

@media (max-width: 640px) {
    :global(.field-edit-modal) {
        width: 100%;
        max-width: 95vw;
    }
}
</style>
