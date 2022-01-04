let board = []
let display = document.getElementById('display')
let gameFinished = false
let restartBtn = document.getElementById('reset')
let containerOfSymbols = document.getElementById('poleks')
restartBtn.addEventListener("click", () => {
    board = []
    containerOfSymbols.innerHTML = ""
    createBoard()
    gameFinished = false
    display.innerHTML = "TURN X"
    playerXturn = true

})
function getColumns() {
    return [0, 1, 2].map(col => getColumn(col))
}
function getRows() {
    return [0, 1, 2].map(row => board[row])
}
function getColumn(col) {
    return [0, 1, 2].map(row => board[row][col])
}
function getFirstDiagonal() {
    return [0, 1, 2].map(increasing => board[increasing][increasing])
}
function getSecondDiagonal() {
    return [0, 1, 2].map(col => board[2 - col][col])
}
function areTheSame(x, y, z) {
    return z != null && z == y && z == x
}

let boardSize = 3
let playerXturn = true
display.innerHTML = "TURN X"

function createBoard() {
    for (let rowIndex = 0; rowIndex < boardSize; rowIndex++) {
        let row = []
        board.push(row)
        for (let colIndex = 0; colIndex < boardSize; colIndex++) {
            row.push(null)
            const oneFieldWithSymbol = document.createElement('div')
            containerOfSymbols.appendChild(oneFieldWithSymbol)
            oneFieldWithSymbol.addEventListener('click', () => addSymbols(oneFieldWithSymbol, rowIndex, colIndex))
        }

    }
}

function addSymbols(oneFieldWithSymbol, row, col) {
    if (board[row][col] != null || gameFinished) {
        return
    } else if (!playerXturn) {
        oneFieldWithSymbol.textContent = "O"
        board[row][col] = 'O'
        display.innerHTML = "TURN X"
    } else if (playerXturn) {
        oneFieldWithSymbol.textContent = "X"
        board[row][col] = 'X'
        display.innerHTML = "TURN O"
    }
    oneFieldWithSymbol.classList.add("flip")
    playerXturn = !playerXturn

    let winningSets = [
        ...getColumns(),
        ...getRows(),
        getFirstDiagonal(),
        getSecondDiagonal()
    ]
    let winningSetsResult = winningSets.map(elem => areTheSame(...elem) ? elem[0] : false)
    let winner = winningSetsResult.find(elem => elem)
    if (winner) {
        display.innerHTML = "WINNER IS " + winner
        gameFinished = true
    }
    else if (board.every(row => row.every(sym => sym))) {
        display.innerHTML = "DRAW"
    }

}
createBoard()

