let gameStarted = false;
let score = 0;
let activeGifs = [];

const startButton = document.createElement('button');
startButton.textContent = 'Start Training';
startButton.id = 'start-training';
startButton.style.position = 'fixed';
startButton.style.top = '10px';
startButton.style.right = '10px';
startButton.style.zIndex = '1001';
document.body.appendChild(startButton);

startButton.addEventListener('click', function() {
  if (gameStarted) {
    console.log('Game is already started.');
    return;
  }
  startGame();
});

let gameTimer;

function initGifs() {
  while (activeGifs.length < 3) {
    spawnGif();
  }
}

function startGame() {
  gameStarted = true;
  startButton.style.display = 'none';
  score = 0;
  activeGifs = [];
  initGifs();
  updateScore();
  gameTimer = setTimeout(endGame, 30000);
}

function handleGifClick() {
  if (!gameStarted) return;
  score++;
  this.remove();
  activeGifs = activeGifs.filter(item => item !== this);
  if (activeGifs.length < 3) spawnGif();
}

function endGame() {
  console.log('endGame function called');
  if (!gameStarted) {
    console.log('Game already ended or never started.');
    return;
  }
  gameStarted = false;
  clearTimeout(gameTimer);
  activeGifs.forEach(gif => gif.remove());
  activeGifs = [];
  alert(`Times up! Your score is: ${score}`);
}

function handleGifClick() {
  if (!gameStarted) return;
  score++;
  this.remove();
  activeGifs = activeGifs.filter(item => item !== this);
  if (activeGifs.length < 3) spawnGif();
}

function spawnGif() {
  if (!gameStarted) return;  
  const gif = document.createElement('img');
  gif.src = chrome.runtime.getURL('huh_cat.gif');
  gif.className = 'aim-gif';
  gif.style.position = 'fixed';
  gif.style.left = `${Math.random() * (window.innerWidth - 100)}px`;
  gif.style.top = `${Math.random() * (window.innerHeight - 100)}px`;
  gif.style.zIndex = '1000';
  gif.style.width = '100px';
  document.body.appendChild(gif);

  gif.addEventListener('click', handleGifClick);
  activeGifs.push(gif);
}

function maintainGifs() {
  while (activeGifs.length < 3) {
    spawnGif();
  }
}

const scoreDisplay = document.createElement('div');

document.body.appendChild(scoreDisplay);

function updateScore() {
  if (!gameStarted) return;
  scoreDisplay.textContent = `Score: ${score}`;
  requestAnimationFrame(updateScore);
}


updateScore();

scoreDisplay.id = 'aim-score';
scoreDisplay.style.position = 'fixed';
scoreDisplay.style.bottom = '10px';
scoreDisplay.style.right = '10px';
scoreDisplay.style.zIndex = '1001';


