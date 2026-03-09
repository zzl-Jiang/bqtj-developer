<!-- client/src/views/components/ModImportDialog.vue -->
<template>
    <n-modal
        v-model:show="visible"
        preset="card"
        title="导入关卡集文件"
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
                            <p class="upload-hint">支持导入完整的关卡集文件（包含关卡、对话、单位等）</p>
                        </div>
                    </n-upload-dragger>
                </n-upload>
            </div>

            <!-- 步骤2: 数据预览 -->
            <div v-if="currentStep === 2" class="step-content">
                <div v-if="parseResult" class="preview-section">
                    <!-- 文件信息 -->
                    <n-card title="文件信息" size="small" class="preview-card">
                        <n-grid :cols="2" :x-gap="16" :y-gap="8">
                            <n-grid-item>
                                <n-text depth="3">ID</n-text>
                                <div>{{ parseResult.meta.id || '未设置' }}</div>
                            </n-grid-item>
                            <n-grid-item>
                                <n-text depth="3">名称</n-text>
                                <div>{{ parseResult.meta.cnName || '未设置' }}</div>
                            </n-grid-item>
                            <n-grid-item>
                                <n-text depth="3">作者</n-text>
                                <div>{{ parseResult.meta.author || '未设置' }}</div>
                            </n-grid-item>
                            <n-grid-item>
                                <n-text depth="3">描述</n-text>
                                <n-ellipsis :line-clamp="1">{{ parseResult.meta.description || '无' }}</n-ellipsis>
                            </n-grid-item>
                        </n-grid>
                    </n-card>

                    <!-- 数据统计 -->
                    <n-card title="数据统计" size="small" class="preview-card">
                        <n-grid :cols="4" :x-gap="8" :y-gap="16" class="stat-row">
                            <n-grid-item>
                                <n-statistic label="关卡" :value="parseResult.stats.levelCount">
                                    <template #prefix>
                                        <n-icon color="#18a058"><MapOutline /></n-icon>
                                    </template>
                                </n-statistic>
                            </n-grid-item>
                            <n-grid-item>
                                <n-statistic label="对话" :value="parseResult.stats.sayListCount">
                                    <template #prefix>
                                        <n-icon color="#70c0e8"><ChatbubbleOutline /></n-icon>
                                    </template>
                                </n-statistic>
                            </n-grid-item>
                            <n-grid-item>
                                <n-statistic label="单位" :value="parseResult.stats.bodyCount">
                                    <template #prefix>
                                        <n-icon color="#f2c97d"><PersonOutline /></n-icon>
                                    </template>
                                </n-statistic>
                            </n-grid-item>
                            <n-grid-item>
                                <n-statistic label="技能" :value="parseResult.stats.skillCount">
                                    <template #prefix>
                                        <n-icon color="#ff69b4"><FlashOutline /></n-icon>
                                    </template>
                                </n-statistic>
                            </n-grid-item>
                            <n-grid-item>
                                <n-statistic label="武器" :value="parseResult.stats.armsCount">
                                    <template #prefix>
                                        <n-icon color="#ff8c00"><HammerOutline /></n-icon>
                                    </template>
                                </n-statistic>
                            </n-grid-item>
                            <n-grid-item>
                                <n-statistic label="子弹" :value="parseResult.stats.bulletCount">
                                    <template #prefix>
                                        <n-icon color="#a0a0a0"><CubeOutline /></n-icon>
                                    </template>
                                </n-statistic>
                            </n-grid-item>
                            <n-grid-item>
                                <n-statistic label="图片" :value="parseResult.stats.pngCount">
                                    <template #prefix>
                                        <n-icon color="#00ced1"><ImagesOutline /></n-icon>
                                    </template>
                                </n-statistic>
                            </n-grid-item>
                            <n-grid-item>
                                <n-statistic label="掉落" :value="parseResult.stats.dropCount">
                                    <template #prefix>
                                        <n-icon color="#dda0dd"><LayersOutline /></n-icon>
                                    </template>
                                </n-statistic>
                            </n-grid-item>
                        </n-grid>
                        <n-divider />
                        <n-space justify="center">
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

                    <n-card v-if="parseResult.data.skills.length > 0" title="技能列表" size="small" class="preview-card">
                        <n-list size="small">
                            <n-list-item v-for="(skill, i) in parseResult.data.skills.slice(0, 5)" :key="i">
                                <n-thing :title="skill.cnName || skill.name" :description="skill.effectType"
                                    :title-extra="skill.conditionType"
                                />
                            </n-list-item>
                            <n-list-item v-if="parseResult.data.skills.length > 5">
                                <n-text depth="3">还有 {{ parseResult.data.skills.length - 5 }} 个技能...</n-text>
                            </n-list-item>
                        </n-list>
                    </n-card>

                    <n-card v-if="parseResult.data.arms.length > 0" title="武器列表" size="small" class="preview-card">
                        <n-list size="small">
                            <n-list-item v-for="(arms, i) in parseResult.data.arms.slice(0, 5)" :key="i">
                                <n-thing :title="arms.cnName || arms.name" :description="arms.armsType"
                                    :title-extra="arms.color"
                                />
                            </n-list-item>
                            <n-list-item v-if="parseResult.data.arms.length > 5">
                                <n-text depth="3">还有 {{ parseResult.data.arms.length - 5 }} 个武器...</n-text>
                            </n-list-item>
                        </n-list>
                    </n-card>

                    <n-card v-if="parseResult.data.bullets.length > 0" title="子弹列表" size="small" class="preview-card">
                        <n-list size="small">
                            <n-list-item v-for="(bullet, i) in parseResult.data.bullets.slice(0, 5)" :key="i">
                                <n-thing :title="bullet.cnName || bullet.name" :description="bullet.hitType"
                                    :title-extra="bullet.attackType"
                                />
                            </n-list-item>
                            <n-list-item v-if="parseResult.data.bullets.length > 5">
                                <n-text depth="3">还有 {{ parseResult.data.bullets.length - 5 }} 个子弹...</n-text>
                            </n-list-item>
                        </n-list>
                    </n-card>

                    <n-card v-if="parseResult.data.pngs.length > 0" title="图片列表" size="small" class="preview-card">
                        <n-list size="small">
                            <n-list-item v-for="(png, i) in parseResult.data.pngs.slice(0, 5)" :key="i">
                                <n-thing :title="png.name" :description="png.url" />
                            </n-list-item>
                            <n-list-item v-if="parseResult.data.pngs.length > 5">
                                <n-text depth="3">还有 {{ parseResult.data.pngs.length - 5 }} 个图片...</n-text>
                            </n-list-item>
                        </n-list>
                    </n-card>

                    <n-card v-if="parseResult.data.drops.length > 0" title="掉落列表" size="small" class="preview-card">
                        <n-list size="small">
                            <n-list-item v-for="(drop, i) in parseResult.data.drops.slice(0, 5)" :key="i">
                                <n-thing :title="drop.cnName || drop.name" :description="drop.secType"
                                    :title-extra="drop.type"
                                />
                            </n-list-item>
                            <n-list-item v-if="parseResult.data.drops.length > 5">
                                <n-text depth="3">还有 {{ parseResult.data.drops.length - 5 }} 个掉落...</n-text>
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
                            <n-space v-if="importedLevels > 0" justify="center">
                                <n-tag type="success">关卡: {{ importedLevels }} 个</n-tag>
                            </n-space>
                            <n-space v-if="importedSayLists > 0" justify="center">
                                <n-tag type="info">对话: {{ importedSayLists }} 个</n-tag>
                            </n-space>
                            <n-space v-if="importedBodies > 0" justify="center">
                                <n-tag type="warning">单位: {{ importedBodies }} 个</n-tag>
                            </n-space>
                            <n-space v-if="importedSkills > 0" justify="center">
                                <n-tag type="error">技能: {{ importedSkills }} 个</n-tag>
                            </n-space>
                            <n-space v-if="importedArms > 0" justify="center">
                                <n-tag type="warning">武器: {{ importedArms }} 个</n-tag>
                            </n-space>
                            <n-space v-if="importedBullets > 0" justify="center">
                                <n-tag>子弹: {{ importedBullets }} 个</n-tag>
                            </n-space>
                            <n-space v-if="importedPngs > 0" justify="center">
                                <n-tag type="info">图片: {{ importedPngs }} 个</n-tag>
                            </n-space>
                            <n-space v-if="importedDrops > 0" justify="center">
                                <n-tag type="success">掉落: {{ importedDrops }} 个</n-tag>
                            </n-space>
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
import { plainToInstance } from 'class-transformer';
import {
    NModal,
    NSteps,
    NStep,
    NUpload,
    NUploadDragger,
    NIcon,
    NCard,
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
    NGrid,
    NGridItem,
    NDivider,
    useMessage
} from 'naive-ui';
import {
    FolderOpenOutline,
    MapOutline,
    ChatbubbleOutline,
    PersonOutline,
    AppsOutline,
    FlashOutline,
    HammerOutline,
    ImagesOutline,
    CubeOutline,
    LayersOutline
} from '@vicons/ionicons5';
import { modImportService, type ModImportResult } from '../../services/ModImportService';
import { useModStore } from '../../store/useModStore';
import { LevelDefine } from '../../models/level/LevelDefine';
import { SayListDefine } from '../../models/say/SayListDefine';
import { BodyDefine } from '../../models/body/BodyDefine';
import { SkillDefine } from '../../models/skill/SkillDefine';
import { SkillTargetDefine } from '../../models/skill/SkillTargetDefine';
import { ArmsDefine } from '../../models/arms/ArmsDefine';
import { BulletDefine } from '../../models/bullet/BulletDefine';
import { PngDefine } from '../../models/png/PngDefine';
import { DropDefine } from '../../models/drop/DropDefine';

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
const importedSkills = ref(0);
const importedArms = ref(0);
const importedBullets = ref(0);
const importedPngs = ref(0);
const importedDrops = ref(0);

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
    importedSkills.value = 0;
    importedArms.value = 0;
    importedBullets.value = 0;
    importedPngs.value = 0;
    importedDrops.value = 0;
}

