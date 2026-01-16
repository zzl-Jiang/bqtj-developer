// client/src/views/Editor/configs/skillMeta.ts

export interface SkillMetaItem {
  key: string;
  label: string;
  type: 'string' | 'number' | 'select' | 'select_png' | 'switch';
  group: 'base' | 'logic' | 'flags';
  desc?: string;
  options?: { label: string; value: string; desc?: string }[];
  vIf?: (data: any) => boolean; 
}

export const CONDITION_OPTIONS_MAP: Record<string, {label: string, value: string, desc?: string}[]> = {
  // 当触发种类为“主动”时
  active: [
    { label: '无限制 (no)', value: 'no', desc: '无任何条件限制' },
    { label: '技能CD结束 (avtiveSkillCdOver)', value: 'avtiveSkillCdOver', desc: '当技能冷却完成时自动触发' },
    { label: '持续射击 (loopClick)', value: 'loopClick', desc: '持续按下开火键' },
    { label: '跳跃时 (heroJump)', value: 'heroJump', desc: '跳跃动作触发' },
    { label: '翻滚时 (rollKey)', value: 'rollKey', desc: '翻滚键触发' },
    { label: '下蹲时 (heroSquat)', value: 'heroSquat', desc: '下蹲状态触发' },
    { label: '切换武器 (swapArms)', value: 'swapArms', desc: '更换武器动作触发' },
  ],
  
  // 当触发种类为“被动”时
  passive: [
    { label: '无限制 (no)', value: 'no', desc: '无任何条件限制' },
    { label: '间隔触发 (interval)', value: 'interval', desc: '每隔一定时间自动尝试触发' },
    { label: '攻击命中 (hit)', value: 'hit', desc: '当自身攻击命中目标时' },
    { label: '受到伤害 (underAllHit)', value: 'underAllHit', desc: '当自身受到任意伤害时' },
    { label: '击杀目标 (killTarget)', value: 'killTarget', desc: '当自身击杀敌方单位时' },
    { label: '死亡时 (die)', value: 'die', desc: '当自身生命归零时' },
    { label: '濒死前 (beforeDie)', value: 'beforeDie', desc: '在受到致死伤害但尚未死亡时' },
    { label: '进入战场 (add)', value: 'add', desc: '技能/状态被添加到单位身上时立即触发' },
    { label: '使用技能时 (useSkill)', value: 'useSkill', desc: '当自身释放其他技能时触发' },
  ],
};

export const EFFECT_TYPE_OPTIONS = [
  // 通用
  {
    label: '无 (no)',
    value: 'no',
    category: ['instant', 'state', 'instantAndState'],
    desc: '无函数逻辑。请在左侧技能效果页选择效果类型查看更多函数选项。'
  },

  // 即时
  {
    label: '回复生命值 (life)',
    value: 'life',
    category: ['instant', 'instantAndState'],
    desc: `若数值 (value) 存在，回复 value * extraValue (可以为负) 数值生命;\n
    若首要倍率 (mul) 存在，回复 mul * extraValue (可以为负) 百分比生命;\n
    若 obj 存在且包含 pro 属性，有 pro 的概率额外回复 100% 生命。`
  },

  // 占位
  {
    label: '敬请期待',
    value: 'wait',
    category: ['instant', 'state', 'instantAndState'],
    desc: `由于游戏中存在效果种类众多，有待补充记录。\n
    暂时为了完成框架未进行整体填充。`
  }
];

