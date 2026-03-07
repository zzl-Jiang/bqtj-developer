// client/src/views/Editor/BodyEditor/config/fields.ts
// 单位编辑器字段配置汇总

import type { BodyMetaItem } from './types';

// ==================== 基础字段 (basic.ts) ====================

export const BODY_BASIC_METAS: BodyMetaItem[] = [
  {
    key: 'name',
    label: '单位 ID (name)',
    type: 'string',
    desc: '内部唯一标识，建议使用英文，如 zombie_a'
  },
  {
    key: 'cnName',
    label: '中文名称 (cnName)',
    type: 'string',
    desc: '游戏中显示的中文名称'
  },
  {
    key: 'systemType',
    label: '系统类型 (systemType)',
    type: 'select',
    desc: '决定单位的基本行为逻辑。普通选 normal，持枪选 hero',
    options: [
      { label: '普通 (normal)', value: 'normal' },
      { label: '持枪 (hero)', value: 'hero' }
    ]
  },
  {
    key: 'raceType',
    label: '种族 (raceType)',
    type: 'select',
    desc: '影响阵营判断和部分生效逻辑',
    options: [
      { label: '人类 (human)', value: 'human' },
      { label: '僵尸 (zombies)', value: 'zombies' },
      { label: '机械 (robot)', value: 'robot' },
      { label: '雪人 (snow)', value: 'snow' },
      { label: '飞船 (ship)', value: 'ship' },
      { label: '石头 (stone)', value: 'stone' }
    ]
  },
  {
    key: 'sex',
    label: '性别 (sex)',
    type: 'select',
    options: [
      { label: '男', value: 'male', desc: '默认性别' },
      { label: '女', value: 'female' }
    ]
  },
  {
    key: 'description',
    label: '描述 (description)',
    type: 'string',
    desc: '备注信息，开发者没用'
  },
  {
    key: 'swfUrl',
    label: 'Flash 资源路径 (swfUrl)',
    type: 'string',
    desc: `Flash 动画资源文件路径。
  小技巧：如果多个单位使用相同的 swfUrl，可能会导致资源加载冲突或卡顿。
  解决方案：在路径后添加参数区分，例如 'swf/enemy/ZombieShoot.swf?v=green'`
  },
  {
    key: 'swfName',
    label: '资源名称 (swfName)',
    type: 'string',
    desc: 'Flash 资源导出类名。默认同 name。若多个单位共用一个 SWF，需指定不同的类名'
  },
  {
    key: 'bmpUrl',
    label: '位图资源路径 (bmpUrl)',
    type: 'string',
    desc: '静态展示图路径。当 Flash 资源未加载完成时优先显示'
  },
  {
    key: 'headIconUrl',
    label: '头像路径 (headIconUrl)',
    type: 'string',
    desc: '头像图片路径。用于 UI 界面显示'
  },
  {
    key: 'normalScaleX',
    label: '默认缩放 (normalScaleX)',
    type: 'number',
    desc: '水平缩放比例。默认为 1。设为 -1 可使单位默认朝左'
  },
  {
    key: 'lockLeftB',
    label: '锁定朝左 (lockLeftB)',
    type: 'switch',
    desc: '锁定朝向左侧。若为 true，单位将始终面朝左'
  },
  {
    key: 'shell',
    label: '外壳类型 (shell)',
    type: 'string',
    desc: '外壳类型，影响敏感。默认为 variation (变异)'
  },
  {
    key: 'map',
    label: '所属地图 (map)',
    type: 'string',
    desc: '所属地图 ID。用于资源预加载分配，可以留空。'
  },
  {
    key: 'imgType',
    label: '图像类型 (imgType)',
    type: 'string',
    desc: '资源加载方式，默认为 bmp。通常无需修改'
  },
  {
    key: 'imgArr',
    label: '图像数组 (imgArr)',
    type: 'multi_select',
    desc: `图像数组。用于资源预加载分配，具体选项和单位资源相关，这里只列出常见选项。
  若有需求，可自行输入内容后回车创建对应选项。
  可以根据需求调整，standForward,die1 即可满足最小需求。`,
    options: [
      { label: '站立 (stand)', value: 'stand' },
      { label: '移动 (move)', value: 'move' },
      { label: '奔跑 (run)', value: 'run' },
      { label: '站立停止 (standStop)', value: 'standStop' },
      { label: '站立前移 (standForward)', value: 'standForward' },
      { label: '站立后移 (standBack)', value: 'standBack' },
      { label: '蹲下停止 (squatStop)', value: 'squatStop' },
      { label: '蹲下前移 (squatForward)', value: 'squatForward' },
      { label: '蹲下后移 (squatBack)', value: 'squatBack' },
      { label: '普通攻击 (normalAttack)', value: 'normalAttack' },
      { label: '跳起 (__jumpUp)', value: '__jumpUp' },
      { label: '跳跃 (jumpUp)', value: 'jumpUp' },
      { label: '滞空 (jumpUp__jumpDown)', value: 'jumpUp__jumpDown' },
      { label: '落地 (jumpDown)', value: 'jumpDown' },
      { label: '下坠 (jumpDown__)', value: 'jumpDown__' },
      { label: '上升-前 (__fill1_Up)', value: '__fill1_Up' },
      { label: '上升 (fill1_Up)', value: 'fill1_Up' },
      { label: '上升-下降 (fill1_Up__fill1_Down)', value: 'fill1_Up__fill1_Down' },
      { label: '下降 (fill1_Down)', value: 'fill1_Down' },
      { label: '下降-死亡 (fill1_Down__die1)', value: 'fill1_Down__die1' },
      { label: '受伤 (hurt1)', value: 'hurt1' },
      { label: '受伤 (hurt2)', value: 'hurt2' },
      { label: '死亡 (die1)', value: 'die1' },
    ]
  },
  {
    key: 'lowerImgArr',
    label: '下半身图像 (lowerImgArr)',
    type: 'multi_select',
    desc: '下半身独立动画帧，常用：thigh, leg_left, leg_right, foot, belt',
    options: [
      { label: '大腿 (thigh)', value: 'thigh' },
      { label: '左腿 (leg_left)', value: 'leg_left' },
      { label: '右腿 (leg_right)', value: 'leg_right' },
      { label: '左脚 (foot_left)', value: 'foot_left' },
      { label: '右脚 (foot_right)', value: 'foot_right' },
      { label: '腰带 (belt)', value: 'belt' },
    ]
  },

  {
    key: 'flipCtrlBy',
    label: '翻转控制 (flipCtrlBy)',
    type: 'select',
    desc: '决定单位行走时的朝向控制方式',
    options: [
      { label: '无 (no)', value: 'no', desc: '不自动翻转' },
      { label: '目标 (target)', value: 'target', desc: '始终面向目标' },
      { label: '鼠标 (mouse)', value: 'mouse', desc: '跟随鼠标方向（玩家控制）' }
    ]
  },
  {
    key: 'dieEffectPartName',
    label: '死亡特效部位 (dieEffectPartName)',
    type: 'string',
    desc: '播放死亡特效的部位名称，默认为 head'
  },
  {
    key: 'rotateBySlopeB',
    label: '随坡度旋转 (rotateBySlopeB)',
    type: 'switch',
    desc: '是否随地面坡度旋转身体。默认为 false'
  },
  {
    key: 'canBossB',
    label: '可作为Boss (canBossB)',
    type: 'switch',
    desc: '是否允许作为 Boss 出场。默认为 true'
  },
  {
    key: 'extraDropArmsB',
    label: '额外掉落武器 (extraDropArmsB)',
    type: 'switch',
    desc: '死亡是否额外掉落武器。默认为 false'
  },
  {
    key: 'skillArr',
    label: '技能列表 (skillArr)',
    type: 'multi_select',
    desc: '单位技能列表'
  },
  {
    key: 'bossSkillArr',
    label: 'Boss 技能 (bossSkillArr)',
    type: 'multi_select',
    desc: 'Boss 阶段专属技能列表'
  },
  {
    key: 'bossSkillArrCn',
    label: 'Boss 技能中文 (bossSkillArrCn)',
    type: 'multi_select',
    desc: 'Boss 技能中文显示'
  },
  {
    key: 'demBossSkillArr',
    label: '修罗 Boss 技能 (demBossSkillArr)',
    type: 'multi_select',
    desc: '修罗模式下的 Boss 技能'
  },
];

