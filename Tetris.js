const bgm = new Audio('./Assets/Games-music.mp3');
let die = new Audio('./Assets/dead.mp3');
let hit = new Audio ('./Assets/Hit.mp3');
let sc = new Audio ('./Assets/Scored.mp3');
let eliminated = new Audio ('./Assets/Eliminated.mp3');
let isGameOver = false;
let context;


document.addEventListener('DOMContentLoaded', () => {
  bgm.loop = true;
  bgm.play();
  const grid = document.querySelector('.grid')
  let squares = Array.from(document.querySelectorAll('.grid div'))
  const scoreDisplay = document.querySelector('#score')
  const startBtn = document.querySelector('#start-button')
  const width = 10
  let nextRandom = 0
  let timerId
  let score = 0
  const colors = [
    '#c73dff',
    '#1fa34a',
    '#ffb32d',
    '#3a5aff',
    '#b6003a'
  ]

  const lTetromino = [
    [1, width+1, width*2+1, 2],
    [width, width+1, width+2, width*2+2],
    [1, width+1, width*2+1, width*2],
    [width, width*2, width*2+1, width*2+2]
  ]

  const zTetromino = [
    [0,width,width+1,width*2+1],
    [width+1, width+2,width*2,width*2+1],
    [0,width,width+1,width*2+1],
    [width+1, width+2,width*2,width*2+1]
  ]

  const tTetromino = [
    [1,width,width+1,width+2],
    [1,width+1,width+2,width*2+1],
    [width,width+1,width+2,width*2+1],
    [1,width,width+1,width*2+1]
  ]

  const oTetromino = [
    [0,1,width,width+1],
    [0,1,width,width+1],
    [0,1,width,width+1],
    [0,1,width,width+1]
  ]

  const iTetromino = [
    [1,width+1,width*2+1,width*3+1],
    [width,width+1,width+2,width+3],
    [1,width+1,width*2+1,width*3+1],
    [width,width+1,width+2,width+3]
  ]

  const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino]

  let currentPosition = 4
  let currentRotation = 0
  let random = Math.floor(Math.random()*theTetrominoes.length)
  let current = theTetrominoes[random][currentRotation]

  function draw() {
    current.forEach(index => {
      squares[currentPosition + index].classList.add('tetromino')
      squares[currentPosition + index].style.backgroundColor = colors[random]
    })
  }

  function undraw() {
    current.forEach(index => {
      squares[currentPosition + index].classList.remove('tetromino')
      squares[currentPosition + index].style.backgroundColor = ''

    })
  }

  function control(e) {
     if (e.code === "ArrowUp" || e.keyCode === 87) {
        rotate()
     }
     else if (e.code === "ArrowDown" || e.keyCode === 83){
        moveDown()
     }
     else if (e.code === "ArrowLeft" || e.keyCode === 65) {
        moveLeft()
     }
     else if (e.code === "ArrowRight" || e.keyCode === 68) {
        moveRight()
     }
  }

  document.addEventListener('keyup', control)

  function moveDown() {
    undraw()
    currentPosition += width
    draw()
    freeze()
  }

  function freeze() {
    if(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
      current.forEach(index => squares[currentPosition + index].classList.add('taken'))
      random = nextRandom
      nextRandom = Math.floor(Math.random() * theTetrominoes.length)
      current = theTetrominoes[random][currentRotation]
      currentPosition = 4
      draw()
      displayShape()
      addScore()
      gameOver()
    }
  }

  function moveLeft() {
    undraw()
    const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)
    if(!isAtLeftEdge) currentPosition -=1
    if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
      currentPosition +=1
    }
    draw()
  }

  function moveRight() {
    undraw()
    const isAtRightEdge = current.some(index => (currentPosition + index) % width === width -1)
    if(!isAtRightEdge) currentPosition +=1
    if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
      currentPosition -=1
    }
    draw()
  }

  function isAtRight() {
    return current.some(index=> (currentPosition + index + 1) % width === 0)
  }

  function isAtLeft() {
    return current.some(index=> (currentPosition + index) % width === 0)
  }

  function checkRotatedPosition(P){
    P = P || currentPosition
    if ((P+1) % width < 4) {
      if (isAtRight()){
        currentPosition += 1
        checkRotatedPosition(P)
        }
    }
    else if (P % width > 5) {
      if (isAtLeft()){
        currentPosition -= 1
      checkRotatedPosition(P)
      }
    }
  }

  function rotate() {
    undraw()
    currentRotation ++
    if(currentRotation === current.length) {
      currentRotation = 0
    }
    current = theTetrominoes[random][currentRotation]
    checkRotatedPosition()
    draw()
  }


  const displaySquares = document.querySelectorAll('.mini-grid div')
  const displayWidth = 4
  const displayIndex = 0

  const upNextTetrominoes = [
    [1, displayWidth+1, displayWidth*2+1, 2],
    [0, displayWidth, displayWidth+1, displayWidth*2+1],
    [1, displayWidth, displayWidth+1, displayWidth+2],
    [0, 1, displayWidth, displayWidth+1],
    [1, displayWidth+1, displayWidth*2+1, displayWidth*3+1]
  ]

  function displayShape() {
    displaySquares.forEach(square => {
      square.classList.remove('tetromino')
      square.style.backgroundColor = ''
    })
    upNextTetrominoes[nextRandom].forEach( index => {
      displaySquares[displayIndex + index].classList.add('tetromino')
      displaySquares[displayIndex + index].style.backgroundColor = colors[nextRandom]
    })
  }

  function addScore() {
    for (let i = 0; i < 199; i +=width) {
      const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9]

      if(row.every(index => squares[index].classList.contains('taken'))) {
        sc.play();
        score += 1
        scoreDisplay.innerHTML = score
        row.forEach(index => {
          squares[index].classList.remove('taken')
          squares[index].classList.remove('tetromino')
          squares[index].style.backgroundColor = ''
        })

        const squaresRemoved = squares.splice(i, width)
        squares = squaresRemoved.concat(squares)
        squares.forEach(cell => grid.appendChild(cell))
      }
    }

  }

  function gameOver() {
     if (isGameOver) return

  if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
      isGameOver = true

      if (timerId) {
        clearInterval(timerId)
        timerId = null
      }

      document.removeEventListener('keyup', control)

      setTimeout(() => {
          bgm.pause();
          bgm.currentTime = 0;
      }, 250);

      setTimeout(() => {
            eliminated.play();
        }, 500);

      setTimeout(() => {
          hit.play()
      }, 5000);

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
        }, 6000);
  }
  }

})
