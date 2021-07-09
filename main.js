'use strict'

const gameBtn = document.querySelector('.game__button');
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');
const gameField = document.querySelector('.game__field');
const popUp = document.querySelector('.popUp');
const popUpMessage = document.querySelector('.popUp__message');
const refreshBtn = document.querySelector('.popUp__refresh');
const playBtn = document.querySelector('.fas');
const fieldRect = gameField.getBoundingClientRect();

const TOMB_COUNT = 10;
const SKULL_COUNT = 5;
const timeDuration = 10;
const TOMB_SIZE = 80;

let started = false;

gameBtn.addEventListener('click', () => {
    if(started) {
        stopTimer();
        showPopUp('Replay?');
        
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
    showStopBtn();
    gameScore.innerHTML=SKULL_COUNT;
    
}
function showStopBtn() {
    playBtn.classList.remove('fa-play');
    playBtn.classList.add('fa-stop');
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
function showPopUp(message) {
    popUp.classList.remove('popUp-hide');
    popUpMessage.innerHTML=`${message}`;
}
function hidePopUp() {
    popUp.classList.add('popUp-hide');
}
refreshBtn.addEventListener('click',()=>{
    hidePopUp();
    gameField.innerHTML=``;
    addItem('skull',SKULL_COUNT,'img/skull.png');
    addItem('tomb',TOMB_COUNT,'img/tomb.png');
    startTimer();
    gameScore.innerHTML = `${SKULL_COUNT}`;
    score=0;
})

gameField.addEventListener('click',(event)=>{
    if(event.target==gameField){
        return;
    }
    if(event.target.matches('.tomb')){
        stopTimer();
        showPopUp('You Lost~~');
    }
    else if(event.target.matches('.skull')){
        event.target.remove();
        updateScore();
        if(score==SKULL_COUNT){
            stopTimer();
            showPopUp('You Win🎉');
        }
    }
})

let score = 0;
function updateScore() {
    score++;
    gameScore.innerHTML=SKULL_COUNT-score;
}
let timer=undefined;
function startTimer() {
    let timeleft = timeDuration;
    timeSetting(timeleft);
    timer = setInterval(() => {
        if (timeleft<=0){
            stopTimer();
            showPopUp('You Lost');
        }
        else{
        timeSetting(--timeleft);
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