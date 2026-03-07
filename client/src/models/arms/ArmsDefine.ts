// client/src/models/arms/ArmsDefine.ts
import { Expose, Type } from 'class-transformer';
import { BulletDefine } from '../bullet/BulletDefine';
import { ArmsCrossbowDefine } from './ArmsCrossbowDefine';
import { ArmsRecordDefine } from './ArmsRecordDefine';

export class ArmsDefine extends BulletDefine {
  // 基础信息扩展
  @Expose() public randomPro: number = 0;
  @Expose() public index: number = 1;
  @Expose() public rareDropLevel: number = 1;
  @Expose() public color: string = "";
  @Expose() public dropLevelArr: number[] = [];
  @Expose() public dropBodyArr: string[] = [];
  @Expose() public chipB: boolean = false;
  @Expose() public description: string = "";
  @Expose() public info: string = "";

  // 战斗属性扩展
  @Expose() public dpsMul: number = 1;
  @Expose() public uiDpsMul: number = 1;
  @Expose() public extraMul: number = 1;
  @Expose() public capacity: number = 0;
  @Expose() public armsWeight: number = 0;
  @Expose() public reloadGap: number = 0;
  @Expose() public noShakeTime: number = 0;
  @Expose() public gunNum: number = 1;
  @Expose() public armsArmMul: number = 0.5;
  @Expose() public handShootGap: number = 0;
  @Expose() public upValue: number = 0;
  @Expose() public focusAngleRange: number = 0;
  @Expose() public leftHandImg: number = 0;
  @Expose() public shootShakeAngle: number = 0;
  @Expose() public twoShootPro: number = 0;

  // 嵌套子结构
  @Expose()
  @Type(() => ArmsCrossbowDefine)
  public crossbowD: ArmsCrossbowDefine = new ArmsCrossbowDefine();

  @Expose()
  @Type(() => ArmsRecordDefine)
  public recordD: ArmsRecordDefine = new ArmsRecordDefine();

  // 资源与视觉
  @Expose() public armsImgLabel: string = "";
  @Expose() public iconUrl: string = "";
  @Expose() public fireImgType: string = "";
  @Expose() public shootSoundUrl: string = "";

  // 资源范围 (用于随机武器生成)
  @Expose() public allImgPartArr: string[] = [];
  @Expose() public allImgRange: string[] = [];
  @Expose() public textureImgRange: string[] = [];
  @Expose() public bodyImgRange: string[] = [];
  @Expose() public barrelImgRange: string[] = [];
  @Expose() public gripImgRange: string[] = [];
  @Expose() public bulletImgRange: string[] = [];
  @Expose() public stockImgRange: string[] = [];
  @Expose() public glassImgRange: string[] = [];

  // 进化与合成
  @Expose() public evoMaxLv: number = 0;
  @Expose() public evoMustFirstLv: number = 0;
  @Expose() public chipNum: number = 0;
  @Expose() public composeLv: number = 81;
  @Expose() public composeMax: number = 0;

  constructor() {
    super();
  }

