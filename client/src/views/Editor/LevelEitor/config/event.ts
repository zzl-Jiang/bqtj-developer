// client/src/views/Editor/LevelEitor/config/event.ts

export const EVENT_CONDITION_METAS = [
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
];

// 比较符映射
export const OPERATOR_OPTIONS = [
  { label: '小于 (<)', value: 'less' },
  { label: '大于 (>)', value: 'greater' },
  { label: '等于 (=)', value: 'equal' }
];

export interface ConditionMeta {
  label: string;
  value: string;
  desc: string;
  example?: string;
  group: '数量' | '空间' | '状态' | '逻辑';
  fields: string[]; // 用于控制显示哪些输入框
}

export const CONDITION_METAS: ConditionMeta[] = [
  {
    label: '敌人总数 (标准)',
    value: 'enemyNumber',
    group: '数量',
    desc: '统计场上所有敌军。注意：在某些特定地图或加速模式下，它的行为等同于“存活敌人数”。',
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
    desc: '仅统计血量 > 0 且未被标记为“不计入统计”的敌军。',
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
];

// --- 图像效果选项 ---
export const VISUAL_ORDER_OPTIONS = [
  { label: '添加天气 (addWeather)', value: 'addWeather', desc: '添加雨、炎热等天气。参数1:类型(rain/heat), 参数2:强度(0-10), 参数3:持续时间' },
  { label: '场景缩放 (sceneScale)', value: 'sceneScale', desc: '缩放整个游戏画面。参数1:倍率(如0.5为缩小一半)' },
  { label: '地图变黑 (mapToBlack)', value: 'mapToBlack', desc: '将地图色调平滑过渡到黑色' },
  { label: '地图恢复 (mapToNormal)', value: 'mapToNormal', desc: '恢复地图正常色调' },
  { label: '层级显示 (sceneMc:show)', value: 'sceneMc:show', desc: '显示特定的地图层。参数1:层级ID, 参数2:子元件名' },
  { label: '层级隐藏 (sceneMc:hide)', value: 'sceneMc:hide', desc: '隐藏特定的地图层。参数1:层级ID, 参数2:子元件名' },
  { label: '世界旋转180度 (roWorld180)', value: 'roWorld180', desc: '将画面完全颠倒' },
  { label: '添加通用特效 (addNormalEffect)', value: 'addNormalEffect', desc: '在指定点播放特效。参数1:路径, 参数2:坐标(x,y), 参数3:图层名' },
];

// --- 系统与操作选项 ---
export const SYSTEM_ORDER_OPTIONS = [
  { label: '剧情模式 (toPlotMode)', value: 'toPlotMode', desc: '隐藏UI，进入剧情对话模式' },
  { label: '打开输入 (openInput)', value: 'openInput', desc: '允许玩家控制角色' },
  { label: '关闭输入 (closeInput)', value: 'closeInput', desc: '禁止玩家控制角色（常用于过场）' },
  { label: '开启AI (setGamingAITrue)', value: 'setGamingAITrue', desc: '接管玩家角色，由AI控制' },
  { label: '关闭AI (setGamingAIFalse)', value: 'setGamingAIFalse', desc: '将控制权交还给玩家' },
  { label: '保存游戏 (save)', value: 'save', desc: '强制执行一次存档操作' },
];

// --- 群体与附身选项 ---
export const GROUP_ORDER_OPTIONS = [
  { label: '附身至单位 (heroEverParasitic)', value: 'heroEverParasitic', desc: '玩家P1永久附身到指定ID的单位上' },
  { label: '取消附身 (clearHeroParasitic)', value: 'clearHeroParasitic', desc: 'P1脱离当前附身对象' },
  { label: '依据角色附身 (parasiticWeRolePan)', value: 'parasiticWeRolePan', desc: '根据关卡预设的角色自动附身' },
  { label: '所有队友死亡跪下 (allPartnerStru)', value: 'allPartnerStruNoStrikerWen', desc: '除P1外所有队友进入跪下动作' },
  { label: '所有队友重生 (allPartnerRebirth)', value: 'allPartnerRebirth', desc: '复活所有已阵亡的队友' },
];

export const BODY_ORDER_OPTIONS = [
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
    ]
  }
];

