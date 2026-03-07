// client/src/views/Editor/config/sharedTypes.ts
// 编辑器配置共享类型定义 - 所有编辑器模块统一使用

/**
 * 字段重要程度
 * - core: 核心字段，必须配置
 * - advanced: 进阶字段，可选增强
 * - optional: 可选字段，细节调整
 */
export type ImportanceLevel = 'core' | 'advanced' | 'optional';

/**
 * 复杂字段类型
 */
export type ComplexFieldType = 'object' | 'array' | 'eventG' | 'unitG' | 'rectG';

/**
 * 字段值类型
 */
export type FieldValueType =
  | 'string'
  | 'number'
  | 'select'
  | 'multi_select'
  | 'switch'
  | 'color'
  | 'point'
  | 'select_png';

/**
 * 选项项定义 - 用于 select/multi_select 类型字段
 */
export interface SelectOption {
  label: string;
  value: string | number;
  desc?: string;
  category?: string[];
}

/**
 * 字段元数据项 - 统一所有编辑器字段配置的基础接口
 * 用于配置编辑器中各个字段的展示和编辑方式
 */
export interface FieldMetaItem {
  // ===== 基础字段（必填） =====
  /** 字段唯一标识 */
  key: string;
  /** 字段显示名称 */
  label: string;
  /** 字段值类型 */
  type: FieldValueType;

  // ===== 基础字段（可选） =====
  /** 字段描述说明 */
  desc?: string;
  /** 选项列表（用于 select/multi_select 类型） */
  options?: SelectOption[];
  /** 输入占位提示 */
  placeholder?: string;

  // ===== 分组与条件显示 =====
  /** 所属分组/分类ID */
  group?: string;
  /** 是否为可选字段 */
  isOptional?: boolean;
  /** 条件显示函数 */
  vIf?: (data: any) => boolean;

  // ===== 向导模式扩展字段 =====
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
  /** 是否为复杂字段（对象、数组或特殊结构） */
  isComplex?: boolean;
  /** 复杂字段类型 */
  complexType?: ComplexFieldType;
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

/**
 * 向导模式字段增强配置
 * 用于在基础元数据上叠加向导模式特有的配置
 */
export type FieldEnhancement = Partial<Omit<FieldMetaItem, 'key' | 'label' | 'type'>>;

/**
 * 编辑器模块类型标识
 */
export type EditorModuleType =
  | 'bullet'
  | 'arms'
  | 'skill'
  | 'body'
  | 'level'
  | 'drop'
  | 'say'
  | 'png';
