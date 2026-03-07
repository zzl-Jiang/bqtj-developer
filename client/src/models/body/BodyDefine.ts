// src/models/body/BodyDefine.ts

import { Expose, Type } from "class-transformer";
import { BodyDropDefine } from "./BodyDropDefine";
import { BodyMoreDefine } from "./BodyMoreDefine";
import { BodyMotionDefine } from "./BodyMotionDefine";
import { BodyEditDefine } from "./BodyEditDefine";
import { ImageUrlDefine } from "../common/ImgUrlDefine";
import { BodyAttackDefine } from "./BodyAttackDefine";
import type { IO_Rectangle } from "../common/IO_Rectangle";

export class BodyDefine {
  [key: string]: any;

  // --- 基础信息 ---
  @Expose()
  public name: string | undefined = undefined;

  @Expose()
  public cnName: string | undefined = undefined;

  @Expose()
  public father: string | undefined = undefined;

  @Expose()
  public systemType: string | undefined = undefined; // normal / hero

  @Expose()
  public shell: string | undefined = undefined;

  @Expose()
  public raceType: string | undefined = undefined;

  @Expose()
  public sex: string | undefined = undefined;

  @Expose()
  public description: string | undefined = undefined;

  @Expose()
  public map: string | undefined = undefined;

  // --- 战斗数值 ---
  @Expose()
  public lifeRatio: number | undefined = undefined;

  @Expose()
  public rosRatio: number | undefined = undefined;

  @Expose()
  public defenceRatio: number | undefined = undefined;

  @Expose()
  public headHurtMul: number | undefined = undefined;

  @Expose()
  public superDpsAdd: number | undefined = undefined;

  @Expose()
  public showLevel: number | undefined = undefined;

  // --- 视觉与资源 ---
  @Expose() public swfUrl: string | undefined = undefined;
  @Expose() public swfName: string | undefined = undefined;
  @Expose() public imgType: string | undefined = undefined; // bmp / swf
  @Expose() public imgClass: string | undefined = undefined;
  @Expose() public imgArr: string[] | undefined = undefined;
  @Expose() public bossImgArr: string[] | undefined = undefined;
  @Expose() public headIconUrl: string | undefined = undefined;
  @Expose() public bmpUrl: string | undefined = undefined;
  @Expose() public normalScaleX: number | undefined = undefined;
  @Expose() public flipCtrlBy: string | undefined = undefined;
  @Expose() public lifeBarExtraHeight: number | undefined = undefined;
  @Expose() public doubleLifeBarB: boolean | undefined = undefined; // (虚晶蝎专属)
  @Expose() public handAddRa: number | undefined = undefined; // 角度
  @Expose() public lowerImgArr: string[] | undefined = undefined;
  @Expose() public dieEffectPartName: string | undefined = undefined;
  @Expose() public rotateBySlopeB: boolean | undefined = undefined;
  @Expose() public dieJumpMul: number | undefined = undefined;

  // --- 物理与 AI ---
  @Expose() public motionState: string | undefined = undefined;
  @Expose() public motionClass: string | undefined = undefined;
  @Expose() public maxJumpNum: number | undefined = undefined;
  @Expose() public maxVx: number | undefined = undefined;
  @Expose() public maxVy: number | undefined = undefined;
  @Expose() public runStartVx: number | undefined = undefined;
  @Expose() public flyType: string | undefined = undefined;
  @Expose() public flyUseSpiderB: boolean | undefined = undefined;
  @Expose() public warningRange: number | undefined = undefined;
  @Expose() public outWarningTime: number | undefined = undefined;

  @Expose() public attackAIClass: string | undefined = undefined;
  @Expose() public defaultAiOrder: string | undefined = undefined;
  @Expose() public extraAIClassLabel: string | undefined = undefined;
  @Expose() public oneAiLabel: string | undefined = undefined;

  // --- 攻击与弹道 ---
  @Expose() public shootLenMul: number | undefined = undefined;
  @Expose() public keyClass: string | undefined = undefined;
  @Expose() public bulletLauncherClass: string | undefined = undefined;
  @Expose() public attackMustCanShootB: boolean | undefined = undefined;
  @Expose() public nextAttackTime: number | undefined = undefined;

  // --- 技能列表 ---
  @Expose() public skillArr: string[] | undefined = undefined;
  @Expose() public bossSkillArr: string[] | undefined = undefined;
  @Expose() public preBulletArr: string[] | undefined = undefined;
  @Expose() public demSkillArr: string[] | undefined = undefined;
  @Expose() public demBossSkillArr: string[] | undefined = undefined;
  @Expose() public wilderSkillArr: string[] | undefined = undefined;
  @Expose() public uiSkillArr: string[] | undefined = undefined;
  @Expose() public otherUnitCnNameArr: string[] | undefined = undefined;
  @Expose() public avtiveSkillCdOverT: number | undefined = undefined;

