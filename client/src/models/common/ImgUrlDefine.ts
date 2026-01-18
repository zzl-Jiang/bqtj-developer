// client/src/models/common/ImgUrlDefine.ts

import { Expose } from 'class-transformer';

/**
 * 描述一个视觉/听觉效果的定义类。
 * 它可以是一个简单的图片URL，也可以是一个包含音效、震动、混合模式等复杂参数的完整效果。
 */
export class ImageUrlDefine {
  /** 调用名称 */
  @Expose()
  public name: string = '';

  /** 中文名称 */
  @Expose()
  public cnName: string = '';
  
  /** 图像资源的基础路径 (e.g., "effects/explosion") */
  @Expose()
  public url: string = '';
  
  /** 音效资源的基础路径 (e.g., "sounds/explosion_sound") */
  @Expose()
  public soundUrl: string = '';

  /** 震动效果的描述字符串 (e.g., "type:small,duration:0.2") */
  @Expose()
  public shake: string = '';
  
  /** 图像混合模式/图层效果 (e.g., "add", "filter") */
  @Expose()
  public con: string | undefined = undefined;
  
  /** 图像帧数或分段数量 (主要用于射线类效果) */
  @Expose()
  public len: number = 0;
  
  /** 动画/效果时长 (秒, -1 表示跟随动画长度) */
  @Expose()
  public time: number = -1;
  
  /** 是否在底层渲染 */
  @Expose()
  public bottomLayerB: boolean = false;
  
  /** 是否缓存此图像以提高性能 */
  @Expose()
  public cacheB: boolean = false;
  
  /** 颜色叠加，格式为 0xRRGGBB 的数字 */
  @Expose()
  public bodyColor: number = 0;
  
  /** 颜色叠加的透明度 (0-1) */
  @Expose()
  public bodyColorAlpha: number = 0;

  /** 效果是否持续刷新 (主要用于射线) */
  @Expose()
  public everFleshB: boolean = false;

  /** 射线波动角度 */
  @Expose()
  public waveAn: number = 0;

  /** 在X轴上的偏移量 */
  @Expose()
  public xGap: number = 0;

  /** 随机偏移范围 */
  @Expose()
  public randomRange: number = 0;

  /** 随机旋转角度范围 */
  @Expose()
  public ranAn: number = 0;

  /** 动画帧数 */
  @Expose()
  public raNum: number | undefined = undefined;

  /** 是否跟随父级部件的旋转 */
  @Expose()
  public followPartRaB: boolean = false;
  
  /** 是否完全不跟随父级移动（固定在屏幕上） */
  @Expose()
  public noFollowB: boolean = false;
  
  /** URL 随机后缀的最大值 (e.g., 3 -> url1, url2, url3) */
  @Expose()
  public urlRandomValue: number = 0;
  
  /** 音效随机后缀的最大值 (e.g., 3 -> sound1, sound2, sound3) */
  @Expose()
  public soundRan: number = 0;
  
  /** 音量 (-1 表示未设置, 1 为默认值) */
  @Expose()
  public soundVolume: number | undefined = undefined;
  
  /** 效果消失的类型 (e.g., "fade_out") */
  @Expose()
  public imgDieType: string = "";
  
  /** 烟雾效果的类型 (e.g., "one", "frame") */
  @Expose()
  public smokeType: string = "one";

  /** 是否不显示此效果 (用于逻辑占位) */
  @Expose()
  public noShowB: boolean = false;
  
  /** 关联的显示部位 (用于复杂模型) */
  @Expose()
  public partType: string[] | undefined = undefined;

  /** 不知道干啥的，先留着 */
  @Expose()
  public sm: string = "";

  /** partType 选项范围 */
  public partTypeOpt: Record<string, string>[] = [
    {
      label: "2hand",
      value: "2hand"
    },
    {
      label: "2foot",
      value: "2foot"
    },
    {
      label: "2eye",
      value: "2eye"
    },
    {
      label: "mouth",
      value: "mouth"
    },
    {
      label: "arm_right_0",
      value: "arm_right_0"
    },
    {
      label: "arm_right_1",
      value: "arm_right_1"
    },
    {
      label: "arm_left_0",
      value: "arm_left_0"
    },
    {
      label: "arm_left_1",
      value: "arm_left_1"
    },
    {
      label: "leg_right_0",
      value: "leg_right_0"
    },
    {
      label: "leg_right_1",
      value: "leg_right_1"
    },
    {
      label: "leg_left_0",
      value: "leg_left_0"
    },
    {
      label: "leg_left_1",
      value: "leg_left_1"
    },
  ]

  /** con 选项范围 */
  public conOpt: Record<string, string>[] = [
    {
      label: "添加 (add)",
      value: "add"
    },
    {
      label: "过滤 (filter)",
      value: "filter"
    },
  ]

  /**
   * 生成 XML 节点。
   * @param tagName 节点名称 (如 "meEffectImg")
   * 逻辑：只有当属性值不等于默认值时，才导出该属性。
   */
  public toXml(tagName: string): string {
    // 如果 url 和 soundUrl 都没有，认为该效果定义无效，不生成节点
    if (!this.url && !this.soundUrl) return "";

    let xml = `<${tagName}`;

    // 字符串属性修剪
    if (this.soundUrl) xml += ` soundUrl="${this.soundUrl}"`;
    if (this.shake) xml += ` shake="${this.shake}"`;
    if (this.con) xml += ` con="${this.con}"`;
    if (this.imgDieType) xml += ` imgDieType="${this.imgDieType}"`;
    if (this.smokeType !== "one") xml += ` smokeType="${this.smokeType}"`;
    if (this.sm) xml += ` sm="${this.sm}"`;

    // 数值属性修剪 (默认值为 0 的)
    if (this.len !== 0) xml += ` len="${this.len}"`;
    if (this.bodyColor !== 0) xml += ` bodyColor="${this.bodyColor}"`;
    if (this.bodyColorAlpha !== 0) xml += ` bodyColorAlpha="${this.bodyColorAlpha}"`;
    if (this.waveAn !== 0) xml += ` waveAn="${this.waveAn}"`;
    if (this.xGap !== 0) xml += ` xGap="${this.xGap}"`;
    if (this.randomRange !== 0) xml += ` randomRange="${this.randomRange}"`;
    if (this.ranAn !== 0) xml += ` ranAn="${this.ranAn}"`;
    if (this.urlRandomValue !== 0) xml += ` urlRandomValue="${this.urlRandomValue}"`;
    if (this.soundRan !== 0) xml += ` soundRan="${this.soundRan}"`;

    // 特殊默认值修剪
    if (this.time !== -1) xml += ` time="${this.time}"`;
    if (this.soundVolume) xml += ` soundVolume="${this.soundVolume}"`;
    if (this.raNum) xml += ` raNum="${this.raNum}"`;

    // 布尔属性修剪 (Flash 习惯使用 "1" 表示 true)
    if (this.bottomLayerB) xml += ` bottomLayerB="1"`;
    if (this.cacheB) xml += ` cacheB="1"`;
    if (this.everFleshB) xml += ` everFleshB="1"`;
    if (this.followPartRaB) xml += ` followPartRaB="1"`;
    if (this.noFollowB) xml += ` noFollowB="1"`;
    if (this.noShowB) xml += ` noShowB="1"`;

    // 数组处理
    if (this.partType && this.partType.length > 0) {
        xml += ` partType="${this.partType.join(',')}"`;
    }

    xml += `>${this.url}</${tagName}>`;
    return xml;
  }
}