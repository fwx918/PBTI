// 模拟随机答题，分析各人格出现概率

const PERSONALITIES = {
    COPY: { dimensions: { P: 2, R: 1, S: 2, E: 2, W: 1 } },
    PROMPT: { dimensions: { P: 5, R: 3, S: 2, E: 3, W: 3 } },
    CHECK: { dimensions: { P: 3, R: 5, S: 4, E: 4, W: 4 } },
    CHAT: { dimensions: { P: 4, R: 3, S: 3, E: 2, W: 5 } },
    PANIC: { dimensions: { P: 3, R: 4, S: 2, E: 5, W: 3 } },
    HYBRID: { dimensions: { P: 4, R: 3, S: 3, E: 2, W: 3 } },
    DENY: { dimensions: { P: 1, R: 5, S: 5, E: 3, W: 2 } },
    VIBE: { dimensions: { P: 3, R: 1, S: 2, E: 1, W: 2 } },
    DEBUG: { dimensions: { P: 3, R: 4, S: 3, E: 3, W: 3 } },
    STACK: { dimensions: { P: 3, R: 2, S: 1, E: 4, W: 3 } },
    ARCH: { dimensions: { P: 4, R: 3, S: 4, E: 2, W: 4 } },
    TRIAL: { dimensions: { P: 5, R: 1, S: 3, E: 4, W: 4 } },
    COWBOY: { dimensions: { P: 2, R: 1, S: 3, E: 2, W: 2 } },
    DOC: { dimensions: { P: 3, R: 3, S: 2, E: 3, W: 2 } },
    REFACT: { dimensions: { P: 3, R: 5, S: 4, E: 3, W: 3 } },
    SOLO: { dimensions: { P: 2, R: 4, S: 5, E: 2, W: 2 } },
    GAS: { dimensions: { P: 4, R: 1, S: 2, E: 2, W: 4 } },
    FOMO: { dimensions: { P: 4, R: 2, S: 3, E: 5, W: 3 } },
    MEME: { dimensions: { P: 4, R: 1, S: 2, E: 2, W: 3 } },
    LAW: { dimensions: { P: 3, R: 5, S: 3, E: 4, W: 3 } },
    COST: { dimensions: { P: 4, R: 3, S: 4, E: 2, W: 3 } },
    HYPE: { dimensions: { P: 4, R: 2, S: 3, E: 2, W: 4 } },
    SKEPTIC: { dimensions: { P: 2, R: 5, S: 5, E: 2, W: 2 } },
    MULTI: { dimensions: { P: 4, R: 4, S: 3, E: 3, W: 5 } }
};

function calculateMatchScore(userDims, typeDims) {
    let totalDiff = 0;
    const dims = ['P', 'R', 'S', 'E', 'W'];
    dims.forEach(dim => {
        totalDiff += Math.abs(userDims[dim] - typeDims[dim]);
    });
    return Math.round((1 - totalDiff / 20) * 100);
}

function getRandomDimensions() {
    // 模拟随机答题结果（1-5的随机值）
    return {
        P: Math.floor(Math.random() * 5) + 1,
        R: Math.floor(Math.random() * 5) + 1,
        S: Math.floor(Math.random() * 5) + 1,
        E: Math.floor(Math.random() * 5) + 1,
        W: Math.floor(Math.random() * 5) + 1
    };
}

function findBestMatch(userDims) {
    let bestMatch = null;
    let bestScore = -1;
    
    for (const [code, p] of Object.entries(PERSONALITIES)) {
        const score = calculateMatchScore(userDims, p.dimensions);
        if (score > bestScore) {
            bestScore = score;
            bestMatch = code;
        }
    }
    
    return { code: bestMatch, score: bestScore };
}

// 模拟 10000 次随机答题
const simulations = 10000;
const results = {};

for (let i = 0; i < simulations; i++) {
    const userDims = getRandomDimensions();
    const match = findBestMatch(userDims);
    
    if (!results[match.code]) {
        results[match.code] = { count: 0, avgScore: 0 };
    }
    results[match.code].count++;
    results[match.code].avgScore += match.score;
}

// 计算概率
console.log('=== 随机答题人格出现概率分析 ===\n');
console.log(`模拟次数: ${simulations}\n`);

const sorted = Object.entries(results)
    .map(([code, data]) => ({
        code,
        count: data.count,
        probability: (data.count / simulations * 100).toFixed(2),
        avgScore: (data.avgScore / data.count).toFixed(1)
    }))
    .sort((a, b) => b.count - a.count);

console.log('排名 | 人格   | 出现次数 | 概率   | 平均匹配度');
console.log('-----|--------|----------|--------|----------');
sorted.forEach((item, index) => {
    console.log(`${(index + 1).toString().padStart(2)}   | ${item.code.padEnd(6)} | ${item.count.toString().padStart(4)}     | ${item.probability.padStart(5)}% | ${item.avgScore}%`);
});

console.log('\n=== 概率分布分析 ===');
const highProb = sorted.filter(s => parseFloat(s.probability) > 8);
const lowProb = sorted.filter(s => parseFloat(s.probability) < 2);

console.log(`\n高概率人格 (>8%): ${highProb.length}个`);
highProb.forEach(s => console.log(`  - ${s.code}: ${s.probability}%`));

console.log(`\n低概率人格 (<2%): ${lowProb.length}个`);
lowProb.forEach(s => console.log(`  - ${s.code}: ${s.probability}%`));

console.log('\n=== 理想概率 ===');
console.log(`24种人格，理想平均概率: ${(100/24).toFixed(2)}%`);
console.log(`标准差越小，分布越均匀`);
