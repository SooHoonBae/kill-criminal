'use strict'

const gameBtn = document.querySelector('.game__button');
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');
const gameField = document.querySelector('.game__field');
const fieldRect = gameField.getBoundingClientRect();

const TOMB_COUNT = 10;
const SKULL_COUNT = 5;
const TOMB_SIZE = 70;

let started = false;

gameBtn.addEventListener('click', () => {
    if(started) {
        stopTimer();
        started=false;

    }else{
        initGame();
        started=true;
    }
    
})
function initGame() {
    gameBtn.style.transform = 'translateX(0)';
    gameTimer.style.width='250px';
    gameTimer.style.visibility='visible';
    gameScore.style.visibility='visible';
    addItem('skull',SKULL_COUNT,'img/skull.png');
    addItem('tomb',TOMB_COUNT,'img/tomb.png');
    startTimer();
    gameScore.innerHTML = `${SKULL_COUNT}`;
}
function addItem(className,count,src) {
    const minX = 0;
    const minY = 0;
    const maxX = fieldRect.width - TOMB_SIZE;
    const maxY = fieldRect.height - TOMB_SIZE;
    
    for(let i=0; i<count; i++) {
        const x = randomNumber(minX,maxX);
        const y = randomNumber(minY, maxY);
        const item = document.createElement('img');
        item.setAttribute('class',className);
        item.setAttribute('src',src);
        item.style.position = 'absolute';
        item.style.left = `${x}px`;
        item.style.top =`${y}px`;
        gameField.appendChild(item);
    }
    
}
function randomNumber(min,max){
    return Math.random()*(max-min)+min;
}

gameField.addEventListener('click',(event)=>{
    if(event.target==gameField){
        return;
    }
    if(event.target.matches('.tomb')){
        stopTimer();
    }
    else if(event.target.matches('.skull')){
        event.target.remove();
        updateScore();
    }
})

let score = 0;
function updateScore() {
    score++;
    gameScore.innerHTML=SKULL_COUNT-score;
}

let timer=undefined;
function startTimer() {
    let timeleft = 10;
    timer = setInterval(() => {
        if (timeleft<0){
            clearInterval()
        }
        else{
        timeSetting(timeleft);
        timeleft--;
        }
    }, 1000);
}
function stopTimer() {
    clearInterval(timer);
}

function timeSetting(time) {
    const minute = Math.floor(time/60);
    const second = time%60;
    gameTimer.innerHTML = `${minute} : ${second}`;
}