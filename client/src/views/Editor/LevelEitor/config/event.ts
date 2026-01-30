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
  options?: { label: string; value?: string; group?: string }[];
}

export const ORDER_METAS: OrderMeta[] = [
  // --- 变量类 ---
  {
    label: '变量操作',
    value: 'variable',
    group: '变量',
    desc: '修改或设置自定义数值变量。',
    fields: [
      { key: 'type', label: '方式', type: 'select', options: [
        { label: '加法 (addNumber)', value: 'addNumber' },
        { label: '赋值 (setNumber)', value: 'setNumber' }
      ], placeholder: '请选择修改方式'},
      { key: 'varName', label: '变量名', placeholder: '如: dropNum', type: 'text' },
      { key: 'val', label: '数值', placeholder: '1', type: 'text' }
    ],
    build: (f: { type: any; varName: any; val: any; }) => `${f.type || 'addNumber'}:${f.varName || ''};${f.val || ''}`,
    parse: (t: string) => {
      const parts = t.split(';');
      const [type, varName] = (parts[0] || '').split(':');
      return { type, varName, val: parts[1] };
    }
  },

  // --- 图像效果 ---
  {
    label: '图像/环境效果',
    value: 'visual',
    group: '图像',
    desc: '控制天气、滤镜、缩放等视觉表现。',
    fields: [
      { key: 'type', label: '效果类型', type: 'select', options: [
        { label: '天气 (addWeather)', value: 'addWeather' },
        { label: '场景缩放 (sceneScale)', value: 'sceneScale' },
        { label: '地图变黑 (mapToBlack)', value: 'mapToBlack' },
        { label: '隐藏地图层 (sceneMc)', value: 'sceneMc' }
      ]},
      { key: 'p1', label: '参数1', placeholder: '如: rain 或 0.5', type: 'text' },
      { key: 'p2', label: '参数2', placeholder: '强度/持续时间', type: 'text' }
    ],
    build: (f) => `${f.type}:${f.p1 || ''};${f.p2 || ''}`,
    parse: (t) => {
      const parts = t.split(';');
      const [type, p1] = parts[0]?.split(':') ?? [];
      return { type, p1, p2: parts[1] };
    }
  },

  // --- 通知类 ---
  {
    label: '弹窗/提示',
    value: 'notice',
    group: '图像',
    desc: '在屏幕上显示警告、提示或说明文字。',
    fields: [
      { key: 'type', label: '类型', type: 'select', options: [
        { label: '弹窗提示 (alert)', value: 'alert' },
        { label: '弹窗通知 (alert:yes)', value: 'alert:yes' },
        { label: '显示提示 (tip)', value: 'tip' }
      ], placeholder: '请选择显示类型'},
      { key: 'content', label: '内容', placeholder: '请输入提示文字', type: 'text' }
    ],
    build: (f: { type: string; content: any; }) => {
      if (f.type === 'tip') return `tip:10;${f.content || ''}`; // 默认显示10秒
      return `${f.type || 'alert'}:${f.content || ''}`;
    },
    parse: (t: string) => {
      if (t.startsWith('tip')) return { type: 'tip', content: t.split(';')[1] };
      const parts = t.split(':');
      if (parts[1] === 'yes') return { type: 'alert:yes', content: parts[2] };
      return { type: 'alert', content: parts[1] };
    }
  },

  // --- 发兵/单位生成 ---
  {
    label: '生成单位',
    value: 'createUnit',
    group: '发兵',
    desc: '在指定区域随机位置生成一个单位。',
    fields: [
      { key: 'unitId', label: '单位名', placeholder: '如: 战斗僵尸', type: 'text' },
      { key: 'rectId', label: '区域ID', placeholder: '如: r1', type: 'text' }
    ],
    build: (f: { unitId: any; rectId: any; }) => `createUnit:${f.unitId || ''};${f.rectId || ''}`,
    parse: (t: string) => {
      const parts = t.split(';');
      return { unitId: parts[0]?.split(':')[1], rectId: parts[1] };
    }
  },

  // --- 关卡控制 ---
  {
    label: '关卡控制',
    value: 'level',
    group: '关卡',
    desc: '控制胜利、失败、箭头指引、全局杀敌等。',
    fields: [
      { key: 'action', label: '逻辑动作', type: 'select', options: LEVEL_ORDER_OPTIONS },
      { key: 'param', label: '参数', placeholder: '如区域ID', type: 'text' }
    ],
    build: (f: { action: string | string[]; param: string; }) => {
      if (!f.action) return 'level;win';
      if (f.action.includes(':')) return `level;${f.action}`;
      return `level;${f.action}${f.param ? ':' + f.param : ''}`;
    },
    parse: (t: string) => {
      const cmd = t.split(';')[1] || '';
      const [action, param] = cmd.split(':');
      return { action, param };
    }
  },

  // --- 单位操作 ---
  {
    label: '单位/角色操作',
    value: 'body',
    group: '单位',
    desc: '控制特定单位的AI、生死、技能、装备等。',
    fields: [
      { key: 'id', label: '单位ID', placeholder: '玉晴, p1, enemy1', type: 'text' },
      { key: 'order', label: '执行动作', type: 'select', options: BODY_ORDER_OPTIONS, placeholder: '请选择要执行的操作' },
      { key: 'property', label: '参数', placeholder: '区域ID或技能ID', type: 'text' }
    ],
    build: (f: { id: any; order: any; property: string; }) => `body:${f.id || ''};${f.order || ''}${f.property ? ':' + f.property : ''}`,
    parse: (t: string) => {
      const parts = t.split(';');
      const id = parts[0]?.split(':')[1];
      const [order, property] = (parts[1] || '').split(':');
      return { id, order, property };
    }
  },

  // --- 对话 ---
  {
    label: '开启对话',
    value: 'say',
    group: '对话',
    desc: '开启或强制关闭对话列表。',
    fields: [
      { key: 'action', label: '动作', type: 'select', options: [
        { label: '开始对话 (startList)', value: 'startList' },
        { label: '强制关闭 (overList)', value: 'overList' }
      ], placeholder: '请选择对话操作'},
      { key: 'listId', label: '对话ID', placeholder: 's1', type: 'text' }
    ],
    build: (f: { action: any; listId: any; }) => `say;${f.action || 'startList'}:${f.listId || ''}`,
    parse: (t: string) => {
      const cmd = t.split(';')[1] || '';
      return { action: cmd.split(':')[0], listId: cmd.split(':')[1] };
    }
  },

  // --- 掉落物 ---
  {
    label: '添加掉落',
    value: 'addDrop',
    group: '掉落物',
    desc: '在指定坐标手动添加掉落物。',
    fields: [
      { key: 'dropId', label: '物品名', placeholder: '如: coin', type: 'text' },
      { key: 'pos', label: '坐标', placeholder: '466, 1180', type: 'text' }
    ],
    build: (f: { dropId: any; pos: any; }) => `addDrop:${f.dropId || ''};${f.pos || ''}`,
    parse: (t: string) => {
      const parts = t.split(';');
      return { dropId: parts[0]?.split(':')[1], pos: parts[1] };
    }
  }
];