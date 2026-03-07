// client/src/models/drop/DropDefine.ts
import { Expose } from 'class-transformer';

export class DropDefine {
  @Expose() public name: string | undefined = undefined;
  @Expose() public cnName: string | undefined = undefined;
  @Expose() public type: string | undefined = undefined;
  @Expose() public secType: string | undefined = undefined;
  @Expose() public text: string | undefined = undefined;
  @Expose() public imgUrl: string | undefined = undefined;
  @Expose() public imgRandom: number | undefined = undefined;
  @Expose() public extraSkill: string | undefined = undefined;
  @Expose() public lifetime: number | undefined = undefined;
  @Expose() public noFollowHeroB: boolean | undefined = undefined;
  @Expose() public smallMapColor: string | undefined = undefined;
  @Expose() public lightImg: string | undefined = undefined;
  @Expose() public keyB: boolean | undefined = undefined;

  // 掉落概率属性
  @Expose() public normalPro: number | undefined = undefined;      // 普通小怪掉率
  @Expose() public superPro: number | undefined = undefined;       // 精英怪掉率
  @Expose() public bossPro: number | undefined = undefined;        // 首领掉率
  @Expose() public itemsLvRange: number[] | undefined = undefined; // 物品等级范围 [min, max]

  public toXml(): string {
    let xml = `    <drop name="${this.name ?? ""}"`;
    if (this.type) xml += ` type="${this.type}"`;
    xml += `>\n`;

    const addTag = (tagName: string, value: any, defaultValue: any = 0) => {
      if (value !== undefined && value !== null && value !== "" && value !== defaultValue) {
        xml += `      <${tagName}>${value}</${tagName}>\n`;
      }
    };

    addTag("cnName", this.cnName, "");
    addTag("secType", this.secType, "");
    addTag("text", this.text, "");
    addTag("imgUrl", this.imgUrl, "");
    if (this.imgRandom && this.imgRandom > 0) addTag("imgRandom", this.imgRandom);
    if (this.extraSkill) addTag("extraSkill", this.extraSkill);
    if (this.lifetime !== undefined && this.lifetime !== -1) addTag("lifetime", this.lifetime);
    if (this.noFollowHeroB) xml += `      <noFollowHeroB>1</noFollowHeroB>\n`;
    if (this.smallMapColor) addTag("smallMapColor", this.smallMapColor);
    if (this.lightImg) addTag("lightImg", this.lightImg);
    if (this.keyB) xml += `      <keyB>1</keyB>\n`;

    // 掉落概率
    if (this.normalPro && this.normalPro > 0) addTag("normalPro", this.normalPro);
    if (this.superPro && this.superPro > 0) addTag("superPro", this.superPro);
    if (this.bossPro && this.bossPro > 0) addTag("bossPro", this.bossPro);
    if (this.itemsLvRange && this.itemsLvRange.length > 0) addTag("itemsLvRange", this.itemsLvRange.join(","));

    xml += `    </drop>`;
    return xml;
  }

  public static createDefault(name: string): DropDefine {
    const d = new DropDefine();
    d.name = name;
    d.cnName = "新掉落项";
    d.type = "things";
    return d;
  }
}