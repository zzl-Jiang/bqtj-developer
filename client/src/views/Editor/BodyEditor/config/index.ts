// client/src/views/Editor/BodyEditor/config/index.ts
// 单位编辑器配置统一导出

// 类型定义
export * from './types';

// 字段配置
export {
  BODY_BASIC_METAS,
  BODY_HERO_METAS,
  BODY_LIFEBAR_METAS,
  BODY_BATTLE_METAS,
  BODY_PHYSICS_METAS,
  BODY_MOVE_EXT_METAS,
  BODY_AI_METAS,
  ATTACK_METAS
} from './fields';

// 向导模式配置
export {
  BODY_WIZARD_CATEGORIES,
  BODY_WIZARD_FIELD_CONFIG,
  enhanceFieldMeta
} from './wizard';
