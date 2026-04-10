// PBTI - 应用主逻辑

// 全局状态
let currentQuestion = 0;
let answers = [];

// DOM 元素
const pages = {
    home: document.getElementById('home'),
    quiz: document.getElementById('quiz'),
    loading: document.getElementById('loading'),
    result: document.getElementById('result')
};

// 切换页面
function showPage(pageName) {
    Object.values(pages).forEach(page => page.classList.remove('active'));
    pages[pageName].classList.add('active');
}

// 开始测试
function startTest() {
    currentQuestion = 0;
    answers = [];
    pbtiAlgorithm.reset();
    showPage('quiz');
    renderQuestion();
}

// 渲染题目
function renderQuestion() {
    const question = QUESTIONS[currentQuestion];
    const totalQuestions = QUESTIONS.length;
    
    // 更新进度
    document.getElementById('currentQ').textContent = currentQuestion + 1;
    document.getElementById('totalQ').textContent = totalQuestions;
    document.getElementById('progressFill').style.width = 
        `${((currentQuestion + 1) / totalQuestions) * 100}%`;
    
    // 更新题目文本
    document.getElementById('questionText').textContent = question.question;
    
    // 渲染选项
    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = option.text;
        btn.onclick = () => selectAnswer(index);
        optionsContainer.appendChild(btn);
    });
}

// 选择答案
function selectAnswer(optionIndex) {
    const question = QUESTIONS[currentQuestion];
    
    // 记录答案
    answers.push({
        questionId: question.id,
        optionIndex: optionIndex
    });
    
    // 记录到算法
    pbtiAlgorithm.recordAnswer(question.id, optionIndex);
    
    // 下一题或结束
    currentQuestion++;
    
    if (currentQuestion < QUESTIONS.length) {
        // 添加过渡动画
        const questionBox = document.querySelector('.question-box');
        questionBox.style.opacity = '0';
        questionBox.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
            renderQuestion();
            questionBox.style.opacity = '1';
            questionBox.style.transform = 'translateX(0)';
        }, 200);
    } else {
        showLoading();
    }
}

// 显示加载页面
function showLoading() {
    showPage('loading');
    
    const tipsElement = document.getElementById('loadingTips');
    let tipIndex = 0;
    
    // 循环显示提示
    const tipInterval = setInterval(() => {
        tipsElement.textContent = LOADING_TIPS[tipIndex % LOADING_TIPS.length];
        tipIndex++;
    }, 800);
    
    // 3秒后显示结果
    setTimeout(() => {
        clearInterval(tipInterval);
        showResult();
    }, 3500);
}

// 显示结果
function showResult() {
    const result = pbtiAlgorithm.analyze();
    const primaryType = result.primaryType.personality;
    
    // 填充结果数据
    document.getElementById('resultCode').textContent = primaryType.code;
    document.getElementById('resultTitle').textContent = primaryType.name;
    document.getElementById('resultIcon').textContent = primaryType.icon;
    document.getElementById('resultSlogan').textContent = `"${primaryType.slogan}"`;
    document.getElementById('resultDesc').textContent = primaryType.desc;
    document.getElementById('resultAdvice').textContent = primaryType.advice;
    document.getElementById('resultSimilar').textContent = primaryType.similar;
    
    // 渲染维度统计条
    renderStatBars(result.dimensions);
    
    showPage('result');
    
    // 添加动画效果
    animateResultCard();
}

// 渲染统计条
function renderStatBars(dimensions) {
    const container = document.getElementById('statBars');
    container.innerHTML = '';
    
    const dimNames = {
        P: 'Prompt风格',
        R: '审查严格度',
        S: '技术依赖度',
        E: 'AI焦虑指数',
        W: '协作模式'
    };
    
    Object.entries(dimensions).forEach(([dim, score]) => {
        const bar = document.createElement('div');
        bar.className = 'stat-bar';
        bar.innerHTML = `
            <span class="stat-label">${dimNames[dim]}</span>
            <div class="stat-track">
                <div class="stat-fill" style="width: 0%"></div>
            </div>
            <span class="stat-value">${score}</span>
        `;
        container.appendChild(bar);
        
        // 动画填充
        setTimeout(() => {
            bar.querySelector('.stat-fill').style.width = `${(score / 5) * 100}%`;
        }, 100);
    });
}

// 结果卡片动画
function animateResultCard() {
    const card = document.querySelector('.result-card');
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
        card.style.transition = 'all 0.5s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    }, 100);
}

// 分享结果
function shareResult() {
    const code = document.getElementById('resultCode').textContent;
    const title = document.getElementById('resultTitle').textContent;
    const slogan = document.getElementById('resultSlogan').textContent;
    
    const shareText = `我的 PBTI 人格是 ${code} - ${title}\n${slogan}\n\n来测测你的 AI 人格：https://pbti.dev`;
    
    // 复制到剪贴板
    navigator.clipboard.writeText(shareText).then(() => {
        alert('结果已复制到剪贴板！');
    }).catch(() => {
        // 降级方案
        const textArea = document.createElement('textarea');
        textArea.value = shareText;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert('结果已复制到剪贴板！');
    });
}

// 重新测试
function retakeTest() {
    startTest();
}

// 键盘导航
document.addEventListener('keydown', (e) => {
    if (!pages.quiz.classList.contains('active')) return;
    
    const key = parseInt(e.key);
    if (key >= 1 && key <= 3) {
        const options = document.querySelectorAll('.option-btn');
        if (options[key - 1]) {
            options[key - 1].click();
        }
    }
});

// 初始化
window.addEventListener('DOMContentLoaded', () => {
    console.log('🎮 PBTI 已加载');
    console.log(' Programmer Behavioral Type Indicator');
    console.log(' 32 题 · 16 种人格 · 像素风');
});

// 防止页面刷新时丢失进度（可选）
window.addEventListener('beforeunload', (e) => {
    if (currentQuestion > 0 && currentQuestion < QUESTIONS.length) {
        e.preventDefault();
        e.returnValue = '测试进行中，确定要离开吗？';
    }
});
