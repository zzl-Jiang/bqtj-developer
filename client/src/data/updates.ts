// client/src/data/updates.ts

import type { Changelog, LogBlock } from '../types/changelog';

// 导入功能v0.7.0更新内容
const V070_BLOCKS: LogBlock[] = [
  { type: 'title', content: 'XML导入功能' },
  { type: 'text', content: '新增XML导入功能，支持从外部文件导入关卡、对话、单位等数据。可以直接导入原版示例文件或其他编辑器创建的XML文件，方便用户继续编辑和修改。' },
  {
    type: 'feature',
    title: '通用XML解析器',
    desc: '新增XmlImportService服务，支持解析标准关卡文件格式(<data><father><gather>...)。自动检测文件类型，将外部XML转换为编辑器内部模型。',
    tag: '核心'
  },
  {
    type: 'feature',
    title: '关卡数据导入',
    desc: '支持导入关卡定义，包括基础属性(name/cnName/descrip)、场景标签(sceneLabel)、关卡信息(info)、发兵组(unitG)、区域(rectG)、事件(eventG)等完整配置。',
    tag: '关卡'
  },
  {
    type: 'feature',
    title: '对话数据导入',
    desc: '支持导入对话列表(sayList)，自动解析对话目标(target)和内容(content)，转换为编辑器对话模型。',
    tag: '对话'
  },
  {
    type: 'feature',
    title: '单位数据导入',
    desc: '支持导入单位定义(body)，包括基础信息(name/cnName/raceType)、运动属性(maxVx)、AI配置(armsNumber/skillArr)、碰撞体积(hitRect)等。',
    tag: '单位'
  },
  {
    type: 'feature',
    title: '可视化导入界面',
    desc: '新增ImportDialog组件，提供拖拽上传、解析预览、错误提示等功能。支持在关卡、对话、单位编辑器中通过"导入XML"按钮打开。',
    tag: 'UI'
  },
  {
    type: 'action',
    label: '前往试用',
    module: 'level'
  }
];

