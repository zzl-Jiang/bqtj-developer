<template>
  <div class="summary-container">
    <!-- 顶部公告/环境提示 -->
    <div class="notice-banner">
      <div class="notice-icon">
        <n-icon size="24">
          <InformationCircleOutline />
        </n-icon>
      </div>
      <div class="notice-content">
        <div class="notice-title">编辑器环境就绪</div>
        <div class="notice-desc">当前正在编辑 <b>{{ modStore.info.cnName || '未命名项目' }}</b>。</div>
      </div>
    </div>

    <!-- 基础信息配置 -->
    <div class="premium-card">
      <div class="card-header">
        <div class="header-title">项目基础配置</div>
      </div>
      <n-form :label-width="80" label-placement="top">
        <n-grid :cols="3" :x-gap="24">
          <n-gi>
            <n-form-item label="Mod ID">
              <n-input v-model:value="modStore.info.id" placeholder="唯一标识符" class="premium-input" />
            </n-form-item>
          </n-gi>
          <n-gi>
            <n-form-item label="中文名称">
              <n-input v-model:value="modStore.info.cnName" placeholder="显示名称" class="premium-input" />
            </n-form-item>
          </n-gi>
          <n-gi>
            <n-form-item label="作者">
              <n-input v-model:value="modStore.info.author" placeholder="作者名" class="premium-input" />
            </n-form-item>
          </n-gi>
        </n-grid>
        <n-form-item label="项目简介 (支持 HTML)">
          <n-input v-model:value="modStore.info.description" type="textarea" placeholder="描述您的 Mod 特色..."
            :autosize="{ minRows: 2 }" class="premium-input" />
        </n-form-item>
      </n-form>
    </div>

    <!-- 数据统计网格 -->
    <n-grid :cols="4" :x-gap="16" :y-gap="16">
      <n-gi v-for="stat in statistics" :key="stat.label">
        <div class="stat-card">
          <div class="stat-icon" :style="{ background: stat.color }">
            <n-icon :component="stat.icon" />
          </div>
          <div>
            <div class="stat-value">{{ stat.value }}</div>
            <div class="stat-label">{{ stat.label }}</div>
          </div>
        </div>
      </n-gi>

      <!-- 异常检测大卡片 -->
      <n-gi :span="4">
        <div class="status-card" :class="{ error: errorCount > 0 }">
          <div class="status-main">
            <div class="status-icon">
              <n-icon size="32">
                <ShieldCheckmarkOutline v-if="errorCount === 0" />
                <AlertCircleOutline v-else />
              </n-icon>
            </div>
            <div>
              <div class="status-label">核心逻辑诊断</div>
              <div class="status-desc">{{ errorCount > 0 ? `发现 ${errorCount} 项潜在问题需要修正` : '所有模块运行正常，未导出冲突' }} (制作中)
              </div>
            </div>
          </div>
          <div>
            <n-button :type="errorCount > 0 ? 'error' : 'success'" secondary round
              @click="showDiagnostics = !showDiagnostics">
              {{ showDiagnostics ? '收起报告' : '查看详情' }}
            </n-button>
          </div>
        </div>
      </n-gi>
    </n-grid>

    <!-- 诊断详情 -->
    <n-collapse-transition :show="showDiagnostics">
      <div class="premium-card diagnostics-panel">
        <n-list hoverable clickable size="small" style="background: transparent;">
          <n-list-item v-for="(err, i) in allErrors" :key="i" @click="navigateToError(err)" class="diag-item">
            <n-thing>
              <template #header>
                <n-space align="center">
                  <n-tag :type="err.type === 'error' ? 'error' : 'warning'" size="small" round edge>
                    {{ err.module }}
                  </n-tag>
                  <n-text strong color="white">{{ err.targetId }}</n-text>
                </n-space>
              </template>
              <template #description>
                <div class="diag-msg">{{ err.message }}</div>
              </template>
            </n-thing>
            <template #suffix>
              <n-icon size="18" depth="3">
                <ChevronForwardOutline />
              </n-icon>
            </template>
          </n-list-item>
          <n-empty v-if="allErrors.length === 0" description="逻辑健康" />
        </n-list>
      </div>
    </n-collapse-transition>

    <!-- 导出区域 -->
    <div class="premium-card">
      <div class="card-header export-header">
        <div class="header-title">全量 XML 导出</div>
        <n-space>
          <n-button secondary type="info" @click="downloadXml" class="action-btn">下载文件</n-button>
          <n-button type="primary" @click="copyFullXml" class="action-btn primary-glow">一键复制</n-button>
        </n-space>
      </div>
      <div class="xml-preview">
        <n-scrollbar style="max-height: 400px;">
          <code>{{ fullXml }}</code>
        </n-scrollbar>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useNavigation } from '../../hooks/useNavigation';
import {
  LayersOutline,
  FlashOutline,
  PeopleOutline,
  ChatbubbleEllipsesOutline,
  ImageOutline,
  DiscOutline,
  HammerOutline,
  GiftOutline,
  InformationCircleOutline,
  ShieldCheckmarkOutline,
  AlertCircleOutline,
  ChevronForwardOutline
} from '@vicons/ionicons5';
import { useModStore } from '../../store/useModStore';
import { useMessage } from 'naive-ui';
import { useValidator } from './Validators';

const { allErrors, errorCount } = useValidator();
const { navigateToError } = useNavigation();
const modStore = useModStore();
const message = useMessage();
const showDiagnostics = ref(false);