function handleBeforeUpload(options: any) {
    // Naive UI的file是UploadFileInfo对象，实际File在file属性中
    const fileInfo = options.file;
    const actualFile = fileInfo.file || fileInfo;

    if (!actualFile) {
        message.error('文件对象无效');
        return false;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        const content = e.target?.result as string;
        parseModFile(content);
    };
    reader.onerror = () => {
        message.error('读取文件失败');
    };
    reader.readAsText(actualFile);

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
            for (const levelData of data.levels) {
                const level = plainToInstance(LevelDefine, levelData);
                modStore.levelList.push(level);
            }
            importedLevels.value = data.levels.length;
        }

        // 导入对话
        if (data.sayLists.length > 0) {
            for (const sayListData of data.sayLists) {
                const sayList = plainToInstance(SayListDefine, sayListData);
                modStore.sayList.push(sayList);
            }
            importedSayLists.value = data.sayLists.length;
        }

        // 导入单位
        if (data.bodies.length > 0) {
            for (const bodyData of data.bodies) {
                const body = plainToInstance(BodyDefine, bodyData);
                modStore.bodyList.push(body);
            }
            importedBodies.value = data.bodies.length;
        }

        // 导入技能 (使用 plainToInstance 确保嵌套对象正确转换)
        if (data.skills.length > 0) {
            console.log(`[Import Debug] 开始导入 ${data.skills.length} 个技能`);
            for (let i = 0; i < data.skills.length; i++) {
                const skillData = data.skills[i]!;
                console.log(`[Import Debug] 技能 ${i} 转换前:`, {
                    name: skillData.name,
                    target: (skillData as any).target,
                    targetType: typeof (skillData as any).target,
                    targetConstructor: (skillData as any).target?.constructor?.name
                });

                const skill = plainToInstance(SkillDefine, skillData);
                console.log(`[Import Debug] 技能 ${i} plainToInstance 后:`, {
                    name: skill.name,
                    target: skill.target,
                    targetType: typeof skill.target,
                    targetConstructor: skill.target?.constructor?.name,
                    isSkillTargetDefine: skill.target instanceof SkillTargetDefine
                });

                // 确保 target 是 SkillTargetDefine 实例
                if (skill.target && typeof skill.target === 'object' && !(skill.target instanceof SkillTargetDefine)) {
                    console.log(`[Import Debug] 技能 ${i} 需要转换 target`);
                    const targetObj = skill.target as Record<string, any>;
                    skill.target = plainToInstance(SkillTargetDefine, targetObj);
                    console.log(`[Import Debug] 技能 ${i} target 转换后:`, {
                        target: skill.target,
                        targetConstructor: skill.target?.constructor?.name,
                        isSkillTargetDefine: skill.target instanceof SkillTargetDefine,
                        hasToXml: typeof (skill.target as any)?.toXml === 'function'
                    });
                }

                modStore.skillList.push(skill);
            }
            importedSkills.value = data.skills.length;
            console.log(`[Import Debug] 技能导入完成，共 ${data.skills.length} 个`);
        }

        // 导入武器
        if (data.arms.length > 0) {
            for (const armsData of data.arms) {
                const arms = plainToInstance(ArmsDefine, armsData);
                modStore.armsList.push(arms);
            }
            importedArms.value = data.arms.length;
        }

        // 导入子弹
        if (data.bullets.length > 0) {
            for (const bulletData of data.bullets) {
                const bullet = plainToInstance(BulletDefine, bulletData);
                modStore.bulletList.push(bullet);
            }
            importedBullets.value = data.bullets.length;
        }

        // 导入图片
        if (data.pngs.length > 0) {
            for (const pngData of data.pngs) {
                const png = plainToInstance(PngDefine, pngData);
                modStore.pngList.push(png);
            }
            importedPngs.value = data.pngs.length;
        }

        // 导入掉落
        if (data.drops.length > 0) {
            for (const dropData of data.drops) {
                const drop = plainToInstance(DropDefine, dropData);
                modStore.dropList.push(drop);
            }
            importedDrops.value = data.drops.length;
        }

        importedCount.value = importedLevels.value + importedSayLists.value + importedBodies.value +
            importedSkills.value + importedArms.value + importedBullets.value +
            importedPngs.value + importedDrops.value;

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
