// client/src/models/level/MapRectGroup.ts
import { Expose, Type } from "class-transformer";
import { MapRect } from "./MapRect";

export class MapRectGroup {
  @Expose()
  @Type(() => MapRect)
  public rects: MapRect[] = [];

  public toXml(): string {
    if (this.rects.length === 0) return "";
    
    let xml = `        <rectG>\n`;
    this.rects.forEach(rect => {
      xml += `          ${rect.toXml()}\n`;
    });
    xml += `        </rectG>`;
    return xml;
  }
}