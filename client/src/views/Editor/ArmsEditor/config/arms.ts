import type { BulletMetaItem } from '../../BulletEditor/config/types';

export const ARMS_BASIC_METAS: BulletMetaItem[] = [
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

// 武器自身战斗属性
export const ARMS_COMBAT_METAS: BulletMetaItem[] = [
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
    { key: 'upValue', label: '升级价值', type: 'number' },
    { key: 'handShootGap', label: '双手射击间隔', type: 'number' },
    { key: 'noShakeTime', label: '无后坐力时间', type: 'number' },
    { key: 'focusAngleRange', label: '聚焦角度范围', type: 'number' },
    { key: 'leftHandImg', label: '左手贴图索引', type: 'number' }
];

// 继承自 BulletDefine 的伤害效果属性
export const ARMS_BULLET_DAMAGE_METAS: BulletMetaItem[] = [
    { key: 'hurtMul', label: '伤害倍率 (hurtMul)', type: 'number' },
    { key: 'transBackMul', label: '反击倍率', type: 'number', desc: '默认 1' },
    { key: 'attackType', label: '攻击类型', type: 'select', options: [
        { label: '直接伤害 (direct)', value: 'direct' },
        { label: '其他类型', value: 'other' }
    ]},
    { key: 'beatBack', label: '击退值', type: 'number' },
    { key: 'targetShakeValue', label: '目标震动值', type: 'number' },
    { key: 'critD.pro', label: '暴击几率', type: 'number' },
    { key: 'critD.mul', label: '暴击倍率', type: 'number', desc: '默认 2' },
    { key: 'critD3.pro', label: '3倍暴击几率', type: 'number' },
    { key: 'critD3.mul', label: '3倍暴击倍率', type: 'number', desc: '默认 3' }
];

// 继承自 BulletDefine 的行为标志
export const ARMS_BULLET_FLAG_METAS: BulletMetaItem[] = [
    { key: 'sameCampB', label: '同阵营有效', type: 'switch' },
    { key: 'noHitB', label: '不命中目标', type: 'switch' },
    { key: 'noHurtEffectB', label: '无伤害特效', type: 'switch' },
    { key: 'whippB', label: '鞭策效果', type: 'switch' },
    { key: 'noMagneticB', label: '无磁力吸附', type: 'switch' },
    { key: 'noBeClearB', label: '不可被清除', type: 'switch' },
    { key: 'implodingB', label: '内爆效果', type: 'switch' },
    { key: 'twoHitSameNameB', label: '同名双hit', type: 'switch' },
    { key: 'oneHitBodyB', label: '单体命中', type: 'switch' }
];

// 继承自 BulletDefine 的生命周期属性
export const ARMS_BULLET_LIFECYCLE_METAS: BulletMetaItem[] = [
    { key: 'bulletLife', label: '子弹生命周期', type: 'number', desc: '秒，默认 2' },
    { key: 'lifeRandom', label: '寿命随机值', type: 'number' },
    { key: 'imgClearDelay', label: '图像清除延迟', type: 'number' },
    { key: 'bulletWidth', label: '碰撞宽度', type: 'number', desc: '默认 7' },
    { key: 'bulletShakeWidth', label: '抖动宽度', type: 'number' },
    { key: 'hitType', label: '碰撞类型', type: 'select', options: [
        { label: '矩形 (rect)', value: 'rect' },
        { label: '长射线 (longLine)', value: 'longLine' }
    ]},
    { key: 'penetrationNum', label: '穿透次数', type: 'number' },
    { key: 'penetrationGap', label: '穿透间隔', type: 'number' }
];

// 继承自 BulletDefine 的攻击时机属性
export const ARMS_BULLET_TIMING_METAS: BulletMetaItem[] = [
    { key: 'attackDelay', label: '攻击延迟', type: 'number' },
    { key: 'noHitTime', label: '无命中时间', type: 'number' },
    { key: 'hideTime', label: '隐藏时间', type: 'number' },
    { key: 'hitGap', label: '击中间隔', type: 'number' },
    { key: 'twoHitGap', label: '双hit间隔', type: 'number' }
];

// 继承自 BulletDefine 的发射属性
export const ARMS_BULLET_SHOOT_METAS: BulletMetaItem[] = [
    { key: 'shootRecoil', label: '射击后坐力', type: 'number' },
    { key: 'screenShakeValue', label: '屏幕震动值', type: 'number' },
    { key: 'aiShootRange', label: 'AI 射程', type: 'number' },
    { key: 'gatlinNum', label: '加特林子弹数', type: 'number' },
    { key: 'gatlinRange', label: '加特林散射范围', type: 'number' },
    { key: 'shootPoint', label: '发射点偏移', type: 'string', desc: '格式: x,y' }
];

// 继承自 BulletDefine 的运动学属性
export const ARMS_BULLET_MOTION_METAS: BulletMetaItem[] = [
    { key: 'bulletSpeed', label: '子弹速度', type: 'number' },
    { key: 'gravity', label: '重力', type: 'number' },
    { key: 'bulletVra', label: '旋转速度', type: 'number' },
    { key: 'bulletAngle', label: '初始角度', type: 'number', desc: '-1000 为不设置' },
    { key: 'bulletAngleRange', label: '角度随机范围', type: 'number' },
    { key: 'extendGap', label: '延伸间隔', type: 'number' }
];

// 继承自 BulletDefine 的技能数组
export const ARMS_BULLET_SKILL_METAS: BulletMetaItem[] = [
    { key: 'skillArr', label: '技能数组', type: 'string', desc: '逗号分隔' },
    { key: 'godSkillArr', label: '神级技能数组', type: 'string', desc: '逗号分隔' },
    { key: 'bulletSkillArr', label: '子弹技能数组', type: 'string', desc: '逗号分隔' }
];

// 继承自 BulletDefine 的子对象配置
export const ARMS_BULLET_SUBOBJECT_METAS: BulletMetaItem[] = [
    { key: 'speedD.min', label: '速度-最小值', type: 'number' },
    { key: 'speedD.max', label: '速度-最大值', type: 'number' },
    { key: 'speedD.a', label: '速度-加速度', type: 'number' },
    { key: 'speedD.random', label: '速度-随机比例', type: 'number' },
    { key: 'speedD.selfVra', label: '速度-自转速度', type: 'number' },
    { key: 'speedD.raBackV', label: '速度-后坐速度', type: 'number' },
    { key: 'followD.value', label: '追踪强度', type: 'number' },
    { key: 'followD.maxTime', label: '追踪最长时间', type: 'number' },
    { key: 'followD.delay', label: '追踪延迟', type: 'number' },
    { key: 'followD.hitIsTargetB', label: '追踪命中目标', type: 'switch' },
    { key: 'bounceD.body', label: '反弹-单位次数', type: 'number' },
    { key: 'bounceD.floor', label: '反弹-地面次数', type: 'number' },
    { key: 'bounceD.vMul', label: '反弹-速度倍数', type: 'number' },
    { key: 'bounceD.noDieB', label: '反弹-不消失', type: 'switch' },
    { key: 'boomD.floorB', label: '爆炸-地面触发', type: 'switch' },
    { key: 'boomD.bodyB', label: '爆炸-单位触发', type: 'switch' },
    { key: 'boomD.radius', label: '爆炸-半径', type: 'number' },
    { key: 'boomD.hurtMul', label: '爆炸-伤害倍率', type: 'number' },
    { key: 'lineD.color', label: '射线-颜色', type: 'string', desc: '如 0xFFFFFF' },
    { key: 'lineD.size', label: '射线-粗细', type: 'number' }
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