/** 持枪专属参数 */
export const BODY_HERO_METAS: BodyMetaItem[] = [
  { key: 'armsNumber', label: '武器数量 (armsNumber)', type: 'number', desc: '持有武器数量槽位。默认为 1' },
  { key: 'movieLink', label: '关联动画 (movieLink)', type: 'string', desc: '外观关联 ID。用于复用其他角色的动画定义' },
  { key: 'headPlayB', label: '头部动画播放 (headPlayB)', type: 'switch', desc: '头部是否独立播放动画' },
  { key: 'squatMaxVx', label: '蹲伏最大速度 (squatMaxVx)', type: 'number', desc: '蹲伏移动时的最大速度' },
  { key: 'aircraft', label: '飞行器 (aircraft)', type: 'string', desc: '飞行器绑定 ID' },
  { key: 'randomArmsRange', label: '随机武器范围 (randomArmsRange)', type: 'multi_select', desc: '随机武器 ID 范围，回车创建' },
  { key: 'studyCnNameArr', label: '可学习技能 (studyCnNameArr)', type: 'multi_select', desc: '可学习技能名称列表，回车创建' },
  { key: 'p1SkillArr', label: '初始技能 (p1SkillArr)', type: 'multi_select', desc: 'P1 初始技能列表，回车创建' },
  { key: 'addMoreText', label: '额外描述 (addMoreText)', type: 'string', desc: '额外描述文本' },
];

