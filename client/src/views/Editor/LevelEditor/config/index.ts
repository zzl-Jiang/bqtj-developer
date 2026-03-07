// client/src/views/Editor/LevelEditor/config/index.ts
// 关卡编辑器配置统一导出

// 类型定义
export * from './types';

// 从 fields 导入所有导出
import {
  LEVEL_BASIC_METAS,
  LEVEL_INFO_METAS,
  LEVEL_UNIT_METAS,
  LEVEL_GROUP_METAS,
  LEVEL_AI_ORDER_META,
  LEVEL_EVENT_METAS,
  LEVEL_RECT_METAS
} from './fields';

export {
  LEVEL_BASIC_METAS,
  LEVEL_INFO_METAS,
  LEVEL_UNIT_METAS,
  LEVEL_GROUP_METAS,
  LEVEL_AI_ORDER_META,
  LEVEL_EVENT_METAS,
  LEVEL_RECT_METAS
};

// 兼容别名导出 (用于旧代码)
export { LEVEL_RECT_METAS as RECT_METAS } from './fields';
export { LEVEL_AI_ORDER_META as AI_ORDER_META } from './fields';
export { LEVEL_GROUP_METAS as GROUP_METAS } from './fields';
export { LEVEL_UNIT_METAS as UNIT_METAS } from './fields';

// 事件条件基础字段配置（用于 EventSection.vue）
// 注意：这里导出的是 condition 数组，不是整个 LEVEL_EVENT_METAS 对象
export const EVENT_CONDITION_METAS = LEVEL_EVENT_METAS.condition;

// 条件类型配置（用于 ConditionBuilder.vue）
export const CONDITION_TYPES = LEVEL_EVENT_METAS.conditionTypes;
export const OPERATOR_OPTIONS = LEVEL_EVENT_METAS.operator;
export const CONDITION_METAS = LEVEL_EVENT_METAS.conditionTypes;

// 指令元数据（用于 OrderBuilder.vue）
// 原始代码期望 ORDER_METAS 是一个数组，每个元素有 label, value, group, fields, parse, build 等属性
// 但从当前的配置看，这些属性不存在。我们需要保持兼容性
export const ORDER_METAS: any[] = [
  ...LEVEL_EVENT_METAS.visualOrder.map((m: any) => ({ ...m, group: '图像效果' })),
  ...LEVEL_EVENT_METAS.systemOrder.map((m: any) => ({ ...m, group: '系统操作' })),
  ...LEVEL_EVENT_METAS.groupOrder.map((m: any) => ({ ...m, group: '群体控制' })),
  ...LEVEL_EVENT_METAS.levelOrder.map((m: any) => ({ ...m, group: '关卡控制' })),
  // 处理 bodyOrder（嵌套 children 结构）
  ...LEVEL_EVENT_METAS.bodyOrder.flatMap((group: any) =>
    group.children.map((child: any) => ({
      ...child,
      group: group.label
    }))
  )
];

// 向导模式配置
export {
  LEVEL_WIZARD_CATEGORIES,
  LEVEL_WIZARD_FIELD_CONFIG,
  enhanceFieldMeta
} from './wizard';
