/* ---------------- QUIZ DATA (SIMULATION) ---------------- */

const quizzes = {
    capacitive: {
        title: "Kapacitné senzory",
        questions: [
            {
                text: "Čo merajú snímače posunutia?",
                answers: ["Biológiu", "Vzdialenosť", "Ťažký priemysel", "Vesmír"],
                correct: 1
            },
            {
                text: "Kde sa kapacitné senzory často používajú?",
                answers: ["V medicíne", "V poľnohospodárstve", "V elektronike", "Všetky uvedené"],
                correct: 3
            },
            {
                text: "Aké materiály dokážu detekovať?",
                answers: ["Len kovy", "Len kvapaliny", "Široké spektrum materiálov", "Len plasty"],
                correct: 2
            },
            {
                text: "Hlavná výhoda kapacitných senzorov je:",
                answers: ["Rýchlosť", "Citlivosť", "Cena", "Veľkosť"],
                correct: 1
            }
        ]
    },

    inductive: {
        title: "Indukčné senzory",
        questions: [
            {
                text: "Čo detekujú indukčné senzory?",
                answers: ["Plasty", "Kvapaliny", "Kovy", "Plyn"],
                correct: 2
            }
        ]
    }
};

/* ---------------- STATE ---------------- */

const params = new URLSearchParams(window.location.search);
const quizKey = params.get("quiz") || "capacitive";
const quiz = quizzes[quizKey];

let currentQuestion = 0;

/* ---------------- ELEMENTS ---------------- */

const titleEl = document.getElementById("quiz-title");
const questionEl = document.getElementById("question-text");
const counterEl = document.querySelector(".counter");
const progressEl = document.querySelector(".progress-fill");
const answerButtons = document.querySelectorAll(".answer-btn");
const nextBtn = document.querySelector(".next-btn");

/* ---------------- FUNCTIONS ---------------- */

function renderQuestion() {
    const q = quiz.questions[currentQuestion];

    titleEl.textContent = quiz.title;
    questionEl.textContent = q.text;
    counterEl.textContent = `${currentQuestion + 1} / ${quiz.questions.length}`;

    answerButtons.forEach((btn, i) => {
        btn.textContent = q.answers[i];
        btn.classList.remove("selected");
    });

    updateProgress();
}

function updateProgress() {
    const percent = ((currentQuestion + 1) / quiz.questions.length) * 100;
    progressEl.style.width = percent + "%";
}

/* ---------------- ANSWER SELECTION ---------------- */

answerButtons.forEach(btn => {
    btn.onclick = () => {
        answerButtons.forEach(b => b.classList.remove("selected"));
        btn.classList.add("selected");
    };
});

/* ---------------- NEXT BUTTON ---------------- */

nextBtn.onclick = () => {
    if (currentQuestion < quiz.questions.length - 1) {
        currentQuestion++;
        renderQuestion();
    } else {
        alert("Kvíz dokončený (simulácia)");
    }
};

/* ---------------- NAVIGATION ---------------- */

function goBack() {
    if (history.length > 1) history.back();
    else window.location.href = "../theory/theory.html";
}

/* ---------------- INIT ---------------- */

renderQuestion();