/* ---------------- QUIZ DATA (SIMULATION) ---------------- */
const quizzes = {
    LM35: {
        title: "LM35 Temperature Sensor",
        questions: [
            {
                text: "Čo meria LM35?",
                answers: ["Teplotu", "Vzdialenosť", "Magnetické pole", "Polohu"],
                correct: 0
            },
            {
                text: "Aký typ výstupu má LM35 v simulácii Soria?",
                answers: ["Digitálny", "Analógový", "I2C", "PWM"],
                correct: 1
            },
            {
                text: "Na ktorý pin je LM35 v Pico pripojený pre výstup signálu?",
                answers: ["GP20", "GP21", "GP26", "GP17"],
                correct: 2
            },
            {
                text: "Čo v laboratóriu ovplyvňuje nameranú teplotu LM35?",
                answers: ["Magnet", "Heater", "Powerbank", "Akcelerometer"],
                correct: 1
            }
        ]
    },

    URM09: {
        title: "URM09 Ultrasonic Distance Sensor",
        questions: [
            {
                text: "Na čo sa URM09 používa?",
                answers: ["Meranie teploty", "Meranie vzdialenosti", "Detekcia magnetu", "Meranie zrýchlenia"],
                correct: 1
            },
            {
                text: "Aký typ snímača je URM09 z hľadiska kontaktu s objektom?",
                answers: ["Kontaktný", "Bezkontaktný", "Mechanický", "Tepelný"],
                correct: 1
            },
            {
                text: "Ktoré dva dátové piny používa URM09 pri Pico v Soria?",
                answers: ["GP26 a GP27", "GP20 a GP21", "GP16 a GP17", "A4 a A5"],
                correct: 1
            },
            {
                text: "Aký objekt v laboratóriu je možné použiť na testovanie vzdialenosti URM09?",
                answers: ["Heater", "Magnet", "Avatar", "Powerbank"],
                correct: 0
            }
        ]
    },

    I2C: {
        title: "I2C Triple Axis Accelerometer",
        questions: [
            {
                text: "Čo meria akcelerometer?",
                answers: ["Teplotu", "Zrýchlenie", "Vlhkosť", "Svetlo"],
                correct: 1
            },
            {
                text: "Koľko osí sleduje trojosový akcelerometer?",
                answers: ["1", "2", "3", "4"],
                correct: 2
            },
            {
                text: "Aký komunikačný spôsob používa tento senzor v Soria?",
                answers: ["Analógový výstup", "USB", "I2C", "PWM"],
                correct: 2
            },
            {
                text: "Čo v simulácii ovplyvňuje hodnoty akcelerometra?",
                answers: ["Presúvanie dosky v priestore laboratória", "Zmena farby pozadia", "Kliknutie na konzolu", "Pripojenie powerbanky"],
                correct: 0
            }
        ]
    },

    GP2Y0A41SK0F: {
        title: "Distance Measuring Sensor Unit",
        questions: [
            {
                text: "Aký typ veličiny tento senzor sleduje?",
                answers: ["Vzdialenosť", "Teplotu", "Tlak", "Vlhkosť"],
                correct: 0
            },
            {
                text: "Aký typ výstupu má GP2Y0A41SK0F v Soria?",
                answers: ["I2C", "Digitálny iba 0/1", "Analógový", "USB"],
                correct: 2
            },
            {
                text: "Na ktorý pin sa pripája výstup tohto senzora pri Uno?",
                answers: ["A0", "A4", "D2", "5V"],
                correct: 0
            },
            {
                text: "Čím sa v laboratóriu testuje reakcia tohto senzora?",
                answers: ["Magnetom", "Heater objektom", "Zmenou časovača", "Prihlásením používateľa"],
                correct: 1
            }
        ]
    },

    potentiometer: {
        title: "Analog Slide Position",
        questions: [
            {
                text: "Čo predstavuje výstup potenciometra?",
                answers: ["Digitálny impulz", "Analógovú hodnotu polohy", "Teplotu", "Zvuk"],
                correct: 1
            },
            {
                text: "Ako používateľ mení hodnotu potenciometra v simulácii?",
                answers: ["Presúvaním tracku/slidera", "Klikaním na konzolu", "Zapínaním powerbanky", "Pridávaním heatera"],
                correct: 0
            },
            {
                text: "Na ktorý pin sa pripája výstup potenciometra pri Pico?",
                answers: ["GP26", "GP20", "GP21", "GP16"],
                correct: 0
            },
            {
                text: "Aký typ senzora je slide position senzor podľa spôsobu merania?",
                answers: ["Senzor polohy", "Senzor teploty", "Senzor magnetizmu", "Senzor vzdialenosti"],
                correct: 0
            }
        ]
    },

    hall: {
        title: "Digital Hall Sensor",
        questions: [
            {
                text: "Na čo reaguje Hall senzor?",
                answers: ["Na svetlo", "Na magnetické pole", "Na teplotu", "Na tlak"],
                correct: 1
            },
            {
                text: "Aký typ výstupu má digitálny Hall senzor?",
                answers: ["Analógový", "Digitálny", "I2C", "Zvukový"],
                correct: 1
            },
            {
                text: "Aký objekt v laboratóriu sa používa na testovanie Hall senzora?",
                answers: ["Heater", "Magnet", "Powerbank", "Akcelerometer"],
                correct: 1
            },
            {
                text: "Na ktorý typ pinov sa Hall senzor typicky pripája?",
                answers: ["Digitálne GPIO piny", "Len USB", "Len SDA/SCL", "Len analógové A0 bez výnimky"],
                correct: 0
            }
        ]
    }
};


