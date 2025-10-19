const questions = [
    // 单词题
    { question: "___", hint: "苹果", options: ["Apple", "Banana", "Orange", "Grape"], correct: "Apple" },
    { question: "___", hint: "狗", options: ["Cat", "Dog", "Fish", "Bird"], correct: "Dog" },
    
    // 单项选择题（带图片）
    { img: "imgs/quiz_img1.jpg", question: "这是什么？", options: ["A", "B", "C", "D"], correct: "A" },

    // 多项选择题
    { img: "imgs/quiz_img2.jpg", question: "哪些是水果？", options: ["Apple", "Dog", "Banana", "Carrot", "Orange", "Cat"], correct: ["Apple", "Banana", "Orange"] }
];

let currentQuestionIndex = 0;
let correctCount = 0;
let wrongCount = 0;

function loadQuestion() {
    const quizContainer = document.querySelector(".quiz-container");
    const questionText = document.querySelector(".question-text");
    const optionsContainer = document.querySelector(".options");
    const nextButton = document.querySelector(".next-btn");

    nextButton.style.display = "none"; // 隐藏下一题按钮
    optionsContainer.innerHTML = ""; // 清空选项

    const currentQuestion = questions[currentQuestionIndex];

    if (currentQuestion.img) {
        questionText.innerHTML = `<img src="${currentQuestion.img}" style="max-width: 128px;"><br>${currentQuestion.question}`;
    } else {
        questionText.innerHTML = `<div class="word-line"></div><br>${currentQuestion.hint}`;
    }

    currentQuestion.options.forEach(option => {
        const btn = document.createElement("button");
        btn.classList.add("option");
        btn.innerText = option;
        btn.onclick = () => checkAnswer(option, btn);
        optionsContainer.appendChild(btn);
    });
}

function checkAnswer(selected, btn) {
    const currentQuestion = questions[currentQuestionIndex];

    if (Array.isArray(currentQuestion.correct)) {
        // 多选题逻辑
        if (currentQuestion.correct.includes(selected)) {
            btn.classList.add("correct");
        } else {
            btn.classList.add("wrong");
            // 显示正确答案
            document.querySelectorAll(".option").forEach(optionBtn => {
                if (currentQuestion.correct.includes(optionBtn.innerText)) {
                    optionBtn.classList.add("correct");
                }
            });
        }
    } else {
        // 单选题逻辑
        if (selected === currentQuestion.correct) {
            btn.classList.add("correct");
            correctCount++;
        } else {
            btn.classList.add("wrong");
            wrongCount++;
            document.querySelectorAll(".option").forEach(optionBtn => {
                if (optionBtn.innerText === currentQuestion.correct) {
                    optionBtn.classList.add("correct");
                }
            });
        }
    }

    document.querySelector(".next-btn").style.display = "block"; // 显示下一题按钮
}

function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        document.querySelector(".quiz-container").style.display = "none";
        document.querySelector(".result-container").style.display = "block";
        document.getElementById("score").innerText = `得分: ${correctCount * 10} 分`;
        document.getElementById("correct-count").innerText = `正确: ${correctCount} 题`;
        document.getElementById("wrong-count").innerText = `错误: ${wrongCount} 题`;
    }
}

loadQuestion();