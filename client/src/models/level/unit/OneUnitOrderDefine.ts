// client/src/models/level/unit/OneUnitOrderDefine.ts

import { Expose } from "class-transformer";

export class OneUnitOrderDefine {
  [key: string]: any;

  @Expose() public id: string | undefined = undefined;
  @Expose() public camp: string | undefined = undefined; // enemy, we
  @Expose() public name: string | undefined = undefined; // 内部名
  @Expose() public cnName: string | undefined = undefined; // 中文名
  @Expose() public num: number | undefined = undefined; // 数量/权重
  @Expose() public unitType: string | undefined = undefined; // normal, boss, super
  @Expose() public isTrueBossB: boolean | undefined = undefined;
  @Expose() public levelSetting: string | undefined = undefined;
  @Expose() public aiOrder: string | undefined = undefined;
  @Expose() public eacapeB: boolean | undefined = undefined;
  @Expose() public warningRange: number | undefined = undefined;
  @Expose() public skillCloseB: boolean | undefined = undefined;
  @Expose() public onlyLevelSkillB: boolean | undefined = undefined;
  @Expose() public skillArr: string[] | undefined = undefined;
  @Expose() public noSuperB: boolean | undefined = undefined;
  @Expose() public imgType: string | undefined = undefined; // bmp, swf
  @Expose() public noUnderHurtB: boolean | undefined = undefined;
  @Expose() public extraTaskB: boolean | undefined = undefined;
  @Expose() public avtiveSkillCdOverT: number | undefined = undefined;
  
  // 倍率类
  @Expose() public lifeMul: number | undefined = undefined;
  @Expose() public dpsMul: number | undefined = undefined;
  @Expose() public expMul: number | undefined = undefined;
  @Expose() public coinMul: number | undefined = undefined;
  @Expose() public headHurtMul: number | undefined = undefined;

  @Expose() public dpsSpecielLabel: string | undefined = undefined;
  @Expose() public dropLabel: string | undefined = undefined;
  @Expose() public dieGotoState: string | undefined = undefined;
  @Expose() public lastB: boolean | undefined = undefined;
  @Expose() public armsRange: string[] | undefined = undefined;

  /**
   * 生成 <unit ... /> 属性
   */
  public toXml(): string {
    let attrs = "";
    for (const [key, value] of Object.entries(this)) {
      if (value === undefined || value === null || typeof value === 'function') continue;
      if (key === 'skillArr' || key === 'armsRange') {
        if ((value as string[]).length > 0) attrs += ` ${key}="${(value as string[]).join(',')}"`;
      } else if (typeof value === "boolean") {
        if (value === true) attrs += ` ${key}="1"`;
      } else {
        attrs += ` ${key}="${value}"`;
      }
    }
    if (!attrs) return "";
    return `<unit${attrs}/>`;
  }
}