// client/src/models/level/rect/MapRect.ts
import { Expose } from "class-transformer";

export class MapRect {
  @Expose() public id: string = "";
  @Expose() public label: string | undefined = undefined;
  
  // 继承自 Rectangle 的属性
  @Expose() public x: number = 0;
  @Expose() public y: number = 0;
  @Expose() public width: number = 0;
  @Expose() public height: number = 0;

  /**
   * 生成 <rect id=".." label="..">x,y,w,h</rect>
   */
  public toXml(): string {
    const csv = `${Math.round(this.x)},${Math.round(this.y)},${Math.round(this.width)},${Math.round(this.height)}`;
    let xml = `<rect id="${this.id}"`;
    if (this.label) xml += ` label="${this.label}"`;
    xml += `>${csv}</rect>`;
    return xml;
  }
}