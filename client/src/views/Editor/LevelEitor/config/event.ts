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

// 快捷模板：用于快速填入 xmlText 字符串
export const EVENT_TEMPLATES = {
  conditions: [
    { label: '敌人数量少于', value: 'enemyNumber:less_5' },
    { label: '进入区域', value: 'hitMapRect:区域ID;p1' },
    { label: '存活时间超过', value: 'time:greater_30' },
    { label: '对话结束', value: 'say:listOver' }
  ],
  orders: [
    { label: '生成敌军', value: 'createUnit:enemy;单位ID:区域ID' },
    { label: '对话指令', value: 'say:对话列表ID' },
    { label: '添加技能', value: 'body:p1;addSkill:技能ID' },
    { label: '关卡胜利', value: 'level:win' }
  ]
};