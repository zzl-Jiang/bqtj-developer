<!-- client/src/views/components/ImportDialog.vue -->
<template>
    <n-modal
        v-model:show="visible"
        preset="card"
        title="导入 XML"
        :style="{ maxWidth: '600px', width: '90vw' }"
        :bordered="false"
        size="huge"
    >
        <div class="import-dialog-content">
            <!-- 文件上传区域 -->
            <n-upload
                v-model:file-list="fileList"
                accept=".xml"
                :max="1"
                @before-upload="handleBeforeUpload"
                @remove="handleRemove"
                class="upload-area"
            >
                <n-upload-dragger>
                    <div class="upload-trigger">
                        <n-icon size="48" :depth="3">
                            <CloudUploadOutline />
                        </n-icon>
                        <p class="upload-text">点击或拖拽 XML 文件到此处</p>
                        <p class="upload-hint">支持导入关卡、对话、单位数据</p>
                    </div>
                </n-upload-dragger>
            </n-upload>

            <!-- 解析结果显示 -->
            <div v-if="parseResult" class="parse-result">
                <n-divider />

                <!-- 检测到的类型 -->
                <n-alert
                    :type="parseResult.success ? 'success' : 'warning'"
                    :title="parseResult.success ? '解析成功' : '解析完成（有问题）'"
                    class="result-alert"
                >
                    <div class="result-stats">
                        <n-statistic label="检测到类型" :value="detectedTypeText" />
                        <n-statistic label="数据项数量" :value="parseResult.data.length" />
                    </div>
                </n-alert>

                <!-- 警告信息 -->
                <n-collapse v-if="parseResult.warnings.length > 0" class="warnings-collapse">
                    <n-collapse-item title="警告信息">
                        <n-list size="small">
                            <n-list-item v-for="(warning, i) in parseResult.warnings" :key="i">
                                <n-text type="warning">{{ warning }}</n-text>
                            </n-list-item>
                        </n-list>
                    </n-collapse-item>
                </n-collapse>

                <!-- 错误信息 -->
                <n-collapse v-if="parseResult.errors.length > 0" class="errors-collapse">
                    <n-collapse-item title="错误信息">
                        <n-list size="small">
                            <n-list-item v-for="(error, i) in parseResult.errors" :key="i">
                                <n-text type="error">{{ error }}</n-text>
                            </n-list-item>
                        </n-list>
                    </n-collapse-item>
                </n-collapse>

                <!-- 数据预览 -->
                <n-divider />
                <p class="preview-title">数据预览</p>
                <n-list class="preview-list" size="small">
                    <n-list-item v-for="(item, i) in parseResult.data.slice(0, 5)" :key="i">
                        <n-thing :title="getItemTitle(item)" :description="getItemDesc(item)" />
                    </n-list-item>
                    <n-list-item v-if="parseResult.data.length > 5">
                        <n-text depth="3">还有 {{ parseResult.data.length - 5 }} 项...</n-text>
                    </n-list-item>
                </n-list>
            </div>
        </div>

        <!-- 底部按钮 -->
        <template #footer>
            <n-space justify="end">
                <n-button @click="close">取消</n-button>
                <n-button
                    type="primary"
                    :disabled="!canImport"
                    :loading="importing"
                    @click="handleImport"
                >
                    导入到 {{ targetModuleText }}
                </n-button>
            </n-space>
        </template>
    </n-modal>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import {
    NModal,
    NUpload,
    NUploadDragger,
    NIcon,
    NAlert,
    NStatistic,
    NCollapse,
    NCollapseItem,
    NList,
    NListItem,
    NText,
    NThing,
    NSpace,
    NButton,
    NDivider,
    useMessage
} from 'naive-ui';
import { CloudUploadOutline } from '@vicons/ionicons5';
import { xmlImportService, type ImportResult, type ImportableType } from '../../services/XmlImportService';
import type { ModuleKey } from '../../store/useModStore';

const props = defineProps<{
    show: boolean;
    targetModule: ModuleKey;
}>();

const emit = defineEmits<{
    'update:show': [value: boolean];
    import: [data: any[]];
}>();

const message = useMessage();
const fileList = ref<any[]>([]);
const parseResult = ref<ImportResult<any> | null>(null);
const detectedType = ref<ImportableType>('auto');
const importing = ref(false);

const visible = computed({
    get: () => props.show,
    set: (val) => emit('update:show', val)
});

