// client/src/models/level/rect/MapRect.ts
import { Expose } from "class-transformer";

export class MapRect {
  @Expose() public id: string | undefined = undefined;
  @Expose() public label: string | undefined = undefined;

  // 继承自 Rectangle 的属性
  @Expose() public x: number | undefined = undefined;
  @Expose() public y: number | undefined = undefined;
  @Expose() public width: number | undefined = undefined;
  @Expose() public height: number | undefined = undefined;

  /**
   * 生成 <rect id=".." label="..">x,y,w,h</rect>
   */
  public toXml(): string {
    const csv = `${Math.round(this.x ?? 0)},${Math.round(this.y ?? 0)},${Math.round(this.width ?? 0)},${Math.round(this.height ?? 0)}`;
    let xml = `<rect id="${this.id ?? ''}"`;
    if (this.label) xml += ` label="${this.label}"`;
    xml += `>${csv}</rect>`;
    return xml;
  }
}