const statistics = computed(() => [
  { label: '关卡设计', value: modStore.levelList.length, icon: LayersOutline, color: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)' },
  { label: '技能定义', value: modStore.skillList.length, icon: FlashOutline, color: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' },
  { label: '单位属性', value: modStore.bodyList.length, icon: PeopleOutline, color: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' },
  { label: '剧情对话', value: modStore.sayList.length, icon: ChatbubbleEllipsesOutline, color: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)' },
  { label: '静态资源', value: modStore.pngList.length, icon: ImageOutline, color: 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)' },
  { label: '子弹效果', value: modStore.bulletList.length, icon: DiscOutline, color: 'linear-gradient(135deg, #64748b 0%, #475569 100%)' },
  { label: '武器系统', value: modStore.armsList.length, icon: HammerOutline, color: 'linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)' },
  { label: '资源掉落', value: modStore.dropList.length, icon: GiftOutline, color: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)' },
]);

const fullXml = computed(() => {
  const { info } = modStore;
  let xml = `<data id="${info.id}" cnName="${info.cnName}" author="${info.author}">\n`;
  xml += `  <info>\n  <![CDATA[${info.description}]]>\n  </info>\n\n`;

  const buildFather = (name: string, cn: string, list: any[]) => {
    if (list.length === 0) return `  <!-- <father name="${name}" cn="${cn}"> 暂无数据 </father> -->\n`;
    let res = `  <father name="${name}" cn="${cn}">\n`;
    list.forEach(item => res += `${item.toXml()}\n`);
    res += `  </father>\n`;
    return res;
  };

  const buildFatherLevel = (name: string, cn: string, list: any[]) => {
    if (list.length === 0) return `  <!-- <father name="${name}" cn="${cn}"> 暂无数据 </father> -->\n`;
    let res = `  <father name="${name}" cn="${cn}">\n    <gather>\n`;
    list.forEach(item => res += `${item.toXml()}\n`);
    res += `    </gather>\n  </father>\n`;
    return res;
  };

  xml += buildFatherLevel('level', '关卡', modStore.levelList);
  xml += buildFather('skill', '技能', modStore.skillList);
  xml += buildFather('body', '单位', modStore.bodyList);
  xml += buildFatherLevel('say', '对话', modStore.sayList);
  xml += buildFather('png', '资源', modStore.pngList);
  xml += buildFather('bullet', '子弹', modStore.bulletList);
  xml += buildFather('arms', '武器', modStore.armsList);
  xml += buildFather('drop', '掉落', modStore.dropList);

  xml += `</data>`;
  return xml;
});

const copyFullXml = () => {
  navigator.clipboard.writeText(fullXml.value);
  message.success('全量 XML 已复制到剪贴板');
};

const downloadXml = () => {
  const blob = new Blob([fullXml.value], { type: 'text/xml' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${modStore.info.id || 'mod'}.xml`;
  a.click();
  URL.revokeObjectURL(url);
};
</script>

<style scoped>
.summary-container {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding-bottom: 60px;
  margin-left: 24px;
}

.notice-banner {
  display: flex;
  background: rgba(24, 160, 88, 0.1);
  border: 1px solid rgba(24, 160, 88, 0.2);
  padding: 16px 24px;
  border-radius: var(--premium-rounded);
  align-items: center;
  gap: 16px;
}

.notice-icon {
  color: var(--primary-color);
  background: rgba(24, 160, 88, 0.1);
  padding: 8px;
  border-radius: 12px;
}

.notice-title {
  font-weight: 600;
  font-size: 15px;
}

.notice-desc {
  font-size: 13px;
  opacity: 0.7;
}

.premium-card {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--premium-rounded);
  padding: 24px;
  box-shadow: var(--premium-glow);
}

.card-header {
  margin-bottom: 20px;
}

.header-title {
  font-size: 18px;
  font-weight: 700;
  letter-spacing: -0.5px;
}

.premium-input :deep(.n-input) {
  background: rgba(0, 0, 0, 0.2) !important;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.stat-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: var(--premium-rounded);
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  transition: transform 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-4px);
  background: rgba(255, 255, 255, 0.04);
}

.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.stat-value {
  font-size: 22px;
  font-weight: 800;
  line-height: 1;
}

.stat-label {
  font-size: 13px;
  opacity: 0.5;
  margin-top: 4px;
}

.status-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  background: rgba(24, 160, 88, 0.08);
  border: 1px solid rgba(24, 160, 88, 0.15);
  border-radius: var(--premium-rounded);
}

.status-card.error {
  background: rgba(240, 68, 56, 0.08);
  border-color: rgba(240, 68, 56, 0.15);
}

.status-main {
  display: flex;
  gap: 20px;
  align-items: center;
}

.status-icon {
  color: var(--primary-color);
}

.status-card.error .status-icon {
  color: #f04438;
}

.status-label {
  font-weight: 700;
  font-size: 16px;
}

.status-desc {
  font-size: 14px;
  opacity: 0.6;
}

.diagnostics-panel {
  margin-top: -12px;
  background: rgba(0, 0, 0, 0.15);
  padding: 12px;
}

.diag-item {
  padding: 12px !important;
  border-radius: 12px;
  margin-bottom: 4px;
}

.diag-msg {
  font-size: 13px;
  opacity: 0.8;
  margin-top: 4px;
}

.export-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.xml-preview {
  background: #0d1117;
  padding: 16px;
  border-radius: 16px;
  font-family: 'Fira Code', monospace;
  font-size: 12px;
  color: #8b949e;
  border: 1px solid rgba(255, 255, 255, 0.05);
  white-space: pre-wrap;
}

.action-btn {
  border-radius: 12px;
  font-weight: 600;
}

.primary-glow {
  box-shadow: 0 4px 14px rgba(24, 160, 88, 0.3);
}
</style>
