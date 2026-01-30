// client/src/hooks/useNavigation.ts

import { useModStore } from '../store/useModStore';
import type { ValidationError } from '../views/Editor/Validators/types';

export const useNavigation = () => {
  const modStore = useModStore();

  const navigateToError = (err: ValidationError) => {
    // Store 负责切大模块、选具体关卡、广播深层跳转请求
    modStore.jumpTo(err.module, err.targetId, err.tab, err.subId);
  };

  return { navigateToError };
};