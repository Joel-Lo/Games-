const bgm = new Audio('./Assets/Games-music.mp3');
let die = new Audio('./Assets/dead.mp3');
let hit = new Audio ('./Assets/Hit.mp3');
let sc = new Audio ('./Assets/Scored.mp3');
let eliminated = new Audio ('./Assets/Eliminated.mp3');

let board;
let boardWidth = window.innerWidth;
let boardHeight = window.innerHeight;

let context;

let birdWidth = 54;
let birdHeight = 54;
let birdX = boardWidth / 15;
let birdY = boardHeight / 2;
let birdImg;

let bird = {
    x : birdX,
    y : birdY,
    width : birdWidth,
    height : birdHeight
}

let pipeArray = [];
let pipeWidth = 94;
let pipeHeight = 532;
let pipeX = boardWidth;
let pipeY = 0;

let topPipeImg;
let bottomPipeImg;

let velocityX = -2;
let velocityY = 0;
let gravity= 0.4;

let gameOver = false;
let gameStarted = false;
let pipeInterval; // Declare globally

let score = 0;
let highScore = Number(localStorage.getItem("flappyHighScore"));
if (!Number.isFinite(highScore)) highScore = 0;

function startGame() {
    document.getElementById("startButton").style.display = "none";

    bgm.loop = true;
    bgm.play();

    gameStarted = true;
    gameOver = false;

    requestAnimationFrame(update);
    pipeInterval = setInterval(placePipes, 3000);

    document.addEventListener("keydown", moveBird);
    document.addEventListener("touchstart", moveBird);
    document.addEventListener("pointerdown", moveBird);
}

window.onload = function() {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d");

    birdImg = new Image();
    birdImg.src = "./Assets/flappybird.png";
    birdImg.onload = function(){
        context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
    }

    topPipeImg = new Image();
    topPipeImg.src = "./Assets/toppipe.png";

    bottomPipeImg = new Image();
    bottomPipeImg.src = "./Assets/bottompipe.png";

    document.getElementById("startButton").addEventListener("click", startGame);

    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
}


function update() {
    requestAnimationFrame(update);
    if (!gameStarted || gameOver) {
        if (gameOver) {
            bgm.pause();
            bgm.currentTime = 0;
        }
        return;
    }

    context.clearRect(0,0, board.width, board.height);
    velocityY += gravity;
    bird.y = Math.max(bird.y + velocityY, 0);
    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);

    if (bird.y > board.height) {
        eliminated.play();
        gameOver = true;
    }

    for (let i = 0; i < pipeArray.length; i++) {
        let pipe = pipeArray[i];
        pipe.x += velocityX;
        context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);

        if (!pipe.passed && bird.x > pipe.x + pipe.width) {
            sc.play();
            score += 0.5;
            pipe.passed = true;

            if (score > highScore) {
                highScore = score;
                localStorage.setItem("flappyHighScore", highScore);
            }
        }

        if (detectCollision(bird, pipe)) {
            eliminated.play();
            eliminated.play();
            gameOver = true;
        }
    }

    while (pipeArray.length > 0 && pipeArray[0].x < -pipeWidth) {
        pipeArray.shift();
    }

    context.fillStyle = "red";
    context.font = "24px arial";
    context.fillText("Score: " + score, 5, 30);

    if (gameOver) {
        clearInterval(pipeInterval);

        eliminated.play();
        setTimeout(() => {
            hit.play()
        }, 2500);
        setTimeout(() => {
            Swal.fire({
                    title: '',
                    text: 'Player 456, you have been eliminated.',
                    showConfirmButton: false,
                    showCancelButton: false,
                    allowOutsideClick: false,
                    timer: 3000,
                }).then((result) => {
                    if (result.dismiss === Swal.DismissReason.timer) {
                        window.location.href = "./index.html";
                    }
                });
        }, 4500);
    }
}

function placePipes() {
    if (!gameStarted || gameOver) {
        return;
    }

    let randomPipeY = pipeY - pipeHeight/4 - Math.random()*(pipeHeight/2);
    let openingSpace = board.height/4;

    let topPipe = {
        img : topPipeImg,
        x : pipeX,
        y : randomPipeY,
        width : pipeWidth,
        height : pipeHeight,
        passed : false
    }

    pipeArray.push(topPipe);

    let bottomPipe = {
        img: bottomPipeImg,
        x: pipeX,
        y: randomPipeY + pipeHeight + openingSpace,
        width : pipeWidth,
        height : pipeHeight,
        passed : false
    }

    pipeArray.push(bottomPipe);
}

function moveBird(e) {
    if (gameStarted && !gameOver && (e.code == "Space" || e.code == "ArrowUp" || e.code == "KeyX" || e.type === "touchstart" || e.pointerType)) {
        velocityY = -6;
    }
}

function detectCollision(a, b) {
    return a.x < b.x + b.width &&
            a.x + a.width > b.x &&
            a.y < b.y + b.height &&
            a.y + a.height > b.y;
}
