const questions = [
    { type: "一、单词题", question: "___", hint: "苹果", options: ["Apple", "Banana", "Orange", "Grape"], correct: "Apple" },
    { type: "一、单词题", question: "___", hint: "狗", options: ["Cat", "Dog", "Fish", "Bird"], correct: "Dog" },
    { type: "二、单选题", img: "imgs/quiz_img1.jpg", question: "这是什么？", options: ["A", "B", "C", "D"], correct: "A" },
    { type: "三、多选题", img: "imgs/quiz_img2.jpg", question: "哪些是水果？", options: ["Apple", "Dog", "Banana", "Carrot", "Orange", "Cat"], correct: ["Apple", "Banana", "Orange"] }
];

let currentQuestionIndex = 0;
let correctCount = 0;
let wrongCount = 0;

function loadQuestion() {
    const questionType = document.querySelector(".question-type");
    const questionText = document.querySelector(".question-text");
    const questionImage = document.querySelector(".question-image");
    const optionsContainer = document.querySelector(".options");

    // **清空选项**
    optionsContainer.innerHTML = "";  

    const currentQuestion = questions[currentQuestionIndex];

    questionType.innerText = currentQuestion.type;
    questionImage.innerHTML = currentQuestion.img ? `<img src="${currentQuestion.img}">` : "";
    questionImage.style.display = currentQuestion.img ? "block" : "none";
    questionText.innerHTML = currentQuestion.hint || currentQuestion.question;

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
        if (currentQuestion.correct.includes(selected)) {
            btn.classList.add("correct");
        } else {
            btn.classList.add("wrong");
            document.querySelectorAll(".option").forEach(optionBtn => {
                if (currentQuestion.correct.includes(optionBtn.innerText)) {
                    optionBtn.classList.add("correct");
                }
            });
        }
    } else {
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

    // **去掉 next 按钮逻辑，直接跳转下一题**
    setTimeout(() => {
        currentQuestionIndex++;

        if (currentQuestionIndex < questions.length) {
            loadQuestion();
        } else {
            showResults();
        }
    }, 1000); // **延迟 1 秒，让用户看到正确/错误**
}

function showResults() {
    document.querySelector(".quiz-container").style.display = "none";
    document.querySelector(".result-container").style.display = "flex";
    document.getElementById("score").innerText = `得分: ${correctCount * 10} 分`;
    document.getElementById("correct-count").innerText = `✅ 正确: ${correctCount} 题`;
    document.getElementById("wrong-count").innerText = `❌ 错误: ${wrongCount} 题`;
}

function returnToHome() {
    window.location.href = "index.html"; // **返回首页**
}

// **删除了所有 next 按钮的代码**
loadQuestion();
