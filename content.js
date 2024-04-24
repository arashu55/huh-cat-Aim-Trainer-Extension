// ゲームの状態を管理する変数
let gameStarted = false;

// スタートボタンを作成し、ページに追加
const startButton = document.createElement('button');
startButton.textContent = 'Start Training';
startButton.id = 'start-training';
startButton.style.position = 'fixed';
startButton.style.top = '10px';
startButton.style.right = '10px';
startButton.style.zIndex = '1001';
document.body.appendChild(startButton);

// スタートボタンのクリックイベントを修正
startButton.addEventListener('click', function() {
  gameStarted = true;
  startButton.style.display = 'none';
  score = 0;
  activeGifs = []; // activeGifs 配列をリセット
  for (let i = 0; i < 3; i++) { // 初期の3つのGIFを表示
    spawnGif();
  }
  updateScore();
});

// ゲームタイマーを管理する変数
let gameTimer;

// ゲームを開始する関数
function startGame() {
  gameStarted = true;
  startButton.style.display = 'none';
  score = 0;
  activeGifs = [];
  for (let i = 0; i < 3; i++) {
    spawnGif();
  }
  updateScore();
  gameTimer = setTimeout(endGame, 60000); // 1分後にゲームを終了する
}

// ゲームを終了する関数
function endGame() {
  gameStarted = false;
  activeGifs.forEach(gif => gif.remove()); // すべてのGIFを削除する
  activeGifs = [];
  alert(`Time's up! Your score is: ${score}`); // スコアのアラート表示
}

// GIFを生成して配置する関数
function spawnGif() {
  if (!gameStarted) return;
  const gif = document.createElement('img');
  gif.src = chrome.runtime.getURL('huh_cat.gif');
  gif.className = 'aim-gif';
  gif.style.position = 'fixed';
  // GIFがウィンドウの外に出ないように調整
  gif.style.left = `${Math.random() * (window.innerWidth - gif.width)}px`;
  gif.style.top = `${Math.random() * (window.innerHeight - gif.height)}px`;
  gif.style.zIndex = '1000';
  // GIFのサイズを調整
  gif.style.width = '100px'; // 幅を100pxに設定（元のサイズの1/3に相当）
  document.body.appendChild(gif);

  // GIFのクリックイベント
  gif.addEventListener('click', function() {
    if (!gameStarted) return;
    score++;
    gif.remove(); // GIFを消去
    activeGifs = activeGifs.filter(item => item !== gif); // 削除されたGIFを配列から除去
    maintainGifs(); // 常に3つのGIFを維持
  });

  activeGifs.push(gif); // 新しいGIFを配列に追加
}

// 常に3つのGIFが表示されるように維持する関数
function maintainGifs() {
  while (activeGifs.length < 3) {
    spawnGif();
  }
}
// スコア表示のUIをページに追加
const scoreDisplay = document.createElement('div');
scoreDisplay.id = 'aim-score';
scoreDisplay.style.position = 'fixed';
scoreDisplay.style.bottom = '10px';
scoreDisplay.style.right = '10px';
scoreDisplay.style.zIndex = '1001';
document.body.appendChild(scoreDisplay);

// スコア更新関数
function updateScore() {
  if (!gameStarted) return;
  scoreDisplay.textContent = `Score: ${score}`;
  requestAnimationFrame(updateScore);
}

// スコア更新を呼び出す
updateScore();

// スタートボタンのクリックイベントを修正
startButton.addEventListener('click', function() {
  startGame();
});

