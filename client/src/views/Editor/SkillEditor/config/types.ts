// client/src/views/Editor/SkillEditor/config/types.ts

// 统一的选项数组格式
export interface SelectOption {
  label: string;
  value: string | number;
  desc?: string;
  category?: string[]; // 专门给 EFFECT_TYPE_OPTIONS 用
}

// 字段重要程度
export type ImportanceLevel = 'core' | 'advanced' | 'optional';

// 每个技能元数据的基础格式
export interface SkillMetaItem {
  key: string;
  label: string;
  type: 'string' | 'number' | 'select' | 'select_png' | 'switch' | 'multi_select';
  group?: 'base' | 'logic' | 'flags' | 'target';
  desc?: string;
  options?: SelectOption[];
  isOptional?: boolean;
  vIf?: (data: any) => boolean;

  // ===== 向导模式扩展字段 =====

  /** 字段重要程度 */
  importance?: ImportanceLevel;

  /** 详细文档内容（支持多行文本） */
  docContent?: string;

  /** Wiki链接后缀 */
  wikiLink?: string;

  /** 示例值 */
  exampleValue?: any;

  /** 关联字段key列表 */
  relatedFields?: string[];

  /** 是否为复杂字段（对象、数组或特殊结构） */
  isComplex?: boolean;

  /** 复杂字段类型 */
  complexType?: 'object' | 'array';

  /** 复杂字段的描述文本（显示在卡片上） */
  complexDesc?: string;
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