  @Expose() public canBossB: boolean | undefined = undefined;
  @Expose() public extraDropArmsB: boolean | undefined = undefined;

  // --- Hero 专属属性 (可选) ---
  @Expose() public movieLink: string | undefined = undefined;
  @Expose() public armsNumber: number | undefined = undefined;
  @Expose() public aircraft: string | undefined = undefined;
  @Expose() public upperImgArr: string[] | undefined = undefined;
  @Expose() public headPlayB: boolean | undefined = undefined;
  @Expose() public squatMaxVx: number | undefined = undefined;
  @Expose() public randomArmsRange: string[] | undefined = undefined;
  @Expose() public studyCnNameArr: string[] | undefined = undefined;
  @Expose() public p1SkillArr: string[] | undefined = undefined;
  @Expose() public addMoreText: string | undefined = undefined;

  @Expose() public hitRect: IO_Rectangle | undefined = undefined;
  @Expose() public squatHitRect: IO_Rectangle | undefined = undefined;
  @Expose() public hurtRectArr: IO_Rectangle[] | undefined = undefined;


  // --- 子对象定义 ---
  @Expose() @Type(() => BodyMotionDefine)
  public motionD: BodyMotionDefine | undefined = undefined;

  @Expose() @Type(() => BodyMoreDefine)
  public moreD: BodyMoreDefine | undefined = undefined;

  @Expose() @Type(() => BodyDropDefine)
  public dropD: BodyDropDefine | undefined = undefined;

  @Expose() @Type(() => BodyEditDefine)
  public editD: BodyEditDefine | undefined = undefined;

  @Expose() @Type(() => ImageUrlDefine)
  public dieImg: ImageUrlDefine | undefined = undefined;

  /** 所有的攻击行为定义列表 */
  @Expose()
  @Type(() => BodyAttackDefine)
  public hurtArr: BodyAttackDefine[] | undefined = undefined;

  static createDefault(name: string): BodyDefine {
    const d = new BodyDefine();
    d.name = name;
    d.cnName = "新单位";
    d.raceType = "human";
    d.showLevel = 99;
    d.swfUrl = `swf/enemy/ZombieBattle`;
    d.hitRect = { x: -16, y: -46, width: 33, height: 93 };
    return d;
  }