export const LEVEL_ORDER_OPTIONS = [
  { label: '关卡胜利 (win)', value: 'win', desc: '直接判定玩家过关并弹出结算界面' },
  { label: '关卡失败 (fail)', value: 'fail', desc: '直接判定失败' },
  { label: '显示通关指引 (showPointer)', value: 'showPointer', desc: '在指定Rect显示动态绿色箭头' },
  { label: '全屏震动 (shake)', value: 'shake', desc: '触发屏幕抖动，可填震动幅度名' },
  { label: '杀光所有敌人 (killAllEnemy)', value: 'killAllEnemy', desc: '瞬间消灭所有已生成的敌军' },
  { label: '停止倒计时 (taskTimingB:false)', value: 'taskTimingB:false', desc: '暂停任务界面的倒计时时钟' }
];

export const CONDITION_TYPES = CONDITION_METAS.map(m => ({
  label: m.label,
  value: m.value
}));

export interface OrderMeta {
  label: string;
  value: string;
  desc: string;
  group: '变量' | '图像' | '发兵' | '关卡' | '单位' | '对话' | '掉落物';
  fields: OrderField[];
  build: (f: any) => string;
  parse: (text: string) => any;
}

export interface OrderField {
  key: string;
  label: string;
  type: string; // 或者具体到 'text' | 'select' | 'number'
  placeholder?: string;
  options?: { label: string; value?: string; group?: string; desc?: string }[];
}

