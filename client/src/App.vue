<template>
  <!-- n-config-provider 用于全局主题配置 -->
  <n-config-provider :theme="darkTheme">
    <n-loading-bar-provider>
      <n-message-provider>
        <n-dialog-provider>
          <n-notification-provider>
            
            <n-layout style="height: 100vh">
              <n-layout-header bordered style="height: 64px; padding: 0 20px; display: flex; align-items: center; justify-content: space-between;">
                <div style="font-size: 18px; font-weight: bold;">爆枪突击开发者工具</div>
                <n-menu mode="horizontal" :options="menuOptions" v-model:value="activeKey" />
                <div>用户登录(待接)</div>
              </n-layout-header>

              <n-layout-content content-style="padding: 24px;">
                <router-view />
              </n-layout-content>
            </n-layout>

          </n-notification-provider>
        </n-dialog-provider>
      </n-message-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
import { ref, h } from 'vue'
import { darkTheme } from 'naive-ui'
import { RouterLink } from 'vue-router'
import type { MenuOption } from 'naive-ui'

const activeKey = ref('Hall')

// 定义导航菜单项
const menuOptions: MenuOption[] = [
  {
    label: () => h(RouterLink, { to: '/' }, { default: () => '大厅' }),
    key: 'Hall',
  },
  {
    label: () => h(RouterLink, { to: '/editor' }, { default: () => '编辑器' }),
    key: 'Editor',
  },
  {
    label: () => h(RouterLink, { to: '/profile' }, { default: () => '我的' }),
    key: 'Profile',
  }
]
</script>

<style>
body { margin: 0; }
</style>