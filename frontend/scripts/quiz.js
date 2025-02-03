const questions = [
  {
    question: "Identify the crop disease shown in the image.",
    image: "../assets/leafrust.png",
    options: ["Leaf Rust", "Powdery Mildew", "Blight", "Root Rot"],
    correct: 0,
    explanation: "Leaf rust appears as orange or brown spots on leaves."
  },
  {
    question: "Which crop is best for waterlogged areas?",
    options: ["Rice", "Wheat", "Maize", "Cotton"],
    correct: 0,
    explanation: "Rice thrives in waterlogged conditions due to its unique root system."
  },
  {
    question: "What is the pH range suitable for most crops?",
    options: ["4-5", "5.5-7", "8-9", "3-4"],
    correct: 1,
    explanation: "Most crops prefer slightly acidic to neutral soil (pH 5.5-7)."
  },
  {
    question: "Which method is best for irrigation in dry areas?",
    options: ["Drip irrigation", "Sprinkler irrigation", "Flood irrigation", "Canal irrigation"],
    correct: 0,
    explanation: "Drip irrigation is most efficient in dry areas."
  },
  {
    question: "What is the major nutrient needed for plant growth?",
    options: ["Nitrogen", "Calcium", "Iron", "Sodium"],
    correct: 0,
    explanation: "Nitrogen is crucial for leaf development and chlorophyll production."
  },
  {
    question: "Which farming practice helps prevent soil erosion?",
    options: ["Contour plowing", "Mono-cropping", "Overgrazing", "Deforestation"],
    correct: 0,
    explanation: "Contour plowing reduces water runoff and soil erosion."
  },
  {
    question: "What is the primary symptom of nitrogen deficiency in plants?",
    options: ["Yellowing of leaves", "Purple stems", "Brown spots", "Stunted roots"],
    correct: 0,
    explanation: "Nitrogen deficiency causes yellowing of older leaves."
  },
  {
    question: "Which pest is commonly found in rice fields?",
    options: ["Aphids", "Bollworms", "Stem borers", "Whiteflies"],
    correct: 2,
    explanation: "Stem borers are a major pest in rice cultivation."
  },
  {
    question: "What is the ideal temperature for wheat cultivation?",
    options: ["10-15°C", "20-25°C", "30-35°C", "40-45°C"],
    correct: 1,
    explanation: "Wheat grows best in moderate temperatures (20-25°C)."
  },
  {
    question: "Identify the nutrient deficiency shown in the image.",
    image: "../assets/k.png",
    options: ["Nitrogen", "Potassium", "Phosphorus", "Magnesium"],
    correct: 1,
    explanation: "Potassium deficiency causes yellowing and browning of leaf edges."
  }
];

const userData = {
  totalQuizzesTaken: 0,
  totalScore: 0,
  averageScore: 0,
  lastQuizScore: 0,
};

const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const startButton = document.getElementById('start-button');
const nextButton = document.getElementById('next-button');
const retakeButton = document.getElementById('retake-button');
const homeButtonStart = document.getElementById('home-button-start');
const homeButtonResult = document.getElementById('home-button-result');
const imageContainer = document.getElementById('image-container');
const questionImage = document.getElementById('question-image');

let currentQuestion = 0;
let score = 0;
let userAnswers = [];

function initializeQuiz() {
  currentQuestion = 0;
  score = 0;
  userAnswers = [];
  updateProgress();
  updateScore();
}

function startQuiz() {
  initializeQuiz();
  startScreen.classList.add('hidden');
  quizScreen.classList.remove('hidden');
  showQuestion();
}

function showQuestion() {
  const question = questions[currentQuestion];
  const optionsContainer = document.getElementById('options-container');
  const questionBox = document.getElementById('question-box');

  questionBox.textContent = question.question;
  optionsContainer.innerHTML = '';

  if (question.image) {
    imageContainer.classList.remove('hidden');
    questionImage.src = question.image;
  } else {
    imageContainer.classList.add('hidden');
  }

  question.options.forEach((option, index) => {
    const button = document.createElement('button');
    button.className = 'option-button';
    button.textContent = option;
    button.onclick = () => selectAnswer(index);
    if (userAnswers[currentQuestion] !== undefined) {
      button.disabled = true;
      button.classList.add('disabled');
      if (index === question.correct) {
        button.classList.add('correct');
      } else if (index === userAnswers[currentQuestion]) {
        button.classList.add('incorrect');
      }
    }
    optionsContainer.appendChild(button);
  });

  updateProgress();
  nextButton.classList.add('hidden');
}

function selectAnswer(selectedIndex) {
  const question = questions[currentQuestion];
  userAnswers[currentQuestion] = selectedIndex;

  if (selectedIndex === question.correct) {
    score++;
    updateScore();
  }

  showQuestion();
  nextButton.classList.remove('hidden');
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  quizScreen.classList.add('hidden');
  resultScreen.classList.remove('hidden');

  const correctAnswers = document.getElementById('correct-answers');
  const incorrectAnswers = document.getElementById('incorrect-answers');
  const finalScore = document.getElementById('final-score');

  correctAnswers.textContent = score;
  incorrectAnswers.textContent = questions.length - score;
  finalScore.textContent = score;

  userData.totalQuizzesTaken++;
  userData.totalScore += score;
  userData.averageScore = userData.totalScore / userData.totalQuizzesTaken;
  userData.lastQuizScore = score;

  console.log("User Data for Dashboard:", userData);

  document.getElementById('quiz-button').classList.remove('hidden');
}

function updateProgress() {
  document.getElementById('current-q').textContent = currentQuestion + 1;
}

function updateScore() {
  document.getElementById('current-score').textContent = score;
}

function goToHomepage() {
  window.location.href = 'mainScript.html'; // Adjust the path if needed
}

startButton.addEventListener('click', startQuiz);
nextButton.addEventListener('click', nextQuestion);
retakeButton.addEventListener('click', startQuiz);
homeButtonStart.addEventListener('click', goToHomepage);
homeButtonResult.addEventListener('click', goToHomepage);

