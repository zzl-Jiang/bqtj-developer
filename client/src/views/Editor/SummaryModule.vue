<template>
  <n-space vertical size="large">
    <n-h2 prefix="bar">Mod 数据概览</n-h2>

    <n-grid :cols="3" :x-gap="12">
      <n-gi>
        <n-statistic label="图片资源 (PNG)" :value="modStore.pngList.length" />
      </n-gi>
      <n-gi>
        <n-statistic label="技能总数" :value="modStore.skillList.length" />
      </n-gi>
      <n-gi>
        <n-statistic label="异常检测" :value="errorCount">
          <template #suffix>
            <n-text :type="errorCount > 0 ? 'error' : 'success'">
              {{ errorCount > 0 ? '项待修正' : '健康' }}
            </n-text>
          </template>
        </n-statistic>
      </n-gi>
    </n-grid>

    <n-card title="健康检查报告" segmented>
      <n-list v-if="errorList.length > 0">
        <n-list-item v-for="(err, i) in errorList" :key="i">
          <n-tag :type="err.type" size="small" style="margin-right: 8px">{{ err.module }}</n-tag>
          <n-text>{{ err.message }}</n-text>
        </n-list-item>
      </n-list>
      <n-result v-else status="success" title="一切正常" description="目前没有逻辑或格式错误" />
    </n-card>

    <n-card title="全量代码导出 (预览)" segmented>
      <template #header-extra>
        <n-button type="primary" @click="copyFullXml">一键复制完整 Mod 代码</n-button>
      </template>
      <div class="xml-full-preview">
        <code>{{ fullXml }}</code>
      </div>
    </n-card>
  </n-space>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useModStore } from '../../store/useModStore';
import { useMessage } from 'naive-ui';

const modStore = useModStore();
const message = useMessage();

// 错误检查逻辑
const errorList = computed(() => {
  const list: { module: string, type: 'error' | 'warning', message: string }[] = [];
  
  // 检查 PNG
  modStore.pngList.forEach((p, i) => {
    if (!p.url) list.push({ module: 'PNG', type: 'error', message: `资源 [${p.name || i}] 缺少图片 URL` });
    // 检查重名
    if (modStore.pngList.filter(x => x.name === p.name).length > 1) {
      list.push({ module: 'PNG', type: 'warning', message: `存在重复的名字: ${p.name}` });
    }
  });

  return list;
});

const errorCount = computed(() => errorList.value.length);

// 生成全量 XML
const fullXml = computed(() => {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<data>\n';
  
  // 汇总 PNG 模块
  if (modStore.pngList.length > 0) {
    xml += '  <father name="png" cn="资源">\n';
    modStore.pngList.forEach(p => xml += `    ${p.toXml()}\n`);
    xml += '  </father>\n';
  }
  
  // 汇总 skill 模块
  if (modStore.skillList.length > 0) {
    xml += '  <father name="skill" cn="技能">\n';
    modStore.skillList.forEach(p => xml += `${p.toXml()}\n`);
    xml += '  </father>\n';
  }

  // 后续增加其他模块的汇总...
  
  xml += '</data>';
  return xml;
});

const copyFullXml = () => {
  navigator.clipboard.writeText(fullXml.value);
  message.success('全量 XML 已复制到剪贴板');
};
</script>

<style scoped>
.xml-full-preview {
  max-height: 300px;
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