import { computed } from 'vue';
import { useModStore } from '../../../../store/useModStore';
import type { BulletDefine } from '../../../../models/bullet/BulletDefine';

export function useBulletState() {
    const modStore = useModStore();

    const selectedIndex = computed({
        get: () => modStore.activeIndexes.bullet,
        set: (val) => (modStore.activeIndexes.bullet = val),
    });

    const selectedBullet = computed(() => {
        if (selectedIndex.value === null) return null;
        return modStore.bulletList[selectedIndex.value] || null;
    });

    const menuOptions = computed(() =>
        modStore.bulletList.map((b: BulletDefine, i: number) => ({
            label: b.cnName || b.name || `未命名子弹_${i}`,
            key: i,
        }))
    );

    const addBullet = () => {
        modStore.addBullet();
    };

    const removeBullet = (index: number) => {
        modStore.removeBullet(index);
    };

    return {
        selectedIndex,
        selectedBullet,
        menuOptions,
        addBullet,
        removeBullet,
    };
}