export const TARGET_UI_META = [
  {
    key: 'target',
    label: '目标参照',
    type: 'select',
    options: [
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
      }
    ]
  },
  {
    key: 'chooseType',
    label: '选择模式',
    type: 'select',
    options: [
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
    ]
  },
  {
    key: 'camp',
    label: '目标阵营',
    type: 'select',
    options: [
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
    ]
  },
  {
    key: 'unitType',
    label: '单位类型',
    type: 'select',
    options: [
      {
        label: '小怪 (normal)',
        value: 'normal',
        desc: '小怪类型'
      },
      {
        label: '精英 (super)',
        value: 'super',
        desc: '精英类型'
      },
      {
        label: '首领 (boss)',
        value: 'boss',
        desc: '首领类型'
      }
    ]
  },
  {
    key: 'systemType',
    label: '单位大类',
    type: 'select',
    options: [
      {
        label: '近战 (normal)',
        value: 'normal',
        desc: '只选择近战单位'
      },
      {
        label: '持枪 (hero)',
        value: 'hero',
        desc: '只选择持枪单位'
      }
    ]
  },
  {
    key: 'limitNum',
    label: '限制数量',
    type: 'number'
  },
  {
    key: 'bodyName',
    label: '指定单位名',
    type: 'string',
    desc: '指定的单位英文ID'
  },
  {
    key: 'noMeB',
    label: '排除本体',
    type: 'switch'
  },
  {
    key: 'noMainB',
    label: '排除P1',
    type: 'switch'
  },
  {
    key: 'noExistB',
    label: '允许目标不存在',
    type: 'switch'
  },
  {
    key: 'targetMustLiveB',
    label: '目标必须存活',
    type: 'switch'
  },
  {
    key: 'arenaB',
    label: '竞技场有效',
    type: 'switch'
  }, // 注意这个默认是 true
  {
    key: 'noRaceType',
    label: '排除种族',
    type: 'select',
    options: [
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
    ]
  },
  {
    key: 'noVehicleB',
    label: '排除载具',
    type: 'switch'
  },
  {
    key: 'alert',
    label: '特殊类型',
    type: 'select',
    options: [
      {
        label: '附身 (possession_hero)',
        value: 'possession_hero',
        desc: '添加英雄技能附身判定'
      },
      {
        label: '附身友方 (wePossession)',
        value: 'wePossession',
        desc: '添加附身友方判定，参见火种'
      }
    ]
  },
];

export const SKILL_GROUPS = [
  { label: '基础信息', key: 'base' },
  { label: '战斗逻辑', key: 'logic' },
  { label: '状态标志', key: 'flags' },
  { label: '目标选择', key: 'target' },
  { label: '视觉资源', key: 'images' }
];

// 定义可选属性池（用户可以点击“添加”的属性）
export const OPTIONAL_PROPS = [
  { key: 'cdRandomRange', label: 'CD随机波动', type: 'number', group: 'time' },
  { key: 'firstCd', label: '初始CD', type: 'number', group: 'time' },
  { key: 'ignoreSilenceB', label: '无视沉默', type: 'switch', group: 'flag' },
  { key: 'ignoreImmunityB', label: '无视免疫', type: 'switch', group: 'flag' },
  { key: 'overlyingB', label: '允许叠加', type: 'switch', group: 'flag' },
  { key: 'summonedUnitsB', label: '召唤单位', type: 'switch', group: 'flag' },
  { key: 'changeHurtB', label: '修改伤害', type: 'switch', group: 'flag' },
  { key: 'mustLv', label: '等级需求', type: 'number', group: 'logic' },
];

