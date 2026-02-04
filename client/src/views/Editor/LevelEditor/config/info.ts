// client/src/views/Editor/LevelEditor/config/info.ts

export const LEVEL_INFO_METAS = {
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
      后可加命令 (order) hideSightCover 关闭遮罩"`
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
      后面需要加命令 (order) openInput 开启玩家操作"`
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
      disabled: true,
      fixedValue: true,
      desc: '该属性在预览模式下被引擎强制设为开启 (true)。\n由于 TempGetter 限制，无法在外部加载时关闭非正式模式设置。'
    },
    {
      key: 'overBackB',
      label: '返回界面 (overBackB)',
      type: 'switch',
      disabled: true,
      fixedValue: true,
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
      disabled: true,
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