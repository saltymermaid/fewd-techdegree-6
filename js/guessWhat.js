const pressedKey = document.querySelector('#qwerty').value;
const phrase = document.querySelector('#phrase');
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
  let letters = '';
  phraseArr.forEach(letter => {
    let charClass = '';
    if(letter !== ' ') {
      charClass = 'letter';
    } else {
      charClass = 'space';
    }
    letters += `<li class="${charClass}">${letter}</li>`
  });
  phrase.innerHTML = letters;
}

const phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray); 
