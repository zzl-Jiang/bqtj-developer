// client/src/services/XmlImportService.ts
// XML导入服务 - 解析外部XML文件并转换为编辑器模型

import { LevelDefine } from '../models/level/LevelDefine';
import { LevelInfoDefine } from '../models/level/info/LevelInfoDefine';
import { UnitOrderDefineGroup } from '../models/level/unit/UnitOrderDefineGroup';
import { UnitOrderDefine } from '../models/level/unit/UnitOrderDefine';
import { OneUnitOrderDefine } from '../models/level/unit/OneUnitOrderDefine';
import { MapRectGroup } from '../models/level/rect/MapRectGroup';
import { MapRect } from '../models/level/rect/MapRect';
import { LevelEventDefineGroup, LevelEventGroup } from '../models/level/event/LevelEventDefineGroup';
import { LevelEventDefine } from '../models/level/event/LevelEventDefine';
import { LevelEventOrderDefine } from '../models/level/event/LevelEventOrderDefine';
import { LevelEventConditionDefine } from '../models/level/event/LevelEventConditionDefine';
import { SayListDefine } from '../models/say/SayListDefine';
import { SayDefine } from '../models/say/SayDefine';
import { BodyDefine } from '../models/body/BodyDefine';
import type { ModuleKey } from '../store/useModStore';

// 导入结果类型
export interface ImportResult<T> {
  success: boolean;
  data: T[];
  errors: string[];
  warnings: string[];
}

// 可导入的文件类型
export type ImportableType = 'level' | 'say' | 'body' | 'auto';

// XML解析器
export class XmlImportService {
  private parser: DOMParser;

  constructor() {
    this.parser = new DOMParser();
  }

  /**
   * 解析XML字符串为DOM文档
   */
  parseXml(xmlString: string): Document | null {
    try {
      const doc = this.parser.parseFromString(xmlString, 'text/xml');
      const parserError = doc.querySelector('parsererror');
      if (parserError) {
        return null;
      }
      return doc;
    } catch (e) {
      return null;
    }
  }

  /**
   * 自动检测XML文件类型
   */
  detectType(doc: Document): ImportableType {
    const root = doc.documentElement;
    const tagName = root.tagName.toLowerCase();

    // 标准示例文件格式
    if (tagName === 'data') {
      // 检查包含的内容类型
      const fathers = root.querySelectorAll('father');
      for (const father of fathers) {
        const name = father.getAttribute('name');
        if (name === 'normal') {
          // 检查子内容
          if (father.querySelector('gather level')) return 'level';
          if (father.querySelector('level sayList')) return 'say';
        }
        if (name === 'developer' && father.querySelector('body')) {
          return 'body';
        }
      }
    }

    // 直接关卡格式
    if (root.querySelector('level') || tagName === 'level') {
      return 'level';
    }

    // 直接对话格式
    if (root.querySelector('sayList') || tagName === 'saylist') {
      return 'say';
    }

    // 直接单位格式
    if (root.querySelector('body') || tagName === 'body') {
      return 'body';
    }

    return 'auto';
  }

  /**
   * 导入关卡数据
   */
  importLevels(doc: Document): ImportResult<LevelDefine> {
    const levels: LevelDefine[] = [];
    const errors: string[] = [];
    const warnings: string[] = [];

    try {
      const root = doc.documentElement;

      // 处理标准格式 (<data><father><gather><level>...)
      const levelElements = root.querySelectorAll('level');

      for (const levelEl of levelElements) {
        // 跳过对话关卡（包含sayList的）
        if (levelEl.querySelector('sayList')) continue;

        try {
          const level = this.parseLevelElement(levelEl);
          if (level) {
            levels.push(level);
          }
        } catch (e: any) {
          errors.push(`解析关卡失败: ${e.message}`);
        }
      }

      if (levels.length === 0) {
        warnings.push('未找到有效的关卡数据');
      }
    } catch (e: any) {
      errors.push(`解析XML失败: ${e.message}`);
    }

    return {
      success: errors.length === 0,
      data: levels,
      errors,
      warnings
    };
  }

