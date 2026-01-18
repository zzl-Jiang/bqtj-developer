// client/src/views/Editor/SkillEditor/config/flag.ts

import type { SkillMetaItem } from './types';

export const FLAG_META: SkillMetaItem[] = [
  {
    key: 'showInLifeBarB',
    label: '血条显示',
    type: 'switch',
    group: 'flags'
  },
  {
    key: 'ignoreSilenceB',
    label: '无视沉默',
    type: 'switch',
    group: 'flags'
  },
  {
    key: 'ignoreNoSkillB',
    label: '无视封锁',
    type: 'switch',
    group: 'flags'
  },
  {
    key: 'overlyingB',
    label: '允许叠加',
    type: 'switch',
    group: 'flags'
  },
  {
    key: 'noInClonedB',
    label: '禁止分身继承',
    type: 'switch',
    group: 'flags'
  },
  {
    key: 'noBeClearB',
    label: '不被清除',
    type: 'switch',
    group: 'flags'
  },
  {
    key: 'everNoClearB',
    label: '永不清除',
    type: 'switch',
    group: 'flags'
  },
  {
    key: 'summonedUnitsB',
    label: '召唤单位',
    type: 'switch',
    group: 'flags'
  },
  {
    key: 'changeHurtB',
    label: '修改原始伤害',
    type: 'switch',
    group: 'flags'
  },
  {
    key: 'noSkillDodgeB',
    label: '无视概率免疫',
    type: 'switch',
    group: 'flags'
  },
  {
    key: 'ignoreImmunityB',
    label: '无视技能免疫',
    type: 'switch',
    group: 'flags'
  },
  {
    key: 'noCopyB',
    label: '禁止复制',
    type: 'switch',
    group: 'flags'
  },
  {
    key: 'noRandomListB',
    label: '不进随机池',
    type: 'switch',
    group: 'flags'
  },
  {
    key: 'isDefenceB',
    label: '免疫伤害',
    type: 'switch',
    group: 'flags'
  },
  {
    key: 'isInvincibleB',
    label: '不可阻挡',
    type: 'switch',
    group: 'flags'
  },
  {
    key: 'noReStateB',
    label: '不反复触发',
    type: 'switch',
    group: 'flags'
  },
  {
    key: 'noCdMulB',
    label: '不受冷却加成',
    type: 'switch',
    group: 'flags'
  },
  {
    key: 'groundDieB',
    label: '落地效果消失',
    type: 'switch',
    group: 'flags'
  },
  {
    key: 'wantDescripB',
    label: '需求/显示描述',
    type: 'switch',
    group: 'flags'
  },
  {
    key: 'targetPointEffectB',
    label: '目标点生效',
    type: 'switch',
    group: 'flags'
  }
];