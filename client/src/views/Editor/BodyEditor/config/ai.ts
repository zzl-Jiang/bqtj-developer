// client/src/views/Editor/BodyEditor/config/ai.ts

import type { BodyMetaItem } from './types';

export const BODY_AI_METAS: BodyMetaItem[] = [
    {
        key: 'warningRange',
        label: '警戒范围',
        type: 'number',
        desc: '警戒半径 (像素)。默认 1400'
    },
    {
        key: 'outWarningTime',
        label: '脱战时间',
        type: 'number',
        desc: '脱离警戒范围多久后放弃追击 (秒)'
    },
    {
        key: 'attackAIClass',
        label: '攻击 AI 类名',
        type: 'string',
        desc: '攻击 AI 逻辑类名'
    },
    {
        key: 'bulletLauncherClass',
        label: '子弹发射器类名',
        type: 'string',
        desc: '弹道发射器逻辑类名'
    },
    {
        key: 'defaultAiOrder',
        label: '默认 AI 指令',
        type: 'string',
        desc: '默认 AI 行为指令'
    },
    {
        key: 'extraAIClassLabel',
        label: '额外 AI 类标签',
        type: 'string'
    },
    {
        key: 'oneAiLabel',
        label: '单体 AI 标签',
        type: 'string'
    },
    {
        key: 'attackMustCanShootB',
        label: '攻击必须可射击',
        type: 'switch',
        desc: '攻击前是否必须检测射击视线 (Line of Sight)'
    },
];
