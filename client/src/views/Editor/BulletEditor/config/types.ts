// client/src/views/Editor/BulletEditor/config/types.ts

/**
 * 字段重要程度
 * - core: 核心字段，必须配置
 * - advanced: 进阶字段，可选增强
 * - optional: 可选字段，细节调整
 */
export type ImportanceLevel = 'core' | 'advanced' | 'optional';

/**
 * 字段元数据项
 * 用于配置编辑器中各个字段的展示和编辑方式
 */
export interface BulletMetaItem {
    key: string;
    label: string;
    type: 'string' | 'number' | 'select' | 'multi_select' | 'switch' | 'color' | 'point';
    desc?: string;
    options?: { label: string; value: any; desc?: string }[];
    placeholder?: string;

    // ===== 向导模式扩展字段 =====

    /** 所属分组/分类ID */
    group?: string;

    /** 字段重要程度 */
    importance?: ImportanceLevel;

    /** 详细文档内容（支持多行文本） */
    docContent?: string;

    /** Wiki链接后缀（完整链接为: https://bqtj.huijiwiki.com/wiki/{wikiLink}） */
    wikiLink?: string;

    /** 示例值 */
    exampleValue?: any;

    /** 关联字段key列表 */
    relatedFields?: string[];
}

/**
 * 向导模式分类配置
 */
export interface CategoryConfig {
    /** 分类唯一标识 */
    id: string;
    /** 显示名称 */
    label: string;
    /** 图标组件名（来自 @vicons/ionicons5） */
    icon: string;
    /** 图标颜色 */
    iconColor: string;
    /** 分类简介 */
    description: string;
    /** 包含的字段key列表 */
    fields: string[];
}
