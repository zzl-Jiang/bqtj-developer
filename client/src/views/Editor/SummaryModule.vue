<template>
  <n-space vertical size="large">
    <!-- 基础信息配置 -->
    <n-card title="Mod 基础配置">
      <n-form inline :label-width="80">
        <n-grid :cols="3" :x-gap="12">
          <n-gi>
            <n-form-item label="Mod ID">
              <n-input v-model:value="modStore.info.id" placeholder="唯一标识符" />
            </n-form-item>
          </n-gi>
          <n-gi>
            <n-form-item label="中文名称">
              <n-input v-model:value="modStore.info.cnName" placeholder="显示名称" />
            </n-form-item>
          </n-gi>
          <n-gi>
            <n-form-item label="作者">
              <n-input v-model:value="modStore.info.author" placeholder="作者名" />
            </n-form-item>
          </n-gi>
        </n-grid>
      </n-form>
      <n-form-item label="Mod 介绍 (支持 htmlText, 自动包装 CDATA)">
        <n-input
          v-model:value="modStore.info.description"
          type="textarea"
          placeholder="对应 <info> 标签内容"
          :autosize="{ minRows: 3 }"
        />
      </n-form-item>
    </n-card>

    <!-- 数据统计 -->
    <n-grid :cols="4" :x-gap="12" :y-gap="12" style="padding: 10px;">
      <n-gi v-for="stat in statistics" :key="stat.label">
        <n-card embedded size="small">
          <n-statistic :label="stat.label" :value="stat.value" />
        </n-card>
      </n-gi>
      <n-gi :span="4">
        <n-card embedded size="small" style="background-color: rgba(24, 160, 88, 0.1)">
          <n-statistic label="异常检测 (测试中，目前检测不全面)" :value="errorCount">
            <template #suffix>
              <n-text :type="errorCount > 0 ? 'error' : 'success'">
                {{ errorCount > 0 ? '项待修正' : '健康' }}
              </n-text>
            </template>
          </n-statistic>
        </n-card>
      </n-gi>
    </n-grid>

    <n-collapse style="padding: 0 10px; width: auto;">
      <n-collapse-item title="诊断结果 (点击异常项可直接跳转定位)" name="diagnostics">
        <template #header-extra>
          <n-tag :type="errorCount > 0 ? 'error' : 'success'" round>
            {{ errorCount }} 错误 / {{ warningCount }} 警告
          </n-tag>
        </template>
        
        <n-list hoverable clickable size="small">
          <n-list-item 
            v-for="(err, i) in allErrors" 
            :key="i" 
            @click="navigateToError(err)" 
            style="cursor: pointer;"
          >
            <n-thing>
              <template #header>
                <n-space align="center">
                  <!-- 模块标签 -->
                  <n-tag :type="err.type === 'error' ? 'error' : 'warning'" size="small" uppercase>
                    {{ err.module }}
                  </n-tag>
                  <!-- 目标 ID -->
                  <n-text strong>{{ err.targetId }}</n-text>
                  <!-- 页签提示 -->
                  <n-text depth="3" v-if="err.tab" style="font-size: 12px;">
                    页签: {{ err.tab }}
                  </n-text>
                </n-space>
              </template>
              
              <template #description>
                <n-text :type="err.type === 'error' ? 'error' : ''">
                  {{ err.message }}
                </n-text>
              </template>
            </n-thing>

            <!-- 右侧跳转图标 -->
            <template #suffix>
              <n-icon size="20" depth="3">
                <ArrowForwardOutline />
              </n-icon>
            </template>
          </n-list-item>
          
          <n-empty v-if="allErrors.length === 0" description="未发现异常，关卡逻辑健康" />
        </n-list>
      </n-collapse-item>
    </n-collapse>

    <!-- 全量导出 -->
    <n-card title="全量代码导出" segmented>
      <template #header-extra>
        <n-space>
          <n-button type="info" ghost @click="downloadXml">下载 .xml 文件</n-button>
          <n-button type="primary" @click="copyFullXml">一键复制</n-button>
        </n-space>
      </template>
      <div class="xml-full-preview">
        <code>{{ fullXml }}</code>
      </div>
    </n-card>
  </n-space>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useNavigation } from '../../hooks/useNavigation';
import { ArrowForwardOutline } from '@vicons/ionicons5';
import { useModStore } from '../../store/useModStore';
import { useMessage } from 'naive-ui';
import { useValidator } from './Validators';

const { allErrors, errorCount, warningCount } = useValidator();
const { navigateToError } = useNavigation();
const modStore = useModStore();
const message = useMessage();

const statistics = computed(() => [
  { label: '关卡数量', value: modStore.levelList.length },
  { label: '技能总数', value: modStore.skillList.length },
  { label: '单位数量', value: modStore.bodyList.length },
  { label: '对话数量', value: modStore.sayList.length },
  { label: '图片资源', value: modStore.pngList.length },
  { label: '子弹数量', value: modStore.bulletList.length },
  { label: '武器数量', value: modStore.armsList.length },
  { label: '掉落定义', value: modStore.dropList.length },
]);

// 生成全量 XML

const fullXml = computed(() => {
  const { info } = modStore;
  
  // 根节点
  let xml = `<data id="${info.id}" cnName="${info.cnName}" author="${info.author}">\n`;
  
  // Info 介绍节点 (使用 CDATA)
  xml += `  <info>\n  <![CDATA[${info.description}]]>\n  </info>\n\n`;

  // 辅助函数：生成 Father 块
  const buildFather = (name: string, cn: string, list: any[]) => {
    if (list.length === 0) return `  <!-- <father name="${name}" cn="${cn}"> 暂无数据 </father> -->\n`;
    let res = `  <father name="${name}" cn="${cn}">\n`;
    list.forEach(item => {
      // 这里的 item.toXml() 会调用各个类里定义的 XML 生成逻辑
      res += `${item.toXml()}\n`;
    });
    res += `  </father>\n`;
    return res;
  };
  
  // 辅助函数：生成 Level (Say) 专用 Father 块
  const buildFatherLevel = (name: string, cn: string, list: any[]) => {
    if (list.length === 0) return `  <!-- <father name="${name}" cn="${cn}"> 暂无数据 </father> -->\n`;
    let res = `  <father name="${name}" cn="${cn}">\n    <gather>\n`;
    list.forEach(item => {
      // 这里的 item.toXml() 会调用各个类里定义的 XML 生成逻辑
      res += `${item.toXml()}\n`;
    });
    res += `    </gather>\n  </father>\n`;
    return res;
  };

  // 按顺序汇总所有模块
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
.xml-full-preview {
  max-height: 600px;
  overflow-y: auto;
  background: #0d1117;
  color: #c9d1d9;
  padding: 15px;
  border-radius: 6px;
  font-family: 'Fira Code', monospace;
  font-size: 12px;
  white-space: pre;
}
</style>