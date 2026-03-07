// client/src/views/Editor/BulletEditor/config/basic.ts
import type { BulletMetaItem } from './types';

export const BULLET_BASIC_METAS: BulletMetaItem[] = [
    { key: 'name', label: '子弹 ID (name)', type: 'string', desc: '内部唯一标识' },
    { key: 'cnName', label: '中文名称 (cnName)', type: 'string' },
    { key: 'kind', label: '伤害种类 (kind)', type: 'string', desc: '对应 HurtKind' },
    { key: 'hole', label: '弹孔类型 (hole)', type: 'string', desc: '对应 HoleType' },
    { key: 'baseLabel', label: '基础标签 (baseLabel)', type: 'string', desc: '默认同 name' },
    { key: 'armsType', label: '武器类型 (armsType)', type: 'string', desc: '枪械类型，影响行为' },
    { key: 'actionLabel', label: '动作标签 (actionLabel)', type: 'string' },
];

export const BULLET_HURT_METAS: BulletMetaItem[] = [
    { key: 'hurtRatio', label: '伤害比例 (hurtRatio)', type: 'number', desc: '基础系数' },
    { key: 'hurtMul', label: '伤害倍数 (hurtMul)', type: 'number' },
    {
        key: 'attackType', label: '攻击类型 (attackType)', type: 'select', options: [
            { label: '直接 (direct)', value: 'direct' },
            { label: '爆炸 (boom)', value: 'boom' },
            { label: '持续 (stay)', value: 'stay' },
        ]
    },
    { key: 'beatBack', label: '击退力 (beatBack)', type: 'number' },
    { key: 'targetShakeValue', label: '目标震动 (targetShakeValue)', type: 'number' },
    { key: 'transBackMul', label: '反击倍数 (transBackMul)', type: 'number' },
];
