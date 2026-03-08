<!-- client/src/views/components/ModImportDialog.vue -->
<template>
    <n-modal
        v-model:show="visible"
        preset="card"
        title="导入 Mod 文件"
        :style="{ maxWidth: '700px', width: '90vw' }"
        :bordered="false"
        size="huge"
    >
        <div class="import-dialog-content">
            <!-- 步骤指示器 -->
            <n-steps :current="currentStep" size="small" class="steps">
                <n-step title="选择文件" />
                <n-step title="预览数据" />
                <n-step title="确认导入" />
            </n-steps>

            <!-- 步骤1: 文件上传 -->
            <div v-if="currentStep === 1" class="step-content">
                <n-upload
                    v-model:file-list="fileList"
                    accept=".xml"
                    :max="1"
                    @before-upload="handleBeforeUpload"
                    class="upload-area"
                >
                    <n-upload-dragger>
                        <div class="upload-trigger">
                            <n-icon size="48" :depth="3">
                                <FolderOpenOutline />
                            </n-icon>
                            <p class="upload-text">点击或拖拽 XML 文件到此处</p>
                            <p class="upload-hint">支持导入完整的 Mod 文件（包含关卡、对话、单位等）</p>
                        </div>
                    </n-upload-dragger>
                </n-upload>
            </div>

            <!-- 步骤2: 数据预览 -->
            <div v-if="currentStep === 2" class="step-content">
                <div v-if="parseResult" class="preview-section">
                    <!-- 文件信息 -->
                    <n-card title="文件信息" size="small" class="preview-card">
                        <n-descriptions :column="2" size="small">
                            <n-descriptions-item label="ID">{{ parseResult.meta.id || '未设置' }}</n-descriptions-item>
                            <n-descriptions-item label="名称">{{ parseResult.meta.cnName || '未设置' }}</n-descriptions-item>
                            <n-descriptions-item label="作者">{{ parseResult.meta.author || '未设置' }}</n-descriptions-item>
                            <n-descriptions-item label="描述">
                                <n-ellipsis :line-clamp="1">{{ parseResult.meta.description || '无' }}</n-ellipsis>
                            </n-descriptions-item>
                        </n-descriptions>
                    </n-card>

                    <!-- 数据统计 -->
                    <n-card title="数据统计" size="small" class="preview-card">
                        <n-space justify="space-around" class="stat-row">
                            <n-statistic label="关卡数量" :value="parseResult.stats.levelCount">
                                <template #prefix>
                                    <n-icon color="#18a058"><MapOutline /></n-icon>
                                </template>
                            </n-statistic>
                            <n-statistic label="对话数量" :value="parseResult.stats.sayListCount">
                                <template #prefix>
                                    <n-icon color="#70c0e8"><ChatbubbleOutline /></n-icon>
                                </template>
                            </n-statistic>
                            <n-statistic label="单位数量" :value="parseResult.stats.bodyCount">
                                <template #prefix>
                                    <n-icon color="#f2c97d"><PersonOutline /></n-icon>
                                </template>
                            </n-statistic>
                            <n-statistic label="总计" :value="parseResult.stats.totalCount">
                                <template #prefix>
                                    <n-icon><AppsOutline /></n-icon>
                                </template>
                            </n-statistic>
                        </n-space>
                    </n-card>

                    <!-- 详细列表 -->
                    <n-card v-if="parseResult.data.levels.length > 0" title="关卡列表" size="small" class="preview-card">
                        <n-list size="small">
                            <n-list-item v-for="(level, i) in parseResult.data.levels.slice(0, 5)" :key="i">
                                <n-thing :title="level.cnName || level.name" :description="level.descrip"
                                    :title-extra="level.sceneLabel"
                                />
                            </n-list-item>
                            <n-list-item v-if="parseResult.data.levels.length > 5">
                                <n-text depth="3">还有 {{ parseResult.data.levels.length - 5 }} 个关卡...</n-text>
                            </n-list-item>
                        </n-list>
                    </n-card>

                    <n-card v-if="parseResult.data.sayLists.length > 0" title="对话列表" size="small" class="preview-card">
                        <n-list size="small">
                            <n-list-item v-for="(sayList, i) in parseResult.data.sayLists.slice(0, 5)" :key="i">
                                <n-thing :title="sayList.name"
                                    :description="`${sayList.arr?.length || 0} 条对话`"
                                    :title-extra="sayList.levelName"
                                />
                            </n-list-item>
                            <n-list-item v-if="parseResult.data.sayLists.length > 5">
                                <n-text depth="3">还有 {{ parseResult.data.sayLists.length - 5 }} 个对话组...</n-text>
                            </n-list-item>
                        </n-list>
                    </n-card>

                    <n-card v-if="parseResult.data.bodies.length > 0" title="单位列表" size="small" class="preview-card">
                        <n-list size="small">
                            <n-list-item v-for="(body, i) in parseResult.data.bodies.slice(0, 5)" :key="i">
                                <n-thing :title="body.cnName || body.name" :description="body.raceType"
                                    :title-extra="body.movieLink"
                                />
                            </n-list-item>
                            <n-list-item v-if="parseResult.data.bodies.length > 5">
                                <n-text depth="3">还有 {{ parseResult.data.bodies.length - 5 }} 个单位...</n-text>
                            </n-list-item>
                        </n-list>
                    </n-card>

                    <!-- 警告和错误 -->
                    <n-alert v-if="parseResult.warnings.length > 0" type="warning" title="警告" class="preview-alert"
                    >
                        <n-list size="small">
                            <n-list-item v-for="(warning, i) in parseResult.warnings" :key="i">
                                {{ warning }}
                            </n-list-item>
                        </n-list>
                    </n-alert>

                    <n-alert v-if="parseResult.errors.length > 0" type="error" title="错误" class="preview-alert"
                    >
                        <n-list size="small">
                            <n-list-item v-for="(error, i) in parseResult.errors" :key="i">
                                {{ error }}
                            </n-list-item>
                        </n-list>
                    </n-alert>
                </div>
            </div>

            <!-- 步骤3: 导入完成 -->
            <div v-if="currentStep === 3" class="step-content result-step">
                <n-result
                    status="success"
                    title="导入成功"
                    :description="`成功导入 ${importedCount} 条数据`"
                >
                    <template #default>
                        <n-space vertical align="center">
                            <n-tag v-if="importedLevels > 0" type="success">关卡: {{ importedLevels }} 个</n-tag>
                            <n-tag v-if="importedSayLists > 0" type="info">对话: {{ importedSayLists }} 个</n-tag>
                            <n-tag v-if="importedBodies > 0" type="warning">单位: {{ importedBodies }} 个</n-tag>
                        </n-space>
                    </template>
                    <template #footer>
                        <n-button type="primary" @click="close">完成</n-button>
                    </template>
                </n-result>
            </div>
        </div>

        <!-- 底部按钮 -->
        <template v-if="currentStep !== 3" #footer>
            <n-space justify="end">
                <n-button v-if="currentStep === 1" @click="close">取消</n-button>
                <n-button v-if="currentStep === 2" @click="currentStep = 1">上一步</n-button>
                <n-button
                    v-if="currentStep === 2"
                    type="primary"
                    :disabled="!canImport"
                    :loading="importing"
                    @click="handleImport"
                >
                    确认导入
                </n-button>
            </n-space>
        </template>
    </n-modal>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import {
    NModal,
    NSteps,
    NStep,
    NUpload,
    NUploadDragger,
    NIcon,
    NCard,
    NDescriptions,
    NDescriptionsItem,
    NEllipsis,
    NStatistic,
    NSpace,
    NList,
    NListItem,
    NText,
    NThing,
    NTag,
    NAlert,
    NButton,
    NResult,
    useMessage
} from 'naive-ui';
import {
    FolderOpenOutline,
    MapOutline,
    ChatbubbleOutline,
    PersonOutline,
    AppsOutline
} from '@vicons/ionicons5';
import { modImportService, type ModImportResult } from '../../services/ModImportService';
import { useModStore } from '../../store/useModStore';

