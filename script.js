// grab the DOM elements
const worldEl = document.querySelector('#word');
const wrongLettersEl = document.querySelector('#wrong-letters');
const playAgainBtn = document.querySelector('#play-button');
const popup = document.querySelector('#popup-container');
const notification = document.querySelector('#notification-container');
const finalMessage = document.querySelector('#final-message');

const figureParts = document.querySelectorAll('.figure-part');

// TODO: replace with fetch for random words
const words = ['application', 'programming', 'interface', 'wizard'];

// choose a random word from the words array
let selectedWord = words[Math.floor(Math.random() * words.length)];

// console.log(selectedWord);

const correctLetters = [];
const wrongLetters = [];

// show the hidden word
function displayWord() {
  // set the words text
  worldEl.innerHTML = `
    ${selectedWord
      // run split to turn the string into an array
      .split('')
      // then we want to map() through the array
      // return a span class letter with the correct letter or nothing
      // use .join() to turn it back into a string
      .map(letter => `
        <span class="letter">
          ${correctLetters.includes(letter) ? letter : ''}
        </span>
      `).join('')}`;
    
    // regex to remove newline characters with an empty string, done globally
      const innerWord = worldEl.innerText.replace(/\n/g, '');
    // console.log(worldEl.innerText, innerWord);

    // if innerWord matches the final, give a message and change to flex to show the message on the screen
    if (innerWord === selectedWord) {
      finalMessage.innerText = 'Congratulations! You won! 😃';
      popup.style.display = 'flex';
    }
}

// update the wrong letters
// 1. add the hangman figure
// 2. see if we are done
// 3. show the notification
function updateWrongLettersEl() {
  // display wrong letters
  wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
    ${wrongLetters.map(letter => `<span> ${letter}</span>`)}
  `;

  // display parts
  // this is an array we will loop through
  // check how many wrong letters there are
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;

    // build a body part if the game is still going on
    if(index < errors) {
      part.style.display = 'block';
    } else {
      part.style.display = 'none';
    }
  });

  // check if lost (more than 6 wrong guesses)
  // if so, show message
  if(wrongLetters.length === figureParts.length) {
    finalMessage.innerText = 'Unfortunately you lost. 😕';
    popup.style.display = 'flex';
  }
}

// show notification
// change classes to show a notication
// then remove the class, to hide notification, after 2 seconds
function showNotification() {
  notification.classList.add('show');

  setTimeout(() => {
    notification.classList.remove('show');
  }, 2000)
}

// Event listeners

// Keydown letter press
window.addEventListener('keydown', e => {
  // each key has a corresponding keycode, the letters use the keycodes 65 to 90
  // console.log(e.keyCode);

  // if letter is entered (65 to 90)
  // assign the letter to variable (letter)
  // check if the selected word includes the letter
  // if it is, add it, IF it hasn't been already
  // update word by running displayWord()
  // if its already there, show notification that letter has bene chosen
  // if the letter doesn't exist in the word
  // check and see if it already exists in wrong letters, if not push it there
  // update the wrong lettes by running wrongLettersEl()
  // if its already been cbosen, show notification
  if(e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;

    if(selectedWord.includes(letter)) {
      if(!correctLetters.includes(letter)) {
        correctLetters.push(letter);
        displayWord();
      } else {
        showNotification();
      }
    } else {
      if(!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);

        updateWrongLettersEl();
      } else {
        showNotification();
      }
    }
  }
});

// Restart game and play again
playAgainBtn.addEventListener('click', () => {
  //  Empty arrays
  correctLetters.splice(0);
  wrongLetters.splice(0);

  // pick a new word
  selectedWord = words[Math.floor(Math.random() * words.length)];
  
   // call displayWord() funcion, just like when the page loads
  displayWord();
  
  // empty wrong letters
  updateWrongLettersEl();
  
  popup.style.display = 'none';
});

displayWord();