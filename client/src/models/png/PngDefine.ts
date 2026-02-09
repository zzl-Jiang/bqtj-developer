// client/src/models/PngDefine.ts

import { Expose } from 'class-transformer';

export class PngDefine {
  [key: string]: any;

  /** 调用所需的名称 */
  @Expose()
  public name: string = "new_png";

  /** 论坛图片 url */
  @Expose()
  public url: string = "";

  /** x 轴偏移量 */
  @Expose()
  public x: number = 0;

  /** y 轴偏移量 */
  @Expose()
  public y: number = 0;

  /** x 轴缩放比 */
  @Expose()
  public scaleX: number = 1;

  /** y 轴缩放比 */
  @Expose()
  public scaleY: number = 1;

  /** 转 XML 逻辑 */
  public toXml(): string {
    // 必填项
    let xml = `<png name="${this.name}" url="${this.url}"`;

    // 可选属性：只有不等于默认值时才导出
    if (this.x !== 0) xml += ` x="${this.x}"`;
    if (this.y !== 0) xml += ` y="${this.y}"`;
    if (this.scaleX !== 1) xml += ` scaleX="${this.scaleX}"`;
    if (this.scaleY !== 1) xml += ` scaleY="${this.scaleY}"`;

    xml += ` />`;
    return xml;
  }
}