export const SKILL_UI_META: SkillMetaItem[] = [
  // 基础信息
  {
    key: 'name',
    label: '技能ID (必填)',
    type: 'string',
    group: 'base'
  },
  {
    key: 'cnName',
    label: '显示名称 (可选)',
    type: 'string',
    group: 'base'
  },
  {
    key: 'iconUrl36',
    label: '图标URL (可选)',
    type: 'select_png',
    group: 'base'
  },

  // 战斗逻辑
  {
    key: 'conditionType',
    label: '触发种类',
    type: 'select',
    group: 'logic', 
    options: [
      {
        label:'被动',
        value:'passive'
      },
      {
        label:'主动',
        value:'active'
      }
    ]
  },
  {
    key: 'condition',
    label: '触发细则',
    type: 'select',
    group: 'logic'
  },

  // 主动技能必有 CD
  { 
    key: 'cd', 
    label: '冷却 (cd)', 
    type: 'number',
    group: 'logic',
    vIf: (s) => s.conditionType === 'active' 
  },
  { 
    key: 'firstCd', 
    label: '首次冷却 (firstCd)', 
    type: 'number',
    group: 'logic',
    vIf: (s) => s.conditionType === 'active' 
  },
  { 
    key: 'delay', 
    label: '前摇延迟 (delay)', 
    type: 'number',
    group: 'logic',
    vIf: (s) => s.conditionType === 'active' 
  },
  { 
    key: 'cdRandomRange', 
    label: '随机冷却增加 (cdRandomRange)', 
    type: 'number',
    group: 'logic',
    vIf: (s) => s.conditionType === 'active' 
  },
  { 
    key: 'continueNum', 
    label: '连续使用次数 (continueNum)', 
    type: 'number',
    group: 'logic',
    vIf: (s) => s.conditionType === 'active' 
  },

  // 只有被动且为 interval 时才显示 间隔频率
  { 
    key: 'intervalT', 
    label: '间隔频率', 
    type: 'number', 
    group: 'logic',
    vIf: (s) => s.condition === 'interval' 
  },

  {
    key: 'addType',
    label: '效果类型',
    type: 'select',
    group: 'logic',
    options: [
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
      }
    ]
  },

  {
    key: 'effectType',
    label: '效果函数 (effectType, 建议先选择效果类型)',
    type: 'select',
    group: 'logic'
  },
  {
    key: 'value',
    label: '数值 (value)',
    type: 'number',
    group: 'logic'
  },
  {
    key: 'mul',
    label: '倍率 (mul)',
    type: 'number',
    group: 'logic'
  },
  {
    key: 'secMul',
    label: '次要倍率 (secMul)',
    type: 'number',
    group: 'logic'
  },
  {
    key: 'minTriggerT',
    label: '最短触发间隔 (minTriggerT)',
    type: 'number',
    group: 'logic'
  },
  {
    key: 'firstTriggerT',
    label: '首次触发时间 (firstTriggerT)',
    type: 'number',
    group: 'logic',
    vIf: (s) => s.minTriggerT
  },
  {
    key: 'duration',
    label: '持续时间 (duration)',
    type: 'number',
    group: 'logic',
    vIf: (s) => s.addType === 'state' || s.addType === 'instantAndState' 
  },
  {
    key: 'doGap',
    label: '状态效果触发间隔 (doGap)',
    type: 'number',
    group: 'logic',
    vIf: (s) => s.addType === 'state' || s.addType === 'instantAndState' 
  },
  {
    key: 'range',
    label: '生效范围 (range)',
    type: 'number',
    group: 'logic'
  },
  {
    key: 'minRange',
    label: '最小生效范围 (minRange)',
    type: 'number',
    group: 'logic'
  },
  {
    key: 'extraValueType',
    label: '额外数值类型 (extraValueType)',
    type: 'select',
    group: 'logic',
    options: [
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
    ]
  },
  {
    key: 'noEffectLevelModel',
    label: '不生效模式 (noEffectLevelModel)',
    type: 'select',
    group: 'logic',
    options: [
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
    ]
  },
  {
    key: 'createByArmsTypePro',
    label: '武器类型概率模式 (createByArmsTypePro)',
    type: 'select',
    group: 'logic',
    options: [
      {
        label: '触发概率 (effectProArr)',
        value: 'effectProArr',
        desc: '技能触发概率按照武器类型后的修正'
      }
    ]
  },

  // 标志位
  { key: 'showInLifeBarB', label: '血条显示', type: 'switch', group: 'flags' },
  { key: 'ignoreSilenceB', label: '无视沉默', type: 'switch', group: 'flags' },
  { key: 'ignoreNoSkillB', label: '无视封锁', type: 'switch', group: 'flags' },
  { key: 'overlyingB', label: '允许叠加', type: 'switch', group: 'flags' },
  { key: 'noInClonedB', label: '禁止分身继承', type: 'switch', group: 'flags' },
  { key: 'noBeClearB', label: '不被清除', type: 'switch', group: 'flags' },
  { key: 'everNoClearB', label: '永不清除', type: 'switch', group: 'flags' },
  { key: 'summonedUnitsB', label: '召唤单位', type: 'switch', group: 'flags' },
  { key: 'changeHurtB', label: '修改原始伤害', type: 'switch', group: 'flags' },
  { key: 'noSkillDodgeB', label: '无视概率免疫', type: 'switch', group: 'flags' },
  { key: 'ignoreImmunityB', label: '无视技能免疫', type: 'switch', group: 'flags' },
  { key: 'noCopyB', label: '禁止复制', type: 'switch', group: 'flags' },
  { key: 'noRandomListB', label: '不进随机池', type: 'switch', group: 'flags' },
  { key: 'isDefenceB', label: '免疫伤害', type: 'switch', group: 'flags' },
  { key: 'isInvincibleB', label: '不可阻挡', type: 'switch', group: 'flags' },
  { key: 'noReStateB', label: '不反复触发', type: 'switch', group: 'flags' },
  { key: 'noCdMulB', label: '不受冷却加成', type: 'switch', group: 'flags' },
  { key: 'groundDieB', label: '落地效果消失', type: 'switch', group: 'flags' },
  { key: 'wantDescripB', label: '需求/显示描述', type: 'switch', group: 'flags' },
  { key: 'targetPointEffectB', label: '目标点生效', type: 'switch', group: 'flags' }
];