  public override toXml(): string {
    let xml = `    <bullet name="${this.name || ""}"`;
    if (this.kind) xml += ` kind="${this.kind}"`;
    if (this.index !== 1) xml += ` index="${this.index}"`;
    if (this.color) xml += ` color="${this.color}"`;
    if (this.rareDropLevel !== 1) xml += ` rareDropLevel="${this.rareDropLevel}"`;
    if (this.dropLevelArr.length > 0) xml += ` dropLevelArr="${this.dropLevelArr.join(",")}"`;
    if (this.dropBodyArr.length > 0) xml += ` dropBodyArr="${this.dropBodyArr.join(",")}"`;
    if (this.evoMaxLv > 0) xml += ` evoMaxLv="${this.evoMaxLv}"`;
    if (this.evoMustFirstLv > 0) xml += ` evoMustFirstLv="${this.evoMustFirstLv}"`;
    if (this.chipB) xml += ` chipB="1"`;
    if (this.chipNum > 0) xml += ` chipNum="${this.chipNum}"`;
    if (this.composeLv !== 81 && this.composeLv !== 0) xml += ` composeLv="${this.composeLv}"`;
    if (this.composeMax > 0) xml += ` composeMax="${this.composeMax}"`;
    xml += `>\n`;

    const addTag = (tagName: string, value: any, defaultValue: any = 0) => {
      if (value !== undefined && value !== null && value !== "" && value !== defaultValue) {
        xml += `      <${tagName}>${value}</${tagName}>\n`;
      }
    };

    const addArr = (tagName: string, arr: string[]) => {
      if (arr && arr.length > 0) {
        xml += `      <${tagName}>${arr.join(",")}</${tagName}>\n`;
      }
    };

    // 基础信息
    addTag("cnName", this.cnName, "");
    if (this.randomPro !== 0) addTag("randomPro", this.randomPro);
    addTag("description", this.description, "");
    addTag("info", this.info, "");
    addTag("armsType", this.armsType, "");

    // 战斗属性
    if (this.dpsMul !== 1) addTag("dpsMul", this.dpsMul);
    if (this.uiDpsMul !== 1) addTag("uiDpsMul", this.uiDpsMul);
    if (this.extraMul !== 1) addTag("extraMul", this.extraMul);
    addTag("capacity", this.capacity, 0);
    addTag("armsWeight", this.armsWeight, 0);
    addTag("reloadGap", this.reloadGap, 0);
    if (this.noShakeTime !== 0) addTag("noShakeTime", this.noShakeTime);
    addTag("gunNum", this.gunNum, 1);
    if (this.armsArmMul !== 0.5) addTag("armsArmMul", this.armsArmMul);
    if (this.handShootGap !== 0) addTag("handShootGap", this.handShootGap);
    if (this.upValue !== 0) addTag("upValue", this.upValue);
    if (this.focusAngleRange !== 0) addTag("focusAngleRange", this.focusAngleRange);
    if (this.leftHandImg !== 0) addTag("leftHandImg", this.leftHandImg);
    if (this.shootShakeAngle !== 0) addTag("shootShakeAngle", this.shootShakeAngle);
    if (this.twoShootPro !== 0) addTag("twoShootPro", this.twoShootPro);

    // 子结构
    xml += this.crossbowD.toXml();
    xml += this.recordD.toXml();

    // 视觉资源
    addTag("iconUrl", this.iconUrl, "");
    addTag("armsImgLabel", this.armsImgLabel, "");
    addTag("fireImgType", this.fireImgType, "");
    addTag("shootSoundUrl", this.shootSoundUrl, "");

    // 资源范围
    addArr("allImgPartArr", this.allImgPartArr);
    addArr("allImgRange", this.allImgRange);
    addArr("textureImgRange", this.textureImgRange);
    addArr("bodyImgRange", this.bodyImgRange);
    addArr("barrelImgRange", this.barrelImgRange);
    addArr("gripImgRange", this.gripImgRange);
    addArr("bulletImgRange", this.bulletImgRange);
    addArr("stockImgRange", this.stockImgRange);
    addArr("glassImgRange", this.glassImgRange);

    // 基础 Bullet 属性 - 行为标志
    if (this.sameCampB !== true) addTag("sameCampB", 0);
    if (this.whippB !== true) addTag("whippB", 0);
    if (this.noHitB) addTag("noHitB", 1);
    if (this.noHurtEffectB) addTag("noHurtEffectB", 1);
    if (this.noMagneticB) addTag("noMagneticB", 1);
    if (this.noBeClearB) addTag("noBeClearB", 1);
    if (this.implodingB) addTag("implodingB", 1);
    if (this.twoHitSameNameB) addTag("twoHitSameNameB", 1);
    if (this.oneHitBodyB) addTag("oneHitBodyB", 1);

    // 基础 Bullet 属性 - 伤害与效果
    if (this.hurtRatio !== 0) addTag("hurtRatio", this.hurtRatio);
    if (this.hurtMul !== 0) addTag("hurtMul", this.hurtMul);
    if (this.transBackMul !== 1) addTag("transBackMul", this.transBackMul);
    addTag("attackType", this.attackType, "");
    if (this.beatBack !== 0) addTag("beatBack", this.beatBack);
    if (this.targetShakeValue !== 0) addTag("targetShakeValue", this.targetShakeValue);

    // 基础 Bullet 属性 - 生命周期与碰撞
    if (this.bulletLife !== 2) addTag("bulletLife", this.bulletLife);
    if (this.lifeRandom !== 0) addTag("lifeRandom", this.lifeRandom);
    if (this.imgClearDelay !== 0) addTag("imgClearDelay", this.imgClearDelay);
    if (this.bulletWidth !== 7) addTag("bulletWidth", this.bulletWidth);
    if (this.bulletShakeWidth !== 0) addTag("bulletShakeWidth", this.bulletShakeWidth);
    addTag("hitType", this.hitType, "");
    if (this.penetrationNum !== 0) addTag("penetrationNum", this.penetrationNum);
    if (this.penetrationGap !== 0) addTag("penetrationGap", this.penetrationGap);

    // 基础 Bullet 属性 - 攻击频率与时机
    if (this.attackGap !== 0) addTag("attackGap", this.attackGap);
    if (this.attackDelay !== 0) addTag("attackDelay", this.attackDelay);
    if (this.noHitTime !== 0) addTag("noHitTime", this.noHitTime);
    if (this.hideTime !== 0) addTag("hideTime", this.hideTime);
    if (this.hitGap !== 0) addTag("hitGap", this.hitGap);
    if (this.twoHitGap !== 0) addTag("twoHitGap", this.twoHitGap);

    // 基础 Bullet 属性 - 发射属性
    if (this.shootGap !== 0) addTag("shootGap", this.shootGap);
    if (this.shootNum !== 1) addTag("shootNum", this.shootNum);
    if (this.shootRecoil !== 0) addTag("shootRecoil", this.shootRecoil);
    if (this.screenShakeValue !== 0) addTag("screenShakeValue", this.screenShakeValue);
    if (this.aiShootRange !== 0) addTag("aiShootRange", this.aiShootRange);
    if (this.gatlinNum !== 0) addTag("gatlinNum", this.gatlinNum);
    if (this.gatlinRange !== 0) addTag("gatlinRange", this.gatlinRange);
    if (this.shootPoint !== "0,0") addTag("shootPoint", this.shootPoint);

    // 基础 Bullet 属性 - 运动学
    if (this.bulletSpeed !== 0) addTag("bulletSpeed", this.bulletSpeed);
    if (this.gravity !== 0) addTag("gravity", this.gravity);
    if (this.bulletVra !== 0) addTag("bulletVra", this.bulletVra);
    if (this.bulletAngle !== -1000) addTag("bulletAngle", this.bulletAngle);
    if (this.bulletAngleRange !== 0) addTag("bulletAngleRange", this.bulletAngleRange);
    if (this.extendGap !== 0) addTag("extendGap", this.extendGap);

    // 基础 Bullet 属性 - 技能数组
    addArr("skillArr", this.skillArr);
    addArr("godSkillArr", this.godSkillArr);
    addArr("bulletSkillArr", this.bulletSkillArr);

    // 基础 Bullet 属性 - 子对象
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

    // 基础 Bullet 属性 - 视觉资源
    addTag("playImgLabel", this.playImgLabel, "");
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

  public static override createDefault(name: string): ArmsDefine {
    const d = new ArmsDefine();
    d.name = name;
    d.cnName = "新武器";
    return d;
  }
}