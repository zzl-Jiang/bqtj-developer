// client/src/views/Editor/configs/pngMeta.ts

import { PngDefine } from '../../../models/PngDefine';

/** 定义接口，限制 key 必须是 PngDefine 的属性名之一 */
export interface PngMetaItem {
  /** 属性名 */
  key: keyof PngDefine;

  /** 中文标签 */
  label: string;

  /** 数值类型 */
  type: 'string' | 'number';

  /** 可选的说明 */
  desc?: string;
}

export const PNG_UI_META: PngMetaItem[] = [
  {
    key: 'name',
    label: '名称',
    type: 'string',
    desc: '英文 ID'
  },
  {
    key: 'url',
    label: 'URL',
    type: 'string',
    desc: '图片链接'
  },
  { key: 'x',
    label: 'X',
    type: 'number'
  },
  { key: 'y',
    label: 'Y',
    type: 'number'
  },
  { key: 'scaleX',
    label: '缩放X',
    type: 'number'
  },
  { key: 'scaleY',
    label: '缩放Y',
    type: 'number'
  }
];