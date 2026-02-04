// client/src/views/Editor/BodyEditor/config/basic.ts

import type { BodyMetaItem } from './types';

export const BODY_BASIC_METAS: BodyMetaItem[] = [
    {
        key: 'name',
        label: '单位 ID (name)',
        type: 'string',
        desc: '内部唯一标识，建议使用英文，如 zombie_a'
    },
    {
        key: 'cnName',
        label: '中文名称 (cnName)',
        type: 'string',
        desc: '游戏中显示的中文名称'
    },
    {
        key: 'systemType',
        label: '系统类型 (systemType)',
        type: 'select',
        desc: '决定单位的基本行为逻辑。普通选 normal，持枪选 hero',
        options: [
            { label: '普通 (normal)', value: 'normal' },
            { label: '持枪 (hero)', value: 'hero' }
        ]
    },
    {
        key: 'raceType',
        label: '种族 (raceType)',
        type: 'select',
        desc: '影响阵营判断和部分生效逻辑',
        options: [
            { label: '人类 (human)', value: 'human' },
            { label: '僵尸 (zombies)', value: 'zombies' },
            { label: '机械 (robot)', value: 'robot' },
            { label: '雪人 (snow)', value: 'snow' },
            { label: '飞船 (ship)', value: 'ship' },
            { label: '石头 (stone)', value: 'stone' }
        ]
    },
    {
        key: 'sex',
        label: '性别 (sex)',
        type: 'select',
        options: [
            { label: '男', value: 'male', desc: '默认性别' },
            { label: '女', value: 'female' }
        ]
    },
    {
        key: 'description',
        label: '描述 (description)',
        type: 'string',
        desc: '备注信息，开发者没用'
    },
    {
        key: 'swfUrl',
        label: 'Flash 资源路径 (swfUrl)',
        type: 'string',
        desc: `Flash 动画资源文件路径。
    小技巧：如果多个单位使用相同的 swfUrl，可能会导致资源加载冲突或卡顿。
    解决方案：在路径后添加参数区分，例如 'swf/enemy/ZombieShoot.swf?v=green'。`
    },
    {
        key: 'swfName',
        label: '资源名称 (swfName)',
        type: 'string',
        desc: 'Flash 资源导出类名。默认同 name。若多个单位共用一个 SWF，需指定不同的类名'
    },
    {
        key: 'bmpUrl',
        label: '位图资源路径 (bmpUrl)',
        type: 'string',
        desc: '静态展示图路径。当 Flash 资源未加载完成时优先显示'
    },
    {
        key: 'headIconUrl',
        label: '头像路径 (headIconUrl)',
        type: 'string',
        desc: '头像图片路径。用于 UI 界面显示'
    },
    {
        key: 'normalScaleX',
        label: '默认缩放 (normalScaleX)',
        type: 'number',
        desc: '水平缩放比例。默认为 1。设为 -1 可使单位默认朝左'
    },
    {
        key: 'lockLeftB',
        label: '锁定朝左 (lockLeftB)',
        type: 'switch',
        desc: '锁定朝向左侧。若为 true，单位将始终面朝左'
    },
    {
        key: 'shell',
        label: '外壳类型 (shell)',
        type: 'string',
        desc: '外壳类型，影响敏感。默认为 variation (变异)'
    },
    {
        key: 'map',
        label: '所属地图 (map)',
        type: 'string',
        desc: '所属地图 ID。用于资源预加载分配，可以留空。'
    },
    {
        key: 'imgType',
        label: '图像类型 (imgType)',
        type: 'string',
        desc: '资源加载方式，默认为 bmp。通常无需修改'
    },
    {
        key: 'imgArr',
        label: '图像数组 (imgArr)',
        type: 'multi_select',
        desc: `图像数组。用于资源预加载分配，具体选项和单位资源相关，这里只列出常见选项。
    若有需求，可自行输入内容后回车创建对应选项。
    可以根据需求调整，standForward,die1 即可满足最小需求。`,
        options: [
            { label: '站立 (stand)', value: 'stand' },
            { label: '移动 (move)', value: 'move' },
            { label: '奔跑 (run)', value: 'run' },
            { label: '站立停止 (standStop)', value: 'standStop' },
            { label: '站立前移 (standForward)', value: 'standForward' },
            { label: '站立后移 (standBack)', value: 'standBack' },
            { label: '蹲下停止 (squatStop)', value: 'squatStop' },
            { label: '蹲下前移 (squatForward)', value: 'squatForward' },
            { label: '蹲下后移 (squatBack)', value: 'squatBack' },
            { label: '普通攻击 (normalAttack)', value: 'normalAttack' },
            { label: '跳起 (__jumpUp)', value: '__jumpUp' },
            { label: '跳跃 (jumpUp)', value: 'jumpUp' },
            { label: '滞空 (jumpUp__jumpDown)', value: 'jumpUp__jumpDown' },
            { label: '落地 (jumpDown)', value: 'jumpDown' },
            { label: '下坠 (jumpDown__)', value: 'jumpDown__' },
            { label: '上升-前 (__fill1_Up)', value: '__fill1_Up' },
            { label: '上升 (fill1_Up)', value: 'fill1_Up' },
            { label: '上升-下降 (fill1_Up__fill1_Down)', value: 'fill1_Up__fill1_Down' },
            { label: '下降 (fill1_Down)', value: 'fill1_Down' },
            { label: '下降-死亡 (fill1_Down__die1)', value: 'fill1_Down__die1' },
            { label: '受伤 (hurt1)', value: 'hurt1' },
            { label: '受伤 (hurt2)', value: 'hurt2' },
            { label: '死亡 (die1)', value: 'die1' },
        ]
    },
    {
        key: 'lowerImgArr',
        label: '下半身图像 (lowerImgArr)',
        type: 'multi_select',
        desc: '下半身独立动画帧，常用：thigh, leg_left, leg_right, foot, belt',
        options: [
            { label: '大腿 (thigh)', value: 'thigh' },
            { label: '左腿 (leg_left)', value: 'leg_left' },
            { label: '右腿 (leg_right)', value: 'leg_right' },
            { label: '左脚 (foot_left)', value: 'foot_left' },
            { label: '右脚 (foot_right)', value: 'foot_right' },
            { label: '腰带 (belt)', value: 'belt' },
        ]
    },

    {
        key: 'flipCtrlBy',
        label: '翻转控制 (flipCtrlBy)',
        type: 'select',
        desc: '决定单位行走时的朝向控制方式',
        options: [
            { label: '无 (no)', value: 'no', desc: '不自动翻转' },
            { label: '目标 (target)', value: 'target', desc: '始终面向目标' },
            { label: '鼠标 (mouse)', value: 'mouse', desc: '跟随鼠标方向（玩家控制）' }
        ]
    },
    {
        key: 'dieEffectPartName',
        label: '死亡特效部位 (dieEffectPartName)',
        type: 'string',
        desc: '播放死亡特效的部位名称，默认为 head'
    },
    {
        key: 'rotateBySlopeB',
        label: '随坡度旋转 (rotateBySlopeB)',
        type: 'switch',
        desc: '是否随地面坡度旋转身体。默认为 false'
    },
    {
        key: 'canBossB',
        label: '可作为Boss (canBossB)',
        type: 'switch',
        desc: '是否允许作为 Boss 出场。默认为 true'
    },
    {
        key: 'extraDropArmsB',
        label: '额外掉落武器 (extraDropArmsB)',
        type: 'switch',
        desc: '死亡是否额外掉落武器。默认为 false'
    },
    {
        key: 'skillArr',
        label: '技能列表 (skillArr)',
        type: 'multi_select',
        desc: '单位技能列表'
    },
    {
        key: 'bossSkillArr',
        label: 'Boss 技能 (bossSkillArr)',
        type: 'multi_select',
        desc: 'Boss 阶段专属技能列表'
    },
    {
        key: 'bossSkillArrCn',
        label: 'Boss 技能中文 (bossSkillArrCn)',
        type: 'multi_select',
        desc: 'Boss 技能中文显示'
    },
    {
        key: 'demBossSkillArr',
        label: '修罗 Boss 技能',
        type: 'multi_select',
        desc: '修罗模式下的 Boss 技能'
    },
];

