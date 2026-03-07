import { ref, computed, onMounted, onUnmounted } from 'vue';

// Naive UI 断点定义
const BREAKPOINTS = {
  xs: 640,   // 手机
  s: 768,    // 小平板
  m: 1024,   // 平板/小笔记本
  l: 1280,   // 笔记本
  xl: 1536,  // 桌面
};

export function useResponsive() {
  const windowWidth = ref(window.innerWidth);

  const updateWidth = () => {
    windowWidth.value = window.innerWidth;
  };

  onMounted(() => {
    window.addEventListener('resize', updateWidth);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', updateWidth);
  });

  // 是否移动端（< 768px）
  const isMobile = computed(() => windowWidth.value < BREAKPOINTS.s);

  // 是否平板（768px - 1024px）
  const isTablet = computed(() => windowWidth.value >= BREAKPOINTS.s && windowWidth.value < BREAKPOINTS.m);

  // 是否小屏幕（< 1024px，包括手机和平板）
  const isSmallScreen = computed(() => windowWidth.value < BREAKPOINTS.m);

  // 是否桌面端（>= 1024px）
  const isDesktop = computed(() => windowWidth.value >= BREAKPOINTS.m);

  // 当前断点名称
  const breakpoint = computed(() => {
    if (windowWidth.value < BREAKPOINTS.xs) return 'xs';
    if (windowWidth.value < BREAKPOINTS.s) return 's';
    if (windowWidth.value < BREAKPOINTS.m) return 'm';
    if (windowWidth.value < BREAKPOINTS.l) return 'l';
    return 'xl';
  });

  return {
    windowWidth,
    isMobile,
    isTablet,
    isSmallScreen,
    isDesktop,
    breakpoint,
  };
}
