// client/src/views/Editor/BulletEditor/config/motion.ts
import type { BulletMetaItem } from './types';

export const BULLET_MOTION_METAS: BulletMetaItem[] = [
    { key: 'bulletSpeed', label: '运动速度 (bulletSpeed)', type: 'number' },
    { key: 'gravity', label: '重力感应 (gravity)', type: 'number' },
    { key: 'bulletVra', label: '旋转速度 (bulletVra)', type: 'number' },
    { key: 'shakeAngle', label: '散射角度 (shakeAngle)', type: 'number' },
    { key: 'shootAngle', label: '发射夹角 (shootAngle)', type: 'number' },
    { key: 'bulletAngle', label: '初始角度 (bulletAngle)', type: 'number', desc: '-1000 为不设置' },
    { key: 'bulletAngleRange', label: '角度随机范围 (bulletAngleRange)', type: 'number' },
];

export const BULLET_SPEED_DETAIL_METAS: BulletMetaItem[] = [
    { key: 'speedD.min', label: '最小飞行速度', type: 'number' },
    { key: 'speedD.max', label: '最大飞行速度', type: 'number' },
    { key: 'speedD.a', label: '加速度 (a)', type: 'number' },
    { key: 'speedD.random', label: '速度随机比例', type: 'number' },
];

export const BULLET_FOLLOW_METAS: BulletMetaItem[] = [
    { key: 'followD.value', label: '追踪强度', type: 'number' },
    { key: 'followD.maxTime', label: '最长追踪时间', type: 'number' },
    { key: 'followD.delay', label: '追踪延迟', type: 'number' },
    { key: 'followD.hitIsTargetB', label: '跟踪击中目标', type: 'switch' },
];

export const BULLET_BOUNCE_METAS: BulletMetaItem[] = [
    { key: 'bounceD.body', label: '单位反弹次数', type: 'number' },
    { key: 'bounceD.floor', label: '地面反弹次数', type: 'number' },
    { key: 'bounceD.vMul', label: '反弹后速度乘数', type: 'number' },
    { key: 'bounceD.noDieB', label: '撞击后不消失', type: 'switch' },
    { key: 'bounceD.hurtNumAdd', label: '反弹伤害增量', type: 'number' },
];
