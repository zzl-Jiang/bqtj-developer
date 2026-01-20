// client/src/models/level/event/LevelEventDefine.ts

import { Expose, Type } from "class-transformer";
import { LevelEventConditionDefine } from "./LevelEventConditionDefine";
import { LevelEventOrderDefine } from "./LevelEventOrderDefine";

export class LevelEventDefine {
  @Expose() public id: string = "";

  @Expose()
  @Type(() => LevelEventConditionDefine)
  public condition: LevelEventConditionDefine = new LevelEventConditionDefine();

  @Expose()
  @Type(() => LevelEventOrderDefine)
  public orders: LevelEventOrderDefine[] = [];

  public toXml(): string {
    let xml = `      <event id="${this.id}">\n`;
    xml += this.condition.toXml() + "\n";
    this.orders.forEach(order => {
      xml += order.toXml() + "\n";
    });
    xml += `            </event>`;
    return xml;
  }
}