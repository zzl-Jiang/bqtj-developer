// client/src/models/skill/SkillDefine.ts

import { Expose, Type } from 'class-transformer';
import { SkillTargetDefine } from './SkillTargetDefine';
import { ImageUrlDefine } from '../common/ImgUrlDefine';

/**
 * 核心技能定义类
 * 该类负责存储技能的所有属性、逻辑标志位，并生成符合游戏规范的 XML 结构
 */
export class SkillDefine {
  // 允许通过字符串索引访问属性，用于动态表单绑定
  [key: string]: any;

  /** 内部名称 (ID)，不可重复。在 XML 中作为属性及子节点存在 */
  @Expose()
  public name: string | undefined = undefined;

  /** 界面显示名称 */
  @Expose()
  public cnName: string | undefined = undefined;

  /** 父级分类 (例如: heroSkill, enemySuper, equipSkill) */
  @Expose()
  public father: string = "heroSkill";
  
  /** 技能局外图标路径 */
  @Expose()
  public iconUrl: string | undefined = undefined;

  /** 技能局内图标路径 (36x36 规格) */
  @Expose()
  public iconUrl36: string | undefined = undefined;

  /** 基础技能标签 */
  @Expose()
  public baseLabel: string | undefined = undefined;

  /** 
   * 触发种类：
   * passive: 被动
   * active: 主动
   */
  @Expose()
  public conditionType: string | undefined = undefined;

  /** 具体条件种类 */
  @Expose()
  public condition: string | undefined = undefined;

  /** 条件判断的返回显示语句，与 as 相关 */
  @Expose()
  public doCondition: string | undefined = undefined;

  /** 条件范围 */
  @Expose()
  public conditionRange: number | undefined = undefined;

  /** 条件字符串 */
  @Expose()
  public conditionString: string | undefined = undefined;

  /** 学习所需等级 */
  @Expose()
  public mustLv: number = 0;

  /** 效果分类。这个使用需要严格的限制和已有定义对应 */
  @Expose()
  public effectFather: string | undefined = undefined;

  /** AS3 内部调用的函数名称 */
  @Expose()
  public effectType: string = "no";

  /** 效果添加种类，即时/状态/即时+状态 */
  @Expose()
  public addType: string | undefined = undefined;

  /** 状态类型，悬停沙漏专用 */
  @Expose()
  public stateType: string | undefined = undefined;

  /** 状态移除时调用的效果 */
  @Expose()
  public stateRemoveEvent: string = "";

  /** 技能数值 */
  @Expose()
  public value: number | undefined = undefined;

  /** 技能主要倍率 */
  @Expose()
  public mul: number | undefined = undefined;

  /** 技能次要倍率 */
  @Expose()
  public secMul: number | undefined = undefined;

  /** 技能主要效果字符串 */
  @Expose()
  public valueString: string | undefined = undefined;

  /** 技能次要效果字符串 */
  @Expose()
  public secString: string | undefined = undefined;

  /** 附加数值类型 */
  @Expose()
  public extraValueType: string | undefined = undefined;

  /** 冷却时间 */
  @Expose()
  public cd: number | undefined = undefined;

  /** 
   * 初始冷却时间。
   * 若保持初始值，则初始化时自动设为 cd 的 2/3 
   */
  @Expose()
  public firstCd: number | undefined = undefined;

  /** 持续时间 */
  @Expose()
  public duration: number | undefined = undefined;

  /** 自动触发间隔 */
  @Expose()
  public intervalT: number | undefined = undefined;

  /** 最小触发间隔 */
  @Expose()
  public minTriggerT: number | undefined = undefined;

  /** 首次触发间隔 */
  @Expose()
  public firstTriggerT: number | undefined = undefined;

  /** 配合主动技能，前摇一类的 */
  @Expose()
  public delay: number | undefined = undefined;

  /** 状态效果的触发间隔 */
  @Expose()
  public doGap: number | undefined = undefined;

  /** 随机冷却延迟增加，从0到这个值 */
  @Expose()
  public cdRandomRange: number | undefined = undefined;

  /** 最大连续使用次数，点名恐怖盒子 */
  @Expose()
  public continueNum: number | undefined = undefined;

  /** 生效范围 */
  @Expose()
  public range: number | undefined = undefined;

  /** 最小生效范围 */
  @Expose()
  public minRange: number | undefined = undefined;

  // 状态标志位
  /** 是否在生命条上方显示 */
  @Expose()
  public showInLifeBarB: boolean = false;

  /** 是否无视沉默状态 */
  @Expose()
  public ignoreSilenceB: boolean = false;

  /** 是否无视封锁状态 */
  @Expose()
  public ignoreNoSkillB: boolean = false;

  /** 状态是否可以叠加 (Overlying) */
  @Expose()
  public overlyingB: boolean = false;

  /** 能否被分身/克隆单位继承 */
  @Expose()
  public noInClonedB: boolean = false;

  /** 是否不被清除 */
  @Expose()
  public noBeClearB: boolean = false;

