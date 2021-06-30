'use strict'

const gameBtn = document.querySelector('.game__button');
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');
const gameField = document.querySelector('.game__field');
const fieldRect = gameField.getBoundingClientRect();

const TOMB_COUNT = 5;
const SKULL_COUNT = 5;
const TOMB_SIZE = 60;
gameBtn.addEventListener('click', () => {
    gameBtn.style.transform = 'translateX(0)';
    gameTimer.style.width='250px';
    gameTimer.style.visibility='visible';
    gameScore.style.visibility='visible';
    addItem();
})
function addItem() {
    const minX = 0;
    const minY = 0;
    const maxX = fieldRect.width - TOMB_SIZE;
    const maxY = fieldRect.height - TOMB_SIZE;
    
    for(let i=0; i<10; i++) {
        const x = randomNumber(minX,maxX);
        const y = randomNumber(minY, maxY);
        const item = document.createElement('img');
        item.setAttribute('class','tomb');
        item.setAttribute('src','img/tomb.png');
        item.style.position = 'absolute';
        item.style.left = `${x}px`;
        item.style.top =`${y}px`;
        gameField.appendChild(item);
    }
    
}
function randomNumber(min,max){
    return Math.random()*(max-min)+min;
}