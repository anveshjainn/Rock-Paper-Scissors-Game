const userScoreElem = document.querySelector('.users-score');
const computerScoreElem = document.querySelector('.comp-score');
const resultElem = document.querySelector('.result');
const wonElem = document.querySelector('.result-won');
const lostElem = document.querySelector('.result-lost');
const tieElem = document.querySelector('.result-tie');
const userRock = document.querySelector('.user-rock');
const userPaper = document.querySelector('.user-paper');
const userScissor = document.querySelector('.user-scissor');
const compRock = document.querySelector('.comp-rock');
const compPaper = document.querySelector('.comp-paper');
const compScissor = document.querySelector('.comp-scissor');
const playAgainBtns = document.querySelectorAll('.play-again');
const rulesBtn = document.querySelector('.rules');
const rulesPopup = document.querySelector('.rules-popup');
const rulesCloseBtn = document.querySelector('.rules-close');
const nextBtn = document.querySelector('.next');

const choiceButtons = document.querySelectorAll('.rock-img, .paper-img, .scissors-img, .line1, .line2, .line3');

let userScore = parseInt(localStorage.getItem('userScore')) || 0;
let computerScore = parseInt(localStorage.getItem('computerScore')) || 0;

function updateScores() {
  userScoreElem.textContent = userScore;
  computerScoreElem.textContent = computerScore;

  localStorage.setItem('userScore', userScore);
  localStorage.setItem('computerScore', computerScore);
}

function resetGame() {
  wonElem.style.display = 'none';
  lostElem.style.display = 'none';
  tieElem.style.display = 'none';
  userRock.style.display = 'none';
  userPaper.style.display = 'none';
  userScissor.style.display = 'none';
  compRock.style.display = 'none';
  compPaper.style.display = 'none';
  compScissor.style.display = 'none';
  nextBtn.style.display = 'none';
  choiceButtons.forEach((btn) => (btn.style.display = 'inline-block')); 
}

function hideChoiceButtons() {
  choiceButtons.forEach((btn) => (btn.style.display = 'none'));
}

document.querySelector('.rock-img').addEventListener('click', () => {
  const computerChoice = getComputerChoice();
  hideChoiceButtons(); 
  displayResult('rock', computerChoice);
});

document.querySelector('.paper-img').addEventListener('click', () => {
  const computerChoice = getComputerChoice();
  hideChoiceButtons(); 
  displayResult('paper', computerChoice);
});

document.querySelector('.scissors-img').addEventListener('click', () => {
  const computerChoice = getComputerChoice();
  hideChoiceButtons(); 
  displayResult('scissors', computerChoice);
});

function getComputerChoice() {
  const choices = ['rock', 'paper', 'scissors'];
  const randomIndex = Math.floor(Math.random() * 3);
  return choices[randomIndex];
}

function displayResult(userChoice, computerChoice) {
  if (userChoice === 'rock') userRock.style.display = 'block';
  if (userChoice === 'paper') userPaper.style.display = 'block';
  if (userChoice === 'scissors') userScissor.style.display = 'block';

  if (computerChoice === 'rock') compRock.style.display = 'block';
  if (computerChoice === 'paper') compPaper.style.display = 'block';
  if (computerChoice === 'scissors') compScissor.style.display = 'block';

  if (userChoice === computerChoice) {
    tieElem.style.display = 'block';
    resultElem.textContent = 'TIE UP';
  } else if (
    (userChoice === 'rock' && computerChoice === 'scissors') ||
    (userChoice === 'paper' && computerChoice === 'rock') ||
    (userChoice === 'scissors' && computerChoice === 'paper')
  ) {
    userScore++;
    wonElem.style.display = 'block';
    resultElem.textContent = 'YOU WIN';
  } else {
    computerScore++;
    lostElem.style.display = 'block';
    resultElem.textContent = 'YOU LOST';
  }

  updateScores();

  nextBtn.style.display = 'block';
}

playAgainBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    resetGame();
  });
});

rulesBtn.addEventListener('click', () => {
  rulesPopup.style.display = 'block';
});

rulesCloseBtn.addEventListener('click', () => {
  rulesPopup.style.display = 'none';
});

nextBtn.addEventListener('click', () => {
  userScore = 0; 
  computerScore = 0; 
  updateScores(); 
  resetGame(); 
});

updateScores();

