// client/src/views/Editor/SkillEditor/config/types.ts

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
}

// 统一的选项数组格式
export interface SelectOption {
  label: string;
  value: string | number;
  desc?: string;
  category?: string[]; // 专门给 EFFECT_TYPE_OPTIONS 用
}