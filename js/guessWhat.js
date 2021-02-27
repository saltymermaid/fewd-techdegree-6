const keyboard = document.getElementById('qwerty');
const phrase = document.querySelector('#phrase');
const resetButton = document.getElementById('start-game');
const overlay = document.getElementById('overlay');
const scoreboard = document.getElementById('scoreboard');
const hearts = document.querySelectorAll('li.tries > img')
let missed = 0;

resetButton.addEventListener('click', () => {
  overlay.style.display = 'none';
  setUpGame();
});

function getRandomPhraseAsArray(allPhrases) {
  randomIndex = Math.floor(Math.random() * allPhrases.length);
  phraseToGuess = allPhrases[randomIndex];
  return phraseToGuess.split('')
}

function addPhraseToDisplay(phraseArr) {
  phraseArr.forEach(letter => {
    const li = document.createElement("li");
    const phraseUl = document.querySelector('#phrase > ul');
    phraseUl.appendChild(li);
    if(letter !== ' ') {
      li.setAttribute("class", "letter")
    } else {
      li.setAttribute("class", "space")
    }
    li.textContent = letter;
  });
}

function setUpGame() {
  // reset missed counter
  missed = 0;
  // replace the ul element with a fresh one
  const ul = document.createElement("ul");
  const phraseUl = document.querySelector('#phrase > ul');
  phrase.replaceChild(ul, phraseUl);
  // generate and display new phrase
  const phraseArray = getRandomPhraseAsArray(phrases);
  addPhraseToDisplay(phraseArray);
  // reset keyboard
  const keys = document.querySelectorAll('.keyrow > button.chosen');
  keys.forEach(key => {
    key.removeAttribute("class", "chosen");
    key.removeAttribute("disabled", "true");
  });
  // reset hearts
  hearts.forEach(heart => {
    heart.setAttribute("src", "images/liveHeart.png")
  });
  // reset message
  const message = document.querySelector('#overlay > p.message');
  if (message) {
    message.remove();
  };
}

function checkLetter(pressedKey) {
  let selectedLetter = null
  const allLetters = document.querySelectorAll('#phrase > ul > li.letter')
  allLetters.forEach(letter => {
    if(letter.innerHTML.toLowerCase() === pressedKey) {
      letter.classList.add("show")
      selectedLetter = pressedKey
    }
  })
  return selectedLetter
}

function updateOverlay(status, message) {
  overlay.style.display = 'flex';
  overlay.setAttribute("class", status);
  const p = document.createElement("p");
  p.setAttribute("class", "message");
  overlay.appendChild(p);
  let text = message;
  p.textContent = text;
  resetButton.textContent = "Play again";
}

keyboard.addEventListener('click', (e) => {
  let pressedKey = (e.target.innerHTML).toLowerCase();
  e.target.setAttribute("class", "chosen");
  e.target.setAttribute("disabled", "true");
  let letterFound = checkLetter(pressedKey);
  if(!letterFound) {
    missed += 1;
    for (let i = 0; i < missed; i++) {
      hearts[i].setAttribute("src", "images/lostHeart.png")
    }
  }
  let status = checkWin()
  if (status) {
    updateOverlay("win", 'You won!');
  } else if (missed >= 5) {
    updateOverlay("lose", 'You lost!');
  }
})

function checkWin() {
  const allLetters = document.querySelectorAll('#phrase > ul > li.letter')
  const displayedLetters = document.querySelectorAll('#phrase > ul > li.show')
  return allLetters.length === displayedLetters.length
}
