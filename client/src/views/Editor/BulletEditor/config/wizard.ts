// client/src/views/Editor/BulletEditor/config/wizard.ts
// 向导模式配置 - 为 BulletEditor 定义分类和字段重要性

import type { CategoryConfig, BulletMetaItem } from './types';

/**
 * 分类配置
 * 将 Bullet 的所有字段组织成 6 个逻辑分类
 */
export const BULLET_WIZARD_CATEGORIES: CategoryConfig[] = [
    {
        id: 'basic',
        label: '基础属性',
        icon: 'FingerPrintOutline',
        iconColor: '#18a058',
        description: '子弹的名称、标识、伤害类型等核心身份信息。这些是子弹最基本的数据，必须先配置。',
        fields: ['name', 'cnName', 'kind', 'hole', 'baseLabel', 'armsType', 'actionLabel']
    },
    {
        id: 'damage',
        label: '伤害效果',
        icon: 'HeartOutline',
        iconColor: '#e88080',
        description: '子弹的伤害计算方式，包括基础伤害、攻击类型、击退效果等。',
        fields: ['hurtRatio', 'hurtMul', 'attackType', 'beatBack', 'targetShakeValue', 'transBackMul']
    },
    {
        id: 'behavior',
        label: '逻辑行为',
        icon: 'ExtensionPuzzleOutline',
        iconColor: '#f2c97d',
        description: '子弹的碰撞检测、生命周期、穿透能力、射击模式等行为逻辑。',
        fields: ['hitType', 'bulletLife', 'lifeRandom', 'bulletWidth', 'bulletShakeWidth', 'penetrationNum', 'penetrationGap', 'attackGap', 'attackDelay', 'noHitTime', 'hideTime', 'hitGap', 'twoHitGap']
    },
    {
        id: 'shoot',
        label: '射击设定',
        icon: 'FlashOutline',
        iconColor: '#70c0e8',
        description: '连发数量、发射间隔、后坐力、屏幕震动等射击相关参数。',
        fields: ['bulletNum', 'shootGap', 'shootNum', 'shootRecoil', 'screenShakeValue', 'aiShootRange']
    },
    {
        id: 'motion',
        label: '物理运动',
        icon: 'SpeedometerOutline',
        iconColor: '#63e2b7',
        description: '子弹的飞行速度、重力、旋转、散射角度，以及追踪、反弹等特效。',
        fields: ['bulletSpeed', 'gravity', 'bulletVra', 'shakeAngle', 'shootAngle', 'bulletAngle', 'bulletAngleRange', 'extendGap', 'gatlinNum', 'gatlinRange', 'speedD.min', 'speedD.max', 'speedD.a', 'speedD.random', 'followD.value', 'followD.maxTime', 'followD.delay', 'followD.hitIsTargetB', 'bounceD.body', 'bounceD.floor', 'bounceD.vMul', 'bounceD.noDieB', 'bounceD.hurtNumAdd']
    },
    {
        id: 'flags',
        label: '功能标志',
        icon: 'ToggleOutline',
        iconColor: '#a8c5f0',
        description: '控制子弹特殊行为的开关，如同阵营有效、穿透、不清理等。',
        fields: ['sameCampB', 'noHitB', 'noHurtEffectB', 'whippB', 'noMagneticB', 'noBeClearB', 'implodingB', 'twoHitSameNameB', 'oneHitBodyB']
    },
    {
        id: 'skill',
        label: '技能与特效',
        icon: 'ColorWandOutline',
        iconColor: '#b4b4b4',
        description: '子弹附加的技能、爆炸效果、射线特效等高级功能。',
        fields: ['skillArr', 'godSkillArr', 'bulletSkillArr', 'boomD.radius', 'boomD.floorB', 'boomD.bodyB', 'boomD.hurtMul', 'boomD.maxHurtNum', 'lineD.color', 'lineD.lightColor', 'lineD.size', 'lineD.lightSize', 'lineD.blendMode']
    },
    {
        id: 'visual',
        label: '视觉资源',
        icon: 'ImageOutline',
        iconColor: '#d6b4fc',
        description: '子弹的图片资源、特效贴图等视觉配置。',
        fields: ['playImgLabel', 'bulletImg.url', 'bulletLeftImg.url', 'fireImg.url', 'hitImg.url', 'hitFloorImg.url', 'smokeImg.url', 'selfBoomImg.url']
    }
];

