// client/src/views/Editor/Validators/types.ts

import type { ModuleKey } from "../../../store/useModStore";

export interface ValidationError {
  module: ModuleKey;    // 必须是有效的 Store 模块名
  targetId: string;     // 项目 ID
  tab?: string;         // 页签 ID
  subId?: string;       // 详细子项 ID
  type: 'error' | 'warning';
  message: string;
}