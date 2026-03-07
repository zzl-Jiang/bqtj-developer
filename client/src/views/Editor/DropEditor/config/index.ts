// client/src/views/Editor/DropEditor/config/index.ts
// 掉落编辑器配置统一导出

// 类型定义
export * from './types';

// 字段配置
export {
  DROP_BASIC_METAS,
  DROP_VISUAL_METAS,
  DROP_LOGIC_METAS,
  DROP_PROBABILITY_METAS
} from './fields';

// 向导模式配置
export {
  DROP_WIZARD_CATEGORIES,
  DROP_WIZARD_FIELD_CONFIG,
  enhanceFieldMeta
} from './wizard';
