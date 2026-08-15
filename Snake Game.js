const foodShapes = [
    './Assets/Food Cir.jpeg',
    './Assets/Food Sq.jpeg',
    './Assets/Food Tri.jpeg',
    './Assets/Food Umb.jpeg'
];
let currentFoodShape = '';

const bgm = new Audio('./Assets/Games-music.mp3');
let die = new Audio('./Assets/dead.mp3');
let hit = new Audio('./Assets/Hit.mp3');
let sc = new Audio('./Assets/Scored.mp3');
let eliminated = new Audio('./Assets/Eliminated.mp3');
let context;

const gridSize = 30; // Changed to 30 to match 600px CSS board
let snake = [{ x: 15, y: 15 }]; // Changed starting position to center
let food;
let highScore = 0;
let direction = 'right';
let lastDirection = 'right';
let gameInterval = null;
let gameSpeedDelay = 200;
let gameStarted = false;

let board;
let scoreText;
let highScoreText;
let instructionText;
let logo;

let boardWidth = 600; // Fixed size to match CSS board
let boardHeight = 600; // Fixed size to match CSS board
let boardCanvas;

window.onload = function () {
  board = document.getElementById('game-board');
  scoreText = document.getElementById('score');
  highScoreText = document.getElementById('highScore');
  instructionText = document.getElementById('instruction-text');
  logo = document.getElementById('logo');

  boardCanvas = document.getElementById('board');
  if (boardCanvas) {
      context = boardCanvas.getContext('2d');
      boardCanvas.width = boardWidth;
      boardCanvas.height = boardHeight;
  }

  const savedHighScore = localStorage.getItem('snakeHighScore');
  if (savedHighScore) highScore = parseInt(savedHighScore, 10);

  if (highScoreText) {
    highScoreText.textContent = highScore.toString().padStart(1, '0');
    highScoreText.style.display = 'block';
  }

  food = generateFood();
  draw();

  const startButton = document.getElementById("startButton");
  if (startButton) {
      startButton.addEventListener("click", handleStartButtonClick);
      if (instructionText) instructionText.style.display = 'block';
      if (logo) logo.style.display = 'block';
  } else {
       startGame();
       if (instructionText) instructionText.style.display = 'none';
       if (logo) logo.style.display = 'none';
  }

  bgm.pause();

  document.addEventListener('keydown', handleKeyPress);
};

function handleStartButtonClick() {
    if (!gameStarted) {
        const startButton = document.getElementById("startButton");
        if (startButton) startButton.style.display = 'none';
        if (instructionText) instructionText.style.display = 'none';
        if (logo) logo.style.display = 'none';

        try { bgm.loop = true; bgm.play(); } catch(e) {}
        startGame();
    }
}

function checkFoodProximity() {
    if (!board || !snake.length || !food) return;
    const head = snake[0];
    let isNear = false;
    if (
        (Math.abs(head.x - food.x) === 1 && head.y === food.y) ||
        (Math.abs(head.y - food.y) === 1 && head.x === food.x)
    ) {
        isNear = true;
    }
    if (isNear) {
        board.classList.add('food-nearby');
    } else {
        board.classList.remove('food-nearby');
    }
}

function createGameElement(tag, className) {
  const element = document.createElement(tag);
  element.className = className;
  return element;
}

function setPosition(element, position) {
  element.style.gridColumn = position.x;
  element.style.gridRow = position.y;
}

function clearBoard() {
  if (board) board.innerHTML = '';
}

function drawSnake() {
  if (!board) return;
  snake.forEach((segment, i) => {
    const el = createGameElement('div', 'snake');
    if (i === 0) {
      el.classList.add('snake-head');
      const mouth = createGameElement('div', 'mouth');
      el.appendChild(mouth);
    }
    setPosition(el, segment);
    board.appendChild(el);
  });
}

function drawFood() {
  if (!gameStarted) return;
  const el = createGameElement('div', 'food');
  el.style.backgroundImage = `url('${currentFoodShape}')`;
  el.style.backgroundSize = 'contain';
  el.style.backgroundRepeat = 'no-repeat';
  el.style.backgroundPosition = 'center';
  el.style.backgroundColor = 'transparent';
  el.style.border = 'none';

  setPosition(el, food);
  board.appendChild(el);
}

