'use strict'

const gameBtn = document.querySelector('.game__button');
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');
const gameField = document.querySelector('.game__field');
const fieldRect = gameField.getBoundingClientRect();
const target = document.querySelector('.target');


const popUp = document.querySelector('.popUp');
const popUpMessage = document.querySelector('.popUp__message');
const popUpRefresh = document.querySelector('.popUp__refresh');

const skullSound = new Audio('./sound/skull_pull.mp3')
const tombSound = new Audio('./sound/tomb_pull.mp3')
const winSound = new Audio('./sound/game_win.mp3')
const alertSound = new Audio('./sound/alert.wav')
const bgSound = new Audio('./sound/bg.mp3')
const gunSound = new Audio('./sound/gun.mp3')

const TOMB_COUNT = 10;
const SKULL_COUNT = 5;
const GAME_DURATION = 10;
const TOMB_SIZE = 80;

let started = false;

gameBtn.addEventListener('click', () => {
    if(started) {
        stopGame();    
        
    }else{
        startGame();
    }
    
})
function startGame() {
    started=true;
    initGame();
    showStopBtn();
    showTimerAndScore();
    playSound(bgSound);
}
function stopGame() {
    stopTimer();
    showPopUp('Replay?');
    playSound(alertSound);
    stopSound(bgSound);
}
function initGame() {
    gameField.innerHTML=``;
    startTimer();
    addItem('skull',SKULL_COUNT,'img/skull.png');
    addItem('tomb',TOMB_COUNT,'img/tomb.png');
    gameScore.innerHTML=SKULL_COUNT;
    
}
popUpRefresh.addEventListener('click',()=>{
    hidePopUp();
    startGame();
    score=0;
})
function showTimerAndScore() {
    gameTimer.style.visibility='visible';
    gameScore.style.visibility='visible';
    gameTimer.style.width='250px';
};
function showStopBtn() {
    const playBtn = document.querySelector('.fas');
    playBtn.classList.remove('fa-play');
    playBtn.classList.add('fa-stop');
    gameBtn.style.transform = 'translateX(0)';
}
function addItem(className,count,imgPath) {
    const minX = 0;
    const minY = 0;
    const maxX = fieldRect.width - TOMB_SIZE;
    const maxY = fieldRect.height - TOMB_SIZE;
    
    for(let i=0; i<count; i++) {
        const x = randomNumber(minX,maxX);
        const y = randomNumber(minY, maxY);
        const item = document.createElement('img');
        item.setAttribute('class',className);
        item.setAttribute('src',imgPath);
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
    popUpMessage.innerHTML=message;
}
function hidePopUp() {
    popUp.classList.add('popUp-hide');
}


gameField.addEventListener('click',onFieldClick)
function onFieldClick(event) {
        playSound(gunSound);
        if(!started){
            return;
        }
        const target = event.target;
        if(target.matches('.tomb')){
            stopTimer();
            showPopUp('You Lost~~');
            playSound(tombSound);
        }
        else if(target.matches('.skull')){
            target.attributes.src.value = 'img/die.png';
            target.animate([
                {opacity : '0'}
            ],{
                duration:2000,
                fill:'forwards'
            }
            )
            score++;
            updateScore();
            playSound(skullSound);
            if(score===SKULL_COUNT){
                stopTimer();
                showPopUp('You Win🎉');
                playSound(winSound);
                stopSound(bgSound);
            }
        }
    };
    
let score = 0;
function updateScore() {
    gameScore.innerHTML=SKULL_COUNT-score;
}
function playSound(sound) {
    sound.play();
    sound.currentTime=0;
}
function stopSound(sound) {
    sound.pause();
}
let timer=undefined;
function startTimer() {
    let remainingTimeSec = GAME_DURATION;
    updateTimerText(remainingTimeSec);
    timer = setInterval(() => {
        if (remainingTimeSec<=0){
            stopTimer();
            showPopUp('You Lost');
            playSound(tombSound);
            return;
        }
        else{
        updateTimerText(--remainingTimeSec);
        }
    }, 1000);
}
function stopTimer() {
    clearInterval(timer);
}
function updateTimerText(time) {
    const minute = Math.floor(time/60);
    const second = time%60;
    gameTimer.innerHTML = `${minute} : ${second}`;
}