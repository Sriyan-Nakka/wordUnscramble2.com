const gameContainer = document.querySelector("#gameContainer");
const wordPara = document.querySelector("#scrambledWordPara");

let correctWord = "";
let lives = 0;

function startGame() {
  while (lives <= 0 || lives >= 16 || isNaN(lives)) {
    lives = Number(
      prompt("Set how many lives you want for this current game?")
    );
  }

  playTurn();
}

function playTurn() {
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
    });
}
