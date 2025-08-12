const playButton = document.querySelector("#playButton");
const gameContainer = document.querySelector("#gameContainer");
const wordPara = document.querySelector("#scrambledWordPara");
const guessForm = document.querySelector("#guessForm");
const guessWord = document.querySelector("#guessWord");

let correctWord = "";
let lives = 0;
let correctGuessed = 0;

function startGame() {
  playButton.style.display = "none";

  lives = 0;
  correctGuessed = 0;
  document.querySelector("#correctGuessSpan").textContent = correctGuessed;

  while (lives <= 0 || lives >= 16 || isNaN(lives)) {
    lives = Number(
      prompt("Set how many lives you want for this current game?")
    );
  }

  displayLives();
  playTurn();
}

function playTurn() {
  guessWord.value = "";
  wordPara.textContent = "Loading Word...";
  gameContainer.style.display = "block";

  fetch("https://random-word-api.vercel.app/api?words=1")
    .then((res) => res.json())
    .then((data) => {
      correctWord = data[0];
      console.log(correctWord);
      let wordSplit = correctWord.split("");

      //word shuffler
      for (let i = 0; i < 100; i++) {
        let a = Math.floor(Math.random() * wordSplit.length);
        let b = Math.floor(Math.random() * wordSplit.length);

        let temp = wordSplit[a];
        wordSplit[a] = wordSplit[b];
        wordSplit[b] = temp;
      }

      wordPara.textContent = wordSplit.join("");
      guessWord.focus();
    });
}

guessForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let guessedWord = guessWord.value;
  if (guessedWord === correctWord) {
    alert("You got it right!");
    correctGuessed++;
    document.querySelector("#correctGuessSpan").textContent = correctGuessed;
    if (correctGuessed === 5) {
      guessWord.disabled = true;
      resetButton.disabled = true;
      document.querySelector("#guessButton").disabled = true;
      guessWord.value = "";

      setTimeout(() => {
        guessWord.disabled = false;
        resetButton.disabled = false;
        document.querySelector("#guessButton").disabled = false;
        alert(
          "Congratulations, you unscrambled all 5 words! Click play to play again."
        );
        gameContainer.style.display = "none";
        playButton.style.display = "inline-block";
      }, 1500);
    } else {
      playTurn();
    }
  } else {
    lives--;
    alert("You lost a Life!");
    displayLives();
  }
});

function displayLives() {
  document.querySelector("#livesSpan").textContent = lives;
  if (lives >= 5) {
    document.querySelector("#livesSpan").style.color = "var(--good-life)";
  } else if (lives >= 3) {
    document.querySelector("#livesSpan").style.color = "var(--close-life)";
  } else if (lives <= 2 && lives > 0) {
    document.querySelector("#livesSpan").style.color = "var(--bad-life)";
  } else if (lives === 0) {
    guessWord.disabled = true;
    resetButton.disabled = true;
    document.querySelector("#guessButton").disabled = true;
    setTimeout(() => {
      guessWord.disabled = false;
      resetButton.disabled = false;
      guessWord.value = "";

      document.querySelector("#guessButton").disabled = false;
      alert(
        `You lost! The word was '${correctWord}'. Click Play to play again.`
      );
      gameContainer.style.display = "none";
      playButton.style.display = "inline-block";
    }, 1500);
  }
}
