// client/src/views/Editor/BulletEditor/config/skill.ts
import type { BulletMetaItem } from './types';

export const BULLET_SKILL_METAS: BulletMetaItem[] = [
    { key: 'skillArr', label: '技能列表', type: 'multi_select' },
    { key: 'godSkillArr', label: '神级技能', type: 'multi_select' },
    { key: 'bulletSkillArr', label: '子弹专属技能', type: 'multi_select' },
];

export const BULLET_BOOM_METAS: BulletMetaItem[] = [
    { key: 'boomD.radius', label: '爆炸半径', type: 'number' },
    { key: 'boomD.floorB', label: '地面爆炸', type: 'switch' },
    { key: 'boomD.bodyB', label: '单位爆炸', type: 'switch' },
    { key: 'boomD.hurtMul', label: '爆炸伤害倍数', type: 'number' },
    { key: 'boomD.maxHurtNum', label: '最大伤害单位', type: 'number' },
];

export const BULLET_LINE_METAS: BulletMetaItem[] = [
    { key: 'lineD.color', label: '射线颜色', type: 'color' },
    { key: 'lineD.lightColor', label: '发光颜色', type: 'color' },
    { key: 'lineD.size', label: '射线尺寸', type: 'number' },
    { key: 'lineD.lightSize', label: '发光尺寸', type: 'number' },
    { key: 'lineD.blendMode', label: '混合模式', type: 'string' },
];
