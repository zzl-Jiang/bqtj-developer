// client/src/views/Editor/ArmsEditor/config/wizard.ts
// 向导模式配置 - 为 ArmsEditor 定义分类和字段重要性

import type { CategoryConfig, BulletMetaItem } from '../../BulletEditor/config/types';

/**
 * 分类配置
 * 将 Arms 的所有字段组织成 7 个逻辑分类
 */
export const ARMS_WIZARD_CATEGORIES: CategoryConfig[] = [
    {
        id: 'basic',
        label: '基础属性',
        icon: 'FlashOutline',
        iconColor: '#18a058',
        description: '武器的名称、品质、类型等核心身份信息。这些是武器最基本的数据，必须先配置。',
        fields: ['cnName', 'name', 'color', 'armsType', 'rareDropLevel', 'index', 'description', 'info']
    },
    {
        id: 'combat-core',
        label: '核心战斗',
        icon: 'FlashOutline',
        iconColor: '#f2c97d',
        description: '决定武器伤害输出的关键属性。攻击力、射速、弹夹容量是武器性能的核心指标。',
        fields: ['hurtRatio', 'attackGap', 'dpsMul', 'capacity', 'reloadGap', 'gunNum', 'shootShakeAngle']
    },
    {
        id: 'damage',
        label: '伤害系统',
        icon: 'HeartOutline',
        iconColor: '#e88080',
        description: '子弹的伤害计算方式，包括暴击判定、伤害倍率、击退效果等。',
        fields: ['hurtMul', 'transBackMul', 'attackType', 'beatBack', 'targetShakeValue', 'critD.pro', 'critD.mul', 'critD3.pro', 'critD3.mul']
    },
    {
        id: 'motion',
        label: '运动与特效',
        icon: 'RocketOutline',
        iconColor: '#70c0e8',
        description: '子弹的飞行速度、重力影响、生命周期，以及追踪、反弹、爆炸等特殊效果。',
        fields: ['bulletSpeed', 'gravity', 'bulletVra', 'bulletAngle', 'bulletAngleRange', 'bulletLife', 'lifeRandom', 'hitType', 'penetrationNum', 'speedD.min', 'speedD.max', 'speedD.a', 'followD.value', 'followD.delay', 'bounceD.body', 'bounceD.floor', 'boomD.radius']
    },
    {
        id: 'flags',
        label: '行为标志',
        icon: 'ToggleOutline',
        iconColor: '#63e2b7',
        description: '控制武器和子弹特殊行为的开关，如是否同阵营有效、是否穿透等。',
        fields: ['sameCampB', 'noHitB', 'noHurtEffectB', 'whippB', 'noMagneticB', 'noBeClearB', 'oneHitBodyB']
    },
    {
        id: 'visual',
        label: '视觉资源',
        icon: 'ImageOutline',
        iconColor: '#a8c5f0',
        description: '武器的图标、贴图、音效、枪火特效等视觉和听觉资源。',
        fields: ['iconUrl', 'armsImgLabel', 'fireImgType', 'shootSoundUrl', 'allImgPartArr', 'allImgRange', 'textureImgRange', 'bodyImgRange', 'barrelImgRange', 'gripImgRange', 'bulletImgRange', 'stockImgRange', 'glassImgRange']
    },
    {
        id: 'advanced',
        label: '进阶配置',
        icon: 'SettingsOutline',
        iconColor: '#b4b4b4',
        description: '弩箭模式、进化等级、合成碎片等高级功能。普通玩家可暂不配置。',
        fields: ['crossbowD.focoB', 'crossbowD.minDelayMul', 'evoMaxLv', 'chipNum', 'composeLv', 'composeMax', 'recordD.piano', 'gatlinNum', 'gatlinRange', 'skillArr', 'godSkillArr']
    }
];

/**
 * 增强的字段配置
 * 在原有 Meta 配置基础上添加重要性级别和文档说明
 */