/**
 * 增强的字段配置
 * 在原有 Meta 配置基础上添加重要性级别和文档说明
 */
export const BULLET_WIZARD_FIELD_CONFIG: Record<string, Partial<BulletMetaItem>> = {
    // ===== 基础属性 - 核心 =====
    name: {
        importance: 'core',
        docContent: '子弹的唯一标识名，用于代码和XML中引用。只能包含字母、数字、下划线。',
        exampleValue: 'bullet_thunder'
    },
    cnName: {
        importance: 'core',
        docContent: '子弹的中文显示名称，在编辑器和一些UI中显示。',
        exampleValue: '雷霆弹'
    },
    kind: {
        importance: 'core',
        docContent: '伤害种类，对应 HurtKind。决定伤害的计算方式和抗性影响。',
        exampleValue: 'physical'
    },
    hole: {
        importance: 'advanced',
        docContent: '弹孔类型，对应 HoleType。决定击中时留下的痕迹效果。',
        exampleValue: 'normal'
    },
    baseLabel: {
        importance: 'optional',
        docContent: '基础标签，默认同 name。用于复杂的标签引用场景。',
        exampleValue: 'bullet_thunder'
    },
    armsType: {
        importance: 'advanced',
        docContent: '武器类型，影响子弹的行为表现。不同枪械类型有不同的子弹特性。',
        exampleValue: 'rifle'
    },
    actionLabel: {
        importance: 'optional',
        docContent: '动作标签，用于指定特殊的动作表现。',
        exampleValue: ''
    },

    // ===== 伤害效果 - 核心 =====
    hurtRatio: {
        importance: 'core',
        docContent: '基础伤害比例，决定子弹的基础伤害值。这是最核心的伤害属性。',
        exampleValue: 100,
        relatedFields: ['hurtMul', 'attackType']
    },
    hurtMul: {
        importance: 'core',
        docContent: '伤害倍数，对基础伤害进行乘法修正。1.0表示无修正。',
        exampleValue: 1.0
    },
    attackType: {
        importance: 'advanced',
        docContent: '攻击类型。direct为直接伤害，boom为爆炸伤害，stay为持续伤害。',
        exampleValue: 'direct'
    },
    beatBack: {
        importance: 'advanced',
        docContent: '击退力，决定命中目标后将其击退的距离。适合霰弹枪等武器。',
        exampleValue: 10
    },
    targetShakeValue: {
        importance: 'optional',
        docContent: '目标受击震动值，决定被击中时目标的屏幕震动幅度。',
        exampleValue: 5
    },
    transBackMul: {
        importance: 'optional',
        docContent: '反击倍数，决定子弹对攻击者的反弹伤害比例。',
        exampleValue: 0
    },

    // ===== 逻辑行为 - 核心/进阶 =====
    hitType: {
        importance: 'core',
        docContent: '碰撞检测类型。rect为矩形检测，longLine为长射线检测（用于穿透效果）。',
        exampleValue: 'rect'
    },
    bulletLife: {
        importance: 'core',
        docContent: '子弹生命时长（秒）。超过此时间子弹自动消失，防止内存泄漏。',
        exampleValue: 2.0
    },
    lifeRandom: {
        importance: 'optional',
        docContent: '寿命随机值，给子弹生命添加随机波动，使效果更自然。',
        exampleValue: 0
    },
    bulletWidth: {
        importance: 'advanced',
        docContent: '碰撞宽度（像素），决定子弹的命中判定范围。',
        exampleValue: 10
    },
    bulletShakeWidth: {
        importance: 'optional',
        docContent: '抖动宽度，子弹飞行时的抖动幅度，增加视觉动态感。',
        exampleValue: 0
    },
    penetrationNum: {
        importance: 'advanced',
        docContent: '穿透数量，子弹可以穿透多少个敌人。0表示不穿透。',
        exampleValue: 0
    },
    penetrationGap: {
        importance: 'optional',
        docContent: '穿透间隔（秒），两次穿透判定之间的时间间隔。',
        exampleValue: 0.1
    },
    attackGap: {
        importance: 'core',
        docContent: '攻击间隔（秒），对同一目标的连续伤害间隔。',
        exampleValue: 0.5
    },
    attackDelay: {
        importance: 'optional',
        docContent: '攻击延迟（秒），子弹发射后多久开始造成伤害。',
        exampleValue: 0
    },
    noHitTime: {
        importance: 'optional',
        docContent: '无视攻击时间（秒），子弹发射后多久内不造成伤害。',
        exampleValue: 0
    },
    hideTime: {
        importance: 'optional',
        docContent: '隐藏时间（秒），子弹发射后多久内不显示。',
        exampleValue: 0
    },
    hitGap: {
        importance: 'optional',
        docContent: '击中间隔（秒），两次命中判定之间的时间间隔。',
        exampleValue: 0
    },
    twoHitGap: {
        importance: 'optional',
        docContent: '连续击中间隔（秒），对同一目标的连续命中间隔。',
        exampleValue: 0
    },

    // ===== 射击设定 - 核心/进阶 =====
    bulletNum: {
        importance: 'core',
        docContent: '子弹数量，一次射击发射多少发子弹。大于1时形成霰弹效果。',
        exampleValue: 1
    },
    shootGap: {
        importance: 'advanced',
        docContent: '发射间隔（秒），连发时两次发射之间的时间。',
        exampleValue: 0.1
    },
    shootNum: {
        importance: 'advanced',
        docContent: '连发次数，一次点击最多发射多少发子弹。',
        exampleValue: 1
    },
    shootRecoil: {
        importance: 'optional',
        docContent: '射击后坐力，影响角色射击时的后退力度。',
        exampleValue: 0
    },
    screenShakeValue: {
        importance: 'optional',
        docContent: '屏幕震动值，射击时玩家的屏幕震动幅度。',
        exampleValue: 0
    },
    aiShootRange: {
        importance: 'advanced',
        docContent: 'AI射击射程，AI使用此子弹时的有效射程。',
        exampleValue: 500
    },

    // ===== 物理运动 - 核心/进阶 =====
    bulletSpeed: {
        importance: 'core',
        docContent: '子弹飞行速度（像素/秒）。影响命中时间和弹道手感。',
        exampleValue: 800
    },
    gravity: {
        importance: 'advanced',
        docContent: '重力感应，子弹受到的重力影响。正值向下坠落，0为直线飞行。',
        exampleValue: 0
    },
    bulletVra: {
        importance: 'optional',
        docContent: '旋转速度，子弹贴图的旋转速率。适合飞镖等旋转武器。',
        exampleValue: 0
    },
    shakeAngle: {
        importance: 'advanced',
        docContent: '散射角度，多发子弹时的随机散布角度范围。',
        exampleValue: 5
    },
    shootAngle: {
        importance: 'optional',
        docContent: '发射夹角，多发子弹时的固定角度间隔。',
        exampleValue: 0
    },
    bulletAngle: {
        importance: 'optional',
        docContent: '初始角度，子弹发射时的固定角度。-1000表示不设置（使用默认）。',
        exampleValue: -1000
    },
    bulletAngleRange: {
        importance: 'optional',
        docContent: '角度随机范围，初始角度的随机波动范围。',
        exampleValue: 0
    },
    extendGap: {
        importance: 'optional',
        docContent: '延伸间隔，子弹轨迹延伸的时间间隔。',
        exampleValue: 0
    },
    gatlinNum: {
        importance: 'optional',
        docContent: '加特林模式子弹数，大于0时激活加特林连续发射效果。',
        exampleValue: 0
    },
    gatlinRange: {
        importance: 'optional',
        docContent: '加特林散射范围，加特林模式下的角度散射范围。',
        exampleValue: 10
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
    'speedD.a': {
        importance: 'optional',
        docContent: '加速度，变速效果的速度变化率。',
        exampleValue: 0
    },
    'speedD.random': {
        importance: 'optional',
        docContent: '速度随机比例，给速度添加随机波动。',
        exampleValue: 0
    },
    'followD.value': {
        importance: 'optional',
        docContent: '追踪强度，决定子弹追踪目标的灵敏程度。值越大追踪越精准。',
        exampleValue: 5
    },
    'followD.maxTime': {
        importance: 'optional',
        docContent: '最长追踪时间（秒），超过此时间后停止追踪。',
        exampleValue: 3.0
    },
    'followD.delay': {
        importance: 'optional',
        docContent: '追踪延迟（秒），发射后多久开始追踪。可制造曲线弹道。',
        exampleValue: 0.5
    },
    'followD.hitIsTargetB': {
        importance: 'optional',
        docContent: '追踪击中目标，开启后子弹会追踪被击中的目标。',
        exampleValue: false
    },
    'bounceD.body': {
        importance: 'optional',
        docContent: '单位反弹次数，碰到敌人时的反弹次数。',
        exampleValue: 0
    },
    'bounceD.floor': {
        importance: 'optional',
        docContent: '地面反弹次数，碰到地面时的反弹次数。适合弹跳炸弹。',
        exampleValue: 0
    },
    'bounceD.vMul': {
        importance: 'optional',
        docContent: '反弹后速度乘数，反弹后速度的变化比例。',
        exampleValue: 0.8
    },
    'bounceD.noDieB': {
        importance: 'optional',
        docContent: '撞击后不消失，开启后反弹时子弹不会消失。',
        exampleValue: false
    },
    'bounceD.hurtNumAdd': {
        importance: 'optional',
        docContent: '反弹伤害增量，每次反弹后伤害的增加量。',
        exampleValue: 0
    },

    // ===== 功能标志 - 进阶 =====
    sameCampB: {
        importance: 'advanced',
        docContent: '同阵营有效，开启后子弹对同阵营单位也有效（包括自己和队友）。',
        exampleValue: false
    },
    noHitB: {
        importance: 'optional',
        docContent: '不命中，开启后子弹不会命中任何目标，可以穿透一切。',
        exampleValue: false
    },
    noHurtEffectB: {
        importance: 'optional',
        docContent: '无伤害特效，开启后不显示伤害数字和特效。',
        exampleValue: false
    },
    whippB: {
        importance: 'optional',
        docContent: '鞭策效果，开启后子弹具有鞭策特性。',
        exampleValue: false
    },
    noMagneticB: {
        importance: 'optional',
        docContent: '无磁力，开启后子弹不受磁力影响。',
        exampleValue: false
    },
    noBeClearB: {
        importance: 'optional',
        docContent: '不被清理，开启后子弹不会因距离过远而被系统自动清理。',
        exampleValue: false
    },
    implodingB: {
        importance: 'optional',
        docContent: '向内坍塌，开启后子弹具有向内吸引效果。',
        exampleValue: false
    },
    twoHitSameNameB: {
        importance: 'optional',
        docContent: '同名连续击中，开启后允许同名子弹连续击中同一目标。',
        exampleValue: false
    },
    oneHitBodyB: {
        importance: 'optional',
        docContent: '单体击中，开启后每个单位只能被命中一次。',
        exampleValue: false
    },

    // ===== 技能与特效 - 进阶 =====
    skillArr: {
        importance: 'optional',
        docContent: '技能列表，子弹附加的通用技能。',
        exampleValue: []
    },
    godSkillArr: {
        importance: 'optional',
        docContent: '神级技能，子弹附加的神级技能。',
        exampleValue: []
    },
    bulletSkillArr: {
        importance: 'optional',
        docContent: '子弹专属技能，只有此子弹可以使用的特殊技能。',
        exampleValue: []
    },
    'boomD.radius': {
        importance: 'advanced',
        docContent: '爆炸半径（像素），子弹命中或消失时造成范围伤害。',
        exampleValue: 100
    },
    'boomD.floorB': {
        importance: 'optional',
        docContent: '地面爆炸，开启后在地面也触发爆炸效果。',
        exampleValue: false
    },
    'boomD.bodyB': {
        importance: 'optional',
        docContent: '单位爆炸，开启后在命中单位时触发爆炸效果。',
        exampleValue: false
    },
    'boomD.hurtMul': {
        importance: 'optional',
        docContent: '爆炸伤害倍数，爆炸时的伤害倍率。',
        exampleValue: 1.0
    },
    'boomD.maxHurtNum': {
        importance: 'optional',
        docContent: '最大伤害单位，爆炸最多可以伤害多少个单位。',
        exampleValue: 10
    },
    'lineD.color': {
        importance: 'optional',
        docContent: '射线颜色，射线特效的颜色值。',
        exampleValue: '#ffffff'
    },
    'lineD.lightColor': {
        importance: 'optional',
        docContent: '发光颜色，射线发光效果的颜色值。',
        exampleValue: '#ffff00'
    },
    'lineD.size': {
        importance: 'optional',
        docContent: '射线尺寸，射线的粗细（像素）。',
        exampleValue: 2
    },
    'lineD.lightSize': {
        importance: 'optional',
        docContent: '发光尺寸，射线发光效果的粗细（像素）。',
        exampleValue: 4
    },
    'lineD.blendMode': {
        importance: 'optional',
        docContent: '混合模式，射线的颜色混合方式。',
        exampleValue: 'add'
    },

    // ===== 视觉资源 - 进阶 =====
    playImgLabel: {
        importance: 'advanced',
        docContent: '资源标签，子弹使用的资源集合标识。',
        exampleValue: 'bullet_normal'
    },
    'bulletImg.url': {
        importance: 'advanced',
        docContent: '子弹图片URL，子弹飞行的主要贴图。',
        exampleValue: 'png/bullet_normal'
    },
    'bulletLeftImg.url': {
        importance: 'optional',
        docContent: '向左图片URL，子弹向左飞行时的贴图（如需要）。',
        exampleValue: ''
    },
    'fireImg.url': {
        importance: 'optional',
        docContent: '开火特效URL，子弹发射时的特效贴图。',
        exampleValue: ''
    },
    'hitImg.url': {
        importance: 'optional',
        docContent: '击中特效URL，子弹命中目标时的特效贴图。',
        exampleValue: ''
    },
    'hitFloorImg.url': {
        importance: 'optional',
        docContent: '击中地面URL，子弹击中地面时的特效贴图。',
        exampleValue: ''
    },
    'smokeImg.url': {
        importance: 'optional',
        docContent: '烟雾特效URL，子弹飞行时的烟雾轨迹贴图。',
        exampleValue: ''
    },
    'selfBoomImg.url': {
        importance: 'optional',
        docContent: '自爆特效URL，子弹自爆时的特效贴图。',
        exampleValue: ''
    }
};

/**
 * 合并字段配置
 * 将原有的 Meta 配置与向导配置合并
 */
export function enhanceFieldMeta(baseMeta: BulletMetaItem): BulletMetaItem {
    const enhancement = BULLET_WIZARD_FIELD_CONFIG[baseMeta.key];
    if (enhancement) {
        return { ...baseMeta, ...enhancement };
    }
    return baseMeta;
}