  /** 是否永不清除 */
  @Expose()
  public everNoClearB: boolean = false;

  /** 是否召唤单位 */
  @Expose()
  public summonedUnitsB: boolean = false;

  /** 是否会修改伤害，多用于武器技能 */
  @Expose()
  public changeHurtB: boolean = false;

  /** 是否无视概率免疫 */
  @Expose()
  public noSkillDodgeB: boolean = false;

  /** 是否无视技能免疫 */
  @Expose()
  public ignoreImmunityB: boolean = false;

  /** 是否不会被技能复制所复制 */
  @Expose()
  public noCopyB: boolean = false;

  /** 是否不会出现在随机技能列表中 */
  @Expose()
  public noRandomListB: boolean = false;

  /** 
   * 是否免疫所有伤害，用于电离折射/反转。
   * 注意，这个属性实际没有任何效果。
   */
  @Expose()
  public isDefenceB: boolean = false;

  /** 
   * 是否不可阻挡，用于电离折射/反转/一些特殊技能。
   * 注意，这个属性实际也没有任何效果。
   */
  @Expose()
  public isInvincibleB: boolean = false;

  /** 是否生效期间内不反复触发 */
  @Expose()
  public noReStateB: boolean = false;

  /** 是否不允许 cd 加成 */
  @Expose()
  public noCdMulB: boolean = false;

  /** 是否落地后效果消失。点名滑翔 */
  @Expose()
  public groundDieB: boolean = false;

  /** 是否需要/显示说明文本 */
  @Expose()
  public wantDescripB: boolean = false;

  /** 是否在目标点实现效果 */
  @Expose()
  public targetPointEffectB: boolean = false;

  /** 效果不生效的模式 */
  @Expose()
  public noEffectLevelModel: string | undefined = undefined;

  /** 武器类型相关的概率模式名称 */
  @Expose()
  public createByArmsTypePro: string | undefined = undefined;

  /** 每颗子弹触发及能生效的最大击中次数 */
  @Expose()
  public haveEffectBuletHitNum: number = 9999;

  /** 对应单位使用的动作标签。需要和 swf 动画对应 */
  @Expose()
  public meActionLabel: string | undefined = undefined;

  /** 光波专用，好像也是个类似前摇的，专门用于控制图像效果 */
  @Expose()
  public ie: string = "";

  /** 其他条件生效列表 */
  @Expose()
  public otherConditionArr: string[] | undefined = undefined;

  /** 生效需要的攻击动画标签列表 */
  @Expose()
  public applyArr: string[] = [];

  /** 技能概率列表 */
  @Expose()
  public effectProArr: number[] | undefined = undefined;

  /** 被动技能引用列表 */
  @Expose()
  public passiveSkillArr: string[] | undefined = undefined;

  /** 技能链接列表 */
  @Expose()
  public linkArr: string[] | undefined = undefined;

  /** 动作特效预处理列表 */
  @Expose()
  public preEffectArr: string[] = [];
  
  /** 技能目标定义 */
  @Expose()
  @Type(() => SkillTargetDefine)
  public target: SkillTargetDefine = new SkillTargetDefine();

  /** 额外参数对象 (源码中以 JSON 字符串形式存储在 <obj> 节点) */
  @Expose()
  public obj: string | undefined = undefined;
  
  /** 技能添加图像 */
  @Expose()
  @Type(() => ImageUrlDefine)
  public addSkillEffectImg: ImageUrlDefine = new ImageUrlDefine();

  /** 对自身，即调用者的图像附加 */
  @Expose()
  @Type(() => ImageUrlDefine)
  public meEffectImg: ImageUrlDefine = new ImageUrlDefine();

  /** 对目标的图像附加 */
  @Expose()
  @Type(() => ImageUrlDefine)
  public targetEffectImg: ImageUrlDefine = new ImageUrlDefine();

  /** 对生效点位的图像附加 */
  @Expose()
  @Type(() => ImageUrlDefine)
  public pointEffectImg: ImageUrlDefine = new ImageUrlDefine();

  /** 其他附加图像 */
  @Expose()
  @Type(() => ImageUrlDefine)
  public otherEffectImg: ImageUrlDefine = new ImageUrlDefine();

  /** 状态生效时的附加图像 */
  @Expose()
  @Type(() => ImageUrlDefine)
  public stateEffectImg: ImageUrlDefine = new ImageUrlDefine();

  /** 状态2图像 */
  @Expose()
  @Type(() => ImageUrlDefine)
  public stateEffectImg2: ImageUrlDefine = new ImageUrlDefine();

