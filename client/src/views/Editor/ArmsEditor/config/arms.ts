export const ARMS_BASIC_METAS = [
    { key: 'cnName', label: '中文名称', type: 'string' },
    { key: 'name', label: '内部标识 (name)', type: 'string' },
    { key: 'armsType', label: '武器类型', type: 'string', desc: '对应 ArmsType 中的定义' },
    { key: 'description', label: '获取描述', type: 'string' },
    { key: 'info', label: '特殊说明', type: 'string' },
    {
        key: 'color', label: '颜色品质', type: 'select', options: [
            { label: '白色', value: 'white' },
            { label: '绿色', value: 'green' },
            { label: '蓝色', value: 'blue' },
            { label: '紫色', value: 'purple' },
            { label: '橙色', value: 'orange' },
            { label: '红色', value: 'red' }
        ]
    },
    { key: 'rareDropLevel', label: '稀有掉落等级', type: 'number' },
    { key: 'index', label: '排序索引', type: 'number' },
    { key: 'randomPro', label: '随机几率', type: 'number', desc: '用于随机属性生成的权重' }
];

export const ARMS_COMBAT_METAS = [
    { key: 'dpsMul', label: 'DPS 修正系数', type: 'number', desc: '1 为默认' },
    { key: 'capacity', label: '弹量 (capacity)', type: 'number' },
    { key: 'armsWeight', label: '武器重量', type: 'number' },
    { key: 'reloadGap', label: '换弹间隔 (s)', type: 'number' },
    { key: 'gunNum', label: '枪管数', type: 'number' },
    { key: 'twoShootPro', label: '双发几率 (0-1)', type: 'number' },
    { key: 'shootShakeAngle', label: '射击散布角度', type: 'number' },
    { key: 'armsArmMul', label: '手臂跟随比例', type: 'number', desc: '默认 0.5' },
    { key: 'hurtRatio', label: '子弹基础威力', type: 'number' },
    { key: 'attackGap', label: '攻击间隔', type: 'number' },
    { key: 'uiDpsMul', label: 'UI DPS 修正', type: 'number' },
    { key: 'extraMul', label: '额外系数', type: 'number' },
    { key: 'upValue', label: '升级价值', type: 'number' }
];

export const ARMS_VISUAL_METAS = [
    { key: 'iconUrl', label: '图标路径', type: 'string' },
    { key: 'armsImgLabel', label: '贴图标识', type: 'string' },
    { key: 'fireImgType', label: '枪火类型', type: 'string' },
    { key: 'shootSoundUrl', label: '射击音效', type: 'string' }
];

export const ARMS_RESOURCE_RANGE_METAS = [
    { key: 'allImgPartArr', label: '全部件标识列表', type: 'string', desc: '逗号分隔' },
    { key: 'allImgRange', label: '全部件路径范围', type: 'string', desc: '逗号分隔' },
    { key: 'textureImgRange', label: '皮肤/纹理范围', type: 'string' },
    { key: 'bodyImgRange', label: '枪身范围', type: 'string' },
    { key: 'barrelImgRange', label: '枪管范围', type: 'string' },
    { key: 'gripImgRange', label: '握把范围', type: 'string' },
    { key: 'bulletImgRange', label: '子弹范围', type: 'string' },
    { key: 'stockImgRange', label: '枪托范围', type: 'string' },
    { key: 'glassImgRange', label: '镜组范围', type: 'string' }
];

export const ARMS_ADVANCED_METAS = [
    { key: 'crossbowD.focoB', label: '弩箭蓄力/聚焦', type: 'switch' },
    { key: 'crossbowD.minDelayMul', label: '最小蓄力延迟', type: 'number' },
    { key: 'crossbowD.vAtt', label: '蓄力附加值', type: 'number' },
    { key: 'recordD.piano', label: '钢琴录音数据', type: 'string' },
    { key: 'recordD.moveGap', label: '动能位移间隔', type: 'number' },
    { key: 'evoMaxLv', label: '最高进化等级', type: 'number' },
    { key: 'evoMustFirstLv', label: '首选进化等级', type: 'number' },
    { key: 'chipNum', label: '合成所需碎片', type: 'number' },
    { key: 'composeLv', label: '合成开放等级', type: 'number' },
    { key: 'composeMax', label: '合成上限', type: 'number' }
];
