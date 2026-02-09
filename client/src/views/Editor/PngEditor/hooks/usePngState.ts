// client/src/views/Editor/PngEditor/hooks/usePngState.ts

import { ref, computed } from 'vue';
import { useModStore } from '../../../../store/useModStore';

export function usePngState() {
  const modStore = useModStore();
  const selectedIndex = ref<number | null>(null);

  // 初始化选择
  if (modStore.pngList.length > 0 && selectedIndex.value === null) {
    selectedIndex.value = 0;
  }

  const selectedPng = computed(() => {
    if (selectedIndex.value === null) return null;
    return modStore.pngList[selectedIndex.value];
  });

  const menuOptions = computed(() => {
    return modStore.pngList.map((png, index) => ({
      label: png.name || `未命名_${index}`,
      key: index.toString()
    }));
  });

  const addPng = () => {
    modStore.addPng();
    selectedIndex.value = modStore.pngList.length - 1;
  };

  const removePng = (index: number) => {
    modStore.removePng(index);
    if (selectedIndex.value === index) {
      selectedIndex.value = null;
    } else if (selectedIndex.value !== null && selectedIndex.value > index) {
      selectedIndex.value--;
    }
  };

  return {
    selectedIndex,
    selectedPng,
    menuOptions,
    addPng,
    removePng
  };
}