// ==================== 战斗字段 (battle.ts) ====================

export const BODY_LIFEBAR_METAS: BodyMetaItem[] = [
  {
    key: 'doubleLifeBarB',
    label: '双层血条 (doubleLifeBarB)',
    type: 'switch',
    desc: '是否显示双层血条（如虚晶蝎）。默认为 false'
  },
  {
    key: 'lifeBarExtraHeight',
    label: '血条高度偏移 (lifeBarExtraHeight)',
    type: 'number',
    desc: '血条显示高度偏移量（像素）。正数向上，负数向下'
  }
];

export const BODY_BATTLE_METAS: BodyMetaItem[] = [
  {
    key: 'lifeRatio',
    label: '生命系数 (lifeRatio)',
    type: 'number',
    desc: '生命值倍率。最终生命值 = 100 * 倍率 * 等级加成'
  },
  {
    key: 'rosRatio',
    label: '僵直系数 (rosRatio)',
    type: 'number',
    desc: '僵每损失百分之多少生命会进入僵直，默认为 0.2'
  },
  {
    key: 'defenceRatio',
    label: '防御系数 (defenceRatio)',
    type: 'number',
    desc: '防御系数。默认为 0'
  },
  {
    key: 'headHurtMul',
    label: '爆头伤害乘数 (headHurtMul)',
    type: 'number',
    desc: '爆头伤害倍率。默认为 2'
  },
  {
    key: 'showLevel',
    label: '显示等级 (showLevel)',
    type: 'number',
    desc: '显示等级。若 >= 999 视为特殊 Boss'
  },
  {
    key: 'superDpsAdd',
    label: '精英伤害加成 (superDpsAdd)',
    type: 'number',
    desc: '精英 (Super) 状态下的额外伤害加成'
  },
  {
    key: 'shootLenMul',
    label: '射程乘数 (shootLenMul)',
    type: 'number',
    desc: '射程倍率。影响索敌距离，默认为 1'
  },
  {
    key: 'nextAttackTime',
    label: '下次攻击时间 (nextAttackTime)',
    type: 'number',
    desc: '攻击间隔时间'
  },
  {
    key: 'avtiveSkillCdOverT',
    label: '主动技能CD溢出',
    type: 'number',
    desc: '主动技能 CD 溢出时间。默认为 2'
  },
];

// ==================== 攻击字段 (attack.ts) ====================

