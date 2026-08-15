const canvas = document.getElementById("canvas");
const canvasContext = canvas.getContext("2d");
const pacmanFrames = document.getElementById("animation");
const ghostFrames = document.getElementById("ghosts");

let createRect = (x, y, width, height, color) => {
    canvasContext.fillStyle = color;
    canvasContext.fillRect(x, y, width, height);
};

const DIRECTION_RIGHT = 4;
const DIRECTION_UP = 3;
const DIRECTION_LEFT = 2;
const DIRECTION_BOTTOM = 1;

let lives = 1;
let ghostCount = 4;
let ghostImageLocations = [
    { x: 0, y: 0 },
    { x: 176, y: 0 },
    { x: 0, y: 121 },
    { x: 176, y: 121 },
];

let fps = 30;
let pacman;
let oneBlockSize = 20;
let score = 0;
let ghosts = [];
let wallSpaceWidth = oneBlockSize / 1.6;
let wallOffset = (oneBlockSize - wallSpaceWidth) / 2;
let wallInnerColor = "black";
let gameStarted = false;

let map = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 1],
    [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 2, 1],
    [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 1],
    [1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 2, 2, 1],
    [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 1],
    [1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 1],
    [1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 2, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 1],
    [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 2, 1],
    [1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 1],
    [1, 1, 2, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 2, 1, 1, 2, 2, 1],
    [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 1],
    [1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

let originalMap = map.map(row => [...row]);

let randomTargetsForGhosts = [
    { x: 1 * oneBlockSize, y: 1 * oneBlockSize },
    { x: 1 * oneBlockSize, y: (map.length - 2) * oneBlockSize },
    { x: (map[0].length - 2) * oneBlockSize, y: oneBlockSize },
    { x: (map[0].length - 2) * oneBlockSize, y: (map.length - 2) * oneBlockSize },
];

let createNewPacman = () => {
    pacman = new Pacman(
        oneBlockSize,
        oneBlockSize,
        oneBlockSize,
        oneBlockSize,
        oneBlockSize / 5
    );
};

let gameLoop = () => {
    update();
    draw();
};

let gameInterval;

let restartPacmanAndGhosts = () => {
    createNewPacman();
    createGhosts();
};

let onGhostCollision = () => {
    if (lives > 1) {
        lives--;
        restartPacmanAndGhosts();
    } else {
        lives = 0;
        gameStarted = false;
        clearInterval(gameInterval);

        bgm.pause();
        bgm.currentTime = 0;

        setTimeout(() => {
            eliminated.play();
        }, 500);

        setTimeout(() => {
            hit.play();
        }, 5000);

        setTimeout(() => {
            Swal.fire({
                title: '',
                text: 'Player 456, you have been eliminated.',
                showConfirmButton: false,
                showCancelButton: false,
                allowOutsideClick: false,
                timer: 3000,
            }).then(() => {
                window.location.href = "./index.html";
            });
        }, 6000);
    }
};

let update = () => {
    if (gameStarted) {
        pacman.moveProcess();
        pacman.eat();
        updateGhosts();
        if (pacman.checkGhostCollision(ghosts)) {
            onGhostCollision();
        }
    }
};

let drawFoods = () => {
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[0].length; j++) {
            if (map[i][j] === 2) {
                createRect(
                    j * oneBlockSize + oneBlockSize / 3,
                    i * oneBlockSize + oneBlockSize / 3,
                    oneBlockSize / 3,
                    oneBlockSize / 3,
                    "#FEB897"
                );
            }
        }
    }
};

let drawScore = () => {
    canvasContext.font = "15px Emulogic";
    canvasContext.fillStyle = "white";
    canvasContext.fillText(
        "Score: " + score,
        20,
        oneBlockSize * (map.length + 1) + 14
    );
};

let draw = () => {
    if (gameStarted) {
        bgm.loop = true;
        bgm.play();
        canvasContext.clearRect(0, 0, canvas.width, canvas.height);
        createRect(0, 0, canvas.width, canvas.height, "black");
        drawWalls();
        drawFoods();
        drawGhosts();
        pacman.draw();
        drawScore();
    }
};

