// client/src/views/Editor/Validators/index.ts
import { computed } from 'vue';
import { useModStore } from '../../../store/useModStore';
import { validateLevel } from './levelValidator';
import type { ValidationError } from './types';
import type { LevelDefine } from '../../../models/level/LevelDefine';

export const useValidator = () => {
  const modStore = useModStore();

  const allErrors = computed(() => {
    const results: ValidationError[] = [];

    /**
     * 辅助函数：获取项的唯一跳转 ID
     * 如果有名字就用名字，没名字就用 __INDEX_ 配合索引
     */
    const getJumpId = (name: string | undefined, index: number) => {
      if (!name || name.trim() === '') return `__INDEX_${index}`;
      return name;
    };

    // 校验所有关卡 (Level)
    modStore.levelList.forEach((level: LevelDefine, index: number) => {
      const levelErrors = validateLevel(level, index);
      results.push(...levelErrors);
    });

    // 校验所有图片 (PNG)
    modStore.pngList.forEach((png, index: number) => {
       const jumpId = getJumpId(png.name, index);
       
       if (!png.url || png.url.trim() === '') {
         results.push({ 
           module: 'png', 
           targetId: jumpId, 
           type: 'error', 
           message: `图片资源 [${png.name || '未命名'}] 缺少有效的 URL` 
         });
       }
       
       if (!png.name || png.name.trim() === '') {
         results.push({
           module: 'png',
           targetId: jumpId,
           type: 'error',
           message: `图片资源 [索引 ${index}] 缺少名称，这会导致无法在其他模块引用。`
         });
       }
    });

    // 校验其他模块（按需扩展）

    return results;
  });

  return {
    allErrors,
    errorCount: computed(() => allErrors.value.filter(e => e.type === 'error').length),
    warningCount: computed(() => allErrors.value.filter(e => e.type === 'warning').length)
  };
};