/** 攻击定义详细字段 <hurt> */
export const ATTACK_METAS: { [key: string]: BodyMetaItem[] } = {
  basic: [
    {
      key: 'keyName',
      label: '内部 ID',
      type: 'string',
      desc: '内部逻辑使用的 ID'
    },
    {
      key: 'cn',
      label: '动作名称',
      type: 'string',
      desc: '动作或者技能的中文名称'
    },
    {
      key: 'imgLabel',
      label: '动画标签',
      type: 'string',
      desc: '必须对应 SWF 中的帧标签 (Label)'
    },
    {
      key: 'cd',
      label: '冷却时间',
      type: 'number',
      desc: '技能冷却时间/攻击间隔。\n注意这个似乎没有过调用，是否有效有待验证。'
    },
    {
      key: 'attackType',
      label: '攻击类型',
      type: 'select',
      desc: '攻击属性类型',
      options: [
        { label: '直伤 (direct)', value: 'direct', desc: '默认数值，无特殊效果' },
        { label: '神圣 (holy)', value: 'holy', desc: '无视闪避/丢失/技能闪避。攻击必定命中，不会因敌方的技能闪避/闪避状态或自身的丢失状态被闪避。' },
        { label: '精准 (accurate)', value: 'accurate', desc: '无视闪避/丢失，但能被技能闪避影响。' },
        { label: '穿透 (through)', value: 'through', desc: '无视部分伤害减免 (underHurtMul)。' },
        { label: '混乱 (chaos)', value: 'chaos', desc: '禁用弱点。该属性的攻击不会触发弱点伤害倍率。' }
      ]
    },
  ],
  hurt: [
    {
      key: 'hurtRatio',
      label: '伤害倍率',
      type: 'number',
      desc: '基于基础伤害的倍率。默认 1'
    },
    {
      key: 'hurtMul',
      label: '额外增伤',
      type: 'number',
      desc: '基础伤害之外的额外伤害乘数。默认 1'
    },
    {
      key: 'continuousNum',
      label: '连击次数',
      type: 'number',
      desc: '最大尝试使用同一攻击动作的次数。参见秘境虚炎狼 - sprintAttack'
    },
    {
      key: 'hitMaxNum',
      label: '最大命中数',
      type: 'number',
      desc: '单次攻击最多命中多少目标。默认 999'
    },
    {
      key: 'oneHurtB',
      label: '单次伤害模式',
      type: 'switch',
      desc: '若为 true，则该技能对同一目标只造成一次伤害'
    },
  ],
  range: [
    {
      key: 'grapMaxLen',
      label: '最大长度 (grapMaxLen)',
      type: 'number',
      desc: '攻击生效的最大距离限制'
    },
    {
      key: 'grapRect',
      label: '抓取范围 (grapRect)',
      type: 'string',
      desc: '攻击判定范围 (x, y, w, h)。定义了攻击生效的区域'
    },
    {
      key: 'grapMinLen',
      label: '最小长度 (grapMinLen)',
      type: 'number',
      desc: '攻击生效的最小距离限制'
    },
    {
      key: 'mustGrapRectB',
      label: '必须判定成功',
      type: 'switch',
      desc: 'mustGrapRectB：是否必须在判定区域内才生效'
    },
    {
      key: 'exactGrapRectB',
      label: '精确判定',
      type: 'switch',
      desc: 'exactGrapRectB：是否开启更精确的碰撞区域检查'
    }
  ],
  physics: [
    {
      key: 'beatBack',
      label: '击退距离',
      type: 'number',
      desc: '攻击命中时的击退距离'
    },
    {
      key: 'meBack',
      label: '自身反冲',
      type: 'number',
      desc: '攻击时自身向后的位移距离'
    },
    {
      key: 'transBackMul',
      label: '反冲倍率',
      type: 'number',
      desc: '自身反冲的缩放倍率'
    },
    {
      key: 'shakeValue',
      label: '受击震动',
      type: 'number',
      desc: '攻击命中时目标的震动幅度'
    },
    {
      key: 'screenShakeValue',
      label: '全屏震动',
      type: 'number',
      desc: '全屏震动强度'
    },
  ],
  logic: [
    {
      key: 'bulletLabel',
      label: '发射子弹',
      type: 'string',
      desc: '发射的子弹 ID。若填 no 则不发射'
    },
    {
      key: 'bulletArr',
      label: '子弹列表',
      type: 'multi_select',
      desc: '随机/顺序发射的子弹列表'
    },
    {
      key: 'skillArr',
      label: '触发技能',
      type: 'multi_select',
      desc: '攻击命中或施放时触发的子技能 ID 列表'
    },
    {
      key: 'noAiChooseB',
      label: 'AI 屏蔽',
      type: 'switch',
      desc: 'AI 是否不主动选择此动作'
    },
    {
      key: 'noShootB',
      label: '非射击动作',
      type: 'switch',
      desc: '是否标记为非射击动作 (不计入射击统计/效果)'
    },
    {
      key: 'noUseOtherSkillB',
      label: '动作锁 (禁用其他技能)',
      type: 'switch',
      desc: '动作进行期间禁止使用其他技能'
    },
    {
      key: 'ingfollowB',
      label: '攻击时跟随目标',
      type: 'switch',
      desc: '攻击动作播放中是否始终跟随目标转向'
    },
  ],
  effect: [
    { key: 'url', label: '特效路径', type: 'select_png', desc: '特效动画资源 (hitImgUrl)' },
    { key: 'soundUrl', label: '受击音效', type: 'string', desc: '命中的音效路径' },
    {
      key: 'con', label: '混合模式', type: 'select', options: [
        { label: '添加 (add)', value: 'add' },
        { label: '过滤 (filter)', value: 'filter' }
      ]
    },
    { key: 'raNum', label: '动画帧数', type: 'number' },
  ]
};

