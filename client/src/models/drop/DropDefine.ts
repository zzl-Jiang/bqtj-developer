// client/src/models/drop/DropDefine.ts
import { Expose } from 'class-transformer';

export class DropDefine {
  @Expose() public name: string = "";
  @Expose() public cnName: string = "";
  @Expose() public type: string = "";
  @Expose() public secType: string = "";
  @Expose() public text: string = "";
  @Expose() public imgUrl: string = "";
  @Expose() public imgRandom: number = 0;
  @Expose() public extraSkill: string = "";
  @Expose() public lifetime: number = -1;
  @Expose() public noFollowHeroB: boolean = false;
  @Expose() public smallMapColor: string = "";
  @Expose() public lightImg: string = "";
  @Expose() public keyB: boolean = false;

  public toXml(): string {
    let xml = `    <drop name="${this.name || ""}"`;
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
    if (this.imgRandom > 0) addTag("imgRandom", this.imgRandom);
    if (this.extraSkill) addTag("extraSkill", this.extraSkill);
    if (this.lifetime !== -1) addTag("lifetime", this.lifetime);
    if (this.noFollowHeroB) xml += `      <noFollowHeroB>1</noFollowHeroB>\n`;
    if (this.smallMapColor) addTag("smallMapColor", this.smallMapColor);
    if (this.lightImg) addTag("lightImg", this.lightImg);
    if (this.keyB) xml += `      <keyB>1</keyB>\n`;

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