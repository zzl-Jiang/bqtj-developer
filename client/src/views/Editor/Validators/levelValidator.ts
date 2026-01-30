import type { ValidationError } from './types';
import { LevelDefine } from '../../../models/level/LevelDefine';

export const validateLevel = (level: LevelDefine, index: number): ValidationError[] => {
  const errors: ValidationError[] = [];

  const targetId = (!level.name || level.name.trim() === '') 
    ? `__INDEX_${index}` 
    : level.name;

  // 名称为空校验
  if (!level.name || level.name.trim() === '') {
    errors.push({
      module: 'level',
      targetId: targetId,
      tab: 'basic',
      subId: 'name',
      type: 'error',
      message: `关卡 [索引 ${index}] 缺少名称（ID）。名称是关卡的唯一身份标识，必须填写。`
    });
  }
  if (!level.sceneLabel || level.sceneLabel.trim() === '') {
    errors.push({
      module: 'level',
      targetId: targetId,
      tab: 'basic',
      subId: 'sceneLabel',
      type: 'error',
      message: `关卡${targetId}缺少场景标签。场景标签是游戏加载对应资源的判断标识，必须填写。`
    })
  }

  if (level.unitG.unitOrders.length === 0) {
    errors.push({
      module: 'level',
      targetId: targetId,
      tab: 'units',
      type: 'warning',
      message: `关卡${targetId}缺少发兵集，将不生成任何单位。请注意检查。`
    })
  }

  if (level.eventG.groups.length === 0) {
    errors.push({
      module: 'level',
      targetId: targetId,
      tab: 'events',
      type: 'warning',
      message: `关卡${targetId}缺少事件集，将不生效任意事件。请注意检查。`
    })
  }


  return errors;
};