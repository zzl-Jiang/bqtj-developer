// src/models/body/BodyMotionDefine.ts

import { Expose } from "class-transformer";

/** 运动物理定义 <motionD> */
export class BodyMotionDefine {
  [key: string]: any;

  @Expose() public F_G: number | undefined = undefined;
  @Expose() public F_I: number | undefined = undefined;
  @Expose() public F_F: number | undefined = undefined;
  @Expose() public F_AIR: number | undefined = undefined;
  @Expose() public tween: number | undefined = undefined;
  @Expose() public jumpDelayT: number | undefined = undefined;
  @Expose() public moveWhenVB: boolean | undefined = undefined;
  @Expose() public jumpMul: number | undefined = undefined;
  @Expose() public vRan: number | undefined = undefined;
  @Expose() public imgRaB: boolean | undefined = undefined;
  @Expose() public dieEN: number | undefined = undefined;
  @Expose() public headRectScale: number | undefined = undefined;

  public toXml(): string {
    let xml = `<motionD`;

    // 如果这些是作为 XML 属性 (Attribute)
    if (this.F_G != null) xml += ` F_G="${this.F_G}"`;
    if (this.F_I != null) xml += ` F_I="${this.F_I}"`;
    if (this.F_F != null) xml += ` F_F="${this.F_F}"`;
    if (this.F_AIR != null) xml += ` F_AIR="${this.F_AIR}"`;
    if (this.tween != null) xml += ` tween="${this.tween}"`;
    if (this.jumpDelayT != null) xml += ` jumpDelayT="${this.jumpDelayT}"`;
    if (this.moveWhenVB === true) xml += ` moveWhenVB="1"`;
    if (this.jumpMul != null) xml += ` jumpMul="${this.jumpMul}"`;
    if (this.vRan != null) xml += ` vRan="${this.vRan}"`;
    if (this.imgRaB === true) xml += ` imgRaB="1"`;
    if (this.dieEN != null) xml += ` dieEN="${this.dieEN}"`;
    if (this.headRectScale != null) xml += ` headRectScale="${this.headRectScale}"`;

    xml += ` />`;

    return xml === `<motionD />` ? "" : xml;
  }
}