const bgm = new Audio('./Assets/Games-music.mp3');
let die = new Audio('./Assets/dead.mp3');
let hit = new Audio('./Assets/Hit.mp3');
let sc = new Audio('./Assets/Scored.mp3');
let eliminated = new Audio('./Assets/Eliminated.mp3');

const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const keyboardDiv = document.querySelector(".keyboard");
const hangmanImage = document.querySelector(".hangman-box img");
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = gameModal.querySelector("button");
const scoreText = document.querySelector(".score-text b");
const highScoreText = document.querySelector(".high-score-text b");

let currentScore = 0;
let highScore = localStorage.getItem("hangmanHighScore") || 0;
highScoreText.innerText = highScore;

let currentWord, correctLetters, wrongGuessCount;
const maxGuesses = 6;

const resetGame = () => {
    correctLetters = [];
    wrongGuessCount = 0;
    hangmanImage.src = `./Assets/hangman-0.svg`;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    
    const lowerCaseWord = currentWord.toLowerCase();
    
    // Create the letter slots
    wordDisplay.innerHTML = lowerCaseWord.split("").map(letter => {
        if (letter === ' ') {
            return `<span class="space-separator">&nbsp;</span>`;
        }
        return `<li class="letter"></li>`;
    }).join("");

    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    gameModal.classList.remove("show");
}

const getRandomWord = () => {
    // Pick a new word from your wordList array
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word;
    document.querySelector(".hint-text b").innerText = hint;
    resetGame();
}

const gameOver = (isVictory) => {
    if (isVictory) {
        currentScore++;
        scoreText.innerText = currentScore;
        sc.play();
        
        if (currentScore > highScore) {
            highScore = currentScore;
            highScoreText.innerText = highScore;
            localStorage.setItem("hangmanHighScore", highScore);
        }
        
        // FIX: Pick a NEW word after winning
        setTimeout(getRandomWord, 1000); 
    }

    if (!isVictory) {
        bgm.pause();
        bgm.currentTime = 0;
        
        setTimeout(() => { eliminated.play(); }, 500);
        setTimeout(() => { hit.play(); }, 4000);

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

const initGame = (button, clickedLetter) => {
    const lowerCaseWord = currentWord.toLowerCase();
    let matchFound = false;

    // Check if the clicked letter is in the word
    [...lowerCaseWord].forEach((letter, index) => {
        if (letter === clickedLetter) {
            matchFound = true;
            // Target only the <li> elements (skipping spaces)
            const listItems = wordDisplay.querySelectorAll("li");
            
            // Logic to find the correct <li> index excluding spaces
            let liIndex = 0;
            for(let i = 0; i < index; i++) {
                if(currentWord[i] !== ' ') liIndex++;
            }

            listItems[liIndex].innerText = currentWord[index];
            listItems[liIndex].classList.add("guessed");
        }
    });

    if (!matchFound) {
        wrongGuessCount++;
        hangmanImage.src = `./Assets/hangman-${wrongGuessCount}.svg`;
    }

    button.disabled = true;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;

    if (wrongGuessCount === maxGuesses) return gameOver(false);

    // WIN CONDITION: Check if all <li> tags have the 'guessed' class
    const allGuessed = [...wordDisplay.querySelectorAll("li")].every(li => li.classList.contains("guessed"));
    if (allGuessed) return gameOver(true);
}

// Generate keyboard
for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click", (e) => initGame(e.target, String.fromCharCode(i)));
}

// Start Game
Swal.fire({
    title: 'Welcome!',
    text: 'Some words may have more than 1 word.',
    showConfirmButton: false,
    showCancelButton: false,
    allowOutsideClick: false,
    timer: 3000,
}).then((result) => {
    bgm.loop = true;
    bgm.play().catch(() => console.log("Audio needs user interaction first"));
    getRandomWord();
});

playAgainBtn.addEventListener("click", getRandomWord);