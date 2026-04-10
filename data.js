// PBTI - 数据文件
// Programmer Behavioral Type Indicator

// 五大维度模型 (参考 SBTI)
// P: Prompt Model (提示词模型)
// R: Review Model (审查模型)  
// S: Stack Model (技术栈依赖模型)
// E: Emotion Model (情绪/焦虑模型)
// W: Workflow Model (工作流模型)

const DIMENSIONS = {
    P: { name: 'Prompt风格', sub: ['P1', 'P2', 'P3'] },
    R: { name: '审查严格度', sub: ['R1', 'R2', 'R3'] },
    S: { name: '技术依赖度', sub: ['S1', 'S2', 'S3'] },
    E: { name: 'AI焦虑指数', sub: ['E1', 'E2', 'E3'] },
    W: { name: '协作模式', sub: ['W1', 'W2', 'W3'] }
};

// 32 道测试题目
const QUESTIONS = [
    // P - Prompt Model (提示词风格)
    {
        id: 1,
        dimension: 'P1',
        question: '你写 Prompt 的开场白通常是？',
        options: [
            { text: '"请"、"麻烦"、"谢谢"礼貌三件套', scores: { P1: 3, E1: 2 } },
            { text: '直接甩需求，效率至上', scores: { P1: 1, W1: 3 } },
            { text: '先给角色设定、背景、约束，写一大段', scores: { P1: 5, W2: 2 } }
        ]
    },
    {
        id: 2,
        dimension: 'P2',
        question: '当 AI 第一次没理解你的需求，你会？',
        options: [
            { text: '重新组织语言，写更详细的 Prompt', scores: { P2: 5, P1: 2 } },
            { text: '举个例子，让 AI 照着做', scores: { P2: 3, W2: 2 } },
            { text: '算了，我自己写还快一点', scores: { P2: 1, S1: 3 } }
        ]
    },
    {
        id: 3,
        dimension: 'P3',
        question: '你的 Prompt 历史记录里最常见的是？',
        options: [
            { text: '各种角色设定和系统提示词', scores: { P3: 5, W2: 3 } },
            { text: '直接的代码问题和技术咨询', scores: { P3: 2, S2: 3 } },
            { text: '让 AI 解释代码和报错信息', scores: { P3: 1, S1: 2 } }
        ]
    },
    {
        id: 4,
        dimension: 'P1',
        question: '写 Prompt 前你会花多少时间准备？',
        options: [
            { text: '5 分钟以上，精心设计', scores: { P1: 5, W2: 2 } },
            { text: '1-2 分钟，快速组织', scores: { P1: 3, W1: 2 } },
            { text: '直接问，边聊边改', scores: { P1: 1, W3: 3 } }
        ]
    },
    {
        id: 5,
        dimension: 'P2',
        question: '你会保存和复用 Prompt 模板吗？',
        options: [
            { text: '有专门的 Prompt 库，分类管理', scores: { P2: 5, W2: 3 } },
            { text: '偶尔复制之前的', scores: { P2: 3 } },
            { text: '从不，每次都重新写', scores: { P2: 1, W1: 2 } }
        ]
    },
    {
        id: 6,
        dimension: 'P3',
        question: '你觉得自己是 Prompt 工程师吗？',
        options: [
            { text: '是的，Prompt 也是一门技术', scores: { P3: 5, E2: 2 } },
            { text: '算是吧，能解决问题就行', scores: { P3: 3 } },
            { text: '不是，Prompt 只是工具', scores: { P3: 1, S2: 2 } }
        ]
    },
    {
        id: 7,
        dimension: 'P1',
        question: '写 Prompt 时你会提供多少上下文？',
        options: [
            { text: '尽可能多，怕 AI 不理解', scores: { P1: 5, R2: 2 } },
            { text: '关键信息，适度即可', scores: { P1: 3 } },
            { text: '极简，让 AI 自己去猜', scores: { P1: 1, W3: 2 } }
        ]
    },

    // R - Review Model (审查严格度)
    {
        id: 8,
        dimension: 'R1',
        question: 'AI 生成的代码，你的第一反应是？',
        options: [
            { text: '直接复制粘贴，相信 AI', scores: { R1: 1, W1: 3 } },
            { text: '快速扫一遍，明显错误再改', scores: { R1: 3 } },
            { text: '逐行 review，生怕有坑', scores: { R1: 5, E1: 2 } }
        ]
    },
    {
        id: 9,
        dimension: 'R2',
        question: '你敢直接把 AI 代码部署到生产环境吗？',
        options: [
            { text: '敢，出了问题再回滚', scores: { R2: 1, W1: 5 } },
            { text: '简单功能敢，复杂的不敢', scores: { R2: 3 } },
            { text: '不敢，必须人工 review 完', scores: { R2: 5, E1: 3 } }
        ]
    },
    {
        id: 10,
        dimension: 'R3',
        question: '发现 AI 代码有 Bug，你会？',
        options: [
            { text: '让 AI 自己修', scores: { R3: 2, W3: 3 } },
            { text: '告诉 AI 问题，一起修', scores: { R3: 3, W2: 2 } },
            { text: '自己重写，不信任 AI 了', scores: { R3: 5, S1: 3 } }
        ]
    },
    {
        id: 11,
        dimension: 'R1',
        question: 'AI 写的单元测试，你会？',
        options: [
            { text: '直接用，AI 写得比我好', scores: { R1: 1, W1: 2 } },
            { text: '跑一遍，通过就用', scores: { R1: 3 } },
            { text: '检查覆盖率，补充边界情况', scores: { R1: 5, E1: 2 } }
        ]
    },
    {
        id: 12,
        dimension: 'R2',
        question: '对于 AI 生成的注释，你？',
        options: [
            { text: '完全信任，直接提交', scores: { R2: 1 } },
            { text: '大概看一眼', scores: { R2: 3 } },
            { text: '必须验证是否准确', scores: { R2: 5, S2: 2 } }
        ]
    },
    {
        id: 13,
        dimension: 'R3',
        question: 'AI 推荐的依赖库，你会？',
        options: [
            { text: '直接安装使用', scores: { R3: 1, W1: 3 } },
            { text: '看看 GitHub stars 和文档', scores: { R3: 3 } },
            { text: '深入研究源码和安全性', scores: { R3: 5, E1: 2 } }
        ]
    },
    {
        id: 14,
        dimension: 'R1',
        question: '代码审查时看到 AI 生成的代码，你？',
        options: [
            { text: '直接过，AI 不会错', scores: { R1: 1 } },
            { text: '正常审查，不区别对待', scores: { R1: 3 } },
            { text: '更加严格，AI 容易有隐藏 Bug', scores: { R1: 5, E2: 2 } }
        ]
    },

    // S - Stack Model (技术栈依赖)
    {
        id: 15,
        dimension: 'S1',
        question: '没有 AI 辅助，你还能写代码吗？',
        options: [
            { text: '能，但效率低很多', scores: { S1: 3, E2: 2 } },
            { text: '能，AI 只是辅助工具', scores: { S1: 5 } },
            { text: '等等，我查查语法...', scores: { S1: 1, E3: 3 } }
        ]
    },
    {
        id: 16,
        dimension: 'S2',
        question: '遇到不熟悉的 API，你会？',
        options: [
            { text: '直接问 AI', scores: { S2: 1, W3: 3 } },
            { text: '先查官方文档，不懂再问 AI', scores: { S2: 3 } },
            { text: '自己读源码理解', scores: { S2: 5, R3: 2 } }
        ]
    },
    {
        id: 17,
        dimension: 'S3',
        question: '你记得常用函数的参数顺序吗？',
        options: [
            { text: '不记得，反正有 AI 提示', scores: { S3: 1, W1: 2 } },
            { text: '记得常用的，不常用的问 AI', scores: { S3: 3 } },
            { text: '基本都记得', scores: { S3: 5, S1: 2 } }
        ]
    },
    {
        id: 18,
        dimension: 'S1',
        question: '如果明天 AI 全部消失，你？',
        options: [
            { text: '工作效率减半，但还能干', scores: { S1: 3, E2: 2 } },
            { text: '影响不大，我本来就不太用', scores: { S1: 5, E3: 1 } },
            { text: ' panic，感觉不会写代码了', scores: { S1: 1, E3: 5 } }
        ]
    },
    {
        id: 19,
        dimension: 'S2',
        question: '学习新技术时，你主要依赖？',
        options: [
            { text: 'AI 讲解和示例', scores: { S2: 1, W3: 3 } },
            { text: 'AI + 官方文档结合', scores: { S2: 3 } },
            { text: '官方文档和源码', scores: { S2: 5, R3: 2 } }
        ]
    },
    {
        id: 20,
        dimension: 'S3',
        question: '写代码时，IDE 的 AI 补全？',
        options: [
            { text: '重度依赖，Tab 按烂', scores: { S3: 1, W1: 3 } },
            { text: '有用就用，没用就忽略', scores: { S3: 3 } },
            { text: '经常拒绝，怕养成依赖', scores: { S3: 5, E2: 2 } }
        ]
    },

    // E - Emotion Model (AI 焦虑)
    {
        id: 21,
        dimension: 'E1',
        question: '看到 GPT/Claude 发布新版本，你？',
        options: [
            { text: '兴奋，又能提升效率了', scores: { E1: 1, W1: 2 } },
            { text: '观望，等别人踩坑', scores: { E1: 3 } },
            { text: '焦虑，感觉离被替代又近了', scores: { E1: 5, E3: 3 } }
        ]
    },
    {
        id: 22,
        dimension: 'E2',
        question: 'AI 写出了比你更好的代码，你？',
        options: [
            { text: '开心，又省事了', scores: { E2: 1, W1: 3 } },
            { text: '学习一下它的思路', scores: { E2: 3 } },
            { text: '沮丧，怀疑自己的价值', scores: { E2: 5, E3: 3 } }
        ]
    },
    {
        id: 23,
        dimension: 'E3',
        question: '你觉得程序员会被 AI 完全替代吗？',
        options: [
            { text: '不会，AI 只是工具', scores: { E3: 1, S1: 2 } },
            { text: '部分替代，但核心工作还在', scores: { E3: 3 } },
            { text: '会，只是时间问题', scores: { E3: 5, E1: 3 } }
        ]
    },
    {
        id: 24,
        dimension: 'E1',
        question: '同事用 AI 完成了你做不到的事，你？',
        options: [
            { text: '请教他怎么用的', scores: { E1: 2, W2: 2 } },
            { text: '默默研究', scores: { E1: 3 } },
            { text: '焦虑，感觉自己落后了', scores: { E1: 5, E2: 2 } }
        ]
    },
    {
        id: 25,
        dimension: 'E2',
        question: '你会因为 AI 能力太强而感到不安吗？',
        options: [
            { text: '不会，工具越强越好', scores: { E2: 1, W1: 2 } },
            { text: '偶尔有点', scores: { E2: 3 } },
            { text: '经常，担心自己的竞争力', scores: { E2: 5, E3: 3 } }
        ]
    },
    {
        id: 26,
        dimension: 'E3',
        question: '你对未来职业发展的态度是？',
        options: [
            { text: '乐观，AI 会创造新机会', scores: { E3: 1, W1: 2 } },
            { text: '谨慎，需要不断学习', scores: { E3: 3 } },
            { text: '悲观，不知道还能干多久', scores: { E3: 5, E1: 3 } }
        ]
    },

    // W - Workflow Model (协作模式)
    {
        id: 27,
        dimension: 'W1',
        question: '你开始一个新功能时，会？',
        options: [
            { text: '直接让 AI 生成完整代码', scores: { W1: 1, R1: 2 } },
            { text: '先和 AI 讨论方案，再实现', scores: { W1: 3, W2: 2 } },
            { text: '先自己设计，细节让 AI 补', scores: { W1: 5, S1: 2 } }
        ]
    },
    {
        id: 28,
        dimension: 'W2',
        question: '你和 AI 的协作更像？',
        options: [
            { text: '老板和员工，我下指令', scores: { W2: 1, W1: 3 } },
            { text: '结对编程，一起讨论', scores: { W2: 5, P2: 2 } },
            { text: '老师和学生，我教它', scores: { W2: 3, P1: 2 } }
        ]
    },
    {
        id: 29,
        dimension: 'W3',
        question: '遇到复杂 Bug，你会？',
        options: [
            { text: '直接丢给 AI 分析', scores: { W3: 1, S2: 2 } },
            { text: '自己先分析，搞不定再问 AI', scores: { W3: 3, S1: 2 } },
            { text: '和 AI 一起排查，边聊边修', scores: { W3: 5, W2: 3 } }
        ]
    },
    {
        id: 30,
        dimension: 'W1',
        question: '你更喜欢哪种 AI 交互方式？',
        options: [
            { text: '一次性生成完整方案', scores: { W1: 1, R1: 2 } },
            { text: '多轮对话，逐步完善', scores: { W1: 3, W2: 2 } },
            { text: '实时协作，像结对编程', scores: { W1: 5, W3: 3 } }
        ]
    },
    {
        id: 31,
        dimension: 'W2',
        question: 'AI 给出多个方案时，你？',
        options: [
            { text: '选第一个，相信 AI 排序', scores: { W2: 1, R1: 2 } },
            { text: '快速对比，选一个合适的', scores: { W2: 3 } },
            { text: '深入分析每个方案的优劣', scores: { W2: 5, R2: 2 } }
        ]
    },
    {
        id: 32,
        dimension: 'W3',
        question: '完成一个功能后，你会？',
        options: [
            { text: '感谢 AI，它是大功臣', scores: { W3: 3, W2: 2 } },
            { text: '复盘哪里可以优化 Prompt', scores: { W3: 2, P2: 3 } },
            { text: '总结自己的设计思路', scores: { W3: 5, S1: 2 } }
        ]
    }
];

