// client/src/models/level/LevelDefine.ts

import { Expose, Type } from "class-transformer";
import { LevelInfoDefine } from "./info/LevelInfoDefine";
import { UnitOrderDefineGroup } from "./unit/UnitOrderDefineGroup";
import { MapRectGroup } from "./rect/MapRectGroup";
import { LevelEventDefineGroup } from "./event/LevelEventDefineGroup";

export class LevelDefine {
  // 允许通过字符串索引访问属性，用于动态表单绑定
  [key: string]: any;

  /** 关卡 id */
  @Expose()
  public name: string | undefined = undefined;

  /** 关卡显示中文名称 */
  @Expose()
  public cnName: string | undefined = undefined;

  /** 关卡描述 */
  @Expose()
  public descrip: string | undefined = undefined;

  /** 场景标签 (名称) */
  @Expose()
  public sceneLabel: string | undefined = undefined;

  /** 关卡详细配置信息 */
  @Expose()
  @Type(() => LevelInfoDefine)
  public info: LevelInfoDefine = new LevelInfoDefine();

  /** 关卡单位组配置信息 */
  @Expose()
  @Type(() => UnitOrderDefineGroup)
  public unitG: UnitOrderDefineGroup = new UnitOrderDefineGroup(); 

  /** 关卡区域配置信息 */
  @Expose()
  @Type(() => MapRectGroup)
  public rectG: MapRectGroup = new MapRectGroup();

  /** 关卡事件组配置信息 */
  @Expose()
  @Type(() => LevelEventDefineGroup)
  public eventG: LevelEventDefineGroup = new LevelEventDefineGroup();

  /**
   * 静态工厂方法：创建一个带有预设模板的关卡
   */
  static createDefault(name: string): LevelDefine {
    const level = new LevelDefine();
    level.name = name;
    level.cnName = "新关卡";
    level.sceneLabel = "WoTu";
    level.descrip = "这是一个示例关卡描述";
    
    // 组装单位配置 (一个默认发兵组和单位)
    level.unitG = UnitOrderDefineGroup.createDefault();

    // 组装事件配置
    level.eventG = LevelEventDefineGroup.createDefault();

    level.info.enemyLv = 99;
    return level;
  }

  public toXml() {
    let xml = `      <level name="${this.name || 'empty'}"`;
    if (this.cnName != null) xml += ` cnName="${this.cnName}"`;
    if (this.descrip != null) xml += ` descrip="${this.descrip}"`;
    if (this.father != null) xml += ` father="${this.father}"`;
    xml += `>\n`;

    // 组装子标签节点
    if (this.sceneLabel != null) {
      xml += `        <sceneLabel>${this.sceneLabel}</sceneLabel>\n`;
    }

    // 组装 info 节点
    const infoXml = this.info?.toXml();
    if (infoXml) {
      xml += infoXml + "\n";
    }

    // 组装 unitG 节点
    const unitGXml = this.unitG?.toXml();
    if (unitGXml) {
      xml += unitGXml + "\n";
    }

    // 组装 rectG 节点
    const rectGXml = this.rectG?.toXml();
    if (rectGXml) {
      xml += rectGXml + "\n";
    }

    // 组装 eventG 节点
    const eventGXml = this.eventG?.toXml();
    if (eventGXml) {
      xml += eventGXml + "\n";
    }

    xml += `      </level>`;
    return xml;
  }
}