/** 英雄专属参数 */
export const BODY_HERO_METAS: BodyMetaItem[] = [
    { key: 'armsNumber', label: '武器数量', type: 'number', desc: '持有武器数量槽位。默认为 1' },
    { key: 'movieLink', label: '关联动画 (movieLink)', type: 'string', desc: '外观关联 ID。用于复用其他角色的动画定义' },
    { key: 'headPlayB', label: '头部动画播放 (headPlayB)', type: 'switch', desc: '头部是否独立播放动画' },
    { key: 'squatMaxVx', label: '蹲伏最大速度 (squatMaxVx)', type: 'number', desc: '蹲伏移动时的最大速度' },
    { key: 'aircraft', label: '飞行器 (aircraft)', type: 'string', desc: '飞行器绑定 ID' },
    { key: 'randomArmsRange', label: '随机武器范围', type: 'multi_select', desc: '随机武器 ID 范围，回车创建' },
    { key: 'studyCnNameArr', label: '可学习技能', type: 'multi_select', desc: '可学习技能名称列表，回车创建' },
    { key: 'p1SkillArr', label: '初始技能', type: 'multi_select', desc: 'P1 初始技能列表，回车创建' },
    { key: 'addMoreText', label: '额外描述', type: 'string', desc: '额外描述文本' },
];
