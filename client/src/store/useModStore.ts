// client/src/store/useModStore.ts
import { defineStore } from 'pinia';
import { plainToInstance } from 'class-transformer';
import { PngDefine } from '../models/PngDefine';
import { SkillDefine } from '../models/skill/SkillDefine';
import { LevelDefine } from '../models/level/LevelDefine'; 
import { BodyDefine } from '../models/body/BodyDefine';
import { BulletDefine } from '../models/bullet/BulletDefine';
import { ArmsDefine } from '../models/arms/ArmsDefine';
import { SayDefine } from '../models/say/SayDefine';
import { DropDefine } from '../models/drop/DropDefine';

export const useModStore = defineStore('mod', {
  state: () => ({
    // Mod 基础元数据
    info: {
      id: 'MyNewMod',
      cnName: '新的项目',
      author: 'Your Name',
      description: '在此输入介绍...'
    },

    // 各个模块的数据列表
    pngList: [] as PngDefine[],
    skillList: [] as SkillDefine[],
    levelList: [] as LevelDefine[],
    bodyList: [] as BodyDefine[],
    bulletList: [] as BulletDefine[],
    armsList: [] as ArmsDefine[],
    sayList: [] as SayDefine[],
    dropList: [] as DropDefine[],
    
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
    }
  }),
  
  actions: {
    // 通用的辅助方法，创建并自动选中最新的一项
    createItem<T>(cls: any, list: T[], defaultData: Partial<T>, moduleKey?: keyof any) {
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
      this.createItem(SkillDefine, this.skillList, { 
        name: `skill_${this.skillList.length + 1}` 
      }, 'skill');
    },
    removeSkill(index: number) {
      this.skillList.splice(index, 1);
      this.activeIndexes.skill = null;
    },

    // Level (关卡)
    addLevel() {
      this.createItem(LevelDefine, this.levelList, {
        name: `level_${this.levelList.length + 1}`
      }, 'level');
    },
    removeLevel(index: number) {
      this.levelList.splice(index, 1);
      this.activeIndexes.level = null;
    },

    // Body (单位)
    addBody() {
      this.createItem(BodyDefine, this.bodyList, {
        name: `body_${this.bodyList.length + 1}`
      }, 'body');
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
      this.createItem(SayDefine, this.sayList, {
        name: `say_${this.sayList.length + 1}`
      }, 'say');
    },
    removeSay(index: number) {
      this.sayList.splice(index, 1);
      this.activeIndexes.say = null;
    },

    // Drop (掉落)
    addDrop() {
      this.createItem(SayDefine, this.dropList, {
        name: `drop_${this.dropList.length + 1}`
      }, 'drop');
    },
    removeDrop(index: number) {
      this.dropList.splice(index, 1);
      this.activeIndexes.drop = null;
    },
  },
});