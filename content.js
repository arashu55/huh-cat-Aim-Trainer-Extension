// ゲームの状態を管理する変数
let gameStarted = false;
let score = 0; // スコア変数
let activeGifs = []; // アクティブなGIFを保持する配列

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
  if (gameStarted) {
    console.log('Game is already started.');
    return;
  }
  startGame();
});

// ゲームタイマーを管理する変数
let gameTimer;

// ゲーム開始時に3つのGIFを生成する関数を追加
function initGifs() {
  while (activeGifs.length < 3) {
    spawnGif();
  }
}

// ゲームを開始する関数
function startGame() {
  gameStarted = true;
  startButton.style.display = 'none';
  score = 0;
  activeGifs = [];
  initGifs(); // ここで3つのGIFを生成する
  updateScore();
  gameTimer = setTimeout(endGame, 30000); // 60秒後にゲームを終了する
}

// GIFをクリックしたときに追加GIFを生成する部分を削除
gif.addEventListener('click', function() {
  if (!gameStarted) return;
  score++;
  gif.remove(); // GIFを消去
  activeGifs = activeGifs.filter(item => item !== gif); // 削除されたGIFを配列から除去
  if (activeGifs.length < 3) spawnGif(); // GIFが3つ未満の場合に新しいGIFを追加
});
// ゲームを終了する関数
function endGame() {
  console.log('endGame function called'); // デバッグ用のログを追加
  if (!gameStarted) {
    console.log('Game already ended or never started.');
    return;
  }
  clearTimeout(gameTimer); // ゲームタイマーをキャンセル
  gameStarted = false;
  activeGifs.forEach(gif => gif.remove()); // すべてのGIFを削除する
  activeGifs = [];
  alert(`Time's up! Your score is: ${score}`); // スコアのアラート表示
}

// GIFのクリックイベントのハンドラー
function handleGifClick() {
  if (!gameStarted) return;
  score++;
  this.remove(); // GIFを消去
  activeGifs = activeGifs.filter(item => item !== this); // 削除されたGIFを配列から除去
  if (activeGifs.length < 3) spawnGif(); // GIFが3つ未満の場合に新しいGIFを追加
}

// GIFを生成して配置する関数
function spawnGif() {
  if (!gameStarted) return;  
  const gif = document.createElement('img');
  gif.src = chrome.runtime.getURL('huh_cat.gif');
  gif.className = 'aim-gif';
  gif.style.position = 'fixed';
  gif.style.left = `${Math.random() * (window.innerWidth - 100)}px`; // GIFの幅が100pxと仮定
  gif.style.top = `${Math.random() * (window.innerHeight - 100)}px`; // GIFの高さが100pxと仮定
  gif.style.zIndex = '1000';
  gif.style.width = '100px'; // GIFのサイズを設定
  document.body.appendChild(gif);

  // GIFのクリックイベント
  gif.addEventListener('click', handleGifClick);
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