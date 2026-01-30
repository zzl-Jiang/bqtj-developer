// client/src/models/skill/SkillTargetDefine.ts

import { Expose } from "class-transformer";

/**
 * 技能目标定义类
 */
export class SkillTargetDefine {
  [key: string]: any; 
  /** 是否计入本体 */
  @Expose()
  public noMeB: boolean = false;

  /** 是否计入 P1 角色 */
  @Expose()
  public noMainB: boolean = false;

  /** 目标限制数量 */
  @Expose()
  public limitNum: number | undefined = undefined;

  /** 目标是否必须存在 */
  @Expose()
  public noExistB: boolean = false;

  /** 目标是否必须存活 */
  @Expose()
  public targetMustLiveB: boolean = false;

  /** 竞技场是否无效 */
  @Expose()
  public arenaB: boolean = true;

  /** 排除的种族类型 */
  @Expose()
  public noRaceType: string | undefined = undefined;

  /** 指定单位生效 */
  @Expose()
  public bodyName: string | undefined = undefined;

  /** 是否排除载具 */
  @Expose()
  public noVehicleB: boolean = false;

  /** 生效的参照目标 */
  @Expose()
  public target: string | undefined = undefined;

  /** 生效选择的类型 */
  @Expose()
  public chooseType: string | undefined= undefined;

  /** 目标阵营 */
  @Expose()
  public camp: string | undefined= undefined;

  /** 单位类型限制 */
  @Expose()
  public unitType: string | undefined= undefined;

  /** 单位大类限制 */
  @Expose()
  public systemType: string | undefined= undefined;

  /** 特殊技能机制目标选择 */
  @Expose()
  public alert: string | undefined= undefined;

  /**
   * 创建一个默认的敌方目标选择器
   */
  static createDefault(): SkillTargetDefine {
    const target = new SkillTargetDefine();
    target.target = "me";      // 默认参照目标：本体
    target.chooseType = "range";  // 默认选择方式：范围
    target.camp = "enemy";       // 默认阵营：敌方
    return target;
  }

  /** 生成 Target 节点的 XML */
  public toXml(): string {
    // 处理属性部分
    let xmlAll = `<target`;
    let xml = "";
    if (this.noMeB) xml += ` noMeB="1"`;
    if (this.noMainB) xml += ` noMainB="1"`;
    if (this.limitNum) xml += ` limitNum="${this.limitNum}"`;
    if (this.noExistB) xml += ` noExistB="1"`;
    if (this.targetMustLiveB) xml += ` targetMustLiveB="1"`;
    if (!this.arenaB) xml += ` arenaB="0"`;
    if (this.noRaceType) xml += ` noRaceType="${this.noRaceType}"`;
    if (this.bodyName) xml += ` bodyName="${this.bodyName}"`;
    if (this.noVehicleB) xml += ` noVehicleB="1"`;
    if (this.alert) xml += ` alert="${this.alert}"`;
    xml += `>`;

    // 处理标签内容
    const parts = [
      this.target || "",      // 第1位
      this.chooseType || "",  // 第2位
      this.camp || "",        // 第3位
      this.unitType || "",    // 第4位
      this.systemType || ""   // 第5位
    ];

    // 检查是否有任何一个位置有值
    const hasContent = parts.some(p => p !== "");

    if (hasContent) {
      // 找到最后一个有内容的位置，避免生成多余的结尾逗号
      // 比如只想生成 "me,range"，而不是 "me,range,,,"
      let lastIndex = -1;
      for (let i = parts.length - 1; i >= 0; i--) {
        if (parts[i] !== "") {
          lastIndex = i;
          break;
        }
      }
      // 截取到最后一位有值的，然后 join
      xml += parts.slice(0, lastIndex + 1).join(',');
    }

    if (xml === '>') return "";
    xmlAll += `${xml}</target>`;
    return xmlAll;
  }
}