  /**
   * 生成符合规范的技能 XML 字符串。
   */
  public toXml(): string {
    let xml = `    <skill name="${this.name || 'empty'}"`;
    if (this.cnName != null) xml += ` cnName="${this.cnName}"`;
    xml += `>\n`;

    // 基础识别与显示
    xml += `      <name>${this.name}</name>\n`;
    if (this.cnName != null) xml += `      <cnName>${this.cnName}</cnName>\n`;
    if (this.iconUrl != null) xml += `      <iconUrl>${this.iconUrl}</iconUrl>\n`;
    if (this.iconUrl36 != null) xml += `      <iconUrl36>${this.iconUrl36}</iconUrl36>\n`;
    if (this.baseLabel != null) xml += `      <baseLabel>${this.baseLabel}</baseLabel>\n`;
    if (this.description != null) xml += `      <description>${this.description}</description>\n`;

    // 核心逻辑
    if (this.conditionType != null) xml += `      <conditionType>${this.conditionType}</conditionType>\n`;
    xml += `      <effectType>${this.effectType}</effectType>\n`;
    if (this.condition != null) xml += `      <condition>${this.condition}</condition>\n`;
    if (this.conditionString != null) xml += `      <conditionString>${this.conditionString}</conditionString>\n`;
    if (this.conditionRange != null) xml += `      <conditionRange>${this.conditionRange}</conditionRange>\n`;
    if (this.doCondition != null) xml += `      <doCondition>${this.doCondition}</doCondition>\n`;
    if (this.effectFather != null) xml += `      <effectFather>${this.effectFather}</effectFather>\n`;
    if (this.addType != null) xml += `      <addType>${this.addType}</addType>\n`;
    if (this.stateType != null) xml += `      <stateType>${this.stateType}</stateType>\n`;

    // 数值与时间
    if (this.value != null) xml += `      <value>${this.value}</value>\n`;
    if (this.mul != null) xml += `      <mul>${this.mul}</mul>\n`;
    if (this.secMul != null) xml += `      <secMul>${this.secMul}</secMul>\n`;
    if (this.cd != null) xml += `      <cd>${this.cd}</cd>\n`;
    if (this.firstCd != null) xml += `      <firstCd>${this.firstCd}</firstCd>\n`;
    if (this.duration != null) xml += `      <duration>${this.duration}</duration>\n`;
    if (this.intervalT != null) xml += `      <intervalT>${this.intervalT}</intervalT>\n`;
    if (this.range != null) xml += `      <range>${this.range}</range>\n`;
    if (this.delay != null) xml += `      <delay>${this.delay}</delay>\n`;
    if (this.doGap != null) xml += `      <doGap>${this.doGap}</doGap>\n`;
    if (this.valueString != null) xml += `      <valueString>${this.valueString}</valueString>\n`;
    if (this.secString != null) xml += `      <secString>${this.secString}</secString>\n`;
    if (this.meActionLabel != null) xml += `      <meActionLabel>${this.meActionLabel}</meActionLabel>\n`;

    if (this.noEffectLevelModel != null) xml += `      <noEffectLevelModel>${this.noEffectLevelModel}</noEffectLevelModel>\n`;
    if (this.createByArmsTypePro != null) xml += `      <createByArmsTypePro>${this.createByArmsTypePro}</createByArmsTypePro>\n`;

    // 布尔标志位 (仅在非默认值 true 时导出)
    const boolProps = [
      "everNoClearB", "showInLifeBarB", "noInClonedB", "summonedUnitsB",
      "noBeClearB", "changeHurtB", "noSkillDodgeB", "ignoreImmunityB",
      "ignoreNoSkillB", "ignoreSilenceB", "noCopyB", "noRandomListB",
      "isDefenceB", "isInvincibleB",
      "overlyingB", "noReStateB", "noCdMulB", "groundDieB", "wantDescripB",
      "targetPointEffectB"
    ];
    boolProps.forEach(prop => {
      if (this[prop]) xml += `      <${prop}>1</${prop}>\n`;
    });

    // 子对象与嵌套
    if (this.target.toXml()) {
      xml += `      ${this.target.toXml()}\n`;
    };
    
    // 图像组
    const imgTags = ["addSkillEffectImg", "meEffectImg", "targetEffectImg", "pointEffectImg", "otherEffectImg", "stateEffectImg", "stateEffectImg2"];
    imgTags.forEach(tag => {
      const imgXml = this[tag].toXml(tag);
      if (imgXml) xml += `      ${imgXml}\n`;
    });

    // 数组类 (逗号分隔)
    if ((this.otherConditionArr?.length ?? 0) > 0) xml += `      <otherConditionArr>${(this.otherConditionArr ?? []).join(',')}</otherConditionArr>\n`;
    if ((this.effectProArr?.length ?? 0) > 0) xml += `      <effectProArr>${(this.effectProArr ?? []).join(',')}</effectProArr>\n`;
    if ((this.passiveSkillArr?.length ?? 0) > 0) xml += `      <passiveSkillArr>${(this.passiveSkillArr ?? []).join(',')}</passiveSkillArr>\n`;
    if ((this.linkArr?.length ?? 0) > 0) xml += `      <linkArr>${(this.linkArr ?? []).join(',')}</linkArr>\n`;
    if (this.preEffectArr.length > 0) xml += `      <preEffectArr>${this.preEffectArr.join(',')}</preEffectArr>\n`;

    // 动态对象 Obj
    if (this.obj) xml += `      <obj>${this.obj}</obj>\n`;

    xml += `    </skill>`;
    return xml;
  }
}