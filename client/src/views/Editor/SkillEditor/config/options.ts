// client/src/views/Editor/SkillEditor/config/options.ts

// extraValueType 的可能取值
export const EXTRA_VALUE_OPTIONS = [
  {
    label: '伤害数值 (hurtValue)',
    value: 'hurtValue',
    desc: '当前受伤数据产生的伤害数值。'
  },
  {
    label: '无技能加成伤害 (noSkillAddHurt)',
    value: 'noSkillAddHurt',
    desc: '不包括技能加成伤害。注意有老爆石同款bug。'
  },
  {
    label: '武器面板或通用 (nowArmsDpsOrNormal)',
    value: 'nowArmsDpsOrNormal',
    desc: '主角队友为当前武器面板战力，其他为基础战力。'
  },
  {
    label: '持枪战力显示 (heroDps)',
    value: 'heroDps',
    desc: '玩家单位战力或持枪单位战力因子。'
  },
  {
    label: '战力显示 (showDps)',
    value: 'showDps',
    desc: '玩家单位战力或单位战力因子。'
  },
  {
    label: '最高面板 (heroMaxArmsDps)',
    value: 'heroMaxArmsDps',
    desc: '持枪单位装备的最高面板战力武器。'
  },
  {
    label: '副手伤害 (heroWeaponHurt)',
    value: 'heroWeaponHurt',
    desc: '持枪单位当前副手伤害。'
  },
  {
    label: '载具基础战力因子 (vehicleFatherDps)',
    value: 'vehicleFatherDps',
    desc: '当前载具的基础载具的战力因子。'
  },
  {
    label: '简化战力 (nowArmsTrueDps)',
    value: 'nowArmsTrueDps',
    desc: '当前武器 单伤 ✖ 射速。'
  },
  {
    label: '目标战力因子 (meDpsFactor)',
    value: 'meDpsFactor',
    desc: '目标单位战力因子。'
  },
  {
    label: '来源战力因子 (producterDpsFactor)',
    value: 'producterDpsFactor',
    desc: '来源单位战力因子。'
  },
  {
    label: '武器面板伤害 (nowArmsHurt)',
    value: 'nowArmsHurt',
    desc: '武器面板伤害。'
  },
  {
    label: '目标最大生命 (targetMaxLife)',
    value: 'targetMaxLife',
    desc: '目标单位最大生命值。'
  },
  {
    label: '来源最大生命 (producterMaxLife)',
    value: 'producterMaxLife',
    desc: '来源单位最大生命值。'
  },
  {
    label: '本体最大生命 (meMaxLife)',
    value: 'meMaxLife',
    desc: '本体单位最大生命值，和来源一致。'
  },
  {
    label: '攻击间隔 (armsAttackGap)',
    value: 'armsAttackGap',
    desc: '造成伤害的武器攻击间隔。'
  },
  {
    label: '基础攻击间隔 (armsBaseAttackGap)',
    value: 'armsBaseAttackGap',
    desc: '造成伤害的基础武器攻击间隔。'
  },
  {
    label: '射程 (armsShootRange)',
    value: 'armsShootRange',
    desc: '造成伤害的显示射程。'
  },
  {
    label: '波数 (nowEnemyBo)',
    value: 'nowEnemyBo',
    desc: '当前关卡怪物波数。'
  }
];

// 阵营判定可能取值
export const CAMP_OPTIONS = [
  {
    label: '敌对 (enemy)',
    value: 'enemy',
    desc: '选择实际目标为敌对阵营'
  },
  {
    label: '友方 (we)',
    value: 'we',
    desc: '选择实际目标为友方阵营'
  },
  {
    label: '全体 (all)',
    value: 'all',
    desc: '选择实际目标为全体阵营'
  }
];

// 技能触发种类
export const CONDITION_TYPE_OPTIONS = [
  {
    label: '被动',
    value: 'passive'
  },
  {
    label: '主动',
    value: 'active'
  }
];

