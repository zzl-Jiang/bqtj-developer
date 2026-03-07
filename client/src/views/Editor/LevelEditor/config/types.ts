// client/src/views/Editor/LevelEditor/config/types.ts

import type { BulletMetaItem, CategoryConfig } from '../../BulletEditor/config/types';

// LevelEditor uses the same meta item type as BulletEditor
export type LevelMetaItem = BulletMetaItem;

// Re-export CategoryConfig for convenience
export type { CategoryConfig };
