// client/src/views/Editor/SkillEditor/config/index.ts

import { BASE_META } from './base';
import { LOGIC_META } from './logic';
import { FLAG_META } from './flags';
import { TARGET_META } from './target';

// 导出单独的模块，方便 Section 组件直接使用
export { BASE_META, LOGIC_META, FLAG_META, TARGET_META };

// 导出所有下拉选项和类型
export * from './options';
export * from './types';

// 合并后的总 Meta，用于一些需要遍历所有字段的场景
export const SKILL_UI_META = [
  ...BASE_META,
  ...LOGIC_META,
  ...FLAG_META
];