// 触发细则映射
export const CONDITION_OPTIONS_MAP: Record<string, { label: string, value: string, desc?: string }[]> = {
  active: [
    {
      label: '无限制 (no)',
      value: 'no',
      desc: '无任何条件限制'
    },
    {
      label: '技能CD结束 (avtiveSkillCdOver)',
      value: 'avtiveSkillCdOver',
      desc: '当技能冷却完成时自动触发'
    },
    {
      label: '持续射击 (loopClick)',
      value: 'loopClick',
      desc: '持续按下开火键'
    },
    {
      label: '跳跃时 (heroJump)',
      value: 'heroJump',
      desc: '跳跃动作触发'
    },
    {
      label: '翻滚时 (rollKey)',
      value: 'rollKey',
      desc: '翻滚键触发'
    },
    {
      label: '下蹲时 (heroSquat)',
      value: 'heroSquat',
      desc: '下蹲状态触发'
    },
    {
      label: '切换武器 (swapArms)',
      value: 'swapArms',
      desc: '更换武器动作触发'
    },
  ],
  passive: [
    {
      label: '无限制 (no)',
      value: 'no',
      desc: '无任何条件限制'
    },
    {
      label: '间隔触发 (interval)',
      value: 'interval',
      desc: '每隔一定时间自动尝试触发'
    },
    {
      label: '攻击命中 (hit)',
      value: 'hit',
      desc: '当自身攻击命中目标时'
    },
    {
      label: '受到伤害 (underAllHit)',
      value: 'underAllHit',
      desc: '当自身受到任意伤害时'
    },
    {
      label: '击杀目标 (killTarget)',
      value: 'killTarget',
      desc: '当自身击杀敌方单位时'
    },
    {
      label: '死亡时 (die)',
      value: 'die',
      desc: '当自身生命归零时'
    },
    {
      label: '濒死前 (beforeDie)',
      value: 'beforeDie',
      desc: '在受到致死伤害但尚未死亡时'
    },
    {
      label: '进入战场 (add)',
      value: 'add',
      desc: '技能/状态被添加到单位身上时立即触发'
    },
    {
      label: '使用技能时 (useSkill)',
      value: 'useSkill',
      desc: '当自身释放其他技能时触发'
    },
    {
      label: '进入僵直 (underRos)',
      value: 'underRos',
      desc: '当血量下降一定比例，陷入僵直时触发'
    },
  ],
};

// 效果大类
export const ADD_TYPE_OPTIONS = [
  {
    label: '即时 (instant)',
    value: 'instant',
    desc: '直接生效'
  },
  {
    label: '状态 (state)',
    value: 'state',
    desc: '添加状态'
  },
  {
    label: '混合 (instantAndState)',
    value: 'instantAndState',
    desc: '即时+状态'
  },
  {
    label: '混合 (stateAndInstant)',
    value: 'stateAndInstant',
    desc: '状态+即时'
  }
];

