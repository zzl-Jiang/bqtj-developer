<script setup lang="ts">
import { h, computed, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { darkTheme, NIcon, NBadge, NH1, NTag, NText, NSpace, NLayout, NLayoutSider, NLayoutContent, NButton, NConfigProvider, NLoadingBarProvider, NMessageProvider, NDialogProvider, NNotificationProvider, NModal, NScrollbar, NMenu } from 'naive-ui'
import { RouterLink } from 'vue-router'
import type { MenuOption } from 'naive-ui'
import { RocketOutline, TimeOutline, HomeOutline, BuildOutline, PersonOutline, ChevronBackOutline, ChevronForwardOutline } from '@vicons/ionicons5'

import { UPDATES_DATA } from './data/updates'
import UpdateLogRenderer from './views/components/UpdateLogRenderer.vue'

const route = useRoute()
const showChangelog = ref(false)
const hasNewUpdate = ref(false)
const isSidebarCollapsed = ref(true)

// 管理当前选中的版本索引（默认 0，即最新版本）
const activeVersionIdx = ref(0)

const latestUpdate = UPDATES_DATA[0] || { version: 'v0.0.0', blocks: [], date: '', isMajor: false }

// 计算当前正在查看的日志对象
const currentLog = computed(() => UPDATES_DATA[activeVersionIdx.value] || latestUpdate)

// 生成左侧菜单选项：显示所有历史版本
const versionMenuOptions = computed<MenuOption[]>(() => {
  return UPDATES_DATA.map((log, index) => ({
    label: log.version,
    key: index, // 使用索引作为 key 方便切换
    icon: () => h(NIcon, null, {
      default: () => h(log.isMajor ? RocketOutline : TimeOutline)
    })
  }))
})

const activeKey = computed(() => route.name as string)

onMounted(() => {
  const lastVersion = localStorage.getItem('last_seen_version')
  if (lastVersion !== latestUpdate.version) {
    hasNewUpdate.value = true
  }
})

// 查看日志：重置索引并清除红点
const handleOpenLog = () => {
  activeVersionIdx.value = 0
  showChangelog.value = true
  hasNewUpdate.value = false
  localStorage.setItem('last_seen_version', latestUpdate.version)
}

const menuOptions: MenuOption[] = [
  {
    label: () => h(RouterLink, { to: '/' }, { default: () => '大厅' }),
    key: 'Hall',
    icon: () => h(NIcon, null, { default: () => h(HomeOutline) })
  },
  {
    label: () => h(RouterLink, { to: '/editor' }, { default: () => '编辑器' }),
    key: 'Editor',
    icon: () => h(NIcon, null, { default: () => h(BuildOutline) })
  },
  {
    label: () => h(RouterLink, { to: '/profile' }, { default: () => '我的' }),
    key: 'Profile',
    icon: () => h(NIcon, null, { default: () => h(PersonOutline) })
  }
]
</script>

<style scoped>
.app-wrapper {
  height: 100vh;
  background: #0f0f12;
}

.level1-sidebar {
  background: rgba(15, 15, 18, 0.6) !important;
  backdrop-filter: blur(20px);
  border-right: 1px solid rgba(255, 255, 255, 0.05) !important;
  z-index: 1001;
}

.app-container {
  height: 100vh;
  background:
    radial-gradient(circle at 100% 100%, rgba(24, 160, 88, 0.15), transparent 50%),
    radial-gradient(circle at 0% 0%, rgba(138, 43, 226, 0.1), transparent 50%),
    #0a0a0c;
  overflow-y: auto;
  position: relative;
}

.app-container::before {
  content: "";
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3%3Cfilter id='noiseFilter'%3%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3%3C/filter%3%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3%3C/svg%3");
  opacity: 0.02;
  pointer-events: none;
  z-index: 1;
}

.sidebar-header {
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
}

.logo-text {
  font-size: 18px;
  font-weight: 800;
  background: linear-gradient(135deg, #fff 0%, #18a058 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  white-space: nowrap;
}

.logo-collapsed {
  font-size: 24px;
  font-weight: 900;
  color: #18a058;
}

.sidebar-menu {
  flex: 1;
  padding-top: 12px;
}

.sidebar-footer {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
  border-top: 1px solid rgba(255, 255, 255, 0.03);
}

.footer-btn {
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
}

.footer-btn:hover {
  background: rgba(255, 255, 255, 0.08);
}

.user-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  opacity: 0.5;
}

.main-content {
  padding: 24px;
  max-width: 1600px;
  margin: 0 auto;
}

:deep(.n-layout-sider-scroll-container) {
  display: flex;
  flex-direction: column;
}
</style>

<style>
:root {
  --premium-rounded: 20px;
  --premium-bg: rgba(255, 255, 255, 0.03);
  --premium-border: rgba(255, 255, 255, 0.08);
  --premium-glow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
  --primary-color: #18a058;
}

body {
  margin: 0;
  padding: 0;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #0d0d10;
  color: rgba(255, 255, 255, 0.9);
}

/* 全局样式 */
.premium-card {
  background: rgba(255, 255, 255, 0.03) !important;
  backdrop-filter: blur(12px) !important;
  border: 1px solid rgba(255, 255, 255, 0.08) !important;
  border-radius: var(--premium-rounded) !important;
  box-shadow: var(--premium-glow) !important;
  transition: all 0.3s ease;
}

.premium-card:hover {
  border-color: rgba(24, 160, 88, 0.2) !important;
  box-shadow: 0 12px 48px rgba(0, 0, 0, 0.45) !important;
}

/* 深度定制 */
.n-collapse-item__header {
  font-weight: 700 !important;
  font-size: 15px !important;
  padding: 12px 16px !important;
  margin-bottom: 8px !important;
  background: rgba(255, 255, 255, 0.02) !important;
  border-radius: 12px !important;
}

.n-card.n-card--embedded-typed {
  background-color: transparent !important;
}
</style>

<template>
  <n-config-provider :theme="darkTheme">
    <n-loading-bar-provider>
      <n-message-provider>
        <n-dialog-provider>
          <n-notification-provider>

            <n-layout has-sider class="app-wrapper">
              <!-- 侧边栏 -->
              <n-layout-sider collapse-mode="width" :collapsed-width="64" :width="200" bordered
                :collapsed="isSidebarCollapsed" @collapse="isSidebarCollapsed = true"
                @expand="isSidebarCollapsed = false" class="level1-sidebar">
                <div class="sidebar-header">
                  <div class="logo-text" v-if="!isSidebarCollapsed">爆枪开发者</div>
                  <div class="logo-collapsed" v-else>B</div>
                </div>

                <n-menu :collapsed="isSidebarCollapsed" :collapsed-width="64" :collapsed-icon-size="22"
                  :options="menuOptions" :value="activeKey" class="sidebar-menu" />

                <div class="sidebar-footer">
                  <!-- 版本信息 -->
                  <n-badge :dot="hasNewUpdate" color="#18a058" :offset="[0, 0]">
                    <n-button quaternary circle size="medium" @click="handleOpenLog" class="footer-btn">
                      <template #icon><n-icon>
                          <RocketOutline />
                        </n-icon></template>
                    </n-button>
                  </n-badge>

                  <!-- 侧边栏折叠按钮 -->
                  <n-button quaternary circle size="medium" @click="isSidebarCollapsed = !isSidebarCollapsed"
                    class="footer-btn">
                    <template #icon>
                      <n-icon>
                        <ChevronBackOutline v-if="!isSidebarCollapsed" />
                        <ChevronForwardOutline v-else />
                      </n-icon>
                    </template>
                  </n-button>

                  <!-- 用户信息 -->
                  <div class="user-placeholder" v-if="!isSidebarCollapsed">
                    <n-text depth="3" style="font-size: 10px;">用户登录 (待接)</n-text>
                    <n-text depth="3" style="font-size: 10px;">{{ latestUpdate.version }}</n-text>
                  </div>
                </div>
              </n-layout-sider>

              <n-layout-content class="app-container">
                <main class="main-content">
                  <router-view />
                </main>
              </n-layout-content>
            </n-layout>

            <!-- 全局日志弹窗 -->
            <n-modal v-model:show="showChangelog" preset="card"
              style="width: 900px; border-radius: 20px; background: rgba(24, 24, 28, 0.95); backdrop-filter: blur(20px);"
              title="开发历程与更新日志">
              <n-layout has-sider style="height: 60vh; max-height: 600px; background: transparent;">
                <!-- 左侧版本列表 -->
                <n-layout-sider width="160" style="background: transparent;">
                  <n-scrollbar>
                    <n-menu :options="versionMenuOptions" :value="activeVersionIdx"
                      @update:value="(v: number) => activeVersionIdx = v" />
                  </n-scrollbar>
                </n-layout-sider>

                <!-- 右侧内容渲染区 -->
                <n-layout-content style="padding: 0 5px; background: transparent;">
                  <n-scrollbar>
                    <div style="padding: 20px 32px;">
                      <div
                        style="margin-bottom: 24px; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 16px;">
                        <n-space align="baseline" :size="12">
                          <n-h1 style="margin: 0; font-size: 28px;">{{ currentLog.version }}</n-h1>
                          <n-tag :type="currentLog.isMajor ? 'warning' : 'info'" size="small" round>
                            {{ currentLog.isMajor ? '重大更新' : '常规优化' }}
                          </n-tag>
                        </n-space>
                        <n-text depth="3" style="display: block; margin-top: 8px;">
                          <n-icon style="vertical-align: -2px; margin-right: 4px;">
                            <TimeOutline />
                          </n-icon>
                          更新日期：{{ currentLog.date }}
                        </n-text>
                      </div>

                      <UpdateLogRenderer :blocks="currentLog.blocks" />
                    </div>
                  </n-scrollbar>
                </n-layout-content>
              </n-layout>

              <template #footer>
                <n-space justify="end">
                  <n-button quaternary @click="showChangelog = false" style="border-radius: 12px;">关闭</n-button>
                  <n-button type="primary" ghost @click="showChangelog = false"
                    style="border-radius: 12px;">开启新版本之旅</n-button>
                </n-space>
              </template>
            </n-modal>

          </n-notification-provider>
        </n-dialog-provider>
      </n-message-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>
