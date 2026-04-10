// PBTI - 算法核心
// 参考 SBTI 的权重模型，实现复杂的五维度评估算法

class PBTIAlgorithm {
    constructor() {
        this.scores = {};
        this.subDimensions = [
            'P1', 'P2', 'P3',  // Prompt Model
            'R1', 'R2', 'R3',  // Review Model
            'S1', 'S2', 'S3',  // Stack Model
            'E1', 'E2', 'E3',  // Emotion Model
            'W1', 'W2', 'W3'   // Workflow Model
        ];
        this.initScores();
    }

    initScores() {
        this.subDimensions.forEach(dim => {
            this.scores[dim] = 0;
        });
    }

    // 记录答案分数
    recordAnswer(questionId, optionIndex) {
        const question = QUESTIONS.find(q => q.id === questionId);
        if (!question) return;

        const option = question.options[optionIndex];
        if (!option || !option.scores) return;

        // 累加分数到对应的子维度
        Object.entries(option.scores).forEach(([dim, score]) => {
            if (this.scores.hasOwnProperty(dim)) {
                this.scores[dim] += score;
            }
        });
    }

    // 计算主维度分数 (1-5 标准化)
    calculateDimensions() {
        const dimensions = {};
        
        // P - Prompt Model (P1, P2, P3)
        dimensions.P = this.normalizeDimension(['P1', 'P2', 'P3']);
        
        // R - Review Model (R1, R2, R3)
        dimensions.R = this.normalizeDimension(['R1', 'R2', 'R3']);
        
        // S - Stack Model (S1, S2, S3)
        dimensions.S = this.normalizeDimension(['S1', 'S2', 'S3']);
        
        // E - Emotion Model (E1, E2, E3)
        dimensions.E = this.normalizeDimension(['E1', 'E2', 'E3']);
        
        // W - Workflow Model (W1, W2, W3)
        dimensions.W = this.normalizeDimension(['W1', 'W2', 'W3']);

        return dimensions;
    }

    // 标准化维度分数到 1-5 范围
    normalizeDimension(subDims) {
        const total = subDims.reduce((sum, dim) => sum + this.scores[dim], 0);
        const count = subDims.length;
        
        // 每个子维度对应约 2-3 题，每题最高5分最低1分
        const answersPerSubDim = 2.5; 
        const actualMax = count * answersPerSubDim * 5;
        const actualMin = count * answersPerSubDim * 1;
        
        // 如果分数为0，返回中间值3
        if (total === 0) return 3;
        
        // 标准化到 1-5
        let normalized = ((total - actualMin) / (actualMax - actualMin)) * 4 + 1;
        normalized = Math.max(1, Math.min(5, Math.round(normalized)));
        
        // 调试输出
        console.log(`Dimension ${subDims[0]}: total=${total}, normalized=${normalized}`);
        
        return normalized;
    }

    // 计算与每种人格类型的匹配度
    calculateMatches(dimensions) {
        const matches = [];
        
        Object.entries(PERSONALITIES).forEach(([code, personality]) => {
            const match = this.calculateMatchScore(dimensions, personality.dimensions);
            matches.push({
                code: code,
                personality: personality,
                score: match.score,
                diff: match.diff
            });
        });

        // 按匹配度排序
        matches.sort((a, b) => b.score - a.score);
        return matches;
    }

    // 计算单个匹配分数
    calculateMatchScore(userDims, typeDims) {
        let totalDiff = 0;
        let maxPossibleDiff = 0;
        
        const dims = ['P', 'R', 'S', 'E', 'W'];
        
        dims.forEach(dim => {
            const userScore = userDims[dim];
            const typeScore = typeDims[dim];
            const diff = Math.abs(userScore - typeScore);
            
            totalDiff += diff;
            maxPossibleDiff += 4; // 最大差值是 4 (5-1)
        });

        // 计算匹配度百分比
        const similarity = 1 - (totalDiff / maxPossibleDiff);
        const score = Math.round(similarity * 100);

        return { score, diff: totalDiff };
    }

    // 获取详细分析结果
    getDetailedAnalysis(dimensions) {
        const analysis = {
            dimensions: dimensions,
            primary: this.getPrimaryTrait(dimensions),
            secondary: this.getSecondaryTrait(dimensions),
            insights: this.generateInsights(dimensions)
        };
        return analysis;
    }

    // 获取主要特质
    getPrimaryTrait(dimensions) {
        const entries = Object.entries(dimensions);
        entries.sort((a, b) => b[1] - a[1]);
        return {
            dimension: entries[0][0],
            score: entries[0][1],
            name: DIMENSIONS[entries[0][0]].name
        };
    }

    // 获取次要特质
    getSecondaryTrait(dimensions) {
        const entries = Object.entries(dimensions);
        entries.sort((a, b) => b[1] - a[1]);
        return {
            dimension: entries[1][0],
            score: entries[1][1],
            name: DIMENSIONS[entries[1][0]].name
        };
    }

    // 生成洞察
    generateInsights(dimensions) {
        const insights = [];
        
        // 根据各维度分数生成洞察
        if (dimensions.P >= 4) {
            insights.push('你是 Prompt 工程的高手，善于和 AI 沟通');
        } else if (dimensions.P <= 2) {
            insights.push('你更倾向于直接了当，不太在意 Prompt 技巧');
        }

        if (dimensions.R >= 4) {
            insights.push('你对代码质量要求很高，不轻易相信 AI');
        } else if (dimensions.R <= 2) {
            insights.push('你相信 AI 的能力，愿意快速尝试');
        }

        if (dimensions.S <= 2) {
            insights.push('你对 AI 有一定依赖，基础记忆可能有所退化');
        } else if (dimensions.S >= 4) {
            insights.push('你保持着扎实的技术功底，AI 只是你的辅助');
        }

        if (dimensions.E >= 4) {
            insights.push('你对 AI 发展感到焦虑，需要调整心态');
        } else if (dimensions.E <= 2) {
            insights.push('你对 AI 发展持乐观态度，心态健康');
        }

        if (dimensions.W >= 4) {
            insights.push('你善于和 AI 协作，把它当成真正的伙伴');
        } else if (dimensions.W <= 2) {
            insights.push('你更倾向于独立完成工作');
        }

        return insights;
    }

    // 主分析函数
    analyze() {
        const dimensions = this.calculateDimensions();
        const matches = this.calculateMatches(dimensions);
        const analysis = this.getDetailedAnalysis(dimensions);
        
        return {
            dimensions,
            matches,
            analysis,
            primaryType: matches[0],
            secondaryType: matches[1]
        };
    }

    // 重置分数
    reset() {
        this.initScores();
    }
}

// 全局算法实例
let pbtiAlgorithm = new PBTIAlgorithm();

// 导出（如果在模块环境中）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PBTIAlgorithm };
}