// 效果函数细则
export const EFFECT_TYPE_OPTIONS = [
  {
    label: '无 (no)',
    value: 'no',
    category: ['instant', 'state'],
    desc: '无函数逻辑。'
  },
  {
    label: '回复生命值 (life)',
    value: 'life',
    category: ['instant'],
    desc: `可选或需求参数：value / extraValueType / mul / obj。
    若数值 (value) 存在，回复 value * extraValue (可以为负) 数值生命;
    若首要倍率 (mul) 存在，回复 mul * extraValue (可以为负) 百分比生命;
    若 obj 存在且包含 pro 属性，有 pro 的概率额外回复 100% 生命。`
  },
  {
    label: '免伤回血 (addLifeByHurt)',
    value: 'addLifeByHurt',
    category: ['instant'],
    desc: `可选或需求参数：conditionRange。
    受到伤害时，若该伤害小于本体最大生命值的 conditionRange，回复对应百分比血量。
    效果可以理解为，抵挡低于自身生命值一定百分比的伤害。
    注意，通常配合 otherConditionArr 中的 hurtLessLifePer 使用，两者使用相同的参数 conditionRange。
    参见心零好感技能。`
  },
  {
    label: '钢铁之躯 (ironBodyLing)',
    value: 'ironBodyLing',
    category: ['instant', 'state'], 
    desc: `可选或需求参数：duration。
    【即时】为释放者回复 0.05 的最大生命值。
    【状态】为释放者添加无敌状态，可配合 duration 设置持续时间。`
  },
  {
    label: '击中回复 (Hit_AddLifeMul)',
    value: 'Hit_AddLifeMul',
    category: ['instant'],
    desc: `可选或需求参数：value / extraValueType。
    注意，下列机制略显复杂，仅为简要介绍，可以根据实际效果调整系数。文本中的目标与技能设置的 target 相关。
    若当前模式属于修罗/虚天塔/绿岛/太空 (宇航员)，每次回复量为 目标最大生命 * value * 目标角色加成系数 (小白为2，小樱为3，其余为1);
    否则，每次回复量为 释放者等级对应的吸血系数 (需要查表，最高为 1) * extraValue * value * 10。`
  },
  {
    label: '重生 (rebirth)',
    value: 'rebirth',
    category: ['instant'],
    desc: `可选或需求参数：mul。
    若目标为我方阵营单位，将目标从死亡状态复活，并将生命值设置为 (1 - mul) 的百分比。`
  },
  {
    label: '重生无敌 (rebirthAndHiding)',
    value: 'rebirthAndHiding',
    category: ['instant', 'state'],
    desc: `可选或需求参数：value / duration。
    【即时】若目标为我方阵营单位，将目标从死亡状态复活，并额外为目标添加 noUnderHurtB (免伤) 属性。
    【状态】为目标添加 noUnderHurtB (免伤) 状态，若 value 为 1，为目标添加 hidingB (隐身) 状态。可配合 duration 设置持续时间。`
  },
  {
    label: '强制死亡 (toDie)',
    value: 'toDie',
    category: ['instant'],
    desc: '无参数要求。\n使目标直接进入死亡流程。'
  },
  {
    label: '设置自动死亡倒计时 (setAutoDieCd)',
    value: 'setAutoDieCd',
    category: ['instant'],
    desc: `可选或需求参数：value。
    为目标设置一个存活计时器，value 秒后目标将自动死亡。常用于财宝僵尸或其他效果调用。`
  },
  {
    label: '异齿虎-复活 (SaberTiger_rebirth)',
    value: 'SaberTiger_rebirth',
    category: ['instant'],
    desc: `无参数要求。\n异齿虎专用复活逻辑。
    第一阶段异齿虎死亡复活后将移除技能 SaberTiger_shield_anger (玩家怒气回复加成) 与 SaberTiger_shield_defence (只受副手与异角龙伤害)，
    清除状态 SaberTiger_shield_first 与 SaberTiger_shield_second (均为动画效果)，
    并重置Boss血条显示。`
  },
  {
    label: '每秒伤害上限 (upperLimitSecond)',
    value: 'upperLimitSecond',
    category: ['instant'],
    desc: `可选或需求参数：mul。
    限制该技能在 1 秒周期内对目标造成的累计伤害总额。
    上限值 = 目标最大生命值 * mul。
    若一秒内多次触发该技能（如多段攻击），后续伤害会因额度不足被削减直至降为 0；
    时间超过 1 秒后，累计伤害自动清零并重新计算，做到限制每秒伤害。
    特别注意，该效果不同于锁血，是真正意义上的秒伤限制，目前游戏中没有实际调用。`
  },
  {
    label: '溅血特效 (hitBlood)',
    value: 'hitBlood',
    category: ['instant'],
    desc: `可选或需求参数：valueString / value / mul / range。
    在击中位置生成粒子特效（如血液、火花）。
    valueString: 粒子素材名称; value: 基础粒子数量 (受全局血量倍率加成); mul: 喷射速度/力度; range: 喷射范围。
    该函数会同时生成两拨粒子：一拨按标准参数喷射，另一拨速度翻倍但范围收窄。
    由于是纯视觉特效的效果，需要的场景并不多，推荐直接使用游戏已有技能。`
  },
  {
    label: '滤镜血效 (hitFilterBlood)',
    value: 'hitFilterBlood',
    category: ['instant'],
    desc: `可选或需求参数：valueString / value / mul / range。
    在击中位置生成单层粒子特效，并启用 "filter" 滤镜模式。
    filter 模式通常用于实现具有发光、模糊或其他特殊视觉处理的碎屑效果。
    参数含义与 hitBlood 一致，但仅生成一波粒子。`
  },
  {
    label: '转向攻击目标 (flipToAttackTarget)',
    value: 'flipToAttackTarget',
    category: ['instant'],
    desc: `无参数要求。\n使受效果单位立即转向，以面对其当前 AI 锁定的敌对目标。
    常用于配合 meActionLabel 的动画效果，确保角色的朝向能够随敌人的位置变化自动修正，防止后续攻击动画落空。`
  },
  {
    label: '补充弹药 (charger)',
    value: 'charger',
    category: ['instant'],
    desc: `可选或需求参数：value / mul。
    需求 obj 参数：{"target":"now"|"all", "addType":"add"}。
    为目标的武器补充弹药。
    target: "now" 表示仅针对当前手持武器，"all" 表示针对所有装备武器；
    addType: 补充模式（通常为 "add" 累加）。
    如果玩家处于变身或附身状态，会自动将弹药补充到正确的本体或目标身上。
    若 value > 0，按固定数值补充；若 mul > 0，按最大弹药量的百分比补充。
    常用于击毙补充弹药、拾取弹药箱等场景。`
  },
  {
    label: '增加当前弹容 (addCapacity)',
    value: 'addCapacity',
    category: ['instant'],
    desc: `可选或需求参数：value。
    直接增加当前手持武器的 value 子弹数量。
    与 charger 不同，该函数固定只作用于当前武器，且通常直接修改当前弹匣内的子弹容量。`
  },
  {
    label: '清除弹药 (emp)',
    value: 'emp',
    category: ['instant'],
    desc: `可选或需求参数：value / mul。
    立即削减目标的武器弹药。
    1. 根据 mul 比例减少目标的后备弹药 (携弹量)；
    2. 根据 value 比例减少目标当前弹匣内的子弹数量 (弹容)。`
  },
  {
    label: '生命置换 (lifeReplace)',
    value: 'lifeReplace',
    category: ['instant'],
    desc: `无参数要求。
    交换技能释放者与目标的当前生命值百分比。
    该效果包含严格的平衡性限制：
    1. 在反客模式中，目标最多损失当前生命的 70%。
    2. 在非反客模式中，对 BOSS (首领单位) 触发时，目标最多损失当前生命的 10%；对其他单位触发时，最多损失 40%。
    3. 在非反客模式中，释放者通过置换获得的血量百分比最高不超过原先的 2 倍。
    注意：此效果交换的是百分比而非固定数值。`
  },
  {
    label: '牺牲 (sacrifice)',
    value: 'sacrifice',
    category: ['instant'],
    desc: `可选或需求参数：mul / extraValueType。
    将特定的额外数值 (extraValue) 按 mul 比例转化为生命值补充给目标。
    常用于根据自身受损血量为队友回血（此时 extraValue 为自身扣除的血量）。
    注意：该函数本身不执行扣血动作，仅负责根据已有的数值进行回血补偿。`
  },
  {
    label: '百分比生命削减 (reduceLifePer)',
    value: 'reduceLifePer',
    category: ['instant'],
    desc: `无参数要求。
    立即扣除目标 50% 的当前生命值百分比。
    注意：若扣除后生命值低于 0，会将其设为极微小数值（1e-11）以确保目标不会因该效果直接死亡。`
  },
  {
    label: '清除敌对状态 (invincible)',
    value: 'invincible',
    category: ['instant', 'state'],
    desc: `可选或需求参数：duration。
    【即时】清除目标身上所有的敌方施加的状态。
    【状态】为目标添加 noUnderHurtB (免伤) 与 spellImmunityB (技能免疫) 状态。可配合 duration 设置持续时间。
    注意：该技能一般只使用 state 部分，instant 部分从未调用。`
  },
  {
    label: '上帝的护佑 (godHand)',
    value: 'godHand',
    category: ['instant', 'state'],
    desc: `可选或需求参数：value / duration。
    【即时】将本次受到的伤害强制归零；
    将目标的当前生命值强行设为 1 点；
    将目标设为 noUnderHurtB (免伤) 状态。
    【状态】为目标添加 noUnderHurtB (免伤) 状态，若 value 为 1，为目标添加 hidingB (隐身) 状态。可配合 duration 设置持续时间。
    常用于角色濒死时触发的被动，确保角色在必死的一击下强行存活。`
  },
  {
    label: '折射 (refraction)',
    value: 'refraction',
    category: ['instant'],
    desc: `可选或需求参数：range。
    吸收本次伤害并转化为以自身为中心的范围攻击。
    若原始伤害不包含百分比 (hurtMul 为 0)，则抵消目标本次受到的伤害 (伤害归零);
    基于原伤害值，结合目标等级对应的 DPS 系数重新计算折射伤害;
    折射出的伤害最高不超过目标最大生命值的 20%;
    在指定的 range 范围内对敌对阵营造成伤害。`
  },
  {
    label: '免伤状态 (noUnderHurtB)',
    value: 'noUnderHurtB',
    category: ['instant', 'state'],
    desc: `可选或需求参数：duration。
    【即时】将目标设为 noUnderHurtB (免伤) 状态。
    【状态】为目标添加 noUnderHurtB (免伤) 状态。可配合 duration 设置持续时间。
    通常单独添加 instant 或者 state。
    使用 state 可以满足大部分需求，一般不建议使用 instant 或 instantAndState 效果。`
  },
  {
    label: '生成血瓶 (lifeBottle_loveSkill)',
    value: 'lifeBottle_loveSkill',
    category: ['instant'],
    desc: `无参数要求。
    立即在目标位置生成一个回复量为 30% 的生命药瓶。
    该血瓶被设置为不可被队友拾取 (canHitMoreB = false)。`
  },
  {
    label: '生成弹药箱 (chargerDrop)',
    value: 'chargerDrop',
    category: ['instant'],
    desc: `无参数要求。
    立即在目标位置生成一个武器弹药箱。
    拾取后为所有武器增加 50% 的携弹量。`
  },
  {
    label: '分子虹吸 (element_loveSkill)',
    value: 'element_loveSkill',
    category: ['instant'],
    desc: `可选或需求参数：value / mul / extraValueType。
    仅当目标当前生命值百分比 > 70% 时生效;
    在修罗模式 (isDemonB)、虚天塔 (unendB) 或军队竞技场 (isUnionPKB) 中，伤害倍率减半 (0.5);
    对符合条件的单位触发一次倍率为 mul 的常规伤害 (normal_hurt)，伤害基准为 extraValue。`
  },
  {
    label: '分子虹吸-自身回血 (elementLifeBack_loveSkill)',
    value: 'elementLifeBack_loveSkill',
    category: ['instant'],
    desc: `可选或需求参数：mul / range。
    若释放者范围 range 内存在敌方单位，为其回复最大生命值 mul 比例的血量。`
  },
  {
    label: '敬请期待',
    value: 'under_development',
    category: ['instant', 'state'],
    desc: '更多效果函数待补充。'
  }
];