// 24 种人格类型定义
const PERSONALITIES = {
    COPY: {
        code: 'COPY',
        name: '复制粘贴侠',
        icon: '🚀',
        slogan: '能跑就行，出问题再说',
        desc: '你对 AI 有着近乎盲目的信任，代码拿来就用，效率至上。在你的世界里，只要功能实现了，谁写的并不重要。你是团队里交付速度最快的人，也是代码审查时最让同事心惊胆战的人。',
        dimensions: { P: 2, R: 1, S: 2, E: 2, W: 1 },
        advice: '给 COPY 侠的建议：快是快了，但生产环境的事故也更刺激。建议至少跑一遍单元测试，或者找个 CHECK 型同事帮你 review。',
        similar: 'StackOverflow 的忠实用户、CV 工程师、"这段代码从哪复制的？"',
        stats: { prompt: 30, review: 15, stack: 40, emotion: 50, workflow: 25 }
    },
    PROMPT: {
        code: 'PROMPT',
        name: '提示词炼丹师',
        icon: '🧙‍♂️',
        slogan: '给我 10 分钟调 Prompt，1 秒出结果',
        desc: '你相信 Prompt 工程是一门艺术。你的收藏夹里存着各种角色设定和系统提示词模板，写 Prompt 的时间可能比写代码还长。但当你调好一个完美的 Prompt，AI 的表现会让你惊艳。',
        dimensions: { P: 5, R: 3, S: 2, E: 3, W: 3 },
        advice: '给炼丹师的建议：Prompt 调得再好，也要记得实际代码才是交付物。别让用户等你"再优化一下 Prompt"。',
        similar: 'Midjourney 咒语大师、ChatGPT 角色扮演爱好者、Prompt 收藏家',
        stats: { prompt: 95, review: 50, stack: 30, emotion: 45, workflow: 60 }
    },
    CHECK: {
        code: 'CHECK',
        name: '代码审查狂',
        icon: '🔍',
        slogan: 'AI 写的？我得看看有没有坑',
        desc: '你对 AI 保持着健康的怀疑态度。每行代码都要经过你的火眼金睛，隐藏 Bug 在你面前无所遁形。你是团队的代码质量守门员，虽然交付慢一些，但线上事故最少。',
        dimensions: { P: 2, R: 5, S: 4, E: 4, W: 3 },
        advice: '给审查狂的建议：信任也是一种能力。不是所有代码都需要逐行 review，学会放手让团队更快前进。',
        similar: 'Git 历史洁癖患者、Code Review 终结者、"这行代码什么意思？"',
        stats: { prompt: 50, review: 95, stack: 70, emotion: 65, workflow: 75 }
    },
    CHAT: {
        code: 'CHAT',
        name: '结对编程员',
        icon: '💬',
        slogan: '来，咱们聊聊这个需求',
        desc: '你把 AI 当成真正的编程伙伴，而不是工具。你们有来有回地讨论方案，边聊边写，像一对默契的搭档。这种方式让你思路更清晰，代码质量也更高。',
        dimensions: { P: 4, R: 2, S: 3, E: 2, W: 5 },
        advice: '给结对员的建议：聊天虽好，但不要聊嗨了忘记时间。设定一个明确的结束点，不然需求讨论能聊一整天。',
        similar: 'Extreme Programming 信徒、会议室常驻人口、"我有个想法..."',
        stats: { prompt: 70, review: 45, stack: 50, emotion: 35, workflow: 95 }
    },
    PANIC: {
        code: 'PANIC',
        name: '替代焦虑型',
        icon: '😰',
        slogan: '完了，GPT-5 又要抢我饭碗了',
        desc: '每次 AI 发布新功能，你的焦虑指数就飙升。你一边疯狂学习 AI 工具，一边担心明天就被替代。这种危机感驱使你不断进步，但也让你经常失眠。',
        dimensions: { P: 3, R: 4, S: 2, E: 5, W: 3 },
        advice: '给焦虑型的建议：深呼吸，程序员的价值不只是写代码。AI 再强也需要人来定义问题、做出判断。你比想象中更有价值。',
        similar: 'LinkedIn 学习狂人、技术新闻刷新狂、"听说 AI 又能..."',
        stats: { prompt: 55, review: 70, stack: 25, emotion: 100, workflow: 55 }
    },
    HYBRID: {
        code: 'HYBRID',
        name: '人机合一',
        icon: '🤖',
        slogan: '这段代码是我写的还是 AI 写的？',
        desc: '你和 AI 已经融为一体，分不清彼此的贡献。你的代码里有 AI 的智慧，AI 的输出里有你的风格。这是程序员与 AI 协作的最高境界。',
        dimensions: { P: 4, R: 3, S: 3, E: 2, W: 4 },
        advice: '给人机合一的建议：保持自我认知，记住哪些是你的原创思考。在代码注释里标记 AI 的贡献也是一种职业素养。',
        similar: '赛博格先驱、未来程序员原型、"我和 AI 不分彼此"',
        stats: { prompt: 70, review: 50, stack: 55, emotion: 30, workflow: 80 }
    },
    DENY: {
        code: 'DENY',
        name: '顽固手写派',
        icon: '✋',
        slogan: '真正的程序员不用 AI',
        desc: '你坚持传统编程方式，对 AI 持保留态度。你认为手写代码是对技术的尊重，依赖 AI 会让人退化。你的代码功底扎实，但效率可能落后于同事。',
        dimensions: { P: 1, R: 5, S: 5, E: 3, W: 2 },
        advice: '给手写派的建议：工具无罪，拒绝进步反而可能被淘汰。试着把 AI 当成计算器——它不会让你数学变差，只是让你更快。',
        similar: 'Vim/Emacs 死忠、命令行原教旨主义者、"我们那时候..."',
        stats: { prompt: 10, review: 90, stack: 95, emotion: 50, workflow: 30 }
    },
    VIBE: {
        code: 'VIBE',
        name: '摸鱼大师',
        icon: '🎣',
        slogan: '帮我写个请假理由，要感人的',
        desc: '你用 AI 主要是为了偷懒和娱乐。写代码？不，你更想让 AI 帮你写周报、写邮件、写请假条。你是办公室里最会"高效摸鱼"的人。',
        dimensions: { P: 3, R: 1, S: 2, E: 1, W: 2 },
        advice: '给摸鱼大师的建议：摸鱼可以，但别摸过头了。AI 是提升效率的工具，不是逃避工作的借口。该自己写的代码还是要写。',
        similar: '周报生成器重度用户、邮件模板收藏家、"这个让 AI 写吧"',
        stats: { prompt: 50, review: 15, stack: 20, emotion: 10, workflow: 25 }
    },
    DEBUG: {
        code: 'DEBUG',
        name: '修 AI 的 Bug',
        icon: '🐛',
        slogan: 'AI 写 80%，我修 20%',
        desc: 'AI 生成的代码在你手里总能跑起来，但代价是你要修一堆 Bug。你是团队的"救火队员"，专门处理 AI 留下的烂摊子。虽然辛苦，但你解决问题的能力也在飞速提升。',
        dimensions: { P: 3, R: 5, S: 3, E: 3, W: 2 },
        advice: '给修 Bug 专家的建议：修 Bug 固然重要，但预防胜于治疗。试着在让 AI 生成代码前，给更详细的约束条件。',
        similar: 'StackTrace 翻译官、Debugger 职业选手、"又是 AI 写的？"',
        stats: { prompt: 55, review: 75, stack: 55, emotion: 50, workflow: 55 }
    },
    STACK: {
        code: 'STACK',
        name: '栈溢出型',
        icon: '📚',
        slogan: '等等，我问问 AI 这个 API 怎么用',
        desc: '你已经习惯了有问题就问 AI，基础语法都记不住了。没有 AI 的辅助，你感觉自己像个新手。这种依赖让你效率很高，但也让你焦虑。',
        dimensions: { P: 3, R: 2, S: 1, E: 4, W: 3 },
        advice: '给栈溢出型的建议：AI 是外接大脑，不是替代大脑。偶尔关掉 AI 补全，强迫自己记住一些基础，长远来看对你更好。',
        similar: 'Google/StackOverflow 重度用户、"这个语法是...？"、API 文档从不看',
        stats: { prompt: 60, review: 30, stack: 5, emotion: 75, workflow: 50 }
    },
    ARCH: {
        code: 'ARCH',
        name: '架构指挥家',
        icon: '🎼',
        slogan: '你负责实现，我负责设计',
        desc: '你专注于高层次设计，把实现细节丢给 AI。你是团队的架构师，负责画出蓝图，AI 负责搬砖。这种方式让你能处理更复杂的系统。',
        dimensions: { P: 4, R: 3, S: 4, E: 2, W: 4 },
        advice: '给架构师的建议：架构再完美，也需要落地。偶尔深入实现细节，能帮你设计出更接地气的架构。',
        similar: 'UML 图绘制大师、设计模式传教士、"这个应该抽象一下"',
        stats: { prompt: 75, review: 55, stack: 75, emotion: 30, workflow: 85 }
    },
    TRIAL: {
        code: 'TRIAL',
        name: '尝鲜小白鼠',
        icon: '🐁',
        slogan: 'Claude 4.7 出了？让我试试',
        desc: '每个新模型、新工具你都要第一时间尝试。你的订阅列表里有各种 AI 服务，虽然花了不少钱，但你总能找到最适合当前任务的工具。',
        dimensions: { P: 4, R: 2, S: 3, E: 3, W: 4 },
        advice: '给尝鲜派的建议：工具再多，精通一个比浅尝十个更有价值。选定几个核心工具深入使用，别让自己陷入"工具收集癖"。',
        similar: 'Beta 版专业户、订阅服务收藏家、"这个新 AI 能..."',
        stats: { prompt: 80, review: 35, stack: 50, emotion: 55, workflow: 75 }
    },
    COWBOY: {
        code: 'COWBOY',
        name: '生产环境勇士',
        icon: '🤠',
        slogan: '测试是什么？直接上线！',
        desc: '你有着无畏的勇气，敢直接把 AI 代码部署到生产环境。你的座右铭是"Move fast and break things"。虽然事故不少，但你迭代速度无人能及。',
        dimensions: { P: 2, R: 1, S: 3, E: 2, W: 2 },
        advice: '给勇士的建议：勇气可嘉，但生产环境不是试验场。至少做个灰度发布，给用户留条后路。',
        similar: '周五部署狂魔、"在我机器上能跑"、回滚专家',
        stats: { prompt: 35, review: 10, stack: 55, emotion: 35, workflow: 30 }
    },
    DOC: {
        code: 'DOC',
        name: '文档依赖型',
        icon: '📖',
        slogan: '这段代码啥意思？AI 你给我讲讲',
        desc: '你经常需要 AI 解释代码的含义，无论是别人的代码还是 AI 自己生成的。AI 是你的私人讲师，帮你理解复杂的逻辑。',
        dimensions: { P: 4, R: 3, S: 2, E: 3, W: 3 },
        advice: '给文档依赖型的建议：理解代码是好的，但也要培养自己阅读代码的能力。试着先自己理解，不懂再问 AI。',
        similar: '代码注释爱好者、"这行是干嘛的？"、学习型程序员',
        stats: { prompt: 70, review: 55, stack: 30, emotion: 55, workflow: 55 }
    },
    REFACT: {
        code: 'REFACT',
        name: '重构强迫症',
        icon: '🔄',
        slogan: '能跑，但不符合我的代码规范',
        desc: 'AI 生成的代码功能再完美，你也要重构一遍。变量命名、代码结构、设计模式，每个细节都要符合你的标准。你的代码库是最整洁的。',
        dimensions: { P: 3, R: 5, S: 4, E: 3, W: 3 },
        advice: '给重构狂的建议：完美是好的，但交付更重要。学会区分"必须重构"和"可以以后再说"，别让完美成为交付的敌人。',
        similar: '代码格式化工具粉丝、"这里应该抽个函数"、整洁代码信徒',
        stats: { prompt: 55, review: 95, stack: 75, emotion: 50, workflow: 60 }
    },
    SOLO: {
        code: 'SOLO',
        name: '独狼程序员',
        icon: '🐺',
        slogan: '跟 AI 说话比写代码还累',
        desc: '你更喜欢独自思考和工作，和 AI 对话让你感到疲惫。你相信自己的大脑胜过任何工具，虽然效率可能不是最高，但你的独立思考能力最强。',
        dimensions: { P: 2, R: 4, S: 5, E: 2, W: 2 },
        advice: '给独狼的建议：独立是好事，但协作能带来更大价值。试着把 AI 当成一个不会打扰你的沉默搭档，需要时再开口。',
        similar: '深夜编程者、耳机常驻用户、"我自己来"',
        stats: { prompt: 25, review: 75, stack: 90, emotion: 25, workflow: 25 }
    },
    
    // ========== 新增 8 种人格 ==========
    
    GAS: {
        code: 'GAS',
        name: '赛博画饼师',
        icon: '🎨',
        slogan: '这个需求 AI 说能实现',
        desc: '你是产品经理型选手，擅长用 AI 快速验证想法、出原型、画大饼。你不在乎技术细节，只关心"能不能做"。你是团队里最能"忽悠" AI 干活的人。',
        dimensions: { P: 4, R: 1, S: 2, E: 2, W: 4 },
        advice: '给画饼师的建议：AI 确实能帮你快速验证，但别忘了技术可行性。跟工程师沟通时，别只说"AI 说能做"。',
        similar: 'PRD 生成器、原型图魔术师、"这个很简单吧？"',
        stats: { prompt: 75, review: 15, stack: 25, emotion: 30, workflow: 80 }
    },
    
    FOMO: {
        code: 'FOMO',
        name: 'AI 错失恐惧症',
        icon: '😱',
        slogan: '这个新模型我又没跟上？',
        desc: '你害怕错过每一个 AI 新功能、新模型、新工具。你的订阅列表爆炸，Twitter 关注全是 AI 账号，每天都在"学习"但永远觉得不够。',
        dimensions: { P: 4, R: 2, S: 3, E: 5, W: 3 },
        advice: '给 FOMO 患者的建议：信息过载会让你焦虑。选定几个核心工具深耕，比浅尝辄止一百个更有价值。',
        similar: 'Newsletter 收藏家、Twitter 刷新狂、"你们都用上了？"',
        stats: { prompt: 80, review: 35, stack: 45, emotion: 100, workflow: 60 }
    },
    
    MEME: {
        code: 'MEME',
        name: '梗图生成器',
        icon: '🤪',
        slogan: '让 AI 给我画个表情包',
        desc: '你用 AI 主要是为了娱乐和创作梗图。代码？那是副业。你的主要产出是各种 AI 生成的沙雕图、段子、和办公室表情包。',
        dimensions: { P: 3, R: 1, S: 2, E: 1, W: 2 },
        advice: '给梗王：娱乐是生活必需品，但别忘了正事。把 AI 的创作能力用在产品文案、用户沟通上，也是正经技能。',
        similar: '表情包批发商、办公室气氛组、"看这个 AI 生成的"',
        stats: { prompt: 60, review: 10, stack: 20, emotion: 15, workflow: 30 }
    },
    
    LAW: {
        code: 'LAW',
        name: 'AI 律师',
        icon: '⚖️',
        slogan: '这段代码的版权属于谁？',
        desc: '你对 AI 生成的代码版权、合规性、安全性格外关注。每次用 AI 代码都要查许可证，担心公司被告。你是团队的合规守门员。',
        dimensions: { P: 3, R: 5, S: 3, E: 4, W: 3 },
        advice: '给 AI 律师：合规意识很重要，但过度谨慎会阻碍创新。建立一套 AI 使用规范，让团队安心使用。',
        similar: '开源协议专家、合规审查员、"这个能商用吗？"',
        stats: { prompt: 55, review: 95, stack: 55, emotion: 70, workflow: 55 }
    },
    
    COST: {
        code: 'COST',
        name: 'Token 精算师',
        icon: '💰',
        slogan: '这条 Prompt 花了 0.003 美元',
        desc: '你对 API 调用成本极度敏感，每次输入都想着怎么省 Token。你会优化 Prompt 长度，批量处理请求，甚至自己搭建本地模型省钱。',
        dimensions: { P: 4, R: 3, S: 4, E: 2, W: 3 },
        advice: '给精算师：省钱是好事，但别为了省几毛钱浪费几小时。算清楚时间成本和 API 成本哪个更贵。',
        similar: '云服务成本优化专家、本地模型部署者、"这个太贵了"',
        stats: { prompt: 80, review: 55, stack: 75, emotion: 25, workflow: 60 }
    },
    
    HYPE: {
        code: 'HYPE',
        name: 'AI 布道者',
        icon: '📢',
        slogan: '你们怎么还没用 AI？',
        desc: '你是团队里的 AI 推广大使，逢人就说 AI 有多好用。你组织分享会、写教程、帮同事 setup 环境。你的热情感染了整个团队。',
        dimensions: { P: 4, R: 2, S: 3, E: 2, W: 4 },
        advice: '给布道者：热情可贵，但要尊重每个人的节奏。有些人需要更多时间适应，强迫推广可能适得其反。',
        similar: '技术传教士、内部分享达人、"我教你用 AI"',
        stats: { prompt: 85, review: 35, stack: 50, emotion: 25, workflow: 85 }
    },
    
    SKEPTIC: {
        code: 'SKEPTIC',
        name: 'AI 怀疑论者',
        icon: '🧐',
        slogan: '这不过是高级自动补全',
        desc: '你对 AI 的炒作持怀疑态度，认为大部分能力被夸大了。你指出 AI 的幻觉问题、逻辑错误、和不可解释性。你是团队的冷静声音。',
        dimensions: { P: 2, R: 5, S: 4, E: 3, W: 2 },
        advice: '给怀疑论者：批判性思维很宝贵，但别因为质疑而错过真正的机会。试着找到 AI 适合的具体场景。',
        similar: '技术理性派、炒作粉碎机、"其实没什么特别的"',
        stats: { prompt: 25, review: 90, stack: 90, emotion: 50, workflow: 25 }
    },
    
    MULTI: {
        code: 'MULTI',
        name: '多线程大脑',
        icon: '🧠',
        slogan: '同时和 5 个 AI 对话',
        desc: '你习惯同时打开多个 AI 窗口，让它们互相验证、对比答案。你是信息整合大师，能从不同 AI 的回答中提取最优解。',
        dimensions: { P: 4, R: 4, S: 3, E: 3, W: 5 },
        advice: '给多线程大脑：对比多个来源很好，但别陷入分析瘫痪。有时候一个 AI 的答案已经足够好了。',
        similar: '信息整合专家、对比评测员、"我问了另一个 AI"',
        stats: { prompt: 85, review: 70, stack: 50, emotion: 50, workflow: 95 }
    }
};

// 加载提示语
const LOADING_TIPS = [
    "正在分析你的 Prompt 风格...",
    "计算你的代码审查严格度...",
    "评估你对技术栈的依赖程度...",
    "测量你的 AI 焦虑指数...",
    "分析你的人机协作模式...",
    "生成你的专属 AI 人格画像...",
    "正在匹配最适合你的类型...",
    "几乎完成了..."
];

// 导出数据（如果在模块环境中）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { QUESTIONS, PERSONALITIES, DIMENSIONS, LOADING_TIPS };
}
