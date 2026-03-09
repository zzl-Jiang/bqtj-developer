// client/src/views/Editor/LevelEditor/config/fields.ts
// 关卡编辑器字段配置统一导出

import type { LevelMetaItem } from './types';

// ==================== 基础字段配置 (原 basic.ts) ====================
export const LEVEL_BASIC_METAS: LevelMetaItem[] = [
  {
    key: 'name',
    label: '关卡 ID (name)',
    type: 'string',
    desc: '程序调用的内部 ID，建议使用英文和下划线，如 level_1。\n使用中文也是可以的，但是打字会比较麻烦。'
  },
  {
    key: 'cnName',
    label: '显示名称 (cnName)',
    type: 'string',
    desc: '在游戏界面上展示给玩家看的名称'
  },
  {
    key: 'descrip',
    label: '关卡描述 (descrip)',
    type: 'string',
    desc: '简介、特点或任意想写给玩家看的内容'
  },
  {
    key: 'sceneLabel',
    label: '场景标签 (sceneLabel)',
    type: 'string',
    desc: '基础场景名称，必须是游戏已有地图名的英文 id。'
  },
  // 复杂结构字段占位 - 实际编辑器使用 Section 组件
  {
    key: 'unitG',
    label: '单位配置 (unitG)',
    type: 'string',
    desc: '配置关卡中出现的怪物、友军等单位的发兵逻辑'
  },
  {
    key: 'eventG',
    label: '事件逻辑 (eventG)',
    type: 'string',
    desc: '定义关卡的触发条件和执行指令'
  },
  {
    key: 'rectG',
    label: '区域配置 (rectG)',
    type: 'string',
    desc: '定义地图上的矩形区域，用于触发事件等'
  },
];

