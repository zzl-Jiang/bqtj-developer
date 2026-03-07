// client/src/models/bullet/BulletDefine.ts
import { Expose, Type } from 'class-transformer';
import { BulletPositionDefine } from './BulletPositionDefine';
import { BulletPositionDefineGroup } from './BulletPositionDefineGroup';
import { BulletSpeedDefine } from './BulletSpeedDefine';
import { BulletFollowDefine } from './BulletFollowDefine';
import { BulletBounceDefine } from './BulletBounceDefine';
import { BulletCritDefine } from './BulletCritDefine';
import { BulletBoomDefine } from './BulletBoomDefine';
import { BulletBindingDefine } from './BulletBindingDefine';
import { BulletLineDefine } from './BulletLineDefine';
import { ImageUrlDefine } from '../common/ImgUrlDefine';

export class BulletDefine extends BulletPositionDefine {
  [key: string]: any;

  // 基础信息
  @Expose() public name: string | undefined = undefined;
  @Expose() public cnName: string | undefined = undefined;
  @Expose() public kind: string | undefined = undefined;
  @Expose() public hole: string | undefined = undefined;
  @Expose() public baseLabel: string | undefined = undefined;
  @Expose() public armsType: string | undefined = undefined;
  @Expose() public actionLabel: string | undefined = undefined;

  // 行为标志
  @Expose() public sameCampB: boolean | undefined = undefined;
  @Expose() public noHitB: boolean | undefined = undefined;
  @Expose() public noHurtEffectB: boolean | undefined = undefined;
  @Expose() public whippB: boolean | undefined = undefined;
  @Expose() public noMagneticB: boolean | undefined = undefined;
  @Expose() public noBeClearB: boolean | undefined = undefined;
  @Expose() public implodingB: boolean | undefined = undefined;
  @Expose() public twoHitSameNameB: boolean | undefined = undefined;
  @Expose() public oneHitBodyB: boolean | undefined = undefined;

  // 伤害与效果
  @Expose() public hurtRatio: number | undefined = undefined;
  @Expose() public hurtMul: number | undefined = undefined;
  @Expose() public transBackMul: number | undefined = undefined;
  @Expose() public attackType: string | undefined = undefined;
  @Expose() public beatBack: number | undefined = undefined;
  @Expose() public targetShakeValue: number | undefined = undefined;

  @Expose() @Type(() => BulletCritDefine)
  public critD: BulletCritDefine | undefined = undefined;

  @Expose() @Type(() => BulletCritDefine)
  public critD3: BulletCritDefine | undefined = undefined;

  // 生命周期与碰撞
  @Expose() public bulletLife: number | undefined = undefined;
  @Expose() public lifeRandom: number | undefined = undefined;
  @Expose() public imgClearDelay: number | undefined = undefined;
  @Expose() public bulletWidth: number | undefined = undefined;
  @Expose() public bulletShakeWidth: number | undefined = undefined;
  @Expose() public hitType: string | undefined = undefined;
  @Expose() public penetrationNum: number | undefined = undefined;
  @Expose() public penetrationGap: number | undefined = undefined;

  // 攻击频率与时机
  @Expose() public attackGap: number | undefined = undefined;
  @Expose() public attackDelay: number | undefined = undefined;
  @Expose() public noHitTime: number | undefined = undefined;
  @Expose() public hideTime: number | undefined = undefined;
  @Expose() public hitGap: number | undefined = undefined;
  @Expose() public twoHitGap: number | undefined = undefined;

  // 发射属性
  @Expose() public bulletNum: number | undefined = undefined;
  @Expose() public shootGap: number | undefined = undefined;
  @Expose() public shootNum: number | undefined = undefined;
  @Expose() public shootRecoil: number | undefined = undefined;
  @Expose() public screenShakeValue: number | undefined = undefined;
  @Expose() public aiShootRange: number | undefined = undefined;
  @Expose() public gatlinNum: number | undefined = undefined;
  @Expose() public gatlinRange: number | undefined = undefined;
  @Expose() public shootPoint: string | undefined = undefined;

  @Expose() @Type(() => BulletPositionDefineGroup)
  public positionD: BulletPositionDefineGroup | undefined = undefined;

  // 运动学
  @Expose() public bulletSpeed: number | undefined = undefined;
  @Expose() public gravity: number | undefined = undefined;
  @Expose() public bulletVra: number | undefined = undefined;
  @Expose() public bulletAngle: number | undefined = undefined;
  @Expose() public bulletAngleRange: number | undefined = undefined;
  @Expose() public extendGap: number | undefined = undefined;

  @Expose() @Type(() => BulletSpeedDefine)
  public speedD: BulletSpeedDefine | undefined = undefined;

