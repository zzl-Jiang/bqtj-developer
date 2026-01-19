// client/src/views/Editor/SkillEditor/config/logic.ts

import type { SkillMetaItem } from './types';
import * as Opts from './options';

export const LOGIC_META: SkillMetaItem[] = [
  {
    key: 'conditionType',
    label: '触发种类 (conditionType)',
    type: 'select',
    options: Opts.CONDITION_TYPE_OPTIONS,
    group: 'logic',
    desc: '主动触发或者被动生效。\n注意会影响后续一些属性的显示。'
  },
  {
    key: 'condition',
    label: '触发细则 (condition)',
    type: 'select',
    group: 'logic',
    // 注意：Options 在组件中根据 conditionType 动态提供
    desc: '触发的详细条件。\n需要先选择 conditionType 以显示选择范围。\n额外条件请在属性添加中寻找。'
  },
  // 主动技能字段
  { 
    key: 'cd',
    label: '冷却 (cd)',
    type: 'number',
    group: 'logic',
    isOptional: true,
    vIf: (s) => s.conditionType === 'active',
    desc: '主动技能的冷却时间。'
  },
  { 
    key: 'firstCd', 
    label: '首次冷却 (firstCd)', 
    type: 'number',
    group: 'logic',
    isOptional: true,
    vIf: (s) => s.conditionType === 'active',
    desc: '主动技能首次冷却时间，需要先有 cd。\n代表单位生成时该技能的冷却时间。\n如果置空或不添加，就是 cd 的三分之二。'
  },
  { 
    key: 'delay',
    label: '前摇延迟 (delay)',
    type: 'number',
    group: 'logic',
    isOptional: true,
    vIf: (s) => s.conditionType === 'active',
    desc: '主动技能释放前摇。\n根据观察，基本是用于配合部分单位 actionLabel 的动画时间效果，如果没有特殊需求一般可以忽略。'
  },
  { 
    key: 'cdRandomRange', 
    label: '随机冷却增加 (cdRandomRange)', 
    type: 'number',
    group: 'logic',
    isOptional: true,
    vIf: (s) => s.conditionType === 'active',
    desc: '主动技能的随机冷却增加。\n效果简单，是个非常冷门的属性，游戏中只有科研僵尸的爆瓶有使用。'
  },
  { 
    key: 'continueNum', 
    label: '连续使用次数 (continueNum)', 
    type: 'number',
    group: 'logic',
    isOptional: true,
    vIf: (s) => s.conditionType === 'active',
    desc: '最大连续使用次数。\n点名恐怖盒子，同款效果。'
  },
  // 间隔触发字段
  { 
    key: 'intervalT',
    label: '间隔频率 (intervalT)',
    type: 'number',
    group: 'logic',
    isOptional: true,
    vIf: (s) => s.condition === 'interval',
    desc: '间隔触发的频率 (秒数)。\n配合 interval 使用，如果该属性 (intervalT) 未设置，会采用 duration 标签的数值。'
  },
  // 核心效果配置
  {
    key: 'addType',
    label: '效果类型 (addType)',
    type: 'select',
    options: Opts.ADD_TYPE_OPTIONS,
    group: 'logic',
    desc: '分为三类：即时、状态、混合。\n即时生效/为目标添加状态/两者混合。'
  },
  {
    key: 'effectType',
    label: '效果函数 (effectType)',
    type: 'select',
    options: Opts.EFFECT_TYPE_OPTIONS,
    group: 'logic',
    desc: `这里其实是调用实际 as3 代码中的函数名称。\n每种效果详情见右边“AS3 效果说明”。
    注意部分效果会随着 addType 的选项而发生改变。
    【即时】效果对应 instant 生效；
    【状态】效果对应 state 生效；
    instantAndState 同时生效【即时】与【状态】。
    请注意：range 属性是否需要依赖目标选择-选择模式 (chooseType) 的配置，与本属性关系不大。
    另，若期望条件判定实现后技能概率生效，请自行添加 effectProArr 属性，在选项说明中不再特别指出。`
  },
  {
    key: 'value',
    label: '数值 (value)',
    type: 'number',
    isOptional: true,
    group: 'logic',
    desc: '生效的数值 (value)。\n参考 effectType 的说明决定是否使用。'
  },
  {
    key: 'mul',
    label: '倍率 (mul)',
    type: 'number',
    isOptional: true,
    group: 'logic',
    desc: '生效的首要倍率 (mul)。\n参考 effectType 的说明决定是否使用。'
  },
  {
    key: 'secMul',
    label: '次要倍率 (secMul)',
    type: 'number',
    isOptional: true,
    group: 'logic',
    desc: '生效的次要倍率 (secMul)。\n参考 effectType 的说明决定是否使用。'
  },
  {
    key: 'firstTriggerT',
    label: '首次触发时间 (firstTriggerT)',
    type: 'number',
    isOptional: true,
    group: 'logic',
    vIf: (s) => s.minTriggerT,
    desc: '首次触发被动的时间 (value)。\n理同 firstCd，是被动的 interval 版本。'
  },
  {
    key: 'duration',
    label: '持续时间 (duration)',
    type: 'number',
    isOptional: true,
    group: 'logic',
    vIf: (s) => s.addType === 'state' || s.addType === 'instantAndState',
    desc: '状态/效果持续时间 (duration)。\n一般都是添加的状态的持续时间，部分特殊效果参见 effectType 的说明。'
  },
  {
    key: 'doGap',
    label: '状态效果触发间隔 (doGap)',
    type: 'number',
    isOptional: true,
    group: 'logic',
    vIf: (s) => s.addType === 'state' || s.addType === 'instantAndState',
    desc: '状态效果的触发间隔。\n添加的该状态间隔多少秒触发一次 effectType 的效果。\n特别注意，选择这个效果时虽然 addType 是 state，但是使用的 effectType 是 instant 的列表。'
  },
  {
    key: 'range',
    label: '生效范围 (range)',
    type: 'number',
    isOptional: true,
    group: 'logic',
    desc: '生效范围。\n注意，有时候需要该属性配合 target 相关配置，参见目标选择-选择模式-range。'
  },
  {
    key: 'minRange',
    label: '最小生效范围 (minRange)',
    type: 'number',
    isOptional: true,
    group: 'logic',
    desc: '最小生效范围。\n通常配合 range 使用。'
  },
  {
    key: 'extraValueType',
    label: '额外数值类型 (extraValueType)',
    type: 'select',
    isOptional: true,
    options: Opts.EXTRA_VALUE_OPTIONS,
    group: 'logic',
    desc: '需要使用的额外数值基础值。\n参考 effectType 的说明决定是否使用。'
  },
  {
    key: 'noEffectLevelModel',
    label: '不生效模式 (noEffectLevelModel)',
    type: 'select',
    isOptional: true,
    options: Opts.MODE_LIMIT_OPTIONS,
    group: 'logic',
    desc: '该技能不生效的模式。\n注意只能实现单个模式。'
  },
  {
    key: 'createByArmsTypePro',
    label: '武器类型概率模式 (createByArmsTypePro)',
    type: 'select',
    isOptional: true,
    group: 'logic',
    options: [
      {
        label: '触发概率 (effectProArr)',
        value: 'effectProArr',
        desc: '技能触发概率按照武器类型后的修正'
      }
    ],
    desc: '武器类型概率模式。\n目前只有 effectProArr 的选项。\n实现武器部分技能触发概率随着武器类型的的动态变化。'
  },
  {
    key: 'otherConditionArr',
    label: '额外条件列表 (otherConditionArr)',
    type: 'multi_select',
    isOptional: true,
    options: Opts.OTHER_CONDITION_OPTIONS,
    group: 'logic',
    desc: '额外的判定条件生效列表。\n部分效果需要配合 conditionString / conditionRange 使用。'
  },
  {
    key: 'conditionString',
    label: '额外条件输入 (conditionString)',
    type: 'string',
    isOptional: true,
    group: 'logic',
    desc: '额外的判定条件辅助输入。\n请严格按照 otherConditionArr 的对应选项判断是否添加、需要什么输入。'
  },
  {
    key: 'conditionRange',
    label: '额外条件数值 (conditionRange)',
    type: 'number',
    isOptional: true,
    group: 'logic',
    desc: '额外的判定条件辅助数值。\n请严格按照 otherConditionArr 的对应选项判断是否添加、需要什么数值。'
  },
  {
    key: 'valueString',
    label: '额外效果输入 (valueString)',
    type: 'string',
    isOptional: true,
    group: 'logic',
    desc: '部分效果需要的辅助输入。\n请严格按照 effectType 的对应选项说明判断是否添加、需要什么输入。'
  },
  {
    key: 'secString',
    label: '技能额外输入 (secString)',
    type: 'string',
    isOptional: true,
    group: 'logic',
    desc: '部分技能需要的辅助输入。\n可以理解为高级进阶属性，限制比较严格，大多数时间用不到。'
  },
  {
    key: 'meActionLabel',
    label: '动作标签 (meActionLabel)',
    type: 'string',
    isOptional: true,
    group: 'logic',
    desc: '技能绑定的单位动画标签。\n给单位附加已有技能动画的。建议通常置空，除非非常明确自己想要干什么。'
  },
  {
    key: 'effectProArr',
    label: '效果概率 (effectProArr)',
    type: 'multi_select',
    isOptional: true,
    group: 'logic',
    desc: '效果触发所需的部分概率存储。\n可以部分参考 effectType 的选项说明或者根据实现期望自行决定是否需要。\n在多选框中输入数值、按下回车，即可创建对应选项。'
  },
  {
    key: 'passiveSkillArr',
    label: '被动链接 (passiveSkillArr)',
    type: 'multi_select',
    isOptional: true,
    group: 'logic',
    desc: `链接生效的被动技能，允许嵌套，适用于任何被动技能。\n对于只使用 xml 数据，实现集成的复杂技能机制来说至关重要。
    可以调用自定义的技能名称。\n可以部分参考 effectType 的选项说明决定是否需要。\n在多选框中输入数值、按下回车，即可创建对应选项。`
  },
  {
    key: 'linkArr',
    label: '技能链接 (linkArr)',
    type: 'multi_select',
    isOptional: true,
    group: 'logic',
    desc: `随该技能共同生效的链接技能。\n可以部分参考 effectType 的选项说明决定是否需要。\n在多选框中输入数值、按下回车，即可创建对应选项。`
  },
  {
    key: 'obj',
    label: '附加对象 (obj)',
    type: 'multi_select',
    isOptional: true,
    group: 'logic',
    desc: `部分效果需要的附加对象。\n请严格按照 effectType 的选项说明决定是否需要。\n在多选框中输入数值、按下回车，即可创建对应选项。
    注意每个选项需要为"key":"value"形式。\n输入示例："type":"atry" / "per":0.6`
  },
];