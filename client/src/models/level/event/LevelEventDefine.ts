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

  static createDefault(id: string = 'e1_1'): LevelEventDefine {
    const event = new LevelEventDefine();
    event.id = id;
    
    // 默认条件：敌人数小于1
    event.condition = LevelEventConditionDefine.createDefault();
    
    // 默认指令：生成 enemy1
    event.orders.push(LevelEventOrderDefine.createDefault('createUnit:enemy1;r1'));
    event.orders.push(LevelEventOrderDefine.createDefault('createUnit:enemy1;r2'));
    event.orders.push(LevelEventOrderDefine.createDefault('createUnit:enemy1;r3'));
    
    return event;
  }

  public toXml(): string {
    let xml = `      <event id="${this.id}">\n`;
    xml += `${this.condition.toXml()}\n`;
    this.orders.forEach(order => {
      xml += `${order.toXml()}\n`;
    });
    xml += `            </event>`;
    return xml;
  }
}