// client/src/services/XmlEntityParser.ts
// 通用 XML 实体解析器 - 自动将 XML 元素映射到类实例

export interface XmlParserOptions {
  // 是否优先从属性读取（如 <bullet name="xxx">）
  preferAttributes?: string[];
  // 需要解析为数字的属性
  numberFields?: string[];
  // 需要解析为布尔值的属性（1/true 为 true）
  booleanFields?: string[];
  // 需要解析为数组的属性（逗号分隔）
  arrayFields?: string[];
  // 子对象映射 { 属性名: 解析函数 }
  nestedParsers?: Record<string, (el: Element) => any>;
}

export class XmlEntityParser {
  /**
   * 从 XML 元素自动解析实体
   * @param element XML 元素
   * @param EntityClass 实体类构造函数
   * @param options 解析选项
   */
  static parse<T>(
    element: Element,
    EntityClass: new () => T,
    options: XmlParserOptions = {}
  ): T {
    const instance = new EntityClass();
    const {
      preferAttributes = [],
      numberFields = [],
      booleanFields = [],
      arrayFields = [],
      nestedParsers = {}
    } = options;

    // 获取所有属性名（包括那些可能只在 XML 中存在的）
    const xmlAttributeNames = Array.from(element.attributes).map(attr => attr.name);
    const xmlChildTagNames = Array.from(element.children).map(child => child.tagName.toLowerCase());
    const allFieldNames = new Set([...xmlAttributeNames, ...xmlChildTagNames]);

    // 遍历所有可能的字段
    for (const fieldName of allFieldNames) {
      // 跳过已定义的嵌套解析器
      if (nestedParsers[fieldName]) continue;

      let value: any;

      // 1. 优先从属性读取（如果指定了 preferAttributes）
      if (preferAttributes.includes(fieldName)) {
        value = element.getAttribute(fieldName);
        // 如果属性不存在，回退到子元素
        if (value === null || value === undefined) {
          const childEl = Array.from(element.children).find(
            c => c.tagName.toLowerCase() === fieldName.toLowerCase()
          );
          if (childEl) {
            value = childEl.textContent || '';
          }
        }
      }
      // 2. 否则先尝试子元素
      else {
        const childEl = Array.from(element.children).find(
          c => c.tagName.toLowerCase() === fieldName.toLowerCase()
        );
        if (childEl) {
          value = childEl.textContent || '';
        } else {
          value = element.getAttribute(fieldName);
        }
      }

      // 如果没有值，跳过
      if (value === null || value === undefined || value === '') continue;

      // 根据字段类型转换值
      if (numberFields.includes(fieldName)) {
        const num = parseFloat(value);
        (instance as any)[fieldName] = isNaN(num) ? undefined : num;
      } else if (booleanFields.includes(fieldName)) {
        (instance as any)[fieldName] = value === '1' || value === 'true';
      } else if (arrayFields.includes(fieldName)) {
        (instance as any)[fieldName] = value.split(',').map((s: string) => s.trim()).filter((s: string) => s);
      } else {
        (instance as any)[fieldName] = value;
      }
    }

    // 处理嵌套对象
    for (const [fieldName, parserFn] of Object.entries(nestedParsers)) {
      const childEl = Array.from(element.children).find(
        c => c.tagName.toLowerCase() === fieldName.toLowerCase()
      );
      if (childEl) {
        (instance as any)[fieldName] = parserFn(childEl);
      }
    }

    return instance;
  }

  /**
   * 批量解析 XML 子元素
   * @param parent 父元素
   * @param tagName 子元素标签名
   * @param EntityClass 实体类
   * @param options 解析选项
   */
  static parseMany<T>(
    parent: Element,
    tagName: string,
    EntityClass: new () => T,
    options?: XmlParserOptions
  ): T[] {
    const children = Array.from(parent.children).filter(
      c => c.tagName.toLowerCase() === tagName.toLowerCase()
    );
    return children.map(child => this.parse(child, EntityClass, options));
  }

  /**
   * 查找单个子元素并解析
   */
  static parseChild<T>(
    parent: Element,
    tagName: string,
    EntityClass: new () => T,
    options?: XmlParserOptions
  ): T | undefined {
    const child = Array.from(parent.children).find(
      c => c.tagName.toLowerCase() === tagName.toLowerCase()
    );
    return child ? this.parse(child, EntityClass, options) : undefined;
  }
}
