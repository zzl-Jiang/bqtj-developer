// client/src/views/Editor/BodyEditor/config/ai.ts

import type { BodyMetaItem } from './types';

export const BODY_AI_METAS: BodyMetaItem[] = [
  {
    key: 'warningRange',
    label: '警戒范围 (warningRange)',
    type: 'number',
    desc: '警戒半径 (像素)。默认 1400'
  },
  {
    key: 'outWarningTime',
    label: '脱战时间 (outWarningTime)',
    type: 'number',
    desc: '脱离警戒范围多久后放弃追击 (秒)'
  },
  {
    key: 'attackAIClass',
    label: '攻击 AI 类名 (attackAIClass)',
    type: 'select',
    options: [
      { label: '载具 (CarAttack_AI)', value: 'CarAttack_AI', desc: '载具的攻击 AI，有些太空单位也会用。' }
    ],
    desc: '攻击 AI 逻辑类名，没有需求留空即可'
  },
  {
    key: 'bulletLauncherClass',
    label: '子弹类名 (bulletLauncherClass)',
    type: 'string',
    desc: '弹道发射器逻辑类名'
  },
  {
    key: 'defaultAiOrder',
    label: '默认 AI 指令 (defaultAiOrder)',
    type: 'string',
    desc: '默认 AI 行为指令'
  },
  {
    key: 'extraAIClassLabel',
    label: '额外 AI 类标签 (extraAIClassLabel)',
    type: 'select',
    options: [
      { label: '黑暗骑士 (BlackKnights_AIExtra)', value: 'BlackKnights_AIExtra' },
      { label: '狂人机器 (Warrior_AIExtra)', value: 'Warrior_AIExtra' },
      { label: '狂野收割者 (FightPig_AIExtra)', value: 'FightPig_AIExtra' },
      { label: '持枪通用 (Hero_AIExtra)', value: 'Hero_AIExtra' },
      { label: '黑暗雷尔 (BlackLaer_AIExtra)', value: 'BlackLaer_AIExtra' },
      { label: '掘地兽 (DiggingBeast_AIExtra)', value: 'DiggingBeast_AIExtra' },
      { label: '斩之使者 (HookWitch_AIExtra)', value: 'HookWitch_AIExtra' },
      { label: '狂战尸 (FightKing_AIExtra)', value: 'FightKing_AIExtra' },
      { label: '古飙 (CheetahCar_AIExtra)', value: 'CheetahCar_AIExtra' },
      { label: '异祖龙飞行器 (FlyDragonAir_AIExtra)', value: 'FlyDragonAir_AIExtra' },
      { label: '多肉 (MeatyZombie_AIExtra)', value: 'MeatyZombie_AIExtra' },
      { label: '防毒僵尸 (GasDefense_AIExtra)', value: 'GasDefense_AIExtra' },
      { label: '异火龙 (FireDragon_AIExtra)', value: 'FireDragon_AIExtra' },
      { label: '末日坦克 (LastdayTank_AIExtra)', value: 'LastdayTank_AIExtra' },
      { label: '狂野收割者 (FightPig_AIExtra)', value: 'FightPig_AIExtra' },
      { label: '童灵尸 (SnowThin_AIExtra)', value: 'SnowThin_AIExtra' },
      { label: '关东尸 (SnowFatty_AIExtra)', value: 'SnowFatty_AIExtra' },
      { label: '女爵尸 (SnowGirl_AIExtra)', value: 'SnowGirl_AIExtra' },
      { label: '野帝 (IceMan_AIExtra)', value: 'IceMan_AIExtra' },
      { label: '阿巴达斯 (YouthWolf_AIExtra)', value: 'YouthWolf_AIExtra' },
      { label: '看门狗 (Watchdog_AIExtra)', value: 'Watchdog_AIExtra' },
      { label: '幻影Z (PhantomZ_AIExtra)', value: 'PhantomZ_AIExtra' },
      { label: '毒魔 (PoisonDemon_AIExtra)', value: 'PoisonDemon_AIExtra' },
      { label: '毒精灵 (Antimatter_AIExtra)', value: 'Antimatter_AIExtra' },
      { label: '守望之翼飞行器 (WatchEagleAir_AIExtra)', value: 'WatchEagleAir_AIExtra' },
      { label: '冥王 (IronChiefS_AIExtra)', value: 'IronChiefS_AIExtra' },
      { label: '嗜血尸狼 (ZombieWolf_AIExtra)', value: 'ZombieWolf_AIExtra' },
      { label: '雷克 (PetLake_AIExtra)', value: 'PetLake_AIExtra' },
      { label: '蝙蝠 (Bat_AIExtra)', value: 'Bat_AIExtra' },
      { label: '毒蛛 (SmallSpider_AIExtra)', value: 'SmallSpider_AIExtra' },
      { label: '冥刃游尸 (ZombiePo_AIExtra)', value: 'ZombiePo_AIExtra' },
      { label: '巨毒尸 (HugePosion_AIExtra)', value: 'HugePosion_AIExtra' },
      { label: '暴君 (Skeleton_AIExtra)', value: 'Skeleton_AIExtra' },
      { label: '无疆骑士 (Knights_AIExtra)', value: 'Knights_AIExtra' },
      { label: '狂战狼 (FightWolf_AIExtra)', value: 'FightWolf_AIExtra' },
      { label: '掘金尸 (NuggetsZombie_AIExtra)', value: 'NuggetsZombie_AIExtra' },
      { label: '虚炎狼坐骑 (FireWolf_AIExtra)', value: 'FireWolf_AIExtra' },
      { label: '铁犬 (IronDog_AIExtra)', value: 'IronDog_AIExtra' },
      { label: '王者兔 (KingRabbit_AIExtra)', value: 'KingRabbit_AIExtra' },
      { label: '运毒尸 (TransportZombie_AIExtra)', value: 'TransportZombie_AIExtra' },
      { label: '幻影X (PhantomX_AIExtra)', value: 'PhantomX_AIExtra' },
      { label: '骷髅巫师 (SkeletalMage_AIExtra)', value: 'SkeletalMage_AIExtra' },
      { label: '球形闪电 (BallLightning_AIExtra)', value: 'BallLightning_AIExtra' },
      { label: '守望之翼 (WatchEagle_AIExtra)', value: 'WatchEagle_AIExtra' },
      { label: '异祖龙 (FlyDragon_AIExtra)', value: 'FlyDragon_AIExtra' },
      { label: '虚炎狼 (FireWolf_AIExtra)', value: 'FireWolf_AIExtra' },
      { label: '虚洪螈 (Salamander_AIExtra)', value: 'Salamander_AIExtra' },
      { label: '虚晶蝎 (VirtualScorpion_AIExtra)', value: 'VirtualScorpion_AIExtra' },
      { label: '炸裂者 (DryFrog_AIExtra)', value: 'DryFrog_AIExtra' },
      { label: '急速守卫 (FastGuards_AIExtra)', value: 'FastGuards_AIExtra' },
      { label: '编织者 (Weaver_ExtraAI)', value: 'Weaver_ExtraAI' },
      { label: '决斗者 (Duelist_AIExtra)', value: 'Duelist_AIExtra' },
      { label: '反物质 (Antimatter_AIExtra)', value: 'Antimatter_AIExtra' }
    ],
    desc: '大部分选项逻辑都为对应单位专用。此处不进行额外解释'
  },
  {
    key: 'oneAiLabel',
    label: '单体 AI 标签 (oneAiLabel)',
    type: 'select',
    options: [
      { label: '武器测试 (armsDpsTest)', value: 'armsDpsTest' },
      { label: '战神 (Madboss)', value: 'Madboss' },
      { label: '小美 (XiaoMei)', value: 'XiaoMei' },
      { label: '突击手 (striker)', value: 'striker', desc: '小白' },
      { label: '法师 (mage)', value: 'mage', desc: '小樱' },
      { label: '狙击手 (sniper)', value: 'sniper', desc: '藏师' },
      { label: '步枪手 (rifle)', value: 'rifle' },
      { label: '散弹枪手 (shotgun)', value: 'shotgun', desc: '文杰' },
      { label: '战斗射击 (FightShooter)', value: 'FightShooter', desc: '目标无敌不逃离' },
    ],
    desc: '持枪类单位的单体 AI 逻辑预设。'
  }
];
