// client/src/views/Editor/BodyEditor/config/attack.ts

import type { BodyMetaItem } from './types';

/** 攻击定义详细字段 <hurt> */
export const ATTACK_METAS: { [key: string]: BodyMetaItem[] } = {
  basic: [
    {
      key: 'keyName',
      label: '内部 ID',
      type: 'string',
      desc: '内部逻辑使用的 ID'
    },
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
      desc: '技能冷却时间/攻击间隔。\n注意这个似乎没有过调用，是否有效有待验证。'
    },
    {
      key: 'attackType',
      label: '攻击类型',
      type: 'select',
      desc: '攻击属性类型',
      options: [
        { label: '直伤 (direct)', value: 'direct', desc: '默认数值，无特殊效果' },
        { label: '神圣 (holy)', value: 'holy', desc: '无视闪避/丢失/技能闪避。攻击必定命中，不会因敌方的技能闪避/闪避状态或自身的丢失状态被闪避。' },
        { label: '精准 (accurate)', value: 'accurate', desc: '无视闪避/丢失，但能被技能闪避影响。' },
        { label: '穿透 (through)', value: 'through', desc: '无视部分伤害减免 (underHurtMul)。' },
        { label: '混乱 (chaos)', value: 'chaos', desc: '禁用弱点。该属性的攻击不会触发弱点伤害倍率。' }
      ]
    },
  ],
  hurt: [
    {
      key: 'hurtRatio',
      label: '伤害倍率',
      type: 'number',
      desc: '基于基础伤害的倍率。默认 1'
    },
    {
      key: 'hurtMul',
      label: '额外增伤',
      type: 'number',
      desc: '基础伤害之外的额外伤害乘数。默认 1'
    },
    {
      key: 'continuousNum',
      label: '连击次数',
      type: 'number',
      desc: '最大尝试使用同一攻击动作的次数。参见秘境虚炎狼 - sprintAttack'
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
  ],
  range: [
    {
      key: 'grapMaxLen',
      label: '最大长度 (grapMaxLen)',
      type: 'number',
      desc: '攻击生效的最大距离限制'
    },
    {
      key: 'grapRect',
      label: '抓取范围 (grapRect)',
      type: 'string',
      desc: '攻击判定范围 (x, y, w, h)。定义了攻击生效的区域'
    },
    {
      key: 'grapMinLen',
      label: '最小长度 (grapMinLen)',
      type: 'number',
      desc: '攻击生效的最小距离限制'
    },
    {
      key: 'mustGrapRectB',
      label: '必须判定成功',
      type: 'switch',
      desc: 'mustGrapRectB：是否必须在判定区域内才生效'
    },
    {
      key: 'exactGrapRectB',
      label: '精确判定',
      type: 'switch',
      desc: 'exactGrapRectB：是否开启更精确的碰撞区域检查'
    }
  ],
  physics: [
    {
      key: 'beatBack',
      label: '击退距离',
      type: 'number',
      desc: '攻击命中时的击退距离'
    },
    {
      key: 'meBack',
      label: '自身反冲',
      type: 'number',
      desc: '攻击时自身向后的位移距离'
    },
    {
      key: 'transBackMul',
      label: '反冲倍率',
      type: 'number',
      desc: '自身反冲的缩放倍率'
    },
    {
      key: 'shakeValue',
      label: '受击震动',
      type: 'number',
      desc: '攻击命中时目标的震动幅度'
    },
    {
      key: 'screenShakeValue',
      label: '全屏震动',
      type: 'number',
      desc: '全屏震动强度'
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
      key: 'bulletArr',
      label: '子弹列表',
      type: 'multi_select',
      desc: '随机/顺序发射的子弹列表'
    },
    {
      key: 'skillArr',
      label: '触发技能',
      type: 'multi_select',
      desc: '攻击命中或施放时触发的子技能 ID 列表'
    },
    {
      key: 'noAiChooseB',
      label: 'AI 屏蔽',
      type: 'switch',
      desc: 'AI 是否不主动选择此动作'
    },
    {
      key: 'noShootB',
      label: '非射击动作',
      type: 'switch',
      desc: '是否标记为非射击动作 (不计入射击统计/效果)'
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
  ],
  effect: [
    { key: 'url', label: '特效路径', type: 'select_png', desc: '特效动画资源 (hitImgUrl)' },
    { key: 'soundUrl', label: '受击音效', type: 'string', desc: '命中的音效路径' },
    {
      key: 'con', label: '混合模式', type: 'select', options: [
        { label: '添加 (add)', value: 'add' },
        { label: '过滤 (filter)', value: 'filter' }
      ]
    },
    { key: 'raNum', label: '动画帧数', type: 'number' },
  ]
};
