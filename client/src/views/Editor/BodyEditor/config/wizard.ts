// client/src/views/Editor/BodyEditor/config/wizard.ts
// 向导模式配置 - 为 BodyEditor 定义分类和字段重要性

import type { CategoryConfig, BodyMetaItem } from './types';

/**
 * 分类配置
 * 将 Body 的所有字段组织成 6 个逻辑分类
 */
export const BODY_WIZARD_CATEGORIES: CategoryConfig[] = [
    {
        id: 'basic',
        label: '基础属性',
        icon: 'PersonOutline',
        iconColor: '#18a058',
        description: '单位的名称、种族、系统类型等核心身份信息。这些是单位最基本的数据，必须先配置。',
        fields: ['name', 'cnName', 'systemType', 'raceType', 'sex', 'description', 'shell', 'map', 'canBossB', 'extraDropArmsB']
    },
    {
        id: 'visual',
        label: '视觉资源',
        icon: 'ImageOutline',
        iconColor: '#70c0e8',
        description: '单位的 Flash/位图资源、头像、动画帧、缩放等视觉表现配置。',
        fields: ['swfUrl', 'swfName', 'bmpUrl', 'headIconUrl', 'imgType', 'normalScaleX', 'lockLeftB', 'imgArr', 'lowerImgArr', 'flipCtrlBy', 'dieEffectPartName', 'rotateBySlopeB', 'imgRaB']
    },
    {
        id: 'battle',
        label: '战斗数值',
        icon: 'PulseOutline',
        iconColor: '#e88080',
        description: '单位的生命、防御、僵直、爆头等战斗相关数值。',
        fields: ['lifeRatio', 'rosRatio', 'defenceRatio', 'headHurtMul', 'showLevel', 'superDpsAdd', 'shootLenMul', 'nextAttackTime', 'avtiveSkillCdOverT', 'doubleLifeBarB', 'lifeBarExtraHeight', 'headRectScale']
    },
    {
        id: 'physics',
        label: '物理运动',
        icon: 'SpeedometerOutline',
        iconColor: '#63e2b7',
        description: '单位的重力、惯性、摩擦力、跳跃、移动速度等物理参数。',
        fields: ['F_G', 'F_I', 'F_F', 'F_AIR', 'jumpMul', 'vRan', 'jumpDelayT', 'maxVx', 'maxJumpNum', 'tween', 'moveWhenVB', 'dieEN', 'motionState', 'flyType', 'flyUseSpiderB', 'dieJumpMul']
    },
    {
        id: 'hero',
        label: '持枪专属',
        icon: 'FlashOutline',
        iconColor: '#f2c97d',
        description: '仅持枪类型（hero）单位有效的特殊配置，如武器槽位、飞行器、技能等。',
        fields: ['armsNumber', 'movieLink', 'headPlayB', 'squatMaxVx', 'aircraft', 'randomArmsRange', 'studyCnNameArr', 'p1SkillArr', 'addMoreText']
    },
    {
        id: 'skills',
        label: '技能配置',
        icon: 'ColorWandOutline',
        iconColor: '#a8c5f0',
        description: '单位的普通技能、Boss技能等能力配置。',
        fields: ['skillArr', 'bossSkillArr', 'bossSkillArrCn', 'demBossSkillArr']
    }
];

/**
 * 增强的字段配置
 * 在原有 Meta 配置基础上添加重要性级别和文档说明
 */
