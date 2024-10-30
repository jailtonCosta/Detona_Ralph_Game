const state = {
    view : {
        squares : document.querySelectorAll(".square"),
        enemy : document.querySelectorAll(".enemy"),
        timeLeft : document.querySelector("#time-left"),
        score : document.querySelector("#score"),
    },
    values : {
       
        gameVelocity : 1000,
        hitPosition : 0,
        result : 0,
        currentTime : 30,
    },
    actions : {
        timerId : null, //setInterval(randonSquare,1000),
        countDownTimerId : setInterval(countDown,  1000),
    },

};

function countDown (){
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if (state.values.currentTime <= 0 ){

        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);

        alert("Game Over! O seu resultado foi : " + state.values.result);
    }
}
//Tocar o audio do game
function playSound(){
    let audio = new Audio("/audios/hit.m4a");
    audio.volume = 0.2
    audio.play();
}

function randonSquare(){
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
                 
    });

    let randonNumber = Math.floor(Math.random() * 9 );
    let randonSquare = state.view.squares[randonNumber];
    randonSquare.classList.add("enemy");
    state.values.hitPosition = randonSquare.id;
}

//Mover inimigo
function moveEnemy(){
    state.values.timerId = setInterval(randonSquare, state.values.gameVelocity);
}

function addListenerHitbox (){
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if (square.id === state.values.hitPosition){
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound("hit");
            }
        });
    });

}


function main (){
    moveEnemy();
    addListenerHitbox();
    randonSquare();
}

main();