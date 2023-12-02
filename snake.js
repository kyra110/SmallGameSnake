// @ts-nocheck
document.addEventListener("DOMContentLoaded", () => {
  //Variables Update Score
  let score = 0;
  const textScore = "Score :";
  const scoreGlobal = document.getElementById("scoreGlobal");
  const scoreLoose = document.getElementById("scoreLoose");
  //Variables canevas
  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");
  const looseModal = document.querySelector(".loose-container");
  let gameRunning = false;
  let gameInterval;
  const gridSize = 20;
  const snake = [{ x: 10, y: 10 }];
  let dx = gridSize;
  let dy = 0;
  const apple = { x: 15, y: 15 };
  function drawSnake() {
    ctx.fillStyle = "#000"; // Couleur du serpent en noir
    snake.forEach((segment) => {
      ctx.fillRect(
        segment.x * gridSize,
        segment.y * gridSize,
        gridSize - 2,
        gridSize - 2
      );
    });
  }

  function drawApple() {
    ctx.fillStyle = "#f00";
    ctx.fillRect(
      apple.x * gridSize,
      apple.y * gridSize,
      gridSize - 2,
      gridSize - 2
    );
  }

  function updateSnake() {
    const head = {
      x: snake[0].x + dx / gridSize,
      y: snake[0].y + dy / gridSize,
    };
    snake.unshift(head);

    if (head.x === apple.x && head.y === apple.y) {
      generateNewApple();
      score++;
      scoreGlobal.textContent = textScore + score.toString();
      scoreLoose.textContent = textScore + score.toString();
    } else {
      snake.pop();
    }
  }

  function generateNewApple() {
    apple.x = Math.floor(Math.random() * (canvas.width / gridSize));
    apple.y = Math.floor(Math.random() * (canvas.height / gridSize));
  }

  function checkCollision() {
    const head = snake[0];
    return (
      head.x < 0 ||
      head.x >= canvas.width / gridSize ||
      head.y < 0 ||
      head.y >= canvas.height / gridSize ||
      snake
        .slice(1)
        .some((segment) => segment.x === head.x && segment.y === head.y)
    );
  }

  function gameLoop() {
    if (checkCollision()) {
      clearInterval(gameInterval);
      gameRunning = false;
      looseModal.style.display = "flex";
      setTimeout(() => {
        looseModal.style.display = "none";
      }, 2000);
      setTimeout(() => {
        location.reload();
      }, 2000);
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSnake();
    drawApple();
    updateSnake();
  }

  document.addEventListener("keydown", (e) => {
    if (!gameRunning) return;
    const keyPressed = e.key;
    if (keyPressed === "ArrowLeft" && dx !== gridSize) {
      dx = -gridSize;
      dy = 0;
    } else if (keyPressed === "ArrowUp" && dy !== gridSize) {
      dx = 0;
      dy = -gridSize;
    } else if (keyPressed === "ArrowRight" && dx !== -gridSize) {
      dx = gridSize;
      dy = 0;
    } else if (keyPressed === "ArrowDown" && dy !== -gridSize) {
      dx = 0;
      dy = gridSize;
    }
  });

  const startButton = document.getElementById("startButton");
  startButton.addEventListener("click", () => {
    if (!gameRunning) {
      gameInterval = setInterval(gameLoop, 100);
      gameRunning = true;
      setInterval(creatTimer, 1000);
    }
  });
});
//variables pour la gestion de l'audio
const myAudio = document.getElementById("myAudio");
const playButton = document.getElementById("play");
const pauseButton = document.getElementById("pause");
function PlayPause() {
  playButton.addEventListener("click", () => {
    myAudio.play();
  });
  pauseButton.addEventListener("click", () => {
    myAudio.pause();
  });
}
PlayPause();
// function qui Timer
//Variables Timer
const timerLoose = document.getElementById("timerLoose");
const timerGlobal = document.getElementById("timerGlobal");
const time = "Time: ";
let seconds = 0;
let minutes = 0;
function creatTimer() {
  seconds++;
  if (seconds === 60) {
    seconds = 0;
    minutes++;
  }
  let displaySeconds = seconds < 10 ? "0" + seconds : seconds;
  timerLoose.textContent = time + minutes + ":" + displaySeconds;
  timerGlobal.textContent = time + minutes + ":" + displaySeconds;
}
