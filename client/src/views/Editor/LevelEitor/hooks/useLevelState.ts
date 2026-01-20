// client/src/views/Editor/LevelEditor/hooks/useLevelState.ts

import { ref, computed } from 'vue';
import { useModStore } from '../../../../store/useModStore';
import { useMessage } from 'naive-ui';

const selectedIndex = ref<number | null>(null);

export function useLevelState() {
  const modStore = useModStore();
  const message = useMessage();

  const selectedLevel = computed(() => {
    if (selectedIndex.value === null) return null;
    return modStore.levelList[selectedIndex.value] || null;
  });

  const menuOptions = computed(() => 
    modStore.levelList.map((l, i) => ({
      label: l.name || `未命名关卡_${i}`,
      key: i.toString()
    }))
  );

  const addLevel = () => {
    modStore.addLevel();
    selectedIndex.value = modStore.levelList.length - 1;
    message.success('新增关卡成功');
  };

  const removeLevel = (index: number) => {
    modStore.removeLevel(index);
    if (modStore.levelList.length === 0) selectedIndex.value = null;
    else selectedIndex.value = 0;
  };

  return { selectedIndex, selectedLevel, menuOptions, addLevel, removeLevel };
}