let drawWalls = () => {
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[0].length; j++) {
            if (map[i][j] === 1) {
                createRect(j * oneBlockSize, i * oneBlockSize, oneBlockSize, oneBlockSize, "#342DCA");
                if (j > 0 && map[i][j - 1] === 1) {
                    createRect(j * oneBlockSize, i * oneBlockSize + wallOffset, wallSpaceWidth + wallOffset, wallSpaceWidth, wallInnerColor);
                }
                if (j < map[0].length - 1 && map[i][j + 1] === 1) {
                    createRect(j * oneBlockSize + wallOffset, i * oneBlockSize + wallOffset, wallSpaceWidth + wallOffset, wallSpaceWidth, wallInnerColor);
                }
                if (i < map.length - 1 && map[i + 1][j] === 1) {
                    createRect(j * oneBlockSize + wallOffset, i * oneBlockSize + wallOffset, wallSpaceWidth, wallSpaceWidth + wallOffset, wallInnerColor);
                }
                if (i > 0 && map[i - 1][j] === 1) {
                    createRect(j * oneBlockSize + wallOffset, i * oneBlockSize, wallSpaceWidth, wallSpaceWidth + wallOffset, wallInnerColor);
                }
            }
        }
    }
};

let createGhosts = () => {
    ghosts = [];
    for (let i = 0; i < ghostCount * 2; i++) {
        let newGhost = new Ghost(
            9 * oneBlockSize + (i % 2 === 0 ? 0 : 1) * oneBlockSize,
            10 * oneBlockSize + (i % 2 === 0 ? 0 : 1) * oneBlockSize,
            oneBlockSize,
            oneBlockSize,
            pacman.speed / 2,
            ghostImageLocations[i % 4].x,
            ghostImageLocations[i % 4].y,
            124,
            116,
            6 + i
        );
        ghosts.push(newGhost);
    }
};

let startGame = () => {
    if (!gameStarted) {
        gameStarted = true;
        createNewPacman();
        createGhosts();
        gameInterval = setInterval(gameLoop, 1000 / fps);
    }
};

let restartGame = () => {
    clearInterval(gameInterval);
    score = 0;
    gameStarted = false;
    map = originalMap.map(row => [...row]);
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
};

document.getElementById("startButton").addEventListener("click", () => {
    restartGame();
    startGame();
    document.getElementById("startButton").style.opacity = "0";
    canvas.style.opacity = "0";

    setTimeout(() => {
        document.getElementById("gameOver").style.display = "none";
        document.getElementById("startButton").style.display = "none";
        canvas.style.display = "block";

        setTimeout(() => {
            document.getElementById("startButton").style.opacity = "1";
            document.getElementById("gameOver").style.opacity = "1";
            canvas.style.opacity = "1";
        }, 50);
    }, 500);
});

window.addEventListener("keydown", handleKeyDown);
window.addEventListener("touchstart", handleTouchStart);
window.addEventListener("touchmove", handleTouchMove);

function handleKeyDown(event) {
    let k = event.keyCode;
    setPacmanDirection(k);
}

function handleTouchStart(event) {
    const touch = event.touches[0];
    startX = touch.clientX;
    startY = touch.clientY;
}

function handleTouchMove(event) {
    if (!startX || !startY) return;

    const touch = event.touches[0];
    const deltaX = touch.clientX - startX;
    const deltaY = touch.clientY - startY;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        deltaX > 0 ? setPacmanDirection(39) : setPacmanDirection(37);
    } else {
        deltaY > 0 ? setPacmanDirection(40) : setPacmanDirection(38);
    }

    startX = null;
    startY = null;
}

function setPacmanDirection(keyCode) {
    setTimeout(() => {
        if (keyCode === 37 || keyCode === 65) pacman.nextDirection = DIRECTION_LEFT;
        else if (keyCode === 38 || keyCode === 87) pacman.nextDirection = DIRECTION_UP;
        else if (keyCode === 39 || keyCode === 68) pacman.nextDirection = DIRECTION_RIGHT;
        else if (keyCode === 40 || keyCode === 83) pacman.nextDirection = DIRECTION_BOTTOM;
    }, 1);
}
