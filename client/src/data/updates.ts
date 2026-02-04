// client/src/data/updates.ts

import type { Changelog } from '../types/changelog';

export const UPDATES_DATA: Changelog[] = [
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