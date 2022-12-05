'use strict'

const WALL = 'WALL'
const FLOOR = 'FLOOR'
const BALL = 'BALL'
const GAMER = 'GAMER'
const GLUE = 'GLUE'

const GAMER_IMG = '<img src="img/gamer.png">'
const BALL_IMG = '<img src="img/ball.png">'
const GLUE_IMG = '<img src="img/gamer-purple.png">'

// Model:
var gBoard
var gGamerPos
var ballsColected = 0
// var ballsLeft = 0
var ballsLeft = 2
var gStartInt
var gGlueStartInt
var gClearGlueStartInt

function onInitGame() {
    var elBtn = document.querySelector('button')
    elBtn.style.display = 'none'
    if (gStartInt) clearInterval(gStartInt)
    var elballsLeft = document.querySelector('h3 span')
    ballsLeft = 2
    gGamerPos = { i: 2, j: 9 }
    gBoard = buildBoard()
    renderBoard(gBoard)

    gStartInt = setInterval(randomNewBall, 3000)
    gGlueStartInt = setInterval(randomGlueCell, 5000)
    // var now = new Date().getTime();
    // console.log(now)
    

    elballsLeft.innerText = ballsLeft








}
function countNegsBalls() {
    var negsCounter = 0
    var elNegsCounter = document.querySelector('h4 span')
    // console.log(gGamerPos.i)
    for (var i = gGamerPos.i - 1; i <= gGamerPos.i + 1; i++) {
        if (i < 0 || i > gBoard.length) continue
        for (var j = gGamerPos.j - 1; j <= gGamerPos.j + 1; j++) {
            if (j < 0 || j > gBoard[0].length) continue
            if (gBoard[i][j].gameElement === BALL) negsCounter++
        }
    }

    elNegsCounter.innerText = negsCounter

}

function randomGlueCell() {
    var emptyCells = getemptycells()
    var randomNumIdx = getRandomInt(0, emptyCells.length)
    var pos = emptyCells[randomNumIdx]
    // console.log(pos)
    gBoard[pos.i][pos.j].gameElement = GLUE
    renderBoard(gBoard)
    setTimeout(() => {gBoard[pos.i][pos.j].gameElement = null}, 3000);

    if (ballsLeft === 0) {

        clearInterval(gGlueStartInt)
    }


}
function countBallsLeft() {
    var elballsLeft = document.querySelector('h3 span')
    elballsLeft.innerText = ballsLeft
    var elBtn = document.querySelector('button')
    if (ballsLeft === 0) {
        alert('you won!!!')
        clearInterval(gStartInt)
        elBtn.style.display = 'block'
    }
    // var ballsLeft = 0
    // for (var i = 0; i < gBoard.length; i++) {
    //     for (var j = 0; j < gBoard[0].length; j++) {
    //         if (gBoard[i][j].gameElement === BALL) {
    //             ballsLeft++
    //         }
    //     }
    // }
    // return ballsLeft
}
function randomNewBall() {
    var emptyCells = getemptycells()
    var randomNumIdx = getRandomInt(0, emptyCells.length)
    var pos = emptyCells[randomNumIdx]
    // console.log(pos)
    gBoard[pos.i][pos.j].gameElement = BALL
    renderBoard(gBoard)
    // var elballsLeft = document.querySelector('h3 span')
    // ballsLeft = countBallsLeft()
    ballsLeft++
    countBallsLeft()



    // elballsLeft.innerText = ballsLeft



    // var randI = getRandomInt(0,gBoard.length)
    // var randJ = getRandomInt(0,gBoard[0].length)
    // if (!gBoard[randI][randJ].gameElement && gBoard[randI][randJ].type === FLOOR){
    //     gBoard[randI][randJ].gameElement = BALL
    //     renderBoard(gBoard)
    // }


    // for (var i =0 ;i< gBoard.length; i++){

    // }

}
function getemptycells() {
    var emptyCells = []
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            if (!gBoard[i][j].gameElement && gBoard[i][j].type === FLOOR) {
                emptyCells.push({ i: i, j: j })
            }
        }
    }
    return emptyCells

}
// var res = getemptycells(gBoard)
// console.log(res)
// pickEmptyCell(res)

// function pickEmptyCell(emptyCells){


//         var curNumIdx = getRandomInt(0, emptyCells.length)
//         // console.log('curNum is: ' , curNum)

//         var emptyCell = gNums.splice(curNumIdx, 1)[0]
//         // var curNum = gNums.length
//         // gNums.pop()
//         console.log(emptyCell)

//         return emptyCell
//     }


