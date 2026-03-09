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
import { SkillDefine } from '../models/skill/SkillDefine';
import { SkillTargetDefine } from '../models/skill/SkillTargetDefine';
import { ArmsDefine } from '../models/arms/ArmsDefine';
import { BulletDefine } from '../models/bullet/BulletDefine';
import { PngDefine } from '../models/png/PngDefine';
import { DropDefine } from '../models/drop/DropDefine';
import { XmlEntityParser } from './XmlEntityParser';

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
    skills: SkillDefine[];
    arms: ArmsDefine[];
    bullets: BulletDefine[];
    pngs: PngDefine[];
    drops: DropDefine[];
  };
  // 统计信息
  stats: {
    levelCount: number;
    sayListCount: number;
    bodyCount: number;
    skillCount: number;
    armsCount: number;
    bulletCount: number;
    pngCount: number;
    dropCount: number;
    totalCount: number;
  };
  // 错误和警告
  errors: string[];
  warnings: string[];
}

// 整体导入服务
export class ModImportService {
  private parser: DOMParser | null = null;

  constructor() {
    if (typeof window !== 'undefined' && window.DOMParser) {
      this.parser = new window.DOMParser();
    }
  }

  /**
   * 预处理XML字符串，修复常见格式错误
   * 参考Python脚本的清理逻辑：
   * 1. 修复头部缺少空格
   * 2. 修复属性之间缺少空格（循环处理多个粘连）
   * 3. 清除所有注释
   * 4. 处理CDATA（保留内容，但将特殊字符转义）
   */
  private preprocessXml(xmlString: string): string {
    if (!xmlString) return '';

    let content = xmlString;

    // 修复头部: <?xmlversion -> <?xml version
    content = content.replace(/<\?xmlversion/gi, '<?xml version');

    // 修复属性之间的空格丢失 (xxx="xxx"yyy -> xxx="xxx" yyy)
    // 使用循环处理多个连续粘连的属性
    // 匹配: (key="value")(紧跟字母) -> key="value" 字母
    const attrPattern = /(\w+\s*=\s*"[^"]*")([a-zA-Z])/g;
    while (attrPattern.test(content)) {
      content = content.replace(attrPattern, '$1 $2');
      // 重置正则的lastIndex
      attrPattern.lastIndex = 0;
    }

    // 备用：修复引号后直接跟属性名的情况 (处理上面可能遗漏的)
    content = content.replace(/"([a-zA-Z][a-zA-Z0-9_]*=)/g, '" $1');

    // 移除所有注释 <!-- ... -->
    content = content.replace(/<!--[\s\S]*?-->/g, '');

    // 处理 CDATA <![CDATA[ ... ]]>
    // 保留内容，但将 < 和 > 转义为实体，避免被XML解析器误解
    content = content.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, (_, innerContent) => {
      // 转义CDATA内的 < 和 > 为实体引用
      return innerContent
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
    });

    return content;
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
        bodies: [],
        skills: [],
        arms: [],
        bullets: [],
        pngs: [],
        drops: []
      },
      stats: {
        levelCount: 0,
        sayListCount: 0,
        bodyCount: 0,
        skillCount: 0,
        armsCount: 0,
        bulletCount: 0,
        pngCount: 0,
        dropCount: 0,
        totalCount: 0
      },
      errors: [],
      warnings: []
    };

    try {
      // 检查 DOMParser 是否可用
      if (!this.parser) {
        result.errors.push('浏览器不支持 DOMParser，无法解析 XML');
        return result;
      }

      // 预处理XML，修复格式错误
      const processedXml = this.preprocessXml(xmlString);

      // 解析XML
      const doc = this.parser.parseFromString(processedXml, 'text/xml');
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
      const infoEl = this.getChildByTagName(root, 'info');
      if (infoEl) {
        result.meta.description = infoEl.textContent || undefined;
      }

      // 解析所有father节点
      const fathers = this.getChildrenByTagName(root, 'father');

      for (const father of fathers) {
        const name = father.getAttribute('name');

        // 调试信息
        const debugInfo = `father[name="${name}"]`;

        // 自动检测：任何father都可能包含各种数据
        // 支持任意name值：developer, normal, skill, arms, level, bullet, drop等
        // 使用兼容方式检测子元素（不使用 :scope >）
        const childTagNames = new Set(Array.from(father.children).map(c => c.tagName.toLowerCase()));
        const hasBodies = childTagNames.has('body');
        const hasLevels = father.querySelector('gather > level > unitG');
        const hasSayLists = father.querySelector('level > sayList');
        const hasSkills = childTagNames.has('skill');
        const hasArms = childTagNames.has('bullet'); // arms使用bullet标签
        const hasPngs = childTagNames.has('png');
        const hasDrops = childTagNames.has('drop');

        if (hasBodies) {
          result.warnings.push(`${debugInfo} 检测到单位数据，开始解析...`);
          this.parseBodiesFromFather(father, result);
        }
        if (hasLevels) {
          this.parseLevelsFromFather(father, result);
        }
        if (hasSayLists) {
          this.parseSayListsFromFather(father, result);
        }
        if (hasSkills) {
          result.warnings.push(`${debugInfo} 检测到技能数据，开始解析...`);
          this.parseSkillsFromFather(father, result);
        }
        if (hasArms) {
          result.warnings.push(`${debugInfo} 检测到武器/子弹数据，开始解析...`);
          this.parseArmsFromFather(father, result);
        }
        if (hasPngs) {
          this.parsePngsFromFather(father, result);
        }
        if (hasDrops) {
          this.parseDropsFromFather(father, result);
        }
      }

      // 更新统计
      result.stats.levelCount = result.data.levels.length;
      result.stats.sayListCount = result.data.sayLists.length;
      result.stats.bodyCount = result.data.bodies.length;
      result.stats.skillCount = result.data.skills.length;
      result.stats.armsCount = result.data.arms.length;
      result.stats.bulletCount = result.data.bullets.length;
      result.stats.pngCount = result.data.pngs.length;
      result.stats.dropCount = result.data.drops.length;
      result.stats.totalCount = result.stats.levelCount + result.stats.sayListCount + result.stats.bodyCount + result.stats.skillCount + result.stats.armsCount + result.stats.bulletCount + result.stats.pngCount + result.stats.dropCount;

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
    const gatherEl = this.getChildByTagName(father, 'gather');
    if (!gatherEl) return;
    const levelElements = this.getChildrenByTagName(gatherEl, 'level');

    for (const levelEl of levelElements) {
      // 跳过包含sayList的level（那是对话）
      if (this.getChildByTagName(levelEl, 'sayList')) continue;

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
    const levelElements = this.getChildrenByTagName(father, 'level');

    for (const levelEl of levelElements) {
      const levelName = levelEl.getAttribute('name') || '';
      const sayListElements = this.getChildrenByTagName(levelEl, 'sayList');

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
    const bodyElements = this.getChildrenByTagName(father, 'body');

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
    const sceneLabelEl = this.getChildByTagName(levelEl, 'sceneLabel');
    if (sceneLabelEl) {
      level.sceneLabel = sceneLabelEl.textContent || undefined;
    }

    // 解析info配置
    const infoEl = this.getChildByTagName(levelEl, 'info');
    if (infoEl) {
      level.info = this.parseLevelInfo(infoEl);
    }

    // 解析unitG
    const unitGEl = this.getChildByTagName(levelEl, 'unitG');
    if (unitGEl) {
      level.unitG = this.parseUnitGroup(unitGEl);
    }

    // 解析rectG
    const rectGEl = this.getChildByTagName(levelEl, 'rectG');
    if (rectGEl) {
      level.rectG = this.parseRectGroup(rectGEl);
    }

    // 解析eventG
    const eventGEl = this.getChildByTagName(levelEl, 'eventG');
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
    const allDefaultEl = this.getChildByTagName(unitGEl, 'allDefault');
    if (allDefaultEl) {
      group.allDefault = new OneUnitOrderDefine();
      group.allDefault.aiOrder = allDefaultEl.getAttribute('aiOrder') || undefined;
    }

    // 解析unitOrder
    const unitOrders = this.getChildrenByTagName(unitGEl, 'unitOrder');
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

    const numberTypeEl = this.getChildByTagName(orderEl, 'numberType');
    order.numberType = (numberTypeEl?.textContent as 'number' | 'pro') || 'number';

    const unitEls = this.getChildrenByTagName(orderEl, 'unit');
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

    const rectEls = this.getChildrenByTagName(rectGEl, 'rect');
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
        rect.x = parts[0] ?? 0;
        rect.y = parts[1] ?? 0;
        rect.width = parts[2] ?? 0;
        rect.height = parts[3] ?? 0;
      }
    }

    return rect;
  }

  /**
   * 解析事件组
   */
  private parseEventGroup(eventGEl: Element): LevelEventDefineGroup {
    const group = new LevelEventDefineGroup();

    const groupEls = this.getChildrenByTagName(eventGEl, 'group');
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

    const eventEls = this.getChildrenByTagName(groupEl, 'event');
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

    const conditionEl = this.getChildByTagName(eventEl, 'condition');
    if (conditionEl) {
      const condition = new LevelEventConditionDefine();
      condition.xmlText = conditionEl.textContent || '';
      condition.delay = this.parseNumber(conditionEl.getAttribute('delay'));
      condition.doNumber = this.parseNumber(conditionEl.getAttribute('doNumber'));
      condition.extraText = conditionEl.getAttribute('extraText') || undefined;
      condition.orderChooseType = conditionEl.getAttribute('orderChooseType') || undefined;
      event.condition = condition;
    }

    const orderEls = this.getChildrenByTagName(eventEl, 'order');
    event.orders = [];
    for (const orderEl of orderEls) {
      const order = new LevelEventOrderDefine();
      order.xmlText = orderEl.textContent || '';
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

    const sayEls = this.getChildrenByTagName(sayListEl, 'say');
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

    // 使用兼容方式查找 content 子元素
    const contentEl = Array.from(sayEl.children).find(c => c.tagName.toLowerCase() === 'content');
    const content = contentEl?.textContent || '';
    if (content) {
      say.contentArr = [content];
    }

    return say;
  }

  // Body 字段配置
  private static bodyNumberFields = [
    'lifeRatio', 'rosRatio', 'defenceRatio', 'headHurtMul', 'superDpsAdd', 'showLevel',
    'normalScaleX', 'lifeBarExtraHeight', 'handAddRa', 'dieJumpMul',
    'maxJumpNum', 'maxVx', 'maxVy', 'runStartVx', 'warningRange', 'outWarningTime',
    'shootLenMul', 'nextAttackTime', 'armsNumber', 'squatMaxVx', 'avtiveSkillCdOverT'
  ];

  private static bodyBooleanFields = [
    'doubleLifeBarB', 'rotateBySlopeB', 'flyUseSpiderB', 'attackMustCanShootB',
    'canBossB', 'extraDropArmsB', 'headPlayB', 'noCnIdB', 'lockLeftB'
  ];

  private static bodyArrayFields = [
    'imgArr', 'bossImgArr', 'lowerImgArr', 'skillArr', 'bossSkillArr', 'preBulletArr',
    'demSkillArr', 'demBossSkillArr', 'wilderSkillArr', 'uiSkillArr', 'otherUnitCnNameArr',
    'upperImgArr', 'randomArmsRange', 'studyCnNameArr', 'p1SkillArr', 'imgClass'
  ];

  /**
   * 解析单位 - 使用 XmlEntityParser 自动化属性映射
   */
  private parseBodyElement(bodyEl: Element): BodyDefine {
    // 基础解析
    const body = XmlEntityParser.parse(bodyEl, BodyDefine, {
      numberFields: ModImportService.bodyNumberFields,
      booleanFields: ModImportService.bodyBooleanFields,
      arrayFields: ModImportService.bodyArrayFields,
      preferAttributes: ['name', 'shell', 'map']
    });

    // 特殊处理：name 可能在属性或子标签中
    if (!body.name) {
      body.name = bodyEl.getAttribute('name') || undefined;
    }

    // 特殊处理：矩形字段
    const getText = (tag: string): string | undefined => {
      const el = Array.from(bodyEl.children).find(c => c.tagName.toLowerCase() === tag.toLowerCase());
      return el?.textContent || undefined;
    };

    body.hitRect = this.parseRectangle(getText('hitRect'));
    body.squatHitRect = this.parseRectangle(getText('squatHitRect'));

    // 特殊处理：hurtRectArr 可能有多个子元素
    const hurtRects = Array.from(bodyEl.children).filter(c => c.tagName.toLowerCase() === 'hurtrectarr');
    if (hurtRects.length > 0) {
      body.hurtRectArr = hurtRects
        .map(el => this.parseRectangle(el.textContent))
        .filter((r): r is { x: number; y: number; width: number; height: number } => r !== undefined);
    }

    return body;
  }

  /**
   * 从father节点解析技能数据
   * skill标签直接在father下，不在gather中
   */
  private parseSkillsFromFather(father: Element, result: ModImportResult): void {
    // 使用兼容方式获取直接子级的 skill 元素
    const skillElements = Array.from(father.children).filter(el => el.tagName.toLowerCase() === 'skill');

    // 调试：记录找到的技能数量
    result.warnings.push(`  找到 ${skillElements.length} 个直接子级 skill 元素`);

    for (const skillEl of skillElements) {
      try {
        const skill = this.parseSkillElement(skillEl);
        if (skill && skill.name) {
          result.data.skills.push(skill);
          result.warnings.push(`  成功解析技能: ${skill.name} (${skill.cnName})`);
        } else {
          result.warnings.push(`  跳过无效技能: name=${skill?.name}`);
        }
      } catch (e: any) {
        result.errors.push(`解析技能失败: ${e.message}`);
      }
    }
  }

  // Skill 字段配置
  private static skillNumberFields = [
    'conditionRange', 'mustLv', 'value', 'mul', 'secMul', 'cd', 'firstCd',
    'duration', 'intervalT', 'minTriggerT', 'firstTriggerT', 'delay', 'doGap',
    'range', 'minRange', 'continueNum', 'cdRandomRange', 'haveEffectBuletHitNum'
  ];

  private static skillBooleanFields = [
    'showInLifeBarB', 'ignoreSilenceB', 'ignoreNoSkillB', 'overlyingB', 'noInClonedB',
    'noBeClearB', 'everNoClearB', 'summonedUnitsB', 'changeHurtB', 'noSkillDodgeB',
    'ignoreImmunityB', 'noCopyB', 'noRandomListB', 'isDefenceB', 'isInvincibleB',
    'noReStateB', 'noCdMulB', 'groundDieB', 'wantDescripB', 'targetPointEffectB'
  ];

  private static skillArrayFields = [
    'otherConditionArr', 'applyArr', 'passiveSkillArr', 'linkArr', 'preEffectArr'
  ];

  /**
   * 解析单个技能元素 - 使用 XmlEntityParser 自动化属性映射
   */
  private parseSkillElement(skillEl: Element): SkillDefine {
    // 基础解析（effectProArr 是数字数组，需要特殊处理）
    const skill = XmlEntityParser.parse(skillEl, SkillDefine, {
      numberFields: ModImportService.skillNumberFields,
      booleanFields: ModImportService.skillBooleanFields,
      arrayFields: ModImportService.skillArrayFields,
      preferAttributes: ['name', 'cnName', 'father']
    });

    // 特殊处理：name/cnName 可能在属性或子标签中
    if (!skill.name) {
      skill.name = skillEl.getAttribute('name') || undefined;
    }
    if (!skill.cnName) {
      skill.cnName = skillEl.getAttribute('cnName') || undefined;
    }

    // 特殊处理：effectProArr 是数字数组
    const getText = (tag: string): string | undefined => {
      const el = Array.from(skillEl.children).find(c => c.tagName.toLowerCase() === tag.toLowerCase());
      return el?.textContent || undefined;
    };

    const effectProArrText = getText('effectProArr');
    if (effectProArrText) {
      skill.effectProArr = effectProArrText
        .split(',')
        .map(s => parseFloat(s.trim()))
        .filter(n => !isNaN(n));
    }

    // 特殊处理：effectType 字段（XmlEntityParser 使用小写字段名，无法匹配驼峰命名的 effectType）
    const effectTypeEl = Array.from(skillEl.children).find(c => c.tagName.toLowerCase() === 'effecttype');
    if (effectTypeEl) {
      skill.effectType = effectTypeEl.textContent?.trim() || undefined;
    }

    // 特殊处理：target 可能是简单字符串（如 <target>me</target>）或复杂对象
    const targetEl = Array.from(skillEl.children).find(c => c.tagName.toLowerCase() === 'target');
    if (targetEl) {
      // 检查 target 是否有子元素
      if (targetEl.children.length === 0) {
        // 简单字符串格式：<target>me</target> 或 <target>me,range,enemy</target>
        const targetText = targetEl.textContent?.trim();
        if (targetText) {
          // 解析逗号分隔的值并映射到 SkillTargetDefine 对象
          const parts = targetText.split(',').map(s => s.trim());
          const targetObj = new SkillTargetDefine();
          // 按位置映射：target, chooseType, camp, unitType, systemType
          if (parts[0]) targetObj.target = parts[0];
          if (parts[1]) targetObj.chooseType = parts[1];
          if (parts[2]) targetObj.camp = parts[2];
          if (parts[3]) targetObj.unitType = parts[3];
          if (parts[4]) targetObj.systemType = parts[4];
          skill.target = targetObj;
        }
      }
      // 如果有子元素，XmlEntityParser 已经处理了 target 对象
    }

    return skill;
  }

  /**
   * 从father节点解析武器数据 (bullet标签，有kind/color属性或武器特有子元素)
   * 武器特有属性：color, 或子元素如 capacity, reloadGap, dpsMul 等
   */
  private parseArmsFromFather(father: Element, result: ModImportResult): void {
    // 使用兼容方式获取直接子级的 bullet 元素
    const bulletElements = Array.from(father.children).filter(el => el.tagName.toLowerCase() === 'bullet');

    // 调试：记录找到的bullet数量
    result.warnings.push(`  找到 ${bulletElements.length} 个直接子级 bullet 元素`);

    for (const bulletEl of bulletElements) {
      try {
        // 判断是武器还是子弹：
        // 1. 有 kind 属性 -> 武器
        // 2. 有 color 属性 -> 武器
        // 3. 有武器特有子元素如 capacity, reloadGap, dpsMul -> 武器
        const kind = bulletEl.getAttribute('kind');
        const color = bulletEl.getAttribute('color');
        // 同样使用 children 而不是 :scope >
        const childTagNames = new Set(Array.from(bulletEl.children).map(c => c.tagName.toLowerCase()));
        const hasCapacity = childTagNames.has('capacity');
        const hasReloadGap = childTagNames.has('reloadgap');
        const hasDpsMul = childTagNames.has('dpsmul');

        const isArms = kind || color || hasCapacity || hasReloadGap || hasDpsMul;

        if (isArms) {
          const arms = this.parseArmsElement(bulletEl);
          if (arms && arms.name) {
            result.data.arms.push(arms);
            result.warnings.push(`  成功解析武器: ${arms.name} (${arms.cnName})`);
          } else {
            result.warnings.push(`  跳过无效武器: name=${arms?.name}`);
          }
        } else {
          // 纯子弹
          const bullet = this.parseBulletElement(bulletEl);
          if (bullet && bullet.name) {
            result.data.bullets.push(bullet);
            result.warnings.push(`  成功解析子弹: ${bullet.name}`);
          }
        }
      } catch (e: any) {
        result.errors.push(`解析武器/子弹失败: ${e.message}`);
      }
    }
  }

  // Bullet 字段配置（公共字段）
  private static bulletNumberFields = [
    'hurtRatio', 'hurtMul', 'transBackMul', 'beatBack', 'targetShakeValue',
    'bulletLife', 'lifeRandom', 'imgClearDelay', 'bulletWidth', 'bulletShakeWidth',
    'penetrationNum', 'penetrationGap', 'attackGap', 'attackDelay', 'noHitTime',
    'hideTime', 'hitGap', 'twoHitGap', 'bulletNum', 'shootGap', 'shootNum',
    'shootRecoil', 'screenShakeValue', 'aiShootRange', 'gatlinNum', 'gatlinRange',
    'bulletSpeed', 'gravity', 'bulletVra', 'bulletAngle', 'bulletAngleRange', 'extendGap',
    'shakeAngle'
  ];

  private static bulletBooleanFields = [
    'sameCampB', 'noHitB', 'noHurtEffectB', 'whippB', 'noMagneticB',
    'noBeClearB', 'implodingB', 'twoHitSameNameB', 'oneHitBodyB'
  ];

  private static bulletArrayFields = ['skillArr', 'godSkillArr', 'bulletSkillArr'];

  // Arms 字段配置（继承 Bullet）
  private static armsNumberFields = [
    'randomPro', 'index', 'rareDropLevel', 'dpsMul', 'uiDpsMul', 'extraMul',
    'capacity', 'armsWeight', 'reloadGap', 'noShakeTime', 'gunNum', 'armsArmMul',
    'handShootGap', 'upValue', 'focusAngleRange', 'leftHandImg', 'shootShakeAngle',
    'twoShootPro', 'evoMaxLv', 'evoMustFirstLv', 'chipNum', 'composeLv', 'composeMax'
  ];

  private static armsBooleanFields = ['chipB'];

  private static armsArrayFields = [
    // 注意：dropLevelArr 是数字数组，需要特殊处理，不在此处列出
    'dropBodyArr', 'allImgPartArr', 'allImgRange', 'textureImgRange',
    'bodyImgRange', 'barrelImgRange', 'gripImgRange', 'bulletImgRange',
    'stockImgRange', 'glassImgRange'
  ];

  /**
   * 解析单个武器元素 (有kind属性的bullet)
   */
  private parseArmsElement(bulletEl: Element): ArmsDefine {
    // 先解析 Bullet 公共字段
    const arms = XmlEntityParser.parse(bulletEl, ArmsDefine, {
      numberFields: [...ModImportService.bulletNumberFields, ...ModImportService.armsNumberFields],
      booleanFields: [...ModImportService.bulletBooleanFields, ...ModImportService.armsBooleanFields],
      arrayFields: [...ModImportService.bulletArrayFields, ...ModImportService.armsArrayFields],
      preferAttributes: ['name', 'kind', 'index', 'color', 'rareDropLevel', 'dropLevelArr', 'dropBodyArr',
        'evoMaxLv', 'evoMustFirstLv', 'chipB', 'chipNum', 'composeLv', 'composeMax']
    });

    // 特殊处理：name 可能在属性中
    if (!arms.name) {
      arms.name = bulletEl.getAttribute('name') || undefined;
    }

    // 特殊处理：dropLevelArr 需要从属性或子元素解析为数字数组
    const dropLevelArrAttr = bulletEl.getAttribute('dropLevelArr');
    if (dropLevelArrAttr) {
      arms.dropLevelArr = dropLevelArrAttr.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n));
    } else {
      // 尝试从子元素读取
      const dropLevelArrEl = Array.from(bulletEl.children).find(c => c.tagName.toLowerCase() === 'droplevelarr');
      if (dropLevelArrEl?.textContent) {
        arms.dropLevelArr = dropLevelArrEl.textContent.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n));
      }
    }

    // 特殊处理：dropBodyArr 需要从属性解析（优先）
    const dropBodyArrAttr = bulletEl.getAttribute('dropBodyArr');
    if (dropBodyArrAttr) {
      arms.dropBodyArr = dropBodyArrAttr.split(',').filter(s => s.trim());
    }

    return arms;
  }

  /**
   * 解析子弹元素 (无kind属性的bullet)
   */
  private parseBulletElement(bulletEl: Element): BulletDefine {
    // 使用 XmlEntityParser 自动解析
    const bullet = XmlEntityParser.parse(bulletEl, BulletDefine, {
      numberFields: ModImportService.bulletNumberFields,
      booleanFields: ModImportService.bulletBooleanFields,
      arrayFields: ModImportService.bulletArrayFields,
      preferAttributes: ['name']
    });

    // 特殊处理：name 可能在属性中
    if (!bullet.name) {
      bullet.name = bulletEl.getAttribute('name') || undefined;
    }

    return bullet;
  }

  /**
   * 从father节点解析图片数据
   */
  private parsePngsFromFather(father: Element, result: ModImportResult): void {
    const pngElements = this.getChildrenByTagName(father, 'png');

    for (const pngEl of pngElements) {
      try {
        const png = this.parsePngElement(pngEl);
        if (png && png.name) {
          result.data.pngs.push(png);
        }
      } catch (e: any) {
        result.errors.push(`解析图片失败: ${e.message}`);
      }
    }
  }

  /**
   * 解析单个图片元素
   */
  private parsePngElement(pngEl: Element): PngDefine {
    const png = new PngDefine();

    png.name = pngEl.getAttribute('name') || '';
    png.url = pngEl.getAttribute('url') || undefined;
    png.x = this.parseNumber(pngEl.getAttribute('x'));
    png.y = this.parseNumber(pngEl.getAttribute('y'));
    png.scaleX = this.parseNumber(pngEl.getAttribute('scaleX'));
    png.scaleY = this.parseNumber(pngEl.getAttribute('scaleY'));

    return png;
  }

  /**
   * 从father节点解析掉落数据
   */
  private parseDropsFromFather(father: Element, result: ModImportResult): void {
    const dropElements = this.getChildrenByTagName(father, 'drop');

    for (const dropEl of dropElements) {
      try {
        const drop = this.parseDropElement(dropEl);
        if (drop && drop.name) {
          result.data.drops.push(drop);
        }
      } catch (e: any) {
        result.errors.push(`解析掉落失败: ${e.message}`);
      }
    }
  }

  // Drop 字段配置
  private static dropNumberFields = ['imgRandom', 'lifetime', 'normalPro', 'superPro', 'bossPro'];
  private static dropBooleanFields = ['noFollowHeroB', 'keyB'];

  /**
   * 解析单个掉落元素 - 使用 XmlEntityParser 自动化属性映射
   */
  private parseDropElement(dropEl: Element): DropDefine {
    // 基础解析
    const drop = XmlEntityParser.parse(dropEl, DropDefine, {
      numberFields: ModImportService.dropNumberFields,
      booleanFields: ModImportService.dropBooleanFields,
      preferAttributes: ['name', 'type']
    });

    // 特殊处理：name 可能在属性中
    if (!drop.name) {
      drop.name = dropEl.getAttribute('name') || undefined;
    }

    // 特殊处理：itemsLvRange 是数字数组
    const getText = (tag: string): string | undefined => {
      const el = this.getChildByTagName(dropEl, tag);
      return el?.textContent || undefined;
    };

    const itemsLvRangeText = getText('itemsLvRange');
    if (itemsLvRangeText) {
      drop.itemsLvRange = itemsLvRangeText
        .split(',')
        .map(s => parseInt(s.trim()))
        .filter(n => !isNaN(n));
    }

    return drop;
  }

  // 辅助方法：安全地获取直接子元素（不使用 :scope >）
  private getChildByTagName(parent: Element, tagName: string): Element | null {
    return Array.from(parent.children).find(c => c.tagName.toLowerCase() === tagName.toLowerCase()) || null;
  }

  // 辅助方法：获取所有直接子元素（不使用 :scope >）
  private getChildrenByTagName(parent: Element, tagName: string): Element[] {
    return Array.from(parent.children).filter(c => c.tagName.toLowerCase() === tagName.toLowerCase());
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

  private parseRectangle(value: string | null | undefined): { x: number; y: number; width: number; height: number } | undefined {
    if (!value) return undefined;
    const parts = value.split(',').map(p => parseFloat(p.trim()));
    if (parts.length >= 4 && parts.every(n => !isNaN(n))) {
      const [x, y, width, height] = parts;
      return { x: x ?? 0, y: y ?? 0, width: width ?? 0, height: height ?? 0 };
    }
    return undefined;
  }
}

// 单例实例
export const modImportService = new ModImportService();