  /**
   * 解析单个关卡元素
   */
  private parseLevelElement(levelEl: Element): LevelDefine | null {
    const level = new LevelDefine();

    // 基础属性
    level.name = levelEl.getAttribute('name') || undefined;
    level.cnName = levelEl.getAttribute('cnName') || undefined;
    level.descrip = levelEl.getAttribute('descrip') || undefined;

    if (!level.name) {
      return null;
    }

    // 场景标签
    const sceneLabelEl = levelEl.querySelector('sceneLabel');
    if (sceneLabelEl) {
      level.sceneLabel = sceneLabelEl.textContent || undefined;
    }

    // 解析info配置
    const infoEl = levelEl.querySelector('info');
    if (infoEl) {
      level.info = this.parseLevelInfo(infoEl);
    }

    // 解析unitG
    const unitGEl = levelEl.querySelector('unitG');
    if (unitGEl) {
      level.unitG = this.parseUnitGroup(unitGEl);
    }

    // 解析rectG
    const rectGEl = levelEl.querySelector('rectG');
    if (rectGEl) {
      level.rectG = this.parseRectGroup(rectGEl);
    }

    // 解析eventG
    const eventGEl = levelEl.querySelector('eventG');
    if (eventGEl) {
      level.eventG = this.parseEventGroup(eventGEl);
    }

    return level;
  }

  /**
   * 解析关卡信息
   */
  private parseLevelInfo(infoEl: Element): LevelInfoDefine {
    const info = new LevelInfoDefine();

    // 从属性读取
    info.enemyLv = this.parseNumber(infoEl.getAttribute('enemyLv'));
    info.allMoreB = this.parseBoolean(infoEl.getAttribute('allMoreB'));
    info.noMoreB = this.parseBoolean(infoEl.getAttribute('noMoreB'));
    info.noVehicleB = this.parseBoolean(infoEl.getAttribute('noVehicleB'));
    info.noTreasureB = this.parseBoolean(infoEl.getAttribute('noTreasureB'));
    info.noPropsB = this.parseBoolean(infoEl.getAttribute('noPropsB'));
    info.noDeviceB = this.parseBoolean(infoEl.getAttribute('noDeviceB'));
    info.noAIB = this.parseBoolean(infoEl.getAttribute('noAIB'));
    info.mustSingleB = this.parseBoolean(infoEl.getAttribute('mustSingleB'));

    return info;
  }

  /**
   * 解析单位组
   */
  private parseUnitGroup(unitGEl: Element): UnitOrderDefineGroup {
    const group = new UnitOrderDefineGroup();

    // 解析allDefault
    const allDefaultEl = unitGEl.querySelector('allDefault');
    if (allDefaultEl) {
      group.allDefault = new OneUnitOrderDefine();
      group.allDefault.aiOrder = allDefaultEl.getAttribute('aiOrder') || undefined;
    }

    // 解析unitOrder
    const unitOrders = unitGEl.querySelectorAll('unitOrder');
    group.unitOrders = [];
    for (const orderEl of unitOrders) {
      const order = this.parseUnitOrder(orderEl);
      if (order) {
        group.unitOrders.push(order);
      }
    }

    return group;
  }

  /**
   * 解析单个发兵指令
   */
  private parseUnitOrder(orderEl: Element): UnitOrderDefine | null {
    const order = new UnitOrderDefine();

    order.id = orderEl.getAttribute('id') || '';
    order.camp = (orderEl.getAttribute('camp') as 'enemy' | 'we') || 'enemy';

    if (!order.id) return null;

    // 发兵类型
    const numberTypeEl = orderEl.querySelector('numberType');
    order.numberType = (numberTypeEl?.textContent as 'number' | 'pro') || 'number';

    // 解析单位
    const unitEls = orderEl.querySelectorAll('unit');
    order.arr = [];
    for (const unitEl of unitEls) {
      const unit = this.parseOneUnit(unitEl);
      if (unit) {
        order.arr.push(unit);
      }
    }

    return order;
  }

