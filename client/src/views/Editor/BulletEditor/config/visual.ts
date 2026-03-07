// client/src/views/Editor/BulletEditor/config/visual.ts
import type { BulletMetaItem } from './types';

export const BULLET_VISUAL_METAS: BulletMetaItem[] = [
    { key: 'playImgLabel', label: '资源标签 (playImgLabel)', type: 'string' },
    // 这里简化展示，实际 ImgUrlDefine 还有很多子属性
    { key: 'bulletImg.url', label: '子弹图片 URL', type: 'string' },
    { key: 'bulletLeftImg.url', label: '向左图片 URL', type: 'string' },
    { key: 'fireImg.url', label: '开火特效 URL', type: 'string' },
    { key: 'hitImg.url', label: '击中特效 URL', type: 'string' },
    { key: 'hitFloorImg.url', label: '击中地面 URL', type: 'string' },
    { key: 'smokeImg.url', label: '烟雾特效 URL', type: 'string' },
    { key: 'selfBoomImg.url', label: '自爆特效 URL', type: 'string' },
];
