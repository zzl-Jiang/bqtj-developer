// src/models/body/BodyDropDefine.ts

import { Expose } from "class-transformer";

/** 掉落定义 <dropD> */
export class BodyDropDefine {
  @Expose() public rareSuit: string | undefined = undefined;
  @Expose() public extraRareArmsArr: string[] = [];
  @Expose() public blackArmsBodyB: boolean | undefined = undefined;

  public toXml(): string {
    let xml = `<dropD`;
    if (this.rareSuit) xml += ` rareSuit="${this.rareSuit}"`;
    if (this.blackArmsBodyB === true) xml += ` blackArmsBodyB="1"`;
    if (this.extraRareArmsArr.length > 0) xml += ` extraRareArmsArr="${this.extraRareArmsArr.join(",")}"`;
    xml += ` />`;
    return xml === `<dropD />` ? "" : xml;
  }
}