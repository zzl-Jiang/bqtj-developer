// client/src/views/Editor/BodyEditor/hooks/useBodyState.ts
import { computed } from 'vue';
import { useModStore } from '../../../../store/useModStore';
import { useMessage } from 'naive-ui';

export function useBodyState() {
  const modStore = useModStore();
  const message = useMessage();

  // 绑定 store 中的 activeIndex
  const selectedIndex = computed({
    get: () => modStore.activeIndexes.body,
    set: (val) => modStore.activeIndexes.body = val
  });

  const selectedBody = computed(() => {
    if (selectedIndex.value === null) return null;
    return modStore.bodyList[selectedIndex.value] || null;
  });

  const menuOptions = computed(() => 
    modStore.bodyList.map((b, i) => ({
      label: b.cnName || b.name || `未命名单位_${i}`,
      key: i.toString()
    }))
  );

  const addBody = () => {
    modStore.addBody(); // 调用 store 中定义的 createDefault 逻辑
    message.success('新增单位成功');
  };

  const removeBody = (index: number) => {
    modStore.removeBody(index);
    message.info('单位已移除');
  };

  return { selectedIndex, selectedBody, menuOptions, addBody, removeBody };
}