  @Expose() @Type(() => BulletFollowDefine)
  public followD: BulletFollowDefine | undefined = undefined;

  @Expose() @Type(() => BulletBounceDefine)
  public bounceD: BulletBounceDefine | undefined = undefined;

  // 技能与特殊效果
  @Expose() public skillArr: string[] | undefined = undefined;
  @Expose() public godSkillArr: string[] | undefined = undefined;
  @Expose() public bulletSkillArr: string[] | undefined = undefined;

  @Expose() @Type(() => BulletBoomDefine)
  public boomD: BulletBoomDefine | undefined = undefined;

  @Expose() @Type(() => BulletBindingDefine)
  public bindingD: BulletBindingDefine | undefined = undefined;

  @Expose() @Type(() => BulletLineDefine)
  public lineD: BulletLineDefine | undefined = undefined;

  // 视觉资源
  @Expose() public playImgLabel: string | undefined = undefined;

  @Expose() @Type(() => ImageUrlDefine)
  public bulletImg: ImageUrlDefine | undefined = undefined;

  @Expose() @Type(() => ImageUrlDefine)
  public fireImg: ImageUrlDefine | undefined = undefined;

  @Expose() @Type(() => ImageUrlDefine)
  public bulletLeftImg: ImageUrlDefine | undefined = undefined;

  @Expose() @Type(() => ImageUrlDefine)
  public hitImg: ImageUrlDefine | undefined = undefined;

  @Expose() @Type(() => ImageUrlDefine)
  public hitFloorImg: ImageUrlDefine | undefined = undefined;

  @Expose() @Type(() => ImageUrlDefine)
  public smokeImg: ImageUrlDefine | undefined = undefined;

  @Expose() @Type(() => ImageUrlDefine)
  public selfBoomImg: ImageUrlDefine | undefined = undefined;

  constructor() {
    super();
  }

