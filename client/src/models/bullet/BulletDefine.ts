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
  @Expose() public name: string = "";
  @Expose() public cnName: string = "";
  @Expose() public kind: string = "";
  @Expose() public hole: string = "";
  @Expose() public baseLabel: string = "";
  @Expose() public armsType: string = "";
  @Expose() public actionLabel: string = "";

  // 行为标志
  @Expose() public sameCampB: boolean = true;
  @Expose() public noHitB: boolean = false;
  @Expose() public noHurtEffectB: boolean = false;
  @Expose() public whippB: boolean = true;
  @Expose() public noMagneticB: boolean = false;
  @Expose() public noBeClearB: boolean = false;
  @Expose() public implodingB: boolean = false;
  @Expose() public twoHitSameNameB: boolean = false;
  @Expose() public oneHitBodyB: boolean = false;

  // 伤害与效果
  @Expose() public hurtRatio: number = 0;
  @Expose() public hurtMul: number = 0;
  @Expose() public transBackMul: number = 1;
  @Expose() public attackType: string = "direct";
  @Expose() public beatBack: number = 0;
  @Expose() public targetShakeValue: number = 0;

  @Expose() @Type(() => BulletCritDefine)
  public critD: BulletCritDefine = new BulletCritDefine();

  @Expose() @Type(() => BulletCritDefine)
  public critD3: BulletCritDefine = new BulletCritDefine();

  // 生命周期与碰撞
  @Expose() public bulletLife: number = 2;
  @Expose() public lifeRandom: number = 0;
  @Expose() public imgClearDelay: number = 0;
  @Expose() public bulletWidth: number = 7;
  @Expose() public bulletShakeWidth: number = 0;
  @Expose() public hitType: string = "rect";
  @Expose() public penetrationNum: number = 0;
  @Expose() public penetrationGap: number = 0;

  // 攻击频率与时机
  @Expose() public attackGap: number = 0;
  @Expose() public attackDelay: number = 0;
  @Expose() public noHitTime: number = 0;
  @Expose() public hideTime: number = 0;
  @Expose() public hitGap: number = 0;
  @Expose() public twoHitGap: number = 0;

  // 发射属性
  @Expose() public bulletNum: number = 1;
  @Expose() public shootGap: number = 0;
  @Expose() public shootNum: number = 1;
  @Expose() public shootRecoil: number = 0;
  @Expose() public screenShakeValue: number = 0;
  @Expose() public aiShootRange: number = 0;
  @Expose() public gatlinNum: number = 0;
  @Expose() public gatlinRange: number = 0;
  @Expose() public shootPoint: string = "0,0";

  @Expose() @Type(() => BulletPositionDefineGroup)
  public positionD: BulletPositionDefineGroup | null = null;

  // 运动学
  @Expose() public bulletSpeed: number = 0;
  @Expose() public gravity: number = 0;
  @Expose() public bulletVra: number = 0;
  @Expose() public bulletAngle: number = -1000;
  @Expose() public bulletAngleRange: number = 0;
  @Expose() public extendGap: number = 0;

  @Expose() @Type(() => BulletSpeedDefine)
  public speedD: BulletSpeedDefine = new BulletSpeedDefine();

  @Expose() @Type(() => BulletFollowDefine)
  public followD: BulletFollowDefine = new BulletFollowDefine();

  @Expose() @Type(() => BulletBounceDefine)
  public bounceD: BulletBounceDefine = new BulletBounceDefine();

  // 技能与特殊效果
  @Expose() public skillArr: string[] = [];
  @Expose() public godSkillArr: string[] = [];
  @Expose() public bulletSkillArr: string[] = [];

  @Expose() @Type(() => BulletBoomDefine)
  public boomD: BulletBoomDefine = new BulletBoomDefine();

  @Expose() @Type(() => BulletBindingDefine)
  public bindingD: BulletBindingDefine = new BulletBindingDefine();

  @Expose() @Type(() => BulletLineDefine)
  public lineD: BulletLineDefine = new BulletLineDefine();

  // 视觉资源
  @Expose() public playImgLabel: string = '';

  @Expose() @Type(() => ImageUrlDefine)
  public bulletImg: ImageUrlDefine = new ImageUrlDefine();

  @Expose() @Type(() => ImageUrlDefine)
  public fireImg: ImageUrlDefine = new ImageUrlDefine();

  @Expose() @Type(() => ImageUrlDefine)
  public bulletLeftImg: ImageUrlDefine = new ImageUrlDefine();

  @Expose() @Type(() => ImageUrlDefine)
  public hitImg: ImageUrlDefine = new ImageUrlDefine();

  @Expose() @Type(() => ImageUrlDefine)
  public hitFloorImg: ImageUrlDefine = new ImageUrlDefine();

  @Expose() @Type(() => ImageUrlDefine)
  public smokeImg: ImageUrlDefine = new ImageUrlDefine();

  @Expose() @Type(() => ImageUrlDefine)
  public selfBoomImg: ImageUrlDefine = new ImageUrlDefine();

  constructor() {
    super();
    this.critD3.mul = 3;
    // 设置默认值，防止 class-transformer 转换出空对象
    this.bulletImg.url = "";
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

    if (this.shakeAngle !== 0) addTag("shakeAngle", this.shakeAngle);
    if (this.hurtRatio !== 0) addTag("hurtRatio", this.hurtRatio);
    if (this.hurtMul !== 0) addTag("hurtMul", this.hurtMul);
    if (this.transBackMul !== 1) addTag("transBackMul", this.transBackMul);
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
    if (this.shootAngle !== 0) addTag("shootAngle", this.shootAngle);
    addTag("shootNum", this.shootNum);

    if (this.gatlinNum !== 0) addTag("gatlinNum", this.gatlinNum);
    if (this.gatlinRange !== 0) addTag("gatlinRange", this.gatlinRange);
    if (this.shootPoint !== "0,0") addTag("shootPoint", this.shootPoint);

    addTag("bulletSpeed", this.bulletSpeed);
    addTag("shootRecoil", this.shootRecoil);
    addTag("screenShakeValue", this.screenShakeValue);
    addTag("gravity", this.gravity);
    addTag("bulletVra", this.bulletVra);
    if (this.bulletAngle !== -1000) addTag("bulletAngle", this.bulletAngle);
    if (this.bulletAngleRange !== 0) addTag("bulletAngleRange", this.bulletAngleRange);
    if (this.extendGap !== 0) addTag("extendGap", this.extendGap);

    const addArr = (tag: string, arr: string[]) => {
      if (arr && arr.length > 0) addTag(tag, arr.join(","));
    }
    addArr("skillArr", this.skillArr);
    addArr("godSkillArr", this.godSkillArr);
    addArr("bulletSkillArr", this.bulletSkillArr);

    // 子对象导出
    const critDXml = this.critD.toXml();
    if (critDXml) xml += `      <critD>\n${critDXml}      </critD>\n`;

    const critD3Xml = this.critD3.toXml();
    if (critD3Xml) xml += `      <critD3>\n${critD3Xml}      </critD3>\n`;

    const speedDXml = this.speedD.toXml();
    if (speedDXml) xml += `      <speedD>\n${speedDXml}      </speedD>\n`;

    const followDXml = this.followD.toXml();
    if (followDXml) xml += `      <followD>\n${followDXml}      </followD>\n`;

    const bounceDXml = this.bounceD.toXml();
    if (bounceDXml) xml += `      <bounceD>\n${bounceDXml}      </bounceD>\n`;

    const boomDXml = this.boomD.toXml();
    if (boomDXml) xml += `      <boomD>\n${boomDXml}      </boomD>\n`;

    const bindingDXml = this.bindingD.toXml();
    if (bindingDXml) xml += `      <bindingD>\n${bindingDXml}      </bindingD>\n`;

    const lineDXml = this.lineD.toXml();
    if (lineDXml) xml += `      <lineD>\n${lineDXml}      </lineD>\n`;

    if (this.positionD) {
      const positionDXml = this.positionD.toXml();
      if (positionDXml) xml += `      <positionD>\n${positionDXml}      </positionD>\n`;
    }

    addTag("beatBack", this.beatBack);
    addTag("targetShakeValue", this.targetShakeValue);
    addTag("playImgLabel", this.playImgLabel);

    if (this.bulletImg.url) xml += `      ${this.bulletImg.toXml("bulletImgUrl")}\n`;
    if (this.fireImg.url) xml += `      ${this.fireImg.toXml("fireImgUrl")}\n`;
    if (this.bulletLeftImg.url) xml += `      ${this.bulletLeftImg.toXml("bulletLeftImgUrl")}\n`;
    if (this.hitImg.url) xml += `      ${this.hitImg.toXml("hitImgUrl")}\n`;
    if (this.hitFloorImg.url) xml += `      ${this.hitFloorImg.toXml("hitFloorImgUrl")}\n`;
    if (this.smokeImg.url) xml += `      ${this.smokeImg.toXml("smokeImgUrl")}\n`;
    if (this.selfBoomImg.url) xml += `      ${this.selfBoomImg.toXml("selfBoomImgUrl")}\n`;

    xml += `    </bullet>`;
    return xml;
  }

  public static createDefault(name: string): BulletDefine {
    const d = new BulletDefine();
    d.name = name;
    d.cnName = "新子弹";
    return d;
  }
}