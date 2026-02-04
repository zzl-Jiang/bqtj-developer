// src/models/body/BodyMoreDefine.ts

import { Expose } from "class-transformer";

/** 更多数值定义 <moreD> */
export class BodyMoreDefine {
  @Expose() public dpsMul: number | undefined = undefined;
  @Expose() public underHurtMul: number | undefined = undefined;
  @Expose() public arenaUnderHurtMul: number | undefined = undefined;
  @Expose() public studySkillLvAdd: number | undefined = undefined;
  @Expose() public firstLv: number | undefined = undefined;

  public toXml(): string {
    let xml = `<moreD`;

    if (this.dpsMul != null) xml += ` dpsMul="${this.dpsMul}"`;
    if (this.underHurtMul != null) xml += ` underHurtMul="${this.underHurtMul}"`;
    if (this.arenaUnderHurtMul != null) xml += ` arenaUnderHurtMul="${this.arenaUnderHurtMul}"`;
    if (this.studySkillLvAdd != null) xml += ` studySkillLvAdd="${this.studySkillLvAdd}"`;
    if (this.firstLv != null) xml += ` firstLv="${this.firstLv}"`;

    xml += ` />`;
    
    return xml === `<moreD />` ? "" : xml;
  }
}