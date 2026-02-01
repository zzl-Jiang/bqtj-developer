// client/src/views/Editor/SayEditor/hooks/useSayState.ts
import { computed } from 'vue';
import { useModStore } from '../../../../store/useModStore';

export function useSayState() {
  const modStore = useModStore();

  const selectedIndex = computed({
    get: () => modStore.activeIndexes.say,
    set: (val) => { modStore.activeIndexes.say = val; }
  });

  const selectedSayList = computed(() => 
    selectedIndex.value !== null ? modStore.sayList[selectedIndex.value] : null
  );

  const menuOptions = computed(() => 
    modStore.sayList.map((item, index) => ({
      label: item.name || `未命名对话_${index}`,
      key: index.toString()
    }))
  );

  return {
    selectedIndex,
    selectedSayList,
    menuOptions,
    addSay: () => modStore.addSay(),
    removeSay: (index: number) => modStore.removeSay(index)
  };
}