export const UPDATES_DATA: Changelog[] = [
  {
    version: 'v0.7.0',
    date: '2026-03-08',
    isMajor: true,
    blocks: V070_BLOCKS
  },
  {
    version: 'v0.6.5',
    date: '2026-03-08',
    isMajor: false,
    blocks: [
      { type: 'title', content: '响应式设计全面改造' },
      { type: 'text', content: '本次更新实现了全设备的响应式适配，确保编辑器在电脑、平板、手机等各种屏幕尺寸下都能正常使用。从核心布局到表单网格、从导航栏到向导卡片，所有界面元素都进行了响应式优化。' },
      {
        type: 'feature',
        title: '响应式断点系统',
        desc: '新增 useResponsive Hook，提供统一的断点检测：移动端(<768px)、平板(768-1024px)、桌面(>=1024px)。所有组件共享同一套断点逻辑，确保响应式行为一致。',
        tag: '架构'
      },
      {
        type: 'feature',
        title: '核心布局响应式改造',
        desc: 'EditorLayout 组件支持移动端抽屉模式，侧边栏在窄屏下自动切换为左侧抽屉。DashboardNav 导航栏支持自动换行和响应式字号。ModuleSidebar 在中等屏幕下自动调整宽度(200-260px)。',
        tag: '布局'
      },
      {
        type: 'feature',
        title: '表单网格自适应',
        desc: '所有编辑器模块的表单网格统一改为响应式布局：手机单列(s:1)、小平板双列(s:2)、桌面三列(m:3)、大屏四列(l:4)。涉及武器、子弹、技能、关卡、对话、掉落、图片等全部编辑器。',
        tag: '表单'
      },
      {
        type: 'feature',
        title: '向导模式紧凑布局',
        desc: 'WizardPanel 分类卡片网格在 1400px 以下改为三列、1200px 以下双列、900px 以下单列。小屏幕下(640px)卡片隐藏描述和进度条，仅显示图标和标题，大幅节省垂直空间。',
        tag: '向导'
      },
      {
        type: 'feature',
        title: '抽屉组件全屏适配',
        desc: '所有复杂字段编辑器抽屉在移动端自动全屏显示，避免内容溢出。事件编辑、单位配置、XML预览等抽屉组件都支持 `isMobile ? "100%" : 650` 的自适应宽度。',
        tag: '移动端'
      },
      {
        type: 'feature',
        title: '中等屏幕优化',
        desc: '针对 768-1023px 的平板设备特别优化：侧边栏宽度调整为 240px、帮助面板缩小至 220px、卡片内边距适当减小，在有限宽度下最大化内容显示区域。',
        tag: '平板'
      }
    ]
  },
  {
    version: 'v0.6.4',
    date: '2026-03-07',
    isMajor: false,
    blocks: [
      { type: 'title', content: '配置系统重构与关卡指令优化' },
      { type: 'text', content: '本次更新对所有编辑器模块的配置文件夹进行了全面重构，统一命名规范；同时根据 LevelDefine.as 参考代码完善了关卡事件指令系统，优化指令选择交互体验。' },
      {
        type: 'feature',
        title: '统一命名规范',
        desc: '所有模块配置文件夹统一采用标准化文件结构：types.ts（类型定义）、fields.ts（字段配置）、options.ts（选项配置）、wizard.ts（向导配置）、index.ts（统一导出）。导出命名统一为 {MODULE}_{CATEGORY}_FIELDS 格式。',
        tag: '架构'
      },
      {
        type: 'feature',
        title: '提取共享类型',
        desc: '新建 sharedTypes.ts 定义全局共享类型（FieldMetaItem、CategoryConfig、ImportanceLevel 等），消除各模块间的类型重复定义，实现类型复用。',
        tag: '类型系统'
      },
      {
        type: 'feature',
        title: '配置合并与简化',
        desc: '将分散在多个文件中的字段配置合并为统一的 fields.ts。BodyEditor 合并 5 个文件，BulletEditor 合并 5 个文件，LevelEditor 合并 5 个文件，SkillEditor 合并 4 个文件，显著减少文件数量。',
        tag: '重构'
      },
      {
        type: 'feature',
        title: '关卡指令系统完善',
        desc: '根据 LevelDefine.as 参考代码补充核心指令：createUnit（创建单位）、createDrop（创建掉落）、createEffect（创建特效）、cameraFocus（镜头聚焦）等。新增开关倒计时、血条显示控制、镜头控制等实用指令。',
        tag: '关卡编辑'
      },
      {
        type: 'feature',
        title: '指令选择器两级交互',
        desc: '优化 OrderBuilder 指令选择体验：第一级选择分类（图像效果/系统操作/群体控制/单位操作/关卡控制），第二级选择具体指令。解决原单选框选项过多（44个）难以查找的问题。',
        tag: '体验'
      },
      {
        type: 'feature',
        title: '智能参数输入提示',
        desc: '为常用指令添加参数占位提示：createUnit 提示"发兵组ID"、addWeather 提示"天气类型;强度;持续时间"、movePoint 提示"x,y坐标"等，降低指令编写难度。',
        tag: '体验'
      },
      {
        type: 'feature',
        title: '侧边栏选中修复',
        desc: '修复点击"+"新建项目后左侧栏不会自动高亮选中的问题。原因是 menu key（字符串）与 selectedIndex（数字）类型不匹配，现统一兼容处理。',
        tag: '修复'
      },
      {
        type: 'list', content: [
          'ArmsEditor/DropEditor/PngEditor/SayEditor 重命名配置文件为 fields.ts',
          '统一使用 index.ts 作为配置入口（barrel export 模式）',
          '修复所有 Vue 组件的导入路径，统一从 ./config 导入',
          '添加必要的别名导出以兼容现有代码',
          '单位操作指令统一归入"单位操作"分类，不再分散到子分类',
          '简单指令使用统一参数输入框，复杂指令保留表单字段',
          '构建测试通过，无 TypeScript 错误'
        ]
      }
    ]
  },
  {
    version: 'v0.6.3',
    date: '2026-03-07',
    isMajor: false,
    blocks: [
      { type: 'title', content: '全局布局重构：释放编辑器空间' },
      { type: 'text', content: '本次更新统一了所有编辑器模块的布局结构，将右侧面板功能整合至左侧，为中央编辑区腾出更多空间，提升编辑体验。' },
      {
        type: 'feature',
        title: '双栏布局统一',
        desc: '所有模块（技能/武器/子弹/单位/关卡/掉落/对话/图片）统一采用左侧列表+中央编辑区的双栏布局，移除固定的右侧面板，中央区域最大宽度从1000px扩展至1200px。',
        tag: '布局'
      },
      {
        type: 'feature',
        title: 'XML预览抽屉化',
        desc: 'XML预览从固定右侧面板改为抽屉弹窗，点击左侧底部"查看XML"按钮从右侧滑出，支持复制代码，不占用常驻空间。',
        tag: '交互'
      },
      {
        type: 'feature',
        title: '列表项快捷删除',
        desc: '删除按钮从底部移到每个列表项末尾，鼠标悬停时显示，带确认弹窗，操作更直观高效。',
        tag: '体验'
      },
      {
        type: 'feature',
        title: 'SkillEditor视觉资源',
        desc: '向导模式新增"视觉资源"分类，支持7种图片特效的配置入口，与专业模式保持一致。',
        tag: '编辑器'
      },
      {
        type: 'list', content: [
          '统一8个编辑器模块的侧边栏交互（ModuleSidebar）',
          'EditorLayout改为grid-cols-2两栏布局',
          '修复VisualSection未配置状态的空值报错',
          'ModuleSidebar支持string|number类型的key',
          '所有模块支持通过左侧底部按钮打开XML预览抽屉'
        ]
      }
    ]
  },
  {
    version: 'v0.6.2',
    date: '2026-03-07',
    isMajor: false,
    blocks: [
      { type: 'title', content: '向导模式上线：降低编辑器使用门槛' },
      { type: 'text', content: '针对不熟悉游戏源码的普通玩家，ArmsEditor 新增向导模式。通过卡片式分类导航、重要性分级、详细帮助文档，让武器编辑变得简单直观。' },
      {
        type: 'feature',
        title: 'ArmsEditor 向导模式',
        desc: '新增向导模式，与专业模式并存。7个分类卡片（基础属性、核心战斗、伤害系统、运动特效、行为标志、视觉资源、进阶配置），每个显示完成度和字段计数。',
        tag: '编辑器'
      },
      {
        type: 'feature',
        title: '字段重要性分级',
        desc: '所有字段按重要程度标记：核心（必须配置）、进阶（可选增强）、可选（细节调整）。帮助用户优先关注关键属性。',
        tag: '体验'
      },
      {
        type: 'feature',
        title: '内置帮助系统',
        desc: '右侧帮助面板显示分类说明、字段详细解释、示例值。集成 huijiwiki 链接，可跳转到更详细的教程页面。',
        tag: '文档'
      },
      {
        type: 'list', content: [
          '分类卡片展示配置进度条（实时更新）',
          '字段卡片显示当前值或"未配置"状态',
          '点击字段弹出编辑对话框，支持详细说明查看',
          '筛选栏可按重要性和关键词搜索字段',
          '扩展 BulletMetaItem 类型，支持 group/importance/docContent/wikiLink 等字段'
        ]
      },
      { type: 'action', label: '体验向导模式', module: 'arms' }
    ]
  },
  {
    version: 'v0.6.1',
    date: '2026-03-07',
    isMajor: false,
    blocks: [
      { type: 'title', content: '属性补全与编辑器优化' },
      { type: 'text', content: '本次更新根据 materials 参考代码补全了 Drop、Bullet、Arms 模块的缺失属性，并重构了 ArmsEditor 的布局以提升编辑体验。' },
      {
        type: 'feature',
        title: '数据模型属性补全',
        desc: '补全 DropDefine 掉率属性（normalPro/superPro/bossPro/itemsLvRange）。为所有 Bullet 子对象类（暴击、反弹、追踪、爆炸、绑定、射线、速度、位置）添加 toXml() 方法，确保 XML 导出数据完整。',
        tag: '数据'
      },
      {
        type: 'feature',
        title: 'ArmsEditor 布局重构',
        desc: '新增"子弹特性"标签页，将 80+ 继承自 Bullet 的属性独立展示。战斗设定标签页精简为仅展示 Arms 特有属性。通过 5 个折叠区组织子弹属性：伤害效果、行为标志、生命周期、发射运动、技能特效。',
        tag: '编辑器'
      },
      {
        type: 'feature',
        title: 'BulletEditor & DropEditor 增强',
        desc: 'BulletEditor 新增加特林模式配置区。DropEditor 新增掉率配置字段。完善各类字段的中文说明与图标标识。',
        tag: '编辑器'
      },
      {
        type: 'list', content: [
          'ArmsDefine 完善 toXml() 导出所有继承自 Bullet 的属性',
          'BulletDefine 在 toXml() 中集成所有子对象的 XML 导出',
          '优化编辑器配置文件的类型定义，解决 concat 类型兼容问题',
          '更新 .gitignore 添加 claude.md 忽略',
          '构建测试通过，无 TypeScript 错误'
        ]
      },
      { type: 'action', label: '查看更新后的武器编辑器', module: 'arms' }
    ]
  },
  {
    version: 'v0.6.0',
    date: '2026-03-07',
    isMajor: true,
    blocks: [
      { type: 'title', content: '武器系统深度重构：弹道与战斗机制建模' },
      { type: 'text', content: '本次更新完成了武器与子弹系统的深度建模，实现了从通用表单到专业战斗编辑器的跨越。子弹系统现在支持完整的物理行为建模，包括追踪、反弹、暴击、爆炸等高级机制。' },
      {
        type: 'feature',
        title: '子弹深度编辑器 (BulletEditor)',
        desc: '告别通用表单，新增专属子弹编辑器。支持分模块编辑子弹的生命周期、碰撞检测、发射属性、运动学参数以及各类特殊效果。',
        tag: '核心'
      },
      {
        type: 'feature',
        title: '武器专业编辑器 (ArmsEditor)',
        desc: '新增武器专用编辑器，整合弹夹容量、换弹时间、后坐力、枪口抖动等战斗属性。支持弩箭模式与武器记录数据的高级配置。',
        tag: '核心'
      },
      {
        type: 'feature',
        title: '子弹行为模型库',
        desc: '建立了完整的子弹行为数据模型体系：暴击 (BulletCritDefine)、反弹 (BulletBounceDefine)、追踪 (BulletFollowDefine)、爆炸 (BulletBoomDefine)、绑定 (BulletBindingDefine)、直线 (BulletLineDefine)、速度变化 (BulletSpeedDefine) 等。',
        tag: '架构'
      },
      {
        type: 'feature',
        title: '掉落编辑器 (DropEditor)',
        desc: '新增掉落系统编辑器，支持配置物品掉落规则与概率分布，完善 Mod 的游戏性设计能力。',
        tag: '新增'
      },
      {
        type: 'list', content: [
          '扩展 ArmsDefine 模型，新增弩箭配置 (crossbowD) 与武器记录数据 (recordD)',
          '完善 BulletDefine 模型，新增速度变化与位置组的嵌套支持',
          '优化 MetaFormItem 组件，增强对复杂嵌套对象的处理能力',
          '更新 .gitignore，排除 .claude/ 辅助工具目录',
          '修正 server/tsconfig.json 编译配置'
        ]
      },
      { type: 'action', label: '设计你的专属武器', module: 'arms' }
    ]
  },
  {
    version: 'v0.5.0',
    date: '2026-03-05',
    isMajor: true,
    blocks: [
      { type: 'title', content: '视觉与感官深度重构：迈向 Premium 体态' },
      { type: 'text', content: '本次更新是项目视觉表现的分水岭。我们彻底重塑了全局布局与动效系统，实现了从“表单工具”到“高级控制台”的审美跨越。' },
      {
        type: 'feature',
        title: '全新 Level 1 侧边导航',
        desc: '将顶级导航整合至左侧可折叠抽屉，释放顶部空间，解决了药丸导航与传统菜单的排版冲突。支持一键折叠，专为沉浸式编辑设计。',
        tag: '核心'
      },
      {
        type: 'feature',
        title: 'Premium 视觉感官系统',
        desc: '背景升级为深绿/紫色微光径向渐变并叠加噪点纹理，消除大色块断层。全局应用 20px 现代圆角与磨砂玻璃特效，质感全面跃升。',
        tag: '视觉'
      },
      {
        type: 'feature',
        title: '万能属性编辑器 (V2) 进化',
        desc: 'MetaFormItem 深度图标化。现在生命值、攻击力等数十种属性拥有专属图标与色彩标识。所有复杂的 AS3 逻辑说明均转为悬浮气泡，界面呼吸感十足。',
        tag: '交互'
      },
      {
        type: 'feature',
        title: '全局丝滑过渡动效',
        desc: '引入模块级（module-fade）与页签级 entrance 动画。切换面板时内容会伴随轻微位移与缩放，交互反馈不再生硬。',
        tag: '感官'
      },
      {
        type: 'list', content: [
          '重构单位编辑器（BodyEditor）全部子面板，统一适配 Premium Card 风格',
          '优化攻击动作配置流，对话框采用 2 列布局显著提升信息密度',
          '修复了 Say 剧情模块中 r 属性在空值状态下错误导出的 XML Bug',
          '完善了关卡编辑器的中文引导描述，明确了场景 ID 等核心字段的填写规范',
          '全局优化了按钮点击反馈，引入了更精致的 Quaternary 按钮动效'
        ]
      },
      { type: 'action', label: '体验全新高级面板', module: 'body' }
    ]
  },
  {
    version: 'v0.4.1',
    date: '2026-02-04',
    isMajor: false,
    blocks: [
      { type: 'title', content: '单位定义预实现' },
      { type: 'text', content: '本次更新初步实现了单位定义的可视化编辑窗口。但是由于其逻辑、设计参数较为复杂，该版本仅为先行实现，后续会进行优化。' },
      {
        type: 'feature',
        title: '单位定义可视化编辑',
        desc: '新增单位定义的可视化编辑窗口，支持编辑单位的基本属性、技能、AI行为等。',
        tag: '新增'
      },
      {
        type: 'warning',
        title: '单位定义可视化编辑',
        content: '该编辑器仅为先行实现。为确保编辑效率，部分属性参考 ai 生成，可能存在 bug 与逻辑错漏。请谨慎使用，后续会进行优化。'
      },
      { type: 'action', label: '前往体验单位编辑', module: 'body' }
    ]
  },
  {
    version: 'v0.4.0',
    date: '2026-02-02',
    isMajor: true,
    blocks: [
      { type: 'title', content: '剧情对话模块与系统元化' },
      { type: 'text', content: '本次更新引入了全新的 Say 剧情模块，并对底层元数据驱动进行了深度重构。' },
      {
        type: 'feature',
        title: 'Say 剧情对话编辑器',
        desc: '支持多层级对话组管理，新增“智能关卡关联”功能，可自动识别已有关卡 ID 并通过下拉框快速绑定。',
        tag: '新增'
      },
      {
        type: 'feature',
        title: '开发历程系统',
        desc: '新增你当前正在查看的“更新日志”面板，支持查看从项目初始化至今的所有重要变动。',
        tag: '新增'
      },
      {
        type: 'list', content: [
          '优化了技能模块的 effectType 说明文字',
          '完善了 otherConditionArr 的效果选项及中文提示',
          '修复了技能模块中添加索引可能导致的状态错位 Bug',
          '统一了 MetaFormItem 的渲染逻辑，支持多选、下拉与标签注入'
        ]
      },
      { type: 'action', label: '立即前往剧情编辑', module: 'say' }
    ]
  },
  {
    version: 'v0.3.3',
    date: '2026-01-31',
    isMajor: false,
    blocks: [
      { type: 'title', content: '深度交互优化：拖拽排序与高阶逻辑百科' },
      { type: 'text', content: '本次更新显著提升了关卡设计的操作流畅度，并对技能逻辑库进行了扩容，涵盖了从特效到控制逻辑在内的数十项核心机制。' },
      {
        type: 'feature',
        title: '事件组拖拽排序',
        desc: '引入 vuedraggable 插件，现在可以通过侧边手柄实时调整关卡事件的执行顺序。支持在组内任意位置插入新事件，告别繁琐的删除重填。',
        tag: '效率'
      },
      {
        type: 'feature',
        title: '指令构建器 (V3) 全面增强',
        desc: '极大地扩展了指令库，新增对“天气系统、屏幕缩放、音效播放、永久附身、全局 AI 开关”的可视化配置，支持复杂的图层显示/隐藏逻辑。',
        tag: '逻辑'
      },
      {
        type: 'feature',
        title: '技能逻辑库：史诗级扩容',
        desc: '新增了包含“摩卡护体、技能反弹、寒冰封印、全量清理、饿狼无双”等数十种高阶技能的详细注释。现在支持基于武器类型（如狙击、散弹）的特殊生效条件。',
        tag: '百科'
      },
      {
        type: 'feature',
        title: '生效时序精细化控制',
        desc: '重构了技能效果的添加机制，新增“状态+即时 (stateAndInstant)”类型。现在可以更精准地控制逻辑生效的先后顺序（先挂载状态还是先执行数值）。',
        tag: '核心'
      },
      {
        type: 'list', content: [
          '优化了数值变量指令的构建逻辑，支持更灵活的计数器增加与赋值操作',
          '在汇总面板新增“掉落定义”统计项，并适配了相应的全量 XML 导出逻辑',
          '为所有高阶属性增加了“ⓘ”中文注释提示',
          '修复了技能编辑器中 range 属性无法正确匹配特定目标选择模式的说明错误',
          '优化了整体 UI 样式，为拖拽状态增加了视觉反馈高亮'
        ]
      },
      { type: 'action', label: '体验拖拽排序', module: 'level' }
    ]
  },
  {
    version: 'v0.3.2',
    date: '2026-01-30',
    isMajor: false,
    blocks: [
      { type: 'title', content: '智能诊断与精准导航' },
      { type: 'text', content: '本次更新引入了诊断中心与深度跳转引擎，能够自动检测配置错误并一键闪现定位，解决复杂 Mod 调试难的问题。' },
      {
        type: 'feature',
        title: '自动化异常诊断系统',
        desc: '在汇总面板新增诊断结果列表。系统会自动扫描所有关卡和资源，识别漏填 ID、缺失场景标签、空的事件集等潜在隐患，并区分为“错误”与“警告”级别。',
        tag: '智能'
      },
      {
        type: 'feature',
        title: '精准跳转系统',
        desc: '打通了从诊断报告到编辑器的深度链路。点击任何一个异常项，系统会自动切换大模块、选定目标项目、激活对应页签，并直接滚动并高亮显示出错的输入框。',
        tag: '效率'
      },
      {
        type: 'feature',
        title: '生产力模板（工厂模式）',
        desc: '现在新建关卡或技能时不再是完全空白。系统会根据最佳实践自动填充一套标准的示例模板（包含预设发兵组和基础脚本逻辑），用户只需修改参数即可快速产出。',
        tag: '体验'
      },
      {
        type: 'feature',
        title: '可视化指令构建器 (V2)',
        desc: '针对关卡事件的 Condition 和 Order 进行了 UI 重构。现在支持配置/手动双模式切换，并内置了大量中文注释的指令参数说明，告别枯燥的字符串拼接。',
        tag: '逻辑'
      },
      {
        type: 'list', content: [
          '新增 `useSectionNavigator` Hook，为复杂面板提供了通用的 DOM 定位与自动滚动逻辑',
          '修复了技能编辑器中 `extraValueType` 属性在导出 XML 时被遗漏的 Bug',
          '修正了新建技能时因变量名拼写错误导致的模块激活异常（Index Typo Fix）',
          '优化了关卡 Info 节点的 XML 缩进格式，提升了生成代码的可读性',
          '扩展了关卡条件判定种类，新增进入僵直 (underRos)触发细则'
        ]
      }
    ]
  },
  {
    version: 'v0.3.1',
    date: '2026-01-21',
    isMajor: false,
    blocks: [
      { type: 'title', content: '深度关卡编辑系统上线' },
      { type: 'text', content: '关卡是 Mod 体验的核心。本次更新我们彻底告别了关卡的通用表单模式，为其定制了一套深度的嵌套编辑系统，支持复杂的发兵波次与地图事件逻辑。' },
      {
        type: 'feature',
        title: '四大核心关卡板块',
        desc: '关卡编辑器现在由“基础设置（Info）、单位配置（UnitG）、区域配置（RectG）、事件组（EventG）”四大部分组成。不仅能设置怪物等级，还能精准定义地图坐标。',
        tag: '核心'
      },
      {
        type: 'feature',
        title: '可视化逻辑事件组 (EventG)',
        desc: '引入“条件-指令”触发系统。支持通过抽屉式界面编辑事件触发条件（如进入区域、存活时间）并绑定执行指令。内置了常用指令模板，大幅降低了逻辑编写难度。',
        tag: '逻辑'
      },
      {
        type: 'feature',
        title: '智能发兵配置 (UnitG)',
        desc: '支持设置全局默认 AI 指令，并允许为特定的发兵组添加覆盖属性。你可以轻松实现“全体敌人默认追击玩家，但某一组敌人原地站岗”的复杂逻辑。',
        tag: '战斗'
      },
      {
        type: 'feature',
        title: '跨模块状态记忆',
        desc: '重构了全局状态管理系统。现在当你从技能编辑切换到关卡编辑，再切回技能时，系统会自动记录你刚才选中的项，确保多任务编辑时的思路连贯。',
        tag: '体验'
      },
      {
        type: 'feature',
        title: '生产环境构建流',
        desc: '确立了项目的构建规范，支持全栈一键打包。针对 Linux 环境优化了编译器依赖，标志着项目已具备在云端服务器部署的基础条件。',
        tag: '工程'
      },
      {
        type: 'list', content: [
          '新增 `npm run build` 命令，实现前端与后端的一键自动化打包',
          '解决 Linux 环境部署兼容性，修复了 Rollup 编译器在非 Windows 系统下的运行报错',
          '规范化生产环境启动入口，预设了全栈服务的运行脚本',
          '重写了状态管理逻辑，现在切换不同模块时将自动保留当前选中的编辑项',
          '优化了 XML 生成逻辑，Level 与 Say 模块现在会自动包装 <gather> 容器标签',
          '引入了 Ionicons 图标库，为 UI 按钮提供了更清晰的视觉指引'
        ]
      },
      { type: 'action', label: '尝试设计一个新关卡', module: 'level' }
    ]
  },
  {
    version: 'v0.3.0',
    date: '2026-01-19',
    isMajor: true,
    blocks: [
      { type: 'title', content: '全模块架构打通：迈向全能 Mod 编辑器' },
      { type: 'text', content: '本次更新是项目开发中的关键转折点。我们通过通用模块架构一次性打通了关卡、单位、子弹、武器、剧情五个核心板块，并完成了 UI 组件的原子化重构。' },
      {
        type: 'feature',
        title: '项目元数据管理',
        desc: '新增“Mod 基础配置”功能。现在可以在汇总面板直接设置 Mod 的唯一 ID、作者信息及详细介绍（支持 HTML/CDATA 格式），并支持一键下载生成的 .xml 导出文件。',
        tag: '全局'
      },
      {
        type: 'feature',
        title: '五大新模块同步上线',
        desc: '引入通用编辑器（GenericModule），通过一套逻辑驱动关卡设计、单位定义、子弹效果、武器属性及剧情对话。所有模块共享统一的交互体验与即时 XML 预览。',
        tag: '扩展'
      },
      {
        type: 'feature',
        title: 'UI 原子化重构',
        desc: '将编辑器拆分为侧边栏、布局容器、XML 预览器等标准原子组件。技能编辑器已率先完成适配，这不仅统一了视觉风格，还大幅降低了后续新功能的维护成本。',
        tag: '架构'
      },
      {
        type: 'feature',
        title: 'AS3 技能逻辑百科 (大扩容)',
        desc: '对技能效果函数进行了海量补全。新增了包含“分子虹吸、钢铁之躯、生命置换、上帝护佑”等在内的十余种核心效果的底层逻辑说明，并完善了每秒伤害上限等高级机制。',
        tag: '百科'
      },
      {
        type: 'list', content: [
          '优化了 Pinia Store 结构，采用通用工厂方法 (createItem) 减少 50% 以上的样板代码',
          '重构了 XML 导出逻辑，将空字符串转为 null/undefined 处理，使生成的代码更符合 Flash 解析标准',
          '在汇总面板新增了多维数据统计，支持实时监控 Mod 的异常项与健康度',
          '改进了图片资源选择器，支持通过回车键直接创建并注入新的标签',
          '增强了技能编辑器的联动校验，会自动根据 addType 过滤不匹配的效果函数'
        ]
      },
      { type: 'action', label: '配置项目元数据', module: 'summary' }
    ]
  },
  {
    version: 'v0.2.1',
    date: '2026-01-18',
    isMajor: false,
    blocks: [
      { type: 'title', content: '技能编辑器深度重构' },
      { type: 'text', content: '本次更新对技能编辑模块进行了完全的架构重写，将原本数千行的单文件拆分为高内聚的模块化组件，并引入了更智能的表单驱动系统。' },
      {
        type: 'feature',
        title: '模块化架构演进',
        desc: '技能编辑器被拆分为核心配置、效果逻辑、目标选择、视觉资源四个独立面板。引入 Hook 模式管理复杂状态，支持使用 keep-alive 保留编辑进度。',
        tag: '架构'
      },
      {
        type: 'feature',
        title: '全字段智能说明文档',
        desc: '新增 MetaFormItem 统一表单项，几乎为每个技能参数都配置了详细的“ⓘ”信息提示框。现在你可以直接在界面上查看 AS3 底层逻辑的详细说明。',
        tag: '交互'
      },
      {
        type: 'feature',
        title: '动态属性管理系统',
        desc: '为了简化界面，我们将进阶数值改为动态添加模式。用户可以按需添加 ConditionString、EffectProArr 等复杂参数，未使用的参数将不再生成冗余的 XML 代码。',
        tag: '效率'
      },
      {
        type: 'feature',
        title: '视觉资源 (ImageUrl) 强化',
        desc: '重构了视觉资源模型，新增了影响部位 (PartType)的多选标签选择器，并优化了 XML 导出格式，使其完全符合 Flash 版本的解析规范。',
        tag: '资源'
      },
      {
        type: 'list', content: [
          '优化了导航菜单激活逻辑，支持与当前路由自动匹配同步',
          '精简了 XML 序列化逻辑，所有空值属性将不再导出，大幅缩减生成的代码体积',
          '统一了多选标签渲染器，支持在下拉框内直接搜索并创建自定义属性标签',
          '修复了编辑器切换模块时数据意外丢失的潜在 Bug'
        ]
      },
      { type: 'action', label: '立即查看重构后的编辑器', module: 'skill' }
    ]
  },
  {
    version: 'v0.2.0',
    date: '2026-01-17',
    isMajor: true,
    blocks: [
      { type: 'title', content: '可视化编辑器初具雏形：资源与技能模块上线' },
      { type: 'text', content: '本次更新标志着项目从底层架构阶段进入功能实现阶段。我们搭建了完整的交互界面，并完成了最核心、最复杂的技能逻辑建模。' },
      {
        type: 'feature',
        title: '全新的暗黑系交互界面',
        desc: '引入 Naive UI 框架，构建了包含“大厅、编辑器、个人中心”的三栏布局，全面启用深色模式，并针对开发者体验优化了等宽代码字体的显示。',
        tag: 'UI/UX'
      },
      {
        type: 'feature',
        title: '资源管理模块 (PNG)',
        desc: '支持可视化维护图片资源列表。用户可以直观地修改图片的位移、缩放等参数，并实时预览生成的 XML 代码，不再需要手动计算坐标。',
        tag: '新增'
      },
      {
        type: 'feature',
        title: '深度技能编辑器 (Skill)',
        desc: '这是目前最复杂的功能模块。支持主动/被动技能配置、复杂的目标选择器（Target）以及多达 7 层的视觉特效（EffectImg）编辑，涵盖了原游戏技能系统的绝大部分逻辑。',
        tag: '核心'
      },
      {
        type: 'feature',
        title: '全量数据导出与健康检查',
        desc: '新增“数据概览”面板，支持一键导出整个 Mod 的 XML 代码。同时集成了基础的异常检测，能自动识别缺少 URL 或名称重复的配置项。',
        tag: '效率'
      },
      {
        type: 'list', content: [
          '集成 Pinia 状态管理，确保在切换不同编辑模块时数据不丢失',
          '引入 Vue-Router 实现多页面导航，预设 Mod 交流大厅与个人中心占位',
          '建立基于 class-transformer 的数据模型，实现前端表单与 XML 属性的精准映射',
          '完善 README 文档，确立了项目四阶段开发的路线图 (Roadmap)'
        ]
      },
      { type: 'action', label: '进入编辑器体验', module: 'skill' }
    ]
  },
  {
    version: 'v0.1.0',
    date: '2026-01-14',
    isMajor: true,
    blocks: [
      { type: 'title', content: '项目立项：全栈架构基石确立' },
      { type: 'text', content: '爆枪突击开发者工具正式启动。本次更新确立了项目的整体技术栈与 Monorepo 开发流，打通了前后端通讯的基础链路。' },
      {
        type: 'feature',
        title: 'Monorepo 工作流',
        desc: '使用 NPM Workspaces 统一管理 client (前端) 与 server (后端)，实现依赖共享与协同开发。',
        tag: '架构'
      },
      {
        type: 'feature',
        title: 'Vite + Vue3 前端基座',
        desc: '搭建基于 Vite 的 Vue 3 渲染环境，全面启用 TypeScript 严格模式以确保 Mod 数据解析的安全性。',
        tag: '前端'
      },
      {
        type: 'feature',
        title: 'Express 后端服务',
        desc: '构建基于 Node.js 的后端 API 服务，集成 CORS 跨域处理与 JSON 解析插件。',
        tag: '后端'
      },
      {
        type: 'list', content: [
          '配置根目录 package.json，新增 concurrently 实现前后端一键同步启动',
          '完成前后端 TypeScript 编译环境配置 (tsconfig.app.json / tsconfig.node.json)',
          '引入 Mongoose 驱动，预备 MongoDB Atlas 云端数据库对接',
          '实现简单的后端根路由响应，确认前后端通信链路畅通'
        ]
      },
      { type: 'warning', title: '开发阶段说明', content: '当前版本仅作为底层架构填充，暂不具备 UI 交互界面与具体的 XML 编辑功能。' }
    ]
  }
];