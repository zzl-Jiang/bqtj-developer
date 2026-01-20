// client/src/views/Editor/LevelEitor/config/rect.ts

export const RECT_METAS = {
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