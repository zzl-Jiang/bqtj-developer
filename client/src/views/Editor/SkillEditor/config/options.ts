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
  },
  {
    label: '当前生命比例 (lifePer)',
    value: 'lifePer',
    desc: '当前生命值百分比 (0-1)。'
  },
  {
    label: '丢失生命比例 (lostLifePer)',
    value: 'lostLifePer',
    desc: '已损失的生命值百分比 (0-1)。'
  },
  {
    label: '攻击力加成 (attackMul)',
    value: 'attackMul',
    desc: '单位当前攻击力加成倍率。'
  },
  {
    label: '暴击率 (critPro)',
    value: 'critPro',
    desc: '单位当前暴击概率。'
  },
  {
    label: '暴击伤害倍率 (critMul)',
    value: 'critMul',
    desc: '单位当前暴击伤害倍率。'
  },
  {
    label: '最大怒气 (maxAnger)',
    value: 'maxAnger',
    desc: '单位当前最大怒气值。'
  },
  {
    label: '武器伤害倍率 (armsDpsMul)',
    value: 'armsDpsMul',
    desc: '单位当前武器造成的伤害加成倍率。'
  },
  {
    label: '冷却加速倍率 (cdMul)',
    value: 'cdMul',
    desc: '单位当前技能冷却回复速度倍率。'
  },
  {
    label: '移动速度 (moveSpeed)',
    value: 'moveSpeed',
    desc: '单位当前基础移动速度数值。'
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
  },
  {
    label: '自身 (me)',
    value: 'me',
    desc: '选择实际目标仅为自身'
  },
  {
    label: '中立 (neutral)',
    value: 'neutral',
    desc: '选择实际目标为中立阵营'
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
    {
      label: '单位射击 (heroShoot)',
      value: 'heroShoot',
      desc: '当持枪单位每次射击时触发'
    },
    {
      label: '受到技能时 (underEnemySkill)',
      value: 'underEnemySkill',
      desc: '被敌方技能指向或影响时触发'
    },
    {
      label: '受到特定技能 (underSkill)',
      value: 'underSkill',
      desc: '被特定 ID 的技能击中时触发 (需配合 conditionString)'
    },
    {
      label: '生命值低于 (lifeLessThan)',
      value: 'lifeLessThan',
      desc: '生命值百分比低于设定值时触发'
    },
    {
      label: '生命值高于 (lifeMoreThan)',
      value: 'lifeMoreThan',
      desc: '生命值百分比高于设定值时触发'
    },
    {
      label: '拾取物品 (drop)',
      value: 'drop',
      desc: '拾取掉落物、补给箱时触发'
    },
    {
      label: '跳跃落地 (land)',
      value: 'land',
      desc: '从空中落回地面时触发'
    },
    {
      label: '关卡结算 (victory)',
      value: 'victory',
      desc: '关卡胜利结束时触发'
    },
    {
      label: '切换至当前武器 (nowArmsSelected)',
      value: 'nowArmsSelected',
      desc: '选定并切换至当前技能关联的武器时触发'
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
    若一秒内多次触发该技能（如多段攻击），后续伤害会因额度不足被削减直至降为 0; 
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
    target: "now" 表示仅针对当前手持武器，"all" 表示针对所有装备武器; 
    addType: 补充模式（通常为 "add" 累加）。
    如果玩家处于变身或附身状态，会自动将弹药补充到正确的本体或目标身上。
    若 value > 0，按固定数值补充; 若 mul > 0，按最大弹药量的百分比补充。
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
    1. 根据 mul 比例减少目标的后备弹药 (携弹量); 
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
    2. 在非反客模式中，对 BOSS (首领单位) 触发时，目标最多损失当前生命的 10%; 对其他单位触发时，最多损失 40%。
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
    【即时】将本次受到的伤害强制归零; 
    将目标的当前生命值强行设为 1 点; 
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
    label: '摩卡护体 (escapeInvincible)',
    value: 'escapeInvincible',
    category: ['instant', 'state'],
    desc: `可选或需求参数：duration。
    这是一个复合型保命技能。
    【即时】1. 调用 screaming_hero (惊吓，使目标强制索敌释放者); 2. 调用 godHand (上帝的护佑，生命设为1且无敌)。
    【状态】1. 调用 screaming (惊吓状态，沉默、丢失目标、必须逃跑、控制混乱); 2.调用 invincible (技能免疫、无敌状态);
    3. 调用 hidingB (隐身状态); 4. 持续恢复生命 1 / duration * 30。该效果每帧生效，表现为持续时间内缓慢回满血。可配合 duration 设置持续时间。
    通常用于死前判定，实现类似阶段性复生的效果。`
  },
  {
    label: '血盾 (bloodShield)',
    value: 'bloodShield',
    category: ['instant', 'state'],
    desc: `可选或需求参数：mul / secMul / duration。
    【即时】1. 增加技能熟练度; 2. 触发器次数 + 1; 3. 若 secMul > 0，为目标回复 secMul 比例的生命值。
    【状态】若触发器次数 > 0，提升防御力 触发器次数 * mul (最大 200%)，等效于伤害减免为 (1 / 1 + 防御力提升，最大 1 / 3)。
    建议配合 duration 设为 99999 或以上实现持续状态，因其计时器不会随着状态消失清空。`
  },
  {
    label: '技能免疫 (spellImmunityB)',
    value: 'spellImmunityB',
    category: ['instant', 'state'],
    desc: `无参数要求。
    【即时】为目标添加技能免疫效果。
    【状态】为目标添加技能免疫状态，可配合 duration 设置持续时间。
    通常直接调用 state 或者联合调用居多。`
  },
  {
    label: '动态添加技能 (addSkill)',
    value: 'addSkill',
    category: ['instant'],
    desc: `可选或需求参数：valueString / value / duration。
    立即为目标赋予一个 ID 为 valueString 的技能。
    没有实际调用，但是经过测试确实可以生效。`
  },
  {
    label: '饿狼无双 (ctrlSkillCdLessThan)',
    value: 'ctrlSkillCdLessThan',
    category: ['instant', 'state'],
    desc: `可选或需求参数：valueString / value / duration。
    【即时】使基础标签为 valueString 的技能在 UI 上执行闪烁特效，用以提示效果触发。
    【状态】在持续时间 duration 内，将基础标签为 valueString 的技能冷却设置为 value。
    通常直接用混合或者状态，instant 只有一个视觉提示的效果。`
  },
  {
    label: '概率免疫 (immune)',
    value: 'immune',
    category: ['instant'],
    desc: `可选或需求参数：mul。
    将目标的技能闪避概率 (skillDodgePro) 设置为 mul (0-1)。
    在实际调用中，通常将 mul 置 1，通过 effectProArr 控制生效概率;
    然而在简单测试中两者并无差别，效果相同，不确定是否在复杂情境下会有所区分。
    如果目的为深度还原游戏的免疫机制，建议参照原版调用，使用 effectProArr 控制生效概率。`
  },
  {
    label: '技能反弹 (skillBack)',
    value: 'skillBack',
    category: ['instant'],
    desc: `无参数要求。
    若自身受到技能影响，且该技能不是魅惑类技能：
    1. 自身获得 100% 技能闪避;
    2. 将受到的技能效果反弹施加给释放者。`
  },
  {
    label: '沉默并清除增益 (silenceBAndClearState)',
    value: 'silenceBAndClearState',
    category: ['instant', 'state'],
    desc: `可选或需求参数：value / duration。
    【即时】强制移除目标身上的特定状态：狂暴 (crazy)、穿透 (crazyAndPenetrationGap)、隐身 (hidingB)、巨毒尸-隐身 (hidingB_hugePosion)、
    无敌 (noUnderHurtB)、反伤 (reverseHurt)、伤害加成 (armsDpsMul);
    【状态】将目标的沉默 (silenceB) 状态设为 value (0 - false / 1 - true)，期间无法使用主动技能，可配合 duration 设置持续时间。`
  },
  {
    label: '寒冰封印 (iceConeSkill)',
    value: 'iceConeSkill',
    category: ['instant', 'state'],
    desc: `可选或需求参数：duration。
    【即时】使目标停止所有动作、失去控制权限 (lostCtrlB)，并标记当天生肖效果已使用。
    【状态】使目标失去控制权限 (lostCtrlB)，可配合 duration 设置持续时间。`
  },
  {
    label: '沉默封锁 (yearMouseSkill)',
    value: 'yearMouseSkill',
    category: ['instant', 'state'],
    desc: `可选或需求参数：duration。
    【即时】使目标沉默并清除增益 (silenceBAndClearState)，并标记当天生肖效果已使用。
    【状态】使目标沉默 (silenceAllB) 、被动技能失效 (noPassiveSkillB)，可配合 duration 设置持续时间。`
  },
  {
    label: '慢性中毒 (yearCattleSkill)',
    value: 'yearCattleSkill',
    category: ['instant'],
    desc: `可选或需求参数：mul / doGap / duration。
    对目标造成 (1 点数值伤害 + mul 百分比伤害) 的混合毒属性 (CHILD_POISON) 普通伤害，并标记当天生肖效果已使用。
    因生肖效果的使用设置，推荐添加 doGap 在 state 类型下使用，可配合 duration 设置持续时间。`
  },
  {
    label: '封锁 (noAllSkill)',
    value: 'noAllSkill',
    category: ['instant', 'state'],
    desc: `可选或需求参数：duration。
    【即时】立即强制移除目标身上所有的我方施加的状态 (clearAllWeState)。
    【状态】使目标沉默 (silenceAllB) 、被动技能失效 (noPassiveSkillB)，可配合 duration 设置持续时间。`
  },
  {
    label: '条件性状态清除 (noAllSkillPanMeltFlamerPurgold)',
    value: 'noAllSkillPanMeltFlamerPurgold',
    category: ['instant', 'state'],
    desc: `可选或需求参数：duration。
    【即时】若目标具有 [免疫封锁] (targetArmsNoMeltFlamerPurgold) 状态，执行 noAllSkill (封锁)。
    【状态】若目标具有 [免疫封锁] (targetArmsNoMeltFlamerPurgold) 状态，使目标沉默 (silenceAllB) 、被动技能失效 (noPassiveSkillB)，可配合 duration 设置持续时间。
    通常用于那些具有封锁效果但与封锁不同，effectType 空缺，期望被化锁类技能免疫的技能中。简而言之，参见 防毒僵尸 - 当头扳击。
    [免疫封锁] 状态：1. 携带武器或本身具有化锁技能 (meltFlamerPurgold); 2. 具有车卷风技能 (redMoto3Skill); 3. 造成伤害的武器是闪电极源，且目标是携带先锋盾的小白时：
    以上条件满足任意一条时，本技能效果不生效。`
  },
  {
    label: '尖叫/恐惧 (screaming_hero)',
    value: 'screaming_hero',
    category: ['instant', 'state'],
    desc: `可选或需求参数：mul / duration。
    【即时】除非目标拥有无视恐惧 (out_noFearB) 属性，否则强制其停止当前攻击，转而将仇恨锁定在技能释放者身上。
    【状态】1. 调用 screaming (惊吓状态，沉默、丢失目标、必须逃跑、控制混乱); 2. 调用 addSpeedState (使目标速度加成为 mul)。可配合 duration 设置时间，若位于军队竞技场中，持续时间减半。`
  },
  {
    label: '爆竹惊吓 (squibDevice_screaming)',
    value: 'squibDevice_screaming',
    category: ['instant', 'state'],
    desc: `可选或需求参数：mul / duration。
    【即时】强制目标停止当前攻击，转而将仇恨锁定在技能释放者身上。
    【状态】1. 调用 screaming (惊吓状态，沉默、丢失目标、必须逃跑、控制混乱); 2. 调用 addSpeedState (使目标速度加成为 1.5); 
    3. 使目标受到伤害加成 (1 / mul)。可配合 duration 设置时间。
    爆竹用的专属技能。`
  },
  {
    label: '技能复制 (skillCopy)',
    value: 'skillCopy',
    category: ['instant'],
    desc: `无参数要求。
    从目标拥有的技能列表中随机选择一个释放者尚未拥有的技能，并临时赋予释放者。`
  },
  {
    label: '末次技能刷新 (fleshLastSkill)',
    value: 'fleshLastSkill',
    category: ['instant'],
    desc: `可选或需求参数：mul。
    若目标最后一次使用的技能冷却进度低于 60%，则按 mul 比例缩减其剩余冷却时间。`
  },
  {
    label: '馈赠 (skillFullCd)',
    value: 'skillFullCd',
    category: ['instant'],
    desc: `可选或需求参数：value。
    强制重置目标当前受影响技能的 CD。value 参数决定重置后的技能冷却秒数。`
  },
  {
    label: '持枪馈赠 (heroSkillFullCd)',
    value: 'heroSkillFullCd',
    category: ['instant'],
    desc: `可选或需求参数：value。
    如果当前模式为修罗模式，触发概率减半。出发时调用馈赠 (skillFullCd)，强制重置目标当前受影响技能的 CD。value 参数决定重置后的技能冷却秒数。`
  },
  {
    label: '全量状态清理-敌对 (clearEnemyState)',
    value: 'clearEnemyState',
    category: ['instant'],
    desc: `无参数要求。
    立即移除目标身上所有由敌方阵营施加的状态。`
  },
  {
    label: '全量状态清理-友方 (clearWeState)',
    value: 'clearWeState',
    category: ['instant'],
    desc: `无参数要求。
    立即移除目标身上所有由我方阵营施加的状态（暂无实际调用）。`
  },
  {
    label: '枷锁 (noPassiveSkill)',
    value: 'noPassiveSkill',
    category: ['instant', 'state'],
    desc: `可选或需求参数：duration。
    【即时】立即移除目标身上所有由我方阵营施加的状态。
    【状态】使目标的被动技能不生效 (noPassiveSkillB)，可配合 duration 设置持续时间。`
  },
  {
    label: '狼图腾 (clearEnemyState_FightWolf)',
    value: 'clearEnemyState_FightWolf',
    category: ['instant'],
    desc: `可选或需求参数：mul。
    移除目标身上所有的负面状态，每移除一个，基于 mul 比例回复其最大生命值（最高回复 10%）。`
  },
  {
    label: '狼图腾-尸宠 (clearEnemyState_PetFightWolf)',
    value: 'clearEnemyState_PetFightWolf',
    category: ['instant'],
    desc: `可选或需求参数：mul。
    移除目标身上的负面状态。每移除一个，不仅为目标回复 mul 比例生命，还会为目标的拥有者 (P1) 回复一半的数值。最高回复 30%。`
  },
  {
    label: '按标签清除状态 (clearStateByBaseLabelArr)',
    value: 'clearStateByBaseLabelArr',
    category: ['instant'],
    desc: `可选或需求参数：valueString / pointEffectImg。
    传入以逗号分隔的 baseLabel 字符串。若成功移除状态，将在击中点播放 pointEffectImg 特效。
    其中 pointEffectImg 为可选参数，注意 valueString 需要以逗号分隔。`
  },
  {
    label: '按效果类型清除 (clearEnemyStateByEffectTypeArr)',
    value: 'clearEnemyStateByEffectTypeArr',
    category: ['instant'],
    desc: `可选或需求参数：valueString。
    传入逗号分隔的 effectType 字符串（如 "dizziness"），强制移除目标身上对应的所有敌对状态。`
  },
  {
    label: '按名称包含清除 (clearStateByNameContain)',
    value: 'clearStateByNameContain',
    category: ['instant'],
    desc: `可选或需求参数：valueString。
    传入部分状态名称字符串（如 "feedback_"），强制移除目标身上所有名称包含该字符串的状态。`
  },
  {
    label: '按名称包含清除 (clearStateByNameContainPointEffect)',
    value: 'clearStateByNameContainPointEffect',
    category: ['instant'],
    desc: `可选或需求参数：valueString / pointEffectImg。
    传入部分状态名称字符串（如 "feedback_"），强制移除目标身上所有名称包含该字符串的状态。若成功移除状态，将在击中点播放 pointEffectImg 特效。
    其中 pointEffectImg 为可选参数。`
  },
  {
    label: '时长倍率缩放 (setEnemyStateTMul)',
    value: 'setEnemyStateTMul',
    category: ['instant'],
    desc: `可选或需求参数：mul / pointEffectImg。
    将目标身上所有敌方施加的状态剩余时间乘以 mul 倍率。
    例如 mul 设为 0.5，则所有负面状态持续时间减半。执行时播放 pointEffectImg 特效。`
  },
  {
    label: '快进 (fastForward)',
    value: 'fastForward',
    category: ['instant'],
    desc: `无参数要求。
    使单位立即沿着其 AI 当前规划的路径向前跳跃一个节点。若单位由玩家控制，则直接传送到鼠标位置。`
  },
  {
    label: '传送 (teleport)',
    value: 'teleport',
    category: ['instant'],
    desc: `可选或需求参数：valueString / value / range。
    根据 valueString 定位：
    1. "mousePoint": 传送到鼠标坐标; 
    2. "attackTarget": 传送到当前攻击目标的背后; 
    3. "master": 传送到归属者的坐标; 
    4. "mapRanPoint": 地图内随机点; 
    5. "farHeroRan": 距离目标 value 像素以外的随机点; 
    6. "farTargetMust": 距离目标 value ~ range 像素之间的随机点，如果没找到则选取随机大于 value 的点，若还是没找到则选取地图随机点  。
    注意：若目标身上带有 "cantMove" 状态，此函数将失效。`
  },
  {
    label: '传送至目标 (teleportToAttackBody)',
    value: 'teleportToAttackBody',
    category: ['instant'],
    desc: `可选或需求参数：valueString (坐标偏移) / mul (是否翻转)。
    传送到目标坐标并立即面向目标。valueString 填 "x,y" 偏移量。`
  },
  {
    label: '眩晕 (dizziness)',
    value: 'dizziness',
    category: ['instant', 'state'],
    desc: `可选或需求参数：duration。
    【即时】使目标立即进入 lostCtrlB (失去控制) 状态并停止所有 AI 行为。
    【状态】使目标进入 lostCtrlB (失去控制) 状态，除非目标拥有 noDizzinessB (眩晕免疫)，否则无法通过移动或攻击指令打破。
    可配合 duration 设置持续时间。`
  },
  {
    label: '龙卷 (yearMonkeySkill)',
    value: 'yearMonkeySkill',
    category: ['instant', 'state'],
    desc: `可选或需求参数：duration。
    【即时】使目标立即进入 lostCtrlB (失去控制) 状态并停止所有 AI 行为。
    【状态】使目标进入 lostCtrlB (失去控制) 状态。在该状态下，目标将被强行吸附在子弹上并随之同步移动。
    除非子弹销毁或目标拥有 noDizzinessB (眩晕免疫)，否则无法通过任何移动或攻击指令打破此位移效果。
    可配合 duration 设置持续时间。`
  },
  {
    label: '稀有元素-黄 (elementsYellow)',
    value: 'elementsYellow',
    category: ['instant', 'state'],
    desc: `可选或需求参数：duration。打断墟洞岩火。
    【即时】调用 dizziness (眩晕) 的即时效果。同时强行击杀场上所有名为 FireWolf 的普通单位 ( boss 分身)。
    【状态】调用 dizziness (眩晕) 的状态效果。
    可配合 duration 设置持续时间。`
  },
  {
    label: '强制僵直 (toRos)',
    value: 'toRos',
    category: ['instant', 'state'],
    desc: `无参数要求。
    强制让目标进入僵直动作。`
  },
  {
    label: '复仇-技能挂载 (revengeLingAddSkill)',
    value: 'revengeLingAddSkill',
    category: ['instant'],
    desc: `可选或需求参数：valueString / mul。
    为目标添加由 valueString 指定的子技能 (通常链接到 revengeLing_link)。
    该函数会将当前技能定义的 mul (伤害比例) 传递并记录在子技能中。通常配合 interval 使用，用于将该能力赋予范围内的所有我方单位。`
  },
  {
    label: '复仇-比例伤害 (revengeLingHurt)',
    value: 'revengeLingHurt',
    category: ['instant'],
    desc: `可选或需求参数：secMul / (由父级传递的 mul)。
    复仇机制的伤害执行逻辑，具备以下特性：
    1. 若殒命的单位为队友单位，则扣除目标 mul 比例生命值；若为普通单位，则固定扣除 3%。
    2. 对同一个目标造成的累计伤害总额不能超过 secMul (如 0.45 则代表最多扣除目标 45% 的生命)。
    3. 该伤害无视闪避与免疫，执行时会弹出红色的百分比伤害文本。通常由子技能在单位死亡 (die) 时触发。`
  },
  {
    label: '元素加成 (hurtStrikerLing)',
    value: 'hurtStrikerLing',
    category: ['instant'],
    desc: `可选或需求参数：mul / valueString (推荐使用)。
    根据现实日期的星期数自动切换属性。若目标当前的外壳类型 (shell) 匹配今日选定的属性，则本次伤害乘以 mul。
    属性逻辑：周一普通 (生化敏感)，周二五复合 (火焰敏感)，周三六变异 (冷冻敏感)，周四日金属 (电磁敏感)。
    推荐使用 <valueString>Striker</valueString> 使加成生效于 P1。`
  },
  {
    label: '反弹伤害 (backHurt)',
    value: 'backHurt',
    category: ['instant'],
    desc: `需求参数：mul / extraValueType。
    将受到的伤害按 mul 比例反弹给生产者。
    单次反弹最高不超过目标最大生命的 20%，Boss 单位则限制在 2%。
    拥有 noUnderBackB 状态的单位不受影响，该效果会受 feedBack (电离折射) 类技能削减。`
  },
  {
    label: '暴击 (crit)',
    value: 'crit',
    category: ['instant'],
    desc: `可选或需求参数：extraValueType / value / mul。
    有 value (0-1) 的概率触发一次暴击 (CHILD_CRIT) 类型的倍率伤害。
    可通过 extraValueType / mul 设置伤害。`
  },
  {
    label: '中毒 (poison)',
    value: 'poison',
    category: ['instant'],
    desc: `可选或需求参数：extraValueType / mul / doGap / duration。
    触发一次毒属性 (CHILD_POISON) 普通伤害。
    可通过 extraValueType / mul 设置伤害。
    可添加 doGap 在 state 类型下使用，可配合 duration 设置持续时间;
    也可单独在 instant 类型下作为即时效果应用。`
  },
  {
    label: '七步毒 (poison7)',
    value: 'poison7',
    category: ['instant'],
    desc: `可选或需求参数：extraValueType / mul / doGap / duration。
    若目标当前水平速度不为0，造成一次毒属性 (CHILD_POISON) 普通伤害。
    可通过 extraValueType / mul 设置伤害。
    推荐添加 doGap 在 state 类型下使用，可配合 duration 设置持续时间。`
  },
  {
    label: '小炎戒 (poison_xiaoAi)',
    value: 'poison_xiaoAi',
    category: ['instant'],
    desc: `可选或需求参数：extraValueType / mul / doGap / duration。
    触发一次毒属性 (CHILD_POISON) 普通伤害。
    可通过 extraValueType / mul 设置伤害。
    修罗/虚天塔模式下倍率为设置的 0.1，困难模式下倍率为设置的 0.2。
    推荐添加 doGap 在 state 类型下使用，可配合 duration 设置持续时间。`
  },
  {
    label: '核爆 (nuclear_peak)',
    value: 'nuclear_peak',
    category: ['instant'],
    desc: `需求参数：mul。
    1. 普通小怪：若等级低于释放者，直接斩杀; 若高于释放者，造成 25% 最大生命值伤害。
    2. 精英怪：造成 25% 最大生命值伤害。
    3. Boss：若 Boss 血量 > 30%，则扣除 mul 比例的生命值。
    在修罗/虚天塔模式下，若伤害倍率为 100%，设置为 30%; 否则倍率设为原本的 40%。
    困难模式下，倍率设为原本的 40%。
    触发时附带全屏剧烈震动。`
  },
  {
    label: '普通伤害 (normal_hurt)',
    value: 'normal_hurt',
    category: ['instant', 'state'],
    desc: `可选或需求参数：fromChild0 / hurt0 / hurtMul0 / mul0 / from0 / fromObj0 / lockB0。
    造成一次普通伤害，可通过参数指定伤害类型、数值和倍率。
    支持指定伤害来源和锁定目标。`
  },
  {
    label: '子弹生成 (bullet)',
    value: 'bullet',
    category: ['instant', 'state'],
    desc: `可选或需求参数：hurtMul0 / pointEFB。
    生成子弹攻击目标，可通过 hurtMul0 调整伤害倍率。
    若 pointEFB 为 true，在击中点播放特效。`
  },
  {
    label: '改变伤害_无条件 (changeHurtNoCondition)',
    value: 'changeHurtNoCondition',
    category: ['instant'],
    desc: `可选或需求参数：mul。
    无条件改变本次伤害，将伤害乘以 mul 倍率。`
  },
  {
    label: '溅射攻击 (spurting)',
    value: 'spurting',
    category: ['instant'],
    desc: `触发溅射伤害效果，造成范围伤害。`
  },
  {
    label: '全局溅射_敌对 (globalSpurting_enemy)',
    value: 'globalSpurting_enemy',
    category: ['instant'],
    desc: `对敌对目标造成全局溅射伤害，无视部分免疫效果。`
  },
  {
    label: '附身 (possession)',
    value: 'possession',
    category: ['instant'],
    desc: `需求参数：valueString。
    使目标附身到指定单位身上，valueString 指定附身目标。`
  },
  {
    label: '克隆单位 (cloned)',
    value: 'cloned',
    category: ['instant'],
    desc: `可选或需求参数：cfB0。
    克隆目标单位，cfB0 控制是否复制外观。`
  },
  {
    label: '召唤单位 (summonedUnits)',
    value: 'summonedUnits',
    category: ['instant', 'state'],
    desc: `召唤单位协助战斗，可指定召唤目标。`
  },
  {
    label: '召唤单位并计数 (summonedUnitsAndCount)',
    value: 'summonedUnitsAndCount',
    category: ['instant'],
    desc: `召唤单位并记录召唤数量，用于追踪召唤物。`
  },
  {
    label: '召唤骑士 (summonedKnights)',
    value: 'summonedKnights',
    category: ['instant'],
    desc: `召唤骑士单位，特殊召唤逻辑。`
  },
  {
    label: '召唤单位狐狸 (summonedUnitsFox)',
    value: 'summonedUnitsFox',
    category: ['instant', 'state'],
    desc: `召唤狐狸单位协助战斗。`
  },
  {
    label: '闪电攻击 (lightning)',
    value: 'lightning',
    category: ['instant'],
    desc: `需求参数：partName0。
    对目标部位释放闪电攻击。`
  },
  {
    label: '击杀 (kill)',
    value: 'kill',
    category: ['instant'],
    desc: `直接击杀目标单位。`
  },
  {
    label: '击杀所有召唤物 (killAllSummon)',
    value: 'killAllSummon',
    category: ['instant'],
    desc: `击杀目标的所有召唤单位。`
  },
  {
    label: '击杀所有非载具单位 (killAllExcludeVehicle)',
    value: 'killAllExcludeVehicle',
    category: ['instant'],
    desc: `击杀所有非载具单位，保留载具。`
  },
  {
    label: '橡皮擦武器 (eraserArms)',
    value: 'eraserArms',
    category: ['instant'],
    desc: `擦除鼠标范围内的子弹，用于清除敌方子弹。`
  },
  {
    label: '自爆武器 (selfBoomArms)',
    value: 'selfBoomArms',
    category: ['instant'],
    desc: `使鼠标范围内的子弹自爆，对周围造成伤害。`
  },
  {
    label: '武器指向鼠标 (armsToMousePoint)',
    value: 'armsToMousePoint',
    category: ['instant'],
    desc: `将武器指向鼠标位置，改变射击方向。`
  },
  {
    label: '处女座技能 (consVirgoSkill)',
    value: 'consVirgoSkill',
    category: ['instant'],
    desc: `处女座星座技能，具有特殊伤害效果。`
  },
  {
    label: '猎鹰枪技能 (falconGunSkill)',
    value: 'falconGunSkill',
    category: ['instant'],
    desc: `猎鹰枪特殊技能，造成范围伤害。`
  },
  {
    label: '天空之弓技能 (skyArchSkill)',
    value: 'skyArchSkill',
    category: ['instant'],
    desc: `天空之弓特殊技能，具有穿透效果。`
  },
  {
    label: '子弹_赤火技能 (bullet_redFireSkill)',
    value: 'bullet_redFireSkill',
    category: ['instant'],
    desc: `赤火子弹技能，造成火焰伤害。`
  },
  {
    label: '子弹_螺旋球2 (bullet_screwBall2)',
    value: 'bullet_screwBall2',
    category: ['instant'],
    desc: `螺旋球子弹技能，具有弹射效果。`
  },
  {
    label: '免疫复仇女神 (immuneNemesis)',
    value: 'immuneNemesis',
    category: ['instant'],
    desc: `免疫复仇女神技能效果。`
  },
  {
    label: '压制 (overwhelmed)',
    value: 'overwhelmed',
    category: ['instant'],
    desc: `对目标造成压制效果，降低其战斗能力。`
  },
  {
    label: '移动速度 (moveSpeed)',
    value: 'moveSpeed',
    category: ['state'],
    desc: `可选或需求参数：mul / value。
    改变目标移动速度，mul 为速度倍率，value 为基础速度增加值。`
  },
  {
    label: '无敌并穿透 (invincibleAndThrough)',
    value: 'invincibleAndThrough',
    category: ['state'],
    desc: `使目标无敌且可以穿透单位。`
  },
  {
    label: '全无敌 (invincibleAll)',
    value: 'invincibleAll',
    category: ['state'],
    desc: `使目标完全无敌，免疫所有伤害和效果。`
  },
  {
    label: '受到伤害倍率 (underHurtMul)',
    value: 'underHurtMul',
    category: ['state'],
    desc: `改变目标受到伤害的倍率。`
  },
  {
    label: '伤害倍率并倍率 (hurtMulAndMul)',
    value: 'hurtMulAndMul',
    category: ['state'],
    desc: `同时改变伤害倍率和倍率乘数。`
  },
  {
    label: '大圣飞行 (greatSageFly)',
    value: 'greatSageFly',
    category: ['state'],
    desc: `齐天大圣飞行技能，可在空中飞行。`
  },
  {
    label: '超重神 (overweightGod)',
    value: 'overweightGod',
    category: ['state'],
    desc: `增加目标重量，降低被击退效果。`
  },
  {
    label: '滑行神 (trackslipGod)',
    value: 'trackslipGod',
    category: ['state'],
    desc: `使目标滑行，减少摩擦力。`
  },
  {
    label: '着陆 (toLand)',
    value: 'toLand',
    category: ['state'],
    desc: `强制目标着陆，退出飞行状态。`
  },
  {
    label: '金隼 (goldFalcon)',
    value: 'goldFalcon',
    category: ['state'],
    desc: `金隼技能效果，提升战斗能力。`
  },
  {
    label: '石海增益 (stoneSeaBuff)',
    value: 'stoneSeaBuff',
    category: ['state'],
    desc: `在石海地形中获得增益效果。`
  },
  {
    label: '攻击缩放 (attackScale)',
    value: 'attackScale',
    category: ['state'],
    desc: `改变目标攻击范围缩放比例。`
  },
  {
    label: '百倍反击 (hundredfoldBack)',
    value: 'hundredfoldBack',
    category: ['state'],
    desc: `受到攻击时进行百倍反击。`
  },
  {
    label: '犀牛牛逼 (rhinocerosNiubi)',
    value: 'rhinocerosNiubi',
    category: ['state'],
    desc: `犀牛专属技能，提升防御和攻击。`
  },
  {
    label: '鲸鱼牛逼 (whaleNiubi)',
    value: 'whaleNiubi',
    category: ['state'],
    desc: `鲸鱼专属技能，根据敌人数量提升伤害。`
  },
  {
    label: '阎罗钩锁 (hookDeviceYanluo)',
    value: 'hookDeviceYanluo',
    category: ['state'],
    desc: `阎罗钩锁技能，具有控制和伤害效果。`
  },
  {
    label: '骑射摩托 (rideShootMoto)',
    value: 'rideShootMoto',
    category: ['state'],
    desc: `骑乘摩托时射击技能。`
  },
  {
    label: '限制射程 (limitShootRange)',
    value: 'limitShootRange',
    category: ['state'],
    desc: `限制目标射击射程。`
  },
  {
    label: '倍率伤害转数值 (mulHurtToValue)',
    value: 'mulHurtToValue',
    category: ['state'],
    desc: `将倍率伤害转换为固定数值伤害。`
  },
  {
    label: '糯米饭 (glutinous)',
    value: 'glutinous',
    category: ['state'],
    desc: `糯米饭技能，增加怒气值。`
  },
  {
    label: '增加怒气 (addAnger)',
    value: 'addAnger',
    category: ['state'],
    desc: `增加目标怒气值。`
  },
  {
    label: '锁定目标为我 (lockTargetMe)',
    value: 'lockTargetMe',
    category: ['state'],
    desc: `使目标的攻击目标锁定为施法者。`
  },
  {
    label: '远射神 (longShootGod)',
    value: 'longShootGod',
    category: ['state'],
    desc: `远距离射击伤害加成。`
  },
  {
    label: '时间结束击杀我 (killMeTimeOver)',
    value: 'killMeTimeOver',
    category: ['state'],
    desc: `时间结束时自动击杀目标。`
  },
  {
    label: '全伤害倍率 (allHurtMul)',
    value: 'allHurtMul',
    category: ['state'],
    desc: `改变所有伤害的倍率。`
  },
  {
    label: '无雾防御 (noFoggyDefB)',
    value: 'noFoggyDefB',
    category: ['state'],
    desc: `在雾天中防御力不减。`
  },
  {
    label: '短寿残废受击 (shortLivedDisabledUnderHit)',
    value: 'shortLivedDisabledUnderHit',
    category: ['state'],
    desc: `受击时触发短寿残废效果。`
  },
  {
    label: '长子弹生命 (longBulletLife)',
    value: 'longBulletLife',
    category: ['state'],
    desc: `延长子弹存在时间。`
  },
  {
    label: '无紫金石武器 (noPurgoldArms)',
    value: 'noPurgoldArms',
    category: ['state'],
    desc: `禁止使用紫金石武器。`
  },
  {
    label: '无武器类型 (noArmsType)',
    value: 'noArmsType',
    category: ['state'],
    desc: `禁止使用特定类型武器。`
  },
  {
    label: '年兔技能 (yearRabbitSkill)',
    value: 'yearRabbitSkill',
    category: ['state'],
    desc: `生肖兔技能，根据难度改变伤害。`
  },
  {
    label: '死亡CD速度倍率 (dieCdSpeedMul)',
    value: 'dieCdSpeedMul',
    category: ['state'],
    desc: `改变死亡后复活CD的速度。`
  },
  {
    label: '无回复 (noReplyB)',
    value: 'noReplyB',
    category: ['state'],
    desc: `禁止目标回复生命值。`
  },
  {
    label: '不受全伤害 (noUnderAllB)',
    value: 'noUnderAllB',
    category: ['state'],
    desc: `目标不受任何伤害。`
  },
  {
    label: '无敌并无AI (invincibleAndNoAI)',
    value: 'invincibleAndNoAI',
    category: ['state'],
    desc: `无敌且AI停止运作。`
  },
  {
    label: '垂直护盾增益 (verShieldBuff)',
    value: 'verShieldBuff',
    category: ['state'],
    desc: `垂直护盾增益效果。`
  },
  {
    label: '僵尸盾护盾增益 (ZombieShieldShieldBuff)',
    value: 'ZombieShieldShieldBuff',
    category: ['state'],
    desc: `僵尸盾的护盾增益效果。`
  },
  {
    label: '子弹_闪电地板无目标 (bullet_lightningFloorOneNoFindTarget)',
    value: 'bullet_lightningFloorOneNoFindTarget',
    category: ['state'],
    desc: `在地板生成闪电，不寻找目标。`
  },
  {
    label: '子弹_闪电地板单一 (bullet_lightningFloorOne)',
    value: 'bullet_lightningFloorOne',
    category: ['state'],
    desc: `在地板生成单一闪电。`
  },
  {
    label: '子弹_闪电地板 (bullet_lightningFloor)',
    value: 'bullet_lightningFloor',
    category: ['state'],
    desc: `在地板生成闪电攻击。`
  },
  {
    label: '最大速度任务 (maxSpeedTask)',
    value: 'maxSpeedTask',
    category: ['state'],
    desc: `任务模式下的最大速度增益。`
  },
  {
    label: '设置子弹数量 (setBulletNum)',
    value: 'setBulletNum',
    category: ['state'],
    desc: `设置子弹发射数量。`
  },
  {
    label: '更多子弹 (moreBullet)',
    value: 'moreBullet',
    category: ['state'],
    desc: `增加子弹发射数量。`
  },
  {
    label: '动作移动 (actionToMove)',
    value: 'actionToMove',
    category: ['state'],
    desc: `根据动作进行移动。`
  },
  {
    label: '变身为僵尸_英雄 (changeToZombie_hero)',
    value: 'changeToZombie_hero',
    category: ['state'],
    desc: `英雄变身为僵尸形态。`
  },
  {
    label: '狂战士增益 (MadbossBuff)',
    value: 'MadbossBuff',
    category: ['state'],
    desc: `狂战士专属增益效果。`
  },
  {
    label: '狂战士受击增益 (MadbossUnderBuff)',
    value: 'MadbossUnderBuff',
    category: ['state'],
    desc: `狂战士受击时的增益效果。`
  },
  {
    label: '疯狂武器攻击 (madArmsAttack)',
    value: 'madArmsAttack',
    category: ['state'],
    desc: `疯狂状态下的武器攻击。`
  },
  {
    label: '疯狂火焰麻痹 (madfireParalysis)',
    value: 'madfireParalysis',
    category: ['state'],
    desc: `疯狂火焰造成的麻痹效果。`
  },
  {
    label: '磁铁子弹技能 (magnetBulletSkill)',
    value: 'magnetBulletSkill',
    category: ['state'],
    desc: `吸引敌方子弹的磁铁技能。`
  },
  {
    label: '铁狗拖把 (IronDogMop)',
    value: 'IronDogMop',
    category: ['state'],
    desc: `铁狗拖把攻击技能。`
  },
  {
    label: '子弹_铁狗五连 (bullet_IronDogFive)',
    value: 'bullet_IronDogFive',
    category: ['state'],
    desc: `铁狗五连发子弹攻击。`
  },
  {
    label: '铁狗匕首 (IronDogDagger)',
    value: 'IronDogDagger',
    category: ['state'],
    desc: `铁狗匕首攻击技能。`
  },
  {
    label: '子弹_铁狗冰 (bullet_IronDogIce)',
    value: 'bullet_IronDogIce',
    category: ['state'],
    desc: `铁狗冰冻子弹攻击。`
  },
  {
    label: '铁狗冰击 (IronDogIceHit)',
    value: 'IronDogIceHit',
    category: ['state'],
    desc: `铁狗冰冻攻击命中效果。`
  },
  {
    label: '弹跳墙缩放 (bwallScale)',
    value: 'bwallScale',
    category: ['state'],
    desc: `弹跳墙的缩放效果。`
  },
  {
    label: '身体缩放 (bodyScale)',
    value: 'bodyScale',
    category: ['state'],
    desc: `改变目标身体缩放比例。`
  },
  {
    label: '外太空删除增益 (outSpaceDelBuff)',
    value: 'outSpaceDelBuff',
    category: ['state'],
    desc: `在外太空删除增益效果。`
  },
  {
    label: '太空左移 (spaceMoveLeft)',
    value: 'spaceMoveLeft',
    category: ['state'],
    desc: `在太空中向左移动。`
  },
  {
    label: '太空左移无AI (spaceMoveLeftNoAI)',
    value: 'spaceMoveLeftNoAI',
    category: ['state'],
    desc: `在太空中向左移动，AI不运作。`
  },
  {
    label: '矿石炸弹 (OreBomb)',
    value: 'OreBomb',
    category: ['state'],
    desc: `矿石炸弹爆炸效果。`
  },
  {
    label: '复活 (rebirth)',
    value: 'rebirth',
    category: ['instant'],
    desc: '复活目标单位。'
  },
  {
    label: '反伤 (backHurt)',
    value: 'backHurt',
    category: ['instant'],
    desc: '反弹受到伤害的一部分给攻击者。'
  },
  {
    label: '暴击效果 (critExtraMul)',
    value: 'critExtraMul',
    category: ['instant'],
    desc: '暴击时额外伤害倍率。'
  },
  {
    label: '暴击概率 (critExtraPro)',
    value: 'critExtraPro',
    category: ['instant'],
    desc: '增加暴击概率。'
  },
  {
    label: '削减生命 (cutLife)',
    value: 'cutLife',
    category: ['instant'],
    desc: '削减目标固定数值生命值。'
  },
  {
    label: '锁定生命 (lockLife)',
    value: 'lockLife',
    category: ['instant', 'state'],
    desc: '锁定生命值，使其不会低于指定值。'
  },
  {
    label: '设置生命百分比 (setLifePer)',
    value: 'setLifePer',
    category: ['instant'],
    desc: '将目标生命值设置为指定百分比。'
  },

  {
    label: '改变伤害 (changeHurt)',
    value: 'changeHurt',
    category: ['instant'],
    desc: '改变本次伤害的数值。'
  },
  {
    label: '改变伤害并倍率 (changeHurtAndMul)',
    value: 'changeHurtAndMul',
    category: ['instant'],
    desc: '改变伤害数值并应用倍率。'
  },
  {
    label: '子弹改变伤害 (changeHurtBullet)',
    value: 'changeHurtBullet',
    category: ['instant'],
    desc: '子弹命中时改变伤害。'
  },
  {
    label: '伤害倍率 (changeHurtMul)',
    value: 'changeHurtMul',
    category: ['instant'],
    desc: '按比例改变伤害数值。'
  },
  {
    label: '伤害减免 (changeHurtMulDedut)',
    value: 'changeHurtMulDedut',
    category: ['instant'],
    desc: '按比例减免受到的伤害。'
  },
  {
    label: '改变伤害_剑齿虎盾 (changeHurt_SaberTiger_shield)',
    value: 'changeHurt_SaberTiger_shield',
    category: ['instant'],
    desc: '剑齿虎盾牌专用伤害改变效果。'
  },
  {
    label: '改变伤害_三角龙 (changeHurt_TriceratopsHurt)',
    value: 'changeHurt_TriceratopsHurt',
    category: ['instant'],
    desc: '三角龙专用伤害改变效果。'
  },
  {
    label: '空中伤害改变 (changeHurt_air)',
    value: 'changeHurt_air',
    category: ['instant'],
    desc: '对空中单位改变伤害。'
  },
  {
    label: '子弹名改变伤害 (changeHurt_bulletName)',
    value: 'changeHurt_bulletName',
    category: ['instant'],
    desc: '根据子弹名称改变伤害。'
  },
  {
    label: '过滤单位类型改变伤害 (changeHurt_filterUnitType)',
    value: 'changeHurt_filterUnitType',
    category: ['instant'],
    desc: '根据过滤的单位类型改变伤害。'
  },
  {
    label: '枪械类型改变伤害 (changeHurt_gunType)',
    value: 'changeHurt_gunType',
    category: ['instant'],
    desc: '根据枪械类型改变伤害。'
  },
  {
    label: '爆头改变伤害 (changeHurt_head)',
    value: 'changeHurt_head',
    category: ['instant'],
    desc: '爆头时改变伤害。'
  },
  {
    label: '生命导弹改变伤害 (changeHurt_lifeMissile)',
    value: 'changeHurt_lifeMissile',
    category: ['instant'],
    desc: '生命导弹专用伤害改变。'
  },
  {
    label: '种族类型改变伤害 (changeHurt_raceType)',
    value: 'changeHurt_raceType',
    category: ['instant'],
    desc: '根据种族类型改变伤害。'
  },
  {
    label: '目标名改变伤害 (changeHurt_targetName)',
    value: 'changeHurt_targetName',
    category: ['instant'],
    desc: '根据目标名称改变伤害。'
  },
  {
    label: '目标外壳改变伤害 (changeHurt_targetShell)',
    value: 'changeHurt_targetShell',
    category: ['instant'],
    desc: '根据目标外壳类型改变伤害。'
  },
  {
    label: '伤害仅武器 (hurtOnlyWeapon)',
    value: 'hurtOnlyWeapon',
    category: ['instant'],
    desc: '只计算武器伤害。'
  },
  {
    label: '仅枪械名伤害 (onlyHurtGunName)',
    value: 'onlyHurtGunName',
    category: ['instant'],
    desc: '只对指定名称枪械造成伤害。'
  },
  {
    label: '仅枪械类型伤害 (onlyHurtGunType)',
    value: 'onlyHurtGunType',
    category: ['instant'],
    desc: '只对指定类型枪械造成伤害。'
  },
  {
    label: '仅倍率伤害 (onlyHurtMul)',
    value: 'onlyHurtMul',
    category: ['instant'],
    desc: '只应用倍率伤害。'
  },
  {
    label: '必定倍率伤害 (onlyHurtMulMust)',
    value: 'onlyHurtMulMust',
    category: ['instant'],
    desc: '必定触发倍率伤害。'
  },
  {
    label: '仅圣诞枪械伤害 (onlyUnderChristmasGun)',
    value: 'onlyUnderChristmasGun',
    category: ['instant'],
    desc: '只对圣诞主题枪械造成伤害。'
  },
  {
    label: '仅武器伤害 (onlyWeapon)',
    value: 'onlyWeapon',
    category: ['instant'],
    desc: '只接受武器造成的伤害。'
  },
  {
    label: '无倍率伤害 (noMulHurt)',
    value: 'noMulHurt',
    category: ['instant'],
    desc: '不受倍率影响的基础伤害。'
  },
  {
    label: '秒杀 (seckill)',
    value: 'seckill',
    category: ['instant'],
    desc: '直接秒杀目标。'
  },
  {
    label: '秒杀普通敌人 (seckillNormalEnemy)',
    value: 'seckillNormalEnemy',
    category: ['instant'],
    desc: '直接秒杀普通敌人。'
  },
  {
    label: '无伤害 (noHurt)',
    value: 'noHurt',
    category: ['instant'],
    desc: '使本次伤害无效。'
  },
  {
    label: '子弹_反物质锤 (Antimatter_hammer)',
    value: 'Antimatter_hammer',
    category: ['instant'],
    desc: '反物质锤子弹效果。'
  },
  {
    label: '子弹_火狼元素 (bullet_FireWolf_elements)',
    value: 'bullet_FireWolf_elements',
    category: ['instant'],
    desc: '火狼元素子弹效果。'
  },
  {
    label: '子弹_火狼无火 (bullet_FireWolf_noFire)',
    value: 'bullet_FireWolf_noFire',
    category: ['instant'],
    desc: '火狼无火焰子弹效果。'
  },
  {
    label: '子弹_火狼岩石火 (bullet_FireWolf_rockFire)',
    value: 'bullet_FireWolf_rockFire',
    category: ['instant'],
    desc: '火狼岩石火焰子弹效果。'
  },
  {
    label: '子弹_生命削减 (bullet_LifeReduct)',
    value: 'bullet_LifeReduct',
    category: ['instant'],
    desc: '削减生命值的子弹。'
  },
  {
    label: '子弹_猛犸核心死亡 (bullet_Mammoth_core_die)',
    value: 'bullet_Mammoth_core_die',
    category: ['instant'],
    desc: '猛犸核心死亡时触发的子弹。'
  },
  {
    label: '子弹_猛犸电击 (bullet_Mammoth_electricity)',
    value: 'bullet_Mammoth_electricity',
    category: ['instant'],
    desc: '猛犸电击子弹效果。'
  },
  {
    label: '子弹_肉盾 (bullet_MeatyShield)',
    value: 'bullet_MeatyShield',
    category: ['instant'],
    desc: '肉盾子弹效果。'
  },
  {
    label: '子弹_年兽火花 (bullet_Nian_spark)',
    value: 'bullet_Nian_spark',
    category: ['instant'],
    desc: '年兽火花子弹效果。'
  },
  {
    label: '子弹_鸡块 (bullet_Nuggets)',
    value: 'bullet_Nuggets',
    category: ['instant'],
    desc: '鸡块子弹效果。'
  },
  {
    label: '子弹_剑齿虎激光 (bullet_SaberTiger_laser)',
    value: 'bullet_SaberTiger_laser',
    category: ['instant'],
    desc: '剑齿虎激光子弹效果。'
  },
  {
    label: '子弹_三角龙 (bullet_Triceratops)',
    value: 'bullet_Triceratops',
    category: ['instant'],
    desc: '三角龙子弹效果。'
  },
  {
    label: '子弹_虚荣彗星 (bullet_VanityKer_comet)',
    value: 'bullet_VanityKer_comet',
    category: ['instant'],
    desc: '虚荣者彗星子弹效果。'
  },
  {
    label: '子弹_婴儿炸弹 (bullet_babyBoom)',
    value: 'bullet_babyBoom',
    category: ['instant'],
    desc: '婴儿炸弹子弹效果。'
  },
  {
    label: '子弹_致命箭 (bullet_deadlyArrow)',
    value: 'bullet_deadlyArrow',
    category: ['instant'],
    desc: '致命箭子弹效果。'
  },
  {
    label: '子弹_致命幽灵 (bullet_deadlyGhost)',
    value: 'bullet_deadlyGhost',
    category: ['instant'],
    desc: '致命幽灵子弹效果。'
  },
  {
    label: '子弹_敌人 (bullet_enemy)',
    value: 'bullet_enemy',
    category: ['instant'],
    desc: '敌人子弹效果。'
  },
  {
    label: '子弹_反击点 (bullet_fightBackPoint)',
    value: 'bullet_fightBackPoint',
    category: ['instant'],
    desc: '反击点子弹效果。'
  },
  {
    label: '子弹_火焰地板 (bullet_fireFloor)',
    value: 'bullet_fireFloor',
    category: ['instant', 'state'],
    desc: '在地面生成火焰区域。'
  },
  {
    label: '子弹_火焰环绕 (bullet_fireSurround)',
    value: 'bullet_fireSurround',
    category: ['instant'],
    desc: '火焰环绕子弹效果。'
  },
  {
    label: '子弹_神之眼 (bullet_godEyes)',
    value: 'bullet_godEyes',
    category: ['instant'],
    desc: '神之眼子弹效果。'
  },
  {
    label: '子弹_神之权杖 (bullet_godMace)',
    value: 'bullet_godMace',
    category: ['instant'],
    desc: '神之权杖子弹效果。'
  },
  {
    label: '子弹_导弹命中 (bullet_hitMissile)',
    value: 'bullet_hitMissile',
    category: ['instant'],
    desc: '导弹命中子弹效果。'
  },
  {
    label: '子弹_内爆 (bullet_imploding)',
    value: 'bullet_imploding',
    category: ['instant'],
    desc: '内爆子弹效果。'
  },
  {
    label: '子弹_闪电看门狗 (bullet_lightningWatchdog)',
    value: 'bullet_lightningWatchdog',
    category: ['instant'],
    desc: '闪电看门狗子弹效果。'
  },
  {
    label: '子弹_矿工震荡 (bullet_minersShake)',
    value: 'bullet_minersShake',
    category: ['instant'],
    desc: '矿工震荡子弹效果。'
  },
  {
    label: '子弹_猪 (bullet_pig)',
    value: 'bullet_pig',
    category: ['instant'],
    desc: '猪子弹效果。'
  },
  {
    label: '子弹_旋转闪电 (bullet_rotateLighting)',
    value: 'bullet_rotateLighting',
    category: ['instant'],
    desc: '旋转闪电子弹效果。'
  },
  {
    label: '子弹_小明 (bullet_xiaoMing)',
    value: 'bullet_xiaoMing',
    category: ['instant'],
    desc: '小明子弹效果。'
  },
  {
    label: '子弹_放大 (bullet_zoomOut)',
    value: 'bullet_zoomOut',
    category: ['instant'],
    desc: '放大子弹效果。'
  },
  {
    label: '子弹雨球命中 (bulletRainBallHit)',
    value: 'bulletRainBallHit',
    category: ['instant'],
    desc: '子弹雨球命中效果。'
  },
  {
    label: '球状幻影Z (ballPhantomZ)',
    value: 'ballPhantomZ',
    category: ['instant'],
    desc: '球状幻影Z效果。'
  },
  {
    label: '子弹爆炸 (hitBoom)',
    value: 'hitBoom',
    category: ['instant'],
    desc: '子弹命中时爆炸。'
  },
  {
    label: '召唤火狼克隆 (FireWolf_cloned)',
    value: 'FireWolf_cloned',
    category: ['instant'],
    desc: '召唤火狼克隆体。'
  },
  {
    label: '召唤猛犸核心 (Mammoth_core)',
    value: 'Mammoth_core',
    category: ['instant', 'state'],
    desc: '召唤猛犸象核心。'
  },
  {
    label: '召唤猛犸核心附属 (Mammoth_core_attached)',
    value: 'Mammoth_core_attached',
    category: ['instant'],
    desc: '召唤猛犸核心附属单位。'
  },
  {
    label: '召唤骷髅法师克隆 (SkeletalMageCloned)',
    value: 'SkeletalMageCloned',
    category: ['instant'],
    desc: '召唤骷髅法师克隆体。'
  },
  {
    label: '骷髅法师克隆受击 (SkeletalMageClonedUnder)',
    value: 'SkeletalMageClonedUnder',
    category: ['instant'],
    desc: '骷髅法师克隆体受击效果。'
  },
  {
    label: '召唤并寄生 (summonedAndParasitic)',
    value: 'summonedAndParasitic',
    category: ['instant'],
    desc: '召唤单位并进行寄生。'
  },
  {
    label: '召唤摩卡 (summonedUnitsMocha)',
    value: 'summonedUnitsMocha',
    category: ['instant'],
    desc: '召唤摩卡单位。'
  },
  {
    label: '克隆无CF (clonedNoCF)',
    value: 'clonedNoCF',
    category: ['instant'],
    desc: '无CF标志的克隆。'
  },
  {
    label: '召唤虚无单位 (VanityKer_dreamlandUnit)',
    value: 'VanityKer_dreamlandUnit',
    category: ['instant'],
    desc: '召唤虚无梦境单位。'
  },
  {
    label: '清除召唤物 (clearSummoned)',
    value: 'clearSummoned',
    category: ['instant'],
    desc: '清除所有召唤单位。'
  },
  {
    label: '设置最大生命倍率 (setMaxLifeMulPow)',
    value: 'setMaxLifeMulPow',
    category: ['state'],
    desc: '设置最大生命值的倍率。'
  },
  {
    label: '生命回复率 (lifeRate)',
    value: 'lifeRate',
    category: ['state'],
    desc: '改变生命回复速率。'
  },
  {
    label: '生命回复倍率 (lifeRateMul)',
    value: 'lifeRateMul',
    category: ['state'],
    desc: '改变生命回复的倍率。'
  },
  {
    label: '装备回血 (outfitBlood)',
    value: 'outfitBlood',
    category: ['state'],
    desc: '装备提供的回血效果。'
  },
  {
    label: '战斗扣除 (fightDedut)',
    value: 'fightDedut',
    category: ['state'],
    desc: '战斗中的生命扣除。'
  },
  {
    label: '反伤状态 (reverseHurt)',
    value: 'reverseHurt',
    category: ['state'],
    desc: '反弹受到伤害。'
  },
  {
    label: '丢失概率 (lostPro)',
    value: 'lostPro',
    category: ['state'],
    desc: '攻击丢失的概率。'
  },
  {
    label: '无丢失无闪避 (noLostAndNoDodgeB)',
    value: 'noLostAndNoDodgeB',
    category: ['state'],
    desc: '不会丢失目标也不会被闪避。'
  },
  {
    label: '无暴击反伤 (noUnderCritAndBack)',
    value: 'noUnderCritAndBack',
    category: ['state'],
    desc: '不受暴击和反伤影响。'
  },
  {
    label: '吸血 (suckBlood)',
    value: 'suckBlood',
    category: ['state'],
    desc: '攻击时吸取生命值。'
  },
  {
    label: '夜间效果 (nightLing)',
    value: 'nightLing',
    category: ['state'],
    desc: '夜间战斗增益效果。'
  },
  {
    label: '伤害防御 (hurtDefence)',
    value: 'hurtDefence',
    category: ['state'],
    desc: '受到伤害时进行防御。'
  },
  {
    label: '武器DPS倍率 (armsDpsMul)',
    value: 'armsDpsMul',
    category: ['state'],
    desc: '武器DPS倍率改变。'
  },
  {
    label: '杀戮增加伤害 (murderous_addHurtMul)',
    value: 'murderous_addHurtMul',
    category: ['state'],
    desc: '击杀敌人增加伤害。'
  },
  {
    label: '杀戮增加伤害2 (murderous_addHurtMul2)',
    value: 'murderous_addHurtMul2',
    category: ['state'],
    desc: '击杀敌人增加伤害（第二版）。'
  },
  {
    label: '伤害倍率 (hurtMul)',
    value: 'hurtMul',
    category: ['state'],
    desc: '改变伤害输出倍率。'
  },
  {
    label: '首领伤害倍率 (bossHurtMul)',
    value: 'bossHurtMul',
    category: ['state'],
    desc: '对首领的伤害倍率。'
  },
  {
    label: '空中伤害倍率 (airHurtMul)',
    value: 'airHurtMul',
    category: ['state'],
    desc: '对空中单位的伤害倍率。'
  },
  {
    label: '地面伤害倍率 (landHurtMul)',
    value: 'landHurtMul',
    category: ['state'],
    desc: '对地面单位的伤害倍率。'
  },
  {
    label: '灵狐爱伤害倍率 (hurtMulByLingLove)',
    value: 'hurtMulByLingLove',
    category: ['state'],
    desc: '灵狐爱相关的伤害倍率。'
  },
  {
    label: '其他伤害倍率 (otherHurtMul)',
    value: 'otherHurtMul',
    category: ['state'],
    desc: '对其他目标的伤害倍率。'
  },
  {
    label: '竞技场伤害增加 (arenaHurtAdd)',
    value: 'arenaHurtAdd',
    category: ['state'],
    desc: '竞技场中伤害增加。'
  },
  {
    label: '伤害倍率增加 (hurtMulAdd)',
    value: 'hurtMulAdd',
    category: ['state'],
    desc: '伤害倍率增加值。'
  },
  {
    label: '全局溅射英雄 (globalSpurting_hero)',
    value: 'globalSpurting_hero',
    category: ['state'],
    desc: '英雄全局溅射伤害。'
  },
  {
    label: '怒气增加倍率 (angerAddMul)',
    value: 'angerAddMul',
    category: ['state'],
    desc: '怒气增加倍率。'
  },
  {
    label: '俯视 (lookDown)',
    value: 'lookDown',
    category: ['state'],
    desc: '俯视效果。'
  },
  {
    label: '元素叠加 (eleOverlap)',
    value: 'eleOverlap',
    category: ['state'],
    desc: '元素伤害叠加效果。'
  },
  {
    label: '同武器伤害增加 (sameArmsHurtAdd)',
    value: 'sameArmsHurtAdd',
    category: ['state'],
    desc: '使用相同武器时伤害增加。'
  },
  {
    label: '共鸣灵 (resonanceLing)',
    value: 'resonanceLing',
    category: ['state'],
    desc: '共鸣灵效果。'
  },
  {
    label: '骷髅卡 (skeletonCard)',
    value: 'skeletonCard',
    category: ['state'],
    desc: '骷髅卡效果。'
  },
  {
    label: '穿透间隔无子弹 (penetrationGapAnNoBullet)',
    value: 'penetrationGapAnNoBullet',
    category: ['state'],
    desc: '穿透间隔且不生成子弹。'
  },
  {
    label: '穿透间隔 (penetrationGap)',
    value: 'penetrationGap',
    category: ['state'],
    desc: '子弹穿透间隔。'
  },
  {
    label: '攻击间隔倍率 (attackGapMul)',
    value: 'attackGapMul',
    category: ['state'],
    desc: '攻击间隔倍率改变。'
  },
  {
    label: '攻速装填倍率 (attackAndReloadSpeedMul)',
    value: 'attackAndReloadSpeedMul',
    category: ['state'],
    desc: '攻击和装填速度倍率。'
  },
  {
    label: '速度不减 (speedNoReduceB)',
    value: 'speedNoReduceB',
    category: ['state'],
    desc: '移动速度不会降低。'
  },
  {
    label: '疯狂枪 (crazyGun)',
    value: 'crazyGun',
    category: ['state'],
    desc: '疯狂枪效果。'
  },
  {
    label: '疯狂 (crazy)',
    value: 'crazy',
    category: ['state'],
    desc: '疯狂状态。'
  },
  {
    label: '疯狂英雄技能 (crazyHeroSkill)',
    value: 'crazyHeroSkill',
    category: ['state'],
    desc: '疯狂英雄技能效果。'
  },
  {
    label: '疯狂英雄技能后 (after_crazyHeroSkill)',
    value: 'after_crazyHeroSkill',
    category: ['state'],
    desc: '疯狂英雄技能后效果。'
  },
  {
    label: '年龙技能 (yearDragonSkill)',
    value: 'yearDragonSkill',
    category: ['state'],
    desc: '生肖龙技能效果。'
  },
  {
    label: '无减少容量 (noReduceCapacityB)',
    value: 'noReduceCapacityB',
    category: ['state'],
    desc: '弹匣容量不会减少。'
  },
  {
    label: '疯狂载具 (crazyVehicle)',
    value: 'crazyVehicle',
    category: ['state'],
    desc: '疯狂载具效果。'
  },
  {
    label: '攻击倍率 (attackMul)',
    value: 'attackMul',
    category: ['state'],
    desc: '攻击倍率改变。'
  },
  {
    label: '疯狂伤害 (crazyAndHurt)',
    value: 'crazyAndHurt',
    category: ['state'],
    desc: '疯狂且增加伤害。'
  },
  {
    label: '疯狂穿透间隔 (crazyAndPenetrationGap)',
    value: 'crazyAndPenetrationGap',
    category: ['state'],
    desc: '疯狂状态且穿透间隔。'
  },
  {
    label: '射速伤害 (shootSpeedAndHurt)',
    value: 'shootSpeedAndHurt',
    category: ['state'],
    desc: '射速和伤害增加。'
  },
  {
    label: '负离子皮肤 (anionSkin)',
    value: 'anionSkin',
    category: ['state'],
    desc: '负离子皮肤效果。'
  },
  {
    label: '荒芜 (deserted)',
    value: 'deserted',
    category: ['state'],
    desc: '荒芜状态效果。'
  },
  {
    label: 'CD倍率 (cdMul)',
    value: 'cdMul',
    category: ['state'],
    desc: '技能CD倍率改变。'
  },
  {
    label: 'CD倍率最小触发 (cdMulAndMinTrigger)',
    value: 'cdMulAndMinTrigger',
    category: ['state'],
    desc: 'CD倍率且最小触发时间。'
  },
  {
    label: 'CD速度 (cdSpeed)',
    value: 'cdSpeed',
    category: ['state'],
    desc: '技能CD速度改变。'
  },
  {
    label: '全封锁 (noAllSkillAll)',
    value: 'noAllSkillAll',
    category: ['state'],
    desc: '完全封锁所有技能。'
  },
  {
    label: '尖叫 (screaming)',
    value: 'screaming',
    category: ['state'],
    desc: '尖叫状态效果。'
  },
  {
    label: '磁场_僵尸王 (magneticField_zombieKing)',
    value: 'magneticField_zombieKing',
    category: ['state'],
    desc: '僵尸王磁场效果。'
  },
  {
    label: '磁场 (magneticField)',
    value: 'magneticField',
    category: ['state'],
    desc: '磁场效果。'
  },
  {
    label: '磁力B (magneticB)',
    value: 'magneticB',
    category: ['state'],
    desc: '磁力B效果。'
  },
  {
    label: '鲜肉盛宴_猪 (fleshFeast_pig)',
    value: 'fleshFeast_pig',
    category: ['state'],
    desc: '猪的鲜肉盛宴效果。'
  },
  {
    label: '翻滚_猪 (roll_pig)',
    value: 'roll_pig',
    category: ['state'],
    desc: '猪的翻滚效果。'
  },
  {
    label: '碰撞_猪 (collision_pig)',
    value: 'collision_pig',
    category: ['state'],
    desc: '猪的碰撞效果。'
  },
  {
    label: '荆棘_猪 (thorns_pig)',
    value: 'thorns_pig',
    category: ['state'],
    desc: '猪的荆棘反伤效果。'
  },
  {
    label: '荒芜伤害倍率 (desertedhurtMul)',
    value: 'desertedhurtMul',
    category: ['state'],
    desc: '荒芜状态下的伤害倍率。'
  },
  {
    label: '剑齿虎盾 (SaberTiger_shield)',
    value: 'SaberTiger_shield',
    category: ['state'],
    desc: '剑齿虎盾效果。'
  },
  {
    label: '猛犸核心受击 (Mammoth_core_hurt)',
    value: 'Mammoth_core_hurt',
    category: ['state'],
    desc: '猛犸核心受击效果。'
  },
  {
    label: '猛犸受击 (Mammoth_hurt)',
    value: 'Mammoth_hurt',
    category: ['state'],
    desc: '猛犸象受击效果。'
  },
  {
    label: '猛犸狼死亡 (Mammoth_wolf_die)',
    value: 'Mammoth_wolf_die',
    category: ['state'],
    desc: '猛犸狼死亡效果。'
  },
  {
    label: '虚荣彗星增益 (VanityKer_cometBuff)',
    value: 'VanityKer_cometBuff',
    category: ['state'],
    desc: '虚荣者彗星增益效果。'
  },
  {
    label: '虚荣射线增益 (VanityKer_rayBuff)',
    value: 'VanityKer_rayBuff',
    category: ['state'],
    desc: '虚荣者射线增益效果。'
  },
  {
    label: '反物质锤 (Antimatter_hammer)',
    value: 'Antimatter_hammer',
    category: ['state'],
    desc: '反物质锤效果。'
  },
  {
    label: '宠物湖充能 (charged_PetLake)',
    value: 'charged_PetLake',
    category: ['state'],
    desc: '宠物湖充能效果。'
  },
  {
    label: '宠物湖静态 (static_PetLake)',
    value: 'static_PetLake',
    category: ['state'],
    desc: '宠物湖静态效果。'
  },
  {
    label: '巨毒尸翻滚 (roll_hugePosion)',
    value: 'roll_hugePosion',
    category: ['state'],
    desc: '巨毒尸翻滚效果。'
  },
  {
    label: '变身僵尸 (changeToZombie)',
    value: 'changeToZombie',
    category: ['state'],
    desc: '变身为僵尸状态。'
  },
  {
    label: '巫师愤怒风 (wizardAnger_wind)',
    value: 'wizardAnger_wind',
    category: ['state'],
    desc: '巫师愤怒风效果。'
  },
  {
    label: '疯狂骑士 (crazy_knights)',
    value: 'crazy_knights',
    category: ['state'],
    desc: '疯狂骑士效果。'
  },
  {
    label: '无尽骑士 (boundless_knights)',
    value: 'boundless_knights',
    category: ['state'],
    desc: '无尽骑士效果。'
  },
  {
    label: '无尽敌人骑士 (boundlessEnemy_knights)',
    value: 'boundlessEnemy_knights',
    category: ['state'],
    desc: '无尽敌人骑士效果。'
  },
  {
    label: '喂养狼 (feeding_wolf)',
    value: 'feeding_wolf',
    category: ['state'],
    desc: '喂养狼效果。'
  },
  {
    label: '穿梭装置 (shuttleDevicer)',
    value: 'shuttleDevicer',
    category: ['state'],
    desc: '穿梭装置效果。'
  },
  {
    label: '穿梭装置S (shuttleDevicerS)',
    value: 'shuttleDevicerS',
    category: ['state'],
    desc: '穿梭装置S效果。'
  },
  {
    label: '风_看门鹰 (wind_WatchEagle)',
    value: 'wind_WatchEagle',
    category: ['state'],
    desc: '看门鹰风效果。'
  },
  {
    label: '无敌EEG (invincible_eeg)',
    value: 'invincible_eeg',
    category: ['state'],
    desc: '无敌EEG效果。'
  },
  {
    label: '三角龙荒芜 (Triceratops_deserted)',
    value: 'Triceratops_deserted',
    category: ['state'],
    desc: '三角龙荒芜效果。'
  },
  {
    label: '神之权杖武器技能 (godMace_ArmsSkill)',
    value: 'godMace_ArmsSkill',
    category: ['state'],
    desc: '神之权杖武器技能效果。'
  },
  {
    label: '风雷 (windThunder)',
    value: 'windThunder',
    category: ['state'],
    desc: '风雷效果。'
  },
  {
    label: '钢琴枪技能 (pianoGunSkill)',
    value: 'pianoGunSkill',
    category: ['state'],
    desc: '钢琴枪技能效果。'
  },
  {
    label: '燃烧武器 (burn_arms)',
    value: 'burn_arms',
    category: ['state'],
    desc: '武器燃烧效果。'
  },
  {
    label: '冷冻武器 (cold_arms)',
    value: 'cold_arms',
    category: ['state'],
    desc: '武器冷冻效果。'
  },
  {
    label: '光锥技能 (lightConeSkill)',
    value: 'lightConeSkill',
    category: ['state'],
    desc: '光锥技能效果。'
  },
  {
    label: '飞龙石化 (FlyDragon_petrifaction)',
    value: 'FlyDragon_petrifaction',
    category: ['state'],
    desc: '飞龙石化效果。'
  },
  {
    label: '武器击退 (beatBack_arms)',
    value: 'beatBack_arms',
    category: ['state'],
    desc: '武器击退效果。'
  },
  {
    label: '武器恐惧 (armsFear)',
    value: 'armsFear',
    category: ['state'],
    desc: '武器恐惧效果。'
  },
  {
    label: '诡雷神武器技能 (booby_godArmsSkill)',
    value: 'booby_godArmsSkill',
    category: ['state'],
    desc: '诡雷神武器技能效果。'
  },
  {
    label: '年蛇技能 (yearSnakeSkill)',
    value: 'yearSnakeSkill',
    category: ['state'],
    desc: '生肖蛇技能效果。'
  },
  {
    label: '武器掉落 (armsDrop)',
    value: 'armsDrop',
    category: ['state'],
    desc: '武器掉落效果。'
  },
  {
    label: '装备掉落 (equipDrop)',
    value: 'equipDrop',
    category: ['state'],
    desc: '装备掉落效果。'
  },
  {
    label: '武器掉落宝石 (armsDropAndGem)',
    value: 'armsDropAndGem',
    category: ['state'],
    desc: '武器掉落并带宝石效果。'
  },
  {
    label: '装备掉落宝石 (equipDropAndGem)',
    value: 'equipDropAndGem',
    category: ['state'],
    desc: '装备掉落并带宝石效果。'
  },
  {
    label: '掉落打击灵 (dropStrikerLing)',
    value: 'dropStrikerLing',
    category: ['state'],
    desc: '掉落打击灵效果。'
  },
  {
    label: '跳跃 (jump)',
    value: 'jump',
    category: ['state'],
    desc: '跳跃状态效果。'
  },
  {
    label: '火蜥蜴后退 (Salamander_back)',
    value: 'Salamander_back',
    category: ['state'],
    desc: '火蜥蜴后退效果。'
  },
  {
    label: '虚拟蝎子防御 (VirtualScorpion_defence)',
    value: 'VirtualScorpion_defence',
    category: ['state'],
    desc: '虚拟蝎子防御效果。'
  },
  {
    label: '雪地兵传送 (teleport_SnowSoldiers)',
    value: 'teleport_SnowSoldiers',
    category: ['state'],
    desc: '雪地兵传送效果。'
  },
  {
    label: '雪女钩子 (SnowGirlHook)',
    value: 'SnowGirlHook',
    category: ['state'],
    desc: '雪女钩子效果。'
  },
  {
    label: '雪女拉拽命中 (SnowGirlPullHit)',
    value: 'SnowGirlPullHit',
    category: ['state'],
    desc: '雪女拉拽命中效果。'
  },
  {
    label: '雪女拉拽后命中 (SnowGirlAfterPullHit)',
    value: 'SnowGirlAfterPullHit',
    category: ['state'],
    desc: '雪女拉拽后命中效果。'
  },
  {
    label: '冰人打击 (IceManStrike)',
    value: 'IceManStrike',
    category: ['state'],
    desc: '冰人打击效果。'
  },
  {
    label: '冰人打击命中 (IceManStrikeHit)',
    value: 'IceManStrikeHit',
    category: ['state'],
    desc: '冰人打击命中效果。'
  },
  {
    label: '冰人踢击命中 (IceManKickHit)',
    value: 'IceManKickHit',
    category: ['state'],
    desc: '冰人踢击命中效果。'
  },
  {
    label: '快速守卫弹簧 (FastGuards_spring)',
    value: 'FastGuards_spring',
    category: ['state'],
    desc: '快速守卫弹簧效果。'
  },
  {
    label: '快速守卫电场链接 (eleField_FastGuards_link)',
    value: 'eleField_FastGuards_link',
    category: ['state'],
    desc: '快速守卫电场链接效果。'
  },
  {
    label: '快速守卫屏幕 (FastGuards_screen)',
    value: 'FastGuards_screen',
    category: ['state'],
    desc: '快速守卫屏幕效果。'
  },
  {
    label: '编织者网隐身 (Weaver_web_hidingB)',
    value: 'Weaver_web_hidingB',
    category: ['state'],
    desc: '编织者网隐身效果。'
  },
  {
    label: '编织者刺命中 (Weaver_thorn_hit)',
    value: 'Weaver_thorn_hit',
    category: ['state'],
    desc: '编织者刺命中效果。'
  },
  {
    label: '决斗者连击 (DuelistCombo)',
    value: 'DuelistCombo',
    category: ['state'],
    desc: '决斗者连击效果。'
  },
  {
    label: 'GM面具 (gmMask)',
    value: 'gmMask',
    category: ['state'],
    desc: 'GM面具效果。'
  },
  {
    label: '爱壳 (loveShell)',
    value: 'loveShell',
    category: ['state'],
    desc: '爱壳效果。'
  },
  {
    label: '高宠物卡 (highPetCard)',
    value: 'highPetCard',
    category: ['state'],
    desc: '高级宠物卡效果。'
  },
  {
    label: '高载具卡 (highVehicleCard)',
    value: 'highVehicleCard',
    category: ['state'],
    desc: '高级载具卡效果。'
  },
  {
    label: '高伙伴卡 (highPartnerCard)',
    value: 'highPartnerCard',
    category: ['state'],
    desc: '高级伙伴卡效果。'
  },
  {
    label: '黑激光充能 (charged_BlackLaer)',
    value: 'charged_BlackLaer',
    category: ['state'],
    desc: '黑激光充能效果。'
  },
  {
    label: '黑激光静态 (static_BlackLaer)',
    value: 'static_BlackLaer',
    category: ['state'],
    desc: '黑激光静态效果。'
  },
  {
    label: '钩子女巫翻滚 (HookWitchRoll)',
    value: 'HookWitchRoll',
    category: ['state'],
    desc: '钩子女巫翻滚效果。'
  },
  {
    label: '兔王命中 (KingRabbitKingHit)',
    value: 'KingRabbitKingHit',
    category: ['state'],
    desc: '兔王命中效果。'
  },
  {
    label: '幻影Z连击命中 (comboPhantomZHit)',
    value: 'comboPhantomZHit',
    category: ['state'],
    desc: '幻影Z连击命中效果。'
  },
  {
    label: '僵尸警察冲锋 (PoliceZombieCharge)',
    value: 'PoliceZombieCharge',
    category: ['state'],
    desc: '僵尸警察冲锋效果。'
  },
  {
    label: '激光看门狗 (laserWatchdog)',
    value: 'laserWatchdog',
    category: ['state'],
    desc: '激光看门狗效果。'
  },
  {
    label: '激光看门狗受击 (laserWatchdogUnder)',
    value: 'laserWatchdogUnder',
    category: ['state'],
    desc: '激光看门狗受击效果。'
  },
  {
    label: '劳工僵尸爆炸增益 (LaborZombieBoomBuff)',
    value: 'LaborZombieBoomBuff',
    category: ['state'],
    desc: '劳工僵尸爆炸增益效果。'
  },
  {
    label: '攻击无闪避 (attackNoDodge)',
    value: 'attackNoDodge',
    category: ['state'],
    desc: '攻击无法被闪避。'
  },
  {
    label: '发现隐藏 (findHideB)',
    value: 'findHideB',
    category: ['state'],
    desc: '发现隐藏单位。'
  },
  {
    label: '发现隐藏2 (findHideB2)',
    value: 'findHideB2',
    category: ['state'],
    desc: '发现隐藏单位（第二版）。'
  },
  {
    label: '狙击王增益 (sniperKingBuff)',
    value: 'sniperKingBuff',
    category: ['state'],
    desc: '狙击王增益效果。'
  },
  {
    label: '狙击王敌人命中 (sniperKingEnemyHit)',
    value: 'sniperKingEnemyHit',
    category: ['state'],
    desc: '狙击王敌人命中效果。'
  },
  {
    label: '狙击王敌人受击 (sniperKingEnemyUnder)',
    value: 'sniperKingEnemyUnder',
    category: ['state'],
    desc: '狙击王敌人受击效果。'
  },
  {
    label: '荒芜光环骷髅S (desertedHalo_BoomSkullS)',
    value: 'desertedHalo_BoomSkullS',
    category: ['state'],
    desc: '荒芜光环骷髅S效果。'
  },
  {
    label: '眩晕护甲铁 (vertigoArmorIron)',
    value: 'vertigoArmorIron',
    category: ['state'],
    desc: '眩晕护甲铁效果。'
  },
  {
    label: '光湖 (lightLake)',
    value: 'lightLake',
    category: ['state'],
    desc: '光湖效果。'
  },
  {
    label: '末日部件受击 (LastdayPartUnder)',
    value: 'LastdayPartUnder',
    category: ['state'],
    desc: '末日部件受击效果。'
  },
  {
    label: '运输僵尸投掷命中 (TransportZombieThrowHit)',
    value: 'TransportZombieThrowHit',
    category: ['state'],
    desc: '运输僵尸投掷命中效果。'
  },
  {
    label: '雾震动命中 (FoggyShakeHit)',
    value: 'FoggyShakeHit',
    category: ['state'],
    desc: '雾震动命中效果。'
  },
  {
    label: '雾冲击命中 (FoggyImpactHit)',
    value: 'FoggyImpactHit',
    category: ['state'],
    desc: '雾冲击命中效果。'
  },
  {
    label: '格挡 (block)',
    value: 'block',
    category: ['state'],
    desc: '格挡伤害。'
  },
  {
    label: '刚体 (rigidBody)',
    value: 'rigidBody',
    category: ['state'],
    desc: '刚体状态，不易被击退。'
  },
  {
    label: '无击退 (noUnderBounceHitB)',
    value: 'noUnderBounceHitB',
    category: ['state'],
    desc: '不受击退效果影响。'
  },
  {
    label: '能量盾 (energyShield)',
    value: 'energyShield',
    category: ['state'],
    desc: '能量护盾效果。'
  },
  {
    label: '南瓜头 (pumpkinHead)',
    value: 'pumpkinHead',
    category: ['state'],
    desc: '南瓜头效果。'
  },
  {
    label: '血条显示CD (lifeBarShowCd)',
    value: 'lifeBarShowCd',
    category: ['state'],
    desc: '血条显示技能CD。'
  },
  {
    label: '隐身B (hidingB)',
    value: 'hidingB',
    category: ['state'],
    desc: '隐身效果B。'
  },
  {
    label: '敌人隐身 (hiding_enemy)',
    value: 'hiding_enemy',
    category: ['state'],
    desc: '敌人隐身效果。'
  },
  {
    label: '隐身不清除 (hidingBNoClear)',
    value: 'hidingBNoClear',
    category: ['state'],
    desc: '隐身状态不会被清除。'
  },
  {
    label: '隐身速度 (hidingB_speed)',
    value: 'hidingB_speed',
    category: ['state'],
    desc: '隐身时速度改变。'
  },
  {
    label: '神隐身B (godHidingB)',
    value: 'godHidingB',
    category: ['state'],
    desc: '神级隐身效果B。'
  },
  {
    label: '神隐身物品 (godHiding_things)',
    value: 'godHiding_things',
    category: ['state'],
    desc: '神级隐身物品效果。'
  },
  {
    label: '英雄隐身 (invisibility_hero)',
    value: 'invisibility_hero',
    category: ['state'],
    desc: '英雄隐身效果。'
  },
  {
    label: '永久隐身 (invisibilityEver)',
    value: 'invisibilityEver',
    category: ['state'],
    desc: '永久隐身效果。'
  },
  {
    label: '生命立绘 (standImageByLife)',
    value: 'standImageByLife',
    category: ['state'],
    desc: '根据生命值显示立绘。'
  },
  {
    label: '沉默B (silenceB)',
    value: 'silenceB',
    category: ['state'],
    desc: '沉默效果B。'
  },
  {
    label: '卧龙隐身 (wolongHiding)',
    value: 'wolongHiding',
    category: ['state'],
    desc: '卧龙隐身效果。'
  },
  {
    label: '金铲技能 (goldSpadeSkill)',
    value: 'goldSpadeSkill',
    category: ['state'],
    desc: '金铲技能效果。'
  },
  {
    label: '强灵 (strongLing)',
    value: 'strongLing',
    category: ['state'],
    desc: '强灵效果。'
  },
  {
    label: '嘲讽灵 (tauntLing)',
    value: 'tauntLing',
    category: ['state'],
    desc: '嘲讽灵效果。'
  },
  {
    label: '防御攻击 (defenceAndAttack)',
    value: 'defenceAndAttack',
    category: ['state'],
    desc: '防御并反击效果。'
  },
  {
    label: 'AI无法发现 (noAiFind)',
    value: 'noAiFind',
    category: ['state'],
    desc: 'AI无法发现该单位。'
  },
  {
    label: '僵尸面具 (zombieMask)',
    value: 'zombieMask',
    category: ['state'],
    desc: '僵尸面具效果。'
  },
  {
    label: '技能免疫蹲下 (spellImmunitySquat)',
    value: 'spellImmunitySquat',
    category: ['state'],
    desc: '蹲下时技能免疫。'
  },
  {
    label: '无眩晕 (noDizzinessB)',
    value: 'noDizzinessB',
    category: ['state'],
    desc: '不会眩晕。'
  },
  {
    label: '速度减慢 (slowByMoveSpeed)',
    value: 'slowByMoveSpeed',
    category: ['state'],
    desc: '按速度比例减慢。'
  },
  {
    label: '速度不减 (noSpeedReduce)',
    value: 'noSpeedReduce',
    category: ['state'],
    desc: '移动速度不会减少。'
  },
  {
    label: '英雄冲刺 (heroSprint)',
    value: 'heroSprint',
    category: ['state'],
    desc: '英雄冲刺效果。'
  },
  {
    label: '英雄翻滚 (heroRolling)',
    value: 'heroRolling',
    category: ['state'],
    desc: '英雄翻滚效果。'
  },
  {
    label: '滑翔 (gliding)',
    value: 'gliding',
    category: ['state'],
    desc: '滑翔效果。'
  },
  {
    label: '冲刺剑 (sprintSword)',
    value: 'sprintSword',
    category: ['state'],
    desc: '冲刺剑效果。'
  },
  {
    label: '闪避概率 (dodgePro)',
    value: 'dodgePro',
    category: ['state'],
    desc: '闪避概率改变。'
  },
  {
    label: '钢铁之躯 (ironBody)',
    value: 'ironBody',
    category: ['state'],
    desc: '钢铁之躯效果。'
  },
  {
    label: '移动速度上限 (moveSpeedOver)',
    value: 'moveSpeedOver',
    category: ['state'],
    desc: '移动速度上限改变。'
  },
  {
    label: '毒雾英雄 (poisonousFog_hero)',
    value: 'poisonousFog_hero',
    category: ['state'],
    desc: '英雄毒雾效果。'
  },
  {
    label: '空中移动速度 (airMoveSpeed)',
    value: 'airMoveSpeed',
    category: ['state'],
    desc: '空中移动速度改变。'
  },
  {
    label: '贪婪蛇技能 (greedySnakeSkill)',
    value: 'greedySnakeSkill',
    category: ['state'],
    desc: '贪婪蛇技能效果。'
  },
  {
    label: '电动装置S (electricDevicerS)',
    value: 'electricDevicerS',
    category: ['state'],
    desc: '电动装置S效果。'
  },
  {
    label: '移动速度不减 (moveSpeedNoReduce)',
    value: 'moveSpeedNoReduce',
    category: ['state'],
    desc: '移动速度不会减少。'
  },
  {
    label: '移动速度全停 (moveSpeedAllStop)',
    value: 'moveSpeedAllStop',
    category: ['state'],
    desc: '移动速度完全停止。'
  },
  {
    label: '添加充能最大值倍率 (addChargerMaxMul)',
    value: 'addChargerMaxMul',
    category: ['instant'],
    desc: '添加充能最大值倍率。'
  },
  {
    label: '添加挖掘箱 (addDiggingBox)',
    value: 'addDiggingBox',
    category: ['instant'],
    desc: '添加挖掘箱效果。'
  },
  {
    label: '添加喷火器武器技能 (addFlamer_ArmsSkill)',
    value: 'addFlamer_ArmsSkill',
    category: ['instant'],
    desc: '添加喷火器武器技能。'
  },
  {
    label: '添加等级数字 (addLevelNumber)',
    value: 'addLevelNumber',
    category: ['instant'],
    desc: '添加等级数字效果。'
  },
  {
    label: '添加传送敌人Y (addTeleportEnemyY)',
    value: 'addTeleportEnemyY',
    category: ['instant'],
    desc: '添加传送敌人Y轴效果。'
  },
  {
    label: '添加临时装置 (addTempDevice)',
    value: 'addTempDevice',
    category: ['instant'],
    desc: '添加临时装置效果。'
  },
  {
    label: '添加天气 (addWeather)',
    value: 'addWeather',
    category: ['instant'],
    desc: '添加天气效果。'
  },
  {
    label: '添加天气编辑 (addWeatherEdit)',
    value: 'addWeatherEdit',
    category: ['instant'],
    desc: '编辑天气效果。'
  },
  {
    label: 'AI巡逻随机不攻击 (aiPatrolRandomNoAttack)',
    value: 'aiPatrolRandomNoAttack',
    category: ['instant'],
    desc: 'AI随机巡逻且不攻击。'
  },
  {
    label: '出生锁定 (birthLock)',
    value: 'birthLock',
    category: ['instant'],
    desc: '出生时锁定目标。'
  },
  {
    label: '出生随机蜘蛛 (birthRandomSpider)',
    value: 'birthRandomSpider',
    category: ['instant'],
    desc: '出生时随机召唤蜘蛛。'
  },
  {
    label: '枪装填交换 (gunReloadSwap)',
    value: 'gunReloadSwap',
    category: ['instant'],
    desc: '枪械装填时交换效果。'
  },
  {
    label: '天秤座技能 (consLibraSkill)',
    value: 'consLibraSkill',
    category: ['instant'],
    desc: '天秤座星座技能。'
  },
  {
    label: '老糖 (oldSugar)',
    value: 'oldSugar',
    category: ['instant'],
    desc: '老糖效果。'
  },
  {
    label: '老子弹 (oldBullet)',
    value: 'oldBullet',
    category: ['instant'],
    desc: '老子弹效果。'
  },
  {
    label: '年羊技能 (yearSheepSkill)',
    value: 'yearSheepSkill',
    category: ['instant'],
    desc: '生肖羊技能效果。'
  },
  {
    label: '光锥致盲 (lightConeBlind)',
    value: 'lightConeBlind',
    category: ['instant'],
    desc: '光锥致盲效果。'
  },
  {
    label: '疯狂头 (madmanHead)',
    value: 'madmanHead',
    category: ['instant'],
    desc: '疯狂头效果。'
  },
  {
    label: '紫金石臭鼬 (purgoldSkunk)',
    value: 'purgoldSkunk',
    category: ['instant'],
    desc: '紫金石臭鼬效果。'
  },
  {
    label: '赤火恶魔 (redFireDem)',
    value: 'redFireDem',
    category: ['instant'],
    desc: '赤火恶魔效果。'
  },
  {
    label: '狙击手下哨兵 (SentryUnderSniper)',
    value: 'SentryUnderSniper',
    category: ['instant'],
    desc: '狙击手下哨兵效果。'
  },
  {
    label: '魔法狂神命中 (magicMadgodHit)',
    value: 'magicMadgodHit',
    category: ['instant'],
    desc: '魔法狂神命中效果。'
  },
  {
    label: '设置五倍率最大值 (setFivMaxMul)',
    value: 'setFivMaxMul',
    category: ['instant', 'state'],
    desc: '设置五种倍率的最大值。'
  },
  {
    label: '着陆 (toLand)',
    value: 'toLand',
    category: ['instant'],
    desc: '强制着陆效果。'
  },
  {
    label: '飞行 (toFly)',
    value: 'toFly',
    category: ['instant'],
    desc: '强制飞行效果。'
  },
  {
    label: '最大跳跃数增加 (maxJumpNumAdd)',
    value: 'maxJumpNumAdd',
    category: ['instant'],
    desc: '最大跳跃次数增加。'
  },
  {
    label: '零重力卡 (zeroGravityCard)',
    value: 'zeroGravityCard',
    category: ['instant'],
    desc: '零重力卡效果。'
  },
  {
    label: '闭合枪技能 (closureGunSkill)',
    value: 'closureGunSkill',
    category: ['instant'],
    desc: '闭合枪技能效果。'
  },
  {
    label: '竞技场下 (unionPKUnder)',
    value: 'unionPKUnder',
    category: ['instant'],
    desc: '竞技场受击效果。'
  },
  {
    label: 'DPS连接 (dpsConnect)',
    value: 'dpsConnect',
    category: ['instant'],
    desc: 'DPS连接效果。'
  },
  {
    label: '先锋英雄 (pioneer_hero)',
    value: 'pioneer_hero',
    category: ['instant'],
    desc: '先锋英雄效果。'
  },
  {
    label: '网格阻挡 (gridBlock)',
    value: 'gridBlock',
    category: ['instant'],
    desc: '网格阻挡效果。'
  },
  {
    label: '熟练神 (seasonedGod)',
    value: 'seasonedGod',
    category: ['instant'],
    desc: '熟练神效果。'
  },
  {
    label: '年虎超级伤害 (yearTigerHurtSuper)',
    value: 'yearTigerHurtSuper',
    category: ['instant'],
    desc: '生肖虎超级伤害效果。'
  },
  {
    label: '银屏伤害 (silverScreenHurt)',
    value: 'silverScreenHurt',
    category: ['instant'],
    desc: '银屏伤害效果。'
  },
  {
    label: '少红武器 (lessRedArms)',
    value: 'lessRedArms',
    category: ['instant'],
    desc: '减少红色武器效果。'
  },
  {
    label: '神盾 (godShield)',
    value: 'godShield',
    category: ['instant'],
    desc: '神盾效果。'
  },
  {
    label: '无AI发现命中 (noAiFindAndHit)',
    value: 'noAiFindAndHit',
    category: ['instant'],
    desc: 'AI无法发现并命中。'
  },
  {
    label: '设置元素倍率 (setEleMul)',
    value: 'setEleMul',
    category: ['instant'],
    desc: '设置元素伤害倍率。'
  },
  {
    label: '召唤首领关注 (sumBossAtten)',
    value: 'sumBossAtten',
    category: ['instant'],
    desc: '召唤首领关注效果。'
  },
  {
    label: '设置武器可用为假 (setSkillArrCanUseFalse)',
    value: 'setSkillArrCanUseFalse',
    category: ['instant'],
    desc: '设置技能数组可用状态为假。'
  },
  {
    label: '技能复制英雄 (skillCopy_hero)',
    value: 'skillCopy_hero',
    category: ['instant'],
    desc: '英雄技能复制效果。'
  },
  {
    label: '共鸣神 (resonateGod)',
    value: 'resonateGod',
    category: ['instant'],
    desc: '共鸣神效果。'
  },
  {
    label: '击杀不死事件B (puKillNoDieEventB)',
    value: 'puKillNoDieEventB',
    category: ['instant'],
    desc: '击杀不死事件B效果。'
  },
  {
    label: '无攻击命令 (noAttackOrder)',
    value: 'noAttackOrder',
    category: ['instant'],
    desc: '不接受攻击命令。'
  },
  {
    label: '无武器射击 (noArmsShoot)',
    value: 'noArmsShoot',
    category: ['instant'],
    desc: '无法使用武器射击。'
  },
  {
    label: '骑射载具 (rideShootVehicle)',
    value: 'rideShootVehicle',
    category: ['instant'],
    desc: '骑乘载具时射击效果。'
  },
  {
    label: '钩子装置 (hookDevice)',
    value: 'hookDevice',
    category: ['instant'],
    desc: '钩子装置效果。'
  },
  {
    label: '敌人变为我方 (enemyToMe)',
    value: 'enemyToMe',
    category: ['instant'],
    desc: '敌人变为我方阵营。'
  },
  {
    label: '敌人变为僵尸 (enemyToZombie)',
    value: 'enemyToZombie',
    category: ['instant'],
    desc: '敌人变为僵尸阵营。'
  },
  {
    label: '弹墙变蝙蝠 (bwallToBat)',
    value: 'bwallToBat',
    category: ['instant'],
    desc: '弹跳墙变蝙蝠效果。'
  },
  {
    label: '击杀转移父级 (killTransFather)',
    value: 'killTransFather',
    category: ['instant'],
    desc: '击杀时转移到父级。'
  },
  {
    label: '无条件击杀转移父级 (killTransFatherNoCondition)',
    value: 'killTransFatherNoCondition',
    category: ['instant'],
    desc: '无条件击杀时转移到父级。'
  },
  {
    label: '疯狂紫2 (madpurUnder2)',
    value: 'madpurUnder2',
    category: ['instant'],
    desc: '疯狂紫2效果。'
  },
  {
    label: '荒芜芒技能 (barrenAwnSkill)',
    value: 'barrenAwnSkill',
    category: ['instant'],
    desc: '荒芜芒技能效果。'
  },
  {
    label: '金龙 (goldFalcon)',
    value: 'goldFalcon',
    category: ['instant'],
    desc: '金龙效果。'
  },
  {
    label: '龙头技能 (dragonHeadSkill)',
    value: 'dragonHeadSkill',
    category: ['instant'],
    desc: '龙头技能效果。'
  },
  {
    label: '弹墙龙翼 (bwallDragonWing)',
    value: 'bwallDragonWing',
    category: ['instant'],
    desc: '弹跳墙龙翼效果。'
  },
  {
    label: '飞行状态 (toFlyState)',
    value: 'toFlyState',
    category: ['instant'],
    desc: '进入飞行状态。'
  },
  {
    label: '疯狂BOSS受击 (MadbossUnder)',
    value: 'MadbossUnder',
    category: ['instant'],
    desc: '疯狂BOSS受击效果。'
  },
  {
    label: '疯狂近身闪电 (madCloseLightning)',
    value: 'madCloseLightning',
    category: ['instant'],
    desc: '疯狂近身闪电效果。'
  },
  {
    label: '疯狂紫腰带 (madpurBelt)',
    value: 'madpurBelt',
    category: ['instant'],
    desc: '疯狂紫腰带效果。'
  },
  {
    label: '火焰附身 (firePossession)',
    value: 'firePossession',
    category: ['instant'],
    desc: '火焰附身效果。'
  },
  {
    label: '弹墙王受击 (bwallKingUnder)',
    value: 'bwallKingUnder',
    category: ['instant'],
    desc: '弹墙王受击效果。'
  },
  {
    label: '弹墙战斗受击 (bwallFightUnder)',
    value: 'bwallFightUnder',
    category: ['instant'],
    desc: '弹墙战斗受击效果。'
  },
  {
    label: '获取地图区域 (getMapRect)',
    value: 'getMapRect',
    category: ['instant'],
    desc: '获取地图区域信息。'
  },
  {
    label: '我死亡 (meToDie)',
    value: 'meToDie',
    category: ['instant'],
    desc: '自身死亡效果。'
  },
  {
    label: '召唤流星激光 (sumMeteOreLaser)',
    value: 'sumMeteOreLaser',
    category: ['instant'],
    desc: '召唤流星激光效果。'
  },
  {
    label: '流星激光死亡 (meteOreLaserDie)',
    value: 'meteOreLaserDie',
    category: ['instant'],
    desc: '流星激光死亡效果。'
  },
  {
    label: '地下谋杀杰 (underMurderous_jie)',
    value: 'underMurderous_jie',
    category: ['instant', 'state'],
    desc: '地下谋杀杰效果。'
  },
  {
    label: '真空杰 (vacuumJie)',
    value: 'vacuumJie',
    category: ['instant', 'state'],
    desc: '真空杰效果。'
  },
  {
    label: '真空杰链接 (vacuumJie_link)',
    value: 'vacuumJie_link',
    category: ['instant', 'state'],
    desc: '真空杰链接效果。'
  },
  {
    label: '武器速度杰 (armsSpeed_jie)',
    value: 'armsSpeed_jie',
    category: ['state'],
    desc: '武器速度杰效果。'
  },
  {
    label: '智慧怒气英雄 (wisdomAnger_hero)',
    value: 'wisdomAnger_hero',
    category: ['instant', 'state'],
    desc: '智慧怒气英雄效果。'
  },
  {
    label: '伤害增加樱 (hurtAddYing)',
    value: 'hurtAddYing',
    category: ['state'],
    desc: '樱的伤害增加效果。'
  },
  {
    label: '无尽增益 (unendBuff)',
    value: 'unendBuff',
    category: ['state'],
    desc: '无尽增益效果。'
  },
  {
    label: '大圣技能 (greatSageSkill)',
    value: 'greatSageSkill',
    category: ['instant'],
    desc: '齐天大圣技能效果。'
  },
  {
    label: '设置时间速度 (setTimeSpeed)',
    value: 'setTimeSpeed',
    category: ['instant'],
    desc: '设置时间流逝速度。'
  },
  {
    label: '快速敌人 (fastEnemy)',
    value: 'fastEnemy',
    category: ['instant'],
    desc: '加速敌人效果。'
  },
  {
    label: '锁定敌人区域 (lockEnemyRect)',
    value: 'lockEnemyRect',
    category: ['instant'],
    desc: '锁定敌人所在区域。'
  },
  {
    label: '设置等级数字 (setLevelNumber)',
    value: 'setLevelNumber',
    category: ['instant'],
    desc: '设置等级数字。'
  },
  {
    label: '改变部件 (changePart)',
    value: 'changePart',
    category: ['instant'],
    desc: '改变单位部件。'
  },
  {
    label: '复制部件目标 (copyPartByTarget)',
    value: 'copyPartByTarget',
    category: ['instant'],
    desc: '复制目标的部件。'
  },
  {
    label: '停止播放标签 (stopAndPlayLabel)',
    value: 'stopAndPlayLabel',
    category: ['instant', 'state'],
    desc: '停止并播放指定动画标签。'
  },
  {
    label: '世界180 (world180)',
    value: 'world180',
    category: ['instant'],
    desc: '世界翻转180度效果。'
  },
  {
    label: '交换屏幕比例 (swapScreenScale)',
    value: 'swapScreenScale',
    category: ['instant'],
    desc: '交换屏幕比例效果。'
  },
  {
    label: '视野覆盖 (sightCover)',
    value: 'sightCover',
    category: ['instant'],
    desc: '视野覆盖效果。'
  },
  {
    label: '不能移动 (cantMove)',
    value: 'cantMove',
    category: ['state'],
    desc: '无法移动状态。'
  },
  {
    label: '时间胶囊 (timeCapsule)',
    value: 'timeCapsule',
    category: ['state'],
    desc: '时间胶囊效果。'
  },
  {
    label: '丢失控制 (lostCtrl)',
    value: 'lostCtrl',
    category: ['state'],
    desc: '失去控制状态。'
  },
  {
    label: '时间结束击杀我 (killMeTimeOver)',
    value: 'killMeTimeOver',
    category: ['state'],
    desc: '时间结束时击杀自身。'
  },
  {
    label: '刀刃技能 (bladeSkill)',
    value: 'bladeSkill',
    category: ['state'],
    desc: '刀刃技能效果。'
  },
  {
    label: '雪影技能 (snowShadowSkill)',
    value: 'snowShadowSkill',
    category: ['state'],
    desc: '雪影技能效果。'
  },
  {
    label: '阎罗技能 (yanluoSkill)',
    value: 'yanluoSkill',
    category: ['state'],
    desc: '阎罗技能效果。'
  },
  {
    label: '疯裤子 (yaMadPants)',
    value: 'yaMadPants',
    category: ['state'],
    desc: '疯裤子效果。'
  },
  {
    label: '跳跃自动神 (jumpAutoGod)',
    value: 'jumpAutoGod',
    category: ['state'],
    desc: '跳跃自动神效果。'
  },
  {
    label: '跳跃自动 (jumpAuto)',
    value: 'jumpAuto',
    category: ['state'],
    desc: '跳跃自动效果。'
  },
  {
    label: '反弹墙全部伤害 (bwallAllHurt)',
    value: 'bwallAllHurt',
    category: ['state'],
    desc: '反弹墙承受全部伤害。'
  },
  {
    label: '工艺子弹伤害倍率 (craftBulletHurtMul)',
    value: 'craftBulletHurtMul',
    category: ['state'],
    desc: '工艺子弹伤害倍率。'
  },
  {
    label: '矿石激光 (OreLaser)',
    value: 'OreLaser',
    category: ['state'],
    desc: '矿石激光效果。'
  },
  {
    label: '矿石锯增益 (OreSawBuff)',
    value: 'OreSawBuff',
    category: ['state'],
    desc: '矿石锯增益效果。'
  },
  {
    label: '矿石锥增益 (OreTaperBuff)',
    value: 'OreTaperBuff',
    category: ['state'],
    desc: '矿石锥增益效果。'
  },
  {
    label: '召唤我的锯 (sumMeSaw)',
    value: 'sumMeSaw',
    category: ['state'],
    desc: '召唤自己的锯。'
  },
  {
    label: '矿工僵尸增益 (MinersZombieBuff)',
    value: 'MinersZombieBuff',
    category: ['state'],
    desc: '矿工僵尸增益效果。'
  },
  {
    label: '矿工冲刺命中 (minersSprintHit)',
    value: 'minersSprintHit',
    category: ['state'],
    desc: '矿工冲刺命中效果。'
  },
  {
    label: '治疗无限 (healerBoundless)',
    value: 'healerBoundless',
    category: ['state'],
    desc: '治疗无限效果。'
  },
  {
    label: '爪子连击 (clawsCombo)',
    value: 'clawsCombo',
    category: ['state'],
    desc: '爪子连击效果。'
  },
  {
    label: '爪子震动 (clawsShake)',
    value: 'clawsShake',
    category: ['state'],
    desc: '爪子震动效果。'
  },
  {
    label: '双僵尸旋转 (DoubleZombieRotate)',
    value: 'DoubleZombieRotate',
    category: ['state'],
    desc: '双僵尸旋转效果。'
  },
  {
    label: '双僵尸霰弹 (DoubleZombieShotgun)',
    value: 'DoubleZombieShotgun',
    category: ['state'],
    desc: '双僵尸霰弹效果。'
  },
  {
    label: '双僵尸震动 (DoubleZombieShake)',
    value: 'DoubleZombieShake',
    category: ['state'],
    desc: '双僵尸震动效果。'
  },
  {
    label: '卡片无攻击技能 (cardNoAttackSkill)',
    value: 'cardNoAttackSkill',
    category: ['state'],
    desc: '卡片无攻击技能效果。'
  },
  {
    label: '相同隐身 (sameInvi)',
    value: 'sameInvi',
    category: ['state'],
    desc: '相同隐身效果。'
  },
  {
    label: '雾防御 (FoggyDefence)',
    value: 'FoggyDefence',
    category: ['instant', 'state'],
    desc: '雾中防御效果。'
  },
  {
    label: 'Ore炸弹 (OreBomb)',
    value: 'OreBomb',
    category: ['instant', 'state'],
    desc: 'Ore炸弹效果。'
  },
  {
    label: '删除攻击铁 (clearAttackIron)',
    value: 'clearAttackIron',
    category: ['instant'],
    desc: '清除攻击铁效果。'
  },
  {
    label: '清除敌人跟随子弹 (clearEnemyFollowBullet)',
    value: 'clearEnemyFollowBullet',
    category: ['instant'],
    desc: '清除敌人跟随子弹。'
  },
  {
    label: '清除气体看门鹰 (clearGas_WatchEagle)',
    value: 'clearGas_WatchEagle',
    category: ['instant'],
    desc: '清除看门鹰气体。'
  },
  {
    label: '清除伤害倍率 (clearHurtMul)',
    value: 'clearHurtMul',
    category: ['instant'],
    desc: '清除伤害倍率。'
  },
  {
    label: '从伤害比例移动 (toMoveFromHurtRa)',
    value: 'toMoveFromHurtRa',
    category: ['instant'],
    desc: '根据伤害比例移动。'
  },
  {
    label: '攻击铁 (betHit)',
    value: 'betHit',
    category: ['instant'],
    desc: '攻击铁效果。'
  },
  {
    label: '肉背子弹命中 (MeatyBackBulletHit)',
    value: 'MeatyBackBulletHit',
    category: ['instant'],
    desc: '肉背子弹命中效果。'
  },
  {
    label: '肉盾子弹命中 (MeatyShieldBulletHit)',
    value: 'MeatyShieldBulletHit',
    category: ['instant'],
    desc: '肉盾子弹命中效果。'
  },
  {
    label: '骷髅魔杖命中 (skeletonWandHit)',
    value: 'skeletonWandHit',
    category: ['instant'],
    desc: '骷髅魔杖命中效果。'
  },
  {
    label: '末日部件死亡 (LastdayPartDie)',
    value: 'LastdayPartDie',
    category: ['instant'],
    desc: '末日部件死亡效果。'
  },
  {
    label: '骷髅S子弹死亡 (BoomSkullSBulletDie)',
    value: 'BoomSkullSBulletDie',
    category: ['instant'],
    desc: '骷髅S子弹死亡效果。'
  },
  {
    label: '球状闪电受击 (BallLightningUnder)',
    value: 'BallLightningUnder',
    category: ['instant'],
    desc: '球状闪电受击效果。'
  },
  {
    label: '飞龙球 (FlyDragonBall)',
    value: 'FlyDragonBall',
    category: ['instant'],
    desc: '飞龙球效果。'
  },
  {
    label: '高钻命中 (highDrillHit)',
    value: 'highDrillHit',
    category: ['instant'],
    desc: '高钻命中效果。'
  },
  {
    label: '雪胖冲刺命中 (SnowFattySprintHit)',
    value: 'SnowFattySprintHit',
    category: ['instant'],
    desc: '雪胖冲刺命中效果。'
  },
  {
    label: '蜗牛王绿洲 (Triceratops_oasis)',
    value: 'Triceratops_oasis',
    category: ['instant'],
    desc: '三角龙绿洲效果。'
  },
  {
    label: '钩子女巫载具 (HookWitchVehicle)',
    value: 'HookWitchVehicle',
    category: ['instant'],
    desc: '钩子女巫载具效果。'
  },
  {
    label: '青年狼受击 (YouthWolfUnder)',
    value: 'YouthWolfUnder',
    category: ['instant'],
    desc: '青年狼受击效果。'
  },
  {
    label: '铁狗增益 (IronDogBuff)',
    value: 'IronDogBuff',
    category: ['state'],
    desc: '铁狗增益效果。'
  },
  {
    label: '铁狗普通图像 (IronDogNormalImg)',
    value: 'IronDogNormalImg',
    category: ['state'],
    desc: '铁狗普通图像效果。'
  },
  {
    label: '卧龙缩放 (scaleWolong)',
    value: 'scaleWolong',
    category: ['state'],
    desc: '卧龙缩放效果。'
  },
  {
    label: '钩子装置阎罗 (hookDeviceYanluo)',
    value: 'hookDeviceYanluo',
    category: ['state'],
    desc: '钩子装置阎罗效果。'
  },
  {
    label: '泡泡死亡 (bubblesDie)',
    value: 'bubblesDie',
    category: ['instant'],
    desc: '泡泡死亡效果。'
  },
  {
    label: '泡泡去阵营 (bubblesGotoCamp)',
    value: 'bubblesGotoCamp',
    category: ['instant'],
    desc: '泡泡去阵营效果。'
  },
  {
    label: '附身英雄 (possession_hero)',
    value: 'possession_hero',
    category: ['instant'],
    desc: '英雄附身效果。'
  },
  {
    label: '暴露英雄 (bullying_hero)',
    value: 'bullying_hero',
    category: ['instant'],
    desc: '英雄暴露效果。'
  },
  {
    label: '风骚英雄 (coquettish_hero)',
    value: 'coquettish_hero',
    category: ['instant'],
    desc: '风骚英雄效果。'
  },
  {
    label: '魅惑 (charm)',
    value: 'charm',
    category: ['instant'],
    desc: '魅惑效果。'
  },
  {
    label: '普通魅惑 (charmNormal)',
    value: 'charmNormal',
    category: ['instant'],
    desc: '普通魅惑效果。'
  },
  {
    label: '伤害增加爱 (hurtAddByLove)',
    value: 'hurtAddByLove',
    category: ['instant'],
    desc: '爱增加伤害效果。'
  },
  {
    label: '伤害来自子级 (hurtFromChild)',
    value: 'hurtFromChild',
    category: ['instant'],
    desc: '伤害来自子级效果。'
  },
  {
    label: '伤害来自子级锁定 (hurtFromChildLock)',
    value: 'hurtFromChildLock',
    category: ['instant'],
    desc: '伤害来自子级锁定效果。'
  },
  {
    label: '伤害子级锁定目标停止 (hurtFromChildLockTargetStop)',
    value: 'hurtFromChildLockTargetStop',
    category: ['instant'],
    desc: '伤害子级锁定目标停止效果。'
  },
  {
    label: '伤害子级锁定效果 (hurtFromChildLockEffect)',
    value: 'hurtFromChildLockEffect',
    category: ['instant'],
    desc: '伤害子级锁定效果。'
  },
  {
    label: '伤害子级锁定命中点效果 (hurtFromChildLockAndHurtTargetPointEffect)',
    value: 'hurtFromChildLockAndHurtTargetPointEffect',
    category: ['instant'],
    desc: '伤害子级锁定并命中点效果。'
  },
  {
    label: '魅杀不死事件 (seckill)',
    value: 'seckill',
    category: ['instant'],
    desc: '魅杀不死事件效果。'
  },
  {
    label: '兽人创造物品 (orcCreateThings)',
    value: 'orcCreateThings',
    category: ['instant'],
    desc: '兽人创造物品效果。'
  },
  {
    label: '击杀到蛇尾 (killToSnakeTail)',
    value: 'killToSnakeTail',
    category: ['instant'],
    desc: '击杀到蛇尾效果。'
  },
  {
    label: '死亡蛇尾 (dieSnakeTail)',
    value: 'dieSnakeTail',
    category: ['instant'],
    desc: '死亡蛇尾效果。'
  },
  {
    label: 'UI蛇尾 (uiSnakeTail)',
    value: 'uiSnakeTail',
    category: ['instant'],
    desc: 'UI蛇尾效果。'
  },
  {
    label: '传送骷髅S (teleport_BoomSkullS)',
    value: 'teleport_BoomSkullS',
    category: ['state'],
    desc: '传送骷髅S效果。'
  },
  {
    label: '地下弩雪地兵 (underCrossbow_SnowSoldiers)',
    value: 'underCrossbow_SnowSoldiers',
    category: ['state'],
    desc: '地下弩雪地兵效果。'
  },
  {
    label: '地下看门狗 (underWatchdog)',
    value: 'underWatchdog',
    category: ['state'],
    desc: '地下看门狗效果。'
  },
  {
    label: '受击倍率并倍率 (underHurtMulAndMul)',
    value: 'underHurtMulAndMul',
    category: ['state'],
    desc: '受击倍率并倍率效果。'
  },
  {
    label: '受击倍率最大 (underHurtMulMax)',
    value: 'underHurtMulMax',
    category: ['state'],
    desc: '受击倍率最大效果。'
  },
  {
    label: '武器敏感 (armsSensitive)',
    value: 'armsSensitive',
    category: ['state'],
    desc: '武器敏感效果。'
  },
  {
    label: '其他敏感 (otherSensitive)',
    value: 'otherSensitive',
    category: ['state'],
    desc: '其他敏感效果。'
  },
  {
    label: '红色武器敏感 (redArmsSensitive)',
    value: 'redArmsSensitive',
    category: ['state'],
    desc: '红色武器敏感效果。'
  },
  {
    label: '手敏感 (handSensitive)',
    value: 'handSensitive',
    category: ['state'],
    desc: '手敏感效果。'
  },
  {
    label: '武器敏感2 (weaponSensitive)',
    value: 'weaponSensitive',
    category: ['state'],
    desc: '武器敏感2效果。'
  },
  {
    label: '载具敏感 (vehicleSensitive)',
    value: 'vehicleSensitive',
    category: ['state'],
    desc: '载具敏感效果。'
  },
  {
    label: '宠物敏感 (petSensitive)',
    value: 'petSensitive',
    category: ['state'],
    desc: '宠物敏感效果。'
  },
  {
    label: '治疗者盾敏感 (healerShieldSensitive)',
    value: 'healerShieldSensitive',
    category: ['state'],
    desc: '治疗者盾敏感效果。'
  },
  {
    label: '敌人光 (groupLight_enemy)',
    value: 'groupLight_enemy',
    category: ['state'],
    desc: '敌人光效果。'
  },
  {
    label: '无尽敌人通过 (boundless_enemy_pass)',
    value: 'boundless_enemy_pass',
    category: ['state'],
    desc: '无尽敌人通过效果。'
  },
  {
    label: '猩红武器 (redArms)',
    value: 'redArms',
    category: ['state'],
    desc: '猩红武器效果（此效果在列表中尚未定义）'
  },
  {
    label: '掉落增加生命 (dropAddLife)',
    value: 'dropAddLife',
    category: ['state'],
    desc: '掉落增加生命效果。'
  },
  {
    label: '当前 (current)',
    value: 'current',
    category: ['state'],
    desc: '当前效果。'
  },
  {
    label: '友方传送雪地兵 (teleport_SnowSoldiers)',
    value: 'teleport_SnowSoldiers',
    category: ['state'],
    desc: '友方传送雪地兵效果。'
  },
  {
    label: 'UAV鹰 (uavYing)',
    value: 'uavYing',
    category: ['state'],
    desc: 'UAV鹰效果。'
  },
  {
    label: '更多UAV (moreUav)',
    value: 'moreUav',
    category: ['state'],
    desc: '更多UAV效果。'
  },
  {
    label: '处理UAV (dealUav)',
    value: 'dealUav',
    category: ['state'],
    desc: '处理UAV效果。'
  },
  {
    label: '火蜥蜴泡泡 (Salamander_bubbles)',
    value: 'Salamander_bubbles',
    category: ['instant'],
    desc: '火蜥蜴泡泡效果。'
  },
  {
    label: '黑洞恶魔 (blackHoleDemon)',
    value: 'blackHoleDemon',
    category: ['instant'],
    desc: '黑洞恶魔效果。'
  },
  {
    label: '黑洞装置 (blackHoleDevicer)',
    value: 'blackHoleDevicer',
    category: ['instant'],
    desc: '黑洞装置效果。'
  },
  {
    label: '黑洞装置S (blackHoleDevicerS)',
    value: 'blackHoleDevicerS',
    category: ['instant'],
    desc: '黑洞装置S效果。'
  },
  {
    label: '首领传送 (bossTransfer)',
    value: 'bossTransfer',
    category: ['instant'],
    desc: '首领传送效果。'
  },
  {
    label: '子弹连击 (bullet_combo)',
    value: 'bullet_combo',
    category: ['instant'],
    desc: '子弹连击效果。'
  },
  {
    label: '子弹点效果 (bullet_pointEF)',
    value: 'bullet_pointEF',
    category: ['instant'],
    desc: '子弹点效果。'
  },
  {
    label: '元素绿 (elementsGreen)',
    value: 'elementsGreen',
    category: ['instant'],
    desc: '元素绿效果。'
  },
  {
    label: '巨毒尸隐身 (hidingB_hugePosion)',
    value: 'hidingB_hugePosion',
    category: ['state'],
    desc: '巨毒尸隐身效果。'
  },
  {
    label: '生命链接狼 (lifeLink_wolf)',
    value: 'lifeLink_wolf',
    category: ['state'],
    desc: '生命链接狼效果。'
  },
  {
    label: '闪电塔闪电 (lightningTower_lightning)',
    value: 'lightningTower_lightning',
    category: ['instant'],
    desc: '闪电塔闪电效果。'
  },
  {
    label: '闪电神武器技能 (lightning_godArmsSkill)',
    value: 'lightning_godArmsSkill',
    category: ['instant'],
    desc: '闪电神武器技能效果。'
  },
  {
    label: '导弹哨兵 (missile_Sentry)',
    value: 'missile_Sentry',
    category: ['instant'],
    desc: '导弹哨兵效果。'
  },
  {
    label: '无地下飞行命中 (noUnderFlyHit)',
    value: 'noUnderFlyHit',
    category: ['state'],
    desc: '无地下飞行命中效果。'
  },
  {
    label: '无地下命中 (noUnderHitB)',
    value: 'noUnderHitB',
    category: ['state'],
    desc: '无地下命中效果。'
  },
  {
    label: '幻影装置 (phantomDevice)',
    value: 'phantomDevice',
    category: ['instant'],
    desc: '幻影装置效果。'
  },
  {
    label: '紫金石狐狸 (purgoldFox)',
    value: 'purgoldFox',
    category: ['instant'],
    desc: '紫金石狐狸效果。'
  },
  {
    label: '紫金石臭鼬链接 (purgoldSkunkLink)',
    value: 'purgoldSkunkLink',
    category: ['instant'],
    desc: '紫金石臭鼬链接效果。'
  },
  {
    label: '减少容量 (reduceCapacity)',
    value: 'reduceCapacity',
    category: ['instant'],
    desc: '减少容量效果。'
  },
  {
    label: '牺牲巅峰 (sacrifice_peak)',
    value: 'sacrifice_peak',
    category: ['instant'],
    desc: '牺牲巅峰效果。'
  },
  {
    label: '吞噬 (devour)',
    value: 'devour',
    category: ['instant'],
    desc: '吞噬效果。'
  },
  {
    label: '载具适配 (vehicleFit)',
    value: 'vehicleFit',
    category: ['state'],
    desc: '载具适配效果。'
  },
  {
    label: '武器EMP (weaponEmp)',
    value: 'weaponEmp',
    category: ['instant'],
    desc: '武器EMP效果。'
  },
  {
    label: '年武器击杀 (yearArmsKill)',
    value: 'yearArmsKill',
    category: ['instant'],
    desc: '年武器击杀效果。'
  },
  {
    label: '删除 (toDel)',
    value: 'toDel',
    category: ['instant'],
    desc: '删除效果。'
  },
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
  },
  {
    label: '建筑 (building)',
    value: 'building'
  },
  {
    label: '载具 (vehicle)',
    value: 'vehicle'
  },
  {
    label: '子弹 (bullet)',
    value: 'bullet'
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
  },
  {
    label: '技能/陷阱 (skill)',
    value: 'skill'
  },
  {
    label: '宠物 (pet)',
    value: 'pet'
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
    label: 'P1释放 (puMainPlayer)',
    value: 'puMainPlayer',
    desc: '释放者是P1。'
  },
  {
    label: '友方释放 (puWe)',
    value: 'puWe',
    desc: '释放者为非敌方阵营。'
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
    注意 0.5 会受 0.8~1.2 的随机系数影响，即实际为 0.4~0.6; conditionRange 会受 0.9~1.1 的随机系数影响。刷新游戏重置上述随机数。
    若释放者攻击 ai 处于 eacapeAndHidingB 并且血量小于血量阈值，视为满足条件; 
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
    label: '修罗虚天 (isDemon3OrUnend)',
    value: 'isDemon3OrUnend',
    desc: '修罗（独战、冷门、决斗）模式中，或虚天塔中。'
  },
  {
    label: '排除决斗 (noDemonOnlyBoss)',
    value: 'noDemonOnlyBoss',
    desc: '修罗决斗模式中不生效。'
  },
  {
    label: '排除主线 (noMainTask)',
    value: 'noMainTask',
    desc: '主线任务中不生效。'
  },
  {
    label: '排除困难模式 (noHardB)',
    value: 'noHardB',
    desc: '困难模式中不生效。'
  },
  {
    label: '排除争霸 (noUnionBattle)',
    value: 'noUnionBattle',
    desc: '争霸模式中不生效。'
  },
  {
    label: '排除虚天塔 (noUnendLevelB)',
    value: 'noUnendLevelB',
    desc: '虚天塔中不生效。'
  },
  {
    label: '最大生命值不生效 (noSkillNoTargetMaxLifeB)',
    value: 'noSkillNoTargetMaxLifeB',
    desc: '技能最大生命值相关效果不生效。'
  },

  {
    label: '天数判断 (dayPan)',
    value: 'dayPan',
    desc: '只有在一周内的特定天数可以使用。\n需配合 conditionRange 输入天数 (1-7, 周一-周日)。'
  },
  {
    label: '生肖限制 (yearArmsFalse)',
    value: 'yearArmsFalse',
    desc: '仅于当天生肖效果未使用时可以生效。'
  },
  {
    label: '复仇计数器 (revengeLingHurtLess)',
    value: 'revengeLingHurtLess',
    desc: '目标的复仇计数器小于该技能 secMul 时可以生效。'
  },
  {
    label: '排除封锁 (targetArmsNoMeltFlamerPurgold)',
    value: 'targetArmsNoMeltFlamerPurgold',
    desc: `1. 携带武器或本身具有化锁技能 (meltFlamerPurgold); 2. 具有车卷风技能 (redMoto3Skill); 3. 造成伤害的武器是闪电极源，且目标是携带先锋盾的小白时：
    以上条件满足任意一条时，本技能效果不生效。`
  },

  {
    label: '步枪 (rifle)',
    value: 'rifle',
    desc: '触发武器为步枪。'
  },
  {
    label: '狙击 (sniper)',
    value: 'sniper',
    desc: '触发武器为狙击。'
  },
  {
    label: '散弹 (shotgun)',
    value: 'shotgun',
    desc: '触发武器为散弹。'
  },
  {
    label: '手枪 (pistol)',
    value: 'pistol',
    desc: '触发武器为手枪。'
  },
  {
    label: '火炮 (rocket)',
    value: 'rocket',
    desc: '触发武器为火炮。'
  },
  {
    label: '弩 (crossbow)',
    value: 'crossbow',
    desc: '触发武器为弩。'
  },
  {
    label: '喷火器 (flamer)',
    value: 'flamer',
    desc: '触发武器为喷火器。'
  },
  {
    label: '敬请期待 (under_development)',
    value: 'under_development',
    desc: '仍有部分条件较为零散、整理不易，敬请期待未来更新补全。'
  },
]