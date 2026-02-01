// client/src/models/say/SayListDefine.ts

import { Expose, Type } from 'class-transformer';
import { SayDefine } from './SayDefine';

export class SayListDefine {
  // 允许通过字符串索引访问属性，用于动态表单绑定
  [key: string]: any;

  /** 内部名称 (ID) */
  @Expose()
  public name: string = "new_say_list";

  /** 关联的关卡 ID */
  @Expose()
  public levelName: string | undefined = undefined;

  /** 是否只触发一次 (0/1) */
  @Expose()
  public oneB: boolean | undefined = undefined;

  /** 对话列表 */
  @Expose()
  @Type(() => SayDefine)
  public arr: SayDefine[] = [];

  /**
   * 创建默认模板
   */
  static createDefault(name: string): SayListDefine {
    const list = new SayListDefine();
    list.name = name;
    const firstSay = new SayDefine();
    firstSay.target = "p1";
    firstSay.contentArr = ["Ciallo～&#10;(∠・ω&lt; )⌒★"];
    list.arr.push(firstSay);
    return list;
  }

  /**
   * 按照源码逻辑，say 的 XML 结构比较特殊：
   * <level name="关卡名">
   *    <sayList name="对话名" oneB="1">
   *       <say>...</say>
   *    </sayList>
   * </level>
   */
  public toXml(): string {
    let xml = `      <level name="${this.levelName || 'global'}">\n`;
    xml += `        <sayList name="${this.name}"`;
    if (this.oneB != null && this.oneB === true) xml += ` oneB="1"`;
    xml += `>\n`;
    
    this.arr.forEach(say => {
      xml += `${say.toXml()}\n`;
    });
    
    xml += `        </sayList>\n`;
    xml += `      </level>`;
    return xml;
  }
}