// client/src/views/Editor/BodyEditor/config/physics.ts

import type { BodyMetaItem } from './types';

/** 运动物理参数 <motionD> */
export const BODY_PHYSICS_METAS: BodyMetaItem[] = [
    {
        key: 'F_G',
        label: '重力因子 (F_G)',
        type: 'number',
        desc: '重力系数。数值越大下落越快，默认为 1'
    },
    {
        key: 'F_I',
        label: '惯性因子 (F_I)',
        type: 'number',
        desc: '惯性系数。数值越大起步和停止越慢（滑步感），默认为 1'
    },
    {
        key: 'F_F',
        label: '地面摩擦力 (F_F)',
        type: 'number',
        desc: '摩擦系数。影响停止速度，默认为 0.5'
    },
    {
        key: 'F_AIR',
        label: '空气阻力 (F_AIR)',
        type: 'number',
        desc: '空气阻力系数。影响空中移动衰减'
    },
    {
        key: 'jumpMul',
        label: '跳跃乘数',
        type: 'number',
        desc: '跳跃力度乘数。默认为 1'
    },
    {
        key: 'vRan',
        label: '速度随机范围',
        type: 'number',
        desc: '移动速度随机浮动比例。如 0.2 代表上下 20% 浮动'
    },
    {
        key: 'jumpDelayT',
        label: '跳跃延迟',
        type: 'number',
        desc: '起跳前的预备动作延迟（秒）'
    },
    {
        key: 'maxVx',
        label: '最大速度 (maxVx)',
        type: 'number',
        desc: 'X 轴最大移动速度'
    },
    {
        key: 'maxJumpNum',
        label: '最大跳跃次数',
        type: 'number',
        desc: '最大连跳次数。默认为 1'
    },

    {
        key: 'tween',
        label: '缓动系数 (tween)',
        type: 'number',
        desc: '平滑移动系数。默认为 100'
    },
    {
        key: 'moveWhenVB',
        label: 'V状态移动 (moveWhenVB)',
        type: 'switch',
        desc: '僵直状态下是否允许移动。默认为 false'
    },
    {
        key: 'imgRaB',
        label: '图像旋转 (imgRaB)',
        type: 'switch',
        desc: '图像是否随运动方向旋转。默认为 false'
    },
    {
        key: 'dieEN',
        label: '死亡特效 (dieEN)',
        type: 'number',
        desc: '死亡特效 ID。0 为默认'
    },
    {
        key: 'headRectScale',
        label: '头部判定缩放 (headRectScale)',
        type: 'number',
        desc: '头部受击判定框缩放比例。默认为 1'
    },


];

/** 飞行与移动扩展 */
export const BODY_MOVE_EXT_METAS: BodyMetaItem[] = [
    {
        key: 'motionState',
        label: '运动状态 (motionState)',
        type: 'string',
        desc: '运动模式。stand (地面/行走), fly (飞行)'
    },
    {
        key: 'flyType',
        label: '飞行类型 (flyType)',
        type: 'select',
        desc: '飞行行为类型',
        options: [
            { label: '普通 (normal)', value: 'normal' },
            { label: '缓动 (tween)', value: 'tween' },
            { label: '太空 (space)', value: 'space' }
        ]
    },
    {
        key: 'flyUseSpiderB',
        label: '节点飞行 (flyUseSpiderB)',
        type: 'switch',
        desc: '飞行单位是否使用节点寻路 (Spider)。默认为 false'
    },
    {
        key: 'dieJumpMul',
        label: '死亡跳跃乘数 (dieJumpMul)',
        type: 'number',
        desc: '死亡时的击飞跳跃力度乘数。默认为 1'
    },
];