  /**
   * 解析单个单位
   */
  private parseOneUnit(unitEl: Element): OneUnitOrderDefine | null {
    const unit = new OneUnitOrderDefine();

    unit.cnName = unitEl.getAttribute('cnName') || '';
    unit.num = this.parseNumber(unitEl.getAttribute('num')) || 1;
    unit.id = unitEl.getAttribute('id') || undefined;
    unit.unitType = (unitEl.getAttribute('unitType') as 'normal' | 'super' | 'boss') || 'normal';
    unit.lifeMul = this.parseNumber(unitEl.getAttribute('lifeMul'));
    unit.dpsMul = this.parseNumber(unitEl.getAttribute('dpsMul'));

    // 处理skillArr可能是数组或字符串的情况
    const skillArr = unitEl.getAttribute('skillArr');
    if (skillArr) {
      unit.skillArr = skillArr.split(',').filter(s => s.trim());
    }

    unit.aiOrder = unitEl.getAttribute('aiOrder') || undefined;

    if (!unit.cnName) return null;

    return unit;
  }

  /**
   * 解析区域组
   */
  private parseRectGroup(rectGEl: Element): MapRectGroup {
    const group = new MapRectGroup();

    const rectEls = rectGEl.querySelectorAll('rect');
    group.rects = [];
    for (const rectEl of rectEls) {
      const rect = this.parseRect(rectEl);
      if (rect) {
        group.rects.push(rect);
      }
    }

    return group;
  }

  /**
   * 解析单个区域
   */
  private parseRect(rectEl: Element): MapRect | null {
    const rect = new MapRect();

    rect.id = rectEl.getAttribute('id') || undefined;
    rect.label = rectEl.getAttribute('label') || undefined;

    // 解析坐标值 x,y,width,height
    const content = rectEl.textContent?.trim();
    if (content) {
      const parts = content.split(',').map(p => parseFloat(p.trim()));
      if (parts.length >= 4) {
        rect.x = parts[0];
        rect.y = parts[1];
        rect.width = parts[2];
        rect.height = parts[3];
      }
    }

    return rect;
  }

  /**
   * 解析事件组
   */
  private parseEventGroup(eventGEl: Element): LevelEventDefineGroup {
    const group = new LevelEventDefineGroup();

    const groupEls = eventGEl.querySelectorAll('group');
    group.groups = [];
    for (const groupEl of groupEls) {
      const eventGroup = this.parseEventGroupItem(groupEl);
      if (eventGroup) {
        group.groups.push(eventGroup);
      }
    }

    return group;
  }

  /**
   * 解析单个事件组
   */
  private parseEventGroupItem(groupEl: Element): LevelEventGroup | null {
    const group = new LevelEventGroup();

    const groupId = groupEl.getAttribute('id') || '';
    const groupCnName = groupEl.getAttribute('cnName') || undefined;

    // 解析事件
    const eventEls = groupEl.querySelectorAll('event');
    group.events = [];
    for (const eventEl of eventEls) {
      const event = this.parseEvent(eventEl, groupId);
      if (event) {
        if (groupCnName) {
          (event as any).groupCnName = groupCnName;
        }
        group.events.push(event);
      }
    }

    return group;
  }

  /**
   * 解析单个事件
   */
  private parseEvent(eventEl: Element, groupId: string = ''): LevelEventDefine | null {
    const event = new LevelEventDefine();

    // 设置事件ID（组合groupId和索引）
    event.id = groupId ? `${groupId}_event` : undefined;

    // 解析condition
    const conditionEl = eventEl.querySelector('condition');
    if (conditionEl) {
      const condition = new LevelEventConditionDefine();
      condition.type = conditionEl.textContent || '';
      condition.delay = this.parseNumber(conditionEl.getAttribute('delay'));
      condition.doNumber = this.parseNumber(conditionEl.getAttribute('doNumber'));
      event.condition = condition;
    }

    // 解析orders
    const orderEls = eventEl.querySelectorAll('order');
    event.orders = [];
    for (const orderEl of orderEls) {
      const order = new LevelEventOrderDefine();
      order.command = orderEl.textContent || '';
      event.orders.push(order);
    }

    return event;
  }

