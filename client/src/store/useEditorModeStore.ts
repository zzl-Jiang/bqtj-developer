// 全局编辑器模式状态管理
// 控制所有编辑器使用专业模式还是向导模式

import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export type EditorMode = 'pro' | 'wizard';

export const useEditorModeStore = defineStore('editorMode', () => {
    // 从 localStorage 读取保存的模式，默认专业模式
    const savedMode = localStorage.getItem('editor_mode') as EditorMode | null;
    const currentMode = ref<EditorMode>(savedMode || 'pro');

    // 是否为向导模式
    const isWizardMode = computed(() => currentMode.value === 'wizard');

    // 是否为专业模式
    const isProMode = computed(() => currentMode.value === 'pro');

    // 切换模式
    function setMode(mode: EditorMode) {
        currentMode.value = mode;
        localStorage.setItem('editor_mode', mode);
    }

    // 切换模式（toggle）
    function toggleMode() {
        const newMode = currentMode.value === 'pro' ? 'wizard' : 'pro';
        setMode(newMode);
    }

    return {
        currentMode,
        isWizardMode,
        isProMode,
        setMode,
        toggleMode
    };
});
