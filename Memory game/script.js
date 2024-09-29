const cardValues = [
    1, 1, 2, 2, 3, 3, 4, 4,
    5, 5, 6, 6, 7, 7, 8, 8
];

let firstCard, secondCard;
let hasFlippedCard = false;
let lockBoard = false;

const board = document.getElementById('game-board');
const restartButton = document.getElementById('restart-btn');

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

function createCard(value) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('data-value', value);
    card.addEventListener('click', flipCard);
    return card;
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flipped');
    this.innerText = this.getAttribute('data-value');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    lockBoard = true;

    checkForMatch();
}

function checkForMatch() {
    const isMatch = firstCard.getAttribute('data-value') === secondCard.getAttribute('data-value');

    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');

    // Delay for 2 seconds before making the cards invisible
    setTimeout(() => {  
        firstCard.style.opacity = '0'; // Fade out
        secondCard.style.opacity = '0'; // Fade out
        resetBoard();
    }, 2000); // 2000 milliseconds = 2 seconds
}

function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        firstCard.innerText = '';
        secondCard.classList.remove('flipped');
        secondCard.innerText = '';
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function startGame() {
    shuffle(cardValues);
    board.innerHTML = '';
    cardValues.forEach(value => {
        const card = createCard(value);
        board.appendChild(card);
    });
}

restartButton.addEventListener('click', startGame);

startGame();
