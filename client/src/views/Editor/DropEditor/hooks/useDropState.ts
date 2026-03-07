// client/src/views/Editor/DropEditor/hooks/useDropState.ts
import { computed } from 'vue';
import { useModStore } from '../../../../store/useModStore';
import type { DropDefine } from '../../../../models/drop/DropDefine';

export function useDropState() {
    const modStore = useModStore();

    const selectedIndex = computed({
        get: () => modStore.activeIndexes.drop,
        set: (val) => (modStore.activeIndexes.drop = val),
    });

    const selectedDrop = computed(() => {
        if (selectedIndex.value === null) return null;
        return modStore.dropList[selectedIndex.value] || null;
    });

    const menuOptions = computed(() =>
        modStore.dropList.map((d: DropDefine, i: number) => ({
            label: d.cnName || d.name || `未命名掉落_${i}`,
            key: i,
        }))
    );

    const addDrop = () => {
        modStore.addDrop();
    };

    const removeDrop = (index: number) => {
        modStore.dropList.splice(index, 1);
        modStore.activeIndexes.drop = null;
    };

    return {
        selectedIndex,
        selectedDrop,
        menuOptions,
        addDrop,
        removeDrop,
    };
}
