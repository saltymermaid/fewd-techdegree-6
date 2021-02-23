const pressedKey = document.querySelector('#qwerty').value;
const phrase = document.querySelector('#phrase > ul');
const resetButton = document.querySelector('#start-game');
const overlay = document.querySelector('#overlay');
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
    li.innerHTML = letter;
  });
}

const phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray); 

function checkLetter(pressedKey) {
  allLetters = document.querySelectorAll('#phrase > ul > li.letter')
  allLetters.forEach(letter => {
    if(letter.innerHTML === pressedKey) {
      letter.classList.add("show")
    }
  })
}
