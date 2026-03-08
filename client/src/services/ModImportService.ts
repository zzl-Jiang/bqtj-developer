// client/src/services/ModImportService.ts
// 整体Mod导入服务 - 从完整的XML文件导入所有模块数据

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

// 导入结果
export interface ModImportResult {
  success: boolean;
  // 元数据
  meta: {
    id?: string;
    cnName?: string;
    author?: string;
    description?: string;
  };
  // 各模块数据
  data: {
    levels: LevelDefine[];
    sayLists: SayListDefine[];
    bodies: BodyDefine[];
  };
  // 统计信息
  stats: {
    levelCount: number;
    sayListCount: number;
    bodyCount: number;
    totalCount: number;
  };
  // 错误和警告
  errors: string[];
  warnings: string[];
}

// 整体导入服务
export class ModImportService {
  private parser: DOMParser;

  constructor() {
    this.parser = new DOMParser();
  }

  /**
   * 解析完整的Mod XML文件
   */
  parseModFile(xmlString: string): ModImportResult {
    const result: ModImportResult = {
      success: false,
      meta: {},
      data: {
        levels: [],
        sayLists: [],
        bodies: []
      },
      stats: {
        levelCount: 0,
        sayListCount: 0,
        bodyCount: 0,
        totalCount: 0
      },
      errors: [],
      warnings: []
    };

    try {
      // 解析XML
      const doc = this.parser.parseFromString(xmlString, 'text/xml');
      const parserError = doc.querySelector('parsererror');
      if (parserError) {
        result.errors.push('XML格式错误，无法解析');
        return result;
      }

      const root = doc.documentElement;
      if (root.tagName.toLowerCase() !== 'data') {
        result.errors.push('根节点必须是 <data>');
        return result;
      }

      // 解析元数据
      result.meta.id = root.getAttribute('id') || undefined;
      result.meta.cnName = root.getAttribute('cnName') || undefined;
      result.meta.author = root.getAttribute('author') || undefined;

      // 解析info节点（描述）
      const infoEl = root.querySelector(':scope > info');
      if (infoEl) {
        result.meta.description = infoEl.textContent || undefined;
      }

      // 解析所有father节点
      const fathers = root.querySelectorAll(':scope > father');

      for (const father of fathers) {
        const name = father.getAttribute('name');
        const cn = father.getAttribute('cn');

        if (name === 'normal' && cn === '关卡') {
          // 解析关卡数据
          this.parseLevelsFromFather(father, result);
        } else if (name === 'normal' && cn === '对话') {
          // 解析对话数据
          this.parseSayListsFromFather(father, result);
        } else if (name === 'developer') {
          // 解析单位数据
          this.parseBodiesFromFather(father, result);
        } else if (name === 'normal') {
          // 可能是其他类型，尝试自动检测
          if (father.querySelector('gather > level > unitG')) {
            this.parseLevelsFromFather(father, result);
          } else if (father.querySelector('level > sayList')) {
            this.parseSayListsFromFather(father, result);
          }
        }
      }

      // 更新统计
      result.stats.levelCount = result.data.levels.length;
      result.stats.sayListCount = result.data.sayLists.length;
      result.stats.bodyCount = result.data.bodies.length;
      result.stats.totalCount = result.stats.levelCount + result.stats.sayListCount + result.stats.bodyCount;

      // 判断成功与否
      result.success = result.errors.length === 0 && result.stats.totalCount > 0;

      if (result.stats.totalCount === 0) {
        result.warnings.push('未找到任何可导入的数据');
      }

    } catch (e: any) {
      result.errors.push(`解析失败: ${e.message}`);
    }

    return result;
  }

  /**
   * 从father节点解析关卡数据
   */
  private parseLevelsFromFather(father: Element, result: ModImportResult): void {
    const levelElements = father.querySelectorAll('gather > level');

    for (const levelEl of levelElements) {
      // 跳过包含sayList的level（那是对话）
      if (levelEl.querySelector(':scope > sayList')) continue;

      try {
        const level = this.parseLevelElement(levelEl);
        if (level && level.name) {
          result.data.levels.push(level);
        }
      } catch (e: any) {
        result.errors.push(`解析关卡失败: ${e.message}`);
      }
    }
  }

  /**
   * 从father节点解析对话数据
   */
  private parseSayListsFromFather(father: Element, result: ModImportResult): void {
    // 对话数据在 <level name="xxx"><sayList>...</sayList></level> 中
    const levelElements = father.querySelectorAll(':scope > level');

    for (const levelEl of levelElements) {
      const levelName = levelEl.getAttribute('name') || '';
      const sayListElements = levelEl.querySelectorAll(':scope > sayList');

      for (const sayListEl of sayListElements) {
        try {
          const sayList = this.parseSayListElement(sayListEl);
          if (sayList && sayList.name) {
            // 关联关卡名称
            sayList.levelName = levelName;
            result.data.sayLists.push(sayList);
          }
        } catch (e: any) {
          result.errors.push(`解析对话列表失败: ${e.message}`);
        }
      }
    }
  }