  public toXml(): string {
    let xml = `    <bullet name="${this.name || ""}"`;
    if (this.kind) xml += ` kind="${this.kind}"`;
    if (this.hole) xml += ` hole="${this.hole}"`;
    xml += `>\n`;

    const addTag = (tagName: string, value: any) => {
      if (value != null && value !== "" && value !== 0 && value !== false) {
        xml += `      <${tagName}>${value}</${tagName}>\n`;
      } else if (typeof value === 'number' && value === 0 && (tagName === 'bulletSpeed' || tagName === 'bulletWidth' || tagName === 'bulletNum' || tagName === 'shootNum')) {
        // 特殊数值 0 可能需要导出，但通常 AS 代码中有默认值判断
        // 这里遵循 AS 的 inData_byXML 逻辑，大部分 0 不导出会使用默认值
      }
    };

    const addBool = (tagName: string, value: boolean | undefined) => {
      if (value === true) {
        xml += `      <${tagName}>1</${tagName}>\n`;
      } else if (value === false && (tagName === 'sameCampB' || tagName === 'whippB')) {
        // 这些默认是 true 的布尔值，如果是 false 需要导出 0
        xml += `      <${tagName}>0</${tagName}>\n`;
      }
    };

    addTag("cnName", this.cnName);
    addTag("baseLabel", this.baseLabel);
    addTag("actionLabel", this.actionLabel);
    addTag("armsType", this.armsType);

    addBool("sameCampB", this.sameCampB);
    addBool("twoHitSameNameB", this.twoHitSameNameB);
    addBool("oneHitBodyB", this.oneHitBodyB);
    addBool("noHitB", this.noHitB);
    addBool("noHurtEffectB", this.noHurtEffectB);
    addBool("noMagneticB", this.noMagneticB);
    addBool("noBeClearB", this.noBeClearB);
    addBool("whippB", this.whippB);
    addBool("implodingB", this.implodingB);

    if (this.shakeAngle !== undefined && this.shakeAngle !== 0) addTag("shakeAngle", this.shakeAngle);
    if (this.hurtRatio !== undefined && this.hurtRatio !== 0) addTag("hurtRatio", this.hurtRatio);
    if (this.hurtMul !== undefined && this.hurtMul !== 0) addTag("hurtMul", this.hurtMul);
    if (this.transBackMul !== undefined && this.transBackMul !== 1) addTag("transBackMul", this.transBackMul);
    addTag("attackType", this.attackType);

    addTag("bulletLife", this.bulletLife);
    addTag("lifeRandom", this.lifeRandom);
    addTag("imgClearDelay", this.imgClearDelay);
    addTag("bulletWidth", this.bulletWidth);
    addTag("aiShootRange", this.aiShootRange);
    addTag("bulletShakeWidth", this.bulletShakeWidth);
    addTag("hitType", this.hitType);

    addTag("attackGap", this.attackGap);
    addTag("attackDelay", this.attackDelay);
    addTag("bulletNum", this.bulletNum);
    addTag("shootGap", this.shootGap);
    if (this.shootAngle !== undefined && this.shootAngle !== 0) addTag("shootAngle", this.shootAngle);
    addTag("shootNum", this.shootNum);

    if (this.gatlinNum !== undefined && this.gatlinNum !== 0) addTag("gatlinNum", this.gatlinNum);
    if (this.gatlinRange !== undefined && this.gatlinRange !== 0) addTag("gatlinRange", this.gatlinRange);
    if (this.shootPoint !== undefined && this.shootPoint !== "0,0") addTag("shootPoint", this.shootPoint);

    addTag("bulletSpeed", this.bulletSpeed);
    addTag("shootRecoil", this.shootRecoil);
    addTag("screenShakeValue", this.screenShakeValue);
    addTag("gravity", this.gravity);
    addTag("bulletVra", this.bulletVra);
    if (this.bulletAngle !== undefined && this.bulletAngle !== -1000) addTag("bulletAngle", this.bulletAngle);
    if (this.bulletAngleRange !== undefined && this.bulletAngleRange !== 0) addTag("bulletAngleRange", this.bulletAngleRange);
    if (this.extendGap !== undefined && this.extendGap !== 0) addTag("extendGap", this.extendGap);

    const addArr = (tag: string, arr: string[] | undefined) => {
      if (arr && arr.length > 0) addTag(tag, arr.join(","));
    }
    addArr("skillArr", this.skillArr);
    addArr("godSkillArr", this.godSkillArr);
    addArr("bulletSkillArr", this.bulletSkillArr);

    // 子对象导出
    const critDXml = this.critD?.toXml();
    if (critDXml) xml += `      <critD>\n${critDXml}      </critD>\n`;

    const critD3Xml = this.critD3?.toXml();
    if (critD3Xml) xml += `      <critD3>\n${critD3Xml}      </critD3>\n`;

    const speedDXml = this.speedD?.toXml();
    if (speedDXml) xml += `      <speedD>\n${speedDXml}      </speedD>\n`;

    const followDXml = this.followD?.toXml();
    if (followDXml) xml += `      <followD>\n${followDXml}      </followD>\n`;

    const bounceDXml = this.bounceD?.toXml();
    if (bounceDXml) xml += `      <bounceD>\n${bounceDXml}      </bounceD>\n`;

    const boomDXml = this.boomD?.toXml();
    if (boomDXml) xml += `      <boomD>\n${boomDXml}      </boomD>\n`;

    const bindingDXml = this.bindingD?.toXml();
    if (bindingDXml) xml += `      <bindingD>\n${bindingDXml}      </bindingD>\n`;

    const lineDXml = this.lineD?.toXml();
    if (lineDXml) xml += `      <lineD>\n${lineDXml}      </lineD>\n`;

    if (this.positionD) {
      const positionDXml = this.positionD.toXml();
      if (positionDXml) xml += `      <positionD>\n${positionDXml}      </positionD>\n`;
    }

    addTag("beatBack", this.beatBack);
    addTag("targetShakeValue", this.targetShakeValue);
    addTag("playImgLabel", this.playImgLabel);

    if (this.bulletImg?.url) xml += `      ${this.bulletImg.toXml("bulletImgUrl")}\n`;
    if (this.fireImg?.url) xml += `      ${this.fireImg.toXml("fireImgUrl")}\n`;
    if (this.bulletLeftImg?.url) xml += `      ${this.bulletLeftImg.toXml("bulletLeftImgUrl")}\n`;
    if (this.hitImg?.url) xml += `      ${this.hitImg.toXml("hitImgUrl")}\n`;
    if (this.hitFloorImg?.url) xml += `      ${this.hitFloorImg.toXml("hitFloorImgUrl")}\n`;
    if (this.smokeImg?.url) xml += `      ${this.smokeImg.toXml("smokeImgUrl")}\n`;
    if (this.selfBoomImg?.url) xml += `      ${this.selfBoomImg.toXml("selfBoomImgUrl")}\n`;

    xml += `    </bullet>`;
    return xml;
  }

  public static createDefault(name: string): BulletDefine {
    const d = new BulletDefine();
    d.name = name;
    d.cnName = "新子弹";
    d.critD3 = new BulletCritDefine();
    d.critD3.mul = 3;
    d.bulletImg = new ImageUrlDefine();
    d.bulletImg.url = "";
    return d;
  }
}