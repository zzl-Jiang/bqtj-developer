export const DROP_BASIC_METAS = [
    { key: 'cnName', label: '显示名称', type: 'string' },
    { key: 'name', label: '内部标识 (name)', type: 'string' },
    {
        key: 'type', label: '主类型 (type)', type: 'select', options: [
            { label: '物品 (things)', value: 'things' },
            { label: '武器 (arms)', value: 'arms' },
            { label: '装备 (equip)', value: 'equip' },
            { label: '零件 (parts)', value: 'parts' },
            { label: '特效 (effect)', value: 'effect' },
            { label: '食物 (food)', value: 'food' },
            { label: 'BOSS卡 (bossCard)', value: 'bossCard' }
        ]
    },
    { key: 'secType', label: '次要类型', type: 'string' },
    { key: 'text', label: '掉落提示文本', type: 'string' }
];

export const DROP_VISUAL_METAS = [
    { key: 'imgUrl', label: '切片路径 (imgUrl)', type: 'string' },
    { key: 'imgRandom', label: '随机切片范围', type: 'number', desc: '数值大于0时开启 imgUrl + (1~N)' },
    { key: 'lightImg', label: '环境光效路径', type: 'string' },
    { key: 'smallMapColor', label: '小地图颜色', type: 'string', desc: '如 0xff0000' }
];

export const DROP_LOGIC_METAS = [
    { key: 'lifetime', label: '生命周期 (s)', type: 'number', desc: '-1 为永久' },
    { key: 'noFollowHeroB', label: '禁止跟随英雄', type: 'switch' },
    { key: 'keyB', label: '关键物品', type: 'switch' },
    { key: 'extraSkill', label: '附加技能', type: 'string' }
];

export const DROP_PROBABILITY_METAS = [
    { key: 'normalPro', label: '普通怪掉率', type: 'number', desc: '0-1 之间的小数' },
    { key: 'superPro', label: '精英怪掉率', type: 'number', desc: '0-1 之间的小数' },
    { key: 'bossPro', label: '首领掉率', type: 'number', desc: '0-1 之间的小数' },
    { key: 'itemsLvRange', label: '物品等级范围', type: 'string', desc: '格式: min,max (如: 1,99)' }
];