function draw() {
  clearBoard();
  drawSnake();

  if (gameStarted) {
      drawFood();
  }
  updateScore();
}

function generateFood() {
  let f;
  while (true) {
    const x = Math.floor(Math.random() * gridSize) + 1;
    const y = Math.floor(Math.random() * gridSize) + 1;
    const hit = snake.some(s => s.x === x && s.y === y);
    if (!hit) {
      f = { x, y };
      break;
    }
  }
  currentFoodShape = foodShapes[Math.floor(Math.random() * foodShapes.length)];
  return f;
}

function move() {
  const head = { ...snake[0] };
  if (direction === 'up') head.y--;
  else if (direction === 'down') head.y++;
  else if (direction === 'left') head.x--;
  else if (direction === 'right') head.x++;

  snake.unshift(head);

    checkFoodProximity();

  if (head.x === food.x && head.y === food.y) {
    try { sc.play(); } catch(e) {}
    food = generateFood();
    increaseSpeedAndRestart();
  } else {
    snake.pop();
  }

  lastDirection = direction;
}

function startGame() {
  if (gameInterval) clearInterval(gameInterval);
  gameStarted = true;
  checkFoodProximity();
  gameInterval = setInterval(() => {
    move();
    checkCollision();
    draw();
  }, gameSpeedDelay);
}

function stopGame() {
  clearInterval(gameInterval);
  gameInterval = null;
  gameStarted = false;

  if (instructionText) instructionText.style.display = 'block';
  if (logo) logo.style.display = 'block';
}

function resetGame() {
  bgm.pause();
  bgm.currentTime = 0;
  stopGame();
  snake = [{ x: 15, y: 15 }];
  food = generateFood();
  direction = 'right';
  lastDirection = 'right';
  gameSpeedDelay = 200;
  updateScore();

  if (context && boardCanvas) {
    boardCanvas.style.display = 'block';

    let canvasWidth = 600;
    let canvasHeight = 600;

    eliminated.play();
    setTimeout(() => {
        hit.play()
    }, 2500);
  }

    setTimeout(() => {
        Swal.fire({
                    title: '',
                    text: 'Player 456, you have been eliminated.',
                    showConfirmButton: false,
                    showCancelButton: false,
                    allowOutsideClick: false,
                    timer: 5000,
                }).then((result) => {
                    if (result.dismiss === Swal.DismissReason.timer) {
                        window.location.href = "./index.html";
                    }
                });
    }, 4500);
}

function handleKeyPress(e) {
  if (!gameStarted) return;

  if (e.key === 'ArrowUp' && lastDirection !== 'down') direction = 'up';
  else if (e.key === 'ArrowDown' && lastDirection !== 'up') direction = 'down';
  else if (e.key === 'ArrowLeft' && lastDirection !== 'right') direction = 'left';
  else if (e.key === 'ArrowRight' && lastDirection !== 'left') direction = 'right';
  e.preventDefault();
}

function increaseSpeedAndRestart() {
  increaseSpeed();
  clearInterval(gameInterval);
  gameInterval = setInterval(() => {
    move();
    checkCollision();
    draw();
  }, gameSpeedDelay);
}

function increaseSpeed() {
  if (gameSpeedDelay > 150) gameSpeedDelay -= 5;
  else if (gameSpeedDelay > 100) gameSpeedDelay -= 3;
  else if (gameSpeedDelay > 50) gameSpeedDelay -= 2;
  else if (gameSpeedDelay > 25) gameSpeedDelay -= 1;
  if (gameSpeedDelay < 25) gameSpeedDelay = 25;
}

function checkCollision() {
  const head = snake[0];
  if (head.x < 1 || head.x > gridSize || head.y < 1 || head.y > gridSize) {
    resetGame();
  }
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      resetGame();
    }
  }
}

function updateScore() {
  const s = Math.max(0, snake.length - 1);
  if (scoreText) scoreText.textContent = s.toString().padStart(1, '0');
  updateHighScore();
}

function updateHighScore() {
  const s = Math.max(0, snake.length - 1);

  if (s > highScore) {
    highScore = s;
    localStorage.setItem('snakeHighScore', highScore);
    if (highScoreText) highScoreText.textContent = highScore.toString().padStart(1, '0');
  }
}
