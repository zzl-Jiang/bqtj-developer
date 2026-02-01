// client/src/views/Editor/SayEditor/config/index.ts

export const SAY_LIST_METAS = [
  { key: 'name', label: '对话组 ID (name)', type: 'string', desc: '唯一标识，例如 s1' },
  { 
    key: 'levelName', 
    label: '关联关卡 (levelName)', 
    type: 'select', 
    options: [], // 初始为空，由组件动态注入
    desc: '该对话所属的关卡名称 (根据已有关卡动态生成)。\n支持创建选项，但是建议先建立对应关卡模板。' 
  },
  { key: 'oneB', label: '仅触发一次 (oneB)', type: 'switch', desc: '开启后该对话逻辑运行一次后失效' }
];

export const SAY_ITEM_METAS = [
  { 
    key: 'target', 
    label: '说话者 (target)', 
    type: 'input',
    desc: `谁在说话。支持：
    1. 输入单位中文名称，若不存在显示头像;
    2. 输入定义的 unitId;
    3. 输入任意文字;
    4. 输入 "xxx/手机" 触发手机样式，单位在场也可显示头像。`
  },
  { key: 'pointer', label: '指向 (pointer)', type: 'string', desc: '对话指向谁 (填 ID 或中文名称)' },
  { key: 'iconUrl', label: '资源 (iconUrl)', type: 'select_png', desc: '对话框显示的头像，可以使用 png 定义资源' },
  { key: 'r', label: '条件 (r)', type: 'multi_select',
    options: [
      {
        label: '小樱 p1 (Girl)',
        value: 'Girl'
      },
      {
        label: '小白 p1 (Striker)',
        value: 'Striker'
      },
      {
        label: '文杰 p1 (WenJie)',
        value: 'WenJie'
      },
      {
        label: '非小白文杰 p1 (noStrikerWenJie)',
        value: 'noStrikerWenJie'
      }
    ],
    desc: '特定角色才显示此对话' }
];