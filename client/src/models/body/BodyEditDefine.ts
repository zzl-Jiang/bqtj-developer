// src/models/body/BodyMoreDefine.ts

import { Expose } from "class-transformer";

/** 编辑器定义 <editD> */
export class BodyEditDefine {
  @Expose() public raIfNoMapB: boolean | undefined = undefined;

  public toXml(): string {
    if (this.raIfNoMapB != null) return `<editD raIfNoMapB="${this.raIfNoMapB ? 1 : 0}" />`;
    return "";
  }
}