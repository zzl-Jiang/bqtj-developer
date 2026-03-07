// client/src/views/Editor/SkillEditor/config/fields.ts
// 技能编辑器字段配置 - 统一规范格式

import type { SkillMetaItem } from './types';
import * as Opts from './options';

/** 基础信息字段 */
export const SKILL_BASE_FIELDS: SkillMetaItem[] = [
  {
    key: 'name',
    label: '技能ID (必填)',
    type: 'string',
    group: 'base',
    importance: 'core',
    desc: '技能的基础ID或名称，必须存在且不能重复。',
    docContent: '技能的唯一标识ID，用于代码和XML中引用技能。只能包含字母、数字、下划线。',
    exampleValue: 'skill_heal_aura'
  },
  {
    key: 'cnName',
    label: '显示名称',
    type: 'string',
    group: 'base',
    importance: 'core',
    desc: '方便记忆、游戏内部分显示的技能中文名称，可选且可以重复。',
    docContent: '技能的中文显示名称，方便记忆和游戏内部分显示。可以重复。',
    exampleValue: '治愈光环'
  },
  {
    key: 'iconUrl36',
    label: '图标URL',
    type: 'select_png',
    group: 'base',
    importance: 'advanced',
    desc: '游戏内技能栏显示的图标。\n可选，也可以使用游戏已有素材。\n输入后按下回车创建新标签。',
    docContent: '游戏内技能栏显示的图标路径。可选，也可以使用游戏已有素材。',
    exampleValue: 'png/skill/icon_heal'
  }
];

