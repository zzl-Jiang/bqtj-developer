// src/views/Editor/SkillEditor/hooks/useSkillState.ts
import { ref, computed } from 'vue';
import { useModStore } from '../../../../store/useModStore';
import { useMessage } from 'naive-ui';

// 将状态定义在 Hook 外部，使其在所有引入该 Hook 的组件间共享（单例模式）
const selectedIndex = ref<number | null>(null);

export function useSkillState() {
  const modStore = useModStore();
  const message = useMessage();

  // 计算当前选中的技能对象
  const selectedSkill = computed(() => 
    selectedIndex.value !== null ? modStore.skillList[selectedIndex.value] : null
  );

  // 左侧菜单选项
  const menuOptions = computed(() => 
    modStore.skillList.map((s, i) => ({
      label: s.cnName || s.name || `未命名_${i}`,
      key: i.toString()
    }))
  );

  // 核心交互方法
  const addSkill = () => {
    modStore.addSkill();
    selectedIndex.value = modStore.skillList.length - 1;
    message.success('新增技能成功');
  };

  const removeSkill = (index: number) => {
    modStore.removeSkill(index);
    if (selectedIndex.value === index) {
      selectedIndex.value = modStore.skillList.length > 0 ? 0 : null;
    } else if (selectedIndex.value !== null && selectedIndex.value > index) {
      selectedIndex.value--;
    }
  };

  const selectSkill = (key: string) => {
    selectedIndex.value = parseInt(key);
  };

  return {
    selectedIndex,
    selectedSkill,
    menuOptions,
    addSkill,
    removeSkill,
    selectSkill
  };
}