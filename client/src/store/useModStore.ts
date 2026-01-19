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
  }),
  
  actions: {
    // 通用的辅助方法，减少重复代码
    createItem<T>(cls: any, list: T[], defaultData: Partial<T>) {
      const item: any = plainToInstance(cls, defaultData, { exposeDefaultValues: true });
      list.push(item);
    },

    // PNG
    addPng() {
      this.createItem(PngDefine, this.pngList, { 
        name: `img_${this.pngList.length + 1}`,
        url: "https://fs.img4399.com/bbs/" 
      });
    },
    removePng(index: number) { this.pngList.splice(index, 1); },

    // Skill
    addSkill() {
      this.createItem(SkillDefine, this.skillList, { 
        name: `skill_${this.skillList.length + 1}` 
      });
    },
    removeSkill(index: number) { this.skillList.splice(index, 1); },

    // Level (关卡)
    addLevel() {
      this.createItem(LevelDefine, this.levelList, { name: `level_${this.levelList.length + 1}` });
    },
    removeLevel(index: number) { this.levelList.splice(index, 1); },

    // Body (单位)
    addBody() {
      this.createItem(BodyDefine, this.bodyList, { name: `body_${this.bodyList.length + 1}` });
    },
    removeBody(index: number) { this.bodyList.splice(index, 1); },

    // Bullet (子弹)
    addBullet() {
      this.createItem(BulletDefine, this.bulletList, { name: `bullet_${this.bulletList.length + 1}` });
    },
    removeBullet(index: number) { this.bulletList.splice(index, 1); },

    // Arms (武器)
    addArms() {
      this.createItem(ArmsDefine, this.armsList, { name: `arms_${this.armsList.length + 1}` });
    },
    removeArms(index: number) { this.armsList.splice(index, 1); },

    // Say (对话)
    addSay() {
      this.createItem(SayDefine, this.sayList, { name: `say_${this.sayList.length + 1}` });
    },
    removeSay(index: number) { this.sayList.splice(index, 1); },
  },
});