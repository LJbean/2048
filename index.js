/**
 * Created by Lenovo on 2017/6/10.
 */
var app = new PIXI.Application(window.innerWidth, window.innerHeight, {backgroundColor: 0xCCCCCC});
document.body.appendChild(app.view);
var maxCount=16;
var currentCount=0;
var score=0;

var basicText = new PIXI.Text('2048 ', {fontSize: 60});
basicText.anchor.set(0.5);
basicText.x = app.renderer.width / 2;
basicText.y = app.renderer.height / 4;
app.stage.addChild(basicText);


var scoreText = new PIXI.Text('Score: '+score, {fontSize: 28});
scoreText.anchor.set(0.5);
scoreText.x = app.renderer.width / 2;
scoreText.y = app.renderer.height/ 10*8;
app.stage.addChild(scoreText);


var grid = [];
for (var i = 0; i < 4; i++) {
    grid[i] = [0, 0, 0, 0];
}
function flushUI() {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            drawcell(i, j);
        }

    }
    scoreText.text='Score:'+score;
};
flushUI();

function oppearNumber() {
    return Math.floor(Math.random() * 4);
}

function drawcell(xIndex, yIndex) {


    var graphics = new PIXI.Graphics();
    graphics.beginFill(getColorByNumber(grid[xIndex][yIndex]), 1);
    graphics.drawRect(app.renderer.width / 4 + yIndex * 51, app.renderer.height / 8 * 3 + xIndex * 51, 50, 50);
    app.stage.addChild(graphics);
    if (grid[xIndex][yIndex] != 0) {
        var num = new PIXI.Text(grid[xIndex][yIndex], {fontSize: 30});
        num.anchor.set(0.5);
        num.x = app.renderer.width / 4 + yIndex * 51 + 50 / 2;
        num.y = app.renderer.height / 8 * 3 + xIndex * 51 + 50 / 2;
        app.stage.addChild(num);
    }


}
function getColorByNumber(number) {
    var colorValue = {
        0: 0x00FF00,
        2: 0xFF0000,
        4: 0x0000FF,
    };
    var color = colorValue[number];
    if (color === undefined) {
        color = 0xff0ff;
    }
    return color;
}
function addRandomCell() {
    if(currentCount===maxCount)return ;
    var xIndex = oppearNumber();
    var yIndex = oppearNumber();
    while (grid[xIndex][yIndex] !== 0) {
        var xIndex = oppearNumber();
        var yIndex = oppearNumber();
    }
    grid[xIndex][yIndex] = 2;
    currentCount++;

}
addRandomCell();
addRandomCell();
flushUI();
var onToDownEventHandler = function () {
    rotateArray(3);
    var isChanged = moveCellToRight();
    rotateArray(1);
    if (isChanged) {
        addRandomCell();
    }
    flushUI();
    if (checkGameOver()) {
        alert('Game over.');
    }
};
var onToLeftEventHandler = function () {
    rotateArray(2);
    var isChange = moveCellToRight();
    rotateArray(2);
    if (isChange) {
        addRandomCell();
    }
    flushUI();
    if (checkGameOver()) {
        alert('Game over.');
    }
};
var onToUpEventHandler = function () {
    rotateArray(1);
    var isChange = moveCellToRight();
    rotateArray(3);
    if (isChange) {
        addRandomCell();
    }
    flushUI();
    if (checkGameOver()) {
        alert('Game over.');
    }
};
document.addEventListener('keydown', function (event) {
    var isChange;
    if (event.key === 'ArrowRight') {
        isChange=moveCellToRight();
        if(isChange){
            addRandomCell();
        }

        flushUI();
        if(checkGameOver()){
            alter('Game Over');
        }
    };
    if (event.key === 'ArrowUp') {
        rotateArray(1);
        isChange=moveCellToRight();
        rotateArray(3);
        if(isChange){
            addRandomCell();
        }
        ;
        flushUI();
        if(checkGameOver()){
            alter('Game Over');}
    }
    if (event.key === 'ArrowLeft') {
        rotateArray(2);
        isChange=moveCellToRight();
        rotateArray(2);
        if(isChange)
        {
            addRandomCell();
        }
        ;
        flushUI();
        if(checkGameOver()){
            alter('Game Over');}
    }

    if (event.key === 'ArrowDown') {
        rotateArray(3);
        isChange=moveCellToRight();
        rotateArray(1);
        if(isChange){
            addRandomCell();
        }
        flushUI();
    }
    if(checkGameOver()){
        alter('Game Over');}

});
function moveCellToRight() {
    var isChange=false;
    for (var xIndex = 0; xIndex < 4; xIndex++) {
        for (var yIndex = 2; yIndex >= 0; yIndex--) {
            if (grid[xIndex][yIndex] === 0) continue;
            var theEmptyCellIndex = findTheFirstRightCell(xIndex, yIndex);
            if (theEmptyCellIndex !== -1) {
                grid[xIndex][theEmptyCellIndex] = grid[xIndex][yIndex];
                grid[xIndex][yIndex] = 0;
            isChange=true;
            }

            var currentIndex = theEmptyCellIndex === -1 ? yIndex : theEmptyCellIndex;
            if (grid[xIndex][currentIndex] === grid[xIndex][currentIndex + 1]) {
                grid[xIndex][currentIndex + 1] += grid[xIndex][currentIndex];
                grid[xIndex][currentIndex] = 0;
                score+=grid[xIndex][currentIndex+1];
                isChange=true;
                currentCount--;
            }
        }
    }
    return isChange;
}


function findTheFirstRightCell(xIndex, yIndex) {
    for (var i = 3; i > yIndex; i--) {
        if (grid[xIndex][i] === 0) {
            return i;
        }
    }

    return -1;
}
function rotateArray(rotateCount = 1) {
    for (var i = 0; i < rotateCount; i++) {
        grid = rotateArrayToRightOnce(grid);
    }

    function rotateArrayToRightOnce(array) {
        return array.map((row, xIndex) => {
            return row.map((item, yIndex) => {
                return array[3 - yIndex][xIndex];
            })
        })
    }
}
function checkGameOver() {
    if (currentCount !== maxCount) return false;

    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (grid[i][j] === grid[i][j - 1] ||
                grid[i][j] === grid[i][j + 1] ||
                (grid[i-1] && grid[i][j] === grid[i - 1][j]) ||
                (grid[i+1] && grid[i][j] === grid[i + 1][j])
            ) {
                return false;
            }
        }
    }

    return true;
}