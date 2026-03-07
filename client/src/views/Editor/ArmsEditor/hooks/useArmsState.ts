import { computed } from 'vue';
import { useModStore } from '../../../../store/useModStore';
import type { ArmsDefine } from '../../../../models/arms/ArmsDefine';

export function useArmsState() {
    const modStore = useModStore();

    const selectedIndex = computed({
        get: () => modStore.activeIndexes.arms,
        set: (val) => (modStore.activeIndexes.arms = val),
    });

    const selectedArms = computed(() => {
        if (selectedIndex.value === null) return null;
        return modStore.armsList[selectedIndex.value] || null;
    });

    const menuOptions = computed(() =>
        modStore.armsList.map((a: ArmsDefine, i: number) => ({
            label: a.cnName || a.name || `未命名武器_${i}`,
            key: i,
        }))
    );

    const addArms = () => {
        modStore.addArms();
    };

    const removeArms = (index: number) => {
        modStore.armsList.splice(index, 1);
        modStore.activeIndexes.arms = null;
    };

    return {
        selectedIndex,
        selectedArms,
        menuOptions,
        addArms,
        removeArms,
    };
}
