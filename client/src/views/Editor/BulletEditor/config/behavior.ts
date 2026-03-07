// client/src/views/Editor/BulletEditor/config/behavior.ts
import type { BulletMetaItem } from './types';

export const BULLET_BEHAVIOR_METAS: BulletMetaItem[] = [
    {
        key: 'hitType', label: '点击类型 (hitType)', type: 'select', options: [
            { label: '矩形 (rect)', value: 'rect' },
            { label: '射线 (longLine)', value: 'longLine' },
        ]
    },
    { key: 'bulletLife', label: '生命时长 (bulletLife)', type: 'number', desc: '单位：秒' },
    { key: 'lifeRandom', label: '寿命随机 (lifeRandom)', type: 'number' },
    { key: 'bulletWidth', label: '碰撞宽度 (bulletWidth)', type: 'number' },
    { key: 'bulletShakeWidth', label: '抖动宽度 (bulletShakeWidth)', type: 'number' },
    { key: 'penetrationNum', label: '穿透数量 (penetrationNum)', type: 'number' },
    { key: 'penetrationGap', label: '穿透间隔 (penetrationGap)', type: 'number' },
    { key: 'attackGap', label: '攻击间隔 (attackGap)', type: 'number' },
    { key: 'attackDelay', label: '攻击延迟 (attackDelay)', type: 'number' },
    { key: 'noHitTime', label: '无视攻击时间 (noHitTime)', type: 'number' },
    { key: 'hideTime', label: '隐藏时间 (hideTime)', type: 'number' },
    { key: 'hitGap', label: '击中间隔 (hitGap)', type: 'number' },
    { key: 'twoHitGap', label: '连续击中间隔 (twoHitGap)', type: 'number' },
];

export const BULLET_SHOOT_METAS: BulletMetaItem[] = [
    { key: 'bulletNum', label: '子弹数量 (bulletNum)', type: 'number' },
    { key: 'shootGap', label: '发射间隔 (shootGap)', type: 'number' },
    { key: 'shootNum', label: '连发次数 (shootNum)', type: 'number' },
    { key: 'shootRecoil', label: '射击后坐力 (shootRecoil)', type: 'number' },
    { key: 'screenShakeValue', label: '屏幕震动 (screenShakeValue)', type: 'number' },
    { key: 'aiShootRange', label: 'AI 射程 (aiShootRange)', type: 'number' },
];

export const BULLET_FLAG_METAS: BulletMetaItem[] = [
    { key: 'sameCampB', label: '同阵营 (sameCampB)', type: 'switch' },
    { key: 'noHitB', label: '不命中 (noHitB)', type: 'switch' },
    { key: 'noHurtEffectB', label: '无伤害特效 (noHurtEffectB)', type: 'switch' },
    { key: 'whippB', label: '鞭策 (whippB)', type: 'switch' },
    { key: 'noMagneticB', label: '无磁力 (noMagneticB)', type: 'switch' },
    { key: 'noBeClearB', label: '不被清理 (noBeClearB)', type: 'switch' },
    { key: 'implodingB', label: '向内坍塌 (implodingB)', type: 'switch' },
    { key: 'twoHitSameNameB', label: '同名连续击中 (twoHitSameNameB)', type: 'switch' },
    { key: 'oneHitBodyB', label: '单体击中 (oneHitBodyB)', type: 'switch' },
];
