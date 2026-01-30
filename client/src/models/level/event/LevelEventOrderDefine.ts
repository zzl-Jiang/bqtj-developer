// client/src/models/level/event/LevelEventOrderDefine.ts

import { Expose } from "class-transformer";

export class LevelEventOrderDefine {
  // 对应 XML 标签内的文本内容，例如 "createUnit:enemy1;r1"
  @Expose() public xmlText: string = "";

  static createDefault(text: string = 'createUnit:enemy1;r1'): LevelEventOrderDefine {
    const order = new LevelEventOrderDefine();
    order.xmlText = text;
    return order;
  }

  /**
   * 将 UI 编辑的属性重新封装回字符串逻辑
   */
  public toXml(): string {
    return `              <order>${this.xmlText}</order>`;
  }
}