  public toXml(): string {
    // 根节点属性
    let xml = `    <body name="${this.name || "未命名单位"}"`;
    if (this.shell != null) xml += ` shell="${this.shell}"`;
    if (this.map != null) xml += ` map="${this.map}"`;
    xml += `>\n`;

    // 常用基础标签生成函数
    const addTag = (tagName: string, value: any) => {
      if (value != null) {
        xml += `      <${tagName}>${value}</${tagName}>\n`;
      }
    };

    const addBool = (tagName: string, value: boolean | undefined, defaultVal: boolean = false) => {
      if (value !== undefined) {
        if (defaultVal !== true && value) {
          xml += `      <${tagName}>1</${tagName}>\n`;
        } else if (defaultVal === true && value === false) {
          xml += `      <${tagName}>0</${tagName}>\n`;
        }
      }
    };

    addTag("cnName", this.cnName);
    addBool("noCnIdB", this.noCnIdB);
    addBool("lockLeftB", this.lockLeftB);

    addTag("raceType", this.raceType);
    addTag("sex", this.sex);
    addTag("description", this.description);

    addTag("swfUrl", this.swfUrl);
    addTag("swfName", this.swfName);
    addTag("bmpUrl", this.bmpUrl);

    addTag("lifeRatio", this.lifeRatio);
    addTag("rosRatio", this.rosRatio);
    addTag("defenceRatio", this.defenceRatio);
    addTag("headHurtMul", this.headHurtMul);
    addTag("superDpsAdd", this.superDpsAdd);
    addTag("bulletDedutRatio", this.bulletDedutRatio);
    addTag("showLevel", this.showLevel);

    addTag("lifeBarExtraHeight", this.lifeBarExtraHeight);

    addTag("imgType", this.imgType);
    addTag("imgClass", this.imgClass);
    addTag("flipCtrlBy", this.flipCtrlBy);
    addTag("normalScaleX", this.normalScaleX);
    addTag("headIconUrl", this.headIconUrl);

    addTag("handAddRa", this.handAddRa);
    addTag("dieEffectPartName", this.dieEffectPartName);
    addTag("dieJumpMul", this.dieJumpMul);

    addTag("motionState", this.motionState);
    addTag("motionClass", this.motionClass);
    addTag("maxJumpNum", this.maxJumpNum);
    addTag("maxVx", this.maxVx);
    addTag("maxVy", this.maxVy);
    addTag("runStartVx", this.runStartVx);
    addTag("flyType", this.flyType);
    addTag("warningRange", this.warningRange);
    addTag("outWarningTime", this.outWarningTime);
    addTag("shootLenMul", this.shootLenMul);
    addTag("nextAttackTime", this.nextAttackTime);
    addTag("avtiveSkillCdOverT", this.avtiveSkillCdOverT);

    addTag("attackAIClass", this.attackAIClass);
    addTag("defaultAiOrder", this.defaultAiOrder);
    addTag("extraAIClassLabel", this.extraAIClassLabel);
    addTag("oneAiLabel", this.oneAiLabel);
    addTag("keyClass", this.keyClass);
    addTag("bulletLauncherClass", this.bulletLauncherClass);

    addBool("doubleLifeBarB", this.doubleLifeBarB);
    addBool("rotateBySlopeB", this.rotateBySlopeB);
    addBool("flyUseSpiderB", this.flyUseSpiderB);
    addBool("attackMustCanShootB", this.attackMustCanShootB);
    addBool("canBossB", this.canBossB, true); // Default true
    addBool("extraDropArmsB", this.extraDropArmsB);

    // Rects
    if (this.hitRect) {
      addTag("hitRect", `${this.hitRect.x},${this.hitRect.y},${this.hitRect.width},${this.hitRect.height}`);
    }

    // 数组
    const addArr = (tag: string, arr: string[] | undefined) => {
      if (arr && arr.length > 0) addTag(tag, arr.join(","));
    }

    addArr("imgArr", this.imgArr);
    addArr("bossImgArr", this.bossImgArr);
    addArr("lowerImgArr", this.lowerImgArr);
    addArr("skillArr", this.skillArr);
    addArr("bossSkillArr", this.bossSkillArr);
    addArr("preBulletArr", this.preBulletArr);
    addArr("demSkillArr", this.demSkillArr);
    addArr("demBossSkillArr", this.demBossSkillArr);
    addArr("uiSkillArr", this.uiSkillArr);
    addArr("wilderSkillArr", this.wilderSkillArr);
    addArr("otherUnitCnNameArr", this.otherUnitCnNameArr);

    // 导出攻击定义列表
    if (this.hurtArr && this.hurtArr.length > 0) {
      xml += `      <hurtArr>\n`;
      this.hurtArr.forEach(hurt => {
        xml += `${hurt.toXml()}\n`;
      });
      xml += `      </hurtArr>\n`;
    }

    // Hero 专属
    addTag("movieLink", this.movieLink);
    addTag("armsNumber", this.armsNumber);
    addTag("aircraft", this.aircraft);
    addTag("squatMaxVx", this.squatMaxVx);
    addTag("addMoreText", this.addMoreText);

    addBool("headPlayB", this.headPlayB);

    addArr("upperImgArr", this.upperImgArr);
    addArr("randomArmsRange", this.randomArmsRange);
    addArr("studyCnNameArr", this.studyCnNameArr);
    addArr("p1SkillArr", this.p1SkillArr);

    if (this.squatHitRect) {
      addTag("squatHitRect", `${this.squatHitRect.x},${this.squatHitRect.y},${this.squatHitRect.width},${this.squatHitRect.height}`);
    }

    if (this.hurtRectArr && this.hurtRectArr.length > 0) {
      this.hurtRectArr.forEach(rect => {
        addTag("hurtRectArr", `${rect.x},${rect.y},${rect.width},${rect.height}`);
      });
    }


    // 子模块 XML
    const motionXml = this.motionD?.toXml();
    if (motionXml) xml += `      ${motionXml}\n`;

    const moreXml = this.moreD?.toXml();
    if (moreXml) xml += `      ${moreXml}\n`;

    const dropXml = this.dropD?.toXml();
    if (dropXml) xml += `      ${dropXml}\n`;

    const editXml = this.editD?.toXml();
    if (editXml) xml += `      ${editXml}\n`;

    // 死亡图像
    const dieImgXml = this.dieImg?.toXml("dieImg");
    if (dieImgXml) xml += `      ${dieImgXml}\n`;

    xml += `    </body>`;
    return xml;
  }
}