/* ---------------- STATE ---------------- */

const params = new URLSearchParams(window.location.search);
const topicId = params.get("topic") || "LM35";
const quiz = quizzes[topicId];



if (!quiz) {
    alert("Kvíz pre túto tému nebol nájdený.");
    window.location.href = "../topichub/topichub.html";
}

// variable for the questions

let currentQuestion = 0;
let score = 0;
let selectedAnswerIndex = null;
let answered = false;

/* ---------------- ELEMENTS ---------------- */

const titleEl = document.getElementById("quiz-title");
const questionEl = document.getElementById("question-text");
const counterEl = document.querySelector(".counter");
const progressEl = document.querySelector(".progress-fill");
const answerButtons = document.querySelectorAll(".answer-btn");
const nextBtn = document.querySelector(".next-btn");

const feedbackBox = document.getElementById("feedback-box");

/* ---------------- FUNCTIONS ---------------- */

function renderQuestion() {
    const q = quiz.questions[currentQuestion];

    titleEl.textContent = quiz.title;
    questionEl.textContent = q.text;
    counterEl.textContent = `${currentQuestion + 1} / ${quiz.questions.length}`;

    selectedAnswerIndex = null;
    answered = false;
    feedbackBox.textContent = "";
    nextBtn.disabled = true;

    answerButtons.forEach((btn, i) => {
        btn.textContent = q.answers[i];
        btn.classList.remove("selected", "correct", "wrong");
        btn.disabled = false;
    });

    updateProgress();
}

function updateProgress() {
    const percent = ((currentQuestion + 1) / quiz.questions.length) * 100;
    progressEl.style.width = percent + "%";
}

/* ---------------- ANSWER SELECTION ---------------- */

answerButtons.forEach((btn, index) => {
    btn.onclick = () => {
        if (answered) return;

        const q = quiz.questions[currentQuestion];
        selectedAnswerIndex = index;
        answered = true;

        answerButtons.forEach((b, i) => {
            b.disabled = true;
            b.classList.remove("selected");

            if (i === q.correct) {
                b.classList.add("correct");
            }

            if (i === selectedAnswerIndex && i !== q.correct) {
                b.classList.add("wrong");
            }
        });

        if (selectedAnswerIndex === q.correct) {
            score++;
            feedbackBox.textContent = "Správna odpoveď.";
        } else {
            feedbackBox.textContent = `Nesprávna odpoveď. Správna odpoveď je: ${q.answers[q.correct]}.`;
        }

        nextBtn.disabled = false;
    };
});

function saveQuizResult(percent) {
    const topicId = new URLSearchParams(window.location.search).get("topic") || "LM35";

    const existing = JSON.parse(localStorage.getItem("soriaQuizResults")) || {};

    if (!existing[topicId]) {
        existing[topicId] = {
            best: percent,
            last: percent,
            attempts: 1
        };
    } else {
        existing[topicId].last = percent;
        existing[topicId].attempts += 1;
        if (percent > existing[topicId].best) {
            existing[topicId].best = percent;
        }
    }

    localStorage.setItem("soriaQuizResults", JSON.stringify(existing));
}

function showResults() {
    const percent = Math.round((score / quiz.questions.length) * 100);

    titleEl.textContent = quiz.title;
    questionEl.textContent = `Kvíz dokončený. Vaše skóre: ${score} / ${quiz.questions.length} (${percent}%)`;
    counterEl.textContent = "Výsledok";
    feedbackBox.textContent = "";

    answerButtons.forEach(btn => {
        btn.style.display = "none";
    });

    nextBtn.textContent = "Späť na témy";
    nextBtn.disabled = false;
    nextBtn.onclick = () => {
        window.location.href = "../topichub/topichub.html";
    };

    progressEl.style.width = "100%";

    saveQuizResult(percent);
}

/* ---------------- NEXT BUTTON ---------------- */

nextBtn.onclick = () => {
    if (!answered) return;

    if (currentQuestion < quiz.questions.length - 1) {
        currentQuestion++;
        renderQuestion();
    } else {
        showResults();
    }
};

/* ---------------- NAVIGATION ---------------- */

function goBack() {
    if (history.length > 1) history.back();
    else window.location.href = "../topichub/topichub.html";
}

/* ---------------- INIT ---------------- */

renderQuestion();