// ==================== 信息字段配置 (原 info.ts) ====================
export const LEVEL_INFO_METAS: {
  runtime: LevelMetaItem[];
  restrictions: LevelMetaItem[];
  misc: LevelMetaItem[];
} = {
  // 基础运行逻辑
  runtime: [
    {
      key: 'enemyLv',
      label: '怪物等级 (enemyLv)',
      type: 'number',
      desc: '关卡内怪物的基础等级'
    },
    {
      key: 'diff',
      label: '难度系数 (diff)',
      type: 'number',
      desc: '默认为1'
    },
    {
      key: 'tm',
      label: '限时 (秒, tm)',
      type: 'number',
      desc: '默认为0，表示不限时'
    },
    {
      key: 'hb',
      label: '困难模式 (hb)',
      type: 'switch',
      desc: '是否开启困难模式'
    },
    {
      key: 'music',
      label: '背景音乐 (music)',
      type: 'string',
      desc: '只能用已有素材，一般别管就行'
    },
    {
      key: 'sightCover',
      label: '视野覆盖 (sightCover)',
      type: 'number',
      desc: `小视野遮罩。
      后可加命令 (order) hideSightCover 关闭遮罩`
    },
    {
      key: 'dropNoGravityTime',
      label: '掉落无重力时间',
      type: 'number',
      desc: '掉落物出现后几秒不再往下掉'
    },
  ],
  // 限制开关
  restrictions: [
    {
      key: 'noMoreB',
      label: '禁用所有额外项 (noMoreB)',
      type: 'switch',
      desc: '包括队友、尸宠'
    },
    {
      key: 'allMoreB',
      label: '允许所有额外项 (allMoreB)',
      type: 'switch',
      desc: '包括队友、尸宠'
    },
    {
      key: 'noPartnerB',
      label: '禁用队友 (noPartnerB)',
      type: 'switch'
    },
    {
      key: 'noPetB',
      label: '禁用尸宠',
      type: 'switch'
    },
    {
      key: 'noVehicleB',
      label: '禁用载具',
      type: 'switch'
    },
    {
      key: 'noPropsB',
      label: '禁用道具',
      type: 'switch'
    },
    {
      key: 'noDeviceB',
      label: '禁用装置',
      type: 'switch'
    },
    {
      key: 'dropSmallMapB',
      label: '小地图显示',
      type: 'switch',
      desc: '小地图显示掉落道具'
    },
    {
      key: 'noTreasureB',
      label: '禁止财宝',
      type: 'switch',
      desc: '禁止财宝僵尸生成'
    },
    {
      key: 'mustSingleB',
      label: '强制单人',
      type: 'switch'
    },
    {
      key: 'noAIB',
      label: '禁用AI',
      type: 'switch'
    },
    {
      key: 'firstLostB',
      label: '初始不可操作',
      type: 'switch',
      desc: `初始进入关卡时玩家无法操作。
      通常用以配合剧情演绎。
      后面需要加命令 (order) openInput 开启玩家操作`
    },
    {
      key: 'noRestartB',
      label: '禁止重新开始',
      type: 'switch'
    },
    {
      key: 'dumB',
      label: '非正式关卡 (dumB)',
      type: 'switch',
      desc: '该属性在预览模式下被引擎强制设为开启 (true)。\n由于 TempGetter 限制，无法在外部加载时关闭非正式模式设置。'
    },
    {
      key: 'overBackB',
      label: '返回界面 (overBackB)',
      type: 'switch',
      desc: '该属性在预览模式下被引擎强制设为开启 (true)。\n关卡结束后将返回原本界面。'
    }
  ],
  // 其他
  misc: [
    {
      key: 'overWarn',
      label: '结束警告 (overWarn)',
      type: 'string',
      desc: '点击退出关卡时弹窗警告'
    },
    {
      key: 'preBulletArr',
      label: '预加载子弹列表 (preBulletArr)',
      type: 'multi_select',
      desc: '需要提前预加载的子弹素材。\n在多选框中输入数值、按下回车，即可创建对应选项。'
    },
    {
      key: 'preSkillArr',
      label: '预加载技能列表',
      type: 'multi_select',
      desc: '需要提前预加载的技能素材。\n在多选框中输入数值、按下回车，即可创建对应选项。'
    },
    {
      key: 'p1ArmsArr',
      label: 'P1武器列表 (p1ArmsArr)',
      type: 'multi_select',
      desc: '强制指定P1玩家的武器列表。\n在多选框中输入数值、按下回车，即可创建对应选项。'
    },
    {
      key: 'p1ArmsT',
      label: 'P1武器类型 (p1ArmsT)',
      type: 'string',
      desc: `no: 无, copy: 复制玩家存档第一把武器的配置。`
    },
    {
      key: 'diy',
      label: '自定义逻辑 (diy)',
      type: 'string',
      desc: '非官方开发者白名单 ID 无法生效。引擎在加载时会清空此字段。'
    },
    {
      key: 'modeDiy',
      label: '自定义模式 (modeDiy)',
      type: 'select',
      options: [
        { label: 'death', value: 'death', desc: '待更新' },
        { label: 'unendSingle', value: 'unendSingle', desc: '虚天塔相关' },
        { label: 'unionPK', value: 'unionPK', desc: '军队竞技场相关' },
        { label: 'spaceCraft', value: 'spaceCraft', desc: '太空飞船' },
        { label: 'spaceSuit', value: 'spaceSuit', desc: '太空战斗' },
      ],
      desc: '不同模式有对应效果逻辑，还没研究，可自行探索。'
    },
  ]
};