// ==================== 物理字段 (physics.ts) ====================

/** 运动物理参数 <motionD> */
export const BODY_PHYSICS_METAS: BodyMetaItem[] = [
  {
    key: 'F_G',
    label: '重力因子 (F_G)',
    type: 'number',
    desc: '重力系数。数值越大下落越快，默认为 1'
  },
  {
    key: 'F_I',
    label: '惯性因子 (F_I)',
    type: 'number',
    desc: '惯性系数。数值越大起步和停止越慢（滑步感），默认为 1'
  },
  {
    key: 'F_F',
    label: '地面摩擦力 (F_F)',
    type: 'number',
    desc: '摩擦系数。影响停止速度，默认为 0.5'
  },
  {
    key: 'F_AIR',
    label: '空气阻力 (F_AIR)',
    type: 'number',
    desc: '空气阻力系数。影响空中移动衰减'
  },
  {
    key: 'jumpMul',
    label: '跳跃乘数 (jumpMul)',
    type: 'number',
    desc: '跳跃力度乘数。默认为 1'
  },
  {
    key: 'vRan',
    label: '速度随机范围 (vRan)',
    type: 'number',
    desc: '移动速度随机浮动比例。如 0.2 代表上下 20% 浮动'
  },
  {
    key: 'jumpDelayT',
    label: '跳跃延迟 (jumpDelayT)',
    type: 'number',
    desc: '起跳前的预备动作延迟（秒）'
  },
  {
    key: 'maxVx',
    label: '最大速度 (maxVx)',
    type: 'number',
    desc: 'X 轴最大移动速度'
  },
  {
    key: 'maxJumpNum',
    label: '最大跳跃次数 (maxJumpNum)',
    type: 'number',
    desc: '最大连跳次数。默认为 1'
  },

  {
    key: 'tween',
    label: '缓动系数 (tween)',
    type: 'number',
    desc: '平滑移动系数。默认为 100'
  },
  {
    key: 'moveWhenVB',
    label: '载具状态移动 (moveWhenVB)',
    type: 'switch',
    desc: '载具状态下是否允许移动。默认为 false'
  },
  {
    key: 'imgRaB',
    label: '图像旋转 (imgRaB)',
    type: 'switch',
    desc: '图像是否随运动方向旋转。默认为 false'
  },
  {
    key: 'dieEN',
    label: '死亡特效 (dieEN)',
    type: 'number',
    desc: '死亡特效 ID。0 为默认'
  },
  {
    key: 'headRectScale',
    label: '头部判定缩放 (headRectScale)',
    type: 'number',
    desc: '头部受击判定框缩放比例。默认为 1'
  },


];

/** 飞行与移动扩展 */
export const BODY_MOVE_EXT_METAS: BodyMetaItem[] = [
  {
    key: 'motionState',
    label: '运动状态 (motionState)',
    type: 'string',
    desc: '运动模式。stand (地面/行走), fly (飞行)'
  },
  {
    key: 'flyType',
    label: '飞行类型 (flyType)',
    type: 'select',
    desc: '飞行行为类型',
    options: [
      { label: '普通 (normal)', value: 'normal' },
      { label: '缓动 (tween)', value: 'tween' },
      { label: '太空 (space)', value: 'space' }
    ]
  },
  {
    key: 'flyUseSpiderB',
    label: '节点飞行 (flyUseSpiderB)',
    type: 'switch',
    desc: '飞行单位是否使用节点寻路 (Spider)。默认为 false'
  },
  {
    key: 'dieJumpMul',
    label: '死亡跳跃乘数 (dieJumpMul)',
    type: 'number',
    desc: '死亡时的击飞跳跃力度乘数。默认为 1'
  },
];

