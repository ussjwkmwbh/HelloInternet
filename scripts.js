var score = parseInt(document.getElementById("score").innerText);
localStorage.setItem("currentScore", score);

function getHighScore() {
  let highScore = localStorage.getItem("highScore");
  document.getElementById('highScore').innerText = `HighScore: ${highScore}`
  return highScore ? parseInt(highScore) : 0;
}

function saveHighScore(newScore) {
  localStorage.setItem("highScore", newScore);
  document.getElementById('newHighScore').innerText = "New HighScore!";
}

function appendScore() {
  score += 1;
  document.getElementById("score").innerText = score;

  if (score % 10 === 0) {
    document.getElementById("alertSound").play();
    console.log(score);
  }
  localStorage.setItem("currentScore", score);
  const highScore = getHighScore();
  if (score > highScore) {
    saveHighScore(score);
  }
}

function clearScore() {
  document.getElementById("buttonSound").play();
  score = 0;
  document.getElementById("score").innerText = score;
}

//Keyboard Controls
let wasSpacePressed = false
let wasEnterPressed = false
document.addEventListener("keydown", function (event) {
  if (event.code === "Space" && !wasSpacePressed) {
    appendScore();
    wasSpacePressed = true
  }
  if (event.code === "Enter" && !wasEnterPressed) {
    clearScore();
    wasEnterPressed = true
  }
});
document.addEventListener("keyup", function (event) {
  if (event.code === "Space") {
    wasSpacePressed = false
  } else if (event.code === "Enter") {
    wasEnterPressed = false
  }
});

//Gamepad Controls 💀 [Xbox layout]
let controllerIndex = null;
let A_button = null;
let X_button = null;

window.addEventListener("gamepadconnected", (event) => {
  controllerIndex = event.gamepad.index;
  console.log("connected");
  setTimeout(control, 1500);
});

window.addEventListener("gamepaddisconnected", (event) => {
  console.log("disconnected");
  controllerIndex = null;
});

function controllerInput() {
  if (controllerIndex !== null) {
    const gamepad = navigator.getGamepads()[controllerIndex];

    const buttons = gamepad.buttons;
    A_button = buttons[0].pressed;
    X_button = buttons[2].pressed;
  }
}
let wasAButtonPressed = false;
let wasXButtonPressed = false;

function control() {
  controllerInput();

  if (A_button && !wasAButtonPressed) {
    appendScore();
    wasAButtonPressed = true;
  } else if (!A_button) {
    wasAButtonPressed = false;
  }
  if (X_button && !wasXButtonPressed) {
    clearScore();
    wasXButtonPressed = true;
  } else if (!X_button) {
    wasXButtonPressed = false;
  }
  requestAnimationFrame(control);
}
