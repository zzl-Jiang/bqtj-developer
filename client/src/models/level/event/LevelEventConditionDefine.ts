// client/src/models/level/event/LevelEventConditionDefine.ts

import { Expose } from "class-transformer";

export class LevelEventConditionDefine {
  [key: string]: any;

  // 属性位 (Attributes)
  @Expose() public delay: number | undefined = undefined;
  @Expose() public doNumber: number = 1;
  @Expose() public extraText: string | undefined = undefined;
  @Expose() public orderChooseType: string | undefined = undefined; // randomOne, sequenceOne 等

  // 文本位 (内容)，例如 "hitMapRect:r1;p1"
  @Expose() public xmlText: string = "";

  static createDefault(text: string = 'enemyNumber:less_1'): LevelEventConditionDefine {
    const cond = new LevelEventConditionDefine();
    cond.xmlText = text;
    cond.doNumber = 3;
    cond.orderChooseType = "randomOne";
    return cond;
  }

  public toXml(): string {
    let attrs = ``;
    if (this.delay != null) attrs += ` delay="${this.delay}"`;
    if (this.doNumber != null) attrs += ` doNumber="${this.doNumber}"`;
    if (this.extraText != null) attrs += ` extraText="${this.extraText}"`;
    if (this.orderChooseType != null) attrs += ` orderChooseType="${this.orderChooseType}"`;
    
    if (!attrs && !this.xmlText) return '';
    return `              <condition${attrs}>${this.xmlText}</condition>`;
  }
}