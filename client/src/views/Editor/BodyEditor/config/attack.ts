// client/src/views/Editor/BodyEditor/config/attack.ts

import type { BodyMetaItem } from './types';

/** 攻击定义详细字段 <hurt> */
export const ATTACK_METAS: { [key: string]: BodyMetaItem[] } = {
    basic: [
        {
            key: 'cn',
            label: '动作名称',
            type: 'string',
            desc: '动作或者技能的中文名称'
        },
        {
            key: 'imgLabel',
            label: '动画标签',
            type: 'string',
            desc: '必须对应 SWF 中的帧标签 (Label)'
        },
        {
            key: 'cd',
            label: '冷却时间',
            type: 'number',
            desc: '技能冷却时间/攻击间隔'
        },
        {
            key: 'attackType',
            label: '攻击类型',
            type: 'select',
            desc: '攻击属性类型',
            options: [
                { label: '物理 (physics)', value: 'physics' },
                { label: '魔法 (magic)', value: 'magic' }
            ]
        },
    ],
    hurt: [
        {
            key: 'hurtRatio',
            label: '伤害倍率',
            type: 'number',
            desc: '基于基础伤害的倍率。'
        },
        {
            key: 'continuousNum',
            label: '连击次数',
            type: 'number',
            desc: '如连发导弹的数量。默认为 0'
        },
        {
            key: 'hitMaxNum',
            label: '最大命中数',
            type: 'number',
            desc: '单次攻击最多命中多少目标。默认 999'
        },
        {
            key: 'oneHurtB',
            label: '单次伤害模式',
            type: 'switch',
            desc: '若为 true，则该技能对同一目标只造成一次伤害'
        },
        {
            key: 'grapRect',
            label: '抓取范围 (grapRect)',
            type: 'string',
            desc: '攻击判定范围 (x, y, w, h)。定义了攻击生效的区域'
        },
        {
            key: 'shakeValue',
            label: '震屏强度',
            type: 'number',
            desc: '攻击命中时的震屏幅度'
        },
        {
            key: 'beatBack',
            label: '击退距离',
            type: 'number',
            desc: '攻击命中时的击退距离'
        },
        {
            key: 'screenShakeValue',
            label: '全屏震动',
            type: 'number',
            desc: '全屏震动强度（更强烈的反馈）'
        },
        {
            key: 'hitImgUrl',
            label: '受击特效',
            type: 'string',
            desc: '受击特效路径及参数 (name, con, raNum, soundUrl)'
        },
        {
            key: 'skillArr',
            label: '触发技能',
            type: 'string',
            desc: '攻击命中或施放时触发的子技能 ID 列表'
        },

    ],
    logic: [
        {
            key: 'bulletLabel',
            label: '发射子弹',
            type: 'string',
            desc: '发射的子弹 ID。若填 no 则不发射'
        },
        {
            key: 'noUseOtherSkillB',
            label: '动作锁 (禁用其他技能)',
            type: 'switch',
            desc: '动作进行期间禁止使用其他技能'
        },
        {
            key: 'ingfollowB',
            label: '攻击时跟随目标',
            type: 'switch',
            desc: '攻击动作播放中是否始终跟随目标转向'
        },
    ]
};
