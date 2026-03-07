// client/src/views/Editor/SkillEditor/config/wizard.ts
// 向导模式配置 - 为 SkillEditor 定义分类和字段重要性

import type { CategoryConfig, SkillMetaItem } from './types';

/**
 * 分类配置
 * 将 Skill 的所有字段组织成 5 个逻辑分类
 */
export const SKILL_WIZARD_CATEGORIES: CategoryConfig[] = [
    {
        id: 'basic',
        label: '基础信息',
        icon: 'BuildOutline',
        iconColor: '#18a058',
        description: '技能的ID、名称、图标等核心身份信息。这些是技能最基本的数据，必须先配置。',
        fields: ['name', 'cnName', 'iconUrl36']
    },
    {
        id: 'logic',
        label: '效果逻辑',
        icon: 'FlashOutline',
        iconColor: '#f2c97d',
        description: '技能的触发条件、效果类型、数值、冷却时间等核心逻辑配置。',
        fields: ['conditionType', 'condition', 'cd', 'firstCd', 'delay', 'cdRandomRange', 'continueNum', 'intervalT', 'addType', 'effectType', 'value', 'mul', 'secMul', 'firstTriggerT', 'duration', 'doGap', 'range', 'minRange', 'extraValueType', 'noEffectLevelModel', 'otherConditionArr', 'conditionString', 'conditionRange', 'valueString', 'secString', 'meActionLabel', 'effectProArr', 'passiveSkillArr', 'linkArr', 'obj']
    },
    {
        id: 'target',
        label: '目标选择',
        icon: 'LocateOutline',
        iconColor: '#70c0e8',
        description: '技能作用的目标选择规则，包括目标阵营、选择模式、数量限制等。',
        fields: ['target', 'chooseType', 'camp', 'unitType', 'systemType', 'limitNum', 'noMeB', 'noMainB', 'noExistB', 'targetMustLiveB', 'arenaB', 'noVehicleB', 'noRaceType', 'bodyName', 'alert']
    },
    {
        id: 'flags',
        label: '功能标志',
        icon: 'FlagOutline',
        iconColor: '#63e2b7',
        description: '控制技能特殊行为的开关标志，如血条显示、无视沉默、允许叠加等。',
        fields: ['showInLifeBarB', 'ignoreSilenceB', 'ignoreNoSkillB', 'overlyingB', 'noInClonedB', 'noBeClearB', 'everNoClearB', 'summonedUnitsB', 'changeHurtB', 'noSkillDodgeB', 'ignoreImmunityB', 'noCopyB', 'noRandomListB', 'isDefenceB', 'isInvincibleB', 'noReStateB', 'noCdMulB', 'groundDieB', 'wantDescripB', 'targetPointEffectB']
    },
    {
        id: 'visuals',
        label: '视觉资源',
        icon: 'ImageOutline',
        iconColor: '#e88080',
        description: '技能相关的图像、音效等视觉表现资源，如技能特效、受击效果、状态图标等。',
        fields: ['visualResources']
    }
];

/**
 * 增强的字段配置
 * 在原有 Meta 配置基础上添加重要性级别和文档说明
 */