  /**
   * 导入对话数据
   */
  importSayLists(doc: Document): ImportResult<SayListDefine> {
    const sayLists: SayListDefine[] = [];
    const errors: string[] = [];
    const warnings: string[] = [];

    try {
      const root = doc.documentElement;

      // 处理标准格式
      const sayListEls = root.querySelectorAll('sayList');

      for (const sayListEl of sayListEls) {
        try {
          const sayList = this.parseSayListElement(sayListEl);
          if (sayList) {
            sayLists.push(sayList);
          }
        } catch (e: any) {
          errors.push(`解析对话列表失败: ${e.message}`);
        }
      }

      if (sayLists.length === 0) {
        warnings.push('未找到有效的对话数据');
      }
    } catch (e: any) {
      errors.push(`解析XML失败: ${e.message}`);
    }

    return {
      success: errors.length === 0,
      data: sayLists,
      errors,
      warnings
    };
  }

  /**
   * 解析单个对话列表
   */
  private parseSayListElement(sayListEl: Element): SayListDefine | null {
    const sayList = new SayListDefine();

    sayList.name = sayListEl.getAttribute('name') || '';
    if (!sayList.name) return null;

    // 解析对话项
    const sayEls = sayListEl.querySelectorAll('say');
    sayList.arr = [];
    for (const sayEl of sayEls) {
      const say = this.parseSayElement(sayEl);
      if (say) {
        sayList.arr.push(say);
      }
    }

    return sayList;
  }

  /**
   * 解析单个对话
   */
  private parseSayElement(sayEl: Element): SayDefine | null {
    const say = new SayDefine();

    say.target = sayEl.getAttribute('target') || '';

    const contentEl = sayEl.querySelector('content');
    const content = contentEl?.textContent || '';
    if (content) {
      say.contentArr = [content];
    }

    return say;
  }

  /**
   * 导入单位数据
   */
  importBodies(doc: Document): ImportResult<BodyDefine> {
    const bodies: BodyDefine[] = [];
    const errors: string[] = [];
    const warnings: string[] = [];

    try {
      const root = doc.documentElement;

      // 处理标准格式
      const bodyEls = root.querySelectorAll('body');

      for (const bodyEl of bodyEls) {
        try {
          const body = this.parseBodyElement(bodyEl);
          if (body) {
            bodies.push(body);
          }
        } catch (e: any) {
          errors.push(`解析单位失败: ${e.message}`);
        }
      }

      if (bodies.length === 0) {
        warnings.push('未找到有效的单位数据');
      }
    } catch (e: any) {
      errors.push(`解析XML失败: ${e.message}`);
    }

    return {
      success: errors.length === 0,
      data: bodies,
      errors,
      warnings
    };
  }

  /**
   * 解析单个单位
   */
  private parseBodyElement(bodyEl: Element): BodyDefine | null {
    const body = new BodyDefine();

    // 基础属性
    const getText = (tag: string): string | undefined => {
      const el = bodyEl.querySelector(tag);
      return el?.textContent || undefined;
    };

    body.name = getText('name');
    body.cnName = getText('cnName');
    body.raceType = getText('raceType') as any;
    body.movieLink = getText('movieLink');
    body.swfName = getText('swfName');
    body.headIconUrl = getText('headIconUrl');

    // 运动属性
    body.maxVx = this.parseNumber(getText('maxVx'));
    body.squatMaxVx = this.parseNumber(getText('squatMaxVx'));

    // AI属性
    body.armsNumber = this.parseNumber(getText('armsNumber'));
    body.randomArmsRange = getText('randomArmsRange');
    body.oneAiLabel = getText('oneAiLabel');
    body.extraAIClassLabel = getText('extraAIClassLabel');

    // 处理skillArr
    const skillArrText = getText('skillArr');
    if (skillArrText) {
      body.skillArr = skillArrText.split(',').filter(s => s.trim());
    }

    // 碰撞体积
    body.hitRect = getText('hitRect');
    body.squatHitRect = getText('squatHitRect');
    const hurtRects = bodyEl.querySelectorAll('hurtRectArr');
    if (hurtRects.length > 0) {
      body.hurtRectArr = Array.from(hurtRects).map(el => el.textContent || '');
    }

    if (!body.name) return null;

    return body;
  }

  // 辅助方法
  private parseNumber(value: string | null | undefined): number | undefined {
    if (!value) return undefined;
    const num = parseFloat(value);
    return isNaN(num) ? undefined : num;
  }

  private parseBoolean(value: string | null | undefined): boolean | undefined {
    if (!value) return undefined;
    return value === '1' || value === 'true';
  }
}

// 单例实例
export const xmlImportService = new XmlImportService();
