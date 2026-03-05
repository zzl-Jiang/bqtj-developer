// client/src/views/Editor/LevelEditor/config/basic.ts

export const LEVEL_BASIC_METAS = [
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
];