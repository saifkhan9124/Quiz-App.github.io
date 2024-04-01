const questions = [
    {
        question: "what is tha capital of pakistan",
        answers: [
            { text: "islamabad", correct: true },
            { text: "karachi", correct: false },
            { text: "lahore", correct: false },
            { text: "queta", correct: false },
        ]
    },
    {
        question: "loremloremlorem lorem lorem",
        answers: [
            { text: "shark", correct: false },
            { text: "blue", correct: true },
            { text: "red", correct: false },
            { text: "shark", correct: false },
        ]
    },
    {
        question: "loremloremlorem lorem lorem",
        answers: [
            { text: "shark", correct: false },
            { text: "blue", correct: false },
            { text: "red", correct: false },
            { text: "shark", correct: true },
        ]
    }

];
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-button");
const nextButton = document.getElementById("next-button");
let currentQustionIndex = 0;
let score = 0;
function startQuiz() {
    currentQustionIndex = 0;
    score = 0;
    nextButton.innerHTML = "next";
    showQuestion();
}
function showQuestion() {
    reststate();
    let currentQustion = questions[currentQustionIndex];
    let questionNo = currentQustionIndex + 1;
    questionElement.innerText = questionNo + "." + currentQustion.question;

    currentQustion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        button.addEventListener("click", selectAnswer);
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
    });
}

function reststate() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
};
function selectAnswer(e) {
    const selectedbtn = e.target;
    const correct = selectedbtn.dataset.correct === "true"
    if (correct) {
        selectedbtn.classList.add("correct");
        score++
    }
    else {
        selectedbtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    })
    nextButton.style.display = "block"
}
function showScore(){
    reststate();
    questionElement.innerHTML=`you scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML="play Again";
    nextButton.style.display="block"
}
function handelNextButton() {
    currentQustionIndex++;
    if (currentQustionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}
nextButton.addEventListener("click", () => {
    if (currentQustionIndex < questions.length) {
        handelNextButton();
    } else {
        startQuiz();
    }
})
startQuiz();