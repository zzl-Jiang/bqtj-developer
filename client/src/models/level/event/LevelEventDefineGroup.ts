// client/src/models/level/event/LevelEventDefineGroup.ts

import { Expose, Type } from "class-transformer";
import { LevelEventDefine } from "./LevelEventDefine";

// 定义一个 Group 类来匹配 XML 中的 <group> 标签
export class LevelEventGroup {
  @Expose()
  @Type(() => LevelEventDefine)
  public events: LevelEventDefine[] = [];

  static createDefault(): LevelEventGroup {
    const group = new LevelEventGroup();
    group.events.push(LevelEventDefine.createDefault());
    return group;
  }
}

export class LevelEventDefineGroup {
  @Expose()
  @Type(() => LevelEventGroup)
  public groups: LevelEventGroup[] = [];
  
  // 默认示例发兵集
  static createDefault(): LevelEventDefineGroup {
    const groupG = new LevelEventDefineGroup();
    // 组装中层的发兵组
    groupG.groups.push(LevelEventGroup.createDefault());
    return groupG;
  }

  public toXml(): string {
    if (this.groups.length === 0) return "";
    
    let xml = `        <eventG>\n`;
    this.groups.forEach(g => {
      xml += `          <group>\n`;
      g.events.forEach(e => {
        xml += `      ${e.toXml()}\n`;
      });
      xml += `          </group>\n`;
    });
    xml += `        </eventG>`;
    return xml;
  }
}