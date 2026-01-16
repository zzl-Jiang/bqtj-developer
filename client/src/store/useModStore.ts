// client/src/store/useModStore.ts
import { defineStore } from 'pinia';
import { plainToInstance } from 'class-transformer';
import { PngDefine } from '../models/PngDefine';
import { SkillDefine } from '../models/skill/SkillDefine';

export const useModStore = defineStore('mod', {
  state: () => ({
    // 所有模块的数据都存放在这里，切换组件不会丢失
    pngList: [] as PngDefine[],
    skillList: [] as any[], // 后续扩展
  }),
  
  actions: {
    addPng() {
      // 这里的 {} 会自动应用 PngDefine 类中定义的默认值
      const newPng = plainToInstance(PngDefine, { 
        name: `img_${this.pngList.length + 1}`,
        url: "https://fs.img4399.com/bbs/" // 给个默认开头避免 undefined
      }, { exposeDefaultValues: true });
      this.pngList.push(newPng);
    },
    removePng(index: number) {
      this.pngList.splice(index, 1);
    },
    addSkill() {
      const newSkill = plainToInstance(SkillDefine, { 
        name: `skill_${this.skillList.length + 1}` 
      }, { exposeDefaultValues: true });
      this.skillList.push(newSkill);
    },
    removeSkill(index: number) {
      this.skillList.splice(index, 1);
    }
  },
  // 持久化：可以配合 localStorage，让用户刷新浏览器数据也不丢
});