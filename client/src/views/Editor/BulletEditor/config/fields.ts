// client/src/views/Editor/BulletEditor/config/fields.ts
// 子弹编辑器字段配置统一导出

import type { BulletMetaItem } from './types';

// ==================== basic.ts ====================

export const BULLET_BASIC_FIELDS: BulletMetaItem[] = [
    { key: 'name', label: '子弹 ID (name)', type: 'string', desc: '内部唯一标识' },
    { key: 'cnName', label: '中文名称 (cnName)', type: 'string' },
    { key: 'kind', label: '伤害种类 (kind)', type: 'string', desc: '对应 HurtKind' },
    { key: 'hole', label: '弹孔类型 (hole)', type: 'string', desc: '对应 HoleType' },
    { key: 'baseLabel', label: '基础标签 (baseLabel)', type: 'string', desc: '默认同 name' },
    { key: 'armsType', label: '武器类型 (armsType)', type: 'string', desc: '枪械类型，影响行为' },
    { key: 'actionLabel', label: '动作标签 (actionLabel)', type: 'string' },
];

export const BULLET_HURT_FIELDS: BulletMetaItem[] = [
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

// ==================== behavior.ts ====================

export const BULLET_BEHAVIOR_FIELDS: BulletMetaItem[] = [
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

export const BULLET_SHOOT_FIELDS: BulletMetaItem[] = [
    { key: 'bulletNum', label: '子弹数量 (bulletNum)', type: 'number' },
    { key: 'shootGap', label: '发射间隔 (shootGap)', type: 'number' },
    { key: 'shootNum', label: '连发次数 (shootNum)', type: 'number' },
    { key: 'shootRecoil', label: '射击后坐力 (shootRecoil)', type: 'number' },
    { key: 'screenShakeValue', label: '屏幕震动 (screenShakeValue)', type: 'number' },
    { key: 'aiShootRange', label: 'AI 射程 (aiShootRange)', type: 'number' },
];

export const BULLET_FLAG_FIELDS: BulletMetaItem[] = [
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

// ==================== motion.ts ====================

export const BULLET_MOTION_FIELDS: BulletMetaItem[] = [
    { key: 'bulletSpeed', label: '运动速度 (bulletSpeed)', type: 'number' },
    { key: 'gravity', label: '重力感应 (gravity)', type: 'number' },
    { key: 'bulletVra', label: '旋转速度 (bulletVra)', type: 'number' },
    { key: 'shakeAngle', label: '散射角度 (shakeAngle)', type: 'number' },
    { key: 'shootAngle', label: '发射夹角 (shootAngle)', type: 'number' },
    { key: 'bulletAngle', label: '初始角度 (bulletAngle)', type: 'number', desc: '-1000 为不设置' },
    { key: 'bulletAngleRange', label: '角度随机范围 (bulletAngleRange)', type: 'number' },
    { key: 'extendGap', label: '延伸间隔 (extendGap)', type: 'number' },
];

export const BULLET_GATLIN_FIELDS: BulletMetaItem[] = [
    { key: 'gatlinNum', label: '加特林子弹数 (gatlinNum)', type: 'number', desc: '加特林模式下的连续发射数量' },
    { key: 'gatlinRange', label: '加特林散射范围 (gatlinRange)', type: 'number', desc: '加特林模式下的角度散射范围' },
];

export const BULLET_SPEED_DETAIL_FIELDS: BulletMetaItem[] = [
    { key: 'speedD.min', label: '最小飞行速度', type: 'number' },
    { key: 'speedD.max', label: '最大飞行速度', type: 'number' },
    { key: 'speedD.a', label: '加速度 (a)', type: 'number' },
    { key: 'speedD.random', label: '速度随机比例', type: 'number' },
];

export const BULLET_FOLLOW_FIELDS: BulletMetaItem[] = [
    { key: 'followD.value', label: '追踪强度', type: 'number' },
    { key: 'followD.maxTime', label: '最长追踪时间', type: 'number' },
    { key: 'followD.delay', label: '追踪延迟', type: 'number' },
    { key: 'followD.hitIsTargetB', label: '跟踪击中目标', type: 'switch' },
];

export const BULLET_BOUNCE_FIELDS: BulletMetaItem[] = [
    { key: 'bounceD.body', label: '单位反弹次数', type: 'number' },
    { key: 'bounceD.floor', label: '地面反弹次数', type: 'number' },
    { key: 'bounceD.vMul', label: '反弹后速度乘数', type: 'number' },
    { key: 'bounceD.noDieB', label: '撞击后不消失', type: 'switch' },
    { key: 'bounceD.hurtNumAdd', label: '反弹伤害增量', type: 'number' },
];

// ==================== skill.ts ====================

export const BULLET_SKILL_FIELDS: BulletMetaItem[] = [
    { key: 'skillArr', label: '技能列表', type: 'multi_select' },
    { key: 'godSkillArr', label: '神级技能', type: 'multi_select' },
    { key: 'bulletSkillArr', label: '子弹专属技能', type: 'multi_select' },
];

export const BULLET_BOOM_FIELDS: BulletMetaItem[] = [
    { key: 'boomD.radius', label: '爆炸半径', type: 'number' },
    { key: 'boomD.floorB', label: '地面爆炸', type: 'switch' },
    { key: 'boomD.bodyB', label: '单位爆炸', type: 'switch' },
    { key: 'boomD.hurtMul', label: '爆炸伤害倍数', type: 'number' },
    { key: 'boomD.maxHurtNum', label: '最大伤害单位', type: 'number' },
];

export const BULLET_LINE_FIELDS: BulletMetaItem[] = [
    { key: 'lineD.color', label: '射线颜色', type: 'color' },
    { key: 'lineD.lightColor', label: '发光颜色', type: 'color' },
    { key: 'lineD.size', label: '射线尺寸', type: 'number' },
    { key: 'lineD.lightSize', label: '发光尺寸', type: 'number' },
    { key: 'lineD.blendMode', label: '混合模式', type: 'string' },
];

// ==================== visual.ts ====================

export const BULLET_VISUAL_FIELDS: BulletMetaItem[] = [
    { key: 'playImgLabel', label: '资源标签 (playImgLabel)', type: 'string' },
    // 这里简化展示，实际 ImgUrlDefine 还有很多子属性
    { key: 'bulletImg.url', label: '子弹图片 URL', type: 'string' },
    { key: 'bulletLeftImg.url', label: '向左图片 URL', type: 'string' },
    { key: 'fireImg.url', label: '开火特效 URL', type: 'string' },
    { key: 'hitImg.url', label: '击中特效 URL', type: 'string' },
    { key: 'hitFloorImg.url', label: '击中地面 URL', type: 'string' },
    { key: 'smokeImg.url', label: '烟雾特效 URL', type: 'string' },
    { key: 'selfBoomImg.url', label: '自爆特效 URL', type: 'string' },
];
