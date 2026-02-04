// client/src/views/Editor/BodyEditor/config/battle.ts

import type { BodyMetaItem } from './types';

export const BODY_LIFEBAR_METAS: BodyMetaItem[] = [
    {
        key: 'doubleLifeBarB',
        label: '双层血条 (doubleLifeBarB)',
        type: 'switch',
        desc: '是否显示双层血条（如虚晶蝎）。默认为 false'
    },
    {
        key: 'lifeBarExtraHeight',
        label: '血条高度偏移 (lifeBarExtraHeight)',
        type: 'number',
        desc: '血条显示高度偏移量（像素）。正数向上，负数向下'
    }
];

export const BODY_BATTLE_METAS: BodyMetaItem[] = [
    {
        key: 'lifeRatio',
        label: '生命系数 (lifeRatio)',
        type: 'number',
        desc: '生命值倍率。最终生命值 = 100 * 倍率 * 等级加成'
    },
    {
        key: 'rosRatio',
        label: '僵直系数 (rosRatio)',
        type: 'number',
        desc: '僵每损失百分之多少生命会进入僵直，默认为 0.2'
    },
    {
        key: 'defenceRatio',
        label: '防御系数 (defenceRatio)',
        type: 'number',
        desc: '防御系数。默认为 0'
    },
    {
        key: 'headHurtMul',
        label: '爆头伤害乘数 (headHurtMul)',
        type: 'number',
        desc: '爆头伤害倍率。默认为 2'
    },
    {
        key: 'showLevel',
        label: '显示等级 (showLevel)',
        type: 'number',
        desc: '显示等级。若 >= 999 视为特殊 Boss'
    },
    {
        key: 'superDpsAdd',
        label: '精英伤害加成 (superDpsAdd)',
        type: 'number',
        desc: '精英 (Super) 状态下的额外伤害加成'
    },
    {
        key: 'shootLenMul',
        label: '射程乘数 (shootLenMul)',
        type: 'number',
        desc: '射程倍率。影响索敌距离，默认为 1'
    },
    {
        key: 'nextAttackTime',
        label: '下次攻击时间 (nextAttackTime)',
        type: 'number',
        desc: '攻击间隔时间'
    },
    {
        key: 'avtiveSkillCdOverT',
        label: '主动技能CD溢出',
        type: 'number',
        desc: '主动技能 CD 溢出时间。默认为 2'
    },
];
