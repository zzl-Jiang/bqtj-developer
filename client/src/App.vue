<script setup lang="ts">
import { h, computed, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { darkTheme, NIcon, NBadge, NH1, NTag, NText, NSpace } from 'naive-ui'
import { RouterLink } from 'vue-router'
import type { MenuOption } from 'naive-ui'
import { RocketOutline, TimeOutline } from '@vicons/ionicons5'

import { UPDATES_DATA } from './data/updates'
import UpdateLogRenderer from './views/components/UpdateLogRenderer.vue'

const route = useRoute()
const showChangelog = ref(false)
const hasNewUpdate = ref(false)

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
  { label: () => h(RouterLink, { to: '/' }, { default: () => '大厅' }), key: 'Hall' },
  { label: () => h(RouterLink, { to: '/editor' }, { default: () => '编辑器' }), key: 'Editor' },
  { label: () => h(RouterLink, { to: '/profile' }, { default: () => '我的' }), key: 'Profile' }
]
</script>

<template>
  <n-config-provider :theme="darkTheme">
    <n-loading-bar-provider>
      <n-message-provider>
        <n-dialog-provider>
          <n-notification-provider>
            
            <n-layout style="height: 100vh">
              <n-layout-header bordered style="height: 64px; padding: 0 20px; display: flex; align-items: center; justify-content: space-between;">
                <div style="font-size: 18px; font-weight: bold;">爆枪突击开发者工具</div>
                
                <n-menu mode="horizontal" :options="menuOptions" :value="activeKey" />
                
                <!-- 右侧集成 -->
                <n-space align="center" :size="20" style="flex-flow: unset;">
                  <n-badge :dot="hasNewUpdate" color="#18a058" :offset="[4, 0]">
                    <n-button quaternary size="small" @click="handleOpenLog">
                      <template #icon>
                        <n-icon><RocketOutline /></n-icon>
                      </template>
                      {{ latestUpdate.version }}
                    </n-button>
                  </n-badge>
                  <div style="opacity: 0.8">用户登录(待接)</div>
                </n-space>
              </n-layout-header>

              <n-layout-content content-style="padding: 24px;">
                <router-view />
              </n-layout-content>
            </n-layout>

            <!-- 全局日志弹窗 -->
            <n-modal 
              v-model:show="showChangelog" 
              preset="card" 
              style="width: 900px; border-radius: 12px;" 
              title="开发历程与更新日志"
            >
              <n-layout has-sider style="height: 60vh; max-height: 600px;">
                <!-- 左侧版本列表 -->
                <n-layout-sider
                  width="160"
                  bordered
                  style="--n-color: rgba(255, 255, 255, 0.03)"
                >
                  <n-scrollbar>
                    <n-menu
                      :options="versionMenuOptions"
                      :value="activeVersionIdx"
                      @update:value="(v: number) => activeVersionIdx = v"
                    />
                  </n-scrollbar>
                </n-layout-sider>

                <!-- 右侧内容渲染区 -->
                <n-layout-content style="padding: 0 5px;">
                  <n-scrollbar>
                    <div style="padding: 20px 32px;">
                      <!-- 动态头部：根据选中的 currentLog 显示 -->
                      <div style="margin-bottom: 24px; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 16px;">
                        <n-space align="baseline" :size="12">
                          <n-h1 style="margin: 0; font-size: 28px;">{{ currentLog.version }}</n-h1>
                          <n-tag :type="currentLog.isMajor ? 'warning' : 'info'" size="small" round>
                            {{ currentLog.isMajor ? '重大更新' : '常规优化' }}
                          </n-tag>
                        </n-space>
                        <n-text depth="3" style="display: block; margin-top: 8px;">
                          <n-icon style="vertical-align: -2px; margin-right: 4px;"><TimeOutline /></n-icon>
                          更新日期：{{ currentLog.date }}
                        </n-text>
                      </div>

                      <!-- 渲染引擎 -->
                      <UpdateLogRenderer :blocks="currentLog.blocks" />
                    </div>
                  </n-scrollbar>
                </n-layout-content>
              </n-layout>

              <template #footer>
                <n-space justify="end">
                  <n-button quaternary @click="showChangelog = false">关闭</n-button>
                  <n-button type="primary" ghost @click="showChangelog = false">开启新版本之旅</n-button>
                </n-space>
              </template>
            </n-modal>

          </n-notification-provider>
        </n-dialog-provider>
      </n-message-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>

<style scoped>
/* 修复侧边栏菜单激活项的背景色，使其在暗色模式下更柔和 */
:deep(.n-menu .n-menu-item-content.n-menu-item-content--selected) {
  background-color: rgba(24, 160, 88, 0.15) !important;
}

/* 让滚动条在右侧留出一点间距 */
:deep(.n-scrollbar > .n-scrollbar-rail.n-scrollbar-rail--vertical) {
  right: 2px;
}
</style>