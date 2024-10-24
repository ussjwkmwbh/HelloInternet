var score = parseInt(document.getElementById('score').innerText);

function appendScore() {
    score += 1;
    document.getElementById('score').innerText = score;
    if (score % 10 === 0) {
        document.getElementById('alertSound').play();
    }
}


function clearScore() {
    document.getElementById('buttonSound').play();
    score = 0;
    document.getElementById('score').innerText = score;
}
