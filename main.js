const turnA = "❌"
const turnB = "❤️"

const board = document.querySelectorAll('.board')
const gameOverEl = document.getElementById("gameOver");
const player = document.getElementById("player");
const popTextCongo = document.getElementById("pop-text-congo");

const tie = new Audio('./assets/tie.mp3')
const playerClicked = new Audio('./assets/playerClicked.mp3')
const error = new Audio('./assets/error.mp3')
const playerWin = new Audio('./assets/playerWin.mp3')

let isGameOver = false;
let count = 0;

for (let i = 0; i < 9; i++) {
    board[i].addEventListener('click', () => { turn(i) })
}

const turn = (i) => {
    if (board[i].innerText == "" && isGameOver == false) {
        playerClicked.play();
        if (count % 2 == 0)
            board[i].innerText = turnA;
        else
            board[i].innerText = turnB;
        count++;
        if (count >= 5) {
            xWinValue = checkWin(turnA)
            oWinValue = checkWin(turnB)
            if (xWinValue != -1) {
                gameOver(xWinValue);
                playerWin.play();
            }
            else if (oWinValue != -1) {
                gameOver(oWinValue);
                playerWin.play();
            }
            else if (count == 9) {
                tie.play()
                popTextCongo.innerText = "Tie"
                gameOver();
            }
        }
    }
    if(isGameOver==true){
        error.play();
    }
}

const gameOver = (win = 0) => {
    gameOverEl.style.display = "flex";
    player.innerText = win;
    isGameOver = true
}


const checkWin = (e) => {
    // Horizontal
    if (board[0].innerText == board[1].innerText && board[1].innerText == board[2].innerText && board[2].innerText == e)
        return e;

    else if (board[3].innerText == board[4].innerText && board[4].innerText == board[5].innerText && board[5].innerText == e)
        return e;

    else if (board[6].innerText == board[7].innerText && board[7].innerText == board[8].innerText && board[8].innerText == e)
        return e;

    // Vertical
    else if (board[0].innerText == board[3].innerText && board[3].innerText == board[6].innerText && board[6].innerText == e)
        return e;

    else if (board[1].innerText == board[4].innerText && board[4].innerText == board[7].innerText && board[7].innerText == e)
        return e;

    else if (board[2].innerText == board[5].innerText && board[5].innerText == board[8].innerText && board[8].innerText == e)
        return e;

    // Diagonally
    else if (board[0].innerText == board[4].innerText && board[4].innerText == board[8].innerText && board[8].innerText == e)
        return e;

    else if (board[2].innerText == board[4].innerText && board[4].innerText == board[6].innerText && board[6].innerText == e)
        return e;

    else
        return -1;
}

function restart() {
    location.reload();
}
function replay() {
    count = 0;
    isGameOver = false;
    gameOverEl.style.display = "none";
    for (let i = 0; i < 9; i++) {
        board[i].innerText = "";
    }
}

function cross() {
    gameOverEl.style.display = "none";
}