export const BODY_WIZARD_FIELD_CONFIG: Record<string, Partial<BodyMetaItem>> = {
    // ===== 基础属性 - 核心 =====
    name: {
        importance: 'core',
        docContent: '单位的唯一标识名，用于代码和XML中引用。建议使用英文小写+下划线格式，如 zombie_a、hero_soldier。',
        exampleValue: 'zombie_normal'
    },
    cnName: {
        importance: 'core',
        docContent: '单位在游戏中显示的中文名称，玩家看到的名字。',
        exampleValue: '普通僵尸'
    },
    systemType: {
        importance: 'core',
        docContent: '决定单位的基本行为逻辑。normal为普通单位（近战），hero为持枪单位（远程射击）。',
        exampleValue: 'normal'
    },
    raceType: {
        importance: 'core',
        docContent: '单位的种族分类，影响阵营判断和部分技能效果。human为人类，zombies为僵尸（敌对阵营）。',
        exampleValue: 'zombies'
    },
    sex: {
        importance: 'advanced',
        docContent: '单位的性别，影响部分动画和声音表现。',
        exampleValue: 'male'
    },
    description: {
        importance: 'optional',
        docContent: '单位的描述信息，仅用于开发者备注，不在游戏中显示。',
        exampleValue: '最基础的僵尸单位'
    },
    shell: {
        importance: 'optional',
        docContent: '外壳类型，影响单位的敏感属性。默认为 variation（变异）。',
        exampleValue: 'variation'
    },
    map: {
        importance: 'optional',
        docContent: '所属地图ID，用于资源预加载分配。可以留空，系统会自动处理。',
        exampleValue: ''
    },
    canBossB: {
        importance: 'advanced',
        docContent: '是否允许作为Boss出场。开启后该单位可以在Boss战中被召唤。',
        exampleValue: true
    },
    extraDropArmsB: {
        importance: 'optional',
        docContent: '死亡时是否额外掉落武器。开启后该单位死亡时会额外掉落武器。',
        exampleValue: false
    },

    // ===== 视觉资源 - 核心/进阶 =====
    swfUrl: {
        importance: 'core',
        docContent: 'Flash动画资源文件路径。若多个单位使用相同的swfUrl，可能会导致资源冲突，可在路径后添加参数区分，如 "swf/enemy/Zombie.swf?v=green"。',
        exampleValue: 'swf/enemy/ZombieNormal.swf'
    },
    swfName: {
        importance: 'advanced',
        docContent: 'Flash资源导出类名。默认同name。若多个单位共用一个SWF，需指定不同的类名。',
        exampleValue: 'ZombieNormal'
    },
    bmpUrl: {
        importance: 'advanced',
        docContent: '静态展示图路径。当Flash资源未加载完成时，优先显示此位图。',
        exampleValue: 'bmp/enemy/zombie_normal.png'
    },
    headIconUrl: {
        importance: 'advanced',
        docContent: '头像图片路径，用于UI界面（如血条上方、小地图等）显示。',
        exampleValue: 'png/head_zombie_normal'
    },
    imgType: {
        importance: 'optional',
        docContent: '资源加载方式，默认为bmp。通常无需修改。',
        exampleValue: 'bmp'
    },
    normalScaleX: {
        importance: 'advanced',
        docContent: '水平缩放比例。默认为1。设为-1可使单位默认朝左。',
        exampleValue: 1
    },
    lockLeftB: {
        importance: 'optional',
        docContent: '锁定朝向左侧。若为true，单位将始终面朝左，不会转向。',
        exampleValue: false
    },
    imgArr: {
        importance: 'core',
        docContent: '图像动画帧数组，用于资源预加载。常用组合：standForward（站立前移）、die1（死亡）即可满足最小需求。',
        exampleValue: ['standForward', 'die1']
    },
    lowerImgArr: {
        importance: 'optional',
        docContent: '下半身独立动画帧，常用：thigh（大腿）、leg_left/right（腿）、foot（脚）、belt（腰带）。',
        exampleValue: ['thigh', 'leg_left', 'leg_right']
    },
    flipCtrlBy: {
        importance: 'advanced',
        docContent: '决定单位行走时的朝向控制方式。no为不自动翻转，target为始终面向目标，mouse为跟随鼠标方向（玩家控制）。',
        exampleValue: 'target'
    },
    dieEffectPartName: {
        importance: 'optional',
        docContent: '播放死亡特效的部位名称，默认为head（头部）。',
        exampleValue: 'head'
    },
    rotateBySlopeB: {
        importance: 'optional',
        docContent: '是否随地面坡度旋转身体。默认为false。开启后单位会根据地形倾斜。',
        exampleValue: false
    },
    imgRaB: {
        importance: 'optional',
        docContent: '图像是否随运动方向旋转。默认为false。适合飞行单位或球形单位。',
        exampleValue: false
    },

    // ===== 战斗数值 - 核心 =====
    lifeRatio: {
        importance: 'core',
        docContent: '生命值倍率。最终生命值 = 100 * 倍率 * 等级加成。这是单位生存能力的基础。',
        exampleValue: 1.0,
        relatedFields: ['defenceRatio', 'rosRatio']
    },
    rosRatio: {
        importance: 'advanced',
        docContent: '僵直系数。每损失百分之多少生命会进入僵直状态，默认为0.2（即20%）。',
        exampleValue: 0.2
    },
    defenceRatio: {
        importance: 'core',
        docContent: '防御系数。减少受到的伤害，默认为0（无防御）。数值越高减伤越多。',
        exampleValue: 0
    },
    headHurtMul: {
        importance: 'advanced',
        docContent: '爆头伤害倍率。默认为2，即爆头造成2倍伤害。',
        exampleValue: 2
    },
    showLevel: {
        importance: 'advanced',
        docContent: '显示等级。若 >= 999 视为特殊Boss，会有特殊的血条显示。',
        exampleValue: 1
    },
    superDpsAdd: {
        importance: 'optional',
        docContent: '精英（Super）状态下的额外伤害加成。普通单位无需设置。',
        exampleValue: 0
    },
    shootLenMul: {
        importance: 'advanced',
        docContent: '射程倍率。影响索敌距离和攻击范围，默认为1。',
        exampleValue: 1
    },
    nextAttackTime: {
        importance: 'optional',
        docContent: '攻击间隔时间。两次攻击之间的最小时间间隔。',
        exampleValue: 1
    },
    avtiveSkillCdOverT: {
        importance: 'optional',
        docContent: '主动技能CD溢出时间。默认为2，控制技能冷却的溢出处理。',
        exampleValue: 2
    },
    doubleLifeBarB: {
        importance: 'optional',
        docContent: '是否显示双层血条（如虚晶蝎）。默认为false。Boss单位可开启。',
        exampleValue: false
    },
    lifeBarExtraHeight: {
        importance: 'optional',
        docContent: '血条显示高度偏移量（像素）。正数向上，负数向下。用于调整血条位置。',
        exampleValue: 0
    },
    headRectScale: {
        importance: 'optional',
        docContent: '头部受击判定框缩放比例。默认为1。可用于调整爆头难度。',
        exampleValue: 1
    },

    // ===== 物理运动 - 核心/进阶 =====
    F_G: {
        importance: 'core',
        docContent: '重力系数。数值越大下落越快，默认为1。飞行单位可设为0或更小。',
        exampleValue: 1
    },
    F_I: {
        importance: 'advanced',
        docContent: '惯性系数。数值越大起步和停止越慢（滑步感），默认为1。',
        exampleValue: 1
    },
    F_F: {
        importance: 'advanced',
        docContent: '摩擦系数。影响停止速度，默认为0.5。数值越大停得越快。',
        exampleValue: 0.5
    },
    F_AIR: {
        importance: 'optional',
        docContent: '空气阻力系数。影响空中移动衰减。飞行单位需要调整此值。',
        exampleValue: 0
    },
    jumpMul: {
        importance: 'advanced',
        docContent: '跳跃力度乘数。默认为1。大于1跳得更高，小于1跳得更低。',
        exampleValue: 1
    },
    vRan: {
        importance: 'optional',
        docContent: '移动速度随机浮动比例。如0.2代表上下20%浮动，让移动更自然。',
        exampleValue: 0
    },
    jumpDelayT: {
        importance: 'optional',
        docContent: '起跳前的预备动作延迟（秒）。可用于制作蓄力跳跃效果。',
        exampleValue: 0
    },
    maxVx: {
        importance: 'core',
        docContent: 'X轴最大移动速度。决定单位的移动快慢，是最核心的移动属性。',
        exampleValue: 200
    },
    maxJumpNum: {
        importance: 'advanced',
        docContent: '最大连跳次数。默认为1。设为2可实现二段跳，以此类推。',
        exampleValue: 1
    },
    tween: {
        importance: 'optional',
        docContent: '平滑移动系数。默认为100。影响移动的平滑程度。',
        exampleValue: 100
    },
    moveWhenVB: {
        importance: 'optional',
        docContent: '载具状态下是否允许移动。默认为false。',
        exampleValue: false
    },
    dieEN: {
        importance: 'optional',
        docContent: '死亡特效ID。0为默认特效。可指定特殊死亡效果。',
        exampleValue: 0
    },
    motionState: {
        importance: 'advanced',
        docContent: '运动模式。stand为地面/行走，fly为飞行。飞行单位需要设置。',
        exampleValue: 'stand'
    },
    flyType: {
        importance: 'optional',
        docContent: '飞行行为类型。normal为普通，tween为缓动，space为太空（无重力）。',
        exampleValue: 'normal'
    },
    flyUseSpiderB: {
        importance: 'optional',
        docContent: '飞行单位是否使用节点寻路（Spider）。默认为false。',
        exampleValue: false
    },
    dieJumpMul: {
        importance: 'optional',
        docContent: '死亡时的击飞跳跃力度乘数。默认为1。用于调整死亡击飞效果。',
        exampleValue: 1
    },

    // ===== 持枪专属 - 进阶 =====
    armsNumber: {
        importance: 'core',
        docContent: '持有武器数量槽位。默认为1。决定该单位可以同时装备多少把武器。',
        exampleValue: 1
    },
    movieLink: {
        importance: 'optional',
        docContent: '外观关联ID。用于复用其他角色的动画定义，实现换皮效果。',
        exampleValue: ''
    },
    headPlayB: {
        importance: 'optional',
        docContent: '头部是否独立播放动画。开启后头部和身体动画分离。',
        exampleValue: false
    },
    squatMaxVx: {
        importance: 'advanced',
        docContent: '蹲伏移动时的最大速度。通常比站立移动速度慢。',
        exampleValue: 100
    },
    aircraft: {
        importance: 'optional',
        docContent: '飞行器绑定ID。设置后单位会骑乘该飞行器。',
        exampleValue: ''
    },
    randomArmsRange: {
        importance: 'optional',
        docContent: '随机武器ID范围，可输入多个武器ID，系统会随机分配。',
        exampleValue: []
    },
    studyCnNameArr: {
        importance: 'optional',
        docContent: '可学习技能名称列表，该单位可以通过升级学习的技能。',
        exampleValue: []
    },
    p1SkillArr: {
        importance: 'optional',
        docContent: 'P1初始技能列表，玩家控制时初始拥有的技能。',
        exampleValue: []
    },
    addMoreText: {
        importance: 'optional',
        docContent: '额外描述文本，用于显示在单位信息面板。',
        exampleValue: ''
    },

    // ===== 技能配置 - 进阶 =====
    skillArr: {
        importance: 'advanced',
        docContent: '单位的普通技能列表。这些技能在战斗中自动触发或使用。',
        exampleValue: []
    },
    bossSkillArr: {
        importance: 'optional',
        docContent: 'Boss阶段专属技能列表。仅在Boss战中使用。',
        exampleValue: []
    },
    bossSkillArrCn: {
        importance: 'optional',
        docContent: 'Boss技能中文显示名称，用于UI展示。',
        exampleValue: []
    },
    demBossSkillArr: {
        importance: 'optional',
        docContent: '修罗模式下的Boss技能，在修罗难度下使用。',
        exampleValue: []
    }
};

/**
 * 合并字段配置
 * 将原有的 Meta 配置与向导配置合并
 */
export function enhanceFieldMeta(baseMeta: BodyMetaItem): BodyMetaItem {
    const enhancement = BODY_WIZARD_FIELD_CONFIG[baseMeta.key];
    if (enhancement) {
        return { ...baseMeta, ...enhancement };
    }
    return baseMeta;
}