// ==================== AI 字段 (ai.ts) ====================

export const BODY_AI_METAS: BodyMetaItem[] = [
  {
    key: 'warningRange',
    label: '警戒范围 (warningRange)',
    type: 'number',
    desc: '警戒半径 (像素)。默认 1400'
  },
  {
    key: 'outWarningTime',
    label: '脱战时间 (outWarningTime)',
    type: 'number',
    desc: '脱离警戒范围多久后放弃追击 (秒)'
  },
  {
    key: 'attackAIClass',
    label: '攻击 AI 类名 (attackAIClass)',
    type: 'select',
    options: [
      { label: '载具 (CarAttack_AI)', value: 'CarAttack_AI', desc: '载具的攻击 AI，有些太空单位也会用。' }
    ],
    desc: '攻击 AI 逻辑类名，没有需求留空即可'
  },
  {
    key: 'bulletLauncherClass',
    label: '子弹类名 (bulletLauncherClass)',
    type: 'string',
    desc: '弹道发射器逻辑类名'
  },
  {
    key: 'defaultAiOrder',
    label: '默认 AI 指令 (defaultAiOrder)',
    type: 'string',
    desc: '默认 AI 行为指令'
  },
  {
    key: 'extraAIClassLabel',
    label: '额外 AI 类标签 (extraAIClassLabel)',
    type: 'select',
    options: [
      { label: '黑暗骑士 (BlackKnights_AIExtra)', value: 'BlackKnights_AIExtra' },
      { label: '狂人机器 (Warrior_AIExtra)', value: 'Warrior_AIExtra' },
      { label: '狂野收割者 (FightPig_AIExtra)', value: 'FightPig_AIExtra' },
      { label: '持枪通用 (Hero_AIExtra)', value: 'Hero_AIExtra' },
      { label: '黑暗雷尔 (BlackLaer_AIExtra)', value: 'BlackLaer_AIExtra' },
      { label: '掘地兽 (DiggingBeast_AIExtra)', value: 'DiggingBeast_AIExtra' },
      { label: '斩之使者 (HookWitch_AIExtra)', value: 'HookWitch_AIExtra' },
      { label: '狂战尸 (FightKing_AIExtra)', value: 'FightKing_AIExtra' },
      { label: '古飙 (CheetahCar_AIExtra)', value: 'CheetahCar_AIExtra' },
      { label: '异祖龙飞行器 (FlyDragonAir_AIExtra)', value: 'FlyDragonAir_AIExtra' },
      { label: '多肉 (MeatyZombie_AIExtra)', value: 'MeatyZombie_AIExtra' },
      { label: '防毒僵尸 (GasDefense_AIExtra)', value: 'GasDefense_AIExtra' },
      { label: '异火龙 (FireDragon_AIExtra)', value: 'FireDragon_AIExtra' },
      { label: '末日坦克 (LastdayTank_AIExtra)', value: 'LastdayTank_AIExtra' },
      { label: '狂野收割者 (FightPig_AIExtra)', value: 'FightPig_AIExtra' },
      { label: '童灵尸 (SnowThin_AIExtra)', value: 'SnowThin_AIExtra' },
      { label: '关东尸 (SnowFatty_AIExtra)', value: 'SnowFatty_AIExtra' },
      { label: '女爵尸 (SnowGirl_AIExtra)', value: 'SnowGirl_AIExtra' },
      { label: '野帝 (IceMan_AIExtra)', value: 'IceMan_AIExtra' },
      { label: '阿巴达斯 (YouthWolf_AIExtra)', value: 'YouthWolf_AIExtra' },
      { label: '看门狗 (Watchdog_AIExtra)', value: 'Watchdog_AIExtra' },
      { label: '幻影Z (PhantomZ_AIExtra)', value: 'PhantomZ_AIExtra' },
      { label: '毒魔 (PoisonDemon_AIExtra)', value: 'PoisonDemon_AIExtra' },
      { label: '毒精灵 (Antimatter_AIExtra)', value: 'Antimatter_AIExtra' },
      { label: '守望之翼飞行器 (WatchEagleAir_AIExtra)', value: 'WatchEagleAir_AIExtra' },
      { label: '冥王 (IronChiefS_AIExtra)', value: 'IronChiefS_AIExtra' },
      { label: '嗜血尸狼 (ZombieWolf_AIExtra)', value: 'ZombieWolf_AIExtra' },
      { label: '雷克 (PetLake_AIExtra)', value: 'PetLake_AIExtra' },
      { label: '蝙蝠 (Bat_AIExtra)', value: 'Bat_AIExtra' },
      { label: '毒蛛 (SmallSpider_AIExtra)', value: 'SmallSpider_AIExtra' },
      { label: '冥刃游尸 (ZombiePo_AIExtra)', value: 'ZombiePo_AIExtra' },
      { label: '巨毒尸 (HugePosion_AIExtra)', value: 'HugePosion_AIExtra' },
      { label: '暴君 (Skeleton_AIExtra)', value: 'Skeleton_AIExtra' },
      { label: '无疆骑士 (Knights_AIExtra)', value: 'Knights_AIExtra' },
      { label: '狂战狼 (FightWolf_AIExtra)', value: 'FightWolf_AIExtra' },
      { label: '掘金尸 (NuggetsZombie_AIExtra)', value: 'NuggetsZombie_AIExtra' },
      { label: '虚炎狼坐骑 (FireWolf_AIExtra)', value: 'FireWolf_AIExtra' },
      { label: '铁犬 (IronDog_AIExtra)', value: 'IronDog_AIExtra' },
      { label: '王者兔 (KingRabbit_AIExtra)', value: 'KingRabbit_AIExtra' },
      { label: '运毒尸 (TransportZombie_AIExtra)', value: 'TransportZombie_AIExtra' },
      { label: '幻影X (PhantomX_AIExtra)', value: 'PhantomX_AIExtra' },
      { label: '骷髅巫师 (SkeletalMage_AIExtra)', value: 'SkeletalMage_AIExtra' },
      { label: '球形闪电 (BallLightning_AIExtra)', value: 'BallLightning_AIExtra' },
      { label: '守望之翼 (WatchEagle_AIExtra)', value: 'WatchEagle_AIExtra' },
      { label: '异祖龙 (FlyDragon_AIExtra)', value: 'FlyDragon_AIExtra' },
      { label: '虚炎狼 (FireWolf_AIExtra)', value: 'FireWolf_AIExtra' },
      { label: '虚洪螈 (Salamander_AIExtra)', value: 'Salamander_AIExtra' },
      { label: '虚晶蝎 (VirtualScorpion_AIExtra)', value: 'VirtualScorpion_AIExtra' },
      { label: '炸裂者 (DryFrog_AIExtra)', value: 'DryFrog_AIExtra' },
      { label: '急速守卫 (FastGuards_AIExtra)', value: 'FastGuards_AIExtra' },
      { label: '编织者 (Weaver_ExtraAI)', value: 'Weaver_ExtraAI' },
      { label: '决斗者 (Duelist_AIExtra)', value: 'Duelist_AIExtra' },
      { label: '反物质 (Antimatter_AIExtra)', value: 'Antimatter_AIExtra' }
    ],
    desc: '大部分选项逻辑都为对应单位专用。此处不进行额外解释'
  },
  {
    key: 'oneAiLabel',
    label: '单体 AI 标签 (oneAiLabel)',
    type: 'select',
    options: [
      { label: '武器测试 (armsDpsTest)', value: 'armsDpsTest' },
      { label: '战神 (Madboss)', value: 'Madboss' },
      { label: '小美 (XiaoMei)', value: 'XiaoMei' },
      { label: '突击手 (striker)', value: 'striker', desc: '小白' },
      { label: '法师 (mage)', value: 'mage', desc: '小樱' },
      { label: '狙击手 (sniper)', value: 'sniper', desc: '藏师' },
      { label: '步枪手 (rifle)', value: 'rifle' },
      { label: '散弹枪手 (shotgun)', value: 'shotgun', desc: '文杰' },
      { label: '战斗射击 (FightShooter)', value: 'FightShooter', desc: '目标无敌不逃离' },
    ],
    desc: '持枪类单位的单体 AI 逻辑预设。'
  }
];
