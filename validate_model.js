// 验证24种人格的理论可达性
// 检查每种人格是否可以通过答题被匹配到

const PERSONALITIES = {
    COPY: { dimensions: { P: 2, R: 1, S: 2, E: 2, W: 1 } },
    PROMPT: { dimensions: { P: 5, R: 3, S: 2, E: 3, W: 3 } },
    CHECK: { dimensions: { P: 3, R: 5, S: 4, E: 4, W: 4 } },
    CHAT: { dimensions: { P: 4, R: 3, S: 3, E: 2, W: 5 } },
    PANIC: { dimensions: { P: 3, R: 4, S: 2, E: 5, W: 3 } },
    HYBRID: { dimensions: { P: 4, R: 3, S: 3, E: 2, W: 4 } },
    DENY: { dimensions: { P: 1, R: 5, S: 5, E: 3, W: 2 } },
    VIBE: { dimensions: { P: 3, R: 1, S: 2, E: 1, W: 2 } },
    DEBUG: { dimensions: { P: 3, R: 4, S: 3, E: 3, W: 3 } },
    STACK: { dimensions: { P: 3, R: 2, S: 1, E: 4, W: 3 } },
    ARCH: { dimensions: { P: 4, R: 3, S: 4, E: 2, W: 4 } },
    TRIAL: { dimensions: { P: 4, R: 2, S: 3, E: 3, W: 4 } },
    COWBOY: { dimensions: { P: 2, R: 1, S: 3, E: 2, W: 2 } },
    DOC: { dimensions: { P: 4, R: 3, S: 2, E: 3, W: 3 } },
    REFACT: { dimensions: { P: 3, R: 5, S: 4, E: 3, W: 3 } },
    SOLO: { dimensions: { P: 2, R: 4, S: 5, E: 2, W: 2 } },
    GAS: { dimensions: { P: 4, R: 1, S: 2, E: 2, W: 4 } },
    FOMO: { dimensions: { P: 4, R: 2, S: 3, E: 5, W: 3 } },
    MEME: { dimensions: { P: 3, R: 1, S: 2, E: 1, W: 2 } },
    LAW: { dimensions: { P: 3, R: 5, S: 3, E: 4, W: 3 } },
    COST: { dimensions: { P: 4, R: 3, S: 4, E: 2, W: 3 } },
    HYPE: { dimensions: { P: 4, R: 2, S: 3, E: 2, W: 4 } },
    SKEPTIC: { dimensions: { P: 2, R: 5, S: 5, E: 3, W: 2 } },
    MULTI: { dimensions: { P: 4, R: 4, S: 3, E: 3, W: 5 } }
};

// 模拟计算匹配度
function calculateMatchScore(userDims, typeDims) {
    let totalDiff = 0;
    const dimensions = ['P', 'R', 'S', 'E', 'W'];
    dimensions.forEach(dim => {
        totalDiff += Math.abs(userDims[dim] - typeDims[dim]);
    });
    const maxDiff = 5 * 4;
    return Math.round((1 - totalDiff / maxDiff) * 100);
}

// 检查每种人格是否是唯一的最佳匹配
console.log("=== 验证每种人格的唯一性 ===\n");

let issues = [];

for (const [code1, p1] of Object.entries(PERSONALITIES)) {
    let isUnique = true;
    let conflicts = [];
    
    for (const [code2, p2] of Object.entries(PERSONALITIES)) {
        if (code1 === code2) continue;
        
        const selfMatch = calculateMatchScore(p1.dimensions, p1.dimensions);
        const otherMatch = calculateMatchScore(p1.dimensions, p2.dimensions);
        
        if (otherMatch >= selfMatch - 10) {
            isUnique = false;
            conflicts.push(`${code2}(${otherMatch}%)`);
        }
    }
    
    if (!isUnique) {
        issues.push({
            code: code1,
            dims: p1.dimensions,
            conflicts: conflicts
        });
    }
}

if (issues.length === 0) {
    console.log("✅ 所有人格都具有唯一性，可以被区分！");
} else {
    console.log("⚠️ 发现以下人格存在冲突：\n");
    issues.forEach(issue => {
        console.log(`${issue.code}: ${JSON.stringify(issue.dims)}`);
        console.log(`  容易与: ${issue.conflicts.join(', ')} 混淆`);
        console.log();
    });
}

// 检查维度覆盖范围
console.log("\n=== 维度覆盖范围分析 ===");
const dimensions = ['P', 'R', 'S', 'E', 'W'];
dimensions.forEach(dim => {
    const values = Object.values(PERSONALITIES).map(p => p.dimensions[dim]);
    const unique = [...new Set(values)].sort((a,b) => a-b);
    console.log(`${dim}: [${unique.join(', ')}]`);
});

// 检查相似人格对
console.log("\n=== 相似人格对（匹配度>80%）===");
const pairs = [];
for (const [code1, p1] of Object.entries(PERSONALITIES)) {
    for (const [code2, p2] of Object.entries(PERSONALITIES)) {
        if (code1 >= code2) continue;
        const match = calculateMatchScore(p1.dimensions, p2.dimensions);
        if (match > 80) {
            pairs.push({pair: `${code1}-${code2}`, match});
        }
    }
}
pairs.sort((a,b) => b.match - a.match);
if (pairs.length === 0) {
    console.log("✅ 没有相似度过高的人格对");
} else {
    pairs.forEach(p => console.log(`${p.pair}: ${p.match}%`));
}

// 检查MEME和VIBE的重复问题
console.log("\n=== MEME vs VIBE 对比 ===");
const memeMatch = calculateMatchScore(PERSONALITIES.MEME.dimensions, PERSONALITIES.VIBE.dimensions);
console.log(`MEME 和 VIBE 的匹配度: ${memeMatch}%`);
if (memeMatch === 100) {
    console.log("❌ 严重：MEME 和 VIBE 维度完全相同！");
}
