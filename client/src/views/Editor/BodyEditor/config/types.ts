// client/src/views/Editor/BodyEditor/config/types.ts

export interface SelectOption {
  label: string;
  value: string | number;
  desc?: string;
}

export type ImportanceLevel = 'core' | 'advanced' | 'optional';

export interface BodyMetaItem {
  key: string;
  label: string;
  type: 'string' | 'number' | 'select' | 'multi_select' | 'switch' | 'select_png';
  desc?: string;
  options?: SelectOption[];
  group?: string;

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
