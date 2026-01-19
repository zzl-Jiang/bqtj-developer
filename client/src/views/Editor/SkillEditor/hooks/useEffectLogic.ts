import { computed } from 'vue';
import { EFFECT_TYPE_OPTIONS, LOGIC_META } from '../config';

export function useEffectLogic(selectedSkill: any) {
  
  // 过滤当前 addType 下合法的效果函数
  const filteredEffectOptions = computed(() => {
    const skill = selectedSkill.value;
    if (!skill || !skill.addType) return EFFECT_TYPE_OPTIONS;
    
    // 检查是否开启了 doGap
    const hasDoGap = skill.doGap !== undefined;
    const type = skill.addType; // 'instant', 'state', 或 'instantAndState'

    return EFFECT_TYPE_OPTIONS.filter(opt => {
      // 如果开启了 doGap 且当前是状态类型
      // 此时需要显示 category 包含 'instant' 的选项
      if (type === 'state' && hasDoGap) {
        return opt.category.includes('instant');
      }

      // 如果用户选的是混合模式
      if (type === 'instantAndState') {
        // 同时搜寻 instant 和 state。显示那些【既有 instant 也有 state】的函数
        // 后期如果需要允许不存在的也可选择，把 && 换成 || 即可
        return opt.category.includes('instant') && opt.category.includes('state');
      }

      // 默认规则：匹配对应的 addType
      return opt.category.includes(type);
    });
  });

  // 为了防止用户移除 doGap 后 effectType 变得非法，
  // 在 handleAddTypeChange 或者单独监听 doGap 变化进行重置
  const checkEffectTypeValid = () => {
    const legalValues = filteredEffectOptions.value.map(o => o.value);
    if (!legalValues.includes(selectedSkill.value.effectType)) {
      selectedSkill.value.effectType = 'no';
    }
  };

  // 根据 vIf 规则，计算当前应该显示的配置项
  const visibleLogicMetas = computed(() => {
    if (!selectedSkill.value) return [];
    return LOGIC_META.filter(meta => {
      if (!meta.vIf) return true;
      return meta.vIf(selectedSkill.value);
    });
  });

  // 计算当前选中的效果说明
  const currentEffectDesc = computed(() => {
    const skill = selectedSkill.value;
    if (!skill) return null;

    const targetOption = EFFECT_TYPE_OPTIONS.find(opt => opt.value === skill.effectType);
    if (!targetOption) return "在逻辑配置中选择效果函数以查看说明";

    if (!targetOption.category.includes(skill.addType)) {
      return `[警告：当前函数不匹配添加类型，请检查或优先选择“效果类型”]\n\n${targetOption.desc}`;
    }

    // 如果是混合模式，但选了一个只支持单模式的函数（如果放宽了过滤条件）
    if (skill.addType === 'instantAndState' && targetOption.category.length === 1) {
      return `[提示：此函数仅支持 ${targetOption.category[0]} 部分]\n\n${targetOption.desc}`;
    }

    return targetOption.desc;
  });

  // 联动处理：当 addType 改变
  const handleAddTypeChange = (val: number) => {
    if (selectedSkill.value) {
      selectedSkill.value.addType = val;
      const legalValues = filteredEffectOptions.value.map(o => o.value);
      if (!legalValues.includes(selectedSkill.value.effectType)) {
        selectedSkill.value.effectType = 'no';
      }
    }
  };

  return {
    filteredEffectOptions,
    checkEffectTypeValid,
    visibleLogicMetas,
    currentEffectDesc,
    handleAddTypeChange
  };
}