/** 效果逻辑字段 */
export const SKILL_LOGIC_FIELDS: SkillMetaItem[] = [
  {
    key: 'conditionType',
    label: '触发种类 (conditionType)',
    type: 'select',
    group: 'logic',
    importance: 'core',
    options: Opts.CONDITION_TYPE_OPTIONS,
    desc: '主动触发或者被动生效。\n注意会影响后续一些属性的显示。',
    docContent: '技能的触发类型。active为主动触发，passive为被动生效。影响后续一些属性的显示。',
    exampleValue: 'passive'
  },
  {
    key: 'condition',
    label: '触发细则 (condition)',
    type: 'select',
    group: 'logic',
    importance: 'core',
    desc: '触发的详细条件。\n需要先选择 conditionType 以显示选择范围。\n额外条件请在属性添加中寻找。',
    docContent: '触发的详细条件。需要先选择conditionType以显示选择范围。',
    exampleValue: 'interval'
  },
  {
    key: 'cd',
    label: '冷却 (cd)',
    type: 'number',
    group: 'logic',
    importance: 'advanced',
    isOptional: true,
    vIf: (s) => s.conditionType === 'active',
    desc: '主动技能的冷却时间。',
    docContent: '主动技能的冷却时间（秒）。只有conditionType为active时生效。',
    exampleValue: 5
  },
  {
    key: 'firstCd',
    label: '首次冷却 (firstCd)',
    type: 'number',
    group: 'logic',
    importance: 'optional',
    isOptional: true,
    vIf: (s) => s.conditionType === 'active',
    desc: '主动技能首次冷却时间，需要先有 cd。\n代表单位生成时该技能的冷却时间。\n如果置空或不添加，就是 cd 的三分之二。',
    docContent: '主动技能首次冷却时间（秒）。代表单位生成时该技能的冷却时间。默认为cd的三分之二。',
    exampleValue: 3
  },
  {
    key: 'delay',
    label: '前摇延迟 (delay)',
    type: 'number',
    group: 'logic',
    importance: 'optional',
    isOptional: true,
    vIf: (s) => s.conditionType === 'active',
    desc: '主动技能释放前摇。\n根据观察，基本是用于配合部分单位 actionLabel 的动画时间效果，如果没有特殊需求一般可以忽略。',
    docContent: '主动技能释放前摇（秒）。用于配合部分单位actionLabel的动画时间效果。',
    exampleValue: 0
  },
  {
    key: 'cdRandomRange',
    label: '随机冷却增加 (cdRandomRange)',
    type: 'number',
    group: 'logic',
    importance: 'optional',
    isOptional: true,
    vIf: (s) => s.conditionType === 'active',
    desc: '主动技能的随机冷却增加。\n效果简单，是个非常冷门的属性，游戏中只有科研僵尸的爆瓶有使用。',
    docContent: '主动技能的随机冷却增加（秒）。效果简单，是个非常冷门的属性。',
    exampleValue: 0
  },
  {
    key: 'continueNum',
    label: '连续使用次数 (continueNum)',
    type: 'number',
    group: 'logic',
    importance: 'optional',
    isOptional: true,
    vIf: (s) => s.conditionType === 'active',
    desc: '最大连续使用次数。\n点名恐怖盒子，同款效果。',
    docContent: '最大连续使用次数。技能可以连续使用的最大次数。',
    exampleValue: 1
  },
  {
    key: 'intervalT',
    label: '间隔频率 (intervalT)',
    type: 'number',
    group: 'logic',
    importance: 'optional',
    isOptional: true,
    vIf: (s) => s.condition === 'interval',
    desc: '间隔触发的频率 (秒数)。\n配合 interval 使用，如果该属性 (intervalT) 未设置，会采用 duration 标签的数值。',
    docContent: '间隔触发的频率（秒）。配合interval使用，如果未设置会采用duration的数值。',
    exampleValue: 1
  },
  {
    key: 'addType',
    label: '效果类型 (addType)',
    type: 'select',
    group: 'logic',
    importance: 'core',
    options: Opts.ADD_TYPE_OPTIONS,
    desc: '分为三类：即时、状态、混合。\n即时生效/为目标添加状态/两者混合，其中混合按照生效次序分为两类。',
    docContent: '效果类型。instant为即时生效，state为添加状态，instantAndState/stateAndInstant为两者混合（区别在于生效顺序）。',
    exampleValue: 'instant'
  },
  {
    key: 'effectType',
    label: '效果函数 (effectType)',
    type: 'select',
    group: 'logic',
    importance: 'core',
    options: Opts.EFFECT_TYPE_OPTIONS,
    desc: `这里其实是调用实际 as3 代码中的函数名称。\n每种效果详情见右边"AS3 效果说明"。
    注意部分效果会随着 addType 的选项而发生改变。
    【即时】效果对应 instant 生效；
    【状态】效果对应 state 生效；
    instantAndState / stateAndInstant 同时生效【即时】与【状态】，区别在于生效顺序。
    请注意：range 属性是否需要依赖目标选择-选择模式 (chooseType) 的配置，不局限于本属性。
    另，若期望条件判定实现后技能概率生效，请自行添加 effectProArr 属性，在选项说明中不再特别指出。
    由于选项数据记录不全，若有范围外的调用需求，可以自行输入参数后回车创建新选项。`,
    docContent: '效果函数名称，调用实际AS3代码中的函数。每种效果有不同作用，详情见Wiki或效果说明面板。',
    exampleValue: 'healHpByValue',
    relatedFields: ['addType', 'value', 'mul']
  },
  {
    key: 'value',
    label: '数值 (value)',
    type: 'number',
    group: 'logic',
    importance: 'core',
    isOptional: true,
    desc: '生效的数值 (value)。\n参考 effectType 的说明决定是否使用。',
    docContent: '生效的基础数值。参考effectType的说明决定是否需要。',
    exampleValue: 100
  },
  {
    key: 'mul',
    label: '倍率 (mul)',
    type: 'number',
    group: 'logic',
    importance: 'advanced',
    isOptional: true,
    desc: '生效的首要倍率 (mul)。\n参考 effectType 的说明决定是否使用。',
    docContent: '生效的首要倍率。对基础数值进行乘法修正。',
    exampleValue: 1
  },
  {
    key: 'secMul',
    label: '次要倍率 (secMul)',
    type: 'number',
    group: 'logic',
    importance: 'optional',
    isOptional: true,
    desc: '生效的次要倍率 (secMul)。\n参考 effectType 的说明决定是否使用。',
    docContent: '生效的次要倍率。部分效果需要第二个倍率参数。',
    exampleValue: 1
  },
  {
    key: 'firstTriggerT',
    label: '首次触发时间 (firstTriggerT)',
    type: 'number',
    group: 'logic',
    importance: 'optional',
    isOptional: true,
    vIf: (s) => s.minTriggerT,
    desc: '首次触发被动的时间 (value)。\n理同 firstCd，是被动的 interval 版本。',
    docContent: '首次触发被动的时间（秒）。理同firstCd，是被动的interval版本。',
    exampleValue: 0
  },
  {
    key: 'duration',
    label: '持续时间 (duration)',
    type: 'number',
    group: 'logic',
    importance: 'advanced',
    isOptional: true,
    vIf: (s) => s.addType === 'state' || s.addType === 'instantAndState',
    desc: '状态/效果持续时间 (duration)。\n一般都是添加的状态的持续时间，部分特殊效果参见 effectType 的说明。',
    docContent: '状态/效果持续时间（秒）。addType为state或instantAndState时生效。',
    exampleValue: 5
  },
  {
    key: 'doGap',
    label: '状态效果触发间隔 (doGap)',
    type: 'number',
    group: 'logic',
    importance: 'optional',
    isOptional: true,
    vIf: (s) => s.addType === 'state' || s.addType === 'instantAndState',
    desc: '状态效果的触发间隔。\n添加的该状态间隔多少秒触发一次 effectType 的效果。\n特别注意，选择这个效果时虽然 addType 是 state，但是使用的 effectType 是 instant 的列表。',
    docContent: '状态效果的触发间隔（秒）。添加的状态间隔多久触发一次effectType的效果。',
    exampleValue: 1
  },
  {
    key: 'range',
    label: '生效范围 (range)',
    type: 'number',
    group: 'logic',
    importance: 'advanced',
    isOptional: true,
    desc: '生效范围。\n注意，有时候需要该属性配合 target 相关配置，参见目标选择-选择模式-range。',
    docContent: '生效范围（像素）。有时需要配合target相关配置使用。',
    exampleValue: 300
  },
  {
    key: 'minRange',
    label: '最小生效范围 (minRange)',
    type: 'number',
    group: 'logic',
    importance: 'optional',
    isOptional: true,
    desc: '最小生效范围。\n通常配合 range 使用。',
    docContent: '最小生效范围（像素）。通常配合range使用，形成环形范围。',
    exampleValue: 0
  },
  {
    key: 'extraValueType',
    label: '额外数值类型 (extraValueType)',
    type: 'select',
    group: 'logic',
    importance: 'optional',
    isOptional: true,
    options: Opts.EXTRA_VALUE_OPTIONS,
    desc: '需要使用的额外数值基础值。\n参考 effectType 的说明决定是否使用。',
    docContent: '需要使用的额外数值基础值类型。参考effectType的说明决定是否需要。',
    exampleValue: ''
  },
  {
    key: 'noEffectLevelModel',
    label: '不生效模式 (noEffectLevelModel)',
    type: 'select',
    group: 'logic',
    importance: 'optional',
    isOptional: true,
    options: Opts.MODE_LIMIT_OPTIONS,
    desc: '该技能不生效的模式。\n注意只能实现单个模式。',
    docContent: '该技能不生效的模式限制。注意只能实现单个模式限制。',
    exampleValue: ''
  },
  {
    key: 'createByArmsTypePro',
    label: '武器类型概率模式 (createByArmsTypePro)',
    type: 'select',
    group: 'logic',
    importance: 'optional',
    isOptional: true,
    options: [
      {
        label: '触发概率 (effectProArr)',
        value: 'effectProArr',
        desc: '技能触发概率按照武器类型后的修正'
      }
    ],
    desc: '武器类型概率模式。\n目前只有 effectProArr 的选项。\n实现武器部分技能触发概率随着武器类型的的动态变化。',
    docContent: '武器类型概率模式。实现武器部分技能触发概率随着武器类型的动态变化。'
  },
  {
    key: 'otherConditionArr',
    label: '额外条件列表 (otherConditionArr)',
    type: 'multi_select',
    group: 'logic',
    importance: 'optional',
    isOptional: true,
    options: Opts.OTHER_CONDITION_OPTIONS,
    desc: '额外的判定条件生效列表。\n部分效果需要配合 conditionString / conditionRange 使用。',
    docContent: '额外的判定条件生效列表。部分效果需要配合conditionString/conditionRange使用。',
    exampleValue: []
  },
  {
    key: 'conditionString',
    label: '额外条件输入 (conditionString)',
    type: 'string',
    group: 'logic',
    importance: 'optional',
    isOptional: true,
    desc: '额外的判定条件辅助输入。\n请严格按照 otherConditionArr 的对应选项判断是否添加、需要什么输入。',
    docContent: '额外的判定条件辅助输入。请严格按照otherConditionArr的对应选项判断是否需要。',
    exampleValue: ''
  },
  {
    key: 'conditionRange',
    label: '额外条件数值 (conditionRange)',
    type: 'number',
    group: 'logic',
    importance: 'optional',
    isOptional: true,
    desc: '额外的判定条件辅助数值。\n请严格按照 otherConditionArr 的对应选项判断是否添加、需要什么数值。',
    docContent: '额外的判定条件辅助数值。请严格按照otherConditionArr的对应选项判断是否需要。',
    exampleValue: 0
  },
  {
    key: 'valueString',
    label: '额外效果输入 (valueString)',
    type: 'string',
    group: 'logic',
    importance: 'optional',
    isOptional: true,
    desc: '部分效果需要的辅助输入。\n请严格按照 effectType 的对应选项说明判断是否添加、需要什么输入。',
    docContent: '部分效果需要的辅助输入。请严格按照effectType的对应选项说明判断是否需要。',
    exampleValue: ''
  },
  {
    key: 'secString',
    label: '技能额外输入 (secString)',
    type: 'string',
    group: 'logic',
    importance: 'optional',
    isOptional: true,
    desc: '部分技能需要的辅助输入。\n可以理解为高级进阶属性，限制比较严格，大多数时间用不到。',
    docContent: '部分技能需要的辅助输入。可以理解为高级进阶属性，限制比较严格。',
    exampleValue: ''
  },
  {
    key: 'meActionLabel',
    label: '动作标签 (meActionLabel)',
    type: 'string',
    group: 'logic',
    importance: 'optional',
    isOptional: true,
    desc: '技能绑定的单位动画标签。\n给单位附加已有技能动画的。建议通常置空，除非非常明确自己想要干什么。',
    docContent: '技能绑定的单位动画标签。给单位附加已有技能动画，建议通常置空。',
    exampleValue: ''
  },
  {
    key: 'effectProArr',
    label: '效果概率 (effectProArr)',
    type: 'multi_select',
    group: 'logic',
    importance: 'optional',
    isOptional: true,
    desc: '效果触发所需的部分概率存储。\n可以部分参考 effectType 的选项说明或者根据实现期望自行决定是否需要。\n在多选框中输入数值、按下回车，即可创建对应选项。',
    docContent: '效果触发所需的部分概率存储。在多选框中输入数值、按下回车，即可创建对应选项。',
    exampleValue: []
  },
  {
    key: 'passiveSkillArr',
    label: '被动链接 (passiveSkillArr)',
    type: 'multi_select',
    group: 'logic',
    importance: 'optional',
    isOptional: true,
    desc: `链接生效的被动技能，允许嵌套，适用于任何被动技能。\n对于只使用 xml 数据，实现集成的复杂技能机制来说至关重要。
    可以调用自定义的技能名称。\n可以部分参考 effectType 的选项说明决定是否需要。\n在多选框中输入数值、按下回车，即可创建对应选项。`,
    docContent: '链接生效的被动技能，允许嵌套。适用于任何被动技能，对复杂技能机制至关重要。',
    exampleValue: []
  },
  {
    key: 'linkArr',
    label: '技能链接 (linkArr)',
    type: 'multi_select',
    group: 'logic',
    importance: 'optional',
    isOptional: true,
    desc: `随该技能共同生效的链接技能。\n可以部分参考 effectType 的选项说明决定是否需要。\n在多选框中输入数值、按下回车，即可创建对应选项。`,
    docContent: '随该技能共同生效的链接技能。可以部分参考effectType的选项说明决定是否需要。',
    exampleValue: []
  },
  {
    key: 'obj',
    label: '附加对象 (obj)',
    type: 'multi_select',
    group: 'logic',
    importance: 'optional',
    isOptional: true,
    desc: `部分效果需要的附加对象。\n请严格按照 effectType 的选项说明决定是否需要。\n在多选框中输入数值、按下回车，即可创建对应选项。
    注意每个选项需要为"key":"value"形式。\n输入示例："type":"atry" / "per":0.6`,
    docContent: '部分效果需要的附加对象。注意每个选项需要为"key":"value"形式。',
    exampleValue: []
  }
];