// ==================== 单位字段配置 (原 unit.ts) ====================
export const LEVEL_UNIT_METAS = {
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
export const LEVEL_GROUP_METAS = [
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
export const LEVEL_AI_ORDER_META = {
  key: 'aiOrder',
  label: '全局 AI 指令',
  type: 'select',
  options: LEVEL_UNIT_METAS.logic[0]?.options,
  desc: `设置该组所有单位默认执行的 AI 逻辑 ID，一般设置为 patrolGlobal 即可。
  大部分情况下全局配置只会定义该属性。
  也可按需添加其他属性，但务必明晰自己在做什么。`
};

// ==================== 事件字段配置 (原 event.ts) ====================
export const LEVEL_EVENT_METAS = {
  /** 事件条件配置 */
  condition: [
    { key: 'delay', label: '延迟触发 (秒)', type: 'number', desc: '满足条件后延迟多久执行' },
    { key: 'doNumber', label: '执行次数', type: 'number', desc: '该事件总共可以触发多少次' },
    {
      key: 'orderChooseType',
      label: '指令选择模式',
      type: 'select',
      options: [
        { label: '全部执行', value: '' },
        { label: '随机执行一个 (randomOne)', value: 'randomOne' },
        { label: '按顺序执行一个 (sequenceOne)', value: 'sequenceOne' }
      ]
    },
    { key: 'extraText', label: '额外说明', type: 'string' }
  ],

  /** 比较符映射 */
  operator: [
    { label: '小于 (<)', value: 'less' },
    { label: '大于 (>)', value: 'greater' },
    { label: '等于 (=)', value: 'equal' }
  ],

  /** 条件类型列表 */
  conditionTypes: [
    {
      label: '敌人总数 (标准)',
      value: 'enemyNumber',
      group: '数量',
      desc: '统计场上所有敌军。注意：在某些特定地图或加速模式下，它的行为等同于"存活敌人数"。',
      example: 'enemyNumber:less_5 (少于5人时触发)',
      fields: ['op', 'compareValue']
    },
    {
      label: '敌人总数 (快速)',
      value: 'enemyNumberFast',
      group: '数量',
      desc: '统计存活敌军 + 死亡时间在0.7秒内的敌军。通常用于防止波次切换过快导致的断档。',
      fields: ['op', 'compareValue']
    },
    {
      label: '存活敌人数',
      value: 'liveEnemyNumber',
      group: '数量',
      desc: '仅统计血量 > 0 且未被标记为"不计入统计"的敌军。',
      fields: ['op', 'compareValue']
    },
    {
      label: '屏幕右侧敌人数',
      value: 'frontEnemyNumber',
      group: '数量',
      desc: '统计位于视野右侧边缘 400 像素以外的敌人，常用于太空模式判定。',
      fields: ['op', 'compareValue']
    },
    {
      label: '区域检测 (碰撞)',
      value: 'hitMapRect',
      group: '空间',
      desc: '检测指定单位的坐标中心点是否位于地图定义的矩形区域(Rect)内。',
      example: 'hitMapRect:r1;p1 (当p1进入区域r1时)',
      fields: ['rectId', 'bodyId']
    },
    {
      label: '单位间距',
      value: 'bodyGap',
      group: '空间',
      desc: '计算两个单位之间的直线距离（勾股定理）。',
      example: 'bodyGap:less_200;p1;boss (当p1距离boss小于200时)',
      fields: ['op', 'compareValue', 'bodyId', 'targetBodyId']
    },
    {
      label: '杀敌数对比',
      value: 'killEnemyNum',
      group: '状态',
      desc: '比较两个单位的杀敌数量。typeId设为 more(大于) 或 noMore(不大于)。',
      example: 'killEnemyNum:more;p1;p2 (当p1杀敌比p2多时)',
      fields: ['typeId', 'value', 'valueId']
    },
    {
      label: '对话状态',
      value: 'say',
      group: '状态',
      desc: '判断对话系统是否执行完毕。',
      example: 'say:listOver;s1 (当对话s1结束时)',
      fields: ['value']
    },
    {
      label: '掉落物数量',
      value: 'dropBodyLess',
      group: '状态',
      desc: '检测场上特定掉落物的剩余数量。当数量【少于】设定值时触发。常用于判定玩家捡起了某个任务物品。',
      example: 'dropBodyLess:addCoin_task;1 (捡起该物品时触发)',
      fields: ['typeId', 'value']
    },
    {
      label: '任务状态',
      value: 'task',
      group: '状态',
      desc: '检查指定任务的状态是否等于目标值。',
      example: 'task:state;now;complete (当前任务完成时)',
      fields: ['typeId', 'value', 'valueId']
    }
  ],

  /** 图像效果选项 */
  visualOrder: [
    { label: '添加天气 (addWeather)', value: 'addWeather', desc: '添加雨、炎热等天气。参数1:类型(rain/heat), 参数2:强度(0-10), 参数3:持续时间' },
    { label: '场景缩放 (sceneScale)', value: 'sceneScale', desc: '缩放整个游戏画面。参数1:倍率(如0.5为缩小一半)' },
    { label: '地图变黑 (mapToBlack)', value: 'mapToBlack', desc: '将地图色调平滑过渡到黑色' },
    { label: '地图恢复 (mapToNormal)', value: 'mapToNormal', desc: '恢复地图正常色调' },
    { label: '层级显示 (sceneMc:show)', value: 'sceneMc:show', desc: '显示特定的地图层。参数1:层级ID, 参数2:子元件名' },
    { label: '层级隐藏 (sceneMc:hide)', value: 'sceneMc:hide', desc: '隐藏特定的地图层。参数1:层级ID, 参数2:子元件名' },
    { label: '世界旋转180度 (roWorld180)', value: 'roWorld180', desc: '将画面完全颠倒' },
    { label: '添加通用特效 (addNormalEffect)', value: 'addNormalEffect', desc: '在指定点播放特效。参数1:路径, 参数2:坐标(x,y), 参数3:图层名' },
    { label: '清除所有子弹 (clearAllBullet)', value: 'clearAllBullet', desc: '清除场上所有子弹' },
    { label: '清除所有敌方子弹 (clearAllEnemyBullet)', value: 'clearAllEnemyBullet', desc: '清除场上所有敌方子弹' },
    { label: '隐藏视野遮罩 (hideSightCover)', value: 'hideSightCover', desc: '隐藏视野限制遮罩' },
    { label: '显示反向视野 (showInverSightCover)', value: 'showInverSightCover', desc: '显示反向视野遮罩' },
    { label: '显示倍率视野 (showMultiplySightCover)', value: 'showMultiplySightCover', desc: '显示倍率视野遮罩' },
  ],

  /** 系统与操作选项 */
  systemOrder: [
    { label: '剧情模式 (toPlotMode)', value: 'toPlotMode', desc: '隐藏UI，进入剧情对话模式' },
    { label: '打开输入 (openInput)', value: 'openInput', desc: '允许玩家控制角色' },
    { label: '关闭输入 (closeInput)', value: 'closeInput', desc: '禁止玩家控制角色（常用于过场）' },
    { label: '开启AI (setGamingAITrue)', value: 'setGamingAITrue', desc: '接管玩家角色，由AI控制' },
    { label: '关闭AI (setGamingAIFalse)', value: 'setGamingAIFalse', desc: '将控制权交还给玩家' },
    { label: '保存游戏 (save)', value: 'save', desc: '强制执行一次存档操作' },
    { label: '播放音乐 (playMusic)', value: 'playMusic', desc: '播放指定背景音乐' },
    { label: '播放音效 (playSound)', value: 'playSound', desc: '播放指定音效' },
    { label: '设置数值 (setNumber)', value: 'setNumber', desc: '设置关卡数值变量' },
    { label: '增加数值 (addNumber)', value: 'addNumber', desc: '增加关卡数值变量' },
    { label: '弹出提示 (alert)', value: 'alert', desc: '显示弹窗提示' },
    { label: '显示浮动提示 (tip)', value: 'tip', desc: '显示浮动文字提示' },
    { label: '设置DIY字符串 (setDiyString)', value: 'setDiyString', desc: '设置DIY自定义字符串' },
    { label: '删除事件组除我外 (delEventGroupExcludeMe)', value: 'delEventGroupExcludeMe', desc: '删除同一事件组中的其他事件' },
    { label: 'P1死亡 (deathP1Die)', value: 'deathP1Die', desc: '强制P1进入死亡状态' },
    { label: '测试死亡模式 (testDeath)', value: 'testDeath', desc: '开启测试死亡模式（仅本地有效）' },
    { label: '隐藏Boss血条 (hideBossLifeBar)', value: 'hideBossLifeBar', desc: '隐藏Boss血条UI' },
    { label: '添加触屏点击 (addTouch)', value: 'addTouch', desc: '添加触屏点击区域' },
    { label: '触屏出键 (keyTouchId)', value: 'keyTouchId', desc: '触发指定触屏区域的按键' },
  ],

  /** 群体与附身选项 */
  groupOrder: [
    { label: '附身至单位 (heroEverParasitic)', value: 'heroEverParasitic', desc: '玩家P1永久附身到指定ID的单位上' },
    { label: '取消附身 (clearHeroParasitic)', value: 'clearHeroParasitic', desc: 'P1脱离当前附身对象' },
    { label: '依据角色附身 (parasiticWeRolePan)', value: 'parasiticWeRolePan', desc: '根据关卡预设的角色自动附身' },
    { label: '所有队友死亡跪下 (allPartnerStru)', value: 'allPartnerStruNoStrikerWen', desc: '除P1外所有队友进入跪下动作' },
    { label: '所有队友重生 (allPartnerRebirth)', value: 'allPartnerRebirth', desc: '复活所有已阵亡的队友' },
    { label: '所有我方英雄重生 (allWeHeroRebirth)', value: 'allWeHeroRebirth', desc: '复活所有我方英雄' },
    { label: '恢复所有英雄头部 (recoverAllHeroHead)', value: 'recoverAllHeroHead', desc: '恢复所有英雄的头部显示' },
    { label: '所有英雄不受击 (allHeroNoUnderHit)', value: 'allHeroNoUnderHit', desc: '所有英雄进入不受击状态' },
    { label: '所有我方不受身 (allWeNoUnder)', value: 'allWeNoUnder', desc: '所有我方单位不受身' },
    { label: 'P2附身 (P2EverParasitic)', value: 'P2EverParasitic', desc: 'P2附身到指定单位' },
    { label: '永久附身 (everParasitic)', value: 'everParasitic', desc: '永久附身到指定单位' },
    { label: '我方禁用装备 (weAllHeroNoEquip)', value: 'weAllHeroNoEquip', desc: '我方所有英雄无法更换装备' },
    { label: '我方禁用射击 (weAllHeroNoShoot)', value: 'weAllHeroNoShoot', desc: '我方所有英雄无法射击' },
    { label: '我方禁用技能 (weAllHeroNoSkill)', value: 'weAllHeroNoSkill', desc: '我方所有英雄无法使用技能' },
    { label: '我方跟随Boss (weAllHeroFollowSumBoss)', value: 'weAllHeroFollowSumBoss', desc: '我方所有英雄跟随Boss' },
    { label: '我方全换武器 (allWeSwapAdd)', value: 'allWeSwapAdd', desc: '我方所有英雄切换武器' },
  ],

  /** 单位操作选项 */
  bodyOrder: [
    {
      label: 'AI 与 移动',
      type: 'group',
      key: 'group-ai',
      children: [
        { label: '跟随区域 (followPoint)', value: 'followPoint', desc: '让单位移动并跟随到指定区域(Rect)中心' },
        { label: '瞬间移动 (movePoint)', value: 'movePoint', desc: '瞬间将单位移动到坐标点，格式如: 466, 1180' },
        { label: '停止并清除状态 (stopAllClearState)', value: 'stopAllClearState', desc: '停止单位当前所有AI动作并清空Buff' },
        { label: '随机巡逻 (ai:patrolRandom)', value: 'ai:patrolRandom', desc: '单位在出生点附近随机移动' },
        { label: '锁定射击位置 (lockShootXY)', value: 'lockShootXY', desc: '单位瞄准并锁定特定坐标射击' },
        { label: '设置P1 (setP1)', value: 'setP1', desc: '设置P1玩家' },
        { label: '英雄隐藏坐标 (heroNoExistXY)', value: 'heroNoExistXY', desc: '英雄在指定坐标隐藏' },
        { label: '隐藏单位到地板 (bodyHideInFloorMc)', value: 'bodyHideInFloorMc', desc: '将单位隐藏在地板层下' },
        { label: '隐藏单位 (hideBody)', value: 'hideBody', desc: '隐藏指定单位' },
      ]
    },
    {
      label: '生命与生死',
      type: 'group',
      key: 'group-life',
      children: [
        { label: '重生 (rebirth)', value: 'rebirth', desc: '将已死亡或消失的单位在原位复活' },
        { label: '致死 (toDie)', value: 'toDie', desc: '让单位立即进入死亡状态' },
        { label: '直接删除 (toDel)', value: 'toDel', desc: '将单位直接从场上移除，不触发死亡动作' },
        { label: '跪地/受挫 (toStru)', value: 'toStru', desc: '让单位进入跪地挣扎状态' },
        { label: '变蛇尾死亡 (killToSnakeTailDie)', value: 'killToSnakeTailDie', desc: '单位变为蛇尾后死亡' },
        { label: '变蛇尾 (killToSnakeTail)', value: 'killToSnakeTail', desc: '单位变为蛇尾' },
      ]
    },
    {
      label: '技能与状态',
      type: 'group',
      key: 'group-skill',
      children: [
        { label: '添加技能 (addSkill)', value: 'addSkill', desc: '给单位增加一个技能' },
        { label: '添加并锁定技能 (addSkillLock)', value: 'addSkillLock', desc: '添加技能且玩家无法通过背包界面将其替换' },
        { label: '添加Buff (addState)', value: 'addState', desc: '添加状态，如: godHiding_things (无敌隐身)' },
        { label: '静默 (silence)', value: 'silence', desc: '禁止单位使用技能' },
        { label: '不受伤 (noUnderHurt)', value: 'noUnderHurt', desc: '单位进入不被攻击硬直或不受伤害状态' },
        { label: '移动速度倍率 (moveSpeedMul)', value: 'moveSpeedMul', desc: '调整移动速度，如: 0.3' },
        { label: '狂暴缺陷 (madDefect)', value: 'madDefect', desc: '狂暴缺陷状态' },
        { label: '狂暴缺陷击杀 (madDefectKill)', value: 'madDefectKill', desc: '狂暴缺陷击杀' },
      ]
    },
    {
      label: '外观与特效',
      type: 'group',
      key: 'group-visual',
      children: [
        { label: '隐藏 (noExist)', value: 'noExist', desc: '单位变得不可见' },
        { label: '更换头部素材 (changeHead)', value: 'changeHead', desc: '改变单位头部贴图，如: WenJie:head' },
        { label: '添加身上特效 (addEffectInBody)', value: 'addEffectInBody', desc: '在单位中心挂载特效' },
        { label: '翻转朝向 (flipToRight)', value: 'flipToRight', desc: '强制单位转向右侧' },
        { label: '更换部件 (changePart)', value: 'changePart', desc: '更换单位部件' },
        { label: '恢复英雄装备图 (restoreHeroEquipImg)', value: 'restoreHeroEquipImg', desc: '恢复英雄装备外观' },
      ]
    },
    {
      label: '武器与装备',
      type: 'group',
      key: 'group-arms',
      children: [
        { label: '仅保留武器 (onlyKeepArms)', value: 'onlyKeepArms', desc: '仅保留指定武器，移除其他装备' },
        { label: '武器编辑测试 (armsEditTest)', value: 'armsEditTest', desc: '武器编辑测试模式' },
        { label: '武器编辑23 (armsEdit23)', value: 'armsEdit23', desc: '武器编辑23模式' },
      ]
    }
  ],

  /** 关卡指令选项 */
  levelOrder: [
    { label: '创建单位 (createUnit)', value: 'createUnit', desc: '从指定发兵组创建单位。参数: 发兵组ID (如 enemy1, we1)' },
    { label: '创建掉落 (createDrop)', value: 'createDrop', desc: '在指定位置创建掉落物。参数: 掉落配置ID' },
    { label: '创建特效 (createEffect)', value: 'createEffect', desc: '在指定位置播放特效。参数: 特效路径;坐标x,坐标y;图层' },
    { label: '关卡胜利 (win)', value: 'win', desc: '直接判定玩家过关并弹出结算界面' },
    { label: '关卡失败 (fail)', value: 'fail', desc: '直接判定失败' },
    { label: '显示通关指引 (showPointer)', value: 'showPointer', desc: '在指定Rect显示动态绿色箭头' },
    { label: '全屏震动 (shake)', value: 'shake', desc: '触发屏幕抖动，可填震动幅度名' },
    { label: '杀光所有敌人 (killAllEnemy)', value: 'killAllEnemy', desc: '瞬间消灭所有已生成的敌军' },
    { label: '停止倒计时 (taskTimingB:false)', value: 'taskTimingB:false', desc: '暂停任务界面的倒计时时钟' },
    { label: '开启倒计时 (taskTimingB:true)', value: 'taskTimingB:true', desc: '恢复任务界面的倒计时时钟' },
    { label: '隐藏血条 (hideLifeBar)', value: 'hideLifeBar', desc: '隐藏玩家血条UI' },
    { label: '显示血条 (showLifeBar)', value: 'showLifeBar', desc: '显示玩家血条UI' },
    { label: '镜头聚焦 (cameraFocus)', value: 'cameraFocus', desc: '将镜头聚焦到指定单位。参数: 单位ID' },
    { label: '镜头恢复 (cameraReset)', value: 'cameraReset', desc: '恢复镜头正常跟随' },
    { label: '开启对话 (say)', value: 'say', desc: '触发对话。格式: say; startList:对话名 (如 s1, s2)' },
    { label: '关卡控制 (level)', value: 'level', desc: '关卡相关控制。格式: level; 子指令:参数 (如 showPointer:r_over)' },
    { label: '全体单位 (allBody)', value: 'allBody', desc: '对所有单位执行操作。格式: allBody:筛选条件; 子指令:参数' },
    { label: '任务 (task)', value: 'task', desc: '任务相关控制' },
    { label: '完成当前记忆任务 (completeNowMenoryTask)', value: 'completeNowMenoryTask', desc: '完成当前记忆任务' },
    { label: '世界地图 (worldMap)', value: 'worldMap', desc: '世界地图相关操作' },
    { label: '随机蜘蛛网 (randomSpider)', value: 'randomSpider', desc: '生成随机蜘蛛网' },
    { label: '添加单位地图蜘蛛 (addUnitMapSpider)', value: 'addUnitMapSpider', desc: '为单位添加地图蜘蛛网' },
    { label: '掉落地图蜘蛛 (dropMapSpider)', value: 'dropMapSpider', desc: '掉落地图蜘蛛网' },
    { label: '添加掉落 (addDrop)', value: 'addDrop', desc: '添加掉落物' },
    { label: '添加P1掉落 (addDropP1)', value: 'addDropP1', desc: '为P1添加掉落物' },
    { label: '添加物品 (addItems)', value: 'addItems', desc: '添加物品到背包' },
    { label: '额外队友 (more)', value: 'more', desc: '添加额外队友' },
    { label: '添加效果掉落停止 (addEffectDropStop)', value: 'addEffectDropStop', desc: '添加效果掉落并停止' },
    { label: '无装备商店 (noWearShop)', value: 'noWearShop', desc: '禁止装备商店' },
    { label: '武器 (arms)', value: 'arms', desc: '武器相关操作' },
    { label: '单人模式提示 (alertIfMustSingle)', value: 'alertIfMustSingle', desc: '如果必须单人模式则提示' },
    { label: '杀死编辑Boss事件 (killEditBossEvent)', value: 'killEditBossEvent', desc: '杀死编辑的Boss事件' },
    { label: '塔胜利事件 (towerWinEvent)', value: 'towerWinEvent', desc: '塔模式胜利事件' },
    { label: '无尽胜利事件 (unendWinEvent)', value: 'unendWinEvent', desc: '无尽模式胜利事件' },
    { label: 'PK胜利事件 (pkWinEvent)', value: 'pkWinEvent', desc: 'PK模式胜利事件' },
    { label: '添加Boss卡PK (addBossCardPK)', value: 'addBossCardPK', desc: '添加Boss卡PK' },
    { label: 'Boss卡战斗胜利 (bcardBattleWin)', value: 'bcardBattleWin', desc: 'Boss卡战斗胜利' },
    { label: '添加Boss卡战斗 (addBcardBattle)', value: 'addBcardBattle', desc: '添加Boss卡战斗' },
    { label: '周狂Boss (weekMadboss)', value: 'weekMadboss', desc: '周常狂Boss模式' },
    { label: '最后僵尸逃跑 (lastZomExcape)', value: 'lastZomExcape', desc: '最后僵尸逃跑' },
    { label: '掉落僵尸技能 (dropZomSkill)', value: 'dropZomSkill', desc: '掉落僵尸技能' },
    { label: '掉落僵尸控制 (dropZomControl)', value: 'dropZomControl', desc: '掉落僵尸控制' },
    { label: '掉落僵尸敌人 (dropZomEnemy)', value: 'dropZomEnemy', desc: '掉落僵尸敌人' },
    { label: '掉落道塔 (dropDaoTa)', value: 'dropDaoTa', desc: '掉落道塔' },
    { label: '掉落道塔2 (dropDaoTa2)', value: 'dropDaoTa2', desc: '掉落道塔2' },
    { label: '掉落Bwall青鲨 (dropBwallQingSha)', value: 'dropBwallQingSha', desc: '掉落Bwall青鲨' },
    { label: '执行Bwall (doBwall)', value: 'doBwall', desc: '执行Bwall' },
    { label: '南瓜Boss结束 (pumpkinBossOver)', value: 'pumpkinBossOver', desc: '南瓜Boss结束事件' },
    { label: '绿色是1_矿场 (GreenIs1_mine)', value: 'GreenIs1_mine', desc: '绿色是1矿场事件' },
    { label: '时间胶囊11_矿场 (timeCapsule11_mine)', value: 'timeCapsule11_mine', desc: '时间胶囊11矿场事件' },
    { label: '进入虫洞 (inWormhole)', value: 'inWormhole', desc: '进入虫洞' },
    { label: '西山1_1 (XiShan1_1)', value: 'XiShan1_1', desc: '西山1-1事件' },
    { label: '疯狂战士秒 (madWarriorSec)', value: 'madWarriorSec', desc: '疯狂战士秒数' },
    { label: '疯狂Boss电话 (madBossPhone)', value: 'madBossPhone', desc: '疯狂Boss电话事件' },
    { label: '障碍物 (obstacle)', value: 'obstacle', desc: '障碍物相关' },
  ]
};

// ==================== 区域字段配置 (原 rect.ts) ====================
export const LEVEL_RECT_METAS = {
  basic: [
    { key: 'id', label: '区域 ID', type: 'string', desc: '如 r1, r_birth, r_over' },
    {
      key: 'label',
      label: '标签 (Label)',
      type: 'select',
      options: ['birth', 'over', 'enemy', 'hide', 'addCharger', 'rHitMainSpace'],
      allowInput: true // 允许输入自定义标签
    },
  ],
  transform: [
    { key: 'x', label: 'X 坐标', type: 'number' },
    { key: 'y', label: 'Y 坐标', type: 'number' },
    { key: 'width', label: '宽度 (W)', type: 'number' },
    { key: 'height', label: '高度 (H)', type: 'number' },
  ]
};
