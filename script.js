'use strict'
const playerOneScore = document.getElementById('score--0');
const playerTwoScore = document.getElementById('score--1');
const diceImg = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const btnRoll = document.querySelector('.btn--roll');
const playerOneCur = document.getElementById('current--0');
const playerTwoCur = document.getElementById('current--1');
const playerOne = document.querySelector('.player--0');
const playerTwo = document.querySelector('.player--1');

let scores, currentScore, activePlayer, playing;

//let rollDice = Math.trunc(Math.random()* 6) + 1; 
// DICE FUNCTIONALITY

const init = function () {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    playerOne.classList.remove('player--winner');
    playerTwo.classList.remove('player--winner');
    playerOne.classList.add('player--active');
    playerTwo.classList.remove('player--active');
    playerOneScore.textContent = currentScore;
    playerTwoScore.textContent = currentScore;
    playerOneCur.textContent = currentScore;
    playerTwoCur.textContent = currentScore;
    diceImg.classList.add('hidden');
}
init();

const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    playerOne.classList.toggle('player--active');
    playerTwo.classList.toggle('player--active');
}

btnRoll.addEventListener('click', function () {
    //GENERATING RANDOM DICE
    if (playing) {
        const rollDice = Math.trunc(Math.random() * 6) + 1;;
        //DISPLAY DICE
        diceImg.classList.remove('hidden');
        diceImg.src = `dice-${rollDice}.png`;
        console.log(rollDice);
        //CHECK FOR ROLLED 1
        if (rollDice !== 1) {
            currentScore += rollDice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;

        } else {
            //SWITCH TO PLAYER 2    
            switchPlayer()
        }
    }
});

btnHold.addEventListener('click', function () {
    if (playing) {
        //ADD CURRENT SCORE TO ACTIVE PLAYERS TOTAL 
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        //CHECK IS PLAYERS SCORE IS >= 100
        if (scores[activePlayer] >= 100) {
            //FINISH GAME
            playing = false;
            diceImg.classList.add('hidden');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        } else {
            //SWITCH TO NEXT PLAYER
            switchPlayer()
        }
    }
});

btnNew.addEventListener('click', init);