/** 视觉资源字段（向导模式合并显示） */
export const SKILL_VISUAL_FIELDS: SkillMetaItem[] = [
  {
    key: 'visualResources',
    label: '视觉资源配置',
    type: 'string',
    group: 'visuals',
    importance: 'optional',
    desc: '技能相关的图像、音效等视觉表现资源。',
    docContent: '配置技能的各类视觉特效，包括技能释放特效、受击效果、状态图标等。',
    isComplex: true,
    complexType: 'object',
    complexDesc: '点击配置视觉资源'
  }
];

/** 功能标志字段 */
export const SKILL_FLAG_FIELDS: SkillMetaItem[] = [
  {
    key: 'showInLifeBarB',
    label: '血条显示',
    type: 'switch',
    group: 'flags',
    importance: 'optional',
    desc: '是否在血条上显示该技能状态。',
    docContent: '是否在血条上显示该技能状态。',
    exampleValue: false
  },
  {
    key: 'ignoreSilenceB',
    label: '无视沉默',
    type: 'switch',
    group: 'flags',
    importance: 'optional',
    desc: '是否无视沉默效果。开启后即使被沉默也能使用该技能。',
    docContent: '是否无视沉默效果。开启后即使被沉默也能使用该技能。',
    exampleValue: false
  },
  {
    key: 'ignoreNoSkillB',
    label: '无视封锁',
    type: 'switch',
    group: 'flags',
    importance: 'optional',
    desc: '是否无视封锁效果。开启后即使被封锁技能也能使用。',
    docContent: '是否无视封锁效果。开启后即使被封锁技能也能使用。',
    exampleValue: false
  },
  {
    key: 'overlyingB',
    label: '允许叠加',
    type: 'switch',
    group: 'flags',
    importance: 'optional',
    desc: '是否允许叠加。开启后同名技能效果可以叠加多层。',
    docContent: '是否允许叠加。开启后同名技能效果可以叠加多层。',
    exampleValue: false
  },
  {
    key: 'noInClonedB',
    label: '禁止分身继承',
    type: 'switch',
    group: 'flags',
    importance: 'optional',
    desc: '是否禁止分身继承。开启后分身不会继承该技能。',
    docContent: '是否禁止分身继承。开启后分身不会继承该技能。',
    exampleValue: false
  },
  {
    key: 'noBeClearB',
    label: '不被清除',
    type: 'switch',
    group: 'flags',
    importance: 'optional',
    desc: '是否不被清除。开启后该技能不会被清除技能效果影响。',
    docContent: '是否不被清除。开启后该技能不会被清除技能效果影响。',
    exampleValue: false
  },
  {
    key: 'everNoClearB',
    label: '永不清除',
    type: 'switch',
    group: 'flags',
    importance: 'optional',
    desc: '是否永不清除。开启后该技能永久存在，无法被任何方式清除。',
    docContent: '是否永不清除。开启后该技能永久存在，无法被任何方式清除。',
    exampleValue: false
  },
  {
    key: 'summonedUnitsB',
    label: '召唤单位',
    type: 'switch',
    group: 'flags',
    importance: 'optional',
    desc: '是否为召唤单位技能。开启后标记为召唤物相关技能。',
    docContent: '是否为召唤单位技能。开启后标记为召唤物相关技能。',
    exampleValue: false
  },
  {
    key: 'changeHurtB',
    label: '修改原始伤害',
    type: 'switch',
    group: 'flags',
    importance: 'optional',
    desc: '是否修改原始伤害。开启后可以修改伤害的原始数值。',
    docContent: '是否修改原始伤害。开启后可以修改伤害的原始数值。',
    exampleValue: false
  },
  {
    key: 'noSkillDodgeB',
    label: '无视概率免疫',
    type: 'switch',
    group: 'flags',
    importance: 'optional',
    desc: '是否无视概率免疫。开启后技能不会被概率免疫闪避。',
    docContent: '是否无视概率免疫。开启后技能不会被概率免疫闪避。',
    exampleValue: false
  },
  {
    key: 'ignoreImmunityB',
    label: '无视技能免疫',
    type: 'switch',
    group: 'flags',
    importance: 'optional',
    desc: '是否无视技能免疫。开启后可以对技能免疫的单位生效。',
    docContent: '是否无视技能免疫。开启后可以对技能免疫的单位生效。',
    exampleValue: false
  },
  {
    key: 'noCopyB',
    label: '禁止复制',
    type: 'switch',
    group: 'flags',
    importance: 'optional',
    desc: '是否禁止复制。开启后该技能不能被复制类效果复制。',
    docContent: '是否禁止复制。开启后该技能不能被复制类效果复制。',
    exampleValue: false
  },
  {
    key: 'noRandomListB',
    label: '不进随机池',
    type: 'switch',
    group: 'flags',
    importance: 'optional',
    desc: '是否不进随机池。开启后该技能不会被随机技能选择器选中。',
    docContent: '是否不进随机池。开启后该技能不会被随机技能选择器选中。',
    exampleValue: false
  },
  {
    key: 'isDefenceB',
    label: '免疫伤害',
    type: 'switch',
    group: 'flags',
    importance: 'optional',
    desc: '是否免疫伤害。开启后技能使目标免疫所有伤害。',
    docContent: '是否免疫伤害。开启后技能使目标免疫所有伤害。',
    exampleValue: false
  },
  {
    key: 'isInvincibleB',
    label: '不可阻挡',
    type: 'switch',
    group: 'flags',
    importance: 'optional',
    desc: '是否不可阻挡。开启后技能效果无法被阻挡。',
    docContent: '是否不可阻挡。开启后技能效果无法被阻挡。',
    exampleValue: false
  },
  {
    key: 'noReStateB',
    label: '不反复触发',
    type: 'switch',
    group: 'flags',
    importance: 'optional',
    desc: '是否不反复触发。开启后技能效果不会重复触发。',
    docContent: '是否不反复触发。开启后技能效果不会重复触发。',
    exampleValue: false
  },
  {
    key: 'noCdMulB',
    label: '不受冷却加成',
    type: 'switch',
    group: 'flags',
    importance: 'optional',
    desc: '是否不受冷却加成影响。开启后技能冷却不受冷却缩减属性影响。',
    docContent: '是否不受冷却加成影响。开启后技能冷却不受冷却缩减属性影响。',
    exampleValue: false
  },
  {
    key: 'groundDieB',
    label: '落地效果消失',
    type: 'switch',
    group: 'flags',
    importance: 'optional',
    desc: '是否落地效果消失。开启后目标落地时技能效果消失。',
    docContent: '是否落地效果消失。开启后目标落地时技能效果消失。',
    exampleValue: false
  },
  {
    key: 'wantDescripB',
    label: '需求/显示描述',
    type: 'switch',
    group: 'flags',
    importance: 'optional',
    desc: '是否需求/显示描述。开启后在需要时显示技能描述。',
    docContent: '是否需求/显示描述。开启后在需要时显示技能描述。',
    exampleValue: false
  },
  {
    key: 'targetPointEffectB',
    label: '目标点生效',
    type: 'switch',
    group: 'flags',
    importance: 'optional',
    desc: '是否目标点生效。开启后技能在目标点而不是目标单位上生效。',
    docContent: '是否目标点生效。开启后技能在目标点而不是目标单位上生效。',
    exampleValue: false
  }
];

