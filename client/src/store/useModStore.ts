// client/src/store/useModStore.ts
import { defineStore } from 'pinia';
import { plainToInstance } from 'class-transformer';
import { PngDefine } from '../models/PngDefine';
import { SkillDefine } from '../models/skill/SkillDefine';
import { LevelDefine } from '../models/level/LevelDefine'; 
import { BodyDefine } from '../models/body/BodyDefine';
import { BulletDefine } from '../models/bullet/BulletDefine';
import { ArmsDefine } from '../models/arms/ArmsDefine';
import { SayListDefine } from '../models/say/SayListDefine';
import { DropDefine } from '../models/drop/DropDefine';

// 定义模块键名的联合类型，增强类型检查
export type ModuleKey = 'png' | 'skill' | 'level' | 'body' | 'bullet' | 'arms' | 'say' | 'drop';

export const useModStore = defineStore('mod', {
  state: () => ({
    // Mod 基础元数据
    info: {
      id: 'MyNewMod',
      cnName: '新的项目',
      author: 'Your Name',
      description: '这是一个简单的项目示例'
    },

    // 各个模块的数据列表
    pngList: [] as PngDefine[],
    skillList: [] as SkillDefine[],
    levelList: [] as LevelDefine[],
    bodyList: [] as BodyDefine[],
    bulletList: [] as BulletDefine[],
    armsList: [] as ArmsDefine[],
    sayList: [] as SayListDefine[],
    dropList: [] as DropDefine[],
    
    // 当前激活的模块 Key
    activeModule: 'summary' as ModuleKey | 'summary',
    
    // 记录每个模块当前选中的索引，实现跨组件状态保持
    activeIndexes: {
      png: null as number | null,
      skill: null as number | null,
      level: null as number | null,
      body: null as number | null,
      bullet: null as number | null,
      arms: null as number | null,
      say: null as number | null,
      drop: null as number | null,
    },

    // 精准导航请求
    navigationRequest: {
      module: null as ModuleKey | null,
      tab: null as string | null,    // 模块内的页签，如 'events'
      subId: null as string | null,  // 具体的子项 ID
      timestamp: 0                   // 时间戳驱动 watch
    }
  }),
  
  actions: {
    /**
     * 核心跳转动作：精准定位到一个项目
     * @param module 顶级模块名
     * @param targetId 项目的 id 或 name
     * @param tab 模块内部的页签名
     * @param subId 更深层级的子项 ID
     */
    jumpTo(module: ModuleKey, targetId: string, tab?: string, subId?: string) {
      const listMap: Record<ModuleKey, any[]> = {
        png: this.pngList,
        skill: this.skillList,
        level: this.levelList,
        body: this.bodyList,
        bullet: this.bulletList,
        arms: this.armsList,
        say: this.sayList,
        drop: this.dropList,
      };

      const list = listMap[module];
      if (!list) return;

      // 切换大模块
      this.activeModule = module;

      let index = -1;

      // 查找目标索引
      if (targetId.startsWith('__INDEX_')) {
        index = parseInt(targetId.split('_')[1] || '');
      } else {
        // 正常通过 name 查找
        index = list.findIndex((item: any) => item.name === targetId);
      }

      if (index !== -1) {
        // 激活该项目
        this.activeIndexes[module] = index;

        // 记录深度导航信息，由具体页面的组件监听执行
        this.navigationRequest = {
          module,
          tab: tab || null,
          subId: subId || null,
          timestamp: Date.now()
        };
      }
    },

    // 通用的辅助方法，创建并自动选中最新的一项
    createItem<T>(cls: any, list: T[], defaultData: Partial<T>, moduleKey?: ModuleKey) {
      const item = plainToInstance(cls, defaultData, { exposeDefaultValues: true });
      list.push(item as T);
      
      // 如果传了模块 Key，新增后自动选中这一项
      if (moduleKey && this.activeIndexes.hasOwnProperty(moduleKey)) {
        (this.activeIndexes as any)[moduleKey] = list.length - 1;
      }
    },

    // PNG
    addPng() {
      this.createItem(PngDefine, this.pngList, { 
        name: `img_${this.pngList.length + 1}`,
        url: "https://fs.img4399.com/bbs/" 
      }, 'png');
    },
    removePng(index: number) {
      this.pngList.splice(index, 1);
      this.activeIndexes.png = null;
    },

    // Skill
    addSkill() {
      // 调用静态方法创建实例
      const newSkill = SkillDefine.createDefault(`skill_${this.skillList.length + 1}`);
      
      // 放入列表并选中
      this.skillList.push(newSkill);
      this.activeIndexes.level = this.skillList.length - 1;
    },
    removeSkill(index: number) {
      this.skillList.splice(index, 1);
      this.activeIndexes.skill = null;
    },

    // Level (关卡)
    addLevel() {
      // 调用静态方法创建实例
      const newLevel = LevelDefine.createDefault(`level_${this.levelList.length + 1}`);
      
      // 放入列表并选中
      this.levelList.push(newLevel);
      this.activeIndexes.level = this.levelList.length - 1;
    },
    removeLevel(index: number) {
      this.levelList.splice(index, 1);
      this.activeIndexes.level = null;
    },

    // Body (单位)
    addBody() {
      // 调用静态方法创建实例
      const newBody = BodyDefine.createDefault(`body_${this.bodyList.length + 1}`);
      
      // 放入列表并选中
      this.bodyList.push(newBody);
      this.activeIndexes.body = this.bodyList.length - 1;
    },
    removeBody(index: number) {
      this.bodyList.splice(index, 1);
      this.activeIndexes.body = null;
    },

    // Bullet (子弹)
    addBullet() {
      this.createItem(BulletDefine, this.bulletList, {
        name: `bullet_${this.bulletList.length + 1}`
      }, 'bullet');
    },
    removeBullet(index: number) {
      this.bulletList.splice(index, 1);
      this.activeIndexes.bullet = null;
    },

    // Arms (武器)
    addArms() {
      this.createItem(ArmsDefine, this.armsList, {
        name: `arms_${this.armsList.length + 1}`
      }, 'arms');
    },
    removeArms(index: number) {
      this.armsList.splice(index, 1);
      this.activeIndexes.arms = null;
    },

    // Say (对话)
    addSay() {
      const newItem = SayListDefine.createDefault(`s${this.sayList.length + 1}`);
      
      this.sayList.push(newItem);
      // 自动选中
      this.activeIndexes.say = this.sayList.length - 1;
    },
    removeSay(index: number) {
      this.sayList.splice(index, 1);
      this.activeIndexes.say = null;
    },

    // Drop (掉落)
    addDrop() {
      this.createItem(DropDefine, this.dropList, {
        name: `drop_${this.dropList.length + 1}`
      }, 'drop');
    },
    removeDrop(index: number) {
      this.dropList.splice(index, 1);
      this.activeIndexes.drop = null;
    },
  },
});