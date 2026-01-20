// client/src/models/level/event/LevelEventDefineGroup.ts

import { Expose, Type } from "class-transformer";
import { LevelEventDefine } from "./LevelEventDefine";

// 定义一个 Group 类来匹配 XML 中的 <group> 标签
export class LevelEventGroup {
  @Expose()
  @Type(() => LevelEventDefine)
  public events: LevelEventDefine[] = [];
}

export class LevelEventDefineGroup {
  @Expose()
  @Type(() => LevelEventGroup)
  public groups: LevelEventGroup[] = [];

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