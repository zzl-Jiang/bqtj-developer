// client/src/models/level/event/LevelEventOrderDefine.ts

import { Expose } from "class-transformer";

export class LevelEventOrderDefine {
  // 对应 XML 标签内的文本内容，例如 "createUnit:enemy;史莱姆:r1"
  @Expose() public xmlText: string = "";

  /**
   * 将 UI 编辑的属性重新封装回字符串逻辑
   */
  public toXml(): string {
    return `              <order>${this.xmlText}</order>`;
  }
}