const props = defineProps<{
    show: boolean;
}>();

const emit = defineEmits<{
    'update:show': [value: boolean];
}>();

const message = useMessage();
const modStore = useModStore();

const currentStep = ref(1);
const fileList = ref<any[]>([]);
const parseResult = ref<ModImportResult | null>(null);
const importing = ref(false);

// 导入统计
const importedCount = ref(0);
const importedLevels = ref(0);
const importedSayLists = ref(0);
const importedBodies = ref(0);

const visible = computed({
    get: () => props.show,
    set: (val) => emit('update:show', val)
});

const canImport = computed(() => {
    return parseResult.value?.success && parseResult.value.stats.totalCount > 0;
});

// 监听显示状态，重置数据
watch(() => props.show, (val) => {
    if (val) {
        resetState();
    }
});

function resetState() {
    currentStep.value = 1;
    fileList.value = [];
    parseResult.value = null;
    importing.value = false;
    importedCount.value = 0;
    importedLevels.value = 0;
    importedSayLists.value = 0;
    importedBodies.value = 0;
}

function handleBeforeUpload(options: any) {
    const file = options.file;

    const reader = new FileReader();
    reader.onload = (e) => {
        const content = e.target?.result as string;
        parseModFile(content);
    };
    reader.onerror = () => {
        message.error('读取文件失败');
    };
    reader.readAsText(file);

    return false;
}

