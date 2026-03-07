<template>
    <div class="helper-panel">
        <!-- 分类说明 -->
        <div class="panel-section">
            <div class="section-header">
                <n-icon :component="BookOutline" :size="18" />
                <span>快速参考</span>
            </div>

            <div v-if="category" class="category-info">
                <h3 class="category-title">{{ category.label }}</h3>
                <p class="category-desc">{{ category.description }}</p>
            </div>

            <div v-else class="empty-state">
                <n-icon :component="HelpCircleOutline" :size="48" />
                <p>选择一个分类查看说明</p>
            </div>
        </div>

        <!-- 字段列表 -->
        <div v-if="fields.length > 0" class="panel-section">
            <div class="section-header" @click="toggleFieldsList" style="cursor: pointer;">
                <n-icon :component="ListOutline" :size="18" />
                <span>字段说明 ({{ fields.length }})</span>
                <n-button text size="tiny" class="toggle-all-btn" @click.stop="toggleFieldsList">
                    <n-icon :component="isFieldsExpanded ? ChevronUpOutline : ChevronDownOutline" :size="16" />
                    <span>{{ isFieldsExpanded ? '折叠' : '展开' }}</span>
                </n-button>
            </div>

            <div v-show="isFieldsExpanded" class="fields-list">
                <div
                    v-for="field in fields"
                    :key="field.key"
                    class="field-item"
                    :class="{ 'is-core': field.importance === 'core' }"
                >
                    <div class="field-item-header">
                        <span class="field-item-label">{{ field.label }}</span>
                        <n-tag
                            v-if="field.importance"
                            :type="getImportanceType(field.importance)"
                            size="tiny"
                        >
                            {{ getImportanceText(field.importance) }}
                        </n-tag>
                    </div>
                    <p v-if="field.desc" class="field-item-desc">{{ field.desc }}</p>
                </div>
            </div>
        </div>

        <!-- 相关链接 -->
        <div v-if="wikiLink" class="panel-section">
            <div class="section-header">
                <n-icon :component="LinkOutline" :size="18" />
                <span>相关链接</span>
            </div>

            <div class="links-list">
                <a
                    :href="fullWikiLink"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="wiki-link"
                >
                    <n-icon :component="OpenOutline" :size="14" />
                    <span>查看 Wiki 详细教程</span>
                </a>
            </div>
        </div>

        <!-- 提示 -->
        <div v-if="tips && tips.length > 0" class="panel-section">
            <div class="section-header">
                <n-icon :component="BulbOutline" :size="18" />
                <span>提示</span>
            </div>

            <ul class="tips-list">
                <li v-for="(tip, index) in tips" :key="index" class="tip-item">
                    {{ tip }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { NIcon, NTag, NButton } from 'naive-ui';
import {
    BookOutline,
    HelpCircleOutline,
    ListOutline,
    LinkOutline,
    OpenOutline,
    BulbOutline,
    ChevronUpOutline,
    ChevronDownOutline
} from '@vicons/ionicons5';
import type { CategoryConfig, BulletMetaItem, ImportanceLevel } from '../../Editor/BulletEditor/config/types';

const props = defineProps<{
    category?: CategoryConfig;
    fields: BulletMetaItem[];
    wikiLink?: string;
    tips?: string[];
}>();

// 字段列表展开状态（默认折叠）
const isFieldsExpanded = ref(false);

// 切换字段列表展开/折叠
const toggleFieldsList = () => {
    isFieldsExpanded.value = !isFieldsExpanded.value;
};

const wikiBaseUrl = 'https://bqtj.huijiwiki.com/wiki/';

const fullWikiLink = computed(() => {
    if (!props.wikiLink) return '#';
    return wikiBaseUrl + encodeURIComponent(props.wikiLink);
});

const getImportanceType = (level: ImportanceLevel) => {
    const map: Record<ImportanceLevel, any> = {
        core: 'error',
        advanced: 'info',
        optional: 'default'
    };
    return map[level] || 'default';
};

const getImportanceText = (level: ImportanceLevel) => {
    const map: Record<ImportanceLevel, string> = {
        core: '必填',
        advanced: '推荐',
        optional: '可选'
    };
    return map[level] || '';
};
</script>

<style scoped>
.helper-panel {
    height: 100%;
    background: rgba(255, 255, 255, 0.02);
    border-left: 1px solid rgba(255, 255, 255, 0.05);
    padding: 20px;
    overflow-y: auto;
}

.panel-section {
    margin-bottom: 24px;
}

.panel-section:last-child {
    margin-bottom: 0;
}

.section-header {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: 12px;
    padding-bottom: 8px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

/* 分类信息 */
.category-info {
    background: rgba(255, 255, 255, 0.03);
    border-radius: 10px;
    padding: 16px;
}

.category-title {
    font-size: 15px;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.9);
    margin: 0 0 8px 0;
}

.category-desc {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.5);
    line-height: 1.6;
    margin: 0;
}

/* 空状态 */
.empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px 20px;
    color: rgba(255, 255, 255, 0.3);
    text-align: center;
}

.empty-state p {
    margin-top: 12px;
    font-size: 13px;
}

/* 展开/折叠按钮 */
.toggle-all-btn {
    margin-left: auto;
    color: rgba(255, 255, 255, 0.5);
}

.toggle-all-btn:hover {
    color: rgba(255, 255, 255, 0.8);
}

/* 字段列表 */
.fields-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    /* 防止内容溢出导致宽度增长 */
    min-width: 0;
    overflow-wrap: break-word;
    word-break: break-word;
}

.field-item {
    background: rgba(255, 255, 255, 0.03);
    border-radius: 8px;
    padding: 12px;
    border-left: 2px solid transparent;
    /* 防止内容溢出 */
    min-width: 0;
    overflow: hidden;
}

.field-item.is-core {
    border-left-color: #e88080;
    background: rgba(232, 128, 128, 0.05);
}

.field-item-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    margin-bottom: 4px;
    /* 确保 flex 子项可以正确收缩 */
    min-width: 0;
}

.field-item-label {
    /* 防止长文本撑开布局 */
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 13px;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.85);
}

.field-item-desc {
    font-size: 11px;
    color: rgba(255, 255, 255, 0.4);
    line-height: 1.5;
    margin: 4px 0 0 0;
    /* 防止长文本撑开布局 */
    overflow-wrap: break-word;
    word-break: break-word;
}

/* 链接 */
.links-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.wiki-link {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 12px;
    background: rgba(24, 160, 88, 0.1);
    border: 1px solid rgba(24, 160, 88, 0.2);
    border-radius: 8px;
    color: #63e2b7;
    font-size: 12px;
    text-decoration: none;
    transition: all 0.2s ease;
}

.wiki-link:hover {
    background: rgba(24, 160, 88, 0.15);
    border-color: rgba(24, 160, 88, 0.3);
}

/* 提示 */
.tips-list {
    margin: 0;
    padding-left: 16px;
    list-style: none;
}

.tip-item {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.5);
    line-height: 1.6;
    margin-bottom: 8px;
    position: relative;
}

.tip-item::before {
    content: '•';
    position: absolute;
    left: -12px;
    color: #f2c97d;
}

.tip-item:last-child {
    margin-bottom: 0;
}
</style>
