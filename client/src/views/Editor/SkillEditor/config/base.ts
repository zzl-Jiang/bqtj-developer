// client/src/views/Editor/SkillEditor/config/base.ts

import type { SkillMetaItem } from './types';

export const BASE_META: SkillMetaItem[] = [
  {
    key: 'name',
    label: '技能ID (必填)',
    type: 'string',
    group: 'base',
    desc: '技能的基础ID或名称，必须存在且不能重复。'
  },
  {
    key: 'cnName',
    label: '显示名称',
    type: 'string',
    group: 'base',
    desc: '方便记忆、游戏内部分显示的技能中文名称，可选且可以重复。'
  },
  {
    key: 'iconUrl36',
    label: '图标URL',
    type: 'select_png',
    group: 'base',
    desc: '游戏内技能栏显示的图标。\n可选，也可以使用游戏已有素材。\n输入后按下回车创建新标签。'
  },
];