// client/src/views/Editor/SkillEditor/config/types.ts
// 技能编辑器类型定义

import type { FieldMetaItem, CategoryConfig, SelectOption } from '../../config/sharedTypes';

/** 技能字段元数据项 - 使用统一字段定义 */
export type SkillMetaItem = FieldMetaItem;

/** 技能向导分类配置 - 使用统一分类定义 */
export type { CategoryConfig };

/** 选项数组格式 - 使用统一选项定义 */
export type { SelectOption };
