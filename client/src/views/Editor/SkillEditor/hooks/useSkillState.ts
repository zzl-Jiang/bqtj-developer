// client/src/views/Editor/SkillEditor/hooks/useSkillState.ts
import { ref, computed } from 'vue';
import { useModStore } from '../../../../store/useModStore';
import { useMessage } from 'naive-ui';

// 保持单例，确保切换 Tab 后选中的技能不丢失
const selectedIndex = ref<number | null>(null);

export function useSkillState() {
  const modStore = useModStore();
  const message = useMessage();

  const selectedSkill = computed(() => {
    if (selectedIndex.value === null) return null;
    return modStore.skillList[selectedIndex.value] || null;
  });

  const menuOptions = computed(() => 
    modStore.skillList.map((s, i) => ({
      label: s.cnName || s.name || `未命名_${i}`,
      key: i.toString() // 必须是 string，因为 n-menu 的 key 是 string
    }))
  );

  const addSkill = () => {
    modStore.addSkill();
    selectedIndex.value = modStore.skillList.length - 1;
    message.success('新增技能成功');
  };

  const removeSkill = (index: number) => {
    modStore.removeSkill(index);
    // 处理删除后的索引复位逻辑
    if (modStore.skillList.length === 0) {
      selectedIndex.value = null;
    } else if (selectedIndex.value === index) {
      selectedIndex.value = 0;
    } else if (selectedIndex.value !== null && selectedIndex.value > index) {
      selectedIndex.value--;
    }
  };

  return {
    selectedIndex, // 直接返回 ref，方便 v-model 绑定
    selectedSkill,
    menuOptions,
    addSkill,
    removeSkill
  };
}