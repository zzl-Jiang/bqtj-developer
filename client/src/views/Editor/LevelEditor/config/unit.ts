// client/src/views/Editor/LevelEditor/config/unit.ts

export const UNIT_METAS = {
  // 基础身份
  basic: [
    {
      key: 'cnName',
      label: '中文名称 (cnName)',
      type: 'string',
      desc: '单位的显示名称'
    },
    {
      key: 'unitType',
      label: '单位类型 (unitType)',
      type: 'select',
      options: [
        {
          label: '普通 (normal)',
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
      ]
    },
    {
      key: 'num',
      label: '数量/权重 (num)',
      type: 'number',
      desc: '在 number 模式下为数量，pro 模式下为权重'
    },
  ],
  // 战斗数值倍率
  stats: [
    {
      key: 'lifeMul',
      label: '生命倍率 (lifeMul)',
      type: 'number'
    },
    {
      key: 'dpsMul',
      label: '伤害倍率 (dpsMul)',
      type: 'number'
    },
    {
      key: 'expMul',
      label: '经验倍率 (expMul)',
      type: 'number'
    },
    {
      key: 'coinMul',
      label: '银币倍率 (coinMul)',
      type: 'number'
    },
    {
      key: 'headHurtMul',
      label: '爆头伤害倍率 (headHurtMul)',
      type: 'number'
    },
    {
      key: 'dpsSpecielLabel',
      label: '基础伤害特殊标签 (dpsSpecielLabel)',
      type: 'select',
      options: [
        {
          label: 'p1 等级对应基础战力 (heroLvDps)',
          value: 'heroLvDps',
          desc: '当前 p1 角色等级对应的基础战斗力。'
        }
      ],
      desc: `别看了，这就是个单选题，没有写其他选项的逻辑。`
    },
    {
      key: 'skillArr',
      label: '附加技能列表 (skillArr)',
      type: 'multi_select',
      desc: `为当前单位额外附加的技能列表。
      支持自己定义的技能，因为我懒，暂时没写生成对应选项逻辑，需要自己手打一下。
      在多选框中输入数值、按下回车，即可创建对应选项。`
    },
    {
      key: 'armsRange',
      label: '武器列表 (armsRange)',
      type: 'multi_select',
      desc: `为当前单位限定携带的武器列表。
      支持自己定义的武器，因为我懒，暂时没写生成对应选项逻辑，需要自己手打一下。
      在多选框中输入数值、按下回车，即可创建对应选项。`
    },
  ],
  // AI 与逻辑
  logic: [
    {
      key: 'aiOrder',
      label: 'AI 指令 (aiOrder)',
      type: 'select',
      options: [
        { label: '无 AI (no)', value: 'no', desc: '原地站岗，不执行任何逻辑' },
        { label: '全图追击 (patrolGlobal)', value: 'patrolGlobal', desc: '默认警戒范围: 999999' },
        { label: '停止并禁用 (noAndStop)', value: 'noAndStop' },
        { label: '跟随点 (followPoint)', value: 'followPoint' },
        { label: '守点攻击 (followPointAttack)', value: 'followPointAttack', desc: '默认警戒范围: 600' },
        { label: '跟随目标 (followBody)', value: 'followBody' },
        { label: '追击攻击 (followBodyAttack)', value: 'followBodyAttack', desc: '默认警戒范围: 1000' },
        { label: '锁定攻击 (attackBody)', value: 'attackBody', desc: '默认警戒范围: 1000' },
        { label: '常规巡逻 (patrol)', value: 'patrol', desc: '默认警戒范围: 400' },
        { label: '区域巡逻 (patrolRange)', value: 'patrolRange' },
        { label: '掉落巡逻 (patrolDrop)', value: 'patrolDrop' },
        { label: '随机巡逻 (patrolRandom)', value: 'patrolRandom' },
        { label: '不攻击随机巡逻 (patrolRandomNoAttack)', value: 'patrolRandomNoAttack' },
        { label: '视距内随机巡逻 (patrolViewRandom)', value: 'patrolViewRandom' },
        { label: '地理固定 (geology)', value: 'geology' },
        { label: '仅搜敌 (onlyFindEnemy)', value: 'onlyFindEnemy' }
      ],
      desc: `AI 运行逻辑，最常用 patrolGlobal。
      支持参数格式，如 followBodyAttack:p1 表示追击玩家。
      需要参数支持时输入字符串后回车即可创建对应选项。`
    },
    {
      key: 'levelSetting',
      label: '关卡特定配置 (levelSetting)',
      type: 'string',
      desc: `只有以下输入可以生效: hero+x，其中 x 为任意整数值。
      表示单位等级 = 当前 p1 等级 + x。
      毕竟需要配合手动输入，我就不设置成选择了，自己输以下就行。`
    },
    {
      key: 'warningRange',
      label: '警戒范围 (warningRange)',
      type: 'number',
      desc: `单位发现敌人并索敌的距离。
      如果不填写，系统将根据 AI 指令自动分配默认值：
      - patrol: 400
      - followPointAttack: 600
      - attackBody / followBodyAttack: 1000
      - patrolGlobal: 999999
      - 其他默认为: 600`
    },
    {
      key: 'dieGotoState',
      label: '死亡方式 (dieGotoState)',
      type: 'select',
      options: [
        {
          label: '正常 (die)',
          value: 'die',
          desc: '默认方式，可以不设置。'
        },
        {
          label: '跪地 (stru)',
          value: 'stru',
          desc: '跪地死亡，角色专属。'
        }
      ]
    },
    {
      key: 'dropLabel',
      label: '掉落标签 (dropLabel)',
      type: 'string',
      desc: `这玩意好复杂，不用管或者单纯填 no 就行。
      否则需要 obj 形式的字符串，我又不能让用户手动填写，就要做一个新的 ui 可视化编辑界面。
      太麻烦了，而且经过初步测试这个属性是没法在开发者控制掉落的。
      不专门写处理逻辑了，整几个简要示例:
      "{'type':'arms','type2':'now'}" / "{'type':'things','name':'skillStone','num':4}"。
      注意 type 只能为 arms / things，好像理论上也可以为 trueBoss / treasure 但是没有相关调用。`
    },
    {
      key: 'avtiveSkillCdOverT',
      label: '主动技能释放延迟 (avtiveSkillCdOverT)',
      type: 'number',
      desc: '一般用于释放技能慢、动画长的小怪。不会影响 cd。'
    },
  ],
  // 开关标志位
  flags: [
    {
      key: 'skillCloseB',
      label: '禁用原生技能 (skillCloseB)',
      type: 'switch',
      desc: '是否关闭自身基础技能 (不包括boss技能)。'
    },
    {
      key: 'onlyLevelSkillB',
      label: '仅限关卡技能 (onlyLevelSkillB)',
      type: 'switch',
      desc: '删除自身所有技能 (包括boss技能)。'
    },
    {
      key: 'extraTaskB',
      label: '副本技能 (extraTaskB)',
      type: 'switch',
      desc: '是否开启副本专属技能。'
    },
    {
      key: 'noSuperB',
      label: '禁止精英化 (noSuperB)',
      type: 'switch',
      desc: '不会随机成为精英怪。'
    },
    {
      key: 'noUnderHurtB',
      label: '不受伤害 (noUnderHurtB)',
      type: 'switch'
    },
    {
      key: 'eacapeB',
      label: '低血量逃跑 (eacapeB)',
      type: 'switch'
    },
  ]
};


/** 发兵组专用的 Meta 配置 */
export const GROUP_METAS = [
  {
    key: 'id',
    label: '发兵集 ID (id)',
    type: 'input',
    desc: '在该关卡内唯一的标识符，如 we1, enemy_1'
  },
  { 
    key: 'camp', 
    label: '阵营 (camp)', 
    type: 'select', 
    options: [
      {
        label: '敌方 (enemy)',
        value: 'enemy'
      },
      {
        label: '我方 (we)',
        value: 'we'
      }
    ],
    desc: '该组所有阵营设置。\n默认为 enemy。'
  },
  { 
    key: 'numberType', 
    label: '生成模式 (numberType)', 
    type: 'select', 
    options: [
      {
        label: '按数量 (number)',
        value: 'number',
        desc: '填多少就出多少个'
      },
      {
        label: '按权重 (pro)',
        value: 'pro',
        desc: '根据权重随机抽取'
      }
    ],
    desc: '按数量或按权重。\n默认按数量。'
  }
];

/** AI 指令专用的 Meta 配置 */
export const AI_ORDER_META = {
  key: 'aiOrder',
  label: '全局 AI 指令',
  type: 'select',
  options: UNIT_METAS.logic[0]?.options,
  desc: `设置该组所有单位默认执行的 AI 逻辑 ID，一般设置为 patrolGlobal 即可。
  大部分情况下全局配置只会定义该属性。
  也可按需添加其他属性，但务必明晰自己在做什么。`
};