export const SKILL_WIZARD_FIELD_CONFIG: Record<string, Partial<SkillMetaItem>> = {
    // ===== 基础信息 - 核心 =====
    name: {
        importance: 'core',
        docContent: '技能的唯一标识ID，必须存在且不能重复。用于代码和XML中引用技能。',
        exampleValue: 'skill_heal_aura'
    },
    cnName: {
        importance: 'core',
        docContent: '技能的中文显示名称，方便记忆和游戏内部分显示。可以重复。',
        exampleValue: '治愈光环'
    },
    iconUrl36: {
        importance: 'advanced',
        docContent: '游戏内技能栏显示的图标路径。可选，也可以使用游戏已有素材。',
        exampleValue: 'png/skill/icon_heal'
    },

    // ===== 效果逻辑 - 核心 =====
    conditionType: {
        importance: 'core',
        docContent: '技能的触发类型。active为主动触发，passive为被动生效。影响后续一些属性的显示。',
        exampleValue: 'passive'
    },
    condition: {
        importance: 'core',
        docContent: '触发的详细条件。需要先选择conditionType以显示选择范围。',
        exampleValue: 'interval'
    },
    cd: {
        importance: 'advanced',
        docContent: '主动技能的冷却时间（秒）。只有conditionType为active时生效。',
        exampleValue: 5
    },
    firstCd: {
        importance: 'optional',
        docContent: '主动技能首次冷却时间（秒）。代表单位生成时该技能的冷却时间。默认为cd的三分之二。',
        exampleValue: 3
    },
    delay: {
        importance: 'optional',
        docContent: '主动技能释放前摇（秒）。用于配合部分单位actionLabel的动画时间效果。',
        exampleValue: 0
    },
    cdRandomRange: {
        importance: 'optional',
        docContent: '主动技能的随机冷却增加（秒）。效果简单，是个非常冷门的属性。',
        exampleValue: 0
    },
    continueNum: {
        importance: 'optional',
        docContent: '最大连续使用次数。技能可以连续使用的最大次数。',
        exampleValue: 1
    },
    intervalT: {
        importance: 'optional',
        docContent: '间隔触发的频率（秒）。配合interval条件使用，如果未设置会采用duration的数值。',
        exampleValue: 1
    },
    addType: {
        importance: 'core',
        docContent: '效果类型。instant为即时生效，state为添加状态，instantAndState/stateAndInstant为两者混合（区别在于生效顺序）。',
        exampleValue: 'instant'
    },
    effectType: {
        importance: 'core',
        docContent: '效果函数名称，调用实际AS3代码中的函数。每种效果有不同作用，详情见Wiki或效果说明面板。',
        exampleValue: 'healHpByValue',
        relatedFields: ['addType', 'value', 'mul']
    },
    value: {
        importance: 'core',
        docContent: '生效的基础数值。参考effectType的说明决定是否需要。',
        exampleValue: 100
    },
    mul: {
        importance: 'advanced',
        docContent: '生效的首要倍率。对基础数值进行乘法修正。',
        exampleValue: 1
    },
    secMul: {
        importance: 'optional',
        docContent: '生效的次要倍率。部分效果需要第二个倍率参数。',
        exampleValue: 1
    },
    firstTriggerT: {
        importance: 'optional',
        docContent: '首次触发被动的时间（秒）。理同firstCd，是被动的interval版本。',
        exampleValue: 0
    },
    duration: {
        importance: 'advanced',
        docContent: '状态/效果持续时间（秒）。addType为state或instantAndState时生效。',
        exampleValue: 5
    },
    doGap: {
        importance: 'optional',
        docContent: '状态效果的触发间隔（秒）。添加的状态间隔多久触发一次effectType的效果。',
        exampleValue: 1
    },
    range: {
        importance: 'advanced',
        docContent: '生效范围（像素）。有时需要配合target相关配置使用。',
        exampleValue: 300
    },
    minRange: {
        importance: 'optional',
        docContent: '最小生效范围（像素）。通常配合range使用，形成环形范围。',
        exampleValue: 0
    },
    extraValueType: {
        importance: 'optional',
        docContent: '需要使用的额外数值基础值类型。参考effectType的说明决定是否需要。',
        exampleValue: ''
    },
    noEffectLevelModel: {
        importance: 'optional',
        docContent: '该技能不生效的模式限制。注意只能实现单个模式限制。',
        exampleValue: ''
    },
    otherConditionArr: {
        importance: 'optional',
        docContent: '额外的判定条件生效列表。部分效果需要配合conditionString/conditionRange使用。',
        exampleValue: []
    },
    conditionString: {
        importance: 'optional',
        docContent: '额外的判定条件辅助输入。请严格按照otherConditionArr的对应选项判断是否需要。',
        exampleValue: ''
    },
    conditionRange: {
        importance: 'optional',
        docContent: '额外的判定条件辅助数值。请严格按照otherConditionArr的对应选项判断是否需要。',
        exampleValue: 0
    },
    valueString: {
        importance: 'optional',
        docContent: '部分效果需要的辅助输入。请严格按照effectType的对应选项说明判断是否需要。',
        exampleValue: ''
    },
    secString: {
        importance: 'optional',
        docContent: '部分技能需要的辅助输入。可以理解为高级进阶属性，限制比较严格。',
        exampleValue: ''
    },
    meActionLabel: {
        importance: 'optional',
        docContent: '技能绑定的单位动画标签。给单位附加已有技能动画，建议通常置空。',
        exampleValue: ''
    },
    effectProArr: {
        importance: 'optional',
        docContent: '效果触发所需的部分概率存储。可以部分参考effectType的选项说明决定是否需要。',
        exampleValue: []
    },
    passiveSkillArr: {
        importance: 'optional',
        docContent: '链接生效的被动技能，允许嵌套。适用于任何被动技能，对复杂技能机制至关重要。',
        exampleValue: []
    },
    linkArr: {
        importance: 'optional',
        docContent: '随该技能共同生效的链接技能。可以部分参考effectType的选项说明决定是否需要。',
        exampleValue: []
    },
    obj: {
        importance: 'optional',
        docContent: '部分效果需要的附加对象。请严格按照effectType的选项说明决定是否需要。注意每个选项需要为"key":"value"形式。',
        exampleValue: []
    },

    // ===== 目标选择 - 核心 =====
    target: {
        importance: 'core',
        isComplex: true,
        complexType: 'object',
        complexDesc: '点击配置目标选择规则',
        docContent: '技能作用的目标选择配置，包括目标阵营、选择模式、数量限制、排除规则等详细设置。'
    },
    chooseType: {
        importance: 'advanced',
        docContent: '选取目标的形式。以一定方式或规则筛选目标，需配合camp使用。',
        exampleValue: ''
    },
    camp: {
        importance: 'advanced',
        docContent: '实际选取目标的阵营。需配合chooseType使用。',
        exampleValue: 'we'
    },
    unitType: {
        importance: 'optional',
        docContent: '选取限定的单位类型。只包含普通、精英、首领三种。',
        exampleValue: ''
    },
    systemType: {
        importance: 'optional',
        docContent: '单位大类的限定。普通或持枪。',
        exampleValue: ''
    },
    limitNum: {
        importance: 'optional',
        docContent: '影响或选择的单位数量限制。',
        exampleValue: 0
    },
    noMeB: {
        importance: 'optional',
        docContent: '是否排除本体不被选择纳入。',
        exampleValue: false
    },
    noMainB: {
        importance: 'optional',
        docContent: '是否排除P1角色不被选择纳入。',
        exampleValue: false
    },
    noExistB: {
        importance: 'optional',
        docContent: '是否允许将不存在的角色纳入。',
        exampleValue: false
    },
    targetMustLiveB: {
        importance: 'optional',
        docContent: '是否选择的目标必须存活。大部分只用来搭配meSummonedFather使用。',
        exampleValue: false
    },
    arenaB: {
        importance: 'optional',
        docContent: '竞技场或竞技模式中是否生效。默认值就是生效。',
        exampleValue: true
    },
    noVehicleB: {
        importance: 'optional',
        docContent: '是否排除所有载具目标。',
        exampleValue: false
    },
    noRaceType: {
        importance: 'optional',
        docContent: '排除特定种族单位。',
        exampleValue: ''
    },
    bodyName: {
        importance: 'optional',
        docContent: '指定单位名称（ID）的单位生效。',
        exampleValue: ''
    },
    alert: {
        importance: 'optional',
        docContent: '一些特殊判定，基本不会用到。',
        exampleValue: ''
    },

    // ===== 功能标志 - 进阶 =====
    showInLifeBarB: {
        importance: 'optional',
        docContent: '是否在血条上显示该技能状态。',
        exampleValue: false
    },
    ignoreSilenceB: {
        importance: 'optional',
        docContent: '是否无视沉默效果。开启后即使被沉默也能使用该技能。',
        exampleValue: false
    },
    ignoreNoSkillB: {
        importance: 'optional',
        docContent: '是否无视封锁效果。开启后即使被封锁技能也能使用。',
        exampleValue: false
    },
    overlyingB: {
        importance: 'optional',
        docContent: '是否允许叠加。开启后同名技能效果可以叠加多层。',
        exampleValue: false
    },
    noInClonedB: {
        importance: 'optional',
        docContent: '是否禁止分身继承。开启后分身不会继承该技能。',
        exampleValue: false
    },
    noBeClearB: {
        importance: 'optional',
        docContent: '是否不被清除。开启后该技能不会被清除技能效果影响。',
        exampleValue: false
    },
    everNoClearB: {
        importance: 'optional',
        docContent: '是否永不清除。开启后该技能永久存在，无法被任何方式清除。',
        exampleValue: false
    },
    summonedUnitsB: {
        importance: 'optional',
        docContent: '是否为召唤单位技能。开启后标记为召唤物相关技能。',
        exampleValue: false
    },
    changeHurtB: {
        importance: 'optional',
        docContent: '是否修改原始伤害。开启后可以修改伤害的原始数值。',
        exampleValue: false
    },
    noSkillDodgeB: {
        importance: 'optional',
        docContent: '是否无视概率免疫。开启后技能不会被概率免疫闪避。',
        exampleValue: false
    },
    ignoreImmunityB: {
        importance: 'optional',
        docContent: '是否无视技能免疫。开启后可以对技能免疫的单位生效。',
        exampleValue: false
    },
    noCopyB: {
        importance: 'optional',
        docContent: '是否禁止复制。开启后该技能不能被复制类效果复制。',
        exampleValue: false
    },
    noRandomListB: {
        importance: 'optional',
        docContent: '是否不进随机池。开启后该技能不会被随机技能选择器选中。',
        exampleValue: false
    },
    isDefenceB: {
        importance: 'optional',
        docContent: '是否免疫伤害。开启后技能使目标免疫所有伤害。',
        exampleValue: false
    },
    isInvincibleB: {
        importance: 'optional',
        docContent: '是否不可阻挡。开启后技能效果无法被阻挡。',
        exampleValue: false
    },
    noReStateB: {
        importance: 'optional',
        docContent: '是否不反复触发。开启后技能效果不会重复触发。',
        exampleValue: false
    },
    noCdMulB: {
        importance: 'optional',
        docContent: '是否不受冷却加成影响。开启后技能冷却不受冷却缩减属性影响。',
        exampleValue: false
    },
    groundDieB: {
        importance: 'optional',
        docContent: '是否落地效果消失。开启后目标落地时技能效果消失。',
        exampleValue: false
    },
    wantDescripB: {
        importance: 'optional',
        docContent: '是否需求/显示描述。开启后在需要时显示技能描述。',
        exampleValue: false
    },
    targetPointEffectB: {
        importance: 'optional',
        docContent: '是否目标点生效。开启后技能在目标点而不是目标单位上生效。',
        exampleValue: false
    },

    // ===== 视觉资源 - 进阶 =====
    addSkillEffectImg: {
        importance: 'optional',
        isComplex: true,
        complexType: 'object',
        complexDesc: '点击配置技能添加时的视觉特效',
        docContent: '技能添加时的视觉特效，如技能释放瞬间的闪光、爆炸等效果。'
    },
    meEffectImg: {
        importance: 'optional',
        isComplex: true,
        complexType: 'object',
        complexDesc: '点击配置自身视觉特效',
        docContent: '对自身（技能释放者）附加的视觉特效，如身体发光、武器特效等。'
    },
    targetEffectImg: {
        importance: 'optional',
        isComplex: true,
        complexType: 'object',
        complexDesc: '点击配置目标视觉特效',
        docContent: '对目标附加的视觉特效，如受击特效、标记效果等。'
    },
    pointEffectImg: {
        importance: 'optional',
        isComplex: true,
        complexType: 'object',
        complexDesc: '点击配置生效点视觉特效',
        docContent: '在技能生效位置显示的视觉特效，如地面爆炸、区域光环等。'
    },
    otherEffectImg: {
        importance: 'optional',
        isComplex: true,
        complexType: 'object',
        complexDesc: '点击配置其他视觉特效',
        docContent: '其他未分类的视觉特效。'
    },
    stateEffectImg: {
        importance: 'optional',
        isComplex: true,
        complexType: 'object',
        complexDesc: '点击配置状态生效视觉特效',
        docContent: '状态生效期间显示的视觉特效，如持续恢复的光环、中毒的绿烟等。'
    },
    stateEffectImg2: {
        importance: 'optional',
        isComplex: true,
        complexType: 'object',
        complexDesc: '点击配置状态生效视觉特效2',
        docContent: '第二组状态生效视觉特效，用于需要多种特效叠加的情况。'
    },

    // ===== 视觉资源合并字段 =====
    visualResources: {
        importance: 'optional',
        isComplex: true,
        complexType: 'object',
        complexDesc: '点击配置视觉资源',
        docContent: '配置技能的各类视觉特效，包括技能释放特效、受击效果、状态图标等。包含7个图片字段：addSkillEffectImg（技能添加特效）、meEffectImg（自身特效）、targetEffectImg（目标特效）、pointEffectImg（生效点特效）、otherEffectImg（其他特效）、stateEffectImg（状态特效1）、stateEffectImg2（状态特效2）。'
    }
};

/**
 * 合并字段配置
 * 将原有的 Meta 配置与向导配置合并
 */
export function enhanceFieldMeta(baseMeta: SkillMetaItem): SkillMetaItem {
    const enhancement = SKILL_WIZARD_FIELD_CONFIG[baseMeta.key];
    if (enhancement) {
        return { ...baseMeta, ...enhancement };
    }
    return baseMeta;
}
