// client/src/views/Editor/SkillEditor/config/index.ts
// 技能编辑器配置统一导出

// 类型定义
export * from './types';

// 选项数据
export * from './options';

// 字段配置（统一规范格式）
export {
  SKILL_BASE_FIELDS,
  SKILL_LOGIC_FIELDS,
  SKILL_FLAG_FIELDS,
  SKILL_TARGET_FIELDS,
  SKILL_VISUAL_FIELDS
} from './fields';

// 向导模式配置
export {
  SKILL_WIZARD_CATEGORIES,
  SKILL_WIZARD_FIELD_CONFIG,
  enhanceFieldMeta
} from './wizard';

// 合并后的总字段配置（用于需要遍历所有字段的场景）
import {
  SKILL_BASE_FIELDS,
  SKILL_LOGIC_FIELDS,
  SKILL_FLAG_FIELDS,
  SKILL_TARGET_FIELDS,
  SKILL_VISUAL_FIELDS
} from './fields';

export const SKILL_ALL_FIELDS = [
  ...SKILL_BASE_FIELDS,
  ...SKILL_LOGIC_FIELDS,
  ...SKILL_FLAG_FIELDS,
  ...SKILL_TARGET_FIELDS,
  ...SKILL_VISUAL_FIELDS
];