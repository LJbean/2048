/**
 * Created by Lenovo on 2017/6/10.
 */
var app = new PIXI.Application(window.innerWidth, window.innerHeight, {backgroundColor: 0xBC8F8F});
document.body.appendChild(app.view);
var basicText = new PIXI.Text('2048 ', {fontSize: 60});
basicText.anchor.set(0.5);
basicText.x = app.renderer.width / 2;
basicText.y = app.renderer.width / 2;
app.stage.addChild(basicText);


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
}
flushUI();

function oppearNumber() {
    return Math.floor(Math.random() * 4);
}

function drawcell(xIndex, yIndex) {
    var color = 0XFFF0F5;
    if (grid[xIndex][yIndex] === 2) {
        color = 0xFF0000;
    }

    var graphics = new PIXI.Graphics();
    graphics.beginFill(color, 1);
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
var xIndex = oppearNumber();
var yIndex = oppearNumber();
grid[xIndex][yIndex] = 2;
drawcell(xIndex, yIndex);

document.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowRight') {
        moveCellToRight();
        flushUI();
    }

});
function moveCellToRight() {
    for (var xIndex = 0; xIndex < 4; xIndex++) {
        for (var yIndex = 2; yIndex >= 0; yIndex--) {
            if (grid[xIndex][yIndex] === 0) continue;
            var theEmptyCellIndex = findTheFirstRightCell(xIndex, yIndex);
            if (theEmptyCellIndex !== -1) {
                grid[xIndex][theEmptyCellIndex] = grid[xIndex][yIndex];
                grid[xIndex][yIndex] = 0;

                if (grid[xIndex][theEmptyCellIndex] === grid[xIndex][theEmptyCellIndex + 1]) {
                    grid[xIndex][theEmptyCellIndex + 1] += grid[xIndex][theEmptyCellIndex];
                    grid[xIndex][theEmptyCellIndex] = 0;
                }
            }
        }
    }
}


function findTheFirstRightCell(xIndex, yIndex) {
    for (var i = 3; i > yIndex; i--) {
        if (grid[xIndex][i] === 0) {
            return i;
        }
    }

    return -1;
}