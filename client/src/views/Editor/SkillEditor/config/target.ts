// client/src/views/Editor/SkillEditor/config/target.ts

import type { SkillMetaItem } from './types';
import * as Opts from './options';

export const TARGET_META: SkillMetaItem[] = [
  {
    key: 'target',
    label: '目标参照 (target)',
    type: 'select',
    options: Opts.TARGET_OPTIONS,
    desc: '选择作为参考的目标。\n如果只有单个特定目标，直接在此处选择即可。\n注意，该页面只有这一个属性是必选的。'
  },
  {
    key: 'chooseType',
    label: '选择模式 (chooseType)',
    type: 'select',
    options: Opts.CHOOSE_TYPE_OPTIONS,
    desc: '(可选)\n选取目标的形式。\n以一定方式或规则筛选目标，需配合 camp 使用。'
  },
  {
    key: 'camp',
    label: '目标阵营 (camp)',
    type: 'select',
    options: Opts.CAMP_OPTIONS,
    desc: '(可选)\n实际选取目标的阵营。\n需配合 chooseType 使用。'
  },
  {
    key: 'unitType',
    label: '单位类型 (unitType)',
    type: 'select',
    options: Opts.UNIT_TYPE_OPTIONS,
    desc: '(可选)\n选取限定的单位类型。\n只包含普通、精英、首领。'
  },
  {
    key: 'systemType',
    label: '单位大类 (systemType)',
    type: 'select',
    options: Opts.SYSTEM_TYPE_OPTIONS,
    desc: '(可选)\n单位大类的限定。\n普通或持枪。'
  },
  {
    key: 'limitNum',
    label: '限制数量 (limitNum)',
    type: 'number',
    desc: '(可选)\n影响或选择的单位数量限制。'
  },
  {
    key: 'noMeB',
    label: '排除本体 (noMeB)',
    type: 'switch',
    desc: '是否排除本体不被选择纳入。'
  },
  {
    key: 'noMainB',
    label: '排除P1 (noMainB)',
    type: 'switch',
    desc: '是否排除P1角色不被选择纳入。'
  },
  {
    key: 'noExistB',
    label: '允许不存在 (noExistB)',
    type: 'switch',
    desc: '是否允许将不存在的角色纳入。'
  },
  {
    key: 'targetMustLiveB',
    label: '目标存活 (targetMustLiveB)',
    type: 'switch',
    desc: '是否选择的目标必须存活。\n大部分只用来搭配 meSummonedFather，一般用不上。'
  },
  {
    key: 'arenaB',
    label: '竞技场生效 (arenaB)',
    type: 'switch',
    desc: '竞技场或竞技模式中是否生效。\n默认值就是生效。'
  },
  {
    key: 'noVehicleB',
    label: '排除载具 (noVehicleB)',
    type: 'switch',
    desc: '是否排除所有载具目标。'
  },
  {
    key: 'noRaceType',
    label: '排除种族 (noRaceType)',
    type: 'select',
    options: Opts.RACE_TYPE_OPTIONS,
    desc: '(可选)\n排除特定种族单位。'
  },
  {
    key: 'bodyName',
    label: '指定单位 (bodyName)',
    type: 'string',
    desc: '(可选)\n指定单位名称 (ID) 的单位生效。'
  },
  {
    key: 'alert',
    label: '特殊判定 (alert)',
    type: 'select',
    options: Opts.ALERT_OPTIONS,
    desc: '(可选)\n一些特殊判定，基本不会用到。'
  },
];