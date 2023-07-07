// Array to hold the card values
//testing with alphabetical, will change to HTML tags
const cardValues = ['html', 'html', 'body', 'body', 'p', 'p', 'a', 'a', 'section', 'section', 'article', 'article'];

// Shuffle the card values - calling the shuffle function and passing in the cardValues array
const shuffledCardValues = shuffle(cardValues);

// Create a game board and populate it with cards
const gameBoard = document.getElementById('game-board');
const rowSize = 4;
let row = document.createElement('div');
row.className = 'row';
gameBoard.appendChild(row);

for (let i = 0; i < shuffledCardValues.length; i++) {
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = '?';
  card.addEventListener('click', flipCard);
  card.dataset.value = shuffledCardValues[i]; // Store the value as a data attribute
  row.appendChild(card);

  // Create a new row after each rowSize
  if ((i + 1) % rowSize === 0 && i !== shuffledCardValues.length - 1) {
    row = document.createElement('div');
    row.className = 'row';
    gameBoard.appendChild(row);
  }
}

// Variables to keep track of the flipped cards, the score, and the reset button
let flippedCards = [];
let score = 0;
const scoreTracker = document.getElementById('score-tracker');
const resetButton = document.getElementById('reset-button');
resetButton.addEventListener('click', resetGame);

// Function to handle card clicks
function flipCard() {
  // Check if the card is already flipped or matched
  if (this.classList.contains('flipped')) {
    return;
  }

  // Flip the card
  this.innerHTML = this.dataset.value;
  this.classList.add('flipped');

  flippedCards.push(this);

  // Check if two cards are flipped
  if (flippedCards.length === 2) {
    const card1 = flippedCards[0];
    const card2 = flippedCards[1];

    // Check if the two flipped cards match
    if (card1.innerHTML === card2.innerHTML) {
      card1.classList.add('matched');
      card2.classList.add('matched');
      score++; // Increase the score when a pair is matched
      scoreTracker.textContent = `Score: ${score}`;

      // Check if all cards are matched to end the game
      if (document.querySelectorAll('.card.matched').length === shuffledCardValues.length) {
        endGame();
      }
    } else {
      // Delay flipping the cards back if they don't match
      setTimeout(() => {
        card1.innerHTML = '?';
        card2.innerHTML = '?';
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
      }, 1000);
    }

    flippedCards = [];
  }
}

// Function to shuffle an array using the Fisher-Yates algorithm
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Function to reset the game
function resetGame() {
  // Clear the game board
  gameBoard.innerHTML = '';

  // Shuffle the card values again
  const reshuffledCardValues = shuffle(cardValues);

  // Reset the flipped cards and score
  flippedCards = [];
  score = 0;
  scoreTracker.textContent = 'Score: 0';

  // Repopulate the game board with new cards
  let row = document.createElement('div');
  row.className = 'row';
  gameBoard.appendChild(row);

  for (let i = 0; i < reshuffledCardValues.length; i++) {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = '?';
    card.addEventListener('click', flipCard);
    card.dataset.value = reshuffledCardValues[i];
    row.appendChild(card);

    if ((i + 1) % rowSize === 0 && i !== reshuffledCardValues.length - 1) {
      row = document.createElement('div');
      row.className = 'row';
      gameBoard.appendChild(row);
    }
  }
}

// Function to end the game
function endGame() {
  // Disable click events on all cards
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.removeEventListener('click', flipCard);
  });

 
}