// 目标参照
export const TARGET_OPTIONS = [
  {
    label: '本体 (me)',
    value: 'me',
    desc: '技能释放者本身'
  },
  {
    label: '目标 (target)',
    value: 'target',
    desc: '技能释放的选中目标'
  },
  {
    label: '鼠标 (mouse)',
    value: 'mouse',
    desc: '玩家实际或 ai 模拟鼠标位置'
  },
  {
    label: '召唤者 (meSummonedFather)',
    value: 'meSummonedFather',
    desc: '召唤该单位的单位'
  }
];

// 选择模式
export const CHOOSE_TYPE_OPTIONS = [
  {
    label: '范围 (range)',
    value: 'range',
    desc: '与目标参照一定范围内'
  },
  {
    label: '附近 (near)',
    value: 'near',
    desc: '目标参照的最近单位'
  },
  {
    label: '随机 (random)',
    value: 'random',
    desc: '随机选取'
  }
];

// 单位类型
export const UNIT_TYPE_OPTIONS = [
  {
    label: '小怪 (normal)',
    value: 'normal'
  },
  {
    label: '精英 (super)',
    value: 'super'
  },
  {
    label: '首领 (boss)',
    value: 'boss'
  }
];

// 单位大类
export const SYSTEM_TYPE_OPTIONS = [
  {
    label: '近战 (normal)',
    value: 'normal'
  },
  {
    label: '持枪 (hero)',
    value: 'hero'
  }
];

