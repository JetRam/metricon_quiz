// Question pools: 5+ per category
const quizData = {
  easy: [
    { q: "Metricon is best known for building:", a: ["Cars", "Homes", "Schools", "Gardens", "Hotels"], correct: "Homes" },
    { q: "Where was Metricon founded?", a: ["UK", "New Zealand", "Australia", "USA", "Canada"], correct: "Australia" },
    { q: "Metricon’s design philosophy centers on:", a: ["Cost-cutting", "Luxury living", "Durability", "Speed", "Tiny homes"], correct: "Luxury living" },
    { q: "Metricon offers its homes primarily in which continent?", a: ["Asia", "Europe", "Australia", "America", "Africa"], correct: "Australia" },
    { q: "Metricon's slogan most relates to:", a: ["Innovation", "Design freedom", "Cheap builds", "DIY culture", "Recycling"], correct: "Design freedom" },
    { q: "Metricon was founded in which decade?", a: ["1960s", "1970s", "1980s", "1990s", "2000s"], correct: "1970s" }
  ],
  hard: [
    { q: "Metricon’s 'Freedom' series focuses on:", a: ["Custom luxury", "Affordable style", "Sustainability", "Compact living", "Commercial spaces"], correct: "Affordable style" },
    { q: "Which of these is NOT a Metricon collection?", a: ["Freedom", "Designer", "Elevate", "Signature", "Harmony"], correct: "Harmony" },
    { q: "Metricon’s primary service type is:", a: ["Renovations", "New home builds", "Landscaping", "Furniture design", "Interior styling"], correct: "New home builds" },
    { q: "Metricon showcases display homes in how many Australian states?", a: ["2", "3", "4", "5", "6"], correct: "5" },
    { q: "Metricon's head office is located in:", a: ["Sydney", "Melbourne", "Brisbane", "Adelaide", "Perth"], correct: "Melbourne" },
    { q: "Which group owns Metricon as of mid-2020s?", a: ["Lendlease", "Metricon Holdings", "Mirvac", "Stockland", "Independent"], correct: "Metricon Holdings" }
  ],
  challenging: [
    { q: "Metricon’s sustainability initiatives most closely align with:", a: ["Net-zero homes", "Solar-only design", "Passive ventilation", "Recycled builds", "Compact apartments"], correct: "Net-zero homes" },
    { q: "What differentiates the Signature series?", a: ["Speed", "Luxury customisation", "Green materials", "Low cost", "Compact size"], correct: "Luxury customisation" },
    { q: "Metricon's first display home was built in:", a: ["1972", "1976", "1982", "1988", "1992"], correct: "1976" },
    { q: "Which partner brand works closely with Metricon for interiors?", a: ["Harvey Norman", "Dulux", "IKEA", "Freedom", "Domayne"], correct: "Dulux" },
    { q: "Metricon’s 'Studio M' design center focuses on:", a: ["Material selection", "Training", "Marketing", "Finance", "Land development"], correct: "Material selection" },
    { q: "Which Metricon initiative targets energy efficiency?", a: ["HomeSmart", "EcoLife", "GreenLiving", "SmartHomes", "BrightFuture"], correct: "GreenLiving" }
  ]
};

const points = { easy: 1, hard: 2, challenging: 3 };
let nickname = "";
let level = "";
let currentQuestion = 0;
let score = 0;
let selectedQuestions = [];

// DOM Elements
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
  if (!nickname) return alert("Please enter a nickname!");
  nicknameScreen.classList.add("hidden");
  difficultyScreen.classList.remove("hidden");
});

document.querySelectorAll(".difficulty").forEach(btn => {
  btn.addEventListener("click", () => {
    level = btn.dataset.level;
    startQuiz(level);
  });
});

function getRandomQuestions(data, num = 5) {
  return data.sort(() => Math.random() - 0.5).slice(0, num);
}

function startQuiz(level) {
  currentQuestion = 0;
  score = 0;
  selectedQuestions = getRandomQuestions(quizData[level], 5);
  difficultyScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");
  loadQuestion();
}

function loadQuestion() {
  if (currentQuestion >= selectedQuestions.length) return showResults();
  const current = selectedQuestions[currentQuestion];
  questionEl.textContent = current.q;
  optionsEl.innerHTML = "";
  progressEl.textContent = `Question ${currentQuestion + 1} of ${selectedQuestions.length}`;

  current.a.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.onclick = () => checkAnswer(option, current.correct);
    optionsEl.appendChild(btn);
  });
}

function checkAnswer(selected, correct) {
  if (selected === correct) score += points[level];
  currentQuestion++;
  loadQuestion();
}

function showResults() {
  quizScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");

  document.getElementById("final-score").textContent = `${nickname}, your score: ${score} points`;

  const leaderboard = JSON.parse(localStorage.getItem("leaderboard") || "[]");
  leaderboard.push({ nickname, score });
  leaderboard.sort((a, b) => b.score - a.score);
  localStorage.setItem("leaderboard", JSON.stringify(leaderboard.slice(0, 5)));

  leaderboardEl.innerHTML = leaderboard.map(e => `<li>${e.nickname} - ${e.score} pts</li>`).join("");
}

document.getElementById("restart-btn").addEventListener("click", () => {
  resultScreen.classList.add("hidden");
  nicknameScreen.classList.remove("hidden");
});

