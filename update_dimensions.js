// 更新人格维度的脚本
const fs = require('fs');

let content = fs.readFileSync('data.js', 'utf8');

// 1. 修改 MEME 的维度: { P: 3, R: 1, S: 2, E: 1, W: 2 } -> { P: 4, R: 1, S: 2, E: 2, W: 3 }
content = content.replace(
    /MEME: \{[\s\S]*?dimensions: \{ P: 3, R: 1, S: 2, E: 1, W: 2 \}/,
    `MEME: {
        code: 'MEME',
        name: '梗图生成器',
        icon: '🤪',
        slogan: '让 AI 给我画个表情包',
        desc: '你用 AI 主要是为了娱乐和创作梗图。代码？那是副业。你的主要产出是各种 AI 生成的沙雕图、段子、和办公室表情包。',
        dimensions: { P: 4, R: 1, S: 2, E: 2, W: 3 }`
);

// 2. 修改 DOC 的维度: { P: 4, R: 3, S: 2, E: 3, W: 3 } -> { P: 3, R: 3, S: 2, E: 3, W: 2 }
content = content.replace(
    /DOC: \{[\s\S]*?dimensions: \{ P: 4, R: 3, S: 2, E: 3, W: 3 \}/,
    `DOC: {
        code: 'DOC',
        name: '文档依赖型',
        icon: '📖',
        slogan: '这段代码啥意思？AI 你给我讲讲',
        desc: '你经常需要 AI 解释代码的含义，无论是别人的代码还是 AI 自己生成的。AI 是你的私人讲师，帮你理解复杂的逻辑。',
        dimensions: { P: 3, R: 3, S: 2, E: 3, W: 2 }`
);

// 3. 修改 HYBRID 的维度: { P: 4, R: 3, S: 3, E: 2, W: 4 } -> { P: 4, R: 3, S: 3, E: 2, W: 3 }
content = content.replace(
    /HYBRID: \{[\s\S]*?dimensions: \{ P: 4, R: 3, S: 3, E: 2, W: 4 \}/,
    `HYBRID: {
        code: 'HYBRID',
        name: '人机合一',
        icon: '🤖',
        slogan: '这段代码是我写的还是 AI 写的？',
        desc: '你和 AI 已经融为一体，分不清彼此的贡献。你的代码里有 AI 的智慧，AI 的输出里有你的风格。这是程序员与 AI 协作的最高境界。',
        dimensions: { P: 4, R: 3, S: 3, E: 2, W: 3 }`
);

// 4. 修改 SKEPTIC 的维度: { P: 2, R: 5, S: 5, E: 3, W: 2 } -> { P: 2, R: 5, S: 5, E: 2, W: 2 }
content = content.replace(
    /SKEPTIC: \{[\s\S]*?dimensions: \{ P: 2, R: 5, S: 5, E: 3, W: 2 \}/,
    `SKEPTIC: {
        code: 'SKEPTIC',
        name: 'AI 怀疑论者',
        icon: '🧐',
        slogan: '这不过是高级自动补全',
        desc: '你对 AI 的炒作持怀疑态度，认为大部分能力被夸大了。你指出 AI 的幻觉问题、逻辑错误、和不可解释性。你是团队的冷静声音。',
        dimensions: { P: 2, R: 5, S: 5, E: 2, W: 2 }`
);

fs.writeFileSync('data.js', content);
console.log('✅ 维度更新完成！');
console.log('修改内容：');
console.log('1. MEME: {P:3,R:1,S:2,E:1,W:2} -> {P:4,R:1,S:2,E:2,W:3}');
console.log('2. DOC: {P:4,R:3,S:2,E:3,W:3} -> {P:3,R:3,S:2,E:3,W:2}');
console.log('3. HYBRID: {P:4,R:3,S:3,E:2,W:4} -> {P:4,R:3,S:3,E:2,W:3}');
console.log('4. SKEPTIC: {P:2,R:5,S:5,E:3,W:2} -> {P:2,R:5,S:5,E:2,W:2}');
