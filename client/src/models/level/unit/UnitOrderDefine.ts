// client/src/models/level/unit/UnitOrderDefine.ts

import { Expose, Type } from "class-transformer";
import { OneUnitOrderDefine } from "./OneUnitOrderDefine";

export class UnitOrderDefine {
  [key: string]: any;

  @Expose() public id: string | undefined = undefined;
  @Expose() public camp: string | undefined = undefined;
  @Expose() public numberType: string | undefined = undefined;
  @Expose() public mustSuperB: boolean | undefined = undefined;

  /** 组内默认配置 */
  @Expose()
  @Type(() => OneUnitOrderDefine)
  public defaultUnit: OneUnitOrderDefine | undefined = undefined;

  /** 单位列表 */
  @Expose()
  @Type(() => OneUnitOrderDefine)
  public arr: OneUnitOrderDefine[] = [];

  public toXml(): string {
    let xml = `          <unitOrder id="${this.id || ''}"`;
    if (this.camp != null) xml += ` camp="${this.camp}"`
    if (this.mustSuperB != null) xml += ` mustSuperB="1"`;
    xml += `>\n`;
    if (this.numberType != null) xml += `            <numberType>${this.numberType}</numberType>\n`;
    
    if (this.defaultUnit) {
      // 这里的标签名在原版里是 default，但 TS 关键字建议处理
      xml += `            <default ${this.defaultUnit.toXml().replace('<unit', '').replace('/>', '')} />\n`;
    }

    this.arr.forEach(unit => {
      xml += `            ${unit.toXml()}\n`;
    });

    xml += `          </unitOrder>`;
    return xml;
  }
}