const detectedTypeText = computed(() => {
    const map: Record<ImportableType, string> = {
        level: '关卡数据',
        say: '对话数据',
        body: '单位数据',
        auto: '自动检测'
    };
    return map[detectedType.value] || '未知';
});

const targetModuleText = computed(() => {
    const map: Record<ModuleKey, string> = {
        level: '关卡',
        say: '对话',
        body: '单位',
        png: '图片',
        skill: '技能',
        bullet: '子弹',
        arms: '武器',
        drop: '掉落'
    };
    return map[props.targetModule] || '当前模块';
});

const canImport = computed(() => {
    return parseResult.value?.success && parseResult.value.data.length > 0;
});

// 监听显示状态，重置数据
watch(() => props.show, (val) => {
    if (val) {
        fileList.value = [];
        parseResult.value = null;
        detectedType.value = 'auto';
    }
});

function handleBeforeUpload(options: any) {
    const file = options.file;

    // 读取文件内容
    const reader = new FileReader();
    reader.onload = (e) => {
        const content = e.target?.result as string;
        parseXmlContent(content);
    };
    reader.onerror = () => {
        message.error('读取文件失败');
    };
    reader.readAsText(file);

    return false; // 阻止自动上传
}

function handleRemove() {
    fileList.value = [];
    parseResult.value = null;
    detectedType.value = 'auto';
}

function parseXmlContent(content: string) {
    // 解析XML
    const doc = xmlImportService.parseXml(content);
    if (!doc) {
        message.error('XML 格式错误，无法解析');
        return;
    }

    // 检测类型
    detectedType.value = xmlImportService.detectType(doc);

    // 根据检测到的类型或目标模块进行导入
    let result: ImportResult<any>;

    switch (detectedType.value) {
        case 'level':
            result = xmlImportService.importLevels(doc);
            break;
        case 'say':
            result = xmlImportService.importSayLists(doc);
            break;
        case 'body':
            result = xmlImportService.importBodies(doc);
            break;
        default:
            // 尝试根据目标模块解析
            switch (props.targetModule) {
                case 'level':
                    result = xmlImportService.importLevels(doc);
                    break;
                case 'say':
                    result = xmlImportService.importSayLists(doc);
                    break;
                case 'body':
                    result = xmlImportService.importBodies(doc);
                    break;
                default:
                    message.warning('无法识别的数据类型');
                    return;
            }
    }

    parseResult.value = result;

    if (result.errors.length > 0) {
        message.warning(`解析完成，但有 ${result.errors.length} 个错误`);
    } else if (result.data.length > 0) {
        message.success(`成功解析 ${result.data.length} 条数据`);
    } else {
        message.warning('未找到有效数据');
    }
}

function getItemTitle(item: any): string {
    return item.cnName || item.name || item.id || '未命名';
}

function getItemDesc(item: any): string {
    if (item.descrip) return item.descrip;
    if (item.says) return `${item.says.length} 条对话`;
    if (item.events) return `${item.events.length} 个事件`;
    if (item.unitOrders) return `${item.unitOrders.length} 个发兵组`;
    return '';
}

function handleImport() {
    if (!parseResult.value?.data.length) return;

    importing.value = true;

    try {
        emit('import', parseResult.value.data);
        message.success(`成功导入 ${parseResult.value.data.length} 条数据`);
        close();
    } catch (e: any) {
        message.error(`导入失败: ${e.message}`);
    } finally {
        importing.value = false;
    }
}

function close() {
    visible.value = false;
}
</script>

<style scoped>
.import-dialog-content {
    padding: 8px 0;
}

.upload-area {
    margin-bottom: 16px;
}

.upload-trigger {
    padding: 24px;
    text-align: center;
}

.upload-text {
    margin: 12px 0 4px;
    font-size: 15px;
    color: rgba(255, 255, 255, 0.8);
}

.upload-hint {
    margin: 0;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.4);
}

.parse-result {
    margin-top: 16px;
}

.result-alert {
    margin-bottom: 12px;
}

.result-stats {
    display: flex;
    gap: 32px;
    margin-top: 8px;
}

.warnings-collapse,
.errors-collapse {
    margin-top: 8px;
}

.preview-title {
    margin: 0 0 12px;
    font-size: 14px;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.7);
}

.preview-list {
    max-height: 200px;
    overflow-y: auto;
}
</style>
