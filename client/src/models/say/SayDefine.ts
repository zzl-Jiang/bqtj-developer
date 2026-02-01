// client/src/models/say/SayDefine.ts

import { Expose } from 'class-transformer';

export class SayDefine {
  // 允许通过字符串索引访问属性，用于动态表单绑定
  [key: string]: any;

  /** 说话目标 (例如 "p1", "p1/手机") */
  @Expose()
  public target: string | undefined = undefined;

  /** 对话框指向的目标 (若为空，游戏逻辑会自动计算) */
  @Expose()
  public pointer: string | undefined = undefined;

  /** 头像路径 */
  @Expose()
  public iconUrl: string | undefined = undefined;

  /** 限制条件 (例如 "noStrikerWenJie") */
  @Expose()
  public r: string | undefined = undefined;

  /** 对话内容数组 (源码中支持随机抽取，通常我们填一个) */
  @Expose()
  public contentArr: string[] = [""];

  /**
   * 生成 <say> 标签
   */
  public toXml(): string {
    let xml = `          <say`;
    if (this.target != null) xml += ` target="${this.target}"`;
    if (this.pointer != null) xml += ` pointer="${this.pointer}"`;
    if (this.iconUrl != null) xml += ` iconUrl="${this.iconUrl}"`;
    if (this.r != null) xml += ` r="${this.r}"`;
    xml += `>\n`;
    
    // 内容节点
    this.contentArr.forEach(content => {
      xml += `            <content>${content}</content>\n`;
    });
    
    xml += `          </say>`;
    return xml;
  }
}