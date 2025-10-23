const quizData = {
  easy: [
    { q: "What is Metricon best known for?", a: ["Cars", "Homes", "Hotels", "Gardens"], correct: "Homes" },
    { q: "Metricon was founded in which country?", a: ["USA", "UK", "Australia", "Canada"], correct: "Australia" },
  ],
  hard: [
    { q: "Metricon’s signature home design collection is called?", a: ["Grand Series", "Designer Range", "HomeStyle", "Freedom"], correct: "Freedom" },
    { q: "Metricon’s ‘Lookbook’ is focused on?", a: ["Landscaping tips", "Home design inspiration", "Budget tracking", "Kitchen recipes"], correct: "Home design inspiration" },
  ],
  challenging: [
    { q: "Which Metricon concept highlights both affordability and luxury?", a: ["HomeStarter", "Freedom Series", "Premium Range", "Elite Homes"], correct: "Freedom Series" },
    { q: "Metricon’s flagship display homes are showcased in how many Australian states?", a: ["2", "3", "4", "5+"], correct: "5+" },
  ]
};

let nickname = "";
let level = "";
let currentQuestion = 0;
let score = 0;

const nicknameScreen = document.getElementById("nickname-screen");
const difficultyScreen = document.getElementById("difficulty-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const progressEl = document.getElementById("progress");
const leaderboardEl = document.getElementById("leaderboard");

document.getElementById("start-btn").addEventListener("click", () => {
  nickname = document.getElementById("nickname").value.trim();
  if (nickname === "") return alert("Please enter a nickname!");
  nicknameScreen.classList.add("hidden");
  difficultyScreen.classList.remove("hidden");
});

document.querySelectorAll(".difficulty").forEach(btn => {
  btn.addEventListener("click", () => {
    level = btn.dataset.level;
    currentQuestion = 0;
    score = 0;
    difficultyScreen.classList.add("hidden");
    quizScreen.classList.remove("hidden");
    loadQuestion();
  });
});

function loadQuestion() {
  const data = quizData[level];
  if (currentQuestion >= data.length) return showResults();
  const current = data[currentQuestion];
  questionEl.textContent = current.q;
  optionsEl.innerHTML = "";
  progressEl.textContent = `Question ${currentQuestion + 1} of ${data.length}`;

  current.a.forEach(option => {
    const button = document.createElement("button");
    button.textContent = option;
    button.onclick = () => checkAnswer(option, current.correct);
    optionsEl.appendChild(button);
  });
}

function checkAnswer(selected, correct) {
  if (selected === correct) score++;
  currentQuestion++;
  loadQuestion();
}

function showResults() {
  quizScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");
  document.getElementById("final-score").textContent = `${nickname}, your score: ${score}`;

  const leaderboard = JSON.parse(localStorage.getItem("leaderboard") || "[]");
  leaderboard.push({ nickname, score });
  leaderboard.sort((a, b) => b.score - a.score);
  localStorage.setItem("leaderboard", JSON.stringify(leaderboard.slice(0, 5)));

  leaderboardEl.innerHTML = leaderboard.map(e => `<li>${e.nickname} - ${e.score}</li>`).join("");
}

document.getElementById("restart-btn").addEventListener("click", () => {
  resultScreen.classList.add("hidden");
  nicknameScreen.classList.remove("hidden");
});
