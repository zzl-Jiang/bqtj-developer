// client/src/views/Editor/LevelEditor/config/wizard.ts
// 向导模式配置 - 为 LevelEditor 定义分类和字段重要性

import type { CategoryConfig, LevelMetaItem } from './types';

/**
 * 分类配置
 * 将 Level 的所有字段组织成 5 个逻辑分类
 */
export const LEVEL_WIZARD_CATEGORIES: CategoryConfig[] = [
    {
        id: 'basic',
        label: '基础设置',
        icon: 'SettingsOutline',
        iconColor: '#18a058',
        description: '关卡的ID、名称、描述、场景等核心身份信息。这些是关卡最基本的数据，必须先配置。',
        fields: ['name', 'cnName', 'descrip', 'sceneLabel']
    },
    {
        id: 'units',
        label: '单位配置',
        icon: 'PeopleOutline',
        iconColor: '#e88080',
        description: '配置关卡中出现的怪物、友军等单位的发兵逻辑。可以设置多组发兵，每组包含多个单位。',
        fields: ['unitG']
    },
    {
        id: 'events',
        label: '事件逻辑',
        icon: 'FlashOutline',
        iconColor: '#f2c97d',
        description: '定义关卡的触发条件和执行指令。如触发刷怪、通关条件、剧情演绎等。',
        fields: ['eventG']
    },
    {
        id: 'rects',
        label: '区域配置',
        icon: 'MapOutline',
        iconColor: '#70c0e8',
        description: '定义地图上的矩形区域。用于触发事件、限制移动范围、设置出生点等。',
        fields: ['rectG']
    },
    {
        id: 'runtime',
        label: '运行参数',
        icon: 'PlayOutline',
        iconColor: '#63e2b7',
        description: '关卡运行时参数，包括怪物等级、难度系数、限时、背景音乐等。',
        fields: ['enemyLv', 'diff', 'tm', 'hb', 'music', 'sightCover', 'dropNoGravityTime']
    },
    {
        id: 'restrictions',
        label: '限制开关',
        icon: 'BanOutline',
        iconColor: '#d03050',
        description: '控制关卡内各种功能开关的限制设置，如禁用队友、禁用道具等。',
        fields: ['noMoreB', 'allMoreB', 'noPartnerB', 'noPetB', 'noVehicleB', 'noPropsB', 'noDeviceB', 'dropSmallMapB', 'noTreasureB', 'mustSingleB', 'noAIB', 'firstLostB', 'noRestartB']
    },
    {
        id: 'misc',
        label: '其他配置',
        icon: 'OptionsOutline',
        iconColor: '#2080f0',
        description: '预加载资源、P1武器设置、自定义模式等其他高级配置。',
        fields: ['overWarn', 'preBulletArr', 'preSkillArr', 'p1ArmsArr', 'p1ArmsT', 'modeDiy']
    }
];

/**
 * 增强的字段配置
 * 在原有 Meta 配置基础上添加重要性级别和文档说明
 */
