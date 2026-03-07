<script setup lang="ts">
import { computed } from 'vue';
import { useModStore } from '../../store/useModStore';

const modStore = useModStore();

const options = [
    { label: '汇总', key: 'summary' },
    { label: '关卡', key: 'level' },
    { label: '技能', key: 'skill' },
    { label: '单位', key: 'body' },
    { label: '对话', key: 'say' },
    { label: '图片', key: 'png' },
    { label: '子弹', key: 'bullet' },
    { label: '武器', key: 'arms' },
    { label: '掉落', key: 'drop' },
];

const activeNav = computed(() => modStore.activeModule);

const handleSelect = (key: string) => {
    modStore.activeModule = key as any;
};
</script>

<template>
    <div class="nav-container">
        <div class="nav-pill">
            <div v-for="opt in options" :key="opt.key" class="nav-item" :class="{ active: activeNav === opt.key }"
                @click="handleSelect(opt.key)">
                {{ opt.label }}
            </div>
        </div>
    </div>
</template>

<style scoped>
.nav-container {
    display: flex;
    justify-content: center;
    margin-bottom: 32px;
    position: sticky;
    top: 40px;
    z-index: 999;
}

.nav-pill {
    display: flex;
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(20px);
    padding: 6px;
    border-radius: 100px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow: var(--premium-glow);
    flex-wrap: wrap;
    justify-content: center;
    max-width: 100%;
    overflow-x: auto;
}

.nav-item {
    padding: 8px 24px;
    border-radius: 100px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    color: rgba(255, 255, 255, 0.6);
    user-select: none;
    white-space: nowrap;
    flex-shrink: 0;
}

/* 小屏幕下调整导航项 */
@media (max-width: 768px) {
    .nav-item {
        padding: 6px 16px;
        font-size: 13px;
    }
}

@media (max-width: 480px) {
    .nav-item {
        padding: 4px 12px;
        font-size: 12px;
    }
}

.nav-item:hover {
    color: #fff;
    background: rgba(255, 255, 255, 0.05);
}

.nav-item.active {
    color: #fff;
    background: var(--primary-color);
    box-shadow: 0 4px 12px rgba(24, 160, 88, 0.4);
}
</style>
