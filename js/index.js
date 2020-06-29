const winCombos = [
  // horizontal combinations
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // vertical combinations
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  // diagonal combinations
  [0, 4, 8],
  [2, 4, 6],
];

const ai = {
  text: "O",
  class: "circle",
  score: 0,
};

const human = {
  text: "X",
  class: "cross",
  score: 0,
};

const grids = document.querySelectorAll(".grid"); //array of all grds

let overlay = document.getElementById("overlay");
let restart = document.getElementById("restart");
let aiScore = document.getElementById("aiScore");
let humanScore = document.getElementById("humanScore");
let result = document.getElementById("result");
let message = "";
restart.addEventListener("click", startGame);

startGame();
function startGame() {
  overlay.style.visibility = "hidden";
  grids.forEach((grid) => {
    grid.classList.remove(ai.class);
    grid.classList.remove(human.class);
    grid.innerHTML = "";
    grid.addEventListener("click", swapTurn, { once: true });
  });
}

function swapTurn(e) {
  let box = e.target;
  userTurn(box);

  if (!draw() && !won(human)) aiTurn();
}

function userTurn(box) {
  if (box.innerHTML == "") {
    box.innerHTML = human.text;
    box.classList.add(human.class);
  }
  let wonHuman = won(human);
  if (wonHuman) {
    message = "You Win";
    human.score++;
    humanScore.innerHTML = human.score;
    gameEnd();
  } else if (draw()) {
    message = "Game Drawn";
    gameEnd();
  }
}

function aiTurn(box) {
    let randomNumber = Math.floor(Math.random() * 9);

  if (grids[randomNumber].innerHTML == "") {
      
    grids[randomNumber].innerHTML = ai.text;
    grids[randomNumber].classList.add(ai.class);

    let wonAi = won(ai);
    if (wonAi) {
      message = "You Loose";
      ai.score++;
      aiScore.innerHTML = ai.score;
      gameEnd();
    }
  } else {
    aiTurn();
  }
}

function draw() {
  return [...grids].every((grid) => {
    return (
      grid.classList.contains(ai.class) || grid.classList.contains(human.class)
    );
  });
}

function won(player) {
  return winCombos.some((combos) => {
    return combos.every((index) => {
      return grids[index].innerHTML == player.text;
    });
  });
}

function gameEnd() {
  overlay.style.visibility = "visible";
  result.innerHTML = message;
}