export const ARMS_WIZARD_FIELD_CONFIG: Record<string, Partial<BulletMetaItem>> = {
    // ===== 基础属性 - 核心 =====
    cnName: {
        importance: 'core',
        docContent: '武器在游戏中显示的中文名称，玩家看到的名字。建议取一个响亮好记的名字。',
        exampleValue: '雷霆之怒'
    },
    name: {
        importance: 'core',
        docContent: '武器的英文唯一标识，用于代码和XML中引用。只能包含字母、数字、下划线。',
        exampleValue: 'thunderFury'
    },
    color: {
        importance: 'core',
        docContent: '武器的品质颜色，影响武器的背景色和掉落光效。品质越高，属性越好。',
        exampleValue: 'orange'
    },
    armsType: {
        importance: 'core',
        docContent: '武器的类型分类，如狙击枪、步枪、霰弹枪等。不同类型有不同的使用方式和动画。',
        exampleValue: 'rifle'
    },
    description: {
        importance: 'advanced',
        docContent: '武器获取时显示的描述文字，可以简要介绍武器特点。',
        exampleValue: '一把蕴含雷霆之力的神兵'
    },
    info: {
        importance: 'optional',
        docContent: '特殊说明，用于标注武器的额外信息。'
    },
    rareDropLevel: {
        importance: 'advanced',
        docContent: '稀有掉落等级，数值越高掉落越困难，但通常属性也越好。',
        exampleValue: 3
    },
    index: {
        importance: 'optional',
        docContent: '排序索引，控制武器在图鉴中的显示顺序。',
        exampleValue: 100
    },

    // ===== 核心战斗 - 核心 =====
    hurtRatio: {
        importance: 'core',
        docContent: '武器的基础攻击力，决定每次射击造成的伤害。这是武器最重要的属性之一。',
        exampleValue: 100,
        relatedFields: ['dpsMul', 'hurtMul']
    },
    attackGap: {
        importance: 'core',
        docContent: '两次攻击之间的间隔时间（秒）。数值越小射速越快，但要注意与伤害的平衡。',
        exampleValue: 0.1,
        relatedFields: ['dpsMul']
    },
    dpsMul: {
        importance: 'core',
        docContent: 'DPS修正系数，用于调整武器的理论输出。保持1.0即可，除非需要特殊平衡。',
        exampleValue: 1.0
    },
    capacity: {
        importance: 'core',
        docContent: '弹夹容量，决定一次装弹可以发射多少发子弹。',
        exampleValue: 30
    },
    reloadGap: {
        importance: 'core',
        docContent: '换弹时间（秒），弹夹打空后需要多久完成换弹。',
        exampleValue: 2.0
    },
    gunNum: {
        importance: 'advanced',
        docContent: '枪管数量，大于1时可以同时发射多发子弹（霰弹效果）。',
        exampleValue: 1
    },
    shootShakeAngle: {
        importance: 'advanced',
        docContent: '射击散布角度，影响子弹的精准度。数值越大弹道越分散。',
        exampleValue: 5
    },

    // ===== 伤害系统 - 核心/进阶 =====
    hurtMul: {
        importance: 'core',
        docContent: '最终伤害倍率，对基础伤害进行乘法修正。1.0表示无修正。',
        exampleValue: 1.0
    },
    attackType: {
        importance: 'advanced',
        docContent: '攻击类型，决定伤害的计算方式。direct为直接伤害，other为其他特殊计算。',
        exampleValue: 'direct'
    },
    beatBack: {
        importance: 'advanced',
        docContent: '击退值，决定命中目标后将其击退的距离。',
        exampleValue: 10
    },
    'critD.pro': {
        importance: 'advanced',
        docContent: '普通暴击触发几率（0-1之间）。0.2表示20%概率触发暴击。',
        exampleValue: 0.2,
        relatedFields: ['critD.mul']
    },
    'critD.mul': {
        importance: 'advanced',
        docContent: '普通暴击时的伤害倍率。2.0表示暴击时造成双倍伤害。',
        exampleValue: 2.0,
        relatedFields: ['critD.pro']
    },
    'critD3.pro': {
        importance: 'optional',
        docContent: '三倍暴击（超暴击）的触发几率，优先级高于普通暴击。',
        exampleValue: 0.05
    },
    'critD3.mul': {
        importance: 'optional',
        docContent: '三倍暴击的伤害倍率，默认3倍。',
        exampleValue: 3.0
    },

    // ===== 运动与特效 - 核心/进阶 =====
    bulletSpeed: {
        importance: 'core',
        docContent: '子弹飞行速度，影响命中时间和手感。狙击枪通常较慢，步枪中等。',
        exampleValue: 800
    },
    gravity: {
        importance: 'advanced',
        docContent: '子弹受到的重力影响。正值会向下坠落，0为无重力（直线飞行）。',
        exampleValue: 0
    },
    bulletLife: {
        importance: 'core',
        docContent: '子弹存在时间（秒）。超过此时间子弹自动消失，防止内存泄漏。',
        exampleValue: 2.0
    },
    hitType: {
        importance: 'advanced',
        docContent: '碰撞检测类型。rect为矩形检测，longLine为长射线检测（穿透效果）。',
        exampleValue: 'rect'
    },
    penetrationNum: {
        importance: 'advanced',
        docContent: '穿透次数，子弹可以穿透多少个敌人。0或空表示不穿透。',
        exampleValue: 3
    },
    'speedD.min': {
        importance: 'optional',
        docContent: '变速效果的最小速度倍数。1.0表示正常速度。',
        exampleValue: 0.5
    },
    'speedD.max': {
        importance: 'optional',
        docContent: '变速效果的最大速度倍数。大于1表示加速。',
        exampleValue: 1.5
    },
    'followD.value': {
        importance: 'optional',
        docContent: '追踪强度，决定子弹追踪目标的灵敏程度。值越大追踪越精准。',
        exampleValue: 5
    },
    'followD.delay': {
        importance: 'optional',
        docContent: '追踪延迟（秒），发射后多久开始追踪。可用于制造曲线弹道。',
        exampleValue: 0.5
    },
    'bounceD.body': {
        importance: 'optional',
        docContent: '碰到敌人时的反弹次数。反弹时子弹不会消失，而是改变方向继续飞行。',
        exampleValue: 0
    },
    'bounceD.floor': {
        importance: 'optional',
        docContent: '碰到地面时的反弹次数。适合制作弹跳炸弹等效果。',
        exampleValue: 0
    },
    'boomD.radius': {
        importance: 'optional',
        docContent: '爆炸半径（像素），子弹命中或消失时造成范围伤害。',
        exampleValue: 100
    },

    // ===== 行为标志 - 进阶 =====
    sameCampB: {
        importance: 'advanced',
        docContent: '开启后，子弹对同阵营单位也有效（包括自己和队友）。',
        exampleValue: false
    },
    noHitB: {
        importance: 'optional',
        docContent: '开启后，子弹不会命中任何目标，可以穿透一切。适合纯特效子弹。',
        exampleValue: false
    },
    oneHitBodyB: {
        importance: 'optional',
        docContent: '开启后，每个单位只能被命中一次（即使有多发子弹也只算一次伤害）。',
        exampleValue: false
    },

    // ===== 视觉资源 - 核心/进阶 =====
    iconUrl: {
        importance: 'core',
        docContent: '武器图标的图片路径，在背包和商店中显示的小图标。',
        exampleValue: 'png/icon_weapon_thunder'
    },
    armsImgLabel: {
        importance: 'core',
        docContent: '武器贴图标识，决定武器在角色手中的外观。',
        exampleValue: 'arms_thunder'
    },
    shootSoundUrl: {
        importance: 'advanced',
        docContent: '射击音效文件路径，为空则使用默认音效。',
        exampleValue: 'sound/shoot_rifle'
    },

    // ===== 进阶配置 - 可选 =====
    'crossbowD.focoB': {
        importance: 'optional',
        docContent: '开启弩箭蓄力模式，长按可以蓄力增加伤害。',
        exampleValue: false
    },
    'crossbowD.minDelayMul': {
        importance: 'optional',
        docContent: '最小蓄力时间倍数，控制蓄力速度。',
        exampleValue: 0.5
    },
    evoMaxLv: {
        importance: 'optional',
        docContent: '最高进化等级，武器可以通过消耗材料进化多少次。',
        exampleValue: 5
    },
    chipNum: {
        importance: 'optional',
        docContent: '合成该武器需要的碎片数量。',
        exampleValue: 50
    },
    gatlinNum: {
        importance: 'optional',
        docContent: '加特林模式子弹数，大于0时激活加特林连射效果。',
        exampleValue: 0
    }
};

/**
 * 合并字段配置
 * 将原有的 Meta 配置与向导配置合并
 */
export function enhanceFieldMeta(baseMeta: BulletMetaItem): BulletMetaItem {
    const enhancement = ARMS_WIZARD_FIELD_CONFIG[baseMeta.key];
    if (enhancement) {
        return { ...baseMeta, ...enhancement };
    }
    return baseMeta;
}
