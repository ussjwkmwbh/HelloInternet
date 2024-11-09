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
document.addEventListener("keydown", function (event) {
  if (event.code === "Space") {
    appendScore();
  } else if (event.code === "Enter") {
    clearScore();
  }
});
