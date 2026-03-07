// client/src/views/Editor/DropEditor/config/types.ts

import type { BulletMetaItem, CategoryConfig } from '../../BulletEditor/config/types';

// DropEditor uses the same meta item type as BulletEditor
export type DropMetaItem = BulletMetaItem;

// Re-export CategoryConfig for convenience
export type { CategoryConfig };
