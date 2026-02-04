// src/models/body/BodyAttackDefine.ts

import { Expose, Type } from "class-transformer";
import { ImageUrlDefine } from "../common/ImgUrlDefine";
import type { IO_Rectangle } from "../common/IO_Rectangle";

export class BodyAttackDefine {
  [key: string]: any;

  // --- 基础标识 ---
  @Expose() public cn: string | undefined = undefined; // 中文名
  @Expose() public imgLabel: string | undefined = undefined; // 对应动画标签 (如 "attack1")
  @Expose() public keyName: string | undefined = undefined; // 内部键名
  @Expose() public attackType: string | undefined = undefined; // 攻击类型 (physics/magic等)

  // --- 战斗参数 ---
  @Expose() public cd: number | undefined = undefined;
  @Expose() public hurtRatio: number | undefined = undefined; // 伤害倍率 (0.8, 1.2等)
  @Expose() public hurtMul: number | undefined = undefined; // 额外乘数
  @Expose() public continuousNum: number | undefined = undefined; // 连击次数
  @Expose() public hitMaxNum: number | undefined = undefined; // 最大命中数

  // --- 判定范围 (Rectangle) ---
  @Expose() public grapRect: IO_Rectangle | undefined = undefined;
  @Expose() public grapMaxLen: number | undefined = undefined; // 最大距离
  @Expose() public grapMinLen: number | undefined = undefined; // 最小距离

  // --- 子弹与技能 ---
  @Expose() public bulletLabel: string | undefined = undefined; // 单个子弹ID
  @Expose() public bulletArr: string[] = []; // 多个子弹ID
  @Expose() public skillArr: string[] = []; // 触发技能ID

  // --- 物理效果 ---
  @Expose() public beatBack: number | undefined = undefined; // 击退敌人
  @Expose() public meBack: number | undefined = undefined; // 自身反冲
  @Expose() public shakeValue: number | undefined = undefined; // 击中震动
  @Expose() public screenShakeValue: number | undefined = undefined; // 屏幕震动
  @Expose() public transBackMul: number | undefined = undefined; // 自身反冲倍率

  // --- 布尔标志位 (Boolean Flags) ---
  @Expose() public mustGrapRectB: boolean | undefined = undefined; // 必须判定成功
  @Expose() public exactGrapRectB: boolean | undefined = undefined; // 精确判定
  @Expose() public oneHurtB: boolean | undefined = undefined; // 是否仅造成一次伤害
  @Expose() public noAiChooseB: boolean | undefined = undefined; // AI是否不主动使用
  @Expose() public noShootB: boolean | undefined = undefined; // 是否非射击动作
  @Expose() public noUseOtherSkillB: boolean | undefined = undefined; // 动作期间禁用其他技能
  @Expose() public ingfollowB: boolean | undefined = undefined; // 攻击时是否跟随目标

  // --- 特效图像 ---
  @Expose() @Type(() => ImageUrlDefine)
  public hitImg: ImageUrlDefine = new ImageUrlDefine();

  /**
   * 创建一个默认的攻击定义
   */
  static createDefault(label: string): BodyAttackDefine {
    const d = new BodyAttackDefine();
    d.imgLabel = label;
    d.cn = "新攻击动作";
    // 默认给一个矩形对象，方便前端 v-model 绑定
    d.grapRect = { x: 0, y: 0, width: 50, height: 50 };
    return d;
  }

  /**
   * 生成 XML 字符串
   */
  public toXml(): string {
    // 根据 AS3 源码，攻击定义通常作为 <hurt> 标签
    let xml = `      <hurt`;
    if (this.imgLabel != null) xml += ` imgLabel="${this.imgLabel}"`;
    xml += `>\n`;

    const addTag = (tagName: string, value: any) => {
      if (value != null) {
        xml += `        <${tagName}>${value}</${tagName}>\n`;
      }
    };

    const addBool = (tagName: string, value: boolean | undefined) => {
      if (value === true) {
        xml += `        <${tagName}>1</${tagName}>\n`;
      }
    };

    // 基础标签
    addTag("cn", this.cn);
    addTag("keyName", this.keyName);
    addTag("cd", this.cd);
    addTag("attackType", this.attackType);
    addTag("hurtRatio", this.hurtRatio);
    addTag("hurtMul", this.hurtMul);
    addTag("continuousNum", this.continuousNum);
    addTag("hitMaxNum", this.hitMaxNum);

    // 距离与范围
    addTag("grapMaxLen", this.grapMaxLen);
    addTag("grapMinLen", this.grapMinLen);
    if (this.grapRect) {
      const r = this.grapRect;
      addTag("grapRect", `${r.x},${r.y},${r.width},${r.height}`);
    }

    // 子弹与技能
    addTag("bulletLabel", this.bulletLabel);
    if (this.bulletArr.length > 0) addTag("bulletArr", this.bulletArr.join(","));
    if (this.skillArr.length > 0) addTag("skillArr", this.skillArr.join(","));

    // 物理
    addTag("beatBack", this.beatBack);
    addTag("meBack", this.meBack);
    addTag("shakeValue", this.shakeValue);
    addTag("screenShakeValue", this.screenShakeValue);
    addTag("transBackMul", this.transBackMul);

    // 布尔标志
    addBool("mustGrapRectB", this.mustGrapRectB);
    addBool("exactGrapRectB", this.exactGrapRectB);
    addBool("oneHurtB", this.oneHurtB);
    addBool("noAiChooseB", this.noAiChooseB);
    addBool("noShootB", this.noShootB);
    addBool("noUseOtherSkillB", this.noUseOtherSkillB);
    addBool("ingfollowB", this.ingfollowB);

    // 图像效果
    const hitImgXml = this.hitImg.toXml("hitImg");
    if (hitImgXml) xml += `        ${hitImgXml}\n`;

    xml += `      </hurt>`;
    return xml;
  }
}