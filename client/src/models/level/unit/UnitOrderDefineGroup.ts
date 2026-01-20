// client/src/models/level/unit/UnitOrderDefineGroup.ts

import { Expose, Type } from "class-transformer";
import { UnitOrderDefine } from "./UnitOrderDefine";
import { OneUnitOrderDefine } from "./OneUnitOrderDefine";

export class UnitOrderDefineGroup {
  /** 全局默认单位属性 */
  @Expose()
  @Type(() => OneUnitOrderDefine)
  public allDefault: OneUnitOrderDefine = new OneUnitOrderDefine();

  /** 单位组列表 (原版是 Object，可视化建议用 Array) */
  @Expose()
  @Type(() => UnitOrderDefine)
  public unitOrders: UnitOrderDefine[] = [];

  public toXml(): string {
    let xml = `        <unitG>\n`;
    let tempXml = "";
    // 全局默认
    const defXml = this.allDefault.toXml().replace('<unit', '<allDefault').replace('/>', '/>');
    if (defXml) tempXml += `          ${defXml}\n`;
    
    // 遍历组
    this.unitOrders.forEach(order => {
      tempXml += order.toXml() + "\n";
    });
    if (!tempXml) return "";

    xml += tempXml;
    xml += `        </unitG>`;
    return xml;
  }
}