export const ORDER_METAS: OrderMeta[] = [
  // --- 变量类 ---
  {
    label: '数值变量',
    value: 'variable',
    group: '变量',
    desc: '控制关卡内的计数器或标记位。',
    fields: [
      { key: 'type', label: '逻辑', type: 'select', options: [
        { label: '增加 (addNumber)', value: 'addNumber' },
        { label: '设为 (setNumber)', value: 'setNumber' }
      ]},
      { key: 'varName', label: '变量名称', placeholder: 'dropNum / count_a', type: 'text' },
      { key: 'val', label: '数值', placeholder: '1', type: 'text' }
    ],
    build: (f) => `${f.type}:${f.varName || ''};${f.val || '0'}`,
    parse: (t) => {
      const [p1, p2] = t.split(';');
      return { type: p1?.split(':')[0], varName: p1?.split(':')[1], val: p2 };
    }
  },

  // --- 图像与特效 ---
  {
    label: '图像/环境效果',
    value: 'visual',
    group: '图像',
    desc: '场景缩放、天气、图层显示隐藏及旋转。',
    fields: [
      { key: 'type', label: '效果类型', type: 'select', options: VISUAL_ORDER_OPTIONS },
      { key: 'p1', label: '参数1', placeholder: 'ID/类型/倍率', type: 'text' },
      { key: 'p2', label: '参数2', placeholder: '强度/子名', type: 'text' },
      { key: 'p3', label: '参数3', placeholder: '持续时间/图层', type: 'text' }
    ],
    build: (f) => {
      // 处理图层控制: sceneMc:id;hide:name
      if (f.type.startsWith('sceneMc')) {
        const action = f.type.split(':')[1]; // hide 或 show
        return `sceneMc:${f.p1 || ''};${action}:${f.p2 || ''}`;
      }
      // 处理场景缩放: sceneScale:0.5
      if (f.type === 'sceneScale') return `sceneScale:${f.p1 || '1'}`;
      // 处理天气: addWeather:rain;强度;持续时间
      if (f.type === 'addWeather') return `addWeather:${f.p1 || 'rain'};${f.p2 || '5'};${f.p3 || '99999'}`;
      // 处理通用特效: addNormalEffect:路径;坐标;图层,混合,死亡方式
      if (f.type === 'addNormalEffect') return `addNormalEffect:${f.p1 || ''};${f.p2 || '0,0'};${f.p3 || ''}`;
      // 单单词指令: mapToBlack, mapToNormal, roWorld180
      return `${f.type}:`;
    },
    parse: (t) => {
      const parts = t.split(';');
      const firstPart = parts[0] || '';
      const cmd = firstPart.split(':')[0];
      const val = firstPart.split(':')[1];

      // 还原 sceneMc
      if (cmd === 'sceneMc') {
        const secondPart = parts[1] || '';
        const action = secondPart.split(':')[0]; // hide/show
        return { type: `sceneMc:${action}`, p1: val, p2: secondPart.split(':')[1] };
      }
      // 还原 addWeather
      if (cmd === 'addWeather') return { type: 'addWeather', p1: val, p2: parts[1], p3: parts[2] };
      // 还原 sceneScale
      if (cmd === 'sceneScale') return { type: 'sceneScale', p1: val };
      // 还原 addNormalEffect
      if (cmd === 'addNormalEffect') return { type: 'addNormalEffect', p1: val, p2: parts[1], p3: parts[2] };
      
      return { type: cmd };
    }
  },

  // --- 音乐与音效 ---
  {
    label: '音频播放',
    value: 'audio',
    group: '图像',
    desc: '播放背景音乐或一次性音效。',
    fields: [
      { key: 'type', label: '音频种类', type: 'select', options: [
        { label: '播放音乐 (playMusic)', value: 'playMusic' },
        { label: '播放音效 (playSound)', value: 'playSound' }
      ]},
      { key: 'id', label: '资源ID', placeholder: 'sound/hit_1', type: 'text' },
      { key: 'param', label: '扩展参数', placeholder: 'loop / volume', type: 'text' }
    ],
    build: (f) => f.type === 'playSound' ? `playSound:${f.id}` : `playMusic;${f.id}:${f.param || ''}`,
    parse: (t) => t.startsWith('playSound') ? { type:'playSound', id:t.split(':')[1] } : { type:'playMusic', id:t.split(';')[1]?.split(':')[0] }
  },

  // --- 单位/角色操作 ---
  {
    label: '单位操作',
    value: 'body',
    group: '单位',
    desc: '针对单个或群体单位发出的指令。',
    fields: [
      { key: 'target', label: '目标单位', placeholder: 'p1 / 玉晴 / enemyRandom / wePlayer', type: 'text' },
      { key: 'order', label: '具体动作', type: 'select', options: BODY_ORDER_OPTIONS },
      { key: 'property', label: '参数/坐标', placeholder: 'RectID / SkillID / x,y', type: 'text' }
    ],
    build: (f) => {
      // 区分单个单位(body)和群体(allBody)
      const isGroup = ['wePlayer', 'weRandom', 'enemyRandom'].includes(f.target);
      const prefix = isGroup ? 'allBody' : 'body';
      return `${prefix}:${f.target || ''};${f.order || ''}${f.property ? ':' + f.property : ''}`;
    },
    parse: (t) => {
      const parts = t.split(';');
      const target = parts[0]?.split(':')[1];
      const [order, property] = (parts[1] || '').split(':');
      return { target, order, property };
    }
  },

  // --- 附身与控制 ---
  {
    label: '附身控制',
    value: 'parasitic',
    group: '单位',
    desc: '控制P1、P2的附身逻辑或角色切换。',
    fields: [
      { key: 'type', label: '操作', type: 'select', options: GROUP_ORDER_OPTIONS },
      { key: 'id', label: '目标ID', placeholder: '附身的对象ID', type: 'text' }
    ],
    build: (f) => f.type === 'parasiticWeRolePan' ? 'parasiticWeRolePan:' : `${f.type}:${f.id || ''}`,
    parse: (t) => ({ type: t.split(':')[0], id: t.split(':')[1] })
  },

  // --- 发兵系统 ---
  {
    label: '生成单位',
    value: 'createUnit',
    group: '发兵',
    desc: '在指定位置生成兵力。',
    fields: [
      { key: 'unitId', label: '单位定义ID', placeholder: 'enemy1', type: 'text' },
      { key: 'rectId', label: '区域(Rect)', placeholder: 'r1', type: 'text' },
      { key: 'instanceId', label: '分配实例ID', placeholder: 'e1 (用于指令追踪)', type: 'text' }
    ],
    build: (f) => `createUnit:${f.unitId || ''};${f.rectId || ''}${f.instanceId ? ':' + f.instanceId : ''}`,
    parse: (t) => {
      const parts = t.split(';');
      const unitId = parts[0]?.split(':')[1];
      const [rectId, instanceId] = (parts[1] || '').split(':');
      return { unitId, rectId, instanceId };
    }
  },

  // --- 关卡控制 ---
  {
    label: '关卡逻辑控制',
    value: 'level',
    group: '关卡',
    desc: '控制整关胜负、指引、倒计时、全屏震动及全局属性。',
    fields: [
      { key: 'action', label: '逻辑动作', type: 'select', options: [
        { label: '关卡胜利 (win)', value: 'win', desc: '弹出结算并过关' },
        { label: '关卡失败 (fail)', value: 'fail', desc: '弹出失败界面' },
        { label: '通关指引 (showPointer)', value: 'showPointer', desc: '在指定RectID显示绿色箭头' },
        { label: '全屏震动 (shake)', value: 'shake', desc: '参数选: YouLing(极强), beatMadboss(中), ArgonShip(轻)' },
        { label: '杀光所有敌人 (killAllEnemy)', value: 'killAllEnemy', desc: '瞬间消灭当前场上所有敌军' },
        { label: '倒计时开关 (taskTimingB)', value: 'taskTimingB', desc: '参数填: true(开始), false(停止)' },
        { label: '设置鼠标灵敏度 (setSensitivity)', value: 'setSensitivity', desc: '数值(1-10), -1为恢复系统值' },
        { label: '设置刷怪倍率 (enemyNormalMul)', value: 'enemyNormalMul', desc: '数值, 如2代表小怪数量变为2倍' },
        { label: '禁止刷怪 (noEnemy)', value: 'noEnemy', desc: '停止所有后续的发兵集触发' }
      ]},
      { key: 'param', label: '具体参数', placeholder: 'RectID / 布尔值 / 数值', type: 'text' }
    ],
    build: (f) => `level;${f.action || 'win'}${f.param ? ':' + f.param : ''}`,
    parse: (t) => {
      const cmd = t.split(';')[1] || '';
      const [action, param] = cmd.split(':');
      return { action, param };
    }
  },

  // --- 对话 ---
  {
    label: '播放剧情对话',
    value: 'say',
    group: '对话',
    desc: '启动剧情对话或强制关闭当前对话窗口。',
    fields: [
      { key: 'action', label: '动作', type: 'select', options: [
        { label: '开始对话列表 (startList)', value: 'startList', desc: '播放指定的对话ID' },
        { label: '关闭对话窗口 (overList)', value: 'overList', desc: '强制关闭所有当前显示的对话' }
      ]},
      { key: 'listId', label: '对话ID', placeholder: 's1 (支持随机: s1,s2,s3)', type: 'text' }
    ],
    build: (f) => `say;${f.action || 'startList'}:${f.listId || ''}`,
    parse: (t) => {
      const cmd = t.split(';')[1] || '';
      return { action: cmd.split(':')[0], listId: cmd.split(':')[1] };
    }
  },

  // --- 掉落物 ---
  {
    label: '生成掉落物',
    value: 'addDrop',
    group: '掉落物',
    desc: '在场景指定坐标手动生成一个掉落物体。',
    fields: [
      { key: 'dropId', label: '物品ID', placeholder: 'addCoin_task / gold', type: 'text' },
      { key: 'pos', label: '生成坐标', placeholder: '466,1180', type: 'text' },
      { key: 'num', label: '生成数量', placeholder: '1', type: 'text' }
    ],
    build: (f) => `addDrop:${f.dropId || ''};${f.pos || '0,0'};${f.num || '1'}`,
    parse: (t) => {
      const parts = t.split(';');
      return { dropId: parts[0]?.split(':')[1], pos: parts[1], num: parts[2] };
    }
  }
];