  /**
   * 从father节点解析单位数据
   */
  private parseBodiesFromFather(father: Element, result: ModImportResult): void {
    const bodyElements = father.querySelectorAll(':scope > body');

    for (const bodyEl of bodyElements) {
      try {
        const body = this.parseBodyElement(bodyEl);
        if (body && body.name) {
          result.data.bodies.push(body);
        }
      } catch (e: any) {
        result.errors.push(`解析单位失败: ${e.message}`);
      }
    }
  }

  /**
   * 解析单个关卡元素
   */
  private parseLevelElement(levelEl: Element): LevelDefine {
    const level = new LevelDefine();

    // 基础属性
    level.name = levelEl.getAttribute('name') || undefined;
    level.cnName = levelEl.getAttribute('cnName') || undefined;
    level.descrip = levelEl.getAttribute('descrip') || undefined;

    // 场景标签
    const sceneLabelEl = levelEl.querySelector(':scope > sceneLabel');
    if (sceneLabelEl) {
      level.sceneLabel = sceneLabelEl.textContent || undefined;
    }

    // 解析info配置
    const infoEl = levelEl.querySelector(':scope > info');
    if (infoEl) {
      level.info = this.parseLevelInfo(infoEl);
    }

    // 解析unitG
    const unitGEl = levelEl.querySelector(':scope > unitG');
    if (unitGEl) {
      level.unitG = this.parseUnitGroup(unitGEl);
    }

    // 解析rectG
    const rectGEl = levelEl.querySelector(':scope > rectG');
    if (rectGEl) {
      level.rectG = this.parseRectGroup(rectGEl);
    }

    // 解析eventG
    const eventGEl = levelEl.querySelector(':scope > eventG');
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
    const allDefaultEl = unitGEl.querySelector(':scope > allDefault');
    if (allDefaultEl) {
      group.allDefault = new OneUnitOrderDefine();
      group.allDefault.aiOrder = allDefaultEl.getAttribute('aiOrder') || undefined;
    }

    // 解析unitOrder
    const unitOrders = unitGEl.querySelectorAll(':scope > unitOrder');
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

    const numberTypeEl = orderEl.querySelector(':scope > numberType');
    order.numberType = (numberTypeEl?.textContent as 'number' | 'pro') || 'number';

    const unitEls = orderEl.querySelectorAll(':scope > unit');
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

    const rectEls = rectGEl.querySelectorAll(':scope > rect');
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

    const groupEls = eventGEl.querySelectorAll(':scope > group');
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

    const eventEls = groupEl.querySelectorAll(':scope > event');
    group.events = [];
    for (const eventEl of eventEls) {
      const event = this.parseEvent(eventEl, groupId);
      if (event) {
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

    event.id = groupId ? `${groupId}_event` : undefined;

    const conditionEl = eventEl.querySelector(':scope > condition');
    if (conditionEl) {
      const condition = new LevelEventConditionDefine();
      condition.type = conditionEl.textContent || '';
      condition.delay = this.parseNumber(conditionEl.getAttribute('delay'));
      condition.doNumber = this.parseNumber(conditionEl.getAttribute('doNumber'));
      event.condition = condition;
    }

    const orderEls = eventEl.querySelectorAll(':scope > order');
    event.orders = [];
    for (const orderEl of orderEls) {
      const order = new LevelEventOrderDefine();
      order.command = orderEl.textContent || '';
      event.orders.push(order);
    }

    return event;
  }

  /**
   * 解析对话列表
   */
  private parseSayListElement(sayListEl: Element): SayListDefine {
    const sayList = new SayListDefine();

    sayList.name = sayListEl.getAttribute('name') || '';

    const sayEls = sayListEl.querySelectorAll(':scope > say');
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

    const contentEl = sayEl.querySelector(':scope > content');
    const content = contentEl?.textContent || '';
    if (content) {
      say.contentArr = [content];
    }

    return say;
  }

  /**
   * 解析单位
   */
  private parseBodyElement(bodyEl: Element): BodyDefine {
    const body = new BodyDefine();

    const getText = (tag: string): string | undefined => {
      const el = bodyEl.querySelector(`:scope > ${tag}`);
      return el?.textContent || undefined;
    };

    body.name = getText('name');
    body.cnName = getText('cnName');
    body.raceType = getText('raceType') as any;
    body.movieLink = getText('movieLink');
    body.swfName = getText('swfName');
    body.headIconUrl = getText('headIconUrl');

    body.maxVx = this.parseNumber(getText('maxVx'));
    body.squatMaxVx = this.parseNumber(getText('squatMaxVx'));

    body.armsNumber = this.parseNumber(getText('armsNumber'));
    body.randomArmsRange = getText('randomArmsRange');
    body.oneAiLabel = getText('oneAiLabel');
    body.extraAIClassLabel = getText('extraAIClassLabel');

    const skillArrText = getText('skillArr');
    if (skillArrText) {
      body.skillArr = skillArrText.split(',').filter(s => s.trim());
    }

    body.hitRect = getText('hitRect');
    body.squatHitRect = getText('squatHitRect');
    const hurtRects = bodyEl.querySelectorAll(':scope > hurtRectArr');
    if (hurtRects.length > 0) {
      body.hurtRectArr = Array.from(hurtRects).map(el => el.textContent || '');
    }

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
export const modImportService = new ModImportService();