function parseModFile(content: string) {
    const result = modImportService.parseModFile(content);
    parseResult.value = result;

    if (result.errors.length > 0 && !result.success) {
        message.error(`解析失败: ${result.errors[0]}`);
        return;
    }

    if (result.stats.totalCount === 0) {
        message.warning('未找到可导入的数据');
        return;
    }

    message.success(`解析成功，发现 ${result.stats.totalCount} 条数据`);
    currentStep.value = 2;
}

async function handleImport() {
    if (!parseResult.value?.data) return;

    importing.value = true;

    try {
        const data = parseResult.value.data;

        // 导入关卡
        if (data.levels.length > 0) {
            for (const level of data.levels) {
                modStore.levelList.push(level);
            }
            importedLevels.value = data.levels.length;
        }

        // 导入对话
        if (data.sayLists.length > 0) {
            for (const sayList of data.sayLists) {
                modStore.sayList.push(sayList);
            }
            importedSayLists.value = data.sayLists.length;
        }

        // 导入单位
        if (data.bodies.length > 0) {
            for (const body of data.bodies) {
                modStore.bodyList.push(body);
            }
            importedBodies.value = data.bodies.length;
        }

        importedCount.value = importedLevels.value + importedSayLists.value + importedBodies.value;

        // 更新项目元数据
        if (parseResult.value.meta.id) {
            modStore.info.id = parseResult.value.meta.id;
        }
        if (parseResult.value.meta.cnName) {
            modStore.info.cnName = parseResult.value.meta.cnName;
        }
        if (parseResult.value.meta.author) {
            modStore.info.author = parseResult.value.meta.author;
        }
        if (parseResult.value.meta.description) {
            modStore.info.description = parseResult.value.meta.description;
        }

        currentStep.value = 3;
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
    padding: 16px 0;
}

.steps {
    margin-bottom: 24px;
    padding: 0 16px;
}

.step-content {
    min-height: 300px;
}

.upload-area {
    margin: 24px 0;
}

.upload-trigger {
    padding: 40px 24px;
    text-align: center;
}

.upload-text {
    margin: 16px 0 8px;
    font-size: 16px;
    color: rgba(255, 255, 255, 0.8);
}

.upload-hint {
    margin: 0;
    font-size: 13px;
    color: rgba(255, 255, 255, 0.4);
}

.preview-section {
    display: flex;
    flex-direction: column;
    gap: 12px;
    max-height: 500px;
    overflow-y: auto;
    padding-right: 8px;
}

.preview-card {
    margin-bottom: 8px;
}

.stat-row {
    padding: 8px 0;
}

.preview-alert {
    margin-top: 8px;
}

.result-step {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px 0;
}
</style>