export const LEVEL_WIZARD_FIELD_CONFIG: Record<string, Partial<LevelMetaItem>> = {
    // ===== 基础设置 - 核心 =====
    name: {
        importance: 'core',
        docContent: '关卡的唯一标识名，用于代码和XML中引用。建议使用英文小写+下划线格式，如 level_1、chapter_1_stage_2。',
        exampleValue: 'level_1_1'
    },
    cnName: {
        importance: 'core',
        docContent: '关卡在游戏中显示的中文名称，玩家看到的名字。',
        exampleValue: '第一关：初试锋芒'
    },
    descrip: {
        importance: 'advanced',
        docContent: '关卡的描述信息，显示在关卡选择界面，可以介绍关卡特点和背景故事。',
        exampleValue: '这是你的第一场战斗，小心应对僵尸的围攻。'
    },
    sceneLabel: {
        importance: 'core',
        docContent: '场景标签，必须是游戏已有地图的英文ID。决定了关卡的背景地图。',
        exampleValue: 'scene_city'
    },

    // ===== 复杂结构字段 =====
    unitG: {
        importance: 'core',
        isComplex: true,
        complexType: 'unitG',
        complexDesc: '点击配置怪物发兵组',
        docContent: '单位配置组，定义关卡中出现的怪物、友军等单位的发兵逻辑。可以设置多组发兵，每组包含多个单位。'
    },
    eventG: {
        importance: 'core',
        isComplex: true,
        complexType: 'eventG',
        complexDesc: '点击配置关卡事件逻辑',
        docContent: '事件逻辑组，定义关卡的触发条件和执行指令。如：玩家到达某位置触发下一波怪物、击杀所有敌人后通关等。'
    },
    rectG: {
        importance: 'advanced',
        isComplex: true,
        complexType: 'rectG',
        complexDesc: '点击配置地图区域',
        docContent: '区域配置组，定义地图上的矩形区域。用于触发事件、限制移动范围、设置出生点等。'
    },

    // ===== 运行参数 - 核心/进阶 =====
    enemyLv: {
        importance: 'core',
        docContent: '关卡内怪物的基础等级。怪物的实际属性会根据此等级进行计算。',
        exampleValue: 1
    },
    diff: {
        importance: 'advanced',
        docContent: '难度系数，默认为1。大于1会增加难度，小于1会降低难度。',
        exampleValue: 1
    },
    tm: {
        importance: 'advanced',
        docContent: '限时（秒），默认为0表示不限时。设置后玩家需要在规定时间内完成关卡。',
        exampleValue: 300
    },
    hb: {
        importance: 'optional',
        docContent: '是否开启困难模式。开启后怪物会更强，但奖励也会更丰厚。',
        exampleValue: false
    },
    music: {
        importance: 'optional',
        docContent: '背景音乐资源路径。使用游戏已有素材，一般无需修改。',
        exampleValue: 'music/battle_1'
    },
    sightCover: {
        importance: 'optional',
        docContent: '小视野遮罩数值。后可加命令 hideSightCover 关闭遮罩，用于制造视野受限效果。',
        exampleValue: 0
    },
    dropNoGravityTime: {
        importance: 'optional',
        docContent: '掉落物无重力时间（秒）。掉落物出现后多久不再受重力影响往下掉。',
        exampleValue: 0
    },

    // ===== 限制开关 - 进阶 =====
    noMoreB: {
        importance: 'optional',
        docContent: '禁用所有额外项，包括队友、尸宠等辅助单位。',
        exampleValue: false
    },
    allMoreB: {
        importance: 'optional',
        docContent: '允许所有额外项，与 noMoreB 相反。',
        exampleValue: false
    },
    noPartnerB: {
        importance: 'optional',
        docContent: '禁用队友。开启后玩家无法携带AI队友进入关卡。',
        exampleValue: false
    },
    noPetB: {
        importance: 'optional',
        docContent: '禁用尸宠。开启后玩家的尸宠无法进入关卡。',
        exampleValue: false
    },
    noVehicleB: {
        importance: 'optional',
        docContent: '禁用载具。开启后玩家无法使用载具。',
        exampleValue: false
    },
    noPropsB: {
        importance: 'optional',
        docContent: '禁用道具。开启后玩家无法使用消耗道具。',
        exampleValue: false
    },
    noDeviceB: {
        importance: 'optional',
        docContent: '禁用装置。开启后玩家无法使用各种装置技能。',
        exampleValue: false
    },
    dropSmallMapB: {
        importance: 'optional',
        docContent: '小地图显示掉落道具。开启后掉落物会在小地图上显示。',
        exampleValue: false
    },
    noTreasureB: {
        importance: 'optional',
        docContent: '禁止财宝僵尸生成。开启后不会出现携带大量奖励的财宝僵尸。',
        exampleValue: false
    },
    mustSingleB: {
        importance: 'optional',
        docContent: '强制单人模式。开启后该关卡只能单人挑战，无法组队。',
        exampleValue: false
    },
    noAIB: {
        importance: 'optional',
        docContent: '禁用AI。开启后敌方单位不会使用AI逻辑。',
        exampleValue: false
    },
    firstLostB: {
        importance: 'optional',
        docContent: '初始不可操作。开启后玩家进入关卡时无法操作，通常用于配合剧情演绎。需要配合 openInput 命令开启操作。',
        exampleValue: false
    },
    noRestartB: {
        importance: 'optional',
        docContent: '禁止重新开始。开启后玩家无法在关卡内重新开始。',
        exampleValue: false
    },

    // ===== 其他配置 - 可选 =====
    overWarn: {
        importance: 'optional',
        docContent: '结束警告文本。玩家点击退出关卡时弹出的警告信息。',
        exampleValue: '确定要退出关卡吗？进度将不会保存。'
    },
    preBulletArr: {
        importance: 'optional',
        docContent: '预加载子弹列表。需要提前加载的子弹素材ID列表，用于避免战斗中卡顿。',
        exampleValue: []
    },
    preSkillArr: {
        importance: 'optional',
        docContent: '预加载技能列表。需要提前加载的技能素材ID列表。',
        exampleValue: []
    },
    p1ArmsArr: {
        importance: 'optional',
        docContent: 'P1强制武器列表。指定P1玩家在该关卡中只能使用这些武器。',
        exampleValue: []
    },
    p1ArmsT: {
        importance: 'optional',
        docContent: 'P1武器类型。no表示无武器，copy表示复制玩家存档第一把武器的配置。',
        exampleValue: 'copy'
    },
    modeDiy: {
        importance: 'optional',
        docContent: '自定义模式。不同模式有对应的效果逻辑，如death(死亡模式)、unendSingle(虚天塔)、unionPK(军队竞技场)等。',
        exampleValue: ''
    }
};

/**
 * 合并字段配置
 * 将原有的 Meta 配置与向导配置合并
 */
export function enhanceFieldMeta(baseMeta: LevelMetaItem): LevelMetaItem {
    const enhancement = LEVEL_WIZARD_FIELD_CONFIG[baseMeta.key];
    if (enhancement) {
        return { ...baseMeta, ...enhancement };
    }
    return baseMeta;
}
