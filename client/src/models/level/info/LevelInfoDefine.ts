// client/src/models/level/info/LevelInfoDefine.ts

import { Expose } from "class-transformer";

/**
 * 关卡详细信息定义
 * 对应 XML 中的 <info ... /> 节点，主要存储逻辑开关、难度、限制条件等
 */
export class LevelInfoDefine {
  [key: string]: any;

  /** 怪物等级 */
  @Expose()
  public enemyLv: number | undefined = undefined;

  /** 难度系数 */
  @Expose()
  public diff: number | undefined = undefined;

  /** 关卡背景音乐名称 */
  @Expose()
  public music: string | undefined = undefined;

  /** 结束警告文本 */
  @Expose()
  public overWarn: string | undefined = undefined;

  /** 是否禁用更多队友 */
  @Expose()
  public noMoreB: boolean | undefined = undefined;

  /** 是否允许队友 */
  @Expose()
  public allMoreB: boolean | undefined = undefined;

  /** 是否禁用队友 */
  @Expose()
  public noPartnerB: boolean | undefined = undefined;

  /** 是否禁用尸宠 */
  @Expose()
  public noPetB: boolean | undefined = undefined;

  /** 是否禁用载具 */
  @Expose()
  public noVehicleB: boolean | undefined = undefined;

  /** 是否禁用道具 */
  @Expose()
  public noPropsB: boolean | undefined = undefined;

  /** 是否禁用装置 */
  @Expose()
  public noDeviceB: boolean | undefined = undefined;

  /** 是否掉落小地图道具 */
  @Expose()
  public dropSmallMapB: boolean | undefined = undefined;

  /** 是否禁用财宝僵尸 */
  @Expose()
  public noTreasureB: boolean | undefined = undefined;

  /** 是否强制单人模式 */
  @Expose()
  public mustSingleB: boolean | undefined = undefined;

  /** 视野覆盖半径/类型 */
  @Expose()
  public sightCover: number | undefined = undefined;

  /** 是否是哑关 (无对话/剧情等) */
  @Expose()
  public dumB: boolean | undefined = true;

  /** 关卡限时 (秒) */
  @Expose()
  public tm: number | undefined = undefined;

  /** 是否为困难模式 */
  @Expose()
  public hb: boolean | undefined = undefined;

  /** 结束后是否返回原界面 */
  @Expose()
  public overBackB: boolean | undefined = true;

  /** 首次失败标志 */
  @Expose()
  public firstLostB: boolean | undefined = undefined;

  /** 是否禁止重新开始 */
  @Expose()
  public noRestartB: boolean | undefined = undefined;

  /** 是否禁用 AI */
  @Expose()
  public noAIB: boolean | undefined = undefined;

  /** 掉落无重力时间 */
  @Expose()
  public dropNoGravityTime: number | undefined = undefined;

  /** 自定义逻辑字段 (diy) */
  @Expose()
  public diy: string | undefined = undefined;

  /** 自定义模式字段 (modeDiy) */
  @Expose()
  public modeDiy: string | undefined = undefined;

  /** 预加载子弹列表 */
  @Expose()
  public preBulletArr: string[] | undefined = undefined;

  /** 预加载技能列表 */
  @Expose()
  public preSkillArr: string[] | undefined = undefined;

  /** P1 武器列表 */
  @Expose()
  public p1ArmsArr: string[] | undefined = undefined;

  /** P1 武器类型 */
  @Expose()
  public p1ArmsT: string | undefined = undefined;

  /**
   * 生成 <info ... /> XML 字符串
   * 根据原版逻辑，info 的属性全部写在属性位上
   */
  public toXml(): string {
    let attrs = "";
    const entries = Object.entries(this);

    for (const [key, value] of entries) {
      if (value === undefined || value === null) continue;
      
      // 处理布尔值，原版 XML 常用 "1" 表示 true
      if (typeof value === "boolean") {
        if (['dumB', 'overBackB'].includes(key)) continue;
        if (value === true) attrs += ` ${key}="1"`;
      } 
      // 处理数组，转为逗号分隔
      else if (Array.isArray(value)) {
        if (value.length > 0) attrs += ` ${key}="${value.join(',')}"`;
      }
      // 处理数字和字符串
      else {
        attrs += ` ${key}="${value}"`;
      }
    }

    return attrs ? `        <info${attrs}/>` : "";
  }
}