/** 目标选择字段 */
export const SKILL_TARGET_FIELDS: SkillMetaItem[] = [
  {
    key: 'target',
    label: '目标参照 (target)',
    type: 'select',
    group: 'target',
    importance: 'core',
    options: Opts.TARGET_OPTIONS,
    desc: '选择作为参考的目标。\n如果只有单个特定目标，直接在此处选择即可。\n注意，该页面只有这一个属性是必选的。',
    docContent: '技能作用的目标选择配置，包括目标阵营、选择模式、数量限制、排除规则等详细设置。',
    exampleValue: 'me'
  },
  {
    key: 'chooseType',
    label: '选择模式 (chooseType)',
    type: 'select',
    group: 'target',
    importance: 'advanced',
    options: Opts.CHOOSE_TYPE_OPTIONS,
    desc: '(可选)\n选取目标的形式。\n以一定方式或规则筛选目标，需配合 camp 使用。',
    docContent: '选取目标的形式。以一定方式或规则筛选目标，需配合camp使用。',
    exampleValue: ''
  },
  {
    key: 'camp',
    label: '目标阵营 (camp)',
    type: 'select',
    group: 'target',
    importance: 'advanced',
    options: Opts.CAMP_OPTIONS,
    desc: '(可选)\n实际选取目标的阵营。\n需配合 chooseType 使用。',
    docContent: '实际选取目标的阵营。需配合chooseType使用。',
    exampleValue: 'we'
  },
  {
    key: 'unitType',
    label: '单位类型 (unitType)',
    type: 'select',
    group: 'target',
    importance: 'optional',
    options: Opts.UNIT_TYPE_OPTIONS,
    desc: '(可选)\n选取限定的单位类型。\n只包含普通、精英、首领。',
    docContent: '选取限定的单位类型。只包含普通、精英、首领三种。',
    exampleValue: ''
  },
  {
    key: 'systemType',
    label: '单位大类 (systemType)',
    type: 'select',
    group: 'target',
    importance: 'optional',
    options: Opts.SYSTEM_TYPE_OPTIONS,
    desc: '(可选)\n单位大类的限定。\n普通或持枪。',
    docContent: '单位大类的限定。普通或持枪。',
    exampleValue: ''
  },
  {
    key: 'limitNum',
    label: '限制数量 (limitNum)',
    type: 'number',
    group: 'target',
    importance: 'optional',
    desc: '(可选)\n影响或选择的单位数量限制。',
    docContent: '影响或选择的单位数量限制。',
    exampleValue: 0
  },
  {
    key: 'noMeB',
    label: '排除本体 (noMeB)',
    type: 'switch',
    group: 'target',
    importance: 'optional',
    desc: '是否排除本体不被选择纳入。',
    docContent: '是否排除本体不被选择纳入。',
    exampleValue: false
  },
  {
    key: 'noMainB',
    label: '排除P1 (noMainB)',
    type: 'switch',
    group: 'target',
    importance: 'optional',
    desc: '是否排除P1角色不被选择纳入。',
    docContent: '是否排除P1角色不被选择纳入。',
    exampleValue: false
  },
  {
    key: 'noExistB',
    label: '允许不存在 (noExistB)',
    type: 'switch',
    group: 'target',
    importance: 'optional',
    desc: '是否允许将不存在的角色纳入。',
    docContent: '是否允许将不存在的角色纳入。',
    exampleValue: false
  },
  {
    key: 'targetMustLiveB',
    label: '目标存活 (targetMustLiveB)',
    type: 'switch',
    group: 'target',
    importance: 'optional',
    desc: '是否选择的目标必须存活。\n大部分只用来搭配 meSummonedFather，一般用不上。',
    docContent: '是否选择的目标必须存活。大部分只用来搭配meSummonedFather使用。',
    exampleValue: false
  },
  {
    key: 'arenaB',
    label: '竞技场生效 (arenaB)',
    type: 'switch',
    group: 'target',
    importance: 'optional',
    desc: '竞技场或竞技模式中是否生效。\n默认值就是生效。',
    docContent: '竞技场或竞技模式中是否生效。默认值就是生效。',
    exampleValue: true
  },
  {
    key: 'noVehicleB',
    label: '排除载具 (noVehicleB)',
    type: 'switch',
    group: 'target',
    importance: 'optional',
    desc: '是否排除所有载具目标。',
    docContent: '是否排除所有载具目标。',
    exampleValue: false
  },
  {
    key: 'noRaceType',
    label: '排除种族 (noRaceType)',
    type: 'select',
    group: 'target',
    importance: 'optional',
    options: Opts.RACE_TYPE_OPTIONS,
    desc: '(可选)\n排除特定种族单位。',
    docContent: '排除特定种族单位。',
    exampleValue: ''
  },
  {
    key: 'bodyName',
    label: '指定单位 (bodyName)',
    type: 'string',
    group: 'target',
    importance: 'optional',
    desc: '(可选)\n指定单位名称 (ID) 的单位生效。',
    docContent: '指定单位名称（ID）的单位生效。',
    exampleValue: ''
  },
  {
    key: 'alert',
    label: '特殊判定 (alert)',
    type: 'select',
    group: 'target',
    importance: 'optional',
    options: Opts.ALERT_OPTIONS,
    desc: '(可选)\n一些特殊判定，基本不会用到。',
    docContent: '一些特殊判定，基本不会用到。',
    exampleValue: ''
  }
];