function buildBoard() {
    const board = []
    // DONE: Create the Matrix 10 * 12 
    // DONE: Put FLOOR everywhere and WALL at edges
    for (var i = 0; i < 10; i++) {
        board[i] = []
        for (var j = 0; j < 12; j++) {
            board[i][j] = { type: FLOOR, gameElement: null }
            if (i === 0 && j !== 5 || i === 9 && j !== 5 || j === 0 && i !== 5 || j === 11 && i !== 5) {
                board[i][j].type = WALL
            }

        }
    }
    // DONE: Place the gamer and two balls
    board[gGamerPos.i][gGamerPos.j].gameElement = GAMER
    board[5][5].gameElement = BALL
    board[7][2].gameElement = BALL
    // board[3][8].gameElement = GLUE

    console.log(board)
    return board
}

// Render the board to an HTML table
function renderBoard(board) {

    const elBoard = document.querySelector('.board')
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>\n'
        for (var j = 0; j < board[0].length; j++) {
            const currCell = board[i][j]

            var cellClass = getClassName({ i: i, j: j })
            // console.log('cellClass:', cellClass)

            if (currCell.type === FLOOR) cellClass += ' floor'
            else if (currCell.type === WALL) cellClass += ' wall'

            strHTML += `\t<td class="cell ${cellClass}"  onclick="moveTo(${i},${j})" >\n`

            if (currCell.gameElement === GAMER) {
                strHTML += GAMER_IMG
            } else if (currCell.gameElement === BALL) {
                strHTML += BALL_IMG
            } else if (currCell.gameElement === GLUE) {
                strHTML += GLUE_IMG
            }


            strHTML += '\t</td>\n'
        }
        strHTML += '</tr>\n'
    }

    elBoard.innerHTML = strHTML
}

// Move the player to a specific location
function moveTo(i, j) {

    var elBallsColected = document.querySelector('h2 span')
    var elBallsLeft = document.querySelector('h3 span')
    const iAbsDiff = Math.abs(i - gGamerPos.i)
    const jAbsDiff = Math.abs(j - gGamerPos.j)
    // var elBtn = document.querySelector('button')
    // console.log(i, j)
    if (j === gBoard[0].length) {
        j = 0
        console.log(j)
    }

    else if (j < 0) j = gBoard[0].length - 1
    else if (i === gBoard.length) i = 0
    else if (i < 0) i = gBoard.length - 1

    const targetCell = gBoard[i][j]
    if (targetCell.type === WALL) return
    // Calculate distance to make sure we are moving to a neighbor cell
    // const iAbsDiff = Math.abs(i - gGamerPos.i)
    // const jAbsDiff = Math.abs(j - gGamerPos.j)

    // If the clicked Cell is one of the four allowed
    console.log(jAbsDiff, iAbsDiff)
    if ((iAbsDiff === 1 && jAbsDiff === 0) || (jAbsDiff === 1 && iAbsDiff === 0)) {
        if (targetCell.gameElement === GLUE){
            
            // var now = new Date().getTime();
            // console.log('glued')
            // var newtime
            // while (newtime>= now +3000){
            //     newtime = new Date().getTime();
            // }
            // setTimeout(() => {console.log("GLUED")}, 3000);
            // setTimeout('', 5000)
        }
        if (targetCell.gameElement === BALL) {
            console.log('Collecting!')
            var audio = new Audio('audio/Coin.wav')
            audio.play()
            ballsColected++
            elBallsColected.innerText = ballsColected
            ballsLeft--
            countBallsLeft()

            // if (ballsLeft === 0) {
            //     alert('you won!!!')
            //     clearInterval(start)
            //     elBtn.style.display = 'block'
            // }



        }

        // DONE: Move the gamer
        // REMOVING FROM
        // update Model
        gBoard[gGamerPos.i][gGamerPos.j].gameElement = null
        // update DOM
        renderCell(gGamerPos, '')

        // ADD TO
        // update Model
        targetCell.gameElement = GAMER
        gGamerPos = { i, j }
        // update DOM
        renderCell(gGamerPos, GAMER_IMG)


    }
    countNegsBalls()


}

// Convert a location object {i, j} to a selector and render a value in that element
function renderCell(location, value) {
    const cellSelector = '.' + getClassName(location) // cell-i-j
    const elCell = document.querySelector(cellSelector)
    elCell.innerHTML = value


}

// Move the player by keyboard arrows
function onHandleKey(event) {
    const i = gGamerPos.i
    const j = gGamerPos.j
    // console.log('event.key:', event.key)

    switch (event.key) {
        case 'ArrowLeft':
            if(gBoard[i][j-1].gameElement===GLUE){
                moveTo(i, j - 1)
                setTimeout(onHandleKey,3000)
            }
            else moveTo(i, j - 1)
            // moveTo(i, j - 1)
            break
        case 'ArrowRight':
            moveTo(i, j + 1)
            break
        case 'ArrowUp':
            moveTo(i - 1, j)
            break
        case 'ArrowDown':
            moveTo(i + 1, j)
            break
    }
}

// Returns the class name for a specific cell
function getClassName(location) {
    const cellClass = 'cell-' + location.i + '-' + location.j
    return cellClass
}

// function isGlued(){
//     const i = gGamerPos.i
//     const j = gGamerPos.j
//     if(gBoard[i][j-1].gameElement===GLUE)
// }

