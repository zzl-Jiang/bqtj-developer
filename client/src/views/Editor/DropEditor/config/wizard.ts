// client/src/views/Editor/DropEditor/config/wizard.ts
// 向导模式配置 - 为 DropEditor 定义分类和字段重要性

import type { CategoryConfig, DropMetaItem } from './types';

/**
 * 分类配置
 * 将 Drop 的所有字段组织成 4 个逻辑分类
 */
export const DROP_WIZARD_CATEGORIES: CategoryConfig[] = [
    {
        id: 'basic',
        label: '基础属性',
        icon: 'FingerPrintOutline',
        iconColor: '#18a058',
        description: '掉落项的名称、类型、标识等核心身份信息。这些是掉落项最基本的数据，必须先配置。',
        fields: ['cnName', 'name', 'type', 'secType', 'text']
    },
    {
        id: 'visual',
        label: '视觉资源',
        icon: 'ImageOutline',
        iconColor: '#70c0e8',
        description: '掉落项的图标、光效、小地图显示等视觉表现配置。',
        fields: ['imgUrl', 'imgRandom', 'lightImg', 'smallMapColor']
    },
    {
        id: 'logic',
        label: '逻辑设定',
        icon: 'ExtensionPuzzleOutline',
        iconColor: '#f2c97d',
        description: '掉落项的生命周期、跟随行为、关键物品标记等逻辑配置。',
        fields: ['lifetime', 'noFollowHeroB', 'keyB', 'extraSkill']
    },
    {
        id: 'probability',
        label: '掉率配置',
        icon: 'TrendingUpOutline',
        iconColor: '#e88080',
        description: '掉落概率设置，包括普通怪、精英怪、首领的掉率以及物品等级限制。',
        fields: ['normalPro', 'superPro', 'bossPro', 'itemsLvRange']
    }
];

/**
 * 增强的字段配置
 * 在原有 Meta 配置基础上添加重要性级别和文档说明
 */
export const DROP_WIZARD_FIELD_CONFIG: Record<string, Partial<DropMetaItem>> = {
    // ===== 基础属性 - 核心 =====
    cnName: {
        importance: 'core',
        docContent: '掉落项在游戏中显示的中文名称，玩家看到的名字。',
        exampleValue: '初级强化石'
    },
    name: {
        importance: 'core',
        docContent: '掉落项的唯一标识名，用于代码和XML中引用。建议使用英文小写+下划线格式。',
        exampleValue: 'enhance_stone_lv1'
    },
    type: {
        importance: 'core',
        docContent: '掉落项的主类型，决定该物品的归类和基本行为。things为普通物品，arms为武器，equip为装备。',
        exampleValue: 'things'
    },
    secType: {
        importance: 'advanced',
        docContent: '次要类型，用于进一步细分物品类别。可以为空。',
        exampleValue: 'material'
    },
    text: {
        importance: 'optional',
        docContent: '掉落时的提示文本，显示在物品上方。为空则显示默认提示。',
        exampleValue: '获得强化石'
    },

    // ===== 视觉资源 - 核心/进阶 =====
    imgUrl: {
        importance: 'core',
        docContent: '物品图标的切片路径，决定物品在地面的显示外观。',
        exampleValue: 'png/drop/enhance_stone'
    },
    imgRandom: {
        importance: 'optional',
        docContent: '随机切片范围。数值大于0时，系统会随机显示 imgUrl + (1~N) 的图片。适合多样外观的掉落物。',
        exampleValue: 0
    },
    lightImg: {
        importance: 'advanced',
        docContent: '环境光效路径，物品周围的发光效果。品质越高的物品通常光效越明显。',
        exampleValue: 'png/light/gold'
    },
    smallMapColor: {
        importance: 'optional',
        docContent: '小地图颜色，如 0xff0000 表示红色。用于在小地图上标记特殊物品位置。',
        exampleValue: '0xffffff'
    },

    // ===== 逻辑设定 - 进阶 =====
    lifetime: {
        importance: 'advanced',
        docContent: '物品存在时间（秒），-1 为永久存在。普通掉落物通常有生命周期，任务物品可以永久存在。',
        exampleValue: 60
    },
    noFollowHeroB: {
        importance: 'optional',
        docContent: '禁止自动跟随英雄。开启后物品不会自动飞向玩家，需要手动拾取。',
        exampleValue: false
    },
    keyB: {
        importance: 'advanced',
        docContent: '关键物品标记。开启后该物品为关键道具，死亡时不会消失，通常用于任务物品。',
        exampleValue: false
    },
    extraSkill: {
        importance: 'optional',
        docContent: '附加技能ID，拾取该物品时自动触发的技能效果。',
        exampleValue: ''
    },

    // ===== 掉率配置 - 核心 =====
    normalPro: {
        importance: 'core',
        docContent: '普通小怪的掉落概率，0-1之间的小数。如0.1表示10%掉率。这是最常见的掉率配置。',
        exampleValue: 0.1
    },
    superPro: {
        importance: 'advanced',
        docContent: '精英怪的掉落概率，通常比普通怪高。0-1之间的小数。',
        exampleValue: 0.2
    },
    bossPro: {
        importance: 'advanced',
        docContent: '首领的掉落概率，通常是最高掉率。0-1之间的小数。',
        exampleValue: 0.5
    },
    itemsLvRange: {
        importance: 'optional',
        docContent: '物品等级范围限制，格式为 min,max（如：1,99）。只有在此等级范围内的怪物才会掉落该物品。',
        exampleValue: '1,50'
    }
};

/**
 * 合并字段配置
 * 将原有的 Meta 配置与向导配置合并
 */
export function enhanceFieldMeta(baseMeta: DropMetaItem): DropMetaItem {
    const enhancement = DROP_WIZARD_FIELD_CONFIG[baseMeta.key];
    if (enhancement) {
        return { ...baseMeta, ...enhancement };
    }
    return baseMeta;
}
