// client/src/models/PngDefine.ts

import { Expose } from 'class-transformer';

export class PngDefine {
  [key: string]: any;

  /** 调用所需的名称 */
  @Expose()
  public name: string | undefined = undefined;

  /** 论坛图片 url */
  @Expose()
  public url: string | undefined = undefined;

  /** x 轴偏移量 */
  @Expose()
  public x: number | undefined = undefined;

  /** y 轴偏移量 */
  @Expose()
  public y: number | undefined = undefined;

  /** x 轴缩放比 */
  @Expose()
  public scaleX: number | undefined = undefined;

  /** y 轴缩放比 */
  @Expose()
  public scaleY: number | undefined = undefined;

  /** 转 XML 逻辑 */
  public toXml(): string {
    // 必填项
    let xml = `<png name="${this.name ?? ""}" url="${this.url ?? ""}"`;

    // 可选属性：只有不等于默认值时才导出
    if (this.x !== undefined && this.x !== 0) xml += ` x="${this.x}"`;
    if (this.y !== undefined && this.y !== 0) xml += ` y="${this.y}"`;
    if (this.scaleX !== undefined && this.scaleX !== 1) xml += ` scaleX="${this.scaleX}"`;
    if (this.scaleY !== undefined && this.scaleY !== 1) xml += ` scaleY="${this.scaleY}"`;

    xml += ` />`;
    return xml;
  }
}