// 种族
export const RACE_TYPE_OPTIONS = [
  {
    label: '人类 (human)',
    value: 'human'
  },
  {
    label: '僵尸 (zombie)',
    value: 'zombie'
  },
  {
    label: '机械体 (robot)',
    value: 'robot'
  },
  {
    label: '雪人 (snow)',
    value: 'snow'
  },
  {
    label: '飞船 (ship)',
    value: 'ship'
  },
  {
    label: '石头 (stone)',
    value: 'stone'
  }
];

// 模式限制
export const MODE_LIMIT_OPTIONS = [
  {
    label: '普通模式 (normal)',
    value: 'normal'
  },
  {
    label: '竞技场 (arena)',
    value: 'arena'
  },
  {
    label: '军队竞技场 (unionPK)',
    value: 'unionPK'
  },
  {
    label: '死亡模式 (death)',
    value: 'death'
  }
];

// 特殊判定
export const ALERT_OPTIONS = [
  {
    label: '附身 (possession_hero)',
    value: 'possession_hero',
    desc: '添加英雄技能附身判定'
  },
  {
    label: '附身友方 (wePossession)',
    value: 'wePossession',
    desc: '添加附身友方判定'
  }
];

// 额外条件列表
export const OTHER_CONDITION_OPTIONS = [
  // 目标判断
  {
    label: '目标持枪 (targetIsHero)',
    value: 'targetIsHero',
    desc: '目标是持枪单位。'
  },
  {
    label: '目标载具 (targetFitVehicle)',
    value: 'targetFitVehicle',
    desc: '目标是聚合载具。'
  },
  {
    label: '目标名称 (tergetName)',
    value: 'tergetName',
    desc: '目标的单位名称。\n需要配合 conditionString 输入单位名称，输入格式与 bodyName 相同。'
  },
  {
    label: '目标类型 (targetUnitType)',
    value: 'targetUnitType',
    desc: '目标的单位类型。\n需要配合 conditionString 输入单位类型，输入选项与 unitType 相同。'
  },
  {
    label: '精英目标 (targetBossOrSuper)',
    value: 'targetBossOrSuper',
    desc: '目标是精英怪或者首领。'
  },
  {
    label: '排除P1 (noMainPlayer)',
    value: 'noMainPlayer',
    desc: '目标不是P1。'
  },
  {
    label: '释放P1 (puMainPlayer)',
    value: 'puMainPlayer',
    desc: '释放者是P1。'
  },
  {
    label: '种族类型 (raceType)',
    value: 'raceType',
    desc: '目标的种族类型。\n需要配合 conditionString 输入单位类型，输入选项与 raceType 相同。'
  },
  {
    label: '排除召唤 (isTrueBody)',
    value: 'isTrueBody',
    desc: '目标不是召唤单位。'
  },
  {
    label: '过滤召唤 (noTrueBody)',
    value: 'noTrueBody',
    desc: '目标是召唤单位。'
  },
  {
    label: '排除战神 (noMadboss)',
    value: 'noMadboss',
    desc: '目标不是战神。'
  },

  {
    label: '允许抵御 (canFoggyDef)',
    value: 'canFoggyDef',
    desc: '自身可以释放抵御时。'
  },
  {
    label: '目标无敌 (targetIsInvincible)',
    value: 'targetIsInvincible',
    desc: '目标处于无敌状态。'
  },
  {
    label: '伤害目标无敌 (hurtUnderIsInvincible)',
    value: 'hurtUnderIsInvincible',
    desc: '伤害的目标处于无敌状态。'
  },
  {
    label: '排除释放者无敌 (producerNoInvincible)',
    value: 'producerNoInvincible',
    desc: '释放者不处于无敌状态。'
  },
  {
    label: '特殊参数数量 (skillSpecialNumLess)',
    value: 'skillSpecialNumLess',
    desc: '技能特殊参数少于一定数量。\n需要配合 conditionRange 输入数量阈值，输入为单个数值。'
  },
  {
    label: '拥有技能 (haveSkillOr)',
    value: 'haveSkillOr',
    desc: '拥有其中某个技能。\n需要配合 conditionString 输入技能组，输入以逗号为间隔的技能英文名称 (ID)。'
  },
  {
    label: '目标排除状态 (noState)',
    value: 'noState',
    desc: '目标没有某个状态。\n需要配合 conditionString 输入状态组，输入以逗号为间隔的状态英文名称 (ID)。'
  },
  {
    label: '目标拥有状态 (haveStateOr)',
    value: 'haveStateOr',
    desc: '目标有某个状态。\n需要配合 conditionString 输入状态组，输入以逗号为间隔的状态英文名称 (ID)。'
  },
  {
    label: '释放者拥有状态 (meHaveStateOr)',
    value: 'meHaveStateOr',
    desc: '释放者有某个状态。\n需要配合 conditionString 输入状态组，输入以逗号为间隔的状态英文名称 (ID)。'
  },
  {
    label: '释放者状态 (meHaveState)',
    value: 'meHaveState',
    desc: '释放者有状态。\n需要配合 conditionString 输入单个状态的状态英文名称 (ID)。'
  },
  {
    label: '释放者下蹲 (floorState)',
    value: 'floorState',
    desc: '释放者处于下蹲状态。\n需要配合 conditionString 输入下蹲状态 (squat)。'
  },
  {
    label: '目标下蹲 (targetFloorState)',
    value: 'targetFloorState',
    desc: '目标处于下蹲状态。\n需要配合 conditionString 输入下蹲状态 (squat)。'
  },
  {
    label: '目标站立 (isStand)',
    value: 'isStand',
    desc: '目标处于站立状态。'
  },
  {
    label: '飞行单位 (isFlyB)',
    value: 'isFlyB',
    desc: '目标是飞行单位。'
  },
  {
    label: '目标飞行状态 (isFlyState)',
    value: 'isFlyState',
    desc: '目标当前处于飞行状态。'
  },
  {
    label: '目标空中 (isAirB)',
    value: 'isAirB',
    desc: '目标处于空中。'
  },
  {
    label: '目标地面 (isGroundB)',
    value: 'isGroundB',
    desc: '目标处于地面。'
  },

  // 动画
  {
    label: '释放者动画组 (nowImgLabel)',
    value: 'nowImgLabel',
    desc: '释放者当前的动画标签。\n需要配合 conditionString 输入动画标签组，输入以逗号为间隔的动画标签英文名称 (ID)。'
  },
  {
    label: '释放者动画 (producerImgLabel)',
    value: 'producerImgLabel',
    desc: '释放者当前的动画标签。\n需要配合 conditionString 输入单个动画标签的英文名称 (ID)。'
  },
  {
    label: '排除释放者动画 (targetNoImgLabel)',
    value: 'targetNoImgLabel',
    desc: '释放者当前动画不属于下列标签。\n需要配合 conditionString 输入动画标签组，输入以逗号为间隔的动画标签英文名称 (ID)。'
  },
  {
    label: '释放者站立奔跑 (standOrRun)',
    value: 'standOrRun',
    desc: '释放者当前处于站立或奔跑状态。\n判定当前动画是否属于 stand / run / move / normalAttack。'
  },
  {
    label: '排除释放者攻击 (noAttackImg)',
    value: 'noAttackImg',
    desc: '释放者当前不处于攻击动作。'
  },

  // 敌我关系
  {
    label: '附近敌方 (nearEnemy)',
    value: 'nearEnemy',
    desc: '附近多少码内有敌人。\n需要配合 conditionRange 输入范围阈值，输入为单个数值。'
  },
  {
    label: '释放者跟踪 (followingTarget)',
    value: 'followingTarget',
    desc: '释放者处于跟踪状态。'
  },
  {
    label: '距离大于 (awayTarget)',
    value: 'awayTarget',
    desc: '距离目标远于一定范围。\n需要配合 conditionRange 输入距离阈值，输入为单个数值。'
  },
  {
    label: '距离小于 (gapLess)',
    value: 'gapLess',
    desc: '距离目标近于一定范围。\n需要配合 conditionRange 输入距离阈值，输入为单个数值。'
  },
  {
    label: '距离索敌 (nearAttackTarget)',
    value: 'nearAttackTarget',
    desc: '距离目标近于一定范围且完成索敌。\n需要配合 conditionRange 输入距离阈值，输入为单个数值。\n注意该范围会受 0.9~1.1 的随机系数影响，刷新游戏重置该随机数。'
  },
  {
    label: '索敌类型 (attackTargetUnitType)',
    value: 'attackTargetUnitType',
    desc: '索敌的单位类型。\n需要配合 conditionString 输入单位类型，输入选项与 unitType 相同。'
  },
  {
    label: '索敌y轴大于 (upAttackTargetByRange)',
    value: 'upAttackTargetByRange',
    desc: '索敌目标y轴距离远于一定范围。\n需要配合 conditionRange 输入距离阈值，输入为单个数值。'
  },

  {
    label: '队友血量小于 (weLifePerLess)',
    value: 'weLifePerLess',
    desc: '范围内存在任意队友血量少于一定范围。\n需要配合 range 输入距离范围，conditionRange 输入血量阈值，输入均为单个数值。\n注意 conditionRange 会受 0.8~1.2 的随机系数影响，刷新游戏重置该随机数。'
  },
  {
    label: '(樱) 队友血量小于 (invisibility_hero)',
    value: 'invisibility_hero',
    desc: '范围内存在任意队友血量少于一定范围 (小樱专用)。\n需要配合 conditionRange 输入距离范围，血量阈值为 0.4。\n注意 0.4 会受 0.8~1.2 的随机系数影响，即实际为 0.32~0.48，刷新游戏重置该随机数。'
  },
  {
    label: '自身血量小于 (lifePerLess)',
    value: 'lifePerLess',
    desc: '自身血量少于一定范围。\n需要配合 conditionRange 输入血量阈值，输入为单个数值。\n注意 conditionRange 会受 0.9~1.1 的随机系数影响，刷新游戏重置该随机数。'
  },
  {
    label: '自身血量大于 (lifePerMore)',
    value: 'lifePerMore',
    desc: '自身血量高于一定范围。\n需要配合 conditionRange 输入血量阈值，输入为单个数值。\n注意 conditionRange 会受 0.9~1.1 的随机系数影响，刷新游戏重置该随机数。'
  },
  {
    label: '目标血量小于 (targetLifePerLess)',
    value: 'targetLifePerLess',
    desc: '目标血量少于一定数值。\n需要配合 conditionRange 输入血量阈值，输入为单个数值。'
  },
  {
    label: '目标血量大于 (targetLifePerMore)',
    value: 'targetLifePerMore',
    desc: '目标血量高于一定数值。\n需要配合 conditionRange 输入血量阈值，输入为单个数值。'
  },
  {
    label: '目标血量范围 (targetLifePerRange)',
    value: 'targetLifePerRange',
    desc: '目标血量处于一定范围。\n需要配合 conditionString 输入血量阈值，输入为逗号间隔的两个数值，例如 "0.4,0.6"。'
  },
  {
    label: '(隐) 距离目标 (hiding_hero)',
    value: 'hiding_hero',
    desc: `距离目标 (隐身专用)。\n需要配合 conditionRange 输入距离范围，血量阈值为 0.5。
    注意 0.5 会受 0.8~1.2 的随机系数影响，即实际为 0.4~0.6；conditionRange 会受 0.9~1.1 的随机系数影响。刷新游戏重置上述随机数。
    若释放者攻击 ai 处于 eacapeAndHidingB 并且血量小于血量阈值，视为满足条件；
    否则，仅当释放者与目标距离小于 conditionRange 时，视为满足条件。`
  },
  {
    label: '排除当前 buff (producerNoNowBuff)',
    value: 'producerNoNowBuff',
    desc: '释放者没有当前技能 buff。'
  },
  {
    label: '魅惑判定 (charm_hero)',
    value: 'charm_hero',
    desc: '索敌血量大于 50% 且距离 800 码。'
  },
  {
    label: '伤害低于 (hurtLessLifePer)',
    value: 'hurtLessLifePer',
    desc: '受到的伤害低于最大生命值的一定比例。\n需要配合 conditionRange 输入最大生命值百分比阈值，输入为单个数值。'
  },
  {
    label: '敬请期待 (under_development)',
    value: 'under_development',
    desc: '仍有部分条件较为零散、整理不易，敬请期待未来更新补全。'
  },
]