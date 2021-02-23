const keyboard = document.getElementById('qwerty');
// const pressedKey = keyboard.value;
const phrase = document.querySelector('#phrase > ul');
const resetButton = document.getElementById('start-game');
const overlay = document.getElementById('overlay');
const scoreboard = document.getElementById('scoreboard');
let missed = 0;

resetButton.addEventListener('click', (event) => {
  overlay.style.display = 'none';
});

function getRandomPhraseAsArray(allPhrases) {
  randomIndex = Math.floor(Math.random() * allPhrases.length);
  phraseToGuess = allPhrases[randomIndex];
  return phraseToGuess.split('')
}

function addPhraseToDisplay(phraseArr) {
  phraseArr.forEach(letter => {
    const li = document.createElement("li");
    phrase.appendChild(li);
    if(letter !== ' ') {
      li.setAttribute("class", "letter")
    } else {
      li.setAttribute("class", "space")
    }
    li.textContent = letter;
  });
}

const phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray); 

function checkLetter(pressedKey) {
  let selectedLetter = null
  allLetters = document.querySelectorAll('#phrase > ul > li.letter')
  allLetters.forEach(letter => {
    if(letter.innerHTML.toLowerCase() === pressedKey) {
      letter.classList.add("show")
      selectedLetter = pressedKey
    }
  })
  return selectedLetter
}

keyboard.addEventListener('click', (e) => {
  let pressedKey = (e.target.innerHTML).toLowerCase();
  e.target.setAttribute("class", "chosen");
  e.target.setAttribute("disabled", "true");
  let letterFound = checkLetter(pressedKey);
  if(!letterFound) {
    missed += 1;
    console.log(missed); // update hearts
  }
})
